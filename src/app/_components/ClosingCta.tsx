"use client";

import Link from "next/link";

export function ClosingCta() {
  const openPalette = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("secutils:open-palette"));
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-overlay px-3.5 py-1.5 text-[11px] font-medium text-fg-secondary backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Bookmark-worthy
        </div>
        <h2 className="mt-6 text-[40px] font-semibold leading-[1.05] tracking-tight text-fg-primary sm:text-[56px]">
          <span className="text-gradient">毎日 1 タブ、</span>
          <br />
          <span className="text-gradient-accent">手元に置いておく。</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-8 text-fg-muted">
          ブックマークすれば、ターミナルを開く前のミリ秒に、必要な道具と知識が揃います。
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openPalette}
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-fg-primary px-6 text-[14px] font-semibold text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_18px_40px_-20px_rgba(0,0,0,0.6)] transition hover:opacity-90"
          >
            <SearchIcon />
            ツールを呼び出す
            <span className="ml-2 inline-flex items-center gap-1">
              <span className="rounded border border-fg-secondary/30 bg-fg-secondary/20 px-1.5 py-0.5 text-[10px] font-medium text-bg-base">
                ⌘
              </span>
              <span className="rounded border border-fg-secondary/30 bg-fg-secondary/20 px-1.5 py-0.5 text-[10px] font-medium text-bg-base">
                K
              </span>
            </span>
          </button>
          <Link
            href="/learn"
            className="inline-flex h-12 items-center gap-1.5 rounded-xl border border-border-subtle bg-bg-elevated px-5 text-[14px] font-medium text-fg-primary transition hover:border-border-strong"
          >
            記事を読む
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
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
