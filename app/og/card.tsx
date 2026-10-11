import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { essays, topicLabel, TOPICS } from "@/app/writing/essays";

// Shared pieces for the text-only social cards: /writing and one per essay.
// Same navy house style and geometry as app/opengraph-image.tsx (mark 113px at
// 64,56, accent rule 163x9, domain line in accent blue), without the portrait.
// Each card's og:image:alt is built from the same strings the card draws, so the
// two cannot drift.

export const NAVY = "#1E3A5F";
export const BLUE = "#2E86C1";
export const SUB = "#C6D5E6";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The DejaVu subsets in app/fonts cover printable ASCII plus the middle dot and
// the dashes. Every essay title so far is plain ASCII. A title with a curly quote
// or an accented letter would render that glyph in Satori's fallback, so widen the
// subset before publishing one.
export async function fonts() {
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

const DOMAIN = "brianbeals.com";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "56px 64px",
        backgroundColor: NAVY,
        color: "#FFFFFF",
        fontFamily: "DejaVu",
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
          marginBottom: 48,
        }}
      >
        BB
      </div>
      {children}
      {/* Pinned to the bottom so a one-line title and a two-line title put the
          domain in the same place. */}
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          fontSize: 26,
          fontWeight: 700,
          color: BLUE,
        }}
      >
        {DOMAIN}
      </div>
    </div>
  );
}

function Rule() {
  return (
    <div
      style={{
        display: "flex",
        width: 163,
        height: 9,
        backgroundColor: BLUE,
        marginBottom: 32,
      }}
    />
  );
}

// /writing

const TOPIC_WORDS = TOPICS.map((t) => t.label);

export const writingAlt = `Writing. ${TOPIC_WORDS.join(", ")}. ${DOMAIN}`;

export async function writingImage() {
  return new ImageResponse(
    (
      <Card>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          Writing
        </div>
        <Rule />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 400, color: SUB }}>
          {TOPIC_WORDS.join("  ·  ")}
        </div>
      </Card>
    ),
    { ...size, fonts: await fonts() }
  );
}

// One per essay. Title and topic come from app/writing/essays.ts by slug, the
// same list /writing and the caption under each essay's title read.

function essay(slug: string) {
  const e = essays.find((x) => x.slug === slug);
  if (!e) throw new Error(`No essay "${slug}" in app/writing/essays.ts`);
  return { title: e.title, topic: topicLabel(e.topic) };
}

export function essayAlt(slug: string) {
  const { title, topic } = essay(slug);
  return `${title}. ${topic}. ${DOMAIN}`;
}

export async function essayImage(slug: string) {
  const { title, topic } = essay(slug);
  return new ImageResponse(
    (
      <Card>
        <div
          style={{
            display: "flex",
            // 68 holds the longest title so far ("AI and the Poisoning of
            // Professionalism") to two lines across the full card width.
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          {title}
        </div>
        <Rule />
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: SUB,
          }}
        >
          {topic}
        </div>
      </Card>
    ),
    { ...size, fonts: await fonts() }
  );
}
