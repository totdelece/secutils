import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("operation-dragon-weave-azure-c2");

export default function Image() {
  return renderArticleOg("operation-dragon-weave-azure-c2");
}
