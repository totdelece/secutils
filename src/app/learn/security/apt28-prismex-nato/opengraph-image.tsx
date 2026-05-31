import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("apt28-prismex-nato");

export default function Image() {
  return renderArticleOg("apt28-prismex-nato");
}
