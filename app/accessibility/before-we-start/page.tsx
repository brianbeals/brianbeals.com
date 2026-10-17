import type { Metadata } from "next";
import Link from "next/link";
import ReadinessForm from "./ReadinessForm";
import SectionHeading from "@/app/components/SectionHeading";
import PageHeading from "@/app/components/PageHeading";

// Ported 2026-10-15 from the approved print document
// LLC/FL-VBE/Accessibility-Practice/Pre-Engagement-Requirements.html. Everything
// in it is kept: the allowlist section and its cost table, the ten requirements
// with their consequences, the readiness checklist, and what happens next. Port,
// do not rewrite. The document's script-written footer year is gone; the site
// footer stands in for it.
//
// The readiness checklist is a form since 2026-10-15 (ReadinessForm.tsx, fields.ts,
// actions.ts). A submission is emailed to Brian through Resend and stored nowhere:
// no database, no log of the answers, no copy to the submitter. Without
// RESEND_API_KEY the form renders as a printable checklist with "email it to
// brian@brianbeals.com" in place of the send button. Printing (globals.css,
// .print-doc) drops the site nav, forces light colors and puts the checklist on
// a sheet of its own; after a send, printing gives only the submitted answers.
export const metadata: Metadata = {
  title: { absolute: "Before We Start: Pre-Engagement Requirements | Brian Beals, LLC" },
  description:
    "What has to be in place before a fixed-fee accessibility evaluation can be quoted: the allowlist, the page inventory, authenticated areas, and a printable readiness checklist.",
  alternates: {
    canonical: "/accessibility/before-we-start",
  },
  openGraph: {
    title: "Before We Start: Pre-Engagement Requirements | Brian Beals, LLC",
    description:
      "What has to be in place before a fixed-fee accessibility evaluation can be quoted: the allowlist, the page inventory, authenticated areas, and a printable readiness checklist.",
    url: "/accessibility/before-we-start",
    type: "website",
  },
  twitter: {
    title: "Before We Start: Pre-Engagement Requirements | Brian Beals, LLC",
    description:
      "What has to be in place before a fixed-fee accessibility evaluation can be quoted: the allowlist, the page inventory, authenticated areas, and a printable readiness checklist.",
  },
};

/* The BB mark, inverse, matching app/accessibility/page.tsx. Decorative. */
function BBMarkInverse() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='white'/%3E%3Ctext x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='%231E3A5F' font-family='system-ui' font-size='16' font-weight='800'%3EBB%3C/text%3E%3C/svg%3E"
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
    />
  );
}

const body = "text-base sm:text-lg leading-relaxed mb-6 text-neutral-800";


const REQUIREMENTS: {
  n: number;
  blocker?: boolean;
  item: string;
  detail: string;
  why: string;
  otherwise: string;
}[] = [
  {
    n: 1,
    blocker: true,
    item: "Allowlist for the evaluation tooling",
    detail:
      "A user agent string and source address are supplied on request. Applies to Cloudflare, Akamai, Imperva, AWS WAF, and similar.",
    why: "Without it the scanner is refused and every page must be inspected by hand.",
    otherwise: "Surcharge of roughly $600 for manual collection, quoted before work begins.",
  },
  {
    n: 2,
    blocker: true,
    item: "Page inventory",
    detail: "A list of URLs in scope, or confirmation that a crawl from the home page is sufficient.",
    why: "A sitemap.xml is a publishing artifact, not an inventory. Login pages, tools, and anything noindexed routinely sit outside it, and those are exactly the pages with forms and error messages.",
    otherwise: "Scope cannot be fixed, so a fixed fee cannot be quoted.",
  },
  {
    n: 3,
    blocker: true,
    item: "Decision on authenticated areas",
    detail: "In scope or out. If in scope, working test credentials for a non-privileged account.",
    why: "Authenticated pages hold most of the forms, error messages, and status updates, which is where the harder criteria live.",
    otherwise:
      "Authenticated areas are excluded and the report says so. They are not evaluated on the basis of the public shell.",
  },
  {
    n: 4,
    item: "Document count and location",
    detail: "Roughly how many PDFs and other documents are published, and where they live.",
    why: "A document library is commonly the largest part of the exposure and the largest part of the cost. A mid-size county can hold tens of thousands.",
    otherwise: "Documents excluded from scope, stated in the report. Scoped separately later.",
  },
  {
    n: 5,
    item: "Named point of contact",
    detail: "One person authorized to answer scope questions and confirm decisions.",
    why: "Scope questions arise mid-evaluation. Waiting on a committee turns a two-week engagement into a two-month one.",
    otherwise: "Timeline extends. Fee unchanged unless delay is substantial.",
  },
  {
    n: 6,
    item: "Which obligation applies",
    detail:
      "Public entity, private business, recipient of HHS funding, or vendor selling to government. For public entities, the 2020 Census population.",
    why: "It decides the standard and the date. Title II is WCAG 2.1 AA; Section 508 is WCAG 2.0 AA. Population sets which Title II compliance date applies.",
    otherwise: "Evaluated against WCAG 2.1 Level AA by default, which satisfies the stricter reading.",
  },
  {
    n: 7,
    item: "Third-party embeds",
    detail:
      "A list of embedded services: chat, video, mapping, payments, scheduling, analytics, accessibility widgets.",
    why: "Embedded code is evaluated as it appears but cannot be remediated by anyone other than its vendor. Knowing what is there shapes the remediation list.",
    otherwise: "Evaluated as encountered. Findings attributable to third-party code are marked as such.",
  },
  {
    n: 8,
    item: "Prior work",
    detail:
      "Any earlier audit, conformance report, accessibility statement, or remediation effort, including any monitoring or overlay product in use.",
    why: "Avoids re-reporting known issues, and an existing accessibility statement is itself a claim that gets checked against the findings.",
    otherwise:
      "Evaluation proceeds without it. Existing statements are still checked against results and any contradiction is reported.",
  },
  {
    n: 9,
    item: "Change freeze, or notice of planned changes",
    detail: "Whether a redesign, CMS migration, or template change is planned during the engagement.",
    why: "A report describes a moment. A template change mid-evaluation can invalidate work already done.",
    otherwise:
      "Report is dated and scoped to what was evaluated. Re-evaluation after the change is a new engagement.",
  },
  {
    n: 10,
    item: "Screen reader testing decision",
    detail: "Included or excluded.",
    why: "It is the only way to fully verify two criteria and it cannot be automated. Excluding it is a legitimate choice; hiding the exclusion is not.",
    otherwise: "Excluded, and the report states which criteria are affected and why.",
  },
];

export default function BeforeWeStart() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16 print-doc">
      <article className="max-w-5xl mx-auto page-wide">
        <div
          className="rounded-lg px-6 py-8 sm:px-8 sm:py-10 mb-10"
          style={{ backgroundColor: "#1E3A5F" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <BBMarkInverse />
            <span
              className="text-sm font-semibold tracking-wide uppercase"
              style={{ color: "#D6EAF8", letterSpacing: "0.08em" }}
            >
              Brian Beals, LLC
            </span>
          </div>
          <PageHeading tone="band" spacing="mb-4">Pre-Engagement Requirements</PageHeading>
          <p className="text-lg leading-relaxed" style={{ color: "#D6EAF8" }}>
            What has to be in place before a fixed fee can be quoted
          </p>
        </div>

        <p className={body}>
          A fixed-fee accessibility evaluation depends on being able to reach and read the
          property being evaluated. Most of the cost is in the work that follows the scan, and
          that work is only affordable because the scan itself is fast.
        </p>
        <p className={body}>
          The items below are what makes that true. Where an item cannot be provided, the work
          still gets done; it just costs more or covers less. Each item states its consequence
          so there are no surprises after a number has been quoted.
        </p>

        <SectionHeading>The one that changes the price most</SectionHeading>

        <div className="doc-note stop bg-white text-base sm:text-lg leading-relaxed text-neutral-800">
          <p className="mb-4">
            <strong>
              If the site blocks automated browsers, the evaluation still happens, and it costs
              more.
            </strong>
          </p>
          <p className="mb-4">
            Many public sector sites sit behind a web application firewall or bot protection
            service. In a recent survey of 22 Southwest Florida public entity websites, five
            refused an automated browser outright. That is not unusual and it is not a criticism
            of the security posture; it is a fact that has to be settled before a number is
            quoted.
          </p>
          <p>
            This firm does not circumvent security controls. Working around a bot protection
            measure on government infrastructure, while selling compliance services, is not a
            trade worth making at any price. The alternative is manual collection, which is
            slower and priced accordingly.
          </p>
        </div>

        <table role="table" className="doc-table stack text-neutral-800">
          <caption>What blocking costs, for a 25-page evaluation</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col">Approach</th>
              <th role="columnheader" scope="col">Time to inspect 25 pages</th>
              <th role="columnheader" scope="col">Effect on fee</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row">
              <th role="rowheader" scope="row">Allowlisted, automated</th>
              <td role="cell" data-label="Time to inspect 25 pages">
                About five minutes, unattended
              </td>
              <td role="cell" data-label="Effect on fee">
                Fixed fee as quoted
              </td>
            </tr>
            <tr role="row">
              <th role="rowheader" scope="row">Blocked, collected by hand</th>
              <td role="cell" data-label="Time to inspect 25 pages">
                One and a half to two hours
              </td>
              <td role="cell" data-label="Effect on fee" className="blocker">
                Surcharge of roughly $600 on top of the fixed fee
              </td>
            </tr>
          </tbody>
        </table>

        <p className={body}>
          Manual collection means a person opens each page in an ordinary browser and runs the
          same measurement script against the page the site already served them. Nothing is
          circumvented and the results are comparable, but it takes about twenty times longer
          and the report notes two things the manual path cannot capture.
        </p>

        <p className={body}>
          An allowlist entry usually takes one email to whoever administers the CDN or firewall.
          It is the single highest-value thing a client can do before the engagement starts, and
          it turns two hours back into five minutes. The scanner&apos;s User-Agent, pace, and
          limits are on{" "}
          <Link href="/scanner" className="underline underline-offset-4" style={{ color: "var(--link)" }}>
            About our scanners
          </Link>
          .
        </p>

        <SectionHeading>Requirements</SectionHeading>

        <p className={body}>
          Items marked <span className="font-bold" style={{ color: "var(--err)" }}>Blocker</span>{" "}
          must be resolved before a fixed fee is quoted. The others affect scope or accuracy and
          are worth settling early.
        </p>

        <table role="table" className="doc-table stack text-neutral-800">
          <caption>Provided by the client before contracting</caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col" style={{ width: "4.5rem" }}>
                Req.
              </th>
              <th role="columnheader" scope="col">Item</th>
              <th role="columnheader" scope="col">Why it matters</th>
              <th role="columnheader" scope="col">If not provided</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {REQUIREMENTS.map((r) => (
              <tr role="row" key={r.n}>
                <th role="rowheader" scope="row" className={r.blocker ? "blocker" : undefined}>
                  {r.n}
                  {r.blocker ? (
                    <span className="block text-sm font-semibold">Blocker</span>
                  ) : null}
                </th>
                <td role="cell" data-label="Item">
                  <strong>{r.item}</strong>
                  <br />
                  {r.detail}
                </td>
                <td role="cell" data-label="Why it matters">
                  {r.why}
                </td>
                <td
                  role="cell"
                  data-label="If not provided"
                  className={r.blocker ? "blocker" : undefined}
                >
                  {r.otherwise}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="ck-section print-break" aria-labelledby="readiness">
          <SectionHeading id="readiness">Readiness checklist</SectionHeading>

          <p className={body}>
            Complete this before a fee is quoted: send it below, or print it and email it to{" "}
            <a
              href="mailto:brian@brianbeals.com"
              className="underline underline-offset-4 hover:no-underline"
              style={{ color: "var(--link)" }}
            >
              brian@brianbeals.com
            </a>
            . Anything unknown is fine; say so rather than guessing, and it gets resolved on a
            short call.
          </p>

          <ReadinessForm canSend={Boolean(process.env.RESEND_API_KEY)} />
        </section>

        <SectionHeading>What happens after this comes back</SectionHeading>

        <ol className="list-decimal pl-6 space-y-3 mb-6 text-base sm:text-lg leading-relaxed text-neutral-800">
          <li>A short call to resolve anything marked unknown, particularly the allowlist question.</li>
          <li>
            A no-charge recon scan of a handful of pages, which confirms the tooling can reach the
            site and gives an early read on what is there.
          </li>
          <li>
            A fixed-fee Statement of Work, or an hourly proposal where a blocker could not be
            cleared.
          </li>
        </ol>

        <div className="doc-note bg-white text-base sm:text-lg leading-relaxed text-neutral-800">
          <p>
            <strong>A blocked site is not a lost engagement</strong>. It is a different one,
            priced differently, and worth saying so before a number is on paper rather than
            after. The reason this document exists is that quoting a fixed fee against an unknown
            access situation is how a fixed fee turns into unpaid work.
          </p>
        </div>
      </article>
    </div>
  );
}
