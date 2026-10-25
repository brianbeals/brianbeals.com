#!/usr/bin/env python3
"""
The site's half of failing loudly (2026-10-25), end to end against a local production build.

    npm run build && python3 scripts/test_free_test_alerts.py

A stand-in for the Upstash REST store runs in this process (SET with NX and EX,
GET, DEL, INCR, GETDEL, and a clock the test can move), and every alert lands as an
.eml in a temporary folder (FREE_TEST_ALERT_OUTBOX) instead of being sent. Checks:

  - heartbeat: a good signature is stored; a bad or stale one is refused
  - watch: refused without CRON_SECRET; quiet before the first heartbeat; one alert
    after 20 silent minutes, not two; one "all clear" when it beats again
  - Resend webhook: a bounce, a complaint and a delay on freetest@ mail each alert
    with the recipient, which email and the reason; a retried delivery alerts once;
    mail from another sender is ignored; a bad signature is refused
  - form errors: a Turnstile verify error and a failed send each alert with the
    typed site and email, at most one email per 15 minutes, the next with the count
  - every alert's subject starts "[free-test ALERT]", from alerts@forms.brianbeals.com,
    to brian@brianbeals.com

Needs Playwright for Python and network access (Turnstile's test widget, and
siteverify refusing a made-up secret).
"""
import base64
import email
import email.policy
import hashlib
import hmac
import json
import os
import subprocess
import sys
import tempfile
import threading
import time
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PORT, KVPORT = 3459, 3461
BASE = f"http://127.0.0.1:{PORT}"
SECRET = "alert-test-secret-0123456789abcdef0123"
CRON = "cron-test-secret"
WHSEC = "whsec_" + base64.b64encode(b"webhook-test-key-0123456789").decode()
ALERTS = Path(tempfile.mkdtemp())
fails = []


def check(cond, msg):
    if not cond:
        fails.append(msg)


# ---- a stand-in for Upstash's REST API ------------------------------------------
STORE, SHIFT = {}, [0.0]


def now():
    return time.time() + SHIFT[0]


def live(k):
    v = STORE.get(k)
    if v and v[1] and v[1] <= now():
        STORE.pop(k, None)
        return None
    return v


class KV(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_POST(self):
        args = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        cmd, res = args[0].upper(), None
        if self.headers.get("Authorization") != "Bearer kvtoken":
            self.send_response(401), self.end_headers()
            return
        if cmd == "SET":
            k, v, rest = args[1], args[2], [a.upper() for a in args[3:]]
            exp = now() + float(args[3 + rest.index("EX") + 1]) if "EX" in rest else None
            if "NX" in rest and live(k):
                res = None
            else:
                STORE[k], res = (v, exp), "OK"
        elif cmd == "GET":
            res = (live(args[1]) or (None,))[0]
        elif cmd == "DEL":
            res = int(STORE.pop(args[1], None) is not None)
        elif cmd == "INCR":
            v = live(args[1])
            STORE[args[1]] = (str(int(v[0] if v else 0) + 1), v[1] if v else None)
            res = int(STORE[args[1]][0])
        elif cmd == "GETDEL":
            v = live(args[1])
            STORE.pop(args[1], None)
            res = v[0] if v else None
        body = json.dumps({"result": res}).encode()
        self.send_response(200), self.send_header("Content-Type", "application/json"), self.end_headers()
        self.wfile.write(body)


threading.Thread(target=ThreadingHTTPServer(("127.0.0.1", KVPORT), KV).serve_forever, daemon=True).start()


# ---- helpers -----------------------------------------------------------------
def alerts():
    out = []
    for f in sorted(ALERTS.glob("*-alert-*.eml")):
        m = email.message_from_bytes(f.read_bytes(), policy=email.policy.default)
        out.append({"from": str(m["From"]), "to": str(m["To"]), "subject": str(m["Subject"]), "text": m.get_content()})
    return out


def new_alerts(seen):
    a = alerts()
    return a[seen:], len(a)


def call(method, path, body=None, headers=None):
    data = body if isinstance(body, bytes) else (json.dumps(body).encode() if body is not None else None)
    req = urllib.request.Request(BASE + path, data=data, method=method,
                                 headers={"Content-Type": "application/json", **(headers or {})})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}")


def beat(ts, key=SECRET):
    sig = hmac.new(key.encode(), f"heartbeat:{ts}".encode(), hashlib.sha256).hexdigest()
    return call("POST", "/api/free-test/heartbeat", {"ts": ts, "sig": sig})


def hook(event, sid, tamper=False):
    body = json.dumps(event).encode()
    ts = str(int(time.time()))
    key = base64.b64decode(WHSEC[len("whsec_"):])
    sig = base64.b64encode(hmac.new(key, f"{sid}.{ts}.".encode() + body, hashlib.sha256).digest()).decode()
    if tamper:
        sig = sig[::-1]
    return call("POST", "/api/free-test/resend-webhook", body,
                {"svix-id": sid, "svix-timestamp": ts, "svix-signature": f"v1,{sig}"})


def server(**extra):
    env = {**os.environ, "FREE_TEST_ENABLED": "true", "FREE_TEST_SECRET": SECRET,
           "TURNSTILE_SITE_KEY": "1x00000000000000000000AA",
           "TURNSTILE_SECRET_KEY": "1x0000000000000000000000000000000AA",
           "FREE_TEST_OUTBOX": tempfile.mkdtemp(), "FREE_TEST_ALERT_OUTBOX": str(ALERTS),
           "KV_REST_API_URL": f"http://127.0.0.1:{KVPORT}", "KV_REST_API_TOKEN": "kvtoken",
           "CRON_SECRET": CRON, "RESEND_WEBHOOK_SECRET": WHSEC,
           "SITE_GATE_PASSWORD": "localtest", "SITE_GATE_SECRET": "localsecret-0123456789abcdef", **extra}
    for k in ("VERCEL", "RESEND_API_KEY"):
        env.pop(k, None)
    p = subprocess.Popen(["npx", "next", "start", "-p", str(PORT), "-H", "127.0.0.1"], cwd=ROOT, env=env,
                         stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(80):
        try:
            urllib.request.urlopen(BASE + "/free-test", timeout=2)
            break
        except Exception:
            time.sleep(0.5)
    return p


def submit(page, url, addr):
    page.goto(BASE + "/free-test", wait_until="load")
    page.fill("#ft-url", url)
    page.fill("#ft-email", addr)
    page.wait_for_function("document.querySelector('[name=\"cf-turnstile-response\"]')?.value", timeout=30000)
    page.click("button[type=submit]")
    page.wait_for_function("document.querySelector('main').innerText.match(/Check your email|Not sent/)",
                           timeout=30000)
    return page.inner_text("main")


seen = 0
srv = server()
try:
    # 1. Heartbeat.
    t = int(time.time())
    check(beat(t)[0] == 200 and STORE.get("ft:hb", ("",))[0] == str(t), "a good heartbeat wasn't stored")
    check(beat(t, key="wrong-secret-0123456789abcdef0123456")[0] == 401, "a forged heartbeat was accepted")
    check(beat(t - 900)[0] == 401, "a stale heartbeat was accepted")

    # 2. Watch.
    check(call("GET", "/api/free-test/watch")[0] == 401, "watch answered without CRON_SECRET")
    auth = {"Authorization": f"Bearer {CRON}"}
    STORE.pop("ft:hb", None)
    code, body = call("GET", "/api/free-test/watch", headers=auth)
    check(body.get("status") == "no heartbeat yet", f"watch before any heartbeat: {body}")
    STORE["ft:hb"] = (str(int(time.time()) - 21 * 60), None)
    call("GET", "/api/free-test/watch", headers=auth)
    call("GET", "/api/free-test/watch", headers=auth)
    new, seen = new_alerts(seen)
    check(len(new) == 1 and "engine heartbeat missing" in new[0]["subject"], f"outage alerts: {[a['subject'] for a in new]}")
    check(new and "Next step" in new[0]["text"], "outage alert has no next step")
    beat(int(time.time()))
    call("GET", "/api/free-test/watch", headers=auth)
    call("GET", "/api/free-test/watch", headers=auth)
    new, seen = new_alerts(seen)
    check(len(new) == 1 and "all clear" in new[0]["subject"], f"recovery alerts: {[a['subject'] for a in new]}")

    # 3. Resend webhook.
    ev = {"type": "email.bounced", "data": {"from": '"Brian Beals, LLC" <freetest@forms.brianbeals.com>',
                                            "to": ["pat@example.gov"],
                                            "subject": "Confirm the free accessibility test of www.example.gov",
                                            "bounce": {"type": "Permanent", "subType": "General",
                                                       "message": "550 5.1.1 user unknown"}}}
    check(hook(ev, "msg_1", tamper=True)[0] == 401, "a forged webhook was accepted")
    check(hook(ev, "msg_1")[0] == 200 and hook(ev, "msg_1")[0] == 200, "webhook refused a good delivery")
    new, seen = new_alerts(seen)
    check(len(new) == 1, f"bounce alerts (with a retry): {len(new)}, want 1")
    if new:
        t = new[0]
        check(t["subject"] == "[free-test ALERT] bounced: pat@example.gov, the confirmation email", t["subject"])
        check("Reason: Permanent: General: 550 5.1.1 user unknown" in t["text"], "bounce reason missing")
    hook({"type": "email.complained", "data": {**ev["data"], "subject": "Free accessibility test: example.gov"}},
         "msg_2")
    hook({"type": "email.delivery_delayed", "data": {**ev["data"], "subject": "Reminder: confirm the free "
                                                     "accessibility test of www.example.gov"}}, "msg_3")
    hook({"type": "email.bounced", "data": {**ev["data"], "from": "contact@forms.brianbeals.com"}}, "msg_4")
    hook({"type": "email.delivered", "data": ev["data"]}, "msg_5")
    new, seen = new_alerts(seen)
    check([a["subject"] for a in new] == ["[free-test ALERT] marked as spam: pat@example.gov, the report",
                                          "[free-test ALERT] delivery delayed: pat@example.gov, the reminder to confirm"],
          f"complaint and delay alerts: {[a['subject'] for a in new]}")
finally:
    srv.terminate()
    srv.wait(timeout=20)

# 4. Form errors: a made-up Turnstile secret makes siteverify answer invalid-input-secret.
srv = server(TURNSTILE_SECRET_KEY="0x-not-a-real-secret")
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_context().new_page()
        for i in range(3):
            text = submit(page, f"www.site{i}.gov", f"pat{i}@site{i}.gov")
            check("couldn't be verified on our side" in text, f"Turnstile error not shown: {text[:160]!r}")
        new, seen = new_alerts(seen)
        check(len(new) == 1, f"{len(new)} form-error alerts for 3 errors in 15 minutes, want 1")
        if new:
            t = new[0]["text"]
            check("Turnstile verify error: invalid-input-secret" in t and "Typed site: www.site0.gov" in t
                  and "Typed email: pat0@site0.gov" in t and "1 error since" in t, f"form-error alert:\n{t}")
        SHIFT[0] += 901                     # the 15-minute window passes
        submit(page, "www.site3.gov", "pat3@site3.gov")
        new, seen = new_alerts(seen)
        check(len(new) == 1 and "3 errors since the last alert" in new[0]["text"]
              and "Typed site: www.site3.gov" in new[0]["text"], f"second window: {[a['text'][:200] for a in new]}")
        b.close()
finally:
    srv.terminate()
    srv.wait(timeout=20)

# 5. A failed send: the request event's outbox can't be written.
STORE.clear()
srv = server(FREE_TEST_OUTBOX="/dev/null/not-a-folder")
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        text = submit(b.new_context().new_page(), "www.lee.gov", "pat@lee.gov")
        check("could not be sent" in text, f"failed send not shown: {text[:160]!r}")
        new, seen = new_alerts(seen)
        check(len(new) == 1 and new[0]["subject"] == "[free-test ALERT] form error: send failure"
              and "Typed site: www.lee.gov" in new[0]["text"] and "Typed email: pat@lee.gov" in new[0]["text"],
              f"send-failure alert: {[(a['subject'], a['text'][:200]) for a in new]}")
        b.close()
finally:
    srv.terminate()
    srv.wait(timeout=20)

for a in alerts():
    check(a["subject"].startswith("[free-test ALERT] "), f"subject {a['subject']!r}")
    check("alerts@forms.brianbeals.com" in a["from"] and a["to"] == "brian@brianbeals.com",
          f"{a['subject']}: from {a['from']} to {a['to']}")
    check("lrs.com" not in a["to"].lower(), "an alert addressed to LRS")

if fails:
    print("FAIL")
    for f in fails:
        print(f"  - {f}")
    sys.exit(1)
print(f"ok: heartbeat, watch outage and all clear, Resend webhook, form errors at most every 15 minutes with a count, "
      f"failed send; {len(alerts())} alerts, all [free-test ALERT] from alerts@ to Brian")
