import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "xserver-vs-conoha-wing")!;

const XSERVER_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+61JSI";
const CONOHA_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SKSCY";
const XSERVER_DOMAIN_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C3TBLE+CO4+15ORS2";

const bannerAds = {
  hero: [
    {
      service: "ConoHa WING",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SFFGH",
      src: "https://www26.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035008000&mc=1",
      pixel: "https://www17.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SFFGH",
      width: 300,
      height: 250,
    },
    {
      service: "ConoHa WING",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SQ59D",
      src: "https://www26.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035058000&mc=1",
      pixel: "https://www14.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SQ59D",
      width: 300,
      height: 250,
    },
    {
      service: "エックスサーバー",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+6EU6P",
      src: "https://www26.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001077000&mc=1",
      pixel: "https://www19.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+6EU6P",
      width: 300,
      height: 250,
    },
    {
      service: "エックスサーバー",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+69HA9",
      src: "https://www28.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001052000&mc=1",
      pixel: "https://www15.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+69HA9",
      width: 300,
      height: 250,
    },
  ],
  middle: [
    {
      service: "ConoHa WING",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SEKLD",
      src: "https://www21.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035004000&mc=1",
      pixel: "https://www14.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SEKLD",
      width: 728,
      height: 90,
    },
    {
      service: "ConoHa WING",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SPI41",
      src: "https://www26.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035055000&mc=1",
      pixel: "https://www14.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SPI41",
      width: 728,
      height: 90,
    },
    {
      service: "エックスサーバー",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+6BU5T",
      src: "https://www21.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001063000&mc=1",
      pixel: "https://www12.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+6BU5T",
      width: 728,
      height: 90,
    },
    {
      service: "エックスサーバー",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+65ME9",
      src: "https://www27.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001034000&mc=1",
      pixel: "https://www17.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+65ME9",
      width: 728,
      height: 90,
    },
  ],
  bottom: [
    {
      service: "エックスサーバー",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+6EU6P",
      src: "https://www26.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001077000&mc=1",
      pixel: "https://www19.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+6EU6P",
      width: 300,
      height: 250,
    },
    {
      service: "ConoHa WING",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SQ59D",
      src: "https://www26.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035058000&mc=1",
      pixel: "https://www14.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SQ59D",
      width: 300,
      height: 250,
    },
  ],
};

const services = [
  {
    key: "xserver",
    name: "エックスサーバー",
    short: "Xserver",
    tone: "green" as const,
    href: XSERVER_URL,
    tag: "迷ったらこちら",
    verdict: "無料で試してから決めたい人におすすめ",
    cta: "10日間無料で試してみる",
    subCta: "公式キャンペーンを見る",
    strengths: [
      "10日間の無料お試しで管理画面を確認できる",
      "運用実績・サポート情報が公式で確認しやすい",
      "長期運営や複数サイト運営の候補にしやすい",
    ],
    caution: "WordPressクイックスタート利用時は無料お試し対象外になるため、申し込み時の選択を確認。",
    practical:
      "管理画面は項目が多めですが、無料期間中に触って慣れられる安心感があります。",
    facts: ["国内シェアNo.1", "運用サイト数250万以上", "稼働率99.99%以上の実績"],
  },
  {
    key: "conoha",
    name: "ConoHa WING",
    short: "ConoHa",
    tone: "orange" as const,
    href: CONOHA_URL,
    tag: "ブログ開始向き",
    verdict: "WordPressをすぐ始めたい人におすすめ",
    cta: "WordPressをすぐ始める",
    subCta: "WINGパックの条件を見る",
    strengths: [
      "WordPress開設までの導線がまとまっている",
      "WINGパックは独自ドメイン特典を確認しやすい",
      "副業ブログや個人ブログの初期構築に向く",
    ],
    caution: "WINGパックは前払い型。途中解約・更新料金・サービス維持調整費を確認。",
    practical:
      "ブログを作る前提なら、サーバーとドメインをまとめて進めやすい印象です。",
    facts: ["電話・メールサポート", "独自ドメイン特典", "WordPress開設導線"],
  },
];

const heroDecisions = [
  ["迷ったら", "エックスサーバー", "無料で試してから判断できる"],
  ["最速でブログ開始", "ConoHa WING", "WordPress開設導線が短い"],
  ["長期運営", "エックスサーバー", "実績・安定性を重視しやすい"],
  ["副業ブログ", "ConoHa WING", "ドメイン込みで始めやすい"],
];

const comparison = [
  {
    axis: "初心者向け",
    icon: "初",
    x: "○",
    c: "◎",
    winner: "ConoHa",
    detail: "ブログを作る前提ならConoHaの導線が短い。迷っている段階ならXserverの無料お試しが安心。",
  },
  {
    axis: "無料お試し",
    icon: "試",
    x: "◎",
    c: "△",
    winner: "Xserver",
    detail: "支払い前に管理画面を触れるかは初心者にとって大きな判断材料。",
  },
  {
    axis: "WordPress開設",
    icon: "WP",
    x: "○",
    c: "◎",
    winner: "ConoHa",
    detail: "WordPressを今日から始める導線はConoHaが分かりやすい。",
  },
  {
    axis: "長期運用",
    icon: "長",
    x: "◎",
    c: "○",
    winner: "Xserver",
    detail: "複数サイトや会社サイトも視野に入れるならXserverを候補にしやすい。",
  },
  {
    axis: "料金の見方",
    icon: "￥",
    x: "○",
    c: "○",
    winner: "公式確認",
    detail: "初回価格、契約期間、更新価格、ドメイン特典条件を分けて確認。",
  },
  {
    axis: "サポート",
    icon: "支",
    x: "○",
    c: "○",
    winner: "互角",
    detail: "どちらも公式サポート情報を確認できる。問い合わせ手段と対応時間を事前確認。",
  },
];

const scenarios = [
  {
    title: "無料で触ってから決めたい",
    result: "Xserver",
    reason: "10日間のお試しで、管理画面・WordPress・メール設定の感触を確認しやすい。",
  },
  {
    title: "ブログを今日から作りたい",
    result: "ConoHa WING",
    reason: "WINGパックとWordPress開設の流れがまとまっていて、初期導線が短い。",
  },
  {
    title: "複数サイトを長く運営したい",
    result: "Xserver",
    reason: "実績、サポート、安定性を重視したい場合に候補に残しやすい。",
  },
  {
    title: "長期前払いが不安",
    result: "Xserver",
    reason: "まず試せる選択肢のほうが、契約後の後悔を減らしやすい。",
  },
];

const policy = [
  {
    title: "価格は公式確認を前提にする",
    text: "キャンペーン価格は変動します。月額だけではなく、契約期間の総額と更新価格を分けて見ます。",
  },
  {
    title: "速度だけで判断しない",
    text: "体感速度はテーマ、画像、プラグイン、キャッシュ設定にも左右されます。運用しやすさも比較します。",
  },
  {
    title: "合わないケースも明記する",
    text: "長期前払いが不安ならConoHa WINGは慎重に、無料お試しより即開設重視ならXserver以外も検討します。",
  },
];

const checklist = [
  "初回支払額と更新価格を両方確認した",
  "契約期間と途中解約条件を確認した",
  "独自ドメイン特典の対象条件を確認した",
  "WordPress以外の用途があるか確認した",
  "バックアップ・SSL・メール・サポートを確認した",
  "キャンペーン終了日と適用条件を確認した",
];

const faqs = [
  {
    q: "無料お試しの10日間が終わったらどうなりますか？",
    a: "エックスサーバーの無料お試し期間が終了すると、有料プランへの移行確認が来ます。移行しない場合はデータごと削除されます。なおWordPressクイックスタートを利用した場合は最初から有料契約扱いになり、無料お試しは適用されません。ConoHa WINGには無料お試し期間がないため、申し込み時から課金が始まります。詳細条件は各公式サイトでご確認ください。",
  },
  {
    q: "初回価格と更新価格はどのくらい違いますか？",
    a: "どちらのサービスも、申し込み時のキャンペーン価格は初回のみ適用されます。2年目以降は通常の更新価格が適用されるため、「初回の月額」だけで判断すると更新時に驚くことがあります。契約前に「更新後の年額」を必ず公式ページで確認し、複数年の総コストで比較してください。",
  },
  {
    q: "WordPressクイックスタートを使う場合の注意点は？",
    a: "エックスサーバーのWordPressクイックスタートは、サーバー・ドメイン・WordPress設定を一気に完了できる機能です。ただし申し込みと同時に有料契約が開始されるため、無料お試し期間は使えません。「まず管理画面を見てから判断したい」場合はクイックスタートを使わず、通常申し込みで無料お試し後にWordPressをインストールする流れをおすすめします。",
  },
  {
    q: "独自ドメインはどちらのサービスで取得すればいいですか？",
    a: "ConoHa WINGのWINGパックには独自ドメインが無料になる特典がありますが、対象プランと契約期間の条件があります。エックスサーバーはサーバー契約とは別にXServerドメインで取得します。どちらを選ぶ場合も、ドメインの取得料だけでなく更新料と自動更新設定を確認することが重要です。",
    link: {
      href: "/learn/network/xserver-domain-guide",
      label: "独自ドメイン取得ガイド",
    },
  },
  {
    q: "レンタルサーバーとVPSはどう違いますか？",
    a: "このページで比較しているエックスサーバー・ConoHa WINGは共有レンタルサーバーです。WordPressブログや一般的なWebサイトを動かすだけなら、ほぼすべてのケースで共有レンタルサーバーが適切です。VPSは自前のゲームサーバー・常駐Bot・カスタムミドルウェアが必要なサービスを動かす際に使います。「ブログを運営したい」だけならVPSは不要です。",
    link: {
      href: "/learn/network/xserver-vps-guide",
      label: "XServer VPS入門ガイド",
    },
  },
];

function toneClass(tone: "green" | "orange") {
  return tone === "green"
    ? {
        text: "text-emerald-700",
        bg: "bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600",
        soft: "bg-emerald-50",
        border: "border-emerald-200",
        ring: "ring-emerald-100",
      }
    : {
        text: "text-orange-700",
        bg: "bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500",
        soft: "bg-orange-50",
        border: "border-orange-200",
        ring: "ring-orange-100",
      };
}

function Badge({
  children,
  color = "slate",
}: {
  children: React.ReactNode;
  color?: "slate" | "blue" | "green" | "orange" | "amber";
}) {
  const classes = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    orange: "bg-orange-50 text-orange-700 ring-orange-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${classes[color]}`}
    >
      {children}
    </span>
  );
}

function CtaButton({
  href,
  tone,
  children,
  variant = "solid",
}: {
  href: string;
  tone: "green" | "orange";
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const toneStyle = toneClass(tone);
  const style =
    variant === "solid"
      ? `${toneStyle.bg} text-white shadow-lg shadow-slate-950/15 hover:-translate-y-0.5`
      : "border border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50";

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-black no-underline transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${style}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-9 max-w-3xl text-center">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
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

function HeroCard({ service }: { service: (typeof services)[number] }) {
  const tone = toneClass(service.tone);

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm ${tone.border} sm:p-6`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge color={service.tone}>{service.tag}</Badge>
        <span className={`text-sm font-black ${tone.text}`}>{service.short}</span>
      </div>
      <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
        {service.name}
      </h3>
      <p className="mt-2 text-base font-bold leading-7 text-slate-700">
        {service.verdict}
      </p>
      <ul className="mt-5 grid gap-3">
        {service.strengths.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${tone.soft} ${tone.text} ring-1 ${tone.ring}`}
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900 ring-1 ring-amber-100">
        注意: {service.caution}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <CtaButton href={service.href} tone={service.tone}>
          {service.cta}
        </CtaButton>
        <CtaButton href={service.href} tone={service.tone} variant="outline">
          {service.subCta}
        </CtaButton>
      </div>
    </article>
  );
}

function Hero() {
  return (
    <section className="bg-[linear-gradient(180deg,#eef6ff_0%,#f8fafc_72%,#ffffff_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">
            Tools
          </Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">
            Learn
          </Link>
          <span>/</span>
          <span>レンタルサーバー比較</span>
        </nav>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            <Badge color="slate">PR / 広告を含みます</Badge>
            <Badge color="blue">2026年5月11日確認</Badge>
            <Badge color="amber">価格は公式確認</Badge>
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            XserverとConoHa WING、
            <span className="block text-blue-700">
              あなたに合う方を3秒で判断。
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            迷ったらエックスサーバー。WordPressブログを最短で始めたいならConoHa WING。料金、無料お試し、更新価格、初期設定のしやすさまで比較して選べます。
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroDecisions.map(([label, answer, reason]) => (
            <div
              key={label}
              className="rounded-xl border border-blue-100 bg-white/85 p-4 shadow-sm"
            >
              <div className="text-xs font-black uppercase tracking-wide text-blue-700">
                {label}
              </div>
              <div className="mt-2 text-xl font-black text-slate-950">
                {answer}
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{reason}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <HeroCard key={service.key} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Compare" title="重要項目だけ先に比較">
          スマホではカード型、PCでは表型で見やすく表示します。◎は強い、○は十分、△は条件確認が必要という意味です。
        </SectionTitle>

        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="grid grid-cols-[1.1fr_0.75fr_0.75fr_1.35fr] bg-slate-950 text-sm font-black text-white">
            <div className="p-5">判断軸</div>
            <div className="border-l border-white/10 p-5">Xserver</div>
            <div className="border-l border-white/10 p-5">ConoHa WING</div>
            <div className="border-l border-white/10 p-5">判断メモ</div>
          </div>
          {comparison.map((row) => (
            <div
              key={row.axis}
              className="grid grid-cols-[1.1fr_0.75fr_0.75fr_1.35fr] border-t border-slate-100"
            >
              <div className="flex items-center gap-3 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-700">
                  {row.icon}
                </span>
                <span className="font-black text-slate-950">{row.axis}</span>
              </div>
              <div className="border-l border-slate-100 p-5 text-3xl font-black text-emerald-700">
                {row.x}
              </div>
              <div className="border-l border-slate-100 p-5 text-3xl font-black text-orange-600">
                {row.c}
              </div>
              <div className="border-l border-slate-100 p-5">
                <Badge color="blue">{row.winner}</Badge>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {row.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:hidden">
          {comparison.map((row) => (
            <article
              key={row.axis}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-700">
                  {row.icon}
                </span>
                <h3 className="font-black text-slate-950">{row.axis}</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-emerald-50 p-3">
                  <div className="text-xs font-black text-emerald-700">
                    Xserver
                  </div>
                  <div className="mt-1 text-3xl font-black text-emerald-700">
                    {row.x}
                  </div>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <div className="text-xs font-black text-orange-700">
                    ConoHa
                  </div>
                  <div className="mt-1 text-3xl font-black text-orange-600">
                    {row.c}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Badge color="blue">{row.winner}</Badge>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {row.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScenarioSection() {
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Decision" title="あなたに向いているのはどっち？">
          料金表を細かく読む前に、まずは自分の目的に近いケースから選んでください。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-black text-slate-500">
                {item.title}
              </div>
              <h3 className="mt-2 text-2xl font-black text-blue-700">
                {item.result}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.reason}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({
  title,
  text,
  tone = "blue",
}: {
  title: string;
  text: string;
  tone?: "blue" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={`px-5 py-14 sm:px-6 ${
        dark ? "bg-slate-950 text-white" : "bg-white"
      }`}
    >
      <div
        className={`mx-auto grid max-w-6xl min-w-0 gap-8 rounded-2xl p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-center ${
          dark
            ? "bg-slate-900 ring-1 ring-white/10"
            : "border border-blue-200 bg-blue-50"
        }`}
      >
        <div className="min-w-0">
          <Badge color={dark ? "orange" : "blue"}>公式確認</Badge>
          <h2
            className={`mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight sm:text-3xl ${
              dark ? "text-white" : "text-slate-950"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-4 max-w-3xl text-base leading-8 ${
              dark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {text}
          </p>
        </div>
        <div className="grid min-w-0 w-full gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <CtaButton href={XSERVER_URL} tone="green">
            Xserverを10日間無料で試す
          </CtaButton>
          <CtaButton href={CONOHA_URL} tone="orange">
            ConoHaでWordPressを始める
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function PolicySection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Policy" title="このページの比較方針">
          アフィリエイトリンクを含みますが、価格変動や合わないケースも明記し、契約前に確認すべき点を重視しています。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          {policy.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-black text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticalSection() {
  return (
    <section className="bg-[#f3f7fb] px-5 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Practical" title="スペック表だけでは分からない違い">
          初心者が実際に迷いやすいのは、契約後の管理画面、WordPress開設、更新料金の確認です。
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => {
            const tone = toneClass(service.tone);
            return (
              <article
                key={service.key}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${tone.border}`}
              >
                <Badge color={service.tone}>{service.name}</Badge>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  {service.practical}
                </p>
                <div className="mt-5 grid gap-2">
                  {service.facts.map((fact) => (
                    <div
                      key={fact}
                      className={`rounded-lg p-3 text-sm font-bold ${tone.soft} ${tone.text}`}
                    >
                      {fact}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChecklistSection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Checklist" title="契約前チェックリスト">
          申し込みボタンを押す前に、料金と条件だけは必ず確認してください。
        </SectionTitle>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <ul className="grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg bg-white p-4 text-sm font-bold leading-6 text-slate-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
                  !
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
    <section className="bg-white px-5 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="FAQ" title="よくある質問">
          申し込み前に迷いやすいポイントをまとめました。
        </SectionTitle>
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
                <span
                  aria-hidden="true"
                  className="text-blue-700 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">
                {f.a}
                {"link" in f && f.link && (
                  <>
                    {" "}
                    <Link
                      href={f.link.href}
                      className="font-bold text-blue-700 underline-offset-2 hover:underline"
                    >
                      {f.link.label}
                    </Link>
                    {"も参考にしてください。"}
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

function BannerSlot({
  title,
  description,
  ads,
}: {
  title: string;
  description: string;
  ads: typeof bannerAds.hero;
}) {
  return (
    <section className="bg-white px-5 py-12 sm:px-6">
      <aside className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-wide text-slate-400">
              PR / 広告
            </div>
            <h2 className="mt-1 text-xl font-black text-slate-950">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>
          <Badge color="slate">公式バナー</Badge>
        </div>
        <div className="grid items-center justify-center gap-4 md:grid-cols-2">
          {ads.map((ad) => (
            <div key={`${title}-${ad.href}`}>
              <a
                href={ad.href}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="flex min-h-32 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-blue-300 hover:bg-blue-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ad.src}
                  alt={`${ad.service} 公式キャンペーン`}
                  width={ad.width}
                  height={ad.height}
                  className="h-auto max-w-full rounded"
                />
              </a>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ad.pixel}
                width={1}
                height={1}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                }}
              />
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}

function FinalDecision() {
  return (
    <section className="bg-slate-950 px-5 py-16 text-white sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-9 max-w-3xl text-center">
          <div className="text-xs font-black uppercase tracking-[0.24em] text-orange-300">
            Final
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            最終結論
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            まだ迷うなら、契約前の不安を減らせるほうから選んでください。
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 text-slate-950">
            <Badge color="green">迷ったら</Badge>
            <h3 className="mt-4 text-2xl font-black">エックスサーバー</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              無料お試しで触ってから決められるため、初心者の失敗を減らしやすい。
            </p>
            <div className="mt-5">
              <CtaButton href={XSERVER_URL} tone="green">
                無料お試しを確認
              </CtaButton>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 text-slate-950">
            <Badge color="orange">すぐブログ開始</Badge>
            <h3 className="mt-4 text-2xl font-black">ConoHa WING</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              WordPress開設までの導線を短くしたい人に向いています。
            </p>
            <div className="mt-5">
              <CtaButton href={CONOHA_URL} tone="orange">
                WINGパックを見る
              </CtaButton>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/10">
            <Badge color="amber">契約前に確認</Badge>
            <h3 className="mt-4 text-2xl font-black">料金・更新・特典条件</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              初回価格だけで決めず、更新価格、契約期間、独自ドメイン特典、途中解約条件を確認してください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">参考にした公式情報</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          <li>
            <a
              href="https://www.xserver.ne.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-700 underline"
            >
              エックスサーバー公式サイト
            </a>
          </li>
          <li>
            <a
              href="https://www.xserver.ne.jp/price/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-700 underline"
            >
              エックスサーバー 料金プラン
            </a>
          </li>
          <li>
            <a
              href="https://www.conoha.jp/pricing/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-700 underline"
            >
              ConoHa WING 料金
            </a>
          </li>
          <li>
            <a
              href="https://support.conoha.jp/wing/guide/wingpack/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-700 underline"
            >
              ConoHa WING WINGパック
            </a>
          </li>
        </ul>
        <p className="mt-4">
          この記事は{article.date}時点の公式情報を確認して作成しています。申し込み前には、各公式サイトで最新の価格・特典・契約条件を確認してください。
        </p>
        <p className="mt-3">
          独自ドメインを別管理したい場合は、
          <a
            href={XSERVER_DOMAIN_URL}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="font-bold text-blue-700 underline"
          >
            XServerドメイン
          </a>
          も確認しておくと判断しやすくなります。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: "/learn/network/dns-basics", title: "DNSの仕組み" },
    { href: "/learn/network/https-tls", title: "HTTPSとTLS" },
    {
      href: "/learn/security/http-security-headers",
      title: "HTTPセキュリティヘッダー",
    },
  ];

  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xl font-black text-slate-950">関連して読む</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="hosting-compare bg-white text-slate-950">
      <Hero />
      <ComparisonTable />
      <CtaBand
        title="まずは公式キャンペーンと更新価格を確認"
        text="候補が決まったら、申し込み前にキャンペーン価格、契約期間、更新価格、独自ドメイン特典の条件を確認してください。"
      />
      <ScenarioSection />
      <BannerSlot
        title="公式キャンペーンを確認"
        description="広告バナーの訴求は変わるため、最終的な条件は公式サイトで確認してください。"
        ads={bannerAds.hero}
      />
      <PolicySection />
      <PracticalSection />
      <CtaBand
        title="WordPress開設のしやすさで選ぶなら、公式の申込導線を確認"
        text="Xserverは無料お試しの有無、ConoHa WINGはWINGパックとWordPress開設の条件を確認してから選ぶと安心です。"
      />
      <ChecklistSection />
      <FaqSection />
      <BannerSlot
        title="料金・特典の最終確認"
        description="契約期間、更新料金、特典条件、解約条件を確認してから申し込みましょう。"
        ads={bannerAds.middle}
      />
      <FinalDecision />
      <BannerSlot
        title="最後に公式条件を確認"
        description="価格やキャンペーンは変動します。申し込み前に最新条件を確認してください。"
        ads={bannerAds.bottom}
      />
      <References />
      <RelatedLinks />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www12.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SKSCY"
          width={1}
          height={1}
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www19.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+61JSI"
          width={1}
          height={1}
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www13.a8.net/0.gif?a8mat=4B3LMV+C3TBLE+CO4+15ORS2"
          width={1}
          height={1}
          alt=""
        />
      </div>
    </div>
  );
}
