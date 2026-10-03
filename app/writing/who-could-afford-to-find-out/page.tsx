import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "Who Could Afford to Find Out",
  description:
    "Uber blew its 2026 AI coding budget in four months and came out with an answer. Most companies bought a $30 seat instead and came out with nothing to measure.",
  alternates: {
    canonical: "/writing/who-could-afford-to-find-out",
  },
  openGraph: {
    title: "Who Could Afford to Find Out | Brian Beals",
    description:
      "Uber blew its 2026 AI coding budget in four months and came out with an answer. Most companies bought a $30 seat instead and came out with nothing to measure.",
    url: "/writing/who-could-afford-to-find-out",
    type: "article",
    publishedTime: "2026-10-03T12:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Could Afford to Find Out | Brian Beals",
    description:
      "Uber blew its 2026 AI coding budget in four months and came out with an answer. Most companies bought a $30 seat instead and came out with nothing to measure.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Who Could Afford to Find Out",
  description:
    "Uber blew its 2026 AI coding budget in four months and came out with an answer. Most companies bought a $30 seat instead and came out with nothing to measure.",
  datePublished: "2026-10-03",
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
  mainEntityOfPage: "https://brianbeals.com/writing/who-could-afford-to-find-out",
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
          Who Could Afford to Find Out
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Uber turned on Claude Code in December 2025. By February, 32% of its engineers were using agentic coding tools. By March it was 84%. By April the company had burned through its entire 2026 AI coding budget, and Uber&rsquo;s chief technology officer said the company was back at the drawing board on its assumptions. He described running up $1,200 in a single two-hour session during a demo. The average engineer was costing $150 to $250 a month and the heaviest were reaching $2,000.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          In May the company&rsquo;s president and chief operating officer, talking about whether all that usage was turning into anything customers could see, said it plainly: &ldquo;That link is not there yet.&rdquo;
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Then in August the CTO wrote that the phase was ending. &ldquo;I think it&rsquo;s another signal that we&rsquo;re coming to the end of the so-called tokenmaxxing era.&rdquo; The next phase, he wrote, &ldquo;will not be characterized by who spends the most tokens, but about how people use them as efficiently as possible.&rdquo;
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Uber didn&rsquo;t cut anybody off. It kept expanding access and watched the cost per token fall, which the CTO put down to treating efficiency as an engineering problem rather than a budget problem. The spending question turned into an efficiency question, and it took eight months and a blown budget to get there.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That&rsquo;s what it looks like when a company can afford to find out.
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
          The leaderboard
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Meta&rsquo;s leaderboard never got that far. An employee built a dashboard called Claudeonomics on their own initiative. It tracked token consumption across more than 85,000 people and displayed the top 250. High scorers got titles. Token Legend. Cache Wizard. Over one 30-day stretch, usage on it passed 60 trillion tokens. The highest-ranked individual averaged 281 billion. Fortune priced that at $5 per million tokens, the cheapest tier of one frontier model, as possibly more than $1.4 million for one person.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Two days after the leaderboard was reported, it was gone. Meta said the employee took it down at their own discretion and that the company hadn&rsquo;t asked. Nobody published a finding. The leaderboard stopped being visible, and that was the whole outcome.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          At an NFL event in February, before any of that, Meta&rsquo;s CTO described his best engineer spending the equivalent of that engineer&rsquo;s own salary on tokens and being &ldquo;5x to 10x more productive.&rdquo; His verdict: &ldquo;It&rsquo;s like, this is easy money. Keep doing it. No limit.&rdquo;
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          He&rsquo;s probably right about that engineer. The trouble starts when one engineer&rsquo;s result turns into a ranking of 85,000 people, which is what the dashboard did. A ranking of spend can&rsquo;t tell you whose spend is working, and Uber&rsquo;s eight months are the evidence.
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
          The experiment most companies never got to run
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Uber was asking a legitimate and very expensive question. What does this actually do for us with the brakes off? You can&rsquo;t buy that answer any other way. You have to let a lot of people use a lot of it badly for long enough to see what survives, and then you have to be able to absorb the bill when the answer isn&rsquo;t what you hoped.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That takes a budget somebody is willing to blow and eight months nobody is allowed to call a failure, which is more than most companies will approve.
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
          What the rest of the market bought
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          In late 2025, PwC asked 4,454 chief executives across 95 countries and territories what AI had actually returned. One in eight said it had delivered both cost and revenue benefits. More than half, 56%, said they&rsquo;d seen no significant financial benefit to date.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          In the same survey, the one-in-eight group claiming both cost and revenue gains were two to three times more likely to say they&rsquo;d embedded AI extensively into products, demand generation, and decision-making. It&rsquo;s a correlation in a self-reported survey, so hold it loosely. But it points at depth rather than volume.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It matches what I see in the accounts I work in. Some of the organizations I work with spend well past a million dollars a year across OpenAI, Anthropic, and others, and they&rsquo;re getting returns they can account for. Plenty more are carrying a $30 seat for everybody, bought on top of licensing they already had, largely so somebody could tell a board the company had an AI strategy. Those conversations are about whether to renew. A few have already stopped paying.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The distance between those two groups is enormous in dollars, and Meta is the proof that dollars don&rsquo;t settle it. It could afford the whole experiment and came away with a leaderboard.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          One of them bought an experiment. The other bought a subscription.
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
          The seat was never the investment
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A $30 seat was never priced like an AI strategy. It&rsquo;s priced to be approved without a business case. At $150 a seat you get a committee, a stated problem, and a number somebody has to hit. At $30 you get a card and a pilot that never quite ends, and a year later nobody can say what came back, because nobody said in advance what would count.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This is the oldest lesson in enterprise software, and AI hasn&rsquo;t repealed it. The companies that got value out of CRM got it by rebuilding how selling worked around the system, which was slow and political and cost several times the licenses. The license was the cheapest part of the project and the only part that showed up on the invoice.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Uber spent eight months learning that usage was the wrong number to watch. A seat count is the same wrong number on a smaller bill, and nobody needs eight months to stop watching it.
        </p>

        <EssayByline>
          Brian Beals writes about AI, measurement, and the work of building at
          brianbeals.com. Reach him at brian@brianbeals.com.
        </EssayByline>
      </article>
    </div>
  );
}
