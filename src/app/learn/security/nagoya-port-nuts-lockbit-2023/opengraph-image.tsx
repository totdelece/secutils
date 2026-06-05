import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("nagoya-port-nuts-lockbit-2023");

export default function Image() {
  return renderArticleOg("nagoya-port-nuts-lockbit-2023");
}
