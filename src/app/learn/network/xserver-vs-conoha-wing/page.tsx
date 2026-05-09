import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import {
  BannerSlot,
  CampaignBox,
  ComparisonTable,
  ConclusionBox,
  CtaButton,
  ProsConsList,
  ScenarioCard,
  ScenarioGrid,
} from "../../_components/AffiliateComponents";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "xserver-vs-conoha-wing")!;

const XSERVER_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+61JSI";
const CONOHA_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+ALMVJM+50+5SKSCY";
const XSERVER_VPS_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C5LMEQ+CO4+25EKCY";
const XSERVER_DOMAIN_URL =
  "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C3TBLE+CO4+15ORS2";

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>結論を先に: 迷ったら3パターンで決まる</h2>
      <p>
        個人ブログ・副業サイト・ポートフォリオ・小規模ビジネスサイトの用途で、エックスサーバーと ConoHa WING のどちらを選ぶかは、実は<strong>vCPU 6コア / メモリ 8GB という基本構成が共通する</strong>同士の比較になります。性能差はほぼ誤差。決め手は<strong>「あなたが何を重視するか」</strong>です（SSD容量はエックスサーバーが500GB、ConoHa WINGが300GBで、この点はエックスサーバーに分があります）。
      </p>

      <ConclusionBox title="🎯 タイプ別の結論（最初にこれだけ）">
        <ScenarioGrid>
          <ScenarioCard
            badge="初心者向け"
            title="Type A"
            recommended="ConoHa WING"
            cta={
              <CtaButton href={CONOHA_URL} size="sm">
                ConoHa WING を見る →
              </CtaButton>
            }
          >
            <p>
              <strong>初めてサーバー契約する人</strong>に最適。管理画面が1画面で完結し、迷いません。
            </p>
          </ScenarioCard>
          <ScenarioCard
            badge="長期重視"
            title="Type B"
            recommended="エックスサーバー"
            cta={
              <CtaButton href={XSERVER_URL} size="sm">
                エックスサーバーを見る →
              </CtaButton>
            }
          >
            <p>
              <strong>長期運用・安定性重視</strong>なら老舗。2003年からの運用実績、設定代行月3回無料。
            </p>
          </ScenarioCard>
          <ScenarioCard
            badge="複数サイト"
            title="Type C"
            recommended="エックスサーバー"
            cta={
              <CtaButton href={XSERVER_URL} variant="outline" size="sm">
                プラン詳細を見る →
              </CtaButton>
            }
          >
            <p>
              <strong>サイトを複数運営する</strong>予定なら、SSD 500GB と長期運用実績が効きます。
            </p>
          </ScenarioCard>
        </ScenarioGrid>
      </ConclusionBox>

      <p>
        最初の10日間お試しで決めたい人は<strong>エックスサーバー（無料お試し10日）</strong>、初期費用を抑えたい人は<strong>ConoHa WING（時間単位課金あり）</strong>。本記事ではこの判断軸を、項目別に深掘りします。
      </p>

      <h2>早見表: 主要スペック・料金</h2>
      <ComparisonTable
        headers={[
          "項目",
          "エックスサーバー（スタンダード）",
          "ConoHa WING（ベーシック）",
        ]}
        rows={[
          {
            label: "運営年数",
            cells: ["2003年〜（公式が国内シェアNo.1を主張）", "2018年9月〜（GMOインターネットグループ）"],
            winnerIndex: 0,
          },
          {
            label: "キャンペーン月額（※）",
            cells: ["495円〜（通常990円、約50%OFF）", "678円〜（通常1,452円、53%OFF）"],
            winnerIndex: 0,
          },
          {
            label: "vCPU / メモリ",
            cells: ["6コア / 8GB", "6コア / 8GB"],
          },
          {
            label: "SSD容量",
            cells: ["NVMe 500GB", "NVMe 300GB"],
            winnerIndex: 0,
          },
          {
            label: "転送量",
            cells: ["無制限", "無制限"],
          },
          {
            label: "稼働率",
            cells: ["99.99%", "99.99%"],
          },
          {
            label: "独自ドメイン",
            cells: ["2個まで永久無料", "2個まで永久無料"],
          },
          {
            label: "無料SSL",
            cells: ["あり", "あり"],
          },
          {
            label: "自動バックアップ",
            cells: ["14日分無料", "14日分無料"],
          },
          {
            label: "無料お試し",
            cells: ["10日間あり", "なし（時間課金で始められる）"],
            winnerIndex: 0,
          },
          {
            label: "WordPress",
            cells: ["クイックスタート", "かんたんセットアップ + テーマ同時インストール"],
            winnerIndex: 1,
          },
          {
            label: "管理画面",
            cells: [
              "2画面分離（サーバーパネル + Xserverアカウント）",
              "1画面統合",
            ],
            winnerIndex: 1,
          },
          {
            label: "サポート",
            cells: [
              "メール24時間 / 電話・チャット平日 + 設定代行月3回無料",
              "メール24時間 / 電話・チャット平日",
            ],
            winnerIndex: 0,
          },
        ]}
      />
      <p>
        <strong>vCPU・メモリは同じ8GB / 6コアで、実用上の差はわずか</strong>。違いが出るのは「実績」「使いやすさ」「SSD容量」「サポートの厚み」「キャンペーンの中身」など、付加価値の部分です。緑色のセルは<strong>項目ごとの優位</strong>を示しています。
      </p>
      <p className="text-xs text-black/50 dark:text-white/50">
        ※ キャンペーン月額・割引率は2026年5月時点の表記。最新情報・終了日は必ず公式サイトでご確認ください。スペック・料金は変動する可能性があります。
      </p>

      <CampaignBox title="🔥 2026年5月時点で実施中のキャンペーン">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>エックスサーバー</strong>: 初期費用無料 + スタンダード月額 <strong>495円〜（約50%OFF）</strong>。10日間無料お試しあり
          </li>
          <li>
            <strong>ConoHa WING</strong>: HappySpringキャンペーン、ベーシック月額 <strong>678円〜（最大53%OFF）</strong>
          </li>
        </ul>
        <p className="text-xs mt-3 text-amber-700/80 dark:text-amber-300/80">
          キャンペーンは予告なく終了・変更される場合があります。最新情報は公式サイトでご確認ください。
        </p>
      </CampaignBox>

      <h2>違い①: 表示速度の実測</h2>
      <p>
        両社とも公式に「サーバー速度No.1」「サーバー処理速度国内最速」を主張していますが（ConoHa WING は2025年11月自社調べ・h2load/Apache Bench測定値を根拠として明記）、第三者の実測値で比較すると<strong>差は誤差レベル</strong>です：
      </p>
      <ComparisonTable
        headers={["指標", "エックスサーバー", "ConoHa WING"]}
        rows={[
          {
            label: "PageSpeed デスクトップ",
            cells: ["98点", "99点"],
            winnerIndex: 1,
          },
          {
            label: "LCP（最大表示時間）",
            cells: ["1.2秒", "1.1秒"],
            winnerIndex: 1,
          },
          {
            label: "読み込み完了",
            cells: ["1.8秒", "1.6秒"],
            winnerIndex: 1,
          },
        ]}
      />
      <p>
        ConoHa WING は「WEXAL」というAI高速化機能で僅差で先行する傾向ですが、<strong>体感的な違いはほとんどありません</strong>。Core Web Vitals 的にもどちらも合格点です。
      </p>
      <p className="text-xs text-black/50 dark:text-white/50">
        ※ 上記の数値は外部第三者による比較レビューでの一例であり、計測条件・時期によって変動します。本記事の独自測定値ではありません。
      </p>
      <p>
        ページ表示速度は <Link href="/learn/network/https-tls">HTTPS</Link> や <Link href="/learn/network/dns-basics">DNS</Link> の構成、画像最適化、キャッシュ戦略で大きく変わるので、<strong>サーバーの選択より、その後の運用の方が影響が大きい</strong>と認識してOKです。
      </p>

      <h2>違い②: 管理画面の使いやすさ（初心者には大事）</h2>
      <p>
        ここで明確に差が出ます。
      </p>

      <h3>エックスサーバー: 2画面分離型</h3>
      <p>
        サーバーの設定は<strong>「サーバーパネル」</strong>、契約・支払い情報は<strong>「Xserverアカウント」</strong>と画面が2つに分かれています。慣れれば問題ないですが、初心者は「どっちで操作するんだっけ？」と迷うことが頻発します。
      </p>

      <h3>ConoHa WING: 1画面統合型</h3>
      <p>
        全ての設定（ドメイン追加、WordPress、メール、契約、支払い）が<strong>1つのコントロールパネルに集約</strong>されています。新しく作られているだけあって UX が洗練されており、「どこを操作すればいいか」が直感的にわかります。
      </p>
      <p>
        <strong>サーバー初契約の人</strong>は ConoHa WING の方が圧倒的に立ち上がりが早いです。逆にエックスサーバーは慣れの問題で、3〜4回触れば違和感は消えます。
      </p>

      <h2>違い③: WordPress関連機能</h2>
      <p>
        どちらも「契約と同時にWordPressサイトが立ち上がる」機能を持っていますが、ConoHa WING の方が一歩先を行きます：
      </p>
      <ComparisonTable
        headers={["機能", "エックスサーバー", "ConoHa WING"]}
        rows={[
          {
            label: "初回セットアップ",
            cells: ["WordPress クイックスタート", "WordPress かんたんセットアップ"],
          },
          {
            label: "テーマ同時インストール",
            cells: [
              "不可（後で手動）",
              "JIN:R / GOLDBLOG など複数のテーマから選択",
            ],
            winnerIndex: 1,
          },
          {
            label: "移行ツール",
            cells: ["WordPress 簡単移行", "WordPress かんたん移行 + 代行サービス"],
            winnerIndex: 1,
          },
          {
            label: "有料テーマ割引",
            cells: ["提携テーマあり", "JIN:R など提携テーマを割引で購入可"],
          },
        ]}
      />
      <p>
        <strong>「ブログを始めるならテーマも一緒に決めたい」</strong>という人は ConoHa WING がワンクリック多く減ります。一方<strong>「テーマは自分で選びたい」「最初は無料テーマで様子を見たい」</strong>人にはエックスサーバーで十分。
      </p>

      <h2>違い④: 安定性・実績</h2>
      <ProsConsList
        pros={[
          <>
            <strong>エックスサーバー: 2003年〜</strong> ホスティング業界の老舗。公式が掲げる稼働率99.99%
          </>,
          <>
            <strong>20年以上の運用実績</strong> 大規模な障害履歴の少なさ
          </>,
          <>
            <strong>明確なリソース割り当て</strong> プランごとのvCPU/メモリ目安が明記
          </>,
        ]}
        cons={[
          <>
            <strong>ConoHa WING: 2018年9月〜</strong> まだ約7年で運用実績は蓄積中
          </>,
          <>
            <strong>WINGパックは共用環境</strong> 確実なリソース確保には ビジネス/リザーブドプランへのアップグレードが必要
          </>,
        ]}
      />
      <p>
        ConoHa WING は2018年開始でまだ約7年程度。エックスサーバーほどの長期にわたる運用実績はまだ蓄積中、というフェーズです。利用者数も積み上がっており、サービス品質に大きな問題があるわけではありません。
      </p>
      <p>
        <strong>「サイトの停止が機会損失に直結するビジネス用途」</strong>では老舗の安定運用実績が効いてきます。個人ブログレベルなら ConoHa WING でも実用上問題ないでしょう。
      </p>

      <h2>違い⑤: サポートの厚み</h2>
      <p>
        基本的なサポート内容（メール24時間、電話・チャット平日10-18時）は同等ですが、エックスサーバーには見過ごせない強みがあります：
      </p>
      <ProsConsList
        pros={[
          <>
            <strong>設定代行サービスが月3回まで無料（エックスサーバー）</strong>: SSL設定、ドメイン設定、WordPress移行などをサーバ会社が代行。初心者には心強い
          </>,
          <>
            <strong>マニュアル・ナレッジベースの充実度</strong>: 20年以上の運用で蓄積された記事数。Google検索で大抵の問題が解決
          </>,
          <>
            <strong>第三者の解説記事・YouTube動画が豊富</strong>: 困ったときに解決情報にたどり着きやすい
          </>,
        ]}
      />
      <p>
        ConoHa WING も後発で十分なサポートを揃えていますが、ナレッジベースの厚みでは敵いません。「困った時に検索して即解決できる」かどうかは、初心者にとって長期コストに直結します。
      </p>

      <h2>違い⑥: キャンペーン・割引の中身</h2>
      <ComparisonTable
        headers={["項目", "エックスサーバー", "ConoHa WING"]}
        rows={[
          {
            label: "長期割引",
            cells: ["最大50%OFF（時期による）", "最大53%OFF（WINGパック）"],
            winnerIndex: 1,
          },
          {
            label: "紹介プログラム",
            cells: ["最大10,000円割引", "最大5,000円割引"],
            winnerIndex: 0,
          },
          {
            label: "初期費用",
            cells: ["無料", "無料"],
          },
          {
            label: "更新時の割引",
            cells: [
              "更新時もキャンペーン適用されることあり",
              "更新時はキャンペーン価格適用なし（要注意）",
            ],
            winnerIndex: 0,
          },
        ]}
      />
      <p>
        <strong>長期コストで見ると、更新時の扱いに差</strong>があります。ConoHa WING は契約初回は最安ですが、更新時に通常料金に戻ることが多い。エックスサーバーは更新キャンペーンが定期的に行われています。
      </p>

      <h2>シーン別おすすめ詳細</h2>

      <ScenarioGrid>
        <ScenarioCard
          badge="🌱 はじめての人"
          title="シーンA"
          recommended="ConoHa WING"
          cta={
            <CtaButton href={CONOHA_URL} size="sm">
              ブログを始める →
            </CtaButton>
          }
        >
          <p>
            初めてのブログ・副業ブロガー。管理画面の使いやすさ、テーマ同時セットアップ、初期コストの安さ。<strong>「今夜中にブログ開設したい」</strong>が叶います。
          </p>
        </ScenarioCard>
        <ScenarioCard
          badge="📈 ステップアップ"
          title="シーンB"
          recommended="エックスサーバー"
          cta={
            <CtaButton href={XSERVER_URL} size="sm">
              10日間お試し →
            </CtaButton>
          }
        >
          <p>
            副業のステップアップ・複数サイト運営。マルチドメイン無制限、SSD 500GB、長期運用実績、設定代行サポート。
          </p>
        </ScenarioCard>
        <ScenarioCard
          badge="💻 開発者向け"
          title="シーンC"
          recommended="どちらでも可"
        >
          <p>
            ポートフォリオサイト・個人開発。WordPress 以外なら<strong>Vercel / Cloudflare Pages の無料枠</strong>の方が現代的。
          </p>
        </ScenarioCard>
        <ScenarioCard
          badge="🏢 ビジネス用"
          title="シーンD"
          recommended="エックスサーバー"
          cta={
            <CtaButton href={XSERVER_URL} variant="outline" size="sm">
              プラン詳細 →
            </CtaButton>
          }
        >
          <p>
            中小ビジネスサイト・コーポレートサイト。信頼性が事業価値に直結するなら老舗の安心感を選ぶのが定石。
          </p>
        </ScenarioCard>
        <ScenarioCard
          badge="🚀 大規模化"
          title="シーンE"
          recommended="VPS or プレミアム"
          cta={
            <CtaButton href={XSERVER_VPS_URL} variant="outline" size="sm">
              XServer VPS →
            </CtaButton>
          }
        >
          <p>
            アクセスの多いサイト・大規模化対応。共用サーバーで限界が見えたら専有リソースの VPS へ。
          </p>
        </ScenarioCard>
      </ScenarioGrid>

      <h2>料金以外の落とし穴・注意点</h2>

      <ProsConsList
        pros={[
          <>
            <strong>長期契約（36ヶ月）で最大割引が効く</strong>。契約金額一括払いは初期負担が大きいので注意
          </>,
          <>
            <strong>初心者は12ヶ月契約から始める</strong>のが安全。途中解約しても残月分の返金はない
          </>,
          <>
            <strong>無料SSL は Let's Encrypt 系で十分</strong>。EV証明書が必要な金融・法人サイト以外は無料SSLで暗号強度・SEO評価とも問題なし
          </>,
        ]}
        cons={[
          <>
            <strong>アダルト・違法コンテンツは禁止</strong>（両社共通）。アダルト系の運営には mixhost 等の別サービス必須
          </>,
          <>
            <strong>大量メール送信には不向き</strong>。メルマガ運営は SendGrid / Mailgun / Amazon SES 等を併用
          </>,
          <>
            <strong>突発的バズではリソース制限</strong>がかかることがある。確実な確保には VPS や リザーブドプランへのアップグレード検討
          </>,
        ]}
      />

      <h2>独自ドメインも合わせて取得する</h2>
      <p>
        どちらのサーバーも「独自ドメイン2個まで永久無料」特典がありますが、<strong>3個目以降を取得したい</strong>場合は別途ドメイン取得サービスが必要です。
      </p>
      <p>
        エックスサーバー系列の <a href={XSERVER_DOMAIN_URL} rel="nofollow noopener noreferrer" target="_blank">XServerドメイン</a> なら、サーバーと同じアカウントで管理できて、<code>.com / .net / .jp</code> が初年度0円のキャンペーンが頻繁にあります。お名前.com やムームードメインも選択肢ですが、サーバー管理画面と統一できる利便性は侮れません。
      </p>
      <div className="my-6 flex justify-center not-prose">
        <CtaButton href={XSERVER_DOMAIN_URL} size="md">
          XServerドメインで独自ドメインを取得 →
        </CtaButton>
      </div>

      <h2>よくある質問</h2>

      <h3>Q. 結局どっち買うのがコスパ良いですか？</h3>
      <p>
        <strong>初契約の3年間で見ると ConoHa WING がやや安い</strong>（53%OFFが効くので）。<strong>4年目以降の長期運用ではエックスサーバー</strong>（更新割引が効く + 安定性で乗り換え不要）。短期決戦か長期戦かで変わります。
      </p>

      <h3>Q. 速度はどちらが速いですか？</h3>
      <p>
        外部の比較レビュー（2026年時点）では ConoHa WING が僅差で先行することが多いですが、<strong>体感差はゼロ</strong>。表示速度を本気で詰めたいなら、サーバー選択より画像最適化・キャッシュ・CDN の方が効きます。
      </p>

      <h3>Q. WordPress以外（Next.js等）を使いたいです</h3>
      <p>
        どちらも対応していますが、<strong>SSG / SSR の Web 開発なら Vercel / Cloudflare Pages の方が現代的</strong>です。共用レンタルサーバーは PHP / WordPress 文化が中心。
      </p>

      <h3>Q. 後からサーバー間で乗り換えできますか？</h3>
      <p>
        できます。両社とも「他社からの移行」サポートを提供しています。ただしダウンタイムや手間は発生するので、最初の選択は慎重に。<strong>10日間無料お試しがあるエックスサーバー</strong>で先に試すのが安全です。
      </p>

      <h3>Q. SSL証明書は無料で大丈夫？</h3>
      <p>
        Let's Encrypt 系の無料SSL証明書で十分です。EV証明書（緑色のバー）が必要な金融・法人サイトでない限り、無料SSLで暗号強度・SEO評価ともに問題ありません。詳細は <Link href="/learn/network/https-tls">HTTPS と TLS の仕組み</Link> 参照。
      </p>

      {/* バナー画像配置スロット（A8バナー素材を取得後にここに貼る） */}
      <BannerSlot caption="広告">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-xs text-black/40 dark:text-white/40">
          [ バナー画像配置スロット - A8バナー素材を取得後ここに表示 ]
        </div>
      </BannerSlot>

      <h2>まとめ - 自分に合う選び方</h2>
      <p>
        スペックも料金も驚くほど近い両者。決め手は<strong>「あなたが何を重視するか」</strong>だけです。
      </p>

      <ScenarioGrid>
        <ScenarioCard
          badge="🌱 短期・初心者"
          title="迷ったらこれ"
          recommended="ConoHa WING"
          cta={
            <CtaButton href={CONOHA_URL} size="md">
              ConoHa WINGで始める →
            </CtaButton>
          }
        >
          <p>
            初心者・短期決戦・とにかく早く始めたい人に。管理画面1画面、テーマ同時インストール、初期コスト最小。
          </p>
        </ScenarioCard>
        <ScenarioCard
          badge="🏆 長期・実績"
          title="安心の選択"
          recommended="エックスサーバー"
          cta={
            <CtaButton href={XSERVER_URL} size="md">
              エックスサーバー →
            </CtaButton>
          }
        >
          <p>
            長期運用・複数サイト・安定性重視。SSD 500GB、20年以上の実績、設定代行月3回無料。
          </p>
        </ScenarioCard>
      </ScenarioGrid>

      <p className="text-center my-6">
        <strong>悩むなら → </strong>
        <a
          href={XSERVER_URL}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="text-emerald-600 dark:text-emerald-400 underline font-semibold"
        >
          エックスサーバーの10日間無料お試し
        </a>
        {" "}で先に確認するのが安全です。
      </p>

      <p>
        どちらも「失敗」と言える選択ではありません。むしろこの2社で迷えるなら、外れを引かない時代になっているということです。<strong>「決めて、立ち上げる」までが勝負</strong>。本記事で違いが見えたなら、悩む時間をサイト運営の時間に変えていきましょう。
      </p>

      <h2>関連記事</h2>
      <ul>
        <li><Link href="/learn/network/https-tls">HTTPS と TLS の仕組み</Link> - SSL証明書の仕組みを理解する</li>
        <li><Link href="/learn/network/dns-basics">DNS の仕組み</Link> - 独自ドメイン取得後に必須の知識</li>
        <li><Link href="/learn/network/vpn-basics">VPN の仕組み</Link> - リモートからサーバーへ安全にアクセス</li>
        <li><Link href="/learn/security/http-security-headers">HTTPセキュリティヘッダ詳解</Link> - サーバー設定のセキュリティ強化</li>
      </ul>

      {/* A8 アフィリエイト計測ピクセル（広告主ごとに1つ、画面外配置） */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        {/* ConoHa WING */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www12.a8.net/0.gif?a8mat=4B3LMV+ALMVJM+50+5SKSCY"
          width={1}
          height={1}
          alt=""
        />
        {/* エックスサーバー */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www19.a8.net/0.gif?a8mat=4B3LMV+C506SY+CO4+61JSI"
          width={1}
          height={1}
          alt=""
        />
        {/* XServer VPS */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www11.a8.net/0.gif?a8mat=4B3LMV+C5LMEQ+CO4+25EKCY"
          width={1}
          height={1}
          alt=""
        />
        {/* XServerドメイン */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www13.a8.net/0.gif?a8mat=4B3LMV+C3TBLE+CO4+15ORS2"
          width={1}
          height={1}
          alt=""
        />
      </div>
    </ArticleLayout>
  );
}
