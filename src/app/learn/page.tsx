import type { Metadata } from "next";
import Link from "next/link";
import {
  articles,
  articleCategoryLabels,
  type ArticleCategory,
} from "@/lib/articles";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Learn — セキュリティとネットワークの基礎",
  description:
    "エンジニア向けセキュリティ・ネットワーク解説。JWT・パスワード強度・CIDR記法など、実務で疑問になりがちな基礎を初学者向けにわかりやすく解説。",
  alternates: { canonical: "/learn" },
};

const ORDERED_CATEGORIES: ArticleCategory[] = ["security", "network"];

export default function LearnPage() {
  const grouped: Record<ArticleCategory, typeof articles> = {
    security: [],
    network: [],
  };
  for (const a of articles) grouped[a.category].push(a);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          📖{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Learn
          </span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-2xl">
          セキュリティとネットワークの基礎を、初学者向けにわかりやすく解説します。各記事は対応するツールへのリンク付きで、実際に手を動かしながら学べます。
        </p>
      </section>

      {ORDERED_CATEGORIES.map((cat) => {
        const list = grouped[cat];
        if (!list.length) return null;
        return (
          <section key={cat} className="mb-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-black/50 dark:text-white/50 mb-4">
              {articleCategoryLabels[cat]}{" "}
              <span className="text-black/30 dark:text-white/30 normal-case font-sans tracking-normal">
                ({list.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {list.map((article) => {
                const relatedToolTitles = (article.relatedTools ?? [])
                  .map((slug) => tools.find((t) => t.slug === slug))
                  .filter((t): t is NonNullable<typeof t> => Boolean(t));
                return (
                  <Link
                    key={article.slug}
                    href={`/learn/${article.category}/${article.slug}`}
                    className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition flex flex-col"
                  >
                    <div className="flex items-baseline justify-between text-xs text-black/40 dark:text-white/40 mb-2 font-mono">
                      <span>{article.date}</span>
                      <span>約 {article.readingMinutes} 分</span>
                    </div>
                    <div className="font-semibold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug">
                      {article.title}
                    </div>
                    <div className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-3 flex-1">
                      {article.description}
                    </div>
                    {relatedToolTitles.length > 0 && (
                      <div className="text-xs text-black/40 dark:text-white/40 flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
                        <span className="self-center">関連ツール:</span>
                        {relatedToolTitles.map((t) => (
                          <span
                            key={t.slug}
                            className="font-mono bg-black/5 dark:bg-white/5 rounded px-1.5 py-0.5"
                          >
                            {t.icon} {t.title.split(" ")[0]}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="mt-12 rounded-lg border border-black/10 dark:border-white/10 p-5 bg-black/5 dark:bg-white/5">
        <h3 className="font-semibold mb-2">📌 記事を増やしていきます</h3>
        <p className="text-sm text-black/60 dark:text-white/60">
          現在 {articles.length} 本の記事があります。HTTP セキュリティヘッダー、TLS の仕組み、XSS・CSRF・SQLi 等の Web 脆弱性、サブネット計算、TCP/UDP の違い等を順次追加予定です。
        </p>
      </section>
    </div>
  );
}
