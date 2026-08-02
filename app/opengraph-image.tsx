import { ImageResponse } from "next/og";

export const alt =
  "Brian Beals. I help enterprise organizations get real results out of their AI, analytics, and automation investments.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Navy house style, matching weather.brianbeals.com, harbor.brianbeals.com and
// sector.brianbeals.com. This card used to be a light #F4F6F9 ground with two soft
// radial gradients and no BB mark, which made it the only pale card in the set and
// the only one without the mark. At link-preview thumbnail size the gradients read
// as a smudge rather than as depth. Geometry below is measured off harbor-spots'
// og-card.png so all four line up: mark 113px at 64,56, accent rule 163x9, domain
// line in accent blue.
//
// Copy is deliberately personal-brand only. No LLC, no SDVOSB, no veteran status.
// This URL is on the LinkedIn profile, so whatever is on this card is effectively
// announced to LRS colleagues; the entity stays off it until that is a decision
// rather than a side effect.

const NAVY = "#1E3A5F";
const BLUE = "#2E86C1";
const SUB = "#C6D5E6";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 64px",
          backgroundColor: NAVY,
          color: "#FFFFFF",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 113,
            height: 113,
            backgroundColor: "#FFFFFF",
            color: NAVY,
            fontSize: 66,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            marginBottom: 64,
          }}
        >
          BB
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 30,
          }}
        >
          Brian Beals
        </div>

        <div
          style={{
            display: "flex",
            width: 163,
            height: 9,
            backgroundColor: BLUE,
            marginBottom: 34,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 400,
            lineHeight: 1.35,
            maxWidth: 900,
            color: SUB,
            marginBottom: 38,
          }}
        >
          I help enterprise organizations get real results out of their AI, analytics, and automation investments.
        </div>

        <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: BLUE }}>
          brianbeals.com
        </div>
      </div>
    ),
    { ...size }
  );
}
