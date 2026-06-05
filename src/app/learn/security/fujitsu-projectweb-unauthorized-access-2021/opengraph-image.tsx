import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("fujitsu-projectweb-unauthorized-access-2021");

export default function Image() {
  return renderArticleOg("fujitsu-projectweb-unauthorized-access-2021");
}
