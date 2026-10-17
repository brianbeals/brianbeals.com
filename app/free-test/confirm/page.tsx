import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import { enabled, tokenShape } from "@/lib/free-test";
import { confirmFreeTest } from "../actions";

// The link in the confirmation email lands here. Opening it changes nothing: the
// button's POST sends the signed "confirmed" event (actions.ts), so a mail
// scanner that opens every link can't start a test. Whether the token is still
// good is the engine's to decide; an unknown, used or expired one is ignored
// there, and /free-test/confirmed says so.

export const metadata: Metadata = {
  title: { absolute: "Confirm your free test | Brian Beals, LLC" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const p = "text-base sm:text-lg leading-relaxed mb-6 text-neutral-800";

export default async function Confirm({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!enabled()) notFound();
  const q = await searchParams;
  const token = typeof q.token === "string" ? q.token : "";
  const problem = typeof q.problem === "string" ? q.problem : "";

  if (!tokenShape(token)) {
    return (
      <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
        <article className="max-w-2xl mx-auto">
          <PageHeading>This link is incomplete</PageHeading>
          <p className={p}>
            Copy the whole link from the confirmation email into your browser, or{" "}
            <Link href="/free-test" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
              request the test again
            </Link>
            .
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
        <PageHeading>Confirm your free test</PageHeading>
        {problem === "send" ? (
          <div className="doc-note stop bg-white mb-6">
            <p>
              <strong>Not confirmed yet</strong>. The confirmation could not be sent. Try the button again
              in a minute, or email brian@brianbeals.com.
            </p>
          </div>
        ) : null}
        <p className={p}>
          The test checks up to 10 pages and 10 linked PDFs, at a slow pace, and the report comes to the
          address you gave.
        </p>
        <form action={confirmFreeTest}>
          <input type="hidden" name="token" value={token} />
          <button
            type="submit"
            className="rounded px-5 py-2.5 font-semibold text-white"
            style={{ backgroundColor: "var(--btn-bg)" }}
          >
            Start the test
          </button>
        </form>
      </article>
    </div>
  );
}
