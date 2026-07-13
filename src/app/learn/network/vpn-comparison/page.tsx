import Link from "next/link";
import { getArticle } from "@/lib/articles";

/* =======================================================================
   VPNおすすめ比較（PR記事・比較型 / フルカスタム）— 当サイト取り扱い4社の総合pillar
   ・A8承認済みの4社を「目的別にどれを選ぶか」軸で比較する内部リンクハブ:
     - NordVPN     … 総合力の大手・10台・Threat Protection/Double VPN・30日返金
     - ExpressVPN  … 速度/ハード安全性・全RAM TrustedServer・最大14台・30日返金
     - Proton VPN  … 透明性(毎年監査/OSS)・データ無制限の無料プラン・スイス
     - Glocal VPN  … 日本の動画視聴特化・日本語完結・779円〜・7日無料・1台
   ・事実はすべて裏取り済みの各単体レビュー（nordvpn-review / expressvpn-review /
     proton-vpn-review / glocal-vpn-review, 2026-07確認）の記載に合わせる。
     レビューで検証していないこと（Nord/Expressの運営拠点・具体料金、Protonの
     日本サーバー有無など）はこの記事でも書かない。
   ・Nord/Express の料金は変動するため金額を断定せず公式確認へ寄せる。
     Proton(公式API定価)/Glocal(公式LP)のみ具体額を記載。
   ・「必ず視聴できる」等の断定はしない。景表法/ステマ規制・ASP規約対策の注意書きを明記。
   ・Server Component のまま（onClick 等は使わない）。metadata は layout.tsx に委譲。
   ======================================================================= */

const article = getArticle("network", "vpn-comparison")!;

// ---- A8 アフィリエイト素材 -------------------------------------------------
const NORD_URL = "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+674EQ";
const EXPRESS_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+A4YQLU+5JSS+5YJRM";
const PROTON_URL = "https://px.a8.net/svt/ejp?a8mat=4B7VL7+8DUSHE+5V4A+5YZ75";
const GLOCAL_URL = "https://px.a8.net/svt/ejp?a8mat=4B60CF+APTO2+50C8+5Z6WX";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
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

const protonBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B7VL7+8DUSHE+5V4A+5YZ75",
  src: "https://www24.a8.net/svt/bgt?aid=260708011507&wid=001&eno=01&mid=s00000027361001003000&mc=1",
  pixel: "https://www10.a8.net/0.gif?a8mat=4B7VL7+8DUSHE+5V4A+5YZ75",
  width: 300,
  height: 250,
  alt: "Proton VPN 公式",
};

const glocalBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B60CF+APTO2+50C8+5ZMCH",
  src: "https://www28.a8.net/svt/bgt?aid=260620863018&wid=001&eno=01&mid=s00000023372001006000&mc=1",
  pixel: "https://www10.a8.net/0.gif?a8mat=4B60CF+APTO2+50C8+5ZMCH",
  width: 300,
  height: 250,
  alt: "Glocal VPN 公式",
};

// ---- コンテンツデータ ------------------------------------------------------

const tldr = [
  {
    no: "01",
    title: "迷ったら総合力の NordVPN",
    body: "110カ国以上のサーバー網と10台同時接続に加え、広告・脅威ブロック（Threat Protection）やDouble VPNなど機能が最も幅広い。日本語対応もあり、家族や複数端末までこれ1本でまとまる。30日返金保証。",
  },
  {
    no: "02",
    title: "速度と安全性の質なら ExpressVPN",
    body: "全サーバーがRAMのみで動くTrustedServer、Rust製の高速プロトコルLightway、耐量子暗号ML-KEMの既定採用と「質」への投資が際立つ。プランにより最大14台。30日返金保証。",
  },
  {
    no: "03",
    title: "無料で始める・透明性重視なら Proton VPN",
    body: "データ無制限の無料プランを持つ数少ないVPN。ノーログは毎年の外部監査（5年連続）で検証され、アプリは100%オープンソース。有料プランも月あたり624円〜（24ヶ月一括）と手頃。",
  },
  {
    no: "04",
    title: "日本の動画視聴だけなら Glocal VPN",
    body: "海外から日本のVODを観ることに特化した日本製VPN。申し込みからサポートまで日本語で、月779円〜・7日間の無料お試しつき。ただし同時接続は1台で、総合的なセキュリティ用途には不向き。",
  },
];

type Cmp = {
  label: string;
  nord: string;
  express: string;
  proton: string;
  glocal: string;
  highlight?: "nord" | "express" | "proton" | "glocal";
};

const comparisonRows: Cmp[] = [
  { label: "主な位置づけ", nord: "総合力の大手", express: "速度・安全性の質を重視する大手", proton: "透明性・無料プランのプライバシー特化", glocal: "日本の動画視聴に特化" },
  { label: "月額の目安", nord: "長期プランで割安（変動・公式で確認）", express: "長期プランで割安（変動・公式で確認）", proton: "624円〜（24ヶ月一括14,976円）", glocal: "779円〜（12ヶ月一括）" },
  { label: "無料で試す", nord: "30日間 返金保証", express: "30日間 返金保証", proton: "無料プランあり（データ無制限）＋有料は30日返金", glocal: "7日間 無料お試し", highlight: "proton" },
  { label: "同時接続", nord: "10台", express: "10〜14台（プラン別）", proton: "10台（無料プランは1台）", glocal: "1台", highlight: "express" },
  { label: "サーバー網", nord: "110カ国以上・日本あり", express: "105カ国以上・日本あり", proton: "148か国・2万台以上", glocal: "日本向け中心" },
  { label: "ノーログの裏付け", nord: "独立監査を複数回", express: "KPMGが2025年に検証・全RAMサーバー", proton: "毎年外部監査（5年連続）＋アプリはオープンソース", glocal: "記載なし（動画用途向け）", highlight: "proton" },
  { label: "特徴的な機能", nord: "Threat Protection・Double VPN・Meshnet", express: "TrustedServer・Lightway・ML-KEM", proton: "Secure Core・NetShield・Stealth", glocal: "ボタン1つで日本IPに接続" },
  { label: "日本語対応", nord: "対応あり", express: "対応あり", proton: "サイトは日本語・サポートは英語中心", glocal: "すべて日本語（国内運営）", highlight: "glocal" },
  { label: "日本の動画視聴", nord: "日本サーバー経由で利用（各サービス次第）", express: "日本サーバー経由で利用（各サービス次第）", proton: "有料プランで対応（各サービス次第）", glocal: "公式が幅広い対応を明記", highlight: "glocal" },
  { label: "返金・お試し", nord: "30日返金保証", express: "30日返金保証", proton: "無料プラン＋30日返金保証", glocal: "7日無料（途中解約は返金なし）" },
];

const scenarios = [
  {
    icon: "🛡️",
    pick: "NordVPN",
    href: NORD_URL,
    title: "1本で全部まとめたい・複数端末で使いたい",
    body: "公共Wi-Fi対策・広告/脅威ブロック・動画視聴まで、家族や複数端末ぶんを1契約でカバーしたい人に。機能の幅と使いやすさのバランスが良く、迷ったらまずこれを試す価値があります。",
    accent: "text-emerald-700",
    ring: "ring-emerald-200",
    bg: "bg-emerald-50",
    btn: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    icon: "⚡",
    pick: "ExpressVPN",
    href: EXPRESS_URL,
    title: "速度と安全性の「質」に投資したい",
    body: "全サーバーRAM駆動（TrustedServer）や耐量子暗号ML-KEMなど、仕組みレベルの安全性を最優先したい人に。通信品質重視で、30日返金保証で他社と比較して選べます。",
    accent: "text-sky-700",
    ring: "ring-sky-200",
    bg: "bg-sky-50",
    btn: "bg-sky-600 hover:bg-sky-700",
  },
  {
    icon: "🔍",
    pick: "Proton VPN",
    href: PROTON_URL,
    title: "まず無料で試したい・透明性を検証したい",
    body: "お金をかけずに身元の確かなVPNを使い始めたい人、監査レポートやソースコードといった「検証できる裏付け」を重視するエンジニアに。無料→必要になったら有料へ段階的に移行できます。",
    accent: "text-violet-700",
    ring: "ring-violet-200",
    bg: "bg-violet-50",
    btn: "bg-violet-600 hover:bg-violet-700",
  },
  {
    icon: "🎬",
    pick: "Glocal VPN",
    href: GLOCAL_URL,
    title: "海外から日本の動画を手軽に観たい",
    body: "「観たいのは日本の動画だけ」「難しい設定は避けたい」「日本語でサポートしてほしい」という人に。1台で十分なら、月779円〜・7日間の無料お試しで最も手軽に始められます。",
    accent: "text-indigo-700",
    ring: "ring-indigo-200",
    bg: "bg-indigo-50",
    btn: "bg-indigo-600 hover:bg-indigo-700",
  },
];

const faqs = [
  {
    q: "結局、どのVPNが一番おすすめですか？",
    a: "目的次第です。機能の幅と複数端末対応で総合的に選ぶならNordVPN、全サーバーRAM駆動や耐量子暗号など安全性の質を最優先するならExpressVPN、まず無料で始めたい・監査やオープンソースの透明性を重視するならProton VPN、海外から日本の動画を観ることだけが目的ならGlocal VPNが向きます。4社とも無料お試し・無料プラン・返金保証のいずれかがあるので、実際に試して選ぶのが確実です。",
  },
  {
    q: "無料で使えるVPNはありますか？",
    a: "この4社では、Proton VPNだけがデータ通信量無制限の無料プランを常設しています（1台のみ・速度は中程度・接続先の国は自動割り当て）。NordVPNとExpressVPNに無料プランはありませんが30日間の返金保証があり、Glocal VPNは7日間の無料お試しがあります。",
  },
  {
    q: "「無料VPNは危険」と聞きましたが大丈夫ですか？",
    a: "運営元が不明な無料VPNには、通信内容の収集や広告への転用といったリスクが指摘されており、避けるのが無難です。一方Proton VPNの無料プランは、スイスのProton AGが運営し、ノーログポリシーが毎年外部監査で検証され、アプリがオープンソースという「身元と裏付けのある無料」です。無料VPNを使うなら、この違いを確認して選んでください。",
  },
  {
    q: "海外から日本の動画を観たい場合はどれがいいですか？",
    a: "日本の動画視聴が主目的なら、対応VODを公式に明記している動画特化のGlocal VPNが最も手軽です。複数端末やセキュリティ用途も兼ねるなら、日本サーバーを持つNordVPN・ExpressVPNも選択肢になります。ただし視聴可否は各配信サービスの仕様変更に左右されるため、無料お試しや返金保証の期間内に自分の環境で確認するのが確実です。",
  },
  {
    q: "料金やキャンペーンで注意することはありますか？",
    a: "VPNの料金は「長期プランの一括払い」で月あたりの単価が下がる仕組みが一般的で、キャンペーンにより頻繁に変動します。特にNordVPN・ExpressVPNは初回割引と更新価格が異なることがあるため、申し込み前に必ず公式サイトで初回価格・契約期間・更新価格の3点を確認してください。本記事の金額は確認時点の目安です。",
  },
];

const related = [
  { href: "/learn/network/nordvpn-review", title: "NordVPN レビュー — 世界最大級の総合VPN", eyebrow: "Review" },
  { href: "/learn/network/expressvpn-review", title: "ExpressVPN レビュー — 安全性で選ぶVPN", eyebrow: "Review" },
  { href: "/learn/network/proton-vpn-review", title: "Proton VPN レビュー — 無料プランと透明性", eyebrow: "Review" },
  { href: "/learn/network/glocal-vpn-review", title: "Glocal VPN レビュー — 海外から日本の動画を観る", eyebrow: "Review" },
  { href: "/learn/network/nordvpn-vs-expressvpn", title: "NordVPN vs ExpressVPN 比較", eyebrow: "Compare" },
  { href: "/learn/network/overseas-japan-streaming-vpn", title: "海外から日本の動画を観るVPN比較", eyebrow: "Compare" },
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
  className = "bg-emerald-600 hover:bg-emerald-700",
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ecfdf5_0%,#f8fafc_72%,#ffffff_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=network" className="hover:text-slate-950">Network</Link>
          <span>/</span>
          <span>VPNおすすめ比較</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">PR / 広告を含みます</span>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">{article.date} 確認</span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">価格は公式確認</span>
        </div>

        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          VPNおすすめ比較
          <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent text-2xl sm:text-3xl">
            NordVPN・ExpressVPN・Proton VPN・Glocal VPN、あなたに合うのは？
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          VPNは「どれが一番」ではなく<strong className="font-bold text-slate-900">目的で選ぶ</strong>のが失敗しないコツです。本記事では、当サイトで個別にレビューした
          <strong className="font-bold text-slate-900">総合力のNordVPN</strong>・
          <strong className="font-bold text-slate-900">安全性の質のExpressVPN</strong>・
          <strong className="font-bold text-slate-900">無料と透明性のProton VPN</strong>・
          <strong className="font-bold text-slate-900">日本の動画特化のGlocal VPN</strong>
          の4社を、料金・同時接続・ノーログの裏付け・試しやすさで比較します。
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "総合力重視", pick: "NordVPN", note: "10台・機能豊富・30日返金", href: NORD_URL, btn: "bg-emerald-600 hover:bg-emerald-700" },
            { label: "速度・安全重視", pick: "ExpressVPN", note: "全RAM・最大14台・30日返金", href: EXPRESS_URL, btn: "bg-sky-600 hover:bg-sky-700" },
            { label: "無料で始める", pick: "Proton VPN", note: "無料プラン・毎年監査・OSS", href: PROTON_URL, btn: "bg-violet-600 hover:bg-violet-700" },
            { label: "日本の動画特化", pick: "Glocal VPN", note: "日本語・779円〜・7日無料", href: GLOCAL_URL, btn: "bg-indigo-600 hover:bg-indigo-700" },
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">3 sec summary</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">3秒でわかる結論</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {tldr.map((item) => (
            <article key={item.no} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
              <div className="absolute right-5 top-5 text-5xl font-black text-emerald-100">{item.no}</div>
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">Comparison</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">主要4社を一覧で比較</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            料金は変動するため目安です。申し込み前に各公式サイトで最新の料金・対応状況をご確認ください。
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[880px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className={`${headCell} text-slate-500`}>比較項目</th>
                <th className={`${headCell} text-emerald-700`}>NordVPN</th>
                <th className={`${headCell} text-sky-700`}>ExpressVPN</th>
                <th className={`${headCell} text-violet-700`}>Proton VPN</th>
                <th className={`${headCell} text-indigo-700`}>Glocal VPN</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 1 ? "bg-slate-50/60" : "bg-white"}>
                  <th scope="row" className="px-3 py-3 text-left align-top text-xs font-bold text-slate-500">{row.label}</th>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "nord" ? "font-black text-emerald-700" : "text-slate-700"}`}>{row.nord}</td>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "express" ? "font-black text-sky-700" : "text-slate-700"}`}>{row.express}</td>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "proton" ? "font-black text-violet-700" : "text-slate-700"}`}>{row.proton}</td>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "glocal" ? "font-black text-indigo-700" : "text-slate-700"}`}>{row.glocal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs leading-6 text-slate-500">
          太字＝その項目で特に強いサービス。同時接続やプラン内容は時期により変わります。
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">Which one?</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">用途別・あなたに合う1本</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">Each service</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">それぞれの特徴</h2>
        </div>
        <div className="space-y-5">
          <BrandCard
            eyebrow="総合力の大手"
            name="NordVPN"
            lead="世界最大級の総合VPN。110カ国以上のサーバー網と10台同時接続に加え、広告・脅威ブロックやDouble VPNなど機能の幅が最も広く、日本語対応もあります。1本で幅広くカバーしたい人の定番です。"
            points={["10台同時接続・ノーログは独立監査を複数回", "WireGuardベースのNordLynxで高速・安定", "Threat Protection・Double VPN・Meshnetなど機能が豊富", "30日間の返金保証で実質無料で試せる"]}
            href={NORD_URL}
            reviewHref="/learn/network/nordvpn-review"
            banner={nordBanner}
            btn="bg-emerald-600 hover:bg-emerald-700"
            ring="ring-emerald-100"
          />
          <BrandCard
            eyebrow="速度・ハード安全性重視"
            name="ExpressVPN"
            lead="全サーバーがRAMのみで動くTrustedServerと、Rust製の高速プロトコルLightwayが特徴。耐量子暗号ML-KEMを既定採用するなど、仕組みレベルの安全性に投資したい人の選択肢です。"
            points={["全サーバーRAM駆動・KPMGが2025年にノーログを検証", "Lightwayは独立監査済み（Cure53・Praetorian）", "プランにより最大14台まで同時接続", "30日間の返金保証つき"]}
            href={EXPRESS_URL}
            reviewHref="/learn/network/expressvpn-review"
            banner={expressBanner}
            btn="bg-sky-600 hover:bg-sky-700"
            ring="ring-sky-100"
          />
          <BrandCard
            eyebrow="透明性・無料プラン"
            name="Proton VPN"
            lead="Proton Mailと同じスイスのProton AGが運営するプライバシー特化VPN。データ無制限の無料プランを常設し、ノーログは毎年の外部監査（5年連続）で検証、アプリは100%オープンソースです。"
            points={["データ通信量無制限の無料プランあり（1台・国は自動割り当て）", "ノーログを毎年外部監査・レポート公開＋オープンソース", "Secure Core多段接続・NetShield広告ブロック（有料）", "有料プランは月あたり624円〜（24ヶ月一括）・30日返金保証"]}
            href={PROTON_URL}
            reviewHref="/learn/network/proton-vpn-review"
            banner={protonBanner}
            btn="bg-violet-600 hover:bg-violet-700"
            ring="ring-violet-100"
          />
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
        </div>
      </div>
    </section>
  );
}

function HowToChooseSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">How to choose</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">失敗しないVPNの選び方 3つの基準</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              no: "1",
              title: "「試してから決められるか」を確認する",
              body: "VPNの体感速度は回線・時間帯・接続先で大きく変わるため、スペック表だけでは決められません。無料プラン（Proton）・無料お試し（Glocal 7日）・返金保証（NordVPN/ExpressVPN 30日）を使い、自分の回線で試してから継続を判断しましょう。",
            },
            {
              no: "2",
              title: "同時接続台数を先に数える",
              body: "スマホ・PC・タブレット、家族の端末まで守るなら台数が効いてきます。Glocal VPNは1台のみ、NordVPNは10台、Proton VPN有料は10台、ExpressVPNはプランにより最大14台。使う端末を先に数えると選択肢が絞れます。",
            },
            {
              no: "3",
              title: "「ノーログ」の裏付けを見る",
              body: "ノーログは各社が自称できてしまうため、第三者による検証があるかが重要です。NordVPNは独立監査を複数回、ExpressVPNはKPMGの検証＋全RAMサーバー、Proton VPNは毎年の外部監査＋オープンソースと、裏付けの形が異なります。VPNの仕組みそのものは別記事で解説しています。",
            },
          ].map((s) => (
            <div key={s.no} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">{s.no}</span>
              <div>
                <h3 className="text-base font-black text-slate-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-600">
          VPNの技術的な仕組み（トンネリング・WireGuard・ノーログの意味）は
          <Link href="/learn/network/vpn-basics" className="font-bold text-emerald-700 underline-offset-2 hover:underline">VPNの仕組み</Link>
          で詳しく解説しています。
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">よくある質問</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-emerald-300 open:shadow-md" open={idx === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700">Q</span>
                  {f.q}
                </span>
                <span aria-hidden="true" className="text-emerald-700 transition group-open:rotate-45">+</span>
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
            ["NordVPN 公式サイト", "https://nordvpn.com/"],
            ["ExpressVPN 公式サイト", "https://www.expressvpn.com/"],
            ["Proton VPN 公式サイト", "https://protonvpn.com/ja"],
            ["Glocal VPN 公式（動画視聴VPN）", "https://glocalnet.jp/lp/vpn_movie/"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline-offset-2 hover:underline">{label}</a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          本ページはアフィリエイト広告（PR）を含みます。記載の価格・仕様・対応状況は {article.date} 時点の情報で、当サイトの各単体レビューで公式情報を確認のうえ掲載しています。動画の視聴可否は各配信サービスの仕様や利用規約に依存し、視聴を保証するものではありません。申し込み前に各公式サイトで最新の内容をご確認ください。
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
            <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">{item.eyebrow}</div>
              <div className="mt-2 text-sm font-black text-slate-950 group-hover:text-emerald-700">{item.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VpnComparisonPage() {
  return (
    <main>
      <Hero />
      <TldrSection />
      <ComparisonSection />
      <ScenarioSection />
      <BrandsSection />
      <HowToChooseSection />
      <FaqSection />
      <References />
      <RelatedLinks />
    </main>
  );
}
