import type { ReactNode } from "react";
import Link from "next/link";

/**
 * EssayByline — the navy BB mark plus the author byline that closes every essay.
 * Shared so the brand mark lives in one place; existing and future essays inherit it.
 * The mark is hidden from assistive technology, as it is everywhere else on the
 * site: the byline beside it already names Brian Beals, and a labelled mark made
 * VoiceOver say the name twice. Labelled from 2026-05-31 to 2026-10-08.
 *
 * Attribution is controlled two ways:
 *  - `variant` picks a stock byline. Default is "personal" (neutral, no employer).
 *    Pass variant="practice" on an accessibility-track essay: the byline names
 *    Brian Beals, LLC and a footer line carries the practice's copyright and
 *    address in place of the personal one. First used 2026-10-12.
 *  - `children` overrides the text entirely, for one-off bylines (e.g. an essay
 *    that points readers at a specific repo or artifact).
 */
type Variant = "personal" | "practice";

const BYLINES: Record<Variant, ReactNode> = {
  personal: (
    <>
      Brian Beals writes about AI, voice, and professional work at
      brianbeals.com. Reach him at brian@brianbeals.com.
    </>
  ),
  practice: (
    <>
      Brian Beals, LLC is an independent digital accessibility evaluation
      practice for public entities. Reach Brian at brian@brianbeals.com.
    </>
  ),
};

export default function EssayByline({
  variant = "personal",
  children,
}: {
  variant?: Variant;
  children?: ReactNode;
}) {
  const byline = (
    <div className="mt-12 pt-6 border-t border-neutral-200 flex items-center gap-3">
      {/* An image, like the header's mark, so the white "BB" is not page text: axe cannot
          read a background off an SVG rect and returned it as "needs review". */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%231E3A5F'/%3E%3Ctext x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='white' font-family='-apple-system, system-ui, sans-serif' font-size='16' font-weight='800' letter-spacing='-0.04em'%3EBB%3C/text%3E%3C/svg%3E"
        alt=""
        width={22}
        height={22}
        className="flex-none"
      />
      <p className="text-sm text-neutral-600 italic">
        {children ?? BYLINES[variant]}
      </p>
    </div>
  );
  if (variant !== "practice") return byline;
  return (
    <>
      {byline}
      <p className="mt-3 text-xs text-neutral-600">
        © Brian Beals, LLC ·{" "}
        <Link href="/accessibility" className="underline underline-offset-4 hover:no-underline">
          brianbeals.com/accessibility
        </Link>
      </p>
    </>
  );
}
