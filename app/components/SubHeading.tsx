import { HEADING_SCALE } from "./headingScale";

/**
 * Navy serif heading with no bar, on the shared scale (headingScale.ts).
 * Sentence case (my-profile/voice.md).
 *
 * level 3 (default): under a SectionHeading. level 2: where no bar sits above it,
 * which is essay section heads and the callout titles, so heading levels never skip.
 *
 * tone "page" uses --head, which turns light blue in dark mode. tone "ice" is for
 * the light-blue callout cards, whose background is #D6EAF8 in both schemes, so
 * the ink stays #1E3A5F (8.9:1) rather than following the page.
 *
 * `spacing` replaces the default margins; it never carries a font size. ref and
 * tabIndex are for a heading that takes focus after an action (the readiness form).
 * describedBy is for the error summary's heading, whose description is the list of errors.
 */
export default function SubHeading({
  children,
  id,
  level = 3,
  tone = "page",
  spacing = "mt-8 mb-3",
  ref,
  tabIndex,
  describedBy,
}: {
  children: React.ReactNode;
  id?: string;
  level?: 2 | 3;
  tone?: "page" | "ice";
  spacing?: string;
  ref?: React.Ref<HTMLHeadingElement>;
  tabIndex?: number;
  describedBy?: string;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag
      id={id}
      ref={ref}
      tabIndex={tabIndex}
      aria-describedby={describedBy}
      className={`${HEADING_SCALE.sub} scroll-mt-6 ${spacing}`}
      style={{
        color: tone === "ice" ? "#1E3A5F" : "var(--head)",
        fontFamily: "var(--font-serif)",
      }}
    >
      {children}
    </Tag>
  );
}
