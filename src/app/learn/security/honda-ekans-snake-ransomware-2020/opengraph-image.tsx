import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("honda-ekans-snake-ransomware-2020");

export default function Image() {
  return renderArticleOg("honda-ekans-snake-ransomware-2020");
}
