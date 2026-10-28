import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import { sessionRole } from "@/lib/desk";
import { sendFeedback } from "./actions";
import { MAX_COMMENT, feedbackPath } from "./email";

// "Send feedback" (2026-10-27): the link a read-only viewer sees in the desk bar
// and on /desk lands here with ?from=<page>. One comment box and an optional name,
// posted to a server action (actions.ts) that emails Brian. A plain form with no
// client script, so it works before or without JavaScript; the result comes back
// as ?sent=1 or ?problem=..., shown as a status line that takes focus.
export const metadata: Metadata = {
  title: { absolute: "Send Feedback | Brian Beals, LLC" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const PROBLEMS: Record<string, string> = {
  empty: "The comment was empty. Write a note, then send it.",
  long: `Keep the comment under ${MAX_COMMENT.toLocaleString("en-US")} characters.`,
  limit: "That's a lot of notes in one hour. Try again later, or email brian@brianbeals.com.",
  send: "The note could not be sent. Try again in a minute, or email brian@brianbeals.com.",
};

const link = "underline underline-offset-4 hover:no-underline";
const inputCls = "w-full rounded border px-3 py-2 text-base bg-white text-neutral-900";

export default async function Feedback({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";
  const from = feedbackPath(one(q.from));
  if (!(await sessionRole())) redirect(`/login?next=${encodeURIComponent(`/desk/feedback?from=${from}`)}`);
  const sent = one(q.sent) === "1";
  const problem = PROBLEMS[one(q.problem)] || "";

  return (
    <div className="flex-1 px-4 py-6 sm:px-12 sm:py-10">
      <article className="max-w-5xl mx-auto page-wide text-base leading-relaxed text-neutral-800">
        <PageHeading spacing="mb-6">Send Feedback</PageHeading>
        {sent ? (
          <p role="status" tabIndex={-1} autoFocus className="mb-6">
            Thanks. Your note about <code>{from}</code> went to Brian.{" "}
            <a href={from} className={link} style={{ color: "var(--link)" }}>
              Back to the page
            </a>
            .
          </p>
        ) : (
          <form action={sendFeedback} className="space-y-5 max-w-2xl">
            {problem && (
              <p role="alert" tabIndex={-1} autoFocus style={{ color: "var(--err)" }}>
                {problem}
              </p>
            )}
            <p>
              A note to Brian about{" "}
              <a href={from} className={link} style={{ color: "var(--link)" }}>
                <code>{from}</code>
              </a>
              : what&apos;s unclear, wrong, or missing. It goes to him by email with the page&apos;s address.
            </p>
            <input type="hidden" name="from" value={from} />
            <div>
              <label htmlFor="fb-comment" className="block font-semibold mb-1">
                Comment
              </label>
              <textarea
                id="fb-comment"
                name="comment"
                rows={6}
                required
                maxLength={MAX_COMMENT}
                className={inputCls}
                style={{ borderColor: "var(--field-border)" }}
              />
            </div>
            <div>
              <label htmlFor="fb-name" className="block font-semibold mb-1">
                Your name (optional)
              </label>
              <input
                id="fb-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={200}
                className={inputCls}
                style={{ borderColor: "var(--field-border)" }}
              />
            </div>
            <button
              type="submit"
              className="rounded px-5 py-2.5 font-semibold text-white"
              style={{ backgroundColor: "var(--btn-bg)" }}
            >
              Send to Brian
            </button>
          </form>
        )}
      </article>
    </div>
  );
}
