import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "supply-chain-attacks")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        現代のソフトウェアは、自分が書いたコードより<strong>取り込んだ依存パッケージの方が圧倒的に多い</strong>のが当たり前です。<code>npm install</code> 一発で何百もの第三者コードが自分の環境とCIで実行される——その信頼を逆手に取るのが<strong>ソフトウェアサプライチェーン攻撃</strong>です。Sonatype は<strong>累計120万件超の悪性パッケージ</strong>を追跡しており、2025年9月の自己増殖ワーム{" "}
        <strong>Shai-Hulud</strong>{" "}
        以降、攻撃の頻度と技術的な深さは「いたずらの時代」から「高被害の時代」へと一段上がりました。
      </p>
      <p>
        本記事は、個別事件の速報ではなく、<strong>npm/PyPIを狙う攻撃を6つの類型に整理</strong>し、2026年の実例とともに「どこを守ればよいか」を体系立てて解説します。攻撃の入口は違っても、防御の勘所は共通しています。
      </p>

      <h2>なぜ依存パッケージが狙われるのか</h2>
      <p>
        理由は単純で、<strong>費用対効果が圧倒的</strong>だからです。人気パッケージを1つ汚染できれば、それを使う<strong>何千ものプロジェクトとCI環境に一気に到達</strong>できます。しかもパッケージのインストールは、多くの場合<strong>スクリプトの自動実行</strong>を伴います。
      </p>
      <ul>
        <li><strong>npm</strong>：<code>preinstall</code> / <code>postinstall</code> などのライフサイクルスクリプトが、<strong>依存の検証より前・インストール時に自動実行</strong>される。</li>
        <li><strong>Python（PyPI）</strong>：<code>setup.py</code> の実行や、<strong>import した瞬間のコード実行</strong>が悪用される。</li>
      </ul>
      <p>
        つまり「インストールしただけ」「import しただけ」で、開発者のトークン・環境変数・クラウド認証情報が抜かれ得ます。狙われるのは最終的に<strong>CIのシークレットとクラウドの鍵</strong>です。
      </p>

      <h2>サプライチェーン攻撃の6類型</h2>
      <p>
        まず全体像を早見表で押さえます。入口（どこを突くか）は異なりますが、後述するとおり<strong>防御の勘所は共通</strong>です。
      </p>
      <table>
        <thead>
          <tr>
            <th>類型</th>
            <th>入口（突くポイント）</th>
            <th>代表例</th>
            <th>主な防御</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>タイポスクワッティング</td>
            <td>名前の打ち間違い</td>
            <td><code>boto3</code> 等の1文字違い</td>
            <td>許可リスト・名前の確認</td>
          </tr>
          <tr>
            <td>依存関係混同</td>
            <td>社内名と公開名の衝突</td>
            <td>高バージョンで公開側を優先</td>
            <td>スコープ付きレジストリ・社内名の秘匿</td>
          </tr>
          <tr>
            <td>slopsquatting</td>
            <td>AI の幻覚パッケージ名</td>
            <td>AI 提案名を先回り登録</td>
            <td>実在確認・許可リスト</td>
          </tr>
          <tr>
            <td>メンテナ乗っ取り</td>
            <td>公開アカウントの奪取</td>
            <td>TanStack / Mistral 等の汚染</td>
            <td>フィッシング耐性 MFA・Trusted Publishing</td>
          </tr>
          <tr>
            <td>悪意あるスクリプト</td>
            <td>install / import 時の自動実行</td>
            <td>preinstall 窃取・TrapDoor</td>
            <td><code>--ignore-scripts</code>・環境分離</td>
          </tr>
          <tr>
            <td>自己増殖ワーム</td>
            <td>盗んだ公開トークンで連鎖</td>
            <td>Shai-Hulud 系</td>
            <td>短命トークン・即 rotate</td>
          </tr>
        </tbody>
      </table>
      <h3>1. タイポスクワッティング（typosquatting）</h3>
      <p>
        人気パッケージと<strong>1文字違いの名前</strong>で悪性パッケージを公開し、打ち間違いを待つ手口。2026年初頭には PyPI で <code>boto3</code>・<code>requests</code>・<code>numpy</code> 等の<strong>1文字違い</strong>を狙うキャンペーンがあり、import 時にリバースシェルを張り、環境変数を窃取しました。データサイエンス／ML チームが標的でした。
      </p>
      <h3>2. 依存関係混同（dependency confusion）</h3>
      <p>
        社内のプライベートパッケージと<strong>同名のパッケージを公開レジストリに、より高いバージョン番号で公開</strong>する手口。ビルドツールが「新しい方」を優先して公開側を取り込んでしまう設定の隙を突きます。社内名がソースやログから漏れていると刺さります。
      </p>
      <h3>3. slopsquatting（AIの幻覚を悪用）</h3>
      <p>
        2026年ならではの新類型です。AIコーディングツールは、<strong>実在しないパッケージ名を「もっともらしく」提案（ハルシネーション）</strong>することがあります。攻撃者は<strong>AIがよく幻覚する名前を先回りして登録</strong>し、開発者がAIの提案を鵜呑みに <code>install</code> するのを待ちます。「AIが言ったから存在するはず」という思い込みが穴になります。
      </p>
      <h3>4. メンテナアカウント乗っ取り</h3>
      <p>
        <strong>正規パッケージの作者アカウントを乗っ取り、本物のパッケージに悪性コードを仕込む</strong>手口。フィッシングや{" "}
        <a href="/learn/security/infostealer-session-hijacking">トークン窃取</a>{" "}
        で公開権限を奪います。2026年には <strong>TanStack・Mistral AI・UiPath・OpenSearch</strong> など実在の有名パッケージ群がまとめて汚染され、<strong>累計5.18億ダウンロード規模</strong>に影響しました。利用者からは「いつもの信頼できるパッケージ」に見えるため発見が遅れます。
      </p>
      <h3>5. 悪意あるインストール／ライフサイクルスクリプト</h3>
      <p>
        前述の <code>preinstall</code> / <code>postinstall</code> や import 時実行を悪用するもの。2026年4月の <strong>SAP関連npmパッケージ</strong>侵害では、<strong>preinstall スクリプトが検証や多くのセキュリティツールが走る前に実行</strong>され、認証情報を窃取しました。<strong>TrapDoor</strong> キャンペーン（2026年5月〜）は npm・PyPI・crates.io にまたがり、<strong>34超のパッケージ・384超のバージョン</strong>を、暗号通貨・AIツール・セキュリティ関連を装った名前で配布しています。
      </p>
      <h3>6. 自己増殖ワーム</h3>
      <p>
        最も新しく、最も厄介な類型。汚染されたパッケージが<strong>感染した開発者のトークンを使って、その人の他のパッケージへ自動的に感染を広げる</strong>。{" "}
        <strong>Shai-Hulud</strong>{" "}
        がその嚆矢で、2025年12月の <strong>Shai-Hulud 2.0</strong>、2026年5月の <strong>Mini Shai-Hulud</strong>（170超のnpm＋PyPIパッケージ、404の悪性バージョン、「Shai-Hulud: Here We Go Again」を含む400超のリポジトリ作成）と<strong>再来・変異</strong>を繰り返しています。人手を介さず連鎖するため、被害が指数関数的に広がります。
      </p>

      <h2>図解案：汚染がCIのシークレットに届くまで</h2>
      <pre>
        <code>{`[攻撃者] 6類型のいずれかで悪性パッケージを公開/汚染
      │
      ▼
[開発者/CI] npm install ・ pip install
      │ postinstall(npm) / import時実行(Python) が自動発火
      ▼
[実行環境] 環境変数・.npmrc・クラウド鍵・CIシークレットを窃取
      │
      ├─▶ クラウド侵害（漏れた鍵で本番へ）
      └─▶ 盗んだ公開トークンで他パッケージへ感染（=ワーム化）

★ 守る要点：①取り込む前に止める ②install時の自動実行を抑える
            ③漏れても被害を限定する（最小権限・環境分離）`}</code>
      </pre>

      <h2>防御策</h2>
      <h3>取り込む前に止める（入口）</h3>
      <ul>
        <li><strong>バージョン固定とlockfile</strong>：<code>package-lock.json</code> / <code>poetry.lock</code> で完全性ハッシュ込みに固定。勝手な更新で汚染版を引き込まない。</li>
        <li><strong>導入前のクールダウン</strong>：公開直後の新バージョンを即採用せず、数日寝かせて事故報告を待つ。ワーム対策に有効。</li>
        <li><strong>リポジトリファイアウォール／許可リスト</strong>：未知・新規・低評価のパッケージをプロキシでブロックし、承認済みのみ通す。タイポスクワッティング／slopsquatting を入口で弾く。</li>
        <li><strong>名前を確認する習慣</strong>：AIが提案したパッケージ名を<strong>そのまま信じず実在と正当性を確認</strong>。社内名と公開名の衝突（依存関係混同）にも注意。</li>
      </ul>
      <h3>インストール時の自動実行を抑える（実行）</h3>
      <ul>
        <li><strong><code>--ignore-scripts</code></strong> を既定にし、必要なパッケージだけ明示的に許可する。ライフサイクルスクリプト悪用の大半を無効化できる。</li>
        <li><strong>CIを最小権限・環境分離で</strong>：ビルドジョブからクラウド本番鍵を見えなくする。シークレットはジョブ単位でスコープし、<strong>短命トークン</strong>に。</li>
      </ul>
      <h3>供給側・組織の信頼を固める</h3>
      <ul>
        <li><strong>Trusted Publishing（OIDC）</strong>：長命な公開トークンを廃し、CIからの署名付き短命認証で公開する。メンテナアカウント乗っ取りの被害を縮小。</li>
        <li><strong>メンテナ認証の強化</strong>：公開アカウントに<a href="/learn/security/mfa-totp-fido2">フィッシング耐性のあるMFA（Passkey/FIDO2）</a>を必須化。</li>
        <li><strong>署名・来歴（provenance）</strong>：npm provenance や Sigstore で「どのソース・どのCIから来たか」を検証可能にする。</li>
      </ul>
      <h3>漏れても被害を限定する（可視化と対応）</h3>
      <ul>
        <li><strong>SBOM（ソフトウェア部品表）と継続スキャン</strong>：「いま何のどのバージョンが入っているか」を即答できる状態に。既知の悪性パッケージとの照合を自動化する。</li>
        <li><strong>侵害時はトークン即rotate</strong>：漏れた可能性のある認証情報・公開トークンを直ちに失効・再発行。ワームの連鎖を断つ。</li>
      </ul>

      <h2>導入チェックリスト</h2>
      <ul>
        <li>☐ lockfile（<code>package-lock.json</code> / <code>poetry.lock</code> 等）を完全性ハッシュ込みでコミットしている</li>
        <li>☐ 公開直後の新バージョンを即採用せず、クールダウン期間を設けている</li>
        <li>☐ CI / ローカルで <code>--ignore-scripts</code> を既定にし、必要な物だけ許可している</li>
        <li>☐ CI のシークレットはジョブ単位スコープ＋短命トークンで、本番クラウド鍵がビルドから見えない</li>
        <li>☐ 公開アカウントにフィッシング耐性 MFA、可能なら Trusted Publishing(OIDC) を使用</li>
        <li>☐ SBOM を管理し、既知の悪性パッケージとの照合を自動化している</li>
        <li>☐ 侵害時にトークンを即 rotate する手順が用意されている</li>
        <li>☐ AI が提案したパッケージ名を、そのまま install せず実在・正当性を確認している</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        サプライチェーン攻撃は、<strong>「開発の土台になっている信頼」そのものを武器化</strong>します。6類型（タイポスクワッティング／依存関係混同／slopsquatting／メンテナ乗っ取り／悪意あるスクリプト／自己増殖ワーム）は入口こそ違え、ゴールは共通——<strong>install/import の自動実行を足がかりに、CIのシークレットとクラウドの鍵を奪う</strong>ことです。
      </p>
      <p>
        守りも共通します。<strong>取り込む前に止める（固定・クールダウン・許可リスト）、install時の自動実行を抑える（--ignore-scripts・環境分離）、漏れても限定する（最小権限・SBOM・即rotate）</strong>。AIエージェント基盤に固有のサプライチェーンは{" "}
        <a href="/learn/security/mcp-security">MCPのセキュリティ</a>{" "}
        も合わせてご覧ください。
      </p>
      <p>
        ※ 本記事のキャンペーン名・統計値・パッケージ名は、Sonatype／Unit 42／Microsoft／各セキュリティベンダーの公表内容および報道に基づきます。状況は急速に更新されるため、対応時は最新の公式情報をご確認ください。
      </p>

      <h2>参考（一次情報）</h2>
      <ul>
        <li>
          <a href="https://www.sonatype.com/state-of-the-software-supply-chain/introduction" target="_blank" rel="noopener noreferrer">
            Sonatype — State of the Software Supply Chain
          </a>
        </li>
        <li>
          <a href="https://slsa.dev/" target="_blank" rel="noopener noreferrer">
            SLSA — Supply-chain Levels for Software Artifacts
          </a>
        </li>
        <li>
          <a href="https://docs.npmjs.com/generating-provenance-statements" target="_blank" rel="noopener noreferrer">
            npm — Generating provenance statements（来歴の検証）
          </a>
        </li>
      </ul>
    </ArticleLayout>
  );
}
