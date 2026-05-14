"use client";

import Link from "next/link";

export function ClosingCta() {
  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("secutils:open-palette"));
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-36">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-overlay px-3.5 py-1.5 text-[11px] font-semibold uppercase text-fg-secondary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent ring-pulse" />
            One tab. No residue.
          </div>
          <h2 className="mt-7 text-[46px] font-semibold leading-[0.94] text-fg-primary sm:text-[76px]">
            Keep the toolkit close.
            <span className="block text-gradient-accent">Keep the data local.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-fg-muted">
            secutils は、毎日の確認作業を静かに支えるインフラのような存在を
            目指しています。速く、プライベートで、必要なときにすぐ呼び出せる
            ツールキットです。
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openPalette}
              className="magnetic-button inline-flex h-[52px] items-center gap-2 rounded-2xl bg-fg-primary px-6 text-[14px] font-semibold text-bg-base shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_24px_70px_-28px_rgba(0,0,0,0.75)]"
            >
              <SearchIcon />
              コマンドセンター
            </button>
            <Link
              href="/learn"
              className="glass-button inline-flex h-[52px] items-center gap-2 rounded-2xl px-6 text-[14px] font-semibold text-fg-primary"
            >
              記事を読む
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
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
