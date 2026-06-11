import {
  getOgAlt,
  ogImageContentType,
  ogImageSize,
  renderToolOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getOgAlt("security-headers");

export default function Image() {
  return renderToolOg("security-headers");
}
