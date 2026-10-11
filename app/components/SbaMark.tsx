/**
 * SbaMark: SBA's VetCert SDVOSB icon, as SBA supplies it. Source and terms are in
 * iCloud at LLC/brand/certification-marks/README.md; the file in public/ is a
 * byte-for-byte copy of sba/sdvosb-certified-400.png. A plain <img> rather than
 * next/image so the served file is SBA's, not a re-encoded one.
 *
 * The mark carries meaning on its own, so it is a real image with alt text: never
 * aria-hidden, never a link (a link would read as SBA endorsing the page).
 * It comes down the day the certification lapses.
 */
export default function SbaMark({ height }: { height: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/sba-sdvosb-certified.png"
      alt="SBA certified service-disabled veteran-owned small business"
      width={400}
      height={500}
      className="flex-none"
      style={{ height, width: "auto" }}
    />
  );
}
