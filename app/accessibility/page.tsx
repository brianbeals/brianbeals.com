import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // absolute, so the layout's "%s | Brian Beals" template does not append a
  // second name to a title that already ends in the firm's.
  title: { absolute: "ADA Title II Website Accessibility Evaluation | Brian Beals, LLC" },
  // "SBA-certified" is load-bearing and deliberate. Primes and agency small
  // business offices filter on the certification, not on the phrase
  // "veteran-owned", which anyone can self-assert in SAM. The certification
  // issued 2026-08-06 and runs to 2029-08-05.
  //
  // Since 2026-10-10 the homepage leads with the accessibility practice too, and
  // this page is the Services destination in the main nav. The homepage carries
  // the summary and the cards; this page carries the detail each card links to.
  // The AI practice stays positioning on the homepage, with no page of its own
  // here, until it joins as a second service.
  description:
    "Independent WCAG 2.1 Level AA evaluation and VPAT 2.5 Accessibility Conformance Reports. ADA Title II for state and local government, Section 508 for federal agencies and the vendors who sell to them. SBA-certified service-disabled veteran-owned small business.",
  alternates: {
    canonical: "/accessibility",
  },
  openGraph: {
    title: "ADA Title II Website Accessibility Evaluation | Brian Beals, LLC",
    description:
      "Independent WCAG 2.1 Level AA evaluation and VPAT 2.5 Accessibility Conformance Reports for Florida public entities facing the April 2027 Title II deadline.",
    url: "/accessibility",
    type: "website",
  },
  twitter: {
    title: "ADA Title II Website Accessibility Evaluation | Brian Beals, LLC",
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

function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="text-lg sm:text-xl font-semibold mt-8 mb-3 tracking-tight scroll-mt-6"
      style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
    >
      {children}
    </h3>
  );
}

/* The BB mark, inverse (white square, navy letters) for use on the navy band.
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

        {/* The three homepage cards link here by id. Keep the ids in step with
            the services array in app/page.tsx. The H3 copy matches the cards. */}
        <H2>Services</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          These are built for a county, city, school district or special district getting
          ready for the Title II date, and for the ADA coordinator who will be asked what was
          done. Each one is digital accessibility (a11y) evaluation or the program paperwork
          around it. None of them is the repair.
        </p>

        <H3 id="conformance-report">Conformance Report</H3>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Up to 25 pages across your site&apos;s templates, plus the documents linked from
          them, against all 50 WCAG 2.1 A and AA criteria. An ACR in VPAT 2.5 format, an
          accessibility audit report with evidence per criterion, and a prioritized
          remediation list. Two to four weeks.
        </p>

        <H3 id="document-inventory">Document Inventory and Triage</H3>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Every PDF on your web properties cataloged and sorted: retire, replace with a web
          page, remediate, or leave under the rule&apos;s exceptions. A work order a
          remediation vendor can bid against, so per-page spend goes to the documents
          residents use.
        </p>

        <H3 id="program-and-policy">Program and Policy Setup</H3>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The accessibility statement, ADA coordinator designation, grievance procedure and
          self-evaluation record the rule expects. Plus procurement language that requires an
          ACR before you buy.
        </p>

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

        {/* Matches the October 8, 2026 report. Change these numbers only when the
            report is regenerated, and change the home page Proof line with them. */}
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This site carries its own Accessibility Conformance Report. It covers thirty pages
          and all six published documents, tested against all 50 Level A and AA criteria.
          The latest run was October 8, 2026. The result:{" "}
          <strong style={{ color: "var(--head)" }}>33 Supports</strong> and{" "}
          <strong style={{ color: "var(--head)" }}>17 Not Applicable</strong>. Nothing is
          marked Partially Supports or Does Not Support, and nothing was left out. All six
          PDFs are tagged and pass veraPDF.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The August 30 report marked one criterion Partially Supports: 2.4.5 Multiple Ways,
          because the report itself did not link the site map. Every page now does, the
          report included, and the October 8 report marks it Supports. The August report
          stays published at its own address, so the change is on the record rather than
          quietly replaced. A firm that evaluates its own site should show its edges, and
          its fixes.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A person, not the scan, settled 23 checklist answers. They came from a scripted
          keyboard pass: Tab to the end of every page and back, then hover on every link.
          Then a VoiceOver pass in Safari, across 12 pages, confirmed four criteria by ear.
          Reading order can&apos;t be scored by a machine, and no report from this practice
          will claim it was.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          <a
            href="/conformance-report.html"
            className="underline underline-offset-4 font-semibold"
            style={{ color: "var(--link)" }}
          >
            Read the full conformance report
          </a>
          . It is the same document a client receives, produced by the same process, published
          here because a firm that sells conformance reports should have its own on display.
          It also serves as this site&apos;s accessibility statement. The fastest way to judge
          whether the work is any good is to read one.
        </p>

        <H2>Healthcare: Section 504</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Healthcare organizations answer to a different rule with an earlier date. The
          HHS final rule at <strong style={{ color: "var(--head)" }}>45 CFR Part 84</strong>{" "}
          requires WCAG 2.1 Level AA by May 11, 2027 for recipients with 15 or more
          employees, and it reaches anyone taking Medicare or Medicaid. Its
          legacy-document exemption stops at any document a patient uses to apply for or
          access a program, which puts the whole forms library back in scope.{" "}
          <Link
            href="/accessibility/healthcare"
            className="underline underline-offset-4 font-semibold"
            style={{ color: "var(--link)" }}
          >
            See how Section 504 applies to healthcare
          </Link>
          .
        </p>

        <H2>Maryland: CATS+ contractors</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Maryland runs its own version of this obligation through a different statute.
          If you hold or subcontract on CATS+,{" "}
          <Link
            href="/accessibility/maryland"
            className="underline underline-offset-4 font-semibold"
            style={{ color: "var(--link)" }}
          >
            see how Maryland&apos;s nonvisual access clause works
          </Link>
          .
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
            One page each, for your procurement file. Six, because the rule and the
            certification that matter depend on who is buying. These four cover the
            practice:
          </p>
          <ul className="mb-4 space-y-3">
            <li>
              <a
                href="/Brian-Beals-LLC-Accessibility-Capability-Statement.pdf"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#22688F" }}
              >
                Accessibility practice, ADA Title II
              </a>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                Conformance evaluation, ACR and VPAT work, and document inventory, written
                for state and local government and the April 2027 and 2028 dates.
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
          <p className="text-base leading-relaxed mb-4" style={{ color: "#1A1A2A" }}>
            Two more are written for a specific rule and live with it:{" "}
            <Link
              href="/accessibility/healthcare"
              className="underline underline-offset-4 font-semibold"
              style={{ color: "#22688F" }}
            >
              Section 504 for healthcare
            </Link>{" "}
            and{" "}
            <Link
              href="/accessibility/maryland"
              className="underline underline-offset-4 font-semibold"
              style={{ color: "#22688F" }}
            >
              Maryland nonvisual access
            </Link>
            .
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
            All are tagged PDFs: structure tree present, language declared, headings in
            order, table headers marked, no untagged figures. A firm that hands you an
            inaccessible document about accessibility has told you something.
          </p>
        </div>

        <H2>Common questions</H2>

        <H3>Is an Accessibility Conformance Report the same as an audit?</H3>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          They overlap. An accessibility audit finds the web accessibility problems and
          records the evidence. The conformance report is the signed, dated verdict on each of
          the 50 criteria. It uses the VPAT format your purchasing office already asks for.
          You get both.
        </p>

        <H3>What does ADA Title II require by April 2027?</H3>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Every state entity, and every local government serving 50,000 or more, must have its
          web content and mobile apps meet WCAG 2.1 Level AA by April 26, 2027. That includes
          the documents posted on the site and content a vendor provides for you. Smaller
          entities and special districts have until April 26, 2028.
        </p>

        <H3>Does the rule cover PDFs?</H3>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Yes. The rule calls them conventional electronic documents. They have to meet the
          same standard as the page that links them. The exceptions are narrow: archived
          content, and older files nobody uses to apply for or reach a service.
        </p>

        <H3>Do you do the remediation?</H3>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          No. A report written by whoever fixed the site is the vendor grading their own
          homework, and your counsel will say so. Staying out of the repair keeps the report
          independent. It also gives your remediation vendor a clear spec to bid against.
        </p>

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
