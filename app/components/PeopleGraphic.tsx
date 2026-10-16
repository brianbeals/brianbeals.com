/**
 * The homepage hero graphic (2026-10-16): four simple figures on a light-blue
 * panel, one of them in the --accent-stripe green, for "more than one in four".
 * Navy figures, light-blue panel, one green figure: roughly 60/30/10.
 *
 * Decorative. The H1 beside it carries the meaning, so the SVG is aria-hidden and
 * has no title. Colors are CSS variables, so dark mode swaps the panel to --band
 * (#14283A) and the figures to --head (#A9C9E8). No animation.
 */
function Person({ x, fill }: { x: number; fill: string }) {
  return (
    <g style={{ fill }}>
      <circle cx={x} cy={78} r={17} />
      <path d={`M ${x - 27} 168 v -34 a 27 27 0 0 1 54 0 v 34 z`} />
    </g>
  );
}

export default function PeopleGraphic() {
  return (
    <svg
      viewBox="0 0 320 200"
      aria-hidden="true"
      focusable="false"
      className="w-full h-auto max-w-sm"
    >
      <rect x="0" y="0" width="320" height="200" rx="16" style={{ fill: "var(--band)" }} />
      <Person x={58} fill="var(--head)" />
      <Person x={126} fill="var(--head)" />
      <Person x={194} fill="var(--accent-stripe)" />
      <Person x={262} fill="var(--head)" />
    </svg>
  );
}
