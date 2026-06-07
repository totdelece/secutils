import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "virusbuster-cloud-review")!;

const VB_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+5YRHE";
const VB_TEXT_PIXEL =
  "https://www13.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+5YRHE";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const banner468x100: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+61Z81",
  src: "https://www29.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001017000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+61Z81",
  width: 468,
  height: 100,
  alt: "ウイルスバスター クラウド 公式",
};

const banner234x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+61JSH",
  src: "https://www26.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001015000&mc=1",
  pixel: "https://www19.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+61JSH",
  width: 234,
  height: 60,
  alt: "ウイルスバスター クラウド 公式",
};

const banner300x250A: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+62MDD",
  src: "https://www25.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001020000&mc=1",
  pixel: "https://www12.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+62MDD",
  width: 300,
  height: 250,
  alt: "ウイルスバスター クラウド 公式",
};

const banner300x250B: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+601S1",
  src: "https://www21.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001008000&mc=1",
  pixel: "https://www18.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+601S1",
  width: 300,
  height: 250,
  alt: "ウイルスバスター クラウド 公式",
};

const features = [
  {
    label: "AI",
    title: "AI×クラウド型ウイルス検索",
    body: "ファイル判定の大部分をトレンドマイクロのクラウドサーバーで処理。定義ファイルの手動更新が不要で、スキャン時のCPU負荷が低く、古めのPCでも動作が軽い。",
  },
  {
    label: "🛡",
    title: "フォルダシールド（ランサム対策）",
    body: "マイドキュメント・ピクチャ等の重要フォルダへの不正な書き換えをリアルタイムでブロック。ランサムウェアによるファイル暗号化を未然に防ぐ専用の保護機能。",
  },
  {
    label: "💳",
    title: "Pay Guard（決済保護）",
    body: "ネットバンキングや決済サイトへのアクセスを専用の保護ブラウザ環境で実行。フォームデータの横取りや画面キャプチャを防ぎ、金融取引をより安全に行える。",
  },
  {
    label: "🔗",
    title: "Web脅威対策（フィッシング遮断）",
    body: "アクセス前にURLをリアルタイム判定。フィッシングサイト・詐欺サイトへの誘導を自動ブロック。SMS経由のスミッシングリンクにも対応している。",
  },
  {
    label: "📱",
    title: "スマートフォン対応",
    body: "iOS / Android 向けアプリを提供。迷惑電話ブロック・Wi-Fiスポットでの通信保護・紛失デバイスのリモートロックも利用できる。",
  },
  {
    label: "👨‍👩‍👧",
    title: "家族を見守る（ペアレンタルコントロール）",
    body: "子供のデバイスで有害サイトをフィルタリング、利用時間の制限、アクセスログの確認が可能。複数台プランで家族全員のデバイスをまとめて管理できる。",
  },
];

const plans = [
  {
    label: "1台版",
    badge: "まず試す",
    devices: "1 台",
    target: "自分のPCまたはスマホ1台だけ守りたい",
    note: "まず単体で試してみたい人向け。3台版との価格差は小さいことが多い。",
  },
  {
    label: "3台版",
    badge: "おすすめ",
    devices: "3 台",
    target: "PC＋スマホ、またはMacとWindowsを両方守りたい",
    note: "個人・カップル・小世帯に最適。台数コスパが最も高いプランが多い。",
    highlight: true,
  },
  {
    label: "5台版",
    badge: "家族全員をカバー",
    devices: "5 台",
    target: "家族のPC・スマホをまとめて保護したい",
    note: "1台あたりのコストが最も低くなる。子供のスマホ管理にもペアレンタルコントロールが使える。",
  },
];

const demerits = [
  {
    title: "VPN が単体で付いていない",
    body: "Norton 360 にはVPNが内蔵されているが、ウイルスバスター クラウドにはVPN機能が含まれていない。公共Wi-Fiでの通信保護が必要な場合は別途VPNサービスを検討する必要がある。",
    rebuttal: "自宅メインの利用・モバイルデータ通信が中心の人にはVPN不要なことが多い。Pay GuardでネットバンキングはカバーできるためVPNの代替になる場面もある。",
  },
  {
    title: "初回価格と更新価格の差がある",
    body: "初年度はキャンペーン割引が適用されることが多く、2年目以降は通常価格に変わる。購入前に「初回価格」と「更新価格」を必ずセットで確認しておく必要がある。",
    rebuttal: "長期プランを選ぶと1年あたりの単価が抑えられる。複数年契約で総コストを計算してから検討するのがおすすめ。",
  },
  {
    title: "機能の多さゆえに初期設定が必要",
    body: "フォルダシールドの保護対象フォルダ設定、ペアレンタルコントロールの詳細設定など、使いこなすには導入時に設定の確認が必要。",
    rebuttal: "デフォルト設定でも基本的なウイルス保護・フィッシング対策は機能する。設定は後から変更できる。",
  },
];

const faqs = [
  {
    q: "Windows Defenderがあれば不要では？",
    a: "Windows Defenderはウイルス検知の基本性能は十分ですが、ランサムウェア対策のフォルダシールド・Pay Guard（金融取引保護）・フィッシング対策URL判定・スマートフォン保護・ペアレンタルコントロールは含まれていません。これらの機能を必要とするかどうかで判断してください。",
  },
  {
    q: "ノートンとどう違うの？",
    a: "ウイルスバスター クラウドの強みは「Pay Guard（金融取引専用保護）・フォルダシールド（ランサムウェア対策）・日本語24時間電話サポート・日本メーカーによる国内特化の脅威対応」です。Norton 360 の強みは「VPN内蔵・100GBクラウドバックアップ・ダークウェブモニタリング・世界規模の脅威インテリジェンス」。ネットバンキングをよく使う人・日本語サポートを重視する人にはウイルスバスターが向いています。",
    link: {
      href: "/learn/security/norton-360-review",
      label: "ノートン 360 レビュー",
    },
  },
  {
    q: "Mac やスマートフォンでも使えますか？",
    a: "Windows・macOS・iOS・Android に対応しています。1つの契約でプランの台数制限内であればOSを問わず混在して使えます。ただしOS ごとに使える機能が異なる場合があるため、公式の動作環境ページで確認してください。",
  },
  {
    q: "更新時の価格が高くなることはありますか？",
    a: "初回購入価格とそれ以降の更新価格は異なる場合があります。購入前に「初回価格」と「2年目以降の更新価格」を必ず確認してください。長期契約プランを選ぶと1年あたりの単価が下がることが多いです。",
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
      ? "bg-red-600 text-white shadow-lg shadow-red-950/15 hover:-translate-y-0.5 hover:bg-red-700"
      : "border border-red-300 bg-white text-red-700 hover:-translate-y-0.5 hover:bg-red-50";
  const sizeClass =
    size === "lg"
      ? "min-h-14 px-6 py-3.5 text-base"
      : "min-h-11 px-5 py-2.5 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl text-center font-black no-underline transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${variantClass} ${sizeClass}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

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
    <div className="overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white shadow-sm">
      <div className="border-b border-red-100 bg-red-600 px-5 py-2.5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-100">
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
            <CtaButton href={VB_URL}>{ctaLabel}</CtaButton>
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fef2f2_0%,#f8fafc_72%,#ffffff_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=security" className="hover:text-slate-950">Security</Link>
          <span>/</span>
          <span>ウイルスバスター クラウド</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
            PR / 広告を含みます
          </span>
          <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700 ring-1 ring-red-200">
            {article.date} 確認
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
            価格は公式確認
          </span>
        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          ウイルスバスター クラウド レビュー
          <span className="mt-2 block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent text-3xl sm:text-4xl">
            国内シェア No.1 が PC とスマホをまとめて守る
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          ウイルスバスター クラウドはトレンドマイクロが提供する国内シェア No.1 のセキュリティソフト。ウイルス検知だけでなく、ランサムウェア対策・フィッシング遮断・ネットバンキング保護まで一括カバーします。
        </p>

        {/* ファーストビュー：サービス紹介カード */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-red-200 bg-white shadow-lg">
          <div className="bg-red-600 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-100">
              PR / 公式キャンペーン実施中
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xl font-black text-slate-950">ウイルスバスター クラウド</p>
            <div className="mt-1 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-base">★</span>
              ))}
              <span className="ml-1 text-xs font-bold text-slate-500">国内シェア No.1</span>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                "ランサムウェア対策（フォルダシールド）搭載",
                "Pay Guard でネットバンキングを専用保護",
                "30日間無料体験あり",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-black text-red-700">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-center">
              <div className="hidden sm:block">
                <BannerImage ad={banner468x100} />
              </div>
              <div className="sm:hidden">
                <BannerImage ad={banner234x60} />
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CtaButton href={VB_URL} size="lg">
                公式サイトを見る
              </CtaButton>
              <CtaButton href={VB_URL} variant="outline" size="lg">
                料金を確認する
              </CtaButton>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          ※ 本ページのリンクには広告を含みます。価格・機能・対応 OS は記事執筆時点の情報です。最新条件は公式サイトでご確認ください。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={VB_TEXT_PIXEL}
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-700">3 sec summary</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">3秒でわかる結論</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              no: "01",
              title: "クラウド処理で端末が重くならない",
              body: "ウイルス判定処理の大部分をトレンドマイクロのクラウドで行う設計。スキャン時にCPU使用率が跳ね上がりにくく、古めのPCでも動作が軽い。",
            },
            {
              no: "02",
              title: "ランサムウェアと金融詐欺に強い",
              body: "フォルダシールドで重要ファイルへの不正書き換えをブロック。Pay Guardはネットバンキング・オンライン決済を専用の保護ブラウザで実行し、情報横取りを防ぐ。",
            },
            {
              no: "03",
              title: "日本語で24時間サポートを受けられる",
              body: "1988年創業のトレンドマイクロ社製。サポートは日本語で24時間365日対応。海外製品にありがちな「日本語サポートが薄い」問題がない。",
            },
          ].map((item) => (
            <article
              key={item.no}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-red-300 hover:shadow-lg transition"
            >
              <div className="absolute right-5 top-5 text-5xl font-black text-red-100">
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-700">Features</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            主な機能 — 何を守ってくれるか
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-600">
            ウイルス検知は入口に過ぎない。ランサムウェア・フィッシング・金融詐欺など、現代の脅威に合わせた機能が揃っています。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-lg ring-1 ring-red-200/60">
                {f.label}
              </div>
              <h3 className="mt-4 text-base font-black text-slate-950">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{f.body}</p>
            </article>
          ))}
        </div>

        {/* メリット解説後 CTA ── ガイドライン② */}
        <div className="mt-10">
          <BannerCard
            eyebrow="公式キャンペーン実施中"
            heading="6つの機能をまとめて体験 — 30日間無料"
            body="ウイルス対策・フォルダシールド・Pay Guard・フィッシング遮断・スマホ保護・ペアレンタルコントロールが一本に。まず試して、合わなければ解約できます。"
            ctaLabel="最新キャンペーンを確認する"
            banner={banner300x250A}
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-700">Plans</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            プラン早見表 — 台数で選ぶ
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
                  ? "border-red-300 bg-white ring-1 ring-red-200/70 lg:scale-[1.02]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow">
                    Most popular
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-slate-950">{p.label}</div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${p.highlight ? "bg-red-50 text-red-700 ring-red-200" : "bg-slate-100 text-slate-700 ring-slate-200"}`}>
                  {p.badge}
                </span>
              </div>
              <dl className="mt-5 space-y-2 text-sm">
                {[["対応台数", p.devices]].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-bold text-slate-500">{k}</dt>
                    <dd className="font-black text-slate-950">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm font-bold text-slate-700">{p.target}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{p.note}</p>
              <div className="mt-auto pt-5">
                <CtaButton href={VB_URL}>公式で料金を確認</CtaButton>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-xs leading-6 text-slate-500">
          ※ プラン名・機能・料金は変更される場合があります。購入前に必ず公式サイトで最新条件をご確認ください。
        </p>

        {/* 料金解説後 CTA ── ガイドライン③（最重要） */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white shadow-sm">
          <div className="border-b border-red-100 bg-red-600 px-5 py-2.5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-100">
              最新料金を確認する
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-black text-slate-950">
              初回割引と更新価格をセットで確認
            </h3>
            <p className="mt-2 mb-4 text-sm leading-7 text-slate-600">
              ウイルスバスター クラウドは初年度に割引が適用されることが多く、2年目以降は通常価格になります。まず公式サイトで「初回価格」と「更新価格」を両方確認してから申し込んでください。
            </p>
            <div className="hidden sm:flex sm:justify-center">
              <BannerImage ad={banner468x100} />
            </div>
            <div className="mt-3 flex justify-center sm:hidden">
              <BannerImage ad={banner234x60} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CtaButton href={VB_URL} size="lg">
                料金・キャンペーンを確認する
              </CtaButton>
              <CtaButton href={VB_URL} variant="outline" size="lg">
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-700">Demerits</p>
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
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white">
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
            body="ネットバンキングやオンラインショッピングを頻繁に使う人、家族のデバイスをまとめて保護したい人、日本語サポートを重視する人には、ウイルスバスター クラウドは費用対効果が高い選択肢です。まず30日間の無料体験で試してみてください。"
            ctaLabel="詳細を確認する"
            banner={banner300x250B}
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
    "守りたい台数に合ったプラン（1台/3台/5台）を選んだ",
    "初回価格と2年目以降の更新価格を公式サイトで確認した",
    "既存のセキュリティソフトをアンインストールしてから導入する",
    "Pay Guard使用時の対応ブラウザ（Chrome/Edge等）を確認した",
    "フォルダシールドの保護対象フォルダを導入後に設定する",
  ];
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-700">Pre-flight</p>
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">よくある質問</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-red-300 open:shadow-md"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-black text-red-700">
                    Q
                  </span>
                  {f.q}
                </span>
                <span aria-hidden="true" className="text-red-700 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">
                {f.a}
                {f.link && (
                  <>
                    {" "}
                    <Link href={f.link.href} className="font-bold text-red-700 underline-offset-2 hover:underline">
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
    "ネットバンキングやオンライン決済を頻繁に使う人",
    "家族のPC・スマホをまとめて保護したい人",
    "日本語の24時間サポートを重視する人",
    "ランサムウェアによるファイル暗号化が心配な人",
  ];
  return (
    <section className="bg-white px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-red-700">Summary</p>
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
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* 記事末尾 CTA ── ガイドライン⑤ */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="bg-red-600 px-5 py-2.5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-100">
                PR / 公式キャンペーン
              </p>
            </div>
            <div className="p-5">
              <div className="hidden sm:flex sm:justify-center">
                <BannerImage ad={banner468x100} />
              </div>
              <div className="flex justify-center sm:hidden">
                <BannerImage ad={banner234x60} />
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                30日間無料体験で全機能を試せます。まず公式サイトで最新キャンペーンと料金を確認してください。
              </p>
              <div className="mt-4 grid gap-2">
                <CtaButton href={VB_URL} size="lg">
                  今すぐ申し込む
                </CtaButton>
                <CtaButton href={VB_URL} variant="outline">
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
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-950">参考にした公式情報</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {[
            ["ウイルスバスター クラウド 公式サイト", "https://www.trendmicro.com/ja_jp/forHome/products/virbusters.html"],
            ["ウイルスバスター クラウド 機能一覧", "https://www.trendmicro.com/ja_jp/forHome/products/virbusters/features.html"],
            ["動作環境・対応OS", "https://www.trendmicro.com/ja_jp/forHome/products/virbusters/requirements.html"],
            ["トレンドマイクロ株式会社（運営会社）", "https://www.trendmicro.com/ja_jp/about.html"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-red-700 underline-offset-2 hover:underline">
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
    { href: "/learn/security/norton-360-review", title: "ノートン 360 レビュー", eyebrow: "Compare" },
    { href: "/learn/security/ransomware-2026", title: "ランサムウェアの最新動向と対策", eyebrow: "Security" },
    { href: "/learn/security/infostealer-session-hijacking", title: "インフォスティーラーとセッションハイジャック", eyebrow: "Security" },
  ];
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-black text-slate-950">関連して読む</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-300 hover:shadow-md"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-red-700">
                {item.eyebrow}
              </div>
              <div className="mt-2 text-sm font-black text-slate-950 group-hover:text-red-700">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VirusBusterCloudReviewPage() {
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
