import Link from "next/link";
import BookCallLink from "./BookCallLink";
import HeaderMenu from "./HeaderMenu";

/**
 * The site header (2026-10-16): a navy bar with the BB mark and firm name linking
 * home, the main nav, and one call to action in --cta-bg green, over a 4px
 * --accent-stripe border. The bar is #1E3A5F with white ink in both color schemes,
 * like the band on the /accessibility pages, so it needs no dark-mode variant.
 *
 * From 1024px: one 64px row (68px with the stripe), brand, nav, call button, pinned
 * when the window is also 600px high (globals.css, .site-header), with
 * scroll-padding-top keeping focus and anchor targets clear of it (2.4.11).
 *
 * Below 1024px: one row of brand, Menu button and call button, with the nav list
 * collapsed under the Menu button (HeaderMenu.tsx) and dropping below the row when
 * open. Pinned when the window is at least 500px high (a phone held upright); a
 * landscape phone, 320px by 256px or 400% zoom scroll it away with the page
 * (1.4.10). Pinned with the menu open, the list scrolls within the height left
 * under the bar. The call button reads "Book a
 * call" where the full label does not fit beside the brand and the Menu button.
 * Tap targets in the row and the list are at least 44px.
 *
 * Under the firm name, inside the home link, a descriptor line (2026-10-24):
 * "Independent Accessibility Evaluation" in the capability statements' light-blue
 * tag color, #D6EAF8 on the navy at 9.3:1. From 520px it sits under the name within
 * the 64px row, so the bar keeps its height. Below 520px it cannot share the row
 * with Menu and the call button, so it takes its own line under the row (the bar
 * grows from 68px to 78px) and the link keeps it in its accessible name.
 *
 * The skip link stays the first focusable element: it is rendered before this
 * header in app/layout.tsx and sits above it (z-index) when focused.
 */
export default function SiteHeader() {
  return (
    <header className="site-header px-4 sm:px-12">
      <div className="site-header-row max-w-5xl mx-auto">
        {/* The label adds only the comma a screen reader needs between the two lines;
            the words are the visible ones, so the name still matches the label (2.5.3). */}
        <Link
          href="/"
          className="site-brand hover:underline underline-offset-4"
          aria-label="Brian Beals, LLC, Independent Accessibility Evaluation"
        >
          {/* Decorative: the firm name beside it is the link's text. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='white'/%3E%3Ctext x='16' y='15' text-anchor='middle' dominant-baseline='central' fill='%231E3A5F' font-family='system-ui' font-size='16' font-weight='800'%3EBB%3C/text%3E%3C/svg%3E"
            alt=""
            aria-hidden="true"
            width={36}
            height={36}
          />
          <span className="site-brand-text">
            <span>Brian Beals, LLC</span>
            {/* Visible beside the mark from 520px; below that, visually hidden here
                (still in the link's name) and shown on its own line under the row. */}
            <span className="site-brand-tag">Independent Accessibility Evaluation</span>
          </span>
        </Link>
        <HeaderMenu />
        <BookCallLink placement="header" className="site-cta btn-cta rounded font-semibold hover:underline underline-offset-4">
          <span className="cta-long">Book a 15-minute call</span>
          {/* Only one of the two shows at a time (display: none on the other), so
              the accessible name is always the visible label (2.5.3). */}
          <span className="cta-short">Book a call</span>
        </BookCallLink>
        {/* Phones: the descriptor's visible copy, on its own line under the row. The
            home link above already carries it in its name, so this copy is hidden from
            assistive technology rather than read twice. */}
        <p className="site-tag-row" aria-hidden="true">Independent Accessibility Evaluation</p>
      </div>
    </header>
  );
}
