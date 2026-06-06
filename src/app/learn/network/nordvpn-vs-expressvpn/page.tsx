import Link from "next/link";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "nordvpn-vs-expressvpn")!;

const NORD_URL = "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+674EQ";
const NORD_PIXEL = "https://www18.a8.net/0.gif?a8mat=4B5MC7+7118VM+3YFI+674EQ";
const EXPRESS_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+A4YQLU+5JSS+5YJRM";
const EXPRESS_PIXEL = "https://www14.a8.net/0.gif?a8mat=4B3LMV+A4YQLU+5JSS+5YJRM";

type BannerAd = {
  href: string;
  src: string;
  pixel: string;
  width: number;
  height: number;
  alt: string;
};

const nordBanner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+5ZMCH",
  src: "https://www22.a8.net/svt/bgt?aid=260602711425&wid=001&eno=01&mid=s00000018459001006000&mc=1",
  pixel: "https://www10.a8.net/0.gif?a8mat=4B5MC7+7118VM+3YFI+5ZMCH",
  width: 300,
  height: 250,
  alt: "NordVPN 公式キャンペーン",
};

const nordBanner936x120: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5MC7+7118VM+3YFI+60OXD",
  src: "https://www21.a8.net/svt/bgt?aid=260602711425&wid=001&eno=01&mid=s00000018459001011000&mc=1",
  pixel: "https://www17.a8.net/0.gif?a8mat=4B5MC7+7118VM+3YFI+60OXD",
  width: 936,
  height: 120,
  alt: "NordVPN 公式キャンペーン",
};

const expressBanner300x250: BannerAd = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+A4YQLU+5JSS+5YZ75",
  src: "https://www27.a8.net/svt/bgt?aid=260508487613&wid=001&eno=01&mid=s00000025894001003000&mc=1",
  pixel: "https://www13.a8.net/0.gif?a8mat=4B3LMV+A4YQLU+5JSS+5YZ75",
  width: 300,
  height: 250,
  alt: "ExpressVPN 公式キャンペーン",
};

const tldr = [
  {
    no: "01",
    title: "コスパ・機能量ならNordVPN",
    body: "2年プランで月530円前後〜。6,400+サーバー、10台同時接続、Double VPN、Threat Protectionを標準装備。セキュリティ重視のIT担当者に刺さる構成。",
  },
  {
    no: "02",
    title: "速度・ハード安全性ならExpressVPN",
    body: "独自Lightway＋耐量子暗号Kyberを業界先行で採用。RAMのみで動くTrustedServerでデータ非永続化を実現。通信品質とハードウェア信頼性を最優先にしたいなら選択肢に入る。",
  },
  {
    no: "03",
    title: "迷ったらNordVPN",
    body: "機能・価格・接続台数・日本語サポートのバランスを見れば、ほとんどの用途でNordVPNが現実的な第一候補になる。30日返金保証で試すコストもゼロ。",
  },
];

const comparisonRows = [
  { label: "2年プラン（最安）", nord: "約530円/月", express: "約540円/月" },
  { label: "月払い", nord: "約2,000円/月", express: "約2,000円/月" },
  { label: "同時接続台数", nord: "10台", express: "10台（Basic）" },
  { label: "サーバー数", nord: "6,400+", express: "3,000+" },
  { label: "対応国数", nord: "111カ国+", express: "105カ国+" },
  { label: "VPNプロトコル", nord: "NordLynx（WireGuard）", express: "Lightway（独自）" },
  { label: "耐量子暗号", nord: "ML-KEM採用（NordLynx・2024年〜）", express: "Kyber採用（Lightway・先行）" },
  { label: "RAM専用サーバー", nord: "一部対応", express: "全サーバー対応（TrustedServer）" },
  { label: "ノーログ監査", nord: "✓ 複数回監査済み", express: "✓ 複数回監査済み" },
  { label: "Double VPN", nord: "✓", express: "─" },
  { label: "脅威保護（広告・マルウェア）", nord: "✓ Threat Protection", express: "✓ Advanced+で有効" },
  { label: "キルスイッチ", nord: "✓", express: "✓" },
  { label: "スプリットトンネリング", nord: "✓", express: "✓" },
  { label: "返金保証", nord: "30日", express: "30日" },
];

const useCases = [
  {
    scenario: "リモートワーク・社外から社内VPNに加えてさらに保護したい",
    recommend: "Nord",
    reason: "Threat Protectionで公共Wi-Fiの脅威を自動ブロック。Double VPNで二重暗号化も可能。",
  },
  {
    scenario: "海外出張・海外サービスへのアクセス",
    recommend: "どちらでも",
    reason: "両社とも主要国を網羅。Netflixなどの地理制限解除実績もある。",
  },
  {
    scenario: "セキュリティインフラに組み込む・開発検証",
    recommend: "Nord",
    reason: "NordLynxの安定した接続とMeshnet（P2P VPN）機能が便利。",
  },
  {
    scenario: "通信速度を最優先にしたい",
    recommend: "Express",
    reason: "LightwayのTurboモードとKyberによる最適化。高速接続が期待できる。",
  },
  {
    scenario: "将来の量子コンピュータ脅威まで考慮したい",
    recommend: "どちらでも",
    reason: "両社ともKyber系の耐量子暗号を採用済み。ExpressVPNが先行採用、NordVPNも2024年にNordLynxで対応完了。",
  },
  {
    scenario: "コストを最小化しつつ高機能を使いたい",
    recommend: "Nord",
    reason: "2年プラン約530円/月。標準プランでDouble VPN・Threat Protection込みの充実度。",
  },
];

const selectionAxes = [
  {
    no: "01",
    title: "プロトコルと暗号化",
    body: "NordはWireGuardベースのNordLynxにML-KEM（耐量子暗号）を2024年から採用。ExpressはLightway（独自実装）でKyberを先行採用。両社とも対応済みだが、採用時期と実装の成熟度でExpressが先行。",
  },
  {
    no: "02",
    title: "サーバーの信頼性",
    body: "ExpressのTrustedServerは全サーバーがRAM駆動。電源オフで全データ消去される設計で、サーバー押収リスクを低減。ハードウェアレベルの信頼性を重視するならExpressが有利。",
  },
  {
    no: "03",
    title: "接続台数と家族共有",
    body: "現状はどちらも10台（BasicプランはNordが有利）。PCと私物スマホと会社スマホを同時に使うといった個人用途なら10台で十分。",
  },
  {
    no: "04",
    title: "追加セキュリティ機能",
    body: "NordはDouble VPN・Onion over VPN・Threat Protectionを全プランに標準装備。Expressは広告ブロックがAdvanced+から。セキュリティ機能を基本プランで揃えたいならNord。",
  },
  {
    no: "05",
    title: "料金と更新コスト",
    body: "2年プランはNord 約530円 vs Express 約540円とほぼ同じ（1USD≒155円換算）。注意は更新時の価格——どちらも初回キャンペーン価格は適用されないため、更新前に再確認が必要。",
  },
  {
    no: "06",
    title: "ノーログポリシーの監査",
    body: "両社とも独立監査機関による複数回のノーログ監査を実施済み。実際にNordVPNは過去のサーバー押収事件後にポリシーを強化した。監査の透明性は両社ともに高い。",
  },
];

const nordStrengths = [
  {
    title: "6,400+サーバー・111カ国+",
    body: "Expressの約2倍のサーバー数。混雑しにくく、日本からも安定した接続先を選べる。",
  },
  {
    title: "Double VPN標準装備",
    body: "2段階のVPNサーバーを経由して暗号化を二重化。高リスク環境での匿名性強化に使える。",
  },
  {
    title: "Threat Protection（脅威保護）",
    body: "広告・トラッカー・フィッシングURLをVPNレベルでブロック。ブラウザ拡張不要で全アプリに適用。",
  },
  {
    title: "Meshnet（P2Pネットワーク）",
    body: "VPNサーバーを介さず複数デバイス間を直接暗号化接続するP2P機能。開発・テスト環境の構築にも使える。",
  },
  {
    title: "10台同時接続・全プラン共通",
    body: "Basicプランから10台接続可。PC・スマホ・タブレット・ルーター・会社端末を一括保護できる。",
  },
];

const expressStrengths = [
  {
    title: "TrustedServer（全RAM動作）",
    body: "全サーバーがRAMのみで動作。電源オフで全データが物理消去され、サーバー差押え時のデータ漏洩リスクを設計レベルで排除。",
  },
  {
    title: "Lightway + Kyber（耐量子暗号・業界先行）",
    body: "独自プロトコルLightwayにNIST標準化のKyber（格子暗号）を業界先行で採用。NordVPNも2024年に続いたが、採用実績の成熟度でExpressVPNが優位。「Harvest Now, Decrypt Later」攻撃への備えとして有効。",
  },
  {
    title: "Lightway Turboモード",
    body: "接続速度を最大化した高速接続モード。動画配信や大容量転送でも速度低下を最小限に抑える。",
  },
  {
    title: "長年の実績とブランド信頼性",
    body: "2009年創業の業界最古参の一つ。複数の独立監査とIPSec時代からの運用実績がある。",
  },
  {
    title: "幅広いデバイス対応",
    body: "ルーター向け専用アプリ・スマートTV・コンソール機器など、他社が対応しにくいデバイスへの公式サポートが充実。",
  },
];

const planRows = [
  {
    label: "Basic",
    nordSpec: "VPN本体・10台・NordLynx・Threat Protection",
    nordPrice: "2年: 約530円/月〜",
    expressSpec: "VPN本体・10台・Lightway",
    expressPrice: "2年: 約540円/月〜",
    highlight: true,
  },
  {
    label: "上位",
    nordSpec: "Plus: パスワードマネージャー追加 / Complete: 1TB暗号化ストレージ追加",
    nordPrice: "Plus 2年: 約680円/月〜",
    expressSpec: "Advanced: Keys・12台・広告ブロック / Pro: 14台・専用IP追加",
    expressPrice: "Advanced 2年: 約700円/月〜",
  },
];

const checklist = [
  "更新価格（2年目以降）を公式サイトで確認したか",
  "接続したいデバイス数が同時接続台数の上限以内か",
  "Double VPN・Threat Protectionなど追加機能が必要かを決めたか",
  "耐量子暗号（Kyber）への対応を優先するかを検討したか",
  "30日返金保証期間内に使い勝手を必ず確認する計画があるか",
  "会社のセキュリティポリシーでVPN利用が許可されているか",
];

const faqs = [
  {
    q: "NordVPNとExpressVPN、日本からの接続品質はどちらが上？",
    a: "日本国内サーバーは両社ともに東京・大阪を含む主要拠点を持ちます。NordVPNはサーバー総数が多いため混雑しにくい点が有利で、ExpressVPNはLightwayのTurboモードで速度を補完します。実際の品質は回線環境やプロバイダによって変わるため、30日返金保証期間中に自分の環境で試すのが最も確実です。",
  },
  {
    q: "ノーログポリシーは本当に信頼できるか？",
    a: "両社ともにPricewaterhouseCoopers（PwC）やDeloitteなどの独立監査機関によるノーログ監査を複数回受けています。特にNordVPNは2018年のサーバー侵害事件後にアーキテクチャを見直し、コロケーション事業者がサーバーにアクセスできない設計に変更しました。ExpressVPNはTrustedServerで設計レベルでのデータ非永続化を実現しています。",
  },
  {
    q: "業務用途でVPNを使う際の注意点は？",
    a: "個人契約のVPNを会社端末や業務ネットワーク経由で使う場合、会社のセキュリティポリシーに抵触する可能性があります。まず社内ポリシーを確認してください。個人端末での業務時（BYOD）に使う場合は、会社VPNとの二重接続時の挙動やスプリットトンネリングの設定を確認することを推奨します。",
  },
  {
    q: "「Harvest Now, Decrypt Later」とは何か？",
    a: "現在の暗号化通信を記録しておき、将来強力な量子コンピュータが普及した時点で復号する攻撃手法です。現時点では解読できなくても、機密情報の有効期間が長い場合（10年先まで秘密にしたい情報など）は今から耐量子暗号を使うことに意味があります。ExpressVPNがLightwayにKyberを先行採用し、NordVPNも2024年にNordLynxで対応を完了しています。長期的な機密情報を扱う用途では、どちらのVPNでも今から備えることができます。",
  },
  {
    q: "VPNを使えば完全に匿名になれるか？",
    a: "なれません。VPNはIPアドレスを隠し通信を暗号化しますが、ログインしているサービス（Google・X等）からは依然として識別されます。またVPNプロバイダ自身はあなたの接続先を把握できます。VPNは「通信経路を暗号化する」ツールであり、完全匿名化ツールではありません。",
  },
];

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "emerald" | "blue" | "amber" | "violet";
}) {
  const map = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${map[tone]}`}>
      {children}
    </span>
  );
}

function CtaButton({
  href,
  children,
  variant = "solid",
  color = "emerald",
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  color?: "emerald" | "blue";
  size?: "md" | "lg";
}) {
  const solidMap = {
    emerald: "bg-emerald-600 text-white shadow-lg shadow-emerald-950/15 hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-emerald-600",
    blue: "bg-blue-600 text-white shadow-lg shadow-blue-950/15 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-blue-600",
  };
  const outlineMap = {
    emerald: "border border-emerald-300 bg-white text-emerald-700 hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-emerald-600",
    blue: "border border-blue-300 bg-white text-blue-700 hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-blue-600",
  };
  const variantClass = variant === "solid" ? solidMap[color] : outlineMap[color];
  const sizeClass = size === "lg" ? "min-h-14 px-6 py-3.5 text-base" : "min-h-12 px-5 py-3 text-sm";
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

function BannerImage({ ad }: { ad: BannerAd }) {
  return (
    <>
      <a href={ad.href} rel="nofollow noopener noreferrer" target="_blank" className="block transition hover:opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ad.src} alt={ad.alt} width={ad.width} height={ad.height} className="h-auto max-w-full rounded-md" />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ad.pixel} width={1} height={1} alt="" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
    </>
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
    <div className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-8 text-slate-600">{children}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ecfdf5_0%,#f8fafc_72%,#ffffff_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-950">Tools</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-slate-950">Learn</Link>
          <span>/</span>
          <Link href="/learn?category=network" className="hover:text-slate-950">Network</Link>
          <span>/</span>
          <span>NordVPN vs ExpressVPN</span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge tone="slate">PR / 広告を含みます</Badge>
              <Badge tone="blue">{article.date} 確認</Badge>
              <Badge tone="amber">価格は公式確認</Badge>
            </div>
            <h1 className="text-[38px] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[52px]">
              NordVPN vs ExpressVPN
              <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                2026年版・ITエンジニア向け比較
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              「機能が多くて安いのはどっち？」「セキュリティが本当に強いのはどっち？」IT担当者の目線で、料金・プロトコル・サーバー安全性・追加機能を正直に比較します。
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <CtaButton href={NORD_URL} color="emerald" size="lg">NordVPN 公式を見る</CtaButton>
              <CtaButton href={EXPRESS_URL} color="blue" size="lg">ExpressVPN 公式を見る</CtaButton>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              ※ 本ページのリンクには広告（A8.net）を含みます。価格・プランは記事確認時点の情報です。最新条件は各公式サイトでご確認ください。
            </p>
          </div>

          <aside className="mx-auto w-full max-w-sm">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-950/10">
              <div className="mb-4 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                PR / 公式キャンペーン
              </div>
              <div className="space-y-5">
                <div>
                  <div className="mb-2 text-[10px] font-black uppercase tracking-wide text-emerald-700">NordVPN</div>
                  <div className="relative flex justify-center">
                    <BannerImage ad={nordBanner300x250} />
                  </div>
                  <a href={NORD_URL} rel="nofollow noopener noreferrer" target="_blank" className="mt-2 block text-center text-xs font-bold text-emerald-700 underline-offset-2 hover:underline">
                    公式サイトで詳細を見る →
                  </a>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="mb-2 text-[10px] font-black uppercase tracking-wide text-blue-700">ExpressVPN</div>
                  <div className="relative flex justify-center">
                    <BannerImage ad={expressBanner300x250} />
                  </div>
                  <a href={EXPRESS_URL} rel="nofollow noopener noreferrer" target="_blank" className="mt-2 block text-center text-xs font-bold text-blue-700 underline-offset-2 hover:underline">
                    公式サイトで詳細を見る →
                  </a>
                </div>
              </div>
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
        <SectionTitle eyebrow="3 sec summary" title="3秒でわかる結論" />
        <div className="grid gap-4 md:grid-cols-3">
          {tldr.map((item) => (
            <article key={item.no} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
              <div className="absolute right-5 top-5 text-5xl font-black text-emerald-100">{item.no}</div>
              <h3 className="relative text-lg font-black text-slate-950">{item.title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTableSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Compare" title="スペック全比較">
          価格・機能・セキュリティを一表にまとめました。項目ごとの優劣を確認してください。
        </SectionTitle>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-4 text-left text-[11px] font-black uppercase tracking-wide text-slate-400">項目</th>
                <th className="px-4 py-4 text-center text-[11px] font-black uppercase tracking-wide text-emerald-700">NordVPN</th>
                <th className="px-4 py-4 text-center text-[11px] font-black uppercase tracking-wide text-blue-700">ExpressVPN</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={row.label} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                  <td className="px-4 py-3.5 font-bold text-slate-700">{row.label}</td>
                  <td className="px-4 py-3.5 text-center text-slate-700">{row.nord}</td>
                  <td className="px-4 py-3.5 text-center text-slate-700">{row.express}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">円換算はおおよその目安（1USD≒155円）。為替・キャンペーンにより変動します。最新価格は各公式サイトでご確認ください。</p>
      </div>
    </section>
  );
}

function UseCaseSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Use cases" title="シナリオ別おすすめ">
          「どちらを選ぶか」を用途別に整理しました。
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => (
            <article key={uc.scenario} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-black ring-1 ${uc.recommend === "Nord" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : uc.recommend === "Express" ? "bg-blue-50 text-blue-700 ring-blue-200" : "bg-slate-100 text-slate-700 ring-slate-200"}`}>
                  {uc.recommend === "Nord" ? "NordVPN" : uc.recommend === "Express" ? "ExpressVPN" : "どちらでも"}
                </span>
              </div>
              <p className="mt-3 text-sm font-black leading-6 text-slate-950">{uc.scenario}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{uc.reason}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectionAxesSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Selection" title="VPNを選ぶ6つの判断軸">
          「安ければいい」だけでは選べません。セキュリティエンジニア目線で重要な判断軸を整理します。
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectionAxes.map((axis) => (
            <article key={axis.no} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-black tracking-tight text-emerald-700">{axis.no}</div>
              <h3 className="mt-3 text-lg font-black text-slate-950">{axis.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{axis.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,560px)] lg:items-center">
          <div>
            <Badge tone="emerald">30日返金保証あり</Badge>
            <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
              まず30日間試してから判断する
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              両社とも30日返金保証があります。申し込んで実際に速度・安定性・使い勝手を確かめてから継続か解約を判断するのが最もリスクのない選び方です。
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <CtaButton href={NORD_URL} color="emerald" size="lg">NordVPN を30日試す</CtaButton>
              <CtaButton href={EXPRESS_URL} color="blue" size="lg">ExpressVPN を30日試す</CtaButton>
            </div>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              PR / NordVPN 公式バナー
            </div>
            <div className="flex justify-center">
              <BannerImage ad={nordBanner936x120} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NordStrengthsSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="NordVPN" title="NordVPNの5つの強み" align="left">
          機能の多さと価格のバランスで選ぶなら、現状NordVPNが優位に立つ項目が多い。
        </SectionTitle>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {nordStrengths.map((s) => (
              <article key={s.title} className="flex h-full flex-col rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-base font-black text-white">✓</div>
                <h3 className="mt-5 text-lg font-black text-slate-950">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{s.body}</p>
              </article>
            ))}
          </div>
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
              <div className="mb-3 text-center text-[10px] font-black uppercase tracking-wide text-emerald-700">PR / NordVPN 公式</div>
              <div className="relative flex justify-center">
                <BannerImage ad={nordBanner300x250} />
              </div>
              <a href={NORD_URL} rel="nofollow noopener noreferrer" target="_blank" className="mt-3 block text-center text-xs font-bold text-emerald-700 underline-offset-2 hover:underline">
                公式サイトで詳細を見る →
              </a>
            </div>
            <div className="grid gap-2">
              <CtaButton href={NORD_URL} color="emerald" size="lg">NordVPN 公式を見る</CtaButton>
              <CtaButton href={NORD_URL} variant="outline" color="emerald">料金プランを確認</CtaButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ExpressStrengthsSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="ExpressVPN" title="ExpressVPNの5つの強み" align="left">
          ハードウェアレベルの安全性と、量子コンピュータ時代を見据えた暗号化で差別化している。
        </SectionTitle>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {expressStrengths.map((s) => (
              <article key={s.title} className="flex h-full flex-col rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-base font-black text-white">✓</div>
                <h3 className="mt-5 text-lg font-black text-slate-950">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{s.body}</p>
              </article>
            ))}
          </div>
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">
              <div className="mb-3 text-center text-[10px] font-black uppercase tracking-wide text-blue-700">PR / ExpressVPN 公式</div>
              <div className="relative flex justify-center">
                <BannerImage ad={expressBanner300x250} />
              </div>
              <a href={EXPRESS_URL} rel="nofollow noopener noreferrer" target="_blank" className="mt-3 block text-center text-xs font-bold text-blue-700 underline-offset-2 hover:underline">
                公式サイトで詳細を見る →
              </a>
            </div>
            <div className="grid gap-2">
              <CtaButton href={EXPRESS_URL} color="blue" size="lg">ExpressVPN 公式を見る</CtaButton>
              <CtaButton href={EXPRESS_URL} variant="outline" color="blue">料金プランを確認</CtaButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function PlanSection() {
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Plans" title="プラン・料金早見表">
          どちらも複数プランあり。まずはBasicプランで比較するのが現実的です。
        </SectionTitle>
        <div className="space-y-4">
          {planRows.map((row) => (
            <div key={row.label} className={`grid gap-4 rounded-2xl border p-5 lg:grid-cols-[120px_1fr_1fr] lg:items-center ${row.highlight ? "border-emerald-200 bg-white shadow-sm" : "border-slate-200 bg-white"}`}>
              <div className="flex items-center gap-3 lg:block">
                <div className="text-lg font-black text-slate-950">{row.label}</div>
                {row.highlight && <Badge tone="emerald">最初の選択肢</Badge>}
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="text-[10px] font-black uppercase tracking-wide text-emerald-700">NordVPN</div>
                <div className="mt-1 text-sm font-bold text-slate-950">{row.nordPrice}</div>
                <div className="mt-1 text-xs text-slate-600">{row.nordSpec}</div>
              </div>
              <div className="rounded-xl bg-blue-50 p-4">
                <div className="text-[10px] font-black uppercase tracking-wide text-blue-700">ExpressVPN</div>
                <div className="mt-1 text-sm font-bold text-slate-950">{row.expressPrice}</div>
                <div className="mt-1 text-xs text-slate-600">{row.expressSpec}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm leading-7 text-slate-600">
          上位プランの追加機能（パスワードマネージャー・クラウドストレージ・専用IPなど）は、VPN単体の比較には影響しません。まずBasicで試すのが合理的です。
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
          どちらに申し込む前も、この6点だけは確認してください。
        </SectionTitle>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">✓</span>
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
        <SectionTitle eyebrow="FAQ" title="よくある質問" />
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

function FinalDecision() {
  return (
    <section className="bg-slate-950 px-5 py-16 text-white sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-300">Final</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">最終結論</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">どちらも返金保証つきで試せる。迷うより試した方が早い。</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col rounded-3xl bg-emerald-900/40 p-6 ring-1 ring-emerald-700/40 sm:p-8">
            <div className="text-[10px] font-black uppercase tracking-wide text-emerald-300">NordVPN を選ぶなら</div>
            <h3 className="mt-2 text-xl font-black text-white">機能・価格・接続数のバランスで選ぶ</h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
              <li>✓ 2年プランで最安クラス（約530円/月〜）</li>
              <li>✓ 6,400+サーバー・10台同時接続</li>
              <li>✓ Double VPN・Threat Protectionが標準</li>
              <li>✓ セキュリティ機能を盛り込みたいなら第一候補</li>
            </ul>
            <div className="mt-5 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <div className="mb-2 text-center text-[10px] font-black uppercase tracking-wide text-emerald-300">PR / 公式バナー</div>
              <div className="relative flex justify-center">
                <BannerImage ad={nordBanner300x250} />
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <CtaButton href={NORD_URL} color="emerald" size="lg">NordVPN 公式を見る</CtaButton>
              <CtaButton href={NORD_URL} variant="outline" color="emerald">料金を確認</CtaButton>
            </div>
          </div>
          <div className="flex flex-col rounded-3xl bg-blue-900/40 p-6 ring-1 ring-blue-700/40 sm:p-8">
            <div className="text-[10px] font-black uppercase tracking-wide text-blue-300">ExpressVPN を選ぶなら</div>
            <h3 className="mt-2 text-xl font-black text-white">ハード安全性・耐量子暗号で選ぶ</h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
              <li>✓ TrustedServer（全RAM）でデータ非永続化</li>
              <li>✓ Lightway + Kyberで耐量子暗号対応済み</li>
              <li>✓ 105カ国以上・業界最古参の実績</li>
              <li>✓ 将来の量子コンピュータリスクまで考慮するなら</li>
            </ul>
            <div className="mt-5 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <div className="mb-2 text-center text-[10px] font-black uppercase tracking-wide text-blue-300">PR / 公式バナー</div>
              <div className="relative flex justify-center">
                <BannerImage ad={expressBanner300x250} />
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <CtaButton href={EXPRESS_URL} color="blue" size="lg">ExpressVPN 公式を見る</CtaButton>
              <CtaButton href={EXPRESS_URL} variant="outline" color="blue">料金を確認</CtaButton>
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
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-950">参考にした公式情報</h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          <li><a href="https://nordvpn.com/pricing/" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline-offset-2 hover:underline">NordVPN 公式料金ページ</a></li>
          <li><a href="https://nordvpn.com/blog/how-much-does-nordvpn-cost/" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline-offset-2 hover:underline">NordVPN プランと価格の公式解説</a></li>
          <li><a href="https://www.expressvpn.com/vpn-service" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline-offset-2 hover:underline">ExpressVPN 公式サービスページ</a></li>
          <li><a href="https://www.expressvpn.com/what-is-vpn/protocols/lightway" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline-offset-2 hover:underline">ExpressVPN Lightway プロトコル解説</a></li>
        </ul>
        <p className="mt-4">この記事は {article.date} 時点の公式情報を確認して作成しています。申し込み前には公式サイトで最新の価格・特典・契約条件を確認してください。</p>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: "/learn/network/vpn-basics", title: "VPNの仕組み — IPsec・WireGuard・プライバシー", eyebrow: "Network" },
    { href: "/learn/security/infostealer-session-hijacking", title: "インフォスティーラーとセッションCookie窃取", eyebrow: "Security" },
    { href: "/learn/security/device-code-phishing", title: "デバイスコードフィッシング — MFAを回避する手口", eyebrow: "Security" },
  ];
  return (
    <section className="bg-slate-50 px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xl font-black text-slate-950">関連して読む</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">{item.eyebrow}</div>
              <div className="mt-2 text-sm font-black text-slate-950">{item.title}</div>
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
      <ComparisonTableSection />
      <UseCaseSection />
      <SelectionAxesSection />
      <CtaBand />
      <NordStrengthsSection />
      <ExpressStrengthsSection />
      <PlanSection />
      <ChecklistSection />
      <FaqSection />
      <FinalDecision />
      <References />
      <RelatedLinks />

      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={NORD_PIXEL} width={1} height={1} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={EXPRESS_PIXEL} width={1} height={1} alt="" />
      </div>
    </div>
  );
}
