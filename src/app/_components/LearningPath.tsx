import Link from "next/link";
import { articles, type Article } from "@/lib/articles";

const PATH: [string, string][] = [
  ["https-tls", "通信の信頼を理解する"],
  ["owasp-top-10", "Web リスクの全体像をつかむ"],
  ["password-hashing", "秘密情報を安全に保存する"],
  ["xss", "ブラウザへの注入を防ぐ"],
  ["csrf", "状態変更リクエストを守る"],
  ["jwt-security-issues", "トークン設計を点検する"],
];

function find(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function LearningPath() {
  const steps = PATH.map(([slug, copy]) => {
    const article = find(slug);
    return article ? { article, copy } : null;
  }).filter((item): item is { article: Article; copy: string } => Boolean(item));

  if (!steps.length) return null;

  const totalMinutes = steps.reduce(
    (acc, item) => acc + (item.article.readingMinutes ?? 5),
    0,
  );

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="text-[11px] font-semibold uppercase text-accent">
              Beginner path
            </div>
            <h2 className="mt-4 max-w-3xl text-[42px] font-semibold leading-[0.98] text-fg-primary sm:text-[60px]">
              Build security intuition in one focused route.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-fg-muted">
              プロトコルの基礎から、実際の攻撃パターン、認証・トークン設計まで。
              ツールを使うだけでなく、背景にある仕組みも順番に理解できる
              学習ルートです。
            </p>
          </div>
          <Link
            href="/learn"
            className="glass-button inline-flex h-[48px] items-center justify-center gap-2 rounded-2xl px-5 text-[14px] font-semibold text-fg-primary"
          >
            記事一覧を見る
            <Arrow />
          </Link>
        </div>

        <div className="learning-ribbon relative overflow-hidden rounded-[32px] p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            {steps.map(({ article, copy }, index) => (
              <Step
                key={article.slug}
                article={article}
                copy={copy}
                index={index + 1}
              />
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-border-subtle bg-bg-sunken/45 px-4 py-3 text-[12px] text-fg-muted">
            <span>週末に一気読みしやすい構成</span>
            <span className="font-semibold text-fg-primary tabular-nums">
              {totalMinutes} min
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  article,
  copy,
  index,
}: {
  article: Article;
  copy: string;
  index: number;
}) {
  return (
    <Link
      href={`/learn/${article.category}/${article.slug}`}
      className="premium-card group relative min-h-[210px] rounded-[24px] p-4"
      style={{ ["--premium-tone" as unknown as string]: index % 2 ? "var(--tone-security)" : "var(--tone-network)" }}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-bg-base/75 text-[12px] font-semibold text-fg-primary ring-1 ring-border-subtle tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-semibold uppercase text-fg-subtle">
          {article.readingMinutes ?? 5} min
        </span>
      </div>
      <div className="mt-8 text-[17px] font-semibold leading-tight text-fg-primary">
        {copy}
      </div>
      <div className="mt-3 line-clamp-2 text-[12.5px] leading-6 text-fg-muted">
        {article.title}
      </div>
      <div className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent">
        読む
        <Arrow />
      </div>
    </Link>
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
