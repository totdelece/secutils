import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("ipa-10-major-threats-2026");

export default function Image() {
  return renderArticleOg("ipa-10-major-threats-2026");
}
