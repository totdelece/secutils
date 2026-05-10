import type { Metadata } from "next";
import Link from "next/link";
import {
  articles,
  articleCategoryLabels,
  type ArticleCategory,
} from "@/lib/articles";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Learn - セキュリティとネットワークの基礎",
  description:
    "JWT、パスワード、XSS、CSRF、CIDR、DNS、TLSなど、開発者が押さえたいセキュリティとネットワークの基礎を日本語で解説します。",
  alternates: { canonical: "/learn" },
};

const ORDERED_CATEGORIES: ArticleCategory[] = ["security", "network"];

export default function LearnPage() {
  const grouped: Record<ArticleCategory, typeof articles> = {
    security: [],
    network: [],
  };
  for (const article of articles) grouped[article.category].push(article);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <section className="mb-10">
        <div className="mb-4 inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          実務で迷いやすい基礎を整理
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          セキュリティとネットワークを、手を動かしながら学ぶ。
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">
          記事から関連ツールへ移動できるようにしています。仕組みを読んで、すぐにJWT、Cookie、CIDR、
          ハッシュなどをブラウザ上で確認できます。
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="text-sm font-bold text-slate-950 dark:text-white">
              掲載状況
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">記事</dt>
                <dd className="font-semibold text-slate-950 dark:text-white">
                  {articles.length}本
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">ツール</dt>
                <dd className="font-semibold text-slate-950 dark:text-white">
                  {tools.length}個
                </dd>
              </div>
            </dl>
            <Link
              href="/"
              className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              ツール一覧へ
            </Link>
          </div>
        </aside>

        <div className="space-y-10">
          {ORDERED_CATEGORIES.map((category) => {
            const list = grouped[category];
            if (!list.length) return null;
            return (
              <section key={category}>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                      {articleCategoryLabels[category]}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {category === "security"
                        ? "Webアプリ、認証、暗号、ブラウザ防御の基礎。"
                        : "通信、名前解決、IP、HTTPまわりの基礎。"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {list.length} articles
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {list.map((article) => {
                    const relatedToolTitles = (article.relatedTools ?? [])
                      .map((slug) => tools.find((tool) => tool.slug === slug))
                      .filter((tool): tool is NonNullable<typeof tool> =>
                        Boolean(tool),
                      );
                    return (
                      <Link
                        key={article.slug}
                        href={`/learn/${article.category}/${article.slug}`}
                        className="group flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-emerald-400"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                          <time dateTime={article.date}>{article.date}</time>
                          <span>約{article.readingMinutes}分</span>
                        </div>
                        <h3 className="text-base font-bold leading-7 text-slate-950 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                          {article.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {article.description}
                        </p>
                        {relatedToolTitles.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3 dark:border-white/10">
                            {relatedToolTitles.map((tool) => (
                              <span
                                key={tool.slug}
                                className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                              >
                                {tool.title}
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
        </div>
      </div>
    </div>
  );
}
