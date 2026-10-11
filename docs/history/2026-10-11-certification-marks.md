# TODO: SBA SDVOSB mark in the footer, certification block on /accessibility

Written 2026-10-11 in Cowork; Brian approved the placements the same day from the mockup in Downloads (Certification-Mark-Mockups_2026-10-11.html, placements A and B). Ship with the next content change and its ACR regen, not alone. Move to `docs/history/` and delete in the landing commit.

## The mark

Official SBA VetCert icon, from SBA's decals-and-icons pack (legacy.sba.gov/brand/for-partners/sba-certified-businesses, downloaded 2026-10-11). Source files and the terms are in iCloud at `LLC/brand/certification-marks/` (README.md there has the rules and the renewal dates). Use `sba/sdvosb-certified-400.png` (400 px wide, RGBA, white background baked in) copied into `public/` as `sba-sdvosb-certified.png`. Do not recolor, crop, or restyle it; SBA's terms allow the icon as supplied on a business website, capability statements and proposals, and nowhere that implies endorsement.

Alt text, exactly: `SBA certified service-disabled veteran-owned small business`. The mark carries meaning on its own, so it is a real image with alt text, never `aria-hidden`, and it is not a link.

Florida VBE and Maryland VSBE have no official artwork; they are text only. Never a self-made badge, never the old VA CVE seal, never a "SAM certified" badge.

## A. Site footer, every page

Above the existing `© 2026 Brian Beals · Site map` line, one strip:

- The mark at 72 px tall (`height:72px; width:auto`), left.
- Beside it, two lines of small text (13.5 px, muted color that passes 4.5:1):
  - Line 1: **SBA-certified Service-Disabled Veteran-Owned Small Business** · Florida Veteran Business Enterprise · Maryland Veteran-Owned Small Business Enterprise
  - Line 2: UEI NJLEHNAQATJ6 · CAGE 22XM3 · NAICS 541512, 541511, 541618, 541990 · [Capability statements](/documents)
- Wraps to stacked on a phone; the mark stays at 72 px.
- The footer is a landmark already (`contentinfo`); the strip lives inside it, no new landmark, no heading.

## B. /accessibility, "The firm" section

Replace the current UEI/CAGE lines with a two-column block (mark at 96 px, text beside it; stacked under 600 px):

> Brian Beals, LLC. SBA-certified service-disabled veteran-owned small business, Florida Veteran Business Enterprise, Maryland Veteran-Owned Small Business Enterprise. Registered in SAM.gov and based in Punta Gorda, Florida. A contracting officer can confirm the certification in SBA's VetCert search and the registration in SAM.

Then a definition list: UEI NJLEHNAQATJ6; CAGE 22XM3; NAICS 541512, 541511, 541618, 541990. Monospace values, as the page already does.

Link "VetCert search" to https://veterans.certify.sba.gov/ and "SAM" to https://sam.gov/ , both opening in the same tab.

## Not here

Nothing in the home page body. No marks on /about, /contact, /writing or the essays beyond the shared footer. No dates on the page; renewals live in `LLC/Readiness/APEX-readiness-checklist.md` and the brand README.

## Accessibility and the ACR

- New image on every page: 1.1.1 evidence row for the alt text; the mark is decorative-looking but meaningful, so the alt is required and stays.
- Contrast: the muted footer text must pass 4.5:1 on the page background in light and dark modes (the site has dark mode; the mark's baked white background is fine on navy, since SBA supplies it that way, but check it does not glare; if it does, put it on a white 6 px-radius plate rather than altering the image).
- Footer link count goes up by one on every page; update the site map's link counts if they are stated.
- Regen the ACR with the delta note ("SBA SDVOSB certification mark added to the footer and the firm block; no verdict changed" or what is true) in the same pass as whatever content change this ships with.

## Also

The six capability statement HTML and PDF files were built in the "SDVOSB-in-formation" format. When the APEX revision round lands (waiting on Stormie and Ross), the mark goes on them too, under SBA's terms, and the "in formation" wording goes.

## Landed 2026-10-11

Shipped on its own, without the ACR regen: Brian chose to let the regen ride with the next content change. The live report (October 11) predates the mark until then.

- `public/sba-sdvosb-certified.png`: byte-identical copy of `sba/sdvosb-certified-400.png` (SHA-256 910a2033…91d0a1).
- `app/components/SbaMark.tsx`: a plain `<img>`, so the served file is SBA's own and not a next/image re-encode. Alt text as above; not aria-hidden, not a link.
- Footer strip in `app/layout.tsx`, 72 px mark, 13.5 px text in `--footer-ink`. Firm block in `app/accessibility/page.tsx`, 96 px mark, stacked under 600 px, NAICS added to the definition list.
- Contrast, footer text over the page background, worst case with both gradient overlays stacked (they never coincide): light 4.87:1, dark 5.62:1; at the flat background 5.99:1 and 6.34:1.
- Dark mode glare: checked at desktop and 375 px. The mark reads as a small white card at 72 px and 96 px, so no plate was added.
- No horizontal scroll at 375 px. The site map states no link counts, so nothing changed there.

### For the ACR regen

- 1.1.1: new evidence row for the mark's alt text, every page and the /accessibility firm block.
- 1.4.3: the footer strip text, figures above.
- New links: "Capability statements" in every footer; "VetCert search" and "SAM" on /accessibility.
- Delta note, if nothing else turns up: "SBA SDVOSB certification mark added to the footer and the firm block; no verdict changed."

## Capability statements and the second October 11 ACR

- All six statements carry the mark in the header (56 px, `.sba`), tagged in each PDF as one Figure with the alt text. The Florida VBE set-aside line in the ADA Title II and State-Local statements, and in their LLC mirrors, now reads "Florida-certified Veteran Business Enterprise, recognized under F.S. 295.187 in state agency procurement; many counties and cities run their own vendor programs." No statement claims county, municipal or university preference. The mirrors are older copies of the public files and took the wording only. No statement ever carried "in formation" wording; the note above was stale.
- The six PDFs were re-rendered with `render_print_pdf.py --date "October 11, 2026"`; all pass PDF/UA-1 with page counts unchanged.
- The first October 11 report moved to `/conformance-report-2026-10-11.html` ("first issue", superseded notice, both site maps).
- Scan: 34 pages, 6 documents, no failures. 23 answers carried forward; 1.4.5 was stale (the mark contains text) and was re-read as an exempt logotype; 1.1.1 note adds the mark.
- VoiceOver capture on the home page and /accessibility: every check passed or did not apply. Brian listened by ear to the footer and heard the alt text word for word.
- Report: 33 Supports, 17 Not Applicable, no verdict changed. Print: `ACR_brianbeals.com_2026-10-11b_PRINT.pdf` in Accessibility-Practice, 12 pages, PDF/UA-1 verified.

```
python3 scripts/report.py clients/brian-beals-llc/findings-2026-10-11b.json \
  --answers clients/brian-beals-llc/verify-2026-10-11b.yml --report-date 2026-10-11 \
  --prior-findings clients/brian-beals-llc/findings-2026-10-11.json \
  --prior-answers clients/brian-beals-llc/verify-2026-10-11.yml --prior-date 2026-10-11 \
  --prior-url https://brianbeals.com/conformance-report-2026-10-11.html \
  --site-map https://brianbeals.com/sitemap-page --outdir <dir>
```
