"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FAVORITE_TOOLS_STORAGE_KEY,
  RECENT_MAX,
  RECENT_STORAGE_KEY,
  entryIdForTool,
  getPopularTools,
  getRelatedTools,
  getToolGuideLinks,
  resolveTools,
  shortcutActions,
  toolsByCategory,
  type WorkspaceTool,
} from "@/lib/tool-workspace";
import { categoryLabels, type ToolCategory } from "@/lib/tools";

const categoryOrder: ToolCategory[] = ["security", "encoding", "network", "misc"];

function readStringArray(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

function writeStringArray(key: string, value: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function ToolWorkspaceSidebar({ slug }: { slug: string }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  const grouped = useMemo(() => toolsByCategory(), []);
  const related = useMemo(() => getRelatedTools(slug), [slug]);
  const popular = useMemo(() => getPopularTools(), []);
  const guideLinks = useMemo(() => getToolGuideLinks(slug), [slug]);
  const actions = shortcutActions[slug] ?? related.slice(0, 3).map((tool) => ({
    label: tool.title,
    href: tool.href,
    hint: tool.useCase,
  }));

  useEffect(() => {
    const id = entryIdForTool(slug);
    const next = [id, ...readStringArray(RECENT_STORAGE_KEY).filter((item) => item !== id)].slice(
      0,
      RECENT_MAX,
    );
    writeStringArray(RECENT_STORAGE_KEY, next);
    setRecentIds(next);
    setFavoriteSlugs(readStringArray(FAVORITE_TOOLS_STORAGE_KEY));
  }, [slug, pathname]);

  useEffect(() => {
    function sync() {
      setRecentIds(readStringArray(RECENT_STORAGE_KEY));
      setFavoriteSlugs(readStringArray(FAVORITE_TOOLS_STORAGE_KEY));
    }
    window.addEventListener("storage", sync);
    window.addEventListener("secutils:workspace-sync", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("secutils:workspace-sync", sync as EventListener);
    };
  }, []);

  const recentTools = useMemo(() => {
    return resolveTools(
      recentIds
        .filter((id) => id.startsWith("tool:"))
        .map((id) => id.replace("tool:", "")),
    ).filter((tool) => tool.slug !== slug);
  }, [recentIds, slug]);

  const favoriteTools = useMemo(() => resolveTools(favoriteSlugs), [favoriteSlugs]);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return Object.values(grouped)
      .flat()
      .filter((tool) => {
        return (
          tool.title.toLowerCase().includes(normalized) ||
          tool.description.toLowerCase().includes(normalized) ||
          tool.useCase.toLowerCase().includes(normalized) ||
          tool.category.toLowerCase().includes(normalized)
        );
      })
      .slice(0, 8);
  }, [grouped, query]);

  const favoriteActive = favoriteSlugs.includes(slug);

  function toggleFavorite() {
    const next = favoriteActive
      ? favoriteSlugs.filter((item) => item !== slug)
      : [slug, ...favoriteSlugs.filter((item) => item !== slug)].slice(0, 12);
    setFavoriteSlugs(next);
    writeStringArray(FAVORITE_TOOLS_STORAGE_KEY, next);
    window.dispatchEvent(new Event("secutils:workspace-sync"));
  }

  function openPalette() {
    window.dispatchEvent(new Event("secutils:open-palette"));
  }

  return (
    <aside className="tool-workspace-sidebar lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="rounded-[28px] border border-border-subtle bg-bg-elevated/72 p-4 shadow-[0_24px_80px_-68px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
              Workspace
            </div>
            <div className="mt-1 text-sm font-semibold text-fg-primary">
              Tool Navigator
            </div>
          </div>
          <button
            type="button"
            onClick={openPalette}
            className="rounded-xl border border-border-subtle bg-bg-sunken/55 px-2.5 py-1.5 text-[11px] font-semibold text-fg-muted transition hover:border-border-strong hover:text-fg-primary"
            title="Command Palette"
          >
            Ctrl K
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools"
            className="h-10 min-w-0 flex-1 rounded-2xl border border-border-subtle bg-bg-sunken/50 px-3 text-sm text-fg-primary outline-none transition placeholder:text-fg-subtle focus:border-border-strong"
          />
          <button
            type="button"
            onClick={toggleFavorite}
            className={[
              "h-10 w-10 rounded-2xl border text-sm transition",
              favoriteActive
                ? "border-accent/45 bg-accent-soft text-accent"
                : "border-border-subtle bg-bg-sunken/50 text-fg-subtle hover:text-fg-primary",
            ].join(" ")}
            aria-pressed={favoriteActive}
            title={favoriteActive ? "お気に入りから外す" : "お気に入りに追加"}
          >
            ★
          </button>
        </div>

        {query.trim() ? (
          <Panel title="Search results" className="mt-4">
            {searchResults.length ? (
              <ToolList tools={searchResults} currentSlug={slug} />
            ) : (
              <p className="px-2 py-3 text-xs text-fg-muted">一致するツールがありません。</p>
            )}
          </Panel>
        ) : (
          <>
            {favoriteTools.length > 0 && (
              <Panel title="Favorites" className="mt-5">
                <ToolList tools={favoriteTools} currentSlug={slug} compact />
              </Panel>
            )}

            {recentTools.length > 0 && (
              <Panel title="Recently used" className="mt-5">
                <ToolList tools={recentTools.slice(0, 4)} currentSlug={slug} compact />
              </Panel>
            )}

            <Panel title="Related tools" className="mt-5">
              <ToolList tools={related} currentSlug={slug} />
            </Panel>

            <Panel title="Shortcut actions" className="mt-5">
              <div className="space-y-2">
                {actions.map((action) => (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className="block rounded-2xl border border-border-subtle bg-bg-sunken/35 px-3 py-2.5 transition hover:border-border-strong hover:bg-bg-elevated/70"
                  >
                    <span className="block text-sm font-semibold text-fg-primary">
                      {action.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-fg-muted">
                      {action.hint}
                    </span>
                  </Link>
                ))}
              </div>
            </Panel>

            {guideLinks.length > 0 && (
              <Panel title="Related guides" className="mt-5">
                <div className="space-y-2">
                  {guideLinks.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="block rounded-2xl px-3 py-2 text-sm font-semibold text-fg-muted transition hover:bg-bg-sunken/50 hover:text-fg-primary"
                    >
                      {guide.title}
                      <span className="ml-2 text-[11px] font-normal text-fg-subtle">
                        {guide.meta}
                      </span>
                    </Link>
                  ))}
                </div>
              </Panel>
            )}

            <Panel title="Popular tools" className="mt-5">
              <ToolList tools={popular.slice(0, 5)} currentSlug={slug} compact />
            </Panel>
          </>
        )}

        <div className="mt-5 hidden border-t border-border-subtle pt-5 lg:block">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
            All tools
          </div>
          <div className="space-y-4">
            {categoryOrder.map((category) => (
              <div key={category}>
                <div className="mb-1.5 text-[11px] font-semibold text-fg-subtle">
                  {categoryLabels[category]}
                </div>
                <ToolList
                  tools={grouped[category]}
                  currentSlug={slug}
                  compact
                  limit={category === "security" ? 6 : 5}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Panel({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={className}>
      <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ToolList({
  tools: list,
  currentSlug,
  compact = false,
  limit,
}: {
  tools: WorkspaceTool[];
  currentSlug: string;
  compact?: boolean;
  limit?: number;
}) {
  const visible = typeof limit === "number" ? list.slice(0, limit) : list;
  return (
    <div className="space-y-1.5">
      {visible.map((tool) => {
        const active = tool.slug === currentSlug;
        return (
          <Link
            key={tool.slug}
            href={tool.href}
            className={[
              "group flex items-center gap-2.5 rounded-2xl px-3 transition",
              compact ? "py-2" : "py-2.5",
              active
                ? "bg-accent-soft text-accent"
                : "text-fg-muted hover:bg-bg-sunken/50 hover:text-fg-primary",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            <span className="flex h-7 min-w-7 items-center justify-center rounded-xl border border-border-subtle bg-bg-base px-1 text-[10px] font-bold">
              {tool.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold">
                {tool.title}
              </span>
              {!compact && (
                <span className="mt-0.5 block truncate text-[11px] text-fg-subtle">
                  {tool.useCase}
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
