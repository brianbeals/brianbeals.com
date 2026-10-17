# Free Test: spec (amended 2026-10-17)

Source: Claude Docs "Free Test: n8n Workflow Spec" (2026-10-17), amended to fit the existing stack. Where this file and the Docs version differ, this file wins.

## Purpose and position

An automated, no-cost first look at a public entity's website and linked documents, requested by someone with an email address on that site's domain. It sits before the existing free recon (4 to 6 pages, done by Brian) and the paid Accessibility Conformance Report:

automated free test → Brian's free recon → paid ACR

The report says plainly that automated testing covers only part of WCAG 2.1 AA and is not a conformance determination.

## Architecture (amended)

| Component | Runs on | Job |
|---|---|---|
| Form + `/api/free-test` route | Vercel (brianbeals.com) | URL + email, Cloudflare Turnstile, autofill-proof honeypot, generic 200 response. Sends a **signed request email** through Resend to brian@brianbeals.com. No database on Vercel. |
| Request folder | Proton Mail (brian@brianbeals.com) | **Created 2026-10-17.** Folder **Free Test Requests** with subfolders **Processed** and **Rejected** (notifications off on both). Filter "Free Test requests to Free Test Requests" (enabled): subject **begins with `[free-test]`** AND sender **contains `freetest@forms.brianbeals.com`** → move to Free Test Requests, not marked read. Every request/event email MUST be sent From `freetest@forms.brianbeals.com` with a subject starting `[free-test]` or the filter won't catch it. This folder is the queue. |
| Intake + run workflow | n8n on the Mac mini | **Reads the Free Test Requests folder over IMAP** (Proton Bridge on the mini, outbound only) every 2 minutes. Verifies each message's signature, then normalize, validate, gate, rate-limit, confirmation email, queue, scan, review, send. Marks each processed message read and moves it to `Free Test Requests/Processed`. |
| Confirm / approve links | Vercel routes | `/free-test/confirm?token=…` and `/free-test/approve?id=…&sig=…` each send a signed event email (`[free-test] confirmed …` / `[free-test] approved …`) into the same folder; n8n picks it up on its next read. |

**Signed messages (required).** Anyone can send email to the folder, so n8n acts only on messages whose body carries a JSON payload with an HMAC-SHA256 signature over the payload (shared secret held by Vercel and n8n only), a timestamp no older than 24 hours, and a unique id (replay protection in SQLite). Unsigned, bad-signature, stale or replayed messages are moved to `Free Test Requests/Rejected` and never acted on. The From address alone is never trusted.
| Scanner | Mac mini, existing **~/Code/a11y-audit** scanner in recon mode | Reuse scan.py and pdf_probe.py. Same BrianBealsLLC-A11y User-Agent token from scan.py. No second scanner, no new User-Agent. |
| State store | Mac mini, SQLite | Submissions, rate-limit counters, cached reports. |
| Email | **Resend** (forms.brianbeals.com, already verified) | Confirmation, review draft to Brian, final report. Reuse lib/form-mail.ts patterns where it fits. |

No part of the mini is reachable from the internet: n8n only makes outbound connections (IMAP via Proton Bridge, Resend API). If Proton Bridge can't run on the mini alongside n8n, stop and propose an alternative before exposing anything.

## Intake and gating (unchanged in intent)

1. Normalize: lowercase, reduce URL to origin, punycode, registrable domain via the public suffix list.
2. Validate: http/https only, no IP literals, ports 80/443, resolve DNS and reject private, loopback, link-local, CGNAT (100.64/10), IPv6 ULA.
3. Domain match: email's registrable domain must equal the site's. Free-mail domains always fail. On mismatch: note to Brian ("manual review requested"), short reply to the submitter offering a call, stop.
4. Rate limits (one config block): fresh scan per registrable domain 1 per 30 days (send cached report); per email hash 3 per 30 days; per salted IP hash 5 per 24 hours; global 25 scans per 24 hours (hold, notify Brian); unconfirmed tokens expire in 24 hours. Store hashes, never raw IPs.
5. Confirmation email with a single-use token (32 bytes, stored as SHA-256). No scan until confirmed.
6. Every intake path returns the same generic response.

## Run

1. One scan at a time from the queue.
2. **Pages**: recon mode, same registrable domain, up to 10 pages (nav links first), **robots.txt honored under BrianBealsLLC-A11y, at least 1.5 seconds between pages (longer if Crawl-delay says so)**, matching /scanner.
3. **Documents (added)**: up to 10 linked PDFs via pdf_probe.py in recon mode (robots honored), reporting untagged, scanned/no text layer, no title, and form fields without names.
4. Checks: axe-core with **WCAG 2.1 A/AA tags only** (match the ACR standard), plus the skip-link check.
5. SSRF guard at fetch time on every request, including redirects (re-resolve, abort private/loopback).
6. Hard caps: 30 s per page, 180 s per job, no downloads except the capped PDFs, no form submission, no logins, passive only.
7. Failure: retry once after 10 minutes, then email Brian.
8. Report: counts by impact, top 10 issues with WCAG 2.1 criterion, skip-link result, pages and documents checked, the document findings. Fixed footer: automated testing covers only part of WCAG 2.1 AA and is not a conformance determination; Brian's free recon and the full ACR cover the rest. CTA: book a 15-minute call.
9. Review gate (`REVIEW_MODE=true` in Phase 1): draft to brian@brianbeals.com with a signed Approve link; nothing reaches the submitter until approved.
10. Cache the report 30 days; delete submissions and reports older than 180 days nightly.

## Public disclosure

- Add the free test to /scanner (what it fetches, pace, robots behavior, that it runs only after the requester confirms an address on the site's own domain).
- Public page `/free-test` (form) and `/free-test/confirmed`. Not in the header nav until the flag is on.

## Build order

1. Scanner reuse: wrap the a11y-audit recon scan + capped pdf_probe as a callable job with the caps above; test on brianbeals.com and a broken fixture page.
2. n8n workflow (pull, intake, run, review, send) on the MacBook Pro against local n8n, mail to Mailpit.
3. Form, API route, confirm/approve routes in brianbeals.com behind `FREE_TEST_ENABLED=false`.
4. Workflow JSON + job wrapper in a new private repo `brianbeals/free-test`. Claude Code commits and pushes its own work.
5. Deploy to the mini; flag stays off.
6. Turning the flag on is Brian's decision, after the November 3–5 events and his capacity model.

## Acceptance tests

- gmail.com address testing hospital.org → manual review, scanner never called.
- Same domain twice in 30 days → cached report, one scanner call total.
- Sixth submission from one IP in 24 h → generic response, no scan.
- URL resolving to 192.168.x.x, or redirecting to localhost → rejected.
- Unclicked token → expired at 24 h.
- Scanner timeout → one retry, then email to Brian.
- `REVIEW_MODE=true` → nothing to the submitter until Approve.
- All intake paths → identical response body.
- Requests carry the BrianBealsLLC-A11y token and honor robots.txt and the 1.5 s pace.
- Nothing on the Mac mini accepts inbound connections from the internet.

- A request email without a valid signature (or with a reused id) is moved to Rejected and starts nothing.
- No document is fetched beyond 10 PDFs per job; every PDF fetch honors robots.txt and the pace.

## Open before build

- Vercel plan: confirm current Hobby terms for a commercial site; Pro if required.
- Proton Bridge on the Mac mini: confirm it can run headless alongside n8n (it's already used for IMAP elsewhere; check where), and that the Free Test Requests folder and filter can be created in Proton (Brian creates the filter if it needs the web UI).

## Amendments, 2026-10-17 (after build step 1; accepted by Brian)

These win over anything above that they contradict.

1. **PDFs.** The job uses `pdf_probe.py`'s analysis (`pdf_probe.probe`) and its robots.txt reader
   (`pdf_probe.Robots`, asking as BrianBealsLLC-A11y), but fetches each PDF itself through the SSRF
   guard, capped at 20 MB. `pdf_probe.py`'s own fetch retries a refused PDF through a browser
   outside the guard and has no size cap, so the job never calls it.
2. **Unnamed PDF form fields** are counted by the job with pikepdf (a fillable field with no `/TU`
   accessible name); `pdf_probe.py` reports only whether a form exists.
3. **Page order.** The job picks its own pages: the home page, then same-site links from the
   header and navigation in page order, then the rest of the page. Recon's `sample_pages` prefers
   forms and content pages and is not used.
4. **Downloads.** axe-core is bundled (a11y-audit `vendor/axe-core-4.10.2`, SHA-256 recorded
   there) and served to the browser by the job, so a scan never contacts cdnjs. A scan still loads
   each page's own images, scripts and styles, as any browser does; every one goes through the
   guard. Nothing else is downloaded except the capped PDFs.
5. **Retry.** The job returns `ok`, `timeout`, `error` or `no_pages`; the one retry after 10
   minutes and the email to Brian after it are the workflow's.
6. **Mac mini packages** for build step 5: Playwright with its Chromium, pikepdf, tldextract (it
   uses its bundled public suffix list, no fetch at run time).
7. **IMAP folder names.** Proton Bridge usually shows custom folders to IMAP under `Folders/`
   (`Folders/Free Test Requests`, `Folders/Free Test Requests/Processed`, `.../Rejected`). The
   names are configuration, and `engine.py check-imap` lists the folders on the mini before the
   workflow is turned on.

**Validation against recorded recons (2026-10-17, before step 3).** Run on two sites with known
failures; these amend Run 3, 6 and 8:

8. **Off-site PDFs.** A PDF linked from a checked page and hosted elsewhere (a Florida health center
   keeps every PDF on its site builder's CDN) is fetched for the document check only, by its
   own address, through the guard, paced, after that host's robots.txt is asked; no page on that
   host is loaded. Same-site and listed vendor documents fill the 10-PDF cap first, the report
   names the host, and an unknown host counts only when its link ends `.pdf`.
9. **Extensionless document addresses.** CivicPlus serves PDFs from
   `/home/showpublisheddocument/<id>/<stamp>`; the job uses a11y-audit's shared document patterns,
   and the bytes decide. A candidate that turns out not to be a PDF is set aside and doesn't count.
   At most 15 document fetches per job.
10. **No pages.** A job where axe ran on no page (a Southwest Florida city's CDN answered 403 to every request)
    ends `no_pages` with the reason: retried once, then Brian is emailed, and the submitter gets
    no report. It never produces a report saying nothing failed.
11. **Report additions.** The document findings add recon's tag-tree checks (images with no text
    alternative, more than one page and no headings, tables with no header cells) and use recon's
    no-text-layer test. The skip link is counted on every page checked. The scanner's own
    measurements (text contrast against a solid background, images with no alt attribute, no page
    language) are reported for pages where axe found nothing for that rule, so nothing is counted
    twice; on a Southwest Florida city's site, axe passed contrast failures that this measurement caught.

**Proton Bridge on the mini (decided):** the mini stays as it is: FileVault on, no auto-login.
Bridge runs in Brian's logged-in session, so after a restart nothing can be read until he logs
in. When the IMAP read fails, the workflow emails Brian once an hour until it recovers: "Free
Test intake: can't reach Proton Bridge on the mini; log in to restore."

**Vercel:** Brian checks the plan and upgrades to Pro if it is on Hobby. Nothing in the build
changes billing.

**Senders:** every request and event email is sent From `freetest@forms.brianbeals.com` with a
subject beginning `[free-test]`, or the Proton filter will not file it. That address is added as
a Resend sender on the verified forms.brianbeals.com domain when the form is built (step 3).

**Workflow shape (build step 2).** The n8n workflow is a scheduler and an alarm: every 2 minutes
it runs `engine.py tick`, nightly `engine.py retention`, and it hands failures to the existing
Error Notifier. The intake, the signature check, the gates, the rate limits, the queue, the scan,
the review gate, the cache and the IMAP alert are one Python engine with its own tests, which is
how the mini's other n8n workflows already call code (Execute Command). n8n's IMAP node cannot
move a message to Processed or Rejected, and a signature check, a SQLite rate limiter and the
scanner are easier to hold to the acceptance tests in tested code than in Code nodes.

**Signed message format.** The body's text part carries:

```
-----BEGIN FREE-TEST-----
{"v":1,"type":"request","id":"<uuid4>","ts":<unix seconds>,"data":{...}}
-----END FREE-TEST-----
sig=<hex HMAC-SHA256 of the exact bytes of the JSON line, key FREE_TEST_SECRET>
```

`type` is `request` (data: `url`, `email`, `ip_hash`, the salted HMAC of the client IP computed on
Vercel, never the IP), `confirmed` (data: `token`, the raw token from the link) or `approved`
(data: `job`). The engine rejects a missing block, a bad signature, a timestamp older than 24
hours or more than 5 minutes ahead, and an id it has seen before, and moves the message to
Rejected. Approve links are `/free-test/approve?id=<job>&sig=<hex HMAC-SHA256 of "approve:<job>">`;
Vercel checks the link's signature before it sends the `approved` event.

