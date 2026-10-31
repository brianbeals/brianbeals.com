import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/app/components/SectionHeading";
import PageHeading from "@/app/components/PageHeading";

// One finding as it appears in a client deliverable, and the conformance report
// rows it rolls up into (2026-10-31, buyer-first pass). Linked from /accessibility,
// right after "What You Get", and from the site map. A sample: the City of Coquina
// Bay, FL and example.org are the fictional city of /free-test/sample, and nothing
// here comes from a real client's finding. The vocabulary (status words, ACR
// columns) is the a11y-audit report's and this site's own conformance report's.
const TITLE = "What a Finding Looks Like | Brian Beals, LLC";
const DESCRIPTION =
  "A sample finding from an accessibility evaluation, for a fictional city: the criterion, the evidence, why it matters, its priority, what a remediation vendor bids against, and the conformance report rows it becomes.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/accessibility/sample-finding" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/accessibility/sample-finding",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const body = "text-base sm:text-lg leading-relaxed mb-6 text-neutral-800";
const link = "underline underline-offset-4 font-semibold";

const FINDING: { label: string; detail: React.ReactNode }[] = [
  {
    label: "Finding",
    detail: "1 of 12: the fee waiver application can't be read or filled in with a screen reader.",
  },
  {
    label: "Where",
    detail: (
      <>
        Fee Waiver Application (<span className="break-all">fee-waiver-application.pdf</span>, 3
        pages), linked from example.org/forms, the Forms and Applications page.
      </>
    ),
  },
  {
    label: "Criteria",
    detail: (
      <>
        1.3.1 Info and Relationships (Level A): the document is untagged, so its headings, the
        household income table and the form&apos;s structure aren&apos;t available to assistive
        technology. 4.1.2 Name, Role, Value (Level A): the 14 form fields have no names. 2.4.2
        Page Titled (Level A): the document has no title, so its file name is announced
        instead.
      </>
    ),
  },
  { label: "Status", detail: <strong>Does Not Support</strong> },
  {
    label: "Priority",
    detail:
      "1 of 12. It's how a resident applies for a program, there's no other way to apply online, and it's the most downloaded file in the forms library.",
  },
];

const ACR: { criterion: string; level: string; remarks: string }[] = [
  {
    criterion: "1.3.1 Info and Relationships",
    level: "Partially Supports",
    remarks:
      "Web pages meet the criterion. The Fee Waiver Application (PDF, linked from Forms and Applications) is untagged: its headings, household income table and form structure aren't exposed to assistive technology. Finding 1.",
  },
  {
    criterion: "2.4.2 Page Titled",
    level: "Partially Supports",
    remarks:
      "Every web page has a descriptive title. The Fee Waiver Application has no document title, so screen readers announce its file name. Finding 1.",
  },
  {
    criterion: "4.1.2 Name, Role, Value",
    level: "Partially Supports",
    remarks:
      "Web page controls are named. The 14 fields of the Fee Waiver Application have no accessible names. Finding 1.",
  },
];

export default function SampleFinding() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        <PageHeading>What a Finding Looks Like</PageHeading>

        <p
          className="text-base sm:text-lg leading-relaxed mb-8 rounded-md border px-5 py-4 text-neutral-800"
          style={{ borderColor: "var(--rule)" }}
        >
          <strong style={{ color: "var(--head)" }}>This is a sample.</strong> The City of
          Coquina Bay, FL and example.org are fictional, as in the{" "}
          <Link href="/free-test/sample" className={link} style={{ color: "var(--link)" }}>
            sample free test report
          </Link>
          . No real site or document was tested for it. The finding is written the way one
          appears in a client&apos;s audit report.
        </p>

        <p className={body}>
          Every finding in a report carries the same parts: the criterion it fails, the evidence,
          why it matters, where it falls in the order of work, and what the fix has to achieve.
          Then the same finding appears a second time, as rows in the Accessibility Conformance
          Report, which is the document your procurement office files.
        </p>

        <SectionHeading>The Finding</SectionHeading>

        <table role="table" className="doc-table stack text-neutral-800">
          <caption className="sr-only">Finding 1, as it appears in the audit report</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col">Item</th>
              <th role="columnheader" scope="col">Detail</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {FINDING.map((f) => (
              <tr role="row" key={f.label}>
                <th role="rowheader" scope="row" style={{ width: "19%" }}>
                  {f.label}
                </th>
                <td role="cell" data-label="Detail">
                  {f.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <SectionHeading>Evidence</SectionHeading>

        <p className={body}>
          <strong style={{ color: "var(--head)" }}>What a screen reader announces.</strong> Opening
          the file, NVDA and VoiceOver both read &ldquo;fee-waiver-application.pdf&rdquo; where a
          title belongs. Adobe Acrobat Reader reports that the document isn&apos;t tagged and
          guesses at the reading order, so the instructions on page 1 run straight into the
          signature line on page 3. Tabbing through the form, each field is read as &ldquo;edit,
          blank&rdquo;: the resident hears that a box is there, never what goes in it. The
          household income table reads one cell at a time, with no column headers to say which
          number is monthly and which is yearly.
        </p>

        <p className={body}>
          <strong style={{ color: "var(--head)" }}>How it was tested.</strong> veraPDF, validating
          against PDF/UA-1, fails the file on its first check: there is no structure tree. Then
          by hand, with NVDA and Adobe Acrobat Reader on Windows and with VoiceOver on macOS,
          reading the document top to bottom and filling in the form by keyboard alone. Tested
          October 14, 2026.
        </p>

        <SectionHeading>Why It Matters</SectionHeading>

        <p className={body}>
          A resident uses this form to ask the city to waive a fee, so the form is the way into
          the program. The Title II rule exempts some documents posted before the compliance
          date, but not one that is currently used to apply for, gain access to, or take part in
          a program (<strong style={{ color: "var(--head)" }}>28 CFR 35.201(b)</strong>). This one
          is, so the exception doesn&apos;t apply. A blind resident can&apos;t complete it without
          help, which is the situation the rule exists to end.
        </p>

        <SectionHeading>Priority</SectionHeading>

        <p className={body}>
          First of twelve. Findings are ordered by who is blocked and how often: a form a
          resident needs to reach a program comes before a page that is merely harder to use,
          and this is the most downloaded file in the library. The report&apos;s order is the
          order the remediation budget should follow.
        </p>

        <SectionHeading>What a Remediation Vendor Bids Against</SectionHeading>

        <ul className="list-disc pl-6 space-y-2 mb-6 text-base sm:text-lg leading-relaxed text-neutral-800">
          <li>Tag the document, so its headings, lists and the income table&apos;s column headers are in the tag tree.</li>
          <li>Set the document title to &ldquo;Fee Waiver Application&rdquo; and show it in place of the file name.</li>
          <li>Set the document language to English.</li>
          <li>Give each of the 14 form fields a name a screen reader reads, matching its printed label.</li>
          <li>Set the reading order and the tab order to follow the form, page 1 to page 3.</li>
        </ul>

        <p className={body}>
          Done means veraPDF reports no PDF/UA-1 failures and the form can be read and completed
          with NVDA and with VoiceOver. A retest confirms it.
        </p>

        <p className={body}>
          <strong style={{ color: "var(--head)" }}>Brian Beals, LLC does not do the repair.</strong>{" "}
          The finding is the specification your vendor bids against, and the firm has no stake
          in which vendor wins or what the fix costs.
        </p>

        <SectionHeading>The Same Finding in the Conformance Report</SectionHeading>

        <p className={body}>
          The finding is about one document, so it says Does Not Support. A conformance report
          row covers the whole site, where every web page and most documents meet these
          criteria, so each row says Partially Supports and its remarks name the document and
          the finding.
        </p>

        <table role="table" className="doc-table stack text-neutral-800">
          <caption className="sr-only">
            The conformance report rows finding 1 rolls up into
          </caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col">Criterion</th>
              <th role="columnheader" scope="col">Conformance level</th>
              <th role="columnheader" scope="col">Remarks and explanations</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {ACR.map((r) => (
              <tr role="row" key={r.criterion}>
                <th role="rowheader" scope="row" style={{ width: "24%" }}>
                  {r.criterion}
                </th>
                <td role="cell" data-label="Conformance level" className="price">
                  {r.level}
                </td>
                <td role="cell" data-label="Remarks and explanations">
                  {r.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={body}>
          See{" "}
          <a href="/conformance-report.html" className={link} style={{ color: "var(--link)" }}>
            this site&apos;s own conformance report
          </a>{" "}
          for the full format, or{" "}
          <Link href="/accessibility" className={link} style={{ color: "var(--link)" }}>
            what an evaluation covers and what it costs
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
