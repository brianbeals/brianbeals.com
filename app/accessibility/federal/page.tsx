import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/app/components/SectionHeading";
import PageHeading from "@/app/components/PageHeading";
import SubHeading from "@/app/components/SubHeading";

// Claims on this page come from the federal accessibility capability statement
// (LLC/FL-VBE/Accessibility-Practice/Capability_Statement_Accessibility_Federal.html)
// and from /accessibility. Add nothing the statement does not say: no DHS
// tester certification, no association credential, no pricing, no agency logos.
export const metadata: Metadata = {
  title: { absolute: "Section 508 for Federal Agencies and Their Vendors | Brian Beals, LLC" },
  description:
    "Independent Section 508 Accessibility Conformance Reports in VPAT 2.5 format for federal agencies and the vendors who sell to them. SBA-certified service-disabled veteran-owned small business, UEI NJLEHNAQATJ6, CAGE 22XM3.",
  alternates: {
    canonical: "/accessibility/federal",
  },
  openGraph: {
    title: "Section 508 for Federal Agencies and Their Vendors | Brian Beals, LLC",
    description:
      "Section 508 conformance reports from outside the repair, and how an agency buys one: micro-purchase, SDVOSB sole source under FAR 19.1406, and VA's Vets First.",
    url: "/accessibility/federal",
    type: "website",
  },
  twitter: {
    title: "Section 508 for Federal Agencies and Their Vendors | Brian Beals, LLC",
    description:
      "Section 508 conformance reports from outside the repair, and how an agency buys one: micro-purchase, SDVOSB sole source under FAR 19.1406, and VA's Vets First.",
  },
};

/* The BB mark, inverse (white square, navy letters), matching app/accessibility/page.tsx.
   Decorative here: it sits beside text that already names the company, so
   labelling it would make a screen reader announce the name twice. */
function BBMarkInverse() {
  return (
    // aria-hidden as well as alt="": on October 8, 2026 VoiceOver in Safari
    // read the SVG's own text aloud as "BB" despite the empty alt, intermittently.
    // Every other BB mark on the site was already aria-hidden.
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

function Cite({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
      {children}
    </a>
  );
}

// THRESHOLDS ARE LOOKED UP, NOT TYPED. Each figure below was read from the live
// text at acquisition.gov on the date in THRESHOLDS_CHECKED, and the Sunday
// Search Console task re-checks the three citations monthly. If a figure moves,
// change it here and the date with it; if a lookup cannot be made, print
// "see FAR 2.101" rather than a number.
//
// 2026-10-12, FAC 2026-01 (effective 03/13/2026); VAAR part 819 page updated
// 09/23/2026:
//   FAR 2.101   micro-purchase threshold $15,000 (lower for construction under
//               the Wage Rate Requirements and for services under the Service
//               Contract Labor Standards)
//   FAR 2.101   simplified acquisition threshold $350,000
//   FAR 19.1406 SDVOSB sole source, $5 million including options (non-
//               manufacturing NAICS; $8.5 million for manufacturing)
//   VAAR 819.7008 VA SDVOSB sole source, $5 million including options. The
//               brief named 819.7007; in the current VAAR that section is VOSB
//               set-aside procedures, and the sole-source ceiling is 819.7008.
const THRESHOLDS_CHECKED = "October 12, 2026";
const FAR_2_101 = "https://www.acquisition.gov/far/2.101";
const FAR_19_1406 = "https://www.acquisition.gov/far/19.1406";
const VAAR_819_7008 =
  "https://www.acquisition.gov/vaar/part-819%E2%80%94small-business-programs#Section_819_7008_T48_5021219718";
const USC_38_8127 =
  "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title38-section8127&num=0&edition=prelim";
const KINGDOMWARE = "https://www.law.cornell.edu/supremecourt/text/14-916";

export default function AccessibilityFederal() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        {/* Navy band. Carries the mark and the one-line position, so a reader who
            arrived from an email sees a firm rather than a personal homepage. */}
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
          <PageHeading tone="band" spacing="mb-4">Section 508 for Federal Agencies and Their Vendors</PageHeading>
          <p className="text-lg leading-relaxed" style={{ color: "#D6EAF8" }}>
            Independent Section 508 conformance reports for federal agencies and the
            vendors who sell to them. SBA-certified service-disabled veteran-owned small
            business. UEI NJLEHNAQATJ6 · CAGE 22XM3.
          </p>
        </div>

        <SectionHeading>Who this is for</SectionHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Two readers. An agency Section 508 program manager or contracting officer who
          needs a conformance report from someone who did not do the remediation. And a
          vendor whose solicitation asks for a VPAT with the bid.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The vendor is the one with the deadline. The answer is due when the bid is, and a
          missing or boilerplate report can cost the award before anyone reads the
          technical approach.
        </p>

        <SectionHeading>What applies</SectionHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Section 508 of the Rehabilitation Act, at{" "}
          <Cite href="https://www.ecfr.gov/current/title-36/chapter-XI/part-1194">
            36 CFR 1194 Appendix A
          </Cite>
          , is in force now. There is no compliance date to plan against, and what it
          governs is award eligibility. It points at WCAG 2.0 Level AA. A product built to
          2.1 AA satisfies 2.0 AA, since 2.1 is a superset; the reverse does not hold.{" "}
          <Link
            href="/accessibility"
            className="underline underline-offset-4 hover:no-underline"
            style={{ color: "var(--link)" }}
          >
            More on how 508 and Title II differ
          </Link>
          .
        </p>

        <SectionHeading>What you get</SectionHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          An Accessibility Conformance Report in VPAT 2.5 format, every criterion marked
          and evidenced, dated and signed. Testing is by script and by ear, in VoiceOver
          and NVDA across Safari, Chrome and Edge, and every verdict traces to a capture
          file. Documents are validated against PDF/UA. You also get a prioritized
          roadmap your remediation vendor can bid against.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The report says what it did not check. A criterion nobody could settle honestly
          reports as Not Evaluated, never as Supports.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          <a
            href="/conformance-report.html"
            className="underline underline-offset-4 font-semibold"
            style={{ color: "var(--link)" }}
          >
            Read this site&apos;s own conformance report
          </a>
          , produced by the same process a client gets.
        </p>

        <SectionHeading>Why the report has to come from outside the repair</SectionHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A conformance claim written by whoever repaired the product is a
          self-assessment. Staying out of the repair is what lets the report mean
          something. It also gives you a specification your remediation vendor bids
          against, instead of a per-page quote you have no way to check.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Available to subcontract the assessment layer under a remediation prime.
        </p>

        <SectionHeading>How an agency buys this</SectionHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Three paths, depending on size and agency.
        </p>

        <ul className="list-disc pl-6 space-y-4 mb-6 text-base sm:text-lg leading-relaxed text-neutral-800">
          <li>
            <strong style={{ color: "var(--head)" }}>Micro-purchase</strong>. A
            fixed-price verification pass on a remediated site or document set, bought
            on a government purchase card without competing quotes, at or under the
            $15,000 micro-purchase threshold (<Cite href={FAR_2_101}>FAR 2.101</Cite>).
          </li>
          <li>
            <strong style={{ color: "var(--head)" }}>SDVOSB sole source</strong>. For a
            larger engagement, including one above the $350,000 simplified acquisition
            threshold (<Cite href={FAR_2_101}>FAR 2.101</Cite>), a contracting officer can
            award to an SBA-certified SDVOSB without competition when no second SDVOSB
            offer is expected, up to $5 million including options (
            <Cite href={FAR_19_1406}>FAR 19.1406</Cite>).
          </li>
          <li>
            <strong style={{ color: "var(--head)" }}>VA, under Vets First</strong>. At the
            Department of Veterans Affairs,{" "}
            <Cite href={USC_38_8127}>38 U.S.C. 8127</Cite> puts SDVOSB set-asides and
            sole source first in the order of priority, and the Supreme Court held in{" "}
            <Cite href={KINGDOMWARE}>
              <em>Kingdomware</em>
            </Cite>{" "}
            that the rule is mandatory; a VA contracting officer may sole-source to an
            SDVOSB up to $5 million including options (
            <Cite href={VAAR_819_7008}>VAAR 819.7008</Cite>).
          </li>
        </ul>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted-ink)" }}>
          Thresholds checked against FAR 2.101, FAR 19.1406 and VAAR 819.7008 on{" "}
          {THRESHOLDS_CHECKED}.
        </p>

        <SectionHeading>Identifiers</SectionHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-5 text-neutral-800">
          Brian Beals, LLC. SBA-certified service-disabled veteran-owned small business,
          based in Punta Gorda, Florida. A contracting officer can confirm the
          certification in{" "}
          <Cite href="https://search.certifications.sba.gov/">
            SBA&apos;s Small Business Search
          </Cite>{" "}
          by UEI NJLEHNAQATJ6.
        </p>

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
            <dt className="font-semibold w-28 flex-none">SDVOSB</dt>
            <dd>SBA-certified, August 2026 to August 2029</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-28 flex-none">NAICS</dt>
            <dd className="font-mono">541512, 541511, 541519, 541611</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-28 flex-none">PSC</dt>
            <dd className="font-mono">DA01, R499</dd>
          </div>
        </dl>

        <div className="callout my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <SubHeading level={2} tone="ice" spacing="mt-0 mb-3">Capability statement</SubHeading>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#1A1A2A" }}>
            One page for your procurement file, written for Section 508.
          </p>
          <ul className="mb-4 space-y-3">
            <li>
              <a
                href="/Brian-Beals-LLC-Accessibility-Capability-Statement-Federal.pdf"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#22688F" }}
              >
                Accessibility practice, federal Section 508
              </a>{" "}
              <span style={{ color: "#1A1A2A" }}>(PDF, one page, 272 KB)</span>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                Conformance assessment and VPAT work for agencies and for vendors
                answering a solicitation. SDVOSB set-aside eligible.
              </span>
            </li>
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
            A tagged PDF that passes PDF/UA-1. A firm that hands you an inaccessible
            document about accessibility has told you something.
          </p>
        </div>

        <SectionHeading>Getting started</SectionHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Twenty minutes is usually enough to tell whether this fits a specific
          solicitation or program. If the timing is wrong, say so and I will leave it
          alone.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          <Link
            href="/contact"
            className="underline underline-offset-4"
            style={{ color: "var(--link)" }}
          >
            Get in touch
          </Link>
          , write to{" "}
          <a
            href="mailto:brian@brianbeals.com"
            className="underline underline-offset-4"
            style={{ color: "var(--link)" }}
          >
            brian@brianbeals.com
          </a>
          , or call{" "}
          <a
            href="tel:+19419796282"
            className="underline underline-offset-4"
            style={{ color: "var(--link)" }}
          >
            941-979-6282
          </a>
          .
        </p>
      </article>
    </div>
  );
}
