"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  categoryDescriptions,
  categoryLabels,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

type Filter = ToolCategory | "all";

const ORDERED: ToolCategory[] = ["security", "encoding", "network", "misc"];

export function ToolGrid({ tools }: { tools: Tool[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (filter !== "all" && tool.category !== filter) return false;
      if (!q) return true;
      return `${tool.title} ${tool.description} ${tool.useCase} ${tool.category}`
        .toLowerCase()
        .includes(q);
    });
  }, [tools, filter, query]);

  const grouped = useMemo(() => {
    const groups: Record<ToolCategory, Tool[]> = {
      security: [],
      encoding: [],
      network: [],
      misc: [],
    };
    for (const tool of filtered) groups[tool.category].push(tool);
    return groups;
  }, [filtered]);

  const isFiltered = filter !== "all" || query.trim() !== "";

  return (
    <>
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例: JWT、JSON、パスワード、サブネット"
              aria-label="ツールを検索"
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 pl-10 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-400"
              autoComplete="off"
              spellCheck={false}
            />
            <span
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
            >
              ⌕
            </span>
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="検索をクリア"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {(["all", ...ORDERED] as Filter[]).map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`h-9 rounded-md px-3 text-xs font-semibold transition ${
                  filter === category
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
                }`}
              >
                {category === "all" ? "All" : categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/60 py-12 text-center dark:border-white/15 dark:bg-white/[0.03]">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            該当するツールが見つかりません。
          </p>
          <button
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
            className="mt-4 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-white/15 dark:text-slate-300"
          >
            条件をリセット
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {ORDERED.map((category) => {
            const list = grouped[category];
            if (!list.length) return null;
            return (
              <section key={category}>
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-950 dark:text-white">
                      {categoryLabels[category]}
                      <span className="ml-2 text-xs font-medium text-slate-400">
                        {list.length}
                      </span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {categoryDescriptions[category]}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group flex min-h-48 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-emerald-400"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <span className="flex h-11 min-w-11 items-center justify-center rounded-md bg-slate-100 px-2 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                          {tool.icon}
                        </span>
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                          {tool.useCase}
                        </span>
                      </div>
                      <div className="font-bold text-slate-950 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                        {tool.title}
                      </div>
                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {tool.description}
                      </p>
                      <span className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        開く →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {isFiltered && filtered.length > 0 && (
        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          {tools.length}件中 {filtered.length}件を表示中
        </div>
      )}
    </>
  );
}
