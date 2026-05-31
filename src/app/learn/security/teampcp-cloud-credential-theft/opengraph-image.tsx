import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("teampcp-cloud-credential-theft");

export default function Image() {
  return renderArticleOg("teampcp-cloud-credential-theft");
}
