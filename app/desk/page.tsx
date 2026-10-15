import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DESK, deskConfigured, readSource, signedIn } from "@/lib/desk";

// The private desk: a quick reference for research and live phone calls. Behind
// the site gate (middleware.ts, then signedIn() here), noindex, in neither
// sitemap, linked from no public page.
//
// The content is NOT in this repo, which is public. It is desk.html in the
// private brianbeals/desk repo, read at request time (lib/desk.ts). That repo's
// README maps each section to its source file in iCloud.
export const metadata: Metadata = {
  title: { absolute: "Desk | Brian Beals, LLC" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function Desk() {
  if (!(await signedIn())) redirect("/login?next=/desk");

  let body: string | null = null;
  let problem = "";
  if (!deskConfigured()) problem = "The desk is not connected yet: DESK_GH_TOKEN is not set in Vercel.";
  else {
    try {
      const bytes = await readSource(DESK, "desk.html");
      body = bytes ? new TextDecoder().decode(bytes) : null;
      if (!body) problem = "desk.html is missing from the desk repo.";
    } catch (e) {
      problem = `Could not read the desk from GitHub (${(e as Error).message}).`;
    }
  }

  return (
    <div className="flex-1 px-4 py-6 sm:px-12 sm:py-10">
      <article className="desk max-w-2xl mx-auto">
        <h1
          className="text-3xl font-semibold tracking-tight mb-4"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Desk
        </h1>
        {body ? (
          // Trusted: written by Brian in a private repo only this token can read.
          <div dangerouslySetInnerHTML={{ __html: body }} />
        ) : (
          <p role="alert" className="text-base text-neutral-800">
            {problem}
          </p>
        )}
      </article>
    </div>
  );
}
