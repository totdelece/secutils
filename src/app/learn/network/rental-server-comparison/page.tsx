import Link from "next/link";
import { getArticle } from "@/lib/articles";

/* =======================================================================
   レンタルサーバーおすすめ比較（PR記事・比較型 / フルカスタム）— ホスティング総合pillar
   ・A8承認済みの4サービスを「目的別にどれを選ぶか」軸で比較する内部リンクハブ:
     - エックスサーバー … 国内シェアNo.1(公式標榜)の王道・990円〜(実質693円例)・10日無料お試し
     - ConoHa WING      … LiteSpeed×WEXAL®の高速化・1,451円〜(キャンペーン659円例)・お試しなし
     - シン・レンタルサーバー … 同運営の新世代・1,078円〜(割引862円例)・大容量NVMe・10日無料
     - XServer VPS      … root権限の仮想専用サーバー・990円〜(割引792円例)・テンプレ構築
   ・数値は公開日(2026-07-13)に4社の公式サイトを直接再取得して確認済み:
       - xserver: 990円/実質693円(最大半額CB)・NVMe500-700GB・10日お試し → 従来記載と一致
       - shin: 1,078円/862円(20%OFF直接割引・旧キャッシュバック実質539円は終了) → 割引方式が変化
       - conoha: 通常1,451円(旧1,331円から改定)/キャンペーン659円(54%OFF) → 通常価格が改定
       - vps: 990円/割引792円〜・無料VPSあり → 従来記載と一致
     レビューで検証していないこと（シンの自動バックアップ、
     xserver/ConoHaのサポート窓口の詳細など）は書かない。
   ・「実質◯円」はキャンペーン例（時期により変動）である旨を明記し、公式確認へ寄せる。
     固定のキャンペーン期限は書かない（evergreen方針）。
   ・Server Component のまま（onClick 等は使わない）。metadata は layout.tsx に委譲。
   ======================================================================= */

const article = getArticle("network", "rental-server-comparison")!;

// ---- A8 アフィリエイト素材 -------------------------------------------------
const XSERVER_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+61JSI";
const CONOHA_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SKSCY";
const SHIN_URL = "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+5YZ76";
const VPS_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25EKCY";

// テキストリンクの成果計測ピクセル（各1回だけ読み込む）
const TEXT_PIXELS = [
  "https://www19.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+61JSI",
  "https://www12.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SKSCY",
  "https://www10.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+5YZ76",
  "https://www13.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25EKCY",
];

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const xserverBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+69HA9",
  src: "https://www28.a8.net/svt/bgt?aid=260508487734&wid=001&eno=01&mid=s00000001642001052000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+69HA9",
  width: 300,
  height: 250,
  alt: "エックスサーバー 公式",
};

const conohaBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SQ59D",
  src: "https://www26.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035058000&mc=1",
  pixel: "https://www14.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SQ59D",
  width: 300,
  height: 250,
  alt: "ConoHa WING 公式",
};

const shinBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+609HT",
  src: "https://www25.a8.net/svt/bgt?aid=260619861813&wid=001&eno=01&mid=s00000025450001009000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+609HT",
  width: 300,
  height: 250,
  alt: "シンレンタルサーバー 公式",
};

const vpsBanner: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25GX8H",
  src: "https://www24.a8.net/svt/bgt?aid=260508487735&wid=001&eno=01&mid=s00000001642013012000&mc=1",
  pixel: "https://www18.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25GX8H",
  width: 300,
  height: 250,
  alt: "XServer VPS 公式",
};

// ---- コンテンツデータ ------------------------------------------------------

const tldr = [
  {
    no: "01",
    title: "迷ったら王道のエックスサーバー",
    body: "国内シェアNo.1（公式標榜）の定番レンタルサーバー。月額990円〜（割引時 実質693円〜の例）で、NVMe SSD・自動バックアップ無料・独自ドメイン永年無料がそろう。10日間の無料お試しで確かめてから始められる。",
  },
  {
    no: "02",
    title: "コスパと大容量ならシン・レンタルサーバー",
    body: "エックスサーバーと同じ運営会社の「新世代版」。月額1,078円〜（割引キャンペーンで862円〜の例）とほぼ同価格帯ながら、ベーシックからNVMe SSD 700GBと大容量。こちらも10日間の無料お試しつき。",
  },
  {
    no: "03",
    title: "WordPressの快適さならConoHa WING",
    body: "GMO運営。LiteSpeed×WEXAL®の高速化とかんたんセットアップでWordPressを最短で始めやすい。独自ドメインは全プラン2つ永年無料。ただし無料お試しはない点に注意。",
  },
  {
    no: "04",
    title: "root権限で自由にやるならXServer VPS",
    body: "共有サーバーではなく仮想専用サーバー（VPS）。AMD EPYC×NVMe SSDの性能を月額990円〜で使え、Minecraft・Docker等のテンプレも豊富。ただしサーバー管理は自分で行う前提。",
  },
];

type Cmp = {
  label: string;
  xserver: string;
  shin: string;
  conoha: string;
  vps: string;
  highlight?: "xserver" | "shin" | "conoha" | "vps";
};

const comparisonRows: Cmp[] = [
  { label: "種別・位置づけ", xserver: "共有サーバー／国内シェアNo.1（公式標榜）の王道", shin: "共有サーバー／同じ運営会社の新世代・コスパ型", conoha: "共有サーバー／高速化と始めやすさのGMO", vps: "VPS（仮想専用サーバー）／root権限で自由" },
  { label: "月額（通常）", xserver: "990円〜（スタンダード・36ヶ月時）", shin: "1,078円〜（ベーシック）", conoha: "1,451円〜（ベーシック）", vps: "990円〜（2GB・36ヶ月時）" },
  { label: "割引後の目安※", xserver: "キャッシュバックで実質693円〜の例", shin: "割引キャンペーンで862円〜の例", conoha: "長期契約＋キャンペーンで659円〜の例", vps: "割引時792円〜の例" },
  { label: "初期費用", xserver: "0円", shin: "0円", conoha: "0円", vps: "0円" },
  { label: "無料で試す", xserver: "10日間の無料お試し", shin: "10日間の無料お試し", conoha: "なし", vps: "「無料VPS」（2GB/4GB・2〜4日ごとに更新）", highlight: "xserver" },
  { label: "ストレージ", xserver: "NVMe SSD 500〜700GB", shin: "NVMe SSD 700〜1,200GB", conoha: "SSD 300〜500GB", vps: "NVMe SSD 50〜400GB", highlight: "shin" },
  { label: "独自ドメイン無料", xserver: "永年無料（スタンダード1個／上位2個・条件あり）", shin: "永年無料（.com/.net など）", conoha: "全プラン2つ永年無料", vps: "—", highlight: "conoha" },
  { label: "高速化・性能", xserver: "Xアクセラレータ／HTTP/2", shin: "全プラン NVMe SSD", conoha: "LiteSpeed＋WEXAL®", vps: "AMD EPYC×NVMe SSD" },
  { label: "WordPress", xserver: "簡単インストール・簡単移行", shin: "簡単インストール", conoha: "かんたんセットアップ・簡単移行", vps: "テンプレで構築（管理は自分）" },
  { label: "向いている人", xserver: "定番で安心して始めたい", shin: "料金と容量のコスパ重視", conoha: "WordPressを快適に運営したい", vps: "開発・ゲームサーバー等を自由に構築したい" },
];

const scenarios = [
  {
    icon: "🖊️",
    pick: "エックスサーバー",
    href: XSERVER_URL,
    title: "初めてのWordPressブログ・迷ったらこれ",
    body: "実績と情報量が多い定番を選んでおけば、設定でつまずいても解決策が見つかりやすい。自動バックアップも全プラン無料で、初心者の「やらかし」にも強い構成です。10日間の無料お試しつき。",
    accent: "text-blue-700",
    ring: "ring-blue-200",
    bg: "bg-blue-50",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: "💰",
    pick: "シン・レンタルサーバー",
    href: SHIN_URL,
    title: "同じ運営基盤で、容量のコスパを重視したい",
    body: "エックスサーバーと同じ運営会社ながら、ほぼ同じ価格帯でベーシックからNVMe SSD 700GBと大容量。個人ブログやメディアを容量を気にせず育てたい人に向きます。10日間の無料お試しつき。",
    accent: "text-emerald-700",
    ring: "ring-emerald-200",
    bg: "bg-emerald-50",
    btn: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    icon: "⚡",
    pick: "ConoHa WING",
    href: CONOHA_URL,
    title: "WordPressの表示速度と始めやすさを重視したい",
    body: "LiteSpeed×WEXAL®の高速化で、WordPressサイトを快適に表示。かんたんセットアップで契約と同時にブログを立ち上げられます。独自ドメイン2つ永年無料もお得。無料お試しがない点だけ注意。",
    accent: "text-violet-700",
    ring: "ring-violet-200",
    bg: "bg-violet-50",
    btn: "bg-violet-600 hover:bg-violet-700",
  },
  {
    icon: "🧑‍💻",
    pick: "XServer VPS",
    href: VPS_URL,
    title: "マイクラサーバーや開発環境を自由に作りたい",
    body: "root権限で何でも入れられるVPS。Minecraft・Docker・WordPressなどテンプレートから手軽に構築でき、AI・自動化の実行基盤にも。サーバー管理を自分でやれる（学びたい）人向けです。",
    accent: "text-orange-700",
    ring: "ring-orange-200",
    bg: "bg-orange-50",
    btn: "bg-orange-600 hover:bg-orange-700",
  },
];

const faqs = [
  {
    q: "結局、どのレンタルサーバーが一番おすすめですか？",
    a: "目的次第です。定番の安心感と情報量で選ぶならエックスサーバー、同じ運営基盤で容量のコスパを取るならシン・レンタルサーバー、WordPressの表示速度と始めやすさならConoHa WING、root権限で開発環境やゲームサーバーを自由に作るならXServer VPSが向きます。エックスサーバー・シンは10日間の無料お試しがあるので、迷ったら実際に触って比べるのが確実です。",
  },
  {
    q: "エックスサーバーとシン・レンタルサーバーは何が違うのですか？",
    a: "どちらもエックスサーバー株式会社が運営する共有レンタルサーバーです。エックスサーバーは国内シェアNo.1（公式標榜）の実績ある定番で、シン・レンタルサーバーはその新世代版という位置づけ。月額はエックスサーバー990円〜・シン1,078円〜とほぼ同水準ですが、シンはベーシックプランからNVMe SSD 700GBと容量が大きめです。実績と定番感を取るならエックスサーバー、同じ運営基盤で容量のコスパを取るならシンが目安になります。",
  },
  {
    q: "無料で試せるサーバーはありますか？",
    a: "エックスサーバーとシン・レンタルサーバーには10日間の無料お試しがあります。XServer VPSには「無料VPS」という仕組みがあり、2GB・4GBプランを無料で試せます（2〜4日ごとに契約の更新操作が必要）。ConoHa WINGには無料お試しがないため、申し込み前に公式サイトでプラン内容をよく確認してください。",
  },
  {
    q: "共有レンタルサーバーとVPSはどう選べばいいですか？",
    a: "WordPressブログや会社サイトなど「Webサイトを公開したい」だけなら、管理の手間が少ない共有レンタルサーバー（エックスサーバー・シン・ConoHa WING）が向きます。MinecraftサーバーやDocker開発環境、常駐プログラムなど「サーバー自体を自由に使いたい」ならroot権限のあるXServer VPSです。ただしVPSはOS更新やセキュリティ設定を自分で行う前提なので、サーバー管理の学習コストも考慮してください。",
  },
  {
    q: "「実質◯円」という料金表記はどういう意味ですか？",
    a: "多くのレンタルサーバーは、長期契約の割引やキャッシュバックキャンペーンを適用した場合の月あたり換算を「実質◯円」と表記しています。適用には契約期間などの条件があり、実施時期・割引率は頻繁に変わります。本記事の金額も確認時点の例なので、申し込み前に必ず公式サイトで通常料金・キャンペーン条件・更新後の料金を確認してください。",
  },
];

const related = [
  { href: "/learn/network/xserver-review", title: "エックスサーバー レビュー — 王道の定番", eyebrow: "Review" },
  { href: "/learn/network/shin-rental-server-review", title: "シンレンタルサーバー レビュー — 新世代のコスパ", eyebrow: "Review" },
  { href: "/learn/network/conoha-wing-review", title: "ConoHa WING レビュー — 高速WordPress", eyebrow: "Review" },
  { href: "/learn/network/xserver-vps-review", title: "XServer VPS レビュー — root権限の自由", eyebrow: "Review" },
  { href: "/learn/network/xserver-vs-conoha-wing", title: "エックスサーバー vs ConoHa WING 比較", eyebrow: "Compare" },
  { href: "/learn/network/xserver-vps-guide", title: "XServer VPSとは？初心者向けの始め方", eyebrow: "Guide" },
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
  className = "bg-blue-600 hover:bg-blue-700",
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_72%,#ffffff_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=network" className="hover:text-slate-950">Network</Link>
          <span>/</span>
          <span>レンタルサーバーおすすめ比較</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">PR / 広告を含みます</span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-200">{article.date} 確認</span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">価格は公式確認</span>
        </div>

        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          レンタルサーバーおすすめ比較
          <span className="mt-2 block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent text-2xl sm:text-3xl">
            エックスサーバー・シン・ConoHa WING・XServer VPS、あなたに合うのは？
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          レンタルサーバー選びは「どれが一番」ではなく<strong className="font-bold text-slate-900">目的で選ぶ</strong>のが失敗しないコツです。本記事では、当サイトで個別にレビューした
          <strong className="font-bold text-slate-900">王道のエックスサーバー</strong>・
          <strong className="font-bold text-slate-900">コスパのシン・レンタルサーバー</strong>・
          <strong className="font-bold text-slate-900">高速WordPressのConoHa WING</strong>・
          <strong className="font-bold text-slate-900">root権限のXServer VPS</strong>
          の4サービスを、料金・容量・無料で試せるかで比較します。
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "定番で安心", pick: "エックスサーバー", note: "990円〜・10日無料お試し", href: XSERVER_URL, btn: "bg-blue-600 hover:bg-blue-700" },
            { label: "大容量コスパ", pick: "シン", note: "1,078円〜・NVMe 700GB・10日無料", href: SHIN_URL, btn: "bg-emerald-600 hover:bg-emerald-700" },
            { label: "高速WordPress", pick: "ConoHa WING", note: "1,451円〜・ドメイン2つ無料", href: CONOHA_URL, btn: "bg-violet-600 hover:bg-violet-700" },
            { label: "自由に構築", pick: "XServer VPS", note: "990円〜・root権限・テンプレ", href: VPS_URL, btn: "bg-orange-600 hover:bg-orange-700" },
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
          ※ 本ページのリンクには広告（A8.net）を含みます。「実質◯円」はキャンペーン適用時の例で時期により変動します。最新条件は各公式サイトでご確認ください。
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">3 sec summary</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">3秒でわかる結論</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {tldr.map((item) => (
            <article key={item.no} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
              <div className="absolute right-5 top-5 text-5xl font-black text-blue-100">{item.no}</div>
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">Comparison</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">4サービスを一覧で比較</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            料金・キャンペーンは変動するため目安です。申し込み前に各公式サイトで最新の料金・条件をご確認ください。
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[880px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className={`${headCell} text-slate-500`}>比較項目</th>
                <th className={`${headCell} text-blue-700`}>エックスサーバー</th>
                <th className={`${headCell} text-emerald-700`}>シン・レンタルサーバー</th>
                <th className={`${headCell} text-violet-700`}>ConoHa WING</th>
                <th className={`${headCell} text-orange-700`}>XServer VPS</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 1 ? "bg-slate-50/60" : "bg-white"}>
                  <th scope="row" className="px-3 py-3 text-left align-top text-xs font-bold text-slate-500">{row.label}</th>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "xserver" ? "font-black text-blue-700" : "text-slate-700"}`}>{row.xserver}</td>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "shin" ? "font-black text-emerald-700" : "text-slate-700"}`}>{row.shin}</td>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "conoha" ? "font-black text-violet-700" : "text-slate-700"}`}>{row.conoha}</td>
                  <td className={`px-3 py-3 align-top text-[13px] leading-6 ${row.highlight === "vps" ? "font-black text-orange-700" : "text-slate-700"}`}>{row.vps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs leading-6 text-slate-500">
          太字＝その項目で特に強いサービス。※「実質◯円」はキャンペーン適用時の例（時期・条件により変動）。
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">Which one?</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">用途別・あなたに合う1台</h2>
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">Each service</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">それぞれの特徴</h2>
        </div>
        <div className="space-y-5">
          <BrandCard
            eyebrow="国内シェアNo.1（公式標榜）の王道"
            name="エックスサーバー"
            lead="迷ったらまず候補になる定番レンタルサーバー。利用者が多く情報も豊富で、初心者がつまずいたときに解決策を見つけやすいのが実は大きな強みです。"
            points={["月額990円〜（割引時 実質693円〜の例）・初期費用0円", "NVMe SSD 500〜700GB・Xアクセラレータで高速", "自動バックアップ全プラン無料・独自ドメイン永年無料（条件あり）", "10日間の無料お試しつき"]}
            href={XSERVER_URL}
            reviewHref="/learn/network/xserver-review"
            banner={xserverBanner}
            btn="bg-blue-600 hover:bg-blue-700"
            ring="ring-blue-100"
          />
          <BrandCard
            eyebrow="同じ運営会社の新世代・コスパ型"
            name="シン・レンタルサーバー"
            lead="エックスサーバー株式会社が手がける「新世代版」。定番の運営基盤はそのままに、月額はより安く、ベーシックプランからNVMe SSD 700GBと大容量です。"
            points={["月額1,078円〜（割引キャンペーンで862円〜の例）", "全プラン NVMe SSD・700GB〜1,200GBの大容量", "独自ドメイン永年無料（.com/.net など）・電話/メールサポート", "10日間の無料お試しつき"]}
            href={SHIN_URL}
            reviewHref="/learn/network/shin-rental-server-review"
            banner={shinBanner}
            btn="bg-emerald-600 hover:bg-emerald-700"
            ring="ring-emerald-100"
          />
          <BrandCard
            eyebrow="高速WordPressのGMO"
            name="ConoHa WING"
            lead="GMOインターネットグループが運営。LiteSpeed×WEXAL®による高速化と「かんたんセットアップ」で、WordPressブログを最短で快適に始めたい人に人気です。"
            points={["月額1,451円〜（長期契約＋キャンペーンで659円〜の例）", "LiteSpeed＋WEXAL®の高速化・転送量無制限", "独自ドメインが全プラン2つ永年無料・自動バックアップ無料", "無料お試しはない点に注意"]}
            href={CONOHA_URL}
            reviewHref="/learn/network/conoha-wing-review"
            banner={conohaBanner}
            btn="bg-violet-600 hover:bg-violet-700"
            ring="ring-violet-100"
          />
          <BrandCard
            eyebrow="root権限のVPS"
            name="XServer VPS"
            lead="共有サーバーでは物足りない人向けの仮想専用サーバー。AMD EPYC×NVMe SSDの性能を月額990円〜で使え、テンプレートでMinecraftサーバーやDocker環境を手軽に構築できます。"
            points={["月額990円〜（36ヶ月・割引時792円〜の例）・初期費用0円", "AMD EPYC×NVMe SSD・root権限で自由にカスタマイズ", "Minecraft・Docker・WordPress等のテンプレート", "「無料VPS」で2GB/4GBを無料試用可（2〜4日ごとに更新）"]}
            href={VPS_URL}
            reviewHref="/learn/network/xserver-vps-review"
            banner={vpsBanner}
            btn="bg-orange-600 hover:bg-orange-700"
            ring="ring-orange-100"
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">How to choose</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">失敗しないサーバー選び 3つの基準</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              no: "1",
              title: "「共有」か「VPS」かを最初に決める",
              body: "WordPressブログや会社サイトを公開したいだけなら、管理の手間が少ない共有レンタルサーバー（エックスサーバー・シン・ConoHa WING）で十分です。ゲームサーバーや開発環境などサーバー自体を自由に使いたい場合だけ、root権限のあるXServer VPSを選びます。",
            },
            {
              no: "2",
              title: "「実質◯円」は条件までセットで見る",
              body: "各社の最安表示は、長期契約の一括払いやキャッシュバック適用時の月あたり換算です。契約期間・支払総額・更新後の料金を公式サイトで確認し、通常料金でも納得できるかで判断すると失敗しません。",
            },
            {
              no: "3",
              title: "無料で試せるなら、まず触ってみる",
              body: "管理画面の使い勝手やサイトの表示速度は、触ってみるのが一番早い確認方法です。エックスサーバー・シンは10日間の無料お試し、XServer VPSは「無料VPS」があります。無料お試しのないConoHa WINGは、プラン内容と契約条件を事前によく確認しましょう。",
            },
          ].map((s) => (
            <div key={s.no} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">{s.no}</span>
              <div>
                <h3 className="text-base font-black text-slate-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-600">
          サイト公開には独自ドメインも必要です。取得の流れは
          <Link href="/learn/network/xserver-domain-guide" className="font-bold text-blue-700 underline-offset-2 hover:underline">独自ドメイン取得ガイド</Link>
          で解説しています。
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
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">よくある質問</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-blue-300 open:shadow-md" open={idx === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">Q</span>
                  {f.q}
                </span>
                <span aria-hidden="true" className="text-blue-700 transition group-open:rotate-45">+</span>
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
            ["エックスサーバー 公式サイト", "https://www.xserver.ne.jp/"],
            ["シンレンタルサーバー 公式サイト", "https://www.shin-server.jp/"],
            ["ConoHa WING 公式サイト", "https://www.conoha.jp/wing/"],
            ["XServer VPS 公式サイト", "https://vps.xserver.ne.jp/"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline-offset-2 hover:underline">{label}</a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          本ページはアフィリエイト広告（PR）を含みます。記載の価格・仕様は {article.date} 時点の情報で、当サイトの各単体レビューで公式情報を確認のうえ掲載しています。「実質◯円」はキャンペーン適用時の例であり、実施時期・条件により変動します。申し込み前に各公式サイトで最新の内容をご確認ください。
        </p>
        <div aria-hidden="true">
          {TEXT_PIXELS.map((px) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={px} src={px} width={1} height={1} alt="" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
          ))}
        </div>
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
            <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">{item.eyebrow}</div>
              <div className="mt-2 text-sm font-black text-slate-950 group-hover:text-blue-700">{item.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RentalServerComparisonPage() {
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
