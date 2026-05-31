import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("foxconn-nitrogen-ransomware");

export default function Image() {
  return renderArticleOg("foxconn-nitrogen-ransomware");
}
