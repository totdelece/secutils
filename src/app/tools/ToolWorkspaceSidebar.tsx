"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  RECENT_MAX,
  RECENT_STORAGE_KEY,
  entryIdForTool,
  toolsByCategory,
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
  const grouped = toolsByCategory();

  useEffect(() => {
    const id = entryIdForTool(slug);
    const next = [id, ...readStringArray(RECENT_STORAGE_KEY).filter((item) => item !== id)].slice(
      0,
      RECENT_MAX,
    );
    writeStringArray(RECENT_STORAGE_KEY, next);
    window.dispatchEvent(new Event("secutils:workspace-sync"));
  }, [slug, pathname]);

  return (
    <aside className="tool-workspace-sidebar lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[28px] border border-border-subtle bg-bg-elevated/72 p-4 shadow-[0_24px_80px_-68px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
              Workspace
            </div>
            <div className="mt-1 text-sm font-semibold text-fg-primary">
              All tools
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("secutils:open-palette"))}
            className="rounded-xl border border-border-subtle bg-bg-sunken/55 px-2.5 py-1.5 text-[11px] font-semibold text-fg-muted transition hover:border-border-strong hover:text-fg-primary"
            title="Command Palette"
          >
            Ctrl K
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {categoryOrder.map((category) => (
            <section key={category}>
              <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                {categoryLabels[category]}
              </h2>
              <div className="space-y-1.5">
                {grouped[category].map((tool) => {
                  const active = tool.slug === slug;
                  return (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      className={[
                        "group flex items-center gap-2.5 rounded-2xl px-3 py-2.5 transition",
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
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
}
