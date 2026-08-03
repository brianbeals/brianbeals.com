import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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

// Satori (what powers ImageResponse) has no system fonts. If you don't hand it
// font files it renders everything in one fallback weight and silently ignores
// fontWeight, which is exactly what happened here: the first pass looked correct
// in source and rendered "Brian Beals" in regular next to harbor's heavy bold.
// These are the same DejaVu Sans faces used to build harbor-spots/og-card.png and
// sector-rotation-screener/og-card.png, subset to the characters this card uses,
// so all four previews are literally the same typeface. ~13KB each.
// Satori cannot fetch from /public at render time, so the headshot is read off disk
// and inlined as a data URI. app/og/headshot.jpg is a 680px square crop at ~44KB,
// not the 2.2MB original: it renders at 340 and this is the 2x asset.
async function headshot() {
  const buf = await readFile(join(process.cwd(), "app", "og", "headshot.jpg"));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

async function fonts() {
  const dir = join(process.cwd(), "app", "fonts");
  const [bold, regular] = await Promise.all([
    readFile(join(dir, "DejaVuSans-Bold.subset.ttf")),
    readFile(join(dir, "DejaVuSans.subset.ttf")),
  ]);
  return [
    { name: "DejaVu", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "DejaVu", data: regular, weight: 400 as const, style: "normal" as const },
  ];
}

const PHOTO = 340;      // portrait edge length
const PHOTO_TOP = 64;   // upper right, not vertically centred
const PHOTO_RIGHT = 72;

export default async function Image() {
  const photo = await headshot();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: "56px 64px",
          backgroundColor: NAVY,
          color: "#FFFFFF",
          fontFamily: "DejaVu",
        }}
      >
        {/* Left column: everything that was here before, now in its own flex column
            so the portrait can sit beside it rather than under it. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            flex: 1,
            paddingRight: 46,
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
            marginBottom: 58,
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
            marginBottom: 32,
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
            marginBottom: 36,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 400,
            lineHeight: 1.35,
            color: SUB,
            marginBottom: 36,
          }}
        >
          I help enterprise organizations get real results out of their AI, analytics, and automation investments.
        </div>

        <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: BLUE }}>
          brianbeals.com
        </div>
        </div>

        {/* Portrait, upper right. Deliberately NOT vertically centred and
            deliberately NOT bleeding to the card edge: a face cropped full-height
            reads like a billboard and swallows the headline. Contained and smaller,
            it fills the dead space while the name still leads. */}
        <img
          src={photo}
          width={PHOTO}
          height={PHOTO}
          style={{
            width: PHOTO,
            height: PHOTO,
            marginTop: PHOTO_TOP - 56,
            marginRight: PHOTO_RIGHT - 64,
            borderRadius: 20,
            objectFit: "cover",
          }}
        />
      </div>
    ),
    { ...size, fonts: await fonts() }
  );
}
