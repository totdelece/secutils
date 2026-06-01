import type { Metadata } from "next";
import { getArticle, getArticleMetadata } from "@/lib/articles";
import { ArticleJsonLd, ArticleFaqJsonLd } from "@/lib/ld";

const article = getArticle("security", "sc-exam-guide")!;

export const metadata: Metadata = getArticleMetadata(article);

const faqs = [
  {
    q: "情報処理安全確保支援士の合格率はどのくらいですか？",
    a: "例年20〜22%前後で推移しています。高度情報処理試験の中では比較的受験者が多く、難易度はIPA高度区分の中でも「やや難しい」水準です。",
  },
  {
    q: "情報処理安全確保支援士は独学で合格できますか？",
    a: "合格者の多くは独学です。午前I・IIは過去問の繰り返しで対応でき、午後の記述式が独学の山場ですが、模範解答を読み込む学習法で十分対策できます。",
  },
  {
    q: "情報処理安全確保支援士の試験は年何回ありますか？",
    a: "年2回（春：4月第3日曜・秋：10月第3日曜）実施されます。また、応用情報技術者試験など他の高度試験に合格していると午前Iが免除になります。",
  },
  {
    q: "おすすめの参考書は何ですか？",
    a: "翔泳社の「情報処理安全確保支援士 教科書」（All in One）が定番です。午後対策には過去問集と合わせてIPAの公式過去問（無料公開）を活用するのが最も効果的です。",
  },
  {
    q: "勉強時間はどのくらい必要ですか？",
    a: "セキュリティ実務経験がある方で200〜300時間、未経験からでは300〜500時間が目安です。午前I・IIは過去問中心で50〜80時間、残りを午後対策に充てる配分が一般的です。",
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
