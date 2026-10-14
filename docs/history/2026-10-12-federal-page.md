# Federal page and one home-page line

Decided 2026-10-12. One product (an independent Accessibility Conformance Report), a
third door for it. The healthcare and Maryland pages set the pattern: same deliverable,
a page that says who is obligated, under what rule, and how they buy. The home page keeps
its Florida Title II lede. It gets one sentence, low on the page, pointing federal
readers to the new page. Nothing else on the home page changes.

Why now: a Treasury contracting officer and a Maryland 508 prime were emailed on
2026-10-12 with the federal capability statement; Fredrick Ross at Florida APEX
Accelerator (Cape Coral) is the prime-introduction path; VA holds more SDVOSB
set-asides than any other agency. Those readers need a page that is
theirs, not the county page.

## 1. New route: `/accessibility/federal`

Copy `app/accessibility/maryland/page.tsx` as the shell (navy band with the inverse BB
mark, `H2` bars, same type and spacing). Title: "Section 508 for Federal Agencies and
Their Vendors". Metadata and OG card follow the Maryland page's pattern; add the route
to `app/og/card.tsx` if cards are generated per route, to the sitemap, and to the
`/accessibility` page's lane list beside Healthcare and Maryland.

Source text is the federal capability statement in
`LLC/FL-VBE/Accessibility-Practice/Capability_Statement_Accessibility_Federal.html`.
Reuse its claims; do not add any. Sections, in order:

**Band.** "Independent Section 508 conformance reports for federal agencies and the
vendors who sell to them. SBA-certified service-disabled veteran-owned small business.
UEI NJLEHNAQATJ6 · CAGE 22XM3."

**Who this is for.** Two readers. An agency Section 508 program manager or contracting
officer who needs a conformance report from someone who did not do the remediation. A
vendor whose solicitation asks for a VPAT with the bid. Say plainly that the second case
is the one with the deadline.

**What applies.** Section 508, 36 CFR 1194 Appendix A. In force now, no compliance
date, governs award eligibility. The 2.0-versus-2.1 note from `/accessibility` (built to
2.1 AA satisfies 2.0 AA; the reverse does not hold). Keep it to one paragraph; link to
the longer treatment on `/accessibility` rather than repeating it.

**What you get.** The ACR in VPAT 2.5 format, every criterion marked and evidenced,
tested by script and by ear in VoiceOver and NVDA across Safari, Chrome and Edge, with
every verdict traceable to a capture file; PDF/UA validation for documents; a prioritized
roadmap. Link the live sample: the conformance report on this site. One sentence on what
the report says it did not check (the "Not Evaluated, never Supports" rule).

**Why the report has to come from outside the repair.** The paragraph from
`/accessibility` "Why I do not remediate", tightened to three sentences. Then one line:
available to subcontract the assessment layer under a remediation prime.

**How an agency buys this.** This is the section that earns the page, and it is the one
that has to be exactly right. Three paths, each one sentence of what it is and when it
fits:
- Micro-purchase: a fixed-price verification pass on a remediated site or document set,
  bought on a card, no competition required under the threshold.
- SDVOSB sole-source under FAR 19.14 (19.1406) for engagements above the simplified
  acquisition threshold up to the sole-source ceiling.
- VA: Vets First under 38 U.S.C. 8127 and VAAR 819.70, where SDVOSB set-asides and
  sole-source come first in the order of priority (the Kingdomware rule). Name VA once;
  do not list other agencies.

**Thresholds are looked up, not typed.** Pull the micro-purchase threshold and the
simplified acquisition threshold from FAR 2.101 at acquisition.gov, the SDVOSB
sole-source ceiling from FAR 19.1406, and the VA sole-source ceiling from VAAR 819.7007,
at build time. Print each figure with the citation and a single line under the section:
"Thresholds checked against FAR 2.101, FAR 19.1406 and VAAR 819.7007 on [date]." If any
lookup fails, do not publish a number; write "see FAR 2.101" and report it. Add a line to
the Sunday Search Console task (the scheduled task prompt lives in the Scheduled sidebar;
Brian edits it) to re-check those three citations monthly.

**Identifiers.** UEI, CAGE, SDVOSB certification term (08/2026 to 08/2029 per the cap
statement; confirm against `LLC/llc-profile.yml`), NAICS 541512, 541511, 541519, 541611,
PSC DA01, R499. SBA Small Business Search link by UEI, same sentence as `/accessibility`.
No SAM link: SAM.gov entity pages need a sign-in (FSD INC-GSAFSD21754095, resolved
2026-10-13), so public proof is the SBA Small Business Search link.

**Download.** `public/Brian-Beals-LLC-Accessibility-Capability-Statement-Federal.pdf`,
already published; link it with its size.

**Contact.** Same block as the other lane pages.

What the page does not say: no past-performance claim beyond the two in the capability
statement (the conformance report on this site; the 22-entity Florida screening). No
"Trusted Tester" claim; Brian holds no DHS certification. No IAAP claim. No pricing.
No agency logos.

## 2. One line on the home page

In the "who it's for" area of `app/page.tsx`, after the Florida entity list and before
the "Who does the work" section, one sentence in body type, not a heading and not a
card: "Federal agencies and the vendors who sell to them: Section 508." with "Section
508" linking to `/accessibility/federal`. Nothing else on the home page changes. The
lede stays Florida; the three dates stay; the og:description stays.

## 3. Nav

Do not add a top-level nav item. The lane appears on `/accessibility` with Healthcare
and Maryland, and in the footer's lane list if one exists.

## 4. Checks before push

- `rg "Trusted Tester|IAAP|in formation|in-formation"` returns nothing in app/.
- Typecheck, lint.
- Accessibility pass on the new page: heading outline, link purpose (2.4.4), the
  threshold citations as real links, skip link, focus order.
- VoiceOver capture on the new page via the a11y-audit tooling, and add the page to the
  next ACR regen sample (do not regen now; the ACR is regenerated with the capability
  statement pass).
- Report back: the rendered "How an agency buys this" section verbatim, with the
  threshold figures and the date line, so Brian can read it before it is live. Push to
  main only after Brian says the section is right.

## Done when

`/accessibility/federal` renders with dated, cited thresholds; the home page carries the
one sentence; `/accessibility` lists three lanes; the Treasury and ArcSource emails can
be followed up with a link that is theirs.

## Landed 2026-10-12

Built from this brief: `app/accessibility/federal/page.tsx` and its
`opengraph-image.tsx`, a `federal` card in `app/og/card.tsx`, entries in
`app/sitemap.ts` and `app/sitemap-page/page.tsx`, a lane paragraph at the end of
the "Federal: Section 508" section on `/accessibility`, and the one sentence on
the home page, after the dates line in the services section.

Two places the brief was wrong, and what the page does instead:

- **VAAR 819.7007 is not the VA sole-source ceiling.** In the VAAR on
  acquisition.gov (part 819 page updated 09/23/2026), 819.7007 is "VA
  veteran-owned small business set-aside procedures." SDVOSB sole source is
  819.7008: up to $5 million including options. The page cites 819.7008, and
  the date line names it.
- **FAR 19.1406 has no floor at the simplified acquisition threshold.** Its only
  dollar condition is the ceiling: $5 million including options outside the
  manufacturing NAICS codes. The page says the path covers "a larger engagement,
  including one above the $350,000 simplified acquisition threshold," which
  keeps the SAT figure without stating a floor the regulation does not have.

Figures, read from the live text on 2026-10-12 (FAR at FAC 2026-01, effective
03/13/2026): micro-purchase threshold $15,000 and simplified acquisition
threshold $350,000 (FAR 2.101); SDVOSB sole source $5 million (FAR
19.1406(a)(2)(ii)); VA SDVOSB sole source $5 million (VAAR 819.7008(a)(1)).
FAR 2.101 sets a lower micro-purchase figure for construction and for services
under the Service Contract Labor Standards; Brian cut that caveat from the page
on review, so the bullet ends at the citation.

The thresholds are constants in the page with the check date beside them, not
fetched during the Vercel build. A build-time fetch would fail the deploy, or
silently print nothing, whenever acquisition.gov is slow.

Sunday Search Console task, line to add (Brian edits the scheduled prompt):
"Re-check FAR 2.101 (micro-purchase and simplified acquisition thresholds), FAR
19.1406 and VAAR 819.7008 at acquisition.gov against the figures on
/accessibility/federal; if any moved, say so and do not edit the page."

VoiceOver capture of the local build:
`a11y-audit/clients/brian-beals-llc/vo-capture-2026-10-12-federal-local.yml`.
All five checks pass; the threshold citations are heard as links.

**Next ACR regen:** add `https://brianbeals.com/accessibility/federal` to the
`screen_reader` pages block when it is spliced into the new verify file. The
XML sitemap now lists the page, so the scan picks it up on its own.
