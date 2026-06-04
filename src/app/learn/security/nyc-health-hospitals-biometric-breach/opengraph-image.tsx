import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("nyc-health-hospitals-biometric-breach");

export default function Image() {
  return renderArticleOg("nyc-health-hospitals-biometric-breach");
}
