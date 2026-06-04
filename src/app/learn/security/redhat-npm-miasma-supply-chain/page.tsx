import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "redhat-npm-miasma-supply-chain")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        信頼できる大手ベンダーが公開しているパッケージなら安全——その思い込みが突き崩される事案が、また起きた。2026年6月1日、npmの<strong>@redhat-cloud-services</strong>名前空間で、Red Hatの正規パッケージにバックドアが仕込まれて公開される<strong>サプライチェーン攻撃</strong>が発覚した。攻撃者はRed Hat従業員のGitHubアカウントを乗っ取り、CIの仕組みを悪用して<strong>コードレビューを丸ごと迂回</strong>。混入したのは、開発者の認証情報を盗みながら自己増殖する4.2MBのワーム「<strong>Miasma</strong>」だった。本稿では、この攻撃の何が新しく、開発組織が何を確認すべきかを解説する。
      </p>

      <h2>概要</h2>
      <ul>
        <li>
          <strong>発覚日</strong>：2026年6月1日。
        </li>
        <li>
          <strong>対象</strong>：npmの<strong>@redhat-cloud-services</strong>名前空間。<strong>32パッケージ・96バージョン</strong>が汚染。合計の週間ダウンロードは約<strong>116,991回</strong>。
        </li>
        <li>
          <strong>侵入経路</strong>：Red Hat従業員の<strong>GitHubアカウント乗っ取り</strong>。攻撃者が悪性のワークフローファイルとスクリプトをリポジトリに注入し、<strong>コードレビューを完全に迂回</strong>。
        </li>
        <li>
          <strong>公開手段</strong>：改ざんした<code>ci.yaml</code>ワークフローが<strong>GitHub Actions のOIDCトークン</strong>を使って、バックドア入りパッケージを正規に公開した。
        </li>
        <li>
          <strong>ペイロード</strong>：4.2MBの難読化された<strong>認証情報窃取ワーム「Miasma」</strong>。npmインストール時の<code>preinstall</code>スクリプトで実行される。
        </li>
      </ul>

      <h2>何が起きたのか</h2>
      <p>
        @redhat-cloud-servicesは、Red Hatのクラウドサービス関連のnpmパッケージが置かれた名前空間だ。2026年6月1日、この名前空間の複数パッケージに、攻撃者がバックドアを仕込んだ新バージョンを公開した。汚染は32パッケージ・96バージョンに及び、週あたり10万回以上ダウンロードされる規模だったため、影響は広範に及びうる。
      </p>
      <p>
        攻撃の起点は、Red Hat従業員の<strong>GitHubアカウントの乗っ取り</strong>だった。攻撃者はその権限を使ってリポジトリに悪性のワークフローファイルとスクリプトを直接注入し、本来必要なはずの<strong>コードレビューのプロセスを一切通さずに</strong>変更を反映させた。さらに巧妙なのは公開の方法だ。改ざんされた<code>ci.yaml</code>（GitHub Actionsの定義ファイル）が、<strong>GitHub Actionsの OIDC トークン</strong>を悪用してnpmへバックドア入りパッケージを公開した。これは「正規のCIパイプラインが正規のトークンで公開した」形になるため、外形上は何の異常もない正規リリースに見える。
      </p>
      <p>
        混入したマルウェアは「Miasma」と名付けられた、4.2MBの難読化された認証情報窃取ワームだ。npmでインストールされる際の<code>preinstall</code>スクリプトとして実行され、開発者やCI環境の機密情報を収集する。そして、<strong>被害者アカウントがアクセスできる他のパッケージにバックドア版を再公開</strong>することで感染を連鎖させる——典型的なワーム（自己増殖型）の挙動だ。
      </p>

      <h2>技術的な解説</h2>
      <h3>「コードレビュー迂回」と「正規CIによる公開」が肝</h3>
      <p>
        通常、パッケージの公開には複数の安全装置がある。プルリクエストのレビュー、ブランチ保護、二要素認証などだ。今回の攻撃は、これらを正面から破るのではなく<strong>横から回り込んだ</strong>。
      </p>
      <ul>
        <li>
          <strong>アカウント乗っ取り</strong>で正規開発者になりすませば、リポジトリへの書き込み権限を得られる。
        </li>
        <li>
          <strong>ワークフローファイル（CI定義）自体を改ざん</strong>すると、レビュー対象の「アプリケーションコード」ではなく「ビルド・公開の仕組み」を乗っ取れる。多くの組織はアプリコードはレビューしても、CI定義の変更を同じ厳格さでレビューしていない。
        </li>
        <li>
          <strong>OIDCトークンによる公開</strong>は、長期の固定トークンを使わずに済む正規のモダンな仕組みだが、ワークフロー自体が汚染されていればそのまま悪用される。
        </li>
      </ul>
      <p>
        結果として、「信頼された大手ベンダーが、正規のCIで、正規の方法で公開した」パッケージの中身だけが悪性、という最も見抜きにくい形が成立した。
      </p>
      <h3>preinstallスクリプトという実行トリガー</h3>
      <p>
        Miasmaは<code>preinstall</code>ライフサイクルスクリプトで動く。npmはパッケージのインストール時に<code>preinstall</code>/<code>install</code>/<code>postinstall</code>といったスクリプトを<strong>自動実行</strong>する仕様で、ここに悪性コードを置けば、開発者が<code>npm install</code>した瞬間に——コードを一行も呼び出していなくても——マルウェアが走る。これはnpm系サプライチェーン攻撃の常套手段だ。
      </p>
      <h3>何を盗み、どう広がるのか</h3>
      <p>
        Miasmaが収集する対象は、現代の開発・クラウド環境の「鍵束」そのものだ。
      </p>
      <ul>
        <li>AWS／GCP／Azureのクラウド認証情報</li>
        <li>GitHub Actionsのシークレット、npm／PyPIの公開トークン</li>
        <li>SSH鍵、GPG鍵</li>
        <li>Kubernetes設定（kubeconfig）、Docker認証情報</li>
        <li><code>.env</code>ファイル（環境変数に書かれた各種シークレット）</li>
      </ul>
      <p>
        これらを盗むと、被害者アカウントの権限で<strong>別のパッケージにバックドア版を再公開</strong>し、感染を次の開発者・組織へ広げる。1人の開発者の侵害が、その人が管理する全パッケージの利用者へ波及する構造だ。
      </p>
      <h3>Mini Shai-Huludとの関係</h3>
      <p>
        Miasmaは、2026年5月にTeamPCPがオープンソース化した「Mini Shai-Hulud」と強い類似性があるとされる。攻撃ツールが公開されると、他の攻撃者がそれを<strong>複製・改変して再利用</strong>できるようになり、同種の攻撃が増殖する。自己増殖ワームのコードが出回ったことで、「Red Hatという別の標的に対する新たな波」が生まれた、という構図だ。<a href="/learn/security/shai-hulud">npmの自己増殖ワーム</a>が一過性の事件ではなく、繰り返し襲来する脅威になったことを示している。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        npmは日本のWeb開発・クラウド開発で事実上の標準であり、この攻撃は国内の開発組織に直接関係する。
      </p>
      <ul>
        <li>
          <strong>「大手の名前空間だから安全」は通用しない</strong>：Red Hatほどの企業でも従業員アカウント経由で汚染された。信頼の根拠を「公開元の知名度」に置くのは危険だ。
        </li>
        <li>
          <strong>CI/CDが侵入の本丸になる</strong>：日本企業もGitHub ActionsなどでCIを組んでいる。ワークフロー定義の改ざんやシークレット窃取は、自社のパイプラインでも起こり得る。
        </li>
        <li>
          <strong>開発端末・CIに鍵が集中している</strong>：クラウド鍵・SSH鍵・<code>.env</code>が開発環境に散在していると、1台の侵害でクラウド本番環境まで連鎖する。
        </li>
        <li>
          <strong>自動アップデートが被害を広げる</strong>：バージョンを固定せず最新を取り込む運用だと、汚染版を自動で引き込んでしまう。
        </li>
      </ul>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. 影響パッケージの利用有無を確認し、シークレットを総ローテーションする</h3>
      <p>
        @redhat-cloud-services配下の汚染バージョンを、自社のプロジェクトやCIで取り込んでいないかを確認する。少しでも該当・疑いがあれば、<strong>CIシークレット・クラウド認証情報・SSH鍵・npmトークンをただちに再発行（ローテーション）</strong>する。Miasmaは鍵束を盗む前提なので、「念のため」ではなく必須の対応だ。
      </p>
      <h3>2. インストールスクリプトの自動実行を止める</h3>
      <p>
        <code>preinstall</code>/<code>postinstall</code>の自動実行は、サプライチェーン攻撃の主要な発火点だ。次を検討する。
      </p>
      <pre><code>{`# ライフサイクルスクリプトを実行せずにインストール
npm install --ignore-scripts

# 恒久設定（プロジェクト/組織のnpm設定に）
npm config set ignore-scripts true`}</code></pre>
      <p>
        スクリプトを本当に必要とするパッケージは限られる。原則オフにし、必要なものだけ個別に許可する。
      </p>
      <h3>3. バージョンを固定し、取り込みを遅らせる</h3>
      <p>
        lockfile（<code>package-lock.json</code>）でバージョンを固定し、<code>npm ci</code>で<strong>ロック済みの正確なバージョンだけ</strong>を入れる。公開直後の最新版を即座に取り込まず、一定のクールダウン期間（数日）を置く運用や、内部プロキシ／レジストリファイアウォールで既知の悪性版をブロックする仕組みも有効だ。
      </p>
      <h3>4. CI/CDのワークフローと権限を守る</h3>
      <p>
        今回の起点はアカウント乗っ取りとワークフロー改ざんだった。次を点検する。
      </p>
      <ul>
        <li>開発者・メンテナのアカウントに<a href="/learn/security/mfa-totp-fido2">フィッシング耐性のあるMFA（FIDO2/Passkey）</a>を必須化する</li>
        <li><strong>ワークフローファイル（<code>.github/workflows/</code>）の変更を、アプリコードと同等以上に厳格にレビュー</strong>する。CODEOWNERSで保護する</li>
        <li>OIDC／公開トークンの権限を最小化し、公開は保護されたブランチ・限定環境からのみ許可する</li>
        <li>npmパッケージ公開に二要素認証・Trusted Publishingを使い、不審な公開を検知する</li>
      </ul>
      <h3>5. 開発環境からシークレットを排除する</h3>
      <p>
        <code>.env</code>に長期の固定鍵を平置きせず、シークレットマネージャや一時的な認証情報（短命トークン）に移行する。盗まれても短時間で無効になる設計にしておけば、窃取されても被害を抑えられる。インシデントが疑われる場合は、<a href="/learn/security/incident-response-guide">インシデント対応手順</a>に沿って影響範囲の特定と封じ込めを行う。
      </p>

      <h2>参考情報</h2>
      <ul>
        <li>Aikido Security: Red Hat npm Packages Compromised to Spread a Credential-Stealing Worm</li>
        <li>Cybersecurity Dive: Dozens of Red Hat npm packages targeted in supply chain attack</li>
        <li>GitGuardian: 三つのサプライチェーン攻撃（npm/PyPI/Docker Hub）に関する分析</li>
        <li>Unit 42（Palo Alto Networks）: The npm Threat Landscape — Attack Surface and Mitigations</li>
      </ul>
    </ArticleLayout>
  );
}
