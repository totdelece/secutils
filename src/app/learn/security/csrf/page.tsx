import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "csrf")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>CSRF とは何か</h2>
      <p>
        <strong>CSRF（Cross-Site Request Forgery）</strong>は、ログイン中のユーザーを罠サイトに誘導し、本人が意図しないリクエストを正規サービスに送らせる攻撃です。日本語では「リクエスト強要」「セッションライディング」とも呼ばれます。
      </p>
      <p>
        鍵となるのは <strong>「ブラウザは Cookie を勝手に付けてくれる」</strong> という挙動です。被害者が銀行 A にログイン中（Cookie 保持）に、攻撃者の罠ページから A 宛にリクエストが飛ぶと、ブラウザはお行儀よく Cookie を付けてしまい、A から見ると「正規ユーザーの操作」に見えてしまいます。
      </p>

      <h2>典型的な攻撃シナリオ</h2>
      <p>
        被害者は銀行 <code>bank.example.com</code> にログイン済み。攻撃者は罠サイト <code>evil.example</code> に次の HTML を仕込みます：
      </p>
      <pre><code>{`<form action="https://bank.example.com/transfer" method="POST">
  <input name="to" value="attacker">
  <input name="amount" value="1000000">
</form>
<script>document.forms[0].submit()</script>`}</code></pre>
      <p>
        被害者がこの罠を踏むと、ブラウザは <code>bank.example.com</code> の Cookie を自動付与して送信。サーバ側は Cookie が一致するので「本人の振込指示」と判断 → <strong>送金完了</strong>。
      </p>
      <p>
        攻撃者は <strong>レスポンスを読めない</strong>（同一オリジンポリシーで防がれる）点が重要。CSRF はあくまで「副作用のあるリクエストを発火させる」攻撃で、データを読み出す XSS とは性質が違います。
      </p>

      <h2>XSS との違い</h2>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>XSS</th>
            <th>CSRF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>攻撃の場</td>
            <td>正規サイトのドメイン上で JS を実行</td>
            <td>罠サイトから正規サイトへリクエスト送信</td>
          </tr>
          <tr>
            <td>レスポンスは読める？</td>
            <td>読める（同一オリジン下）</td>
            <td>読めない（CORSで遮断）</td>
          </tr>
          <tr>
            <td>攻撃の本質</td>
            <td>スクリプト実行</td>
            <td>意図しない副作用リクエスト</td>
          </tr>
          <tr>
            <td>主防御</td>
            <td>出力時エスケープ + CSP</td>
            <td>SameSite Cookie + CSRFトークン</td>
          </tr>
        </tbody>
      </table>
      <p>
        XSS が成立すると CSRF 対策（トークン等）も同オリジンから読み取られて無効化されるので、<strong>XSS の方が圧倒的に強い攻撃</strong>です。CSRF 対策は XSS が無いことを前提にした「最低限の備え」と捉えるのが現実的。
      </p>

      <h2>防御1: SameSite Cookie</h2>
      <p>
        現代の CSRF 防御の主役は <strong><code>SameSite</code> 属性</strong>です。Cookie に付けることで「クロスサイト遷移時の自動付与」を制限します。
      </p>
      <table>
        <thead>
          <tr>
            <th>値</th>
            <th>挙動</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Strict</code></td>
            <td>クロスサイトでは一切送らない</td>
            <td>銀行など最高機密</td>
          </tr>
          <tr>
            <td><code>Lax</code>（既定値）</td>
            <td>トップレベル GET 遷移時のみ送る</td>
            <td>多くの一般サービス</td>
          </tr>
          <tr>
            <td><code>None</code></td>
            <td>常に送る（要 <code>Secure</code>）</td>
            <td>サードパーティ埋込必須の場合</td>
          </tr>
        </tbody>
      </table>
      <p>
        Chrome は 2020 年から <strong>既定値が <code>Lax</code></strong>。これにより「外部サイトから POST で罠送信」という古典 CSRF はかなりの確率で自動防御されるようになりました。とはいえ、明示的に <code>Lax</code> や <code>Strict</code> を指定し、<strong>クロスオリジン埋込が必要な Cookie だけ <code>None; Secure</code></strong> にするのが安全です。
      </p>
      <blockquote>
        <p>
          ⚠ <code>SameSite=None</code> を使う場合は必ず <code>Secure</code>（HTTPS 限定）を付ける。Cookie Parser で属性可視化すると、<code>None</code> 単独だとブラウザに拒否される警告が出ます。
        </p>
      </blockquote>

      <h2>防御2: CSRF トークン（Synchronizer Token Pattern）</h2>
      <p>
        フォーム送信時に「サーバが発行したランダムなトークン」を hidden field で持たせ、サーバ側で照合する方式です。攻撃者の罠サイトはこのトークンを取得できないので攻撃が失敗します。
      </p>
      <pre><code>{`<form method="POST" action="/transfer">
  <input type="hidden" name="csrf_token" value="\${session.csrf_token}">
  <input name="to" ...>
  <input name="amount" ...>
</form>`}</code></pre>
      <p>
        実装パターン：
      </p>
      <ul>
        <li><strong>セッション結合</strong>: トークンをセッションに紐付け（最も一般的）</li>
        <li><strong>Double Submit Cookie</strong>: Cookie とリクエストボディに同じ値を入れて照合（ステートレスで実装しやすい）</li>
        <li><strong>署名トークン</strong>: HMAC でユーザーID等に署名し、サーバ状態を持たない</li>
      </ul>
      <p>
        Django, Rails, Laravel, Spring 等の主要フレームワークはデフォルトでこの仕組みを内蔵しています。<strong>「自分で書かない」ことが最大の安全策</strong>。
      </p>

      <h2>防御3: Origin / Referer ヘッダ検証</h2>
      <p>
        重要な操作（POST/DELETE 等）を受ける時、<code>Origin</code> ヘッダを見て「自サイトから来たリクエストか」を確認するシンプルな対策です。
      </p>
      <pre><code>{`if (req.headers.origin !== "https://bank.example.com") {
  return res.status(403).end()
}`}</code></pre>
      <p>
        モダンブラウザは状態変更系リクエストに <code>Origin</code> を必ず付けるため、SameSite Cookie + Origin チェックの組み合わせは強力。CSRF トークンとほぼ同等の効果を、状態保持なしで得られます。
      </p>

      <h2>防御4: カスタムリクエストヘッダ + CORS</h2>
      <p>
        SPA + API の構成では、API リクエストに <code>X-Requested-With: XMLHttpRequest</code> のようなカスタムヘッダを必須にする手があります。クロスオリジンでカスタムヘッダ付き POST はプリフライト（OPTIONS）が必要で、CORS が許可しなければそもそも本リクエストが飛びません。
      </p>
      <p>
        さらに API を <strong>Cookie 認証ではなく Bearer トークン</strong>（<code>Authorization: Bearer ...</code>）にすれば、ブラウザが自動付与しないので CSRF はそもそも成立しません。SPA や JWT 認証では事実上これがベース防御になっています。
      </p>

      <h2>防御してはいけないやり方</h2>
      <ul>
        <li>
          <strong>POST にすれば安全</strong> ❌: form 自動 submit で容易に POST できるので無意味
        </li>
        <li>
          <strong>Referer 必須にする</strong> ⚠: 古いブラウザ・プライバシー設定で Referer が落ちることがあり、過剰拒否しがち。Origin の方が信頼できる
        </li>
        <li>
          <strong>CAPTCHA だけで対策</strong> ⚠: 重要操作ごとに毎回 CAPTCHA は UX 破壊。お金が絡む操作の最終確認に限定する
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        CSRF は「ブラウザが律儀に Cookie を付ける」前提で成立する攻撃で、現代では <strong>SameSite Cookie</strong> + <strong>CSRF トークン or Origin チェック</strong> の二段構えが定番です。SPA + Bearer トークン構成なら原理的に成立しないので、API 設計の段階で経路を選ぶ手もあります。
      </p>
      <p>
        本サイトの HTTP Cookie Parser では、<code>SameSite</code> 属性の値ごとに警告メッセージが出るので、自社サービスの <code>Set-Cookie</code> 文字列を貼り付けてチェックしてみてください。
      </p>
    </ArticleLayout>
  );
}
