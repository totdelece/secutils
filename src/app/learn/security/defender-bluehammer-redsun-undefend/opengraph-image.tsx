import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("defender-bluehammer-redsun-undefend");

export default function Image() {
  return renderArticleOg("defender-bluehammer-redsun-undefend");
}
