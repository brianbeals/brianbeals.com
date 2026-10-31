import type { Metadata } from "next";
import Link from "next/link";
import ProjectList from "./ProjectList";
import SectionHeading from "@/app/components/SectionHeading";
import PageHeading from "@/app/components/PageHeading";

const DESCRIPTION =
  "Side projects Brian Beals builds in public: a marine forecast, a harbor map, a sector screener, an always-on agent, and this site.";

export const metadata: Metadata = {
  title: { absolute: "Projects | Brian Beals, LLC" },
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Brian Beals, LLC",
    description: DESCRIPTION,
    url: "/projects",
    type: "website",
  },
  twitter: {
    title: "Projects | Brian Beals, LLC",
    description: DESCRIPTION,
  },
};

// Moved off /about on 2026-10-31 (buyer-first pass), the write-ups unchanged.
// Not in the main nav: /about's "The side projects are here" and the site map
// are its two routes (2.4.5), and this page is Elsewhere's other route.
export default function Projects() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        <PageHeading>Projects</PageHeading>

        <SectionHeading spacing="mt-0 mb-6">Building in Public</SectionHeading>

        <ProjectList text="description" />

        {/* Off the main nav since 2026-10-10. This line and the site map are its two routes. */}
        <p className="text-base sm:text-lg leading-relaxed mt-12 text-neutral-800"><Link href="/elsewhere" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>Elsewhere</Link>: adventure travel, mostly to places where the signal goes away.</p>
      </article>
    </div>
  );
}
