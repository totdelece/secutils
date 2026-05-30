import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("infostealer-session-hijacking");

export default function Image() {
  return renderArticleOg("infostealer-session-hijacking");
}
