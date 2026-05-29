import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "shai-hulud")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>Shai-Hulud とは</h2>
      <p>
        <strong>Shai-Hulud</strong> は、2025年9月に観測された <strong>npm エコシステム史上初の「自己増殖型」サプライチェーンワーム</strong>です。攻撃者の手を離れても自動で増殖する点が新しく、CISA も警告を出しました。報告ベースで <strong>数百名の開発者・2万5千を超えるリポジトリ</strong>に影響したとされ、その年のサプライチェーン攻撃を象徴する事例になりました。
      </p>
      <p>
        従来の汚染パッケージ攻撃は「攻撃者が1回だけ毒入りバージョンを公開する」ものでしたが、Shai-Hulud は<strong>感染した開発者の認証情報を使って次々と別パッケージへ感染を広げる</strong>ワーム的挙動を持ちます。
      </p>

      <h2>自己増殖の仕組み</h2>
      <p>
        npm のパッケージは、インストール時に <code>package.json</code> の <strong>ライフサイクルスクリプト（preinstall / postinstall など）</strong>を自動実行します。Shai-Hulud はここを悪用します。
      </p>
      <ol>
        <li>毒入りバージョンに <strong>preinstall / postinstall スクリプト</strong>を仕込む。</li>
        <li>開発者や CI ランナーが依存をインストールすると、そのスクリプトが<strong>自動実行</strong>される。</li>
        <li>実行環境から <strong>npm トークン・GitHub トークン・CI/CD のシークレット</strong>を収集する。</li>
        <li>盗んだトークンで、その開発者が管理する<strong>他の正規パッケージを毒入りバージョンとして再公開</strong>する。</li>
        <li>再公開されたパッケージの利用者の環境で 2〜4 が繰り返され、<strong>連鎖的に拡散</strong>する。</li>
      </ol>
      <p>
        概念的には、毒入りパッケージの <code>package.json</code> はこのような形になります（実害コードは伏せています）。
      </p>
      <pre><code>{`{
  "name": "popular-lib",
  "version": "1.2.4",
  "scripts": {
    "postinstall": "node ./setup.js"  // ← install 時に自動実行され、認証情報を収集
  }
}`}</code></pre>
      <p>
        盗まれた認証情報の一部は<strong>公開 GitHub リポジトリに暴露</strong>されるなど、二次被害も伴いました。CI/CD のトークンは権限が強いことが多く、1つの感染が組織全体のサプライチェーンへ波及しうる点が深刻です。
      </p>

      <h2>その後の進化</h2>
      <ul>
        <li><strong>第2世代（SHA1-Hulud, 2025年11月頃）</strong>: 認証情報の収集機能が強化され、<strong>ワイパー（破壊）機能</strong>も加わったと報告されています。</li>
        <li><strong>CI/CD 適応型の亜種</strong>: パイプライン構造を列挙してから増殖方法を選ぶなど、環境に応じた挙動が確認されました。</li>
        <li><strong>派生（Mini Shai-Hulud 系）</strong>: npm だけでなく <strong>PyPI</strong> にも波及するなど、手口が他エコシステムへ拡散しました。</li>
      </ul>
      <p>
        「一度きりの汚染」から「自動で増え続ける感染」へと攻撃モデルが変化したことを示す事例です。
      </p>

      <h2>なぜ npm で成立してしまうのか</h2>
      <ul>
        <li><strong>ライフサイクルスクリプトが install 時に自動実行される</strong>: 任意コードがインストールだけで走る。</li>
        <li><strong>推移的依存の多さ</strong>: 1つのアプリが数百〜数千のパッケージに依存し、すべてを精査するのは困難。</li>
        <li><strong>信頼の連鎖</strong>: メンテナのトークンが盗まれると、そのメンテナを信頼するすべての利用者が危険にさらされる。</li>
        <li><strong>publish の容易さ</strong>: トークンさえあれば自動で新バージョンを公開できる。</li>
      </ul>

      <h2>対策（開発者・チーム側）</h2>
      <ol>
        <li>
          <strong>lockfile + クリーンインストール</strong>: <code>package-lock.json</code> をコミットし、CI では <code>npm ci</code> を使って固定バージョンを再現する。
        </li>
        <li>
          <strong>ライフサイクルスクリプトの無効化</strong>: 信頼できないインストール時は自動実行を止める。
          <pre><code>{`# その場だけ無効化
npm ci --ignore-scripts

# 恒久設定（必要な依存だけ個別に許可する運用に）
npm config set ignore-scripts true`}</code></pre>
        </li>
        <li><strong>新バージョンの即時導入を避ける</strong>: 公開直後の取り込みを少し遅らせ、汚染版が撤回される猶予を持つ（バージョンの「冷却期間」）。</li>
        <li><strong>依存の可視化・監視</strong>: Dependabot / Socket などで不審な依存・postinstall・メンテナ変更を検知し、SBOM で「今どのバージョンを使っているか」を即答できる状態にする。</li>
      </ol>

      <h2>対策（公開者・CI 側）</h2>
      <ol>
        <li><strong>npm の 2FA を必須化</strong>し、publish にも多要素を要求する。</li>
        <li><strong>長命トークンを避ける</strong>: 粒度の細かい（granular）・短命のトークンを使い、CI では <strong>OIDC によるトークンレス公開（Trusted Publishing）+ provenance（来歴）</strong>を活用する。</li>
        <li><strong>CI シークレットの最小権限化</strong>: ビルドジョブから publish 権限や強い GitHub トークンを切り離し、シークレットスキャンで漏えいを検知する。</li>
        <li><strong>漏えい時は即ローテーション</strong>: npm/GitHub/CI のトークンを失効・再発行し、不審な公開バージョンを確認する。</li>
      </ol>

      <h2>感染が疑われたら</h2>
      <ul>
        <li>npm・GitHub・CI/CD の<strong>全トークンを即ローテーション</strong>する。</li>
        <li>自分が管理するパッケージに<strong>身に覚えのない公開バージョンがないか</strong>確認する。</li>
        <li><code>package-lock.json</code> の差分や、依存に追加された <code>postinstall</code> をレビューする。</li>
        <li>影響パッケージは安全なバージョンへ<strong>ダウングレード/固定</strong>し、環境を作り直す。</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        Shai-Hulud は、<strong>「インストールするだけで任意コードが走り、盗んだ認証情報でさらに増殖する」</strong>という npm の構造的弱点を突いた自己増殖ワームでした。OWASP でいう <strong>A08:2021 - Software and Data Integrity Failures</strong>（ソフトウェアとデータの整合性の欠如）に直結するテーマです。
      </p>
      <p>
        鉄則は <strong>(1) lockfile + <code>npm ci</code>、(2) 不要なライフサイクルスクリプトの無効化、(3) 短命・最小権限トークンと 2FA、(4) 依存の可視化と即時ローテーション</strong>。サプライチェーンは「信頼の連鎖」であり、その一点を守ることが全体の防御になります。
      </p>
      <p>
        関連リスクの全体像は <a href="/learn/security/owasp-top-10">OWASP Top 10 入門</a>、同時期のフレームワーク脆弱性は <a href="/learn/security/react2shell">React2Shell（CVE-2025-55182）詳解</a> も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
