"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  tools,
  categoryLabels,
  categoryDescriptions,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

const CATEGORY_ORDER: ToolCategory[] = [
  "security",
  "encoding",
  "network",
  "misc",
];

const POPULAR = new Set([
  "jwt-decoder",
  "password-generator",
  "hash-generator",
  "json-formatter",
]);

const NEW = new Set(["ulid-generator", "lorem-ipsum"]);

type Filter = ToolCategory | "all";

export function ToolIndex() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (filter !== "all" && tool.category !== filter) return false;
      if (!q) return true;
      const haystack =
        `${tool.title} ${tool.description} ${tool.useCase} ${categoryLabels[tool.category]}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, filter]);

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: filtered.filter((tool) => tool.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="tools" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-fg-primary sm:text-3xl">
              ツール一覧
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              用途で選べる {tools.length} 種類のツール。すべて無料・ブラウザ内で完結します。
            </p>
          </div>
          <span className="text-sm text-fg-subtle tabular-nums">
            {filtered.length} 件を表示
          </span>
        </div>

        {/* search + category filter */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative lg:w-80">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ツール名・用途で検索"
              aria-label="ツールを検索"
              className="h-11 w-full rounded-lg border border-border-strong bg-bg-elevated pl-10 pr-3 text-sm text-fg-primary placeholder:text-fg-subtle outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="すべて"
              count={tools.length}
            />
            {CATEGORY_ORDER.map((category) => (
              <FilterPill
                key={category}
                active={filter === category}
                onClick={() => setFilter(category)}
                label={categoryLabels[category]}
                count={tools.filter((tool) => tool.category === category).length}
              />
            ))}
          </div>
        </div>

        {/* results */}
        {groups.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border-strong bg-bg-elevated p-10 text-center">
            <p className="text-sm font-medium text-fg-primary">
              「{query}」に一致するツールが見つかりませんでした。
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-3 text-sm font-semibold text-accent-strong hover:underline"
            >
              検索条件をリセット
            </button>
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            {groups.map(({ category, items }) => (
              <div key={category}>
                <div className="flex items-baseline gap-3 border-b border-border-subtle pb-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: `var(--tone-${category})` }}
                  />
                  <h3 className="text-base font-semibold text-fg-primary">
                    {categoryLabels[category]}
                  </h3>
                  <span className="text-xs text-fg-subtle tabular-nums">
                    {items.length}
                  </span>
                  <span className="hidden text-xs text-fg-subtle sm:inline">
                    — {categoryDescriptions[category]}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-elevated p-4 transition hover:border-border-strong hover:bg-bg-sunken"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-sunken font-mono text-[11px] font-bold ring-1 ring-border-subtle transition group-hover:ring-border-strong"
        style={{ color: `var(--tone-${tool.category})` }}
      >
        {tool.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-fg-primary">
            {tool.title}
          </span>
          {POPULAR.has(tool.slug) && <Badge label="人気" tone="accent" />}
          {NEW.has(tool.slug) && <Badge label="新着" tone="blue" />}
        </span>
        <span className="mt-1 block text-[13px] leading-5 text-fg-muted">
          {tool.useCase}
        </span>
      </span>
    </Link>
  );
}

function Badge({ label, tone }: { label: string; tone: "accent" | "blue" }) {
  const className =
    tone === "accent"
      ? "border-accent/30 bg-accent-soft text-accent-strong"
      : "border-tone-encoding/30 bg-tone-encoding/10 text-tone-encoding";
  return (
    <span
      className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold leading-none ${className}`}
    >
      {label}
    </span>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition",
        active
          ? "border-fg-primary bg-fg-primary text-bg-base"
          : "border-border-strong bg-bg-elevated text-fg-secondary hover:bg-bg-sunken",
      ].join(" ")}
    >
      {label}
      <span
        className={[
          "text-xs tabular-nums",
          active ? "text-bg-base/70" : "text-fg-subtle",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
