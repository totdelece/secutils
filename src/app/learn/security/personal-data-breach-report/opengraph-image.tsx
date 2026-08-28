import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("personal-data-breach-report");

export default function Image() {
  return renderArticleOg("personal-data-breach-report");
}
