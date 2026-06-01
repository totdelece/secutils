import type { Metadata } from "next";
import { getArticle, getArticleMetadata } from "@/lib/articles";
import { ArticleJsonLd, ArticleFaqJsonLd } from "@/lib/ld";

const article = getArticle("security", "cissp-guide")!;

export const metadata: Metadata = getArticleMetadata(article);

const faqs = [
  {
    q: "CISSPを取得するのに必要な実務経験はどのくらいですか？",
    a: "8ドメインのうち2つ以上の分野で5年以上の有給実務経験が必要です。4年制大学の学位または(ISC)²が認定する資格（CompTIA Security+など）を持っている場合は4年でOKです。実務経験がなくても試験に合格してAssociate of (ISC)²になり、6年以内に経験を積んで昇格できます。",
  },
  {
    q: "CISSPの試験は日本語で受けられますか？",
    a: "はい、日本語試験があります。ただし、日本語試験は線形形式（250問・6時間）で、英語のCAT試験（125〜175問・3時間）より問題数が多く試験時間も長いです。",
  },
  {
    q: "CISSPの難易度と合格率はどのくらいですか？",
    a: "(ISC)²は合格率を公表していません。受験者の体感では60〜70%程度と言われています。ただし受験者はすでに実務経験5年以上のプロフェッショナルが中心なので、実質的な難易度は高いです。",
  },
  {
    q: "CISSPの勉強時間はどのくらい必要ですか？",
    a: "バックグラウンドによりますが、セキュリティ実務経験者で200〜300時間、広範な知識が必要な場合は300〜500時間が目安です。8つのドメインにわたる幅広い知識が問われます。",
  },
  {
    q: "情報処理安全確保支援士とCISSPはどちらが難しいですか？",
    a: "一般的にCISSPの方が難しいとされています。実務経験要件・英語での出題・8ドメインの幅広さ・更新の維持コスト（継続教育45 CPE/年・年会費）など、取得・維持コストが高いです。国内評価では情報処理安全確保支援士、国際評価ではCISSPが強みを持ちます。",
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
