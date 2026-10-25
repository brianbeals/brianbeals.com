#!/usr/bin/env python3
"""
The /free-test owner fast path, end to end against a local production build.

    npm run build && python3 scripts/test_free_test_owner.py

Starts `next start` on port 3457 with the free test on, Cloudflare's always-pass
Turnstile test keys, and FREE_TEST_OUTBOX pointed at a temporary folder, so each
signed event lands there as an .eml instead of going anywhere. Then, in Chromium:

  - no session, Brian's own address typed: the public path (a "request" event
    carrying the typed address, "Thank you. Check your email.")
  - a forged bb_gate cookie: the public path
  - a valid /desk session, someone else's address typed: an "owner" event with
    only the URL and the IP hash (the typed address is in no event), and
    "Running pinellas.gov. The report will come to brian@brianbeals.com in about 2–4 minutes.",
    with no "Can't get past the check?" line
  - the public confirmation: "Thank you. Check your email." takes focus, names the
    typed address, links the call, and keeps the "Can't get past the check?" line
  - ten owner checks in an hour go; the eleventh is refused on the page and sends nothing
  - every event's HMAC verifies with the secret, as the engine checks it

Needs Playwright for Python and network access for Turnstile's test widget.
"""
import email
import email.policy
import hashlib
import hmac
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PORT = 3457
BASE = f"http://127.0.0.1:{PORT}"
SECRET = "owner-test-secret-0123456789abcdef0123"
OUTBOX = Path(tempfile.mkdtemp())
RUNNING = "Running pinellas.gov. The report will come to brian@brianbeals.com in about 2–4 minutes."
THANKS = "Thank you. Check your email."
HELP = "Can't get past the check?"
fails = []


def check(cond, msg):
    if not cond:
        fails.append(msg)


def events():
    """(type, data) per signed event in the outbox, oldest first; fails on a bad HMAC."""
    out = []
    for f in sorted(OUTBOX.glob("*.eml")):
        body = email.message_from_bytes(f.read_bytes(), policy=email.policy.default).get_content()
        m = re.search(r"-----BEGIN FREE-TEST-----\s*\n(.+)\n-----END FREE-TEST-----\s*\nsig=([0-9a-f]{64})", body)
        line, sig = m.group(1).strip(), m.group(2)
        check(hmac.compare_digest(hmac.new(SECRET.encode(), line.encode(), hashlib.sha256).hexdigest(), sig),
              f"bad signature on {f.name}")
        p = json.loads(line)
        out.append((p["type"], p["data"]))
    return out


def submit(page, url, addr, org=None):
    page.goto(BASE + "/free-test", wait_until="load")
    page.fill("#ft-url", url)
    page.fill("#ft-email", addr)
    if org:
        page.select_option("#ft-org", org)
    # The test site key passes at once; wait for its token.
    page.wait_for_function("document.querySelector('[name=\"cf-turnstile-response\"]')?.value", timeout=30000)
    page.click("button[type=submit]")
    page.wait_for_function(
        "document.querySelector('main').innerText.match(/Check your email|Running |Not sent/)", timeout=30000)
    return page.inner_text("main")


env = {**os.environ, "FREE_TEST_ENABLED": "true", "FREE_TEST_SECRET": SECRET,
       "TURNSTILE_SITE_KEY": "1x00000000000000000000AA", "TURNSTILE_SECRET_KEY": "1x0000000000000000000000000000000AA",
       "FREE_TEST_OUTBOX": str(OUTBOX), "SITE_GATE_PASSWORD": "localtest",
       "SITE_GATE_SECRET": "localsecret-0123456789abcdef"}
env.pop("VERCEL", None)
env.pop("RESEND_API_KEY", None)
srv = subprocess.Popen(["npx", "next", "start", "-p", str(PORT), "-H", "127.0.0.1"], cwd=ROOT, env=env,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    for _ in range(60):
        try:
            urllib.request.urlopen(BASE + "/free-test", timeout=2)
            break
        except Exception:
            time.sleep(0.5)
    with sync_playwright() as p:
        b = p.chromium.launch()

        # 1. No session, Brian's address typed: public.
        ctx = b.new_context()
        page = ctx.new_page()
        text = submit(page, "www.example.gov", "brian@brianbeals.com", org="nonprofit")
        check(THANKS in text and "Running" not in text, "no session: not the public answer")
        check(page.evaluate("document.activeElement.innerText") == THANKS, "the thank-you heading doesn't take focus")
        check("We sent a confirmation link to brian@brianbeals.com." in text, "the typed address isn't named")
        check(page.locator("#check").get_by_role("link", name="Book a 15-minute call").get_attribute("href") == "/contact",
              "no Book a 15-minute call link")
        check(HELP in text, "public confirmation lost the Can't get past the check line")
        check("Didn't get the email? It comes from freetest@forms.brianbeals.com. Check your spam folder, or write "
              "to brian@brianbeals.com." in text, "the sender line is missing or changed")
        check(page.title() == "Thank you | Brian Beals, LLC", f"confirmation tab title is {page.title()!r}")
        ev = events()
        check([t for t, _ in ev] == ["request"] and ev[0][1].get("email") == "brian@brianbeals.com",
              f"no session sent {ev}")
        check(ev[0][1].get("org") == "nonprofit", f"the Nonprofit (HHS-funded) choice didn't reach the event: {ev[0][1]}")
        ctx.close()

        # 2. A forged session cookie: public.
        ctx = b.new_context()
        ctx.add_cookies([{"name": "bb_gate", "value": f"{int(time.time() * 1000) + 10**9}.{'0' * 64}",
                          "url": BASE}])
        text = submit(ctx.new_page(), "www.example.gov", "a@example.gov")
        check(THANKS in text, "forged cookie: not the public answer")
        check([t for t, _ in events()] == ["request", "request"], "forged cookie sent an owner event")
        ctx.close()

        # 3. A real session: owner, the typed address ignored.
        ctx = b.new_context()
        r = ctx.request.post(BASE + "/api/login", data={"password": "localtest"})
        # The login cookie is Secure; over local http, hand it to the context as is.
        val = re.search(r"bb_gate=([^;]+)", r.headers.get("set-cookie", "")).group(1)
        ctx.add_cookies([{"name": "bb_gate", "value": val, "url": BASE}])
        page = ctx.new_page()
        text = submit(page, "www.pinellas.gov", "someone@else.example")
        check(RUNNING in text, f"session: page said {text[:200]!r}")
        check(HELP not in text, "owner mode shows the Can't get past the check line")
        check(page.evaluate("document.activeElement.innerText") == RUNNING, "the Running line doesn't take focus")
        ev = events()
        check(ev[-1][0] == "owner" and set(ev[-1][1]) == {"url", "ip_hash"} and ev[-1][1]["url"] == "www.pinellas.gov",
              f"owner event: {ev[-1]}")
        check(not any("someone@else.example" in f.read_text() for f in OUTBOX.glob("*.eml")),
              "the typed address reached an event")

        # 4. Ten an hour.
        for i in range(9):
            text = submit(page, f"www.site{i}.gov", "x@y.example")
            check(f"Running site{i}.gov." in text, f"owner check {i + 2} of 10 refused: {text[:120]!r}")
        text = submit(page, "www.eleven.gov", "x@y.example")
        check("limited to 10 an hour" in text and "Running" not in text, f"eleventh owner check: {text[:200]!r}")
        check([t for t, _ in events()].count("owner") == 10, "the eleventh owner check sent an event")
        ctx.close()
        b.close()
finally:
    srv.terminate()
    srv.wait(timeout=20)

if fails:
    print("FAIL")
    for f in fails:
        print(f"  - {f}")
    sys.exit(1)
print("ok: owner path with a session, public without one or with a forged one, typed address ignored, 10 an hour")
