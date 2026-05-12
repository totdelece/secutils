import {
  ogImageContentType,
  ogImageSize,
  renderServerComparisonOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Xserver vs ConoHa WING 比較 | secutils";

export default function Image() {
  return renderServerComparisonOg();
}
