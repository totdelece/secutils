import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("handa-hospital-lockbit-ransomware-2021");

export default function Image() {
  return renderArticleOg("handa-hospital-lockbit-ransomware-2021");
}
