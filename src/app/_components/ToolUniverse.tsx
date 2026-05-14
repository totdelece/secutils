import Link from "next/link";
import { tools, type Tool, type ToolCategory } from "@/lib/tools";

const FEATURED: [string, string][] = [
  ["jwt-decoder", "認証トークンの中身を、ブラウザから出さずに確認できます。"],
  ["password-generator", "安全なパスワードやパスフレーズを手元で生成できます。"],
  ["hash-generator", "テキストやファイルの指紋をすばやく確認できます。"],
  ["cidr-calculator", "ネットワーク範囲やホスト数を数秒で把握できます。"],
];

const CATEGORIES: { key: ToolCategory; label: string; copy: string }[] = [
  { key: "security", label: "Security", copy: "トークン、ハッシュ、署名、Cookie、認証まわりの確認に。" },
  { key: "encoding", label: "Encoding", copy: "JSON、YAML、URL、Base64、HTML entity、色変換まで。" },
  { key: "network", label: "Network", copy: "CIDR、HTTP ステータス、ネットワーク範囲の整理に。" },
  { key: "misc", label: "Workflow", copy: "正規表現、UUID、cron、時刻、差分、QR コードを素早く。" },
];

function bySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

function tone(category: ToolCategory) {
  return `var(--tone-${category})`;
}

export function ToolUniverse() {
  const featured = FEATURED.map(([slug, copy]) => {
    const tool = bySlug(slug);
    return tool ? { tool, copy } : null;
  }).filter((item): item is { tool: Tool; copy: string } => Boolean(item));

  return (
    <section id="universe" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="text-[11px] font-semibold uppercase text-accent">
              Tool universe
            </div>
            <h2 className="mt-4 max-w-2xl text-[44px] font-semibold leading-[0.96] text-fg-primary sm:text-[64px]">
              A compact lab for the work between commits.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-fg-muted">
              よく使うツールを大きく見せ、用途別の作業導線をその下に整理しました。
              「何をしたいか」から迷わず入れて、必要なツールへすぐ到達できます。
            </p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-2">
              <Stat value={tools.length} label="tools" />
              <Stat value="0" label="uploads" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {featured.map(({ tool, copy }, index) => (
                <FeaturedCard key={tool.slug} tool={tool} copy={copy} index={index + 1} />
              ))}
            </div>

            <div className="glass-panel rounded-[28px] p-3">
              <div className="grid gap-2 md:grid-cols-2">
                {CATEGORIES.map((category) => {
                  const list = tools.filter((tool) => tool.category === category.key).slice(0, 6);
                  return (
                    <CategoryBlock
                      key={category.key}
                      category={category}
                      tools={list}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  tool,
  copy,
  index,
}: {
  tool: Tool;
  copy: string;
  index: number;
}) {
  const color = tone(tool.category);
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="premium-card group relative min-h-[220px] overflow-hidden rounded-[26px] p-5"
      style={{ ["--premium-tone" as unknown as string]: color }}
    >
      <div className="relative flex items-center justify-between">
        <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-bg-base/70 px-2 text-[13px] font-bold text-fg-primary ring-1 ring-border-subtle">
          {tool.icon}
        </span>
        <span className="rounded-full border border-border-subtle bg-bg-sunken/70 px-2.5 py-1 text-[10px] font-semibold uppercase text-fg-subtle">
          #{index} pick
        </span>
      </div>
      <div className="relative mt-8 text-[21px] font-semibold leading-tight text-fg-primary">
        {tool.title}
      </div>
      <p className="relative mt-3 max-w-sm text-[13.5px] leading-7 text-fg-muted">
        {copy}
      </p>
      <div className="relative mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color }}>
        ツールを開く
        <Arrow />
      </div>
    </Link>
  );
}

function CategoryBlock({
  category,
  tools: list,
}: {
  category: { key: ToolCategory; label: string; copy: string };
  tools: Tool[];
}) {
  const color = tone(category.key);
  return (
    <div className="rounded-3xl border border-border-subtle bg-bg-sunken/35 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[17px] font-semibold text-fg-primary">{category.label}</div>
          <p className="mt-1 text-[12.5px] leading-6 text-fg-muted">{category.copy}</p>
        </div>
        <span
          className="h-2.5 w-2.5 rounded-full shadow-[0_0_24px_currentColor]"
          style={{ backgroundColor: color, color }}
        />
      </div>
      <div className="mt-4 grid gap-2">
        {list.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-bg-elevated/65"
          >
            <span className="flex h-8 min-w-8 items-center justify-center rounded-xl bg-bg-base px-1.5 text-[10.5px] font-bold text-fg-secondary ring-1 ring-border-subtle">
              {tool.icon}
            </span>
            <span className="flex-1 truncate text-[13.5px] font-medium text-fg-primary">
              {tool.title}
            </span>
            <Arrow />
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-elevated/55 px-4 py-3 backdrop-blur">
      <div className="numeric-xl text-[30px] font-semibold text-fg-primary">{value}</div>
      <div className="text-[10px] font-semibold uppercase text-fg-subtle">{label}</div>
    </div>
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
