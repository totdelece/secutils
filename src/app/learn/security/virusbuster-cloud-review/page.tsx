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

const banner300x250A: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+62MDD",
  src: "https://www25.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001020000&mc=1",
  pixel: "https://www12.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+62MDD",
  width: 300,
  height: 250,
  alt: "ウイルスバスター クラウド 公式",
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

const banner300x250B: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+601S1",
  src: "https://www21.a8.net/svt/bgt?aid=260607748200&wid=001&eno=01&mid=s00000015315001008000&mc=1",
  pixel: "https://www18.a8.net/0.gif?a8mat=4B5Q84+3B2PRM+3A66+601S1",
  width: 300,
  height: 250,
  alt: "ウイルスバスター クラウド 公式",
};

const heroHighlights = [
  ["国内シェア", "No.1"],
  ["AI×クラウド", "型検知"],
  ["Win/Mac/", "スマホ対応"],
  ["30日間", "無料体験"],
];

const tldr = [
  {
    title: "クラウド処理で端末が重くならない",
    body: "ウイルス判定処理の大部分をトレンドマイクロのクラウドサーバーで行う設計。スキャン時にCPU使用率が跳ね上がりにくく、古めのPCでも動作が軽い。",
  },
  {
    title: "ランサムウェアとフィッシングに強い",
    body: "「フォルダシールド」で重要フォルダへの不正書き込みをブロック。「Pay Guard」はネットバンキングやオンライン決済を専用の保護ブラウザで実行し、画面キャプチャや改ざんを防ぐ。",
  },
  {
    title: "日本企業が日本語で24時間サポート",
    body: "1988年創業のトレンドマイクロ社製。サポートは日本語で24時間365日対応。企業・官公庁への導入実績も豊富で、個人向けでも信頼性が高い。",
  },
];

const features = [
  {
    label: "AI",
    title: "AI×クラウド型ウイルス検索",
    body: "既知・未知の脅威をクラウド側のAIが判定。定義ファイルの手動更新が不要で、最新の脅威に常に対応できる状態を維持する。",
  },
  {
    label: "🛡",
    title: "フォルダシールド（ランサム対策）",
    body: "マイドキュメント・ピクチャ等の重要フォルダへの不正な書き換えをリアルタイムでブロック。ランサムウェアによる暗号化を未然に防ぐ。",
  },
  {
    label: "💳",
    title: "Pay Guard（決済保護）",
    body: "ネットバンキング・クレジットカード決済を専用ブラウザ環境で保護。フォームデータの横取りや画面キャプチャを防ぐ機能を搭載。",
  },
  {
    label: "🔗",
    title: "Web脅威対策（フィッシング遮断）",
    body: "アクセス前にURLをリアルタイム判定。フィッシングサイト・詐欺サイトへの誘導を自動ブロック。SMS経由のスミッシングリンクにも対応。",
  },
  {
    label: "📱",
    title: "スマートフォン対応",
    body: "iOS / Android 向けアプリを提供。迷惑電話のブロック、Wi-Fiスポットでの通信保護、紛失デバイスのリモートロックも含まれる。",
  },
  {
    label: "👨‍👩‍👧",
    title: "家族を見守る（ペアレンタルコントロール）",
    body: "子供のデバイスで有害サイトをフィルタリング、利用時間の制限、アクセスログの確認が可能。複数台プランで家族全員をカバーできる。",
  },
];

const plans = [
  {
    label: "1台版",
    badge: "まず試す",
    target: "自分のPC・スマホ1台だけ守りたい",
    note: "まず単体で試してみたい人向け。3台版との価格差は小さい場合が多い。",
  },
  {
    label: "3台版",
    badge: "最もバランスが良い",
    target: "PC+スマホ、またはPCとMacを両方守りたい",
    note: "個人・カップル・小世帯に最適。台数コスパが最も高いプランが多い。",
    highlight: true,
  },
  {
    label: "5台版",
    badge: "家族全員をカバー",
    target: "家族のPC・スマホをまとめて保護したい",
    note: "親・子供など複数台デバイスがある家庭向け。1台あたりのコストが最も低くなる。",
  },
];

const whyChoose = [
  {
    no: "01",
    title: "PC・スマホを一元管理",
    body: "Windows / macOS / iOS / Android を1つの契約でカバー。家族全員のデバイスを管理コンソールからまとめて確認できる。",
  },
  {
    no: "02",
    title: "ランサムウェア被害を未然に防ぐ",
    body: "業務PCや家族写真など、取り返しのつかないファイルを守りたいならフォルダシールドは実用的。バックアップと組み合わせるとより堅牢。",
  },
  {
    no: "03",
    title: "ネットバンキングの安心感",
    body: "Pay Guardは金融系サービス専用の保護ブラウザを自動起動。「見えないところで通信を盗まれる」リスクを減らしたい人に向く。",
  },
  {
    no: "04",
    title: "フィッシング対策を自動化",
    body: "手動でURLを確認しなくてもクラウドが自動判定。家族の中にITリテラシーが低いメンバーがいる場合は特に安心感が高い。",
  },
  {
    no: "05",
    title: "30日間の無料体験",
    body: "まず使ってみて合わなければ解約できる。インストールしてすぐ全機能が使えるため、動作感やUIを購入前に確認できる。",
  },
  {
    no: "06",
    title: "日本語サポートが充実",
    body: "電話・チャット・リモートサポートを日本語で提供。海外製品にありがちな「日本語サポートが薄い」問題がない。",
  },
];

const checklist = [
  "現在使用しているOSとバージョンが対応範囲か確認した",
  "守りたいデバイス台数に合ったプランを選んでいるか",
  "契約期間（1年/2年/3年）と更新後の価格を確認した",
  "無料体験期間の終了日と自動更新条件を把握している",
  "既存のセキュリティソフトをアンインストールしてから導入する",
  "Pay Guard使用時は対応ブラウザ（Chrome/Edge等）を確認した",
];

const faqs = [
  {
    q: "Windows Defenderがあれば不要では？",
    a: "Windows Defenderはウイルス検知の基本性能は十分ですが、ランサムウェア対策のフォルダシールド、Pay Guard（金融取引保護）、フィッシング対策URL判定、スマートフォン保護、ペアレンタルコントロールといった機能は含まれていません。これらの機能を必要とするかどうかで判断してください。",
  },
  {
    q: "Macにも入れられますか？",
    a: "はい。ウイルスバスター クラウドはmacOSに対応しています。1台版/3台版/5台版のどのプランでもWindows・Macを混在して使えます。ただし対応バージョンは時期によって変わるため、インストール前に公式の動作環境ページを確認してください。",
  },
  {
    q: "スマートフォン（iOS/Android）でも使えますか？",
    a: "使えます。スマートフォン向けアプリでは迷惑電話ブロッカー、Wi-Fi接続の安全チェック、フィッシングURL判定、紛失時のリモートロック機能が使えます。ただし台数のカウント方法（スマホを1台として数えるか）はプランにより異なるため、購入前に公式サイトで確認してください。",
    link: {
      href: "/learn/security/infostealer-session-hijacking",
      label: "スマートフォンを狙うインフォスティーラー解説",
    },
  },
  {
    q: "他のセキュリティソフトと同時に使えますか？",
    a: "原則として複数のセキュリティソフトを同時に動かすと競合が起きます。インストール前に既存のセキュリティソフト（Norton / ESET / McAfee 等）を完全にアンインストールしてから導入してください。Windows Defenderはウイルスバスター導入後に自動で無効化されます。",
  },
  {
    q: "更新時の価格が高くなることはありますか？",
    a: "初回購入価格とそれ以降の更新価格は異なる場合があります。購入前に「初回価格」と「2年目以降の更新価格」を必ず確認してください。長期契約プランを選ぶと1年あたりの単価が下がることが多いです。",
  },
];

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "emerald" | "amber" | "blue" | "red";
}) {
  const map = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    red: "bg-red-50 text-red-700 ring-red-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${map[tone]}`}
    >
      {children}
    </span>
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
      ? "bg-red-600 text-white shadow-lg shadow-red-950/15 hover:-translate-y-0.5 hover:bg-red-700 focus-visible:outline-red-600"
      : "border border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-50 focus-visible:outline-red-600";
  const sizeClass =
    size === "lg"
      ? "min-h-14 px-6 py-3.5 text-base"
      : "min-h-12 px-5 py-3 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl text-center font-black no-underline transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClass} ${sizeClass}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  align = "center",
  children,
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div className="text-[11px] font-black uppercase tracking-[0.22em] text-red-700">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-base leading-8 text-slate-600">{children}</p>
      )}
    </div>
  );
}

function BannerImage({ ad }: { ad: BannerAd }) {
  return (
    <>
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
    </>
  );
}

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
      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">
            Tools
          </Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">
            Learn
          </Link>
          <span>/</span>
          <Link href="/learn?category=security" className="hover:text-slate-950">
            Security
          </Link>
          <span>/</span>
          <span>ウイルスバスター クラウド</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge tone="slate">PR / 広告を含みます</Badge>
              <Badge tone="blue">{article.date} 確認</Badge>
              <Badge tone="amber">価格は公式確認</Badge>
            </div>
            <h1 className="text-[40px] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
              PCとスマホを、
              <span className="mt-2 block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                一本でまとめて守る。
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              ウイルスバスター クラウドは、トレンドマイクロが提供する国内シェアNo.1のセキュリティソフト。ウイルス検知だけでなく、ランサムウェア対策・フィッシング遮断・ネットバンキング保護まで一括カバーします。
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroHighlights.map(([line1, line2]) => (
                <li
                  key={line1}
                  className="rounded-xl border border-red-100 bg-white/85 p-3 text-center shadow-sm"
                >
                  <div className="text-[11px] font-bold text-red-700">
                    {line1}
                  </div>
                  <div className="mt-1 text-sm font-black text-slate-950">
                    {line2}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,320px)_minmax(0,260px)]">
              <CtaButton href={VB_URL} size="lg">
                30日間無料で試してみる
              </CtaButton>
              <CtaButton href={VB_URL} variant="outline" size="lg">
                料金プランを確認する
              </CtaButton>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              ※ 本ページのリンクには広告を含みます。価格・機能・対応OSは記事執筆時点の情報です。最新条件は公式サイトでご確認ください。
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

          <aside className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-red-200/60 via-orange-200/40 to-transparent blur-xl" />
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-red-950/10">
              <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <span>PR / 公式キャンペーン</span>
                <span className="text-red-700">A8 official</span>
              </div>
              <div className="relative flex justify-center">
                <BannerImage ad={banner300x250A} />
              </div>
              <a
                href={VB_URL}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="mt-4 block text-center text-xs font-bold text-red-700 underline-offset-2 hover:underline"
              >
                公式サイトで詳細を見る →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TldrSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="3 sec summary" title="3秒でわかる結論">
          読む時間がない人向けに、この記事の結論を先に置きます。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          {tldr.map((item, idx) => (
            <article
              key={item.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
            >
              <div className="absolute right-5 top-5 text-5xl font-black text-red-100">
                0{idx + 1}
              </div>
              <h3 className="relative text-lg font-black text-slate-950">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-600">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Features" title="主な機能 — 何を守ってくれるか">
          ウイルス検知は入口に過ぎない。ランサムウェア・フィッシング・金融詐欺など、現代の脅威に合わせた機能が揃っています。
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-lg ring-1 ring-red-200/60">
                {f.label}
              </div>
              <h3 className="mt-5 text-lg font-black text-slate-950">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BannerCtaBand() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-center">
        <div>
          <Badge tone="red">公式キャンペーン</Badge>
          <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
            まず30日間、無料で試してみる
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            料金・対応OS・機能の詳細は時期によって変わります。購入前に公式サイトで最新の情報を確認してください。無料体験期間中は全機能が使えます。
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <CtaButton href={VB_URL} size="lg">
              無料体験を始める
            </CtaButton>
            <CtaButton href={VB_URL} variant="outline" size="lg">
              料金プランを見る
            </CtaButton>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="hidden w-full max-w-md rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:block">
            <div className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              PR / 公式バナー
            </div>
            <div className="flex justify-center">
              <BannerImage ad={banner468x100} />
            </div>
          </div>
          <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:hidden">
            <div className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              PR / 公式バナー
            </div>
            <div className="flex justify-center">
              <BannerImage ad={banner234x60} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Plans" title="プラン早見表 — 台数で選ぶ">
          正確な料金・キャンペーン価格は公式サイトをご確認ください。ここでは「どのプランが自分に合うか」の目安を示します。
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.label}
              className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
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
                <div className="text-2xl font-black text-slate-950">
                  {p.label}
                </div>
                <Badge tone={p.highlight ? "red" : "slate"}>{p.badge}</Badge>
              </div>
              <div className="mt-5">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  向いている人
                </div>
                <div className="mt-1 text-sm font-bold text-slate-950">
                  {p.target}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{p.note}</p>
              <div className="mt-auto pt-6">
                <CtaButton href={VB_URL}>公式で料金を確認</CtaButton>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-7 text-slate-600">
          ※ 料金・プラン構成は変更される場合があります。購入前に必ず公式サイトで最新価格をご確認ください。
        </p>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Why Virus Buster" title="ウイルスバスターを選ぶ 6 つの理由">
          単純なウイルス検知だけなら無料ソフトでも対応できます。ウイルスバスターを選ぶ具体的な根拠を整理します。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((w) => (
            <article
              key={w.no}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl font-black tracking-tight text-red-700">
                {w.no}
              </div>
              <h3 className="mt-3 text-lg font-black text-slate-950">
                {w.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{w.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChecklistSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Pre-flight" title="購入前のチェックリスト">
          インストール後のトラブルを防ぐために、申し込み前にここだけ確認してください。
        </SectionTitle>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
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
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="FAQ" title="よくある質問">
          購入前に気になりやすいポイントをまとめました。
        </SectionTitle>
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
                <span
                  aria-hidden="true"
                  className="text-red-700 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">
                {f.a}
                {f.link && (
                  <>
                    {" "}
                    <Link
                      href={f.link.href}
                      className="font-bold text-red-700 underline-offset-2 hover:underline"
                    >
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

function FinalDecision() {
  return (
    <section className="bg-slate-950 px-5 py-16 text-white sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-red-400">
            Final
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            最終結論 — 国内シェアNo.1の安心感
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            ウイルス検知・ランサムウェア対策・フィッシング遮断・決済保護・スマホ対応。個人・家族のデバイスをまとめて守る選択肢として現実的な一本です。
          </p>
        </div>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
            <h3 className="text-xl font-black text-white sm:text-2xl">
              購入前の最終確認
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li>
                <span className="font-bold text-white">対応OS・バージョン:</span>{" "}
                使用デバイスが動作環境内か確認
              </li>
              <li>
                <span className="font-bold text-white">台数と料金:</span>{" "}
                1台/3台/5台プランと1年/複数年の差を比較
              </li>
              <li>
                <span className="font-bold text-white">更新価格:</span>{" "}
                初回と2年目以降で価格が変わる場合がある
              </li>
              <li>
                <span className="font-bold text-white">既存ソフト:</span>{" "}
                インストール前に他のセキュリティソフトを削除
              </li>
            </ul>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <CtaButton href={VB_URL} size="lg">
                30日間無料で試す
              </CtaButton>
              <CtaButton href={VB_URL} variant="outline" size="lg">
                料金プランを見る
              </CtaButton>
            </div>
          </div>
          <aside className="rounded-3xl bg-white p-5 text-slate-950 shadow-2xl">
            <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              <span>PR / 公式キャンペーン</span>
              <span className="text-red-700">A8 official</span>
            </div>
            <div className="relative flex justify-center">
              <BannerImage ad={banner300x250B} />
            </div>
            <a
              href={VB_URL}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="mt-4 block text-center text-xs font-bold text-red-700 underline-offset-2 hover:underline"
            >
              公式サイトで詳細を見る →
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-950">参考にした公式情報</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          <li>
            <a
              href="https://www.trendmicro.com/ja_jp/forHome/products/virbusters.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-red-700 underline-offset-2 hover:underline"
            >
              ウイルスバスター クラウド 公式サイト
            </a>
          </li>
          <li>
            <a
              href="https://www.trendmicro.com/ja_jp/forHome/products/virbusters/features.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-red-700 underline-offset-2 hover:underline"
            >
              ウイルスバスター クラウド 機能一覧
            </a>
          </li>
          <li>
            <a
              href="https://www.trendmicro.com/ja_jp/forHome/products/virbusters/requirements.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-red-700 underline-offset-2 hover:underline"
            >
              動作環境・対応OS
            </a>
          </li>
          <li>
            <a
              href="https://www.trendmicro.com/ja_jp/about.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-red-700 underline-offset-2 hover:underline"
            >
              トレンドマイクロ株式会社（運営会社）
            </a>
          </li>
        </ul>
        <p className="mt-4">
          この記事は {article.date} 時点の公式情報を確認して作成しています。申し込み前には公式サイトで最新の価格・機能・対応OSを確認してください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    {
      href: "/learn/security/ransomware-2026",
      title: "ランサムウェアの最新動向と対策",
      eyebrow: "Security",
    },
    {
      href: "/learn/security/infostealer-session-hijacking",
      title: "インフォスティーラーとセッションハイジャック",
      eyebrow: "Security",
    },
    {
      href: "/learn/security/password-strength",
      title: "パスワード強度とクラッキング耐性",
      eyebrow: "Security",
    },
  ];

  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
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
      <BannerCtaBand />
      <PlansSection />
      <WhySection />
      <ChecklistSection />
      <FaqSection />
      <FinalDecision />
      <References />
      <RelatedLinks />
    </main>
  );
}
