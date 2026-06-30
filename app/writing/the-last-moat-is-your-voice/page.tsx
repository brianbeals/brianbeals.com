import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "The Last Moat Is Your Voice",
  description:
    "Speed and cost stopped being the AI differentiator. When everyone uses the same models with the same defaults, the last moat is whether your output still sounds like you.",
  alternates: {
    canonical: "/writing/the-last-moat-is-your-voice",
  },
  openGraph: {
    title: "The Last Moat Is Your Voice | Brian Beals",
    description:
      "Speed and cost stopped being the AI differentiator. When everyone uses the same models with the same defaults, the last moat is whether your output still sounds like you.",
    url: "/writing/the-last-moat-is-your-voice",
    type: "article",
    publishedTime: "2026-05-16T00:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Last Moat Is Your Voice | Brian Beals",
    description:
      "Speed and cost stopped being the AI differentiator. When everyone uses the same models with the same defaults, the last moat is whether your output still sounds like you.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Last Moat Is Your Voice",
  description:
    "Speed and cost stopped being the AI differentiator. When everyone uses the same models with the same defaults, the last moat is whether your output still sounds like you.",
  datePublished: "2026-05-16",
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
  mainEntityOfPage: "https://brianbeals.com/writing/the-last-moat-is-your-voice",
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
          The Last Moat Is Your Voice
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Half the B2B marketing content I read this year could have been written by anyone, by any tool, for any company.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The content is fine. Grammatically clean, on-message, hits the right beats. The quality isn&rsquo;t the problem. The brand is, and most companies haven&rsquo;t priced it in yet.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          Speed and cost stopped being the differentiator
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Two years ago, &ldquo;AI lets us ship ten times faster&rdquo; was a real selling point. You could win meetings with it. In 2026 it&rsquo;s table stakes. Every competitor has the same models, the same agents, the same workflows, the same prompt libraries pulled from the same Substacks. The question moved from <em>can we produce this</em> to <em>does this still sound like us when we do</em>.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Most enterprise marketing budgets are still optimizing for the first question. The customers are already grading on the second.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          Your AI sounds exactly like everyone else&rsquo;s AI
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Pull ten LinkedIn posts from ten different B2B companies this week. The vocabulary repeats. &ldquo;Leverage.&rdquo; &ldquo;Unlock.&rdquo; &ldquo;Empower.&rdquo; &ldquo;Seamless.&rdquo; &ldquo;Robust.&rdquo; &ldquo;Cutting-edge.&rdquo; &ldquo;Game-changing.&rdquo; Five of these in 400 words, every time, every company.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The structural patterns repeat harder than the vocabulary. The opening preamble: &ldquo;In today&rsquo;s evolving landscape of enterprise AI...&rdquo; The &ldquo;It&rsquo;s not X, it&rsquo;s Y&rdquo; turn, halfway down, every time. The bold-word-colon-explanation cadence stacked five paragraphs deep. The tripled adjective list, almost always at the end of a paragraph: &ldquo;dynamic, responsive, and aligned.&rdquo; The capitalized abstract concept dropped in as a section header: &ldquo;The Real Question,&rdquo; &ldquo;What Actually Matters,&rdquo; &ldquo;The Path Forward.&rdquo; The em-dash holding two clauses together where a period would have been sharper.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Any one of these patterns in isolation is fine. Real writers use all of them sometimes. The tell is the density. When all of them show up in the same 800 words, the reader&rsquo;s brain registers something off before they can name what. They don&rsquo;t say &ldquo;this was written by AI.&rdquo; They say &ldquo;I&rsquo;ll come back to this later,&rdquo; and they don&rsquo;t.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The companies producing this content think they&rsquo;re producing thought leadership. They&rsquo;re producing the wallpaper version. The reader scrolls past three of them on a coffee break and remembers none.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          Why this kills brand equity faster than people realize
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Brand recognition requires distinctiveness. Distinctiveness can&rsquo;t be produced by a tool that thousands of other companies are also using, the same way, with the same defaults. The math is brutal: you&rsquo;re paying for the same model your competitor is paying for, you&rsquo;re getting output in the same statistical shape your competitor is getting, and you&rsquo;re spending real money to make yourself sound interchangeable with them.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The cost doesn&rsquo;t show up in this quarter&rsquo;s pipeline number. It shows up downstream. Degraded recall in the next aided-awareness study. Quiet drops from short lists you used to make automatically. Recruits who picked the other offer because their employer-brand page read like it was written by someone who cared. Customers who can&rsquo;t quite explain why they renewed at flat instead of expanding. None of those will be traced back to the content. The connection is too slow.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The companies that figure this out two years late will spend the following five years trying to claw the voice back.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          What discipline actually looks like
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Four practices, in order of how hard they are to actually do.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Document your voice in the negative. Most companies write a brand voice guide that says what to be. Confident. Helpful. Bold. Useful, sort of. The guide that actually changes the output is the one that names what you refuse to say. Which words you don&rsquo;t use. Which sentence shapes you don&rsquo;t use. Which openers, which closers, which transitions. Voice lives in the refusals more than the aspirations.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Human edit pass is the price of admission, not an optimization. If the public-facing surface ships without a human in the loop, you&rsquo;ve delegated brand voice to a vendor&rsquo;s defaults. Those defaults are tuned for a billion users at once. They are, by design, the voice of nobody in particular.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Use AI for the unglamorous middle. Research. First drafts. Comparison matrices. Summarization. Internal memos. The unloved work where the cost of indistinguishability is zero. Not the homepage. Not the customer email. Not the keynote. Not the all-hands video.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Treat brand voice the way you treat security. A published standard. A review process. A named owner who can stop a shipment. Companies that wouldn&rsquo;t dream of pushing code to production without a security review are pushing brand-shaped content past the same wall every day, because nobody owns that wall.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I run the AI, Analytics &amp; Automation practice at LRS, and this is a common conversation I&rsquo;m having with executive buyers right now. The CIO and the CMO walk into the same room about it for the first time, sometimes ever.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          The bet
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Everyone adopted AI. The companies that win the next five years will be the ones who held the line on voice while the pressure to ship faster was strongest. Speed is a settled question now. Voice is the next one.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Speed isn&rsquo;t a flex anymore. Not sounding like everyone else is.
        </p>

        <EssayByline variant="lrs" />
      </article>
    </div>
  );
}
