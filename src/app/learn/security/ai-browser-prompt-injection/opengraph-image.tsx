import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("ai-browser-prompt-injection");

export default function Image() {
  return renderArticleOg("ai-browser-prompt-injection");
}
