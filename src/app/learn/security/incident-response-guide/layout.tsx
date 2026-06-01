import type { Metadata } from "next";
import { getArticle, getArticleMetadata } from "@/lib/articles";
import { ArticleJsonLd, ArticleFaqJsonLd } from "@/lib/ld";

const article = getArticle("security", "incident-response-guide")!;

export const metadata: Metadata = getArticleMetadata(article);

const faqs = [
  {
    q: "セキュリティインシデントが発生したら最初に何をすればよいですか？",
    a: "まず「切断か継続か」を判断します。被害拡大防止のためにネットワーク切断が基本ですが、ログが消える・攻撃者に気づかれる・業務停止になるなどのリスクも考慮が必要です。切断する前に必ずログ・メモリの証拠保全を行い、対応チームへの連絡と経営層への報告を行います。",
  },
  {
    q: "CSIRTとは何ですか？",
    a: "CSIRT（Computer Security Incident Response Team）はインシデント対応を専門に行うチームです。インシデントの検知・分析・対応・復旧・再発防止を担います。専任チームがなくてもインシデント対応の役割と手順を事前に定めておくことで、発生時に素早く動けます。",
  },
  {
    q: "ランサムウェアに感染した場合、身代金を払うべきですか？",
    a: "支払いは推奨されません。理由は①支払っても復号できない場合がある②支払いがランサムウェアビジネスを支援する③二重恐喝（データ公開）は支払いで止まらない場合がある、の3点です。まず証拠保全・ネットワーク隔離を行い、バックアップからの復旧を試みてください。",
  },
  {
    q: "インシデント対応の報告書には何を書けばよいですか？",
    a: "①インシデントの概要（いつ・何が起きたか）②影響範囲（被害を受けたシステム・データ・人数）③原因（技術的な根本原因）④対応タイムライン（いつ・誰が・何をしたか）⑤再発防止策（技術的・組織的）の5項目が基本構成です。",
  },
  {
    q: "インシデント発生時に外部機関に報告する義務はありますか？",
    a: "業種によって異なります。個人情報が流出した場合は個人情報保護委員会への報告義務（72時間以内）があります。重要インフラ事業者はサイバーセキュリティ基本法に基づく報告義務があります。上場企業では有価証券報告書での開示が求められる場合もあります。",
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
