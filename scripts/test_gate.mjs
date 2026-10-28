// The two-role gate (lib/gate.ts), the viewer-only parts of the desk bar
// (lib/desk-bar.ts), the desk feedback email (app/desk/feedback/email.ts) and its
// rate limiter (lib/form-mail.ts). Those files import nothing, so Node runs them
// as TypeScript directly:
//
//     node --test scripts/test_gate.mjs
//
// End to end against a production build: scripts/test_viewer_login.py.
import assert from "node:assert/strict";
import { test } from "node:test";
import { TTL_MS, roleForPassword, signSession, verifySession, viewerBlocked } from "../lib/gate.ts";
import { deskBarHtml, readOnlyHtml } from "../lib/desk-bar.ts";
import { buildFeedbackEmail, feedbackPath } from "../app/desk/feedback/email.ts";
import { rateLimiter } from "../lib/form-mail.ts";

const ENV = {
  SITE_GATE_SECRET: "test-secret-0123456789abcdef0123456789",
  SITE_GATE_PASSWORD: "owner-pw",
  SITE_GATE_VIEWER_PASSWORD: "viewer-pw",
};
const DAY = 24 * 60 * 60 * 1000;

test("each password signs in its own role; anything else signs in nothing", async () => {
  assert.equal(await roleForPassword("owner-pw", ENV), "owner");
  assert.equal(await roleForPassword("viewer-pw", ENV), "viewer");
  for (const bad of ["", "nope", "owner-pw ", "viewer", undefined, null, 42, ["owner-pw"]])
    assert.equal(await roleForPassword(bad, ENV), null, String(bad));
});

test("viewer login is off when SITE_GATE_VIEWER_PASSWORD is unset or empty", async () => {
  for (const v of [undefined, ""]) {
    const env = { ...ENV, SITE_GATE_VIEWER_PASSWORD: v };
    assert.equal(await roleForPassword("viewer-pw", env), null);
    assert.equal(await roleForPassword("", env), null);
    assert.equal(await signSession("viewer", env), null);
    // A cookie signed while viewers were on stops working when they are turned off.
    assert.equal(await verifySession(await signSession("viewer", ENV), env), null);
    // The owner is untouched.
    assert.equal(await verifySession(await signSession("owner", env), env), "owner");
  }
});

test("no secret: nothing signs and nothing verifies", async () => {
  const env = { ...ENV, SITE_GATE_SECRET: "" };
  assert.equal(await roleForPassword("owner-pw", env), null);
  assert.equal(await signSession("owner", env), null);
  assert.equal(await verifySession(await signSession("owner", ENV), env), null);
});

test("the cookie carries its role and verifies as that role", async () => {
  const owner = await signSession("owner", ENV);
  const viewer = await signSession("viewer", ENV);
  assert.match(owner, /^owner\.\d+\.[0-9a-f]{64}$/);
  assert.match(viewer, /^viewer\.\d+\.[0-9a-f]{64}$/);
  assert.equal(await verifySession(owner, ENV), "owner");
  assert.equal(await verifySession(viewer, ENV), "viewer");
});

test("the role is inside the signature: a viewer cookie relabelled owner fails", async () => {
  const viewer = await signSession("viewer", ENV);
  assert.equal(await verifySession(viewer.replace(/^viewer/, "owner"), ENV), null);
  const owner = await signSession("owner", ENV);
  assert.equal(await verifySession(owner.replace(/^owner/, "viewer"), ENV), null);
});

test("an edited expiry, a forged signature, junk and the old role-less format all fail", async () => {
  const now = Date.now();
  const v = await signSession("viewer", ENV, now);
  const [, exp, sig] = v.split(".");
  assert.equal(await verifySession(`viewer.${Number(exp) + DAY}.${sig}`, ENV), null);
  assert.equal(await verifySession(`viewer.${exp}.${"0".repeat(64)}`, ENV), null);
  assert.equal(await verifySession(`viewer.${exp}.${sig.toUpperCase()}`, ENV), null);
  for (const junk of ["", "x", "owner", "owner..", `admin.${exp}.${sig}`, `${exp}.${sig}`, undefined])
    assert.equal(await verifySession(junk, ENV), null, String(junk));
});

test("viewers last 14 days, the owner 30", async () => {
  assert.equal(TTL_MS.viewer, 14 * DAY);
  assert.equal(TTL_MS.owner, 30 * DAY);
  const now = 1_800_000_000_000;
  const viewer = await signSession("viewer", ENV, now);
  const owner = await signSession("owner", ENV, now);
  assert.equal(viewer.split(".")[1], String(now + 14 * DAY));
  assert.equal(await verifySession(viewer, ENV, now + 14 * DAY - 1), "viewer");
  assert.equal(await verifySession(viewer, ENV, now + 14 * DAY + 1), null);
  assert.equal(await verifySession(owner, ENV, now + 29 * DAY), "owner");
  assert.equal(await verifySession(owner, ENV, now + 30 * DAY + 1), null);
});

test("a new viewer password or SITE_GATE_VIEWER_VERSION revokes viewers, not the owner", async () => {
  const viewer = await signSession("viewer", ENV);
  const owner = await signSession("owner", ENV);
  for (const env of [
    { ...ENV, SITE_GATE_VIEWER_PASSWORD: "new-viewer-pw" },
    { ...ENV, SITE_GATE_VIEWER_VERSION: "2" },
  ]) {
    assert.equal(await verifySession(viewer, env), null);
    assert.equal(await verifySession(owner, env), "owner");
    assert.equal(await verifySession(await signSession("viewer", env), env), "viewer");
  }
  // Changing the owner's password leaves sessions alone, as before roles.
  assert.equal(await verifySession(viewer, { ...ENV, SITE_GATE_PASSWORD: "x" }), "viewer");
});

test("the cookie never contains either password", async () => {
  for (const role of ["owner", "viewer"]) {
    const c = await signSession(role, ENV);
    assert.ok(!c.includes("owner-pw") && !c.includes("viewer-pw"));
  }
});

test("viewerBlocked: /tools and /desk/hand-check, nothing else on the desk", () => {
  for (const p of ["/tools", "/tools/", "/tools/anything", "/desk/hand-check", "/desk/hand-check/x"])
    assert.ok(viewerBlocked(p), p);
  for (const p of ["/desk", "/desk/doc/pricing-sheet", "/desk/fed/index.html", "/desk/state/state.html",
    "/desk/feedback", "/desk/hand-checks", "/toolsx", "/free-test"])
    assert.ok(!viewerBlocked(p), p);
});

test("the desk bar has Send feedback only for a viewer, and keeps Sign out last", () => {
  const owner = deskBarHtml("fed");
  assert.ok(!owner.includes("Send feedback"));
  assert.match(owner, /<li class="dk-out"><a href="\/logout">Sign out<\/a><\/li>/);
  const viewer = deskBarHtml("fed", false, "/desk/fed/opps.html");
  assert.match(
    viewer,
    /<li class="dk-out"><a href="\/desk\/feedback\?from=%2Fdesk%2Ffed%2Fopps\.html">Send feedback<\/a><\/li><li><a href="\/logout">Sign out<\/a><\/li>/,
  );
  assert.equal(viewer.match(/dk-out"/g).length, 1);
});

test("the read-only page is polite, links the desk and feedback, and escapes the path", () => {
  const html = readOnlyHtml('/tools/"><script>x</script>');
  assert.ok(html.includes("<h1>Read-only access</h1>"));
  assert.ok(html.includes('href="/desk"'));
  assert.ok(!html.includes("<script>x</script>"));
  assert.ok(html.includes("/desk/feedback?from=%2Ftools%2F%22%3E%3Cscript%3Ex%3C%2Fscript%3E"));
});

test("feedbackPath keeps desk paths and turns anything else into /desk", () => {
  for (const p of ["/desk", "/desk/doc/pricing-sheet", "/desk/fed/opps.html", "/desk/state/docs/a-b.html"])
    assert.equal(feedbackPath(p), p);
  for (const p of ["", "/", "/tools", "https://evil.example/desk", "//evil.example", "/desk/../tools",
    "/desk/<b>", "/desk?x=1", "/deskx", "/desk/" + "a".repeat(400)])
    assert.equal(feedbackPath(p), "/desk", p);
});

test("the feedback email names the page, keeps the comment, and escapes HTML", () => {
  const m = buildFeedbackEmail("/desk/doc/regime-cheat-sheet", "Line one <b>\r\n\r\nLine & two", "  Pat   Lee ");
  assert.equal(m.subject, "[desk feedback] /desk/doc/regime-cheat-sheet");
  assert.equal(
    m.text,
    "Page: https://brianbeals.com/desk/doc/regime-cheat-sheet\nFrom: Pat Lee\n\nComment:\nLine one <b>\n\nLine & two",
  );
  assert.ok(m.html.includes("<div>Line one &lt;b&gt;</div><div>&nbsp;</div><div>Line &amp; two</div>"));
  assert.ok(!m.html.includes("<b>"));
  const anon = buildFeedbackEmail("javascript:alert(1)", "hi", "");
  assert.equal(anon.subject, "[desk feedback] /desk");
  assert.ok(anon.text.includes("From: (a read-only desk viewer, no name given)"));
});

test("the feedback rate limit refuses the sixth note in an hour", () => {
  const limited = rateLimiter(5, 60 * 60_000);
  const results = Array.from({ length: 6 }, () => limited("1.2.3.4"));
  assert.deepEqual(results, [false, false, false, false, false, true]);
  assert.equal(limited("5.6.7.8"), false);
});
