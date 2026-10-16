import type { Metadata } from "next";
import SectionHeading from "@/app/components/SectionHeading";
import EssayList from "./EssayList";
import { essays } from "./essays";
import PageHeading from "@/app/components/PageHeading";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on digital accessibility for public entities, on AI in the enterprise, and on building things.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing | Brian Beals",
    description:
      "Essays on digital accessibility for public entities, on AI in the enterprise, and on building things.",
    url: "/writing",
    type: "website",
  },
  twitter: {
    title: "Writing | Brian Beals",
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
      </div>
    </div>
  );
}
