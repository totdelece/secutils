import { getArticleOgAlt, ogImageContentType, ogImageSize, renderArticleOg } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("osaka-acute-care-elbie-ransomware-2022");

export default function Image() {
  return renderArticleOg("osaka-acute-care-elbie-ransomware-2022");
}
