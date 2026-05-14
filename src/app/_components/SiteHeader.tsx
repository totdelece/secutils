"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = { href: string; label: string; match: (path: string) => boolean };

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Tools",
    match: (path) => path === "/" || path.startsWith("/tools"),
  },
  {
    href: "/learn",
    label: "Learn",
    match: (path) => path.startsWith("/learn"),
  },
  {
    href: "/about",
    label: "About",
    match: (path) => path.startsWith("/about"),
  },
];

export function SiteHeader({ toolCount }: { toolCount: number }) {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-bg-overlay backdrop-blur-xl supports-[backdrop-filter]:bg-bg-overlay">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 outline-none"
          aria-label="secutils home"
        >
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-bg-elevated text-[13px] font-bold text-accent ring-1 ring-border-subtle transition group-hover:ring-border-strong">
            <span className="absolute inset-0 rounded-lg bg-accent-soft" />
            <span className="relative">s</span>
          </span>
          <span className="flex items-baseline gap-2">
            <span className="text-[15px] font-semibold tracking-tight text-fg-primary">
              secutils
            </span>
            <span className="hidden text-[11px] font-medium text-fg-subtle tabular-nums sm:inline">
              {toolCount} tools
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {navItems.map((item) => {
            const active = item.match(pathname);
            const hideOnMobile = item.label === "About";
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative inline-flex h-9 items-center rounded-md px-3 font-medium transition-colors",
                  hideOnMobile ? "hidden sm:inline-flex" : "",
                  active
                    ? "text-fg-primary"
                    : "text-fg-muted hover:text-fg-primary",
                ].join(" ")}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                )}
              </Link>
            );
          })}

          <span className="mx-1 hidden h-5 w-px bg-border-subtle sm:inline-block" />

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("secutils:open-palette"))
            }
            aria-label="検索を開く"
            className="hidden h-9 items-center gap-2 rounded-md px-2.5 text-[12px] text-fg-muted ring-1 ring-border-subtle transition hover:bg-bg-elevated hover:text-fg-primary hover:ring-border-strong sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="hidden md:inline">検索</span>
            <span className="inline-flex items-center gap-0.5">
              <span className="rounded border border-border-subtle bg-bg-base px-1 py-0 text-[10px] font-medium">⌘</span>
              <span className="rounded border border-border-subtle bg-bg-base px-1 py-0 text-[10px] font-medium">K</span>
            </span>
          </button>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
