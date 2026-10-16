import { HEADING_SCALE } from "./headingScale";

/**
 * The page H1, one per page, on the shared scale (headingScale.ts). Title case.
 * tone "band" is the white H1 inside the navy band on the /accessibility pages;
 * the band is #1E3A5F in both color schemes, so its ink is fixed too.
 *
 * `spacing` replaces the default margin; it never carries a font size.
 */
export default function PageHeading({
  children,
  tone = "page",
  spacing = "mb-8",
}: {
  children: React.ReactNode;
  tone?: "page" | "band";
  spacing?: string;
}) {
  return (
    <h1
      className={`${HEADING_SCALE.page} ${spacing}`}
      style={{
        color: tone === "band" ? "#FFFFFF" : "var(--head)",
        fontFamily: "var(--font-serif)",
      }}
    >
      {children}
    </h1>
  );
}
