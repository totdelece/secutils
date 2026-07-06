import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("expressvpn-review");

export default function Image() {
  return renderArticleOg("expressvpn-review");
}
