import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("comptia-security-plus-guide");

export default function Image() {
  return renderArticleOg("comptia-security-plus-guide");
}
