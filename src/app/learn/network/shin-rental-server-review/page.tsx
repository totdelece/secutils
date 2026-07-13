import { PrReviewArticle, type PrReviewData } from "@/components/pr-review/PrReviewArticle";

/* =======================================================================
   シンレンタルサーバー レビュー（PR記事）
   ・共通テンプレ PrReviewArticle にデータを渡すだけ。
   ・料金/スペックは公式(shin-server.jp)の現行表示を一次情報として確認（2026年7月再取得）。
     旧「キャッシュバックで実質539円〜」のキャンペーンは終了し、現行は直接割引
     （ベーシック20%OFF=862円、スタンダード/プレミアム30%OFF=1,401/2,802円）に変化。
     割引は時期により内容・期限が変動するため、固定の期限日は書かず
     公式確認に寄せている（evergreen化）。割引額は2026年7月時点の例。
   ======================================================================= */

// ---- A8 アフィリエイト素材（テキストリンク＋計測ピクセル）----------------
const SHIN_URL = "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+5YZ76";
const SHIN_PIXEL = "https://www10.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+5YZ76";

// 横長バナー（PCヒーロー用 468×60）
const banner468 = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+601S1",
  src: "https://www24.a8.net/svt/bgt?aid=260619861813&wid=001&eno=01&mid=s00000025450001008000&mc=1",
  pixel: "https://www15.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+601S1",
  width: 468,
  height: 60,
  alt: "シンレンタルサーバー 公式",
};

// スマホ用バナー（320×50）
const banner320 = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+614CX",
  src: "https://www29.a8.net/svt/bgt?aid=260619861813&wid=001&eno=01&mid=s00000025450001013000&mc=1",
  pixel: "https://www14.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+614CX",
  width: 320,
  height: 50,
  alt: "シンレンタルサーバー 公式",
};

// 正方形バナー（料金後 300×250）
const banner300 = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+609HT",
  src: "https://www25.a8.net/svt/bgt?aid=260619861813&wid=001&eno=01&mid=s00000025450001009000&mc=1",
  pixel: "https://www11.a8.net/0.gif?a8mat=4B5ZKL+DG1FLE+5GDG+609HT",
  width: 300,
  height: 250,
  alt: "シンレンタルサーバー 公式",
};

const data: PrReviewData = {
  productName: "シンレンタルサーバー",
  affiliateUrl: SHIN_URL,
  impressionPixel: SHIN_PIXEL,
  categoryBadges: ["レンタルサーバー", "2026年最新"],
  lastUpdated: "2026年7月",

  title: "シンレンタルサーバーの評判は？料金・速度・スペックを",
  titleAccent: "徹底検証",
  lead: "「エックスサーバーの新世代版」として登場したシンレンタルサーバー。NVMe SSD による高速性と、月額1,078円〜（割引キャンペーンで862円〜の例）という料金のバランスを、公式スペックをもとに整理しました。10日間の無料お試しがあるので、まずはノーリスクで使用感を確かめられます。",
  rating: { score: "4.5", note: "エックスサーバーの技術を継ぐ新世代レンタルサーバー" },
  ctaNote: "10日間の無料お試しつき・初期費用0円",
  // 10日間の無料お試しが実在するため"無料"文言のCTAを明示指定
  secondaryCtaLabel: "今すぐ無料で試してみる",
  heroPoints: [
    "全プラン NVMe SSD 採用で表示・処理が高速",
    "独自ドメインが永年無料（.com / .net など）",
    "月額1,078円〜・割引キャンペーンで862円〜の例（時期により変動）",
  ],
  heroBanner: banner468,
  heroBannerMobile: banner320,

  scoreBreakdown: [
    { label: "表示速度", score: 4.7 },
    { label: "スペック・容量", score: 4.6 },
    { label: "コスパ", score: 4.5 },
    { label: "使いやすさ", score: 4.4 },
    { label: "実績・安定性", score: 4.3 },
  ],

  specs: [
    { label: "編集部評価", value: "★4.5 / 5.0" },
    { label: "月額(税込)", value: "1,078円〜" },
    { label: "ストレージ", value: "NVMe SSD 700GB〜" },
    { label: "無料お試し", value: "10日間" },
    { label: "独自ドメイン", value: "永年無料" },
  ],

  recommendedFor: [
    "表示速度の速いサーバーで WordPress を運営したい人",
    "独自ドメインの費用も含めてコストを抑えたい人",
    "電話・メールのサポートがあると安心な人",
  ],

  overview: [
    { label: "運営会社", value: "エックスサーバー株式会社" },
    { label: "月額（ベーシック）", value: "1,078円〜（割引キャンペーンで862円〜の例）" },
    { label: "初期費用", value: "0円" },
    { label: "無料お試し", value: "10日間" },
    { label: "ストレージ", value: "NVMe SSD 700GB〜1,200GB" },
    { label: "サポート", value: "電話・メール対応" },
    { label: "独自ドメイン", value: "永年無料（.com / .net など）" },
    { label: "WordPress", value: "簡単インストール対応" },
  ],

  features: [
    { icon: "⚡", title: "NVMe SSD × 高速サーバー", desc: "全プランで高速な NVMe SSD を採用。表示速度を重視するサイトに向いています。" },
    { icon: "🌐", title: "独自ドメインが永年無料", desc: ".com / .net などの対象ドメインを、契約中ずっと無料で使えます。" },
    { icon: "🔧", title: "WordPress をすぐ始められる", desc: "簡単インストール機能で、数クリックで WordPress サイトを立ち上げられます。" },
    { icon: "🎨", title: "有料テーマ Xwrite が無料", desc: "スタンダード以上なら、通常9,900円/年の有料 WordPress テーマ「Xwrite」を無料で使えます。" },
    { icon: "📞", title: "電話・メールサポート", desc: "全プランで電話・メールのサポートに対応。困ったときに相談できます。" },
    { icon: "🏢", title: "エックスサーバーが運営", desc: "国内大手エックスサーバー株式会社が運営。運用ノウハウを受け継ぐ新世代サービスです。" },
  ],

  pros: [
    { title: "NVMe SSD で高速", note: "高速ストレージと十分な vCPU・メモリで、表示速度を求めるサイトに向く。" },
    { title: "独自ドメインが永年無料", note: "ドメイン更新費を継続的に節約でき、トータルコストを抑えやすい。" },
    { title: "割引キャンペーンで862円〜の例", note: "36ヶ月契約＋期間限定の割引キャンペーンなら、個人ブログを低コストで始められる。" },
    { title: "電話・メールサポートつき", note: "全プランでサポートに対応。初めてのサーバーでも相談しながら使える。" },
  ],

  cons: [
    { title: "安い価格は長期契約＋キャンペーンが前提", note: "月額1,078円〜は36ヶ月契約時の価格、862円〜はキャンペーン適用時の例。短期契約や通常時は月単価が上がるため、契約期間・キャンペーン期限は要確認。" },
    { title: "1ヶ月だけの利用には不向き", note: "最低契約期間があり、月単位の細かい支払いはできない。お試し期間で見極めを。" },
    { title: "サービス自体は新しめ", note: "エックスサーバー本体に比べ運用実績は浅い。長期の安定性は無料お試しで確認するのがおすすめ。" },
  ],

  campaign: {
    title: "利用料金 最大30%OFFキャンペーン",
    body: "対象プランが割引価格に（ベーシック862円〜＝20%OFF、スタンダード1,401円〜・プレミアム2,802円〜＝30%OFF。2026年7月時点の例）。実施時期・割引率・期限は変動するため、適用条件と最新の料金は公式サイトでご確認ください。",
  },

  plans: [
    { name: "ベーシック", price: "1,078", per: "月〜", note: "割引時862円〜の例／SSD 700GB・メモリ8GB・vCPU6" },
    { name: "スタンダード", price: "2,002", per: "月〜", note: "割引時1,401円〜の例／SSD 1,000GB・メモリ12GB・vCPU8／有料テーマXwrite無料", popular: true, badge: "オススメ" },
    { name: "プレミアム", price: "4,004", per: "月〜", note: "割引時2,802円〜の例／SSD 1,200GB・メモリ16GB・vCPU10／Xwrite無料" },
  ],
  midBanner: banner300,

  useCases: [
    { icon: "🖊️", title: "WordPressブログ", text: "個人ブログやアフィリエイトサイトを、簡単インストールで手早く立ち上げたい人に。" },
    { icon: "🏢", title: "コーポレートサイト", text: "NVMe SSD の表示速度で、企業サイトやLPを快適に表示したい場合に。" },
    { icon: "📈", title: "成長するメディア", text: "上位プランの大容量SSD・メモリで、アクセスが増えるメディアやECにも対応。" },
  ],

  faqs: [
    { q: "エックスサーバーと何が違うの？", a: "シンレンタルサーバーはエックスサーバー株式会社が運営する新世代向けのサービスです。NVMe SSD など新しい構成を採用しつつ、料金を抑えやすいのが特徴です。詳細な機能差は公式サイトで比較できます。" },
    { q: "無料お試しはありますか？", a: "10日間の無料お試しが用意されています。契約前に管理画面やサーバーの挙動を確認できます（最新の条件は公式サイトでご確認ください）。" },
    { q: "独自ドメインは無料ですか？", a: "対象の独自ドメイン（.com / .net など）が契約中ずっと無料になる「永年無料」特典があります。" },
    { q: "WordPressは簡単に始められますか？", a: "簡単インストール機能があり、数クリックで WordPress をセットアップできます。スタンダード以上なら有料テーマ「Xwrite」も無料で使えます。" },
    { q: "料金はいくらから？", a: "ベーシックプランが月額1,078円〜（36ヶ月契約時）です。さらに期間限定の割引キャンペーンで862円〜になる例があります。プランや契約期間・キャンペーンで変わるため、最新の料金は公式サイトでご確認ください。" },
  ],

  finalRating: {
    score: "4.5",
    metrics: [
      { label: "おすすめ度", value: "★4.5" },
      { label: "月額(税込)", value: "1,078円〜" },
      { label: "無料お試し", value: "10日間" },
      { label: "ストレージ", value: "NVMe SSD" },
    ],
    summary: (
      <>
        NVMe SSD による速度と、独自ドメイン永年無料・月額1,078円〜（割引キャンペーンで862円〜の例）というコストのバランスが取れた新世代レンタルサーバーです。
        <strong className="font-bold text-[#1f2937]">10日間の無料お試し</strong>で実際の使い勝手を確かめてから始められるので、最初の1台としても検討しやすい選択肢です。
      </>
    ),
  },

  references: [
    { label: "シンレンタルサーバー 公式サイト（料金・スペック）", href: "https://www.shin-server.jp/" },
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
