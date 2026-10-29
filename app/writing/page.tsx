import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/app/components/SectionHeading";
import EssayList from "./EssayList";
import { essays } from "./essays";
import PageHeading from "@/app/components/PageHeading";

export const metadata: Metadata = {
  title: { absolute: "Writing | Brian Beals, LLC" },
  description:
    "Essays on digital accessibility for public entities, on AI in the enterprise, and on building things.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing | Brian Beals, LLC",
    description:
      "Essays on digital accessibility for public entities, on AI in the enterprise, and on building things.",
    url: "/writing",
    type: "website",
  },
  twitter: {
    title: "Writing | Brian Beals, LLC",
    description:
      "Essays on digital accessibility for public entities, on AI in the enterprise, and on building things.",
  },
};

export default function WritingIndex() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-5xl mx-auto page-wide">
        <PageHeading>Writing</PageHeading>
        <SectionHeading spacing="mt-0 mb-6">Essays</SectionHeading>
        <EssayList essays={essays} />
        {/* A second way to the tool, beside the site map (WCAG 2.4.5): until 2026-10-28 the
            site map was its only link. */}
        <SectionHeading>Tools</SectionHeading>
        <p className="text-base sm:text-lg leading-relaxed text-neutral-800">
          <Link
            href="/tools/voice-critique"
            className="underline underline-offset-4 hover:no-underline"
            style={{ color: "var(--link)" }}
          >
            Voice Critique
          </Link>
          : the prompt behind the rubric in these essays. It grades a document on five
          dimensions and is free to copy.
        </p>
      </div>
    </div>
  );
}
