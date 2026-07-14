import Link from "next/link";
import { getArticle } from "@/lib/articles";
import { articleFaqs } from "@/lib/faqs";
import { StickyCta } from "./sticky-cta";

/* =======================================================================
   シン・レンタルサーバー vs エックスサーバー 比較（PR記事・2社比較型）
   ・norton-vs-virusbuster を雛形にした 1 ファイル完結 LP。
   ・数値は公開日(2026-07-14)に両社公式サイトを直接再取得して確認済み:
     - xserver: スタンダード990円(36ヶ月)/最大半額キャッシュバックで実質693円の例・
       NVMe 500/600/700GB・初期費用0円・10日無料お試し・
       ドメイン特典はスタンダード12ヶ月以上=1個/24ヶ月以上=2個(自動更新設定が条件)、
       プレミアム/ビジネス=2個(条件なし)。「全プラン2つ無料」とは断定しない。
     - shin: ベーシック1,078円(36ヶ月)/20%OFF直接割引で862円の例・
       スタンダード2,002→1,401円/プレミアム4,004→2,802円(30%OFF)・
       NVMe 700/1,000/1,200GB・vCPU6コア/メモリ8GB〜(公式プラン表に明記)・
       電話サポートあり・Xwriteスタンダード以上0円。
   ・未検証のことは書かない: シンの自動バックアップ、xserver の vCPU/メモリ・
     サポート窓口詳細、実測速度の優劣など。
   ・固定のキャンペーン期限は書かない（evergreen方針）。割引額は「〜の例」で表記。
   ・Server Component のまま（onClick は sticky-cta.tsx に分離）。
     metadata は layout.tsx に委譲。FAQ は src/lib/faqs.ts と共用（JSON-LD 自動出力）。
   ======================================================================= */

const article = getArticle("network", "shin-vs-xserver")!;
const allFaqs = articleFaqs["shin-vs-xserver"];

const XSERVER_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+61JSI";
const XSERVER_PIXEL = "https://www19.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+61JSI";
const SHIN_URL = "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+5YZ76";
const SHIN_PIXEL = "https://www10.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+5YZ76";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const xserverBanner468x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+62U35",
  src: "https://www29.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001021000&mc=1",
  pixel: "https://www13.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+62U35",
  width: 468,
  height: 60,
  alt: "エックスサーバー 公式",
};

const xserverBanner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+69HA9",
  src: "https://www28.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001052000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+69HA9",
  width: 300,
  height: 250,
  alt: "エックスサーバー 公式",
};

const shinBanner468x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+601S1",
  src: "https://www24.a8.net/svt/bgt?aid=260619861813&wid=001&eno=01&mid=s00000025450001008000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+601S1",
  width: 468,
  height: 60,
  alt: "シンレンタルサーバー 公式",
};

const shinBanner320x50: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+614CX",
  src: "https://www29.a8.net/svt/bgt?aid=260619861813&wid=001&eno=01&mid=s00000025450001013000&mc=1",
  pixel: "https://www14.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+614CX",
  width: 320,
  height: 50,
  alt: "シンレンタルサーバー 公式",
};

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────

const comparisonRows: {
  label: string;
  xserver: string;
  shin: string;
  xserverWin?: boolean;
  shinWin?: boolean;
}[] = [
  { label: "総合評価", xserver: "★★★★★ 4.7", shin: "★★★★☆ 4.5", xserverWin: true },
  { label: "位置づけ", xserver: "国内シェアNo.1（公式標榜）の王道", shin: "同じ運営会社の新世代・コスパ型" },
  { label: "運営会社", xserver: "エックスサーバー株式会社", shin: "エックスサーバー株式会社（同じ）" },
  { label: "月額（通常・36ヶ月契約時）", xserver: "990円〜（スタンダード）", shin: "1,078円〜（ベーシック）", xserverWin: true },
  { label: "割引後の目安※", xserver: "キャッシュバックで実質693円〜の例", shin: "直接割引で862円〜の例" },
  { label: "割引の方式", xserver: "キャッシュバック（支払いは通常額・後から返金）", shin: "直接割引（支払い額そのものが下がる）", shinWin: true },
  { label: "初期費用", xserver: "0円", shin: "0円" },
  { label: "無料お試し", xserver: "10日間", shin: "10日間" },
  { label: "ストレージ", xserver: "NVMe SSD 500〜700GB", shin: "NVMe SSD 700〜1,200GB", shinWin: true },
  { label: "vCPU・メモリの明記", xserver: "公式サイトで確認", shin: "プラン表に明記（ベーシック: vCPU6コア・メモリ8GB）", shinWin: true },
  { label: "独自ドメイン永年無料", xserver: "1〜2個（12ヶ月以上で1個・24ヶ月以上で2個。自動更新設定などの条件あり）", shin: "あり（.com / .net など対象ドメイン）" },
  { label: "自動バックアップ", xserver: "全プラン無料", shin: "公式サイトで確認", xserverWin: true },
  { label: "WordPress", xserver: "簡単インストール・簡単移行", shin: "簡単インストール", xserverWin: true },
  { label: "実績", xserver: "長年の運用実績・国内シェアNo.1（公式標榜）", shin: "新しめのサービス", xserverWin: true },
];

// ────────────────────────────────────────────────────────────
// UI primitives
// ────────────────────────────────────────────────────────────

function BannerImage({ ad }: { ad: BannerAd }) {
  return (
    <div className="relative">
      <a href={ad.href} rel="nofollow noopener noreferrer" target="_blank" className="block transition hover:opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ad.src} alt={ad.alt} width={ad.width} height={ad.height} className="h-auto max-w-full rounded-md" />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ad.pixel} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
    </div>
  );
}

/** メインCTA: 補足テキスト付き・横幅いっぱい */
function CtaPrimary({
  href,
  mainText,
  subText,
  color = "blue",
}: {
  href: string;
  mainText: string;
  subText?: string;
  color?: "blue" | "emerald";
}) {
  const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-200/60 focus-visible:outline-blue-600",
    emerald: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200/60 focus-visible:outline-emerald-600",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`flex w-full flex-col items-center justify-center rounded-xl px-6 py-4 text-white no-underline shadow-lg transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colorMap[color]}`}
    >
      <span className="text-base font-black">{mainText} →</span>
      {subText && <span className="mt-0.5 text-xs opacity-85">{subText}</span>}
    </a>
  );
}

/** サブCTA: アウトライン */
function CtaOutline({
  href,
  children,
  color = "blue",
}: {
  href: string;
  children: React.ReactNode;
  color?: "blue" | "emerald";
}) {
  const colorMap = {
    blue: "border-blue-300 text-blue-700 hover:bg-blue-50 focus-visible:outline-blue-600",
    emerald: "border-emerald-300 text-emerald-700 hover:bg-emerald-50 focus-visible:outline-emerald-600",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border bg-white px-5 py-2.5 text-sm font-black no-underline transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colorMap[color]}`}
    >
      {children} →
    </a>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => <span key={`f${i}`} className="text-amber-400">★</span>)}
      {hasHalf && <span className="text-amber-300">★</span>}
      {Array.from({ length: empty }).map((_, i) => <span key={`e${i}`} className="text-slate-200">★</span>)}
      <span className="ml-1.5 text-sm font-bold text-slate-500">{rating.toFixed(1)}</span>
    </span>
  );
}

// ────────────────────────────────────────────────────────────
// Sections
// ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_60%,#ffffff_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">

        {/* パンくず */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=network" className="hover:text-slate-950">Network</Link>
          <span>/</span>
          <span>シン・レンタルサーバー vs エックスサーバー</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">PR / 広告を含みます</span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-200">{article.date} 確認</span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">価格は公式確認</span>
        </div>

        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          シン・レンタルサーバー vs エックスサーバー
          <span className="mt-2 block text-xl font-black text-slate-500 sm:text-2xl">
            同じ会社の2サービス、どっちを選ぶ？ — 料金・容量・実績を徹底比較
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
          どちらも<strong className="font-bold text-slate-800">エックスサーバー株式会社</strong>が運営するレンタルサーバー。
          「王道の実績」を取るか「新世代のコスパ・大容量」を取るかで選び方が変わります。
          両方に10日間の無料お試しがあるので、迷ったら実際に触って比べることもできます。
        </p>

        {/* ──── 結論カード ──── */}
        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-md">
          <div className="bg-slate-800 px-5 py-3">
            <p className="text-sm font-black text-white">この記事の結論</p>
          </div>
          <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">X</span>
                <span className="text-xs font-black uppercase tracking-wider text-blue-600">実績・安定の王道</span>
              </div>
              <p className="text-lg font-black text-slate-950">エックスサーバー</p>
              <Stars rating={4.7} />
              <p className="mt-2 text-sm leading-6 text-slate-600">国内シェアNo.1（公式標榜）の定番。自動バックアップ全プラン無料・WordPress簡単移行・豊富な解説情報で、初めてでも失敗しにくい。</p>
              <div className="mt-4">
                <CtaPrimary href={XSERVER_URL} mainText="公式サイトを見る" subText="10日間無料お試し・初期費用0円" color="blue" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">S</span>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">コスパ・大容量</span>
              </div>
              <p className="text-lg font-black text-slate-950">シン・レンタルサーバー</p>
              <Stars rating={4.5} />
              <p className="mt-2 text-sm leading-6 text-slate-600">同じ運営会社の新世代版。ベーシックからNVMe SSD 700GBの大容量で、割引キャンペーン時は支払いが862円〜になる例も。</p>
              <div className="mt-4">
                <CtaPrimary href={SHIN_URL} mainText="公式サイトを見る" subText="10日間無料お試し・初期費用0円" color="emerald" />
              </div>
            </div>
          </div>
        </div>

        {/* ──── おすすめな人 2カラム ──── */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-wider text-blue-700">エックスサーバーがおすすめな人</p>
            <ul className="space-y-2">
              {[
                "初めてのレンタルサーバーで失敗したくない",
                "長年の実績・安定性を重視したい",
                "自動バックアップが全プラン無料だと安心",
                "他社サーバーからWordPressを移行したい",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-wider text-emerald-700">シン・レンタルサーバーがおすすめな人</p>
            <ul className="space-y-2">
              {[
                "同じ価格帯なら容量が大きい方がいい",
                "割引で支払い額そのものを抑えたい",
                "vCPU・メモリの割り当てが明記されていると安心",
                "有料テーマ Xwrite を無料で使いたい",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-black text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          ※ 本ページのリンクには広告を含みます。料金・キャンペーン・特典は記事執筆時点（{article.date}）に公式サイトで確認した情報で、時期により変動します。最新条件は各公式サイトでご確認ください。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={XSERVER_PIXEL} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SHIN_PIXEL} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
      </div>
    </section>
  );
}

/** 総合評価 No.1カード */
function TopPickCard() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-amber-400 bg-white shadow-lg">
      <div className="bg-amber-400 px-5 py-2.5">
        <p className="text-sm font-black text-amber-950">🏆 総合評価 No.1</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">X</span>
          <span className="text-xl font-black text-slate-950">エックスサーバー</span>
        </div>
        <div className="mt-2"><Stars rating={4.7} /></div>
        <ul className="mt-4 space-y-2">
          {[
            "国内シェアNo.1（公式標榜）— 利用者が多く解説情報も豊富で困りにくい",
            "自動バックアップが全プラン無料・NVMe SSD×Xアクセラレータの高速構成",
            "10日間の無料お試しつき — 使ってみてから判断できる",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <CtaPrimary href={XSERVER_URL} mainText="無料で試してみる" subText="10日間無料お試し・初期費用0円" color="blue" />
          <CtaOutline href={XSERVER_URL} color="blue">料金・プランを確認する</CtaOutline>
        </div>
      </div>
      {/* バナーはカード下部に独立配置 — 枠で白背景と分離 */}
      <div className="border-t border-amber-200 bg-slate-50 px-5 py-4">
        <div className="flex justify-center">
          <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <BannerImage ad={xserverBanner468x60} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorPickSection() {
  return (
    <section className="bg-slate-50 px-5 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <TopPickCard />
      </div>
    </section>
  );
}

function ComparisonTableSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Comparison</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">料金・スペック 比較表</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            月額は36ヶ月契約時の通常価格。割引・キャッシュバックは時期により変動するため、最新条件は必ず公式サイトでご確認ください。
          </p>
        </div>

        {/* テーブル */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[580px] text-sm">
            <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_0_#e2e8f0]">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400 w-36">項目</th>
                <th className="bg-blue-50/70 px-5 py-4 text-left w-[45%]">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white">X</span>
                      <span className="text-xs font-black text-blue-700">エックスサーバー</span>
                      <span className="ml-1 inline-flex items-center rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-amber-950">おすすめ</span>
                    </div>
                    <Stars rating={4.7} />
                  </div>
                </th>
                <th className="px-5 py-4 text-left w-[45%]">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-black text-white">S</span>
                      <span className="text-xs font-black text-emerald-700">シン・レンタルサーバー</span>
                    </div>
                    <Stars rating={4.5} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={`border-t border-slate-100 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                  <td className="px-5 py-4 text-xs font-black text-slate-500">{row.label}</td>
                  <td className={`bg-blue-50/30 px-5 py-4 leading-6 ${row.xserverWin ? "font-bold text-blue-700" : "text-slate-600"}`}>
                    {row.xserver}
                  </td>
                  <td className={`px-5 py-4 leading-6 ${row.shinWin ? "font-bold text-emerald-700" : "text-slate-500"}`}>
                    {row.shin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-6 text-slate-500">
          ※ 「実質693円〜」はキャッシュバックキャンペーン適用時、「862円〜」は割引キャンペーン適用時の例（いずれも{article.date}確認・時期により変動）。料金・特典・キャンペーンは変更される場合があります。申し込み前に必ず公式サイトで最新情報をご確認ください。
        </p>

        {/* 比較表直後のCTA */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
            <p className="text-sm font-black text-slate-950">エックスサーバー</p>
            <p className="mt-1 text-xs text-slate-500">実績・安定の王道で選ぶなら</p>
            <div className="mt-4 flex flex-col gap-2">
              <CtaPrimary href={XSERVER_URL} mainText="無料お試しはこちら" subText="10日間無料お試し・初期費用0円" color="blue" />
              <CtaOutline href={XSERVER_URL} color="blue">料金・プランを見る</CtaOutline>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
            <p className="text-sm font-black text-slate-950">シン・レンタルサーバー</p>
            <p className="mt-1 text-xs text-slate-500">コスパ・大容量で選ぶなら</p>
            <div className="mt-4 flex flex-col gap-2">
              <CtaPrimary href={SHIN_URL} mainText="無料お試しはこちら" subText="10日間無料お試し・初期費用0円" color="emerald" />
              <CtaOutline href={SHIN_URL} color="emerald">料金・プランを見る</CtaOutline>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const cases = [
    { scenario: "初めてのWordPressブログ・とにかく失敗したくない", recommend: "エックスサーバー", color: "blue" as const, reason: "利用者が多く、設定やトラブルの解説情報が圧倒的に豊富。自動バックアップも全プラン無料で、初心者の操作ミスにも強い。" },
    { scenario: "画像の多いブログ・メディアを容量を気にせず育てたい", recommend: "シン・レンタルサーバー", color: "emerald" as const, reason: "ベーシックからNVMe SSD 700GB。エックスサーバーのスタンダード（500GB）より大容量で、同価格帯でも余裕がある。" },
    { scenario: "毎月の支払い額そのものを抑えたい", recommend: "シン・レンタルサーバー", color: "emerald" as const, reason: "割引が「直接割引」方式のため、キャンペーン時は請求額自体が下がる（862円〜の例）。キャッシュバック方式のような立て替えが不要。" },
    { scenario: "会社・店舗の公式サイトを長く安定運用したい", recommend: "エックスサーバー", color: "blue" as const, reason: "長年の運用実績と国内シェアNo.1（公式標榜）の定番。困ったときの情報量・安心感で選ぶならこちら。" },
    { scenario: "WordPressテーマ代も節約したい", recommend: "シン・レンタルサーバー", color: "emerald" as const, reason: "通常9,900円/年の有料テーマ「Xwrite」がスタンダードプラン以上で無料。サーバー代とテーマ代をまとめて抑えられる。" },
    { scenario: "他社サーバーからWordPressを乗り換えたい", recommend: "エックスサーバー", color: "blue" as const, reason: "「WordPress簡単移行」に対応しており、今のサーバーからの引っ越しを画面の案内に沿って進められる。" },
  ];

  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Use Cases</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">シナリオ別おすすめ</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {cases.map((item) => {
            const isXserver = item.color === "blue";
            return (
              <article key={item.scenario} className={`rounded-2xl border p-5 shadow-sm ${isXserver ? "border-blue-200 bg-blue-50/40" : "border-emerald-200 bg-emerald-50/40"}`}>
                <p className="text-xs font-bold text-slate-500">{item.scenario}</p>
                <div className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${isXserver ? "bg-blue-100 text-blue-700 ring-blue-200" : "bg-emerald-100 text-emerald-700 ring-emerald-200"}`}>
                  {item.recommend}
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.reason}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StrengthsSection() {
  const xserverStrengths = [
    { title: "国内シェアNo.1の実績と情報量", body: "公式が国内シェアNo.1を標榜する定番サーバー。利用者が多いぶん設定・トラブルの解説記事が豊富で、検索すればほぼ答えが見つかる「困りにくさ」は初心者に大きな価値。" },
    { title: "NVMe SSD × Xアクセラレータ", body: "全プランで高速なNVMe SSDを採用し、独自の高速化技術「Xアクセラレータ」でアクセス集中時も安定。表示速度を重視するサイトに向く構成。" },
    { title: "自動バックアップが全プラン無料", body: "追加料金なしで自動バックアップに対応。うっかり削除や更新失敗のときにもデータを復旧しやすく、初めての運用でも安心して任せられる。" },
    { title: "WordPress簡単移行に対応", body: "簡単インストールに加えて、他社サーバーからの「簡単移行」機能を用意。これから始める人にも、乗り換えたい人にも扱いやすい。" },
  ];
  const shinStrengths = [
    { title: "ベーシックからNVMe SSD 700GBの大容量", body: "最安プランで700GB、スタンダード1,000GB・プレミアム1,200GBと容量に余裕。同価格帯のエックスサーバー スタンダード（500GB）より大きく、画像・動画の多いサイトに向く。" },
    { title: "vCPU・メモリの割り当てを明記", body: "ベーシックでvCPU6コア・メモリ8GB、スタンダードでvCPU8コア・12GBなど、確保リソースが公式のプラン表に明記されている。スペックを見て選びたい人に分かりやすい。" },
    { title: "割引が「直接割引」方式", body: "キャンペーン時は支払い額そのものが下がる（ベーシック20%OFFで862円〜の例）。後から返金されるキャッシュバック方式と違い、毎月の請求額がはじめから安い。" },
    { title: "有料テーマ「Xwrite」が無料", body: "通常9,900円/年のWordPressテーマ「Xwrite」がスタンダードプラン以上で0円。ブログの見た目づくりにかかる費用を丸ごと節約できる。" },
  ];

  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Strengths</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">それぞれの強み</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* エックスサーバー */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">X</span>
              <h3 className="text-xl font-black text-slate-950">エックスサーバーの強み</h3>
            </div>
            <div className="space-y-3">
              {xserverStrengths.map((s) => (
                <article key={s.title} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                  <h4 className="text-sm font-black text-blue-700">{s.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <BannerImage ad={xserverBanner468x60} />
              <CtaPrimary href={XSERVER_URL} mainText="エックスサーバー公式サイトを見る" subText="10日間無料お試し・初期費用0円" color="blue" />
            </div>
          </div>

          {/* シン・レンタルサーバー */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">S</span>
              <h3 className="text-xl font-black text-slate-950">シン・レンタルサーバーの強み</h3>
            </div>
            <div className="space-y-3">
              {shinStrengths.map((s) => (
                <article key={s.title} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                  <h4 className="text-sm font-black text-emerald-700">{s.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <div className="hidden sm:block"><BannerImage ad={shinBanner468x60} /></div>
              <div className="sm:hidden"><BannerImage ad={shinBanner320x50} /></div>
              <CtaPrimary href={SHIN_URL} mainText="シン・レンタルサーバー公式サイトを見る" subText="10日間無料お試し・初期費用0円" color="emerald" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChecklistSection() {
  const items = [
    "「990円〜」「1,078円〜」は36ヶ月契約時の月額であることを確認した",
    "割引の方式を理解した（エックスサーバーはキャッシュバック＝支払いは通常額、シンは直接割引）",
    "キャンペーンの適用条件・期限を公式サイトで確認した",
    "独自ドメイン永年無料の条件（エックスサーバーは契約期間・自動更新設定）を確認した",
    "必要なストレージ容量・スペックを見積もってプランを選んだ",
    "契約前に10日間の無料お試しで管理画面と表示速度を確認する",
  ];
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Pre-flight</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">申し込み前のチェックリスト</h2>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">FAQ</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">よくある質問</h2>
        </div>
        <div className="space-y-3">
          {allFaqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-slate-300 open:shadow-md"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700">Q</span>
                  {f.q}
                </span>
                <span aria-hidden="true" className="shrink-0 text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalDecisionSection() {
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">Final Decision</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">結論 — こんな人に向いている</h2>
        </div>

        {/* 編集部おすすめカード（末尾） */}
        <div className="mb-8">
          <TopPickCard />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* エックスサーバー */}
          <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md">
            <div className="bg-blue-600 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-blue-600">X</span>
                <p className="text-sm font-black text-white">エックスサーバーを選ぶべき人</p>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {[
                  "初めてのレンタルサーバーで失敗したくない人",
                  "長年の実績・国内シェアNo.1（公式標榜）の安心感を重視する人",
                  "自動バックアップ無料でいざという時に備えたい人",
                  "他社サーバーからWordPressを乗り換えたい人",
                  "会社・店舗サイトなど長期の安定運用を見込む人",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[9px] font-black text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-2">
                <BannerImage ad={xserverBanner300x250} />
                <CtaPrimary href={XSERVER_URL} mainText="今すぐ無料で試してみる" subText="10日間無料お試し・初期費用0円" color="blue" />
                <CtaOutline href={XSERVER_URL} color="blue">特典・キャンペーンを確認する</CtaOutline>
              </div>
            </div>
          </div>

          {/* シン・レンタルサーバー */}
          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-md">
            <div className="bg-emerald-600 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-emerald-600">S</span>
                <p className="text-sm font-black text-white">シン・レンタルサーバーを選ぶべき人</p>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {[
                  "同じ価格帯なら容量・スペックのコスパを取りたい人",
                  "割引で毎月の支払い額そのものを抑えたい人",
                  "vCPU・メモリの割り当てを見てプランを選びたい人",
                  "有料テーマ Xwrite でテーマ代も節約したい人",
                  "同じ運営会社の新世代サービスを試したい人",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-black text-emerald-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-2">
                <div className="hidden sm:block"><BannerImage ad={shinBanner468x60} /></div>
                <div className="sm:hidden"><BannerImage ad={shinBanner320x50} /></div>
                <CtaPrimary href={SHIN_URL} mainText="今すぐ無料で試してみる" subText="10日間無料お試し・初期費用0円" color="emerald" />
                <CtaOutline href={SHIN_URL} color="emerald">特典・キャンペーンを確認する</CtaOutline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-950">参考にした公式情報</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {[
            ["エックスサーバー 料金プラン（公式）", "https://www.xserver.ne.jp/price/"],
            ["エックスサーバー 独自ドメイン永久無料特典（公式マニュアル）", "https://www.xserver.ne.jp/manual/man_order_present_domain.php"],
            ["シン・レンタルサーバー 公式サイト（料金・スペック）", "https://www.shin-server.jp/"],
            ["運営：エックスサーバー株式会社", "https://www.xserver.co.jp/"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline-offset-2 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          この記事は {article.date} 時点の公式情報を確認して作成しています。料金・キャンペーン・特典の条件は変動するため、申し込み前には公式サイトで最新の内容を確認してください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: "/learn/network/xserver-review", title: "エックスサーバー 単体レビュー", eyebrow: "Review" },
    { href: "/learn/network/shin-rental-server-review", title: "シン・レンタルサーバー 単体レビュー", eyebrow: "Review" },
    { href: "/learn/network/rental-server-comparison", title: "レンタルサーバー4サービス比較", eyebrow: "Comparison" },
  ];
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-black text-slate-950">関連して読む</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{item.eyebrow}</div>
              <div className="mt-2 text-sm font-black text-slate-950 group-hover:text-blue-700">{item.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ShinVsXserverPage() {
  return (
    <>
      <main className="pb-20 sm:pb-0">
        <Hero />
        <EditorPickSection />
        <ComparisonTableSection />
        <UseCasesSection />
        <StrengthsSection />
        <ChecklistSection />
        <FaqSection />
        <FinalDecisionSection />
        <References />
        <RelatedLinks />
      </main>
      <StickyCta />
    </>
  );
}
