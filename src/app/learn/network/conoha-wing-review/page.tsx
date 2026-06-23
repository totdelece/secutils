import { PrReviewArticle, type PrReviewData } from "@/components/pr-review/PrReviewArticle";

/* =======================================================================
   ConoHa WING レビュー（PR記事）
   ・共通テンプレ PrReviewArticle にデータを渡すだけ。
   ・料金/スペック/機能は公式サイトで現行表示を一次情報として確認（2026年6月）。
     - WINGパック通常月額: ベーシック1,331 / スタンダード2,783 / プレミアム5,566円〜
     - 長期契約＋キャンペーンの実質最安: 678 / 2,118 / 4,235円〜（最大53%OFF）
     - SSD 300/400/500GB・メモリ8/12/16GB・vCPU6/8/10コア・初期費用0円
     - 独自ドメイン2つ永年無料・WordPressかんたんセットアップ/簡単移行
     - 無料独自SSL(Let's Encrypt)・自動バックアップ無料(1日1回/14日分)・転送量無制限
     - 高速化: LiteSpeed LSAPI / WEXAL® Page Speed Technology® など
   ・ConoHa は無料お試し期間が無い／キャンペーンの割引率・期限が時期で変わるため、
     断定せず「公式で最新を確認」に寄せている。サポート体制は機能ページに明記が無く非掲載。
   ======================================================================= */

// ---- A8 アフィリエイト素材（テキストリンク＋計測ピクセル）----------------
const CONOHA_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SKSCY";
const CONOHA_PIXEL = "https://www12.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SKSCY";

// ヒーロー用バナー（468×60・横長）
const bannerHero = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SPPTT",
  src: "https://www25.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035056000&mc=1",
  pixel: "https://www10.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SPPTT",
  width: 468,
  height: 60,
  alt: "ConoHa WING 公式",
};

// 料金後バナー（300×250）
const bannerMid = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SQ59D",
  src: "https://www26.a8.net/svt/bgt?aid=260508487641&wid=001&eno=01&mid=s00000000018035058000&mc=1",
  pixel: "https://www14.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SQ59D",
  width: 300,
  height: 250,
  alt: "ConoHa WING 公式",
};

const data: PrReviewData = {
  productName: "ConoHa WING",
  affiliateUrl: CONOHA_URL,
  impressionPixel: CONOHA_PIXEL,
  categoryBadges: ["レンタルサーバー", "2026年最新"],
  lastUpdated: "2026年6月",

  title: "ConoHa WINGの評判は？料金・速度・スペックを",
  titleAccent: "徹底検証",
  lead: "GMOインターネットグループが運営する高速レンタルサーバー「ConoHa WING」。LiteSpeed や WEXAL® Page Speed Technology® による高速化と、WordPressかんたんセットアップで申し込みと同時にブログを開設できる手軽さが人気です。WINGパックは通常月額1,331円〜（長期契約＋キャンペーンで実質678円〜）。初期費用無料・独自ドメイン2つ永年無料といったコスト面も、公式情報をもとに整理しました。",
  rating: { score: "4.6", note: "GMO運営の高速サーバー。最短でWordPressを始めたい初心者に人気" },
  ctaNote: "初期費用無料・独自ドメイン2つ永年無料",
  heroPoints: [
    "LiteSpeed ＋ WEXAL® による高速化で WordPress が快適",
    "WordPressかんたんセットアップで申し込みと同時に開設",
    "長期契約＋キャンペーンで実質678円〜（割引率・期限は時期により変動）",
  ],
  heroBanner: bannerHero,

  scoreBreakdown: [
    { label: "表示速度", score: 4.8 },
    { label: "スペック・容量", score: 4.7 },
    { label: "コスパ", score: 4.6 },
    { label: "使いやすさ", score: 4.7 },
    { label: "実績・安定性", score: 4.4 },
  ],

  specs: [
    { label: "編集部評価", value: "★4.6 / 5.0" },
    { label: "月額(税込)", value: "1,331円〜" },
    { label: "ストレージ", value: "SSD 300GB〜" },
    { label: "初期費用", value: "0円" },
    { label: "独自ドメイン", value: "2つ永年無料" },
  ],

  recommendedFor: [
    "表示速度の速いサーバーで WordPress を運営したい人",
    "申し込みと同時に最短でブログを開設したい初心者",
    "初期費用やドメイン費も込みでコストを抑えたい人",
    "管理画面が分かりやすいサーバーを使いたい人",
  ],

  overview: [
    { label: "運営会社", value: "GMOインターネットグループ株式会社" },
    { label: "料金形態", value: "WINGパック（長期割引型）" },
    { label: "月額（ベーシック）", value: "1,331円〜（長期契約＋キャンペーンで実質678円〜）" },
    { label: "初期費用", value: "0円" },
    { label: "ストレージ", value: "SSD 300GB〜500GB" },
    { label: "メモリ / vCPU", value: "8GB・6コア 〜 16GB・10コア" },
    { label: "転送量", value: "無制限" },
    { label: "無料独自SSL", value: "Let's Encrypt 対応（無料）" },
    { label: "自動バックアップ", value: "無料（1日1回・過去14日分）" },
    { label: "独自ドメイン", value: "2つ永年無料（WINGパック）" },
    { label: "WordPress", value: "かんたんセットアップ・簡単移行" },
    { label: "高速化", value: "LiteSpeed / WEXAL® Page Speed Technology®" },
  ],

  features: [
    { icon: "⚡", title: "LiteSpeed × WEXAL®で高速", desc: "LiteSpeed LSAPI や WEXAL® Page Speed Technology® などの高速化技術を採用。表示速度を重視する WordPress サイトに向いています。" },
    { icon: "🚀", title: "申し込みと同時に開設", desc: "WordPressかんたんセットアップで、サーバー・ドメイン・WordPress・SSLの設定をまとめて完了。最短でブログを始められます。" },
    { icon: "🌐", title: "独自ドメインが2つ永年無料", desc: "WINGパックなら対象ドメインを2つ、契約中ずっと無料で使えます。ドメインの更新費を継続的に節約できます。" },
    { icon: "🔁", title: "WordPress簡単移行", desc: "他社サーバーで使っている WordPress サイトを、手間をかけずに ConoHa WING へ移行できます。乗り換えにも向いています。" },
    { icon: "🔒", title: "無料SSL＆自動バックアップ", desc: "Let's Encrypt の無料独自SSLに対応し、1日1回・過去14日分の自動バックアップも無料。万一のときも復旧しやすい構成です。" },
    { icon: "♾️", title: "転送量無制限", desc: "転送量課金がなく、目安は無制限。アクセスが増えても転送量を気にせず運用できます。" },
  ],

  pros: [
    { title: "LiteSpeed × WEXAL®で高速", note: "高速化技術とオールSSD、潤沢なメモリ・vCPUにより、表示速度を求めるサイトに向く。" },
    { title: "申し込みと同時に WordPress 開設", note: "かんたんセットアップで初期構築が最短。初心者がつまずきやすい設定をまとめて自動化できる。" },
    { title: "独自ドメインが2つ永年無料", note: "WINGパック特典でドメイン更新費を継続的に節約でき、トータルコストを抑えやすい。" },
    { title: "自動バックアップ・転送量無制限", note: "1日1回・過去14日分の無料バックアップと転送量無制限で、運用面の安心感が高い。" },
    { title: "長期契約＋キャンペーンで実質678円〜", note: "WINGパックの長期割引にキャンペーンが重なると、人気サーバーを低コストで始められる（割引率・期限は変動）。" },
  ],

  cons: [
    { title: "無料お試し期間がない", note: "他社の一部サーバーと異なり、契約前に無料で試せる期間は用意されていない（2026年6月時点）。WINGパックは長期前払いのため、プランは申し込み前にしっかり検討を。" },
    { title: "最安値は長期契約＋キャンペーンが前提", note: "実質678円〜は36ヶ月のWINGパック＋キャンペーン適用時の価格。短期や通常料金では月単価が上がるため、契約期間と割引率・期限は要確認。" },
    { title: "キャンペーンで料金が変動しやすい", note: "ConoHa は時期によってキャンペーン内容・割引率・期限が変わる。申し込み時点の最新の料金を公式で必ず確認したい。" },
  ],

  campaign: {
    title: "長期契約＋キャンペーンで最大53%OFF",
    body: "WINGパックは契約期間が長いほど月額が安くなり、随時開催のキャンペーンと合わせるとベーシックが実質678円〜（最大53%OFF）に。割引率・適用条件・期限は時期により変わるため、最新の内容は公式サイトでご確認ください。",
  },

  plans: [
    { name: "ベーシック", price: "1,331", per: "月〜", note: "長期契約＋キャンペーンで実質678円〜／SSD 300GB・メモリ8GB・6コア／個人ブログの定番", popular: true, badge: "オススメ" },
    { name: "スタンダード", price: "2,783", per: "月〜", note: "実質2,118円〜／SSD 400GB・メモリ12GB・8コア" },
    { name: "プレミアム", price: "5,566", per: "月〜", note: "実質4,235円〜／SSD 500GB・メモリ16GB・10コア" },
  ],
  midBanner: bannerMid,

  useCases: [
    { icon: "🖊️", title: "WordPressブログ", text: "個人ブログやアフィリエイトサイトを、かんたんセットアップで最短に立ち上げたい人に。" },
    { icon: "🏢", title: "企業・店舗サイト", text: "高速化技術と潤沢なリソースで、会社やお店の公式サイトを快適に表示したい場合に。" },
    { icon: "🔁", title: "他社からの乗り換え", text: "WordPress簡単移行で、今使っているサーバーから手間をかけずに引っ越したい人に。" },
  ],

  faqs: [
    { q: "ConoHa WINGは初心者でも使えますか？", a: "WordPressかんたんセットアップで、サーバー・ドメイン・WordPress・SSLの初期設定をまとめて完了できるため、初心者でも申し込みと同時にブログを始めやすいサーバーです。" },
    { q: "無料お試し期間はありますか？", a: "2026年6月時点では、契約前に無料で試せるお試し期間は用意されていません。WINGパックは長期契約での前払い型のため、申し込み前にプランを検討するのがおすすめです（最新の条件は公式サイトでご確認ください）。" },
    { q: "今お得なキャンペーンはありますか？", a: "ConoHa WINGは時期に応じてキャンペーンを実施しており、長期契約と合わせるとベーシックが実質678円〜（最大53%OFF）になることがあります。割引率・期限は変わるため、最新は公式サイトでご確認ください。" },
    { q: "独自ドメインは無料ですか？", a: "WINGパックなら対象の独自ドメインが最大2つ「永年無料」で使えます。第1ドメインと第2ドメインで選べるTLDが異なります。" },
    { q: "料金はいくらから？", a: "WINGパック ベーシックが通常月額1,331円〜です。長期契約＋キャンペーンを適用すると実質678円〜になります。プラン・契約期間・キャンペーンで変わるため、最新の料金は公式サイトでご確認ください。" },
  ],

  finalRating: {
    score: "4.6",
    metrics: [
      { label: "おすすめ度", value: "★4.6" },
      { label: "月額(税込)", value: "1,331円〜" },
      { label: "自動バックアップ", value: "無料" },
      { label: "独自ドメイン", value: "2つ無料" },
    ],
    summary: (
      <>
        GMO運営の高速性と、WordPressかんたんセットアップによる手軽さを両立した人気のレンタルサーバーです。通常月額1,331円〜（長期契約＋キャンペーンで実質678円〜）で、初期費用無料・独自ドメイン2つ永年無料・転送量無制限とコスト面も充実。
        <strong className="font-bold text-[#1f2937]">最短でWordPressを始めたい初心者</strong>から、高速サーバーへ乗り換えたい人まで選びやすい王道の選択肢です。
      </>
    ),
  },

  references: [
    { label: "ConoHa WING 公式サイト（料金・スペック）", href: "https://www.conoha.jp/wing/" },
    { label: "ConoHa WING 機能一覧（公式）", href: "https://www.conoha.jp/wing/function/" },
    { label: "運営：GMOインターネットグループ株式会社", href: "https://www.gmo.jp/" },
  ],
};

export default function Page() {
  return (
    <main>
      <PrReviewArticle data={data} />
    </main>
  );
}
