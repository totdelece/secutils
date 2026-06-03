import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("gridtide-unc2814-telecom-espionage");

export default function Image() {
  return renderArticleOg("gridtide-unc2814-telecom-espionage");
}
