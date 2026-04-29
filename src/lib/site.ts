import type { Metadata } from "next";
import { tools } from "./tools";

export const siteName = "secutils";
export const siteTagline =
  "エンジニア向けセキュリティ＆ユーティリティツール集";
export const siteDescription =
  "セキュリティ寄りのWebツール集。パスワード生成、ハッシュ計算、エンコード、ネットワーク調査など、エンジニアの日常作業を高速化します。すべてブラウザ完結でデータ送信なし。";

export function getBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
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
