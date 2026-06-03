import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Voice Book",
  description:
    "What voice rules? Here's mine. One page, mostly a list of things I refuse to write, and why a refusal list beats an inspiring adjective. Plus how the same idea scales from one writer to a whole company.",
  alternates: {
    canonical: "/writing/the-voice-book",
  },
  openGraph: {
    title: "The Voice Book | Brian Beals",
    description:
      "What voice rules? Here's mine. One page, mostly a list of things I refuse to write, and why a refusal list beats an inspiring adjective. Plus how the same idea scales from one writer to a whole company.",
    url: "/writing/the-voice-book",
    type: "article",
    publishedTime: "2026-07-11T13:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Voice Book | Brian Beals",
    description:
      "What voice rules? Here's mine. One page, mostly a list of things I refuse to write, and why a refusal list beats an inspiring adjective. Plus how the same idea scales from one writer to a whole company.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Voice Book",
  description:
    "What voice rules? Here's mine. One page, mostly a list of things I refuse to write, and why a refusal list beats an inspiring adjective.",
  datePublished: "2026-07-11",
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
  mainEntityOfPage: "https://brianbeals.com/writing/the-voice-book",
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
          The Voice Book
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Essay 4 said to run every piece through a review pass against your voice rules. Fair question back: what voice rules? Here&rsquo;s mine. It&rsquo;s one page, and it&rsquo;s mostly a list of things I refuse to write.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That&rsquo;s the part most brand voice guides get backwards. They describe an ideal. Confident, approachable, bold. All useless at the keyboard, because you can&rsquo;t check a sentence against an adjective. A refusal list is something you can actually run a draft against and get a yes or no from. Don&rsquo;t tell a writer to sound authentic. Tell them the words they can never use.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The page has five sections. The first is refused words, the vocabulary that shows up in nine out of ten AI drafts: leverage, robust, seamless, unlock, empower. The second is refused openers, the throat-clearing that fills a first sentence without saying anything, &ldquo;in today&rsquo;s rapidly evolving landscape&rdquo; and its cousins. The third is refused sentence shapes, and this is where most AI prose gives itself away: the em-dash splicing two clauses where a period would do, the &ldquo;not X, but Y&rdquo; pivot, the tripled adjective, the same short fragment clipped and stacked five times down a paragraph.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The fourth is refused closers, the exits that announce themselves on the way out, &ldquo;in conclusion&rdquo; and &ldquo;hope this helps.&rdquo; The fifth is the only section that says what to do instead of what to avoid: take a position, be specific, use contractions, and stop when the point lands.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          One page is the whole discipline. A book that runs ten pages gets filed. One page gets used, because anyone writing as the brand can read it in the time it takes to refill a coffee. Length isn&rsquo;t thoroughness. Length is the reason nobody opens the file.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Today the page goes public, and so does the tool that reads it. The rubric from essay 4 grades writing against a file exactly like this one, and both are now{" "}
          <a
            href="https://github.com/brianbeals/voice-critique"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: "#2E86C1" }}
          >
            on GitHub
          </a>
          : the one-page template, and the voice-critique skill that runs against it. Copy the template, make it yours, point the skill at it, and run it before anything ships. The defaults catch generic AI-shaped prose. Your own edits catch the things that don&rsquo;t sound like you, which is the real point, because those are the tells no generic list will ever know about.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That&rsquo;s one writer with one page. A team or a company is harder, because you want coherence without uniformity. Put everyone on identical rules with no room to move and the brand reads as one bland monotone, the wallpaper problem from essay 3. Let everyone keep their own rules and you&rsquo;re back to ten artifacts that sound like ten companies. The fix is layered: a corporate voice book as the shared base, the refusals everyone honors, with a thin individual layer on top so each writer still sounds like a person inside the guardrails. The base keeps the company coherent, the top keeps it human. Getting that layering right is harder than writing one page for yourself: who owns the corporate standard, how much room each writer gets, how the review pass reads both at once. It&rsquo;s the work I do at LRS. If that&rsquo;s your problem, reach out.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Writing the rules is the easy part. The work is refusing to break them. Here&rsquo;s mine. Steal the format and write your own noes.
        </p>

        <p className="text-sm text-neutral-600 italic mt-12 pt-6 border-t border-neutral-200">
          Brian Beals leads the AI, Analytics &amp; Automation practice at LRS IT Solutions. The one-page template and the voice-critique skill are at{" "}
          <a
            href="https://github.com/brianbeals/voice-critique"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: "#2E86C1" }}
          >
            github.com/brianbeals/voice-critique
          </a>
          .
        </p>
      </article>
    </div>
  );
}
