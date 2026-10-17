New project: the brianbeals.com Free Test. Read docs/free-test/SPEC.md in ~/Code/brianbeals.com first; it is the spec (amended 2026-10-17, email-folder intake) and wins over any earlier version, including the Claude Docs draft.

Non-negotiables:
- Reuse the existing scanner in ~/Code/a11y-audit (scan.py recon mode, pdf_probe.py recon mode, the single BrianBealsLLC-A11y token). No second scanner, no new User-Agent. Pace and robots behavior exactly as published on /scanner.
- WCAG 2.1 A/AA only.
- Pages AND up to 10 linked PDFs per job.
- Email through Resend (forms.brianbeals.com), same patterns as lib/form-mail.ts.
- Intake is the Proton folder "Free Test Requests" read by n8n over IMAP from the Mac mini. Nothing on the mini accepts inbound connections. Every request/event email is HMAC-signed with timestamp + unique id; n8n rejects unsigned, bad, stale or replayed messages.
- FREE_TEST_ENABLED stays false; not in the header nav.
- Another Claude Code session is working in ~/Code/brianbeals.com. Keep to new files (free-test routes, form, docs/free-test/), pull before committing, stop and tell me on any conflict.

Start with:
1. Open questions, with sources: Vercel Hobby terms for a commercial site; where Proton Bridge runs today and whether it can run headless on the Mac mini next to n8n; whether the Proton filter/folder can be created programmatically or I need to do it in the web UI (if the latter, give me exact steps).
2. Build step 1: the scanner job wrapper with all caps (pages + PDFs, 2.1 tags, pace, robots, SSRF guard on every fetch and redirect) and its tests, on the MacBook Pro.
3. Stop and report before building the n8n workflow: what you built, test results, and anything in the spec that doesn't fit the code.

Commit SPEC.md and this KICKOFF.md if they aren't already, plus your work, and push. Create the private repo brianbeals/free-test when you reach build step 4.
