import HeaderMenu from "./HeaderMenu";

/**
 * The header on /desk (2026-10-16): the public header's bar (SiteHeader.tsx) with
 * the desk's own navigation. Same markup classes, so the same CSS applies: navy bar,
 * --accent-stripe border, white focus ring, one 68px row, pinned on wide windows
 * and on phones held upright, scrolled away in landscape and at 400% zoom, and the
 * links under a Menu button below 1024px (the same HeaderMenu component).
 *
 * One name per section, shared with the bar injected into the desk's documents and
 * dashboards (lib/desk-bar.ts). The section headings keep their longer names
 * ("Which rule, which date", "IDs for buyers"); the bar uses the short ones.
 * In-page links are plain anchors; html scroll-padding-top keeps each heading
 * clear of the pinned bar.
 */
export const DESK_LINKS = [
  { href: "/desk#pricing", label: "Pricing" },
  { href: "/desk#before", label: "Before we start" },
  { href: "/desk#recon", label: "Recon" },
  { href: "/desk#rules", label: "Rules & dates" },
  { href: "/desk#overlays", label: "Overlays" },
  { href: "/desk#pitch", label: "Pitch" },
  { href: "/desk#ids", label: "IDs" },
  { href: "/desk/state", label: "State" },
  { href: "/desk/fed", label: "Fed" },
];

export default function DeskHeader() {
  return (
    <header className="site-header desk-header px-4 sm:px-12">
      <div className="site-header-row max-w-5xl mx-auto">
        <a href="/desk#main" className="site-brand hover:underline underline-offset-4">
          {/* Decorative: the words beside it are the link's text. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='white'/%3E%3Ctext x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='%231E3A5F' font-family='system-ui' font-size='16' font-weight='800'%3EBB%3C/text%3E%3C/svg%3E"
            alt=""
            aria-hidden="true"
            width={36}
            height={36}
          />
          <span>
            Brian Beals, LLC<span aria-hidden="true"> ·</span> Desk
          </span>
        </a>
        <HeaderMenu links={DESK_LINKS} label="Desk" listId="desk-nav-list" plain />
        {/* Sign out clears the gate cookie (/logout). A plain link, outlined like the
            Menu button; the green call button belongs to the public header. */}
        <a href="/logout" className="site-cta site-cta-quiet rounded font-semibold hover:underline underline-offset-4">
          Sign out
        </a>
      </div>
    </header>
  );
}
