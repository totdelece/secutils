import Link from "next/link";
import { getArticle } from "@/lib/articles";

/* =======================================================================
   ExpressVPN レビュー（PR記事・単体レビュー型 / フルカスタム）
   ・nordvpn-review と同じ構成をベースに、ExpressVPN のブランドカラー（blue）で構成。
   ・事実は公式情報および裏取り済みの nordvpn-vs-expressvpn 記事（2026-07 再確認）から。
     - プラン Basic/Advanced/Pro（同時接続 10/12/14台）／30日返金保証／105カ国+
     - TrustedServer（全サーバーRAM駆動）／KPMGが2025年にノーログ検証
     - Lightway（Rust製・Cure53/Praetorian監査）／ML-KEM を既定採用（NISTレベル5, TCP/UDP）
     - 広告・悪質サイトブロック／Network Lock（キルスイッチ）／スプリットトンネリング
     - Advanced+ の付帯: ExpressKeys(パスワード管理)・Identity Defender・ExpressMailGuard・eSIM
   ・料金・サーバー台数は断定せず「公式で最新を確認」に寄せる（景表法・ステマ規制対策）。
   ・Server Component のまま（onClick 等は使わない）。metadata は layout.tsx に委譲。
   ======================================================================= */

const article = getArticle("network", "expressvpn-review")!;

// ---- A8 アフィリエイト素材（テキストリンク＋計測ピクセル）----------------
const EXPRESS_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+A4YQLU+5JSS+5YJRM";
const EXPRESS_TEXT_PIXEL = "https://www14.a8.net/0.gif?a8mat=4B3LMV+A4YQLU+5JSS+5YJRM";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const banner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+A4YQLU+5JSS+5YZ75",
  src: "https://www27.a8.net/svt/bgt?aid=260508487613&wid=001&eno=01&mid=s00000025894001003000&mc=1",
  pixel: "https://www13.a8.net/0.gif?a8mat=4B3LMV+A4YQLU+5JSS+5YZ75",
  width: 300,
  height: 250,
  alt: "ExpressVPN 公式キャンペーン",
};

const features = [
  {
    label: "🔒",
    title: "TrustedServer（全サーバーRAM駆動）",
    body: "すべてのサーバーがハードディスクを持たず、RAMのみで動作する設計。電源を切ると全データが消えるため、ログが物理的に残らない。2025年のKPMGによる監査でも、RAM専用サーバーにログが保持されていないことが確認されている。",
  },
  {
    label: "⚡",
    title: "Lightway（Rust製の独自プロトコル）",
    body: "高速・低遅延の独自VPNプロトコル。近年メモリ安全性の高いRust言語で書き直され、Cure53とPraetorianという2社の独立監査を受けた。軽量な設計で、接続の速さと安定性を両立する。",
  },
  {
    label: "🛡",
    title: "耐量子暗号（ML-KEM）を既定で採用",
    body: "LightwayにNIST標準の耐量子暗号ML-KEMを既定で組み込み、TCP・UDPの両方でNISTセキュリティレベル5の鍵長を採用。「今の通信を記録し将来の量子コンピュータで解読する」攻撃に先行して備えられる。",
  },
  {
    label: "🌐",
    title: "105カ国以上のサーバー網",
    body: "世界105カ国以上に接続先を用意。日本を含む主要国を網羅しているため、海外からのアクセスや出張・旅行時にも使いやすい。台数よりも「設置国の広さ」と「サーバーの質」を重視する設計。",
  },
  {
    label: "🧹",
    title: "広告・悪質サイトブロック / Network Lock",
    body: "広告や悪質サイトをブロックする機能を標準搭載（上位プランではトラッカー・成人サイトのブロックも追加）。通信が切れた際に自動で遮断するキルスイッチ「Network Lock」、スプリットトンネリングにも対応する。",
  },
  {
    label: "🧰",
    title: "上位プランの付帯サービス",
    body: "Advanced以上では、パスワードマネージャー（ExpressKeys）、ID保護（Identity Defender）、メール保護（ExpressMailGuard）、eSIMデータなどが付帯。ProではExpressAIや専用IPアドレスも追加費用なしで使える。",
  },
];

const plans = [
  {
    label: "Basic",
    badge: "エントリー",
    devices: "10 台",
    blocker: "広告・悪質サイト",
    extra: "追加サービスなし",
    target: "VPNの基本機能で十分な人",
  },
  {
    label: "Advanced",
    badge: "おすすめ",
    devices: "12 台",
    blocker: "＋トラッカー・成人サイト",
    extra: "パスワード管理・ID保護・メール保護",
    target: "セキュリティ機能もまとめたい人",
    highlight: true,
  },
  {
    label: "Pro",
    badge: "全部入り",
    devices: "14 台",
    blocker: "＋トラッカー・成人サイト",
    extra: "専用IP・ExpressAI ほか",
    target: "全機能をフル活用したい人",
  },
];

const demerits = [
  {
    title: "料金は最安クラスより高めの位置づけ",
    body: "ExpressVPNは高機能なぶん、料金は最安クラスのVPNより高めに設定されている。とにかく価格を最優先したい人には割高に感じられることがある。",
    rebuttal: "全RAMサーバーや耐量子暗号など、安全性への投資が価格に反映されている。長期プランなら月額は下がり、30日間の返金保証で実際に試してから判断できる。",
  },
  {
    title: "サーバー総数を公開していない",
    body: "ExpressVPNはセキュリティ上の理由から、サーバーの総台数を積極的に公開していない。数値でスペックを比較したい人には物足りなく感じられる。",
    rebuttal: "「全サーバーRAM駆動・独立監査済み」という質を重視する設計方針による。105カ国以上をカバーしており、実用上の接続先は十分に確保されている。",
  },
  {
    title: "初回価格と更新価格の差が大きい",
    body: "長期プランは初回契約が大きく割引されるが、契約期間が終わった後の更新は通常価格に戻る。申し込み前に「初回価格」と「更新価格」を必ず両方確認しておくこと。",
    rebuttal: "更新前に他社と再比較したり、長期プランを選び直したりすれば単価は抑えられる。まず30日間の返金保証の間に使い勝手を見極めれば良い。",
  },
];

const faqs = [
  {
    q: "ExpressVPNとNordVPN、どちらを選べばよいですか？",
    a: "ざっくり分けると、全サーバーRAM駆動のハードウェア安全性や耐量子暗号の採用姿勢を重視するならExpressVPN、サーバー数・接続台数の多さと機能量・価格のバランスを重視するならNordVPNが向いています。用途別の細かな違いは比較記事で整理しています。",
    link: {
      href: "/learn/network/nordvpn-vs-expressvpn",
      label: "NordVPN vs ExpressVPN 比較",
    },
  },
  {
    q: "TrustedServerとは何ですか？",
    a: "ExpressVPNの全サーバーを、ハードディスクではなくRAM（メモリ）のみで動かす仕組みです。サーバーは再起動やシャットダウンのたびにOSごと作り直され、データが物理的に残りません。2025年にKPMGが監査し、RAM専用サーバーにログが保持されていないことを確認しています。",
  },
  {
    q: "耐量子暗号は本当に必要ですか？",
    a: "現在の暗号は十分に安全ですが、「今の暗号化通信を記録しておき、将来強力な量子コンピュータが実用化した時点で解読する（Harvest Now, Decrypt Later）」という攻撃への備えとして意味があります。長期間秘密にしたい情報を扱うなら、今から耐量子暗号を使う価値があります。ExpressVPNはLightwayにML-KEMを既定で採用済みです。",
  },
  {
    q: "無料で試せますか？返金はできますか？",
    a: "完全無料のプランはありませんが、30日間の返金保証があります。期間内に申請すれば全額返金されるため、実質的に無料で試せます。返金の対象条件や申請方法は変わることがあるため、申し込み前に公式サイトで最新の条件を確認してください。",
  },
  {
    q: "同時に何台まで接続できますか？",
    a: "プランによって異なり、Basicは10台、Advancedは12台、Proは14台まで同時接続できます。PC・スマホ・タブレット・ルーターなどをまとめて保護したい場合は、必要な台数に合わせてプランを選んでください。",
  },
  {
    q: "VPNを使えば完全に匿名になれますか？",
    a: "なりません。VPNはIPアドレスを隠し通信経路を暗号化しますが、ログイン中のサービスからは依然として本人として識別されます。VPNは通信経路を保護するツールであり、完全な匿名化ツールではない点は理解しておく必要があります。",
  },
];

// ────────────────────────────────────────────────────────────
// Shared UI components
// ────────────────────────────────────────────────────────────

function BannerImage({ ad }: { ad: BannerAd }) {
  return (
    <div className="relative rounded-xl border border-slate-200 bg-slate-100 p-2">
      <a
        href={ad.href}
        rel="nofollow sponsored noopener noreferrer"
        target="_blank"
        className="block transition hover:opacity-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ad.src}
          alt={ad.alt}
          width={ad.width}
          height={ad.height}
          style={{ objectFit: "contain" }}
          className="h-auto max-w-full rounded-md"
        />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ad.pixel}
        width={1}
        height={1}
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />
    </div>
  );
}

function CtaButton({
  href,
  children,
  variant = "solid",
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "md" | "lg";
}) {
  const variantClass =
    variant === "solid"
      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/15 hover:-translate-y-0.5 hover:bg-blue-700"
      : "border border-blue-300 bg-white text-blue-700 hover:-translate-y-0.5 hover:bg-blue-50";
  const sizeClass =
    size === "lg"
      ? "min-h-14 px-6 py-3.5 text-base"
      : "min-h-11 px-5 py-2.5 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl text-center font-black no-underline transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${variantClass} ${sizeClass}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

/** バナー + 説明文 + CTAボタン をカード形式でまとめるコンポーネント */
function BannerCard({
  eyebrow,
  heading,
  body,
  ctaLabel,
  banner,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  banner: BannerAd;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm">
      <div className="border-b border-blue-100 bg-blue-600 px-5 py-2.5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
          {eyebrow}
        </p>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-black text-slate-950">{heading}</h3>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
          <div className="w-full shrink-0 sm:w-auto">
            <BannerImage ad={banner} />
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-sm leading-7 text-slate-600">{body}</p>
            <CtaButton href={EXPRESS_URL}>{ctaLabel}</CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Page sections
// ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_72%,#ffffff_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=network" className="hover:text-slate-950">Network</Link>
          <span>/</span>
          <span>ExpressVPN</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
            PR / 広告を含みます
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-200">
            {article.date} 確認
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
            価格は公式確認
          </span>
        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          ExpressVPN レビュー
          <span className="mt-2 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-3xl sm:text-4xl">
            安全性で選ぶ定番VPN
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          ExpressVPN はセキュリティとプライバシーに定評のある定番VPN。全サーバーをRAMのみで動かす TrustedServer、Rustで書き直した独自プロトコル Lightway、耐量子暗号 ML-KEM の標準採用など、「設計レベルの安心感」を強みにしたサービスです。
        </p>

        {/* ファーストビュー：サービス紹介カード */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-lg">
          <div className="bg-blue-600 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">
              PR / 公式キャンペーン実施中
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xl font-black text-slate-950">ExpressVPN</p>
            <div className="mt-1 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-base">★</span>
              ))}
              <span className="ml-1 text-xs font-bold text-slate-500">セキュリティ重視の定番</span>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                "全サーバーRAM駆動（TrustedServer）でログが残らない設計",
                "Lightway＋耐量子暗号ML-KEMを標準採用",
                "3プラン・最大14台同時接続・30日間返金保証つき",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-center">
              <BannerImage ad={banner300x250} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CtaButton href={EXPRESS_URL} size="lg">
                公式サイトを見る
              </CtaButton>
              <CtaButton href={EXPRESS_URL} variant="outline" size="lg">
                料金を確認する
              </CtaButton>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          ※ 本ページのリンクには広告（A8.net）を含みます。価格・機能・プラン内容は記事確認時点の情報です。最新条件は公式サイトでご確認ください。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={EXPRESS_TEXT_PIXEL}
          width={1}
          height={1}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        />
      </div>
    </section>
  );
}

function TldrSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">3 sec summary</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">3秒でわかる結論</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              no: "01",
              title: "全サーバーRAM駆動で「ログが残らない」設計",
              body: "TrustedServerにより全サーバーがRAMのみで動作。2025年のKPMG監査でノーログが検証済み。ハードウェアレベルの安心感が強み。",
            },
            {
              no: "02",
              title: "耐量子暗号をいち早く標準化",
              body: "独自プロトコルLightwayにNIST標準のML-KEMを既定で採用。将来の量子コンピュータによる解読リスクに先行して備える。",
            },
            {
              no: "03",
              title: "用途で選べる3プラン・最大14台",
              body: "Basic/Advanced/Proの3階層。同時接続はBasic10台・Advanced12台・Pro14台。パスワード管理やID保護もまとめられる。",
            },
          ].map((item) => (
            <article
              key={item.no}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg transition"
            >
              <div className="absolute right-5 top-5 text-5xl font-black text-blue-100">
                {item.no}
              </div>
              <h3 className="relative text-base font-black text-slate-950">{item.title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">Features</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            主な機能 — 「設計の安全性」で選ぶ
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-600">
            ExpressVPN の強みは、速度や機能量よりも「そもそもログを残さない設計」と「将来の脅威まで見据えた暗号化」にあります。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-lg ring-1 ring-blue-200/60">
                {f.label}
              </div>
              <h3 className="mt-4 text-base font-black text-slate-950">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{f.body}</p>
            </article>
          ))}
        </div>

        {/* 機能解説後 CTA */}
        <div className="mt-10">
          <BannerCard
            eyebrow="公式キャンペーン実施中"
            heading="安全性をまとめて体験 — 30日間返金保証つき"
            body="TrustedServer、Lightway、耐量子暗号ML-KEMをまとめて試せます。まず使ってみて、合わなければ返金申請できます。"
            ctaLabel="最新キャンペーンを確認する"
            banner={banner300x250}
          />
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">Plans</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            プラン早見表 — 台数と付帯サービスで選ぶ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            VPN本体・TrustedServer・耐量子暗号はどのプランも共通。同時接続台数と付帯サービスの範囲で選びます。正確な料金・キャンペーン価格は公式サイトをご確認ください。
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.label}
              className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
                p.highlight
                  ? "border-blue-300 bg-white ring-1 ring-blue-200/70 lg:scale-[1.02]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow">
                    Most popular
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-slate-950">{p.label}</div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${p.highlight ? "bg-blue-50 text-blue-700 ring-blue-200" : "bg-slate-100 text-slate-700 ring-slate-200"}`}>
                  {p.badge}
                </span>
              </div>
              <dl className="mt-5 space-y-2 text-sm">
                {[
                  ["同時接続", p.devices],
                  ["サイトブロック", p.blocker],
                  ["付帯サービス", p.extra],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-slate-100 pb-2">
                    <dt className="shrink-0 font-bold text-slate-500">{k}</dt>
                    <dd className="text-right font-black text-slate-950">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-7 text-slate-600">{p.target}</p>
              <div className="mt-auto pt-5">
                <CtaButton href={EXPRESS_URL}>公式で料金を確認</CtaButton>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-xs leading-6 text-slate-500">
          ※ プラン内容・付帯サービス・料金は時期によって変わることがあります。購入前に必ず公式サイトで最新のプラン内容と料金をご確認ください。
        </p>

        {/* 料金解説後 CTA（最重要） */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm">
          <div className="border-b border-blue-100 bg-blue-600 px-5 py-2.5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
              最新料金を確認する
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-black text-slate-950">
              初回割引と更新価格を必ず両方チェック
            </h3>
            <p className="mt-2 mb-4 text-sm leading-7 text-slate-600">
              ExpressVPN は長期プランで初回が大きく割引されますが、更新時は通常価格に戻ります。まず公式サイトで「初回価格」と「更新価格」を両方確認してから申し込んでください。30日間の返金保証があるので、実際に試してから継続を判断できます。
            </p>
            <div className="flex justify-center">
              <BannerImage ad={banner300x250} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CtaButton href={EXPRESS_URL} size="lg">
                料金・キャンペーンを確認する
              </CtaButton>
              <CtaButton href={EXPRESS_URL} variant="outline" size="lg">
                プランを比較する
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemeritsSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">Demerits</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            気になるポイントと対処法
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            公平な判断のために、申し込み前に知っておくべき注意点も整理します。
          </p>
        </div>
        <div className="space-y-4">
          {demerits.map((d) => (
            <article
              key={d.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="flex items-start gap-2 text-base font-black text-slate-950">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-black text-amber-700">
                  !
                </span>
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{d.body}</p>
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-blue-50 p-3 text-sm text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">
                  ✓
                </span>
                <span>{d.rebuttal}</span>
              </div>
            </article>
          ))}
        </div>

        {/* デメリット解説後 CTA */}
        <div className="mt-10">
          <BannerCard
            eyebrow="こんな人にはおすすめ"
            heading="デメリットを踏まえてもおすすめできる人"
            body="通信の安全性・プライバシーを最優先したい人、サーバーがログを残さない設計に安心したい人、将来の量子コンピュータ脅威まで見据えたい人には、ExpressVPN は有力な選択肢です。まず30日間の返金保証期間内で試してみてください。"
            ctaLabel="詳細を確認する"
            banner={banner300x250}
          />
        </div>
      </div>
    </section>
  );
}

function ChecklistSection() {
  const items = [
    "契約期間（1ヶ月／1年／2年）と、その更新価格を公式サイトで確認した",
    "同時に使うデバイス数に合ったプラン（Basic 10台／Advanced 12台／Pro 14台）を選んだ",
    "必要な付帯サービス（パスワード管理・ID保護・専用IPなど）を確認した",
    "会社の端末・ネットワークで使う場合、社内のVPN利用ポリシーを確認した",
    "30日間返金保証の期間内に、自分の回線で速度・安定性を試す予定を立てた",
    "既存のVPNアプリがある場合は競合しないよう整理した",
  ];
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">Pre-flight</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">申し込み前のチェックリスト</h2>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
                  ✓
                </span>
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
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">よくある質問</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-blue-300 open:shadow-md"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
                    Q
                  </span>
                  {f.q}
                </span>
                <span aria-hidden="true" className="text-blue-700 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">
                {f.a}
                {f.link && (
                  <>
                    {" "}
                    <Link href={f.link.href} className="font-bold text-blue-700 underline-offset-2 hover:underline">
                      {f.link.label}
                    </Link>
                    {" も参考にしてください。"}
                  </>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SummarySection() {
  const fits = [
    "通信の安全性・プライバシーを最優先したい人",
    "サーバーがログを残さない「設計レベルの安心感」を求める人",
    "将来の量子コンピュータ脅威まで見据えて備えたい人",
    "パスワード管理やID保護もまとめたい人（Advanced以上）",
  ];
  return (
    <section className="bg-white px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-blue-700">Summary</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            こんな人におすすめ
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-3">
            {fits.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700 ring-1 ring-slate-200"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* 記事末尾 CTA */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="bg-blue-600 px-5 py-2.5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
                PR / 公式キャンペーン
              </p>
            </div>
            <div className="p-5">
              <div className="flex justify-center">
                <BannerImage ad={banner300x250} />
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                30日間返金保証つきで試せます。まず公式サイトで最新キャンペーンと料金を確認してください。
              </p>
              <div className="mt-4 grid gap-2">
                <CtaButton href={EXPRESS_URL} size="lg">
                  今すぐ申し込む
                </CtaButton>
                <CtaButton href={EXPRESS_URL} variant="outline">
                  特典・キャンペーンを確認する
                </CtaButton>
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
            ["ExpressVPN 公式サイト", "https://www.expressvpn.com/"],
            ["ExpressVPN 料金・プラン", "https://www.expressvpn.com/order"],
            ["Lightway プロトコル解説", "https://www.expressvpn.com/what-is-vpn/protocols/lightway"],
            ["ExpressVPN Trust Center（監査）", "https://www.expressvpn.com/trust"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline-offset-2 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          この記事は {article.date} 時点の公式情報を確認して作成しています。申し込み前には公式サイトで最新の価格・特典・契約条件・対応機能を確認してください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: "/learn/network/nordvpn-vs-expressvpn", title: "NordVPN vs ExpressVPN 比較", eyebrow: "Compare" },
    { href: "/learn/network/nordvpn-review", title: "NordVPN レビュー — 料金・速度・機能", eyebrow: "Review" },
    { href: "/learn/network/vpn-basics", title: "VPNの仕組み — IPsec・WireGuard・プライバシー", eyebrow: "Network" },
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
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                {item.eyebrow}
              </div>
              <div className="mt-2 text-sm font-black text-slate-950 group-hover:text-blue-700">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ExpressVpnReviewPage() {
  return (
    <main>
      <Hero />
      <TldrSection />
      <FeaturesSection />
      <PlansSection />
      <DemeritsSection />
      <ChecklistSection />
      <FaqSection />
      <SummarySection />
      <References />
      <RelatedLinks />
    </main>
  );
}
