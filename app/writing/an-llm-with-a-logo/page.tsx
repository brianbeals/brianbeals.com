import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "An LLM With a Logo",
  description:
    "Pull ten artifacts from one company and read them back to back. They sound like ten different companies. What AI-assisted production does to brand coherence.",
  alternates: {
    canonical: "/writing/an-llm-with-a-logo",
  },
  openGraph: {
    title: "An LLM With a Logo | Brian Beals",
    description:
      "Pull ten artifacts from one company and read them back to back. They sound like ten different companies. What AI-assisted production does to brand coherence.",
    url: "/writing/an-llm-with-a-logo",
    type: "article",
    publishedTime: "2026-06-13T13:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "An LLM With a Logo | Brian Beals",
    description:
      "Pull ten artifacts from one company and read them back to back. They sound like ten different companies. What AI-assisted production does to brand coherence.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "An LLM With a Logo",
  description:
    "Pull ten artifacts from one company and read them back to back. They sound like ten different companies. What AI-assisted production does to brand coherence.",
  datePublished: "2026-06-13",
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
  mainEntityOfPage: "https://brianbeals.com/writing/an-llm-with-a-logo",
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
          An LLM With a Logo
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Pull ten artifacts from one company in 2026: the cold email, the proposal, the pitch deck, the homepage, the case study, the LinkedIn post, the press release, the white paper, the renewal letter, the follow-up note.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Read them in order. They sound like ten different companies.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I spent ten minutes on a vendor&rsquo;s site last week, reading their homepage, their case study, and their LinkedIn page back to back. None of them sounded like the same company. The vendor was good, the artifacts were each fine, and the brand was missing.
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
          The email doesn&rsquo;t echo the deck
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Watch how the pieces connect. The email doesn&rsquo;t echo the deck, the deck doesn&rsquo;t echo the website, and the proposal doesn&rsquo;t continue the discovery conversation. The case study reads like a press release. The LinkedIn post reads like a SaaS blog from 2019.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Each piece is fine on its own. Together they&rsquo;re a stranger introducing himself to you ten times.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The signals are small and consistent. A homepage that says &ldquo;we partner with our customers&rdquo; and a sales email three days later that says &ldquo;circle back on our last touchpoint.&rdquo; A case study that uses &ldquo;transformation&rdquo; five times next to a one-pager that uses &ldquo;modernization&rdquo; five times. A founder LinkedIn post that&rsquo;s casual and pointed, and the same week&rsquo;s company post that reads as wallpaper. None of these are wrong in isolation, but together they read as a company that doesn&rsquo;t quite know who it is, and the buyer feels it three or four touches in.
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
          Voice is about one piece. Coherence is about ten
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Essay one&rsquo;s problem was a single piece sounding like nobody. This problem is bigger, because the connective tissue between pieces is missing.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The customer experiences the company as fragmented even when no single artifact is bad. Each interaction starts from scratch, with no recognition and no familiarity building up. The second touch never feels like it&rsquo;s talking to the same brain that wrote the first one. By the time a buyer has seen six pieces and still can&rsquo;t describe the company in a sentence, the company has lost the room.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Voice failures get caught because they read as off. Coherence failures don&rsquo;t, because each piece reads as polished. The company looks correct everywhere and recognizable nowhere.
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
          AI defaults are per-session. Brand is cross-session
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Every prompt starts cold. The model has no memory of last week&rsquo;s deck, and the marketer never wrote down last quarter&rsquo;s voice rules, if there were any. The AE drafting the proposal has no idea what marketing shipped on the homepage, or what the founder posted on LinkedIn that morning. Each artifact gets the same polished-but-anonymous treatment from the same model, with no shared context between them.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This is what AI-assisted content production looks like at scale in 2026. Every piece passes its own quality bar, and none of them know about each other.
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
          A brand book is not a voice book
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Most companies have a brand book covering colors, fonts, logo placement, and acceptable image styles. The whole visual identity has a guardian, a documented standard, and a review process. Nobody ships a marketing piece with the wrong shade of blue.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Almost none of those companies have a voice book: refused words, refused openers, refused sentence shapes, refused closers. The linguistic identity has no guardian, no documented standard, and no review pass. The visual identity gets policed. The voice identity gets whatever the model produces today.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A logo at the top of every artifact doesn&rsquo;t make them feel like one company, and brand colors don&rsquo;t either. Templates give visual continuity. Coherence requires linguistic continuity. The first sentence of the cold email and the first sentence of the case study should feel like they came from the same writer thinking about the same reader. Most of the time, they don&rsquo;t.
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
          The fix
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          One named owner of the voice standard. Not a committee, not a vendor.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A short standard, not a long one. The voice book I use for my own writing is one page. It says what I don&rsquo;t do and stops there. That&rsquo;s the whole thing, and anyone writing as the brand reads it before they ship.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Apply the standard across every artifact, not just marketing: sales emails, AE follow-ups, recruiting outreach, internal all-hands decks. The brand is whatever the customer sees, not whatever marketing produces. The recruiter speaks for the brand, so does the AE, so does the customer success manager, and none of them currently read from the same voice book because there isn&rsquo;t one.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Review every artifact for voice the way code gets reviewed for security: a named owner who can stop a shipment, a documented standard, a review pass before publish. Companies that wouldn&rsquo;t dream of pushing code to production without security review are pushing brand-shaped content past the same wall every day, because nobody owns that wall.
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
          The room from essay one comes back
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This is the second time the CIO and the CMO need to be in the same room. Essay one asked whether AI ships at all. This one asks whether what it ships hangs together, and that question belongs to both of them, not to marketing alone.
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
          Companies that solve cross-artifact coherence will read as coherent companies. Customers will recognize them after the third piece, the fifth, the tenth. Familiarity will compound, and the brand will start feeling like a person again.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Companies that don&rsquo;t will read as an LLM with a logo.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A logo at the top is not a through-line.
        </p>

        <p className="text-sm text-neutral-600 italic mt-12 pt-6 border-t border-neutral-200">
          Brian Beals leads the AI, Analytics &amp; Automation practice at LRS IT Solutions. Reach him at brian@brianbeals.com.
        </p>
      </article>
    </div>
  );
}
