import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("overseas-japan-streaming-vpn");

export default function Image() {
  return renderArticleOg("overseas-japan-streaming-vpn");
}
