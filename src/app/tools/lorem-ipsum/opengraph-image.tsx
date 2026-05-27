import {
  getOgAlt,
  ogImageContentType,
  ogImageSize,
  renderToolOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getOgAlt("lorem-ipsum");

export default function Image() {
  return renderToolOg("lorem-ipsum");
}
