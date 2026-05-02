import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("tcp-vs-udp");

export default function Image() {
  return renderArticleOg("tcp-vs-udp");
}
