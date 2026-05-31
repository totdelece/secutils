import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("daemon-tools-supply-chain");

export default function Image() {
  return renderArticleOg("daemon-tools-supply-chain");
}
