import Link from "next/link";
import { enabled as freeTestEnabled } from "@/lib/free-test";
import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";
import TopicLabel from "@/app/components/TopicLabel";
import PageHeading from "@/app/components/PageHeading";
import SubHeading from "@/app/components/SubHeading";

// First essay on the accessibility track. Byline, title suffix, and publisher
// are the practice's (Brian Beals, LLC), not the personal brand's.

export const metadata: Metadata = {
  title: { absolute: "Eight of Twenty-Six | Brian Beals, LLC" },
  description:
    "What the PDFs on one Florida city's website say about the April 2027 date, and why the forms library comes before the home page.",
  alternates: {
    canonical: "/writing/eight-of-twenty-six",
  },
  openGraph: {
    title: "Eight of Twenty-Six | Brian Beals, LLC",
    description:
      "What the PDFs on one Florida city's website say about the April 2027 date, and why the forms library comes before the home page.",
    url: "/writing/eight-of-twenty-six",
    type: "article",
    publishedTime: "2026-10-11T12:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eight of Twenty-Six | Brian Beals, LLC",
    description:
      "What the PDFs on one Florida city's website say about the April 2027 date, and why the forms library comes before the home page.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Eight of Twenty-Six",
  description:
    "What the PDFs on one Florida city's website say about the April 2027 date, and why the forms library comes before the home page.",
  datePublished: "2026-10-11",
  author: {
    "@type": "Person",
    name: "Brian Beals",
    url: "https://brianbeals.com",
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://brianbeals.com/#organization",
    name: "Brian Beals, LLC",
    url: "https://brianbeals.com/accessibility",
  },
  mainEntityOfPage: "https://brianbeals.com/writing/eight-of-twenty-six",
};

export default function EssayPage() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-2xl mx-auto">
        <PageHeading>Eight of Twenty-Six</PageHeading>
        <TopicLabel slug="eight-of-twenty-six" />

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          <em>
            What the PDFs on one Florida city&rsquo;s website say about the April 2027 date, and why the forms library comes before the home page.
          </em>
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Last week I sampled seven pages on a Southwest Florida city&rsquo;s website and the 26 PDFs linked from them. Eight of the 26 had no tag structure at all. One was a scanned image with no text layer. A screen reader opens those eight and reads garbage, or nothing.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The home page was fine. The home page is usually fine. It&rsquo;s the page the web vendor shows the council, the one that got redesigned in 2023, the one with the accessibility widget in the corner. Nobody puts the sanitation cart request form through a redesign. They scan it, link it, and move on.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That&rsquo;s the gap the ADA rule is going to find.
        </p>

        <SubHeading level={2} spacing="mt-12 mb-4">What the Rule Says About Documents</SubHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The Department of Justice rule for state and local government, 28 CFR 35.200, requires web content to meet WCAG 2.1 Level AA by April 26, 2027 for entities serving 50,000 or more, and April 26, 2028 for the smaller ones and every special district. Most people reading about it stop at &ldquo;web content&rdquo; and picture pages.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The rule calls PDFs &ldquo;conventional electronic documents,&rdquo; and they&rsquo;re covered. There&rsquo;s an exception for older documents, but it&rsquo;s narrow. A document posted before the compliance date is exempt only if nobody uses it to apply for, access, or take part in a service. The minute a resident needs that PDF to get the cart, pay the fee, or file the complaint, it&rsquo;s in scope, whatever its date.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Look at what was in the eight. A residential services guide. Three collection maps. A bidder portal guide and a vendor registration brochure, on the page for doing business with the city. A procurement policy. These are how people use the city. None of them qualifies for the exception.
        </p>

        <SubHeading level={2} spacing="mt-12 mb-4">What &ldquo;No Tags&rdquo; Means to a Person</SubHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A PDF has two layers: what you see, and a structure underneath that tells software what the parts are. Heading, paragraph, list, table, image. A screen reader reads the structure. Take it away and the reader gets a stream of text with no order, or, for the scanned one, silence.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Among the 18 PDFs that were tagged, three had no headings, so there&rsquo;s nothing to jump to and the whole document has to be read start to finish, and one had a fee table with no header cells, so the numbers arrive with no labels attached. And across 17 of the documents, 477 images carried no alternative text. A map of collection routes with no alt text is a blank square to the person who most needs to know which day the truck comes.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          These are the first things a screen reader user hits, and they&rsquo;re the first things a complaint cites.
        </p>

        <SubHeading level={2} spacing="mt-12 mb-4">Why the Home Page Gets the Attention Anyway</SubHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Because it&rsquo;s visible. The home page is what the vendor demos and what the overlay widget decorates. Document libraries are invisible until someone needs one, and the person who needs one is rarely in the room when the website budget is set.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The scoring is also backwards from how the risk works. Six of the seven findings on that city&rsquo;s sample sat at Level A, the floor of the standard, and four of the six were in documents. Fixing the home page&rsquo;s contrast ratio moves you from &ldquo;mostly compliant&rdquo; to &ldquo;mostly compliant.&rdquo; Fixing the eight documents changes whether a resident can get a service.
        </p>

        <SubHeading level={2} spacing="mt-12 mb-4">What to Do With That</SubHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Start by counting. Every PDF on your web properties, cataloged, with four columns: retire it, replace it with a web page, remediate it, or leave it under the exception with a note saying why. A city of 20,000 can have a few hundred; the seven pages I sampled linked 26. A county has thousands. The count is the budget conversation, because remediation vendors charge by the page and the only way to spend that money well is to know which documents residents use.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Then stop treating the overlay widget as the plan. It changes nothing in the PDFs.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The April 2027 date is seven months out as I write this, and the document inventory is the part that takes longest, because it needs somebody to decide, document by document, what the thing is for. That&rsquo;s a staff question before it&rsquo;s a technical one. The technical part, tagging and testing, is well understood and goes fast once the list exists.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I write Accessibility Conformance Reports for public entities, and I don&rsquo;t do the remediation. The forms are where the exposure is.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The one that stays with me came from a different site, a sheriff&rsquo;s office: a PDF whose filename looked like a database export, and which turned out to be a screenshot of a form. Not the form. A picture of it. Anyone using a screen reader opens that file and hears the filename.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Start the count this month.
        </p>

        {/* The screen reader demo (2026-10-22), on /free-test, so only while it is up. */}
        {freeTestEnabled() ? (
          <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
            Hear it for yourself:{" "}
            <Link href="/free-test#demo" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
              a two-minute demo
            </Link>
            .
          </p>
        ) : null}

        <hr className="my-10 border-neutral-200" />

        <p className="text-sm leading-relaxed text-neutral-600 italic">
          Figures are from a recon sample of one Southwest Florida city&rsquo;s public website, run October 8, 2026, with the city and every identifying detail removed. Seven pages and 26 linked PDFs; counts and verdicts as recorded. A sample, not an audit.
        </p>

        <EssayByline variant="practice" />
      </article>
    </div>
  );
}
