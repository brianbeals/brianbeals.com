import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import { approveOk, enabled } from "@/lib/free-test";
import { approveFreeTest } from "../actions";

// Brian's approve link from a review draft: /free-test/approve?id=<job>&sig=<hex>.
// A bad or missing signature is a 404. Opening the link changes nothing; the
// button's POST sends the signed "approved" event (actions.ts), and the engine
// sends the report on its next run, about two minutes later.

export const metadata: Metadata = {
  title: { absolute: "Approve a free test report | Brian Beals, LLC" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const p = "text-base sm:text-lg leading-relaxed mb-6 text-neutral-800";

export default async function Approve({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const q = await searchParams;
  const one = (k: string) => (typeof q[k] === "string" ? (q[k] as string) : "");
  const id = one("id");
  const sig = one("sig");
  if (!enabled() || !approveOk(id, sig)) notFound();

  if (one("done") === "1") {
    return (
      <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
        <article className="max-w-2xl mx-auto">
          <PageHeading>Approved</PageHeading>
          <p className={p}>
            The report goes to the requester on the engine&apos;s next run, within about two minutes. A
            second approval of the same report is ignored.
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
        <PageHeading>Approve This Report</PageHeading>
        {one("problem") === "send" ? (
          <div className="doc-note stop bg-white mb-6">
            <p>
              <strong>Not approved yet</strong>. The approval could not be sent. Try again in a minute.
            </p>
          </div>
        ) : null}
        <p className={p}>
          Sends the report in the review draft, as it stands, to the person who asked for it. Job{" "}
          <code className="text-base">{id}</code>.
        </p>
        <form action={approveFreeTest}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="sig" value={sig} />
          <button
            type="submit"
            className="rounded px-5 py-2.5 font-semibold text-white"
            style={{ backgroundColor: "var(--btn-bg)" }}
          >
            Approve and send
          </button>
        </form>
      </article>
    </div>
  );
}
