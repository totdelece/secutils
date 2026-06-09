import Link from "next/link";
import { getArticle } from "@/lib/articles";
import { StickyCta } from "./sticky-cta";

const article = getArticle("security", "norton-vs-virusbuster")!;

const NORTON_URL = "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+61C2Q";
const NORTON_PIXEL = "https://www12.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+61C2Q";
const VB_URL = "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+5YRHE";
const VB_PIXEL = "https://www13.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+5YRHE";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const nortonBanner468x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+60H7L",
  src: "https://www26.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001010000&mc=1",
  pixel: "https://www17.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+60H7L",
  width: 468,
  height: 60,
  alt: "ノートン 360 公式",
};

const nortonBanner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+631SX",
  src: "https://www22.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001022000&mc=1",
  pixel: "https://www16.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+631SX",
  width: 300,
  height: 250,
  alt: "ノートン 360 公式",
};

const nortonBanner234x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+62MDD",
  src: "https://www25.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001020000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+62MDD",
  width: 234,
  height: 60,
  alt: "ノートン 360 公式",
};

const vbBanner468x100: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+61Z81",
  src: "https://www29.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001017000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+61Z81",
  width: 468,
  height: 100,
  alt: "ウイルスバスター クラウド 公式",
};

const vbBanner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+62MDD",
  src: "https://www25.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001020000&mc=1",
  pixel: "https://www12.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+62MDD",
  width: 300,
  height: 250,
  alt: "ウイルスバスター クラウド 公式",
};

const vbBanner234x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+61JSH",
  src: "https://www26.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001015000&mc=1",
  pixel: "https://www19.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+61JSH",
  width: 234,
  height: 60,
  alt: "ウイルスバスター クラウド 公式",
};

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────

const comparisonRows: {
  label: string;
  norton: string;
  vb: string;
  nortonWin?: boolean;
  vbWin?: boolean;
}[] = [
  { label: "総合評価", norton: "★★★★★ 4.5", vb: "★★★★☆ 4.2", nortonWin: true },
  { label: "料金（目安）", norton: "初年度割引あり（公式確認要）", vb: "初年度割引あり（公式確認要）" },
  { label: "対応台数（最安）", norton: "1台（Standard）", vb: "1台（1台版）" },
  { label: "VPN", norton: "✓（Deluxe以上: 帯域無制限）", vb: "─", nortonWin: true },
  { label: "クラウドバックアップ", norton: "✓（Deluxe: 50GB）", vb: "─", nortonWin: true },
  { label: "パスワードマネージャー", norton: "✓（Norton PM）", vb: "─", nortonWin: true },
  { label: "ダークウェブモニタリング", norton: "✓（メール・電話・クレカ）", vb: "─", nortonWin: true },
  { label: "Pay Guard（決済保護）", norton: "─", vb: "✓（専用ブラウザ環境）", vbWin: true },
  { label: "フォルダシールド", norton: "─", vb: "✓（ランサムウェア対策）", vbWin: true },
  { label: "動作の軽さ", norton: "普通", vb: "軽い（クラウド型）", vbWin: true },
  { label: "日本語電話サポート", norton: "△（チャット中心）", vb: "✓（24時間365日）", vbWin: true },
  { label: "返金保証", norton: "60日間", vb: "30日間", nortonWin: true },
];

const allFaqs = [
  {
    q: "ノートンとウイルスバスターを両方同時にインストールできますか？",
    a: "できません。セキュリティソフトは複数を同時にインストールすると競合が起きリアルタイム保護が正常に機能しなくなります。乗り換える場合は既存ソフトを完全にアンインストールしてから新しいソフトをインストールしてください。",
  },
  {
    q: "ノートンとウイルスバスター、どっちが動作が軽いですか？",
    a: "一般的にウイルスバスターの方が軽いとされています。クラウド型スキャンでファイル判定の大部分をトレンドマイクロのサーバー側で処理するため、PC本体への負荷が低くなります。ノートンはVPN・バックアップ・ダークウェブ監視など複数のバックグラウンドサービスが動くため、その分システムリソースを使います。古めのPCや、PCの動作を軽くしたい場合はウイルスバスターが向いています。",
  },
  {
    q: "Windows Defenderだけで十分ですか？",
    a: "基本的なウイルス・マルウェア対策としてはWindows Defenderでも一定の効果はあります。ただし、有料ソフトには「VPN」「パスワードマネージャー」「Pay Guard（決済保護）」「ダークウェブモニタリング」「フォルダシールド（ランサムウェア対策）」などDefenderにはない機能が含まれます。ネットバンキングをよく使う・家族のデバイスも守りたい・個人情報流出が心配という場合は有料ソフトを検討する価値があります。",
  },
  {
    q: "スマートフォンにもセキュリティソフトは必要ですか？",
    a: "iOSは比較的安全と言われますが、Androidはマルウェアのリスクがあります。また両OSともフィッシングサイト対策・公共Wi-Fi保護・迷惑電話ブロックなどの付加機能は役立ちます。両社ともスマホ向けアプリを提供しており、複数台プランに加入すれば追加費用なしでスマホにも導入できます。",
  },
  {
    q: "Macでも使えますか？",
    a: "両社ともmacOSに対応しています。ただしWindowsと比べると一部機能が制限される場合があります（例：ノートンのクラウドバックアップはWindows向けが中心）。購入前に必ず各公式サイトのOS別機能比較を確認してください。",
  },
  {
    q: "2年目以降の更新価格は高くなりますか？",
    a: "両社とも初年度は大幅割引が適用されることが多く、2年目以降は通常価格（更新価格）になります。更新価格は初回より高くなるケースがほとんどです。購入前に必ず「初回価格」と「更新価格」を両方確認してから申し込んでください。長期プランを選ぶと1年あたりの単価を抑えられる場合があります。",
  },
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
  color?: "blue" | "red";
}) {
  const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-200/60 focus-visible:outline-blue-600",
    red: "bg-red-600 hover:bg-red-700 shadow-red-200/60 focus-visible:outline-red-600",
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
  color?: "blue" | "red";
}) {
  const colorMap = {
    blue: "border-blue-300 text-blue-700 hover:bg-blue-50 focus-visible:outline-blue-600",
    red: "border-red-300 text-red-700 hover:bg-red-50 focus-visible:outline-red-600",
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
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-red-200/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">

        {/* パンくず */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=security" className="hover:text-slate-950">Security</Link>
          <span>/</span>
          <span>ノートン vs ウイルスバスター</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">PR / 広告を含みます</span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-200">{article.date} 確認</span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">価格は公式確認</span>
        </div>

        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          ノートン vs ウイルスバスター
          <span className="mt-2 block text-xl font-black text-slate-500 sm:text-2xl">
            どちらを選ぶべきか — 機能・料金・サポートを徹底比較
          </span>
        </h1>

        {/* ──── 結論カード ──── */}
        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-md">
          <div className="bg-slate-800 px-5 py-3">
            <p className="text-sm font-black text-white">この記事の結論</p>
          </div>
          <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">N</span>
                <span className="text-xs font-black uppercase tracking-wider text-blue-600">総合力・セット機能</span>
              </div>
              <p className="text-lg font-black text-slate-950">ノートン 360</p>
              <Stars rating={4.5} />
              <p className="mt-2 text-sm leading-6 text-slate-600">VPN・バックアップ・パスワード管理・ダークウェブ監視がひとつの契約に。60日返金保証でリスクなく試せる。</p>
              <div className="mt-4">
                <CtaPrimary href={NORTON_URL} mainText="公式サイトを見る" subText="60日間返金保証あり" color="blue" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">V</span>
                <span className="text-xs font-black uppercase tracking-wider text-red-600">初心者・国内サポート</span>
              </div>
              <p className="text-lg font-black text-slate-950">ウイルスバスター クラウド</p>
              <Stars rating={4.2} />
              <p className="mt-2 text-sm leading-6 text-slate-600">Pay Guard（決済保護）・フォルダシールド・24時間日本語電話サポート。動作が軽く国内シェアNo.1の安心感。</p>
              <div className="mt-4">
                <CtaPrimary href={VB_URL} mainText="公式サイトを見る" subText="30日間返金保証あり" color="red" />
              </div>
            </div>
          </div>
        </div>

        {/* ──── おすすめな人 2カラム ──── */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-wider text-blue-700">ノートンがおすすめな人</p>
            <ul className="space-y-2">
              {[
                "VPN・バックアップ・パスワード管理を一本にまとめたい",
                "ダークウェブへの情報流出を監視したい",
                "60日間じっくり試してから判断したい",
                "世界規模の脅威インテリジェンスを使いたい",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-wider text-red-700">ウイルスバスターがおすすめな人</p>
            <ul className="space-y-2">
              {[
                "ネットバンキング・決済を安全に使いたい",
                "日本語電話サポートが安心な人・初心者",
                "古めのPCでも動作を軽くしたい",
                "ランサムウェアからファイルを守りたい",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-[9px] font-black text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          ※ 本ページのリンクには広告を含みます。価格・機能・対応 OS は記事執筆時点の情報です。最新条件は各公式サイトでご確認ください。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={NORTON_PIXEL} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={VB_PIXEL} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
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
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">N</span>
          <span className="text-xl font-black text-slate-950">ノートン 360</span>
        </div>
        <div className="mt-2"><Stars rating={4.5} /></div>
        <ul className="mt-4 space-y-2">
          {[
            "VPN・バックアップ・パスワード管理・ダークウェブ監視が一本に",
            "全世界5億台超の脅威センサーで新種マルウェアをいち早く検知",
            "60日間返金保証つき — 使ってみてから判断できる",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <CtaPrimary href={NORTON_URL} mainText="公式サイトを見る" subText="60日間返金保証あり" color="blue" />
          <CtaOutline href={NORTON_URL} color="blue">料金・プランを確認する</CtaOutline>
        </div>
      </div>
      {/* バナーはカード下部に独立配置 — 枠で白背景と分離 */}
      <div className="border-t border-amber-200 bg-slate-50 px-5 py-4">
        <div className="flex justify-center">
          <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm hidden sm:block">
            <BannerImage ad={nortonBanner468x60} />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:hidden">
            <BannerImage ad={nortonBanner234x60} />
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
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">機能・仕様 比較表</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            料金は初年度割引があるため目安です。最新料金は必ず公式サイトでご確認ください。
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
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white">N</span>
                      <span className="text-xs font-black text-blue-700">ノートン 360</span>
                      <span className="ml-1 inline-flex items-center rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-amber-950">おすすめ</span>
                    </div>
                    <Stars rating={4.5} />
                  </div>
                </th>
                <th className="px-5 py-4 text-left w-[45%]">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[9px] font-black text-white">V</span>
                      <span className="text-xs font-black text-red-700">ウイルスバスター</span>
                    </div>
                    <Stars rating={4.2} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={`border-t border-slate-100 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                  <td className="px-5 py-4 text-xs font-black text-slate-500">{row.label}</td>
                  <td className={`bg-blue-50/30 px-5 py-4 leading-6 ${row.nortonWin ? "font-bold text-blue-700" : "text-slate-600"}`}>
                    {row.norton}
                  </td>
                  <td className={`px-5 py-4 leading-6 ${row.vbWin ? "font-bold text-red-700" : "text-slate-500"}`}>
                    {row.vb}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-6 text-slate-500">
          ※ 料金・機能・プラン内容は変更される場合があります。購入前に必ず公式サイトで最新情報をご確認ください。
        </p>

        {/* 比較表直後のCTA */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
            <p className="text-sm font-black text-slate-950">ノートン 360</p>
            <p className="mt-1 text-xs text-slate-500">総合力で選ぶなら</p>
            <div className="mt-4 flex flex-col gap-2">
              <CtaPrimary href={NORTON_URL} mainText="無料体験はこちら" subText="60日間返金保証あり" color="blue" />
              <CtaOutline href={NORTON_URL} color="blue">料金・プランを見る</CtaOutline>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-red-200 bg-red-50/60 p-5">
            <p className="text-sm font-black text-slate-950">ウイルスバスター クラウド</p>
            <p className="mt-1 text-xs text-slate-500">初心者・国内サポート重視なら</p>
            <div className="mt-4 flex flex-col gap-2">
              <CtaPrimary href={VB_URL} mainText="無料体験はこちら" subText="30日間返金保証あり" color="red" />
              <CtaOutline href={VB_URL} color="red">料金・プランを見る</CtaOutline>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const cases = [
    { scenario: "ネットバンキング・オンライン決済を安全に使いたい", recommend: "ウイルスバスター", color: "red" as const, reason: "Pay Guardが決済時のフォームデータ横取りや画面キャプチャをブロック。金融機関が特に多い日本市場向けに最適化。" },
    { scenario: "VPN・バックアップ・パスワード管理をまとめたい", recommend: "ノートン", color: "blue" as const, reason: "Norton 360 Deluxeひとつでこれら全てをカバー。個別に契約すれば月数千円かかる費用を一本化できる。" },
    { scenario: "サポートは電話で日本語対応が安心", recommend: "ウイルスバスター", color: "red" as const, reason: "24時間365日の日本語電話サポートを提供。初心者や家族の端末を管理する人に特に心強い。" },
    { scenario: "個人情報がダークウェブに流出していないか監視したい", recommend: "ノートン", color: "blue" as const, reason: "メール・電話番号・クレカをダークウェブで継続監視。検知時に即通知。ウイルスバスターにはない機能。" },
    { scenario: "古めのPCでも動作を軽くしたい", recommend: "ウイルスバスター", color: "red" as const, reason: "クラウド型スキャンでPCのCPU負荷が低い。定義ファイルの手動更新も不要。" },
    { scenario: "60日間じっくり試してから判断したい", recommend: "ノートン", color: "blue" as const, reason: "60日間返金保証つき（ウイルスバスターは30日間）。VPNやバックアップの使い勝手まで確認できる。" },
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
            const isNorton = item.color === "blue";
            return (
              <article key={item.scenario} className={`rounded-2xl border p-5 shadow-sm ${isNorton ? "border-blue-200 bg-blue-50/40" : "border-red-200 bg-red-50/40"}`}>
                <p className="text-xs font-bold text-slate-500">{item.scenario}</p>
                <div className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${isNorton ? "bg-blue-100 text-blue-700 ring-blue-200" : "bg-red-100 text-red-700 ring-red-200"}`}>
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
  const nortonStrengths = [
    { title: "VPN・バックアップ・パスワード管理の3点セット", body: "Deluxe以上で帯域無制限VPN・50GBバックアップ・Norton PMが一本に。別々に契約すれば月数千円かかるサービスをまとめてカバーできる。" },
    { title: "ダークウェブモニタリング", body: "登録したメール・電話番号・クレカがダークウェブで売買されていないかを継続監視。流出を検知したら即通知が届く。" },
    { title: "全世界5億台の脅威インテリジェンス", body: "グローバル規模のセンサーネットワークが新種マルウェアをいち早く検知し共有。国内専業ブランドには持てないスケールの防御力。" },
    { title: "60日間返金保証", body: "ウイルスバスターの30日間に対して60日間と長い。VPNやバックアップなど全機能を使い込んでから判断できる。" },
  ];
  const vbStrengths = [
    { title: "Pay Guard（決済専用保護ブラウザ）", body: "ネットバンキングや決済サイトにアクセスすると専用の保護ブラウザ環境が起動。フォームデータの横取りや画面キャプチャをブロック。" },
    { title: "フォルダシールド（ランサムウェア対策）", body: "重要フォルダへの不正な書き換えをリアルタイムでブロック。ランサムウェアによるファイル暗号化を未然に防ぐ専用の保護機能。" },
    { title: "クラウド型スキャンで動作軽量", body: "ファイル判定の大部分をクラウドで処理するためPCへの負荷が低い。定義ファイルの手動更新が不要で、古めのPCでも快適。" },
    { title: "24時間365日日本語電話サポート", body: "困ったときにすぐ電話で日本語サポートを受けられる。初心者や家族の端末を管理する人にとって大きな安心感。" },
  ];

  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Strengths</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">それぞれの強み</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ノートン */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">N</span>
              <h3 className="text-xl font-black text-slate-950">ノートン 360 の強み</h3>
            </div>
            <div className="space-y-3">
              {nortonStrengths.map((s) => (
                <article key={s.title} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                  <h4 className="text-sm font-black text-blue-700">{s.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <div className="hidden sm:block"><BannerImage ad={nortonBanner468x60} /></div>
              <div className="sm:hidden"><BannerImage ad={nortonBanner234x60} /></div>
              <CtaPrimary href={NORTON_URL} mainText="ノートン公式サイトを見る" subText="60日間返金保証あり" color="blue" />
            </div>
          </div>

          {/* ウイルスバスター */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">V</span>
              <h3 className="text-xl font-black text-slate-950">ウイルスバスターの強み</h3>
            </div>
            <div className="space-y-3">
              {vbStrengths.map((s) => (
                <article key={s.title} className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
                  <h4 className="text-sm font-black text-red-700">{s.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <div className="hidden sm:block"><BannerImage ad={vbBanner468x100} /></div>
              <div className="sm:hidden"><BannerImage ad={vbBanner234x60} /></div>
              <CtaPrimary href={VB_URL} mainText="ウイルスバスター公式サイトを見る" subText="30日間返金保証あり" color="red" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChecklistSection() {
  const items = [
    "使用デバイスのOSが両社の対応範囲内（Windows/macOS/iOS/Android）か確認した",
    "守りたい台数に合ったプランを選び、台数超過にならないか確認した",
    "初回価格と2年目以降の更新価格を公式サイトで確認した",
    "ノートン選択時: VPN帯域無制限が必要ならDeluxe以上を選んだ",
    "ウイルスバスター選択時: Pay Guardを使うブラウザの動作を購入後に確認する",
    "既存のセキュリティソフトをアンインストールしてから導入する",
  ];
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Pre-flight</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">購入前のチェックリスト</h2>
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
          {/* ノートン */}
          <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md">
            <div className="bg-blue-600 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-blue-600">N</span>
                <p className="text-sm font-black text-white">ノートン 360 を選ぶべき人</p>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {[
                  "VPN・バックアップ・パスワード管理を一本にまとめたい人",
                  "ダークウェブへの個人情報流出を継続監視したい人",
                  "世界規模の脅威インテリジェンスによる検知精度を重視する人",
                  "60日間じっくり試してから判断したい人",
                  "家族のデバイスをまとめてカバーしたい人",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[9px] font-black text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-2">
                <div className="hidden sm:block"><BannerImage ad={nortonBanner468x60} /></div>
                <div className="sm:hidden"><BannerImage ad={nortonBanner234x60} /></div>
                <CtaPrimary href={NORTON_URL} mainText="今すぐ申し込む" subText="60日間返金保証あり" color="blue" />
                <CtaOutline href={NORTON_URL} color="blue">特典・キャンペーンを確認する</CtaOutline>
              </div>
            </div>
          </div>

          {/* ウイルスバスター */}
          <div className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-md">
            <div className="bg-red-600 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-red-600">V</span>
                <p className="text-sm font-black text-white">ウイルスバスターを選ぶべき人</p>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {[
                  "ネットバンキング・オンライン決済を安全に使いたい人",
                  "ランサムウェアからファイルを保護したい人",
                  "古めのPCでも動作を重くしたくない人",
                  "困ったときは日本語で電話サポートを使いたい人",
                  "国内シェアNo.1の安心感・実績を重視する人",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[9px] font-black text-red-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-2">
                <div className="hidden sm:block"><BannerImage ad={vbBanner468x100} /></div>
                <div className="sm:hidden"><BannerImage ad={vbBanner234x60} /></div>
                <CtaPrimary href={VB_URL} mainText="今すぐ申し込む" subText="30日間返金保証あり" color="red" />
                <CtaOutline href={VB_URL} color="red">特典・キャンペーンを確認する</CtaOutline>
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
            ["Norton 公式サイト（日本）", "https://jp.norton.com/"],
            ["Norton 360 プラン・料金一覧", "https://jp.norton.com/products"],
            ["ウイルスバスター クラウド 公式サイト", "https://www.trendmicro.com/ja_jp/forHome/products/virusbuster.html"],
            ["ウイルスバスター Pay Guard 機能紹介", "https://www.trendmicro.com/ja_jp/forHome/products/virusbuster/features.html"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline-offset-2 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          この記事は {article.date} 時点の公式情報を確認して作成しています。申し込み前には公式サイトで最新の価格・機能・対応 OS を確認してください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: "/learn/security/norton-360-review", title: "ノートン 360 レビュー", eyebrow: "Review" },
    { href: "/learn/security/virusbuster-cloud-review", title: "ウイルスバスター クラウド レビュー", eyebrow: "Review" },
    { href: "/learn/security/ransomware-2026", title: "ランサムウェアの最新動向と対策", eyebrow: "Security" },
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

export default function NortonVsVirusbusterPage() {
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
