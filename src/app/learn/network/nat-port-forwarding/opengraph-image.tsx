import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("nat-port-forwarding");

export default function Image() {
  return renderArticleOg("nat-port-forwarding");
}
