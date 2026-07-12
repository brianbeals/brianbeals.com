import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "AI Is Not Automation",
  description:
    "Two clients tried to tell me AI and automation are the same thing. They aren't, and the confusion gets expensive at scale. Where AI actually belongs in a system.",
  alternates: {
    canonical: "/writing/ai-is-not-automation",
  },
  openGraph: {
    title: "AI Is Not Automation | Brian Beals",
    description:
      "Two clients tried to tell me AI and automation are the same thing. They aren't, and the confusion gets expensive at scale. Where AI actually belongs in a system.",
    url: "/writing/ai-is-not-automation",
    type: "article",
    publishedTime: "2026-08-08T13:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Is Not Automation | Brian Beals",
    description:
      "Two clients tried to tell me AI and automation are the same thing. They aren't, and the confusion gets expensive at scale. Where AI actually belongs in a system.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Is Not Automation",
  description:
    "Two clients tried to tell me AI and automation are the same thing. They aren't, and the confusion gets expensive at scale. Where AI actually belongs in a system.",
  datePublished: "2026-08-08",
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
  mainEntityOfPage: "https://brianbeals.com/writing/ai-is-not-automation",
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
          style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
        >
          AI Is Not Automation
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I had two clients this year try to tell me that AI and automation are the same thing. Different companies, different rooms, same claim: they&rsquo;d been told to use AI, they&rsquo;d wrapped a few workflows in a model, and now AI was their automation strategy. Both times I pushed back, politely. They aren&rsquo;t the same thing, and treating them as if they are is how a large organization ends up paying more for slower, less reliable versions of systems it already had.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Automation is the boring machinery that has quietly run the world for decades. Cron, scripts, parsers, schedulers, the mail server. It does the same thing every time, for free, and it fails loudly when it fails at all. AI is one specialized part you drop into that machinery at the spots where the work is language or judgment. The skill worth having in 2026 is knowing which is which. Here&rsquo;s what that looks like when I build it for myself.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          A grocery robot that barely uses AI
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Every week a small system tells me which of the things my family actually buys are on sale at our Publix. It runs on its own, and it&rsquo;s a decent model of how to place AI correctly, because AI does exactly two jobs in it and the boring machinery does everything else.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It starts with a receipt. Publix emails one after every trip, a mail filter drops it in a folder, and an n8n workflow wakes up when it lands. None of that is AI. It&rsquo;s a filter and a trigger, the same plumbing that&rsquo;s routed email for decades.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Then the first real judgment call. A Publix receipt is written in a cryptic register-tape shorthand. &ldquo;B&amp;J ICE CREAM&rdquo; is Ben &amp; Jerry&rsquo;s, and the register doesn&rsquo;t even name the flavor. Turning that line into a clean record, brand, product, price, and quantity, is a language problem, and it&rsquo;s the model&rsquo;s job. The model reads each line and returns a structured record, which then gets filed into two plain data files: an identity store of what we buy, and a running ledger of every trip. Filing isn&rsquo;t AI. It&rsquo;s writing to disk.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The second half runs on Thursdays, when the new ad drops. The system pulls the entire Publix BOGO circular, 300 to 400 deals, off a public feed. Then plain code does the heavy filtering. It compares those hundreds of deals against our buy list and throws out everything that plainly doesn&rsquo;t touch it, leaving about 30 candidates. No model needed. It&rsquo;s matching strings.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The model comes back for the last mile, the fuzzy judgment plain code is bad at. Is the ad&rsquo;s &ldquo;Idahoan&rdquo; the same as the &ldquo;Idaho potatoes&rdquo; we buy? No. Is a Spanish-labeled brand the same product under a different name? Sometimes. The model looks at the 30 survivors and decides, by real product identity, which are genuine matches worth telling me about. Then the machinery takes back over and emails me the short list.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Count the AI in that system and you get two steps: read the receipt, judge the fuzzy matches. Everything else, the filter, the trigger, the fetch, the string-matching, the file writing, the send, is deterministic tooling doing the job it was built for. Wrap every step in an agent instead and I&rsquo;d be paying a model to do what cron and a few hundred lines of code already do perfectly, slower, and with the occasional confident lie. The matcher even keeps a plain-code fallback, so if the model is down, the email still goes out. The boring parts are the reliable parts, on purpose.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          A second little AI, watching the flock
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          There&rsquo;s a companion piece I&rsquo;m fonder of than I should be. A small always-on agent, running locally, that watches everything else I&rsquo;ve built. Every half hour it checks whether the deploys and jobs are healthy, quietly retries the ones that fail for dumb transient reasons, and texts me only when something stays broken. On Mondays it reads a long legislative report and texts me the parts that matter.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It&rsquo;s a little AI sitting on top of a lot of automation, and it earns its place for the same reason. Deciding whether a failure is transient noise or a real problem worth interrupting me for is a judgment call. Reading a dense report and pulling out what matters is a language call. Those are the model&rsquo;s jobs. Running the deploys, keeping time, moving the files, none of that is its job, and it doesn&rsquo;t try. It watches the machinery and speaks up when a human should. A little AI, watching AI and automation and email, staying quiet until quiet is the wrong answer.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          Why the confusion costs money
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Now put my two clients back in the picture. When you reach for a model to do deterministic work, you pay for it four ways. First in tokens, real recurring money, for what cron does free. Then in non-determinism: the same input starts producing different outputs, so nothing tests cleanly anymore. Speed goes too, a 30-millisecond command swapped for a 30-second call. And the failure modes pile up: rate limits, bad days, a vendor outage, none of which happen to a shell script.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          At home, on a grocery robot, that&rsquo;s a rounding error. In a company, multiply it by every workflow someone wrapped in a model to have an answer for the &ldquo;how are we using AI&rdquo; question. That&rsquo;s the extreme cost I warned the clients about, and it&rsquo;s real. A slower, less reliable version of the pipeline they already owned, with a stochastic black box bolted into the middle and a meter running.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The move is to use AI on purpose. Let the model read the receipt and judge the fuzzy match. Let cron keep time, let the parser parse, let the mail server mail. Automation is the machine. AI is one clever part of it. Confusing the two is the expensive mistake, and it&rsquo;s an easy one to stop making.
        </p>

        <EssayByline>
          Brian Beals writes about AI, automation, and the work of building at
          brianbeals.com. Reach him at brian@brianbeals.com.
        </EssayByline>
      </article>
    </div>
  );
}
