import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import { enabled } from "@/lib/free-test";

// Where "Start the check" lands. The site can't know whether the token was still
// good (it keeps nothing), so the page covers both cases.

export const metadata: Metadata = {
  title: { absolute: "Free check confirmed | Brian Beals, LLC" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const p = "text-base sm:text-lg leading-relaxed mb-4 text-neutral-800";

export default function Confirmed() {
  if (!enabled()) notFound();
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
        <PageHeading>Confirmed</PageHeading>
        <p className={p}>
          The check starts within a few minutes. I read each report before it goes out, so it usually
          arrives within one business day, from freetest@forms.brianbeals.com.
        </p>
        <p className={p}>
          If the link was more than 24 hours old or had already been used, nothing runs. Request the check
          again, or email brian@brianbeals.com.
        </p>
      </article>
    </div>
  );
}
