import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "github-actions-supply-chain")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>GitHub Actions が狙われる理由</h2>
      <p>
        GitHub Actions は、コードのビルド・テスト・デプロイを自動化する CI/CD プラットフォームです。ワークフローはリポジトリの <code>.github/workflows/</code> に YAML ファイルとして置かれ、push やプルリクエストをトリガーに自動実行されます。
      </p>
      <p>
        攻撃者が GitHub Actions を狙う理由は単純です——ワークフローは <strong>クラウド認証情報・API キー・デプロイトークン</strong>など、本番環境への鍵が集まる場所だからです。<a href="/learn/security/supply-chain-attacks">npm/PyPI のサプライチェーン攻撃</a>が「パッケージ経由でインストール時に実行」を狙うのに対し、GitHub Actions 攻撃は <strong>CI/CD パイプラインそのものに侵入してシークレットを抜く</strong>手口です。2025年はこの手口による大規模インシデントが3件立て続けに発生しました。
      </p>

      <h2>2025年の主要インシデント</h2>

      <h3>① tj-actions/changed-files（CVE-2025-30066）— 2025年3月</h3>
      <p>
        <strong>何が起きたか</strong>: GitHub Actions マーケットプレイスで人気 No.1 クラスの Action である <code>tj-actions/changed-files</code>（PR で変更されたファイルを検出するツール）のリポジトリが侵害されました。攻撃者はタグ v1〜v45.0.7 を悪性コミットへ書き換え、<strong>2.3万件以上のリポジトリ</strong>のワークフロー実行時に、Runner のメモリ上のシークレットをワークフローログへ出力させました。
      </p>
      <p>
        <strong>侵入経路</strong>: Coinbase のリポジトリから盗んだ GitHub トークンを使って、攻撃者は renovate[bot]（依存更新ボット）になりすましてコミットを押し込みました。正規ボットの自動マージ設定が踏み台にされ、人間のコードレビューを通らずにマルウェアが紛れ込みました。
      </p>
      <p>
        <strong>盗まれた情報</strong>: GitHub PAT（Personal Access Token）、npm トークン、AWS アクセスキー、RSA 秘密鍵などが、ワークフローログ（パブリックリポジトリでは世界公開）に Base64 エンコードで書き出されました。
      </p>
      <p>
        <strong>根本原因</strong>: アクションをバージョンタグ（<code>v45</code>）で参照していたため、タグの指す先を書き換えられると全利用者が影響を受けました。v46.0.1 で修正済み。CISA も緊急アラートを発出しました。
      </p>

      <h3>② GhostAction キャンペーン — 2025年9月</h3>
      <p>
        <strong>何が起きたか</strong>: GitGuardian が2025年9月5日に発見したキャンペーン。攻撃者は <strong>327個の GitHub ユーザーアカウント</strong>を乗っ取り、<strong>817リポジトリ</strong>に悪性のワークフローファイルを直接コミットしました。「GitHub Actions Security」という無害そうなファイル名で偽装し、CI/CD 実行時にシークレットを外部サーバーへ送信させる仕組みです。
      </p>
      <p>
        <strong>被害規模</strong>: PyPI トークン、npm トークン、DockerHub 認証情報、GitHub トークン、AWS アクセスキーを含む <strong>3,325件のシークレット</strong>が窃取されました。窃取したシークレットの悪用（AWS キーや DB 認証情報の実際の使用）も確認されています。
      </p>
      <p>
        <strong>侵入経路</strong>: アカウント乗っ取りには<a href="/learn/security/infostealer-session-hijacking">インフォスティーラー</a>やフィッシングが使われたと推定されています。正規のリポジトリオーナーのアカウントで操作するため、外部からは正規の変更に見えます。
      </p>

      <h3>③ Megalodon — 2025年5月</h3>
      <p>
        <strong>何が起きたか</strong>: 2025年5月18日、約6時間の間に <strong>5,561リポジトリ・5,718件</strong>の悪性コミットが自動化ツールで一斉に投入されました。コミットメッセージは CI メンテナンス作業を装い、悪性ワークフローを仕込みました。感染が確認された時点で、攻撃者の C2 サーバーには<strong>数十ギガバイト</strong>の盗取データが蓄積されていました。
      </p>
      <p>
        <strong>標的データ</strong>: AWS/GCP/Azure 認証情報、SSH 秘密鍵、Docker/Kubernetes 設定、データベース接続文字列、GitHub/GitLab トークン、その他すべての CI 環境変数が対象でした。
      </p>
      <p>
        <strong>感染の起点</strong>: オープンソースのチャットプラットフォーム Tiledesk の npm パッケージが汚染され、そのリポジトリが悪性ワークフローを含む状態で公開されたことが引き金でした。パッケージ汚染と GitHub Actions 攻撃が連鎖した複合型サプライチェーン攻撃です。
      </p>

      <h2>攻撃手口の整理: 3つの侵入パターン</h2>
      <table>
        <thead>
          <tr>
            <th>パターン</th>
            <th>侵入経路</th>
            <th>代表インシデント</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Action リポジトリの乗っ取り</td>
            <td>Action 作者のアカウントや CI トークンを奪い、Action 自体に悪性コードを仕込む</td>
            <td>tj-actions/changed-files</td>
          </tr>
          <tr>
            <td>利用者リポジトリへの直接コミット</td>
            <td>リポジトリオーナーのアカウントを奪い、悪性ワークフローを追加・改ざんする</td>
            <td>GhostAction</td>
          </tr>
          <tr>
            <td>自動化による大量投入</td>
            <td>ボットで多数リポジトリへ一斉にワークフローをプッシュ</td>
            <td>Megalodon</td>
          </tr>
        </tbody>
      </table>

      <h2>タグ可変性の問題——なぜ SHA ピンが必要か</h2>
      <p>
        GitHub Actions でサードパーティの Action を使うとき、多くの開発者はこう書きます:
      </p>
      <pre><code>{`- uses: tj-actions/changed-files@v45  # タグ指定`}</code></pre>
      <p>
        Git のタグは後から書き換えられます。攻撃者が Action リポジトリへの書き込み権限を得ると、<code>v45</code> タグを悪性コミットへ付け替えるだけで、全利用者が次回実行時に悪性コードを取り込みます。これが tj-actions で起きたことです。
      </p>
      <p>
        対して、<strong>コミット SHA で固定（SHA ピン）</strong>すると、ハッシュは内容に紐付くため書き換えが不可能です:
      </p>
      <pre><code>{`# タグ指定（危険 — タグが書き換えられると悪性コードを取り込む）
- uses: tj-actions/changed-files@v45

# SHA ピン（安全 — ハッシュが変わると動かないので改ざんに気づける）
- uses: tj-actions/changed-files@0e58ed8b...  # 完全な 40 文字の SHA`}</code></pre>
      <p>
        2025年8月、GitHub は <strong>SHA ピン強制ポリシー</strong>（ピンされていない Action を使うとワークフローが失敗する設定）と、特定 Action の即時ブロック機能（<code>!compromised-org/action</code>）を追加しました。
      </p>

      <h2>対策</h2>

      <h3>1. Action を SHA でピンする</h3>
      <p>
        サードパーティの Action は必ず <strong>完全な 40 文字のコミット SHA</strong> で参照します。タグやブランチ名（<code>main</code>）はいずれも可変で危険です。<a href="https://github.com/renovatebot/renovate">Renovate</a> や <a href="https://github.com/dependabot">Dependabot</a> は SHA ピンのまま自動更新 PR を出せます。
      </p>

      <h3>2. OIDC で短命トークンを使う</h3>
      <p>
        AWS・GCP・Azure などクラウドへのデプロイに長命な認証情報（アクセスキーなど）をシークレットに保存せず、<strong>OIDC（OpenID Connect）</strong>でワークフロー実行ごとに短命トークンを取得します。トークンが盗まれても数分〜数時間で失効するため、被害を限定できます。
      </p>
      <pre><code>{`# GitHub Actions で AWS OIDC を使う例
permissions:
  id-token: write  # OIDC トークン取得に必要
  contents: read

steps:
  - uses: aws-actions/configure-aws-credentials@<SHA>
    with:
      role-to-assume: arn:aws:iam::123456789:role/github-actions
      aws-region: ap-northeast-1
      # アクセスキーの代わりに OIDC で一時認証情報を取得`}</code></pre>

      <h3>3. GITHUB_TOKEN の権限を最小化する</h3>
      <p>
        デフォルトで <code>GITHUB_TOKEN</code> には read-write の広い権限が付いています。ワークフローに必要な権限だけを明示的に指定します:
      </p>
      <pre><code>{`permissions:
  contents: read   # 必要な権限だけを列挙
  pull-requests: write
  # その他は暗黙的に none になる`}</code></pre>

      <h3>4. ワークフローファイルをコードと同等にレビューする</h3>
      <p>
        <code>.github/workflows/</code> への変更は、アプリケーションコードと同じレビュープロセスを通します。GhostAction や Megalodon は「無害な CI 設定ファイルに見える」形で投入されました。ワークフロー変更は <strong>CODEOWNERS</strong> でシニアメンバーの承認必須にすることを検討します。
      </p>

      <h3>5. サードパーティ Action の使用を絞る</h3>
      <p>
        マーケットプレイスの Action は、実体は誰かの個人リポジトリです。本当に必要なものだけを使い、メンテナーが少ない・更新が止まっているものは GitHub 公式 Action や社内 Action で代替します。
      </p>

      <h3>6. シークレット漏洩を早期検知する</h3>
      <p>
        GitHub の <strong>Secret scanning</strong>（デフォルト有効）を確認します。GitGuardian などの外部サービスも、漏洩したシークレットがワークフローログに流れた際に検知・アラートを出せます。検知したらトークンをすぐに失効・ローテーションします。
      </p>

      <h2>まとめ</h2>
      <p>
        2025年の tj-actions/changed-files・GhostAction・Megalodon の3件は、GitHub Actions が CI/CD パイプラインに組み込まれるほど、そこに集まるシークレットが攻撃者にとって魅力的なターゲットになることを示しました。共通する防御の核心は <strong>① SHA ピンで Action の書き換えを無効化、② OIDC で長命なシークレットを排除、③ 最小権限でトークンの影響を限定する</strong>——の3点です。
      </p>
      <p>
        npm/PyPI パッケージ経由の攻撃パターンは<a href="/learn/security/supply-chain-attacks">ソフトウェアサプライチェーン攻撃</a>、自己増殖ワームの詳細は<a href="/learn/security/shai-hulud">Shai-Hulud 詳解</a>も合わせてご覧ください。
      </p>
      <p>
        ※ 本記事の事件概要・数値・タイムラインは Unit42・GitGuardian・StepSecurity・CISA・SecurityWeek の公表内容に基づきます。対応時は最新の公式情報を確認してください。
      </p>
    </ArticleLayout>
  );
}
