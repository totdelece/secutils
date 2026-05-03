import type { Metadata } from "next";
import { getArticle } from "@/lib/articles";
import { ArticleJsonLd } from "@/lib/ld";

const article = getArticle("network", "osi-tcpip-model")!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: { canonical: `/learn/network/${article.slug}` },
  openGraph: {
    type: "article",
    title: `${article.title} | secutils`,
    description: article.description,
    url: `/learn/network/${article.slug}`,
    publishedTime: article.date,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `${article.title} | secutils`,
    description: article.description,
    images: [`/learn/network/${article.slug}/opengraph-image`],
  },
};

export default function ArticlePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleJsonLd slug={article.slug} />
      {children}
    </>
  );
}
