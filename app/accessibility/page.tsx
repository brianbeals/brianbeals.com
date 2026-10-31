import type { Metadata } from "next";
import Link from "next/link";
import { enabled as freeTestEnabled } from "@/lib/free-test";
import { CAGE, NAICS_LIST, UEI } from "@/lib/identity";
import BookCallLink from "@/app/components/BookCallLink";
import DemoVideo from "@/app/components/DemoVideo";
import SbaMark from "@/app/components/SbaMark";
import SectionHeading from "@/app/components/SectionHeading";
import SubHeading from "@/app/components/SubHeading";
import PageHeading from "@/app/components/PageHeading";

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
  // this page is the Services destination in the main nav. Since 2026-10-31 it is a
  // hub: each rule's detail lives on its own page, the method and the answers in
  // <details> disclosures here (docs history: the services-hub pass).
  description:
    "Independent WCAG 2.1 Level AA evaluation and VPAT 2.5 Accessibility Conformance Reports. ADA Title II for state and local government, Section 508 for federal agencies and the vendors who sell to them. SBA-certified service-disabled veteran-owned small business.",
  alternates: {
    canonical: "/accessibility",
  },
  openGraph: {
    title: "ADA Title II Website Accessibility Evaluation | Brian Beals, LLC",
    description:
      "Independent WCAG 2.1 Level AA evaluation and VPAT 2.5 Accessibility Conformance Reports. ADA Title II for state and local government, Section 508 for federal agencies and the vendors who sell to them. SBA-certified service-disabled veteran-owned small business.",
    url: "/accessibility",
    type: "website",
  },
  twitter: {
    title: "ADA Title II Website Accessibility Evaluation | Brian Beals, LLC",
    description:
      "Independent WCAG 2.1 Level AA evaluation and VPAT 2.5 Accessibility Conformance Reports. ADA Title II for state and local government, Section 508 for federal agencies and the vendors who sell to them. SBA-certified service-disabled veteran-owned small business.",
  },
};

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

const body = "text-base sm:text-lg leading-relaxed mb-6 text-neutral-800";
const link = "underline underline-offset-4 font-semibold";
const cardText = "text-base leading-relaxed text-neutral-800";

// Which rule applies: whole-card links, the home page's .service-card pattern. The
// heading text is each card's one stretched link; the 504 card's PDF link sits
// above the stretch (relative z-10) so it stays its own target. Dates and cites
// exactly as the rule pages state them.
const RULES: {
  name: string;
  href: string;
  who: string;
  dates: React.ReactNode;
  extra?: React.ReactNode;
}[] = [
  {
    name: "ADA Title II",
    href: "/accessibility/title-ii",
    who: "Cities, counties, school districts, and special districts.",
    dates: (
      <>
        <strong style={{ color: "var(--head)" }}>28 CFR 35.200</strong>. April 26, 2027 for
        entities serving 50,000 or more; April 26, 2028 for smaller ones and all special
        districts, a year later than first set, by DOJ&apos;s interim final rule of April 20,
        2026 (document 2026-07663).
      </>
    ),
  },
  {
    name: "Section 504",
    href: "/accessibility/healthcare",
    who: "Hospitals, health centers, and nonprofits that receive HHS funding.",
    dates: (
      <>
        <strong style={{ color: "var(--head)" }}>45 CFR Part 84</strong>, WCAG 2.1 Level AA. May
        11, 2027 for recipients with 15 or more employees; May 10, 2028 for smaller ones.
      </>
    ),
    extra: (
      <a
        href="/Brian-Beals-LLC-Accessibility-Capability-Statement-Nonprofit.pdf"
        className="card-extra relative z-10 mt-2 inline-block text-base underline underline-offset-4"
        style={{ color: "var(--link)" }}
      >
        Capability statement for HHS-funded nonprofits (PDF)
      </a>
    ),
  },
  {
    name: "Section 508",
    href: "/accessibility/federal",
    who: "Federal agencies, and the vendors selling technology to them.",
    dates: (
      <>
        <strong style={{ color: "var(--head)" }}>36 CFR 1194</strong>. In force now, with no
        compliance date: a solicitation asks for a VPAT, and the answer is due with the bid.
      </>
    ),
  },
  {
    name: "Maryland Nonvisual Access",
    href: "/accessibility/maryland",
    who: "CATS+ master contractors and their subcontractors.",
    dates: (
      <>
        Maryland&apos;s own statute, State Finance and Procurement § 3.5-311, and the nonvisual
        access clause in the contract.
      </>
    ),
  },
];

// The three homepage cards link here by id. Keep the ids in step with the services
// array in app/page.tsx. The H3 copy matches the cards.
const SERVICES: { id: string; name: string; text: string }[] = [
  {
    id: "conformance-report",
    name: "Conformance Report",
    text: "Up to 25 pages across your site's templates, plus the documents linked from them, against all 50 WCAG 2.1 A and AA web accessibility criteria. An ACR in VPAT 2.5 format, an accessibility audit report with evidence per criterion, and a prioritized remediation list. Two to four weeks from scope sign-off.",
  },
  {
    id: "document-inventory",
    name: "Document Inventory and Triage",
    text: "Every PDF on your web properties cataloged and sorted: retire, replace with a web page, remediate, or leave under the rule's exceptions. A work order a remediation vendor can bid against, so per-page spend goes to the documents residents use.",
  },
  {
    id: "program-and-policy",
    name: "Program and Policy Setup",
    text: "The accessibility statement, ADA coordinator designation, grievance procedure, and self-evaluation record the rule expects. Plus procurement language that requires an ACR before you buy.",
  },
];

// Matches the October 22, 2026 report; checked against public/conformance-report.html
// on 2026-10-22. Change these numbers only when the report is regenerated, and change
// the home page Proof line with them.
const PROOF: { big: string; label: string }[] = [
  { big: "40", label: "Supports" },
  { big: "0", label: "Partially Supports or Does Not Support" },
  { big: "4 of 4", label: "PDFs tagged, pass veraPDF" },
  { big: "Oct 22, 2026", label: "Tested" },
];

// Native <details>: no script, and a screen reader announces each summary as a
// collapsed or expanded button. Styles in globals.css (.faq).
function Answer({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="faq">
      <summary>{q}</summary>
      <div className="faq-body">{children}</div>
    </details>
  );
}

export default function Accessibility() {
  const freeTest = freeTestEnabled();
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        {/* Navy band. Carries the mark, the one-line position and the two ways in, so a
            reader who arrived from an email sees a firm rather than a personal homepage. */}
        <div
          className="hero-band rounded-lg px-6 py-8 sm:px-8 sm:py-10 mb-10"
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
          <PageHeading tone="band" spacing="mb-4">Accessibility Conformance Reports</PageHeading>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#D6EAF8" }}>
            Independent WCAG 2.1 Level AA evaluation for public entities. I write the
            conformance report. I do not do the remediation, and that is the point.
          </p>
          <div className="flex flex-wrap gap-3">
            <BookCallLink
              placement="accessibility-hero"
              className="btn-cta rounded px-5 py-2.5 font-semibold hover:underline underline-offset-4"
            >
              Book a 15-minute call
            </BookCallLink>
            {freeTest ? (
              <Link
                href="/free-test"
                className="btn-on-band rounded px-5 py-2.5 font-semibold hover:underline underline-offset-4"
              >
                Free automated check
              </Link>
            ) : null}
          </div>
        </div>

        {/* The screen reader demo, smaller here (2026-10-22): app/components/DemoVideo.tsx,
            the same player, captions and transcript as the home page and /free-test. Its
            end card sends viewers to /free-test, so it shows only while that page is up. */}
        {freeTest ? (
          <section aria-labelledby="acc-demo" className="mb-8 max-w-xl">
            <SubHeading level={2} id="acc-demo" spacing="mt-0 mb-3">
              Hear What a Screen Reader Hears
            </SubHeading>
            <DemoVideo labelledBy="acc-demo" />
          </section>
        ) : null}

        <SectionHeading>Which Rule Applies to You?</SectionHeading>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-none mb-6">
          {RULES.map((r) => (
            <li key={r.href} className="service-card relative flex flex-col rounded-md border p-4">
              <SubHeading spacing="mt-0 mb-2">
                <Link
                  href={r.href}
                  className="underline underline-offset-4 after:absolute after:inset-0 after:rounded-md"
                  style={{ color: "var(--link)" }}
                >
                  {r.name}
                </Link>
              </SubHeading>
              <p className={`${cardText} mb-2`}>{r.who}</p>
              <p className={cardText}>{r.dates}</p>
              {r.extra}
            </li>
          ))}
        </ul>

        <SectionHeading>Services</SectionHeading>

        <p className={body}>
          Each one is digital accessibility (a11y) evaluation or the program paperwork around
          it. None of them is the repair.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-none mb-4">
          {SERVICES.map((s) => (
            <li key={s.id} className="hub-card rounded-md border p-4">
              <SubHeading id={s.id} spacing="mt-0 mb-2">
                {s.name}
              </SubHeading>
              <p className={cardText}>{s.text}</p>
            </li>
          ))}
        </ul>

        <p className={body}>
          <Link href="/accessibility/pricing" className={link} style={{ color: "var(--link)" }}>
            Pricing
          </Link>
          : fixed prices for each engagement.{" "}
          <Link href="/accessibility/before-we-start" className={link} style={{ color: "var(--link)" }}>
            Before we start
          </Link>
          : what has to be in place for a fixed fee to hold.
        </p>

        <SectionHeading>What You Get</SectionHeading>

        <p className={body}>
          An Accessibility Conformance Report in VPAT 2.5 format, the same document your
          procurement office already asks software vendors to produce: all 50 Level A and Level
          AA success criteria of WCAG 2.1, each one marked and evidenced, dated and signed.
          Alongside it, a prioritized remediation list your web vendor can bid against, and a
          one-page summary written for a commission meeting or a budget request.
        </p>

        <p className={body}>
          If a complaint ever arrives, the question is rarely whether the site was perfect. It
          is what you knew and what you were doing about it. Fixing everything and keeping no
          record leaves you with nothing to show.
        </p>

        <p className={body}>
          <Link href="/accessibility/sample-finding" className={link} style={{ color: "var(--link)" }}>
            See a sample finding
          </Link>
          , or{" "}
          <a href="/conformance-report.html" className={link} style={{ color: "var(--link)" }}>
            read this site&apos;s own report
          </a>
          .
        </p>

        <SectionHeading>The Proof</SectionHeading>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-none mb-6">
          {PROOF.map((t) => (
            <li key={t.label} className="hub-card rounded-md border p-4">
              <p
                className="text-2xl font-bold leading-tight"
                style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
              >
                {t.big}
              </p>
              <p className="text-sm leading-snug mt-1 text-neutral-800">{t.label}</p>
            </li>
          ))}
        </ul>

        <p className={body}>
          Thirty-nine pages and all four published documents, against all 50 Level A and AA
          criteria: the other 10 are Not Applicable, and nothing was left out. It is the same
          document a client receives, and this site&apos;s accessibility statement.{" "}
          <a href="/conformance-report.html" className={link} style={{ color: "var(--link)" }}>
            Read the full conformance report
          </a>
          .
        </p>

        <details className="faq mb-6">
          <summary>How This Site Was Tested</summary>
          <div className="faq-body">
            <p className={body}>
              The August 30 report marked one criterion Partially Supports: 2.4.5 Multiple Ways,
              because the report itself did not link the site map. Every page now does, the
              report included, and the October 8 report marks it Supports. Both earlier
              reports stay published at their own addresses, so the change is on the record
              rather than quietly replaced. A firm that evaluates its own site should show its
              edges, and its fixes.
            </p>
            <p className={body}>
              A person, not the scan, settled 23 checklist answers. They came from a scripted
              keyboard pass: Tab to the end of every page and back, then hover on every link.
              Then a VoiceOver pass in Safari, across 12 pages, confirmed four criteria by ear.
              On October 10 the sample grew to 13 pages, one per template, heard by two readers
              on two operating systems, by hand and by scripted capture: VoiceOver on macOS 27.0
              and NVDA 2026.2 on Windows 11. The two readers agreed on every check, and both
              announced the status message on the one page with a button. Reading order
              can&apos;t be scored by a machine, and no report from this practice will claim it
              was.
            </p>
            <p className={body}>
              The report is published here, produced by the same process a client gets, because
              a firm that sells conformance reports should have its own on display. The fastest
              way to judge whether the work is any good is to read one.
            </p>
          </div>
        </details>

        <SectionHeading>Why I Don&apos;t Remediate</SectionHeading>

        <p className={body}>
          A conformance claim written by whoever repaired the site is the vendor grading their
          own homework, and your counsel will say so. Staying out of the repair gives your
          remediation vendor a specification to bid against, instead of a per-page quote you
          have no way to check.
        </p>

        <SectionHeading>Questions</SectionHeading>

        <div className="mb-8 max-w-[70ch]">
          <Answer q="How Does the Evaluation Run?">
            <p className={body}>
              Automated scanning across a representative sample of pages, then manual testing
              for the criteria a machine cannot settle. Whether an image is decorative or
              meaningful, whether headings describe their sections, whether reading order
              carries meaning, whether an error message actually helps. Keyboard traversal and
              screen reader checks are done by hand.
            </p>
            <p className={body}>
              Every report states plainly what was tested and what was not. A row that mostly
              worked is Partially Supports. A report that overstates conformance is worse than
              one that admits a gap, because a reader who finds the gap themselves has reason to
              doubt every other row. Raw scans, screen reader recordings, and verification files
              are kept for the life of the report plus one year, and provided to the client on
              request.
            </p>
            <p className={body}>
              Documents count too. The Title II rule reaches conventional electronic documents,
              and an untagged PDF is the most common failure I find. A site can pass while its
              forms library does not.
            </p>
          </Answer>
          <Answer q="Is an Accessibility Conformance Report the Same as an Audit?">
            <p className={body}>
              They overlap. An accessibility audit finds the web accessibility problems and
              records the evidence. The conformance report is the signed, dated verdict on each
              of the 50 criteria. It uses the VPAT format your purchasing office already asks
              for. You get both.
            </p>
          </Answer>
          <Answer q="What Does ADA Title II Require by April 2027?">
            <p className={body}>
              Every state entity, and every local government serving 50,000 or more, must have
              its web content and mobile apps meet WCAG 2.1 Level AA by April 26, 2027. That
              includes the documents posted on the site and content a vendor provides for you.
              Smaller entities and special districts have until April 26, 2028.
            </p>
          </Answer>
          <Answer q="Does the Rule Cover PDFs?">
            <p className={body}>
              Yes. The rule calls them conventional electronic documents. They have to meet the
              same standard as the page that links them. The exceptions are narrow: archived
              content, and older files nobody uses to apply for or reach a service.
            </p>
          </Answer>
          <Answer q="Do You Do the Remediation?">
            <p className={body}>
              No, for the reasons under Why I Don&apos;t Remediate above. I am happy to refer a
              partner for the repair. I will not grade my own work.
            </p>
          </Answer>
        </div>

        <SectionHeading>The Firm</SectionHeading>

        <div className="flex flex-col items-start min-[600px]:flex-row gap-5 mb-6">
          <SbaMark height={72} />
          <div>
            <p className="text-base sm:text-lg leading-relaxed mb-4 text-neutral-800">
              Brian Beals, LLC. SBA-certified service-disabled veteran-owned small business,
              Florida Veteran Business Enterprise, Maryland Veteran-Owned Small Business
              Enterprise. Registered in SAM.gov and based in Punta Gorda, Florida. A
              contracting officer can confirm the certification and registration in{" "}
              <a
                href="https://search.certifications.sba.gov/"
                className="underline underline-offset-4 hover:no-underline"
                style={{ color: "var(--link)" }}
              >
                SBA&apos;s Small Business Search
              </a>{" "}
              by UEI {UEI}.
            </p>
            <dl className="flex flex-wrap gap-x-6 gap-y-1 text-base leading-relaxed text-neutral-800">
              <div className="flex gap-2">
                <dt className="font-semibold">UEI</dt>
                <dd className="font-mono">{UEI}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">CAGE</dt>
                <dd className="font-mono">{CAGE}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">NAICS</dt>
                <dd className="font-mono">{NAICS_LIST}</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className={body}>
          Capability statements, one page each for your procurement file. Two cover the
          practice:{" "}
          <a href="/Brian-Beals-LLC-Accessibility-Capability-Statement.pdf" className={link} style={{ color: "var(--link)" }}>
            ADA Title II
          </a>{" "}
          and{" "}
          <a href="/Brian-Beals-LLC-Accessibility-Capability-Statement-Federal.pdf" className={link} style={{ color: "var(--link)" }}>
            federal Section 508
          </a>{" "}
          (PDFs). Three more are written for a specific rule and live with it:{" "}
          <Link href="/accessibility/healthcare" className={link} style={{ color: "var(--link)" }}>
            Section 504 for healthcare
          </Link>
          ,{" "}
          <a href="/Brian-Beals-LLC-Accessibility-Capability-Statement-Nonprofit.pdf" className={link} style={{ color: "var(--link)" }}>
            Section 504 for HHS-funded nonprofits
          </a>{" "}
          (PDF), and{" "}
          <Link href="/accessibility/maryland" className={link} style={{ color: "var(--link)" }}>
            Maryland nonvisual access
          </Link>
          . All are tagged PDFs. A firm that hands you an inaccessible document about
          accessibility has told you something.
        </p>

        <SectionHeading>Getting Started</SectionHeading>

        <p className={body}>
          Fifteen minutes is usually enough to tell whether this is worth your time. I will walk
          you through what a sample of your site shows and what full scope would look like for
          an entity your size. If the timing is wrong, say so and I will leave it alone.
        </p>

        <p className={body}>
          <BookCallLink placement="accessibility-close" className="underline underline-offset-4" style={{ color: "var(--link)" }}>
            Book a 15-minute call
          </BookCallLink>
          ,{" "}
          <Link href="/contact" className="underline underline-offset-4" style={{ color: "var(--link)" }}>
            send a message
          </Link>
          , or write to{" "}
          <a href="mailto:brian@brianbeals.com" className="underline underline-offset-4" style={{ color: "var(--link)" }}>
            brian@brianbeals.com
          </a>
          .
        </p>
        {/* The free test's quiet entry point, only while it is on (lib/free-test.ts). */}
        {freeTest ? (
          <p className={body}>
            <Link href="/free-test" className="underline underline-offset-4" style={{ color: "var(--link)" }}>
              Free automated check
            </Link>{" "}
            of up to 10 pages and 10 linked PDFs, emailed to you.
          </p>
        ) : null}
      </article>
    </div>
  );
}
