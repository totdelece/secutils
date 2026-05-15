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
  const featured = articles.find((article) => article.slug === "jwt-security-issues") ?? articles[0];

  return (
    <div className="learn-stage relative isolate overflow-hidden">
      <div className="learn-mesh" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <section className="learn-hero relative overflow-hidden rounded-[36px] p-6 sm:p-10 lg:p-12">
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-sunken/45 px-3 py-1 text-[10px] font-semibold uppercase text-fg-subtle backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_18px_currentColor]" />
                Security learning surface
              </div>
              <h1 className="mt-7 max-w-4xl text-[46px] font-semibold leading-[0.92] text-fg-primary sm:text-[72px]">
                Learn the systems behind secure tools.
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-8 text-fg-muted">
                仕組みを読んで、すぐにブラウザ上のツールで確認する。
                secutils の Learn は、知識と実験を同じローカルな作業面に置くための
                セキュリティ学習ページです。
              </p>
            </div>

            <Link
              href={`/learn/${featured.category}/${featured.slug}`}
              className="learn-feature group relative min-h-[260px] overflow-hidden rounded-[30px] p-5"
            >
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <span className="rounded-full border border-border-subtle bg-bg-sunken/55 px-3 py-1 text-[10px] font-semibold uppercase text-fg-subtle">
                    featured guide
                  </span>
                  <span className="text-[11px] font-semibold text-accent">
                    約{featured.readingMinutes}分
                  </span>
                </div>
                <h2 className="text-[26px] font-semibold leading-tight text-fg-primary">
                  {featured.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-[13.5px] leading-7 text-fg-muted">
                  {featured.description}
                </p>
                <div className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                  読み始める
                  <Arrow />
                </div>
              </div>
            </Link>
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="learn-panel rounded-[30px] p-5">
              <div className="text-[10px] font-semibold uppercase text-fg-subtle">
                Library state
              </div>
              <dl className="mt-5 space-y-4">
                <Metric label="Articles" value={`${articles.length}本`} />
                <Metric label="Tools" value={`${tools.length}個`} />
                <Metric label="Processing" value="Local" />
              </dl>
              <Link
                href="/"
                className="magnetic-button mt-6 inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-fg-primary px-4 text-sm font-semibold text-bg-base"
              >
                ツール一覧へ
                <Arrow />
              </Link>
            </div>
          </aside>

          <div className="space-y-12">
            {ORDERED_CATEGORIES.map((category) => {
              const list = grouped[category];
              if (!list.length) return null;
              return (
                <section key={category}>
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-accent">
                        {articleCategoryLabels[category]}
                      </div>
                      <h2 className="mt-2 text-[32px] font-semibold leading-none text-fg-primary">
                        {category === "security" ? "Secure application thinking" : "Network fundamentals"}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-fg-muted">
                        {category === "security"
                          ? "Webアプリ、認証、暗号、ブラウザ防御を、実装判断につながる粒度で整理します。"
                          : "通信、名前解決、IP、HTTPまわりの基礎を、運用や障害調査で使える形にします。"}
                      </p>
                    </div>
                    <span className="hidden text-xs font-semibold text-fg-subtle sm:block">
                      {list.length} articles
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {list.map((article, index) => {
                      const relatedToolTitles = (article.relatedTools ?? [])
                        .map((slug) => tools.find((tool) => tool.slug === slug))
                        .filter((tool): tool is NonNullable<typeof tool> =>
                          Boolean(tool),
                        );
                      return (
                        <Link
                          key={article.slug}
                          href={`/learn/${article.category}/${article.slug}`}
                          className={[
                            "learn-card group relative flex min-h-[240px] flex-col overflow-hidden rounded-[28px] p-5",
                            index === 0 ? "md:min-h-[300px]" : "",
                          ].join(" ")}
                        >
                          <div className="relative mb-4 flex items-center justify-between gap-3 text-xs text-fg-subtle">
                            <time dateTime={article.date}>{article.date}</time>
                            <div className="flex items-center gap-2">
                              {article.affiliate && (
                                <span className="rounded-full border border-amber-400/30 bg-amber-300/10 px-2 py-0.5 font-semibold text-amber-500">
                                  PR
                                </span>
                              )}
                              <span>約{article.readingMinutes}分</span>
                            </div>
                          </div>
                          <h3 className="relative text-[18px] font-semibold leading-7 text-fg-primary transition group-hover:text-accent">
                            {article.title}
                          </h3>
                          <p className="relative mt-3 flex-1 text-sm leading-7 text-fg-muted">
                            {article.description}
                          </p>
                          {relatedToolTitles.length > 0 && (
                            <div className="relative mt-5 flex flex-wrap gap-1.5 border-t border-border-subtle pt-4">
                              {relatedToolTitles.map((tool) => (
                                <span
                                  key={tool.slug}
                                  className="rounded-full border border-border-subtle bg-bg-sunken/55 px-2 py-1 text-[11px] font-semibold text-fg-muted"
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
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-sm text-fg-muted">{label}</dt>
      <dd className="text-sm font-semibold text-fg-primary">{value}</dd>
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
