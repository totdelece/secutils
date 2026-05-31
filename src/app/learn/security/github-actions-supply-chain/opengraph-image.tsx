import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("github-actions-supply-chain");

export default function Image() {
  return renderArticleOg("github-actions-supply-chain");
}
