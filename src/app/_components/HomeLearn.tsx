import Link from "next/link";
import { articles, articleCategoryLabels, type Article } from "@/lib/articles";

const CURATED = [
  "https-tls",
  "owasp-top-10",
  "password-hashing",
  "xss",
  "csrf",
  "jwt-security-issues",
];

function find(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function HomeLearn() {
  const picks = CURATED.map(find).filter((a): a is Article => Boolean(a));

  return (
    <section className="border-t border-border-subtle bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-fg-primary sm:text-3xl">
              セキュリティ &amp; ネットワークを学ぶ
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-fg-muted">
              ツールの背景にある仕組みを、日本語の解説記事でまとめています。
            </p>
          </div>
          <Link
            href="/learn"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border-strong bg-bg-base px-4 text-sm font-semibold text-fg-primary transition hover:bg-bg-sunken"
          >
            記事一覧へ
            <ArrowIcon />
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.category}/${article.slug}`}
              className="group rounded-xl border border-border-subtle bg-bg-base p-4 transition hover:border-border-strong hover:bg-bg-sunken"
            >
              <div className="flex items-center gap-2 text-xs text-fg-subtle">
                <span className="font-medium text-fg-muted">
                  {articleCategoryLabels[article.category]}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">約 {article.readingMinutes} 分</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold leading-6 text-fg-primary group-hover:text-accent-strong">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* monetization: hosting comparison guide */}
        <Link
          href="/learn/network/xserver-vs-conoha-wing"
          className="group mt-4 flex flex-col gap-3 rounded-xl border border-border-subtle bg-bg-base p-5 transition hover:border-border-strong hover:bg-bg-sunken sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="rounded border border-border-strong px-1.5 py-0.5 text-[10px] font-semibold text-fg-subtle">
                PR
              </span>
              <span className="text-xs font-medium text-fg-muted">
                サーバー選びガイド
              </span>
            </div>
            <h3 className="mt-1.5 text-sm font-semibold text-fg-primary group-hover:text-accent-strong">
              エックスサーバー vs ConoHa WING — 料金・用途別の選び方を比較
            </h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-strong">
            比較を読む
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}
