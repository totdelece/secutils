import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("fog-ransomware-propagation");

export default function Image() {
  return renderArticleOg("fog-ransomware-propagation");
}
