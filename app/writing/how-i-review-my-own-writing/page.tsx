import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "How I Review My Own Writing",
  description:
    "Five dimensions I run on any piece of writing in 2026: three letter grades, two percentages, one of them scoring how much it reads as AI. How I grade my own essays before they ship, and the AI-shaped pitches that land in my inbox.",
  alternates: {
    canonical: "/writing/how-i-review-my-own-writing",
  },
  openGraph: {
    title: "How I Review My Own Writing | Brian Beals",
    description:
      "Five dimensions I run on any piece of writing in 2026: three letter grades, two percentages, one of them scoring how much it reads as AI. How I grade my own essays before they ship, and the AI-shaped pitches that land in my inbox.",
    url: "/writing/how-i-review-my-own-writing",
    type: "article",
    publishedTime: "2026-06-27T13:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How I Review My Own Writing | Brian Beals",
    description:
      "Five dimensions I run on any piece of writing in 2026: three letter grades, two percentages, one of them scoring how much it reads as AI. How I grade my own essays before they ship, and the AI-shaped pitches that land in my inbox.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How I Review My Own Writing",
  description:
    "Five dimensions I run on any piece of writing in 2026: three letter grades, two percentages, one of them scoring how much it reads as AI.",
  datePublished: "2026-06-27",
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
  mainEntityOfPage: "https://brianbeals.com/writing/how-i-review-my-own-writing",
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
          How I Review My Own Writing
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Three essays into this series, I&rsquo;ve said one thing three ways. Voice is the moat. AI-curated email erodes it one reply at a time. AI-assisted content fragments brands that used to sound like one company. Every piece ended on the same prescription: a named owner, a short standard, a review pass before anything ships.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This is the review pass. Five dimensions I run on any piece of writing in 2026, whether I wrote it or it landed in my inbox.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          One admission before the method. I write with AI assistance. The ideas are mine, the position is mine, and the voice rules the AI works inside are mine, written down and refused often. The AI is the editor. I&rsquo;m the author. Keeping it in that lane is the discipline, and it&rsquo;s what this essay is about. Every word that ships under my name is mine to defend.
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
          The five
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Five dimensions. Three are letter grades, two are percentages.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Professionalism asks whether the piece fits its venue. Writing Style asks whether the sentences have rhythm and hold a consistent voice. Leadership Capability is whether the writer takes a position, owns it, and hands the reader something to do. Those three measure craft.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The last two measure the 2026 problem. AI Authorship is the odds a sharp reader flags the piece as machine-made, and lower is better. The Snarky Meter is whether the edge is calibrated for the audience or reads as venting.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I score those two on their own for a reason. Fold AI-shaped prose and miscalibrated snark into &ldquo;writing quality&rdquo; and they hide inside a B. Score them separately and you can name exactly what failed and what to fix. Together the five tell you whether a piece is fit to ship, fit to send, fit to forward, or fit for the trash.
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
          Scoring my own work
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Here&rsquo;s the rubric on my own writing. The essay that ran two weeks before this one went through four passes before it shipped. One of them flagged a problem I&rsquo;d stopped seeing: short clipped sentences stacked so densely that the piece was committing the AI tell it was warning about. I smoothed it and ran the rubric again. The Writing Style grade moved from A-minus to A, the AI-authorship reading dropped from 30 percent to 28, and the closing lines I cared about came through untouched.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The value wasn&rsquo;t the final grade. It was watching the score move and knowing why. Four passes sounds like a lot until you time it. Each one runs about ten minutes. The discipline is the cadence, not the hours.
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
          Scoring what lands in my inbox
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The rubric runs the other direction too. I get a version of the same cold email every week. It opens with &ldquo;in today&rsquo;s rapidly evolving landscape,&rdquo; stacks two tripled-adjective lists before it reaches the ask, and signs off inviting me to &ldquo;jump on a quick call.&rdquo; Run the five dimensions and the AI Authorship score is the one that earns its keep. It climbs past 60, and now I have a defensible read on whether the vendor wrote to me or pointed a model at my name.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That&rsquo;s the use that matters most right now. Everyone is buried in inputs they suspect and can&rsquo;t articulate. The rubric gives you the language: here&rsquo;s the tell, here&rsquo;s the score, here&rsquo;s why it reads as nobody.
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
          Grade the writing, not the writer
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A guardrail comes with this. The rubric scores the page, not the person. A 90 percent AI-authorship reading doesn&rsquo;t mean the author is lazy or hiding something. It means the writing didn&rsquo;t get the discipline its venue needed. The fix is process. Blame reads as the AI police, and the AI police get the rubric run exactly once.
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
          Voice discipline is a recurring operation. A brand book is a static file you write once and shelve; this runs every time something ships: a named owner, a one-page standard, a mandatory pass before publish, and the same rubric on what you send and what you receive. Companies that build that function catch the failure modes the first three essays named. Companies that don&rsquo;t will keep shipping the wallpaper version of their voice, and keep reading vendor pitches as if a person wrote them.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This is the work I do: start from a customer&rsquo;s voice rules, build the rubric around them, and put one review pass in front of everything that ships, outbound and inbound.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I run this on my own writing because somebody has to. I run it on writing I receive because nobody else will.
        </p>

        <EssayByline variant="lrs" />
      </article>
    </div>
  );
}
