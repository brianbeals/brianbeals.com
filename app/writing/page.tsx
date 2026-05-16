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
          style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
        >
          Writing
        </h1>
        <ul className="space-y-10">
          {essays.map((e) => (
            <li key={e.slug}>
              <Link href={`/writing/${e.slug}`} className="block group">
                <h2
                  className="text-2xl font-semibold tracking-tight group-hover:underline underline-offset-4"
                  style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
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
