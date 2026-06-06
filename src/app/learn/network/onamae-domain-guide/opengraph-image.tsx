import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("onamae-domain-guide");

export default function Image() {
  return renderArticleOg("onamae-domain-guide");
}
