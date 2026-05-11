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
      service: "エックスサーバー",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+6Q74X",
      src: "https://www21.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001130000&mc=1",
      width: 300,
      height: 250,
    },
    {
      service: "ConoHa WING",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SMI35",
      src: "https://www20.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035041000&mc=1",
      width: 300,
      height: 250,
    },
  ],
  middle: [
    {
      service: "エックスサーバー",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+6EU6P",
      src: "https://www19.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001130000&mc=1",
      width: 300,
      height: 250,
    },
    {
      service: "ConoHa WING",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SEKLD",
      src: "https://www15.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035041000&mc=1",
      width: 728,
      height: 90,
    },
  ],
  bottom: [
    {
      service: "エックスサーバー",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+6CHB5",
      src: "https://www17.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001130000&mc=1",
      width: 350,
      height: 240,
    },
    {
      service: "ConoHa WING",
      href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SPXJL",
      src: "https://www11.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035041000&mc=1",
      width: 336,
      height: 280,
    },
  ],
};

const services = [
  {
    id: "xserver",
    rank: "総合おすすめ",
    name: "エックスサーバー",
    shortName: "Xserver",
    tone: "emerald" as const,
    href: XSERVER_URL,
    primaryCta: "10日間無料お試しを確認",
    secondaryCta: "公式キャンペーンを見る",
    score: "4.7",
    tagline: "迷ったらまず候補に入れたい、無料お試し型の定番サーバー",
    bestFor: "初めてのサーバー契約で、管理画面やWordPressを触ってから判断したい人",
    caution: "無料期間後の支払い、契約期間、ドメイン特典の条件は申し込み前に確認",
    points: [
      "10日間の無料お試しで操作感を確認しやすい",
      "個人ブログから事業サイトまで候補にしやすい",
      "長期運用や複数サイト運用でも選びやすい",
    ],
    metrics: [
      { label: "初心者向け", value: 88 },
      { label: "長期運用", value: 92 },
      { label: "料金確認のしやすさ", value: 86 },
    ],
  },
  {
    id: "conoha",
    rank: "ブログ開始向け",
    name: "ConoHa WING",
    shortName: "ConoHa",
    tone: "orange" as const,
    href: CONOHA_URL,
    primaryCta: "WINGパックの条件を見る",
    secondaryCta: "公式キャンペーンを見る",
    score: "4.5",
    tagline: "WordPressブログを早く始めたい人に向く、導線が分かりやすいサーバー",
    bestFor: "ブログを始めることが決まっていて、サーバーとドメインをまとめたい人",
    caution: "WINGパックは前払い型。途中解約や通常料金への切り替わりを確認",
    points: [
      "WordPress開設までの流れが分かりやすい",
      "WINGパックの独自ドメイン特典が分かりやすい",
      "長期契約の条件に納得できる人に向く",
    ],
    metrics: [
      { label: "初心者向け", value: 91 },
      { label: "WordPress導線", value: 94 },
      { label: "契約の柔軟性", value: 74 },
    ],
  },
];

const comparisonRows = [
  {
    label: "料金・契約",
    helper: "初回価格だけでなく更新料金と契約期間を見る",
    xserver: "無料お試し後に契約判断しやすい。キャンペーン価格と通常価格を分けて確認。",
    conoha: "WINGパックは長期前払いで割引や特典が入りやすい。途中解約条件を確認。",
    winner: "慎重派はXserver / 前払いOKならConoHa",
  },
  {
    label: "初心者向け度",
    helper: "初回設定で迷いにくいか",
    xserver: "無料で管理画面を試せる安心感がある。初回は設定項目の理解が必要。",
    conoha: "申し込みからWordPress開設までの流れが短く、ブログ開始に寄せやすい。",
    winner: "ブログ開始はConoHa",
  },
  {
    label: "WordPress",
    helper: "ブログやサイトをすぐ公開しやすいか",
    xserver: "WordPressクイックスタートや移転導線があり、長期運用にも向く。",
    conoha: "WINGパックとWordPress開設をセットで進めやすい。",
    winner: "目的で分かれる",
  },
  {
    label: "性能・速度",
    helper: "サーバーだけでなくサイト設計も影響する",
    xserver: "国内の定番サーバーとして十分。画像圧縮やキャッシュ設定も重要。",
    conoha: "高速訴求が強い。体感速度はテーマやプラグインにも左右される。",
    winner: "大差なし",
  },
  {
    label: "サポート",
    helper: "困ったときの問い合わせ手段",
    xserver: "電話・メールなどのサポートを確認でき、事業用途でも候補にしやすい。",
    conoha: "電話・メールサポートあり。個人ブログ用途なら十分候補になる。",
    winner: "大差なし",
  },
  {
    label: "注意点",
    helper: "契約前に必ず見るところ",
    xserver: "無料期間後の支払い、更新料金、ドメイン特典条件を確認。",
    conoha: "長期前払い、途中解約、サービス維持調整費、更新条件を確認。",
    winner: "どちらも公式確認",
  },
];

const rankingCards = [
  {
    label: "迷っている初心者",
    winner: "エックスサーバー",
    reason: "無料お試しで管理画面やWordPressを触ってから判断できるため。",
  },
  {
    label: "ブログを今日から始めたい",
    winner: "ConoHa WING",
    reason: "申し込みからWordPress開設までの導線がまとまっているため。",
  },
  {
    label: "長期前払いが不安",
    winner: "エックスサーバー",
    reason: "まず試してから契約判断できる点が初心者には扱いやすい。",
  },
];

const criteria = [
  {
    title: "総支払額",
    text: "キャンペーン月額ではなく、契約期間の総額と更新後の料金を見ます。",
  },
  {
    title: "始めやすさ",
    text: "WordPress、SSL、独自ドメイン、メール設定まで迷わず進められるかを見ます。",
  },
  {
    title: "契約の柔軟性",
    text: "無料お試し、途中解約、前払い条件、プラン変更のしやすさを確認します。",
  },
  {
    title: "運用の安心感",
    text: "バックアップ、サポート、公式マニュアル、長期運用の実績を見ます。",
  },
];

const faqs = [
  {
    question: "結局、初心者はどちらを選ぶべきですか？",
    answer:
      "迷っていて実際に触ってから決めたいならエックスサーバー、ブログを作ることが決まっていて初期設定を短くしたいならConoHa WINGが選びやすいです。",
  },
  {
    question: "料金はどちらが安いですか？",
    answer:
      "キャンペーン、契約期間、更新時期で変わります。月額だけで判断せず、初回支払額、契約更新後の料金、解約条件を公式サイトで確認してください。",
  },
  {
    question: "表示速度だけで選んでいいですか？",
    answer:
      "おすすめしません。速度はサーバーだけでなく、WordPressテーマ、画像サイズ、プラグイン、キャッシュ設定でも大きく変わります。",
  },
  {
    question: "公式バナーと本文CTAはどちらを押せばいいですか？",
    answer:
      "どちらも公式サイトへ移動します。条件を比較したい人は本文CTA、キャンペーン画像で最新訴求を確認したい人はバナーが見やすいです。",
  },
];

const tocItems = [
  { href: "#ranking", label: "おすすめ" },
  { href: "#comparison", label: "比較表" },
  { href: "#criteria", label: "選び方" },
  { href: "#campaign", label: "公式確認" },
  { href: "#faq", label: "FAQ" },
];

function toneClasses(tone: "emerald" | "orange") {
  return tone === "emerald"
    ? {
        border: "border-emerald-300",
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        text: "text-emerald-700",
        bg: "bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600",
        soft: "bg-emerald-50",
        bar: "bg-emerald-600",
      }
    : {
        border: "border-orange-300",
        badge: "bg-orange-50 text-orange-700 ring-orange-200",
        text: "text-orange-700",
        bg: "bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-500",
        soft: "bg-orange-50",
        bar: "bg-orange-500",
      };
}

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "emerald" | "orange" | "blue";
}) {
  const classes = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    orange: "bg-orange-50 text-orange-700 ring-orange-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${classes[tone]}`}
    >
      {children}
    </span>
  );
}

function AffiliateButton({
  href,
  children,
  tone = "emerald",
  full = false,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "emerald" | "orange";
  full?: boolean;
  variant?: "solid" | "outline";
}) {
  const toneClass = toneClasses(tone);
  const style =
    variant === "solid"
      ? `${toneClass.bg} text-white shadow-lg shadow-slate-950/10`
      : "border border-slate-300 bg-white text-slate-900 hover:border-slate-500";

  return (
    <a
      href={href}
      rel="nofollow noopener noreferrer"
      target="_blank"
      className={`inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-center text-sm font-black no-underline transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${style} ${
        full ? "w-full" : "w-full sm:w-auto"
      }`}
    >
      {children}
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
    <div className="mb-6">
      <div className="text-xs font-black uppercase tracking-wide text-emerald-700">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      {children && (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {children}
        </p>
      )}
    </div>
  );
}

function MetricBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "orange";
}) {
  const toneClass = toneClasses(tone);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${toneClass.bar}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const tone = toneClasses(service.tone);

  return (
    <article className={`rounded-lg border ${tone.border} bg-white p-5 shadow-sm`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge tone={service.tone}>{service.rank}</Badge>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
          score {service.score}
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
        {service.name}
      </h3>
      <p className="mt-2 min-h-14 text-sm leading-7 text-slate-600">
        {service.tagline}
      </p>

      <div className="mt-5 space-y-3">
        {service.metrics.map((metric) => (
          <MetricBar
            key={metric.label}
            label={metric.label}
            value={metric.value}
            tone={service.tone}
          />
        ))}
      </div>

      <dl className="mt-5 grid gap-3 border-t border-slate-100 pt-5">
        <div>
          <dt className={`text-xs font-black ${tone.text}`}>向いている人</dt>
          <dd className="mt-1 text-sm leading-6 text-slate-700">
            {service.bestFor}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-black text-slate-500">注意点</dt>
          <dd className="mt-1 text-sm leading-6 text-slate-700">
            {service.caution}
          </dd>
        </div>
      </dl>

      <ul className="mt-5 grid gap-2">
        {service.points.map((point) => (
          <li key={point} className="flex gap-2 text-sm leading-6 text-slate-700">
            <span
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${tone.bar}`}
            >
              ✓
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-2">
        <AffiliateButton href={service.href} tone={service.tone} full>
          {service.primaryCta}
        </AffiliateButton>
        <AffiliateButton
          href={service.href}
          tone={service.tone}
          full
          variant="outline"
        >
          {service.secondaryCta}
        </AffiliateButton>
      </div>
    </article>
  );
}

function HeroSummary() {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-5 text-white shadow-2xl shadow-slate-950/20 backdrop-blur">
      <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4">
        <div>
          <div className="text-xs font-black uppercase tracking-wide text-emerald-200">
            Quick verdict
          </div>
          <div className="mt-1 text-xl font-black">目的別おすすめ</div>
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950">
          2社比較
        </div>
      </div>
      <div className="divide-y divide-white/15">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="py-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-black text-slate-300">
                No.{index + 1}
              </div>
              <div
                className={`rounded-full px-2 py-1 text-[11px] font-black ${toneClasses(service.tone).badge}`}
              >
                {service.rank}
              </div>
            </div>
            <div className="mt-2 text-lg font-black text-white">
              {service.name}
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              {service.bestFor}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-white/15 bg-slate-950/50 p-3 text-xs leading-5 text-slate-200">
        価格・キャンペーンは頻繁に変わります。最終判断は必ず公式サイトの最新条件で確認してください。
      </div>
    </div>
  );
}

function TableOfContents() {
  return (
    <nav
      aria-label="記事内メニュー"
      className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
    >
      <div className="grid gap-2 sm:grid-cols-5">
        {tocItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function RankingSection() {
  return (
    <section id="ranking" className="scroll-mt-24">
      <SectionTitle
        eyebrow="Recommendation"
        title="初心者向けのおすすめは目的で分ける"
      >
        どちらが常に上という比較ではありません。契約前の不安を減らしたいか、ブログ開設までの手順を短くしたいかで選ぶと失敗しにくくなります。
      </SectionTitle>
      <div className="grid gap-5 lg:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {rankingCards.map((card) => (
          <article
            key={card.label}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="text-xs font-black uppercase tracking-wide text-slate-400">
              {card.label}
            </div>
            <h3 className="mt-2 text-lg font-black text-slate-950">
              {card.winner}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {card.reason}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section id="comparison" className="scroll-mt-24">
      <SectionTitle
        eyebrow="Comparison"
        title="比較表で見るチェックポイント"
      >
        料金、性能、初心者向け度、WordPress、サポートを同じ目線で確認できます。スマホでは項目ごとに縦に読める構成です。
      </SectionTitle>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[0.95fr_1fr_1fr_0.95fr] bg-slate-950 text-sm font-black text-white lg:grid">
          <div className="p-4">項目</div>
          <div className="border-l border-white/10 p-4">エックスサーバー</div>
          <div className="border-l border-white/10 p-4">ConoHa WING</div>
          <div className="border-l border-white/10 p-4">判断目安</div>
        </div>
        {comparisonRows.map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-1 border-t border-slate-200 lg:grid-cols-[0.95fr_1fr_1fr_0.95fr] ${
              index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
            }`}
          >
            <div className="p-4">
              <div className="text-base font-black text-slate-950">
                {row.label}
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {row.helper}
              </p>
            </div>
            <div className="border-t border-slate-100 p-4 text-sm leading-7 text-slate-700 lg:border-l lg:border-t-0">
              <div className="mb-1 text-xs font-black text-emerald-700 lg:hidden">
                エックスサーバー
              </div>
              {row.xserver}
            </div>
            <div className="border-t border-slate-100 p-4 text-sm leading-7 text-slate-700 lg:border-l lg:border-t-0">
              <div className="mb-1 text-xs font-black text-orange-700 lg:hidden">
                ConoHa WING
              </div>
              {row.conoha}
            </div>
            <div className="border-t border-slate-100 p-4 lg:border-l lg:border-t-0">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                {row.winner}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CriteriaSection() {
  return (
    <section id="criteria" className="scroll-mt-24">
      <SectionTitle
        eyebrow="Criteria"
        title="この比較サイトで重視している選び方"
      >
        初心者がつまずきやすいのは、初月の安さだけで決めてしまうことです。契約後に困らないよう、次の4つを基準にしています。
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {criteria.map((item, index) => (
          <article
            key={item.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
              {index + 1}
            </div>
            <h3 className="mt-4 text-lg font-black text-slate-950">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CampaignPanel() {
  return (
    <section
      id="campaign"
      className="scroll-mt-24 rounded-lg border border-emerald-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Badge tone="emerald">公式確認が前提</Badge>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
            申し込み前にキャンペーンと更新条件を確認
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            レンタルサーバーはキャンペーン価格、契約期間、更新料金、独自ドメイン特典の条件が変わります。本文で方向性を決めたら、最後は公式サイトで最新条件を確認してください。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[440px]">
          <AffiliateButton href={XSERVER_URL} tone="emerald" full>
            Xserverの無料お試しを見る
          </AffiliateButton>
          <AffiliateButton href={CONOHA_URL} tone="orange" full>
            ConoHaのWINGパックを見る
          </AffiliateButton>
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
    <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-black uppercase tracking-wide text-slate-400">
            PR / 広告
          </div>
          <div className="mt-1 text-base font-black text-slate-950">{title}</div>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
        <Badge tone="slate">公式サイト</Badge>
      </div>
      <div className="grid items-center justify-center gap-4 md:grid-cols-2">
        {ads.map((ad) => (
          <a
            key={`${title}-${ad.service}`}
            href={ad.href}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="flex min-h-28 items-center justify-center rounded-md border border-slate-100 bg-slate-50 p-2 transition hover:border-emerald-300 hover:bg-emerald-50"
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
        ))}
      </div>
    </aside>
  );
}

function Sidebar() {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-xs font-black uppercase tracking-wide text-slate-400">
          Quick decision
        </div>
        <div className="mt-3 space-y-3">
          <div className="rounded-md bg-emerald-50 p-3">
            <div className="text-sm font-black text-emerald-800">
              迷ったらXserver
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              まず無料お試しで操作感を確認。
            </p>
          </div>
          <div className="rounded-md bg-orange-50 p-3">
            <div className="text-sm font-black text-orange-800">
              ブログ開始ならConoHa
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              WordPress開設の導線を短くしたい人向け。
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          <AffiliateButton href={XSERVER_URL} tone="emerald" full>
            無料お試しを見る
          </AffiliateButton>
          <AffiliateButton href={CONOHA_URL} tone="orange" full>
            WINGパックを見る
          </AffiliateButton>
        </div>
      </div>
      <BannerSlot
        title="最新キャンペーン"
        description="表示価格や特典は公式サイトで確認してください。"
        ads={[bannerAds.hero[0]]}
      />
    </aside>
  );
}

export default function Page() {
  return (
    <div className="bg-[#f5f7fb] text-slate-950">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:py-8">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Tools
            </Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-white">
              Learn
            </Link>
            <span>/</span>
            <span>レンタルサーバー比較</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge tone="slate">PR / 広告を含みます</Badge>
                <Badge tone="blue">2026年5月11日確認</Badge>
                <Badge tone="orange">料金は公式で確認</Badge>
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                レンタルサーバー選びで迷う初心者へ。
                <span className="block text-emerald-300">
                  XserverとConoHa WINGをやさしく比較。
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                無料お試し、WordPressの始めやすさ、料金の見方、更新時の注意点まで整理。初めてでも納得して公式サイトを確認できる比較ページです。
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <AffiliateButton href={XSERVER_URL} tone="emerald" full>
                  Xserverの無料お試しを見る
                </AffiliateButton>
                <AffiliateButton href={CONOHA_URL} tone="orange" full>
                  ConoHa WINGの条件を見る
                </AffiliateButton>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-400">
                価格・特典はキャンペーンで変わります。最新条件は各公式サイトで確認してください。
              </p>
            </div>

            <HeroSummary />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
        <TableOfContents />

        <div className="mt-8">
          <BannerSlot
            title="公式キャンペーンを確認"
            description="気になるサービスは、初回価格だけでなく更新時の条件まで見てください。"
            ads={bannerAds.hero}
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <main className="space-y-12">
            <RankingSection />
            <CampaignPanel />
            <ComparisonTable />
            <BannerSlot
              title="比較後に公式条件を見る"
              description="契約期間、更新料金、独自ドメイン特典の条件を確認しましょう。"
              ads={bannerAds.middle}
            />
            <CriteriaSection />

            <section id="faq" className="scroll-mt-24">
              <SectionTitle eyebrow="FAQ" title="よくある質問" />
              <div className="grid gap-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <summary className="cursor-pointer list-none text-base font-black text-slate-950">
                      <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                        Q
                      </span>
                      {faq.question}
                    </summary>
                    <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <BannerSlot
              title="最終チェック"
              description="申し込み前に最新キャンペーン、更新料金、解約条件を確認してください。"
              ads={bannerAds.bottom}
            />

            <section className="rounded-lg bg-slate-950 p-5 text-white shadow-sm sm:p-7">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <Badge tone="orange">Final CTA</Badge>
                  <h2 className="mt-3 text-2xl font-black tracking-tight">
                    最後は「不安を減らせるほう」を選ぶ
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    触ってから決めたいならエックスサーバー。WordPressブログをすぐ始めたいならConoHa WING。方向性が決まったら、公式サイトで最新条件を確認してください。
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[430px]">
                  <AffiliateButton href={XSERVER_URL} tone="emerald" full>
                    Xserver公式で確認
                  </AffiliateButton>
                  <AffiliateButton href={CONOHA_URL} tone="orange" full>
                    ConoHa公式で確認
                  </AffiliateButton>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">
                参考にした公式情報
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <a
                    href="https://www.xserver.ne.jp/price/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 underline"
                  >
                    エックスサーバー 料金プラン
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.xserver.ne.jp/order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 underline"
                  >
                    エックスサーバー お申し込みの流れ
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.conoha.jp/pricing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 underline"
                  >
                    ConoHa WING 料金
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.conoha.jp/wing/guide/wingpack/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 underline"
                  >
                    ConoHa WING WINGパック
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                価格やキャンペーンは頻繁に変わります。この記事は{article.date}
                時点の公式情報を確認して作成していますが、申し込み前には必ず各公式サイトで最新条件を確認してください。
              </p>
              <p className="mt-3">
                独自ドメインを別管理したい場合は、
                <a
                  href={XSERVER_DOMAIN_URL}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="font-bold text-emerald-700 underline"
                >
                  XServerドメイン
                </a>
                の料金も確認しておくと判断しやすくなります。
              </p>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">
                関連して読むと分かりやすい記事
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { href: "/learn/network/dns-basics", title: "DNSの仕組み" },
                  { href: "/learn/network/https-tls", title: "HTTPSとTLS" },
                  {
                    href: "/learn/security/http-security-headers",
                    title: "HTTPセキュリティヘッダー",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <Sidebar />
        </div>

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
    </div>
  );
}
