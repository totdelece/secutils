import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "xserver-vps-guide")!;

const VPS_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25EKCY";
const VPS_TEXT_PIXEL =
  "https://www11.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25EKCY";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const banner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25GX8H",
  src: "https://www24.a8.net/svt/bgt?aid=260508487735&wid=001&eno=01&mid=s00000001642013012000&mc=1",
  pixel: "https://www12.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25GX8H",
  width: 300,
  height: 250,
  alt: "XServer VPS 公式キャンペーン",
};

const banner468x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25HCO1",
  src: "https://www22.a8.net/svt/bgt?aid=260508487735&wid=001&eno=01&mid=s00000001642013014000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25HCO1",
  width: 468,
  height: 60,
  alt: "XServer VPS 公式キャンペーン",
};

const banner320x50: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25H4Y9",
  src: "https://www27.a8.net/svt/bgt?aid=260508487735&wid=001&eno=01&mid=s00000001642013013000&mc=1",
  pixel: "https://www13.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25H4Y9",
  width: 320,
  height: 50,
  alt: "XServer VPS 公式キャンペーン",
};

const heroHighlights = [
  ["全プラン", "NVMe SSD"],
  ["ゲーム特化", "テンプレ完備"],
  ["国内大手", "Xserver 運営"],
  ["長期契約で", "月額大幅割引"],
];

const tldr = [
  {
    title: "VPSは仮想専用サーバー",
    body: "1台の物理サーバーを仮想分割し、利用者ごとにrootと独立OSが渡される。共有レンタルサーバーより自由度が高い。",
  },
  {
    title: "向く用途は意外と多い",
    body: "マイクラサーバー、Discord Bot、自前Webサービス、開発検証、ML推論、VPN自前運用など、常時稼働＋自由なソフト導入が必要なシーン。",
  },
  {
    title: "迷ったらXServer VPS",
    body: "国内大手Xserverグループ運営、NVMe SSD標準、ゲームテンプレ用意、長期契約割引。最初の1台として現実的な選択肢。",
  },
];

const serverTiers = [
  {
    tier: "共有レンタル",
    badge: "もっとも気軽",
    badgeTone: "slate" as const,
    bullets: [
      "月数百円〜から始められる",
      "OSやミドルウェアは固定",
      "WordPress・静的サイト向き",
      "運用はほぼ事業者任せ",
    ],
    fit: "WordPressブログを素直に動かしたい人",
    accent: "border-slate-200 bg-white",
  },
  {
    tier: "VPS",
    badge: "今回の主役",
    badgeTone: "emerald" as const,
    bullets: [
      "月数百〜数千円",
      "rootあり、OS・ソフト自由",
      "ゲーム・Bot・自前Web・開発検証",
      "OS管理・セキュリティは自己責任",
    ],
    fit: "自分だけの環境で何かを動かしたい人",
    accent: "border-emerald-300 bg-emerald-50/60 ring-1 ring-emerald-200/70",
    highlight: true,
  },
  {
    tier: "専用サーバー",
    badge: "オーバースペック",
    badgeTone: "slate" as const,
    bullets: [
      "月数千〜数万円",
      "物理サーバーを丸ごと専有",
      "大規模サービス・特殊要件",
      "個人にはほぼ過剰",
    ],
    fit: "事業として大規模に運用する人",
    accent: "border-slate-200 bg-white",
  },
];

const useCases = [
  {
    label: "MC",
    title: "マインクラフトサーバー",
    body: "友人と遊ぶマルチサーバーを24時間稼働。大人数なら 4〜8GB プランが目安。",
  },
  {
    label: "Bot",
    title: "Discord / LINE Bot",
    body: "Python・Node.js で書いた Bot を常駐。軽量なら 1〜2GB で十分動く。",
  },
  {
    label: "Web",
    title: "自前 Web サービス / API",
    body: "副業や個人開発のサービスを公開。フレームワーク・DB・キャッシュを自由構成。",
  },
  {
    label: "Dev",
    title: "開発・検証環境",
    body: "本番に近い環境（HTTPS・独自ドメイン・メール送信）をすぐ用意できる。",
  },
  {
    label: "ML",
    title: "機械学習・スクレイピング",
    body: "軽量推論や定期実行スクリプトの常時稼働基盤として使う。",
  },
  {
    label: "VPN",
    title: "VPN / プロキシ自前運用",
    body: "WireGuard などで自分専用 VPN を構築。リモート接続を集約できる。",
  },
];

const decisionAxes = [
  {
    no: "01",
    title: "メモリ / CPU",
    body: "落ちると一番痛い項目。マイクラ大人数なら 4〜8GB、Bot や軽量 Web なら 1〜2GB が目安。",
  },
  {
    no: "02",
    title: "SSD 容量と種別",
    body: "ログ・バックアップ・データ用に余裕を見る。NVMe SSD かどうかで体感が変わる。",
  },
  {
    no: "03",
    title: "転送量制限",
    body: "月の転送量に上限・追加課金があるか確認。ゲーム・動画系は念入りに。",
  },
  {
    no: "04",
    title: "初回 / 更新 / 契約期間",
    body: "初回キャンペーン価格と通常価格の差、契約期間の縛り、解約条件をセットで見る。",
  },
  {
    no: "05",
    title: "管理画面・テンプレ",
    body: "Minecraft Java 版や代表 OS をワンクリック展開できると詰まりにくい。",
  },
  {
    no: "06",
    title: "サポート体制",
    body: "障害時の連絡手段（フォーム・電話・チャット）と対応時間を確認しておく。",
  },
];

const xserverStrengths = [
  {
    title: "全プラン NVMe SSD",
    body: "ディスク読み書きが速く、DB やゲームサーバーで体感差が出やすい構成。",
  },
  {
    title: "ゲーム特化テンプレート",
    body: "Minecraft Java 版や ARK などを管理画面からテンプレ展開可能。初心者でも詰まりにくい。",
  },
  {
    title: "GUI で操作完結",
    body: "起動 / 再起動、コンソール、OS 再インストール、スナップショットを Web パネルで操作。",
  },
  {
    title: "長期契約で大幅割引",
    body: "12 / 24 / 36 か月契約で月額が下がる料金体系。最新割引率は公式で都度変動。",
  },
  {
    title: "Xserver グループの信頼感",
    body: "国内シェア No.1 を打ち出すレンタルサーバー事業者が運営。サポート・運用ノウハウを継承。",
  },
];

const planTiers = [
  {
    label: "Light",
    badge: "まず触ってみる",
    spec: "2GB / 3コア前後",
    target: "Bot、軽量 Web API、検証環境",
    note: "VPS を最初に試す層向け",
  },
  {
    label: "Standard",
    badge: "もっとも汎用",
    spec: "4GB / 4コア前後",
    target: "個人開発 Web、小〜中規模マイクラ",
    note: "迷ったらここから",
    highlight: true,
  },
  {
    label: "Pro",
    badge: "本格運用",
    spec: "8GB 以上 / 6コア以上",
    target: "大人数マイクラ、ML、複数サービス同居",
    note: "メモリ不足の心配を消したい人",
  },
];

const checklist = [
  "用途に対してメモリ容量は足りているか（落ちると痛い）",
  "契約期間・中途解約条件を確認したか",
  "初回価格と更新価格の差を理解しているか",
  "OS 選定とバックアップ方針が決まっているか",
  "SSH 鍵認証 / ファイアウォール運用方針を決めたか",
  "転送量・同時接続数の上限が用途に合っているか",
];

const faqs = [
  {
    q: "WordPress を動かすだけなら VPS と共有サーバーどっち？",
    a: "WordPress を「普通に動かしたい」だけなら共有レンタルサーバーが圧倒的に楽です。サーバーのアップデートや WAF、自動バックアップが組み込まれており、運用負荷が低くなります。",
    link: {
      href: "/learn/network/xserver-vs-conoha-wing",
      label: "エックスサーバー vs ConoHa WING の比較",
    },
  },
  {
    q: "SSH や root 権限が必要になる場面は？",
    a: "独自ミドルウェア（Redis、独自ビルドの Node、特殊ライブラリ等）を入れたい、cron で常駐プロセスを動かしたい、ネットワーク・ファイアウォール設定を細かく調整したい、といった操作で root 権限が必要になります。共有レンタルサーバーで詰まり始めたら、それが VPS 切り替えのサインです。",
  },
  {
    q: "セキュリティが不安です。VPS で気をつけることは？",
    a: "SSH パスワードログイン無効化（公開鍵認証のみ）、SSH ポート変更と Fail2ban、不要ポートのファイアウォール遮断、OS とミドルウェアの自動更新、定期スナップショット / バックアップ。この5点を押さえれば事故率は大幅に下がります。",
  },
  {
    q: "途中でプランを変更できますか？",
    a: "XServer VPS はメモリ / CPU を上位プランへスケールアップする機能があります。実運用してから足りなければ上げる方法が現実的です。下位スケールダウン可否や契約期間の扱いは時期で変わるため、公式サポートページで最新仕様を確認してください。",
  },
  {
    q: "海外 VPS（AWS Lightsail・Vultr 等）と比べてどう？",
    a: "海外 VPS は月額が安いものもありますが、日本語サポートが弱く、国内向けサービス公開時はレイテンシが不利になることがあります。日本国内向けゲームサーバーや、サポートを日本語で受けたい人は国内 VPS の方が運用負担が軽くなりやすいです。",
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
  variant?: "solid" | "outline";
  size?: "md" | "lg";
}) {
  const variantClass =
    variant === "solid"
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/15 hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-emerald-600"
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
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
        }}
      />
    </>
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
          <span>XServer VPS 入門</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge tone="slate">PR / 広告を含みます</Badge>
              <Badge tone="blue">{article.date} 確認</Badge>
              <Badge tone="amber">価格は公式確認</Badge>
            </div>
            <h1 className="text-[40px] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
              VPS、はじめての一台。
              <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-blue-700 bg-clip-text text-transparent dark:from-emerald-300 dark:to-sky-300">
                XServer VPS で始める「自分だけのサーバー」。
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              共有レンタルサーバーでは物足りない、マイクラサーバーやDiscord Botを24時間動かしたい、副業の自前Webサービスを公開したい。そんなとき、現実的な最初の選択肢になるのが VPS です。
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
              <CtaButton href={VPS_URL} size="lg">
                XServer VPS のキャンペーンを見る
              </CtaButton>
              <CtaButton href={VPS_URL} variant="outline" size="lg">
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
              <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <span>PR / 公式キャンペーン</span>
                <span className="text-emerald-700">A8 official</span>
              </div>
              <div className="relative flex justify-center">
                <BannerImage ad={banner300x250} />
              </div>
              <a
                href={VPS_URL}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="mt-4 block text-center text-xs font-bold text-emerald-700 underline-offset-2 hover:underline"
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

function ServerTierSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Compare" title="共有 / VPS / 専用 — どこに位置するか">
          サーバーサービスは大きく3階層。VPSは「共有では物足りない、専用までは要らない」中間ゾーンを埋める存在です。
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-3">
          {serverTiers.map((tier) => (
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
                <h3 className="text-xl font-black text-slate-950">{tier.tier}</h3>
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
        <SectionTitle eyebrow="Use cases" title="VPS でできること">
          個人レベルでもVPSが刺さるシーンは多い。共通点は「ずっと動かしたい」「自分でソフトを入れたい」。
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
        <SectionTitle eyebrow="Selection" title="VPS を選ぶときに見るべき 6 つの軸">
          価格表だけ眺めても判断できません。この順番でチェックすると、自分に合うサービスが絞り込めます。
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
            まずは公式キャンペーンと最新料金を確認
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            メモリ / CPU の構成、月額、長期契約割引、Minecraft 等のテンプレートの有無は時期で変動します。最終的な判断は公式の料金ページで最新条件を見てから決めてください。
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <CtaButton href={VPS_URL} size="lg">
              XServer VPS の料金プランを見る
            </CtaButton>
            <CtaButton href={VPS_URL} variant="outline" size="lg">
              公式キャンペーンを見る
            </CtaButton>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="hidden w-full max-w-md rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:block">
            <div className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              PR / 公式バナー
            </div>
            <div className="flex justify-center">
              <BannerImage ad={banner468x60} />
            </div>
          </div>
          <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:hidden">
            <div className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              PR / 公式バナー
            </div>
            <div className="flex justify-center">
              <BannerImage ad={banner320x50} />
            </div>
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
        <SectionTitle eyebrow="Why XServer VPS" title="XServer VPS の 5 つの強み">
          国内シェアNo.1を打ち出すエックスサーバーが運営する VPS。共有サーバーで蓄積した運用ノウハウが、そのまま VPS にも引き継がれています。
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
        <SectionTitle eyebrow="Plans" title="プラン早見表 — 用途別の選び方">
          正確な月額・キャンペーン価格は公式サイトをご確認ください。ここでは「どのサイズが自分に合うか」の目安を示します。
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-3">
          {planTiers.map((p) => (
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
                    Most popular
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
          メモリは「不足するとサービスが落ちる」直結項目です。迷ったら一つ上のプランから始めて、運用が落ち着いてから下げる方が安全です。XServer VPS はプラン変更（スケールアップ）にも対応しています。
        </p>
      </div>
    </section>
  );
}

function ChecklistSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Pre-flight" title="申し込み前のチェックリスト">
          VPS は便利な反面、運用は自分で責任を持つ世界です。申し込みボタンを押す前に、ここだけは確認してください。
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
          初心者が VPS 検討時に最初にぶつかる疑問を集めました。
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
            最終結論 — 迷ったら XServer VPS
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            国内で実績のある事業者、NVMe SSD 標準、ゲームテンプレ完備、長期契約割引。VPS 入門の最初の1台として、現実的な候補です。
          </p>
        </div>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
            <h3 className="text-xl font-black text-white sm:text-2xl">
              申し込み前の最終確認
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li>
                <span className="font-bold text-white">初回 / 更新価格:</span>{" "}
                通常価格との差をチェック
              </li>
              <li>
                <span className="font-bold text-white">契約期間:</span>{" "}
                何か月縛りか、中途解約の扱いはどうか
              </li>
              <li>
                <span className="font-bold text-white">メモリ:</span>{" "}
                用途に対して足りているか
              </li>
              <li>
                <span className="font-bold text-white">テンプレ:</span>{" "}
                Minecraft 等のワンクリック展開対象か
              </li>
            </ul>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <CtaButton href={VPS_URL} size="lg">
                公式キャンペーンを確認
              </CtaButton>
              <CtaButton href={VPS_URL} variant="outline" size="lg">
                料金プランを見る
              </CtaButton>
            </div>
          </div>
          <aside className="rounded-3xl bg-white p-5 text-slate-950 shadow-2xl">
            <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              <span>PR / 公式キャンペーン</span>
              <span className="text-emerald-700">A8 official</span>
            </div>
            <div className="relative flex justify-center">
              <BannerImage ad={banner300x250} />
            </div>
            <a
              href={VPS_URL}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="mt-4 block text-center text-xs font-bold text-emerald-700 underline-offset-2 hover:underline"
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
              href="https://vps.xserver.ne.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 underline-offset-2 hover:underline"
            >
              XServer VPS 公式サイト
            </a>
          </li>
          <li>
            <a
              href="https://vps.xserver.ne.jp/price.php"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 underline-offset-2 hover:underline"
            >
              XServer VPS 料金プラン
            </a>
          </li>
          <li>
            <a
              href="https://vps.xserver.ne.jp/minecraft/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 underline-offset-2 hover:underline"
            >
              XServer VPS for Game / Minecraft
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
          この記事は {article.date} 時点の公式情報を確認して作成しています。申し込み前には公式サイトで最新の価格・特典・契約条件を確認してください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    {
      href: "/learn/network/xserver-vs-conoha-wing",
      title: "エックスサーバー vs ConoHa WING 比較",
      eyebrow: "Compare",
    },
    {
      href: "/learn/network/cidr-notation",
      title: "CIDR 記法の読み方",
      eyebrow: "Network",
    },
    {
      href: "/learn/security/secure-randomness",
      title: "安全な乱数の基本",
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
      <ServerTierSection />
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
        <img src={VPS_TEXT_PIXEL} width={1} height={1} alt="" />
      </div>
    </div>
  );
}
