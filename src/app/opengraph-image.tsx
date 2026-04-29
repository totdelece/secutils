import {
  getOgAlt,
  ogImageContentType,
  ogImageSize,
  renderRootOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getOgAlt();

export default function Image() {
  return renderRootOg();
}
