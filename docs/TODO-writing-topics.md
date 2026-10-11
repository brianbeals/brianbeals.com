# TODO: topic labels and filter on /writing

Written 2026-10-11 in Cowork. Brian approved the three labels the same day. Run this after the "Eight of Twenty-Six" publish has landed, not in the same commit. Move to `docs/history/` and delete in the landing commit, per the global rule.

## Why

There are now three kinds of essay on the site and a buyer arriving from the accessibility practice sees all of them mixed together. A label per essay and a filter at the top of /writing lets a county ADA coordinator see only the essays written for her, and lets a link from an email or a capability statement open the page already filtered. Text labels, not icons: on a site that sells accessibility evaluation, every icon is an alt-text and contrast decision that a competitor would go looking for in the ACR. A text label does the job for every reader.

## Labels

Three, one word each, the reader's word rather than the practice's:

| Label | Slug | Essays |
|---|---|---|
| Accessibility | `accessibility` | eight-of-twenty-six |
| AI | `ai` | the-last-moat-is-your-voice, ai-and-the-poisoning-of-professionalism, an-llm-with-a-logo, how-i-review-my-own-writing, the-voice-book, ai-is-not-automation, who-could-afford-to-find-out, everybody-got-a-license |
| Building | `building` | i-built-the-thing, seeing-the-next-rung, sixty-cents-a-year |

Add a `topic` field to the essay list in `app/writing/page.tsx` and to each essay's metadata or page module, one source of truth, so the label on the card and the label on the essay page cannot disagree. Future essays carry it from the publish skill (`brianbeals-publish` gets a required `topic` argument; `essays.yml` in the Writing folder already has `track: accessibility` on essay 14, so map track to topic).

## /writing page

1. **Filter row** above the list: four controls, All, Accessibility, AI, Building. Real `<button>` elements in a group with `aria-label="Filter essays by topic"`, `aria-pressed` on the active one, keyboard operable, visible focus, and the active state shown by more than color (the brand underline or a filled pill plus the pressed state). Default is All.
2. **URL carries the filter.** `/writing#accessibility` opens filtered; clicking a button updates the hash without a reload. If JavaScript is off, every essay shows and the buttons are plain anchors to the hash, which is harmless.
3. **Announce the result.** A visually hidden live region says "Showing 8 essays, AI" or similar when the filter changes, so a screen reader user knows the list changed. One `aria-live="polite"` region, no toast.
4. **Label on each card**: a small uppercase caption above the title, muted color that passes 4.5:1 (use the accent text variant from output-conventions, `#2673A8`, or the muted gray `#6B7280`), same for all three topics. No per-topic colors, no icons.
5. The count in the page intro, if there is one, reflects the filter.

## Essay pages

Under the title on each essay page, the same caption, linked to `/writing#<slug>` so a reader who lands from search can get to the rest of that thread in one click. Nothing else on the essay template changes.

## Accessibility rules that apply

- Filter buttons: 2.1.1 keyboard, 2.4.7 focus visible, 4.1.2 name/role/value via `aria-pressed`, 1.4.1 state not by color alone, 4.1.3 the live region.
- Heading order on /writing is unchanged; the filter row is not a heading.
- Labels are text; no `<img>`, no SVG, nothing needing alt.
- Sentence punctuation outside `<strong>`.

## After the build

Typecheck, lint, build, commit, push. Then one ACR regen covers this and the essay publish together: the scan, the checklist carry-forward (2.4.6 unchanged, 4.1.2 and 4.1.3 re-read on /writing), the VoiceOver and NVDA captures on /writing and one essay page, delta note ("topic labels and a filter added to /writing; Eight of Twenty-Six published; no verdict changed" or what is true). Brian listens to /writing once with the filter, by ear, before the regen is final. Report back at the bottom of this file.

## Not in this brief

Search, tag clouds, per-topic counts in the nav, topic landing pages, RSS by topic. Thirteen essays do not need them.

## Report: build landed 2026-10-11, ACR regen not run

Built in Claude Code. The ACR regen is held on purpose until Brian has listened to /writing with the filter by ear, so this file stays in `docs/` and moves to `docs/history/` in the regen commit.

What landed:

- `app/writing/essays.ts` holds the essay list with a `topic` on each, plus `TOPICS`. /writing and the essay-page caption both read it. Mapping as in the table: 1 Accessibility, 8 AI, 3 Building.
- `app/writing/EssayList.tsx`, the client filter. A group labelled "Filter essays by topic" with All, Accessibility, AI, and Building as `<button aria-pressed>`. The server render and the no-JS render use plain anchors to the hash and show every essay. `/writing#<topic>` opens filtered, a click pushes the hash without reloading, and back and forward work.
- `app/components/TopicLabel.tsx` puts the caption under the H1 on all twelve essay pages, linked to `/writing#<topic>`. The link name is "<Label> essays" via hidden text, so the visible word starts the name (2.5.3) and the link's purpose holds out of context (2.4.4).
- Checked in Chrome against a local production build: hash load, `aria-pressed`, list counts (1, 8, 3, 12), status text, back button, focus ring, and the pressed state shown by fill, border, weight, and underline.

Where it departs from the brief:

- **Caption color is `var(--muted-ink)`, not `#2673A8`.** `globals.css` records `#2673A8` at 3.98:1 at the gradient focus. `--muted-ink` is 4.66:1 there and has a dark-mode value.
- **Two status regions, not one.** They're used in turn, so pressing the same filter twice still announces in NVDA with Edge. This repeats the pattern in `PromptCopy.tsx` from the October 10 capture.
- **No intro count.** /writing has no intro paragraph, so item 5 had nothing to update.
- **"Thirteen essays" in "Not in this brief":** the site has twelve.

Not done (needs Brian's ear first): the scan, the checklist carry-forward (4.1.2 and 4.1.3 re-read on /writing), the VoiceOver and NVDA captures on /writing and one essay page, and the delta note. When listening, check whether VoiceOver spells "ACCESSIBILITY" letter by letter. The caption is `text-transform: uppercase` over mixed-case text, so the DOM says "Accessibility", but Safari has spelled CSS-uppercased words before.
