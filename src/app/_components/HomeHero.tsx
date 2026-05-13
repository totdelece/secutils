"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

const TAGS = [
  { label: "JWT", slug: "jwt-decoder" },
  { label: "Hash", slug: "hash-generator" },
  { label: "Password", slug: "password-generator" },
  { label: "Regex", slug: "regex-tester" },
  { label: "CIDR", slug: "cidr-calculator" },
  { label: "JSON", slug: "json-formatter" },
  { label: "Cron", slug: "cron-parser" },
  { label: "UUID", slug: "uuid-generator" },
];

export function HomeHero({
  toolCount,
  articleCount,
}: {
  toolCount: number;
  articleCount: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }, []);

  const openPalette = useCallback(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("secutils:open-palette"));
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={onMove}
      className="cursor-glow relative overflow-hidden"
      style={{ ["--mx" as unknown as string]: "50%", ["--my" as unknown as string]: "30%" }}
    >
      {/* aurora orbs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(var(--aurora-a),0.45), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(var(--aurora-c),0.40), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[70%] h-[24rem] w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(var(--aurora-b),0.30), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 pb-24 text-center sm:px-6 sm:pt-28 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="rise-in inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-overlay px-3.5 py-1.5 text-[11px] font-medium text-fg-secondary backdrop-blur">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent ring-pulse" />
            <span className="absolute inset-0 rounded-full bg-accent" />
          </span>
          The developer&apos;s privacy-first toolkit
        </div>

        <h1 className="rise-in rise-in-d1 mt-8 max-w-[18ch] text-[clamp(44px,8vw,96px)] font-semibold leading-[0.98] tracking-[-0.04em] text-fg-primary">
          <span className="text-gradient">Everything you need.</span>
          <br />
          <span className="text-gradient-accent">Nothing leaves your browser.</span>
        </h1>

        <p className="rise-in rise-in-d2 mt-7 max-w-[58ch] text-pretty text-[15px] leading-7 text-fg-muted sm:text-[16px] sm:leading-8">
          JWT、ハッシュ、CIDR、JSON、Regex、TOTP、Bcrypt——
          エンジニアが毎日触れる {toolCount} のツールと、その仕組みを 5 分で読める {articleCount} 本の解説を、ひとつのキーボードショートカットの向こうに。
        </p>

        <button
          type="button"
          onClick={openPalette}
          className="rise-in rise-in-d3 group mt-10 flex w-full max-w-xl items-center gap-3 rounded-2xl border border-border-subtle bg-bg-elevated/85 px-4 py-3.5 text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:border-border-strong hover:bg-bg-elevated motion-reduce:transform-none"
        >
          <SearchIcon />
          <span className="flex-1 text-[15px] text-fg-subtle">
            ツールを検索…
            <span className="hidden text-fg-subtle/70 sm:inline">
              {" "}
              例: JWT, 強いパスワード, ハッシュ
            </span>
          </span>
          <span className="hidden items-center gap-1 sm:flex">
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
          </span>
        </button>

        <div className="rise-in rise-in-d4 mt-6 flex flex-wrap items-center justify-center gap-1.5">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.16em] text-fg-subtle">
            Quick
          </span>
          {TAGS.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tools/${tag.slug}`}
              className="inline-flex h-7 items-center rounded-full border border-border-subtle bg-bg-elevated/70 px-3 text-[12px] font-medium text-fg-muted transition hover:border-border-strong hover:text-fg-primary"
            >
              {tag.label}
            </Link>
          ))}
        </div>

        <div className="rise-in rise-in-d5 mt-14 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-4">
          <Cell value={toolCount} label="tools" />
          <Cell value={articleCount} label="guides" />
          <Cell value="100%" label="browser-only" />
          <Cell value="0" label="trackers" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="path-line absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}

function Cell({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-bg-base/80 px-4 py-5 backdrop-blur">
      <span className="numeric-xl text-[28px] font-semibold text-fg-primary sm:text-[32px]">
        {value}
      </span>
      <span className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </span>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] text-fg-subtle transition group-hover:text-fg-secondary"
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
