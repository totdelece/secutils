import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("the-gentlemen-ransomware");

export default function Image() {
  return renderArticleOg("the-gentlemen-ransomware");
}
