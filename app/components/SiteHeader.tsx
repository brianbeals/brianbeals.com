import Link from "next/link";
import { navLinks } from "./nav-links";

/**
 * The site header (2026-10-16): a navy bar with the BB mark and firm name linking
 * home, the main nav, and one call to action, over a 4px --accent-stripe border.
 * The bar is #1E3A5F with white ink in both color schemes, like the band on the
 * /accessibility pages, so it needs no dark-mode variant.
 *
 * Sticky only where it fits on one row in a tall enough window: 1024px wide and
 * 600px high (globals.css, .site-header). Narrower, the nav wraps to a second row,
 * and a pinned two-row bar would take a quarter of a small screen; at 320px or 400%
 * zoom it scrolls away with the page (1.4.10). When it is pinned, scroll-padding-top
 * keeps focus and anchor targets clear of it (2.4.11).
 *
 * The skip link stays the first focusable element: it is rendered before this
 * header in app/layout.tsx and sits above it (z-index) when focused.
 */
export default function SiteHeader() {
  return (
    <header className="site-header px-6 sm:px-12">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-3 py-3 lg:py-0 lg:h-[60px]">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight hover:underline underline-offset-4">
          {/* Decorative: the firm name beside it is the link's text. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='white'/%3E%3Ctext x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='%231E3A5F' font-family='system-ui' font-size='16' font-weight='800'%3EBB%3C/text%3E%3C/svg%3E"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
          />
          <span>Brian Beals, LLC</span>
        </Link>
        {/* 1.4.10 Reflow. The links wrap, and the gap tightens on narrow viewports. */}
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:gap-x-5 lg:ml-auto">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline underline-offset-4">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded px-3 py-1.5 text-sm font-semibold hover:underline underline-offset-4"
          style={{ backgroundColor: "#FFFFFF", color: "#1E3A5F" }}
        >
          Book a 15-minute call
        </Link>
      </div>
    </header>
  );
}
