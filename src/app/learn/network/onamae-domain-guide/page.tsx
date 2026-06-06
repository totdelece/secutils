import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "onamae-domain-guide")!;

const ONAMAE_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HHG82";
const ONAMAE_TEXT_PIXEL =
  "https://www11.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HHG82";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const banner300x250a: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HW0WX",
  src: "https://www24.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015098000&mc=1",
  pixel: "https://www18.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HW0WX",
  width: 300,
  height: 250,
  alt: "お名前.com 独自ドメイン取得",
};

const banner300x250b: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HWO29",
  src: "https://www29.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015101000&mc=1",
  pixel: "https://www17.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HWO29",
  width: 300,
  height: 250,
  alt: "お名前.com 独自ドメイン取得",
};

const banner336x280: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HP601",
  src: "https://www22.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015066000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HP601",
  width: 336,
  height: 280,
  alt: "お名前.com 独自ドメイン取得",
};

const banner728x90: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HV61T",
  src: "https://www23.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015094000&mc=1",
  pixel: "https://www16.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HV61T",
  width: 728,
  height: 90,
  alt: "お名前.com 独自ドメイン取得",
};

const banner468x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HQGAP",
  src: "https://www25.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015072000&mc=1",
  pixel: "https://www19.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HQGAP",
  width: 468,
  height: 60,
  alt: "お名前.com 独自ドメイン取得",
};

const banner234x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HU3GX",
  src: "https://www28.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015089000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HU3GX",
  width: 234,
  height: 60,
  alt: "お名前.com 独自ドメイン取得",
};

const banner160x600: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HQO0H",
  src: "https://www26.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015073000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HQO0H",
  width: 160,
  height: 600,
  alt: "お名前.com 独自ドメイン取得",
};

const banner120x600: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HGLCX",
  src: "https://www21.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015026000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HGLCX",
  width: 120,
  height: 600,
  alt: "お名前.com 独自ドメイン取得",
};

const banner125x125: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HI3DD",
  src: "https://www21.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015033000&mc=1",
  pixel: "https://www14.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HI3DD",
  width: 125,
  height: 125,
  alt: "お名前.com 独自ドメイン取得",
};

const banner120x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HC3BL",
  src: "https://www29.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015005000&mc=1",
  pixel: "https://www19.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HC3BL",
  width: 120,
  height: 60,
  alt: "お名前.com 独自ドメイン取得",
};

const banner100x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HCB1D",
  src: "https://www23.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015006000&mc=1",
  pixel: "https://www19.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HCB1D",
  width: 100,
  height: 60,
  alt: "お名前.com 独自ドメイン取得",
};

const heroHighlights: [string, string][] = [
  ["国内シェア", "No.1"],
  [".com/.net", "1円〜*"],
  ["TLD選択", "900種類+"],
  ["Whois代行", "無料"],
];

const tldr = [
  {
    no: "01",
    title: "国内シェアNo.1で最初の選択肢",
    body: "GMOインターネットグループが運営。.comと.netはキャンペーン時に1円〜から取得でき、初期コストを最小化しやすい。",
  },
  {
    no: "02",
    title: "Whois代行・DNS変更が自由",
    body: "Whois情報公開代行が無料。ネームサーバーはVercel・Cloudflare・各レンタルサーバーなど好きな先に自由に設定できる。",
  },
  {
    no: "03",
    title: "更新料を確認してから申し込む",
    body: "初回キャンペーン価格は安いが更新後は通常価格へ。「更新後の年額」を必ず公式で確認し、申し込み後すぐ自動更新を設定すること。",
  },
];

const tldPricing = [
  { tld: ".com", first: "1円〜*", renewal: "約1,430円/年", badge: "最定番", highlight: true },
  { tld: ".net", first: "1円〜*", renewal: "約1,430円/年", badge: "", highlight: false },
  { tld: ".org", first: "約1,080円〜*", renewal: "約1,650円/年", badge: "", highlight: false },
  { tld: ".jp", first: "約2,970円〜*", renewal: "約2,970円/年", badge: "日本向け", highlight: false },
  { tld: ".co.jp", first: "約3,740円〜*", renewal: "約3,740円/年", badge: "法人・書類審査", highlight: false },
  { tld: ".dev", first: "約3,135円〜*", renewal: "約3,135円/年", badge: "エンジニア向け", highlight: false },
  { tld: ".io", first: "約4,950円〜*", renewal: "約6,550円/年", badge: "更新高め注意", highlight: false },
];

const steps = [
  {
    no: "01",
    title: "ドメイン名を決めて検索",
    body: "公式サイトのトップにある検索窓に希望のドメイン名を入力。空きがあれば取得可能と表示される。複数の候補を試して、取得できるものを確認しよう。",
  },
  {
    no: "02",
    title: "カートに追加 → 会員登録",
    body: "欲しいドメインをカートに追加後、会員登録 or ログイン。初回は名前・メールアドレス・住所の登録が必要。メールアドレスはすぐ確認できるものを使う。",
  },
  {
    no: "03",
    title: "Whois情報公開代行を有効化（必須）",
    body: "申し込み画面の「Whois情報公開代行」を必ずONにする。有効化しないとドメイン登録者の名前・住所・電話番号が全世界に公開される状態になる。",
  },
  {
    no: "04",
    title: "支払い方法を設定して申し込み",
    body: "クレジットカード払いが自動更新設定をしやすくおすすめ。コンビニ・銀行振込も選べる。申し込み後すぐ確認メールが届く。",
  },
  {
    no: "05",
    title: "ネームサーバーを設定",
    body: "管理画面から「ネームサーバー設定」へ進み、利用するサービス（Vercel・GitHub Pages・レンタルサーバー等）が指定するネームサーバーへ変更する。反映まで最大24時間程度かかる。",
  },
];

const strengths = [
  {
    title: "国内シェアNo.1の信頼感",
    body: "GMOインターネットグループが運営する国内最大規模のドメイン登録サービス。長年の実績と24時間対応サポートがあり、初めてのドメイン取得でも安心して使える。",
  },
  {
    title: ".com/.netが低コストでスタート",
    body: "キャンペーン期間中は1円〜で.comや.netを取得できる。初期コストを最小化しつつ、本番環境のドメインとして十分機能する。",
  },
  {
    title: "900種類以上のTLDを選べる",
    body: ".com/.net/.jp/.co.jp/.dev/.ioなど国内最大水準のTLD数。マニアックなTLDにも対応しており、ブランドや用途に合ったドメインを選べる。",
  },
  {
    title: "Whois情報公開代行が無料",
    body: "ドメイン登録者の住所・電話番号がWhoisで公開されるリスクを、無料のプロキシ代行でカバー。個人情報保護の観点で必須の設定が無料なのは大きなメリット。",
  },
  {
    title: "ネームサーバー変更が自由",
    body: "Vercel・Cloudflare・各レンタルサーバーなど、任意のネームサーバーへ変更できる。ドメインだけ取得してホスティングは別サービスを使う構成でも問題ない。",
  },
];

const cautions = [
  {
    level: "high" as const,
    title: "更新価格は初回より高い",
    body: ".comの初回1円はキャンペーン価格。更新は約1,430円/年が目安になる。申し込み前に「更新後の年額」を公式サイトで必ず確認すること。",
  },
  {
    level: "high" as const,
    title: "自動更新は申し込み直後に設定する",
    body: "ドメインが失効すると復元に高額な費用が発生するか、最悪の場合は第三者に取得される。申し込み完了後すぐに管理画面で自動更新をONにすること。",
  },
  {
    level: "medium" as const,
    title: "Whois代行は自分でONにする",
    body: "Whois情報公開代行は申し込みフローで選択しないと有効にならない。デフォルトOFFの場合があるため、申し込み画面で必ず確認が必要。",
  },
  {
    level: "medium" as const,
    title: "不要なオプションの確認",
    body: "レンタルサーバー・メール・SSL証明書など追加オプションが申し込み画面に表示される。不要なものはOFFを確認してから進むこと。",
  },
];

const checklist = [
  "更新後の年額を公式サイトで確認した",
  "Whois情報公開代行を有効化した",
  "自動更新（クレジットカード払い推奨）を設定した",
  "不要なオプションが含まれていないか確認した",
  "ネームサーバーの設定先（Vercel / サーバー等）を確認した",
];

type Faq = {
  q: string;
  a: string;
  link?: { href: string; label: string };
};

const faqs: Faq[] = [
  {
    q: "初回のキャンペーン価格はいつまで適用されますか？",
    a: "キャンペーン価格は取得時の1年分のみ適用されます。2年目以降は通常の更新価格に戻ります。キャンペーン内容は時期により変動するため、申し込み前に公式サイトで最新の価格を確認してください。",
  },
  {
    q: "Whois情報公開代行とは何ですか？なぜ必要ですか？",
    a: "ドメインを取得すると、登録者の名前・住所・電話番号がWhoisデータベースで公開されるのが原則です。Whois情報公開代行（プロキシ）を利用すると、登録者情報がお名前.com側の情報に置き換えられ、個人情報の公開を防げます。お名前.comでは無料で利用できます。申し込み時に必ず有効化してください。",
  },
  {
    q: "取得したドメインをVercel・GitHub Pagesで使えますか？",
    a: "使えます。お名前.comの管理画面でネームサーバーまたはDNSレコード（A / CNAME）を変更するだけです。各サービスのドキュメントに従って設定してください。変更後の反映には最大24〜48時間かかる場合があります。",
  },
  {
    q: "ドメインを別の業者へ移管（トランスファー）できますか？",
    a: "可能です。移管には管理画面から移管用の認証コード（AuthCode）を発行し、移管先のサービスで手続きを進めます。.com/.netなどgTLDは比較的スムーズに移管できますが、.co.jpなどccTLDは手続きが異なるため事前確認が必要です。",
  },
  {
    q: ".comと.jpどちらを選べばいいですか？",
    a: "個人ブログや個人開発のサービスなら.comが定番でコストも低めです。日本国内向けサービスや法人の場合は.jpも候補になります。ただし.co.jpは法人登記の書類審査が必要で取得ハードルがあります。エンジニアが技術系サービスや開発ブログに使う場合は.devも人気です。",
    link: {
      href: "/learn/network/xserver-domain-guide",
      label: "XServerドメインでのTLD選びガイド",
    },
  },
];

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "orange" | "amber" | "blue";
}) {
  const map = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    orange: "bg-orange-50 text-orange-700 ring-orange-200",
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
      ? "bg-orange-600 text-white shadow-lg shadow-orange-950/15 hover:-translate-y-0.5 hover:bg-orange-700 focus-visible:outline-orange-600"
      : "border border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-50 focus-visible:outline-orange-600";
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
      <span aria-hidden="true">{"→"}</span>
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
      <div className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-600">
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff7ed_0%,#f8fafc_72%,#ffffff_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl"
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
          <Link
            href="/learn?category=network"
            className="hover:text-slate-950"
          >
            Network
          </Link>
          <span>/</span>
          <span>お名前.com ドメイン取得ガイド</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge tone="slate">PR / 広告を含みます</Badge>
              <Badge tone="blue">{article.date} 確認</Badge>
              <Badge tone="amber">価格は公式確認</Badge>
            </div>
            <h1 className="text-[40px] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
              ドメインは、
              <br />
              お名前.com で。
              <span className="mt-2 block bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                国内No.1・.com から1円〜。
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Webサービス・ブログ・ポートフォリオに独自ドメインは欠かせません。国内シェアNo.1のお名前.comなら、900種類以上のTLDから選べて、Whois情報公開代行も無料。初めてのドメイン取得に迷わない手順と注意点をまとめました。
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroHighlights.map(([line1, line2]) => (
                <li
                  key={line1}
                  className="rounded-xl border border-orange-100 bg-white/85 p-3 text-center shadow-sm"
                >
                  <div className="text-[11px] font-bold text-orange-600">
                    {line1}
                  </div>
                  <div className="mt-1 text-sm font-black text-slate-950">
                    {line2}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,320px)_minmax(0,260px)]">
              <CtaButton href={ONAMAE_URL} size="lg">
                ドメインを今すぐ取得する
              </CtaButton>
              <CtaButton href={ONAMAE_URL} variant="outline" size="lg">
                料金・キャンペーンを確認
              </CtaButton>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              ※
              本ページのリンクには広告を含みます。価格・キャンペーンは記事執筆時点の情報です。最新条件は公式サイトでご確認ください。
            </p>
          </div>

          <aside className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-orange-200/60 via-amber-200/40 to-transparent blur-xl" />
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-orange-950/10">
              <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <span>PR / 公式バナー</span>
                <span className="text-orange-600">A8 official</span>
              </div>
              <div className="relative flex justify-center">
                <BannerImage ad={banner300x250a} />
              </div>
              <a
                href={ONAMAE_URL}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="mt-4 block text-center text-xs font-bold text-orange-600 underline-offset-2 hover:underline"
              >
                公式サイトで詳細を見る →
              </a>
            </div>
          </aside>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ONAMAE_TEXT_PIXEL}
        width={1}
        height={1}
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />
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
          {tldr.map((item) => (
            <article
              key={item.no}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >
              <div className="absolute right-5 top-5 text-5xl font-black text-orange-100">
                {item.no}
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

function BannerCtaBand({
  title,
  description,
  ad,
}: {
  title: string;
  description: string;
  ad: BannerAd;
}) {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <Badge tone="orange">公式キャンペーン</Badge>
          <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <CtaButton href={ONAMAE_URL} size="lg">
              お名前.com でドメインを取得
            </CtaButton>
            <CtaButton href={ONAMAE_URL} variant="outline" size="lg">
              料金・キャンペーンを確認
            </CtaButton>
          </div>
        </div>
        <div className="relative hidden w-[340px] flex-shrink-0 justify-center overflow-hidden sm:flex">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              PR / 公式バナー
            </div>
            <div className="flex items-center justify-center">
              <BannerImage ad={ad} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Pricing" title="主要TLDの料金早見表">
          初回取得価格と更新価格は異なります。長期コストは「更新価格 × 年数」で確認してください。
        </SectionTitle>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  TLD
                </th>
                <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                  初回取得
                </th>
                <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                  更新（年額）
                </th>
                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  メモ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tldPricing.map((row) => (
                <tr key={row.tld} className={row.highlight ? "bg-orange-50/60" : ""}>
                  <td className="px-4 py-4">
                    <span className="font-black text-slate-950">{row.tld}</span>
                    {row.highlight && (
                      <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-black text-orange-700">
                        おすすめ
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-orange-600">
                    {row.first}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-slate-700">
                    {row.renewal}
                  </td>
                  <td className="px-4 py-4 text-slate-500">{row.badge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          * キャンペーン時の参考価格。時期により変動します。最新価格は必ず公式サイトでご確認ください。
        </p>
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="How to"
          title="ドメイン取得の流れ（5ステップ）"
          align="left"
        >
          難しい手順はありません。検索 → 登録 → 設定の3フェーズで完了します。
        </SectionTitle>
        <div className="relative space-y-4">
          <div
            aria-hidden="true"
            className="absolute bottom-12 left-[27px] top-12 hidden w-0.5 bg-gradient-to-b from-orange-300 to-orange-100 sm:block"
          />
          {steps.map((step, idx) => (
            <article key={step.no} className="relative flex gap-5 sm:gap-6">
              <div className="relative flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 shadow-sm">
                <span className="text-[10px] font-black text-orange-400">
                  STEP
                </span>
                <span className="text-lg font-black leading-none text-orange-700">
                  {idx + 1}
                </span>
              </div>
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-black text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,320px)_minmax(0,260px)]">
          <CtaButton href={ONAMAE_URL} size="lg">
            お名前.com でドメインを探す
          </CtaButton>
          <CtaButton href={ONAMAE_URL} variant="outline" size="lg">
            公式サイトで手順を確認
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function StrengthsSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Why お名前.com" title="お名前.com の 5 つの強み">
          国内シェアNo.1を保つ理由は、価格・選択肢・プライバシー保護・柔軟性のバランスにあります。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, idx) => (
            <article
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl font-black text-orange-600 ring-1 ring-orange-200/60">
                {idx + 1}
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

function CautionsSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="Caution"
          title="申し込み前に知っておくべき 4 つの注意点"
          align="left"
        >
          ここを読んでから申し込むと、後悔がなくなります。
        </SectionTitle>
        <div className="space-y-4">
          {cautions.map((c) => (
            <article
              key={c.title}
              className={`rounded-2xl border p-5 ${
                c.level === "high"
                  ? "border-red-200 bg-red-50"
                  : "border-amber-200 bg-amber-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    c.level === "high"
                      ? "bg-red-600 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {c.level === "high" ? "!" : "?"}
                </span>
                <div>
                  <h3 className="font-black text-slate-950">{c.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {c.body}
                  </p>
                </div>
              </div>
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
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="Checklist"
          title="申し込みボタンを押す前のチェックリスト"
          align="left"
        >
          この5点を確認してから申し込めば、よくある失敗は避けられます。
        </SectionTitle>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-700"
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
          ドメイン取得で迷いやすいポイントをまとめました。
        </SectionTitle>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-orange-300 open:shadow-md"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-orange-700">
                    Q
                  </span>
                  {f.q}
                </span>
                <span
                  aria-hidden="true"
                  className="text-orange-600 transition group-open:rotate-45"
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
                      className="font-bold text-orange-600 underline-offset-2 hover:underline"
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

function ServiceCardSection({ ad, tagline }: { ad: BannerAd; tagline: string }) {
  return (
    <section className="bg-white px-5 py-12 sm:px-6">
      <div className="mx-auto max-w-md">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <a
            href={ad.href}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="block"
            aria-label={`お名前.com 公式サイト - ${tagline}`}
          >
            <div className="flex h-[200px] items-center justify-center bg-slate-50 p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ad.src}
                alt={ad.alt}
                width={ad.width}
                height={ad.height}
                style={{
                  maxWidth: "100%",
                  maxHeight: "160px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </a>
          <div className="p-5">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-slate-950">お名前.com</span>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-black text-orange-700">
                PR
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{tagline}</p>
            <div className="mt-4">
              <CtaButton href={ad.href}>公式サイトを見る</CtaButton>
            </div>
          </div>
        </article>
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
    </section>
  );
}

function BannerStripSection() {
  return (
    <section className="bg-slate-50 px-5 py-12 sm:px-6">
      <div className="relative mx-auto w-full max-w-[728px]">
        <a
          href={banner728x90.href}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="block overflow-hidden rounded-lg transition hover:opacity-90"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner728x90.src}
            alt={banner728x90.alt}
            width={728}
            height={90}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={banner728x90.pixel}
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

function FinalDecision() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white px-5 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Final Decision" title="こんな人におすすめ">
          迷っている人への最後の判断材料です。
        </SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <div className="mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-orange-600">
              お名前.com が向く人
            </div>
            <ul className="space-y-3">
              {[
                ".comや.netを安くスタートしたい",
                "国内最大手で安心感を重視したい",
                "豊富なTLDから選びたい",
                "Vercel・GitHub Pagesと組み合わせたい",
                "Whois代行を無料で使いたい",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm font-bold text-slate-800"
                >
                  <span className="mt-0.5 text-orange-600">{"✓"}</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CtaButton href={ONAMAE_URL} size="lg">
                お名前.com でドメインを取得
              </CtaButton>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
              別のサービスを検討してもいい人
            </div>
            <ul className="space-y-3">
              {[
                "XServerのサーバー契約とまとめて管理したい",
                "エックスサーバーのドメイン特典を使いたい",
                "管理画面をシンプルに統一したい",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm font-bold text-slate-600"
                >
                  <span className="mt-0.5 text-slate-400">{"→"}</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/learn/network/xserver-domain-guide"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-950 no-underline transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
              >
                <span>XServerドメイン ガイドを見る</span>
                <span aria-hidden="true">{"→"}</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="border-t border-slate-200 bg-white px-5 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
          参考情報
        </div>
        <ul className="space-y-2 text-xs text-slate-500">
          <li>
            お名前.com 公式サイト — ドメイン取得・料金・キャンペーン情報（
            <a
              href="https://www.onamae.com/"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="text-orange-600 underline underline-offset-2 hover:text-orange-700"
            >
              www.onamae.com
            </a>
            ）
          </li>
          <li>
            ※
            本記事の料金は記事執筆時点の参考値です。実際の価格・キャンペーン内容は公式サイトでご確認ください。
          </li>
          <li>
            ※
            本ページには広告リンク（A8.net アフィリエイト）が含まれます。リンクからの購入により掲載者に報酬が発生することがあります。
          </li>
        </ul>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    {
      href: "/learn/network/xserver-domain-guide",
      title: "独自ドメイン取得ガイド（XServerドメイン版）",
      desc: "XServerドメインで.jp/.com/.devを選ぶ判断と設定手順",
    },
    {
      href: "/learn/network/xserver-vs-conoha-wing",
      title: "エックスサーバー vs ConoHa WING 比較",
      desc: "WordPress初心者向けレンタルサーバー選びの判断基準",
    },
    {
      href: "/learn/network/xserver-vps-guide",
      title: "XServer VPS 入門ガイド",
      desc: "VPSとレンタルサーバーの違い、用途別の選び方を解説",
    },
  ];
  return (
    <section className="border-t border-slate-100 bg-slate-50 px-5 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
          関連記事
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm no-underline transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
            >
              <div className="text-sm font-black text-slate-950 group-hover:text-orange-700">
                {l.title}
              </div>
              <div className="mt-1 text-xs leading-5 text-slate-500">
                {l.desc}
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
    <main>
      <Hero />
      <TldrSection />
      <BannerCtaBand
        title="まずはドメイン名を検索してみる"
        description=".comや.netの空き状況と最新キャンペーン価格を確認してください。"
        ad={banner468x60}
      />
      <PricingSection />
      <StepsSection />
      <StrengthsSection />
      <BannerCtaBand
        title="ドメイン取得は今がチャンス"
        description="キャンペーン価格は期間限定です。公式サイトで最新の料金を確認してください。"
        ad={banner336x280}
      />
      <CautionsSection />
      <ChecklistSection />
      <FaqSection />
      <ServiceCardSection
        ad={banner300x250b}
        tagline="国内シェアNo.1。.comはキャンペーン時1円〜で取得可。Whois代行無料・ネームサーバー設定自由。"
      />
      <FinalDecision />
      <BannerStripSection />
      <References />
      <RelatedLinks />
    </main>
  );
}
