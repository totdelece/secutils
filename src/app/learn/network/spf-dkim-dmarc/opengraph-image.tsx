import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("spf-dkim-dmarc");

export default function Image() {
  return renderArticleOg("spf-dkim-dmarc");
}
