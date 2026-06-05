import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("iseto-8base-ransomware-2024");

export default function Image() {
  return renderArticleOg("iseto-8base-ransomware-2024");
}
