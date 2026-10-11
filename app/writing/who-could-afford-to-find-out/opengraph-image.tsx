import { essayAlt, essayImage } from "@/app/og/card";

const SLUG = "who-could-afford-to-find-out";

export const alt = essayAlt(SLUG);
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return essayImage(SLUG);
}
