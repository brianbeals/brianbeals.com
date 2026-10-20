import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import SubHeading from "@/app/components/SubHeading";
import { enabled, turnstileSiteKey } from "@/lib/free-test";
import FreeTestForm from "./FreeTestForm";
import { IMAGE } from "./og";
import { refKey } from "./fields";

// The free automated test (docs/free-test/SPEC.md, build step 3). A 404 until
// FREE_TEST_ENABLED is "true" and every key is set (lib/free-test.ts); not in the
// header nav or the sitemap until then.
//
// The copy says Brian reads each report before it goes out. That is true while
// the engine runs with REVIEW_MODE=true; change this page in the same commit that
// turns review off.

const TITLE = "Free accessibility check | Brian Beals, LLC";
const DESCRIPTION =
  "By the next business day: which of your pages and PDFs fail, and the WCAG rule each one fails. A free automated check of up to 10 pages and 10 linked PDFs against WCAG 2.1 AA, reviewed by a person before it's sent.";


export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/free-test" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/free-test",
    siteName: "Brian Beals",
    type: "website",
    images: [IMAGE],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [IMAGE] },
};

export const dynamic = "force-dynamic";

const link = "underline underline-offset-4 hover:no-underline";
const p = "text-base sm:text-lg leading-relaxed mb-4 text-neutral-800";

export default async function FreeTest({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!enabled()) notFound();
  const q = (await searchParams).ref;
  const ref = refKey(typeof q === "string" ? q : "");
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        <PageHeading>Free accessibility check</PageHeading>
        <div className="mb-10 sm:grid sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-10 sm:items-start">
          <div>
            <p className="text-lg sm:text-xl leading-relaxed mb-4 font-semibold text-neutral-800">
              By the next business day: which of your pages and PDFs fail, and the WCAG rule each one fails.
            </p>
            {/* Refresh each spring with WebAIM's new Million report (SPEC.md, "The WebAIM line"). */}
            <p className={p}>
              95.9% of the web&apos;s top million home pages fail automated accessibility checks (
              <a href="https://webaim.org/projects/million/" className={link} style={{ color: "var(--link)" }}>
                WebAIM, 2026
              </a>
              ).
            </p>
            <p className={p}>
              An automated first look at your website and the PDFs it links to, against WCAG 2.1 Level A
              and AA, sent to you by email.
            </p>
          </div>
          {/* One link: the text is its name, the thumbnail (public/thumbs/free-test-sample.png,
              written by scripts/build_free_test_sample.py) is decoration. */}
          <Link
            href="/free-test/sample"
            className={`${link} group block w-3/5 mt-2 sm:w-auto sm:mt-1 text-base sm:text-lg`}
            style={{ color: "var(--link)" }}
          >
            <Image
              src="/thumbs/free-test-sample.png"
              alt=""
              width={220}
              height={254}
              className="block w-full h-auto mb-2 rounded-sm border bg-white shadow-md group-hover:shadow-lg"
              style={{ borderColor: "var(--rule)" }}
            />
            See a sample report
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_18rem] gap-10 md:gap-12">
          <FreeTestForm siteKey={turnstileSiteKey()} source={ref} />

          <aside aria-labelledby="ft-how" className="text-base">
            <SubHeading level={2} id="ft-how" spacing="mt-0 mb-3">
              How it works
            </SubHeading>
            <ol className="list-decimal pl-5 space-y-3 leading-relaxed text-neutral-800">
              <li>You get an email with a link. The check starts only after you open it and confirm, within 24 hours.</li>
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
              domain, nothing runs and I look at the site myself. One fresh check per site every 30 days;
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
