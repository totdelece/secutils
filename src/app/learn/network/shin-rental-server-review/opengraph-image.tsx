import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("shin-rental-server-review");

export default function Image() {
  return renderArticleOg("shin-rental-server-review");
}
