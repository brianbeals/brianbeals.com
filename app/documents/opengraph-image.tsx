import { pageAlt, pageImage } from "@/app/og/card";

export const alt = pageAlt("documents");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return pageImage("documents");
}
