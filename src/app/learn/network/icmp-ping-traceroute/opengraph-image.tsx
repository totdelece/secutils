import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("icmp-ping-traceroute");

export default function Image() {
  return renderArticleOg("icmp-ping-traceroute");
}
