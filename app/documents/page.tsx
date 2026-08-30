import type { Metadata } from "next";

// Every capability statement, in both formats, at one short URL.
//
// WHY THIS PAGE EXISTS. The PDFs carry a footer line pointing here. That line
// has to be short enough to retype off a printed page and stable enough that
// adding a seventh document never invalidates the six already in circulation.
// A per-document URL in each footer would have been neither.
//
// The PDFs are PDF/UA-1 conformant and verified by veraPDF, so the HTML version
// is not a remedy for an inaccessible PDF. It is there because a 10-to-18-inch
// single continuous page is an awkward artifact to paste into a procurement
// portal or read on a phone, and because a firm that sells document
// accessibility should not make anyone open a PDF to learn what it does.

export const metadata: Metadata = {
  title: "Capability statements",
  description:
    "Every Brian Beals, LLC capability statement, in HTML and as a PDF/UA-1 conformant PDF.",
  alternates: { canonical: "/documents" },
  openGraph: {
    title: "Capability statements | Brian Beals, LLC",
    description:
      "Every Brian Beals, LLC capability statement, in HTML and as a PDF/UA-1 conformant PDF.",
    url: "/documents",
    type: "website",
  },
};

type Doc = {
  name: string;
  note: string;
  html: string | null;
  pdf: string;
};

const docs: Doc[] = [
  {
    name: "Section 504 Digital Accessibility for Healthcare",
    note: "45 CFR Part 84, WCAG 2.1 AA, and the May 11 2027 deadline for recipients of HHS funding.",
    html: "/capability-statement-accessibility-healthcare.html",
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement-Healthcare.pdf",
  },
  {
    name: "ADA Title II Digital Accessibility",
    note: "28 CFR 35.200 for state and local government, and the April 26 2027 deadline.",
    html: null,
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement.pdf",
  },
  {
    name: "Section 508 Digital Accessibility",
    note: "Federal agencies and their contractors.",
    html: null,
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement-Federal.pdf",
  },
  {
    name: "Maryland Digital Accessibility and Nonvisual Access",
    note: "The § 3.5-311 nonvisual access clause, and the CATS+ vehicle.",
    html: null,
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement-Maryland.pdf",
  },
  {
    name: "Capability Statement",
    note: "General. AI, analytics, and enterprise technology.",
    html: null,
    pdf: "/Brian-Beals-LLC-Capability-Statement-Federal.pdf",
  },
  {
    name: "Capability Statement, State and Local",
    note: "General, framed for state and local buyers.",
    html: null,
    pdf: "/Brian-Beals-LLC-Capability-Statement-Florida.pdf",
  },
];

export default function Documents() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl font-semibold tracking-tight mb-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Capability statements
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Each of these is published in two formats. The PDF conforms to PDF/UA-1
          (ISO 14289-1), verified with veraPDF rather than asserted by the tool
          that wrote it. The HTML is the same document as a web page, for reading
          on a phone or pasting into a portal.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-10 text-neutral-800">
          Where a document shows no HTML link yet, only the PDF is published. The
          HTML versions are being added one at a time.
        </p>

        <ul className="space-y-6">
          {docs.map((d) => (
            <li key={d.pdf}>
              <p className="font-semibold" style={{ color: "var(--head)" }}>
                {d.name}
              </p>
              <p className="text-sm mb-1" style={{ color: "var(--muted-ink)" }}>
                {d.note}
              </p>
              <p className="text-sm">
                {d.html ? (
                  <>
                    <a
                      href={d.html}
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
                  className="underline underline-offset-4 hover:no-underline"
                  style={{ color: "var(--link)" }}
                >
                  PDF
                </a>
              </p>
            </li>
          ))}
        </ul>

        <h2
          className="text-2xl font-semibold tracking-tight mt-12 mb-4"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          This site&rsquo;s own report
        </h2>
        <p className="text-base leading-relaxed mb-3 text-neutral-800">
          brianbeals.com is evaluated against all 50 Level A and AA success
          criteria and the result is published, including what it does not fully
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
