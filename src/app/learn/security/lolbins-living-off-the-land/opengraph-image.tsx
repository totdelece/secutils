import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("lolbins-living-off-the-land");

export default function Image() {
  return renderArticleOg("lolbins-living-off-the-land");
}
