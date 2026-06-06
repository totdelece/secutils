import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "onamae-vs-xserver-domain")!;

const ONAMAE_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HHG82";
const ONAMAE_PIXEL = "https://www11.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HHG82";
const XSERVER_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C3TBLE+CO4+15ORS2";
const XSERVER_PIXEL = "https://www13.a8.net/0.gif?a8mat=4B3LMV+C3TBLE+CO4+15ORS2";

type BannerAd = { href: string; src: string; pixel: string; width: number; height: number; alt: string };

const banner468x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HQGAP",
  src: "https://www25.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015072000&mc=1",
  pixel: "https://www19.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HQGAP",
  width: 468, height: 60, alt: "お名前.com 独自ドメイン取得",
};
const banner300x250b: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HWO29",
  src: "https://www29.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015101000&mc=1",
  pixel: "https://www17.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HWO29",
  width: 300, height: 250, alt: "お名前.com 独自ドメイン取得",
};
const banner728x90: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+71MOHE+50+2HV61T",
  src: "https://www23.a8.net/svt/bgt?aid=260508487426&wid=001&eno=01&mid=s00000000018015094000&mc=1",
  pixel: "https://www16.a8.net/0.gif?a8mat=4B3LMV+71MOHE+50+2HV61T",
  width: 728, height: 90, alt: "お名前.com 独自ドメイン取得",
};

const xserverBanner468x60: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C3TBLE+CO4+15THJ5",
  src: "https://www23.a8.net/svt/bgt?aid=260508487732&wid=001&eno=01&mid=s00000001642007024000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B3LMV+C3TBLE+CO4+15THJ5",
  width: 468, height: 60, alt: "XServerドメイン 独自ドメイン取得",
};
const xserverBanner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C3TBLE+CO4+15XZKH",
  src: "https://www24.a8.net/svt/bgt?aid=260508487732&wid=001&eno=01&mid=s00000001642007045000&mc=1",
  pixel: "https://www10.a8.net/0.gif?a8mat=4B3LMV+C3TBLE+CO4+15XZKH",
  width: 300, height: 250, alt: "XServerドメイン 独自ドメイン取得",
};
const xserverBanner728x90: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C3TBLE+CO4+15UK41",
  src: "https://www21.a8.net/svt/bgt?aid=260508487732&wid=001&eno=01&mid=s00000001642007029000&mc=1",
  pixel: "https://www13.a8.net/0.gif?a8mat=4B3LMV+C3TBLE+CO4+15UK41",
  width: 728, height: 90, alt: "XServerドメイン 独自ドメイン取得",
};

// ─────────────────────────────────────────────
// コンポーネント
// ─────────────────────────────────────────────

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "emerald" | "orange" | "amber" | "white";
}) {
  const map = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    orange: "bg-orange-50 text-orange-700 ring-orange-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    white: "bg-white/25 text-white ring-white/30",
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
  tone = "slate",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  tone?: "emerald" | "orange" | "slate" | "white";
}) {
  const solidMap = {
    emerald:
      "bg-emerald-600 text-white shadow-lg shadow-emerald-950/15 hover:bg-emerald-700 focus-visible:outline-emerald-600",
    orange:
      "bg-orange-600 text-white shadow-lg shadow-orange-950/15 hover:bg-orange-700 focus-visible:outline-orange-600",
    slate:
      "bg-slate-800 text-white shadow-lg hover:bg-slate-900 focus-visible:outline-slate-800",
    white:
      "bg-white text-slate-950 shadow-lg hover:bg-slate-100 focus-visible:outline-white",
  };
  const outlineMap = {
    emerald:
      "border border-emerald-300 bg-white text-slate-950 hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-emerald-600",
    orange:
      "border border-orange-300 bg-white text-slate-950 hover:border-orange-400 hover:bg-orange-50 focus-visible:outline-orange-600",
    slate:
      "border border-slate-300 bg-white text-slate-950 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-slate-600",
    white:
      "border border-white/50 bg-transparent text-white hover:bg-white/10 focus-visible:outline-white",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-black no-underline transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variant === "solid" ? solidMap[tone] : outlineMap[tone]}`}
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
      <div className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
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

// ─────────────────────────────────────────────
// データ
// ─────────────────────────────────────────────

const tldr = [
  {
    no: "01",
    title: "XServerを使うならXServerドメインで一元管理",
    body: "同じアカウントでサーバーとドメインを管理でき、設定の導線が短い。XServerのレンタルサーバーやVPSを契約している/予定なら迷わずXServerドメイン。",
  },
  {
    no: "02",
    title: "XServer以外を使うならお名前.comが有利",
    body: "Vercel・GitHub Pages・ConoHa・さくらVPS等と組み合わせる場合、TLD数900+・キャンペーン価格・独立管理のお名前.comが使いやすい。",
  },
  {
    no: "03",
    title: "料金は大差なし。更新価格を必ず確認",
    body: "両社とも初回キャンペーンあり。長期コストは.comで年1,400〜1,700円前後とほぼ同水準。どちらも自動更新を申し込み直後に設定すること。",
  },
];

const comparisonRows: {
  label: string;
  onamae: string;
  xserver: string;
  winner?: "onamae" | "xserver" | "draw";
  note?: string;
}[] = [
  {
    label: ".com 更新（年額）",
    onamae: "約1,430円",
    xserver: "約1,628円",
    winner: "onamae",
  },
  {
    label: ".jp 更新（年額）",
    onamae: "約2,970円",
    xserver: "約3,000円台",
    winner: "draw",
  },
  {
    label: ".dev 更新（年額）",
    onamae: "約3,135円",
    xserver: "約1,500円台",
    winner: "xserver",
  },
  {
    label: "TLD 種類数",
    onamae: "900種類+",
    xserver: "70種類+",
    winner: "onamae",
  },
  {
    label: "WHOIS 代行",
    onamae: "無料",
    xserver: "無料",
    winner: "draw",
  },
  {
    label: "XServerとの連携",
    onamae: "要別途設定",
    xserver: "同アカウントで統合",
    winner: "xserver",
  },
  {
    label: "管理画面の統合",
    onamae: "独立（ドメインのみ）",
    xserver: "サーバー・VPSと一元管理",
    winner: "xserver",
  },
  {
    label: "他サービスとの相性",
    onamae: "ネームサーバー自由設定",
    xserver: "ネームサーバー自由設定",
    winner: "draw",
  },
  {
    label: "サポート",
    onamae: "24時間対応",
    xserver: "電話・メール・チャット",
    winner: "draw",
  },
];

const tldPricing: {
  tld: string;
  onamae: string;
  xserver: string;
  note: string;
}[] = [
  { tld: ".com", onamae: "約1,430円/年", xserver: "約1,628円/年", note: "最定番・世界標準" },
  { tld: ".net", onamae: "約1,430円/年", xserver: "約1,628円/年", note: ".comに準じる" },
  { tld: ".jp",  onamae: "約2,970円/年", xserver: "約3,000円台/年", note: "日本向け・日本住所必須" },
  { tld: ".dev", onamae: "約3,135円/年", xserver: "約1,500円台/年", note: "エンジニア向け・HTTPS必須" },
  { tld: ".io",  onamae: "約6,550円/年", xserver: "取り扱い外*",   note: "更新高め・スタートアップ向け" },
];

const useCases: {
  winner: "onamae" | "xserver" | "draw";
  scenario: string;
  reason: string;
}[] = [
  {
    winner: "xserver",
    scenario: "XServerレンタルサーバーを使っている",
    reason: "同じ管理画面でドメインとサーバーを一括管理。設定ミスも減り導線が最短。",
  },
  {
    winner: "xserver",
    scenario: "XServer VPSを使う予定",
    reason: "ドメインとVPSを同アカウントで管理できる。DNSレコード設定の手間が少ない。",
  },
  {
    winner: "onamae",
    scenario: "Vercel・GitHub Pages・Netlifyでホスティングする",
    reason: "XServer以外のサービスと使う場合は統合メリットがない。TLD数が多く選択肢が広いお名前.comが便利。",
  },
  {
    winner: "onamae",
    scenario: "まず.comを1円でお試ししたい",
    reason: "キャンペーン時に1円〜で取得可。初期コストを最小化してスタートしたい人向け。",
  },
  {
    winner: "onamae",
    scenario: "マイナーなTLDを使いたい（.app / .gg / .xyz 等）",
    reason: "900種類以上のTLDを取り扱う国内最大規模。XServerドメインにない希少TLDもカバー。",
  },
  {
    winner: "draw",
    scenario: "ただしXServer以外のサービスで.devを使いたい",
    reason: ".devはXServerドメインの方が安いケースがある。目的TLDごとに両社の料金を比較するのが正解。",
  },
];

type Faq = {
  q: string;
  a: string;
  link?: { href: string; label: string };
};

const faqs: Faq[] = [
  {
    q: "後から別の会社へ移管（トランスファー）できますか？",
    a: "可能です。どちらのサービスも移管手続きに対応しています。管理画面で認証コード（AuthCode）を発行し、移管先サービスで手続きします。.com/.netなどgTLDは比較的スムーズです。ただし取得後60日間はICANN規定で移管ロックがかかります。",
  },
  {
    q: "どちらもWHOIS代行が無料ですが、設定方法は違いますか？",
    a: "お名前.comは申し込みフロー中に「Whois情報公開代行」をONにします（デフォルトOFFの場合があるため要確認）。XServerドメインは申し込み時に自動で代行設定になります。どちらも申し込み後の管理画面から確認・変更が可能です。",
  },
  {
    q: "両社のどちらが初心者に向いていますか？",
    a: "XServerのサービスを既に使っているかどうかで変わります。XServer利用中なら同じ管理画面でドメインを追加できるXServerドメインが迷わない。XServer未利用でVercel等を使うなら、ガイドが豊富で国内実績No.1のお名前.comが始めやすいです。",
  },
  {
    q: "自動更新の設定はどちらが必要ですか？",
    a: "両社とも申し込み直後に自動更新を設定することを強く推奨します。ドメインが失効すると復元に高額費用がかかるか、第三者に取得されます。クレジットカード払いにしておくと自動更新が確実です。",
  },
  {
    q: "料金の比較で見落としがちなポイントは？",
    a: "初回取得価格（キャンペーン価格）と更新価格の差です。両社ともキャンペーンで安く見えますが、毎年かかる「更新価格」で比較するのが正しい判断方法です。また.ioや.aiなど一部のTLDは更新料が高いため、長期コストを必ず試算してください。",
    link: {
      href: "/learn/network/onamae-domain-guide",
      label: "お名前.com TLD別料金表",
    },
  },
];

// ─────────────────────────────────────────────
// セクション
// ─────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl"
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
          <span>お名前.com vs XServerドメイン</span>
        </nav>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            <Badge tone="slate">PR / 広告を含みます</Badge>
            <Badge tone="amber">{article.date} 確認</Badge>
            <Badge tone="amber">価格は公式確認推奨</Badge>
          </div>

          <h1 className="text-[38px] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
            お名前.com
            <span className="mx-3 text-slate-300">vs</span>
            XServerドメイン
          </h1>
          <p className="mt-4 text-xl font-black text-slate-500 sm:text-2xl">
            どちらで取得すべきか
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            国内2大ドメイン登録サービスを料金・TLD数・WHOIS代行・サーバー連携の観点で比較。
            結論は「<strong className="text-slate-950">XServerを使うかどうか</strong>」で決まります。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-left">
              <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-orange-600">
                お名前.com
              </div>
              <p className="font-black text-slate-950">
                XServer以外を使う人・TLD選択肢が欲しい人
              </p>
              <p className="mt-1.5 text-sm text-slate-600">
                900種類+のTLD・国内シェアNo.1・キャンペーン価格
              </p>
              <div className="mt-4">
                <CtaButton href={ONAMAE_URL} tone="orange">
                  お名前.com 公式サイト
                </CtaButton>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-left">
              <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">
                XServerドメイン
              </div>
              <p className="font-black text-slate-950">
                XServerのサービスを使っている人・一元管理したい人
              </p>
              <p className="mt-1.5 text-sm text-slate-600">
                サーバー・VPSと同アカウント管理・WHOIS代行無料
              </p>
              <div className="mt-4">
                <CtaButton href={XSERVER_URL} tone="emerald">
                  XServerドメイン 公式サイト
                </CtaButton>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            ※
            本ページのリンクには広告を含みます。価格は記事執筆時点の参考値です。最新条件は各公式サイトでご確認ください。
          </p>
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
          読む時間がない人向けに、結論を先に置きます。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          {tldr.map((item) => (
            <article
              key={item.no}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="absolute right-5 top-5 text-5xl font-black text-slate-100">
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

function ComparisonSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Comparison" title="9項目で比較">
          価格・機能・利便性の主要項目をまとめました。
        </SectionTitle>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-slate-500 w-[30%]">
                  項目
                </th>
                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-orange-600 w-[30%]">
                  お名前.com
                </th>
                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-emerald-700 w-[30%]">
                  XServerドメイン
                </th>
                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-slate-400 w-[10%]">
                  優位
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <td className="px-4 py-3.5 font-bold text-slate-700">
                    {row.label}
                  </td>
                  <td
                    className={`px-4 py-3.5 font-bold ${row.winner === "onamae" ? "text-orange-600" : "text-slate-700"}`}
                  >
                    {row.onamae}
                  </td>
                  <td
                    className={`px-4 py-3.5 font-bold ${row.winner === "xserver" ? "text-emerald-700" : "text-slate-700"}`}
                  >
                    {row.xserver}
                  </td>
                  <td className="px-4 py-3.5 text-xs font-black">
                    {row.winner === "onamae" && (
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-700">
                        お名前
                      </span>
                    )}
                    {row.winner === "xserver" && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
                        XServer
                      </span>
                    )}
                    {row.winner === "draw" && (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          * 価格は参考値。最新料金は各公式サイトでご確認ください。
        </p>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Pricing" title="TLD別 更新料金の比較">
          更新料金（毎年かかるコスト）で比較するのが正しい判断方法です。
        </SectionTitle>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  TLD
                </th>
                <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-orange-600">
                  お名前.com
                </th>
                <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-emerald-700">
                  XServerドメイン
                </th>
                <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  メモ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tldPricing.map((row) => (
                <tr key={row.tld}>
                  <td className="px-4 py-4 font-black text-slate-950">
                    {row.tld}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-slate-700">
                    {row.onamae}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-slate-700">
                    {row.xserver}
                  </td>
                  <td className="px-4 py-4 text-slate-500">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          * 参考値。XServerドメインの取り扱いTLDは公式で確認してください。
        </p>
      </div>
    </section>
  );
}

function UseCaseSection() {
  const onamaeCases = useCases.filter((u) => u.winner === "onamae");
  const xserverCases = useCases.filter((u) => u.winner === "xserver");
  const drawCases = useCases.filter((u) => u.winner === "draw");

  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Use Cases" title="どちらを選ぶべきかシナリオ別">
          状況別の判断基準をまとめました。
        </SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-orange-200 bg-orange-50/50 p-6">
            <div className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-orange-600">
              お名前.com が向く場合
            </div>
            <ul className="space-y-4">
              {onamaeCases.map((u) => (
                <li key={u.scenario}>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-white">
                      ✓
                    </span>
                    <div>
                      <div className="text-sm font-black text-slate-950">
                        {u.scenario}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {u.reason}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CtaButton href={ONAMAE_URL} tone="orange">
                お名前.com 公式サイト
              </CtaButton>
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
            <div className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">
              XServerドメイン が向く場合
            </div>
            <ul className="space-y-4">
              {xserverCases.map((u) => (
                <li key={u.scenario}>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">
                      ✓
                    </span>
                    <div>
                      <div className="text-sm font-black text-slate-950">
                        {u.scenario}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {u.reason}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CtaButton href={XSERVER_URL} tone="emerald">
                XServerドメイン 公式サイト
              </CtaButton>
            </div>
          </article>
        </div>

        {drawCases.length > 0 && (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">
              補足・例外ケース
            </div>
            {drawCases.map((u) => (
              <div key={u.scenario} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-white">
                  !
                </span>
                <div>
                  <div className="text-sm font-black text-slate-950">
                    {u.scenario}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {u.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="FAQ" title="よくある質問">
          ドメイン選びで迷いやすいポイントをまとめました。
        </SectionTitle>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-slate-400 open:shadow-md"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700">
                    Q
                  </span>
                  {f.q}
                </span>
                <span
                  aria-hidden="true"
                  className="text-slate-400 transition group-open:rotate-45"
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
                      className="font-bold text-slate-700 underline underline-offset-2 hover:text-slate-950"
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

function FinalDecision() {
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">
            Final Decision
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            最終結論
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            迷ったら「XServerを今使っているか・使う予定があるか」だけ考えてください。
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
            <Badge tone="emerald">XServerユーザー</Badge>
            <h3 className="mt-4 text-2xl font-black text-slate-950">XServerドメイン</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              既にXServerのサービスを使っているなら同アカウントで管理できるXServerドメイン一択。DNS設定の手間が最小化される。
            </p>
            <div className="mt-5">
              <CtaButton href={XSERVER_URL} tone="emerald">
                XServerドメイン 公式へ
              </CtaButton>
            </div>
          </article>

          <article className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
            <Badge tone="orange">XServer以外を使う人</Badge>
            <h3 className="mt-4 text-2xl font-black text-slate-950">お名前.com</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Vercel・GitHub Pages・ConoHaなどXServer以外を使うなら、TLD数・価格・国内No.1の実績があるお名前.comが使いやすい。
            </p>
            <div className="mt-5">
              <CtaButton href={ONAMAE_URL} tone="orange">
                お名前.com 公式へ
              </CtaButton>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Badge tone="amber">どちらでも共通の注意</Badge>
            <h3 className="mt-4 text-2xl font-black text-slate-950">更新料と自動更新</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              初回キャンペーン価格だけで選ばず、毎年かかる更新料を確認してから申し込む。申し込み直後に自動更新を必ず設定すること。
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function BannerCtaBand({ ad, theme }: { ad: BannerAd; theme: "orange" | "emerald" }) {
  const isOrange = theme === "orange";
  return (
    <section className="relative bg-white px-5 py-12 sm:px-6">
      <div className={`mx-auto grid max-w-6xl gap-6 rounded-3xl border ${isOrange ? "border-orange-200 bg-gradient-to-br from-orange-50 to-white" : "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white"} p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center`}>
        <div>
          <Badge tone={isOrange ? "orange" : "emerald"}>公式キャンペーン</Badge>
          <h2 className="mt-3 text-2xl font-black text-slate-950">
            {isOrange ? "まずはドメイン名を検索してみる" : "XServerを使うなら一元管理が便利"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {isOrange
              ? ".comはキャンペーン時1円〜。取得前にお名前.comで希望ドメインが空いているか確認できます。"
              : "XServerのレンタルサーバー・VPSと同アカウントでドメインを管理。設定の手間を最小化できます。"}
          </p>
          <div className="mt-5">
            <CtaButton href={ad.href} tone={isOrange ? "orange" : "emerald"}>
              {isOrange ? "お名前.com でドメインを検索" : "XServerドメイン 公式サイトを確認"}
            </CtaButton>
          </div>
        </div>
        <div className="hidden flex-shrink-0 justify-center sm:flex">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">PR / 公式バナー</div>
            <a href={ad.href} rel="nofollow noopener noreferrer" target="_blank" className="block transition hover:opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ad.src} alt={ad.alt} width={ad.width} height={ad.height} className="h-auto max-w-full rounded-md" />
            </a>
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ad.pixel} width={1} height={1} alt="" aria-hidden="true"
        style={{ position: "absolute", top: 0, left: "-9999px", width: 1, height: 1 }} />
    </section>
  );
}

function ServiceCardSection({ onamaeAd, xserverAd }: { onamaeAd: BannerAd; xserverAd: BannerAd }) {
  return (
    <section className="bg-white px-5 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* お名前.com */}
          <div className="relative">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <a href={onamaeAd.href} rel="nofollow noopener noreferrer" target="_blank" className="block">
                <div className="flex h-[180px] items-center justify-center bg-slate-50 p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={onamaeAd.src} alt={onamaeAd.alt} width={onamaeAd.width} height={onamaeAd.height}
                    style={{ maxWidth: "100%", maxHeight: "150px", width: "auto", height: "auto", objectFit: "contain" }} />
                </div>
              </a>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-950">お名前.com</span>
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-black text-orange-700">PR</span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">国内シェアNo.1。TLD 900種類+。.comはキャンペーン時1円〜。WHOIS代行無料。</p>
                <div className="mt-4"><CtaButton href={onamaeAd.href} tone="orange">公式サイトを見る</CtaButton></div>
              </div>
            </article>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={onamaeAd.pixel} width={1} height={1} alt="" aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
          </div>
          {/* XServerドメイン */}
          <div className="relative">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <a href={xserverAd.href} rel="nofollow noopener noreferrer" target="_blank" className="block">
                <div className="flex h-[180px] items-center justify-center bg-slate-50 p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={xserverAd.src} alt={xserverAd.alt} width={xserverAd.width} height={xserverAd.height}
                    style={{ maxWidth: "100%", maxHeight: "150px", width: "auto", height: "auto", objectFit: "contain" }} />
                </div>
              </a>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-950">XServerドメイン</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700">PR</span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">XServerと同アカウント管理。TLD 70種類+。WHOIS代行無料。XServer利用者に最適。</p>
                <div className="mt-4"><CtaButton href={xserverAd.href} tone="emerald">公式サイトを見る</CtaButton></div>
              </div>
            </article>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={xserverAd.pixel} width={1} height={1} alt="" aria-hidden="true"
              style={{ position: "absolute", left: "-9998px", width: 1, height: 1 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerStripSection({ onamaeAd, xserverAd }: { onamaeAd: BannerAd; xserverAd: BannerAd }) {
  return (
    <section className="relative bg-slate-50 px-5 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-[728px] flex-col gap-4">
        <a href={onamaeAd.href} rel="nofollow noopener noreferrer" target="_blank"
          className="block overflow-hidden rounded-lg transition hover:opacity-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={onamaeAd.src} alt={onamaeAd.alt} width={728} height={90}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </a>
        <a href={xserverAd.href} rel="nofollow noopener noreferrer" target="_blank"
          className="block overflow-hidden rounded-lg transition hover:opacity-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={xserverAd.src} alt={xserverAd.alt} width={728} height={90}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </a>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={onamaeAd.pixel} width={1} height={1} alt="" aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={xserverAd.pixel} width={1} height={1} alt="" aria-hidden="true"
        style={{ position: "absolute", left: "-9998px", width: 1, height: 1 }} />
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
            お名前.com 公式サイト（
            <a
              href="https://www.onamae.com/"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="text-slate-700 underline underline-offset-2 hover:text-slate-950"
            >
              www.onamae.com
            </a>
            ）
          </li>
          <li>
            XServerドメイン 公式サイト（
            <a
              href="https://www.xserver.ne.jp/domain/"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="text-slate-700 underline underline-offset-2 hover:text-slate-950"
            >
              www.xserver.ne.jp/domain/
            </a>
            ）
          </li>
          <li>
            ※
            本記事の料金・サービス仕様は記事執筆時点の情報です。最新条件は各公式サイトでご確認ください。
          </li>
          <li>
            ※
            本ページには広告リンク（A8.net アフィリエイト）が含まれます。
          </li>
        </ul>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    {
      href: "/learn/network/onamae-domain-guide",
      title: "お名前.com ドメイン取得ガイド",
      desc: "料金・手順・注意点・Whois代行の設定方法を詳しく解説",
    },
    {
      href: "/learn/network/xserver-domain-guide",
      title: "XServerドメイン 取得ガイド",
      desc: "TLDの選び方・取得手順・Vercelとの連携設定を解説",
    },
    {
      href: "/learn/network/xserver-vs-conoha-wing",
      title: "エックスサーバー vs ConoHa WING 比較",
      desc: "レンタルサーバー選びの判断基準を比較で解説",
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
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm no-underline transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-md"
            >
              <div className="text-sm font-black text-slate-950 group-hover:text-slate-700">
                {l.title}
              </div>
              <div className="mt-1 text-xs leading-5 text-slate-500">{l.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ページ
// ─────────────────────────────────────────────

export default function Page() {
  return (
    <main>
      <Hero />
      <TldrSection />
      <ComparisonSection />
      <BannerCtaBand ad={banner468x60} theme="orange" />
      <PricingSection />
      <BannerCtaBand ad={xserverBanner468x60} theme="emerald" />
      <UseCaseSection />
      <ServiceCardSection onamaeAd={banner300x250b} xserverAd={xserverBanner300x250} />
      <FaqSection />
      <FinalDecision />
      <BannerStripSection onamaeAd={banner728x90} xserverAd={xserverBanner728x90} />
      <References />
      <RelatedLinks />

      {/* インプレッションピクセル（両社） */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ONAMAE_PIXEL}
        width={1}
        height={1}
        alt=""
        aria-hidden="true"
        style={{ position: "fixed", left: "-9999px", width: 1, height: 1 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={XSERVER_PIXEL}
        width={1}
        height={1}
        alt=""
        aria-hidden="true"
        style={{ position: "fixed", left: "-9999px", width: 1, height: 1 }}
      />
    </main>
  );
}
