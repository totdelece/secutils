import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("onamae-vs-xserver-domain");

export default function Image() {
  return renderArticleOg("onamae-vs-xserver-domain");
}
