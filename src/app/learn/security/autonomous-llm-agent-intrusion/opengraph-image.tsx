import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("autonomous-llm-agent-intrusion");

export default function Image() {
  return renderArticleOg("autonomous-llm-agent-intrusion");
}
