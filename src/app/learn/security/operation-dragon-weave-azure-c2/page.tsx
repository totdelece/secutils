import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "operation-dragon-weave-azure-c2")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        マルウェアのC2（指令）通信を検知・ブロックすることはAPT対策の基本だ。しかし攻撃者が使うC2インフラが「Microsoft Azure Blob Storage」だったらどうか。<strong>Operation Dragon Weave</strong>は、中国系APTがチェコ共和国と台湾の政府・研究・金融機関を標的に展開したスパイ活動で、<code>*.blob.core.windows.net</code>への正規のHTTPS通信に紛れてC2を隠蔽するという巧妙な手口を採用している。2026年6月にインドのSeqriteが詳報したこの作戦は、「正規クラウドサービスを悪用したDead Drop型C2」という近年のAPTに共通するトレンドを体現している。Azure利用が広がる日本企業も同様のリスクにさらされていることを理解し、今できる対策を把握してほしい。
      </p>

      <h2>概要</h2>
      <ul>
        <li>
          <strong>作戦名</strong>：Operation Dragon Weave
        </li>
        <li>
          <strong>報告元</strong>：Seqrite（インド）、2026年6月
        </li>
        <li>
          <strong>帰属</strong>：中国系脅威アクター（中程度の信頼度）。既知のAPTグループへの帰属は特定されていない
        </li>
        <li>
          <strong>標的</strong>：チェコ共和国・台湾の政府、研究・学術、テクノロジー、金融機関
        </li>
        <li>
          <strong>使用マルウェア</strong>：RUSTCLOAK（Rustベースローダー）、AZUREVEIL（Adaptix C2エージェント・36コマンド）
        </li>
        <li>
          <strong>C2手法</strong>：Azure Blob Storageをデッドドロップとして使用。攻撃者と感染マシンが直接通信しない
        </li>
        <li>
          <strong>初期侵入</strong>：スピアフィッシングZIPファイル（LNKファイル経由またはRustドロッパー経由の二経路）
        </li>
      </ul>

      <h2>何が起きたのか</h2>
      <h3>標的と地政学的背景</h3>
      <p>
        Operation Dragon Weaveの標的は、チェコ共和国・台湾の政府機関、研究・学術機関、テクノロジー企業、金融機関だ。地政学的に見ると、チェコはNATOおよびEU加盟国として欧州の戦略的ハブに位置し、台湾は半導体産業と独立問題において世界の焦点となっている。いずれも中国の国家利益と直接関わる標的だ。
      </p>
      <p>
        本作戦の目的は<strong>外交・防衛・産業技術に関する機密情報の長期収集</strong>と考えられる。ランサムウェアのように即座に存在を知らせる手法は採らず、できる限り長く潜伏して情報を収集し続けることがゴールだ。
      </p>
      <h3>作戦の発見</h3>
      <p>
        Seqriteの脅威インテリジェンスチームが本作戦を特定したのは2026年6月。C2インフラの特徴的なAzure利用パターンと、RUSTCLOAK・AZUREVEILという独自マルウェアファミリーの存在が調査の端緒となった。Dark Readingも「China Uses Dual-Method Cyberattack on Czech Orgs」として本件を報じている。
      </p>

      <h2>技術的な解説</h2>
      <h3>初期侵入：二経路のスピアフィッシング</h3>
      <p>
        攻撃は精緻に作り込まれたスピアフィッシングメールから始まる。メールにはZIPファイルが添付されており、「ビジネスミーティングの案内」「チェコ社会保険局からの公式通知」などを装った内容で開封を誘導する。ZIPを展開すると、攻撃者は<strong>2つの並行した感染ルート</strong>で侵害を試みる：
      </p>
      <ul>
        <li>
          <strong>ルート1：悪意あるLNKファイル（Windowsショートカット）</strong>
          ：ZIPにPDFに見せかけた<code>.lnk</code>ファイルが含まれる。ダブルクリックするとPowerShellが起動し、多段階のペイロードダウンロードチェーンが実行される。スクリプトは難読化されており検知を回避する。
        </li>
        <li>
          <strong>ルート2：Rustベースのドロッパーバイナリ</strong>
          ：ZIPに直接実行形式のRustバイナリが含まれる。Rustで記述されているため逆コンパイルが困難で、このバイナリが次段階のローダーを直接展開する。
        </li>
      </ul>
      <p>
        この二段構えは、どちらか一方がセキュリティ製品にブロックされても感染の機会を残す合理的な設計だ。
      </p>

      <h3>RUSTCLOAKローダー：DLLサイドローディングで展開</h3>
      <p>
        両ルートは最終的に<strong>RUSTCLOAK</strong>と呼ばれるRustベースのローダーに収束する。RUSTCLOAKの特徴的な展開手法は<strong>DLLサイドローディング</strong>だ：
      </p>
      <ol>
        <li>正規のゲームエンジン「Unity」のDLLファイル<code>UnityPlayer.dll</code>を悪用する</li>
        <li>Unityランタイムは信頼された正規ファイルとしてセキュリティ製品に認識されており、ロードが許可される</li>
        <li>しかし実際には悪意あるDLLが<code>UnityPlayer.dll</code>として配置されており、ロード時にRUSTCLOAKが実行される</li>
      </ol>
      <p>
        この手法は「Living Off Trusted Files」（信頼ファイルの悪用）の変形で、正規ソフトウェアへの信頼を逆用することでホワイトリストベースの防御を回避する。
      </p>

      <h3>AZUREVEILバックドア：36コマンドを持つAdaptix C2エージェント</h3>
      <p>
        RUSTCLOAKが最終的に展開するペイロードが<strong>AZUREVEIL</strong>だ。AZUREVEILはAdaptix C2フレームワークをベースとした完全機能のバックドアで、以下36の後段攻撃コマンドを実装している：
      </p>
      <ul>
        <li><strong>ファイル操作</strong>：アップロード、ダウンロード、ディレクトリ列挙、削除</li>
        <li><strong>プロセス管理</strong>：任意プロセスの実行・終了・一覧取得</li>
        <li><strong>ネットワーク</strong>：ポートスキャン、トラフィックトンネリング</li>
        <li><strong>認証情報窃取</strong>：メモリダンプ、LSASSダンプ（Windows認証情報）</li>
        <li><strong>持続化</strong>：レジストリ操作、スケジュールタスク登録</li>
        <li><strong>偵察</strong>：スクリーンショット取得、システム情報収集</li>
        <li><strong>コード実行</strong>：コマンドシェル実行、PowerShellコマンド実行</li>
      </ul>

      <h3>Azure Blob StorageによるDead Drop C2：本作戦の核心</h3>
      <p>
        Operation Dragon Weaveの最大の特徴であり、セキュリティコミュニティが最も注目する点が<strong>Dead Drop C2としてのAzure Blob Storage利用</strong>だ。
      </p>
      <p>
        <strong>通常のC2通信</strong>では、感染マシンが攻撃者管理のサーバーに直接コマンドを取りに行く。そのためC2サーバーのIPやドメインをブロックリストに追加すれば通信を遮断できる。
      </p>
      <p>
        <strong>Operation Dragon WeaveのDead Drop C2</strong>では、攻撃者と感染マシンは直接通信しない。両者が共通のAzureストレージコンテナを介してデータを交換する：
      </p>
      <ol>
        <li>攻撃者がコンテナに「コマンド」ファイルをアップロード</li>
        <li>感染マシン上のAZUREVEILがコンテナを定期ポーリングしてコマンドを取得・実行</li>
        <li>実行結果をコンテナにアップロード</li>
        <li>攻撃者がコンテナから結果を取得</li>
      </ol>
      <p>なぜこの手法が検知・ブロックを困難にするのか、理由を整理する：</p>
      <ul>
        <li>
          <strong>正規のMicrosoft通信に完全に見える</strong>：Azure Blob Storageへの通信は<code>*.blob.core.windows.net</code>への標準的なHTTPS通信だ。Microsoft 365やAzureを利用している組織ならこのドメインをブロックすることは業務に直接支障をきたす。ほぼすべての組織がホワイトリスト登録しており「怪しい通信」としてアラートが上がらない。
        </li>
        <li>
          <strong>攻撃者独自のC2サーバーが存在しない</strong>：従来のIOC（侵害指標）ベースの対策は「C2サーバーのIPとドメイン」を共有・ブロックすることに依存している。Dead Drop型ではこのアプローチが根本的に機能しない。
        </li>
        <li>
          <strong>TLS暗号化でペイロード内容が秘匿される</strong>：Azure Blob StorageとのTLS通信のペイロードをDPI（Deep Packet Inspection）で検査することは困難だ。
        </li>
        <li>
          <strong>テナント停止への対抗力</strong>：使用テナントをMicrosoftに通報・停止を求めることは可能だが、攻撃者は新テナントを即座に作成して活動を継続できる。
        </li>
      </ul>
      <p>
        なお、Azure Blob StorageのDead Drop C2という手法自体は全くの新手ではなく、過去にもMicrosoft OneDrive、Google Drive、Dropboxを使った類似手法が確認されている。しかしAzureを業務で積極利用している組織ほど、この手法への防御が構造的に困難になる点が本作戦の脅威度を高めている。
      </p>

      <h2>日本企業への影響</h2>
      <h3>日本は中国系APTの歴史的な主要標的</h3>
      <p>
        日本は中国系APTグループの長年にわたる主要標的だ。過去の代表的な事例として、<strong>APT10（Stone Panda）</strong>は日本の防衛・宇宙・エネルギー・製造企業を長期にわたり侵害し、日本語に堪能なオペレーターの存在も確認されている（2018年に米司法省が2名の中国人を起訴）。2023年のNISC（内閣サイバーセキュリティセンター）侵害でも中国系APTとの関連が指摘された。
      </p>
      <p>
        Operation Dragon Weaveの標的セクター「政府・研究・学術・テクノロジー・金融」は、日本でも繰り返し侵害が確認されているセクターと完全に一致する。
      </p>
      <h3>Azure利用企業が抱える構造的リスク</h3>
      <p>
        日本ではMicrosoft Azureの採用が急速に進んでいる。政府機関での政府共通プラットフォームのAzure移行や、大手企業・大学での利用拡大が背景にある。「Azure Blob Storage通信はほぼ確実に通す」という前提が組織内にある環境ほど、Dead Drop C2が効果的に機能する構造的なリスクが存在する。
      </p>
      <h3>スピアフィッシングの日本語ローカライズ版</h3>
      <p>
        チェコ語・中国語ターゲット向けに作られたスピアフィッシングメールは、日本語にローカライズされた亜種として日本組織を標的にする可能性が十分ある。「業務メールに添付されたZIPファイルを開く」という日常的な行為が感染の起点になる。研究機関・大学では論文投稿や共同研究の案内に見せかけたスピアフィッシングが過去に多数確認されており、本作戦でも類似の手口が使われうる。
      </p>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. 初期侵入の防御</h3>
      <ul>
        <li>メールゲートウェイでZIPアーカイブ内の<code>.lnk</code>ファイルを含む添付をブロックまたは検疫</li>
        <li>EDR製品でDLLサイドローディング検知ルールを有効化し、<code>UnityPlayer.dll</code>が正規Unityインストールパス以外からロードされる場合にアラート発報</li>
        <li>PowerShellのConstrained Language Modeを適用し、Base64エンコードされたコマンドの実行に対してアラートを設定</li>
        <li>スピアフィッシングを想定したメール訓練を定期実施。LNKファイルを「PDFに見せかけたショートカット」として見分けるトレーニングを盛り込む</li>
      </ul>
      <h3>2. Azure利用環境での検知強化</h3>
      <ul>
        <li>Azureストレージアカウントのアクセスログを監視し、業務目的外のBlobコンテナへのアクセスを検知するアラートを設定</li>
        <li>エンドポイントから<code>*.blob.core.windows.net</code>への通信のうち、業務アプリ以外のプロセスからの接続を監視（プロセスとネットワーク接続を紐づけて確認）</li>
        <li>Microsoft SentinelなどSIEMで、Azure Blob Storage Dead Drop C2のパターン（定期的な小容量HTTPS通信）を検知するルールを追加</li>
        <li>Defender for Endpointで「LOLBAS」（Land-Off-Binaries and Scripts）とDLLサイドローディングのアラートを強化</li>
      </ul>
      <h3>3. 侵害の痕跡（IOC）確認</h3>
      <ul>
        <li><code>UnityPlayer.dll</code>がゲームアプリや正規Unityインストール以外のディレクトリに存在しないか確認</li>
        <li>プロセスツリーで<code>UnityPlayer.dll</code>をロードするプロセスの子プロセスに不審なものがないか確認</li>
        <li>ネットワークログでAzure Blob Storageへの定期的な小サイズHTTPS通信（数分〜十数分おきのポーリング）を確認</li>
        <li>PowerShell実行ログでBase64エンコードコマンドの実行履歴を確認</li>
      </ul>
      <h3>4. ゼロトラスト的な対策</h3>
      <ul>
        <li>クラウドストレージ（OneDrive、SharePoint、Azure Blobなど）へのアクセスを「どのアプリケーションが通信しているか」のレベルで管理。業務アプリ以外からの接続を可視化する</li>
        <li>エンドポイントのOutbound通信をDNS・IPだけでなくアプリケーション単位で監視し、業務外アプリからの外部通信を検知する仕組みを構築する</li>
      </ul>

      <h2>参考情報</h2>
      <ul>
        <li>Seqrite: Operation Dragon Weave — Uncovering a China-Linked Campaign Targeting Czech Republic and Taiwan Using Azure Cloud C2（2026年6月）</li>
        <li>Dark Reading: China Uses Dual-Method Cyberattack on Czech Orgs</li>
        <li>The Hacker News: China-Aligned Groups Ramp Up Attacks: Dragon Weave Hits Czech Republic &amp; Taiwan</li>
        <li>SOC Prime: Operation Dragon Weave Uses Azure Cloud C2 to Target Czech Republic and Taiwan</li>
      </ul>
    </ArticleLayout>
  );
}
