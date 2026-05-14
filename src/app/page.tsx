import Link from "next/link";
import { articles } from "@/lib/articles";
import { tools } from "@/lib/tools";
import { HomeHero } from "./_components/HomeHero";
import { SpotlightJWT } from "./_components/SpotlightJWT";
import { ToolUniverse } from "./_components/ToolUniverse";
import { LearningPath } from "./_components/LearningPath";
import { ClosingCta } from "./_components/ClosingCta";

export default function Home() {
  return (
    <>
      <HomeHero toolCount={tools.length} articleCount={articles.length} />

      <WorkflowStory />

      <SpotlightJWT />

      <AtmosphericDivider />

      <ToolUniverse />

      <AtmosphericDivider />

      <LearningPath />

      <AtmosphericDivider />

      <ServerComparisonPromo />

      <ClosingCta />
    </>
  );
}

function AtmosphericDivider() {
  return (
    <div className="relative mx-auto h-20 max-w-7xl px-4 sm:px-6">
      <div className="absolute inset-x-4 top-1/2 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent sm:inset-x-6" />
      <div className="absolute left-1/2 top-1/2 h-24 w-64 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(var(--aurora-b),0.16),transparent)] blur-2xl" />
    </div>
  );
}

function WorkflowStory() {
  const items = [
    ["Capture", "JWT、ハッシュ、Cookie、色、時刻、ネットワーク範囲などを貼り付けます。"],
    ["Inspect", "構造化された結果、注意点、派生値、コピーしやすい出力を確認します。"],
    ["Leave clean", "入力データはローカルに残し、ページは一時的な作業台として使えます。"],
  ];

  return (
    <section className="relative -mt-10 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="glass-panel relative overflow-hidden rounded-[28px] p-4 shadow-[0_34px_110px_-70px_rgba(0,0,0,0.72)] sm:p-5">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-60" />
          <div className="relative grid gap-3 lg:grid-cols-3">
            {items.map(([title, detail], index) => (
              <div key={title} className="story-tile group rounded-3xl px-5 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase text-accent tabular-nums">
                    0{index + 1}
                  </span>
                  <span className="h-px w-16 bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0 opacity-0 transition group-hover:opacity-100" />
                </div>
                <h2 className="mt-5 text-[24px] font-semibold leading-none text-fg-primary sm:text-[30px]">
                  {title}
                </h2>
                <p className="mt-3 text-[13.5px] leading-7 text-fg-muted">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServerComparisonPromo() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="comparison-callout relative overflow-hidden rounded-[32px] ring-1 ring-border-subtle">
          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12 lg:p-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-base/40 px-3 py-1 text-[10.5px] font-semibold uppercase text-fg-muted backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Editorial / Sponsored
              </div>
              <h2 className="mt-5 max-w-3xl text-[36px] font-semibold leading-[0.98] text-fg-primary sm:text-[56px]">
                Hosting decisions,
                <br />
                <span className="text-gradient-accent">without the fog.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-fg-muted">
                Xserver と ConoHa WING を、開発者・ブロガー・はじめての
                WordPress 運用者向けに整理した比較記事です。料金、導線、
                向いているケースを短時間で確認できます。
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
                {["無料お試し", "WordPress 開設", "更新料金", "サポート"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-border-subtle bg-bg-sunken/70 px-2.5 py-1 text-fg-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border-subtle bg-bg-elevated/65 p-4 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-2">
                {["Xserver", "ConoHa", "料金", "適性"].map((label) => (
                  <div key={label} className="rounded-2xl bg-bg-sunken/70 px-4 py-4">
                    <div className="text-[11px] font-semibold uppercase text-fg-subtle">{label}</div>
                    <div className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-accent via-sky-400 to-violet-400" />
                  </div>
                ))}
              </div>
              <Link
                href="/learn/network/xserver-vs-conoha-wing"
                className="magnetic-button mt-4 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-fg-primary px-6 text-[14px] font-semibold text-bg-base"
              >
                比較記事を読む
                <Arrow />
              </Link>
            </div>
          </div>
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
