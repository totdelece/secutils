import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("hoya-hunters-international-ransomware-2024");

export default function Image() {
  return renderArticleOg("hoya-hunters-international-ransomware-2024");
}
