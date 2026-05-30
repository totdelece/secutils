import {
  articles,
  getArticleSeoTitle,
  getArticleSeoDescription,
} from "@/lib/articles";
import { getBaseUrl } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = getBaseUrl();
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const lastBuild =
    sorted.length > 0 ? new Date(sorted[0].date).toUTCString() : new Date().toUTCString();

  const items = sorted
    .map((article) => {
      const url = `${base}/learn/${article.category}/${article.slug}`;
      const title = getArticleSeoTitle(article);
      const description = getArticleSeoDescription(article);
      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>secutils Learn</title>
    <link>${escapeXml(`${base}/learn`)}</link>
    <atom:link href="${escapeXml(`${base}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <description>セキュリティとネットワークの解説記事 - secutils</description>
    <language>ja</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
