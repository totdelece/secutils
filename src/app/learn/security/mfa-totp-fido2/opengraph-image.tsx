import {
  getArticleOgAlt,
  ogImageContentType,
  ogImageSize,
  renderArticleOg,
} from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = getArticleOgAlt("mfa-totp-fido2");

export default function Image() {
  return renderArticleOg("mfa-totp-fido2");
}
