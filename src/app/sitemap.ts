import type { MetadataRoute } from "next";
import { indexedArticles } from "@/lib/articles";
import { getBaseUrl } from "@/lib/site";
import { tools } from "@/lib/tools";
import { author } from "@/lib/author";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  // lastmod には実際の日付だけを入れる。ビルド日時を入れると毎回「全ページが更新された」と
  // 申告することになり、Google に lastmod 自体を信用されなくなるため。
  // 日付を持たないツール・固定ページは lastmod を省略する。
  const latestPublished = indexedArticles
    .map((article) => article.date)
    .sort()
    .at(-1);

  return [
    {
      url: `${base}/`,
      lastModified: latestPublished,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/learn`,
      lastModified: latestPublished,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}${author.profilePath}`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/contact`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...tools.map((tool) => ({
      url: `${base}/tools/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // noindex の記事はサイトマップにも載せない
    ...indexedArticles.map((article) => ({
      url: `${base}/learn/${article.category}/${article.slug}`,
      lastModified: article.updated ?? article.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
