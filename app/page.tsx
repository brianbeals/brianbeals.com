import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    figure: "$0 → $20M",
    label: "Mainline Information Systems Business Analytics, five years",
  },
  {
    figure: "$20M → $78M",
    label: "Sirius Big Data & Analytics, 3.9× in under four years",
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
      "A Python pipeline that scores the 11 SPDR sector ETFs against three signals: seasonality, economic-cycle fit, and relative strength. Backtests 15 years against SPY. Runs every Sunday via GitHub Actions, asks Claude for a plain-language read on the output, and commits the dashboard back to the repo. The banner up top reports whether the strategy is beating SPY net of trading costs, and it leads with that number whichever way it points. Fifteen years in, the two are close enough that the honest answer moves around: currently ahead on return and on drawdown, behind on Sharpe.",
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
        <div className="mb-8 sm:float-right sm:ml-8 sm:mb-6">
          {/* TWO SEPARATE JOBS, DELIBERATELY NOT SOLVED BY THE SAME KNOB.

              Getting the high-resolution headshot into Google Images is the
              IMAGE SITEMAP's job (see app/sitemap.ts). That entry nominates the
              raw 3093x3369 /brian-beals.jpg, not a _next/image variant, so the
              crawler never has to choose among downscaled candidates.
              Person.image in the JSON-LD points at the same file.

              Rendering this element is a different job, and the only thing that
              matters here is being honest and fast. It carries `priority` and is
              the homepage LCP element.

              `sizes` MUST describe the real display width. An earlier pass set
              it to 640px against a 180px box; the browser believed it and pulled
              a 1280 or 1920 candidate on retina to paint a 180px square, and the
              emitted `src` resolved to w=3840. Overstating `sizes` to chase the
              index is a performance regression that buys nothing the sitemap has
              not already delivered. */}
          <Image
            src="/brian-beals.jpg"
            alt="Brian Beals, Director of AI, Analytics and Automation"
            width={400}
            height={400}
            sizes="(min-width: 640px) 200px, 180px"
            className="rounded-md shadow-sm w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8" style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}>
          Brian Beals
        </h1>
        <p className="text-xl sm:text-2xl leading-snug font-medium mb-8">
          I help enterprise organizations get real results out of their AI, analytics, and automation investments.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-12 text-neutral-800">
          I've built and scaled enterprise data and AI practices three times, from a blank page to real revenue. The work I care about is the unglamorous middle: data foundation, integration, governance, the second budget cycle. The part where the technology either pays for itself or doesn't.
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mb-12 pb-12 border-b border-neutral-200">
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
