import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1E3A5F",
          color: "white",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui",
        }}
      >
        BB
      </div>
    ),
    { ...size }
  );
}
