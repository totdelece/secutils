"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  articles as allArticles,
  articleCategoryLabels,
  getArticleTopics,
  topicLabels,
  orderedTopics,
  type Article,
  type ArticleCategory,
  type TopicId,
} from "@/lib/articles";

type Filter =
  | { kind: "all" }
  | { kind: "category"; value: ArticleCategory }
  | { kind: "topic"; value: TopicId };

function filterId(filter: Filter): string {
  return filter.kind === "all" ? "all" : `${filter.kind}:${filter.value}`;
}

function difficulty(article: Article): { label: string; tone: string } {
  if (article.readingMinutes <= 5)
    return { label: "入門", tone: "text-emerald-600 dark:text-emerald-400" };
  if (article.readingMinutes <= 8)
    return { label: "中級", tone: "text-amber-600 dark:text-amber-400" };
  return { label: "上級", tone: "text-rose-600 dark:text-rose-400" };
}

function byDateDesc(a: Article, b: Article) {
  return b.date.localeCompare(a.date);
}

function Thumb({ article, large }: { article: Article; large?: boolean }) {
  const glyph =
    article.category === "security" ? "🛡" : "🌐";
  return (
    <div
      aria-hidden
      className={[
        "learn-thumb relative flex items-center justify-center overflow-hidden rounded-xl",
        large ? "h-44 sm:h-52" : "h-28",
      ].join(" ")}
    >
      <span
        className={[
          "font-semibold text-fg-primary/80",
          large ? "text-5xl" : "text-3xl",
        ].join(" ")}
      >
        {glyph}
      </span>
    </div>
  );
}

function Badge({ article }: { article: Article }) {
  return (
    <span className="rounded-md border border-border-subtle bg-bg-sunken/60 px-2 py-0.5 text-[11px] font-semibold text-fg-muted">
      {articleCategoryLabels[article.category]}
    </span>
  );
}

function Meta({ article }: { article: Article }) {
  const diff = difficulty(article);
  return (
    <div className="flex items-center gap-2 text-[12px] text-fg-subtle">
      <span>約{article.readingMinutes}分</span>
      <span className="h-1 w-1 rounded-full bg-fg-subtle/50" />
      <span className={diff.tone}>{diff.label}</span>
      {article.affiliate && (
        <>
          <span className="h-1 w-1 rounded-full bg-fg-subtle/50" />
          <span className="text-amber-600 dark:text-amber-400">PR</span>
        </>
      )}
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/learn/${article.category}/${article.slug}`}
      className="learn-card group flex flex-col gap-3 rounded-xl p-4"
    >
      <Thumb article={article} />
      <div className="flex items-center justify-between gap-2">
        <Badge article={article} />
        <Meta article={article} />
      </div>
      <h3 className="text-[16px] font-bold leading-snug text-fg-primary transition group-hover:text-accent">
        {article.title}
      </h3>
      <p className="line-clamp-2 text-[13.5px] leading-6 text-fg-muted">
        {article.description}
      </p>
    </Link>
  );
}

export function LearnBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>({ kind: "all" });

  const sorted = useMemo(() => [...allArticles].sort(byDateDesc), []);

  const tabs = useMemo(() => {
    const counts = (f: Filter) =>
      sorted.filter((a) => matchesFilter(a, f)).length;
    const base: { filter: Filter; label: string; count: number }[] = [
      { filter: { kind: "all" }, label: "すべて", count: sorted.length },
      {
        filter: { kind: "category", value: "security" },
        label: articleCategoryLabels.security,
        count: counts({ kind: "category", value: "security" }),
      },
      {
        filter: { kind: "category", value: "network" },
        label: articleCategoryLabels.network,
        count: counts({ kind: "category", value: "network" }),
      },
    ];
    const topics = orderedTopics.map((t) => ({
      filter: { kind: "topic", value: t } as Filter,
      label: topicLabels[t],
      count: counts({ kind: "topic", value: t }),
    }));
    return [...base, ...topics];
  }, [sorted]);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const results = useMemo(() => {
    return sorted.filter((a) => {
      if (!matchesFilter(a, filter)) return false;
      if (!q) return true;
      const hay = `${a.title} ${a.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [sorted, filter, q]);

  const showFeatured = !searching && filter.kind === "all";
  const featured = showFeatured ? sorted.slice(0, 4) : [];
  const featuredBig = featured[0];
  const featuredSmall = featured.slice(1);
  const featuredSlugs = new Set(featured.map((a) => a.slug));
  const latest = showFeatured
    ? results.filter((a) => !featuredSlugs.has(a.slug))
    : results;

  return (
    <div>
      {/* 検索バー */}
      <div className="mx-auto w-full max-w-[700px]">
        <label className="relative block">
          <span className="sr-only">記事を検索</span>
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事・キーワードで検索…"
            className="h-12 w-full rounded-xl border border-border-subtle bg-bg-elevated/80 pl-11 pr-4 text-[15px] text-fg-primary shadow-sm outline-none transition placeholder:text-fg-subtle focus:border-accent focus:ring-2 focus:ring-accent/25"
          />
        </label>
      </div>

      {/* カテゴリタブ */}
      <div className="mt-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const active = filterId(tab.filter) === filterId(filter);
          return (
            <button
              key={filterId(tab.filter)}
              type="button"
              onClick={() => setFilter(tab.filter)}
              className={[
                "inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3.5 py-2 text-[13px] font-semibold transition",
                active
                  ? "border-accent/40 bg-accent-soft text-accent"
                  : "border-border-subtle bg-bg-elevated/60 text-fg-muted hover:border-border-strong hover:text-fg-primary",
              ].join(" ")}
            >
              {tab.label}
              <span
                className={[
                  "tabular-nums text-[11px]",
                  active ? "text-accent/70" : "text-fg-subtle",
                ].join(" ")}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured */}
      {showFeatured && featuredBig && (
        <section className="mt-12">
          <SectionHeading
            eyebrow="Featured"
            title="注目の記事"
            sub="最近追加・更新された記事をピックアップ。"
          />
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <Link
              href={`/learn/${featuredBig.category}/${featuredBig.slug}`}
              className="learn-card group flex flex-col gap-4 rounded-xl p-5"
            >
              <Thumb article={featuredBig} large />
              <div className="flex items-center justify-between gap-2">
                <Badge article={featuredBig} />
                <Meta article={featuredBig} />
              </div>
              <h3 className="text-[22px] font-bold leading-snug text-fg-primary transition group-hover:text-accent sm:text-[26px]">
                {featuredBig.title}
              </h3>
              <p className="line-clamp-2 text-[14px] leading-7 text-fg-muted">
                {featuredBig.description}
              </p>
            </Link>
            <div className="flex flex-col gap-3">
              {featuredSmall.map((article) => (
                <Link
                  key={article.slug}
                  href={`/learn/${article.category}/${article.slug}`}
                  className="learn-card group flex flex-1 flex-col justify-center gap-2 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge article={article} />
                    <Meta article={article} />
                  </div>
                  <h3 className="text-[15.5px] font-bold leading-snug text-fg-primary transition group-hover:text-accent">
                    {article.title}
                  </h3>
                  <p className="line-clamp-1 text-[13px] leading-6 text-fg-muted">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest / 検索結果 */}
      <section className="mt-12">
        <SectionHeading
          eyebrow={searching ? "Search" : "Latest"}
          title={searching ? `「${query.trim()}」の検索結果` : "最新の記事"}
          sub={
            searching
              ? `${latest.length} 件ヒットしました。`
              : "新しい順。タブで分野を絞り込めます。"
          }
        />
        {latest.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-border-subtle bg-bg-elevated/50 p-10 text-center text-sm text-fg-muted">
            該当する記事が見つかりませんでした。キーワードやタブを変えてお試しください。
          </div>
        )}
      </section>
    </div>
  );
}

function matchesFilter(article: Article, filter: Filter): boolean {
  if (filter.kind === "all") return true;
  if (filter.kind === "category") return article.category === filter.value;
  return getArticleTopics(article.slug).includes(filter.value);
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-accent">
        {eyebrow}
      </div>
      <h2 className="mt-1.5 text-[24px] font-bold leading-tight text-fg-primary sm:text-[28px]">
        {title}
      </h2>
      <p className="mt-1.5 text-[13.5px] leading-6 text-fg-muted">{sub}</p>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
