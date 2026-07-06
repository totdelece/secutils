import Link from "next/link";
import { getArticle } from "@/lib/articles";

/* =======================================================================
   NordVPN レビュー（PR記事・単体レビュー型 / フルカスタム）
   ・norton-360-review と同じ構成をベースに、NordVPN のブランドカラー（emerald）で構成。
   ・事実は公式情報および裏取り済みの nordvpn-vs-expressvpn 記事（2026-07 再確認）から。
     - 10台同時接続 / 30日返金保証 / NordLynx(WireGuardベース) / ML-KEM(耐量子暗号)
     - Threat Protection（上位はPro）/ Double VPN / Onion over VPN / Meshnet
     - Dark Web Monitor / NordPass / NordLocker / ノーログ独立監査済み
   ・料金・サーバー数・対応国数・プラン内容は地域と時期で変動するため断定せず
     「公式で最新を確認」に寄せる（景表法・ステマ規制対策）。
   ・Server Component のまま（onClick 等は使わない）。metadata は layout.tsx に委譲。
   ======================================================================= */

const article = getArticle("network", "nordvpn-review")!;

// ---- A8 アフィリエイト素材（テキストリンク＋計測ピクセル）----------------
const NORD_URL = "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+674EQ";
const NORD_TEXT_PIXEL = "https://www18.a8.net/0.gif?a8mat=4B5MC7+7118VM+3YFI+674EQ";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const banner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+5ZMCH",
  src: "https://www22.a8.net/svt/bgt?aid=260602711425&wid=001&eno=01&mid=s00000018459001006000&mc=1",
  pixel: "https://www10.a8.net/0.gif?a8mat=4B5MC7+7118VM+3YFI+5ZMCH",
  width: 300,
  height: 250,
  alt: "NordVPN 公式キャンペーン",
};

const banner936x120: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+60OXD",
  src: "https://www21.a8.net/svt/bgt?aid=260602711425&wid=001&eno=01&mid=s00000018459001011000&mc=1",
  pixel: "https://www17.a8.net/0.gif?a8mat=4B5MC7+7118VM+3YFI+60OXD",
  width: 936,
  height: 120,
  alt: "NordVPN 公式キャンペーン",
};

const features = [
  {
    label: "⚡",
    title: "NordLynx（高速VPNプロトコル）",
    body: "WireGuardをベースに独自最適化したプロトコル。低遅延で安定した通信を実現し、動画視聴やリモートワークでも速度低下を抑える。2024年に耐量子暗号（ML-KEM）への対応を開始し、2025年に主要アプリへ拡大。将来の量子コンピュータによる解読リスクにも備える（NordLynx接続時に有効）。",
  },
  {
    label: "🧹",
    title: "Threat Protection（脅威保護）",
    body: "広告・トラッカー・悪質サイトをドメイン単位でブロック（VPN接続時に全アプリへ適用）。上位プランのThreat Protection Proでは、URL単位の検査やダウンロードファイルのマルウェアスキャンにも対応する（Windows・Mac向け）。",
  },
  {
    label: "🌐",
    title: "世界規模の大規模サーバー網",
    body: "世界110カ国以上に多数のサーバーを配置。混雑しにくく、日本国内にもサーバーがあるため、用途に応じて最適な接続先を選べる。最新のサーバー数・対応国数は公式サイトで確認できる。",
  },
  {
    label: "🧅",
    title: "Double VPN・Onion over VPN",
    body: "2つのVPNサーバーを経由して通信を二重に暗号化するDouble VPN、Torネットワークと組み合わせるOnion over VPNを標準で用意。より高い匿名性が求められる場面で使える。",
  },
  {
    label: "🖧",
    title: "Meshnet（メッシュネット）",
    body: "VPNサーバーを介さず、自分のデバイス同士を暗号化して直接つなぐP2P機能。外出先から自宅のPCへアクセスしたり、離れた相手とLANのように接続したりできる。開発・検証環境の構築にも便利。",
  },
  {
    label: "🔑",
    title: "NordPass・Dark Web Monitor",
    body: "上位プランではパスワードマネージャーNordPassや暗号化クラウドストレージNordLockerが付帯。Dark Web Monitorが登録メールアドレスの流出を継続監視し、検知時に通知する。",
  },
];

const plans = [
  {
    label: "VPN基本",
    badge: "エントリー",
    devices: "10 台",
    threat: "脅威保護（基本）",
    extra: "追加サービスなし",
    target: "VPNの基本機能だけあれば十分な人",
  },
  {
    label: "＋ セキュリティ機能",
    badge: "おすすめ",
    devices: "10 台",
    threat: "Threat Protection Pro",
    extra: "パスワード管理・情報漏洩スキャナー",
    target: "セキュリティ機能をまとめて使いたい人",
    highlight: true,
  },
  {
    label: "＋ 暗号化ストレージ",
    badge: "全部入り",
    devices: "10 台",
    threat: "Threat Protection Pro",
    extra: "上記 ＋ 暗号化クラウドストレージ",
    target: "重要ファイルの保管までまとめたい人",
  },
];

const demerits = [
  {
    title: "初回価格と更新価格の差が大きい",
    body: "長期プランは初回契約が大きく割引されるが、契約期間が終わった後の更新は通常価格に戻る。申し込み前に「初回価格」と「更新価格」を必ず両方確認しておくこと。",
    rebuttal: "更新前に他社と再比較したり、長期プランを選び直したりすれば単価は抑えられる。まず30日返金保証の間に使い勝手を見極めれば良い。",
  },
  {
    title: "完全無料のプランはない",
    body: "無料で使い続けられるプランは提供されておらず、利用には有料契約が必要。「まず無料で試したい」という人にはハードルに感じられる。",
    rebuttal: "30日間の返金保証があるため、期間内に解約すれば実質無料で試せる。合わなければ全額返金を申請できる。",
  },
  {
    title: "機能が多く、最初は設定項目が多い",
    body: "Double VPN・Meshnet・スプリットトンネリング・専用IPなど機能が豊富なぶん、すべてを使いこなすには設定を理解する必要がある。",
    rebuttal: "既定の状態で「クイック接続」するだけでも基本的な保護は働く。必要な機能だけ後から有効化していけばよい。",
  },
];

const faqs = [
  {
    q: "NordVPNは日本から快適に使えますか？",
    a: "日本国内にもサーバーがあり、WireGuardベースのNordLynxにより比較的高速に接続できます。ただし実際の速度は回線環境・時間帯・接続先サーバーによって変わります。30日間の返金保証があるので、まず自分の回線で速度と安定性を試してから継続を判断するのが確実です。",
  },
  {
    q: "ノーログポリシーは本当に信頼できますか？",
    a: "NordVPNは独立監査機関（PwCやDeloitteなど）によるノーログ監査を複数回受けており、直近では2024年末にDeloitteが5回目の検証を実施しています。2018年に契約先データセンターの管理ツールが悪用されサーバーが侵害された事案がありましたが、利用者の認証情報や閲覧履歴・ログは盗まれていません（ノーログのため、そもそも保存されていませんでした）。その後は全サーバーのディスクレス（RAMのみで動作）化を進めるなど、体制を強化してきました。",
  },
  {
    q: "無料で試せますか？返金はできますか？",
    a: "完全無料のプランはありませんが、30日間の返金保証があります。期間内に申請すれば全額返金されるため、実質的に無料で試せます。返金の対象条件や申請方法は変わることがあるため、申し込み前に公式の返金ポリシーを確認してください。",
  },
  {
    q: "VPNを使えば完全に匿名になれますか？",
    a: "なりません。VPNはIPアドレスを隠し通信経路を暗号化しますが、ログイン中のサービス（Googleやx.comなど）からは依然として本人として識別されます。VPNは「通信経路を保護する」ツールであり、完全な匿名化ツールではない点は理解しておく必要があります。",
  },
  {
    q: "会社の業務で使っても大丈夫ですか？",
    a: "個人契約のVPNを会社の端末や業務ネットワーク経由で使うと、社内のセキュリティポリシーに抵触する場合があります。まず社内規定を確認してください。BYOD（私物端末での業務）で使う場合は、会社VPNとの二重接続時の挙動やスプリットトンネリングの設定も確認しておくと安心です。",
  },
  {
    q: "ウイルス対策ソフトの代わりになりますか？",
    a: "Threat Protection（Pro）は悪質サイト・広告・一部のマルウェアをブロックしますが、総合セキュリティソフトの完全な代替ではありません。端末そのものの保護は、Norton やウイルスバスターのようなセキュリティソフトと役割が異なります。用途に応じて併用を検討してください。",
    link: {
      href: "/learn/security/norton-360-review",
      label: "ノートン 360 レビュー",
    },
  },
];

// ────────────────────────────────────────────────────────────
// Shared UI components
// ────────────────────────────────────────────────────────────

function BannerImage({ ad }: { ad: BannerAd }) {
  return (
    <div className="relative rounded-xl border border-slate-200 bg-slate-100 p-2">
      <a
        href={ad.href}
        rel="nofollow sponsored noopener noreferrer"
        target="_blank"
        className="block transition hover:opacity-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ad.src}
          alt={ad.alt}
          width={ad.width}
          height={ad.height}
          style={{ objectFit: "contain" }}
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
    </div>
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
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/15 hover:-translate-y-0.5 hover:bg-emerald-700"
      : "border border-emerald-300 bg-white text-emerald-700 hover:-translate-y-0.5 hover:bg-emerald-50";
  const sizeClass =
    size === "lg"
      ? "min-h-14 px-6 py-3.5 text-base"
      : "min-h-11 px-5 py-2.5 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl text-center font-black no-underline transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${variantClass} ${sizeClass}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

/** バナー + 説明文 + CTAボタン をカード形式でまとめるコンポーネント */
function BannerCard({
  eyebrow,
  heading,
  body,
  ctaLabel,
  banner,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  banner: BannerAd;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
      <div className="border-b border-emerald-100 bg-emerald-600 px-5 py-2.5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-100">
          {eyebrow}
        </p>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-black text-slate-950">{heading}</h3>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
          <div className="w-full shrink-0 sm:w-auto">
            <BannerImage ad={banner} />
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-sm leading-7 text-slate-600">{body}</p>
            <CtaButton href={NORD_URL}>{ctaLabel}</CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Page sections
// ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ecfdf5_0%,#f8fafc_72%,#ffffff_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=network" className="hover:text-slate-950">Network</Link>
          <span>/</span>
          <span>NordVPN</span>
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
            PR / 広告を含みます
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
            {article.date} 確認
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
            価格は公式確認
          </span>
        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          NordVPN レビュー
          <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-3xl sm:text-4xl">
            世界最大級のVPNを一本で
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
          NordVPN は世界的に利用者の多い定番VPN。通信の暗号化にとどまらず、WireGuardベースの高速プロトコル NordLynx、広告・マルウェアを遮断する Threat Protection、Double VPN や Meshnet といった機能を1つの契約に集約したサービスです。
        </p>

        {/* ファーストビュー：サービス紹介カード */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-lg">
          <div className="bg-emerald-600 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100">
              PR / 公式キャンペーン実施中
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xl font-black text-slate-950">NordVPN</p>
            <div className="mt-1 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-base">★</span>
              ))}
              <span className="ml-1 text-xs font-bold text-slate-500">高機能VPNの定番</span>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                "WireGuardベースのNordLynxで高速・安定",
                "広告・マルウェア・フィッシングをまとめてブロック",
                "10台同時接続・30日間返金保証つき",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-700">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-center">
              <BannerImage ad={banner300x250} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CtaButton href={NORD_URL} size="lg">
                公式サイトを見る
              </CtaButton>
              <CtaButton href={NORD_URL} variant="outline" size="lg">
                料金を確認する
              </CtaButton>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          ※ 本ページのリンクには広告（A8.net）を含みます。価格・機能・プラン内容は記事確認時点の情報です。最新条件は公式サイトでご確認ください。
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={NORD_TEXT_PIXEL}
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

function TldrSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">3 sec summary</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">3秒でわかる結論</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              no: "01",
              title: "セキュリティ機能を一本に集約",
              body: "VPN本体に加え、Threat Protection・Double VPN・Dark Web Monitorを標準搭載。公共Wi-Fiでも通信をまとめて守れる。",
            },
            {
              no: "02",
              title: "WireGuardベースで高速",
              body: "独自プロトコルNordLynxはWireGuardベースで低遅延・高速。2024年からML-KEMで耐量子暗号にも対応済み。",
            },
            {
              no: "03",
              title: "10台同時接続・ノーログ監査済み",
              body: "1契約でPC・スマホなど10台を同時保護。ノーログポリシーは独立監査機関が複数回検証している。",
            },
          ].map((item) => (
            <article
              key={item.no}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg transition"
            >
              <div className="absolute right-5 top-5 text-5xl font-black text-emerald-100">
                {item.no}
              </div>
              <h3 className="relative text-base font-black text-slate-950">{item.title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">Features</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            主な機能 — 暗号化だけじゃない
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-600">
            NordVPN は「通信を隠すVPN」の枠を超えて、脅威ブロックからパスワード管理までを一本にまとめています。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-lg ring-1 ring-emerald-200/60">
                {f.label}
              </div>
              <h3 className="mt-4 text-base font-black text-slate-950">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{f.body}</p>
            </article>
          ))}
        </div>

        {/* 機能解説後 CTA */}
        <div className="mt-10">
          <BannerCard
            eyebrow="公式キャンペーン実施中"
            heading="機能をまとめて体験 — 30日間返金保証つき"
            body="NordLynxの高速接続、Threat Protection、Double VPN、Meshnetをまとめて試せます。まず使ってみて、合わなければ返金申請できます。"
            ctaLabel="最新キャンペーンを確認する"
            banner={banner300x250}
          />
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">Plans</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            プラン早見表 — 付帯サービスで選ぶ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            VPN本体と同時接続台数（10台）はどのプランも共通で、追加されるセキュリティサービスの範囲で選ぶのが基本です。正確なプラン名・内容・料金は公式サイトをご確認ください。
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.label}
              className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
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
                <div className="text-2xl font-black text-slate-950">{p.label}</div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${p.highlight ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-slate-100 text-slate-700 ring-slate-200"}`}>
                  {p.badge}
                </span>
              </div>
              <dl className="mt-5 space-y-2 text-sm">
                {[
                  ["同時接続", p.devices],
                  ["脅威保護", p.threat],
                  ["追加サービス", p.extra],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-slate-100 pb-2">
                    <dt className="shrink-0 font-bold text-slate-500">{k}</dt>
                    <dd className="text-right font-black text-slate-950">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-7 text-slate-600">{p.target}</p>
              <div className="mt-auto pt-5">
                <CtaButton href={NORD_URL}>公式で料金を確認</CtaButton>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-xs leading-6 text-slate-500">
          ※ プラン名（ベーシック／コンプリート等）・付帯サービスの構成・料金は地域や時期によって変わります。購入前に必ず公式サイトで最新のプラン名と内容をご確認ください。
        </p>

        {/* 料金解説後 CTA（最重要） */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
          <div className="border-b border-emerald-100 bg-emerald-600 px-5 py-2.5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-100">
              最新料金を確認する
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-black text-slate-950">
              初回割引と更新価格を必ず両方チェック
            </h3>
            <p className="mt-2 mb-4 text-sm leading-7 text-slate-600">
              NordVPN は長期プランで初回が大きく割引されますが、更新時は通常価格に戻ります。まず公式サイトで「初回価格」と「更新価格」を両方確認してから申し込んでください。30日間の返金保証があるので、実際に試してから継続を判断できます。
            </p>
            <div className="flex justify-center">
              <BannerImage ad={banner936x120} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CtaButton href={NORD_URL} size="lg">
                料金・キャンペーンを確認する
              </CtaButton>
              <CtaButton href={NORD_URL} variant="outline" size="lg">
                プランを比較する
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemeritsSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">Demerits</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            気になるポイントと対処法
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            公平な判断のために、申し込み前に知っておくべき注意点も整理します。
          </p>
        </div>
        <div className="space-y-4">
          {demerits.map((d) => (
            <article
              key={d.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="flex items-start gap-2 text-base font-black text-slate-950">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-black text-amber-700">
                  !
                </span>
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{d.body}</p>
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">
                  ✓
                </span>
                <span>{d.rebuttal}</span>
              </div>
            </article>
          ))}
        </div>

        {/* デメリット解説後 CTA */}
        <div className="mt-10">
          <BannerCard
            eyebrow="こんな人にはおすすめ"
            heading="デメリットを踏まえてもおすすめできる人"
            body="公共Wi-Fiをよく使う人、広告やトラッカーをまとめて遮断したい人、複数デバイスを1契約で守りたい人には、NordVPN は費用対効果が高い選択肢です。まず30日間の返金保証期間内で試してみてください。"
            ctaLabel="詳細を確認する"
            banner={banner300x250}
          />
        </div>
      </div>
    </section>
  );
}

function ChecklistSection() {
  const items = [
    "契約期間（1ヶ月／1年／2年）と、その更新価格を公式サイトで確認した",
    "同時に使うデバイス数が10台以内に収まる",
    "必要なプラン（VPNのみ／＋セキュリティ機能）を付帯サービスで選んだ",
    "会社の端末・ネットワークで使う場合、社内のVPN利用ポリシーを確認した",
    "30日間返金保証の期間内に、自分の回線で速度・安定性を試す予定を立てた",
    "支払い方法（クレジットカード／PayPal／暗号資産など）を確認した",
  ];
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">Pre-flight</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">申し込み前のチェックリスト</h2>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
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
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">よくある質問</h2>
        </div>
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
                <span aria-hidden="true" className="text-emerald-700 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">
                {f.a}
                {f.link && (
                  <>
                    {" "}
                    <Link href={f.link.href} className="font-bold text-emerald-700 underline-offset-2 hover:underline">
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

function SummarySection() {
  const fits = [
    "公共Wi-Fiや外出先での通信を安全に保護したい人",
    "広告・トラッカー・フィッシングをまとめてブロックしたい人",
    "PC・スマホなど複数デバイス（最大10台）を1契約で守りたい人",
    "機能の豊富さとコストのバランスを重視する人",
  ];
  return (
    <section className="bg-white px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-700">Summary</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            こんな人におすすめ
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-3">
            {fits.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700 ring-1 ring-slate-200"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* 記事末尾 CTA */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="bg-emerald-600 px-5 py-2.5">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-100">
                PR / 公式キャンペーン
              </p>
            </div>
            <div className="p-5">
              <div className="flex justify-center">
                <BannerImage ad={banner300x250} />
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                30日間返金保証つきで試せます。まず公式サイトで最新キャンペーンと料金を確認してください。
              </p>
              <div className="mt-4 grid gap-2">
                <CtaButton href={NORD_URL} size="lg">
                  今すぐ申し込む
                </CtaButton>
                <CtaButton href={NORD_URL} variant="outline">
                  特典・キャンペーンを確認する
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-950">参考にした公式情報</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {[
            ["NordVPN 公式サイト", "https://nordvpn.com/"],
            ["NordVPN 料金・プラン", "https://nordvpn.com/pricing/"],
            ["NordVPN プランと価格の解説", "https://nordvpn.com/blog/how-much-does-nordvpn-cost/"],
            ["NordVPN 30日間返金保証", "https://nordvpn.com/risk-free-vpn/"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline-offset-2 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          この記事は {article.date} 時点の公式情報を確認して作成しています。申し込み前には公式サイトで最新の価格・特典・契約条件・対応機能を確認してください。
        </p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: "/learn/network/nordvpn-vs-expressvpn", title: "NordVPN vs ExpressVPN 比較", eyebrow: "Compare" },
    { href: "/learn/network/vpn-basics", title: "VPNの仕組み — IPsec・WireGuard・プライバシー", eyebrow: "Network" },
    { href: "/learn/security/infostealer-session-hijacking", title: "インフォスティーラーとセッションCookie窃取", eyebrow: "Security" },
  ];
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
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
              <div className="mt-2 text-sm font-black text-slate-950 group-hover:text-emerald-700">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function NordVpnReviewPage() {
  return (
    <main>
      <Hero />
      <TldrSection />
      <FeaturesSection />
      <PlansSection />
      <DemeritsSection />
      <ChecklistSection />
      <FaqSection />
      <SummarySection />
      <References />
      <RelatedLinks />
    </main>
  );
}
