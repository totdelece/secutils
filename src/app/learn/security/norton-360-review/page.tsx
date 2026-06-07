import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "norton-360-review")!;

const NORTON_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+61C2Q";
const NORTON_TEXT_PIXEL =
  "https://www12.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+61C2Q";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const banner468x60A: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+60H7L",
  src: "https://www26.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001010000&mc=1",
  pixel: "https://www17.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+60H7L",
  width: 468,
  height: 60,
  alt: "ノートン 360 公式",
};

const banner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+631SX",
  src: "https://www22.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001022000&mc=1",
  pixel: "https://www16.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+631SX",
  width: 300,
  height: 250,
  alt: "ノートン 360 公式",
};

const banner468x60B: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+63H8H",
  src: "https://www24.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001024000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+63H8H",
  width: 468,
  height: 60,
  alt: "ノートン 360 公式",
};

const banner234x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+62MDD",
  src: "https://www25.a8.net/svt/bgt?aid=260607753064&wid=001&eno=01&mid=s00000016371001020000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B5Q89+123RHU+3IBI+62MDD",
  width: 234,
  height: 60,
  alt: "ノートン 360 公式",
};

const features = [
  {
    label: "🛡",
    title: "リアルタイムウイルス保護",
    body: "ファイル・アプリ・ダウンロードをリアルタイムでスキャン。全世界 5 億台超の端末から収集した脅威データをもとに、既知・未知のマルウェアを検出しブロックする。",
  },
  {
    label: "🌐",
    title: "内蔵 VPN（Secure VPN）",
    body: "公共 Wi-Fi 接続時に通信を自動暗号化。ログを保持しないノーログポリシーを採用。Deluxe 以上では帯域制限なしで使え、別途 VPN サービスを契約する必要がなくなる。",
  },
  {
    label: "🔑",
    title: "パスワードマネージャー内蔵",
    body: "Norton Password Manager が標準搭載。サイトごとに強力なパスワードを自動生成・保存し、ブラウザ拡張から自動入力できる。別途 1Password 等を契約するコストを削減できる。",
  },
  {
    label: "☁",
    title: "100GB クラウドバックアップ",
    body: "PC のファイルをクラウドに自動バックアップ。ランサムウェアで暗号化されても、バックアップから復元できる二重防御を実現する。",
  },
  {
    label: "🔍",
    title: "ダークウェブモニタリング",
    body: "登録したメールアドレス・電話番号・クレジットカード番号などがダークウェブ上で売買されていないかを継続監視。流出検知時にはすぐに通知が届く。",
  },
  {
    label: "👨‍👩‍👧",
    title: "ペアレンタルコントロール",
    body: "Deluxe 以上に搭載。子供のデバイスで有害サイトをフィルタリング、利用時間の制限、位置情報確認が可能。家族全員のデバイスをまとめて管理できる。",
  },
];

const plans = [
  {
    label: "Standard",
    badge: "まず試す",
    devices: "1 台",
    vpn: "帯域制限あり",
    backup: "2GB",
    target: "自分の PC またはスマホ 1 台のみ",
  },
  {
    label: "Deluxe",
    badge: "おすすめ",
    devices: "3〜5 台",
    vpn: "帯域無制限",
    backup: "50GB",
    target: "PC・スマホ複数台 + 家族のデバイス",
    highlight: true,
  },
  {
    label: "Premium",
    badge: "大家族向け",
    devices: "5 台以上",
    vpn: "帯域無制限",
    backup: "100GB",
    target: "家族全員をまとめてカバー",
  },
];

const demerits = [
  {
    title: "初回価格と更新価格の差が大きい",
    body: "初年度は大幅割引が適用されることが多いが、2 年目以降は通常価格になる。購入前に必ず更新価格を確認してコストを試算しておくこと。",
    rebuttal: "長期プランを選ぶと 1 年あたりの単価が抑えられる。",
  },
  {
    title: "VPN は Standard プランで帯域制限あり",
    body: "動画視聴や大容量通信での VPN 常時利用には Standard では物足りない場合がある。帯域無制限が必要なら Deluxe 以上を選ぶ必要がある。",
    rebuttal: "公共 Wi-Fi でのセキュリティ確保程度なら Standard でも十分。",
  },
  {
    title: "機能が多い分、設定項目が多い",
    body: "ダークウェブモニタリングの登録情報設定、バックアップスケジュールの設定など、使いこなすには初期設定の手間がかかる。",
    rebuttal: "デフォルト設定でも基本保護は機能する。設定は後から調整できる。",
  },
];

const faqs = [
  {
    q: "ウイルスバスターとどう違うの？",
    a: "Norton 360 の主な強みは「VPN 内蔵・クラウドバックアップ・ダークウェブモニタリング・世界規模の脅威インテリジェンス」。ウイルスバスター クラウドの強みは「Pay Guard（金融取引専用保護）・フォルダシールド・日本語 24 時間電話サポート」。セット機能の多さで選ぶなら Norton、Pay Guard と日本語電話サポートを重視するならウイルスバスターが向いています。",
    link: {
      href: "/learn/security/virusbuster-cloud-review",
      label: "ウイルスバスター クラウド レビュー",
    },
  },
  {
    q: "Mac やスマートフォンでも使えますか？",
    a: "Windows・macOS・iOS・Android に対応しています。1 つの契約で、プランの台数制限内であれば OS を問わず混在して使えます。ただし OS ごとに使える機能が異なる場合があるため、公式の動作環境ページで確認してください。",
  },
  {
    q: "60 日間返金保証の条件は？",
    a: "購入から 60 日以内であれば理由を問わず返金申請が可能です（一部プランは条件が異なる場合あり）。公式サイトの返金ポリシーで最新条件を確認してください。",
  },
  {
    q: "更新価格の確認はどこでできますか？",
    a: "Norton 公式サイトの購入画面で、初回価格と「翌年以降の更新価格」が表示されます。購入前に必ず両方の価格を確認してから申し込んでください。",
  },
];

// ────────────────────────────────────────────────────────────
// Shared UI components
// ────────────────────────────────────────────────────────────

function BannerImage({ ad }: { ad: BannerAd }) {
  return (
    <div className="relative">
      <a
        href={ad.href}
        rel="nofollow noopener noreferrer"
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
      rel="nofollow noopener noreferrer"
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
  mobileBanner,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  banner: BannerAd;
  mobileBanner?: BannerAd;
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
            {mobileBanner ? (
              <>
                <div className="sm:hidden">
                  <BannerImage ad={mobileBanner} />
                </div>
                <div className="hidden sm:block">
                  <BannerImage ad={banner} />
                </div>
              </>
            ) : (
              <BannerImage ad={banner} />
            )}
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-sm leading-7 text-slate-600">{body}</p>
            <CtaButton href={NORTON_URL}>{ctaLabel}</CtaButton>
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
          <Link href="/learn?category=security" className="hover:text-slate-950">Security</Link>
          <span>/</span>
          <span>ノートン 360</span>
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
          ノートン 360 レビュー
          <span className="mt-2 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-3xl sm:text-4xl">
            世界 No.1 が一本でまるごと守る
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          Norton 360 は世界販売台数 No.1 のセキュリティブランド。ウイルス対策にとどまらず、VPN・パスワードマネージャー・クラウドバックアップ・ダークウェブモニタリングをひとつの契約に集約したオールインワンサービスです。
        </p>

        {/* ファーストビュー：サービス紹介カード */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-lg">
          <div className="bg-blue-600 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">
              PR / 公式キャンペーン実施中
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="text-xl font-black text-slate-950">ノートン 360</p>
                <div className="mt-1 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-base">★</span>
                  ))}
                  <span className="ml-1 text-xs font-bold text-slate-500">世界販売台数 No.1</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {[
                    "ウイルス対策 + VPN + バックアップが一本に",
                    "ダークウェブ流出を継続監視",
                    "60 日間返金保証付き",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <CtaButton href={NORTON_URL} size="lg">
                    公式サイトを見る
                  </CtaButton>
                  <CtaButton href={NORTON_URL} variant="outline" size="lg">
                    料金を確認する
                  </CtaButton>
                </div>
              </div>
              <div className="shrink-0">
                <div className="hidden sm:block">
                  <BannerImage ad={banner468x60A} />
                </div>
                <div className="sm:hidden">
                  <BannerImage ad={banner234x60} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          ※ 本ページのリンクには広告を含みます。価格・機能・対応 OS は記事執筆時点の情報です。最新条件は公式サイトでご確認ください。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={NORTON_TEXT_PIXEL}
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
              title: "VPN・バックアップ・パスワード管理が一本に",
              body: "別々に契約すれば月数千円かかるサービスを Norton 360 一本に集約。Deluxe 以上なら VPN 帯域も無制限で使える。",
            },
            {
              no: "02",
              title: "ダークウェブでの情報流出を継続監視",
              body: "メール・電話番号・クレジットカードがダークウェブに流れていないかを常時モニタリングし、検知時に即アラートを送る。",
            },
            {
              no: "03",
              title: "全世界 5 億台の脅威情報で最速対応",
              body: "グローバル規模のセンサーネットワークが新種マルウェアをいち早く検知。国内専業ブランドにはないスケールの防御力。",
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
            主な機能 — ウイルス対策だけじゃない
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-600">
            Norton 360 はセキュリティソフトの枠を超えたオールインワンパッケージ。単体で買えば月額がかかるサービスを一本にまとめています。
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

        {/* メリット解説後 CTA ── ガイドライン②  */}
        <div className="mt-10">
          <BannerCard
            eyebrow="公式キャンペーン実施中"
            heading="6つの機能をまとめて体験 — 60日間返金保証付き"
            body="ウイルス対策・VPN・パスワードマネージャー・バックアップ・ダークウェブ監視・ペアレンタルコントロールが一本に。まず試して、合わなければ返金申請できます。"
            ctaLabel="最新キャンペーンを確認する"
            banner={banner300x250}
            mobileBanner={banner234x60}
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
            プラン早見表 — 台数と機能で選ぶ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            正確な料金・キャンペーン価格は公式サイトをご確認ください。
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
                  ["対応台数", p.devices],
                  ["VPN", p.vpn],
                  ["クラウドバックアップ", p.backup],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-bold text-slate-500">{k}</dt>
                    <dd className="font-black text-slate-950">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-7 text-slate-600">{p.target}</p>
              <div className="mt-auto pt-5">
                <CtaButton href={NORTON_URL}>公式で料金を確認</CtaButton>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-xs leading-6 text-slate-500">
          ※ プラン名・機能・料金は変更される場合があります。購入前に必ず公式サイトで最新条件をご確認ください。
        </p>

        {/* 料金解説後 CTA ── ガイドライン③（最重要） */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm">
          <div className="border-b border-blue-100 bg-blue-600 px-5 py-2.5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
              最新料金を確認する
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-black text-slate-950">
              初回割引キャンペーンの適用期間を確認
            </h3>
            <p className="mt-2 mb-4 text-sm leading-7 text-slate-600">
              Norton 360 は初年度に大幅割引が適用されることが多く、2 年目以降は通常価格になります。まず公式サイトで「初回価格」と「更新価格」を両方確認してから申し込んでください。
            </p>
            <div className="hidden sm:block">
              <BannerImage ad={banner468x60B} />
            </div>
            <div className="mt-3 sm:hidden">
              <BannerImage ad={banner234x60} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CtaButton href={NORTON_URL} size="lg">
                料金・キャンペーンを確認する
              </CtaButton>
              <CtaButton href={NORTON_URL} variant="outline" size="lg">
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
            公平な判断のために、購入前に知っておくべき注意点を整理します。
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

        {/* デメリット解説後 CTA ── ガイドライン④ */}
        <div className="mt-10">
          <BannerCard
            eyebrow="こんな人にはおすすめ"
            heading="デメリットを踏まえてもおすすめできる人"
            body="VPN・バックアップ・パスワード管理を別々に契約している人、家族のデバイスをまとめて保護したい人、ダークウェブ流出が心配な人には、Norton 360 は費用対効果が高い選択肢です。まず 60 日間の返金保証期間内で試してみてください。"
            ctaLabel="詳細を確認する"
            banner={banner300x250}
            mobileBanner={banner234x60}
          />
        </div>
      </div>
    </section>
  );
}

function ChecklistSection() {
  const items = [
    "使用デバイスの OS が対応範囲内か確認した",
    "守りたい台数に合ったプラン（Standard / Deluxe / Premium）を選んだ",
    "初回価格と 2 年目以降の更新価格を公式サイトで確認した",
    "VPN 帯域無制限が必要なら Deluxe 以上を選んだ",
    "既存のセキュリティソフトをアンインストールしてから導入する",
    "ダークウェブモニタリングに登録するメールアドレスを決めた",
  ];
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">Pre-flight</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">購入前のチェックリスト</h2>
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
    "VPN・バックアップ・パスワード管理を一本にまとめたい人",
    "家族のデバイス（PC・スマホ・タブレット）をまとめて保護したい人",
    "ダークウェブへの情報流出が心配な人",
    "世界規模の脅威インテリジェンスによる高い検知精度を求める人",
  ];
  return (
    <section className="bg-slate-950 px-5 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-blue-400">Summary</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            こんな人におすすめ
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-3">
            {fits.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-7 text-slate-200 ring-1 ring-white/10"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* 記事末尾 CTA ── ガイドライン⑤ */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="bg-blue-600 px-5 py-2.5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">
                PR / 公式キャンペーン
              </p>
            </div>
            <div className="p-5">
              <div className="hidden sm:block">
                <BannerImage ad={banner468x60A} />
              </div>
              <div className="sm:hidden">
                <BannerImage ad={banner234x60} />
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                60 日間返金保証付きで試せます。まず公式サイトで最新キャンペーンと料金を確認してください。
              </p>
              <div className="mt-4 grid gap-2">
                <CtaButton href={NORTON_URL} size="lg">
                  今すぐ申し込む
                </CtaButton>
                <CtaButton href={NORTON_URL} variant="outline">
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
            ["Norton 公式サイト（日本）", "https://jp.norton.com/"],
            ["Norton 360 プラン・料金一覧", "https://jp.norton.com/products"],
            ["Norton ウイルス対策・機能紹介", "https://jp.norton.com/feature/antivirus"],
            ["Norton Secure VPN", "https://jp.norton.com/feature/secure-vpn"],
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
    { href: "/learn/security/virusbuster-cloud-review", title: "ウイルスバスター クラウド レビュー", eyebrow: "Compare" },
    { href: "/learn/security/ransomware-2026", title: "ランサムウェアの最新動向と対策", eyebrow: "Security" },
    { href: "/learn/security/infostealer-session-hijacking", title: "インフォスティーラーとセッションハイジャック", eyebrow: "Security" },
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

export default function Norton360ReviewPage() {
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
