import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import SubHeading from "@/app/components/SubHeading";
import { enabled, turnstileSiteKey } from "@/lib/free-test";
import FreeTestForm from "./FreeTestForm";

// The free automated test (docs/free-test/SPEC.md, build step 3). A 404 until
// FREE_TEST_ENABLED is "true" and every key is set (lib/free-test.ts); not in the
// header nav or the sitemap until then.
//
// The copy says Brian reads each report before it goes out. That is true while
// the engine runs with REVIEW_MODE=true; change this page in the same commit that
// turns review off.

const DESCRIPTION =
  "A free automated accessibility test of up to 10 pages and 10 linked PDFs, against WCAG 2.1 Level A and AA, for anyone with an email address on the site's own domain.";

export const metadata: Metadata = {
  title: { absolute: "Free accessibility test | Brian Beals, LLC" },
  description: DESCRIPTION,
  alternates: { canonical: "/free-test" },
  openGraph: {
    title: "Free accessibility test | Brian Beals, LLC",
    description: DESCRIPTION,
    url: "/free-test",
    type: "website",
  },
  twitter: { title: "Free accessibility test | Brian Beals, LLC", description: DESCRIPTION },
};

export const dynamic = "force-dynamic";

const link = "underline underline-offset-4 hover:no-underline";
const p = "text-base sm:text-lg leading-relaxed mb-4 text-neutral-800";

export default function FreeTest() {
  if (!enabled()) notFound();
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        <PageHeading>Free accessibility test</PageHeading>
        <p className={`${p} mb-10`}>
          An automated first look at your website and the PDFs it links to, against WCAG 2.1 Level A
          and AA, sent to you by email.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_18rem] gap-10 md:gap-12">
          <FreeTestForm siteKey={turnstileSiteKey()} />

          <aside aria-labelledby="ft-how" className="text-base">
            <SubHeading level={2} id="ft-how" spacing="mt-0 mb-3">
              How it works
            </SubHeading>
            <ol className="list-decimal pl-5 space-y-3 leading-relaxed text-neutral-800">
              <li>You get an email with a link. The test starts only after you open it and confirm, within 24 hours.</li>
              <li>
                My scanner checks up to 10 pages and 10 linked PDFs, one at a time and at a slow pace, and
                asks robots.txt first.{" "}
                <Link href="/scanner" className={link} style={{ color: "var(--link)" }}>
                  About the scanner
                </Link>
                .
              </li>
              <li>I read each report before it goes out, so it usually arrives within one business day.</li>
            </ol>
            <p className="mt-6 leading-relaxed text-neutral-800">
              The address has to be on the site&apos;s own domain. For a free email address or another
              domain, nothing runs and I look at the site myself. One fresh test per site every 30 days;
              a second request gets the same report.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              Automated checks cover only part of WCAG 2.1 AA. The report names what fails and the
              criterion it fails, and makes no conformance determination. My free recon and the full
              Accessibility Conformance Report cover the rest.
            </p>
          </aside>
        </div>
      </article>
    </div>
  );
}
