import type { Metadata } from "next";
import Link from "next/link";

// WCAG 2.4.5 Multiple Ways. Every page needs to be reachable by two
// independent routes. The global navigation is one. This is the second.
//
// sitemap.xml does not satisfy this criterion: it is a machine-readable file
// for crawlers, not something a person can use to find a page. The distinction
// gets missed often enough that it is worth writing down.
export const metadata: Metadata = {
  title: "Site map",
  description:
    "Every page on brianbeals.com, in one list. A second way to reach any page, alongside the navigation.",
  alternates: { canonical: "/sitemap-page" },
};

const sections = [
  {
    heading: "Main pages",
    links: [
      { href: "/", label: "Home", note: "Practice areas and projects built in public." },
      { href: "/about", label: "About", note: "Background, certifications, and how I work." },
      { href: "/writing", label: "Writing", note: "Essays on AI, voice, and enterprise technology." },
      { href: "/accessibility", label: "Accessibility", note: "Conformance reports, VPAT work, and capability statements." },
      { href: "/accessibility/healthcare", label: "Section 504 for Healthcare", note: "45 CFR Part 84, the May 11 2027 date, and what it means for patient-facing documents." },
      { href: "/accessibility/maryland", label: "Maryland Nonvisual Access Requirements", note: "The § 3.5-311 clause and CATS+ vehicle, for capture managers." },
      { href: "/documents", label: "Capability statements", note: "Every capability statement, in HTML and as a PDF/UA-1 conformant PDF. The short URL the document footers point at." },
      { href: "/conformance-report.html", label: "Accessibility Conformance Report", note: "This site's own VPAT 2.5 report. Linked from three pages and, until August 30 2026, missing here, which left it locatable only one way." },
      { href: "/elsewhere", label: "Elsewhere", note: "Other places this work shows up." },
      { href: "/contact", label: "Contact", note: "Email, LinkedIn, and GitHub." },
    ],
  },
  {
    heading: "Essays",
    links: [
      // Published August 22 2026 and absent from this list until August 30.
      // The XML sitemap discovers essays by reading the directory, so it had
      // this one; this list is written by hand, so it did not. Third time a
      // live page has been reachable only one way, after /accessibility/maryland
      // and the conformance report. The two routes drift because only one of
      // them is generated.
      { href: "/writing/i-built-the-thing", label: "I Built the Thing", note: "August 22, 2026" },
      { href: "/writing/ai-is-not-automation", label: "AI Is Not Automation", note: "August 8, 2026" },
      { href: "/writing/seeing-the-next-rung", label: "Seeing the Next Rung", note: "July 25, 2026" },
      { href: "/writing/the-voice-book", label: "The Voice Book", note: "July 11, 2026" },
      { href: "/writing/how-i-review-my-own-writing", label: "How I Review My Own Writing", note: "June 27, 2026" },
      { href: "/writing/an-llm-with-a-logo", label: "An LLM With a Logo", note: "June 13, 2026" },
      { href: "/writing/ai-and-the-poisoning-of-professionalism", label: "AI and the Poisoning of Professionalism", note: "May 30, 2026" },
      { href: "/writing/the-last-moat-is-your-voice", label: "The Last Moat Is Your Voice", note: "May 16, 2026" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { href: "/tools/voice-critique", label: "Voice Critique", note: "The prompt and template, free to copy." },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl font-semibold tracking-tight mb-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Site map
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-10 text-neutral-800">
          Every page on this site, in one list.
        </p>

        {sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2
              className="text-2xl font-semibold tracking-tight mb-4"
              style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
            >
              {section.heading}
            </h2>
            <ul className="space-y-3">
              {section.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="underline underline-offset-4 hover:no-underline"
                    style={{ color: "var(--link)" }}
                  >
                    {l.label}
                  </Link>
                  <span className="text-sm block" style={{ color: "var(--muted-ink)" }}>
                    {l.note}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
