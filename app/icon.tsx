import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui",
          borderRadius: 6,
        }}
      >
        BB
      </div>
    ),
    { ...size }
  );
}
