import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("ironworm-npm-ebpf-supply-chain");

export default function Image() {
  return renderArticleOg("ironworm-npm-ebpf-supply-chain");
}
