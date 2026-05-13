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

      <SectionDivider />

      <SpotlightJWT />

      <SectionDivider />

      <ToolUniverse />

      <SectionDivider />

      <LearningPath />

      <SectionDivider />

      <ServerComparisonPromo />

      <ClosingCta />
    </>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
  );
}

function ServerComparisonPromo() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="shine-border relative overflow-hidden rounded-3xl bg-bg-elevated ring-1 ring-border-subtle">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(var(--aurora-a),0.40), transparent 70%)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(var(--aurora-b),0.30), transparent 70%)",
            }}
          />
          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_auto] lg:items-center lg:gap-10 lg:p-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-base/60 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-fg-muted backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Editorial · Sponsored
              </div>
              <h2 className="mt-5 max-w-2xl text-[30px] font-semibold leading-[1.08] tracking-tight text-fg-primary sm:text-[40px]">
                <span className="text-gradient">エックスサーバー vs ConoHa WING、</span>
                <br />
                <span className="text-gradient-accent">3 秒で判断する。</span>
              </h2>
              <p className="mt-4 max-w-xl text-[14.5px] leading-7 text-fg-muted">
                無料お試し、WordPress 開設、長期運用、料金の見方まで 6 軸で比較。条件付きで「合わないケース」も明記しています。
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
                {["10日間お試し", "WordPress導線", "更新料金の確認", "サポート"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-border-subtle bg-bg-sunken px-2.5 py-1 text-fg-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/learn/network/xserver-vs-conoha-wing"
              className="group inline-flex h-12 items-center justify-center gap-2 self-start rounded-xl bg-fg-primary px-6 text-[14px] font-semibold text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_18px_40px_-20px_rgba(0,0,0,0.6)] transition hover:opacity-90 lg:self-auto"
            >
              比較記事を読む
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
