# brianbeals.com

Source for [brianbeals.com](https://brianbeals.com), my personal site and writing.

## What's here

The home page leads with the Brian Beals, LLC accessibility practice (service cards linking into `/accessibility`, the proof, then the AI practice as positioning and the projects built in public). The main nav reads Home, Services (`/accessibility`), Capability Statements (`/documents`), Writing, About, Contact; the "elsewhere" travel page is off the nav and linked from the bottom of About and from the site map. A writing section at [`/writing`](https://brianbeals.com/writing) holds my essays. An [`/accessibility`](https://brianbeals.com/accessibility) section carries the Brian Beals, LLC conformance-report practice, with its Maryland and healthcare pages and the capability statements at `/documents`. The six HTML statements under `public/` are listed in the XML sitemap (`app/sitemap.ts`) and each footer links the human site map at `/sitemap-page`, so they sit inside the site's own conformance evaluation like any other page. Their PDFs (`public/Brian-Beals-LLC-*.pdf`) are letter-size renders from `render_print_pdf.py` in the LLC Business Plan folder, run through the onepage-pdf renderer's `finalize_accessibility` post-pass, which is what makes them PDF/UA-1 conformant; the print renderer alone emits untagged backgrounds and footers that veraPDF fails. The current conformance report is `public/conformance-report.html`; a superseded one moves to a dated address, like `/conformance-report-2026-08-30.html`, and stays in both site maps so the current report's citation resolves. The tools area under `/tools` is password-gated, except [`/tools/voice-critique`](https://brianbeals.com/tools/voice-critique), which is public.

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
