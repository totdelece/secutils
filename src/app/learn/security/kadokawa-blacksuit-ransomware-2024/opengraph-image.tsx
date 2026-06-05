import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("kadokawa-blacksuit-ransomware-2024");

export default function Image() {
  return renderArticleOg("kadokawa-blacksuit-ransomware-2024");
}
