import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("shin-vs-xserver");

export default function Image() {
  return renderArticleOg("shin-vs-xserver");
}
