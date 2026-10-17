import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/app/components/PageHeading";
import SectionHeading from "@/app/components/SectionHeading";
import SubHeading from "@/app/components/SubHeading";

// The page both scanners' User-Agents link to (2026-10-17): what each one does,
// how fast it goes, how it treats robots.txt, and how to stop or block it. In the
// site map and sitemap.xml, not in the header nav.
//
// Every value here comes from the private a11y-audit repo and has to change with
// it: the User-Agent strings (scan.py SCANNER_TOKEN, BROWSER_UA, MOBILE_UA;
// notice_check.py UA), the pace (recon.py --delay 1.5 and Crawl-delay; scan.py's
// goto_settled settle of 2.5s and --doc-delay 1.0; notice_check.py PAUSE 4.0 and
// its 40 or 75 request budget), and robots.txt handling (recon.py and
// batch_recon.py ask by SCANNER_NAME, notice_check.py by ROBOTS_NAME; scan.py, the
// contracted evaluation, does not read it). The desk's allowlist kit quotes the
// same strings.
const DESCRIPTION =
  "What the BrianBealsLLC-A11y and BrianBealsLLC-NoticeCheck scanners do, how fast they go, how they treat robots.txt, and how to stop or block them.";

export const metadata: Metadata = {
  title: "About our scanners",
  description: DESCRIPTION,
  alternates: { canonical: "/scanner" },
  openGraph: {
    title: "About our scanners | Brian Beals, LLC",
    description: DESCRIPTION,
    url: "/scanner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About our scanners | Brian Beals, LLC",
    description: DESCRIPTION,
  },
};

const A11Y_DESKTOP =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 BrianBealsLLC-A11y/1.0 (+https://brianbeals.com/scanner)";
const A11Y_PHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1 BrianBealsLLC-A11y/1.0 (+https://brianbeals.com/scanner)";
const NOTICE = "Mozilla/5.0 (compatible; BrianBealsLLC-NoticeCheck/1.0; +https://brianbeals.com/scanner)";

const ROBOTS = `User-agent: BrianBealsLLC-A11y
Disallow: /

User-agent: BrianBealsLLC-NoticeCheck
Disallow: /`;

const body = "text-base sm:text-lg leading-relaxed mb-6 text-neutral-800";
const list = "list-disc pl-6 space-y-3 mb-6 text-base sm:text-lg leading-relaxed text-neutral-800";
const link = "underline underline-offset-4";
const code = "block font-mono text-sm leading-relaxed whitespace-pre-wrap break-all rounded-md p-4 mb-6 border";

function Agent({ label, value }: { label: string; value: string }) {
  return (
    <>
      <p className="font-semibold mb-2" style={{ color: "var(--head)" }}>
        {label}
      </p>
      <code className={code} style={{ borderColor: "var(--rule)" }}>
        {value}
      </code>
    </>
  );
}

export default function Scanner() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        <PageHeading spacing="mb-6">About our scanners</PageHeading>

        <p className={body}>
          Brian Beals, LLC runs two automated readers. Each one names itself in its User-Agent and
          links to this page. Here is what each does, how fast it goes, and how to make it stop.
        </p>

        <SectionHeading>BrianBealsLLC-A11y</SectionHeading>

        <p className={body}>
          The accessibility scanner. It loads a page in an ordinary browser engine and measures it
          against WCAG 2.1 A and AA: contrast, names on links and controls, headings, how the page
          reflows at phone width, and the PDFs the page links. It runs in two ways.
        </p>

        <ul className={list}>
          <li>
            <strong>Recon</strong>: a short look at a handful of public pages, ten at most and
            usually four to six, plus up to six of the PDFs they link. It&apos;s started by hand,
            one site at a time.
          </li>
          <li>
            <strong>Evaluation</strong>: the pages a site owner has agreed to in a signed
            engagement, during a window agreed with their team.
          </li>
        </ul>

        <SubHeading level={3}>How fast</SubHeading>
        <ul className={list}>
          <li>One browser tab, one page at a time.</li>
          <li>
            Recon waits at least one and a half seconds between pages, longer if your robots.txt
            sets a longer Crawl-delay.
          </li>
          <li>
            An evaluation loads no more than one page every three seconds and fetches documents
            one at a time, at least a second apart.
          </li>
          <li>A page that scrolls sideways is loaded a second time at phone width.</li>
        </ul>

        <SubHeading level={3}>robots.txt</SubHeading>
        <p className={body}>
          Recon reads robots.txt before every page and document and skips anything disallowed,
          whether the rule names BrianBealsLLC-A11y or applies to all agents. An evaluation covers
          only the pages agreed in scope with the site owner, so anything to leave out goes into
          that scope.
        </p>

        <SubHeading level={3}>User-Agent</SubHeading>
        <Agent label="Desktop" value={A11Y_DESKTOP} />
        <Agent label="Phone-width check" value={A11Y_PHONE} />

        <SectionHeading>BrianBealsLLC-NoticeCheck</SectionHeading>

        <p className={body}>
          A reader looking for one page: a notice federal rules require an organization to
          publish on its website. For a health care organization that&apos;s the Section 1557
          notice of nondiscrimination. For a public entity it&apos;s the ADA coordinator and
          grievance procedure. It reads the sitemap, tries the few addresses such a notice usually
          lives at, and reads the home page for a link to one. It runs no accessibility tests and
          records no findings about the site.
        </p>

        <SubHeading level={3}>How fast</SubHeading>
        <ul className={list}>
          <li>Started by hand, one site at a time.</li>
          <li>Four seconds between requests.</li>
          <li>At most 40 requests to a site, or 75 for the public-entity check.</li>
        </ul>

        <SubHeading level={3}>robots.txt</SubHeading>
        <p className={body}>
          It reads robots.txt first and skips any address disallowed, whether the rule names
          BrianBealsLLC-NoticeCheck or applies to all agents. Its four-second pause is fixed and
          doesn&apos;t change with Crawl-delay.
        </p>

        <SubHeading level={3}>User-Agent</SubHeading>
        <Agent label="Every request" value={NOTICE} />

        <SectionHeading>What neither one does</SectionHeading>
        <ul className={list}>
          <li>Anything other than read-only GET requests.</li>
          <li>Submit a form.</li>
          <li>Try to log in, or try to get past a CAPTCHA or a challenge.</li>
          <li>Load testing or vulnerability scanning.</li>
          <li>Retry a refused request. A refusal is recorded and the reader moves on.</li>
        </ul>

        <SectionHeading>Stop or block</SectionHeading>
        <p className={body}>
          <strong>Email or call and I&apos;ll stop scanning your site</strong>. Write to{" "}
          <a href="mailto:brian@brianbeals.com" className={link} style={{ color: "var(--link)" }}>
            brian@brianbeals.com
          </a>{" "}
          or call{" "}
          <a href="tel:+19419796282" className={link} style={{ color: "var(--link)" }}>
            (941) 979-6282
          </a>
          .
        </p>
        <p className={body}>
          To block either one yourself, refuse requests whose User-Agent contains BrianBealsLLC
          at your firewall or CDN, or disallow them by name in robots.txt:
        </p>
        <code className={code} style={{ borderColor: "var(--rule)" }}>
          {ROBOTS}
        </code>
        <p className={body}>
          robots.txt stops recon and NoticeCheck. To change what a contracted evaluation covers,
          tell me and the scope changes. A client who wants the evaluation let through instead
          will find what to send their IT team on{" "}
          <Link href="/accessibility/before-we-start" className={link} style={{ color: "var(--link)" }}>
            before we start
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
