"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { learningPaths, getArticleBySlug, type Article } from "@/lib/articles";
import { getReadSlugs } from "@/lib/read-progress";

type ResolvedPath = {
  id: string;
  title: string;
  description: string;
  level: string;
  steps: Article[];
  totalMinutes: number;
};

const resolved: ResolvedPath[] = learningPaths.map((path) => {
  const steps = path.steps
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => Boolean(a));
  return {
    id: path.id,
    title: path.title,
    description: path.description,
    level: path.level,
    steps,
    totalMinutes: steps.reduce((sum, a) => sum + a.readingMinutes, 0),
  };
});

export function LearningPaths() {
  const [read, setRead] = useState<Set<string>>(new Set());

  useEffect(() => {
    setRead(getReadSlugs());
  }, []);

  return (
    <section className="mt-24">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-accent">
        Learning Paths
      </div>
      <h2 className="mt-1.5 text-[24px] font-bold leading-tight text-fg-primary sm:text-[28px]">
        学習ロードマップ
      </h2>
      <p className="mt-1.5 max-w-2xl text-[13.5px] leading-7 text-fg-secondary">
        何から読めばいいか迷ったらここから。番号順に読むと一つのテーマを通して理解できます。
        進捗はこのブラウザ内だけに保存されます。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {resolved.map((path) => {
          const done = path.steps.filter((a) => read.has(a.slug)).length;
          const total = path.steps.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const complete = done === total && total > 0;

          return (
            <div
              key={path.id}
              className="learn-card flex flex-col gap-4 rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[17px] font-bold text-fg-primary">
                    {path.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-fg-secondary">
                    {path.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-accent/30 bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                  {path.level}
                </span>
              </div>

              {/* メタ + 進捗バー */}
              <div>
                <div className="flex items-center justify-between text-[12px] text-fg-subtle">
                  <span>
                    {total} 記事 · 約{path.totalMinutes}分
                  </span>
                  <span
                    className={
                      complete
                        ? "font-semibold text-accent"
                        : "tabular-nums text-fg-muted"
                    }
                  >
                    {complete ? "完了" : `${done}/${total} 読了`}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-sunken">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <ol className="flex flex-col gap-1.5">
                {path.steps.map((article, i) => {
                  const isRead = read.has(article.slug);
                  return (
                    <li key={article.slug}>
                      <Link
                        href={`/learn/${article.category}/${article.slug}`}
                        className="group flex items-center gap-3 rounded-lg border border-transparent px-2.5 py-2 transition hover:border-border-subtle hover:bg-bg-sunken/50"
                      >
                        <span
                          className={[
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[12px] font-bold tabular-nums ring-1 transition",
                            isRead
                              ? "bg-accent text-bg-base ring-accent"
                              : "bg-bg-sunken text-fg-muted ring-border-subtle group-hover:text-accent",
                          ].join(" ")}
                        >
                          {isRead ? <CheckIcon /> : i + 1}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-fg-secondary transition group-hover:text-fg-primary">
                          {article.title}
                        </span>
                        <span className="shrink-0 text-[11px] text-fg-subtle">
                          約{article.readingMinutes}分
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
