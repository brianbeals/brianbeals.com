import { pageAlt, pageImage } from "@/app/og/card";

export const alt = pageAlt("pricing");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return pageImage("pricing");
}
