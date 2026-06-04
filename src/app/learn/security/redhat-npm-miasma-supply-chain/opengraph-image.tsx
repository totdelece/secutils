import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("redhat-npm-miasma-supply-chain");

export default function Image() {
  return renderArticleOg("redhat-npm-miasma-supply-chain");
}
