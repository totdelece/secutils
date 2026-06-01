import type { Metadata } from "next";
import { getArticle, getArticleMetadata } from "@/lib/articles";
import { ArticleJsonLd, ArticleFaqJsonLd } from "@/lib/ld";

const article = getArticle("security", "zero-trust-security")!;

export const metadata: Metadata = getArticleMetadata(article);

const faqs = [
  {
    q: "ゼロトラストとは何ですか？わかりやすく教えてください。",
    a: "「社内ネットワークにいるから安全」という前提を捨て、すべてのユーザー・デバイス・通信を信頼しないことを前提にしたセキュリティの考え方です。「Never Trust, Always Verify（信頼しない、常に確認する）」が原則で、アクセスのたびに認証・認可・検査を行います。",
  },
  {
    q: "ゼロトラストはなぜ今必要なのですか？",
    a: "テレワーク普及・クラウド移行・BYOD導入により「社内＝安全」という境界が崩れたためです。VPNで社内ネットワークに入れば安全という従来の境界型防御では、侵入された後の横展開を防げません。ゼロトラストは内部の攻撃者や侵害されたアカウントからの被害を最小化します。",
  },
  {
    q: "ゼロトラスト導入にかかるコストはどのくらいですか？",
    a: "規模と選択製品によって大きく異なります。中小企業ではMicrosoft Entra ID P1（ユーザーあたり月数百円）からMFA・条件付きアクセスを始めることができます。大企業では Zscaler や CrowdStrike などのエンタープライズ製品を組み合わせると数千万〜億円規模になることもあります。",
  },
  {
    q: "ゼロトラストとSASEの違いは何ですか？",
    a: "ゼロトラストはセキュリティの「考え方・原則」、SASEはその実現手段の一つです。SASE（Secure Access Service Edge）はGartnerが提唱した概念で、ネットワーク機能（SD-WAN）とセキュリティ機能（CASB・SWG・ZTNA）をクラウドで統合して提供するアーキテクチャです。",
  },
  {
    q: "ゼロトラスト導入はどこから始めればよいですか？",
    a: "まずMFA（多要素認証）の全社展開から始めるのが最も費用対効果が高いです。次にIDプロバイダーの統合・条件付きアクセスポリシーの設定・デバイス管理（MDM）を段階的に整備します。一度にすべてを実装しようとせず、リスクの高い領域から優先的に対応することが重要です。",
  },
];

export default function ArticlePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleJsonLd slug={article.slug} />
      <ArticleFaqJsonLd faqs={faqs} />
      {children}
    </>
  );
}
