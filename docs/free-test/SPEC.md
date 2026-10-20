# Free Test: spec (amended 2026-10-17)

Source: Claude Docs "Free Test: n8n Workflow Spec" (2026-10-17), amended to fit the existing stack. Where this file and the Docs version differ, this file wins.

**Public repo rule.** This spec lives in the public brianbeals.com repo. Prospect and client names,
and their findings, never go in it, its commits, or its PR text; they live in the private a11y-audit
repo, findings under its gitignored `clients/`. A sample site here is "a Southwest Florida city" or
"a Florida health center", with no figures quoted from it.

**Counts only (standing rule, 2026-10-17).** The free report gives counts. It never names an
individual PDF, never ties a failure to a specific page or element, and never says how to fix
anything. The only URLs in it are the "Pages checked" list and the call link; pages not checked are
counted, not listed. The engine's test suite (a11y-audit `tests/test_free_test_emails.py`) fails
if a report body holds any PDF filename or URL, or any page URL outside "Pages checked".

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
2. **Pages**: recon mode, same registrable domain, up to 10 pages checked, front doors first (amendment 18: the home page, then links that name a form, an application, a payment, a permit, registration, intake or new patients, then patients, contact or documents, then the rest with nav links first), **robots.txt honored under BrianBealsLLC-A11y, each host's own file, at least 1.5 seconds between pages (longer if Crawl-delay says so)**, matching /scanner.
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
- `/free-test/sample` (2026-10-20): a sample report for the fictional City of Example, FL (example.org), population over 50,000, made-up numbers, linked from the /free-test intro by one link: a 220px thumbnail of the report's top (header, banner, deadline, impact table; `alt=""`) above the text "See a sample report", which is the link's name, right of the intro from 640px and under it at 60% width below that. The report is the a11y-audit template's own output (`free_test/emails.py` `report_parts`), written to `app/free-test/sample/report.ts` by `scripts/build_free_test_sample.py`, which also screenshots the thumbnail (`public/thumbs/free-test-sample.png`, Playwright's Chromium, light mode); rerun it after a template change. Rebuilt 2026-10-20 for the BB header mark (a11y-audit 1d36c83). Off with the flag like the other routes.

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
    ends `no_pages` with the reason. It never produces a report saying nothing failed. After the
    one retry the submitter gets one automatic note, sent without review: "Our automated check
    couldn't reach your site, which happens when a firewall screens out automated browsers. I'll
    follow up personally within two business days." Brian gets a note with the status code,
    flagged as a warm lead.
12. **Partial scans.** When the 180-second cap hits after at least one page was checked, the
    pages and PDFs that finished are kept and the report says "Partial: N pages, M documents
    checked" with a plain note that the test stops after three minutes. It goes through the
    review gate like any other report; it is not retried. A job cut off before any page finished
    is a timeout and is retried once.
13. **Report copy and HTML (2026-10-17, replaces Run 8's footer).** Two forms: clean (no automated
    finding anywhere) and findings (a headline count, counts by impact, the top three issues, only
    the nonzero PDF checks, a note when contrast leads with more than 50 instances, and a sentence
    that off-site PDFs linked from the site count as part of it). Both say "the first N pages it
    reached" and close with "Automated tools test only part of what WCAG 2.1 AA requires. These
    need a person:", a five-item list, and the call; "My free recon" is gone. Every email is
    multipart, plain text plus HTML from the same content, and the HTML passes axe-core (WCAG 2.1 A
    and AA) in light and dark in the engine's test suite.
14. **Daily cap backstop (2026-10-17).** When the daily cap holds a confirmed request, the
    submitter is emailed once, right away: "Today's free checks are full, so yours is in line and
    will run within 24 hours. You'll get the results by email. If you'd rather not wait, book a
    15-minute call and I'll look at your site with you." with the call button. `/free-test` itself
    doesn't know the cap is full; the site keeps no state and nothing reaches the mini. **Build the
    status file when held requests show up on 3 or more days in a week:** the engine writes "full
    until <time>" to the private desk repo (a fine-grained token, Contents read and write on
    brianbeals/desk only), and the page reads it and shows "Today's free checks are full" with the
    call button in place of the form. Brian's "global limit reached" note marks each day it happens.
15. **Organization type and the call button (2026-10-17).** The form adds one optional dropdown,
    "What kind of organization?": City or county, School district or college, Health center or
    hospital, Federal agency or contractor, Other. It is stored with the submission and shown in
    Brian's review draft. When set, the report (HTML and plain text) adds one line under the
    result banner: "Your deadline: ADA Title II, April 26, 2027 (population 50,000 or more) or April
    26, 2028." (city, county, school district, college); "Your deadline: Section 504, May 11, 2027 (15 or more
    employees) or May 10, 2028." (health center or hospital); "Your standard: Section 508, in force
    now." (federal). Other or blank adds nothing. The report's call button reads "Book a 15-minute
    call to go over these results" and wraps inside its box at 320px. On the home page the free
    test is the primary button while it is on, and the call is the outlined second.
16. **Report trims and a blocklist (2026-10-17).** The scanner's own measurements are one line,
    "Also found: <count> <plain name> (<WCAG ref>)", in place of their heading and list, with no
    page counts or worst ratio. "Not checked" is a count. The engine keeps a list of blocked domains
    (a11y-audit `free_test/config.py` `BLOCKED`, each with a reason, until Brian lifts it): a
    request for one or any subdomain is filed to Rejected, nothing is stored or sent to the
    submitter, Brian gets a "Free Test:" note, and the log records the reason.
17. **The WebAIM line (2026-10-18).** /free-test carries one line under the H1: "95.9% of the
    web's top million home pages fail automated accessibility checks (WebAIM, 2026). See where
    yours stands." with "WebAIM, 2026" linked to https://webaim.org/projects/million/ (same tab).
    Refresh the figure and the year each spring, when WebAIM publishes the new Million report
    (usually March). The line names the year so it never reads as current when it isn't.
18. **Front doors first, and the crawl gaps (2026-10-18).** The 10 pages are chosen for the pages
    people come to use. The home page; then priority links on the host the person entered (or the
    one its home page redirects to): a strong word in the link text (form or forms, apply,
    application, pay, payment, permit, register, registration, intake, new patient), then a strong
    word in the address, then a weak word (patient, contact, documents) in the text, then in the
    address, ties in the order found. Words match whole, so "taxpayer" and "information" don't
    count. At most two priority pages from one site section (the first path segment). One step
    out: a strong link found on a priority page joins the priority list; a page reached that way
    adds no more. The rest are filled in the old order, nav links first, breadth first. Another
    subdomain's links fill only. In the same change: a page whose redirect leaves the registrable
    domain is never requested there and is counted under "Not checked" as redirecting to another
    site; pages are deduped on the address they land on, then on their canonical link (same site
    only, and not when a page other than the home page names the home page), then on an exact
    match of title and main text, and a duplicate neither uses a slot nor counts toward the
    section cap; a section ignores a trailing page extension, dot or no dot; a page that is off-site, a duplicate,
    skipped by robots.txt or dead (4xx, 5xx, no answer, over the page cap) doesn't use a slot, and
    the next candidate is tried inside the 180-second job cap; robots.txt is read per host, so a
    subdomain answers for itself; and per RFC 9309 a robots.txt that answers 5xx or can't be
    reached disallows that host, while a 4xx or missing one allows it, as before. The report
    says what it checked in that order: "It checked 10 pages, starting with forms, payment, and
    contact pages, and 5 PDFs linked from them," or "starting with the home page and its main
    menu" when the site has no such pages, and the limits list says "Pages beyond the 10 checked
    here".
19. **Why no page was checked, and the subjects (2026-10-18).** A `no_pages` result says why. When
    the home host's robots.txt was read and keeps the scanner out (`Disallow: /` for
    BrianBealsLLC-A11y or for every robot), the submitter's note reads: "Your site's robots.txt
    asks automated scanners not to visit, so the check didn't run. If you'd like the free check,
    your web team can allow our scanner; the details are at brianbeals.com/scanner. Or book a
    15-minute call and I'll look at your site with you." It promises no follow-up and names no
    firewall. The firewall note in item 10 stays for a site that refuses the scanner and for a
    robots.txt that answered 5xx or couldn't be reached, and it now carries the call button too.
    Brian's warm-lead note says which case it was. That note, the held note, and the robots.txt
    note are titled "Your free accessibility check of <domain>", the domain as the request gave
    it: no scheme, and "www" only if the request had it.
20. **Texts to Brian, the watchdog, and the approval path (2026-10-18).** Every alert text comes from
    the Lobo iMessage account through the mini's `notify-lobo.sh`, never Brian's own Apple ID (a
    text to himself arrives silent and already read); that covers the Free Test, the n8n Error
    Notifier, and Repo Watch. No text carries a link or the requester's address. The engine texts
    "Free Test: review ready for <domain>. Approve from email." with each review draft, and with
    each warm lead "Free Test: <domain> couldn't be scanned. Follow up within 2 business days."
    or "Free Test: <domain> blocks scanners in robots.txt." A watchdog on its own 5-minute
    schedule, with no engine lock, reads only the arrival times in Free Test Requests: a message
    waiting more than 10 minutes, or the folder unreadable that long, sends one email and one
    text, "Free Test engine may be down.", until it clears. An unapproved review draft gets one
    reminder text at 4 hours and one at 24, from 8 AM to 9 PM only. Nothing alerts while n8n or
    the mini itself is down. The approval path: the link opens a page on Vercel and changes
    nothing; its button posts to a server action that checks the link's signature and sends a
    signed `[free-test] approved` email through Resend; Proton's server-side filter files it in
    Free Test Requests; Bridge on the mini serves it over IMAP and the next tick sends the
    report. It works from any network, since only Vercel and Proton are involved at the click.
    With the mini or Bridge down, the click still succeeds and the approval waits in Proton;
    the report goes when the engine reads it, if that is within 24 hours (signatures older are
    refused as stale; the link doesn't expire, so a second click sends a fresh approval).

**Blocked egress address (recorded 2026-10-17).** A Southwest Florida city's CDN (Akamai) refuses every
request from the home internet address, including a normal browser with a default user agent;
other sites on the same CDN load. The Mac mini shares that address, so a free test of that site
from the mini fails the same way, and so would a paid engagement's scan. The fix, before the
first paid engagement: a static IP from the ISP, plus the allowlist kit on /desk sent to the
client's IT contact. Nothing in the free test or the scanner tries to get around a block.
11. **Report additions.** The document findings add recon's tag-tree checks (images with no text
    alternative, more than one page and no headings, tables with no header cells) and use recon's
    no-text-layer test. The skip link is counted on every page checked. The scanner's own
    measurements (text contrast against a solid background, images with no alt attribute, no page
    language) are reported for pages where axe found nothing for that rule, so nothing is counted
    twice; on a Southwest Florida city's site, axe passed contrast failures that this measurement caught.

**Build step 3 (2026-10-17).** The confirm and approve links open a page with a button, and only
the button sends the signed event: mail security scanners open every link in a message, and a GET
that confirmed would start tests nobody asked for. Turnstile failure is the one intake answer that
differs (the person has to retry); everything after it is the same "Check your email". The flag
gates every route (404 when off) and the /scanner, sitemap and site map mentions. Local runs write
events to a folder the engine reads (`FREE_TEST_OUTBOX`, refused on Vercel).

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
Vercel, never the IP, and when given `org` and `ref`, the page's `?ref=` source slug, 2026-10-19), `confirmed` (data: `token`, the raw token from the link) or `approved`
(data: `job`). The engine rejects a missing block, a bad signature, a timestamp older than 24
hours or more than 5 minutes ahead, and an id it has seen before, and moves the message to
Rejected. Approve links are `/free-test/approve?id=<job>&sig=<hex HMAC-SHA256 of "approve:<job>">`;
Vercel checks the link's signature before it sends the `approved` event.

