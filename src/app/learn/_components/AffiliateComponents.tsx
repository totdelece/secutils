import type { ReactNode } from "react";

/* ================================================================
 * CTAボタン - ホバー視認性を最優先
 * ================================================================ */
export function CtaButton({
  href,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}) {
  const sizeClass = {
    sm: "text-sm px-4 py-2.5",
    md: "text-base px-5 py-3",
    lg: "text-base sm:text-lg px-7 py-4 font-bold",
  }[size];

  // ホバー時に「明るく + shadow拡大 + わずかに浮く」で視認性確保
  const variantClass = {
    primary:
      "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-amber-500 text-white shadow-md shadow-amber-500/30 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent border-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 hover:shadow-lg hover:-translate-y-0.5",
  }[variant];

  return (
    <a
      href={href}
      rel="nofollow noopener noreferrer"
      target="_blank"
      className={`group inline-flex items-center justify-center gap-2 rounded-lg font-bold no-underline transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/40 ${sizeClass} ${variantClass} ${fullWidth ? "w-full" : ""}`}
    >
      <span>{children}</span>
      <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
    </a>
  );
}

/* ================================================================
 * セクション区切り（VS マーク付き or プレーン）
 * ================================================================ */
export function DividerWithLabel({ label }: { label?: string }) {
  if (!label) {
    return <hr className="my-12 border-0 border-t border-black/10 dark:border-white/15" />;
  }
  return (
    <div className="my-12 flex items-center gap-4 not-prose" aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-black/15 dark:to-white/20" />
      <span className="text-xs font-bold tracking-widest uppercase text-black/40 dark:text-white/50 px-3">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-black/15 dark:to-white/20" />
    </div>
  );
}

/* ================================================================
 * 特徴チップ群（⚡高速 🛡️安定 など）
 * ================================================================ */
type ChipColor = "emerald" | "amber" | "rose" | "blue" | "purple" | "gray";
const chipColors: Record<ChipColor, string> = {
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  rose: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
  blue: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
  purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
  gray: "bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 border-black/10 dark:border-white/15",
};

export function FeatureChip({
  icon,
  children,
  color = "emerald",
}: {
  icon?: ReactNode;
  children: ReactNode;
  color?: ChipColor;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${chipColors[color]}`}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export function FeatureChipsRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2 my-3 not-prose">{children}</div>;
}

/* ================================================================
 * 5段階★レーティング
 * ================================================================ */
export function RatingStars({
  score,
  max = 5,
  showNumber = true,
  size = "md",
}: {
  score: number;
  max?: number;
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const filled = Math.floor(score);
  const half = score - filled >= 0.5;
  const empty = max - filled - (half ? 1 : 0);
  const starSize = { sm: "text-sm", md: "text-base", lg: "text-xl" }[size];

  return (
    <span className={`inline-flex items-center gap-1 not-prose ${starSize}`}>
      <span className="text-amber-400 tracking-tighter" aria-hidden="true">
        {"★".repeat(filled)}
        {half && "⯨"}
        <span className="text-black/15 dark:text-white/20">{"★".repeat(empty)}</span>
      </span>
      {showNumber && (
        <span className="text-xs font-bold text-black/60 dark:text-white/70 ml-1">
          {score.toFixed(1)}
        </span>
      )}
    </span>
  );
}

/* ================================================================
 * 進捗バー風スコア
 * ================================================================ */
export function ScoreBar({
  label,
  score,
  max = 100,
  color = "emerald",
}: {
  label: ReactNode;
  score: number;
  max?: number;
  color?: ChipColor;
}) {
  const percent = Math.min(100, (score / max) * 100);
  const barColor = {
    emerald: "bg-gradient-to-r from-emerald-500 to-emerald-400",
    amber: "bg-gradient-to-r from-amber-500 to-amber-400",
    rose: "bg-gradient-to-r from-rose-500 to-rose-400",
    blue: "bg-gradient-to-r from-blue-500 to-blue-400",
    purple: "bg-gradient-to-r from-purple-500 to-purple-400",
    gray: "bg-gradient-to-r from-gray-500 to-gray-400",
  }[color];

  return (
    <div className="my-2 not-prose">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-black/80 dark:text-white/85">{label}</span>
        <span className="text-xs font-bold text-black/60 dark:text-white/65 font-mono">
          {score}/{max}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-black/8 dark:bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/* ================================================================
 * ランキング/推奨バッジ
 * ================================================================ */
type BadgeStyle = "gold" | "silver" | "bronze" | "recommended" | "limited" | "new";
const badgeStyles: Record<BadgeStyle, string> = {
  gold: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/40",
  silver: "bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-md shadow-slate-500/30",
  bronze: "bg-gradient-to-br from-orange-400 to-amber-700 text-white shadow-md shadow-orange-500/30",
  recommended: "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/40",
  limited: "bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-md shadow-rose-500/40 animate-pulse",
  new: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-500/40",
};

export function RankBadge({
  style = "recommended",
  children,
}: {
  style?: BadgeStyle;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${badgeStyles[style]}`}
    >
      {children}
    </span>
  );
}

/* ================================================================
 * ヒーロー比較カード（記事冒頭用、2社並列の対決感）
 * ================================================================ */
export function HeroComparison({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="my-8 not-prose">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-2 items-stretch">
        <div className="rounded-2xl border-2 border-black/10 dark:border-white/15 bg-background overflow-hidden">
          {left}
        </div>
        <div
          className="hidden md:flex items-center justify-center px-2"
          aria-hidden="true"
        >
          <div className="rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white font-black text-lg w-14 h-14 flex items-center justify-center shadow-lg shadow-rose-500/30">
            VS
          </div>
        </div>
        <div className="rounded-2xl border-2 border-black/10 dark:border-white/15 bg-background overflow-hidden">
          {right}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
 * サーバースコアカード（HeroComparisonの中身、または単独でも使える）
 * ================================================================ */
export function ServerScoreCard({
  name,
  tagline,
  badge,
  rating,
  pricePoint,
  highlights,
  scores,
  cta,
  accent = "emerald",
}: {
  name: string;
  tagline?: string;
  badge?: ReactNode;
  rating: number;
  pricePoint: string;
  highlights: ReactNode[];
  scores: { label: string; score: number; max?: number; color?: ChipColor }[];
  cta: ReactNode;
  accent?: "emerald" | "blue" | "purple" | "amber";
}) {
  const accentBg = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
  }[accent];

  return (
    <div className="flex flex-col h-full">
      {/* ヘッダ：色付きストリップ */}
      <div className={`h-2 ${accentBg}`} />

      <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
        {/* バッジ + 名前 */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight m-0 leading-tight">
              {name}
            </h3>
            {tagline && (
              <p className="text-xs text-black/50 dark:text-white/55 mt-1 m-0">{tagline}</p>
            )}
          </div>
          {badge && <div className="flex-shrink-0">{badge}</div>}
        </div>

        {/* 評価 + 価格 */}
        <div className="flex items-center gap-4 flex-wrap">
          <RatingStars score={rating} size="md" />
          <div className="text-sm">
            <span className="text-xs text-black/50 dark:text-white/55 block leading-tight">
              月額キャンペーン
            </span>
            <span className="font-black text-emerald-700 dark:text-emerald-400 text-lg leading-tight">
              {pricePoint}
            </span>
          </div>
        </div>

        {/* ハイライト */}
        <ul className="space-y-1.5 list-none pl-0 m-0">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-black/80 dark:text-white/85">
              <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* スコアバー群 */}
        {scores.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-black/8 dark:border-white/10">
            {scores.map((s, i) => (
              <ScoreBar
                key={i}
                label={s.label}
                score={s.score}
                max={s.max ?? 100}
                color={s.color}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2">{cta}</div>
      </div>
    </div>
  );
}

/* ================================================================
 * 結論ボックス（既存より強化）
 * ================================================================ */
export function ConclusionBox({
  title = "🎯 結論",
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-8 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-500/15 dark:via-emerald-500/8 p-5 sm:p-7 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-500/25">
        <span className="font-black text-lg text-emerald-700 dark:text-emerald-300">
          {title}
        </span>
      </div>
      <div className="text-sm sm:text-base text-black/85 dark:text-white/90 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

/* ================================================================
 * シナリオカード（現状維持に近いが整理）
 * ================================================================ */
export function ScenarioCard({
  badge,
  title,
  recommended,
  children,
  cta,
}: {
  badge?: ReactNode;
  title?: string;
  recommended: string;
  children: ReactNode;
  cta?: ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border-2 border-black/10 dark:border-white/15 bg-background p-5 sm:p-6 shadow-sm hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 not-prose">
      {badge && (
        <div className="absolute -top-3 left-5">
          {typeof badge === "string" ? (
            <RankBadge style="recommended">{badge}</RankBadge>
          ) : (
            badge
          )}
        </div>
      )}
      {title && (
        <div className="text-xs uppercase tracking-widest text-black/45 dark:text-white/50 mb-1.5 font-mono pt-2">
          {title}
        </div>
      )}
      <div className="text-lg sm:text-xl font-black text-emerald-700 dark:text-emerald-400 mb-3 leading-tight">
        → {recommended}
      </div>
      <div className="text-sm text-black/75 dark:text-white/80 leading-relaxed mb-4 [&_p]:mb-2 [&_p:last-child]:mb-0">
        {children}
      </div>
      {cta && <div>{cta}</div>}
    </div>
  );
}

export function ScenarioGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 not-prose">
      {children}
    </div>
  );
}

/* ================================================================
 * キャンペーン強調ボックス（既存より強化）
 * ================================================================ */
export function CampaignBox({
  title = "🔥 実施中のキャンペーン",
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-8 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-orange-500/10 dark:from-amber-500/20 dark:via-amber-500/8 dark:to-orange-500/15 p-5 sm:p-7 shadow-md shadow-amber-500/10">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-amber-500/30">
        <span className="font-black text-lg text-amber-700 dark:text-amber-300">
          {title}
        </span>
      </div>
      <div className="text-sm sm:text-base text-black/85 dark:text-white/90 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-amber-800 dark:[&_strong]:text-amber-200 [&_strong]:font-black">
        {children}
      </div>
    </div>
  );
}

/* ================================================================
 * メリット・注意点リスト（既存より強化）
 * ================================================================ */
export function ProsConsList({
  pros,
  cons,
}: {
  pros: ReactNode[];
  cons?: ReactNode[];
}) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 not-prose">
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 p-5">
        <div className="font-black text-emerald-700 dark:text-emerald-300 mb-3 text-base flex items-center gap-2 pb-2 border-b border-emerald-500/25">
          <span className="text-lg">✓</span> メリット
        </div>
        <ul className="space-y-2.5 text-sm text-black/85 dark:text-white/90 list-none pl-0 m-0">
          {pros.map((item, i) => (
            <li key={i} className="flex gap-2.5 leading-relaxed">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 font-bold">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {cons && cons.length > 0 && (
        <div className="rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 p-5">
          <div className="font-black text-rose-700 dark:text-rose-300 mb-3 text-base flex items-center gap-2 pb-2 border-b border-rose-500/25">
            <span className="text-lg">⚠</span> 注意点
          </div>
          <ul className="space-y-2.5 text-sm text-black/85 dark:text-white/90 list-none pl-0 m-0">
            {cons.map((item, i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed">
                <span className="text-rose-600 dark:text-rose-400 flex-shrink-0 font-bold">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ================================================================
 * 比較表（デザイン強化版）
 * ================================================================ */
export function ComparisonTable({
  headers,
  rows,
}: {
  headers: ReactNode[];
  rows: { label: ReactNode; cells: ReactNode[]; winnerIndex?: number }[];
}) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border-2 border-black/10 dark:border-white/15 not-prose shadow-sm">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-emerald-500/15 to-emerald-500/8 dark:from-emerald-500/20 dark:to-emerald-500/10 border-b-2 border-emerald-500/40">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left py-4 px-4 sm:px-5 font-black text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-black/8 dark:border-white/10 last:border-b-0 odd:bg-black/[0.025] dark:odd:bg-white/[0.025] hover:bg-emerald-500/5 transition"
            >
              <td className="py-3.5 px-4 sm:px-5 font-bold text-black/85 dark:text-white/90">
                {row.label}
              </td>
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-3.5 px-4 sm:px-5 text-black/80 dark:text-white/85 ${
                    row.winnerIndex === ci
                      ? "bg-emerald-500/15 dark:bg-emerald-500/20 font-bold text-emerald-800 dark:text-emerald-100 relative"
                      : ""
                  }`}
                >
                  {row.winnerIndex === ci && (
                    <span
                      className="absolute top-1 right-1 text-emerald-600 dark:text-emerald-400 text-xs"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================================================================
 * バナー画像枠
 * ================================================================ */
export function BannerSlot({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <div className="my-10 flex flex-col items-center gap-3 not-prose">
      {caption && (
        <div className="text-[10px] text-black/40 dark:text-white/45 font-mono uppercase tracking-widest">
          — {caption} —
        </div>
      )}
      <div className="rounded-2xl border border-black/10 dark:border-white/15 bg-background p-4 sm:p-5 shadow-sm">
        {children}
      </div>
    </div>
  );
}

/* ================================================================
 * セクションタイトル（h2の代替で使用、見出し感を強化）
 * ================================================================ */
export function SectionTitle({
  number,
  children,
}: {
  number?: string | number;
  children: ReactNode;
}) {
  return (
    <h2 className="!mt-12 !mb-6 flex items-center gap-3 not-prose">
      {number !== undefined && (
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-600 text-white font-black text-base shadow-md shadow-emerald-600/30">
          {number}
        </span>
      )}
      <span className="text-2xl sm:text-3xl font-black tracking-tight">
        {children}
      </span>
    </h2>
  );
}

/* ================================================================
 * クイック比較行（特徴チップ + 短い結論を並べた小型カード）
 * ================================================================ */
export function QuickPickRow({
  items,
}: {
  items: {
    icon: ReactNode;
    label: string;
    winner: string;
    color?: ChipColor;
  }[];
}) {
  return (
    <div className="my-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 not-prose">
      {items.map((item, i) => {
        const colorClass = chipColors[item.color ?? "emerald"];
        return (
          <div
            key={i}
            className={`rounded-xl border ${colorClass} p-3 text-center`}
          >
            <div className="text-2xl mb-1" aria-hidden="true">
              {item.icon}
            </div>
            <div className="text-[10px] uppercase tracking-wider opacity-70 font-bold">
              {item.label}
            </div>
            <div className="text-sm font-black mt-1 leading-tight">{item.winner}</div>
          </div>
        );
      })}
    </div>
  );
}
