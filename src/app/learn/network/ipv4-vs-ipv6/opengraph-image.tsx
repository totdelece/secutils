import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("ipv4-vs-ipv6");

export default function Image() {
  return renderArticleOg("ipv4-vs-ipv6");
}
