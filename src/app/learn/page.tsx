import type { Metadata } from "next";
import Link from "next/link";
import { learningPaths, getArticleBySlug, articles } from "@/lib/articles";
import { tools } from "@/lib/tools";
import { LearnBrowser } from "./_components/LearnBrowser";

export const metadata: Metadata = {
  title: "Learn - セキュリティとネットワークの学習ハブ",
  description:
    "JWT、XSS、CSRF、認証、暗号、TCP/IP、DNS、TLSなど、開発者向けのセキュリティとネットワークの基礎を学習パス付きで日本語解説。検索とカテゴリで読みたい記事をすぐ見つけられます。",
  alternates: {
    canonical: "/learn",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

// X(旧Twitter)アカウントを開設したらハンドルを入れると購読セクションに表示される
const X_HANDLE = "";

export default function LearnPage() {
  return (
    <div className="learn-stage relative isolate overflow-hidden">
      <div className="learn-mesh" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Hero */}
        <header className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {articles.length} guides · browser-native
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-[40px] font-bold leading-[1.05] tracking-tight text-fg-primary sm:text-[58px]">
            Learn Cybersecurity
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-fg-muted sm:text-[17px]">
            ガイド・チュートリアル・実務で使えるセキュリティの知識を、
            読んだその場でブラウザ上のツールで確かめられる学習ハブ。
          </p>
        </header>

        {/* 検索・タブ・Featured・Latest */}
        <div className="mt-10">
          <LearnBrowser />
        </div>

        {/* Learning Paths */}
        <section className="mt-16">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-accent">
            Learning Paths
          </div>
          <h2 className="mt-1.5 text-[24px] font-bold leading-tight text-fg-primary sm:text-[28px]">
            学習ロードマップ
          </h2>
          <p className="mt-1.5 max-w-2xl text-[13.5px] leading-6 text-fg-muted">
            何から読めばいいか迷ったらここから。番号順に読むと一つのテーマを通して理解できます。
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {learningPaths.map((path) => {
              const steps = path.steps
                .map((slug) => getArticleBySlug(slug))
                .filter((a): a is NonNullable<typeof a> => Boolean(a));
              return (
                <div
                  key={path.id}
                  className="learn-card flex flex-col gap-4 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[17px] font-bold text-fg-primary">
                        {path.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-6 text-fg-muted">
                        {path.description}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md border border-accent/30 bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                      {path.level}
                    </span>
                  </div>
                  <ol className="flex flex-col gap-1.5">
                    {steps.map((article, i) => (
                      <li key={article.slug}>
                        <Link
                          href={`/learn/${article.category}/${article.slug}`}
                          className="group flex items-center gap-3 rounded-lg border border-transparent px-2.5 py-2 transition hover:border-border-subtle hover:bg-bg-sunken/50"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-bg-sunken text-[12px] font-bold tabular-nums text-fg-muted ring-1 ring-border-subtle group-hover:text-accent">
                            {i + 1}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-fg-secondary transition group-hover:text-fg-primary">
                            {article.title}
                          </span>
                          <span className="shrink-0 text-[11px] text-fg-subtle">
                            約{article.readingMinutes}分
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {/* 購読（RSS / X / GitHub） */}
        <section className="mt-16">
          <div className="learn-panel flex flex-col items-center gap-5 rounded-2xl px-6 py-10 text-center">
            <div>
              <h2 className="text-[22px] font-bold text-fg-primary sm:text-[26px]">
                新着記事を受け取る
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[14px] leading-7 text-fg-muted">
                メールアドレスの登録は不要です。RSS を購読するか GitHub をウォッチすると、
                新しいツールや解説記事の追加を追えます。
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/feed.xml"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-fg-primary px-5 text-sm font-semibold text-bg-base transition hover:opacity-90"
              >
                <RssIcon />
                RSS を購読
              </a>
              <a
                href="https://github.com/totdelece/secutils"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border-strong bg-bg-elevated/60 px-5 text-sm font-semibold text-fg-primary transition hover:border-fg-subtle"
              >
                <GitHubIcon />
                GitHub
              </a>
              {X_HANDLE && (
                <a
                  href={`https://x.com/${X_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-border-strong bg-bg-elevated/60 px-5 text-sm font-semibold text-fg-primary transition hover:border-fg-subtle"
                >
                  <XIcon />
                  @{X_HANDLE}
                </a>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-fg-subtle">
              <span>記事 {articles.length} 本</span>
              <span className="h-1 w-1 rounded-full bg-fg-subtle/50" />
              <span>ツール {tools.length} 個</span>
              <span className="h-1 w-1 rounded-full bg-fg-subtle/50" />
              <Link href="/" className="font-semibold text-accent hover:underline">
                ツール一覧へ
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function RssIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.48A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.9l-5.4-7.06L3.96 22H.7l8.02-9.17L1.5 2h7.07l4.88 6.45L18.244 2Zm-1.21 18h1.81L7.05 3.9H5.11L17.034 20Z" />
    </svg>
  );
}
