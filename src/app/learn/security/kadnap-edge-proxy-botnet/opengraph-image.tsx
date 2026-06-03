import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("kadnap-edge-proxy-botnet");

export default function Image() {
  return renderArticleOg("kadnap-edge-proxy-botnet");
}
