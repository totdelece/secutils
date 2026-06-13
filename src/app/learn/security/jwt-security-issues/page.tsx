import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "jwt-security-issues")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>はじめに：JWT の落とし穴</h2>
      <p>
        JWT（JSON Web Token）は API 認証の事実上の標準として広く使われていますが、<strong>正しく使わないと深刻なセキュリティ問題</strong>に直結します。「ライブラリに任せれば安全」と思いがちですが、JWT に固有の罠は意外と多く、一度実装した認証基盤がそのまま侵入経路になる事例は珍しくありません。
      </p>
      <p>
        この記事では、JWT を扱うときに知っておきたい <strong>典型的な問題</strong> を、<strong>脆弱なコードと修正後のコードを並べて</strong>解説し、最後に本番投入前のチェックリストにまとめます。仕様の根拠は IETF の{" "}
        <a href="https://www.rfc-editor.org/rfc/rfc7519" target="_blank" rel="noopener noreferrer">
          RFC 7519（JWT）
        </a>{" "}
        と{" "}
        <a href="https://www.rfc-editor.org/rfc/rfc8725" target="_blank" rel="noopener noreferrer">
          RFC 8725（JWT Best Current Practices）
        </a>{" "}
        を一次情報として参照しています。
      </p>

      <h2>JWT の構造とクレーム</h2>
      <p>
        JWT は <code>Header.Payload.Signature</code> の3パート構成で、それぞれが Base64URL でエンコードされています。
      </p>
      <pre><code>{`eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSJ9.SflKxwRJSMeKKF2QT4...
└── Header ──┘└── Payload ──┘└─── Signature ───┘`}</code></pre>
      <p>
        Header と Payload は単なる Base64URL なので<strong>誰でも読めます</strong>（後述）。Signature だけが、発行者の鍵を知っている人にしか作れません。Payload には「クレーム」と呼ばれる項目が入り、RFC 7519 で意味が決まっている標準クレームは<strong>検証側で必ずチェック</strong>します。
      </p>
      <table>
        <thead>
          <tr>
            <th>クレーム</th>
            <th>意味</th>
            <th>検証側ですべきこと</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>iss</code></td>
            <td>発行者（Issuer）</td>
            <td>自分が信頼する発行者と一致するか</td>
          </tr>
          <tr>
            <td><code>aud</code></td>
            <td>想定利用者（Audience）</td>
            <td>このトークンが「自分のサービス向け」か</td>
          </tr>
          <tr>
            <td><code>exp</code></td>
            <td>失効時刻（Expiration）</td>
            <td>現在時刻を過ぎていないか（必須）</td>
          </tr>
          <tr>
            <td><code>nbf</code></td>
            <td>有効開始時刻（Not Before）</td>
            <td>まだ有効になっていないトークンを弾く</td>
          </tr>
          <tr>
            <td><code>iat</code></td>
            <td>発行時刻（Issued At）</td>
            <td>古すぎるトークンの判定に利用</td>
          </tr>
          <tr>
            <td><code>sub</code> / <code>jti</code></td>
            <td>主体（ユーザーID）/ トークン一意ID</td>
            <td><code>jti</code> は取り消しや再利用検知の鍵になる</td>
          </tr>
        </tbody>
      </table>
      <p>
        手元のトークンの中身は{" "}
        <Link href="/tools/jwt-decoder">JWT Decoder</Link>{" "}
        で分解・確認できます（すべてブラウザ内で処理され、サーバーには送信されません）。
      </p>

      <h2>そもそも JWT を使うべきか：セッションとの比較</h2>
      <p>
        JWT は万能ではありません。「ステートレスにしたい」「複数サービス間でユーザー情報を持ち回りたい」という要件がないなら、<strong>サーバー側セッション（Cookie + セッションストア）の方が安全で簡単</strong>なことが多いです。
      </p>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>サーバーセッション</th>
            <th>JWT（ステートレス）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>状態の保持</td>
            <td>サーバー側に保存</td>
            <td>トークン自体が状態を持つ</td>
          </tr>
          <tr>
            <td>即時失効</td>
            <td>得意（ストアから消すだけ）</td>
            <td>苦手（後述）</td>
          </tr>
          <tr>
            <td>水平スケール</td>
            <td>共有ストアが要る</td>
            <td>得意（鍵だけ共有）</td>
          </tr>
          <tr>
            <td>情報の秘匿</td>
            <td>サーバー側なので安全</td>
            <td>Payload は誰でも読める</td>
          </tr>
        </tbody>
      </table>
      <p>
        判断軸の詳細は{" "}
        <Link href="/learn/security/session-vs-jwt">セッション認証と JWT の違い</Link>{" "}
        で整理しています。ここからは「JWT を使うと決めた場合」の正しい実装を見ていきます。
      </p>

      <h2>問題1: <code>alg=none</code> 攻撃</h2>
      <p>
        JWT の Header には <code>alg</code>（アルゴリズム）クレームがあり、検証側のライブラリはこの値を見てアルゴリズムを切り替えます。ここで <strong>攻撃者が <code>alg</code> を <code>none</code> に書き換える</strong>と、署名なしで通ってしまうライブラリがありました。
      </p>
      <pre><code>{`{"alg":"none","typ":"JWT"}.{"sub":"admin"}.    ← 署名は空欄`}</code></pre>
      <p>
        2015年に多くのライブラリが影響を受けた古典的な脆弱性です。根本原因は<strong>「Header の <code>alg</code> を信頼してしまう」</strong>こと。検証側で受け入れるアルゴリズムをハードコードで限定すれば防げます。
      </p>
      <pre><code>{`// 脆弱: トークン側の alg を信用してしまう
jwt.verify(token, secret);

// 修正: 受け入れる alg を明示（none は決して許可しない）
jwt.verify(token, secret, { algorithms: ['HS256'] });`}</code></pre>

      <h2>問題2: アルゴリズム混同（RS256 → HS256）</h2>
      <p>
        RS256（RSA 公開鍵署名）で運用しているサービスに対し、攻撃者が <code>alg</code> を <code>HS256</code>（HMAC）に書き換え、<strong>公開鍵をそのまま HMAC の秘密鍵として使う</strong>攻撃です。多くのライブラリが「RS256 用に渡された公開鍵」を「HS256 の検証鍵」として受け入れてしまうのが問題でした。公開鍵は誰でも入手できるため、攻撃者は任意のトークンを偽造できます。
      </p>
      <pre><code>{`// 脆弱: 公開鍵を渡すが alg を制限していない
//   → 攻撃者が alg を HS256 に変え、公開鍵を HMAC 鍵として悪用できる
jwt.verify(token, publicKey);

// 修正: 「このトークンは RS256 でなければならない」と固定する
jwt.verify(token, publicKey, { algorithms: ['RS256'] });`}</code></pre>
      <p>
        RS256 で <code>verify</code> に渡す鍵は「公開鍵」、署名に使うのは「秘密鍵」です。HMAC（共通鍵）系と公開鍵系を<strong>混在させない</strong>ことが原則です。HMAC 署名そのものの挙動は{" "}
        <Link href="/tools/hmac">HMAC Generator</Link>{" "}
        で確認できます。
      </p>

      <h2>問題3: 弱い HMAC 秘密鍵</h2>
      <p>
        HMAC（HS256/384/512）を使う場合、秘密鍵が<strong>短すぎる・推測しやすい</strong>とブルートフォースや辞書攻撃で割られます。<code>secret</code> や <code>jwt-key</code> のような語、辞書単語、十数文字程度の鍵は危険です。割れた瞬間、攻撃者は<strong>任意のユーザーになりすませる</strong>トークンを作れます。
      </p>
      <pre><code>{`// 脆弱: 短く推測しやすい鍵をハードコード
const secret = 'secret123';

// 修正: 暗号学的乱数で 32 バイト(256bit)以上を生成し、環境変数等で管理
//   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
const secret = process.env.JWT_SECRET;`}</code></pre>
      <ul>
        <li><strong>長さ</strong>: HS256 なら最低 32 バイト（256 bit）以上</li>
        <li><strong>由来</strong>: <code>crypto.randomBytes</code> 等の暗号学的乱数。<Link href="/tools/password-generator">Password Generator</Link> でも十分長い乱数を作れます</li>
        <li><strong>禁止</strong>: ハードコード、Git へのコミット、ドキュメント掲載、複数環境での使い回し</li>
      </ul>

      <h2>問題4: Payload は誰でも読める</h2>
      <p>
        Base64URL は<strong>暗号化ではなく単なるエンコーディング</strong>です。JWT を持っている人なら誰でも Payload を復元できます。
      </p>
      <pre><code>{`echo "eyJzdWIiOiJ1c2VyMSIsInJvbGUiOiJhZG1pbiJ9" | base64 -d
{"sub":"user1","role":"admin"}`}</code></pre>
      <p>
        この事実を忘れて<strong>機密情報（クレジットカード番号、パスワード、社内識別子など）を Payload に入れる</strong>と、トークンを取得した第三者にすべて見えてしまいます。Payload に入れていいのは「公開しても問題ない識別子」だけだと考えてください。本当に秘匿が必要なら JWE（JSON Web Encryption）を使うか、サーバー側にデータを持つ従来型のセッションが無難です。エンコードの仕組みは{" "}
        <Link href="/tools/base64">Base64 ツール</Link>{" "}
        でも確かめられます。
      </p>

      <h2>問題5: 検証そのものを省略・誤用する</h2>
      <p>
        意外に多いのが、<strong>署名やクレームの検証を実質スキップしている</strong>ケースです。
      </p>
      <pre><code>{`// 脆弱: decode は「中身を読むだけ」で署名検証をしない
const payload = jwt.decode(token);
if (payload.role === 'admin') { /* ... */ }   // 改ざんし放題

// 修正: verify で署名・exp・iss・aud まで検証する
const payload = jwt.verify(token, key, {
  algorithms: ['RS256'],
  issuer: 'https://auth.example.com',
  audience: 'my-api',
});`}</code></pre>
      <p>
        <code>decode</code> と <code>verify</code> は別物です。<code>exp</code> を検証しなければ期限切れトークンが通り、<code>aud</code> を見なければ「別サービス向けに発行されたトークン」を流用されます（トークンの取り違え攻撃）。
      </p>

      <h2>問題6: トークンの取り消しが難しい</h2>
      <p>
        JWT は「有効期限が来るまで有効」が基本設計で、<strong>サーバー側で個別に無効化するのが構造的に苦手</strong>です。ユーザーがログアウトしても、トークン自体は <code>exp</code> まで使い続けられます。漏洩に気づいても即座に止めにくいのは大きな弱点です。
      </p>
      <p>対策の方向性：</p>
      <ul>
        <li><strong>アクセストークンの有効期限を短く</strong>（数分〜1時間）し、長命なリフレッシュトークンで再発行する</li>
        <li>リフレッシュトークンは<strong>ローテーション</strong>（使うたびに新しい物に差し替え、旧トークンの再利用を検知したら家系ごと無効化）する</li>
        <li>サーバー側に <code>jti</code> ベースの<strong>取り消しリスト（denylist）</strong>を持ち、検証時に照合する（ステートレス性は犠牲になるが現実的）</li>
        <li>決済・パスワード変更など重要操作の前にだけ<strong>再認証</strong>を要求する</li>
      </ul>

      <h2>トークンをどこに保存するか：localStorage vs Cookie</h2>
      <p>
        ブラウザアプリで頻出の悩みが「JWT をどこに置くか」です。<strong>銀の弾丸はなく</strong>、XSS と CSRF のどちらのリスクを重く見るかのトレードオフになります。
      </p>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>localStorage</th>
            <th>httpOnly Cookie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>XSS で盗まれる</td>
            <td>盗まれる（JS から読める）</td>
            <td>読めない（<code>HttpOnly</code>）</td>
          </tr>
          <tr>
            <td>CSRF</td>
            <td>受けにくい（手動でヘッダ付与）</td>
            <td>受けやすい → 要 <code>SameSite</code> ＋トークン</td>
          </tr>
          <tr>
            <td>送信方法</td>
            <td>手動で <code>Authorization</code> ヘッダ</td>
            <td>自動送信</td>
          </tr>
          <tr>
            <td>別ドメインの API</td>
            <td>扱いやすい</td>
            <td>クロスサイトだと制約が増える</td>
          </tr>
        </tbody>
      </table>
      <p>
        実務では <strong><code>HttpOnly</code> + <code>Secure</code> + <code>SameSite=Lax/Strict</code> の Cookie に入れ、別途 CSRF 対策を併用する</strong>構成が無難です（XSS による直接窃取を防げるため）。Cookie 方式を採るなら{" "}
        <Link href="/learn/security/csrf">CSRF の対策</Link>{" "}
        を必ずセットで実装してください。Cookie 属性の確認には{" "}
        <Link href="/tools/cookie-parser">HTTP Cookie Parser</Link>{" "}
        が使えます。いずれの方式でも、<strong>XSS を塞ぐことが最優先</strong>である点は変わりません（<Link href="/learn/security/xss">XSS の対策</Link>）。
      </p>

      <h2>本番投入前チェックリスト</h2>
      <ul>
        <li>☐ 検証時に許可する <code>alg</code> を<strong>ホワイトリストで固定</strong>している（<code>none</code> は不許可）</li>
        <li>☐ <code>decode</code> ではなく <code>verify</code> を使い、署名を検証している</li>
        <li>☐ <code>exp</code> / <code>nbf</code> / <code>iss</code> / <code>aud</code> を検証している</li>
        <li>☐ HMAC 鍵は 32 バイト以上の暗号学的乱数で、環境変数や Secret Manager 管理</li>
        <li>☐ 公開鍵系（RS/ES）と共通鍵系（HS）を混在させていない</li>
        <li>☐ Payload に機密情報を入れていない</li>
        <li>☐ アクセストークンは短命＋リフレッシュトークンのローテーション</li>
        <li>☐ トークンは <code>HttpOnly</code> Cookie 等に安全に保管し、XSS 対策を実装済み</li>
        <li>☐ JWT ライブラリを最新に保ち、既知脆弱性を追っている</li>
      </ul>

      <h2>関連ツールと記事</h2>
      <ul>
        <li><Link href="/tools/jwt-decoder">JWT Decoder</Link> — トークンを分解し、<code>alg</code> やクレーム、署名検証を確認</li>
        <li><Link href="/tools/hmac">HMAC Generator</Link> — HS256 系の署名の挙動を確認</li>
        <li><Link href="/tools/base64">Base64</Link> — Header/Payload のエンコードを確認</li>
        <li><Link href="/learn/security/session-vs-jwt">セッション認証と JWT の違い</Link></li>
        <li><Link href="/learn/security/oauth-oidc">OAuth 2.0 と OpenID Connect</Link></li>
      </ul>

      <h2>参考（一次情報）</h2>
      <ul>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc7519" target="_blank" rel="noopener noreferrer">
            RFC 7519 — JSON Web Token (JWT)
          </a>
        </li>
        <li>
          <a href="https://www.rfc-editor.org/rfc/rfc8725" target="_blank" rel="noopener noreferrer">
            RFC 8725 — JSON Web Token Best Current Practices
          </a>
        </li>
        <li>
          <a
            href="https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            OWASP — JSON Web Token Cheat Sheet
          </a>
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        JWT そのものは仕様としてよく設計されていますが、<strong>事故のほとんどは「使う側の油断」</strong>から生まれます。実装を書くときは「誰が何を作れるか」という信頼境界を常に意識し、上のチェックリストを一つずつ潰してください。まずは手元のトークンを{" "}
        <Link href="/tools/jwt-decoder">JWT Decoder</Link>{" "}
        に貼り付けて、<code>alg</code> と <code>exp</code> がどうなっているか覗いてみるところから始めるのがおすすめです。
      </p>
    </ArticleLayout>
  );
}
