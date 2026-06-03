import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("turla-kazuar-p2p-botnet");

export default function Image() {
  return renderArticleOg("turla-kazuar-p2p-botnet");
}
