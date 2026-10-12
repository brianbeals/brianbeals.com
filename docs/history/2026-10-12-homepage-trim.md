# Home page trim: half a page shorter, one image

Decided 2026-10-12. The top of the home page (lede, dates, "I do not sell remediation",
services, the federal pointer, Proof, "Who does the work") stays as it is. The back half
is for a different reader and gets compressed; the prose it loses moves to /about. One
image is added, in Proof, and it is evidence rather than decoration. Nothing in the
nav, metadata, OG card, or the top half changes.

## 1. Proof: add the one image

A cropped screenshot of the live conformance report, `public/conformance-report.html`,
showing part of the WCAG results table: a few rows of criterion number, name, verdict,
and the start of a remarks cell. The crop should read as a real table, not a hero: about
1200 by 500 source pixels, rendered at the content column width, light theme, no browser
chrome, no cursor. Save as `public/conformance-report-sample.png` (and a 2x for retina
if the Image component wants it). Use `next/image` with explicit width and height.

Alt text is a description, not a caption: "A section of the conformance report's WCAG
results table: criteria 1.3.1, 1.4.3 and 2.4.4 with their verdicts and remarks" (adjust
to whatever rows the crop shows). It links to `/conformance-report.html`, same
destination as the existing text link, so the image link and the text link are one
link element or the image carries the link alone with the text link kept; do not create
two adjacent links to the same place with different names (2.4.4, and it is what
VoiceOver will read twice).

The crop must be regenerated whenever the report is regenerated; add a line to the
ACR regen checklist in a11y-audit (`docs/`) so the sample does not drift from the live
report. Note it in the history file for this change.

## 2. "AI, analytics and automation": keep the tiles, cut to one sentence

Keep the heading and the two figure tiles exactly as they are (their copy and the
comment about the Sirius tile stay). Replace the paragraph with one sentence:

"The second practice: enterprise data and AI, from a blank page to the second budget
cycle, for organizations past the pilot."

The current paragraph moves to /about, into the practice section there, verbatim.

## 3. "Building in public": title, one line, links

Keep the heading. Each project becomes its name, one sentence, and its links, in the
same order. The sentences:

- Marine Forecast: "A live marine forecast for Charlotte Harbor and Pine Island Sound
  that turns the NWS coastal waters product, tides, red tide and live radar into a plain
  go or no-go."
- Harbor Spots: "Reefs, ramps, seagrass and manatee zones in Charlotte Harbor from
  live state GIS, with distance and bearing from wherever you launch."
- Sector Rotation Screener: "A Python pipeline that scores the eleven sector ETFs on
  seasonality, cycle fit and relative strength every Sunday and reports whether it is
  beating SPY, whichever way that points."
- Lobo: "An always-on agent on the Mac mini that watches the deploys above, retries
  what fails, and texts only when something stays broken."
- This site: "Next.js on Vercel." (unchanged)

The closing lines ("I don't sell technology I haven't tried to build myself." and the
paragraph after it) stay. The full project descriptions move to /about under a
"Building in public" heading, verbatim, with the same links, so nothing written is lost.

## 4. /about

Receives the two blocks above. Keep /about's existing order; add the practice paragraph
to the practice section and the project descriptions as a new section at the end before
contact. Read the result once as a page; if a sentence now appears twice, keep the
/about copy and cut the duplicate.

## 5. Checks

- Typecheck, lint, build.
- Home page word count before and after; report both. Target is roughly half a screen
  shorter at 1280 wide.
- Heading outline unchanged on home; /about gains one h2.
- Image: alt reads as a description, the link name is unique, `next/image` has
  width and height so nothing shifts on load (CLS).
- The home page is in the ACR sample; the new image is a 1.1.1 item at the next regen.
  Do not regen now.
- Report: the rendered Proof section, the five project lines, and the /about additions.
  Commit "home: trim the back half, move prose to /about, add conformance report sample"
  and push to main.

## Landed 2026-10-12

- **Proof image.** `public/conformance-report-sample.png`, 1906 by 984 (rows
  2.2.2 through 2.4.4 of the Level A table at 2x, light theme), from the live
  `public/conformance-report.html` (the second October 11 report). Rendered by
  `next/image` with width and height set, inside the same link as "Read the
  Accessibility Conformance Report", so the page has one link to the report,
  not two. Alt: "A section of the conformance report's WCAG results table:
  criteria 2.2.2, 2.3.1 and 2.4.1 through 2.4.4 with their verdicts and remarks".
- **Regen step.** The brief named an ACR regen checklist in a11y-audit `docs/`;
  there isn't one. The step went into a11y-audit's README, in the re-evaluation
  section, with `scripts/report_sample.py` (a11y-audit 975d438), which
  reproduces this crop byte for byte.
- **Projects.** `app/projects.ts` holds both the one-line summary and the full
  description; `app/components/ProjectList.tsx` renders either. The home page
  shows summaries; /about shows the full text under a new "Building in public"
  h2, placed after "Earlier" and before the Elsewhere line (/about has no
  contact section).
- **AI paragraph.** Moved verbatim to the top of "How I think about this work"
  on /about. No sentence appears twice on either page.
- **Size.** Home main content 1,010 words before, 670 after. Page height at
  1280 wide 4,545px before, 4,293px after: 252px shorter, short of half a
  screen, because the new image adds about 350px.
- **Next ACR regen.** The image is a 1.1.1 item; the home page is already in
  the sample. /about now carries the seven project links (their names come
  from `aria-label`, as on the home page).
