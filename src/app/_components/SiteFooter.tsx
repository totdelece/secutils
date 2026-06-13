import Link from "next/link";
import { author } from "@/lib/author";

type FooterGroup = {
  label: string;
  links: { href: string; label: string; external?: boolean }[];
};

const groups: FooterGroup[] = [
  {
    label: "Product",
    links: [
      { href: "/", label: "Tools" },
      { href: "/learn", label: "Learn" },
      { href: "/about", label: "About" },
      { href: author.profilePath, label: "Author" },
      { href: "/feed.xml", label: "RSS", external: true },
    ],
  },
  {
    label: "Categories",
    links: [
      { href: "/#tools", label: "Security" },
      { href: "/#tools", label: "Encoding" },
      { href: "/#tools", label: "Network" },
      { href: "/#tools", label: "Productivity" },
    ],
  },
  {
    label: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/contact", label: "Contact" },
      {
        href: "https://github.com/totdelece/secutils",
        label: "GitHub",
        external: true,
      },
    ],
  },
];

export function SiteFooter({
  toolCount,
  articleCount,
}: {
  toolCount: number;
  articleCount: number;
}) {
  return (
    <footer className="mt-24 border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,_1fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-bg-elevated text-[13px] font-bold text-accent ring-1 ring-border-subtle">
                <span className="absolute inset-0 rounded-lg bg-accent-soft" />
                <span className="relative">s</span>
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-fg-primary">
                secutils
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-fg-muted">
              Privacy-first developer toolkit. すべてのツールはブラウザ内で動作し、入力データはサーバーに送信されません。
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-medium text-fg-subtle">
              <span className="inline-flex items-center gap-1 rounded-full bg-bg-elevated px-2.5 py-1 ring-1 ring-border-subtle tabular-nums">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {toolCount} tools
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-bg-elevated px-2.5 py-1 ring-1 ring-border-subtle tabular-nums">
                {articleCount} articles
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-bg-elevated px-2.5 py-1 ring-1 ring-border-subtle">
                Browser-only
              </span>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.label}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                {group.label}
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {group.links.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg-muted transition-colors hover:text-fg-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-fg-muted transition-colors hover:text-fg-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-subtle pt-6 text-[12px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 secutils — built for engineers.</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-accent" />
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
