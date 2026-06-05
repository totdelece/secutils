import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("asahi-group-qilin-ransomware-2025");

export default function Image() {
  return renderArticleOg("asahi-group-qilin-ransomware-2025");
}
