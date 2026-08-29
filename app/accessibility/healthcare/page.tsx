import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Section 504 Web and Document Accessibility for Healthcare",
  description:
    "HHS Section 504 final rule at 45 CFR Part 84 requires WCAG 2.1 Level AA by May 11, 2027 for recipients with 15 or more employees, May 10, 2028 under 15. Independent conformance evaluation and patient-facing document inventory for hospitals, FQHCs, community health centers, and physician practices.",
  alternates: {
    canonical: "/accessibility/healthcare",
  },
  openGraph: {
    title:
      "Section 504 Web and Document Accessibility for Healthcare | Brian Beals, LLC",
    description:
      "45 CFR Part 84 requires WCAG 2.1 Level AA by May 11, 2027. The legacy-document exemption does not cover the forms patients use to apply for or access your programs. Independent evaluation, not remediation.",
    url: "/accessibility/healthcare",
    type: "website",
  },
  twitter: {
    title:
      "Section 504 Web and Document Accessibility for Healthcare | Brian Beals, LLC",
    description:
      "45 CFR Part 84 requires WCAG 2.1 Level AA by May 11, 2027. The legacy-document exemption does not cover the forms patients use to apply for or access your programs.",
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

export default function AccessibilityHealthcare() {
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
            Section 504 for Healthcare
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#D6EAF8" }}>
            The HHS final rule at 45 CFR Part 84 sets WCAG 2.1 Level AA as the standard
            for web content, mobile apps, and electronic documents. If you take Medicare
            or Medicaid, it reaches you.
          </p>
        </div>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The rule took effect July 8, 2024. On May 7, 2026, the HHS Office for Civil
          Rights issued an interim final rule moving both compliance dates out by one
          year, so a date you wrote down before that has changed.
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
            <dt className="font-semibold">Recipients with 15 or more employees</dt>
            <dd className="mb-3 font-mono">May 11, 2027</dd>
            <dt className="font-semibold">Recipients with fewer than 15 employees</dt>
            <dd className="mb-3 font-mono">May 10, 2028</dd>
          </dl>
          <p className="text-sm" style={{ color: "#5B6470" }}>
            The employee count sets which date applies. It does not decide whether you
            are covered. An eight-person practice billing Medicaid is a recipient, with
            the later date.
          </p>
        </div>

        <H2>Who counts as a recipient</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Any recipient of HHS federal financial assistance. Hospitals and health
          systems, federally qualified health centers and community health centers,
          physician and dental practices, behavioral health, dialysis, long-term care,
          home health, health plans, research institutions, medical schools, and human
          services programs.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Medicare and Medicaid participation is federal financial assistance for this
          purpose, which is what pulls in nearly every provider in the country. Federal
          procurement contracts and contracts of insurance or guaranty are not. This is
          the point most organizations get wrong, usually by assuming that not holding a
          grant means not being a recipient.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Enforcement runs through HHS OCR investigations and compliance reviews, with
          loss of federal funding at the far end. Section 504 also carries a private
          right of action, so a complaint does not have to start with the agency.
        </p>

        <H2>The part about your documents</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The rule exempts electronic documents that existed before your compliance date.
          Read the next clause carefully, because it is where the exemption stops:
        </p>

        <blockquote
          className="my-8 border-l-4 pl-5 text-base sm:text-lg leading-relaxed italic"
          style={{ borderColor: "#1E3A5F", color: "#1A1A2A" }}
        >
          The exception does not apply where such documents are being utilized by
          individuals to apply for, access, or take part in a recipient&apos;s program or
          activity.
        </blockquote>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That sentence puts every patient-facing document back in scope regardless of
          when it was published. Intake and registration forms. Consent forms. Financial
          assistance and charity care applications. Notices of privacy practices. Patient
          education material. Anything hanging off the portal. The date it went up does
          not matter if a patient uses it to get care.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A mid-size health system has thousands of these across departments, service
          lines, and clinic microsites, accumulated over a decade by people who have
          since left. Ask a compliance officer how many patient-facing PDFs are on their
          web properties and the honest answer is that nobody knows. That unknown
          denominator is the actual problem. You cannot plan remediation, budget it, or
          tell OCR what you were doing about it without a number.
        </p>

        <H2>Start with the count, not the repair</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The first engagement is a baseline inventory: every patient-facing document
          discovered across your web properties, each one tested for tag structure,
          reading order, language, headings, table headers, and alternative text, sorted
          by whether a patient uses it to apply for or access a program. You end with a
          count, a prioritized list, and a defensible record of the date you established
          both.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The website evaluation runs alongside it and produces an Accessibility
          Conformance Report in VPAT 2.5 format against all 50 Level A and AA success
          criteria of WCAG 2.1, each one marked and evidenced, dated and signed. Periodic
          re-testing after that, because a document library drifts: every new form
          uploaded without tags moves you backward, and a count taken once is a count
          that was true once.
        </p>

        <H2>Why I do not remediate</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A conformance claim written by whoever repaired the documents is a
          self-assessment. The evaluation has to come from outside the repair work or it
          is the vendor grading their own homework, and your counsel will say so.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Staying out of the repair also gives you a specification your remediation
          vendor bids against, instead of a per-document quote you have no way to check.
          I am happy to refer a partner for the repair. I will not hold both ends.
        </p>

        <div className="my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <h2
            className="text-lg font-semibold mb-3 tracking-tight"
            style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
          >
            What this is not
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#1A1A2A" }}>
            Not an overlay, a widget, or a script you paste into your site. Those have
            been named in litigation rather than protecting against it, and OCR is not
            going to accept one as conformance. Not an unsolicited scan of your live site
            emailed to you as leverage either. If you want a baseline, ask for one and I
            will produce it. Uninvited findings are how the overlay vendors work and it
            is why your inbox already has a folder for them.
          </p>
        </div>

        <H2>An overlapping obligation worth knowing</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Public hospital districts and other government-operated providers are covered
          by ADA Title II as well, at{" "}
          <strong style={{ color: "var(--head)" }}>28 CFR 35.200</strong>, with its own
          dates of April 26, 2027 and April 26, 2028. The two obligations are independent
          and both apply. The one that binds is whichever arrives first, which for most
          districts is the Section 504 date.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This matters in one direction people miss. Section 504 follows the federal
          funding rather than the corporate form, so a district that converts to a
          private nonprofit leaves Title II and stays a 504 recipient.{" "}
          <Link
            href="/accessibility"
            className="underline underline-offset-4 font-semibold"
            style={{ color: "var(--link)" }}
          >
            See the Title II and Section 508 practice
          </Link>{" "}
          if that is the side you are on.
        </p>

        <H2>The proof</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This site carries its own Accessibility Conformance Report. Fifteen pages and
          all four published documents evaluated against all 50 Level A and AA criteria
          on August 14, 2026: 36 Supports and 14 Not Applicable, with zero criteria
          failing. The document layer passed too, every PDF tagged with structure,
          language, and headings verified.{" "}
          <a
            href="/conformance-report.html"
            className="underline underline-offset-4 font-semibold"
            style={{ color: "var(--link)" }}
          >
            Read the full conformance report
          </a>
          . It is the same document a client receives, produced by the same process. The
          fastest way to judge whether the work is any good is to read one.
        </p>

        <div className="my-8 rounded-md p-5" style={{ backgroundColor: "#D6EAF8" }}>
          <h2
            className="text-lg font-semibold mb-3 tracking-tight"
            style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
          >
            Capability statement
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#1A1A2A" }}>
            One page for your file, written for Section 504.
          </p>
          <ul className="mb-4 space-y-3">
            <li>
              <a
                href="/Brian-Beals-LLC-Accessibility-Capability-Statement-Healthcare.pdf"
                className="underline underline-offset-4 font-semibold"
                style={{ color: "#22688F" }}
              >
                Accessibility practice, Section 504 healthcare
              </a>
              <span className="block text-base" style={{ color: "#1A1A2A" }}>
                Patient-facing document inventory, conformance evaluation, and ACR work,
                framed for 45 CFR Part 84 and the May 11, 2027 date.
              </span>
            </li>
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
            A tagged PDF: structure tree present, language declared, headings in order,
            table headers marked. A firm that hands you an inaccessible document about
            accessibility has told you something.
          </p>
        </div>

        <H2>The firm</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Brian Beals, LLC. Service-disabled veteran-owned small business, based in Punta
          Gorda, Florida.
        </p>

        <dl className="text-base leading-relaxed mb-8 text-neutral-800">
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

        <H2>Getting started</H2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Twenty minutes is usually enough to tell whether this is worth your time. I
          will walk you through what the rule reaches at an organization your size and
          what a baseline inventory would cover. If the timing is wrong, say so and I
          will leave it alone.
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
