import Link from "next/link";
import {
  categoryDescriptions,
  categoryLabels,
  tools,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

const FEATURED_SLUGS = [
  "password-generator",
  "jwt-decoder",
  "regex-tester",
  "hash-generator",
  "hmac",
];

const BEGINNER_SLUGS = [
  "base64",
  "url-encoder",
  "html-entity",
  "json-formatter",
  "color-converter",
  "timestamp-converter",
];

const ORDERED: ToolCategory[] = ["security", "encoding", "network", "misc"];

function pick(slugs: string[]): Tool[] {
  return slugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is Tool => Boolean(t));
}

function toneVar(c: ToolCategory) {
  return `var(--tone-${c})`;
}

export function ToolUniverse() {
  const featured = pick(FEATURED_SLUGS);
  const beginner = pick(BEGINNER_SLUGS);

  return (
    <section id="universe" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Tool universe
          </div>
          <h2 className="mt-2 max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-tight text-fg-primary sm:text-[44px]">
            <span className="text-gradient">21 ツール、</span>
            <span className="text-gradient-accent">用途で素早く。</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg-muted">
            やりたい作業から逆引きできるよう、編集部の推薦 / カテゴリ別レーン / 初学者向けの3レイヤーに整理しています。
          </p>
        </header>

        {/* EDITOR'S PICKS */}
        <Lane
          eyebrow="Editor's picks"
          title="まず触れてほしい5つ"
          subtitle="毎日エンジニアが何度も呼ぶ、使用頻度の高いツール。"
        >
          <div className="rail flex gap-3 overflow-x-auto pb-2 sm:gap-4">
            {featured.map((tool, i) => (
              <FeaturedCard key={tool.slug} tool={tool} index={i + 1} />
            ))}
          </div>
        </Lane>
      </div>

      {/* CATEGORY LANES */}
      <div className="mt-16 space-y-14">
        {ORDERED.map((cat) => {
          const list = tools.filter((t) => t.category === cat);
          if (!list.length) return null;
          return (
            <CategoryLane key={cat} category={cat} tools={list} />
          );
        })}
      </div>

      {/* BEGINNER */}
      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <Lane
          eyebrow="Beginner friendly"
          title="今日からブラウザでできること"
          subtitle="技術書を開く前に、まずブラウザで触れる入口たち。"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {beginner.map((tool) => (
              <SmallCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Lane>
      </div>
    </section>
  );
}

function Lane({
  eyebrow,
  title,
  subtitle,
  children,
  href,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-fg-subtle">
            {eyebrow}
          </div>
          <h3 className="mt-1.5 text-[22px] font-semibold tracking-tight text-fg-primary sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1 max-w-2xl text-[13px] text-fg-muted">{subtitle}</p>
        </div>
        {href && (
          <Link
            href={href}
            className="hidden text-[12.5px] font-medium text-fg-muted transition hover:text-fg-primary sm:inline-flex sm:items-center sm:gap-1"
          >
            すべて見る
            <Arrow />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function CategoryLane({
  category,
  tools,
}: {
  category: ToolCategory;
  tools: Tool[];
}) {
  const tone = toneVar(category);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-7 w-1 rounded-full"
            style={{ backgroundColor: tone }}
          />
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-[20px] font-semibold tracking-tight text-fg-primary">
                {categoryLabels[category]}
              </h3>
              <span className="text-[11px] font-medium text-fg-subtle tabular-nums">
                {tools.length} tools
              </span>
            </div>
            <p className="mt-1 max-w-2xl text-[12.5px] text-fg-muted">
              {categoryDescriptions[category]}
            </p>
          </div>
        </div>
      </div>
      <div className="rail flex gap-3 overflow-x-auto pb-2 sm:gap-4">
        {tools.map((tool) => (
          <RailCard key={tool.slug} tool={tool} tone={tone} />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ tool, index }: { tool: Tool; index: number }) {
  const tone = toneVar(tool.category);
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="shine-border lift group relative flex w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl bg-bg-elevated p-5 ring-1 ring-border-subtle sm:w-[320px]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-60"
        style={{ backgroundColor: tone }}
      />
      <div className="relative flex items-center justify-between">
        <span
          className="inline-flex h-12 min-w-12 items-center justify-center rounded-xl px-2.5 text-[13px] font-semibold tracking-tight ring-1 ring-border-subtle"
          style={{
            color: tone,
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tone} 22%, transparent)`,
          }}
        >
          {tool.icon}
        </span>
        <span
          className="rounded-full bg-bg-sunken px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-fg-subtle ring-1 ring-border-subtle tabular-nums"
        >
          #{index} pick
        </span>
      </div>
      <div className="relative mt-5 text-[16px] font-semibold tracking-tight text-fg-primary">
        {tool.title}
      </div>
      <p className="relative mt-1.5 line-clamp-2 text-[13px] leading-6 text-fg-muted">
        {tool.description}
      </p>
      <div className="relative mt-5 flex items-center justify-between text-[12.5px]">
        <span
          className="inline-flex items-center gap-1.5 font-medium"
          style={{ color: tone }}
        >
          <Dot tone={tone} />
          {tool.useCase}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-fg-primary transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
          Open
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

function RailCard({ tool, tone }: { tool: Tool; tone: string }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="shine-border lift group relative flex w-[240px] shrink-0 flex-col rounded-xl bg-bg-elevated p-4 ring-1 ring-border-subtle sm:w-[260px]"
    >
      <div className="flex items-center justify-between">
        <span
          className="inline-flex h-9 min-w-9 items-center justify-center rounded-md px-1.5 text-[11.5px] font-semibold tracking-tight ring-1 ring-border-subtle"
          style={{
            color: tone,
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tone} 22%, transparent)`,
          }}
        >
          {tool.icon}
        </span>
        <ArrowSmall />
      </div>
      <div className="mt-4 text-[14px] font-semibold tracking-tight text-fg-primary">
        {tool.title}
      </div>
      <p className="mt-1.5 line-clamp-2 text-[12px] leading-5 text-fg-muted">
        {tool.useCase}
      </p>
    </Link>
  );
}

function SmallCard({ tool }: { tool: Tool }) {
  const tone = toneVar(tool.category);
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="lift group flex items-center gap-3 rounded-xl bg-bg-elevated px-4 py-3.5 ring-1 ring-border-subtle transition hover:ring-border-strong"
    >
      <span
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-md px-1.5 text-[11px] font-semibold ring-1 ring-border-subtle"
        style={{
          color: tone,
          boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tone} 20%, transparent)`,
        }}
      >
        {tool.icon}
      </span>
      <span className="flex-1 truncate text-[13.5px] font-medium text-fg-primary">
        {tool.title}
      </span>
      <ArrowSmall />
    </Link>
  );
}

function Dot({ tone }: { tone: string }) {
  return (
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 rounded-full"
      style={{ backgroundColor: tone }}
    />
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

function ArrowSmall() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3 w-3 text-fg-subtle transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
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
