# TODO: Home page and navigation for the buyers the site now serves

Written 2026-10-09 in Cowork, from the SBDC consultation the same day. Brief for Claude Code. Brian approves the copy below before anything is built; do not start until he says so.

## Why

The site was built as a resume and a workshop. The navigation reads Brian Beals, About, Writing, Accessibility, Elsewhere, Contact, and the home page opens with the enterprise AI pitch. The buyers for the next year are ADA coordinators, county and city IT, school districts, hospitals and health centers, and the purchasing offices that serve them. They arrive looking for a service and a conformance report and have to dig for both. The SBDC's read, which Brian agrees with: shorten the path from landing to "this is what they sell and here is the proof."

Two constraints from the same meeting. The site is under an Accessibility Conformance Report dated October 8, 2026, so every change is rescanned and the report regenerated before it is final; the renderer and the scanner both enforce heading order and the rest. And the AI, analytics and automation consulting stays positioning, not a service with its own pages, until Brian has given notice at his employer; nothing in this brief adds AI service pages.

## 1. Navigation

Replace the main nav with six items, in this order:

| Label | Href | Note |
|---|---|---|
| Home | / | unchanged |
| Services | /accessibility | the existing accessibility page; the AI page joins it in January |
| Capability Statements | /documents | the page the PDF footers already point to; today it is not in the nav at all |
| Writing | /writing | keep the label; they are essays, and "Blogs" would be less accurate without being more findable |
| About | /about | unchanged |
| Contact | /contact | unchanged |

Remove Elsewhere from the nav. Keep the page (it is the human part of the site) and link it from the bottom of About with one line: "Elsewhere: adventure travel, mostly to places where the signal goes away." Update sitemap-page and the footer links to match. Keep the skip link, the aria-label on the nav, and the current focus styling.

## 2. Home page

Order of sections, top to bottom. Headings are H1 then H2s; no skipped levels.

### H1 and lede (replaces the current opening)

**Brian Beals, LLC**

*Independent digital accessibility evaluation for Florida public entities, and AI, analytics and automation consulting from someone who builds what he recommends.*

A veteran-owned firm in Punta Gorda. If you run the website for a Florida county, city, school district or hospital, you have a date: April 26, 2027 for most public entities, April 26, 2028 for the smaller ones, and May 11, 2027 for hospitals under Section 504. I tell you where you stand against WCAG 2.1 Level AA and what to fix first, in a signed Accessibility Conformance Report.

I do not sell remediation. A conformance report from a firm that also sells the fix is a sales document. Mine is not, and that is the reason to hire me.

(Revised 2026-10-10 after the SBDC competitor-website worksheet. Of the five firms that bid Charlotte County's RFP, none puts the compliance date or the words county, city or school district on its home page, and three of the five sell remediation. The date goes in the first paragraph and the independence line stands as its own paragraph, as a rule rather than a feature. Keep both exactly as written unless the readability check objects.)

### H2: Accessibility services

Three cards, each a link to the matching section of /accessibility:

**Conformance Report.** Up to 25 pages across your site's templates, plus the documents linked from them, against all 50 WCAG 2.1 A and AA criteria. An ACR in VPAT 2.5 format, an audit report with evidence per criterion, and a prioritized remediation list. Two to four weeks.

**Document Inventory and Triage.** Every PDF on your web properties cataloged and sorted: retire, replace with a web page, remediate, or leave under the rule's exceptions. A work order a remediation vendor can bid against, so per-page spend goes to the documents residents use.

**Program and Policy Setup.** The accessibility statement, coordinator designation, grievance procedure and self-evaluation record the rule expects, and procurement language requiring an ACR before purchase.

Under the cards, one line: "Dates: April 26, 2027 for public entities serving 50,000 or more and for every state entity; April 26, 2028 for smaller entities and special districts. Hospitals and health centers under Section 504: May 11, 2027 for 15 or more employees, May 10, 2028 under 15." (Dates per the HHS extension of May 11, 2026, document 2026-09266, already on /accessibility/healthcare; keep them matching.) Link the line to /accessibility.

### H2: Proof

Two sentences and two links. "This site is evaluated under the same method I sell. The current Accessibility Conformance Report, re-evaluated October 8, 2026 with scripted and by-ear screen reader testing, is public." Links: the ACR (/conformance-report.html) and the capability statements (/documents).

### H2: Who does the work, and how long it takes

Added 2026-10-10 from the competitor worksheet: the best thing on any of the five sites is QualityLogic's "Who You'll Work With" block, named people with photos and years, next to a plain first-call-to-kickoff timeline. Procurement scores Key Personnel (40 of 100 points on Charlotte County's RFP), so the home page should show it knows that.

Two columns, or stacked on a phone. Left: the existing headshot (reuse the image and the JSON-LD Person; do not add a second copy of the photo), then: "**Brian Beals**. Navy electronics technician. Thirty-five years in enterprise data, analytics and AI before this. Every evaluation is done by me, by hand and by screen reader, and I sign it." Right, a four-step timeline with no graphics beyond a numbered list: "1. First call, 30 minutes, free. 2. Scope and fixed quote within a week. 3. Evaluation, two to four weeks. 4. Signed report, remediation list and a walkthrough with your team." Under it, one line: "Purchase order or credit card. Under most direct-purchase thresholds, so no RFP."

No certifications in this block. Brian holds no IAAP certification (CPACC or WAS); never imply one. The SDVOSB and VBE certifications live on /accessibility and the capability statements, where procurement looks for them. No tenure counts or start years beyond "thirty-five years." Nothing names a former employer.

### H2: AI, analytics and automation

Keep the current paragraph, moved here and trimmed to positioning. Suggested: "The second practice. I've built and scaled enterprise data and AI practices three times, from a blank page to real revenue, and the work I care about is the unglamorous middle: data foundation, integration, governance, the second budget cycle. For organizations past the pilot and into the part where the technology either pays for itself or doesn't." No services list, no pricing, no engagement names. The two stat tiles stay here if Brian wants them; see the note on the Sirius tile below.

### H2: Building in public

The existing projects section, unchanged, moved below the practices. It is the credibility for both practices and the proof that "builds what he recommends" is literal. Keep the closing paragraph and the two links (More about my work, Get in touch).

## 3. Things to fix while in there

- **Sirius stat tile.** It reads "$20M to $78M, Sirius Big Data and Analytics, 3.9x in under four years." Brian founded that practice; there was no practice and no leader before him, only scattered product sales. "$20M to" implies he inherited a $20M practice. Reword to match the business plan: "Founded the Big Data and Analytics group and built it to $78M in under four years." Same for any other place the figure appears.
- **Headshot and JSON-LD** stay as they are; the Person schema is correct and the image sitemap logic in the comments is deliberate.
- **Reading level.** The SBDC asked for public-facing copy at roughly an eighth-grade level. The copy above was written to that; run it through a readability check and flag anything that comes back above tenth grade rather than rewriting it silently.
- **Alt text, no image-as-text, no skipped headings, every card a real link.** The scanner will catch the first three; make the fourth true by hand.
- **Words that do not appear anywhere on the home page or /accessibility:** comprehensive, streamline, solutions, empower, seamless, leverage, robust, innovative, journey, holistic, cutting-edge. Every competitor site uses them in every paragraph and they read as filler. Grep for them before the commit. "Services" is fine; "solutions" is not.
- **No hero image.** All five competitors open with text; the two that use imagery read most generic. The headshot in the new "Who does the work" section is the only photo. If a visual is ever added, it is a cropped sample of the real conformance report, not stock art. Logo work stays parked.
- **Metadata.** Title and description on the home page should name the accessibility practice first. Suggested description: "Independent ADA Title II and Section 504 digital accessibility evaluation for Florida public entities. Signed WCAG 2.1 AA conformance reports. Veteran-owned, Punta Gorda, Florida."

## 4. After the build

Approved by Brian 2026-10-10 with one change to the sequence: **build, typecheck, lint, commit and push so it deploys, then stop.** Brian reads the live site first and may want copy tweaks. Do not run the a11y-audit scan or regenerate the ACR until he says the copy is final; the scan and the ACR delta note ("home page and navigation reorganized for public-sector buyers; 30 pages; no verdict changed" or whatever is true) happen once, after his sign-off, so the report is not regenerated twice. The scanner's own heading-order and alt checks still run as part of the build.

Report back at the bottom of this file after the push: what changed, the readability scores, which of the eight search terms landed on which page, and anything the lint or build flagged. Leave a second section for the scan results to fill in later.

## 5. Search terms

Added 2026-10-10 after a Search Console read (property https://brianbeals.com/, last three months): 223 impressions, 7 clicks, every visible query is Brian's name or a misspelling. /accessibility draws the most impressions of any page (102) and no clicks. A grep of home, /accessibility, /documents, /about and the layout shows the regulatory vocabulary is covered (ADA, Title II, Accessibility Conformance Report, ACR, WCAG 2.1, VPAT, Section 504, Section 508, PDF/UA, SDVOSB) and the buyer vocabulary is absent: "web accessibility" 0, "accessibility audit" 0, "ADA coordinator" 0, "county" 0, "city" 0, "school district" 0, "accessibility statement" 1, "a11y" 0.

Do this in the same pass, not as a separate project:

- **Titles.** Home per section 3 (accessibility practice first). /accessibility: "ADA Title II Website Accessibility Evaluation | Brian Beals, LLC". The layout's default title and the Open Graph and Twitter titles in `app/layout.tsx` change with it; they still read "AI, Analytics & Automation".
- **Buyer vocabulary in real sentences, once each, on the home page and /accessibility:** web accessibility, accessibility audit, ADA coordinator, county, city, school district, special district, accessibility statement. The home copy in section 2 already carries county, city, school district and hospital; give /accessibility the same. Write sentences, not a keyword list; the scanner's readability check applies here too.
- **a11y.** Once, in body copy on /accessibility, as "digital accessibility (a11y)". Industry shorthand, not buyer vocabulary; once is enough.
- **One FAQ-style H2 on /accessibility**, three or four questions as H3s, each answered in two or three sentences: "Is an Accessibility Conformance Report the same as an audit?", "What does ADA Title II require by April 2027?", "Does the rule cover PDFs?", "Do you do the remediation?" (no, and why that matters). These match how people search and are what AI answers quote from.
- **The /documents description** should say what the documents are for: "Capability statements for ADA Title II, Section 504 and Section 508 digital accessibility work, plus state and local AI and analytics consulting. HTML and PDF/UA-1 PDF."
- **Leave alone:** EN 301 549 (federal and EU vendor vocabulary; not this year's buyer), and the deliberate note in `app/accessibility/page.tsx` about keeping the AI audience on the home page, which section 2 supersedes. Update that comment so it no longer contradicts the home page.

After the build, note in the report-back which of the eight terms landed on which page.

## Not in this brief

Logo changes (parked), the LLC LinkedIn company page (separate), the competitor hero-image review (Brian does that with the SBDC worksheet first), and any AI service page.

## Report back: build, 2026-10-10

Built from sections 1, 2, 3 and 5, then typechecked, linted, committed, and pushed. The a11y-audit scan didn't run and the ACR wasn't regenerated.

### What changed

- **Nav** (`app/layout.tsx`): six links in the order Home, Services (/accessibility), Capability Statements (/documents), Writing, About, Contact. Skip link, `aria-label="Main"`, the `:focus-visible` styling, and the wrapping for reflow at 320px are all unchanged. The old "Brian Beals" wordmark was the Home link, so the header no longer shows his name. The six items now include "Home", as the brief specified. Elsewhere is off the nav.
- **Layout metadata:** the default, Open Graph, and Twitter titles now read "Brian Beals, LLC | Digital Accessibility Evaluation, AI & Analytics". The description is the one suggested in section 3. JSON-LD is unchanged, including Person.description and jobTitle, which still describe the AI practice.
- **Home** (`app/page.tsx`): H1 "Brian Beals, LLC", then the subhead and lede, then H2 Accessibility services with three cards, the dates line, H2 Proof, H2 AI, analytics and automation (with the two stat tiles), H2 Building in public, the closing paragraph, and the two links. Each card is a real `<a>`: the link sits on the H3 title and a stretched `::after` makes the whole card the click target, so the link's accessible name stays the short title. The headshot and its alt text are unchanged.
- **/accessibility:** the title is now "ADA Title II Website Accessibility Evaluation | Brian Beals, LLC". It uses `title.absolute` so the layout template doesn't append a second name. The OG and Twitter titles match. The comment about splitting audiences was rewritten so it no longer contradicts the home page. Two sections were added: a new H2 **Services** with three H3s carrying the card copy verbatim (ids `conformance-report`, `document-inventory`, `program-and-policy`), and a new H2 **Common questions** with the four H3 questions.
- **/documents:** the description is now the one in section 5.
- **/about:** the Sirius line now reads "which I founded and built to $78M in under four years". The 3.9× is gone because it only made sense against the $20M base. The Elsewhere line is now the closing paragraph.
- **Sirius stat tile:** the figure is now "$78M" with the label "Founded the Big Data and Analytics group at Sirius and built it to $78M in under four years". The figure also appeared in `public/r/michael-downs-…html`, and that copy now reads "Sirius founded and built to $78M".
- **Site map page:** links are now in nav order, Accessibility is relabeled Services, and the Elsewhere note now reads the travel line. The ACR note's "Linked from three pages" is now "five", since the home page and /documents link it too.
- **Footer:** it only carries the Site map link, so it didn't need changes.
- **README:** the site description now matches the new nav and home page.

### Departures from the brief, and copy I wrote that you haven't seen

1. **The card targets didn't exist.** /accessibility had no sections for Document Inventory or Program and Policy Setup. I added the Services H2 and its three H3s, reusing your approved card copy word for word, so each card has a real anchor.
2. **Three words added to approved home copy** to land the search terms: "where **your web accessibility stands** against WCAG" (lede), "an **accessibility** audit report" (Conformance card), and "**ADA** coordinator designation" (Program card). The Services H3s on /accessibility carry the same edits.
3. **New copy on /accessibility that you haven't reviewed:** the Services intro paragraph and all four FAQ answers. The first drafts of three answers scored above grade 10, so I tightened them before committing. The scores below are for the committed versions.
4. **"from three pages that link it" is now "five"** in the /accessibility proof section. The home page made the old count wrong.

### Readability (textstat; Flesch-Kincaid grade, Gunning Fog)

Approved copy, flagged and **not rewritten**:

| Block | FK | Fog | |
|---|---|---|---|
| Home subhead | 21.3 | 27.4 | **above 10**: one 23-word sentence with a stacked noun phrase |
| Home lede | 9.3 | 10.2 | |
| Card: Conformance Report | 7.2 | 9.8 | |
| Card: Document Inventory and Triage | 12.0 | 15.0 | **above 10** |
| Card: Program and Policy Setup | 22.0 | 21.5 | **above 10**: one 25-word sentence, mostly multisyllable nouns |
| Dates line | 11.0 | 13.4 | **above 10**: dates and conditions; hard to lower without splitting |
| Proof | 12.6 | 11.3 | **above 10**: "re-evaluated … by-ear screen reader testing" clause |
| AI paragraph | 11.3 | 13.9 | **above 10** |
| Sirius tile | 7.8 | 9.4 | |
| Elsewhere line | 9.1 | 4.4 | |

New copy I wrote:

| Block | FK | Fog |
|---|---|---|
| /accessibility Services intro | 9.6 | 10.7 |
| FAQ: ACR vs audit | 9.3 | 10.9 |
| FAQ: Title II by April 2027 | 7.6 | 7.6 |
| FAQ: PDFs | 7.0 | 9.3 |
| FAQ: remediation | 7.6 | 8.5 |

All home and accessibility copy taken together scores FK 10.5, Flesch reading ease 48.6.

### Search terms (counted in the rendered `<main>` of each page)

| Term | Home | /accessibility |
|---|---|---|
| web accessibility | lede | FAQ, ACR vs audit |
| accessibility audit | Conformance card | Services H3 copy, FAQ |
| ADA coordinator | Program card | Services intro, Program H3 copy |
| county | lede | Services intro |
| city | lede | Services intro |
| school district | lede | Services intro |
| special district | dates line (plural "special districts") | dates card, Services intro, FAQ |
| accessibility statement | Program card | Program H3 copy, proof section |
| a11y | not on home, as the brief specified | "digital accessibility (a11y)", Services intro |

### Build, typecheck, lint

- `tsc --noEmit` and `eslint .` both passed with no output.
- `next build` passed. Its only warning is Node's DEP0205 (`module.register()` deprecated), which comes from the toolchain, not the site.
- `next build` doesn't run the scanner, so its heading-order and alt checks didn't run here, despite section 4's assumption. I checked the rendered heading sequence by hand. Home: h1, h2, h3×3, h2, h2, h2, h3×5. /accessibility: h1, then h2s and h3s with no skipped levels. /documents: h1, h2. All three pages have six nav links and the skip link.

### Left alone, worth a look

- **The /accessibility proof section still describes the August 30 report:** "Nineteen pages", 31/18/1, "August 30, 2026". The home page now cites the October 8 report. It belongs with the ACR regeneration.
- **The /accessibility meta description is unchanged.** The brief only set the title.
- **The headshot alt reads "Director of AI, Analytics and Automation"** and now sits under an H1 that names the LLC. It's unchanged per section 3.
- **This file is still in the repo.** The global rule is to delete the TODO in the commit that lands the work, but the scan section below still has to be filled in. Delete it in the scan commit.

## Report back: second pass, 2026-10-10

This pass builds the edits added to this file this morning, plus three fixes Brian approved. It's typechecked, linted, built, committed, and pushed. The scan didn't run and the ACR wasn't regenerated.

### What changed

- **Lede:** the revised lede is in, word for word. Paragraph one carries the dates, and "I do not sell remediation." is its own paragraph. This replaces the "I write the report; I do not do the remediation" sentence.
- **New H2, "Who does the work, and how long it takes"**, sits between Proof and the AI section. It's two columns, stacked on a phone. On the left is the headshot, then the bio line. On the right is a four-step numbered list, then the payment line. It names no certifications and no former employer. The bio paragraph keeps the sentence period outside `<strong>`.
- **No hero image:** the headshot moved out of the top float into the new section, and there's still only one copy of it. The JSON-LD and image sitemap are unchanged. The image dropped `priority`: it's below the fold now, so the H1 text is the LCP element. The LCP comment is updated to say so.
- **Fix 1:**
  - The subhead is now two sentences, split at "entities. AI, analytics".
  - The Program and Policy card is now two sentences, ending "Plus procurement language that requires an ACR before you buy." The Program H3 copy on /accessibility matches.
- **Fix 2:** the /accessibility proof section now describes the October 8 report: 30 pages, 6 documents, 33 Supports, 17 Not Applicable, and nothing Partially Supports. I checked those numbers against `public/conformance-report.html` (50 rows: 33 Supports, 17 Not Applicable).
  - With no partial left, the old paragraph defending the 2.4.5 partial was wrong. I rewrote it to say the August 30 report marked 2.4.5 partial, the fix, and that the August report stays published.
  - The "four criteria settled by a person" paragraph was also stale. It now says 23 checklist answers came from the scripted keyboard pass and that VoiceOver across 12 pages confirmed four criteria by ear. Both facts come from the October 8 report.
- **Fix 3:** the headshot alt is now "Brian Beals".
- **README:** the home-page description now includes the new section and the no-hero-image rule.

### Held out, needs Brian

- **"Thirty-five years in enterprise data, analytics and AI before this." isn't on the page.** The global rule says never to cite a tenure count in public copy, and its own example is "30+ years". The brief makes an exception, but a brief can't override that rule, so I left the sentence out. The bio currently reads: "**Brian Beals**. Navy electronics technician. Every evaluation is done by me, by hand and by screen reader, and I sign it." If Brian wants the sentence, it goes back in after "technician."

### Flags

- **"web accessibility" is no longer on the home page.** The first pass got it there by changing the lede to "where your web accessibility stands". The revised lede is to be kept exactly as written, so it now reads "where you stand". /accessibility still uses the term once. The other seven search terms are still on both pages.
- **Two first-call lengths:** the timeline says "First call, 30 minutes". The Getting started section on /accessibility still says "Twenty minutes is usually enough." Pick one.
- **Two "the proof" headings:** the home page's H2 is "Proof" and /accessibility's is "The proof". That's harmless, just noting it.

### Banned words

I grepped the source and the rendered HTML of both pages for comprehensive, streamline, solutions, empower, seamless, leverage, robust, innovative, journey, holistic, and cutting-edge. None appear.

### Readability (Flesch-Kincaid grade, Gunning Fog)

Approved copy, flagged and **not rewritten**:

| Block | FK | Fog | |
|---|---|---|---|
| Home subhead, split | 17.8 | 24.0 | **above 10**: the split helped (21.3 before), but both halves are noun stacks |
| Lede paragraph 1 | 8.6 | 10.4 | |
| Lede paragraph 2 | 4.8 | 8.0 | |
| Program and Policy card, split | 15.6 | 16.5 | **above 10**: down from 22.0, but the first sentence is still five compound nouns |
| Who: bio, as built | 8.2 | 9.9 | |
| Who: timeline | 4.1 | 5.7 | |
| Who: payment line | 6.4 | 5.7 | |

New copy I wrote, all under 10:

| Block | FK | Fog |
|---|---|---|
| /accessibility proof, paragraph 1 | 7.2 | 8.6 |
| /accessibility proof, paragraph 2 (2.4.5) | 7.7 | 9.1 |
| /accessibility proof, paragraph 3 (method) | 7.2 | 8.1 |

My first drafts of paragraphs 1 and 3 scored 14.8 and 12.1, so I tightened them before committing.

### Build, typecheck, lint

All three passed. The only warning is the same Node DEP0205 deprecation from the toolchain. Rendered headings: home is h1, h2, h3×3, h2 Proof, h2 Who does the work, h2 AI, h2 Building in public, h3×5. /accessibility has no skipped levels. The home page has one image, alt "Brian Beals".

## Scan and ACR delta

### First attempt, 2026-10-10 morning: blocked

The first scan ran after the final copy commit (`4c8b056`). It found 30 pages and 6 documents, with no automated verdict changed. The checklist marked 2.4.6 stale, and the report couldn't be regenerated until Brian re-read it, re-signed the answers, and decided what to do about the screen reader pass. He did all three. The final run is below.

### Final run, 2026-10-10

**Site changes before the final scan:**

| Commit | Change |
|---|---|
| `93d5047` | Revised bio line in "Who does the work". No years and no employer; the sentence period is outside `<strong>`. |
| `4e544c4` | The October 8 report is archived at `/conformance-report-2026-10-08.html`, the same way as the August one: a distinct title, a superseded notice, and listings in both site maps. The August archive's notice now points at it. The proof copy on /accessibility and the home page moved to October 10, and the page and link counts were updated. |

Both were deployed before the final scan, so the archive is in the evaluated set.

**Scan** (`findings-2026-10-10c.json`, same settings as October 8):
- 31 pages. That's 30 plus the October 8 archive.
- All 6 documents pass veraPDF. axe found no violations. The scan raised no advisories and hit no check errors.
- **No automated verdict changed.** The October 8 and October 10 findings evaluate identically: 17 Supports, 9 Not Applicable, 22 human, 2 screen reader.

**Scripted keyboard pass, rerun on all 31 live pages:**
- Tab to the end and back, then a hover on every link.
- No keyboard traps. Every Tab stop showed a visible focus outline, and nothing appeared on hover.
- Record: `keyboard-pass-2026-10-10.json` in a11y-audit's `clients/brian-beals-llc/`.

**Checklist** (`verify-2026-10-10.yml`):
- 23 answers. Brian confirmed 2.4.6 against the new home and /accessibility outlines, so its review marker is deleted, and its note records the October 10 re-read.
- Re-signed: "reviewed and signed by Brian Beals 2026-10-10".

**Screen reader:**
- The October 8 hand pass is carried into the new file **with its own date**, October 8, so the report doesn't claim a 12-page listen happened today.
- The home and /accessibility page notes now record Brian's October 10 re-listen. The four criterion notes say what the October 10 capture did and didn't hear.
- The capture is credited as its own scripted run.

**VoiceOver capture** (`vo-capture-2026-10-10.yml`): the same 12 pages, against the live site, in keyboard mode.
- `vo_analyze`: 84 of 84 checks agree with the October 8 hand pass, 60 Pass and 24 N/A, with nothing flagged. Validation: `vo-capture-validation-2026-10-10.md`.
- On home and /accessibility the capture agrees with Brian's by-ear read. All seven checks are Pass or N/A, and the heading outlines match.
- **No disagreement anywhere.** No verdict rests on screen reader evidence the capture didn't produce. The capture records heading lists but doesn't judge their meaning, so 2.4.6's meaning judgment rests on Brian's re-read, and the report says so.
- **Observation, not a finding:** on the home page VoiceOver says "Brian Beals image" and then "Brian Beals. Navy veteran…", so the name is heard twice in a row. `vo_analyze` doesn't flag it, because the neighbouring text isn't an exact match. It doesn't fail 1.1.1. It's the same doubling the essay byline fix removed. The alt was left as Brian chose it.

**A fix in a11y-audit:**
- `report.py`'s delta said "A screen reader pass … new in this evaluation" and "previously decided by the scan" for a pass the prior report had already cited.
- It now recognises a carried pass (same tester and date in the prior answers) and says "No new hand pass … carried forward".
- `prior_verdicts` now folds in the prior report's screen reader answers, so 4.1.2 no longer rebuilds as "needs AT".
- `tests/run_tests.py` passes.

**ACR, October 10, 2026, published at `/conformance-report.html`:**
- 31 pages and 6 documents: 33 Supports and 17 Not Applicable. No criterion changed its conformance level.
- It cites `/conformance-report-2026-10-08.html` as the prior report.
- The delta prints five `changes_since_prior` lines:
  1. The home page and navigation were reorganized for public-sector buyers.
  2. /accessibility gained the Services and Common questions sections.
  3. The evaluated set grew to 31 pages with the October 8 archive.
  4. Answers carried forward, with the 2.4.6 re-read and the keyboard pass rerun.
  5. Screen reader: the October 8 pass stands, re-heard on two pages and confirmed by the October 10 capture on 84 of 84 checks.
- The answer notes still count the pages evaluated on October 8, and the delta says so.

**Print copy:** `LLC/FL-VBE/Accessibility-Practice/ACR_brianbeals.com_2026-10-10_PRINT.pdf`. It's 10 pages, passes PDF/UA-1 under veraPDF, and its footer is dated October 10, 2026. The audit report and ACR HTML also went to `clients/brianbeals-com/` in the same folder, `report.py`'s default location.

**Site references updated:**
- /accessibility proof: thirty-one pages, October 10, and both earlier reports at their own addresses. The method paragraph now includes the October 10 capture.
- Home page Proof: October 10.
- Site map: the current report is "linked from seven pages, two of them the archived reports", and the October 8 archive is listed.
