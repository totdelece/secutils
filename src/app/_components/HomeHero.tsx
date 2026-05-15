"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

const QUICK_ACTIONS = [
  { label: "JWT をデコード", slug: "jwt-decoder", tone: "var(--tone-security)" },
  { label: "パスワードを生成", slug: "password-generator", tone: "var(--tone-security)" },
  { label: "JSON を整形", slug: "json-formatter", tone: "var(--tone-encoding)" },
  { label: "CIDR を計算", slug: "cidr-calculator", tone: "var(--tone-network)" },
];

const FLOW_NODES = ["input", "decode", "local", "clean"];

const TRUST_SIGNALS = [
  ["Local first", "すべての処理はブラウザ内で完結"],
  ["Zero tracking", "入力データをサーバーへ送信しない設計"],
  ["Instant", "キーボードからすぐ呼び出せる作業面"],
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
    window.dispatchEvent(new CustomEvent("secutils:open-palette"));
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={onMove}
      className="hero-stage relative isolate overflow-hidden"
      style={{ ["--mx" as unknown as string]: "50%", ["--my" as unknown as string]: "32%" }}
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="packet-field" aria-hidden="true">
        <span className="packet-line packet-line-a" />
        <span className="packet-line packet-line-b" />
        <span className="packet-line packet-line-c" />
      </div>
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[800px] max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:min-h-[880px] sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pt-16">
        <div className="relative z-10 max-w-4xl">
          <div className="rise-in inline-flex items-center gap-2 rounded-full border border-white/12 bg-bg-overlay/65 px-3.5 py-1.5 text-[11px] font-semibold uppercase text-fg-secondary shadow-[0_12px_40px_-24px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <span className="h-1.5 w-1.5 rounded-full bg-accent ring-pulse" />
            Privacy-first developer toolkit
          </div>

          <h1 className="rise-in rise-in-d1 mt-9 max-w-[9.5ch] text-[68px] font-semibold leading-[0.84] text-fg-primary sm:text-[96px] lg:text-[132px]">
            Tools with
            <span className="block text-gradient-accent">zero residue.</span>
          </h1>

          <p className="rise-in rise-in-d2 mt-7 max-w-2xl text-[16px] leading-8 text-fg-muted sm:text-[18px] sm:leading-9">
            secutils は、JWT の確認、パスワード生成、ハッシュ計算、
            CIDR 計算などをひとつの静かな作業面にまとめた
            ブラウザ完結型の開発者ツールです。機密データを外へ出さず、
            必要な確認だけをすばやく終わらせられます。
          </p>

          <div className="rise-in rise-in-d3 mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openPalette}
              className="magnetic-button cta-bloom group inline-flex h-[56px] items-center justify-center gap-2 rounded-2xl bg-fg-primary px-7 text-[14px] font-semibold text-bg-base shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_24px_70px_-28px_rgba(0,0,0,0.75)] transition"
            >
              <SearchIcon />
              コマンドセンターを開く
              <span className="ml-2 hidden items-center gap-1 sm:inline-flex">
                <span className="rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px]">Ctrl</span>
                <span className="rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px]">K</span>
              </span>
            </button>
            <Link
              href="#universe"
              className="glass-button group inline-flex h-[56px] items-center justify-center gap-2 rounded-2xl px-6 text-[14px] font-semibold text-fg-primary"
            >
              {toolCount} 個のツールを見る
              <Arrow />
            </Link>
          </div>

          <div className="rise-in rise-in-d4 mt-12 grid max-w-2xl gap-2 sm:grid-cols-3">
            {TRUST_SIGNALS.map(([title, detail]) => (
              <div key={title} className="hero-proof rounded-2xl px-4 py-3">
                <div className="text-[13px] font-semibold text-fg-primary">{title}</div>
                <div className="mt-1 text-[11.5px] leading-5 text-fg-subtle">{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rise-in rise-in-d3 relative z-10 lg:translate-y-8">
          <div className="orbit-shell relative mx-auto w-full max-w-[520px]">
            <div className="secure-halo" aria-hidden="true" />
            <div className="command-card glass-panel live-console relative overflow-hidden rounded-[30px] p-4 shadow-[0_42px_120px_-50px_rgba(0,0,0,0.8)]">
              <div className="console-scan" aria-hidden="true" />
              <div className="mb-4 flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase text-fg-subtle">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_18px_currentColor]" />
                  local processing
                </span>
              </div>

              <div className="secure-flow mb-4 rounded-2xl border border-border-subtle bg-bg-sunken/45 p-3">
                <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase text-fg-subtle">
                  <span>encrypted flow</span>
                  <span>no egress</span>
                </div>
                <div className="relative flex items-center justify-between gap-2">
                  <span className="flow-beam" aria-hidden="true" />
                  {FLOW_NODES.map((node, index) => (
                    <span key={node} className="flow-node">
                      <span className="relative z-10">{index + 1}</span>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={openPalette}
                className="group flex w-full items-center gap-3 rounded-2xl border border-border-subtle bg-bg-sunken/70 px-4 py-3.5 text-left transition hover:border-border-strong hover:bg-bg-elevated/70"
              >
                <SearchIcon />
                <span className="typing-query flex-1 text-[14px] text-fg-muted">jwt payload を確認</span>
                <span className="kbd">K</span>
              </button>

              <div className="mt-4 space-y-2">
                {QUICK_ACTIONS.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/tools/${item.slug}`}
                    className="tool-row group flex items-center gap-3 rounded-2xl px-3 py-3 transition"
                    style={{ ["--row-tone" as unknown as string]: item.tone }}
                  >
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-bg-base text-[12px] font-bold text-fg-primary ring-1 ring-border-subtle">
                      <span className="absolute inset-0 rounded-xl opacity-20" style={{ backgroundColor: item.tone }} />
                      <span className="relative">{String(index + 1).padStart(2, "0")}</span>
                    </span>
                    <span className="flex-1">
                      <span className="block text-[14px] font-semibold text-fg-primary">{item.label}</span>
                      <span className="block text-[11.5px] text-fg-subtle">ブラウザ内だけで完結</span>
                    </span>
                    <Arrow />
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <Metric value={toolCount} label="tools" />
                <Metric value={articleCount} label="guides" />
              </div>

              <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-border-subtle bg-bg-sunken/45 px-3.5 py-3 text-[11px] text-fg-subtle">
                <span className="truncate font-mono">payload never leaves device</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
                  <LockIcon />
                  sealed
                </span>
              </div>
            </div>

            <div className="floating-chip chip-a">JWT decoded</div>
            <div className="floating-chip chip-b">通信なし</div>
            <div className="floating-chip chip-c">SHA-256 ready</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-sunken/50 px-4 py-3">
      <div className="numeric-xl text-[28px] font-semibold text-fg-primary">{value}</div>
      <div className="text-[10px] font-semibold uppercase text-fg-subtle">{label}</div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}
