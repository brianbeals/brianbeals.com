import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "Everybody Got a License",
  description:
    "The industry built the meter, published the rate card, and named a conference after the unit. It still cannot tell you what any of it returned.",
  alternates: {
    canonical: "/writing/everybody-got-a-license",
  },
  openGraph: {
    title: "Everybody Got a License | Brian Beals",
    description:
      "The industry built the meter, published the rate card, and named a conference after the unit. It still cannot tell you what any of it returned.",
    url: "/writing/everybody-got-a-license",
    type: "article",
    publishedTime: "2026-09-19T12:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everybody Got a License | Brian Beals",
    description:
      "The industry built the meter, published the rate card, and named a conference after the unit. It still cannot tell you what any of it returned.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Everybody Got a License",
  description:
    "The industry built the meter, published the rate card, and named a conference after the unit. It still cannot tell you what any of it returned.",
  datePublished: "2026-09-19",
  author: {
    "@type": "Person",
    name: "Brian Beals",
    url: "https://brianbeals.com",
  },
  publisher: {
    "@type": "Person",
    name: "Brian Beals",
    url: "https://brianbeals.com",
  },
  mainEntityOfPage: "https://brianbeals.com/writing/everybody-got-a-license",
};

export default function EssayPage() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-2xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Everybody Got a License
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Early this year I paid $20 a month for an AI subscription. In August I paid $200.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Tenfold, and I can account for every step. The $20 plan ran out of room, so I moved to the $100 tier. I hit that ceiling too, and moved again in August. Running alongside it, an API account tops itself up in small increments, though the gaps between top-ups keep stretching as the subscription absorbs more of the work. Add a $20 coding assistant and I&rsquo;m at roughly $250 a month.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I know what all of it does. I can name the systems, say what each one produces, and tell you which ones I&rsquo;d cancel first.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That turns out to be the unusual part.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          The meter is excellent now
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Two years ago you could argue that nobody could see what AI cost. That argument is finished.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Anthropic&rsquo;s pricing page describes its Enterprise plan as &ldquo;Seat price + usage at API rates,&rdquo; and puts a number on it: &ldquo;$20/seat. Usage cost scales with model and task.&rdquo; GitHub moved Copilot to consumption-based billing in June. OpenAI publishes a credit rate card to business buyers. Microsoft meters agent tasks on top of its $30 seat. When I blew through my own plan limits in August, the extra usage showed up as its own charge, exactly as documented.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A seat buys you a floor. The meter runs above it, and the vendors say so on their own pricing pages.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The discipline moved too, faster than most people noticed. The FinOps Foundation changed its mission from the value of cloud to the value of technology. It added an AI category to its framework in March, published a guide to token economics in June, and merged its own conference into one named after the unit. In its own survey, 98% of practitioners now manage AI spend, against 31% two years ago.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Somebody built the meter and published the rate card. For a standalone assistant you went out and bought on purpose, cost visibility is a solved problem.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          And the question didn&rsquo;t go away
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Wharton Human-AI Research and GBK Collective survey enterprise leaders every year. In the 2025 edition, 72% said their organizations formally track return on generative AI, and three in four reported positive returns.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          McKinsey asked a narrower question of 1,719 respondents across 97 nations this past spring. Thirty-seven percent said AI had contributed to EBIT at all, flat against the year before, while the share of organizations scaling AI enterprise-wide climbed to 44%.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Both are self-reported. Neither is lying. A year separates them, and the gap survived it. McKinsey&rsquo;s number sat still while the share of companies scaling climbed. They asked different questions, and the difference between those questions is the whole problem: one measures whether leaders believe it&rsquo;s working, the other measures whether it showed up in the P&amp;L.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The Wharton release contains the tell, and to its credit says so plainly. Leaders at VP and above were &ldquo;far more bullish&rdquo; on AI&rsquo;s financial impact than mid-managers were. The higher you sit, the better the returns look. That&rsquo;s the same gap appearing inside one dataset, among people looking at the same company.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          Buying for everyone is what makes it possible
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Microsoft passed 30 million paid Copilot seats this summer and added roughly 10 million of them in a single quarter, the fastest growth since the product launched. The number is real and so is the achievement.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It&rsquo;s also a purchase made all at once, before the evidence exists. You license the whole company, the invoice arrives every month in dollars, and the return, if it comes, arrives later and in a different currency: hours, quality, things that didn&rsquo;t go wrong. One side of that equation reports monthly with two decimal places. The other side reports whenever somebody gets around to building a way to measure it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Meanwhile, more than half of McKinsey&rsquo;s respondents still haven&rsquo;t scaled AI across the enterprise. The seats are bought. The workflows they were bought for mostly haven&rsquo;t been redesigned yet.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          The part nobody is metering
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Standalone assistants are the well-instrumented corner of this. They have rate cards.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The AI arriving inside software you already own has no meter at all. Google bundles Gemini across Workspace tiers rather than selling it as a separate seat, with expanded access sold as an add-on. Salesforce, ServiceNow, and most of the rest have embedded assistants into products that were already under contract. There&rsquo;s no line item, no token count, no invoice to reconcile. The cost is real, it rode in on a renewal, and none of the tools built for explicitly metered consumption can touch it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It&rsquo;s easier to argue about a bill you can see.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          The standard is one release away
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          FOCUS is the open specification that normalizes billing data across vendors. Version 1.4 was ratified on June 4 of this year and added two new datasets and 47 columns, aimed at reconciling usage to actual invoices.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It does not contain a column for tokens.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Version 1.5 scopes native AI support, model identity and input and output token consumption, and it hasn&rsquo;t shipped. So the industry named a conference after the unit before the specification could carry it. Every vendor&rsquo;s meter is running. Nobody has finished writing the common language for comparing them.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          The case for buying it anyway
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Licensing broadly is a defensible bet, and the argument for it is stronger than its critics allow.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          You can&rsquo;t find the valuable uses without letting people try, and metering every seat to the token would suppress exactly the experimentation the license was bought for. Salesforce moved back toward seat-based pricing in late 2025 because customers couldn&rsquo;t forecast consumption and hated the uncertainty. The metered alternative has its own failure mode, and finance teams have met it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The fair criticism is narrower than the one usually made. Companies bought access without deciding in advance what evidence would count.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          What I&rsquo;d actually want
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The number nobody can produce is the useful one: of everything generated, what share led to something a person actually used, net of retries, abandoned drafts, and output that failed review.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          An invoice tells you how many tokens you bought. That number is exact now, to six decimals. It just doesn&rsquo;t answer the question anyone is asking.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          My $3,000 a year is a rounding error against what a mid-sized company spends on this in a month. The only thing I have that they don&rsquo;t is a short list of what each piece does, and the willingness to cancel the ones that stop earning their place.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The meter was never what was missing.
        </p>

        <EssayByline>
          Brian Beals writes about AI, measurement, and the work of building at
          brianbeals.com. Reach him at brian@brianbeals.com.
        </EssayByline>
      </article>
    </div>
  );
}
