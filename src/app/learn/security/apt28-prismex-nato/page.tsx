import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "apt28-prismex-nato")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>概要</h2>
      <p>
        2026年、ロシア軍参謀本部情報総局（GRU）に紐づくAPTグループ「APT28」（別名：Pawn Storm・Fancy Bear・UAC-0001）が、新たなマルウェアスイート「PRISMEX」を用いた大規模なスパイキャンペーンを展開していることがTrend Micro・The Hacker News・SecurityAffairsなどの調査で明らかになった。キャンペーンは2025年9月から始まり、2026年1〜4月に急拡大した。標的はウクライナ政府・軍・防衛インフラのほか、NATO加盟国であるポーランド・チェコ・ルーマニア・スロバキア・スロベニア・トルコの鉄道・海運・防衛サプライチェーンに及ぶ。
      </p>
      <p>
        PRISMEXが注目される理由は、<strong>画像ファイルにマルウェアのペイロードを隠すステガノグラフィ</strong>・<strong>COMハイジャックによる持続的な潜伏</strong>・<strong>正規クラウドサービスをC2（コマンド＆コントロール）サーバーとして悪用</strong>という3つの高度な回避技術を組み合わせている点にある。
      </p>

      <h2>何が起きたのか</h2>
      <h3>攻撃のタイムラインと標的</h3>
      <table>
        <thead>
          <tr>
            <th>時期</th>
            <th>出来事</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025年9月〜</td>
            <td>PRISMEXキャンペーン開始（推定）。インフラの準備が確認される</td>
          </tr>
          <tr>
            <td>2026年1月12日</td>
            <td>CVE-2026-21509の公開予定日の2週間前にAPT28がインフラを準備完了。ゼロデイの事前入手が示唆される</td>
          </tr>
          <tr>
            <td>2026年1月末</td>
            <td>CVE-2026-21509（Microsoft Officeの脆弱性）が公開。APT28が即日悪用開始</td>
          </tr>
          <tr>
            <td>2026年4月</td>
            <td>The Hacker NewsがAPT28のPRISMEX詳細報告を公開。Trend Microが技術分析を公表</td>
          </tr>
        </tbody>
      </table>
      <h3>なぜ防衛サプライチェーンを狙うのか</h3>
      <p>
        APT28の主目的は情報収集（スパイ活動）だが、今回の標的選定には戦略的な意図が透けて見える。ウクライナへの弾薬補給に関わるスロバキア・チェコの調達担当組織、ポーランドの鉄道輸送、ルーマニア・スロベニア・トルコの海運・交通インフラ——これらはいずれも<strong>ウクライナへの軍事支援ロジスティクスの中継拠点</strong>である。ドローン在庫リストに関するおとり文書が使われた事実も、この推論を支持する。APT28は単に情報を盗むだけでなく、将来のサボタージュ（妨害活動）に向けた足がかりを構築している可能性がある。実際、PRISMEXにはワイパー（データ消去）コマンドの実行機能も含まれており、<strong>スパイ活動と破壊活動の両方に使える複合ツール</strong>となっている。
      </p>

      <h2>技術的な解説</h2>
      <h3>CVE-2026-21509の悪用と初期侵入</h3>
      <p>
        APT28は標的型フィッシングメール（スピアフィッシング）にMicrosoft Officeの脆弱性<strong>CVE-2026-21509</strong>を悪用した細工済み文書を添付して送付する。この脆弱性は、細工されたOfficeファイルを開くだけで悪意ある<code>.LNK</code>ファイルが取得・実行される。さらに<strong>CVE-2026-21513</strong>（Windowsのセキュリティ機能バイパス脆弱性）と連鎖させることで、セキュリティ警告なしにペイロードが実行される。
      </p>
      <p>
        注目すべきは、APT28がCVE-2026-21509の公開予定日の<strong>2週間前</strong>から攻撃インフラを準備していた点である。これはAPT28がゼロデイ（パッチ公開前の脆弱性）として事前に入手していた可能性を強く示唆する。国家支援グループが脆弱性情報を先行入手するルートとしては、ゼロデイブローカーからの購入、他の攻撃者から奪取、あるいは自前での発見がある。
      </p>
      <h3>PRISMEXの核心技術①: ステガノグラフィ</h3>
      <p>
        PRISMEXという名称は、その最大の特徴である<strong>ステガノグラフィ（steganography）</strong>に由来する。ステガノグラフィとは、デジタル画像・音声・動画ファイルの中に、人間の目には見えない形でデータを隠す技術である。
      </p>
      <p>
        具体的には、<strong>PrismexSheet</strong>という悪意あるExcelドロッパーがVBAマクロを実行し、添付された画像ファイルの画素データの中に埋め込まれたペイロードを抽出・実行する。セキュリティ製品は通常、実行ファイルや既知のマルウェアシグネチャを検出するが、画像ファイルに隠されたペイロードは静的解析では発見しにくい。また、添付ファイルとして画像が来ても「おとり文書（ドローンの在庫リスト等）」を表示するため、ユーザーはマルウェアが実行されたことに気づきにくい。
      </p>
      <h3>PRISMEXの核心技術②: COMハイジャックによる永続化</h3>
      <p>
        <strong>COM（Component Object Model）ハイジャック</strong>は、WindowsのCOMオブジェクト登録機構の仕組みを悪用した持続化技術である。Windowsの多くのアプリケーションは起動時にレジストリを参照してCOMオブジェクトを読み込むが、<strong>ユーザー権限で書き込める特定のレジストリキーに悪意あるDLLを登録</strong>することで、正規アプリケーション（Excelなど）の起動に乗じてマルウェアを実行させることができる。
      </p>
      <p>
        COMハイジャックの難しい点は、<strong>管理者権限を必要とせず</strong>、また正規のWindowsコンポーネントが実行するように見えるため、EDRやセキュリティ監視ツールが誤検知を恐れてアラートを出しにくいという点にある。
      </p>
      <h3>PRISMEXの核心技術③: クラウドサービスをC2として悪用</h3>
      <p>
        マルウェアが組織内に潜伏した後のC2（コマンド＆コントロール）通信には、<strong>正規のクラウドサービス</strong>（OneDrive・SharePoint・Google Drive等とされる）が使われる。これにより、ネットワーク監視でC2通信を検出しようとしても「正規のMicrosoft/Googleサービスへのトラフィック」として見えるため、ブロックが難しく、検知が困難になる。
      </p>
      <h3>MiniDoorとOutlookメールスティーラー</h3>
      <p>
        PRISMEXキャンペーンでは、標的に応じて2種類のペイロードが使い分けられた。<strong>MiniDoor</strong>はリモートアクセスツール（RAT）で、バックドアとして継続的なアクセスを確保する。一方、<strong>Outlookメールスティーラー</strong>は標的のOutlookメールを丸ごと抜き取るもので、外交・軍事・調達に関するメールが窃取対象になる。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        今回の標的はウクライナ・NATO加盟国であり、日本は直接の標的ではない。しかし以下の点で日本企業も無関係ではない。
      </p>
      <ul>
        <li>
          <strong>防衛関連企業・サプライチェーン</strong>: 日本の防衛産業企業や官公庁向け企業は、他の国家系APTグループ（中国系のAPT10等）から以前より狙われており、PRISMEXの技術手法（ステガノグラフィ・COMハイジャック）は他のAPTグループも採用している。今回の事例は「どのような技術が使われるか」の参考情報として重要である。
        </li>
        <li>
          <strong>Microsoft Officeの脆弱性悪用</strong>: CVE-2026-21509のような「文書を開くだけで感染する」脆弱性は日本企業にも等しく適用される。Officeのパッチ管理は全組織で優先事項にすべきである。
        </li>
        <li>
          <strong>正規クラウドサービスへのC2通信の検出困難</strong>: OneDrive・SharePointへの不審な大量アップロードが検知できない組織は、この手法に対して盲点を持っている。
        </li>
        <li>
          <strong>ステガノグラフィ対応の未整備</strong>: 多くの組織のセキュリティ製品は画像ファイル内の隠しペイロードを検出する能力を持っておらず、PRISMEXのような手法に対して現時点では有効な防御が限られている。
        </li>
      </ul>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>Officeの脆弱性管理</h3>
      <ul>
        <li>Microsoft Office の最新パッチが適用されているか確認する（特にCVE-2026-21509・CVE-2026-21513）</li>
        <li>Office の<strong>マクロを既定で無効化</strong>し、信頼できる発行元からのマクロのみ実行を許可する設定を確認する</li>
        <li>Protected View（保護ビュー）が有効になっているか確認する。外部から来たファイルは保護ビューで開かれることを全従業員に周知する</li>
      </ul>
      <h3>スピアフィッシング対策の強化</h3>
      <ul>
        <li>APT28は標的の職務・組織に関連する件名・内容（ドローン在庫リスト、調達書類等）を使う。<strong>業務に関連する添付ファイルでも不審なメールへの注意</strong>を継続的に訓練する</li>
        <li>DMARC・DKIM・SPFを設定し、自組織ドメインのなりすましを防ぐ</li>
        <li>メールのヘッダー・送信元ドメインを確認する習慣をトレーニングで身につけさせる</li>
      </ul>
      <h3>クラウドサービスへの異常な通信の監視</h3>
      <ul>
        <li>OneDrive・SharePoint・Google DriveへのDLPルール（データ損失防止）を設定し、大量のデータアップロードをアラートする</li>
        <li>CASBやクラウドセキュリティツールで、通常とは異なる時間帯・端末からのクラウドサービスアクセスを検知する</li>
      </ul>
      <h3>COMハイジャックの検出</h3>
      <ul>
        <li>EDRのレジストリ変更監視を有効にし、<code>HKCU\Software\Classes\CLSID</code>配下への不審な書き込みを検知する設定を確認する</li>
        <li>SysmonでCOMオブジェクト関連のプロセス生成を記録・監視する</li>
      </ul>

      <h2>参考情報</h2>
      <ul>
        <li>Trend Micro: <em>Pawn Storm Campaign Deploys PRISMEX, Targets Government and Critical Infrastructure Entities</em></li>
        <li>The Hacker News: <em>APT28 Deploys PRISMEX Malware in Campaign Targeting Ukraine and NATO Allies</em></li>
        <li>SecurityAffairs: <em>Russia-linked APT28 uses PRISMEX to infiltrate Ukraine and allied infrastructure</em></li>
        <li>Zscaler ThreatLabz: <em>Operation Neusploit: APT28 Uses CVE-2026-21509</em></li>
        <li>SecurityOnline: <em>Steganography &amp; Sabotage: Inside Pawn Storm&apos;s PRISMEX Offensive Against NATO Logistics</em></li>
      </ul>
      <p>
        国家系APTの戦術・技術・手順の体系については <a href="/learn/security/mitre-attack">MITRE ATT&amp;CK 入門</a>、フィッシング対策の基礎は <a href="/learn/security/mfa-totp-fido2">MFA・TOTP・FIDO2・Passkey の違い</a> も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
