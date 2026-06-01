import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("cisco-firestarter-backdoor");

export default function Image() {
  return renderArticleOg("cisco-firestarter-backdoor");
}
