import Link from "next/link";
import PageHeading from "@/app/components/PageHeading";
import PeopleGraphic from "@/app/components/PeopleGraphic";
import SectionHeading from "@/app/components/SectionHeading";
import SubHeading from "@/app/components/SubHeading";
import { enabled as freeTestEnabled } from "@/lib/free-test";

// Homepage, pass 2b (2026-10-16): hero, trust strip, three service cards, proof
// band, founder line. Copy approved by Brian; ask before changing wording. The
// career stats and the projects list moved off the homepage; /about carries both.
//
// The hero statistic is the CDC's: 28.7% of U.S. adults reported a disability in
// the 2022 BRFSS, the latest year in the Disability and Health Data System
// (checked 2026-10-16; the CDC's "Disability Impacts All of Us" page, updated
// 2026-05-05, says "more than 1 in 4"). Recheck when DHDS adds a year.
const CDC_SOURCE = "https://www.cdc.gov/disability-and-health/articles-documents/disability-and-health-data-now.html";

// Dates match /accessibility, /accessibility/title-ii, /accessibility/healthcare and
// /accessibility/federal.
// Change them together.
const services = [
  {
    name: "ADA Title II",
    href: "/accessibility/title-ii",
    text: "For cities, counties, school districts, and special districts. Web content and documents must meet WCAG 2.1 AA by April 26, 2027, or April 26, 2028 for smaller entities.",
  },
  {
    name: "Section 504",
    href: "/accessibility/healthcare",
    text: "For health centers, hospitals, and any recipient of HHS funding. The deadline is May 11, 2027 with 15 or more employees, and May 10, 2028 for smaller ones.",
  },
  {
    name: "Section 508",
    href: "/accessibility/federal",
    text: "For federal agencies and the vendors selling them software. It's in force now, and the VPAT is due with the bid.",
  },
];

const link = "underline underline-offset-4 hover:no-underline";
const body = "text-base sm:text-lg leading-relaxed text-neutral-800";

const TRUST = [
  "SBA-certified service-disabled veteran-owned small business",
  "Florida VBE",
  "Maryland VSBE",
  "Evaluation only, never remediation",
];

const outlined = "rounded border-2 px-5 py-2 font-semibold hover:underline underline-offset-4";
const outlinedStyle = { borderColor: "var(--link)", color: "var(--link)" };

export default function Home() {
  const freeTest = freeTestEnabled();
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-5xl mx-auto page-wide">
        {/* Hero. The graphic follows the text in source order, so it stacks below
            it on narrow screens and adds nothing to the reading order. */}
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 md:gap-12 items-center">
          <div>
            <PageHeading spacing="mb-6">
              More than one in four U.S. adults has a disability. Can they use your forms?
            </PageHeading>
            <p className={`${body} mb-8`}>
              Independent accessibility testing for government agencies, health centers, schools, and the
              vendors who sell to them. I test your website and documents against WCAG 2.1 AA and tell
              you what to fix first.
            </p>
            {/* While the free test is on (2026-10-17), it is the primary button and
                the call is the outlined second, with the readiness checklist as a
                text line under the buttons. Off, the call is primary and the
                checklist button takes the second slot. */}
            <div className={`flex flex-wrap gap-3 ${freeTest ? "mb-3" : "mb-6"}`}>
              {freeTest ? (
                <>
                  <Link
                    href="/free-test"
                    className="btn-cta rounded px-5 py-2.5 font-semibold hover:underline underline-offset-4"
                  >
                    Get a free automated check
                  </Link>
                  <Link href="/contact" className={outlined} style={outlinedStyle}>
                    Book a 15-minute call
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/contact"
                    className="btn-cta rounded px-5 py-2.5 font-semibold hover:underline underline-offset-4"
                  >
                    Book a 15-minute call
                  </Link>
                  <Link href="/accessibility/before-we-start" className={outlined} style={outlinedStyle}>
                    Run the readiness checklist
                  </Link>
                </>
              )}
            </div>
            {freeTest ? (
              <p className="text-base mb-6 text-neutral-800">
                Not sure where you stand?{" "}
                <Link href="/accessibility/before-we-start" className={link} style={{ color: "var(--link)" }}>
                  Run the readiness checklist
                </Link>
                .
              </p>
            ) : null}
            <p className="text-sm" style={{ color: "var(--muted-ink)" }}>
              Source:{" "}
              <a href={CDC_SOURCE} className={link} style={{ color: "var(--link)" }}>
                CDC Disability and Health Data System
              </a>
              , 28.7% of U.S. adults, 2022 survey data.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <PeopleGraphic />
          </div>
        </section>

        {/* Trust strip, a list since 2026-10-17: as one paragraph of spans VoiceOver ran
            the items together ("small businessFlorida VBE"). Four list items, so it reads
            "list, 4 items" with a pause between them. role="list" because Safari drops
            list semantics from a ul with no bullets. Each item keeps its words together
            except the first, which is longer than a 320px line; the dots are
            decoration, hidden from assistive technology. */}
        <ul
          role="list"
          className="mt-12 rounded-md px-5 py-3 text-sm sm:text-base font-semibold leading-relaxed max-w-none list-none flex flex-wrap"
          style={{ backgroundColor: "var(--band)", color: "var(--head)" }}
        >
          {/* Each item is its own box with the dot trailing it. As inline items on one
              line VoiceOver still read all four as a single item ("1 of 4", heard by ear
              2026-10-17), so they are flex items; lines wrap after a dot. */}
          {TRUST.map((t, i) => (
            <li key={t}>
              <span className={i ? "whitespace-nowrap" : undefined}>{t}</span>
              {i < TRUST.length - 1 ? <span aria-hidden="true">&nbsp;·&nbsp;</span> : null}
            </li>
          ))}
        </ul>

        <section>
          <SectionHeading>What I test</SectionHeading>
          {/* Whole-card links (globals.css, .service-card). The heading text is the one
              link in each card; its ::after stretches over the card, so the whole card is
              the click target while the link's name stays the short service name. The
              arrow is decoration, hidden from assistive technology, and not a link. */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-none">
            {services.map((s) => (
              <li key={s.href} className="service-card relative flex flex-col rounded-md border p-5">
                <SubHeading spacing="mt-0 mb-2">
                  <Link href={s.href} className="underline underline-offset-4 after:absolute after:inset-0 after:rounded-md" style={{ color: "var(--link)" }}>
                    {s.name}
                  </Link>
                </SubHeading>
                <p className="text-base leading-relaxed text-neutral-800 mb-4">{s.text}</p>
                {/* Drawn, not a "→" character: axe returns a lone symbol as contrast "needs review". */}
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="service-card-arrow mt-auto"
                  style={{ color: "var(--link)" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading>What the documents show</SectionHeading>
          <p className={`${body} mb-4`}>
            A sample of one Florida city&apos;s website: 8 of 26 PDFs had no tags. A sample of one
            Florida health center&apos;s: 4 of 5, including the sliding-fee application.
          </p>
          <ul className="mb-6 space-y-2 text-base sm:text-lg">
            <li>
              <Link href="/writing/eight-of-twenty-six" className={link} style={{ color: "var(--link)" }}>
                Read Eight of Twenty-Six
              </Link>
            </li>
            <li>
              <Link href="/writing/the-form-that-sets-the-price" className={link} style={{ color: "var(--link)" }}>
                Read The Form That Sets the Price
              </Link>
            </li>
          </ul>
          <p className={body}>
            This site gets the same test.{" "}
            <a href="/conformance-report.html" className={link} style={{ color: "var(--link)" }}>
              Read its Accessibility Conformance Report
            </a>
            .
          </p>
        </section>

        <p className={`${body} mt-12`}>
          I founded Brian Beals, LLC to do independent accessibility evaluation. I do the testing
          myself and sign every report.{" "}
          <Link href="/about" className={link} style={{ color: "var(--link)" }}>
            About me
          </Link>
        </p>
      </div>
    </div>
  );
}
