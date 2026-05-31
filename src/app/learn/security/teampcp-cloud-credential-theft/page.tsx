import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "teampcp-cloud-credential-theft")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>概要</h2>
      <p>
        2026年3月、セキュリティスキャンツール「Trivy」の公式リポジトリが侵害されたことを皮切りに、攻撃グループ「TeamPCP」によるサプライチェーン攻撃が連鎖した。同グループは開発者が日常的に使うDevSecOpsツールにクレデンシャルスティーラーを仕込み、感染した端末からAWSアクセスキー・Kubernetesトークン・GitHub PAT（Personal Access Token）・SSH秘密鍵などを自動収集した。窃取した鍵はTruffleHogで即座に有効性が確認された後、S3バケット・Secrets Manager・データベースへの二次侵害に使われた。Wiz社の調査によれば、侵害されたLiteLLMは全クラウド環境の36%に存在しており、被害の潜在的な広がりは数万件のリポジトリに及ぶとされる。
      </p>

      <h2>何が起きたのか</h2>
      <h3>攻撃の連鎖：9日間で5つのプロジェクトを侵害</h3>
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>侵害されたプロジェクト</th>
            <th>概要</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2026年3月19日</td>
            <td>Trivy（コンテナ脆弱性スキャナー）</td>
            <td>GitHub Actionsワークフローにクレデンシャルスティーラーを注入。数時間後にはすでにクラウド侵害が始まる</td>
          </tr>
          <tr>
            <td>2026年3月23日</td>
            <td>KICS（Checkmarx）</td>
            <td>IaCセキュリティスキャナーの2つのCI/CDプラグインを汚染</td>
          </tr>
          <tr>
            <td>2026年3月24日</td>
            <td>LiteLLM（AI Gateway）</td>
            <td>PyPI上の正規パッケージに悪性バージョン（1.82.7・1.82.8）を公開。月間9,500万ダウンロードのパッケージに到達</td>
          </tr>
          <tr>
            <td>2026年3月〜5月</td>
            <td>TanStack・UiPath・Mistral AI・OpenSearch・Guardrails AI</td>
            <td>関連するnpmパッケージへ攻撃を拡大。数百パッケージが影響</td>
          </tr>
        </tbody>
      </table>
      <h3>「セキュリティツール自体」が攻撃の入口になった理由</h3>
      <p>
        Trivyはコンテナイメージやコードの脆弱性を検出するために、リポジトリ全体・設定ファイル・環境変数・シークレットにアクセスする必要がある。つまり<strong>セキュリティスキャンツールは、その性質上、組織内の全シークレットが集まる高権限な位置に置かれている</strong>。TeamPCPはこの特性を逆手に取り、スキャンツール自体をスパイウェアに変えた。KICSも同様に、IaC（インフラストラクチャ・アズ・コード）の設定ファイルを解析するためにクラウド認証情報にアクセスできる位置にある。
      </p>
      <h3>AWSへの二次侵害</h3>
      <p>
        Wiz CIRTの調査によれば、Trivyへの悪性コード注入から数時間以内に、盗まれたシークレットを使ったAWS環境への侵害活動が始まった。攻撃者はまずTruffleHogを使って盗取した認証情報の有効性を自動検証し、有効なものを選別した上でAWSのS3バケット・Secrets Manager・RDSデータベースからデータを抜き取った。また、Azure アプリケーションシークレット・SaaSトークンも同様の手順で悪用された。
      </p>

      <h2>技術的な解説</h2>
      <h3>クレデンシャルスティーラーの動作</h3>
      <p>
        TeamPCPが注入したマルウェアは、感染端末で次の操作を自動実行する:
      </p>
      <ul>
        <li><strong>メモリスキャン</strong>: 実行中プロセスのメモリからAWSアクセスキー・Kubernetesサービスアカウントトークン・Solanaウォレット秘密鍵を検索・抽出</li>
        <li><strong>ファイルスキャン</strong>: <code>~/.aws/credentials</code>・<code>.env</code>・<code>*.json</code>等の設定ファイルからシークレットを収集</li>
        <li><strong>GitHubリポジトリスキャン</strong>: ソースコード・設定ファイル・埋め込みシークレットをリポジトリ単位で吸い上げ</li>
        <li><strong>C2送信</strong>: 収集したシークレットを攻撃者のインフラへ送信</li>
      </ul>
      <h3>TruffleHogによる自動選別</h3>
      <p>
        大量に盗んだシークレットの中から有効なものを選ぶために、攻撃者はオープンソースのシークレット検出ツール「TruffleHog」を悪用した。TruffleHogは本来、誤ってコミットされたシークレットを検出するためのセキュリティツールだが、攻撃者が盗んだ鍵の有効性を大量検証するためのツールとして転用された。<strong>「守るためのツールが攻めるためのツールになる」</strong>という逆説がここでも成立している。
      </p>
      <h3>なぜLiteLLMが特に危険だったのか</h3>
      <p>
        LiteLLMはOpenAI・Anthropic・Google等の複数のLLM APIを統合的に呼び出すためのPythonライブラリで、AIアプリケーション開発者の間で急速に普及している。このライブラリは性質上、各LLMプロバイダーのAPIキーを一元管理する位置にある。LiteLLMの悪性バージョンに感染した環境では、OpenAI・Anthropic・AWS Bedrock等のAPIキーがすべて窃取対象になる。Wiz社によれば、LiteLLMは全クラウド環境の<strong>36%</strong>に存在しており、これはnpmやPyPIの人気パッケージ水準の普及率である。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        TeamPCPが標的にしたツールは、日本のIT企業・クラウドネイティブ企業・AI開発企業が広く使用するものばかりである。特に以下の点で日本企業にも直接的なリスクがある。
      </p>
      <ul>
        <li><strong>Trivyはコンテナセキュリティのデファクトスタンダード</strong>: コンテナを扱う組織の多くがTrivy（またはAqua Security製品）をCI/CDに組み込んでいる。侵害期間中（3月19日前後）にTrivyを実行していた組織は影響を受けた可能性がある。</li>
        <li><strong>LiteLLMはAI開発の標準ライブラリ</strong>: Claude・GPT・Geminiを同時に使う開発者が急増する中、LiteLLM経由のAPIキー漏洩は国内AI開発現場にも直撃する。</li>
        <li><strong>GitHubリポジトリの秘密鍵が標的</strong>: プライベートリポジトリであっても、CI環境でコードとともにシークレットが管理されていれば窃取される。</li>
        <li><strong>クラウドへの二次侵害が最大のリスク</strong>: AWSアクセスキーが盗まれると、S3バケット内の顧客データ・個人情報・製品ソースコードが丸ごと持ち出されるリスクがある。</li>
      </ul>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>影響を受けたバージョンの特定</h3>
      <ul>
        <li>Trivy: 2026年3月19日前後のバージョンを使用していたか確認。最新版へ更新する</li>
        <li>KICS（Checkmarx）: 同時期にCI/CDで実行していた場合は要確認</li>
        <li>LiteLLM: バージョン 1.82.7・1.82.8 を使用していた場合は即座に更新し、全APIキーをローテーション</li>
      </ul>
      <h3>シークレットのローテーション</h3>
      <ul>
        <li>影響を受けた期間にCIで実行されたシークレット（AWSアクセスキー・GitHub PAT・OpenAI APIキー等）をすべてローテーションする</li>
        <li>ローテーション後、古いキーでのアクセスがないかCloudTrail・GitHub監査ログで確認する</li>
      </ul>
      <h3>長命シークレットの排除</h3>
      <ul>
        <li>AWSアクセスキー（長命）→ <strong>OIDC＋IAMロール</strong>に切り替え（キー自体を持たない設計にする）</li>
        <li>GitHub PAT（長命）→ <strong>Fine-grained PAT</strong> または <strong>GitHub Apps</strong> で最小権限・短命に変更</li>
        <li>LLM APIキー → 環境ごとに分離し、CIでは短命トークンやVaultを使用する</li>
      </ul>
      <h3>サードパーティツールのバージョン固定</h3>
      <ul>
        <li>CI/CDで使うOSSツールはタグではなく<strong>コミットSHAで固定</strong>する（<a href="/learn/security/github-actions-supply-chain">GitHub Actions サプライチェーン攻撃</a>参照）</li>
        <li>PyPIパッケージはハッシュ検証付きの<code>requirements.txt</code>を使用する</li>
      </ul>

      <h2>参考情報</h2>
      <ul>
        <li>Wiz Blog: <em>Tracking TeamPCP: Investigating Post-Compromise Attacks Seen in the Wild</em></li>
        <li>SecurityWeek: <em>TeamPCP Moves From OSS to AWS Environments</em></li>
        <li>Endor Labs: <em>TeamPCP Isn&apos;t Done: Threat Actor Behind Trivy and KICS Compromises Now Hits LiteLLM</em></li>
        <li>Dark Reading: <em>TeamPCP Breaches Cloud, SaaS Instances with Stolen Credentials</em></li>
        <li>Palo Alto Unit42: <em>Weaponizing the Protectors: TeamPCP&apos;s Multi-Stage Supply Chain Attack on Security Infrastructure</em></li>
      </ul>
      <p>
        OSS経由のサプライチェーン攻撃の全体像は <a href="/learn/security/supply-chain-attacks">ソフトウェアサプライチェーン攻撃</a>、CI/CDパイプラインへの攻撃は <a href="/learn/security/github-actions-supply-chain">GitHub Actions サプライチェーン攻撃</a> も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
