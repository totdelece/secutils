import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("charter-vishing-entra-breach");

export default function Image() {
  return renderArticleOg("charter-vishing-entra-breach");
}
