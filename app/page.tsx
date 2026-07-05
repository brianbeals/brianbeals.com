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
      "A live marine forecast for my home water, Charlotte Harbor and Pine Island Sound. Parses the NWS coastal waters product into wind, chop, and storm-risk cards, then adds Port Boca Grande tides with a tide-plus-light fishing read, live station observations, and NEXRAD radar cropped to the harbor. A verdict line reads the day's chop, storm risk, and rain into a plain call on whether to go, and every few minutes the browser samples the radar over the harbor and the pass, posting a live storm alert when a cell is on the water that the inland airport observation would miss. GitHub Actions polls after each NWS issuance and republishes the page as static HTML; the browser refreshes the live pieces on every load. Runs entirely on public NOAA endpoints and GitHub Pages, so hosting is free, making it the only part of this project that respected a budget.",
    links: [
      { label: "Live", href: "https://weather.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/marine-forecast" },
    ],
  },
  {
    name: "Sector Rotation Screener",
    description:
      "A Python pipeline that scores the 11 SPDR sector ETFs against three signals: seasonality, economic-cycle fit, and relative strength. Backtests 15 years against SPY. Runs every Sunday via GitHub Actions, asks Claude for a plain-language read on the output, and commits the dashboard back to the repo. The banner up top reports whether the strategy is beating SPY net of trading costs. Right now it isn't, and the dashboard says so up front.",
    links: [
      { label: "Live", href: "https://sector.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/sector-rotation-screener" },
    ],
  },
  {
    name: "Lobo",
    description:
      "An always-on agent that lives on the Mac mini and texts like a member of the household. Every 30 minutes it checks the GitHub deploys for everything above, retries the transient failures, and texts me only when something stays broken. On Mondays it reads a legislative watch report and texts the highlights. It answers texts on its own iMessage identity, a dedicated Apple ID, because a bot on your own phone number can't tell your texts from its own echoes. Runs locally on OpenClaw with Claude doing the thinking; getting iMessage working surfaced an upstream bug, and the reproduction was half the fun.",
    links: [
      { label: "Bug report", href: "https://github.com/openclaw/openclaw/issues/99638" },
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
          <Image
            src="/brian-beals.jpg"
            alt="Photo of Brian Beals"
            width={180}
            height={180}
            className="rounded-md shadow-sm"
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
                        {i > 0 && <span aria-hidden="true" className="text-neutral-400"> · </span>}
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
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
