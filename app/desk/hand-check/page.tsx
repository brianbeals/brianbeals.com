import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import { sessionRole } from "@/lib/desk";

// The hand check's start page (2026-10-25). A free-test job on a site that blocks
// the scanner sends Brian a [free-test ALERT] whose "Start hand check" link comes
// here: /desk/hand-check?d=<domain>&e=<name>&b=<403|robots>&p=<page>... It lists the pages
// and offers "Start on this Mac", a plain link to the collector agent on the Mac
// Brian is using (a11y-audit scripts/hand_check.py --serve, http://127.0.0.1:8790),
// which shows its own Start button. A link and a button, both clicked by a person:
// nothing starts on its own, and nothing here talks to the Mac. Behind the site gate
// like the rest of /desk, and the session checked again here. Owner only: a read-only
// viewer gets the middleware's 403 page, and this page's own note if that is ever skipped.
// docs=<1-50> (2026-10-30) makes it documents only: at most that many PDFs from the listed
// pages, permit and application forms first, and a report on the PDFs alone
// (hand_check.py --documents).
export const metadata: Metadata = {
  title: { absolute: "Hand Check | Brian Beals, LLC" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const COLLECTOR = "http://127.0.0.1:8790";
const MAX_PAGES = 15;
const MAX_DOCS = 50;
const link = "underline underline-offset-4 hover:no-underline";

/* Only http(s) pages on the site itself, at most 15. */
function pagesFor(domain: string, raw: string[]): string[] {
  const out: string[] = [];
  for (const p of raw) {
    try {
      const u = new URL(p);
      const h = u.hostname.toLowerCase();
      if (/^https?:$/.test(u.protocol) && (h === domain || h.endsWith(`.${domain}`)) && !out.includes(u.href))
        out.push(u.href);
    } catch {
      /* not a URL: dropped */
    }
  }
  return out.slice(0, MAX_PAGES);
}

export default async function HandCheck({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const q = await searchParams;
  const role = await sessionRole();
  if (!role) {
    const back = new URLSearchParams();
    for (const [k, v] of Object.entries(q)) for (const x of [v].flat()) if (x) back.append(k, x);
    redirect(`/login?next=${encodeURIComponent(`/desk/hand-check?${back}`)}`);
  }
  if (role !== "owner")
    return (
      <div className="flex-1 px-4 py-6 sm:px-12 sm:py-10">
        <article className="max-w-5xl mx-auto page-wide text-base leading-relaxed text-neutral-800">
          <PageHeading spacing="mb-6">Read-Only Access</PageHeading>
          <p className="mb-4">
            You&apos;re signed in with read-only access, and the hand check starts work on Brian&apos;s Mac, so it&apos;s
            for his own login.{" "}
            <a href="/desk" className={link} style={{ color: "var(--link)" }}>
              Back to the desk
            </a>
            .
          </p>
        </article>
      </div>
    );
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";
  const domain = one(q.d).toLowerCase().replace(/^www\./, "");
  const valid = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain);
  const entity = one(q.e).slice(0, 120) || domain;
  // How the free test was blocked (401, 403, 429 or robots), passed on so the report can say so.
  const blocked = /^(401|403|429|robots)$/.test(one(q.b)) ? one(q.b) : "";
  const pages = valid ? pagesFor(domain, [q.p].flat().filter((x): x is string => Boolean(x))) : [];
  const n = /^\d{1,2}$/.test(one(q.docs)) ? Number(one(q.docs)) : 0;
  const docs = n >= 1 && n <= MAX_DOCS ? n : 0;
  const start = new URLSearchParams({
    domain,
    entity,
    ...(blocked ? { blocked } : {}),
    ...(docs ? { docs: String(docs) } : {}),
  });
  for (const p of pages) start.append("page", p);

  return (
    <div className="flex-1 px-4 py-6 sm:px-12 sm:py-10">
      <article className="max-w-5xl mx-auto page-wide text-base leading-relaxed text-neutral-800">
        <PageHeading spacing="mb-6">{valid ? `Hand Check: ${domain}` : "Hand Check"}</PageHeading>
        {!valid || !pages.length ? (
          <p role="alert">This link has no site or no pages on it. Use the link in the free-test alert.</p>
        ) : (
          <>
            {docs ? (
              <p className="mb-4">
                <strong>Documents only.</strong> {domain} keeps automated scanners away from its documents
                {blocked ? ` (${blocked === "robots" ? "robots.txt" : `HTTP ${blocked}`})` : ""}, so up to {docs} PDFs
                linked from these pages are checked by hand, permit and application forms first: you open each page
                and click the <strong>Hand check</strong> bookmark, and your browser fetches its PDFs. When the last
                one is in, a report on the PDFs alone is built and emailed to you.
              </p>
            ) : (
              <p className="mb-4">
                {domain} blocks automated scanners
                {blocked ? ` (${blocked === "robots" ? "robots.txt" : `HTTP ${blocked}`})` : ""}, so these pages get
                the free test&apos;s checks by hand: you open each one and click the <strong>Hand check</strong>{" "}
                bookmark. When the last one is in, the report is built and emailed to you.
              </p>
            )}
            <ol className="list-decimal pl-6 mb-6 space-y-1">
              {pages.map((p) => (
                <li key={p}>
                  <a href={p} className={link} style={{ color: "var(--link)" }}>
                    {p}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mb-6">
              <a
                href={`${COLLECTOR}/start?${start}`}
                className="inline-block rounded px-5 py-2.5 font-semibold text-white no-underline"
                style={{ backgroundColor: "var(--btn-bg)" }}
              >
                Start on this Mac
              </a>
            </p>
            <p className="mb-2 text-sm" style={{ color: "var(--muted-ink)" }}>
              This opens the collector on the Mac you&apos;re using, which asks you to confirm. It needs the
              collector agent installed there once: <code>python3 scripts/hand_check.py --install-agent</code> in{" "}
              <code>~/Code/a11y-audit</code>. The bookmark is at{" "}
              <a href={`${COLLECTOR}/install`} className={link} style={{ color: "var(--link)" }}>
                {COLLECTOR}/install
              </a>
              .
            </p>
          </>
        )}
      </article>
    </div>
  );
}
