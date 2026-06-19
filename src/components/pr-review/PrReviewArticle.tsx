import type { ReactNode } from "react";

/* =======================================================================
   PR記事 共通テンプレート（単体レビュー型）
   ・白背景＋青(#2563eb)のコンバージョン特化LP風（サイト本体テーマとは別系統）
   ・新しいPR記事は src/lib/articles.ts に登録し、page.tsx で
       <PrReviewArticle data={...} /> にデータ(props)を渡すだけで同じ見た目になる。
   ・デザイン分岐は持たせない（記事ごとに見た目を変えない）のが設計憲法。
   ・Server Component のまま（onClick 等のイベントハンドラは使わない）。
     metadata は同階層の layout.tsx に置くこと。
   ・preview を渡すと広告枠・任意バナーの「枠」を可視化する（/pr-preview 用）。
   ======================================================================= */

// ---- デザイントークン -----------------------------------------------------
const BLUE = "#2563eb";

// ---- データ型（記事ごとに差し替えるのはここだけ）-------------------------

/** ラベルと値の組（スペックカード・早見表で使用） */
export type SpecItem = { label: string; value: string };
/** 特徴カード */
export type FeatureItem = { icon: string; title: string; desc: string };
/** メリット・デメリットの1項目 */
export type ProConItem = { title: string; note: string };
/** 料金プラン */
export type PlanItem = {
  name: string;
  /** 月額（税込）の数値部分。変動が激しく確定できない場合は省略可（→「公式で確認」表示） */
  price?: string;
  /** price の単位。例: "月"・"月〜"。price 省略時は不要 */
  per?: string;
  note: string;
  popular?: boolean;
  /** おすすめプランのラベル（既定: "おすすめ"）。"人気No.1"等の断定は根拠がある時だけ */
  badge?: string;
};
/** A8等のアフィリエイト画像バナー（クリックリンク＋成果計測ピクセル） */
export type BannerAd = {
  /** クリック先（a8mat 入りのリンクURL） */
  href: string;
  /** バナー画像URL（A8の bgt 画像など） */
  src: string;
  /** 成果計測用の1×1 gif（任意・A8推奨） */
  pixel?: string;
  width: number;
  height: number;
  alt?: string;
};
/** 利用シーン・活用例 */
export type UseCaseItem = { icon: string; title: string; text: string };
/** FAQ 1問 */
export type FaqItem = { q: string; a: string };
/** 評価の内訳（5点満点の軸別スコア） */
export type ScoreAxis = { label: string; score: number };
/** 外部リンク（参考情報） */
export type LinkItem = { label: string; href: string };

export type PrReviewData = {
  /** 商品名（見出し・リンク文言に差し込む）。例: "サンプルVPN" */
  productName: string;
  /** CTAボタン・公式リンクの遷移先（アフィリエイトURL）。プレビューでは "#" */
  affiliateUrl: string;
  /** CTAテキストリンクの成果計測ピクセル（A8の 0.gif など）。任意。ページに1度だけ埋める */
  impressionPixel?: string;
  /** ヒーローのカテゴリバッジ（2つ目=青, 3つ目=緑）。例: ["VPN徹底レビュー", "2026年最新"] */
  categoryBadges?: [string, string];
  /** 情報の基準日。例: "2026年6月"。ヒーローのバッジと末尾の免責に差し込む */
  lastUpdated?: string;

  // --- ヒーロー ---
  title: string;
  /** タイトル末尾を青で強調する部分（任意）。例: "メリット・デメリット" */
  titleAccent?: string;
  lead: string;
  /** 評価（score は "4.8" のような文字列。★は score に応じた割合で表示） */
  rating: { score: string; outOf?: string; note?: string };
  /** ファーストビューの要点（✓箇条書き・3つ程度推奨） */
  heroPoints?: string[];
  /** ヒーロー下の任意バナー（A8画像バナー等）。null ならプレビューでは点線枠、本番では非表示 */
  heroBanner?: BannerAd | null;
  /** スマホ用ヒーローバナー（任意。あればSP幅で差し替え。例: 320×50） */
  heroBannerMobile?: BannerAd;
  /** CTA直下に出す安心材料の一言。例: "30日間返金保証つき・登録は最短2分" */
  ctaNote?: string;

  // --- 各セクション ---
  /** ヒーロー直下のスペックカード（5枚想定） */
  specs: SpecItem[];
  /** 「こんな人におすすめ」緑カードの箇条書き */
  recommendedFor: string[];
  /** 評価の内訳（軸別5点満点・任意）。あると説得力が大きく上がる */
  scoreBreakdown?: ScoreAxis[];
  /** 基本スペック早見表（ゼブラ） */
  overview: SpecItem[];
  features: FeatureItem[];
  pros: ProConItem[];
  cons: ProConItem[];
  /** 料金プランの上に出す期間限定キャンペーン枠（任意） */
  campaign?: { title: string; body: string; deadline?: string };
  plans: PlanItem[];
  /** 料金プラン直後に出す任意のアフィリエイト画像バナー */
  midBanner?: BannerAd;
  useCases: UseCaseItem[];
  faqs: FaqItem[];
  finalRating: {
    score: string;
    metrics: SpecItem[];
    /** 最終評価の総括文（ReactNode 可。<strong> 等を含められる） */
    summary: ReactNode;
  };
  /** 参考にした公式情報など（任意・末尾に表示） */
  references?: LinkItem[];
};

// ---- 内部パーツ -----------------------------------------------------------

/** score(0〜5) に応じて金色の★を部分表示する誠実な星評価 */
function StarRating({ value, className }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span
      className={`relative inline-block whitespace-nowrap leading-none ${className ?? ""}`}
      role="img"
      aria-label={`5点満点中 ${value} 点`}
    >
      <span className="text-[#e5e7eb]">★★★★★</span>
      <span className="absolute inset-0 overflow-hidden text-[#f59e0b]" style={{ width: `${pct}%` }} aria-hidden>
        ★★★★★
      </span>
    </span>
  );
}

/** A8等のアフィリエイト画像バナー（クリックリンク＋成果計測ピクセル）を原寸表示 */
function BannerAdImage({ ad }: { ad: BannerAd }) {
  return (
    <span className="relative inline-block">
      <a
        href={ad.href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="block transition hover:opacity-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ad.src}
          alt={ad.alt ?? ""}
          width={ad.width}
          height={ad.height}
          className="h-auto max-w-full rounded-lg"
        />
      </a>
      {ad.pixel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ad.pixel}
          width={1}
          height={1}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        />
      )}
    </span>
  );
}

/** 広告枠。preview のときだけプレースホルダを表示（本番=AdSense未承認のため非表示） */
function AdSlot({
  w,
  h,
  label,
  preview,
}: {
  w: number;
  h: number;
  label: string;
  preview?: boolean;
}) {
  // 本番では何も描画しない。AdSense 承認後にここを実広告ユニットへ差し替える。
  if (!preview) return null;
  return (
    <div className="my-16 flex justify-center">
      <div className="flex w-full flex-col items-center rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-5 shadow-sm">
        <span className="mb-3 text-[11px] font-medium tracking-wide text-[#9ca3af]">スポンサーリンク</span>
        <div
          className="flex items-center justify-center rounded-md bg-[#f1f5f9] text-xs font-medium text-[#94a3b8]"
          style={{ width: "100%", maxWidth: w, height: h }}
        >
          広告枠 {label}（{w}×{h}）
        </div>
      </div>
    </div>
  );
}

/** 青いCTAボタン（高さ60px・幅100%）。アフィリエイトURLへ */
function CtaButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="flex h-[60px] w-full items-center justify-center gap-2 rounded-2xl bg-[#2563eb] text-[17px] font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-[#1d4ed8]"
    >
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}

/** CTAボタン＋安心材料＋アフィリエイト表記をまとめたブロック */
function Cta({
  href,
  label,
  note,
  affiliateNote,
  className = "mt-8",
}: {
  href: string;
  label: string;
  note?: string;
  affiliateNote?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <CtaButton href={href} label={label} />
      {note && (
        <p className="mt-2.5 text-center text-[13px] font-bold text-[#16a34a]">
          ＼ {note} ／
        </p>
      )}
      {affiliateNote && (
        <p className="mt-2 text-center text-xs text-[#9ca3af]">
          ※ 当サイトはアフィリエイト広告を利用しています
        </p>
      )}
    </div>
  );
}

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-5 mt-12 scroll-mt-24 border-l-4 pl-3 text-[24px] font-bold leading-tight text-[#1f2937] sm:text-[28px]"
      style={{ borderColor: BLUE }}
    >
      {children}
    </h2>
  );
}

// ---- 本体 -----------------------------------------------------------------

export function PrReviewArticle({
  data,
  preview = false,
}: {
  data: PrReviewData;
  preview?: boolean;
}) {
  const { affiliateUrl, productName } = data;
  const [badgeB, badgeC] = data.categoryBadges ?? ["レビュー", "最新版"];
  const ratingValue = Number.parseFloat(data.rating.score) || 5;
  const finalValue = Number.parseFloat(data.finalRating.score) || 5;

  // 目次（存在するセクションだけ並べる）
  const toc = [
    data.scoreBreakdown && { id: "review-score", label: "編集部の総合評価" },
    { id: "overview", label: `${productName} 基本スペック早見表` },
    { id: "features", label: "特徴" },
    { id: "pros", label: "メリット" },
    { id: "cons", label: "デメリット" },
    { id: "plans", label: "料金プラン" },
    { id: "usecases", label: "利用シーン・活用例" },
    { id: "faq", label: "よくある質問" },
    { id: "verdict", label: "最終評価" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <div className="bg-white text-[#1f2937]" style={{ fontSize: 17, lineHeight: 1.9 }}>
      <div className="mx-auto w-full max-w-[1100px] px-5 py-10 sm:px-6">
        <article className="mx-auto w-full max-w-[800px]">

          {/* ① ファーストビュー（ヒーロー） ----------------------------- */}
          <header className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-gradient-to-br from-[#eff6ff] to-white p-7 shadow-sm sm:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: BLUE }}>PR</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#2563eb] ring-1 ring-[#bfdbfe]">{badgeB}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#16a34a] ring-1 ring-[#bbf7d0]">{badgeC}</span>
              {data.lastUpdated && (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#6b7280] ring-1 ring-[#e5e7eb]">
                  {data.lastUpdated}時点
                </span>
              )}
            </div>

            <h1 className="mt-4 text-[26px] font-bold leading-[1.45] text-[#1f2937] sm:text-[34px]">
              {data.title}
              {data.titleAccent && (
                <>
                  {" "}
                  <span style={{ color: BLUE }}>{data.titleAccent}</span>
                </>
              )}
            </h1>

            <p className="mt-4 text-[15px] leading-relaxed text-[#4b5563] sm:text-base">{data.lead}</p>

            {/* 評価（誠実な部分星＋編集部評価ラベル） */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <StarRating value={ratingValue} className="text-xl" />
                <span className="text-[15px] font-bold text-[#1f2937]">
                  {data.rating.score}
                  <span className="text-sm font-normal text-[#6b7280]">/{data.rating.outOf ?? "5.0"}</span>
                </span>
                <span className="rounded bg-[#eff6ff] px-2 py-0.5 text-[11px] font-bold text-[#2563eb]">編集部評価</span>
              </div>
              {data.rating.note && <span className="text-sm text-[#6b7280]">{data.rating.note}</span>}
            </div>

            {/* ファーストビューの要点 */}
            {data.heroPoints && data.heroPoints.length > 0 && (
              <ul className="mt-5 space-y-2 rounded-2xl bg-white/70 p-4 ring-1 ring-[#dbeafe]">
                {data.heroPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[15px] font-medium text-[#1f2937]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[11px] font-bold" style={{ color: BLUE }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            {/* 任意バナー: heroBanner があれば原寸表示。なければ preview では点線枠、本番では非表示 */}
            {data.heroBanner ? (
              <div className="mt-6 flex justify-center">
                {data.heroBannerMobile ? (
                  <>
                    <span className="sm:hidden">
                      <BannerAdImage ad={data.heroBannerMobile} />
                    </span>
                    <span className="hidden sm:inline-block">
                      <BannerAdImage ad={data.heroBanner} />
                    </span>
                  </>
                ) : (
                  <BannerAdImage ad={data.heroBanner} />
                )}
              </div>
            ) : preview ? (
              <div className="mt-6 flex aspect-[16/6] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#bfdbfe] bg-white/60 text-center">
                <span className="text-sm font-bold text-[#60a5fa]">バナー画像（任意）</span>
                <span className="mt-1 text-xs text-[#93c5fd]">あればここにはめ込み／なければ自動で非表示</span>
              </div>
            ) : null}
          </header>

          {/* スペックカード（モバイル2列・PC5列で全カード可視） */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {data.specs.map((s) => (
              <div key={s.label} className="flex flex-col items-center rounded-2xl border border-[#e5e7eb] bg-white px-3 py-4 text-center shadow-sm">
                <span className="text-xs text-[#6b7280]">{s.label}</span>
                <span className="mt-1 text-[15px] font-bold text-[#1f2937]">{s.value}</span>
              </div>
            ))}
          </div>

          {/* CTA① */}
          <Cta href={affiliateUrl} label="公式サイトで最新料金を確認する" note={data.ctaNote} affiliateNote />

          {/* 目次（JS不要のアンカーリンク） */}
          <nav aria-label="目次" className="mt-10 rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-5">
            <p className="flex items-center gap-2 text-[15px] font-bold text-[#1f2937]">
              <span aria-hidden>📑</span> この記事の内容
            </p>
            <ol className="mt-3 flex flex-col divide-y divide-[#eef2f7]">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="flex items-baseline gap-2.5 py-2 text-[15px] text-[#374151] hover:text-[#2563eb] hover:underline">
                    <span className="text-xs font-bold text-[#9ca3af]">{String(i + 1).padStart(2, "0")}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* バナー：728×90（FV直後） */}
          <AdSlot w={728} h={90} label="ファーストビュー直後" preview={preview} />

          {/* ② 結論カード（緑） ----------------------------------------- */}
          {/* mt-10: 本番では上の広告枠が非表示(null)になるため、目次との間隔をここで確保 */}
          <section className="mt-10 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-6">
            <h2 className="flex items-center gap-2 text-[20px] font-bold text-[#16a34a]">
              ✅ こんな人におすすめ
            </h2>
            <ul className="mt-4 space-y-2">
              {data.recommendedFor.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-[#16a34a]">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-1 rounded-xl border-2 bg-white px-5 py-2.5 text-sm font-bold transition-colors hover:bg-[#eff6ff]"
              style={{ borderColor: BLUE, color: BLUE }}
            >
              {productName}公式サイトを見る →
            </a>
          </section>

          {/* CTA（結論カード直後） */}
          <Cta href={affiliateUrl} label="今すぐ無料で試してみる" className="mt-6" />

          {/* ②.5 編集部の総合評価（軸別スコア・任意） -------------------- */}
          {data.scoreBreakdown && data.scoreBreakdown.length > 0 && (
            <>
              <H2 id="review-score">編集部の総合評価</H2>
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="shrink-0 text-center">
                    <div className="text-[44px] font-bold leading-none" style={{ color: BLUE }}>{data.rating.score}</div>
                    <div className="text-xs text-[#9ca3af]">/ 5.0</div>
                    <StarRating value={ratingValue} className="mt-2 text-base" />
                  </div>
                  <div className="w-full flex-1 space-y-3">
                    {data.scoreBreakdown.map((a) => (
                      <div key={a.label}>
                        <div className="flex items-center justify-between text-[13px] font-bold text-[#4b5563]">
                          <span>{a.label}</span>
                          <span style={{ color: BLUE }}>{a.score.toFixed(1)}</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#eef2ff]">
                          <div className="h-2 rounded-full" style={{ width: `${(a.score / 5) * 100}%`, background: BLUE }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 概要比較表 ------------------------------------------------- */}
          <H2 id="overview">{productName} 基本スペック早見表</H2>
          <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
            {data.overview.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${i % 2 === 1 ? "bg-[#f8fafc]" : "bg-white"}`}
              >
                <span className="text-sm font-bold text-[#6b7280]">{row.label}</span>
                <span className="text-right text-[15px] font-bold text-[#1f2937]">{row.value}</span>
              </div>
            ))}
          </div>

          {/* ③ 特徴（モバイル1列・PC2列） ------------------------------- */}
          <H2 id="features">{productName}の特徴</H2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eff6ff] text-2xl">{f.icon}</div>
                <h3 className="mt-3 text-[17px] font-bold text-[#1f2937]">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* ④ メリット（緑・区切り線） --------------------------------- */}
          <H2 id="pros">メリット</H2>
          <section className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] px-6 py-2">
            <ul className="divide-y divide-[#bbf7d0]">
              {data.pros.map((p) => (
                <li key={p.title} className="flex gap-3 py-5">
                  <span className="mt-0.5 text-lg text-[#16a34a]">✓</span>
                  <span>
                    <strong className="text-[17px] font-bold text-[#1f2937]">{p.title}</strong>
                    <span className="mt-1.5 block text-sm leading-relaxed text-[#4b5563]">{p.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA（メリット直後） */}
          <Cta href={affiliateUrl} label={`${productName}を公式サイトでチェック`} className="mt-6" />

          {/* バナー：300×250（メリット直後） */}
          <AdSlot w={300} h={250} label="メリット直後" preview={preview} />

          {/* ⑤ デメリット（薄オレンジ） --------------------------------- */}
          <H2 id="cons">デメリット</H2>
          <section className="rounded-2xl border border-[#fed7aa] bg-[#fff8f0] px-6 py-2">
            <ul className="divide-y divide-[#fed7aa]">
              {data.cons.map((c) => (
                <li key={c.title} className="flex gap-3 py-5">
                  <span className="mt-0.5 text-[#ea580c]">⚠</span>
                  <span>
                    <strong className="text-[17px] font-bold text-[#1f2937]">{c.title}</strong>
                    <span className="mt-1.5 block text-sm leading-relaxed text-[#4b5563]">{c.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ⑥ 料金プラン ----------------------------------------------- */}
          <H2 id="plans">料金プラン</H2>

          {/* 期間限定キャンペーン（任意） */}
          {data.campaign && (
            <div className="mb-5 overflow-hidden rounded-2xl border-2 border-[#fcd34d] bg-[#fffbeb]">
              <div className="px-4 py-2 text-center text-xs font-bold text-white" style={{ background: "#f59e0b" }}>
                🎁 期間限定キャンペーン{data.campaign.deadline ? `（${data.campaign.deadline}まで）` : ""}
              </div>
              <div className="p-5 text-center">
                <p className="text-[17px] font-bold text-[#1f2937]">{data.campaign.title}</p>
                <p className="mt-1 text-sm text-[#4b5563]">{data.campaign.body}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.plans.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl bg-white p-5 text-center shadow-sm ${p.popular ? "border-2" : "border border-[#e5e7eb]"}`}
                style={p.popular ? { borderColor: BLUE } : undefined}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: "#f59e0b" }}>
                    {p.badge ?? "おすすめ"}
                  </span>
                )}
                <span className="text-sm font-bold text-[#1f2937]">{p.name}</span>
                {p.price ? (
                  <span className="mt-3 text-[32px] font-bold" style={{ color: p.popular ? BLUE : "#1f2937" }}>
                    ¥{p.price}
                    {p.per && <span className="text-sm font-normal text-[#6b7280]">/{p.per}</span>}
                  </span>
                ) : (
                  <span className="mt-3 text-[15px] font-bold text-[#6b7280]">料金は公式サイトで確認</span>
                )}
                <span className="mt-2 text-xs text-[#6b7280]">{p.note}</span>
                {p.popular && (
                  <a href={affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="mt-4 flex h-12 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: BLUE }}>
                    このプランを見る →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA（料金プラン直後・最重要） */}
          <Cta href={affiliateUrl} label="公式サイトで申し込む" note={data.ctaNote} affiliateNote />

          {/* 任意のアフィリエイトバナー（料金直後） */}
          {data.midBanner && (
            <div className="mt-8 flex justify-center rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-5">
              <BannerAdImage ad={data.midBanner} />
            </div>
          )}

          {/* バナー：728×90（料金表直後） */}
          <AdSlot w={728} h={90} label="料金表直後" preview={preview} />

          {/* ⑦ 利用シーン・活用例 --------------------------------------- */}
          <H2 id="usecases">利用シーン・活用例</H2>
          <p className="mt-2 text-[15px] text-[#4b5563]">
            {productName}はこんな場面で役立ちます。自分の使い方に近いものがあるかチェックしてみてください。
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.useCases.map((u) => (
              <div key={u.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eff6ff] text-2xl">{u.icon}</div>
                <h3 className="mt-3 text-[16px] font-bold text-[#1f2937]">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{u.text}</p>
              </div>
            ))}
          </div>

          {/* ⑧ FAQ（アコーディオン・JS不要） ---------------------------- */}
          <H2 id="faq">よくある質問</H2>
          <div className="divide-y divide-[#e5e7eb] rounded-2xl border border-[#e5e7eb] bg-white">
            {data.faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-[#1f2937]">
                  <span className="flex gap-2">
                    <span className="font-bold" style={{ color: BLUE }}>Q</span>
                    {f.q}
                  </span>
                  <span className="text-[#9ca3af] transition-transform group-open:rotate-180" aria-hidden>▾</span>
                </summary>
                <p className="mt-3 flex gap-2 text-[15px] leading-relaxed text-[#4b5563]">
                  <span className="font-bold text-[#16a34a]">A</span>
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          {/* ⑨ 最終評価＋CTA② ------------------------------------------ */}
          <H2 id="verdict">最終評価</H2>
          <div className="rounded-2xl border-2 bg-[#f8fafc] p-6 text-center sm:p-8" style={{ borderColor: BLUE }}>
            <StarRating value={finalValue} className="text-4xl" />
            <div className="mt-2 text-[22px] font-bold text-[#1f2937]">総合評価 {data.finalRating.score} / 5.0</div>

            <div className="mx-auto mt-6 grid max-w-[560px] grid-cols-2 gap-3 sm:grid-cols-4">
              {data.finalRating.metrics.map((s) => (
                <div key={s.label} className="rounded-xl border border-[#e5e7eb] bg-white px-2 py-3 shadow-sm">
                  <div className="text-[11px] text-[#6b7280]">{s.label}</div>
                  <div className="mt-1 text-[15px] font-bold" style={{ color: BLUE }}>{s.value}</div>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-relaxed text-[#4b5563]">
              {data.finalRating.summary}
            </p>
            <Cta href={affiliateUrl} label="今すぐ公式サイトで申し込む" note={data.ctaNote} affiliateNote className="mt-6" />
          </div>

          {/* バナー：300×250（記事最下部） */}
          <AdSlot w={300} h={250} label="記事最下部" preview={preview} />

          {/* ⑩ 参考情報・免責（信頼性） --------------------------------- */}
          <section className="mt-12 rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-6 text-sm text-[#6b7280]">
            <h2 className="text-[15px] font-bold text-[#1f2937]">参考にした情報・ご利用にあたって</h2>
            {data.references && data.references.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {data.references.map((r, i) => (
                  <li key={`${r.label}-${i}`} className="flex gap-2">
                    <span aria-hidden className="text-[#9ca3af]">↗</span>
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: BLUE }}>
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 leading-relaxed">
              本ページはアフィリエイト広告（PR）を含みます。記載の価格・仕様・キャンペーン内容は
              {data.lastUpdated ? `${data.lastUpdated}` : "記事公開"}時点の情報です。最新の内容は必ず公式サイトでご確認ください。
            </p>
          </section>

          {/* CTAテキストリンクの成果計測ピクセル（A8の 0.gif）。1度だけ */}
          {data.impressionPixel && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.impressionPixel}
              width={1}
              height={1}
              alt=""
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
            />
          )}

        </article>
      </div>
    </div>
  );
}
