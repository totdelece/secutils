import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("mitsubishi-electric-blacktech-cyberattack-2020");

export default function Image() {
  return renderArticleOg("mitsubishi-electric-blacktech-cyberattack-2020");
}
