import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Conformance Reports",
  description:
    "Independent WCAG 2.1 Level AA evaluation and VPAT 2.5 Accessibility Conformance Reports. ADA Title II for state and local government, Section 508 for federal agencies and the vendors who sell to them. Service-disabled veteran-owned.",
  alternates: {
    canonical: "/accessibility",
  },
  openGraph: {
    title: "Accessibility Conformance Reports | Brian Beals, LLC",
    description:
      "Independent WCAG 2.1 Level AA evaluation and VPAT 2.5 Accessibility Conformance Reports for Florida public entities facing the April 2027 Title II deadline.",
    url: "/accessibility",
    type: "website",
  },
  twitter: {
    title: "Accessibility Conformance Reports | Brian Beals, LLC",
    description:
      "Independent WCAG 2.1 Level AA evaluation and VPAT 2.5 Accessibility Conformance Reports for Florida public entities facing the April 2027 Title II deadline.",
  },
};

/* Section header as a full-width navy bar, per my-profile/output-conventions.md.
   White on #1E3A5F measures 11.5:1, so this adds brand presence without touching
   the contrast work in globals.css, where several tokens are tuned against the
   gradient focal point rather than the flat page background. */
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

/* The BB mark, inverse (white square, navy letters) for use on the navy band.
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

export default function Accessibility() {
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
            Accessibility Conformance Reports
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#D6EAF8" }}>
            Independent WCAG 2.1 Level AA evaluation for public entities. I write the
            conformance report. I do not do the remediation, and that is the point.
          </p>
        </div>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The Department of Justice rule at{" "}
          <strong style={{ color: "var(--head)" }}>28 CFR 35.200</strong> requires WCAG 2.1
          Level AA for state and local government web content and digital documents. DOJ
          extended the compliance dates by one year in an interim final rule published in
          the Federal Register on April 20, 2026, document 2026-07663.
        </p>

        {/* Ice card, #D6EAF8. Background only, never text: it measures 1.24:1 on
            white. Body ink on it clears comfortably. */}
        <div className="my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <h2
            className="text-lg font-semibold mb-3 tracking-tight"
            style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
          >
            Compliance dates
          </h2>
          <dl className="text-base leading-relaxed" style={{ color: "#1A1A2A" }}>
            <dt className="font-semibold">Public entities serving 50,000 or more</dt>
            <dd className="mb-3">April 26, 2027</dd>
            <dt className="font-semibold">
              Public entities under 50,000, and all special district governments
            </dt>
            <dd>April 26, 2028</dd>
          </dl>
          <p className="text-sm mt-4" style={{ color: "#5B6470" }}>
            Confirm which tier applies to your entity before planning against a date. Special
            districts land on the later date regardless of size.
          </p>
        </div>

        <H2>What you get</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          An Accessibility Conformance Report in VPAT 2.5 format, the same document your
          procurement office already asks software vendors to produce. All 50 Level A and
          Level AA success criteria of WCAG 2.1, each one marked Supports, Partially
          Supports, Does Not Support or Not Applicable, each one evidenced. Dated and signed.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Alongside it, a prioritized remediation list your web vendor can bid against, and a
          one-page summary written for a commission meeting or a budget request rather than
          for an engineer.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          If a complaint ever arrives, the question is rarely whether the site was perfect. It
          is what you knew and what you were doing about it. Fixing everything and keeping no
          record leaves you with nothing to show.
        </p>

        <H2>Federal: Section 508</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Section 508 of the Rehabilitation Act, at{" "}
          <strong style={{ color: "var(--head)" }}>36 CFR 1194 Appendix A</strong>, works
          differently. There is no government-wide compliance date. It is in force now, and
          what it affects is award eligibility.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It reaches two groups. Federal agencies, for the information and communication
          technology they develop, procure and use. And every company selling that technology
          to an agency, which is where the deadline is real and immediate: a solicitation asks
          for a VPAT, and the answer is due with the bid.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          If a contracting officer has asked you for an Accessibility Conformance Report and
          you do not have one, that is a dated problem this quarter, not a 2027 problem. A
          missing or obviously boilerplate ACR can cost an award before anyone reads the
          technical approach.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          One detail worth knowing, because it trips people up. Section 508 points at WCAG 2.0
          Level AA while the Title II rule points at 2.1 Level AA. Building to 2.1 satisfies
          both, since 2.1 is a superset. The reverse is not true, so a 2.0 conformance claim
          does not cover a Title II obligation.
        </p>

        <H2>Why I do not remediate</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A conformance claim written by whoever repaired the site is a self-assessment. The
          report has to come from outside the work, or it is the vendor grading their own
          homework and your counsel will say so.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Staying out of the repair work also gives you something useful: a specification your
          remediation vendor bids against, instead of a per-page quote you have no way to
          check. I am happy to refer a partner for the repair. I will not be the one holding
          both ends.
        </p>

        <H2>How the evaluation runs</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Automated scanning across a representative sample of pages, then manual testing for
          the criteria a machine cannot settle. Whether an image is decorative or meaningful,
          whether headings describe their sections, whether reading order carries meaning,
          whether an error message actually helps. Keyboard traversal and screen reader checks
          are done by hand.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Every report states plainly what was tested and what was not. A row that mostly
          worked is Partially Supports. A report that overstates conformance is worse than one
          that admits a gap, because a reader who finds the gap themselves has reason to doubt
          every other row.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Documents count too. The Title II rule reaches conventional electronic documents, and
          an untagged PDF is the most common failure I find. A site can pass while its forms
          library does not.
        </p>

        <H2>The proof</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This site carries its own Accessibility Conformance Report. Fifteen pages and all
          four published documents evaluated against all 50 Level A and AA criteria on
          August 14, 2026: <strong style={{ color: "var(--head)" }}>36 Supports</strong> and{" "}
          <strong style={{ color: "var(--head)" }}>14 Not Applicable</strong>, with zero
          criteria failing. The document layer passed too: every PDF on this page is tagged,
          with structure, language and headings verified. The report states its own
          limitation, that screen reader testing was performed separately from the scan,
          because a report that hides its method is not worth reading.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Ask me for it. It is the same document you would receive, produced by the same
          process, and it is the fastest way to judge whether the work is any good.
        </p>

        <H2>The firm</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Brian Beals, LLC. Service-disabled veteran-owned small business, registered in
          SAM.gov and based in Punta Gorda, Florida.
        </p>

        <dl className="text-base leading-relaxed mb-8 text-neutral-800">
          <div className="flex gap-3">
            <dt className="font-semibold w-20">UEI</dt>
            <dd className="font-mono">NJLEHNAQATJ6</dd>
          </div>
          <div className="flex gap-3">
            <dt className="font-semibold w-20">CAGE</dt>
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
            One page each, for your procurement file. Four, because the rule and the
            certification that matter depend on who is buying.
          </p>
          <ul className="mb-4 space-y-3">
            <li>
              <a
                href="/Brian-Beals-LLC-Accessibility-Capability-Statement.pdf"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#22688F" }}
              >
                Accessibility practice
              </a>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                Conformance evaluation, ACR and VPAT work, remediation roadmaps. Start here if
                you came for the report.
              </span>
            </li>
            <li>
              <a
                href="/Brian-Beals-LLC-Accessibility-Capability-Statement-Federal.pdf"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#22688F" }}
              >
                Accessibility practice, federal Section 508
              </a>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                The same evaluation practice framed for 36 CFR 1194: conformance assessment and
                VPAT for agencies and for vendors answering a solicitation. SDVOSB set-aside
                eligible.
              </span>
            </li>
            <li>
              <a
                href="/Brian-Beals-LLC-Capability-Statement-Federal.pdf"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#22688F" }}
              >
                Federal, SDVOSB
              </a>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                SBA-certified service-disabled veteran-owned small business, certified August
                2026. Covers the broader AI, analytics and automation practice.
              </span>
            </li>
            <li>
              <a
                href="/Brian-Beals-LLC-Capability-Statement-Florida.pdf"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#22688F" }}
              >
                Florida state and local, VBE
              </a>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                Florida-certified Veteran Business Enterprise. Same practice, written for state
                and local procurement.
              </span>
            </li>
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-ink)" }}>
            All three are tagged PDFs: structure tree present, language declared, headings in
            order, table headers marked, no untagged figures. A firm that hands you an
            inaccessible document about accessibility has told you something.
          </p>
        </div>

        <H2>Getting started</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Twenty minutes is usually enough to tell whether this is worth your time. I will walk
          you through what a sample of your site shows and what full scope would look like for
          an entity your size. If the timing is wrong, say so and I will leave it alone.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          <Link
            href="/contact"
            className="underline underline-offset-4"
            style={{ color: "var(--link)" }}
          >
            Get in touch
          </Link>
          , or write to{" "}
          <a
            href="mailto:brian@brianbeals.com"
            className="underline underline-offset-4"
            style={{ color: "var(--link)" }}
          >
            brian@brianbeals.com
          </a>
          .
        </p>
      </article>
    </div>
  );
}
