import type { Metadata } from "next";
import Link from "next/link";

// Ported 2026-10-15 from the approved print sheet
// LLC/FL-VBE/Accessibility-Practice/Services-Sheet-Public-Entities.html. Port the
// sheet, do not rewrite it. Edits made for the web: the H1 names public entities
// generally rather than Florida; Charlotte County is off the vendor line while its
// RFP is open under a cone of silence (put it back, with its NIGP codes, once that
// closes); the Prompt Payment Act line is marked as Florida terms; one line points
// healthcare and federal work at their own pages; and the sample-report path is
// the live /conformance-report.html. No SAM link: SAM entity pages need sign-in
// (see docs commit 86318d0). If the sheet's prices change, change them here too.
export const metadata: Metadata = {
  title: { absolute: "Accessibility Services and Pricing for Public Entities | Brian Beals, LLC" },
  description:
    "Fixed prices for independent WCAG 2.1 AA evaluation of public entity websites and documents: conformance reports, full site audits, annual re-evaluation and document triage.",
  alternates: {
    canonical: "/accessibility/pricing",
  },
  openGraph: {
    title: "Accessibility Services and Pricing for Public Entities | Brian Beals, LLC",
    description:
      "Fixed prices for independent WCAG 2.1 AA evaluation of public entity websites and documents: conformance reports, full site audits, annual re-evaluation and document triage.",
    url: "/accessibility/pricing",
    type: "website",
  },
  twitter: {
    title: "Accessibility Services and Pricing for Public Entities | Brian Beals, LLC",
    description:
      "Fixed prices for independent WCAG 2.1 AA evaluation of public entity websites and documents: conformance reports, full site audits, annual re-evaluation and document triage.",
  },
};

/* Section header as a full-width navy bar, matching app/accessibility/page.tsx. */
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl sm:text-2xl font-semibold mt-12 mb-5 tracking-tight rounded-md px-4 py-3"
      style={{
        color: "#FFFFFF",
        backgroundColor: "#1E3A5F",
        fontFamily: "var(--font-serif)",
      }}
    >
      {children}
    </h2>
  );
}

/* The BB mark, inverse, matching app/accessibility/page.tsx. Decorative: it sits
   beside text that already names the company. */
function BBMarkInverse() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='white'/%3E%3Ctext x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='%231E3A5F' font-family='system-ui' font-size='16' font-weight='800'%3EBB%3C/text%3E%3C/svg%3E"
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
    />
  );
}

const link = "underline underline-offset-4 hover:no-underline";
const body = "text-base sm:text-lg leading-relaxed mb-6 text-neutral-800";
const list = "list-disc pl-6 space-y-3 mb-6 text-base sm:text-lg leading-relaxed text-neutral-800";

// Explicit ARIA roles: the table stacks into cards below 640px (globals.css,
// .doc-table.stack), and display:block would otherwise strip its semantics.
const SERVICES: { name: string; what: string; price: React.ReactNode }[] = [
  {
    name: "Recon",
    what: "Four to six sampled pages plus their linked PDFs, and a count of the documents on the site. Written findings summary, no conformance report. Offered so you can see the work before buying any.",
    price: "No charge",
  },
  {
    name: "Conformance Report",
    what: "Up to 25 pages chosen across your site's templates, so a template defect is found once and reported everywhere it appears, plus the documents linked from those pages, validated against PDF/UA. All 50 WCAG 2.1 A and AA criteria. You receive the Accessibility Conformance Report (VPAT 2.5), an audit report with evidence per criterion, and a prioritized remediation list. Two to four weeks.",
    price: (
      <>
        $3,500 to $5,000<small>sized for a department-level purchase</small>
      </>
    ),
  },
  {
    name: "Full Site Audit",
    what: "Every page plus a document sample, same deliverables at full coverage. For entities that need to say they covered everything.",
    price: "$8,000 to $15,000",
  },
  {
    name: "Annual Re-evaluation",
    what: "Rescan, reissued ACR, and a delta against the prior report. Conformance drifts every time a template changes; this is how an entity shows it is still conforming a year later.",
    price: (
      <>
        $1,500 to $2,500<small>per year</small>
      </>
    ),
  },
  {
    name: "Document Inventory and Triage",
    what: "Crawl and catalog every document on your web properties. Classify each as retire, replace with a web page, remediate, or leave under the rule's exceptions for archived and pre-existing documents. Prioritize by traffic, program criticality and exposure. You receive a scoped work order a remediation vendor can bid against, and a record of the decisions. Same deliverable at every band; the count comes from the recon.",
    price: (
      <>
        Under 1,000 docs $2,500
        <br />
        1,000 to 5,000 $4,500
        <br />
        5,000 to 15,000 $7,500<small>above that, quoted</small>
      </>
    ),
  },
];

export default function AccessibilityPricing() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
        <div
          className="rounded-lg px-6 py-8 sm:px-8 sm:py-10 mb-10"
          style={{ backgroundColor: "#1E3A5F" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <BBMarkInverse />
            <span
              className="text-sm font-semibold tracking-wide uppercase"
              style={{ color: "#D6EAF8", letterSpacing: "0.08em" }}
            >
              Brian Beals, LLC
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-serif)" }}
          >
            Accessibility Services and Pricing for Public Entities
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#D6EAF8" }}>
            ADA Title II digital accessibility. Florida-Certified Veteran Business
            Enterprise · SBA-Certified SDVOSB.
          </p>
        </div>

        <p className={body}>
          Independent evaluation of public websites, documents and applications against WCAG
          2.1 Level AA, the standard the DOJ rule under ADA Title II (28 CFR Part 35)
          requires by <strong style={{ color: "var(--head)" }}>April 26, 2027</strong> for
          entities serving 50,000 or more, and April 26, 2028 for smaller entities and special
          districts. The deliverable is a signed Accessibility Conformance Report a department
          can hand to counsel, a grant administrator or a complainant.
        </p>

        <H2>Services</H2>

        <table role="table" className="doc-table stack text-neutral-800">
          <caption className="sr-only">Services, what each covers, and its fixed price</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col">Engagement</th>
              <th role="columnheader" scope="col">What it covers and what you receive</th>
              <th role="columnheader" scope="col">Fixed price</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {SERVICES.map((s) => (
              <tr role="row" key={s.name}>
                <th role="rowheader" scope="row" style={{ width: "19%" }}>
                  {s.name}
                </th>
                <td role="cell" data-label="What it covers and what you receive">
                  {s.what}
                </td>
                <td role="cell" data-label="Fixed price" className="price">
                  {s.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={body}>
          Healthcare (Section 504) and federal (Section 508) work is quoted on scope. See{" "}
          <Link href="/accessibility/healthcare" className={link} style={{ color: "var(--link)" }}>
            Section 504 for healthcare
          </Link>{" "}
          and{" "}
          <Link href="/accessibility/federal" className={link} style={{ color: "var(--link)" }}>
            Section 508 for federal agencies and their vendors
          </Link>
          .
        </p>

        <p className={body}>
          The fixed fee assumes the{" "}
          <Link
            href="/accessibility/before-we-start"
            className={link}
            style={{ color: "var(--link)" }}
          >
            pre-engagement requirements
          </Link>{" "}
          are in place.
        </p>

        <H2>How the evaluation is done</H2>

        <ul className={list}>
          <li>
            Automated rule checking (axe-core) across every sampled page, under both light and
            dark color schemes.
          </li>
          <li>
            Checks machines miss: reflow at a real 320-pixel viewport, focus visibility under a
            real keyboard, contrast on rendered output.
          </li>
          <li>
            The 23 criteria no scanner can decide, verified by a person against a keyboard and
            the browser accessibility tree, with the verification record retained so the report
            can be reproduced.
          </li>
          <li>
            Screen reader testing with VoiceOver on macOS and NVDA on Windows, by hand and by
            scripted capture.
          </li>
          <li>
            PDFs validated against ISO 14289-1 (PDF/UA) with veraPDF, reporting only rules that
            map to a WCAG criterion.
          </li>
          <li>
            Every criterion marked Supports, Partially Supports, Does Not Support or Not
            Applicable, with the page and element cited.
          </li>
        </ul>

        <H2>What we do not do</H2>

        <ul className={list}>
          <li>
            <strong style={{ color: "var(--head)" }}>Remediation</strong>. Fixing what the
            audit finds is separate work, and doing it would have to be disclosed in any later
            report on the same property. Declining it is what makes the evaluation independent.
          </li>
          <li>
            <strong style={{ color: "var(--head)" }}>Document remediation at volume</strong>. We
            scope and prioritize the documents so you know the number, then hand the work to a
            vendor whose business that is.
          </li>
          <li>
            <strong style={{ color: "var(--head)" }}>Overlays</strong>. No widget or script is
            sold or recommended as a path to conformance.
          </li>
        </ul>

        <H2>Buying</H2>

        <ul className={list}>
          <li>
            Registered vendor: MyFloridaMarketPlace, SAM.gov (UEI NJLEHNAQATJ6, CAGE 22XM3).
          </li>
          <li>
            Fixed price per engagement; invoiced on delivery. For Florida public entities, Local
            Government Prompt Payment Act terms.
          </li>
          <li>
            A sample report, on this firm&apos;s own site, is published at{" "}
            <a href="/conformance-report.html" className={link} style={{ color: "var(--link)" }}>
              brianbeals.com/conformance-report.html
            </a>
            .
          </li>
          <li>
            Also available, quoted on scope: the program pieces the rule expects (accessibility
            statement, Title II coordinator, grievance procedure, self-evaluation record,
            procurement language requiring an ACR).
          </li>
        </ul>

        {/* Ice card, #D6EAF8: background only, with fixed ink in both schemes,
            as on app/accessibility/page.tsx. */}
        <div className="my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#1A1A2A" }}>
            <strong style={{ color: "#1E3A5F" }}>Why an independent report</strong>. A
            consultant who trains your staff and a vendor who remediates your site both have a
            stake in the result. The conformance statement your attorney will rely on should
            come from someone who does neither.
          </p>
        </div>

        <p className={body}>
          Punta Gorda, Florida. Write to{" "}
          <a href="mailto:brian@brianbeals.com" className={link} style={{ color: "var(--link)" }}>
            brian@brianbeals.com
          </a>{" "}
          or call{" "}
          <a href="tel:+19419796282" className={link} style={{ color: "var(--link)" }}>
            941-979-6282
          </a>
          .
        </p>
      </article>
    </div>
  );
}
