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

const comparisonRows = [
  {
    label: "料金",
    xserver: "無料お試し後に本契約。長期運用でも見通しを立てやすい。",
    conoha: "WINGパックの長期前払いで割引が入りやすい。最新条件は公式で確認。",
    winner: "目的で分かれる",
  },
  {
    label: "無料お試し",
    xserver: "10日間の無料お試しあり。管理画面やWordPressを触ってから判断しやすい。",
    conoha: "WINGパックは長期契約型。申し込み前に解約条件を確認したい。",
    winner: "エックスサーバー",
  },
  {
    label: "WordPressの始めやすさ",
    xserver: "慣れれば問題ないが、初回は管理画面の役割を理解する必要がある。",
    conoha: "申し込みからWordPress開設までの導線がまとまっていて初心者向き。",
    winner: "ConoHa WING",
  },
  {
    label: "表示速度",
    xserver: "国内の定番サーバーとして十分。実測はテーマや画像にも左右される。",
    conoha: "高速訴求が強い。体感速度はサイト設計やキャッシュ設定も重要。",
    winner: "大差なし",
  },
  {
    label: "サポート",
    xserver: "電話・メール対応あり。長期運用や事業用途でも選びやすい。",
    conoha: "電話・メール対応あり。個人ブログ用途なら十分に候補になる。",
    winner: "大差なし",
  },
  {
    label: "独自ドメイン",
    xserver: "契約条件により特典あり。サーバーと分けて管理したい人にも向く。",
    conoha: "WINGパックなら独自ドメイン特典が分かりやすい。",
    winner: "ConoHa WING",
  },
  {
    label: "初心者向け度",
    xserver: "無料で試せる安心感が強い。迷っている人に向く。",
    conoha: "ブログを始める前提なら手順が短く、最初の迷いが少ない。",
    winner: "ConoHa WING",
  },
  {
    label: "注意点",
    xserver: "無料期間後の支払い、ドメイン特典条件、更新費用を確認。",
    conoha: "長期前払い、途中解約条件、通常料金への戻り方を確認。",
    winner: "必ず公式確認",
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
      "キャンペーン、契約期間、更新時期で変わります。この記事では断定せず、申し込み前に必ず公式サイトの総支払額と更新料金を確認する前提で比較しています。",
  },
  {
    question: "表示速度だけで選んでいいですか？",
    answer:
      "おすすめしません。速度はサーバーだけでなく、WordPressテーマ、画像サイズ、プラグイン、キャッシュ設定でも大きく変わります。初心者は操作性と契約条件も見たほうが失敗しにくいです。",
  },
  {
    question: "無料お試しは重要ですか？",
    answer:
      "初めてレンタルサーバーを使う人には重要です。管理画面、WordPress、メール、SSL設定を触ってから判断できるため、失敗しにくくなります。",
  },
];

function Badge({
  children,
  tone = "emerald",
}: {
  children: React.ReactNode;
  tone?: "emerald" | "blue" | "orange" | "slate";
}) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    orange: "bg-orange-50 text-orange-700 ring-orange-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function AffiliateButton({
  href,
  children,
  tone = "primary",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "primary" | "orange" | "outline";
}) {
  const tones = {
    primary:
      "bg-emerald-600 text-white shadow-emerald-900/20 hover:bg-emerald-700",
    orange:
      "bg-orange-500 text-white shadow-orange-900/20 hover:bg-orange-600",
    outline:
      "border border-slate-300 bg-white text-slate-950 hover:border-emerald-500 hover:text-emerald-700",
  };

  return (
    <a
      href={href}
      rel="nofollow noopener noreferrer"
      target="_blank"
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-md px-5 py-3 text-center text-sm font-black no-underline shadow-lg transition sm:w-auto ${tones[tone]}`}
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

function ServiceCard({
  rank,
  label,
  name,
  lead,
  points,
  href,
  tone,
}: {
  rank: string;
  label: string;
  name: string;
  lead: string;
  points: string[];
  href: string;
  tone: "emerald" | "orange";
}) {
  const isEmerald = tone === "emerald";

  return (
    <article
      className={`relative overflow-hidden rounded-lg border bg-white p-5 shadow-sm ${
        isEmerald ? "border-emerald-300" : "border-orange-300"
      }`}
    >
      <div
        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-black ${
          isEmerald
            ? "bg-emerald-100 text-emerald-800"
            : "bg-orange-100 text-orange-800"
        }`}
      >
        {rank}
      </div>
      <Badge tone={isEmerald ? "emerald" : "orange"}>{label}</Badge>
      <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
        {name}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{lead}</p>
      <ul className="mt-4 space-y-2">
        {points.map((point) => (
          <li key={point} className="flex gap-2 text-sm leading-6 text-slate-700">
            <span
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${
                isEmerald ? "bg-emerald-600" : "bg-orange-500"
              }`}
            >
              ✓
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <AffiliateButton href={href} tone={isEmerald ? "primary" : "orange"}>
          公式サイトで条件を確認
        </AffiliateButton>
      </div>
    </article>
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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-[11px] font-black uppercase tracking-wide text-slate-400">
            PR / 広告
          </div>
          <div className="mt-1 text-base font-black text-slate-950">{title}</div>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
        <Badge tone="slate">公式確認</Badge>
      </div>
      <div className="grid items-center justify-center gap-4 md:grid-cols-2">
        {ads.map((ad) => (
          <a
            key={`${title}-${ad.service}`}
            href={ad.href}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="flex justify-center rounded-md border border-slate-100 bg-slate-50 p-2 transition hover:border-emerald-300 hover:bg-emerald-50"
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

function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[1.1fr_1fr_1fr] bg-slate-950 text-xs font-black text-white sm:text-sm md:grid">
        <div className="p-3 sm:p-4">比較項目</div>
        <div className="border-l border-white/10 p-3 sm:p-4">
          エックスサーバー
        </div>
        <div className="border-l border-white/10 p-3 sm:p-4">ConoHa WING</div>
      </div>
      {comparisonRows.map((row, index) => (
        <div
          key={row.label}
          className={`grid grid-cols-1 border-t border-slate-200 md:grid-cols-[1.1fr_1fr_1fr] ${
            index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
          }`}
        >
          <div className="p-4">
            <div className="text-sm font-black text-slate-950">{row.label}</div>
            <div className="mt-2 inline-flex rounded-full bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700">
              {row.winner}
            </div>
          </div>
          <div className="border-t border-slate-100 p-4 text-sm leading-7 text-slate-700 md:border-l md:border-t-0">
            <div className="mb-1 text-xs font-black text-emerald-700 md:hidden">
              エックスサーバー
            </div>
            {row.xserver}
          </div>
          <div className="border-t border-slate-100 p-4 text-sm leading-7 text-slate-700 md:border-l md:border-t-0">
            <div className="mb-1 text-xs font-black text-orange-700 md:hidden">
              ConoHa WING
            </div>
            {row.conoha}
          </div>
        </div>
      ))}
    </div>
  );
}

function CtaPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Badge tone="emerald">迷ったら公式条件を確認</Badge>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">{description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[430px]">
          <AffiliateButton href={XSERVER_URL}>
            エックスサーバーを確認
          </AffiliateButton>
          <AffiliateButton href={CONOHA_URL} tone="orange">
            ConoHa WINGを確認
          </AffiliateButton>
        </div>
      </div>
    </section>
  );
}

function SidebarCard() {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-xs font-black text-slate-500">この記事の結論</div>
        <div className="mt-3 space-y-3">
          <div className="rounded-md bg-emerald-50 p-3">
            <div className="text-sm font-black text-emerald-800">
              迷ったらエックスサーバー
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              無料お試しで触ってから決めやすい。
            </p>
          </div>
          <div className="rounded-md bg-orange-50 p-3">
            <div className="text-sm font-black text-orange-800">
              早く始めるならConoHa WING
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              WordPress開設までの導線が分かりやすい。
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          <AffiliateButton href={XSERVER_URL}>公式で確認</AffiliateButton>
          <AffiliateButton href={CONOHA_URL} tone="orange">
            公式で確認
          </AffiliateButton>
        </div>
      </div>
      <BannerSlot
        title="キャンペーン確認"
        description="申し込み前に、料金・特典・更新条件を公式サイトで確認してください。"
        ads={[bannerAds.hero[0]]}
      />
    </aside>
  );
}

export default function Page() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:py-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
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

        <header className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge tone="slate">PR / 広告を含みます</Badge>
                <Badge tone="blue">2026年5月確認</Badge>
                <Badge tone="orange">料金は公式で確認</Badge>
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                エックスサーバー vs ConoHa WING
                <span className="block text-2xl text-emerald-700 sm:text-4xl">
                  初心者向けに違いを比較
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
                どちらもWordPressブログや小規模サイトで選ばれやすい定番サーバーです。
                このページでは、料金の見かけだけでなく、無料お試し、始めやすさ、更新時の注意点まで整理します。
              </p>
              <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <div className="text-sm font-black text-emerald-800">
                  結論
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  <strong>迷っているならエックスサーバー</strong>。
                  WordPressブログをすぐ始める前提なら
                  <strong> ConoHa WING</strong>。どちらも申し込み前に公式サイトで料金・特典・更新条件を確認してください。
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <AffiliateButton href={XSERVER_URL}>
                  エックスサーバー公式を確認
                </AffiliateButton>
                <AffiliateButton href={CONOHA_URL} tone="orange">
                  ConoHa WING公式を確認
                </AffiliateButton>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-slate-950 p-5 text-white lg:border-l lg:border-t-0">
              <div className="grid gap-4">
                <ServiceCard
                  rank="迷ったら"
                  label="無料お試しで確認しやすい"
                  name="エックスサーバー"
                  lead="10日間の無料お試しがあり、管理画面やWordPressを触ってから判断しやすい定番サーバー。"
                  points={[
                    "無料お試しで失敗しにくい",
                    "長期運用・複数サイトにも向く",
                    "事業用途でも選びやすい安心感",
                  ]}
                  href={XSERVER_URL}
                  tone="emerald"
                />
                <ServiceCard
                  rank="初心者向け"
                  label="ブログ開始の導線が分かりやすい"
                  name="ConoHa WING"
                  lead="WINGパックとWordPress開設の流れがまとまっていて、ブログを始める前提なら選びやすい。"
                  points={[
                    "WordPress開設までがスムーズ",
                    "独自ドメイン特典が分かりやすい",
                    "長期前払いに納得できる人向き",
                  ]}
                  href={CONOHA_URL}
                  tone="orange"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="mt-8">
          <BannerSlot
            title="Hero下バナー"
            description="キャンペーンは変わるため、価格は公式サイトで確認してください。"
            ads={bannerAds.hero}
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <main className="space-y-12">
            <section>
              <SectionTitle
                eyebrow="Recommendation"
                title="おすすめは目的で分けると迷いにくい"
              >
                「どちらが絶対に上」ではなく、申し込み前に不安を減らしたいのか、ブログ開設を短く済ませたいのかで選ぶのが現実的です。
              </SectionTitle>
              <div className="grid gap-5 md:grid-cols-2">
                <ServiceCard
                  rank="おすすめ 1"
                  label="迷ったらこちら"
                  name="エックスサーバー向きの人"
                  lead="初めてのサーバー契約で、管理画面やWordPressを触ってから支払うか決めたい人に向いています。"
                  points={[
                    "無料お試しで操作感を確認したい",
                    "長く使うブログや会社サイトを作る",
                    "複数サイト運用も視野にある",
                  ]}
                  href={XSERVER_URL}
                  tone="emerald"
                />
                <ServiceCard
                  rank="おすすめ 2"
                  label="初心者におすすめ"
                  name="ConoHa WING向きの人"
                  lead="WordPressブログを始めることが決まっていて、申し込みから開設までの迷いを減らしたい人に向いています。"
                  points={[
                    "ブログを今日から作りたい",
                    "サーバーとドメインをまとめたい",
                    "長期前払いの条件に納得できる",
                  ]}
                  href={CONOHA_URL}
                  tone="orange"
                />
              </div>
            </section>

            <CtaPanel
              title="申し込み前に、料金とキャンペーン条件だけは公式で確認"
              description="レンタルサーバーはキャンペーン価格、通常価格、更新料金、解約条件が変わることがあります。この記事では最新価格を断定せず、公式確認を前提にしています。"
            />

            <section>
              <SectionTitle
                eyebrow="Comparison"
                title="比較表で見るエックスサーバーとConoHa WINGの違い"
              >
                スマホでも判断しやすいように、項目ごとに「どちらが向いているか」を添えています。
              </SectionTitle>
              <ComparisonTable />
            </section>

            <BannerSlot
              title="比較表の後で公式条件を確認"
              description="気になったサービスは、キャンペーン価格ではなく更新時の条件まで見てください。"
              ads={bannerAds.middle}
            />

            <section>
              <SectionTitle
                eyebrow="How to choose"
                title="失敗しにくい選び方"
              >
                レンタルサーバー選びで後悔しやすいのは、初月の安さだけで決めることです。
              </SectionTitle>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "1. 初回支払い",
                    body: "キャンペーン価格、契約期間、初期費用の有無を確認します。",
                  },
                  {
                    title: "2. 更新料金",
                    body: "2回目以降の支払いがいくらになるかを必ず見ます。",
                  },
                  {
                    title: "3. 解約条件",
                    body: "長期前払いの場合、途中解約や返金条件を確認します。",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-base font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <CtaPanel
              title="まだ決めきれないなら、無料お試しのある選択肢から確認"
              description="管理画面やWordPressの操作感は、実際に触ると判断しやすくなります。迷っている人ほど、支払い前に確認できるかを重視してください。"
            />

            <section>
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
              title="記事下部バナー"
              description="最終的な料金・特典・契約条件は公式サイトで確認してください。"
              ads={bannerAds.bottom}
            />

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionTitle
                eyebrow="Checklist"
                title="申し込み前チェックリスト"
              />
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  "キャンペーン価格だけでなく通常料金も確認した",
                  "更新料金と契約期間を確認した",
                  "独自ドメイン特典の条件を確認した",
                  "途中解約や返金条件を確認した",
                  "WordPress以外の用途がないか確認した",
                  "メール、バックアップ、SSL、サポートの必要性を確認した",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg bg-slate-950 p-5 text-white shadow-sm sm:p-7">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <Badge tone="orange">Final CTA</Badge>
                  <h2 className="mt-3 text-2xl font-black tracking-tight">
                    最後は「不安を減らせるほう」を選ぶ
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    無料で触ってから決めたいならエックスサーバー。ブログ開始までの手順を短くしたいならConoHa WING。
                    価格は変動するため、申し込み前に公式サイトで最新条件を確認してください。
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[430px]">
                  <AffiliateButton href={XSERVER_URL}>
                    エックスサーバー公式
                  </AffiliateButton>
                  <AffiliateButton href={CONOHA_URL} tone="orange">
                    ConoHa WING公式
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
                    href="https://www.xserver.ne.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 underline"
                  >
                    エックスサーバー公式サイト
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

          <SidebarCard />
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
