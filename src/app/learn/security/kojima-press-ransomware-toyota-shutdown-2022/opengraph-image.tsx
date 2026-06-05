import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("kojima-press-ransomware-toyota-shutdown-2022");

export default function Image() {
  return renderArticleOg("kojima-press-ransomware-toyota-shutdown-2022");
}
