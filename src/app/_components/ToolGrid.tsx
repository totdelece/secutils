"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
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
    return tools.filter((t) => {
      if (filter !== "all" && t.category !== filter) return false;
      if (q && !`${t.title} ${t.description}`.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [tools, filter, query]);

  const grouped = useMemo(() => {
    const g: Record<ToolCategory, Tool[]> = {
      security: [],
      encoding: [],
      network: [],
      misc: [],
    };
    for (const t of filtered) g[t.category].push(t);
    return g;
  }, [filtered]);

  const isFiltered = filter !== "all" || query !== "";

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ツール名・説明で検索..."
            aria-label="ツール検索"
            className="w-full bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2.5 pl-9 outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
            autoComplete="off"
            spellCheck={false}
          />
          <span
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 text-sm pointer-events-none"
          >
            🔍
          </span>
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="検索をクリア"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-foreground text-sm w-6 h-6 rounded flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1 rounded-lg border border-black/10 dark:border-white/10 p-1 bg-black/5 dark:bg-white/5">
          {(["all", ...ORDERED] as Filter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1 rounded text-xs font-medium transition ${
                filter === c
                  ? "bg-emerald-600 text-white"
                  : "text-black/70 dark:text-white/70 hover:text-foreground"
              }`}
            >
              {c === "all" ? "All" : categoryLabels[c]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-black/40 dark:text-white/40 text-sm">
          該当するツールが見つかりません
          <div className="mt-3">
            <button
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
              className="text-xs px-3 py-1.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              フィルタをクリア
            </button>
          </div>
        </div>
      ) : (
        ORDERED.map((cat) => {
          const list = grouped[cat];
          if (!list.length) return null;
          return (
            <section key={cat} className="mb-10">
              <h2 className="text-sm font-mono uppercase tracking-widest text-black/50 dark:text-white/50 mb-4">
                {categoryLabels[cat]}{" "}
                <span className="text-black/30 dark:text-white/30 normal-case font-sans tracking-normal">
                  ({list.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition"
                  >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <div className="font-semibold mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                      {tool.title}
                    </div>
                    <div className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                      {tool.description}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}

      {isFiltered && filtered.length > 0 && (
        <div className="text-xs text-black/40 dark:text-white/40 text-center mt-2">
          {filtered.length} / {tools.length} 件を表示中
        </div>
      )}
    </>
  );
}
