import type { ReactNode } from "react";

/**
 * 結論ボックス：記事冒頭の「先出しの答え」を目立たせる枠。
 * emerald系のアクセント + 左側にバー。
 */
export function ConclusionBox({
  title = "🎯 結論",
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-r-lg border-l-4 border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 p-5">
      <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-2 text-base">
        {title}
      </div>
      <div className="text-sm sm:text-base text-black/80 dark:text-white/85 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

/**
 * CTAボタン：アフィリエイトリンクを目立たせるボタン。
 * solid（メイン誘導）と outline（サブ誘導）の2種類。
 */
export function CtaButton({
  href,
  children,
  variant = "solid",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-3",
    lg: "text-base sm:text-lg px-6 py-3.5 font-bold",
  }[size];

  const variantClass =
    variant === "solid"
      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg"
      : "border-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10";

  return (
    <a
      href={href}
      rel="nofollow noopener noreferrer"
      target="_blank"
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition no-underline ${sizeClass} ${variantClass}`}
    >
      {children}
    </a>
  );
}

/**
 * シナリオカード：「あなたが○○なら→このサーバー」というカード型UI。
 * グリッドで並べる前提。
 */
export function ScenarioCard({
  badge,
  title,
  recommended,
  children,
  cta,
}: {
  badge?: string;
  title: string;
  recommended: string;
  children: ReactNode;
  cta?: ReactNode;
}) {
  return (
    <div className="relative rounded-xl border-2 border-black/10 dark:border-white/15 bg-background p-5 shadow-sm hover:border-emerald-500/40 hover:shadow-md transition">
      {badge && (
        <div className="absolute -top-3 left-4 rounded-full bg-emerald-600 text-white text-xs font-bold px-3 py-1 shadow-md">
          {badge}
        </div>
      )}
      <div className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50 mb-1 font-mono">
        {title}
      </div>
      <div className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
        → {recommended}
      </div>
      <div className="text-sm text-black/75 dark:text-white/80 leading-relaxed mb-3 [&_p]:mb-0">
        {children}
      </div>
      {cta && <div className="mt-3">{cta}</div>}
    </div>
  );
}

/**
 * シナリオカードのグリッド配置用ラッパー。
 */
export function ScenarioGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
      {children}
    </div>
  );
}

/**
 * キャンペーン強調ボックス：時限性のあるキャンペーン情報を目立たせる。
 * amber系（オレンジ寄り）で「期間限定」感を演出。
 */
export function CampaignBox({
  title = "🔥 実施中のキャンペーン",
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-lg border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-orange-500/5 dark:from-amber-500/15 dark:to-orange-500/10 p-5">
      <div className="font-bold text-amber-700 dark:text-amber-300 mb-2.5 text-base">
        {title}
      </div>
      <div className="text-sm sm:text-base text-black/85 dark:text-white/85 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-amber-800 dark:[&_strong]:text-amber-200">
        {children}
      </div>
    </div>
  );
}

/**
 * メリット・注意点リスト：✓と⚠を色分けで並べる。
 */
export function ProsConsList({
  pros,
  cons,
}: {
  pros: ReactNode[];
  cons?: ReactNode[];
}) {
  return (
    <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 p-4">
        <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-2 text-sm">
          ✓ メリット
        </div>
        <ul className="space-y-1.5 text-sm text-black/80 dark:text-white/85 list-none pl-0">
          {pros.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                ●
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {cons && cons.length > 0 && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 p-4">
          <div className="font-bold text-rose-700 dark:text-rose-300 mb-2 text-sm">
            ⚠ 注意点
          </div>
          <ul className="space-y-1.5 text-sm text-black/80 dark:text-white/85 list-none pl-0">
            {cons.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-rose-600 dark:text-rose-400 flex-shrink-0">
                  ●
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * 比較表（デザイン強化版）：ヘッダ色付け + 偶数行ストライプ + 「勝者」ハイライト対応。
 * 子要素の `<th>` `<td>` には特別な属性を付けず、winner マークだけ各 td 内で `data-winner="true"` などを使うか、
 * 利用側で個別に bg を付ける方針。
 */
export function ComparisonTable({
  headers,
  rows,
}: {
  headers: ReactNode[];
  /** 各行: [ラベル, ...各社の値]。winnerIndex を渡すと該当列をハイライト */
  rows: { label: ReactNode; cells: ReactNode[]; winnerIndex?: number }[];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-black/10 dark:border-white/15 not-prose">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-emerald-500/10 dark:bg-emerald-500/15 border-b-2 border-emerald-500/30">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left py-3 px-4 font-bold text-emerald-800 dark:text-emerald-200"
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
              className="border-b border-black/5 dark:border-white/10 last:border-b-0 odd:bg-black/[0.02] dark:odd:bg-white/[0.02]"
            >
              <td className="py-3 px-4 font-semibold text-black/85 dark:text-white/90">
                {row.label}
              </td>
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-3 px-4 text-black/80 dark:text-white/80 ${
                    row.winnerIndex === ci
                      ? "bg-emerald-500/10 dark:bg-emerald-500/15 font-semibold text-emerald-800 dark:text-emerald-200"
                      : ""
                  }`}
                >
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

/**
 * バナー画像枠：A8のバナー型素材を貼り付ける用のラッパー。
 * 中央寄せ + 余白 + ボーダー。
 * children に `<a><img></a>` 等のHTMLをそのまま渡す想定。
 */
export function BannerSlot({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <div className="my-8 flex flex-col items-center gap-2 not-prose">
      {caption && (
        <div className="text-xs text-black/50 dark:text-white/50 font-mono uppercase tracking-wider">
          {caption}
        </div>
      )}
      <div className="rounded-lg border border-black/10 dark:border-white/15 bg-background p-3 shadow-sm">
        {children}
      </div>
    </div>
  );
}
