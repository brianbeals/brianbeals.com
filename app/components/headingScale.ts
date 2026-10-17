/**
 * The one heading scale for the site (2026-10-16). Every heading component reads
 * its size from here, and no page sets a heading's font size itself. The sizes
 * live in globals.css as .h-page, .h-section and .h-sub, so /desk's HTML, which
 * cannot use these components, carries the same classes.
 *
 *   page     H1, PageHeading          36px, 48px from 640px
 *   section  H2, SectionHeading bar   20px, 24px from 640px
 *   sub      SubHeading               18px, 20px from 640px. An H3 under a
 *            SectionHeading, or an H2 where there is no bar above it: essay
 *            section heads and the light-blue callout titles.
 */
export const HEADING_SCALE = {
  page: "h-page",
  section: "h-section",
  sub: "h-sub",
} as const;
