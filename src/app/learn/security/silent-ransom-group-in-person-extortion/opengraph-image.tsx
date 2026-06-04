import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("silent-ransom-group-in-person-extortion");

export default function Image() {
  return renderArticleOg("silent-ransom-group-in-person-extortion");
}
