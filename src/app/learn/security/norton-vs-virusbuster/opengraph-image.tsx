import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("norton-vs-virusbuster");

export default function Image() {
  return renderArticleOg("norton-vs-virusbuster");
}
