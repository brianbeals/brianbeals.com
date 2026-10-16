import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/app/components/PageHeading";
import SectionHeading from "@/app/components/SectionHeading";
import SubHeading from "@/app/components/SubHeading";

// ADA Title II program page (2026-10-16), modeled on /accessibility/healthcare and
// /accessibility/federal. Content comes from the Title II one-page capability
// statement (iCloud LLC/FL-VBE/Accessibility-Practice/
// Capability_Statement_Accessibility_ONEPAGE.html, the source of
// /Brian-Beals-LLC-Accessibility-Capability-Statement.pdf). The rule citation, the
// tier note and the documents paragraph repeat what /accessibility already says.
// Left out on purpose: the one-pager's DUNS and founding year, which no other
// page shows.
//
// "The proof" quotes the current conformance report (34 pages, October 11, 2026).
// Change it when the report is reissued, with the /accessibility and healthcare
// proof lines.
const DESCRIPTION =
  "ADA Title II requires WCAG 2.1 AA for state and local government websites, apps, forms, PDFs and media: April 26, 2027 for entities serving 50,000 or more, April 26, 2028 for smaller ones and special districts. Independent evaluation for cities, counties, school districts and special districts.";

export const metadata: Metadata = {
  title: { absolute: "ADA Title II Digital Accessibility | Brian Beals, LLC" },
  description: DESCRIPTION,
  alternates: { canonical: "/accessibility/title-ii" },
  openGraph: {
    title: "ADA Title II Digital Accessibility | Brian Beals, LLC",
    description: DESCRIPTION,
    url: "/accessibility/title-ii",
    type: "website",
  },
  twitter: {
    title: "ADA Title II Digital Accessibility | Brian Beals, LLC",
    description: DESCRIPTION,
  },
};

/* The BB mark, inverse, matching the other program pages. Decorative: it sits
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

const body = "text-base sm:text-lg leading-relaxed mb-6 text-neutral-800";
const link = "underline underline-offset-4 font-semibold";
const list = "list-disc pl-6 space-y-3 mb-6 text-base sm:text-lg leading-relaxed text-neutral-800";

const COMPETENCIES: [string, string][] = [
  ["Title II readiness assessment", "Keyboard, screen reader, and automated testing, delivered as a VPAT 2.5 ACR and a roadmap."],
  ["Document inventory and triage", "Every PDF sorted into retire, replace, remediate, or leave, delivered as a biddable work order."],
  ["Program and policy setup", "Accessibility statement, coordinator, grievance procedure, and ACR-before-purchase language."],
  ["Ongoing monitoring", "Recurring scans and an annual reassessment against the prior report."],
];

const BUY: [string, string][] = [
  ["Purchase", "Direct, under department limits"],
  ["MyFloridaMarketPlace", "Registered vendor"],
  ["SAM.gov", "Active, with UEI and CAGE"],
  ["SBA", "SDVOSB and VOSB"],
  ["Florida", "Veteran Business Enterprise, July 2026 to July 2028"],
];

export default function AccessibilityTitleII() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        <div className="rounded-lg px-6 py-8 sm:px-8 sm:py-10 mb-10" style={{ backgroundColor: "#1E3A5F" }}>
          <div className="flex items-center gap-3 mb-5">
            <BBMarkInverse />
            <span
              className="text-sm font-semibold tracking-wide uppercase"
              style={{ color: "#D6EAF8", letterSpacing: "0.08em" }}
            >
              Brian Beals, LLC
            </span>
          </div>
          <PageHeading tone="band" spacing="mb-4">ADA Title II Digital Accessibility</PageHeading>
          <p className="text-lg leading-relaxed" style={{ color: "#D6EAF8" }}>
            Title II requires WCAG 2.1 AA for websites, apps, forms, PDFs, and media. Independent
            evaluation, never the remediation.
          </p>
        </div>

        <p className={body}>
          A Florida-based, veteran-owned consultancy that tells a public agency where it stands
          against the Title II deadline and what to fix first, in an Accessibility Conformance
          Report that marks and evidences every WCAG 2.1 A and AA criterion. Delivered by the
          principal, a U.S. Navy veteran who founded and led three enterprise AI, data and
          analytics practices.
        </p>

        <p className={body}>
          The Department of Justice rule at{" "}
          <strong style={{ color: "var(--head)" }}>28 CFR 35.200</strong> sets the standard for
          state and local government web content and digital documents. DOJ extended the
          compliance dates by one year in an interim final rule published in the Federal Register
          on April 20, 2026, document 2026-07663.
        </p>

        {/* Ice card, #D6EAF8. Background only, never text: it measures 1.24:1 on white. */}
        <div className="callout my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <SubHeading level={2} tone="ice" spacing="mt-0 mb-3">Compliance dates</SubHeading>
          <dl className="text-base leading-relaxed" style={{ color: "#1A1A2A" }}>
            <dt className="font-semibold">Public entities serving 50,000 or more</dt>
            <dd className="mb-3 font-mono">April 26, 2027</dd>
            <dt className="font-semibold">Public entities under 50,000, and all special district governments</dt>
            <dd className="mb-3 font-mono">April 26, 2028</dd>
          </dl>
          <p className="text-sm" style={{ color: "#5B6470" }}>
            Confirm which tier applies to your entity before planning against a date. Special
            districts land on the later date regardless of size.
          </p>
        </div>

        <SectionHeading>Who this is for</SectionHeading>

        <p className={body}>Cities, counties, school districts, and special districts.</p>

        <p className={body}>
          The rule reaches the documents as well as the pages. It calls them conventional
          electronic documents, and they have to meet the same standard as the page that links
          them. The exceptions are narrow: archived content, and older files nobody uses to apply
          for or reach a service.
        </p>

        <SectionHeading>What I do</SectionHeading>

        {COMPETENCIES.map(([name, text]) => (
          <div key={name}>
            <SubHeading>{name}</SubHeading>
            <p className={body}>{text}</p>
          </div>
        ))}

        <p className={body}>
          <Link href="/accessibility/pricing" className={link} style={{ color: "var(--link)" }}>
            Fixed prices for each engagement
          </Link>{" "}
          and{" "}
          <Link href="/accessibility/before-we-start" className={link} style={{ color: "var(--link)" }}>
            what has to be in place before we start
          </Link>
          .
        </p>

        <SectionHeading>Why this practice</SectionHeading>

        <ul className={list}>
          <li>Evaluation only, never the remediation: no self-assessment.</li>
          <li>A tagged PDF is not a conforming PDF: veraPDF checks every one.</li>
          <li>Local and certified: Punta Gorda, Florida VBE, on site as needed.</li>
          <li>
            Triage before spend: remediation is priced per page, so sorting obsolete, duplicate,
            and superseded documents first is the cheapest money in the program.
          </li>
          <li>No product to sell: no overlay, no platform license, no per-page quota.</li>
        </ul>

        <SectionHeading>The proof</SectionHeading>

        <ul className={list}>
          <li>
            brianbeals.com: 34 pages, 6 PDF/UA-1 documents, all 50 criteria. The Accessibility
            Conformance Report of October 11, 2026 marks nothing Partially Supports or Does Not
            Support.{" "}
            <a href="/conformance-report.html" className={link} style={{ color: "var(--link)" }}>
              Read the conformance report
            </a>
            .
          </li>
          <li>
            Volume screening: 22 Florida public entities sampled across four counties, findings
            mapped to specific success criteria.
          </li>
        </ul>

        <div className="callout my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <SubHeading level={2} tone="ice" spacing="mt-0 mb-3">Capability statement</SubHeading>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#1A1A2A" }}>
            One page for your procurement file, written for ADA Title II.
          </p>
          <ul className="mb-4 space-y-3">
            <li>
              <a
                href="/Brian-Beals-LLC-Accessibility-Capability-Statement.pdf"
                className={link}
                style={{ color: "#22688F" }}
              >
                Accessibility practice, ADA Title II (PDF)
              </a>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                Readiness assessment, document inventory and triage, program and policy setup,
                and ongoing monitoring, framed for the April 2027 and 2028 dates.
              </span>
            </li>
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
            A tagged PDF: structure tree present, language declared, headings in order, table
            headers marked. A firm that hands you an inaccessible document about accessibility
            has told you something.
          </p>
        </div>

        <SectionHeading>How to buy</SectionHeading>

        <dl className="text-base sm:text-lg leading-relaxed mb-8 text-neutral-800">
          {BUY.map(([k, v]) => (
            <div key={k} className="flex flex-col min-[480px]:flex-row min-[480px]:gap-3 mb-2 min-[480px]:mb-0">
              <dt className="font-semibold min-[480px]:w-56 flex-none">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <SectionHeading>Identifiers</SectionHeading>

        <dl className="text-base leading-relaxed mb-8 text-neutral-800">
          <div className="flex gap-3">
            <dt className="font-semibold w-28 flex-none">UEI</dt>
            <dd className="font-mono">NJLEHNAQATJ6</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-28 flex-none">CAGE</dt>
            <dd className="font-mono">22XM3</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-28 flex-none">NAICS</dt>
            <dd>
              <span className="font-mono">541512</span> Computer Systems Design (primary),{" "}
              <span className="font-mono">541990</span> Other Professional and Technical,{" "}
              <span className="font-mono">541618</span> Other Management Consulting
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-28 flex-none">NIGP</dt>
            <dd>
              <span className="font-mono">918-25</span> Compliance Consulting, ADA;{" "}
              <span className="font-mono">918-32</span> Consulting Services, NOC
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-28 flex-none">UNSPSC</dt>
            <dd className="font-mono">80101507, 81111500, 81112000</dd>
          </div>
        </dl>

        <SectionHeading>Getting started</SectionHeading>

        <p className={body}>
          <Link href="/contact" className={link} style={{ color: "var(--link)" }}>
            Book a 15-minute call
          </Link>
          , write to{" "}
          <a href="mailto:brian@brianbeals.com" className="underline underline-offset-4" style={{ color: "var(--link)" }}>
            brian@brianbeals.com
          </a>
          , or call{" "}
          <a href="tel:+19419796282" className="underline underline-offset-4" style={{ color: "var(--link)" }}>
            941-979-6282
          </a>
          .
        </p>
      </article>
    </div>
  );
}
