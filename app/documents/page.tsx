import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/app/components/SectionHeading";
import PageHeading from "@/app/components/PageHeading";
import { docs } from "./docs";

// Every capability statement, in both formats, at one short URL.
//
// WHY THIS PAGE EXISTS. The PDFs carry a footer line pointing here. That line
// has to be short enough to retype off a printed page and stable enough that
// adding or retiring a document never invalidates the ones already in circulation.
// A per-document URL in each footer would have been neither.
//
// The PDFs are PDF/UA-1 conformant and verified by veraPDF, so the HTML version
// is not a remedy for an inaccessible PDF. It is there because a 10-to-18-inch
// single continuous page is an awkward artifact to paste into a procurement
// portal or read on a phone, and because a firm that sells document
// accessibility should not make anyone open a PDF to learn what it does.

export const metadata: Metadata = {
  title: { absolute: "Capability Statements | Brian Beals, LLC" },
  description:
    "Capability statements for ADA Title II, Section 504 (healthcare and HHS-funded nonprofits), Section 508, and Maryland digital accessibility work. HTML and PDF/UA-1 PDF.",
  alternates: { canonical: "/documents" },
  openGraph: {
    title: "Capability Statements | Brian Beals, LLC",
    description:
      "Capability statements for ADA Title II, Section 504 (healthcare and HHS-funded nonprofits), Section 508, and Maryland digital accessibility work. HTML and PDF/UA-1 PDF.",
    url: "/documents",
    type: "website",
  },
  // Without its own twitter block this page inherited the root layout's, so X
  // showed the home title, description and card here.
  twitter: {
    card: "summary_large_image",
    title: "Capability Statements | Brian Beals, LLC",
    description:
      "Capability statements for ADA Title II, Section 504 (healthcare and HHS-funded nonprofits), Section 508, and Maryland digital accessibility work. HTML and PDF/UA-1 PDF.",
  },
};

export default function Documents() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-5xl mx-auto page-wide">
        <PageHeading spacing="mb-3">Capability Statements</PageHeading>
        <p className="text-base sm:text-lg leading-relaxed mb-10 text-neutral-800">
          Each of these is published in two formats. The PDF conforms to PDF/UA-1
          (ISO 14289-1), verified with veraPDF rather than asserted by the tool
          that wrote it. The HTML says the same thing as the one-page PDF and is
          there for reading on a phone or pasting into a portal.
        </p>

        <ul className="space-y-6">
          {docs.map((d) => (
            <li key={d.pdf} className="flex gap-4 sm:gap-6 items-start justify-between">
              <div className="min-w-0">
                <p className="font-semibold" style={{ color: "var(--head)" }}>
                  {d.name}
                </p>
                <p className="text-sm mb-1" style={{ color: "var(--muted-ink)" }}>
                  {d.note}
                </p>
                <p className="text-sm">
                  {/* The visible text stays "HTML" and "PDF", which is what a
                      sighted reader needs beside a name they just read. The
                      accessible name carries the document, because a screen
                      reader's links list is flat: without this it reads twelve
                      entries as HTML, PDF, HTML, PDF, with no way to tell which
                      document any of them belongs to. WCAG 2.4.4.

                      Found by scanning this site on the day the page shipped,
                      which is the argument for scanning your own work. */}
                  {d.html ? (
                    <>
                      <a
                        href={d.html}
                        aria-label={`${d.name}, HTML version`}
                        className="underline underline-offset-4 hover:no-underline"
                        style={{ color: "var(--link)" }}
                      >
                        HTML
                      </a>
                      <span aria-hidden="true" style={{ color: "var(--muted-ink)" }}>
                        {" · "}
                      </span>
                    </>
                  ) : null}
                  <a
                    href={d.pdf}
                    aria-label={`${d.name}, PDF version`}
                    className="underline underline-offset-4 hover:no-underline"
                    style={{ color: "var(--link)" }}
                  >
                    PDF
                  </a>
                </p>
              </div>
              {/* Thumbnail of the PDF's single page, beside the text on every
                  width: 120px, or 64px below 480px so the text column keeps
                  its room on a phone. A second way to the same PDF, so it is out of the tab
                  order and hidden from screen readers: the PDF link beside it
                  already names it. */}
              <a href={d.pdf} className="shrink-0" tabIndex={-1} aria-hidden="true">
                <Image
                  src={d.thumb}
                  alt=""
                  width={120}
                  height={155}
                  className="w-16 min-[480px]:w-[120px] h-auto rounded-sm border bg-white shadow-sm"
                  style={{ borderColor: "var(--rule)" }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* The program page behind each accessibility statement (2026-10-16). */}
        <SectionHeading>Program Pages</SectionHeading>
        <ul className="space-y-2 text-base sm:text-lg mb-6">
          {[
            ["/accessibility/title-ii", "ADA Title II, state and local government"],
            ["/accessibility/healthcare", "Section 504, healthcare"],
            ["/accessibility/federal", "Section 508, federal agencies and their vendors"],
            ["/accessibility/maryland", "Maryland nonvisual access"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <SectionHeading>This Site&rsquo;s Own Report</SectionHeading>
        <p className="text-base leading-relaxed mb-3 text-neutral-800">
          brianbeals.com is evaluated against all 50 Level A and AA success
          criteria and the result is published, including anything it does not fully
          support.
        </p>
        <p className="text-sm">
          <a
            href="/conformance-report.html"
            className="underline underline-offset-4 hover:no-underline"
            style={{ color: "var(--link)" }}
          >
            Accessibility Conformance Report (VPAT 2.5)
          </a>
        </p>
      </div>
    </div>
  );
}
