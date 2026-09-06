# Account Intel on the Web — Lightest Build Scope

A self-hosted version of the account-intel routine that runs from any browser, on
brianbeals.com, using Brian's own Anthropic key. Portability is the point: if a future
employer blocks Claude, the routine still runs. It also doubles as a working portfolio
piece that demonstrates the AI practice Brian pitches.

This scopes the **lightest tier only**: one skill (account-intel), one gated page, one
API route. Deep account-research and multi-user features are deliberately out of scope
(see the end).

## What it does

Type a company name, get back a structured account-intelligence report rendered in the
browser: Divisions & Revenue, Technology Initiatives (AI / Analytics / Automation /
Cyber), and Key Contacts. Same three sections the Excel skill produces, same research
brief, public sources only.

## Status

Built and shipped. `middleware.ts`, `app/login`, `app/tools/account-intel`, and the
`app/api/account-intel/*` routes (`start`, `status`, `result`, plus a `history` route
added later) are in the repo. The gate is a signed-cookie login form at `/login`, not the
Basic Auth this scope recommended. What follows is the original scope, kept for the
reasoning behind the architecture.

## Site at the time this was written

- Next.js 16.2.4, App Router, React 19, TypeScript, Tailwind v4.
- Hosted on Vercel. Uses `@vercel/analytics`.
- No API routes, no middleware, no auth yet. Clean content site.
- Pages live under `app/` (`about`, `contact`, `writing/*`, `components`, `elsewhere`).

So this is additive. Nothing existing has to change.

## Plan reality: Hobby (free), confirmed

The Vercel account is on the **Hobby** plan. Hobby functions are capped at 60 seconds and
are killed at the cap no matter what, streaming included. A full three-section research run
makes several web searches and routinely runs past that. So the research must not run inside
a Vercel function.

The fix reuses the pattern already running for the sector screener: **run the work in GitHub
Actions.** Actions have no meaningful time limit, the Anthropic key is already a GitHub secret
there, and Actions run Python, so the existing account-intel skill code (openpyxl and all) can
run nearly as-is and produce the real .xlsx, not a JavaScript reimplementation.

## Architecture (Hobby / GitHub Actions worker)

```
Browser (gated /tools/account-intel page)
   │  1. POST { company }
   ▼
Vercel route  app/api/account-intel/start    (<1s: just dispatches)
   │  2. GitHub API workflow_dispatch, passes company as input
   ▼
GitHub Actions  account-intel.yml            (no time limit)
   │  3. Python: Anthropic + web search → HTML report (+ optional .xlsx)
   │  4. uploads report as a workflow artifact
   ▼
Browser polls  app/api/account-intel/status?run=ID
   │  5. when the run is complete...
   ▼
Vercel route  app/api/account-intel/result   (downloads artifact server-side, returns it)
   │
   ▼
Page renders the report in Brian's brand style
```

The Anthropic key lives only as a GitHub Actions secret (where it already is). The browser
never sees it. A separate GitHub token, stored as a Vercel environment variable, lets the
two tiny Vercel routes dispatch the workflow and fetch the artifact. Nothing is committed to
a public repo and no extra storage vendor is needed; the artifact is the handoff.

## Files to add

On brianbeals.com:

| File | Purpose |
|---|---|
| `middleware.ts` | HTTP Basic Auth gate on `/tools/*` and `/api/account-intel/*`. ~15 lines. |
| `app/tools/account-intel/page.tsx` | Client UI: company input, Run button, progress while the Action runs, renders the report. Tailwind, brand palette. |
| `app/api/account-intel/start/route.ts` | Dispatches the GitHub workflow with the company name. Finishes in well under a second. |
| `app/api/account-intel/status/route.ts` | Polls the run's status via the GitHub API. |
| `app/api/account-intel/result/route.ts` | When the run is done, downloads the artifact server-side and returns it to the page. |

In a repo that owns the worker (its own repo, or the existing skills repo):

| File | Purpose |
|---|---|
| `.github/workflows/account-intel.yml` | `workflow_dispatch` with a `company` input; runs the research script; uploads the report artifact. |
| `account_intel_run.py` | The research + build, ported from the account-intel skill. Anthropic SDK + web search; openpyxl for the .xlsx; emits HTML too. |

Environment / secrets (never committed):

- `ANTHROPIC_API_KEY` — GitHub Actions secret. Already set for the screener; reuse or add to the worker repo.
- `GITHUB_DISPATCH_TOKEN` — Vercel env var. A fine-grained token that can dispatch the workflow and read artifacts for the one repo.
- `ACCOUNT_INTEL_USER` / `ACCOUNT_INTEL_PASS` — Vercel env vars for the Basic Auth gate.

Inventory all three in `docs/api-keys.md` (paths only, never values).

## The research run (inside the Action)

- **Model:** Opus or Sonnet, the choice is free now that there's no timeout. Opus for best
  research quality; Sonnet to spend less per run. Recommend starting on Opus since the whole
  point is a high-quality report and cost per run is small.
- **Web search:** Anthropic's server-side web search tool, so the model searches live. No
  separate search vendor needed.
- **Prompt:** the Step 1 research brief from the account-intel skill, returning the three
  sections (divisions, initiatives, contacts) as structured JSON the report renders from.
- **Output:** an HTML report for the page, and optionally the real .xlsx via the existing
  openpyxl code, uploaded together as the artifact.

## The gate

HTTP Basic Auth via `middleware.ts` is the least code for a single user: the browser shows a
native login prompt, caches the credentials, done. A password form that sets a signed cookie
is the nicer-looking alternative at a bit more code. Either keeps strangers off Brian's credit.

## Effort estimate (Hobby / Actions worker, HTML + xlsx)

- Basic Auth gate + env vars: ~30 minutes.
- The three small Vercel routes (dispatch, status, result): ~half a day.
- The Action workflow + porting the research script: ~half to one day, less if it borrows
  heavily from the existing skill code.
- UI page with progress + branded rendering: ~half a day.
- Total: roughly **one to two focused days**, a weekend with polish. Slightly more than the
  Pro-plan version because of the dispatch-and-poll plumbing, but free and more capable
  (no timeout, real .xlsx, Opus on the table).

## Open decisions

1. **Worker repo:** new dedicated repo, or fold the workflow into the existing skills repo?
   A dedicated repo keeps it clean and public-portfolio-friendly.
2. **Model: Opus or Sonnet** in the Action. Recommend Opus now that timeout isn't a constraint.
3. **Output: HTML only, or HTML + .xlsx?** Recommend both, since the Python xlsx code already exists.
4. **Gate: Basic Auth or password form?** Recommend Basic Auth for least code.

## Explicitly out of scope (for now)

- Deep account-research (the long, multi-section HTML report). It can ride the same Actions worker
  later; bring it over once account-intel proves the pattern end to end.
- .xlsx download with full openpyxl-matched formatting.
- User accounts, saved report history, multi-user rate limiting. Single-user tool; not needed
  until other people use it.
