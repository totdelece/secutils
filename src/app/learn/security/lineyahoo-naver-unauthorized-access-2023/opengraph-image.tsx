import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("lineyahoo-naver-unauthorized-access-2023");

export default function Image() {
  return renderArticleOg("lineyahoo-naver-unauthorized-access-2023");
}
