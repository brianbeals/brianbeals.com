/**
 * The one heading scale for the public site (2026-10-16). Every heading component
 * reads its size from here, and no page sets a heading's font size itself.
 *
 *   page     H1, PageHeading          36px, 48px from 640px
 *   section  H2, SectionHeading bar   20px, 24px from 640px
 *   sub      SubHeading               18px, 20px from 640px. An H3 under a
 *            SectionHeading, or an H2 where there is no bar above it: essay
 *            section heads and the light-blue callout titles.
 */
export const HEADING_SCALE = {
  page: "text-4xl sm:text-5xl font-semibold tracking-tight",
  section: "text-xl sm:text-2xl font-semibold tracking-tight",
  sub: "text-lg sm:text-xl font-semibold tracking-tight",
} as const;
