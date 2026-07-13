import Link from "next/link";
import { getArticle } from "@/lib/articles";

/* =======================================================================
   海外から日本の動画を観るVPN比較（PR記事・比較型 / フルカスタム）
   ・目的軸=「海外から日本のVOD（TVer・Netflix日本ほか）を観る」で3社を比較。
     - Glocal VPN … 動画視聴特化・日本製・日本語・ボタン1つ・7日無料（同時接続1台）
     - NordVPN     … 総合大手・10台・30日返金・日本サーバーあり
     - ExpressVPN  … 速度/ハード安全性・全RAMサーバー・30日返金
   ・事実は各公式および裏取り済みの既存記事（glocal-vpn-review / nordvpn-review /
     expressvpn-review, 2026-07確認）から。料金は変動するため断定せず公式確認へ寄せる。
   ・「必ず視聴できる」等の断定はしない（各VODの利用規約・仕様変更に依存）。景表法/
     ステマ規制・ASP規約対策として注意書きを明記。
   ・Server Component のまま（onClick 等は使わない）。metadata は layout.tsx に委譲。
   ======================================================================= */

const article = getArticle("network", "overseas-japan-streaming-vpn")!;

// ---- A8 アフィリエイト素材 -------------------------------------------------
const GLOCAL_URL = "https://px.a8.net/svt/ejp?a8mat=4B60CF+APTO2+50C8+5Z6WX";
const NORD_URL = "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+674EQ";
const EXPRESS_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+A4YQLU+5JSS+5YJRM";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const glocalBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B60CF+APTO2+50C8+5ZMCH",
  src: "https://www28.a8.net/svt/bgt?aid=260620863018&wid=001&eno=01&mid=s00000023372001006000&mc=1",
  pixel: "https://www10.a8.net/0.gif?a8mat=4B60CF+APTO2+50C8+5ZMCH",
  width: 300,
  height: 250,
  alt: "Glocal VPN 公式",
};

const nordBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+5ZMCH",
  src: "https://www22.a8.net/svt/bgt?aid=260602711425&wid=001&eno=01&mid=s00000018459001006000&mc=1",
  pixel: "https://www10.a8.net/0.gif?a8mat=4B5MC7+7118VM+3YFI+5ZMCH",
  width: 300,
  height: 250,
  alt: "NordVPN 公式キャンペーン",
};

const expressBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+A4YQLU+5JSS+5YZ75",
  src: "https://www27.a8.net/svt/bgt?aid=260508487613&wid=001&eno=01&mid=s00000025894001003000&mc=1",
  pixel: "https://www13.a8.net/0.gif?a8mat=4B3LMV+A4YQLU+5JSS+5YZ75",
  width: 300,
  height: 250,
  alt: "ExpressVPN 公式キャンペーン",
};

// ---- コンテンツデータ ------------------------------------------------------

const tldr = [
  {
    no: "01",
    title: "手軽に日本の動画だけ観たいなら Glocal VPN",
    body: "海外から日本のVOD視聴に特化した日本製VPN。申し込み・アプリ・サポートまで日本語で、ボタン1つで接続。月779円〜・7日間の無料お試しつき。ただし同時接続は1台。",
  },
  {
    no: "02",
    title: "動画＋セキュリティ・複数端末なら NordVPN",
    body: "日本を含む多数のサーバーを持つ総合大手。10台同時接続、広告・脅威ブロックなど機能も豊富。動画視聴に加えて公共Wi-Fi対策まで1本でまとめたい人向け。30日返金保証。",
  },
  {
    no: "03",
    title: "速度・ハード信頼性を重視するなら ExpressVPN",
    body: "全サーバーがRAMのみで動くTrustedServerと高速プロトコルLightwayが強み。通信品質とセキュリティを最優先にしたい人の選択肢。30日返金保証で試せる。",
  },
];

type Cmp = { label: string; glocal: string; nord: string; express: string; highlight?: "glocal" | "nord" | "express" };

const comparisonRows: Cmp[] = [
  { label: "主な位置づけ", glocal: "日本の動画視聴に特化", nord: "総合力No.1の大手", express: "速度・安全性重視の大手" },
  { label: "日本の動画配信", glocal: "公式が幅広い対応を明記", nord: "日本サーバー経由で利用（各サービス次第）", express: "日本サーバー経由で利用（各サービス次第）", highlight: "glocal" },
  { label: "月額（最安）", glocal: "779円〜（12ヶ月）", nord: "長期プランで割安（公式で確認）", express: "長期プランで割安（公式で確認）" },
  { label: "無料で試す", glocal: "7日間 無料お試し", nord: "30日間 返金保証", express: "30日間 返金保証" },
  { label: "同時接続", glocal: "1台", nord: "10台", express: "10台〜（プランによる）", highlight: "nord" },
  { label: "対応OS", glocal: "Win / Mac / iOS / Android / Chromebook", nord: "主要OS ほか多数", express: "主要OS ほか多数" },
  { label: "サポート", glocal: "すべて日本語（国内運営）", nord: "日本語対応あり", express: "日本語対応あり", highlight: "glocal" },
  { label: "設定の手軽さ", glocal: "◎ ボタン1つ", nord: "○ 多機能", express: "○ シンプル" },
  { label: "総合セキュリティ機能", glocal: "△ 動画視聴に特化", nord: "◎ 豊富（脅威保護・Double VPN 等）", express: "◎ 豊富（Network Lock 等）" },
  { label: "返金／お試し", glocal: "7日無料（途中解約は返金なし）", nord: "30日返金保証", express: "30日返金保証" },
];

const scenarios = [
  {
    icon: "🎬",
    pick: "Glocal VPN",
    href: GLOCAL_URL,
    title: "日本のドラマ・アニメ・TVerを手軽に観たい",
    body: "「観たいのは日本の動画だけ」「難しい設定は避けたい」「日本語でサポートしてほしい」という人に。1台で十分なら、月779円〜で最も手軽な選択肢です。",
    accent: "text-indigo-700",
    ring: "ring-indigo-200",
    bg: "bg-indigo-50",
    btn: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    icon: "🛡️",
    pick: "NordVPN",
    href: NORD_URL,
    title: "動画も観たいし、通信の安全もまとめたい",
    body: "スマホ・PC・タブレットなど複数端末を同時に使いたい、公共Wi-Fi対策や広告ブロックもまとめたい人に。10台同時接続と豊富な機能でバランスが良い1本です。",
    accent: "text-emerald-700",
    ring: "ring-emerald-200",
    bg: "bg-emerald-50",
    btn: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    icon: "⚡",
    pick: "ExpressVPN",
    href: EXPRESS_URL,
    title: "速度と安全性をとにかく重視したい",
    body: "高速な接続とハードウェアの信頼性（全RAMサーバー）を最優先したい人に。動画も含めて品質重視で選ぶなら、30日返金保証で試して比較する価値があります。",
    accent: "text-sky-700",
    ring: "ring-sky-200",
    bg: "bg-sky-50",
    btn: "bg-sky-600 hover:bg-sky-700",
  },
];

const faqs = [
  {
    q: "海外から日本のNetflixやTVerは、VPNを使えば必ず観られますか？",
    a: "「必ず」とは言えません。VPNは日本のIPアドレス経由で接続する手段を提供しますが、各動画配信サービスの仕様変更や検知により、一時的に視聴できない場合があります。Glocal VPNは7日間の無料お試し、NordVPN・ExpressVPNは30日間の返金保証があるので、契約前・返金期間内に「自分の環境で観られるか」を必ず確認してください。",
  },
  {
    q: "3社のうち、結局どれが一番おすすめですか？",
    a: "目的次第です。観たいのが日本の動画だけで、手軽さと日本語サポートを重視するならGlocal VPN。動画に加えて複数端末での利用やセキュリティ機能もまとめたいならNordVPN。速度とハードウェアの信頼性を最優先にしたいならExpressVPNが向きます。まずは無料お試し・返金保証を使って実際に試すのが確実です。",
  },
  {
    q: "同時接続の台数は何が違うのですか？",
    a: "1契約で同時にVPN接続できる端末の数です。Glocal VPNは1台のみで、スマホとPCを同時に、あるいは家族それぞれの端末で同時に使うことはできません。NordVPNは10台、ExpressVPNもプランにより10台以上に対応するため、複数端末で使いたい場合はこの2社が向いています。",
  },
  {
    q: "料金はどこで確認すればいいですか？",
    a: "本記事の料金は確認時点の目安です。特にNordVPN・ExpressVPNは長期プランやキャンペーンで価格が変動し、初回価格と更新価格が異なります。申し込み前に必ず各公式サイトで最新の料金・契約期間・更新価格を確認してください。",
  },
  {
    q: "VPNで地域制限を回避するのは問題ありませんか？",
    a: "動画配信サービスの利用規約では、地域を偽っての視聴を制限している場合があります。ご利用のサービスの利用規約と、契約中のプランの視聴可能地域を確認したうえで、自己責任でご利用ください。本記事は特定の視聴方法を推奨・保証するものではありません。",
  },
];

const related = [
  { href: "/learn/network/glocal-vpn-review", title: "Glocal VPN レビュー — 海外から日本の動画を観る", eyebrow: "Review" },
  { href: "/learn/network/nordvpn-review", title: "NordVPN レビュー — 世界最大級の総合VPN", eyebrow: "Review" },
  { href: "/learn/network/expressvpn-review", title: "ExpressVPN レビュー — 安全性で選ぶVPN", eyebrow: "Review" },
  { href: "/learn/network/nordvpn-vs-expressvpn", title: "NordVPN vs ExpressVPN 比較", eyebrow: "Compare" },
  { href: "/learn/network/vpn-comparison", title: "VPNおすすめ比較 — 主要4社どれを選ぶ？", eyebrow: "Compare" },
  { href: "/learn/network/vpn-basics", title: "VPNの仕組み — IPsec・WireGuard・プライバシー", eyebrow: "Network" },
];

// ---- 共通パーツ ------------------------------------------------------------

function BannerImage({ ad }: { ad: BannerAd }) {
  return (
    <div className="relative rounded-xl border border-slate-200 bg-slate-100 p-2">
      <a href={ad.href} rel="nofollow sponsored noopener noreferrer" target="_blank" className="block transition hover:opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ad.src} alt={ad.alt} width={ad.width} height={ad.height} style={{ objectFit: "contain" }} className="h-auto max-w-full rounded-md" />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ad.pixel} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
    </div>
  );
}

function CtaButton({
  href,
  children,
  className = "bg-indigo-600 hover:bg-indigo-700",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-black text-white no-underline shadow-lg transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

// ---- セクション ------------------------------------------------------------

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef2ff_0%,#f8fafc_72%,#ffffff_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=network" className="hover:text-slate-950">Network</Link>
          <span>/</span>
          <span>海外から日本の動画を観るVPN比較</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">PR / 広告を含みます</span>
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-200">{article.date} 確認</span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">価格は公式確認</span>
        </div>

        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          海外から日本の動画を観るVPN比較
          <span className="mt-2 block bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent text-2xl sm:text-3xl">
            Glocal VPN・NordVPN・ExpressVPN、あなたに合うのは？
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          海外赴任・留学・旅行中に「この動画はお住まいの地域では再生できません」と弾かれた——。これは日本の動画配信サービスの
          <strong className="font-bold text-slate-900">地域制限</strong>が原因です。VPNで日本のIPアドレス経由で接続すれば解決できることが多く、本記事では
          <strong className="font-bold text-slate-900">動画視聴特化のGlocal VPN</strong>と、
          総合大手の<strong className="font-bold text-slate-900">NordVPN・ExpressVPN</strong>を「日本の動画を観る」目的で比較します。
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: "手軽さ重視", pick: "Glocal VPN", note: "日本製・日本語・7日無料", href: GLOCAL_URL, btn: "bg-indigo-600 hover:bg-indigo-700" },
            { label: "総合力重視", pick: "NordVPN", note: "10台・機能豊富・30日返金", href: NORD_URL, btn: "bg-emerald-600 hover:bg-emerald-700" },
            { label: "速度・安全重視", pick: "ExpressVPN", note: "全RAM・高速・30日返金", href: EXPRESS_URL, btn: "bg-sky-600 hover:bg-sky-700" },
          ].map((c) => (
            <div key={c.pick} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-wide text-slate-500">{c.label}</span>
              <span className="mt-1 text-lg font-black text-slate-950">{c.pick}</span>
              <span className="mt-0.5 text-xs text-slate-500">{c.note}</span>
              <div className="mt-3">
                <CtaButton href={c.href} className={c.btn}>公式を見る</CtaButton>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          ※ 本ページのリンクには広告（A8.net）を含みます。価格・機能・対応状況は記事確認時点の情報です。最新条件は各公式サイトでご確認ください。
        </p>
      </div>
    </section>
  );
}

function TldrSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700">3 sec summary</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">3秒でわかる結論</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {tldr.map((item) => (
            <article key={item.no} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
              <div className="absolute right-5 top-5 text-5xl font-black text-indigo-100">{item.no}</div>
              <h3 className="relative text-base font-black text-slate-950">{item.title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const headCell = "px-3 py-3 text-left text-xs font-black";
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700">Comparison</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">3社を「日本の動画を観る」目的で比較</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            料金は変動するため目安です。申し込み前に各公式サイトで最新の料金・対応状況をご確認ください。
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className={`${headCell} text-slate-500`}>比較項目</th>
                <th className={`${headCell} text-indigo-700`}>Glocal VPN</th>
                <th className={`${headCell} text-emerald-700`}>NordVPN</th>
                <th className={`${headCell} text-sky-700`}>ExpressVPN</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 1 ? "bg-slate-50/60" : "bg-white"}>
                  <th scope="row" className="px-3 py-3 text-left align-top text-xs font-bold text-slate-500">{row.label}</th>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "glocal" ? "font-black text-indigo-700" : "text-slate-700"}`}>{row.glocal}</td>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "nord" ? "font-black text-emerald-700" : "text-slate-700"}`}>{row.nord}</td>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "express" ? "font-black text-sky-700" : "text-slate-700"}`}>{row.express}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs leading-6 text-slate-500">
          ◎＝特に強い／○＝対応／△＝限定的。同時接続やプラン内容は時期により変わります。
        </p>
      </div>
    </section>
  );
}

function ScenarioSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700">Which one?</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">用途別・あなたに合う1本</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {scenarios.map((s) => (
            <article key={s.pick} className={`flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ${s.ring}`}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${s.bg}`}>{s.icon}</div>
              <h3 className="mt-4 text-base font-black text-slate-950">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{s.body}</p>
              <p className={`mt-4 text-xs font-black uppercase tracking-wide ${s.accent}`}>おすすめ：{s.pick}</p>
              <div className="mt-3">
                <CtaButton href={s.href} className={s.btn}>{s.pick} 公式サイト</CtaButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandCard({
  eyebrow,
  name,
  lead,
  points,
  href,
  reviewHref,
  banner,
  btn,
  ring,
}: {
  eyebrow: string;
  name: string;
  lead: string;
  points: string[];
  href: string;
  reviewHref: string;
  banner: BannerAd;
  btn: string;
  ring: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ${ring}`}>
      <div className="p-5 sm:p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{eyebrow}</p>
        <h3 className="mt-1 text-xl font-black text-slate-950">{name}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{lead}</p>
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="w-full shrink-0 sm:w-auto"><BannerImage ad={banner} /></div>
          <div className="flex w-full flex-col gap-3">
            <ul className="space-y-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black text-slate-600">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <CtaButton href={href} className={btn}>公式サイトで最新料金を確認</CtaButton>
            <Link href={reviewHref} className="text-center text-xs font-bold text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline">
              → {name} の詳しいレビューを読む
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandsSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700">Each service</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">それぞれの特徴</h2>
        </div>
        <div className="space-y-5">
          <BrandCard
            eyebrow="動画視聴特化・日本製"
            name="Glocal VPN"
            lead="海外から日本のVOD視聴に特化した日本製VPN。申し込みからサポートまで日本語で、アプリのボタン1つで日本のIPに接続できます。「日本の動画を観たいだけ」の人に最も手軽な選択肢です。"
            points={["TVer・ABEMA・Netflix（日本）など幅広い日本のVODに対応", "運営・サポートがすべて日本語で安心", "月779円〜・7日間の無料お試し（同時接続は1台）"]}
            href={GLOCAL_URL}
            reviewHref="/learn/network/glocal-vpn-review"
            banner={glocalBanner}
            btn="bg-indigo-600 hover:bg-indigo-700"
            ring="ring-indigo-100"
          />
          <BrandCard
            eyebrow="総合力No.1の大手"
            name="NordVPN"
            lead="世界最大級の総合VPN。日本を含む多数のサーバーを持ち、10台同時接続や広告・脅威ブロックなど機能も豊富。動画視聴に加えて公共Wi-Fi対策までまとめたい人に向きます。"
            points={["10台同時接続・機能が豊富（Threat Protection・Double VPN 等）", "WireGuardベースのNordLynxで高速・安定", "30日間の返金保証で実質無料で試せる"]}
            href={NORD_URL}
            reviewHref="/learn/network/nordvpn-review"
            banner={nordBanner}
            btn="bg-emerald-600 hover:bg-emerald-700"
            ring="ring-emerald-100"
          />
          <BrandCard
            eyebrow="速度・ハード安全性重視"
            name="ExpressVPN"
            lead="全サーバーがRAMのみで動くTrustedServerと、高速な独自プロトコルLightwayが特徴。通信品質とハードウェアの信頼性を最優先にしたい人の選択肢です。"
            points={["全サーバーRAM駆動でログが物理的に残りにくい設計", "高速・低遅延の独自プロトコルLightway", "30日間の返金保証つき"]}
            href={EXPRESS_URL}
            reviewHref="/learn/network/expressvpn-review"
            banner={expressBanner}
            btn="bg-sky-600 hover:bg-sky-700"
            ring="ring-sky-100"
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700">How it works</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">なぜVPNで日本の動画が観られるの？</h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-700 sm:p-8">
          <p>
            日本の動画配信サービスは、アクセス元の<strong className="font-bold text-slate-900">IPアドレスの国</strong>を見て配信の可否を判断しています。海外から接続すると「海外のIP」と判定され、地域制限で弾かれます。
          </p>
          <p className="mt-4">
            VPNを使うと、通信をいったん<strong className="font-bold text-slate-900">日本国内のサーバー経由</strong>にできるため、配信側からは「日本からのアクセス」に見えます。これが海外から日本の動画を視聴できる基本的な仕組みです。VPNの技術的な詳細は
            <Link href="/learn/network/vpn-basics" className="font-bold text-indigo-700 underline-offset-2 hover:underline">VPNの仕組み</Link>
            で解説しています。
          </p>
          <p className="mt-4 text-xs text-slate-500">
            ※ 各動画配信サービスの利用規約では地域を偽っての視聴を制限している場合があります。利用規約と契約プランの視聴可能地域を確認のうえ、自己責任でご利用ください。
          </p>
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">よくある質問</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-indigo-300 open:shadow-md" open={idx === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-black text-indigo-700">Q</span>
                  {f.q}
                </span>
                <span aria-hidden="true" className="text-indigo-700 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-950">参考にした公式情報・ご利用にあたって</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {[
            ["Glocal VPN 公式（動画視聴VPN）", "https://glocalnet.jp/lp/vpn_movie/"],
            ["NordVPN 公式サイト", "https://nordvpn.com/"],
            ["ExpressVPN 公式サイト", "https://www.expressvpn.com/"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-700 underline-offset-2 hover:underline">{label}</a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          本ページはアフィリエイト広告（PR）を含みます。記載の価格・仕様・対応状況は {article.date} 時点の情報です。動画の視聴可否は各配信サービスの仕様や利用規約に依存し、視聴を保証するものではありません。申し込み前に各公式サイトで最新の内容をご確認ください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-black text-slate-950">関連して読む</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-700">{item.eyebrow}</div>
              <div className="mt-2 text-sm font-black text-slate-950 group-hover:text-indigo-700">{item.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function OverseasJapanStreamingVpnPage() {
  return (
    <main>
      <Hero />
      <TldrSection />
      <ComparisonSection />
      <ScenarioSection />
      <BrandsSection />
      <HowItWorksSection />
      <FaqSection />
      <References />
      <RelatedLinks />
    </main>
  );
}
