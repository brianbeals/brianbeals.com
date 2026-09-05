import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "Sixty Cents a Year",
  description:
    "The most useful software I ran this summer is a rules engine with one model call bolted to the end. It costs sixty cents a year and it watches for ice cream.",
  alternates: {
    canonical: "/writing/sixty-cents-a-year",
  },
  openGraph: {
    title: "Sixty Cents a Year | Brian Beals",
    description:
      "The most useful software I ran this summer is a rules engine with one model call bolted to the end. It costs sixty cents a year and it watches for ice cream.",
    url: "/writing/sixty-cents-a-year",
    type: "article",
    publishedTime: "2026-09-05T12:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sixty Cents a Year | Brian Beals",
    description:
      "The most useful software I ran this summer is a rules engine with one model call bolted to the end. It costs sixty cents a year and it watches for ice cream.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Sixty Cents a Year",
  description:
    "The most useful software I ran this summer is a rules engine with one model call bolted to the end. It costs sixty cents a year and it watches for ice cream.",
  datePublished: "2026-09-05",
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
  mainEntityOfPage: "https://brianbeals.com/writing/sixty-cents-a-year",
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
          Sixty Cents a Year
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Summer is winding down for most of the country. In Florida it just gets slightly less aggressive about it, and I&rsquo;ve spent the week thinking about ice cream: six tubs since February, two of them free. The thing that found the free ones costs sixty cents a year to run.
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
          What it actually does
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It&rsquo;s a cron job that pulls the weekly grocery ad, filters it, matches what&rsquo;s on sale against what I actually buy, and emails me when something lands. Those are four steps a computer has done reliably since before I had a driver&rsquo;s license, and there&rsquo;s exactly one model call in the whole thing, sitting at the very end.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          On July 12 I bought a single tub at full price. Six dollars and change, no discount, no alert. The robot had nothing to say that week and I bought ice cream anyway, which is honest data about how much I actually trust it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          On August 10 the email came. I walked out with five tubs and paid for three.
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
          Why there&rsquo;s a model in there at all
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Because of lines like this one, printed on the July receipt:
        </p>

        <pre
          className="text-sm sm:text-base font-mono overflow-x-auto rounded-md border px-4 py-3 mb-6 text-neutral-700"
          style={{ borderColor: "var(--link)", background: "rgb(0 0 0 / 0.03)" }}
        >
          {"B&J ICE CREAM      6.23 T F"}
        </pre>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          You can&rsquo;t write an assertion for that, because a rule doesn&rsquo;t know whether it&rsquo;s ice cream or a typo. Every receipt invents new abbreviations for things it has printed a thousand times before. So one model call reads the line, turns it into a brand and a product and a price, and hands it back, and then the boring machinery takes over again.
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
          The part I&rsquo;ve stopped trying to resolve
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          There is an enormous conversation happening right now about enterprise AI. I&rsquo;m in a lot of it, most weeks, with people who are serious about it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The piece of software that has most reliably improved my week this summer is a sixty-cent robot that watches for ice cream.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Both of those are true at the same time, and I&rsquo;ve given up trying to make them resolve into something tidier.
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
          The thing has a name
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          When I mentioned the cost in a comment thread a couple of weeks ago, someone replied: &ldquo;There&rsquo;s still room for expert systems!&rdquo;
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          He&rsquo;s right, and the name matters, because what I built has one: a rules engine with a single narrow exception handler bolted to the end. That pattern has a forty-year history, a literature, and a well-documented set of failure modes that somebody already wrote down for me.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Deterministic rules never stopped working. They stopped being fashionable, which is a different thing, and fashion comes back around.
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
          What it saved, which is almost nothing
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          On ice cream, the robot has saved me $13.10.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I&rsquo;ve spent $1,024 at that store this year and saved $151.85 of it, a little under 13% off the top. The ice cream is 8.6% of that saving, which says more about the saving than it does about the ice cream. Sixty cents to recover $13.10 is a return of nearly 22 times on operating cost and an argument about absolutely nothing.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          None of this says everything should cost sixty cents. The ambitious version costs more because it&rsquo;s attempting something harder, and plenty of the time that&rsquo;s the right trade.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I built this one to find out whether the boring version would hold up. It&rsquo;s been running since February, it has never once paged me, and I go weeks without thinking about it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That&rsquo;s the highest compliment I have for software.
        </p>

        <EssayByline>
          Brian Beals writes about AI, automation, and the work of building at
          brianbeals.com. Reach him at brian@brianbeals.com.
        </EssayByline>
      </article>
    </div>
  );
}
