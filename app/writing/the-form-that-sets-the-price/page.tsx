import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";
import TopicLabel from "@/app/components/TopicLabel";
import PageHeading from "@/app/components/PageHeading";
import SubHeading from "@/app/components/SubHeading";

// Accessibility track. Byline, title suffix, and publisher are the practice's
// (Brian Beals, LLC), not the personal brand's.

export const metadata: Metadata = {
  title: { absolute: "The Form That Sets the Price | Brian Beals, LLC" },
  description:
    "What one Florida health center's forms say about the May 2027 date, and why the sliding-fee application comes first.",
  alternates: {
    canonical: "/writing/the-form-that-sets-the-price",
  },
  openGraph: {
    title: "The Form That Sets the Price | Brian Beals, LLC",
    description:
      "What one Florida health center's forms say about the May 2027 date, and why the sliding-fee application comes first.",
    url: "/writing/the-form-that-sets-the-price",
    type: "article",
    publishedTime: "2026-10-18T12:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Form That Sets the Price | Brian Beals, LLC",
    description:
      "What one Florida health center's forms say about the May 2027 date, and why the sliding-fee application comes first.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Form That Sets the Price",
  description:
    "What one Florida health center's forms say about the May 2027 date, and why the sliding-fee application comes first.",
  datePublished: "2026-10-18",
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
  mainEntityOfPage: "https://brianbeals.com/writing/the-form-that-sets-the-price",
};

export default function EssayPage() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-2xl mx-auto">
        <PageHeading>The Form That Sets the Price</PageHeading>
        <TopicLabel slug="the-form-that-sets-the-price" />

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          <em>
            What one Florida health center&rsquo;s forms say about the May 2027 date, and why the sliding-fee application comes first.
          </em>
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Last week I sampled eight pages on a Florida community health center&rsquo;s website and the five PDFs linked from them. Four of the five had no tag structure at all. The sliding-fee application was one of them.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That application is how a patient without insurance finds out what a visit will cost. It asks for household size and income, and the answer sets the discount. The words are in the file, but nothing tells software what they are. No headings, no reading order, no form fields. Read in the order the file stores it, the application starts with the office-use box in the corner, jumps to the page footer, and only then reaches the one line written for anyone who&rsquo;s stuck. &ldquo;If you need help filling out these forms, please let us know.&rdquo;
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The patients a sliding-fee scale exists for are the ones with the least room to work around a broken form. Some of them use screen readers. The document that sets their price is one they can&rsquo;t fill in on their own.
        </p>

        <SubHeading level={2} spacing="mt-12 mb-4">What the rule says</SubHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          In May 2024 the Department of Health and Human Services finalized its update to the Section 504 regulations, 45 CFR part 84. Subpart I covers web content and mobile apps: any recipient of HHS federal financial assistance has to meet WCAG 2.1 Level AA, by May 11, 2027 for recipients with 15 or more employees and May 10, 2028 for the smaller ones. Those are the dates after HHS pushed the original deadlines back a year, so anything printed in 2024 still shows 2026.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A federally qualified health center takes a Section 330 grant from HRSA. That makes it a recipient, and no one at a health center will argue the point.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          PDFs are covered too. The rule calls them conventional electronic documents, and like the ADA rule for cities and counties, it has an exception for documents posted before the compliance date. The exception stops at any document a person uses to apply for, gain access to, or take part in the recipient&rsquo;s programs.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Run a health center&rsquo;s forms library through that sentence. The sliding-fee application is how a patient applies for the discount. The new-patient intake packet is how a patient gets access to care. The consent and authorization forms are how a patient takes part in it. None of the three qualifies for the exception, whatever date is on the file.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          People will reach for a second exception, for documents about one patient that sit behind a password, like a lab result in the portal. It&rsquo;s real, and it covers that patient&rsquo;s own records. It doesn&rsquo;t cover the blank forms on the public site that every new patient is told to download.
        </p>

        <SubHeading level={2} spacing="mt-12 mb-4">Why these three are on the site</SubHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Nobody posts them by accident. Section 330 requires every health center to run a sliding-fee discount program and to tell patients it exists, and the website is where most of them do the telling. Intake packets go online because filling them out at home saves twenty minutes at the front desk.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          They&rsquo;re there because the health center is doing what it&rsquo;s supposed to do. That&rsquo;s also why they&rsquo;re the documents the rule reaches first.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          In the sample, the sliding-fee application runs four pages and every blank is a printed line. The intake packet runs ten, built the same way, and the consent forms live inside it. Nine sections, each with its own box to initial, and one signature at the end. One of those nine consents names the people who may hear about the patient&rsquo;s care, and it covers HIV, behavioral health, and substance use treatment.
        </p>

        <SubHeading level={2} spacing="mt-12 mb-4">What &ldquo;no tags&rdquo; means at the front desk</SubHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A PDF has two layers: what you see, and a structure underneath that tells software what each part is. Heading, paragraph, list, table, form field. A screen reader reads the structure. Take it away and the reader gets text in whatever order it was drawn, or, for a scanned form, silence.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A form adds one more layer. Each fill-in box needs a label the software can read. Without one, the screen reader announces &ldquo;edit text, blank,&rdquo; and the patient has to guess which box is household income and which is the number of dependents. The forms in this sample don&rsquo;t even get that far. The application and the intake packet have zero fill-in boxes between them, only printed lines, so the only way to complete either one is with a pen.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          So the patient asks for help, which is fine, until the person helping is reading their income out loud at the front desk. Then the consent that covers HIV and substance use treatment.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I&rsquo;ve filled out that clipboard in an ER waiting room, and I could at least see what I was writing. You get better privacy in a cubicle farm than at a check-in desk, and the patient who needs someone to read the form to them doesn&rsquo;t even get that.
        </p>

        <SubHeading level={2} spacing="mt-12 mb-4">What to do with that</SubHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Start by counting. Catalog every PDF on the health center&rsquo;s web properties and clinic microsites in four columns. Retire it, replace it with a web page or web form, remediate it, or leave it under the exception with a note saying why. Remediation vendors charge by the page, and the count is what turns that into a budget line instead of a guess.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Put the sliding-fee application, the intake packet, and the consent forms at the top of the list. They&rsquo;re short, they&rsquo;re used every day, and they&rsquo;re the first documents a complaint would name.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Then look hard at whether each one should be a PDF at all. A web form built right is easier to keep accessible than a PDF someone edits in a desktop program every January when the poverty guidelines change.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          And don&rsquo;t count the accessibility widget in the corner of the home page as the plan. It doesn&rsquo;t touch the PDFs.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          May 2027 is seven months out as I write this. The tagging is the fast part. The slow part is someone on staff deciding, form by form, what each document is for.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I write Accessibility Conformance Reports and document inventories for health centers, and I don&rsquo;t do the remediation. Start with the form that sets the price.
        </p>

        <hr className="my-10 border-neutral-200" />

        <p className="text-sm leading-relaxed text-neutral-600 italic">
          Figures are from a recon sample of one Florida community health center&rsquo;s public website, run October 16, 2026, with the organization and every identifying detail removed. Eight pages and five linked PDFs, counts and verdicts as recorded, no screen reader test run. A sample, not an audit.
        </p>

        <EssayByline variant="practice" />
      </article>
    </div>
  );
}
