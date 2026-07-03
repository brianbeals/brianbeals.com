import type { Metadata } from "next";
import PromptCopy from "./PromptCopy";

const DESCRIPTION =
  "A free prompt that grades any document on five dimensions: professionalism, writing style, leadership, AI authorship likelihood, and a snark meter. Paste it into any AI chat and get back a self-contained HTML critique.";

export const metadata: Metadata = {
  title: "voice-critique",
  description: DESCRIPTION,
  alternates: {
    canonical: "/tools/voice-critique",
  },
  openGraph: {
    title: "voice-critique | Brian Beals",
    description: DESCRIPTION,
    url: "/tools/voice-critique",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "voice-critique | Brian Beals",
    description: DESCRIPTION,
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "voice-critique",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description: DESCRIPTION,
  url: "https://brianbeals.com/tools/voice-critique",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Person",
    name: "Brian Beals",
    url: "https://brianbeals.com",
  },
};

export default function VoiceCritiquePage() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          voice-critique
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A writing critic in a prompt. It grades any document on five dimensions, professionalism,
          writing style, leadership, how AI-shaped the prose reads, and a snark meter, then returns a
          full critique with letter grades, a readiness verdict, and an optional redline.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Copy the prompt below, paste it into any AI chat, and paste or attach your document. It
          asks a few context questions, then hands back a self-contained HTML critique.
        </p>

        <PromptCopy />

        <h2
          className="text-2xl font-semibold tracking-tight mt-12 mb-4"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Seeing the result
        </h2>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Where the critique renders depends on the tool. Claude.ai shows the HTML inline as an
          artifact. Gemini, ChatGPT, and Copilot return the HTML as source instead of rendering it,
          which is expected: copy the code block, save it as <code>critique.html</code>, and open it
          in any browser to see the styled result.
        </p>

        <h2
          className="text-2xl font-semibold tracking-tight mt-12 mb-4"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          The full version
        </h2>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The prompt is the accessible path. The full version is a Claude Code skill that reads files
          directly, computes readability instead of estimating it, writes the HTML to disk with no
          copy-paste step, and grades against your own voice rules. Both live in the open-source
          repo:{" "}
          <a
            href="https://github.com/brianbeals/voice-critique"
            className="underline underline-offset-4"
            style={{ color: "var(--link)" }}
          >
            github.com/brianbeals/voice-critique
          </a>
          .
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Want it calibrated to your company&rsquo;s voice, refused words, refused shapes, audience-specific
          snark levels? That&rsquo;s the day job.{" "}
          <a
            href="/contact"
            className="underline underline-offset-4"
            style={{ color: "var(--link)" }}
          >
            Get in touch
          </a>
          .
        </p>
      </div>
    </div>
  );
}
