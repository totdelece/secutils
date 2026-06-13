import Link from "next/link";
import {
  articleCategoryLabels,
  type Article,
  articles,
  getRelatedArticles,
} from "@/lib/articles";
import { author, disclaimerText } from "@/lib/author";
import { tools } from "@/lib/tools";
import { ArticleTocDesktop, ArticleTocMobile } from "./ArticleToc";

export function ArticleLayout({
  article,
  children,
}: {
  article: Article;
  children: React.ReactNode;
}) {
  const relatedTools = (article.relatedTools ?? [])
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  // ツール経由の関連記事を優先し、同カテゴリの新しい記事で 4 件まで埋める
  const relatedByTool = (article.relatedTools ?? [])
    .flatMap((toolSlug) => getRelatedArticles(toolSlug))
    .filter((item) => item.slug !== article.slug)
    .filter(
      (item, index, array) =>
        array.findIndex((candidate) => candidate.slug === item.slug) === index,
    );
  const sameCategory = articles
    .filter(
      (item) =>
        item.category === article.category &&
        item.slug !== article.slug &&
        !relatedByTool.some((r) => r.slug === item.slug),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
  const relatedArticles = [...relatedByTool, ...sameCategory].slice(0, 4);

  return (
    <div className="article-stage relative isolate overflow-hidden">
      <div className="article-progress" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[220px_minmax(0,780px)_220px] lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-fg-muted transition hover:text-fg-primary"
            >
              <ArrowLeft />
              Learn
            </Link>
            <div className="article-side-panel rounded-xl p-5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">
                Reading state
              </div>
              <div className="mt-4 space-y-3">
                <Metric label="Category" value={articleCategoryLabels[article.category]} />
                <Metric label="Read" value={`${article.readingMinutes} min`} />
                <Metric label="Mode" value="Local" />
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-fg-subtle">
            <Link href="/" className="transition hover:text-fg-primary">
              Tools
            </Link>
            <span>/</span>
            <Link href="/learn" className="transition hover:text-fg-primary">
              Learn
            </Link>
            <span>/</span>
            <span>{articleCategoryLabels[article.category]}</span>
          </nav>

          <header className="article-hero relative overflow-hidden rounded-xl p-6 sm:p-9">
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-sunken/50 px-3 py-1 text-[10px] font-semibold uppercase text-fg-subtle">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {articleCategoryLabels[article.category]} / Browser-native guide
              </div>
              <h1 className="max-w-4xl text-[26px] font-bold leading-[1.2] text-fg-primary sm:text-[34px]">
                {article.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-[12px] text-fg-subtle">
                <span>
                  著者{" "}
                  <Link
                    href={author.profilePath}
                    className="font-semibold text-fg-muted underline-offset-2 transition hover:text-accent hover:underline"
                  >
                    {author.handle}
                  </Link>
                </span>
                <span className="h-1 w-1 rounded-full bg-fg-subtle/60" />
                <span>
                  公開 <time dateTime={article.date}>{article.date}</time>
                </span>
                <span className="h-1 w-1 rounded-full bg-fg-subtle/60" />
                <span>約{article.readingMinutes}分</span>
              </div>
            </div>
          </header>

          {article.affiliate && (
            <aside
              role="note"
              aria-label="広告表記"
              className="mt-8 rounded-xl border border-amber-400/30 bg-amber-300/10 p-5 text-sm text-amber-950 dark:text-amber-100"
            >
              <p className="font-bold">この記事には広告リンクが含まれます。</p>
              <p className="mt-2 leading-7">
                リンク経由で申し込みがあった場合、当サイトに紹介料が支払われることがあります。
                比較内容は編集判断に基づき、価格やキャンペーンは記事執筆時点の情報です。
              </p>
            </aside>
          )}

          <article className="article-prose mt-10">{children}</article>

          <section className="article-related mt-12 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bg-base text-sm font-bold uppercase text-fg-primary ring-1 ring-border-subtle"
              >
                {author.handle.slice(0, 2)}
              </span>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase text-accent">
                  この記事を書いた人
                </div>
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  <Link
                    href={author.profilePath}
                    className="text-[15px] font-bold text-fg-primary underline-offset-2 transition hover:text-accent hover:underline"
                  >
                    {author.handle}
                  </Link>
                  <span className="text-[12px] text-fg-subtle">{author.role}</span>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-fg-muted">{author.bio}</p>
                <Link
                  href="/about"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-accent underline-offset-2 hover:underline"
                >
                  運営者・編集方針について
                  <Arrow />
                </Link>
              </div>
            </div>
            <p className="mt-4 border-t border-border-subtle pt-4 text-[11.5px] leading-5 text-fg-subtle">
              {disclaimerText}
            </p>
          </section>

          {relatedTools.length > 0 && (
            <section className="article-related mt-16 rounded-xl p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase text-accent">
                    Tool companion
                  </div>
                  <h2 className="mt-2 text-[18px] font-bold text-fg-primary">
                    この記事と一緒に使えるツール
                  </h2>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="article-tool-card group flex items-center gap-3 rounded-2xl p-3"
                  >
                    <span className="flex h-11 min-w-11 items-center justify-center rounded-2xl bg-bg-base px-2 text-xs font-bold text-fg-primary ring-1 ring-border-subtle">
                      {tool.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-fg-primary">
                        {tool.title}
                      </span>
                      <span className="block truncate text-xs text-fg-muted">
                        {tool.useCase}
                      </span>
                    </span>
                    <Arrow />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {relatedArticles.length > 0 && (
            <section className="article-related mt-8 rounded-xl p-6">
              <div className="text-[10px] font-semibold uppercase text-accent">
                Related reading
              </div>
              <h2 className="mt-2 text-[18px] font-bold text-fg-primary">
                関連記事
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/learn/${item.category}/${item.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-border-subtle bg-bg-sunken/35 p-4 transition hover:border-border-strong hover:bg-bg-elevated/55"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-fg-subtle">
                      <span className="rounded-md border border-border-subtle bg-bg-base/60 px-1.5 py-0.5 font-semibold text-fg-muted">
                        {articleCategoryLabels[item.category]}
                      </span>
                      <span>約{item.readingMinutes}分</span>
                    </div>
                    <span className="text-sm font-bold leading-snug text-fg-primary transition group-hover:text-accent">
                      {item.title}
                    </span>
                    <span className="line-clamp-2 text-[12.5px] leading-6 text-fg-muted">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10">
            <Link
              href="/learn"
              className="glass-button inline-flex h-[48px] items-center gap-2 rounded-2xl px-5 text-sm font-semibold text-fg-primary"
            >
              <ArrowLeft />
              Learn の記事一覧へ戻る
            </Link>
          </div>
        </main>

        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <ArticleTocDesktop />
          </div>
        </aside>
      </div>

      <ArticleTocMobile />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase text-fg-subtle">{label}</div>
      <div className="mt-1 text-[13px] font-semibold text-fg-primary">{value}</div>
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m11 5-7 7 7 7" />
    </svg>
  );
}
