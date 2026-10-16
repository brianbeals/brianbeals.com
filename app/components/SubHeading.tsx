/**
 * H3-level heading under a SectionHeading: navy serif text, no bar. --head turns
 * light blue in dark mode (globals.css). Sentence case (my-profile/voice.md).
 *
 * `spacing` and `size` replace the defaults rather than adding to them; see
 * SectionHeading for why.
 */
export default function SubHeading({
  children,
  id,
  spacing = "mt-8 mb-3",
  size = "text-lg sm:text-xl",
}: {
  children: React.ReactNode;
  id?: string;
  spacing?: string;
  size?: string;
}) {
  return (
    <h3
      id={id}
      className={`${size} font-semibold tracking-tight scroll-mt-6 ${spacing}`}
      style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
    >
      {children}
    </h3>
  );
}
