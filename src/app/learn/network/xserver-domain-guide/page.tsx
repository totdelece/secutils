import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "xserver-domain-guide")!;

const DOMAIN_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C3TBLE+CO4+15ORS2";
const DOMAIN_TEXT_PIXEL =
  "https://www13.a8.net/0.gif?a8mat=4B3LMV+C3TBLE+CO4+15ORS2";

const heroHighlights = [
  ["国内大手", "Xserver 運営"],
  ["年1〜2千円", "から取得可能"],
  ["WHOIS代理", "公開料無料"],
  ["契約画面", "5分で完了"],
];

const tldr = [
  {
    title: "独自ドメインは信頼の最低条件",
    body: "AdSense 審査、SEO 評価集約、商用利用、ブランド構築。年1〜2千円の投資で得られる効果に対し、フリーサブドメインで失うものは大きい。",
  },
  {
    title: "TLD は「用途」で決まる",
    body: ".com は世界標準、.jp は日本向け、.dev は開発者ブランド、.app はモバイル系。先に「誰に向けたサイトか」を決めると候補は3つ以内に絞れる。",
  },
  {
    title: "迷ったら .com か .jp",
    body: "個人サイトなら .com、日本国内向けサービスなら .jp。どちらも AdSense / 取引先・読者からの信頼性に対する評価が高く、価格も安定。",
  },
];

const domainTiers = [
  {
    tier: "フリーサブドメイン",
    badge: "練習用",
    badgeTone: "slate" as const,
    bullets: [
      "月額0円（vercel.app / github.io 等）",
      "URLにサービス名が常に付く",
      "AdSense審査が通りにくい",
      "SEO評価が親ドメインに分散",
    ],
    fit: "個人の練習・プレビュー・検証",
    accent: "border-slate-200 bg-white",
  },
  {
    tier: "独自ドメイン",
    badge: "今回の主役",
    badgeTone: "emerald" as const,
    bullets: [
      "年1〜2千円〜（.com / .jp / .dev 等）",
      "自分のブランドそのまま使える",
      "AdSense / 商用利用がスムーズ",
      "SEO 評価がドメインに集約",
    ],
    fit: "副業ブログ、ポートフォリオ、収益化サイト",
    accent: "border-emerald-300 bg-emerald-50/60 ring-1 ring-emerald-200/70",
    highlight: true,
  },
  {
    tier: "プレミアム / 高額TLD",
    badge: "オーバースペック",
    badgeTone: "slate" as const,
    bullets: [
      "年4千円〜数万円（.io / .ai / 中古ドメイン）",
      "短く・覚えやすい・テック感",
      "スタートアップ・SaaS 向け",
      "個人ブログにはコスト過剰",
    ],
    fit: "投資判断ができる段階のサービス運営者",
    accent: "border-slate-200 bg-white",
  },
];

const useCases = [
  {
    label: "信頼",
    title: "信頼性の確保",
    body: "メールアドレスにブランド名が入る、URLが覚えやすい。第三者が「ちゃんと運営している」と判断する最低条件。",
  },
  {
    label: "AdSense",
    title: "AdSense / 広告審査",
    body: "Google AdSense は近年フリーサブドメインに厳しい。独自ドメインなら審査の土俵に乗せやすい。",
  },
  {
    label: "引越",
    title: "ホスティング先の自由",
    body: "Vercel → Cloudflare Pages → 自前 VPS、と引っ越してもURLは不変。ホスティング会社に縛られない。",
  },
  {
    label: "メール",
    title: "独自ドメインメール",
    body: "@yourbrand.jp で問い合わせ受付。Google Workspace 等と組み合わせれば見栄えも信頼性も上がる。",
  },
  {
    label: "SEO",
    title: "SEO 評価の集約",
    body: "被リンク・滞在時間・コンテンツ評価が一つのドメインに蓄積。引っ越しても評価が引き継がれる。",
  },
  {
    label: "Brand",
    title: "ブランディング",
    body: "名刺・SNS・印刷物に印象的なURLを載せられる。短く独自性のあるドメインは長期資産になる。",
  },
];

const decisionAxes = [
  {
    no: "01",
    title: "用途と読者層",
    body: "国内向けなら .jp、世界に向けるなら .com、開発者コミュニティ向けなら .dev。先に「誰に届けるか」を決めるとTLDの候補が絞れる。",
  },
  {
    no: "02",
    title: "取得料と更新料の差",
    body: "初回キャンペーン価格と通常価格・更新料はTLDによって 2〜3倍差があることも。取得時より更新料を見るのが鉄則。",
  },
  {
    no: "03",
    title: "文字数とブランド一致",
    body: "短いほど良いが、人気の短いドメインは取られている。希望ドメインが空いていたら即決推奨。.dev/.app は比較的空きが多い。",
  },
  {
    no: "04",
    title: "TLD の社会的信頼性",
    body: ".com/.jp/.net/.org は誰でも知っている。.xyz/.top/.click 等は無料配布の歴史から検索エンジンや読者が警戒することがある。",
  },
  {
    no: "05",
    title: "取得制限と特殊要件",
    body: ".jp は日本国内住所が必須、.dev は HTTPS（HSTS preload）必須、.us は米国居住者向け。技術要件は取得前に確認する。",
  },
  {
    no: "06",
    title: "移管しやすさ",
    body: "将来別レジストラへ移したくなったときの手数料・ロック期間・認証コード発行手順。最初は気にしなくていいが、レジストラ選びの基準にはなる。",
  },
];

const xserverStrengths = [
  {
    title: "国内大手の安心感",
    body: "エックスサーバー株式会社が運営。レンタルサーバー国内シェア No.1 ブランドの運用ノウハウがそのまま生きている。",
  },
  {
    title: "WHOIS 代理公開が無料",
    body: "個人情報を WHOIS に露出させないオプションが標準無料。他社は年数百〜千円かかることがあるが、XServer は追加料金なし。",
  },
  {
    title: "エックスサーバー本体との連携",
    body: "レンタルサーバー / VPS と同じアカウントで管理。ドメインとサーバーをまとめたい人なら導線が短い。",
  },
  {
    title: "日本語管理画面・サポート",
    body: "海外レジストラのような英語UIに悩まされない。電話・メール・チャットで日本語サポートを受けられる。",
  },
  {
    title: "シンプルな料金体系",
    body: ".com/.jp/.net など主要TLDは取得料・更新料ともに業界水準。隠れたコスト（更新時の急激な値上げ）が少ない。",
  },
];

const tldPlans = [
  {
    label: ".com",
    badge: "もっとも汎用",
    spec: "年 1,500円台",
    target: "個人ブログ、ポートフォリオ、SaaS、世界展開",
    note: "迷ったらコレ。誰でも知っている王道TLD",
  },
  {
    label: ".jp",
    badge: "日本特化",
    spec: "年 3,000円台",
    target: "日本国内向けサービス、企業サイト、商用",
    note: "日本住所必須・信頼感は最強・更新料はやや高め",
    highlight: true,
  },
  {
    label: ".dev",
    badge: "開発者向け",
    spec: "年 1,500円台",
    target: "技術ブログ、エンジニアポートフォリオ、OSS",
    note: "HTTPS（HSTS preload）必須。テック系の信頼性UP",
  },
];

const checklist = [
  "希望ドメインの空き状況を確認したか",
  "取得料と更新料の差を理解しているか",
  "自動更新を ON にしたか（失効すると即サイト消滅）",
  "WHOIS 代理公開を ON にしたか（個人情報保護）",
  "ホスティング先のDNS設定方針が決まっているか",
  "SSL/TLS 証明書の発行元が決まっているか（Let's Encrypt 等）",
];

const faqs = [
  {
    q: "無料サブドメイン（vercel.app / github.io）じゃダメですか？",
    a: "練習や検証用なら全く問題ありませんが、本格運用には不向きです。Google AdSense はフリーサブドメインを「ドメインを所有していない」と判定して審査落ちにする傾向が強く、SEO 評価も親ドメイン全体に分散します。年1〜2千円の投資で防げる制約が多いため、本気で運用するなら早めの独自ドメイン取得を推奨します。",
  },
  {
    q: "取得後にやることは？",
    a: "①ネームサーバーを確認（XServerドメインのDNSをそのまま使うか、Cloudflare 等の外部DNSに切り替えるか）、②A レコードまたは CNAME レコードでホスティング先（Vercel・自前サーバー）を指す、③SSL/TLS 証明書を自動発行（Vercel・Let's Encrypt なら数分で完了）、④メールが必要なら MX レコードを設定。最低限この4ステップで公開できます。",
    link: {
      href: "/learn/network/dns-basics",
      label: "DNSの仕組みと名前解決の流れ",
    },
  },
  {
    q: "メールも独自ドメインにすべきですか？",
    a: "ビジネス用途なら強く推奨します（@yourbrand.jp で問い合わせ受付）。ただし、XServerドメイン単体ではメール送受信機能を提供していません。Google Workspace（月額700円台〜）、Microsoft 365、または エックスサーバーレンタルサーバーのメール機能を組み合わせます。SPF / DKIM / DMARC の設定も忘れず行ってください。",
  },
  {
    q: "更新料が高くなる心配はありますか？",
    a: "TLD によっては運営方針で更新料が上がることがあります（特に .io 等の人気TLD）。XServerドメインで取り扱う .com / .jp / .net は比較的安定的な価格設定で、急激な値上げは稀です。それでも保険として、年1回の更新タイミングで他レジストラの料金もチェックしておくと、トランスファー判断ができます。",
  },
  {
    q: "ドメインを失効するとどうなりますか？",
    a: "期限切れから30〜60日の猶予期間（Redemption Period）を経て、第三者が取得可能になります。ドロップキャッチ業者が即座に取得して高額リセールするケースが多く、人気ドメインだと数万〜数十万円で買い戻すことになります。自動更新を必ず ON にし、決済カードの期限切れ通知も見落とさないようにしましょう。",
  },
];

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "emerald" | "amber" | "blue";
}) {
  const map = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
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
  variant?: "solid" | "outline" | "dark";
  size?: "md" | "lg";
}) {
  const variantClass =
    variant === "solid"
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/15 hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-emerald-600"
      : variant === "dark"
        ? "bg-slate-950 text-white hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-slate-900"
        : "border border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-emerald-600";
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
      <div className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">
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

function PromoCard({ caption }: { caption: string }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 text-center shadow-inner">
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
        PR / 公式キャンペーン
      </div>
      <div className="mt-3 text-2xl font-black tracking-tight text-slate-950">
        XServer
        <span className="ml-1 bg-gradient-to-r from-emerald-600 to-blue-700 bg-clip-text text-transparent">
          ドメイン
        </span>
      </div>
      <div className="mt-2 text-xs font-bold text-slate-500">
        国内大手の独自ドメインサービス
      </div>
      <div className="mx-auto mt-4 grid max-w-xs gap-2 text-left">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="text-emerald-600">✓</span>
          .com / .jp / .net など主要TLD
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="text-emerald-600">✓</span>
          WHOIS 代理公開が無料
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="text-emerald-600">✓</span>
          日本語サポート対応
        </div>
      </div>
      <a
        href={DOMAIN_URL}
        rel="nofollow noopener noreferrer"
        target="_blank"
        className="mt-5 inline-block text-xs font-bold text-emerald-700 underline-offset-2 hover:underline"
      >
        公式サイトで詳細を見る →
      </a>
      <p className="mt-2 text-[10px] font-bold text-slate-400">{caption}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ecfdf5_0%,#f8fafc_72%,#ffffff_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl"
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
          <Link href="/learn?category=network" className="hover:text-slate-950">
            Network
          </Link>
          <span>/</span>
          <span>独自ドメイン取得ガイド</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge tone="slate">PR / 広告を含みます</Badge>
              <Badge tone="blue">{article.date} 公開</Badge>
              <Badge tone="amber">価格は公式確認</Badge>
            </div>
            <h1 className="text-[40px] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
              独自ドメイン、最初の一歩。
              <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-blue-700 bg-clip-text text-transparent dark:from-emerald-300 dark:to-sky-300">
                XServer ドメインで、自分のアドレスを持つ。
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              フリーサブドメイン（vercel.app / github.io）から脱却したい、AdSense 審査を通したい、ブランドのある URL でサイトを運営したい。年1〜2千円から始められる独自ドメインは、副業や個人サイトの「最初の固定費」です。
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroHighlights.map(([line1, line2]) => (
                <li
                  key={line1}
                  className="rounded-xl border border-emerald-100 bg-white/85 p-3 text-center shadow-sm"
                >
                  <div className="text-[11px] font-bold text-emerald-700">
                    {line1}
                  </div>
                  <div className="mt-1 text-sm font-black text-slate-950">
                    {line2}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,320px)_minmax(0,260px)]">
              <CtaButton href={DOMAIN_URL} size="lg">
                XServer ドメインを見る
              </CtaButton>
              <CtaButton href={DOMAIN_URL} variant="outline" size="lg">
                料金プランを確認
              </CtaButton>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              ※ 本ページのリンクには広告を含みます。価格・キャンペーンは記事執筆時点の情報です。最新条件は公式サイトでご確認ください。
            </p>
          </div>

          <aside className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-emerald-200/60 via-blue-200/40 to-transparent blur-xl" />
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/10">
              <PromoCard caption="記事内のリンクから公式サイトへ移動できます" />
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
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="absolute right-5 top-5 text-5xl font-black text-emerald-100">
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

function DomainTierSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Compare"
          title="フリー / 独自 / プレミアム — 自分はどこ？"
        >
          ドメイン選びはまず「3階層のどこに自分がいるか」を決めること。独自ドメインの位置づけが鮮明になります。
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-3">
          {domainTiers.map((tier) => (
            <article
              key={tier.tier}
              className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-sm ${tier.accent}`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow">
                    Recommended
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-950">
                  {tier.tier}
                </h3>
                <Badge tone={tier.badgeTone}>{tier.badge}</Badge>
              </div>
              <ul className="mt-5 space-y-2.5">
                {tier.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2.5 text-sm leading-6 text-slate-700"
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        tier.highlight ? "bg-emerald-500" : "bg-slate-400"
                      }`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Best fit
                </div>
                <div className="mt-1 text-sm font-bold text-slate-950">
                  {tier.fit}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Why own a domain" title="独自ドメインで実現できる6つのこと">
          フリーサブドメインでは得られない、独自ドメインだけの価値。なぜ年1〜2千円を払う価値があるかを6つに分けて整理しました。
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => (
            <article
              key={uc.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-sm font-black tracking-wide text-emerald-700 ring-1 ring-emerald-200/60">
                {uc.label}
              </div>
              <h3 className="mt-5 text-lg font-black text-slate-950">
                {uc.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{uc.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DecisionAxesSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Selection"
          title="TLD を選ぶときに見るべき 6 つの軸"
        >
          価格表だけ眺めても判断できません。この順番でチェックすると、自分に合うTLDが絞り込めます。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decisionAxes.map((axis) => (
            <article
              key={axis.no}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl font-black tracking-tight text-emerald-700">
                {axis.no}
              </div>
              <h3 className="mt-3 text-lg font-black text-slate-950">
                {axis.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {axis.body}
              </p>
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
      <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-center">
        <div>
          <Badge tone="emerald">公式キャンペーン</Badge>
          <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
            まずは公式の料金と取得可能ドメインを確認
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            希望ドメインの空き状況・取得料・更新料は時期で変動します。最終判断は公式の料金ページで最新条件を見てから決めてください。XServer ドメインなら主要TLDを業界水準の価格で取得できます。
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <CtaButton href={DOMAIN_URL} size="lg">
              料金プランを見る
            </CtaButton>
            <CtaButton href={DOMAIN_URL} variant="outline" size="lg">
              ドメイン検索を試す
            </CtaButton>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="w-full max-w-sm">
            <PromoCard caption="クリックで公式サイトへ" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StrengthsSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Why XServer Domain"
          title="XServer ドメインの 5 つの強み"
        >
          国内シェアNo.1を打ち出すエックスサーバーが運営する独自ドメインサービス。レンタルサーバー本体と同じアカウントで管理できる導線設計が光ります。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {xserverStrengths.map((s) => (
            <article
              key={s.title}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-base font-black text-white shadow-sm">
                ✓
              </div>
              <h3 className="mt-5 text-lg font-black text-slate-950">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="TLD picks"
          title="主要TLD早見表 — どれを選ぶ？"
        >
          正確な取得料・更新料は公式サイトをご確認ください。ここでは「どのTLDが自分の用途に合うか」の目安を示します。
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-3">
          {tldPlans.map((p) => (
            <article
              key={p.label}
              className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
                p.highlight
                  ? "border-emerald-300 bg-white ring-1 ring-emerald-200/70 lg:scale-[1.02]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow">
                    Trust
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-slate-950">
                  {p.label}
                </div>
                <Badge tone={p.highlight ? "emerald" : "slate"}>{p.badge}</Badge>
              </div>
              <div className="mt-5 rounded-xl bg-slate-950 px-4 py-3 text-center text-base font-black text-white">
                {p.spec}
              </div>
              <div className="mt-5">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Target
                </div>
                <div className="mt-1 text-sm font-bold text-slate-950">
                  {p.target}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{p.note}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-7 text-slate-600">
          表示価格は記事執筆時点（{article.date}）の目安です。実際の取得料・更新料・キャンペーンは公式の最新情報をご確認ください。希望ドメインが空いていたら、検討中でも仮押さえせずに早めの取得を推奨します（人気ドメインは秒単位で取られていきます）。
        </p>
      </div>
    </section>
  );
}

function ChecklistSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Pre-flight"
          title="申し込み前のチェックリスト"
        >
          独自ドメインは取得した瞬間からあなたのブランド資産になります。失効・乗っ取りリスクを下げるため、契約前に以下だけは確認してください。
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
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="FAQ" title="よくある質問">
          初心者がドメイン検討時に最初にぶつかる疑問を集めました。
        </SectionTitle>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-emerald-300 open:shadow-md"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700">
                    Q
                  </span>
                  {f.q}
                </span>
                <span
                  aria-hidden="true"
                  className="text-emerald-700 transition group-open:rotate-45"
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
                      className="font-bold text-emerald-700 underline-offset-2 hover:underline"
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
          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-300">
            Final
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            最終結論 — 迷ったら XServer ドメイン
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            国内大手の安心感、WHOIS 代理公開が無料、エックスサーバー本体との一元管理。独自ドメイン取得の最初のレジストラとして現実的な候補です。
          </p>
        </div>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
            <h3 className="text-xl font-black text-white sm:text-2xl">
              申し込み前の最終確認
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li>
                <span className="font-bold text-white">取得料 / 更新料:</span>{" "}
                通常価格との差をチェック
              </li>
              <li>
                <span className="font-bold text-white">WHOIS 代理公開:</span>{" "}
                必ず ON にする（個人情報保護）
              </li>
              <li>
                <span className="font-bold text-white">自動更新:</span>{" "}
                ON にして失効を防止
              </li>
              <li>
                <span className="font-bold text-white">DNS / SSL:</span>{" "}
                ホスティング先（Vercel・自前サーバー）との連携準備
              </li>
            </ul>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <CtaButton href={DOMAIN_URL} size="lg">
                公式サイトで取得を見る
              </CtaButton>
              <CtaButton href={DOMAIN_URL} variant="outline" size="lg">
                料金プランを確認
              </CtaButton>
            </div>
          </div>
          <aside className="rounded-3xl bg-white p-5 text-slate-950 shadow-2xl">
            <PromoCard caption="クリックで公式サイトに移動します" />
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
              href="https://www.xdomain.ne.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 underline-offset-2 hover:underline"
            >
              XServer ドメイン公式サイト
            </a>
          </li>
          <li>
            <a
              href="https://jprs.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 underline-offset-2 hover:underline"
            >
              JPRS（.jp レジストリ）
            </a>
          </li>
          <li>
            <a
              href="https://www.icann.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 underline-offset-2 hover:underline"
            >
              ICANN（ドメイン名管理団体）
            </a>
          </li>
          <li>
            <a
              href="https://www.xserver.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 underline-offset-2 hover:underline"
            >
              エックスサーバー株式会社（運営会社）
            </a>
          </li>
        </ul>
        <p className="mt-4">
          この記事は {article.date} 時点の公式情報を確認して作成しています。取得・更新・移管前には公式サイトで最新の価格・条件をご確認ください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    {
      href: "/learn/network/dns-basics",
      title: "DNS の仕組みと名前解決の流れ",
      eyebrow: "Network",
    },
    {
      href: "/learn/network/xserver-vps-guide",
      title: "XServer VPS とは？初心者向けの始め方",
      eyebrow: "Server",
    },
    {
      href: "/learn/network/https-tls",
      title: "HTTPS と TLS の仕組み",
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
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                {item.eyebrow}
              </div>
              <div className="mt-2 text-sm font-black text-slate-950">
                {item.title}
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-slate-500 transition group-hover:text-emerald-700">
                記事を読む <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="hosting-compare vps-guide bg-white text-slate-950">
      <Hero />
      <TldrSection />
      <DomainTierSection />
      <UseCaseSection />
      <DecisionAxesSection />
      <BannerCtaBand />
      <StrengthsSection />
      <PlanSection />
      <ChecklistSection />
      <FaqSection />
      <FinalDecision />
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
        <img src={DOMAIN_TEXT_PIXEL} width={1} height={1} alt="" />
      </div>
    </div>
  );
}
