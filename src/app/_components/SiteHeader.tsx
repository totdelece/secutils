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

          <a
            href="https://github.com/totdelece/secutils"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-fg-muted ring-1 ring-transparent transition hover:bg-bg-elevated hover:text-fg-primary hover:ring-border-subtle sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
