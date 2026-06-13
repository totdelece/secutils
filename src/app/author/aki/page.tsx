import type { Metadata } from "next";
import Link from "next/link";
import { author, editorialPolicy, disclaimerText } from "@/lib/author";
import {
  articles,
  articleCategoryLabels,
  isArticleNoindexed,
  type ArticleCategory,
} from "@/lib/articles";
import { AuthorJsonLd } from "@/lib/ld";

export const metadata: Metadata = {
  title: `${author.handle} - 著者プロフィール`,
  description: `secutils の著者・運営者「${author.handle}」のプロフィール。${author.role}。記事の編集・裏取り方針と、これまでに執筆した解説記事の一覧を掲載しています。`,
  alternates: { canonical: author.profilePath },
};

// 著者が執筆した evergreen 記事（noindex の速報型は除く）をカテゴリ別に整理
const authored = articles
  .filter((a) => !isArticleNoindexed(a.slug))
  .sort((a, b) => b.date.localeCompare(a.date));

const byCategory: Record<ArticleCategory, typeof authored> = {
  security: authored.filter((a) => a.category === "security"),
  network: authored.filter((a) => a.category === "network"),
};

export default function AuthorPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <AuthorJsonLd />

      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
        <span className="mx-2">/</span>
        <Link href="/about" className="hover:text-foreground">
          About
        </Link>
      </nav>

      {/* プロフィールヘッダー */}
      <header className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white">
            {author.handle.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{author.handle}</h1>
            <p className="text-sm text-black/55 dark:text-white/55">
              {author.role}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed">{author.bio}</p>
      </header>

      <section className="mt-10 text-sm leading-relaxed">
        <h2 className="text-xl font-bold tracking-tight mb-3">得意領域</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {author.expertise.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 text-sm leading-relaxed">
        <h2 className="text-xl font-bold tracking-tight mb-3">
          記事の編集・裏取り方針
        </h2>
        <p>{editorialPolicy.summary}</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          {editorialPolicy.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 text-sm leading-relaxed">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          {author.handle} が執筆した解説記事（{authored.length}本）
        </h2>
        {(Object.keys(byCategory) as ArticleCategory[]).map((cat) =>
          byCategory[cat].length > 0 ? (
            <div key={cat} className="mb-6">
              <h3 className="text-sm font-bold text-black/70 dark:text-white/70 mb-2">
                {articleCategoryLabels[cat]}（{byCategory[cat].length}）
              </h3>
              <ul className="space-y-1.5">
                {byCategory[cat].map((article) => (
                  <li key={article.slug} className="flex items-baseline gap-2">
                    <Link
                      href={`/learn/${article.category}/${article.slug}`}
                      className="text-emerald-700 dark:text-emerald-300 hover:underline"
                    >
                      {article.title}
                    </Link>
                    <span className="shrink-0 text-xs text-black/40 dark:text-white/40">
                      約{article.readingMinutes}分
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null,
        )}
      </section>

      <section className="mt-10 text-sm leading-relaxed">
        <h2 className="text-xl font-bold tracking-tight mb-3">連絡・指摘</h2>
        <p className="text-black/70 dark:text-white/70">
          運営者は匿名で活動していますが、記事はすべて同一の運営者が執筆・確認しています。内容の誤りや古くなった情報のご指摘は{" "}
          <Link
            href={author.contactPath}
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Contact ページ
          </Link>{" "}
          から受け付けています。運営方針や設計原則は{" "}
          <Link
            href="/about"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            About
          </Link>{" "}
          をご覧ください。
        </p>
        <p className="mt-4 text-xs text-black/55 dark:text-white/55">
          {disclaimerText}
        </p>
      </section>
    </div>
  );
}
