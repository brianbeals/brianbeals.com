import Link from "next/link";
import BookCallLink from "@/app/components/BookCallLink";
import HeroDemo from "@/app/components/HeroDemo";
import PageHeading from "@/app/components/PageHeading";
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

export default function Home() {
  const freeTest = freeTestEnabled();
  return (
    <div className="flex-1 px-6 pt-8 pb-12 sm:px-12 sm:pt-10 sm:pb-16">
      <div className="max-w-5xl mx-auto page-wide">
        {/* Hero, option C (2026-10-22): the headline and everything under it centered
            across the full width, then app/components/HeroDemo.tsx: the two demo city
            guides with what NVDA read under each, and while the demo is up, the "Hear
            both" button that swaps the player in. The home page has no other player. */}
        <section className="text-center">
          <div className="text-balance">
            <PageHeading scale="hero" spacing="mb-4">
              More than one in four U.S. adults has a disability. Can they use your forms and documents?
            </PageHeading>
          </div>
          <p className={`${body} mb-2 mx-auto`}>
            Independent accessibility testing for government agencies, health centers, schools, and the
            vendors who sell to them. I test your website and documents against WCAG 2.1 AA and tell
            you what to fix first.
          </p>
          {/* The headline's source, as a footnote under the subtext (2026-10-22). */}
          <p className="text-xs sm:text-sm mb-5 mx-auto" style={{ color: "var(--muted-ink)" }}>
            Source:{" "}
            <a href={CDC_SOURCE} className={link} style={{ color: "var(--link)" }}>
              CDC Disability and Health Data System
            </a>
            , 28.7% of U.S. adults, 2022 survey data.
          </p>
          {/* One primary button (2026-10-23, SBDC review). While the free test is on,
              "Get a free automated check" is the hero's only filled button, in --cta-bg
              green; the readiness checklist and the call are text links in the line
              under it, and the call stays a button in the top bar. "Hear both" below is
              a text-style button. Off, the call takes the button and the checklist
              stays a text link. Clicks on the call links are "book_call_click" events
              (BookCallLink). */}
          <div className="flex flex-wrap justify-center gap-3 mb-3">
            {freeTest ? (
              <Link
                href="/free-test"
                className="btn-cta rounded px-5 py-2.5 font-semibold hover:underline underline-offset-4"
              >
                Get a free automated check
              </Link>
            ) : (
              <BookCallLink
                placement="home-hero"
                className="btn-cta rounded px-5 py-2.5 font-semibold hover:underline underline-offset-4"
              >
                Request a 15-minute call
              </BookCallLink>
            )}
          </div>
          <p className="text-base mx-auto text-neutral-800">
            Not sure where you stand?{" "}
            <Link href="/accessibility/before-we-start" className={link} style={{ color: "var(--link)" }}>
              Run the readiness checklist
            </Link>
            {freeTest ? (
              <>
                {" "}or{" "}
                <BookCallLink placement="home-hero" className={link} style={{ color: "var(--link)" }}>
                  request a 15-minute call
                </BookCallLink>
              </>
            ) : null}
            .
          </p>

          <HeroDemo demo={freeTest} />
        </section>

        {/* Why I do this (2026-10-22): four paragraphs, wording approved by Brian. Since
            2026-10-23 a signed founder note: first person, under a left rule, ending on
            the signature. The rest of the site's description of Brian (/about) is third
            person. */}
        <section>
          <SectionHeading>Why I Do This</SectionHeading>
          <div className="border-l-4 pl-5" style={{ borderColor: "var(--rule)" }}>
            <p className={`${body} mb-4`}>
              I set out to start an IT consulting company, and I did the paperwork the way everyone does:
              articles of organization, a business tax receipt, a property use form. Most of it wasn&apos;t
              online. What was online came as PDFs to print, and the boxes were too small for what they asked. So I
              sat in a government lobby while a clerk worked through what I&apos;d written and typed every
              field back into a computer.
            </p>
            <p className={`${body} mb-4`}>
              She was patient. The form was the problem, and my handwriting didn&apos;t help.
            </p>
            <p className={`${body} mb-4`}>
              I&apos;ve spent my career helping large organizations get value from their data, and that
              morning I saw the other end of it. A form that gave me trouble shuts out someone who can&apos;t
              see it, can&apos;t hold a pen, or fills it in with a screen reader. The new federal rules say
              those forms have to work for everyone.
            </p>
            <p className={`${body} mb-4`}>
              My job is to test them, independently, and tell you plainly what works before a resident finds
              out what doesn&apos;t.
            </p>
            <p className={`${body} font-semibold`} style={{ color: "var(--head)" }}>
              Brian Beals, founder
            </p>
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
          <SectionHeading>What I Test</SectionHeading>
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
          <SectionHeading>What the Documents Show</SectionHeading>
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
