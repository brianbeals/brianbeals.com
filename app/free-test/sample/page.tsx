import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import { enabled } from "@/lib/free-test";
import ReportFrame from "./ReportFrame";
import { REPORT } from "./report";
import { IMAGE } from "../og";

// A sample free-check report, linked from /free-test. The report is the
// a11y-audit template's own output for a fictional city (report.ts, written by
// scripts/build_free_test_sample.py); rebuild it when the template changes. A 404
// while the free test is off, like the rest of /free-test.

const TITLE = "Sample free check report | Brian Beals, LLC";
const DESCRIPTION =
  "What the free accessibility check sends: a sample report for a fictional city, with made-up numbers.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/free-test/sample" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/free-test/sample",
    siteName: "Brian Beals",
    type: "website",
    images: [IMAGE],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [IMAGE] },
};

export const dynamic = "force-dynamic";

const link = "underline underline-offset-4 hover:no-underline";
const p = "text-base sm:text-lg leading-relaxed mb-4 text-neutral-800";

export default function FreeTestSample() {
  if (!enabled()) notFound();
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-3xl mx-auto">
        <PageHeading>Sample report</PageHeading>
        <p className={p}>
          This is a sample. The City of Example, FL and example.org are fictional, and every number in it
          is made up. A real report comes by email in this form, by the next business day.
        </p>
        <p className={`${p} mb-8`}>
          <Link href="/free-test" className={link} style={{ color: "var(--link)" }}>
            Request a free check of your site
          </Link>
        </p>
        <ReportFrame html={REPORT} title="Sample free check report for example.org, a fictional city" />
      </article>
    </div>
  );
}
