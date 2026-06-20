import { PrReviewArticle, type PrReviewData } from "@/components/pr-review/PrReviewArticle";

/* =======================================================================
   XServer VPS レビュー（PR記事）
   ・共通テンプレ PrReviewArticle にデータを渡すだけ。
   ・料金/スペックは公式(vps.xserver.ne.jp)とstreamrental等で裏取り（2026年6月）。
     「36ヶ月通常月額」と「キャンペーン割引(〜2026/9/3)」を区別。断定せず公式確認に寄せる。
   ・VPSは有料プランに無料お試しが無い点・サーバー管理が自己責任な点を正直に明記。
   ======================================================================= */

// ---- A8 アフィリエイト素材（テキストリンク＋計測ピクセル）----------------
const VPS_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25EKCY";
const VPS_PIXEL = "https://www13.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25EKCY";

// 横長バナー（PCヒーロー用 468×60）
const banner468 = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25HCO1",
  src: "https://www27.a8.net/svt/bgt?aid=260508487735&wid=001&eno=01&mid=s00000001642013014000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25HCO1",
  width: 468,
  height: 60,
  alt: "XServer VPS 公式",
};

// スマホ用バナー（320×50）
const banner320 = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25H4Y9",
  src: "https://www20.a8.net/svt/bgt?aid=260508487735&wid=001&eno=01&mid=s00000001642013013000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25H4Y9",
  width: 320,
  height: 50,
  alt: "XServer VPS 公式",
};

// 正方形バナー（料金後 300×250）
const banner300 = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25GX8H",
  src: "https://www24.a8.net/svt/bgt?aid=260508487735&wid=001&eno=01&mid=s00000001642013012000&mc=1",
  pixel: "https://www18.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25GX8H",
  width: 300,
  height: 250,
  alt: "XServer VPS 公式",
};

const data: PrReviewData = {
  productName: "XServer VPS",
  affiliateUrl: VPS_URL,
  impressionPixel: VPS_PIXEL,
  categoryBadges: ["VPS / 仮想専用サーバー", "2026年最新"],
  lastUpdated: "2026年6月",

  title: "XServer VPSの評判は？料金・スペック・使い道を",
  titleAccent: "徹底検証",
  lead: "国内大手エックスサーバーが手がける仮想専用サーバー XServer VPS。ハイエンドCPU「AMD EPYC」とNVMe SSDを採用し、月額990円〜（36ヶ月）でゲームサーバーやWordPress、AI開発基盤まで構築できます。初期費用0円、root権限で自由にカスタマイズできる本格VPSです。",
  rating: { score: "4.4", note: "AMD EPYC × NVMe SSD の高性能VPS" },
  ctaNote: "初期費用0円・月額990円〜（36ヶ月）",
  heroPoints: [
    "ハイエンドCPU AMD EPYC × NVMe SSD で高性能",
    "Minecraft・Docker・WordPress などテンプレで簡単構築",
    "月額990円〜（36ヶ月）・初期費用0円・root権限で自由",
  ],
  heroBanner: banner468,
  heroBannerMobile: banner320,

  scoreBreakdown: [
    { label: "処理性能", score: 4.7 },
    { label: "自由度・拡張性", score: 4.6 },
    { label: "コスパ", score: 4.5 },
    { label: "実績・安定性", score: 4.3 },
    { label: "使いやすさ", score: 4.1 },
  ],

  specs: [
    { label: "編集部評価", value: "★4.4 / 5.0" },
    { label: "月額(税込)", value: "990円〜" },
    { label: "CPU", value: "AMD EPYC" },
    { label: "ストレージ", value: "NVMe SSD" },
    { label: "初期費用", value: "0円" },
  ],

  recommendedFor: [
    "Minecraft などのゲームサーバーを自分で立てたい人",
    "Docker・AI環境などを自由にカスタマイズしたい人",
    "高性能なVPSをコスパよく使いたい人",
  ],

  overview: [
    { label: "運営会社", value: "エックスサーバー株式会社" },
    { label: "月額（2GB）", value: "990円〜（36ヶ月契約時／キャンペーンで792円〜）" },
    { label: "初期費用", value: "0円" },
    { label: "CPU", value: "AMD EPYC（高性能）" },
    { label: "ストレージ", value: "全プラン NVMe SSD" },
    { label: "OS・テンプレ", value: "Linux各種・WordPress・Docker・Minecraft・Windows Server 等" },
    { label: "権限", value: "root権限あり" },
    { label: "サポート", value: "電話・メール（無料）" },
    { label: "契約期間", value: "1ヶ月〜（長期ほど割安）" },
  ],

  features: [
    { icon: "⚡", title: "ハイエンドCPU AMD EPYC", desc: "高性能な AMD EPYC を採用。CPU性能を要する処理も快適にこなせます。" },
    { icon: "💾", title: "全プラン NVMe SSD", desc: "高速な NVMe SSD で、読み書きの速いストレージ環境を利用できます。" },
    { icon: "🎮", title: "ゲームサーバーが簡単", desc: "Minecraft などのテンプレートが用意され、数クリックでゲームサーバーを構築できます。" },
    { icon: "🐳", title: "Docker・AIテンプレも豊富", desc: "Docker や AI 関連ツールのテンプレートで、開発環境をすぐ用意できます。" },
    { icon: "🔧", title: "root権限で自由に構築", desc: "root権限が使え、OS やミドルウェアを自由に設定・運用できます。" },
    { icon: "🏢", title: "運営・サポートが無料", desc: "国内大手エックスサーバー株式会社が運営。電話・メールサポートも無料で利用できます。" },
  ],

  pros: [
    { title: "AMD EPYC × NVMe SSD で高性能", note: "ハイエンドCPUと高速ストレージで、ゲームや開発用途でも快適に動かせる。" },
    { title: "月額990円〜のコスパ", note: "高性能VPSとしては手頃な価格帯。長期契約やキャンペーンでさらに安くなる。" },
    { title: "テンプレで構築が簡単", note: "Minecraft・Docker・WordPress 等のテンプレで、面倒な初期構築を省ける。" },
    { title: "初期費用0円・1ヶ月から", note: "初期費用がかからず、まずは1ヶ月単位で試すこともできる。" },
  ],

  cons: [
    { title: "VPSは初心者にはやや難しい", note: "共有レンタルサーバーと違い、OS・セキュリティ設定などサーバー管理を自分で行う必要がある。" },
    { title: "有料プランに無料お試しはない", note: "共有サーバーのような10日間お試しはなし。ただし1ヶ月単位で契約できる。" },
    { title: "安い価格は長期契約＋キャンペーンが前提", note: "月額990円〜は36ヶ月契約時。短期や通常時は月単価が上がるため、契約期間・キャンペーン期限は要確認。" },
  ],

  campaign: {
    title: "割引キャンペーン実施中（2GB 月792円〜）",
    body: "対象期間中、料金が割引に（2GBプランで月792円〜など）。割引率・対象プラン・最新の価格は公式サイトでご確認ください。",
    deadline: "2026年9月3日",
  },

  plans: [
    { name: "2GB", price: "990", per: "月〜", note: "キャンペーンで792円〜／3vCPU・NVMe50GB・小規模サイト/個人開発向け" },
    { name: "6GB", price: "1,700", per: "月〜", note: "キャンペーンで1,359円〜／4vCPU・NVMe150GB・中規模サイト/アクセス増向け", popular: true, badge: "おすすめ" },
    { name: "12GB", price: "3,201", per: "月〜", note: "キャンペーンで2,560円〜／6vCPU・NVMe400GB・大規模/高負荷アプリ向け" },
  ],
  midBanner: banner300,

  useCases: [
    { icon: "🎮", title: "ゲームサーバー", text: "Minecraft やその他ゲームのマルチサーバーを、テンプレートから手軽に構築できます。" },
    { icon: "🐳", title: "開発・検証環境", text: "Docker やデータベースを動かす開発・検証用サーバーとして自由に使えます。" },
    { icon: "🤖", title: "AI・自動化基盤", text: "AI 関連ツールや自動化（n8n 等）の実行基盤としても活用できます。" },
  ],

  faqs: [
    { q: "レンタルサーバーとVPSの違いは？", a: "共有レンタルサーバーは手軽な反面カスタマイズに制限があります。VPSは root権限で自由に環境を構築できる代わりに、サーバー管理を自分で行う必要があります。自由度を求めるなら VPS が向いています。" },
    { q: "初心者でも使えますか？", a: "OS やセキュリティの設定を自分で行うため、共有サーバーよりは難易度が上がります。ただし Minecraft や WordPress 等のテンプレートを使えば、初期構築は大幅に簡単になります。" },
    { q: "無料お試しはありますか？", a: "有料プランの無料お試し期間はありません。ただし1ヶ月単位での契約が可能なので、まずは短期間から試せます（最新の契約条件は公式サイトでご確認ください）。" },
    { q: "どんな用途に使えますか？", a: "Minecraft 等のゲームサーバー、WordPress、Docker 開発環境、AI・自動化の実行基盤など、幅広い用途に対応します。" },
    { q: "料金はいくらから？", a: "2GBプランが月額990円〜（36ヶ月契約時）です。期間限定の割引キャンペーンでさらに安くなる場合があります。プランや契約期間で変わるため、最新の料金は公式サイトでご確認ください。" },
  ],

  finalRating: {
    score: "4.4",
    metrics: [
      { label: "おすすめ度", value: "★4.4" },
      { label: "月額(税込)", value: "990円〜" },
      { label: "CPU", value: "AMD EPYC" },
      { label: "ストレージ", value: "NVMe SSD" },
    ],
    summary: (
      <>
        AMD EPYC × NVMe SSD による高い性能を、月額990円〜（36ヶ月）から使える本格VPSです。Minecraft や Docker などの
        <strong className="font-bold text-[#1f2937]">テンプレートで構築の手間も抑えられる</strong>ので、root権限で自由にカスタマイズしたい人や、ゲームサーバー・開発基盤を求める人に向いた選択肢です。
      </>
    ),
  },

  references: [
    { label: "XServer VPS 公式サイト（料金・スペック）", href: "https://vps.xserver.ne.jp/" },
    { label: "運営：エックスサーバー株式会社", href: "https://www.xserver.co.jp/" },
  ],
};

export default function Page() {
  return (
    <main>
      <PrReviewArticle data={data} />
    </main>
  );
}
