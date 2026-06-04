import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("ai-built-ransomware-toolkit-edr-evasion");

export default function Image() {
  return renderArticleOg("ai-built-ransomware-toolkit-edr-evasion");
}
