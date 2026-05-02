export type ArticleCategory = "security" | "network";

export const articleCategoryLabels: Record<ArticleCategory, string> = {
  security: "セキュリティ",
  network: "ネットワーク",
};

export type Article = {
  slug: string;
  category: ArticleCategory;
  title: string;
  description: string;
  date: string; // ISO 8601 日付
  readingMinutes: number;
  /** 関連ツールの slug（src/lib/tools.ts と一致） */
  relatedTools?: string[];
};

export const articles: Article[] = [
  {
    slug: "jwt-security-issues",
    category: "security",
    title: "JWT のよくあるセキュリティ問題",
    description:
      "JWT は便利だが落とし穴も多い。alg=none攻撃、アルゴリズム混同、弱い秘密鍵、Payloadの過信など、実務で遭遇する典型問題を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: ["jwt-decoder", "hmac"],
  },
  {
    slug: "password-strength",
    category: "security",
    title: "パスワード強度はどう決まるか - エントロピーと総当たり攻撃",
    description:
      "「16文字以上」と言われる根拠は？ エントロピー(bit)の意味、総当たり攻撃の所要時間、パスフレーズが強い理由を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 5,
    relatedTools: ["password-generator"],
  },
  {
    slug: "cidr-notation",
    category: "network",
    title: "CIDR 記法の読み方と仕組み",
    description:
      "「/24」とは何を意味するのか。サブネットマスクとの関係、ホスト数の計算方法、なぜ /31 が特別なのかを初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 5,
    relatedTools: ["cidr-calculator"],
  },
];

export function getArticle(
  category: ArticleCategory,
  slug: string,
): Article | undefined {
  return articles.find((a) => a.category === category && a.slug === slug);
}

export function getRelatedArticles(toolSlug: string): Article[] {
  return articles.filter((a) => a.relatedTools?.includes(toolSlug));
}
