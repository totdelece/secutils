import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("xserver-domain-guide");

export default function Image() {
  return renderArticleOg("xserver-domain-guide");
}
