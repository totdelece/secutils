import type { Metadata } from "next";
import { tools } from "./tools";

export const siteName = "secutils";
export const siteTagline = "ブラウザで使える開発者向けセキュリティツール集";
export const siteDescription =
  "パスワード生成、JWT解析、ハッシュ計算、JSON整形、CIDR計算などをブラウザ内で完結できる開発者向けWebツール集です。入力データはサーバーに送信しません。";

export function getBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getToolMetadata(slug: string): Metadata {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};
  const path = `/tools/${tool.slug}`;
  const fullTitle = `${tool.title} | ${siteName}`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: fullTitle,
      description: tool.description,
      url: path,
      siteName,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: tool.description,
      images: [`${path}/opengraph-image`],
    },
  };
}
