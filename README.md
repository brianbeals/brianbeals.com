# brianbeals.com

Source for [brianbeals.com](https://brianbeals.com), my personal site and writing.

## What's here

The home page leads with the Brian Beals, LLC accessibility practice (service cards linking into `/accessibility`, the proof with a cropped sample of the conformance report's results table, `public/conformance-report-sample.png`, re-cropped by a11y-audit's `scripts/report_sample.py` at every report regen, who does the work and the timeline, then the AI practice in one sentence and the projects built in public one line each; no hero image, and the headshot sits in the who-does-the-work block). The full AI paragraph and project write-ups are on `/about`; both pages read the projects from `app/projects.ts`. The main nav reads Home, Services (`/accessibility`), Capability Statements (`/documents`), Writing, About, Contact; the "elsewhere" travel page is off the nav and linked from the bottom of About and from the site map. A writing section at [`/writing`](https://brianbeals.com/writing) holds my essays. An [`/accessibility`](https://brianbeals.com/accessibility) section carries the Brian Beals, LLC conformance-report practice, with its federal Section 508, Maryland and healthcare pages, the fixed prices at `/accessibility/pricing` and the pre-engagement requirements with their printable readiness checklist at `/accessibility/before-we-start` (both ported 2026-10-15 from the approved print documents in iCloud `LLC/FL-VBE/Accessibility-Practice/`, the pricing page shows "from" prices only, since full ranges, document bands, hourly and unit rates stay private (decided 2026-10-15); the readiness checklist is a form since 2026-10-15: a server action in `app/accessibility/before-we-start/actions.ts` emails each submission to brian@brianbeals.com through Resend, from `readiness@forms.brianbeals.com` with Reply-To set to the submitter, and stores nothing, with no database, no log of the answers and no copy to the submitter. `RESEND_API_KEY` is a Vercel Production secret, read only in that file; a build without it renders the checklist for printing with an email-it line instead of the send button, so set the key and redeploy. Spam guards are a honeypot (a meaningless field name with no label, so AutoFill leaves it alone), a five-second minimum fill time and an in-memory per-IP limit of five sends in ten minutes, which resets on a cold start. A tripped honeypot or timer never drops a submission: it still sends, with `[check: <reasons>]` at the front of the subject, because Safari AutoFill once tripped both and a real checklist vanished. Only the rate limit refuses, and it says so on the page. The email body is one `Label: answer` line per item with a blank line between sections, in both the text and HTML parts (`email.ts`). `READINESS_DRY_RUN=1` skips the send for local checks and must never be set on Vercel. Printing gives the blank checklist on one letter sheet, or after a send the submitted answers on one sheet. No printout of any page carries the site footer, because the footer holds the SBA certification mark and SBA's terms bar letterhead use), and the capability statements at `/documents`. The six HTML statements under `public/` are listed in the XML sitemap (`app/sitemap.ts`) and each footer links the human site map at `/sitemap-page`, so they sit inside the site's own conformance evaluation like any other page. Their PDFs (`public/Brian-Beals-LLC-*.pdf`) are letter-size renders from `render_print_pdf.py` in the LLC Business Plan folder, run through the onepage-pdf renderer's `finalize_accessibility` post-pass, which is what makes them PDF/UA-1 conformant; the print renderer alone emits untagged backgrounds and footers that veraPDF fails. The current conformance report is `public/conformance-report.html`; a superseded one moves to a dated address, like `/conformance-report-2026-08-30.html`, `/conformance-report-2026-10-08.html`, `/conformance-report-2026-10-10.html` and `/conformance-report-2026-10-11.html`, with a superseded notice, and stays in both site maps so the next report's citation resolves. Closed briefs move to `docs/history/`. Every HTML page under `public/` is in the sitemap; research briefs and account reports are not published here (the `/r/` pages were removed 2026-10-10). The only unlisted files are working assets: `bimi-logo.svg` (named by the BIMI DNS record), `bb-mark.png` (email signatures), `sba-sdvosb-certified.png` (SBA's VetCert SDVOSB icon, a byte-for-byte copy of the file in iCloud `LLC/brand/certification-marks/`, shown in every page's footer and in the firm block on `/accessibility` through `app/components/SbaMark.tsx`; it comes down the day the certification lapses), the Google Search Console verification file, and `voice-critique-prompt.txt`. The tools area under `/tools` is password-gated, except [`/tools/voice-critique`](https://brianbeals.com/tools/voice-critique), which is public.

## The private desk

`/desk` is a gated quick reference for research and live phone calls: pricing (a phone summary, unit rates, the full fixed-fee ranges, healthcare, vendor ACR, and the pricing method), before-we-start, recon, which rule and which date, the pitch, and the IDs buyers ask for. One login covers everything private: `middleware.ts` gates `/desk` and `/tools` (except the public `/tools/voice-critique`) with the signed cookie from `/login` (`SITE_GATE_PASSWORD`, `SITE_GATE_SECRET`), and every desk route checks the cookie again itself. Signed out, desk pages redirect to `/login` and data files answer 401. The login's default destination is `/desk`, and it only follows a `next` that is a path on this site. `/desk` is noindex, in neither sitemap, and linked from no public page.

**None of the desk's content is in this repo, which is public.** `lib/desk.ts` reads it at request time from private repos with `DESK_GH_TOKEN`, a fine-grained read-only token (Contents: read on `desk`, `fed-intel` and `state-intel`) stored as a Vercel secret, and caches each read for two minutes:

- `/desk` renders `desk.html` from `brianbeals/desk`, and `/desk/doc/<slug>` serves the full source documents from its `docs/`. That repo's README maps each section to its source file in iCloud `LLC/FL-VBE/Accessibility-Practice/`.
- `/desk/fed/<file>` serves the four fed-intel modules and `partners.json`, `status.json` and `a11y-market.json` from `fed-intel` `main`, by an allowlist of names. `/desk/fed` opens Module 1.
- `/desk/state/<path>` serves state-intel's built site from its `dashboard` branch, which that repo's Action force-pushes on every run. `/desk/state` opens `state.html`.

Without the token every desk route says it is not connected and shows nothing. The value is trimmed, and if it is not a single `github_pat_` or `ghp_` token the desk says "DESK_GH_TOKEN is malformed; re-paste it in Vercel" rather than GitHub's raw error (terminal output once got pasted in with it); a token GitHub refuses gets a plain message too, and the value is never shown or logged.

Every desk page carries the desk's own bar at the very top (`lib/desk-bar.ts`): Desk · Pricing · Before we start · Recon · Rules & dates · State · Fed · Sign out, with the current section marked `aria-current="page"`. On `/desk` it replaces the public site menu and skip link (hidden by `globals.css` when the bar is present), so the desk reads as a different place. The source documents and the dashboards are built HTML, so the bar is injected where `/desk` serves them, after the page's own skip link or with one of its own; the dashboards' builds are unchanged. It wraps at 320px, has visible focus, works in dark mode and is hidden in print. **Sign out** is `/logout`, which clears the gate cookie and lands on the public home page. For a local check without a token, serve the three clones over HTTP from a scratch folder (`python3 -m http.server 8765 --bind 127.0.0.1`) and start the site with `DESK_LOCAL_URL=http://127.0.0.1:8765`; never set it on Vercel. Account Intel, the tool the gate was first built for, was retired on 2026-10-15 with its `/api/account-intel` routes; its scope note is in `docs/history/`.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Hosted on Vercel, DNS at Namecheap.

## Local dev

```bash
npm install
npm run dev
```

Site runs at `http://localhost:3000`.

## Deploy

Pushes to `main` auto-deploy via Vercel. There is no staging gate and no date gate: whatever lands on `main` is public within about a minute. The `publishedTime` and `datePublished` values on an essay page are display text and JSON-LD only. They control nothing.

## Publishing an essay on a schedule

Essays ship on a two-week Saturday cadence, and they go out automated. Never push a finished essay straight to `main` ahead of its slot; that publishes it immediately, carrying a date in its own future.

The routine is a one-shot workflow plus a branch:

1. **Arm the scheduler on `main`.** Add `.github/workflows/publish-essay-NN.yml` with a `schedule` cron for the target date and `workflow_dispatch` as the manual fallback. Commit it to `main` on its own.
2. **Build the essay branch from that `main`.** Branch name `essay-NN-slug`. It carries the new `app/writing/<slug>/page.tsx`, the new entry at the top of the `app/writing/page.tsx` array, and a `git rm` of the workflow file added in step 1.
3. **Wait.** On the cron the workflow merges the branch into `main`, which publishes the essay and removes the scheduler in the same commit. Nothing is left behind to fire twice, and there is nothing to clean up.

Two things that have bitten this routine:

- **Schedule a few minutes past the hour.** Essay 6's cron was `0 13 25 7 *` and GitHub dropped it outright; top of the hour is the heaviest window on Actions and scheduled jobs there are shed first. That publish had to be fired by hand from the Actions tab. Use `:07` or similar. Actions cron is best-effort regardless: essay 10's `:07` cron still fired 3h16m late on September 19. Arm a second cron 30 minutes later as a backup (the merge is idempotent) and treat `workflow_dispatch` as the reliable path. The n8n essay dispatcher in the `n8n-automation` repo finds any armed `publish-essay-NN.yml` on `main` and dispatches it.
- **Never cut the essay branch from a reverted commit.** If a publish commit was reverted on `main`, that commit is already an ancestor of `main` and merging a branch containing it does nothing at all. Branch from current `main` and re-apply the files as a fresh commit (`git checkout <publish-sha> -- app/writing` is the simplest way).

Because the workflow deletes itself on every publish, `.github/workflows/` is normally empty between essays. An empty workflows directory is the expected resting state, not a sign the routine was lost. This section is the durable copy of the routine; the workflow file is disposable.

---

<img src="https://raw.githubusercontent.com/brianbeals/brianbeals/main/assets/bb-mark.png" alt="BB" width="16" valign="middle"> © Brian Beals · brianbeals.com
