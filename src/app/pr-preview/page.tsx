import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrReviewArticle, type PrReviewData } from "@/components/pr-review/PrReviewArticle";

// プレビュー専用（noindex）。本番コンテンツではないので検索結果に出さない。
export const metadata: Metadata = {
  title: "PR記事テンプレート プレビュー",
  robots: { index: false, follow: false },
};

/* =======================================================================
   PR記事 共通テンプレート — 視覚チェック用プレビュー
   ・実体は src/components/pr-review/PrReviewArticle.tsx（再利用コンポーネント）。
   ・ここは「ダミーデータを流し込んで見た目を確認する」だけの薄いページ。
   ・新しいPR記事を作るときは、この SAMPLE と同じ形のデータを用意して
       <PrReviewArticle data={...} /> を本番ページで描画するだけでよい。
   ======================================================================= */

const SAMPLE: PrReviewData = {
  productName: "サンプルVPN",
  affiliateUrl: "#", // 本番ではアフィリエイトURLに差し替え
  categoryBadges: ["VPN徹底レビュー", "2026年最新"],
  lastUpdated: "2026年6月",

  title: "サンプルVPNの評判は？ 実際に使ってわかった",
  titleAccent: "メリット・デメリット",
  lead: "「本当に速い？」「初心者でも使える？」——気になるポイントを、実際の使用感をもとにわかりやすくまとめました。30日間の返金保証つきなので、まずはノーリスクで試せます。",
  rating: { score: "4.8", note: "利用者1,400万人が選ぶ定番VPN" },
  ctaNote: "30日間返金保証つき・登録は最短2分",
  heroPoints: [
    "AES-256暗号化＋ノーログで通信を保護",
    "2年プランなら月480円台のコスパ",
    "1契約で最大10台・最短2分で使い始められる",
  ],
  heroBanner: null,

  scoreBreakdown: [
    { label: "通信速度", score: 4.7 },
    { label: "安全性", score: 4.9 },
    { label: "コスパ", score: 4.6 },
    { label: "使いやすさ", score: 4.8 },
    { label: "サポート", score: 4.5 },
  ],

  campaign: {
    title: "今なら2年プランが最大72%OFF＋3カ月延長",
    body: "公式サイト限定の割引キャンペーン実施中。適用条件と期限は公式サイトでご確認ください。",
    deadline: "2026年6月末",
  },

  references: [
    { label: "サンプルVPN 公式サイト（料金・機能）", href: "#" },
    { label: "第三者監査レポート（ノーログポリシー）", href: "#" },
  ],

  specs: [
    { label: "おすすめ度", value: "★★★★★ 4.8" },
    { label: "利用者数", value: "1,400万人" },
    { label: "料金", value: "月480円〜" },
    { label: "対応OS", value: "Win/Mac/iOS/Android" },
    { label: "返金保証", value: "30日間" },
  ],

  recommendedFor: ["初心者でも迷わず使いたい人", "通信速度を重視する人", "コスパよく始めたい人"],

  overview: [
    { label: "総合評価", value: "★★★★★ 4.8" },
    { label: "月額料金", value: "480円〜（2年プラン）" },
    { label: "利用者数", value: "1,400万人" },
    { label: "返金保証", value: "30日間 全額返金" },
    { label: "対応OS", value: "Win / Mac / iOS / Android" },
    { label: "同時接続台数", value: "最大10台" },
  ],

  features: [
    { icon: "🛡️", title: "軍用級の暗号化", desc: "AES-256で通信を保護。公衆Wi-Fiでも安心。" },
    { icon: "⚡", title: "業界トップクラスの速度", desc: "4K動画もカクつかない高速サーバー。" },
    { icon: "🌍", title: "世界60カ国に対応", desc: "5,000以上のサーバーから自由に選べる。" },
    { icon: "🔐", title: "ノーログポリシー", desc: "通信履歴を一切記録しない第三者監査済み。" },
  ],

  pros: [
    { title: "通信速度が速い", note: "動画も4Kでカクつかない" },
    { title: "設定が簡単", note: "アプリを入れてボタン1つで接続" },
    { title: "コスパが良い", note: "2年プランなら月480円台" },
    { title: "同時接続が多い", note: "1契約で最大10台までOK" },
  ],

  cons: [
    { title: "料金は最安ではない", note: "ただし速度と安定性を考えると妥当な価格" },
    { title: "短期プランは割高", note: "ただし2年プランなら大幅に安くなる" },
    { title: "稀に混雑する時間帯がある", note: "ただしサーバー切替で即解消できる" },
  ],

  plans: [
    { name: "1カ月プラン", price: "1,480", per: "月", note: "まずお試ししたい人向け", popular: false },
    { name: "2年プラン", price: "480", per: "月", note: "実質最安・人気No.1", popular: true },
    { name: "1年プラン", price: "780", per: "月", note: "バランス重視", popular: false },
  ],

  useCases: [
    { icon: "🏠", title: "在宅勤務・公衆Wi-Fi", text: "カフェやコワーキングの無料Wi-Fiでも通信を暗号化し、情報漏えいリスクを下げられます。" },
    { icon: "✈️", title: "海外・出張先から", text: "海外からでも普段どおりのサーバーに接続。地域制限のある国でも安定して使えます。" },
    { icon: "🎬", title: "動画・ストリーミング", text: "高速サーバーで4K動画もバッファなし。複数端末の同時視聴も快適です。" },
  ],

  faqs: [
    { q: "本当に安全に使えますか？", a: "AES-256暗号化とノーログポリシーを採用し、第三者監査も受けています。公衆Wi-Fiでの利用でも通信が保護されます。" },
    { q: "解約はいつでもできますか？", a: "はい。マイページからいつでも解約できます。30日間の返金保証があるため、合わなければ全額返金されます。" },
    { q: "スマホでも使えますか？", a: "iOS / Android 専用アプリがあり、1契約で最大10台まで同時接続できます。" },
    { q: "通信速度は遅くなりませんか？", a: "高速サーバーを多数備えており、体感の速度低下はほとんどありません。混雑時はサーバー切替で改善できます。" },
    { q: "支払い方法は何がありますか？", a: "クレジットカード・各種オンライン決済に対応しています。" },
  ],

  finalRating: {
    score: "4.8",
    metrics: [
      { label: "おすすめ度", value: "★ 4.8" },
      { label: "返金保証", value: "30日間" },
      { label: "利用者数", value: "1,400万" },
      { label: "同時接続", value: "10台" },
    ],
    summary: (
      <>
        速度・安全性・コスパのバランスが優秀で、VPN初心者の最初の1本として自信を持っておすすめできます。
        <strong className="font-bold text-[#1f2937]">30日間の全額返金保証</strong>があるので、まずはノーリスクで試せます。
      </>
    ),
  },
};

export default function Page() {
  // 本番（Vercel/secutils.jp）では存在しないページとして 404 を返す。
  // これはローカル確認専用のデモ。noindex だけでは直URLアクセスで見えてしまうため、
  // 本番ビルドでは notFound() でルートごと封じる（ローカル npm run dev のみ表示）。
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* プレビュー注記バー（このページ限定。本番記事には出ない） */}
      <div className="bg-amber-100 py-2 text-center text-xs text-amber-900">
        ⚙️ これは PR記事テンプレートのプレビューです（中身はダミー・noindex・本番では404）
      </div>

      <PrReviewArticle data={SAMPLE} preview />
    </div>
  );
}
