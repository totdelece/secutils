import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("canvas-shinyhunters-breach");

export default function Image() {
  return renderArticleOg("canvas-shinyhunters-breach");
}
