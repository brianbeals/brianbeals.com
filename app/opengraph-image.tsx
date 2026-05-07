import { ImageResponse } from "next/og";

export const alt =
  "Brian Beals — I help enterprise organizations stop piloting AI and start producing real results with it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "100px 80px",
          backgroundColor: "#F4F6F9",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(46,134,193,0.30) 0px, transparent 50%), radial-gradient(circle at 75% 80%, rgba(30,58,95,0.22) 0px, transparent 50%)",
          color: "#1A1A2A",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 110,
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
            fontSize: 46,
            fontWeight: 500,
            lineHeight: 1.25,
            maxWidth: 1000,
            marginBottom: 80,
          }}
        >
          I help enterprise organizations stop piloting AI and start producing real results with it.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#1E3A5F",
            opacity: 0.7,
          }}
        >
          brianbeals.com
        </div>
      </div>
    ),
    { ...size }
  );
}
