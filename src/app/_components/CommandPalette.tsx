"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { articleCategoryLabels, articles, type Article } from "@/lib/articles";
import { categoryLabels, tools, type Tool } from "@/lib/tools";
import {
  FAVORITE_TOOLS_STORAGE_KEY,
  RECENT_MAX,
  RECENT_STORAGE_KEY,
} from "@/lib/tool-workspace";

type Entry =
  | { kind: "tool"; ref: Tool }
  | { kind: "article"; ref: Article };

function entryHref(entry: Entry) {
  return entry.kind === "tool"
    ? `/tools/${entry.ref.slug}`
    : `/learn/${entry.ref.category}/${entry.ref.slug}`;
}

function entryId(entry: Entry) {
  return `${entry.kind}:${entry.ref.slug}`;
}

function tonalAccent(entry: Entry) {
  if (entry.kind === "article") {
    return entry.ref.category === "security"
      ? "var(--tone-security)"
      : "var(--tone-network)";
  }
  return `var(--tone-${entry.ref.category})`;
}

function entryLabel(entry: Entry) {
  if (entry.kind === "tool") return entry.ref.title;
  return entry.ref.title;
}

function entrySublabel(entry: Entry) {
  if (entry.kind === "tool") {
    return `${categoryLabels[entry.ref.category]} · ${entry.ref.useCase}`;
  }
  return `${articleCategoryLabels[entry.ref.category]} · ${entry.ref.readingMinutes ?? 5} min`;
}

function entryGlyph(entry: Entry) {
  if (entry.kind === "tool") return entry.ref.icon;
  return "¶";
}

const allEntries: Entry[] = [
  ...tools.map((t): Entry => ({ kind: "tool", ref: t })),
  ...articles.map((a): Entry => ({ kind: "article", ref: a })),
];

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
  } catch {
    /* ignore */
  }
  return [];
}

function saveRecent(id: string) {
  if (typeof window === "undefined") return;
  try {
    const cur = loadRecent().filter((x) => x !== id);
    cur.unshift(id);
    window.localStorage.setItem(
      RECENT_STORAGE_KEY,
      JSON.stringify(cur.slice(0, RECENT_MAX)),
    );
    window.dispatchEvent(new Event("secutils:workspace-sync"));
  } catch {
    /* ignore */
  }
}

function loadFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(FAVORITE_TOOLS_STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(parsed)
      ? parsed.filter((value) => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Listen for ⌘K / Ctrl+K and custom open event
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !open) {
        const t = e.target as HTMLElement | null;
        const tag = (t?.tagName || "").toLowerCase();
        if (tag !== "input" && tag !== "textarea" && !t?.isContentEditable) {
          e.preventDefault();
          setOpen(true);
        }
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    function onCustom() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("secutils:open-palette", onCustom as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(
        "secutils:open-palette",
        onCustom as EventListener,
      );
    };
  }, [open]);

  // Body scroll lock + focus + load recent
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setRecent(loadRecent());
    setFavorites(loadFavorites());
    setQuery("");
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allEntries.slice(0, 0); // empty → don't show "results", we'll show recent + browse instead
    return allEntries
      .filter((e) => {
        if (e.kind === "tool") {
          const t = e.ref;
          return (
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.useCase.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
          );
        }
        const a = e.ref;
        return (
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
        );
      })
      .slice(0, 18);
  }, [query]);

  const recentEntries: Entry[] = useMemo(() => {
    return recent
      .map((id) => allEntries.find((e) => entryId(e) === id))
      .filter((e): e is Entry => Boolean(e));
  }, [recent]);

  const favoriteEntries: Entry[] = useMemo(() => {
    return favorites
      .map((slug) => allEntries.find((e) => e.kind === "tool" && e.ref.slug === slug))
      .filter((e): e is Entry => Boolean(e));
  }, [favorites]);

  // Linearized list for keyboard nav
  const list: Entry[] = useMemo(() => {
    if (query.trim()) return results;
    const fallback = tools.slice(0, 8).map((t): Entry => ({ kind: "tool", ref: t }));
    const merged = [...favoriteEntries, ...recentEntries, ...fallback];
    return merged.filter(
      (entry, index, array) =>
        array.findIndex((candidate) => entryId(candidate) === entryId(entry)) ===
        index,
    );
  }, [query, results, favoriteEntries, recentEntries]);

  const go = useCallback(
    (entry: Entry) => {
      saveRecent(entryId(entry));
      setOpen(false);
      router.push(entryHref(entry));
    },
    [router],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active into view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(list.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = list[activeIndex];
      if (target) go(target);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="コマンドパレット"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
    >
      <button
        type="button"
        aria-label="閉じる"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <div
        className="shine-border relative w-full max-w-xl overflow-hidden rounded-2xl bg-bg-elevated ring-1 ring-border-subtle shadow-2xl"
        style={{
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.55), 0 0 0 1px var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-3 border-b border-border-subtle px-4">
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="ツール、記事、カテゴリで検索…"
            aria-label="検索"
            autoComplete="off"
            spellCheck={false}
            className="h-14 flex-1 bg-transparent text-[15px] text-fg-primary outline-none placeholder:text-fg-subtle"
          />
          <span className="hidden items-center gap-1 text-[10px] font-medium text-fg-subtle sm:flex">
            <span className="kbd">ESC</span>
          </span>
        </div>

        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto px-2 py-2"
        >
          {!query.trim() && favoriteEntries.length > 0 && (
            <SectionHeader>Favorites / Recent / Popular</SectionHeader>
          )}
          {!query.trim() && favoriteEntries.length === 0 && recentEntries.length > 0 && (
            <SectionHeader>Recent / Popular</SectionHeader>
          )}
          {!query.trim() && favoriteEntries.length === 0 && recentEntries.length === 0 && (
            <SectionHeader>Popular</SectionHeader>
          )}
          {query.trim() && (
            <SectionHeader>
              {results.length} {results.length === 1 ? "result" : "results"}
            </SectionHeader>
          )}

          {list.length === 0 ? (
            <div className="px-3 py-12 text-center text-sm text-fg-muted">
              「{query}」に一致するツール / 記事は見つかりません
            </div>
          ) : (
            <div role="listbox">
              {list.map((entry, i) => {
                const active = i === activeIndex;
                const accent = tonalAccent(entry);
                return (
                  <button
                    key={entryId(entry)}
                    data-index={i}
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => go(entry)}
                    className={[
                      "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition",
                      active
                        ? "bg-bg-sunken"
                        : "hover:bg-bg-sunken/60",
                    ].join(" ")}
                  >
                    <span
                      className="inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-[11px] font-semibold ring-1 ring-border-subtle"
                      style={{
                        color: accent,
                        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 22%, transparent)`,
                      }}
                    >
                      {entryGlyph(entry)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-fg-primary">
                        {entryLabel(entry)}
                      </span>
                      <span className="block truncate text-[12px] text-fg-muted">
                        {entrySublabel(entry)}
                      </span>
                    </span>
                    <span
                      className={[
                        "ml-2 text-[10px] font-medium uppercase tracking-wider",
                        active ? "text-fg-primary" : "text-fg-subtle",
                      ].join(" ")}
                    >
                      {entry.kind}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border-subtle bg-bg-sunken/60 px-4 py-2.5 text-[11px] text-fg-subtle">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="kbd">↑</span>
              <span className="kbd">↓</span>
              <span>navigate</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="kbd">↵</span>
              <span>open</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5">
            <span>powered by</span>
            <span className="font-medium text-fg-secondary">secutils</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
      {children}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 text-fg-subtle"
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
