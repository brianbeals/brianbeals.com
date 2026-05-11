import type { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "About",
  description:
    "Three enterprise sales practices, built from scratch. How I think about getting AI, analytics, and automation to actually pay off.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Brian Beals",
    description:
      "Three enterprise sales practices, built from scratch. How I think about getting AI, analytics, and automation to actually pay off.",
    url: "/about",
    type: "website",
  },
  twitter: {
    title: "About | Brian Beals",
    description:
      "Three enterprise sales practices, built from scratch. How I think about getting AI, analytics, and automation to actually pay off.",
  },
};
export default function About() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8" style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}>About</h1>
        <div className="mb-8 sm:float-right sm:ml-8 sm:mb-6">
          <Image
            src="/brian-beals.jpg"
            alt="Photo of Brian Beals"
            width={180}
            height={180}
            className="rounded-md shadow-sm"
          />
        </div>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">I've built three enterprise sales practices from scratch. Each one started with $0 in revenue and the kind of slide deck no customer believed yet.</p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">The first was Mainline Information Systems' Business Analytics group. Five years, <strong style={{ color: "#1E3A5F" }}>$0 to $20M</strong>. The next was Sirius Computer Solutions' Big Data and Analytics group, which I took from <strong style={{ color: "#1E3A5F" }}>$20M to $78M</strong> in under four years (<strong style={{ color: "#1E3A5F" }}>3.9×</strong>). For the last decade I've been at LRS IT Solutions, where I founded and lead the AI, Analytics &amp; Automation group. The specific numbers there belong to LRS, not me. The pattern from the first two carried: build the team, land the early reference customers, and let the practice compound from there.</p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">Before that, technical sales at Red Hat, Oracle, and MicroStrategy. The progression matters: the practice work I do now depends on knowing the products, the channels, and the customer's procurement model from inside, not from a marketing deck.</p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3" style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}>
          <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#2E86C1" }}></span>
          How I think about this work
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">Most enterprise AI doesn't fail at the model. It fails at the handoffs. Pilots that never reach production. Data foundations that never sustain real use. Demos that don't survive a procurement cycle. The technical part is rarely the hard part anymore. The hard part is everything that has to be right before the model is even running.</p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">The practices I've built are vendor-neutral on purpose. We've represented IBM, Microsoft, AWS, Cisco, Dell, Snowflake, SAS, and dozens of others, and the practice grows because customers eventually figure out who's selling them what works versus what pays the rep best. That isn't a marketing line. It's the actual reason these practices compound.</p>

        <div
          className="my-8 flex flex-wrap items-center gap-x-8 sm:gap-x-10 gap-y-3"
          style={{ color: "#6B7280" }}
          aria-label="Vendors represented through the practice"
        >
          {["IBM", "Microsoft", "AWS", "Cisco", "Dell", "Snowflake", "SAS"].map((vendor) => (
            <span
              key={vendor}
              className="text-base sm:text-lg font-medium tracking-wide"
            >
              {vendor}
            </span>
          ))}
        </div>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">I currently maintain more than 80 technical sales certifications across the practice. The certifications matter less than the muscle memory of having to learn a new platform every quarter for thirty-plus years.</p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3" style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}>
          <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#2E86C1" }}></span>
          Earlier
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">U.S. Navy electronics technician, 1989 to 1992, honorably discharged. What I took from it: honor in the work, integrity when nobody is checking, an attention to detail that's hard to switch off. It's also why I'd rather lose a deal than sell a customer something that won't deliver.</p>
      </article>
    </div>
  );
}
