import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoVideo from "@/app/components/DemoVideo";
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

const TITLE = "Free Accessibility Check | Brian Beals, LLC";
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
        <PageHeading>Free Accessibility Check</PageHeading>
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
        <p className={`${p} mb-10`}>
          An automated first look at your website and the PDFs it links to, against WCAG 2.1 Level A
          and AA, sent to you by email.
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_18rem] md:grid-rows-[auto_1fr] md:gap-x-12 md:gap-y-8">
          {/* One link: the text is its name, the thumbnail (public/thumbs/free-test-sample.png,
              written by scripts/build_free_test_sample.py) is decoration. From 768px it tops the
              right column, above How it works; narrower, it sits under the intro, ahead of the form. */}
          <Link
            href="/free-test/sample"
            className={`${link} group block w-3/5 sm:w-[220px] md:col-start-2 md:row-start-1 text-base sm:text-lg`}
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
          <div id="check" className="md:col-start-1 md:row-start-1 md:row-span-2">
            {/* The form also carries the "Can't get past the check?" line, the ACR's 1.1.1
                alternative to Turnstile, which owner mode leaves out. */}
            <FreeTestForm siteKey={turnstileSiteKey()} source={ref} />
          </div>

          <aside aria-labelledby="ft-how" className="text-base md:col-start-2 md:row-start-2">
            <SubHeading level={2} id="ft-how" spacing="mt-0 mb-3">
              How It Works
            </SubHeading>
            <ol className="list-decimal pl-5 space-y-3 leading-relaxed text-neutral-800">
              <li>
                To make sure the report goes to someone at the organization, you get a confirmation link by
                email. The check starts once you click it, any time in the next three business days.
              </li>
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

        {/* The screen reader demo, below the form (2026-10-22): app/components/DemoVideo.tsx.
            The form's grid already fills both columns, so the video gets its own band, the
            heading and links beside the player from 768px and above it on phones. The
            essays and the home page link here as /free-test#demo. */}
        <section
          id="demo"
          aria-labelledby="demo-heading"
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 md:items-start"
        >
          <div>
            <SubHeading level={2} id="demo-heading" spacing="mt-0 mb-3">
              Not Sure What We Look For? Watch First.
            </SubHeading>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-800">
              A screen reader reads a broken PDF, then its accessible twin. Best with sound; captions on.
            </p>
            <p className="mt-4 text-base sm:text-lg">
              <a href="#check" className={link} style={{ color: "var(--link)" }}>
                Back to the free check
              </a>
            </p>
          </div>
          <DemoVideo labelledBy="demo-heading" />
        </section>
      </article>
    </div>
  );
}
