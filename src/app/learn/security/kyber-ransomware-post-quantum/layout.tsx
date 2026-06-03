import type { Metadata } from "next";
import { getArticle, getArticleMetadata } from "@/lib/articles";
import { ArticleJsonLd } from "@/lib/ld";

const article = getArticle("security", "kyber-ransomware-post-quantum")!;

export const metadata: Metadata = getArticleMetadata(article);

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
