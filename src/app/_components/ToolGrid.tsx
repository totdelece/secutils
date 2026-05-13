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

const toneVar: Record<ToolCategory, string> = {
  security: "var(--tone-security)",
  encoding: "var(--tone-encoding)",
  network: "var(--tone-network)",
  misc: "var(--tone-misc)",
};

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
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ツールを検索  例: JWT、JSON、パスワード"
            aria-label="ツールを検索"
            className="h-11 w-full rounded-lg border border-border-subtle bg-bg-elevated pl-10 pr-20 text-sm text-fg-primary outline-none transition placeholder:text-fg-subtle focus:border-border-strong focus:ring-2 focus:ring-accent/30"
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              aria-label="検索をクリア"
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-fg-subtle transition hover:bg-bg-sunken hover:text-fg-primary"
            >
              ×
            </button>
          ) : (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 text-[11px] font-medium text-fg-subtle sm:inline-flex"
            >
              <kbd className="rounded border border-border-subtle bg-bg-base px-1.5 py-0.5 font-sans tabular-nums">⌘</kbd>
              <kbd className="rounded border border-border-subtle bg-bg-base px-1.5 py-0.5 font-sans">K</kbd>
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(["all", ...ORDERED] as Filter[]).map((category) => {
            const active = filter === category;
            const label = category === "all" ? "All" : categoryLabels[category];
            const count =
              category === "all"
                ? tools.length
                : tools.filter((tool) => tool.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                aria-pressed={active}
                className={[
                  "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium transition",
                  active
                    ? "bg-fg-primary text-bg-base"
                    : "bg-bg-elevated text-fg-muted ring-1 ring-border-subtle hover:text-fg-primary hover:ring-border-strong",
                ].join(" ")}
              >
                {label}
                <span
                  className={[
                    "tabular-nums text-[10px]",
                    active ? "opacity-70" : "text-fg-subtle",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border-subtle bg-bg-elevated/40 py-16 text-center">
          <p className="text-sm font-medium text-fg-primary">
            該当するツールが見つかりません。
          </p>
          <p className="mt-1 text-xs text-fg-muted">
            別のキーワード、もしくはカテゴリを試してください。
          </p>
          <button
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
            className="mt-5 inline-flex h-9 items-center rounded-md border border-border-subtle bg-bg-elevated px-3 text-xs font-medium text-fg-primary transition hover:border-border-strong"
          >
            条件をリセット
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {ORDERED.map((category) => {
            const list = grouped[category];
            if (!list.length) return null;
            return (
              <section key={category}>
                <div className="mb-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: toneVar[category] }}
                      />
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-secondary">
                        {categoryLabels[category]}
                      </h3>
                      <span className="text-[11px] font-medium text-fg-subtle tabular-nums">
                        {list.length}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-xl text-sm text-fg-muted">
                      {categoryDescriptions[category]}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} tone={toneVar[tool.category]} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {isFiltered && filtered.length > 0 && (
        <div className="mt-8 text-center text-xs text-fg-subtle tabular-nums">
          {tools.length}件中 {filtered.length}件
        </div>
      )}
    </>
  );
}

function ToolCard({ tool, tone }: { tool: Tool; tone: string }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="shine-border group relative flex h-full flex-col overflow-hidden rounded-xl bg-bg-elevated p-5 ring-1 ring-border-subtle transition-all duration-200 hover:-translate-y-0.5 hover:ring-border-strong motion-reduce:transform-none motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${tone}, transparent)`,
        }}
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-2 text-[12px] font-semibold tracking-tight ring-1 ring-border-subtle"
          style={{
            color: tone,
            backgroundColor: "color-mix(in oklab, var(--bg-elevated) 88%, transparent)",
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tone} 18%, transparent)`,
          }}
        >
          {tool.icon}
        </span>
        <span className="rounded-full bg-bg-sunken px-2 py-1 text-[10px] font-medium text-fg-muted ring-1 ring-border-subtle">
          {tool.useCase}
        </span>
      </div>

      <div className="mt-5 text-[15px] font-semibold tracking-tight text-fg-primary">
        {tool.title}
      </div>
      <p className="mt-2 flex-1 text-[13px] leading-6 text-fg-muted">
        {tool.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
          {categoryLabels[tool.category]}
        </span>
        <span
          className="inline-flex items-center gap-1 text-[13px] font-medium text-fg-primary transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
          aria-hidden="true"
        >
          開く
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
