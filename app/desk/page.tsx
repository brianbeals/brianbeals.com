import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PageHeading from "@/app/components/PageHeading";
import { DESK, DeskError, deskProblem, readSource, signedIn } from "@/lib/desk";

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
  let problem = deskProblem() || "";
  if (!problem) {
    try {
      const bytes = await readSource(DESK, "desk.html");
      body = bytes ? new TextDecoder().decode(bytes) : null;
      if (!body) problem = "desk.html is missing from the desk repo.";
    } catch (e) {
      problem = e instanceof DeskError ? e.message : "Could not read the desk from GitHub.";
    }
  }

  return (
    <>
      {/* The desk's header comes from the root layout (HeaderSwitch picks
          DeskHeader on /desk), with the site's own skip link as the first stop. */}
    {/* The public landing pages' container and heading scale (2026-10-16): max-w-5xl
        with running text held near 70ch (.page-wide), PageHeading for the one H1.
        desk.html's h2 and h3 carry the same scale classes (globals.css). */}
    <div className="flex-1 px-4 py-6 sm:px-12 sm:py-10">
      <article className="desk max-w-5xl mx-auto page-wide">
        <PageHeading spacing="mb-6">Desk</PageHeading>
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
    </>
  );
}
