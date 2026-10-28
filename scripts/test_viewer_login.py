#!/usr/bin/env python3
"""
The read-only viewer login (lib/gate.ts), end to end against a local production build.

    npm run build && python3 scripts/test_viewer_login.py

Serves a throwaway desk (desk.html, one document, a fed page, a state page) over
HTTP for DESK_LOCAL_URL, starts `next start` on port 3458 with made-up owner and
viewer passwords and DESK_FEEDBACK_DRY_RUN=1, and checks:

  - each password signs in its role; the cookie lasts 30 days for the owner and
    14 for a viewer; a wrong password gets 401
  - a viewer reads /desk, a document, the fed and state dashboards, with "Send
    feedback" on each; the owner sees no such link
  - a viewer gets the polite 403 page on /desk/hand-check and on /tools, and 403
    JSON for a /tools data file; the owner gets the hand check
  - a viewer cookie relabelled "owner" goes to /login
  - restarted with SITE_GATE_VIEWER_VERSION=2, the old viewer cookie goes to
    /login and the owner's still works; with the viewer password empty, viewer
    login answers 401
  - the feedback form, in Chromium: a viewer's note is accepted (dry run) and the
    sixth in an hour refused; signed out, the form goes to /login

Needs Playwright for Python. The unit tests are scripts/test_gate.mjs.
"""
import http.server
import os
import re
import subprocess
import sys
import tempfile
import threading
import time
import urllib.error
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PORT = 3458
BASE = f"http://127.0.0.1:{PORT}"
OWNER_PW, VIEWER_PW = "local-owner", "local-viewer"
fails = []


def check(cond, msg):
    if not cond:
        fails.append(msg)


# The three repos' files the desk reads, made up, in the layout lib/desk.ts expects.
SRC = Path(tempfile.mkdtemp())
PAGE = '<!doctype html><html lang="en"><head><title>{0}</title></head><body><main><h1>{0}</h1></main></body></html>'
for rel, title in [("desk/desk.html", None), ("desk/docs/test-doc.html", "Test doc"),
                   ("fed-intel/index.html", "Fed"), ("state-intel/site/state.html", "State")]:
    f = SRC / rel
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text("<h2 id=pricing>Pricing</h2><p>Desk body.</p>" if title is None else PAGE.format(title))
handler = lambda *a, **k: http.server.SimpleHTTPRequestHandler(*a, directory=str(SRC), **k)  # noqa: E731
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
static = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
threading.Thread(target=static.serve_forever, daemon=True).start()


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


opener = urllib.request.build_opener(NoRedirect)


def get(path, cookie=None):
    req = urllib.request.Request(BASE + path, headers={"Cookie": f"bb_gate={cookie}"} if cookie else {})
    try:
        r = opener.open(req, timeout=30)
        return r.status, {k.lower(): v for k, v in r.headers.items()}, r.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, {k.lower(): v for k, v in e.headers.items()}, e.read().decode()


def login(password):
    req = urllib.request.Request(BASE + "/api/login", data=f'{{"password": "{password}"}}'.encode(),
                                 headers={"Content-Type": "application/json"}, method="POST")
    try:
        r = opener.open(req, timeout=30)
    except urllib.error.HTTPError as e:
        return e.code, None, None
    sc = r.headers.get("set-cookie", "")
    val = re.search(r"bb_gate=([^;]+)", sc).group(1)
    age = int(re.search(r"Max-Age=(\d+)", sc).group(1))
    return r.status, val, age


def start(**extra):
    env = {**os.environ, "SITE_GATE_PASSWORD": OWNER_PW, "SITE_GATE_VIEWER_PASSWORD": VIEWER_PW,
           "SITE_GATE_SECRET": "localsecret-0123456789abcdef0123",
           "DESK_LOCAL_URL": f"http://127.0.0.1:{static.server_address[1]}", "DESK_FEEDBACK_DRY_RUN": "1", **extra}
    for k in ("VERCEL", "RESEND_API_KEY", "DESK_GH_TOKEN"):
        env.pop(k, None)
    srv = subprocess.Popen(["npx", "next", "start", "-p", str(PORT), "-H", "127.0.0.1"], cwd=ROOT, env=env,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(60):
        try:
            urllib.request.urlopen(BASE + "/login", timeout=2)
            return srv
        except Exception:
            time.sleep(0.5)
    raise SystemExit("next start did not come up")


def stop(srv):
    srv.terminate()
    srv.wait(timeout=20)


def to_login(status, headers):
    return status in (302, 303, 307, 308) and "/login" in headers.get("location", "")


srv = start()
try:
    # Sign-in and lifetimes.
    s, owner, owner_age = login(OWNER_PW)
    check(s == 200 and owner.startswith("owner.") and owner_age == 30 * 86400, f"owner login: {s} {owner_age}")
    s, viewer, viewer_age = login(VIEWER_PW)
    check(s == 200 and viewer.startswith("viewer.") and viewer_age == 14 * 86400, f"viewer login: {s} {viewer_age}")
    check(login("wrong")[0] == 401, "a wrong password was not 401")
    check(login("")[0] == 401, "an empty password was not 401")

    # What a viewer reads, with Send feedback.
    for path, want in [("/desk", "Desk body."), ("/desk/doc/test-doc", "Test doc"),
                       ("/desk/fed/index.html", "Fed"), ("/desk/state/state.html", "State")]:
        s, _, body = get(path, viewer)
        check(s == 200 and want in body, f"viewer {path}: {s}")
        check("Send feedback" in body and "/desk/feedback?from=" in body, f"viewer {path}: no Send feedback link")
        s, _, body = get(path, owner)
        check(s == 200 and "Send feedback" not in body, f"owner {path}: {s} or a Send feedback link")

    # What a viewer is refused.
    for path in ["/desk/hand-check?d=example.gov&p=https://example.gov/", "/tools", "/tools/anything"]:
        s, h, body = get(path, viewer)
        check(s == 403 and "Read-only access" in body and 'href="/desk"' in body, f"viewer {path}: {s}")
        check("no-store" in h.get("cache-control", ""), f"viewer {path}: cacheable")
    s, _, body = get("/tools/data.json", viewer)
    check(s == 403 and '"read-only access"' in body, f"viewer /tools/data.json: {s} {body[:80]}")
    s, _, body = get("/desk/hand-check?d=example.gov&p=https://example.gov/", owner)
    check(s == 200 and "Start on this Mac" in body, f"owner hand-check: {s}")
    s, _, body = get("/tools/voice-critique", viewer)
    check(s == 200, f"the public voice-critique page answered {s} to a viewer")

    # Tampering.
    s, h, _ = get("/desk", "owner." + viewer.split(".", 1)[1])
    check(to_login(s, h), f"a relabelled viewer cookie was not sent to /login: {s}")
    s, h, _ = get("/desk/doc/test-doc", viewer[:-1] + ("0" if viewer[-1] != "0" else "1"))
    check(to_login(s, h), f"a viewer cookie with an edited signature got {s}")

    # The feedback form.
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context()
        ctx.add_cookies([{"name": "bb_gate", "value": viewer, "url": BASE}])
        page = ctx.new_page()
        for i in range(5):
            page.goto(BASE + "/desk/feedback?from=/desk/doc/test-doc", wait_until="load")
            page.fill("#fb-comment", f"Note {i}")
            page.click("button[type=submit]")
            page.wait_for_url(re.compile(r"(sent=1|problem=)"), timeout=30000)
            check("went to Brian" in page.inner_text("main"), f"note {i + 1}: {page.url}")
        check("from=%2Fdesk%2Fdoc%2Ftest-doc" in page.url, f"the page path was lost: {page.url}")
        page.goto(BASE + "/desk/feedback?from=/desk", wait_until="load")
        page.fill("#fb-comment", "Note 6")
        page.click("button[type=submit]")
        page.wait_for_url(re.compile(r"problem="), timeout=30000)
        check("problem=limit" in page.url, f"the sixth note in an hour: {page.url}")
        ctx.close()
        ctx = b.new_context()
        page = ctx.new_page()
        page.goto(BASE + "/desk/feedback?from=/desk", wait_until="load")
        check("/login" in page.url, f"signed out, the feedback form did not go to /login: {page.url}")
        b.close()
finally:
    stop(srv)

# Revocation: a new viewer version kills viewer sessions, not the owner's.
srv = start(SITE_GATE_VIEWER_VERSION="2")
try:
    s, h, _ = get("/desk", viewer)
    check(to_login(s, h), f"after SITE_GATE_VIEWER_VERSION=2 the old viewer cookie got {s}")
    s, _, _ = get("/desk", owner)
    check(s == 200, f"after SITE_GATE_VIEWER_VERSION=2 the owner got {s}")
    s, fresh, _ = login(VIEWER_PW)
    check(s == 200 and get("/desk", fresh)[0] == 200, "a fresh viewer login failed after the version change")
finally:
    stop(srv)

# Viewer password empty: viewer login off.
srv = start(SITE_GATE_VIEWER_PASSWORD="")
try:
    check(login(VIEWER_PW)[0] == 401, "with the viewer password empty, viewer login still worked")
    check(to_login(*get("/desk", viewer)[:2]), "with the viewer password empty, a viewer cookie still worked")
    check(get("/desk", owner)[0] == 200, "with the viewer password empty, the owner was locked out")
finally:
    stop(srv)
    static.shutdown()

if fails:
    print("FAIL")
    for f in fails:
        print(f"  - {f}")
    sys.exit(1)
print("ok: two roles, lifetimes, viewer reads the desk with feedback, refused on owner paths, tamper and "
      "revocation, feedback sent and rate limited")
