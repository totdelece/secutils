import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("trellix-source-code-breach");

export default function Image() {
  return renderArticleOg("trellix-source-code-breach");
}
