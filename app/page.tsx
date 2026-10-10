import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    figure: "$0 → $20M",
    label: "Mainline Information Systems Business Analytics, five years",
  },
  {
    // Founded, not inherited. There was no practice and no leader before this
    // one, only scattered product sales, so "$20M → $78M" misread as a takeover.
    figure: "$78M",
    label: "Founded the Big Data and Analytics group at Sirius and built it to $78M in under four years",
  },
];

// Each card links to its section on /accessibility. Keep the ids in step with
// the H3 ids there.
const services = [
  {
    name: "Conformance Report",
    href: "/accessibility#conformance-report",
    description:
      "Up to 25 pages across your site's templates, plus the documents linked from them, against all 50 WCAG 2.1 A and AA web accessibility criteria. An ACR in VPAT 2.5 format, an accessibility audit report with evidence per criterion, and a prioritized remediation list. Two to four weeks.",
  },
  {
    name: "Document Inventory and Triage",
    href: "/accessibility#document-inventory",
    description:
      "Every PDF on your web properties cataloged and sorted: retire, replace with a web page, remediate, or leave under the rule's exceptions. A work order a remediation vendor can bid against, so per-page spend goes to the documents residents use.",
  },
  {
    name: "Program and Policy Setup",
    href: "/accessibility#program-and-policy",
    description:
      "The accessibility statement, ADA coordinator designation, grievance procedure and self-evaluation record the rule expects. Plus procurement language that requires an ACR before you buy.",
  },
];

type ProjectLink = { label: string; href: string };

const projects: { name: string; description: string; links: ProjectLink[] }[] = [
  {
    name: "Marine Forecast",
    description:
      "A live marine forecast for my home water, Charlotte Harbor and Pine Island Sound. It parses the NWS coastal waters product into wind, chop, and storm-risk cards, adds Port Boca Grande tides and a red-tide line from the state's sampling, and ends on a verdict: a plain call on whether to go, and the best window to be out. The browser samples NEXRAD over the harbor and the pass every few minutes, which catches a cell on the water that the inland airport observation misses. GitHub Actions republishes after each NWS issuance. Runs entirely on public NOAA endpoints and GitHub Pages, so hosting is free, making it the only part of this project that respected a budget.",
    links: [
      { label: "Live", href: "https://weather.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/marine-forecast" },
    ],
  },
  {
    name: "Harbor Spots",
    description:
      "A map of the artificial reefs, boat ramps, seagrass beds, and manatee zones in Charlotte Harbor and Pine Island Sound, assembled from live state GIS services. Pick where you're leaving from and it recomputes every reef's distance and magnetic bearing, redraws the 20 nm range ring, and refits the view. A strip in the corner reads today's conditions from the forecast above. Rebuilt weekly from FWC and DEP feature services. The one hand-entered piece is the marina list, because no GIS layer knows which docks people actually leave from.",
    links: [
      { label: "Live", href: "https://harbor.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/harbor-spots" },
    ],
  },
  {
    name: "Sector Rotation Screener",
    description:
      "A Python pipeline that scores the 11 SPDR sector ETFs against three signals: seasonality, economic-cycle fit, and relative strength. Backtests 15 years against SPY. Runs every Sunday via GitHub Actions, asks Claude for a plain-language read on the output, and commits the dashboard back to the repo. The banner up top reports whether the strategy is beating SPY net of trading costs, and it leads with that number whichever way it points. Fifteen years in, the two are close enough that the answer moves between runs, which is why the live page reports it and this one does not.",
    links: [
      { label: "Live", href: "https://sector.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/sector-rotation-screener" },
    ],
  },
  {
    name: "Lobo",
    description:
      "An always-on agent that lives on the Mac mini and texts like a member of the household. Every 30 minutes it checks the GitHub deploys for everything above, retries the transient failures, and texts me only when something stays broken. On Mondays it reads a legislative watch report and texts the highlights. It answers texts on its own iMessage identity, a dedicated Apple ID, because a bot on your own phone number can't tell your texts from its own echoes. Runs locally on OpenClaw with Claude doing the thinking. Getting iMessage working surfaced an upstream bug I reported and got fixed.",
    links: [
      { label: "Upstream fix", href: "https://github.com/openclaw/openclaw/issues/99638" },
    ],
  },
  {
    name: "This site",
    description: "Next.js on Vercel.",
    links: [
      { label: "Code", href: "https://github.com/brianbeals/brianbeals.com" },
    ],
  },
];

export default function Home() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8" style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}>
          Brian Beals, LLC
        </h1>
        <p className="text-xl sm:text-2xl leading-snug font-medium mb-8">
          Independent digital accessibility evaluation for Florida public entities. AI, analytics and automation consulting from someone who builds what he recommends.
        </p>
        {/* No hero image, on purpose. The text opens the page; the headshot
            lives in "Who does the work" below and is the only photo. */}
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A veteran-owned firm in Punta Gorda. If you run the website for a Florida county, city, school district or hospital, you have a date: April 26, 2027 for most public entities, April 26, 2028 for the smaller ones, and May 11, 2027 for hospitals under Section 504. I tell you where you stand against WCAG 2.1 Level AA and what to fix first, in a signed Accessibility Conformance Report.
        </p>
        {/* Its own paragraph, as a rule rather than a feature. */}
        <p className="text-base sm:text-lg leading-relaxed mb-12 text-neutral-800">
          I do not sell remediation. A conformance report from a firm that also sells the fix is a sales document. Mine is not, and that is the reason to hire me.
        </p>
        <section className="mb-12 pb-12 border-b border-neutral-200">
          <h2
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6"
            style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
          >
            Accessibility services
          </h2>
          {/* Every card is a real link. The anchor sits on the card title and
              its ::after stretches over the whole card, so the click target is
              the card while the link's accessible name stays the short title
              rather than the whole description. */}
          <ul className="grid grid-cols-1 gap-4 mb-6">
            {services.map((c) => (
              <li
                key={c.href}
                className="relative rounded-md border border-neutral-200 p-5 hover:border-neutral-400"
              >
                <h3 className="text-lg font-semibold tracking-tight mb-2">
                  <Link
                    href={c.href}
                    className="underline underline-offset-4 after:absolute after:inset-0"
                    style={{ color: "var(--link)" }}
                  >
                    {c.name}
                  </Link>
                </h3>
                <p className="text-base leading-relaxed text-neutral-800">
                  {c.description}
                </p>
              </li>
            ))}
          </ul>
          {/* Dates match /accessibility and /accessibility/healthcare, which
              carries the HHS extension of May 11, 2026, document 2026-09266.
              Change all three together. */}
          <p className="text-base leading-relaxed text-neutral-800">
            <Link
              href="/accessibility"
              className="underline underline-offset-4 hover:no-underline"
              style={{ color: "var(--link)" }}
            >
              Dates: April 26, 2027 for public entities serving 50,000 or more and for every state entity; April 26, 2028 for smaller entities and special districts. Hospitals and health centers under Section 504: May 11, 2027 for 15 or more employees, May 10, 2028 under 15.
            </Link>
          </p>
        </section>
        <section className="mb-12 pb-12 border-b border-neutral-200">
          <h2
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6"
            style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
          >
            Proof
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
            This site is evaluated under the same method I sell. The current Accessibility Conformance Report, re-evaluated October 10, 2026 with scripted and by-ear screen reader testing, is public.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
            <a href="/conformance-report.html" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
              Read the Accessibility Conformance Report
            </a>
            <Link href="/documents" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
              Capability statements
            </Link>
          </div>
        </section>
        <section className="mb-12 pb-12 border-b border-neutral-200">
          <h2
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6"
            style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
          >
            Who does the work, and how long it takes
          </h2>
          {/* Key Personnel is scored in public-sector RFPs, so this block names
              the person. No certifications here: those live on /accessibility
              and the capability statements, and nothing here may imply an IAAP
              credential. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              {/* TWO SEPARATE JOBS, DELIBERATELY NOT SOLVED BY THE SAME KNOB.

                  Getting the high-resolution headshot into Google Images is the
                  IMAGE SITEMAP's job (see app/sitemap.ts). That entry nominates the
                  raw 3093x3369 /brian-beals.jpg, not a _next/image variant, so the
                  crawler never has to choose among downscaled candidates.
                  Person.image in the JSON-LD points at the same file.

                  Rendering this element is a different job, and the only thing that
                  matters here is being honest and fast. Until 2026-10-10 it sat at
                  the top of the page with `priority` as the LCP element. It now sits
                  below the fold, so `priority` is gone and it lazy-loads; the LCP is
                  the H1 text.

                  `sizes` MUST describe the real display width. An earlier pass set
                  it to 640px against a 180px box; the browser believed it and pulled
                  a 1280 or 1920 candidate on retina to paint a 180px square, and the
                  emitted `src` resolved to w=3840. Overstating `sizes` to chase the
                  index is a performance regression that buys nothing the sitemap has
                  not already delivered. */}
              <Image
                src="/brian-beals.jpg"
                alt="Brian Beals"
                width={400}
                height={400}
                sizes="(min-width: 640px) 200px, 180px"
                className="rounded-md shadow-sm w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] object-cover mb-5"
              />
              <p className="text-base sm:text-lg leading-relaxed text-neutral-800">
                <strong style={{ color: "var(--head)" }}>Brian Beals</strong>. Navy veteran, electronics technician by training. Built and led enterprise data and AI practices before this, and did the delivery underneath them. Every evaluation is done by me, by hand and by screen reader, and I sign it.
              </p>
            </div>
            <div>
              <ol className="list-decimal pl-6 space-y-3 text-base sm:text-lg leading-relaxed text-neutral-800 mb-6">
                <li>First call, 30 minutes, free.</li>
                <li>Scope and fixed quote within a week.</li>
                <li>Evaluation, two to four weeks.</li>
                <li>Signed report, remediation list and a walkthrough with your team.</li>
              </ol>
              <p className="text-base leading-relaxed text-neutral-800">
                Purchase order or credit card. Under most direct-purchase thresholds, so no RFP.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-12 pb-12 border-b border-neutral-200">
          <h2
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6"
            style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
          >
            AI, analytics and automation
          </h2>
          {/* Positioning only: no services list, no pricing, no engagement
              names. That waits until the AI page joins /accessibility. */}
          <p className="text-base sm:text-lg leading-relaxed mb-10 text-neutral-800">
            The second practice. I&apos;ve built and scaled enterprise data and AI practices three times, from a blank page to real revenue, and the work I care about is the unglamorous middle: data foundation, integration, governance, the second budget cycle. For organizations past the pilot and into the part where the technology either pays for itself or doesn&apos;t.
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            {stats.map((s) => (
              <div key={s.figure}>
                <dt
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
                >
                  {s.figure}
                </dt>
                <dd className="mt-2 text-sm text-neutral-600 leading-snug">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="mb-12 pb-12 border-b border-neutral-200">
          <h2
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8"
            style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
          >
            Building in public
          </h2>
          <div className="space-y-8">
            {projects.map((p) => (
              <div key={p.name}>
                <h3
                  className="text-xl font-semibold tracking-tight mb-2"
                  style={{ color: "var(--head)" }}
                >
                  {p.name}
                </h3>
                <p className="text-base leading-relaxed text-neutral-800">
                  {p.description}
                </p>
                {p.links.length > 0 && (
                  <p className="mt-3 text-sm">
                    {p.links.map((l, i) => (
                      <span key={l.href}>
                        {i > 0 && (
                          <span aria-hidden="true" style={{ color: "var(--muted-ink)" }}>
                            {" "}
                            ·{" "}
                          </span>
                        )}
                        {/* 2.4.4 Link Purpose. Seven links on this page read
                            "Live" or "Code". A screen reader's links list shows
                            them stripped of their card, so name the project. */}
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${l.label}: ${p.name}`}
                          className="underline underline-offset-4 hover:no-underline"
                          style={{ color: "var(--link)" }}
                        >
                          {l.label}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I don't sell technology I haven't tried to build myself.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-8 text-neutral-800">
          This is where the work goes public. Each project above is a working answer to the same question: what can an enterprise sales leader build without an engineering team, now that the tooling has caught up. New work lands here as it ships.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
          <Link href="/about" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
            More about my work
          </Link>
          <Link href="/contact" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
