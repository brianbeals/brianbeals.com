import { essayAlt, essayImage } from "@/app/og/card";

const SLUG = "the-form-that-sets-the-price";

export const alt = essayAlt(SLUG);
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return essayImage(SLUG);
}
