import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maryland Nonvisual Access Requirements",
  description:
    "Md. Code, State Finance and Procurement § 3.5-311 nonvisual access requirements and VPAT 2.5 conformance work for CATS+ master contractors and their subcontractors. Maryland VSBE-certified, one of 15 veteran-owned firms holding CATS+ FA2.",
  alternates: {
    canonical: "/accessibility/maryland",
  },
  openGraph: {
    title: "Maryland Nonvisual Access Requirements | Brian Beals, LLC",
    description:
      "The nonvisual access clause, the 18-and-12 enforcement sequence, and independent conformance work for CATS+ master contractors ahead of the vehicle's April 2028 end date.",
    url: "/accessibility/maryland",
    type: "website",
  },
  twitter: {
    title: "Maryland Nonvisual Access Requirements | Brian Beals, LLC",
    description:
      "The nonvisual access clause, the 18-and-12 enforcement sequence, and independent conformance work for CATS+ master contractors ahead of the vehicle's April 2028 end date.",
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

/* The BB mark, inverse (white square, navy letters), matching app/accessibility/page.tsx.
   Decorative here: it sits beside text that already names the company, so
   labelling it would make a screen reader announce the name twice. */
function BBMarkInverse() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='white'/%3E%3Ctext x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='%231E3A5F' font-family='system-ui' font-size='16' font-weight='800'%3EBB%3C/text%3E%3C/svg%3E"
      alt=""
      width={40}
      height={40}
    />
  );
}

export default function AccessibilityMaryland() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
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
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-serif)" }}
          >
            Maryland Nonvisual Access Requirements
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#D6EAF8" }}>
            Md. Code, State Finance and Procurement § 3.5-311 puts a nonvisual access
            clause in every Maryland IT solicitation and contract. The obligation runs
            to whoever signs the award, prime or subcontractor.
          </p>
        </div>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The clause is not optional language a contracting officer can drop.{" "}
          <strong style={{ color: "var(--head)" }}>§ 3.5-311(b)(1)</strong> requires it
          in each invitation for bids or request for proposals, and in each procurement
          contract, modification, or renewal of a contract issued under Title 13, for
          the purchase of new or upgraded information technology and IT services.
        </p>

        {/* Ice card, #D6EAF8. Background only, never text: it measures 1.24:1 on
            white. Body ink on it clears comfortably. */}
        <div className="my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <h2
            className="text-lg font-semibold mb-3 tracking-tight"
            style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
          >
            Who this reaches
          </h2>
          <dl className="text-base leading-relaxed" style={{ color: "#1A1A2A" }}>
            <dt className="font-semibold">Applies to</dt>
            <dd className="mb-3">
              Executive Branch units and Maryland&apos;s public colleges and
              universities, on IT procurements under Title 13 for new or upgraded
              technology.
            </dd>
            <dt className="font-semibold">Clause not required when</dt>
            <dd className="mb-3">
              the essential elements of the technology are visual and no nonvisual
              equivalent can be developed, or modifying for nonvisual compatibility
              would raise the price of the procurement by more than 15 percent.
            </dd>
            <dt className="font-semibold">Named exceptions</dt>
            <dd>
              the Maryland Port Administration; public institutions of higher
              education, for solely academic or research purposes; the University
              System of Maryland; St. Mary&apos;s College of Maryland; and Morgan
              State University.
            </dd>
          </dl>
          <p className="text-sm mt-4" style={{ color: "#5B6470" }}>
            Confirm which category a given task order falls under before assuming the
            clause applies, or that it doesn&apos;t.
          </p>
        </div>

        <H2>The 18-and-12 sequence</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          For awards on or after January 1, 2020,{" "}
          <strong style={{ color: "var(--head)" }}>§ 3.5-311(a)(2)</strong> sets a fixed
          timeline once the contract is signed.
        </p>

        <ol className="list-decimal pl-6 space-y-3 mb-6 text-base sm:text-lg leading-relaxed text-neutral-800">
          <li>
            Within 18 months of award, the Secretary of Maryland&apos;s Department of
            Information Technology, or a designee, determines whether the technology
            meets the nonvisual access standards adopted under § 3.5-303(b).
          </li>
          <li>
            If it does not, the Secretary notifies the vendor in writing. The vendor
            then has 12 months, at its own expense, to modify the technology.
          </li>
          <li>
            If the vendor has not modified the technology within that 12 months, it may
            be subject to a civil penalty, a fine of up to $5,000 for a first offense
            and up to $10,000 for a subsequent offense, and it shall indemnify the
            State for liability resulting from the use of information technology that
            does not meet the nonvisual access standards.
          </li>
        </ol>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The fine and the indemnification are not the same kind of number. Five
          thousand dollars on a first offense barely registers against a CATS+ task
          order. Indemnifying the State for liability tied to noncompliant technology
          carries no dollar ceiling in the statute. That gap is the part worth pricing.
        </p>

        <H2>Why it never shows up in a solicitation</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A keyword search of eMMA, Maryland&apos;s procurement portal, for
          &quot;accessibility&quot; returns zero records across all history. The
          obligation doesn&apos;t arrive as a labeled line item in a solicitation. It
          rides inside the clause language required in every qualifying IFB, RFP, and
          contract, which makes it structural rather than visible. Easy to hold, and
          just as easy to forget you&apos;re holding it.
        </p>

        <H2>The vehicle</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          CATS+ is Maryland&apos;s IT services vehicle, BPO 060B2490023, running through
          April 21, 2028. The State is not accepting new master contractors. Task
          orders compete only among the firms already on the vehicle, which makes
          subcontracting the entry path for anyone not already holding a spot.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          872 master contractors hold CATS+ overall. 650 hold FA2, the Web and
          Internet Systems functional area where this work rides.
        </p>

        <H2>15 of 650</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Of the 650 firms holding FA2, 15 are veteran-owned. Brian Beals, LLC holds
          Maryland VSBE certification VB26-100715, approved August 14, 2026 and
          expiring August 14, 2029. Maryland doesn&apos;t issue a certificate for VSBE
          status. The VB number is the credential.
        </p>

        <H2>What I do</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The work is conformance evaluation, not remediation: VPAT 2.5 and
          Accessibility Conformance Report preparation, remediation specifications your
          team or a subcontractor can bid against, and document libraries brought up to
          the same standard as the software. I don&apos;t do the repair work myself,
          and keeping that boundary is what makes the report worth reading. A
          conformance claim written by whoever fixed the technology is a
          self-assessment, not independent evidence.
        </p>

        <H2>The proof</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Maryland&apos;s own regulations, at{" "}
          <strong style={{ color: "var(--head)" }}>COMAR 14.33.02.01 through .11</strong>
          , set nonvisual access standards effective March 1, 2005, with the clause
          itself placed in the procurement regulations at{" "}
          <strong style={{ color: "var(--head)" }}>COMAR 21.05.08.05</strong>. Maryland&apos;s
          Department of Information Technology describes the relationship to federal
          law directly: the State has adopted or paraphrased many, but not all, of the
          federal Section 508 regulations, and has adopted several nonvisual access
          regulations not found in the federal rules. A federal Section 508 VPAT is a
          starting point on a Maryland task order, not an answer to it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This site carries its own Accessibility Conformance Report, evaluated against
          all 50 Level A and AA criteria of WCAG 2.1.{" "}
          <a
            href="/conformance-report.html"
            className="underline underline-offset-4 font-semibold"
            style={{ color: "var(--link)" }}
          >
            Read the full conformance report
          </a>
          . It is the same document a client receives, produced by the same process,
          published here because a firm that sells conformance reports should have its
          own on display.
        </p>

        <H2>The firm</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Brian Beals, LLC. Service-disabled veteran-owned small business, based in
          Punta Gorda, Florida.
        </p>

        <dl className="text-base leading-relaxed mb-8 text-neutral-800">
          <div className="flex gap-3">
            <dt className="font-semibold w-40">Maryland VSBE</dt>
            <dd className="font-mono">VB26-100715</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-40">eMMA vendor</dt>
            <dd className="font-mono">SUP1105247</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-40">MD Small Business Reserve</dt>
            <dd className="font-mono">SB26-100712</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-40">SDVOSB / VOSB</dt>
            <dd>SBA-certified, certified August 6, 2026</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-40">UEI</dt>
            <dd className="font-mono">NJLEHNAQATJ6</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-40">CAGE</dt>
            <dd className="font-mono">22XM3</dd>
          </div>
        </dl>

        <div className="my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <h2
            className="text-lg font-semibold mb-3 tracking-tight"
            style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
          >
            Capability statement
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#1A1A2A" }}>
            One page for your procurement file, written for Maryland.
          </p>
          <ul className="mb-4 space-y-3">
            <li>
              <a
                href="/Brian-Beals-LLC-Accessibility-Capability-Statement-Maryland.pdf"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#22688F" }}
              >
                Accessibility practice, Maryland CATS+
              </a>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                Conformance evaluation, VPAT and ACR work, and remediation
                specifications, framed for Maryland&apos;s nonvisual access statute and
                the CATS+ vehicle.
              </span>
            </li>
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
            SDVOSB and VOSB certified, Maryland VSBE certified. A firm that hands you an
            inaccessible document about accessibility has told you something.
          </p>
        </div>

        <H2>Getting started</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Twenty minutes is usually enough to tell whether this fits your capture plan
          for a specific task order. If the timing is wrong, say so and I will leave it
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
