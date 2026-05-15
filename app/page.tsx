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
    name: "Sector Rotation Screener",
    description:
      "A Python pipeline that scores the 11 SPDR sector ETFs against three signals: seasonality, economic-cycle fit, and relative strength. Backtests 15 years against SPY. Runs every Sunday via GitHub Actions, asks Claude for a plain-language read on the output, and commits the dashboard back to the repo. The banner up top reports whether the strategy is beating SPY net of trading costs. Right now it isn't, and the dashboard says so up front.",
    links: [
      { label: "Live", href: "https://sector.brianbeals.com" },
      { label: "Code", href: "https://github.com/brianbeals/sector-rotation-screener" },
    ],
  },
  {
    name: "This site",
    description: "Next.js on Vercel. Built and shipped solo.",
    links: [
      { label: "Code", href: "https://github.com/brianbeals/brianbeals.com" },
    ],
  },
  {
    name: "Claude skills",
    description:
      "A growing library I use for my own workflow: account research, contact research, financial modeling, document critique. Sanitized public versions of the generic ones coming.",
    links: [],
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
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8" style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}>
          Brian Beals
        </h1>
        <p className="text-xl sm:text-2xl leading-snug font-medium mb-8">
          I help enterprise organizations get real results out of their AI, analytics, and automation investments.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-12 text-neutral-800">
          I've built three enterprise sales practices from scratch. The work I care about is the unglamorous middle: data foundation, integration, governance, the second budget cycle. The part where the technology either pays for itself or doesn't.
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mb-12 pb-12 border-b border-neutral-200">
          {stats.map((s) => (
            <div key={s.figure}>
              <dt
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
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
            style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
          >
            Currently building
          </h2>
          <div className="space-y-8">
            {projects.map((p) => (
              <div key={p.name}>
                <h3
                  className="text-xl font-semibold tracking-tight mb-2"
                  style={{ color: "#1E3A5F" }}
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
                          style={{ color: "#2E86C1" }}
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
          More coming. I'm building toward a small portfolio of agent-driven applications that show what enterprise sales leaders should be able to do for themselves now that the tooling has caught up.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
          <Link href="/about" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>
            More about my work
          </Link>
          <Link href="/contact" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
