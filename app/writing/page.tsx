import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays from Brian Beals on enterprise AI, brand voice, and getting real results out of technology after the pilot.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing | Brian Beals",
    description:
      "Essays from Brian Beals on enterprise AI, brand voice, and getting real results out of technology after the pilot.",
    url: "/writing",
    type: "website",
  },
  twitter: {
    title: "Writing | Brian Beals",
    description:
      "Essays from Brian Beals on enterprise AI, brand voice, and getting real results out of technology after the pilot.",
  },
};

const essays = [
  // Newest first. Add new essays to the top of this array.
  {
    slug: "seeing-the-next-rung",
    title: "Seeing the Next Rung",
    date: "2026-07-25",
    summary:
      "A lit hot-sheet tray in a 1968 patrol car, an early automation that worked so well it vanished. The floor of normal keeps rising, so the real test of anything you build is whether it compounds or just accumulates.",
  },
  {
    slug: "the-voice-book",
    title: "The Voice Book",
    date: "2026-07-11",
    summary:
      "What voice rules? Here's mine. One page, mostly a list of things I refuse to write, and why a refusal list beats an inspiring adjective. Plus how the same idea scales from one writer to a whole company.",
  },
  {
    slug: "how-i-review-my-own-writing",
    title: "How I Review My Own Writing",
    date: "2026-06-27",
    summary:
      "Five dimensions I run on any piece of writing in 2026: three letter grades, two percentages, one of them scoring how much it reads as AI. How I grade my own essays before they ship, and the AI-shaped pitches that land in my inbox.",
  },
  {
    slug: "an-llm-with-a-logo",
    title: "An LLM With a Logo",
    date: "2026-06-13",
    summary:
      "Pull ten artifacts from one company in 2026 and read them back to back. They sound like ten different companies. The brand book has a guardian. The voice book doesn't have one yet, and the company pays for it.",
  },
  {
    slug: "ai-and-the-poisoning-of-professionalism",
    title: "AI and the Poisoning of Professionalism",
    date: "2026-05-30",
    summary:
      "A colleague discovered AI for email replies last month. The recipients can tell. The sender can't. Notes on what AI-curated correspondence is doing to your voice, your relationships, and your inbox.",
  },
  {
    slug: "the-last-moat-is-your-voice",
    title: "The Last Moat Is Your Voice",
    date: "2026-05-16",
    summary:
      "Speed and cost stopped being the AI differentiator. When everyone uses the same models with the same defaults, the last moat is whether your output still sounds like you.",
  },
];

export default function WritingIndex() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Writing
        </h1>
        <ul className="space-y-10">
          {essays.map((e) => (
            <li key={e.slug}>
              <Link href={`/writing/${e.slug}`} className="block group">
                <h2
                  className="text-2xl font-semibold tracking-tight group-hover:underline underline-offset-4"
                  style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
                >
                  {e.title}
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  {new Date(e.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </p>
                <p className="mt-3 text-base sm:text-lg leading-relaxed text-neutral-800">
                  {e.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
