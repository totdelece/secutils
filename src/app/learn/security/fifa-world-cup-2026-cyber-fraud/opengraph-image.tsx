import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("fifa-world-cup-2026-cyber-fraud");

export default function Image() {
  return renderArticleOg("fifa-world-cup-2026-cyber-fraud");
}
