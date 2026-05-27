import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "clickjacking")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>クリックジャッキングとは</h2>
      <p>
        <strong>クリックジャッキング（Clickjacking）</strong>は、攻撃者のページに被害サイトを透明な iframe で重ね、被害者が「攻撃者のページのボタンを押した」と思っている裏で、本物のサイトのボタンをクリックさせる攻撃です。<strong>UIリドレッシング（UI Redressing）</strong>と呼ばれる攻撃ファミリーの代表例で、視覚と実際の操作のズレを突くのが本質です。
      </p>
      <p>
        被害者はログイン中の状態でこの罠に引っかかると、自分の意思で「OK」を押したつもりが、実は SNS の「フォロー」、銀行の「振込承認」、設定画面の「公開範囲を全公開に変更」といった重大操作を踏んでしまいます。
      </p>

      <h2>典型的な攻撃シナリオ</h2>
      <p>
        攻撃者は <code>evil.example</code> に次のような HTML を仕込みます：
      </p>
      <pre><code>{`<style>
  iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0.001;       /* 視覚的にはほぼ透明 */
    z-index: 999;
  }
  .lure {
    position: absolute;
    top: 280px; left: 420px;
    font-size: 32px;
  }
</style>

<button class="lure">🎁 無料ガチャを引く</button>
<iframe src="https://bank.example/transfer?to=attacker&amount=1000000"></iframe>`}</code></pre>
      <p>
        ボタンと iframe 内の「送金実行」ボタンが画面上で同じ位置に重なるよう座標を調整しておきます。被害者は「無料ガチャ」だと思って透明 iframe をクリックすると、実際には <code>bank.example</code> の <strong>送金実行ボタンを押している</strong>ことになります。
      </p>
      <p>
        被害者は <code>bank.example</code> にログイン中（Cookie 保持）なので、サーバー側からは正規ユーザーの操作にしか見えません。CSRF と似ていますが、CSRF が「リクエストを自動発火」させるのに対し、クリックジャッキングは <strong>「被害者本人にクリックさせる」</strong>のが違いです。これにより、CAPTCHA や「本当に実行しますか？」確認ダイアログさえも被害者本人が突破してしまいます。
      </p>

      <h2>UIリドレッシング攻撃の亜種</h2>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>仕組み</th>
            <th>典型的な被害</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>クリックジャッキング</td>
            <td>透明iframe を重ねてクリックを奪う</td>
            <td>振込、購入、設定変更</td>
          </tr>
          <tr>
            <td>Likejacking</td>
            <td>SNS の「いいね」ボタンを透明化して重ねる</td>
            <td>意図しないシェア、フォロー</td>
          </tr>
          <tr>
            <td>Cursorjacking</td>
            <td>CSS でカーソル画像を実際の位置からずらす</td>
            <td>表示と実クリック位置の不一致</td>
          </tr>
          <tr>
            <td>Drag &amp; Drop Jacking</td>
            <td>ドラッグ操作で別ウィンドウへデータ流出</td>
            <td>フォーム値・トークン盗難</td>
          </tr>
          <tr>
            <td>Double-clickjacking</td>
            <td>ダブルクリックの隙にダイアログを差し替える</td>
            <td>OAuth 認可の同意奪取（2024年話題）</td>
          </tr>
        </tbody>
      </table>

      <h2>防御1: CSP frame-ancestors（現代の主役）</h2>
      <p>
        <strong><code>Content-Security-Policy</code> ヘッダの <code>frame-ancestors</code> ディレクティブ</strong>が、現代における正攻法の防御です。サイトを iframe で埋め込めるオリジンを明示的にホワイトリスト化します。
      </p>
      <pre><code>{`# 自サイトをどこからも iframe 埋め込みさせない（推奨）
Content-Security-Policy: frame-ancestors 'none'

# 同一オリジンのみ許可
Content-Security-Policy: frame-ancestors 'self'

# 特定パートナーサイトを許可
Content-Security-Policy: frame-ancestors 'self' https://partner.example`}</code></pre>
      <p>
        ブラウザが iframe 描画前にこのヘッダを確認し、許可されていなければ描画自体をブロックします。<code>frame-ancestors</code> は CSP Level 2 から導入され、現代の主要ブラウザでサポートされています。
      </p>

      <h2>防御2: X-Frame-Options（古い仕組み・現役）</h2>
      <p>
        <code>X-Frame-Options</code> は CSP frame-ancestors より古い仕組みですが、互換性のため今も併用されます。
      </p>
      <table>
        <thead>
          <tr>
            <th>値</th>
            <th>挙動</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>DENY</code></td>
            <td>どのオリジンからも iframe 埋め込み不可</td>
          </tr>
          <tr>
            <td><code>SAMEORIGIN</code></td>
            <td>同一オリジンからのみ iframe 埋め込み可</td>
          </tr>
          <tr>
            <td><code>ALLOW-FROM uri</code></td>
            <td>指定 URI から許可（非推奨・サポート不十分）</td>
          </tr>
        </tbody>
      </table>
      <p>
        現代の指針は <strong>「CSP frame-ancestors を主役、X-Frame-Options は古いブラウザ向け保険」</strong>です。両方設定しておけば最大互換。両者の値が矛盾した場合、CSP frame-ancestors が優先されます（CSP Level 2 の仕様）。
      </p>
      <p>
        本サイト secutils.jp でも次の設定で対応しています：
      </p>
      <pre><code>{`Content-Security-Policy: frame-ancestors 'none'
X-Frame-Options: DENY`}</code></pre>

      <h2>防御3: フレームバスティング（非推奨）</h2>
      <p>
        2010年代以前は、JavaScript で自身が iframe 内かを判定して脱出する <strong>フレームバスティング</strong>（frame busting）コードがよく使われました：
      </p>
      <pre><code>{`if (top !== self) {
  top.location = self.location;
}`}</code></pre>
      <p>
        しかしこの手法は、<strong>HTML5 の <code>sandbox</code> 属性で iframe を起動すれば <code>top.location</code> への書き込みを禁止</strong>できるため、容易にバイパスされます。現代では <code>frame-ancestors</code> を使うべきで、フレームバスティングだけに頼るのは危険です。
      </p>

      <h2>防御4: SameSite Cookie の補完効果</h2>
      <p>
        Cookie に <code>SameSite=Lax</code> または <code>Strict</code> を設定すると、クロスサイトの iframe からは Cookie が送られなくなり、結果としてクリックジャッキングの被害を緩和できます。ただし「Cookie が無くてもクリックで実行できる操作」（公開フォーム、認証不要API 等）には効きません。<strong>主防御は CSP frame-ancestors</strong>、SameSite は補完と考えます。
      </p>

      <h2>実装チェックリスト</h2>
      <ul>
        <li>すべてのページに <code>Content-Security-Policy: frame-ancestors &apos;none&apos;</code> または <code>&apos;self&apos;</code> を返している</li>
        <li>古いブラウザ対策として <code>X-Frame-Options: DENY</code> または <code>SAMEORIGIN</code> も併用している</li>
        <li>iframe 埋め込みを許可する必要がある場合、許可先オリジンを明示している（<code>*</code> ワイルドカードは使わない）</li>
        <li>ログイン・支払い・設定変更などの重大操作には、明示的な再認証や CAPTCHA を併用している</li>
        <li>Cookie に <code>SameSite</code> 属性を設定している</li>
        <li>サイトを <a href="https://securityheaders.com" rel="nofollow noopener noreferrer" target="_blank">securityheaders.com</a> で定期チェックしている</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        クリックジャッキングは「視覚的な錯誤を突いて、被害者本人にクリックさせる」攻撃で、CAPTCHA や確認ダイアログでさえ防げない厄介な側面があります。防御の本命は <strong>CSP <code>frame-ancestors</code></strong>。これ1行で iframe 埋め込み自体をブラウザ層で遮断できます。<code>X-Frame-Options</code> も合わせて返し、古いブラウザにも対応するのが現代のベストプラクティスです。
      </p>
      <p>
        Cookie 設定の確認には <a href="/tools/cookie-parser">Cookie Parser</a> ツールで <code>SameSite</code> 属性を可視化できます。HTTP セキュリティヘッダ全般については <a href="/learn/security/http-security-headers">HTTP セキュリティヘッダ詳解</a>も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
