/**
 * Section header (H2) as a full-width navy bar, per my-profile/output-conventions.md.
 * Used on every public landing and service page; essays keep their own dotted H2.
 *
 * Colors come from globals.css (.section-heading): --head for the bar, --head-ink for
 * the text. White on #1E3A5F measures 11.5:1 in light mode; dark mode turns the bar
 * light (#A9C9E8) with page-dark ink, so it reads as a heading rather than a dark
 * slab on a dark page. Text is sentence case (my-profile/voice.md).
 *
 * `spacing` replaces the default margins rather than adding to them, since two
 * Tailwind margin classes on one element resolve by stylesheet order, not by
 * the order they are written.
 */
export default function SectionHeading({
  children,
  id,
  spacing = "mt-12 mb-5",
}: {
  children: React.ReactNode;
  id?: string;
  spacing?: string;
}) {
  return (
    <h2
      id={id}
      className={`section-heading text-xl sm:text-2xl font-semibold tracking-tight rounded-md px-4 py-3 scroll-mt-6 ${spacing}`}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </h2>
  );
}
