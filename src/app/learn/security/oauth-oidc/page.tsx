import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "oauth-oidc")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>はじめに: 「Google でログイン」の裏側で起きていること</h2>
      <p>
        どこかのサービスで <strong>「Google でログイン」「GitHub で続行」「Sign in with Apple」</strong> を押した経験は、誰にでもあるはずです。あの一瞬で、3つの当事者の間で精巧な舞踊が行われています。
      </p>
      <p>
        この舞踊を支える標準仕様が <strong>OAuth 2.0</strong> と <strong>OpenID Connect (OIDC)</strong>。両者は別物ですが密接に関係していて、初学者が混乱する代表トピックです。この記事では「結局この2つは何が違うのか」「自前で実装する時に何を選ぶか」を整理します。
      </p>

      <h2>OAuth 2.0 と OpenID Connect の関係を一行で</h2>
      <ul>
        <li><strong>OAuth 2.0</strong>: 認可（Authorization）の仕組み。「アプリAがユーザーの代わりに、サービスBの何かにアクセスする許可をもらう」</li>
        <li><strong>OpenID Connect</strong>: OAuth 2.0 の上に乗る認証（Authentication）の仕組み。「ユーザーが誰なのかを確認する」</li>
      </ul>
      <p>
        日本語の「認可」と「認証」は紛らわしいですが、意味は明確：
      </p>
      <table>
        <thead>
          <tr>
            <th>用語</th>
            <th>英語</th>
            <th>問い</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>認証</td>
            <td>Authentication (AuthN)</td>
            <td>「あなたは誰？」</td>
          </tr>
          <tr>
            <td>認可</td>
            <td>Authorization (AuthZ)</td>
            <td>「あなたに何の権限がある？」</td>
          </tr>
        </tbody>
      </table>
      <p>
        OAuth 2.0 は本来「認可」のための仕様。なのに「Google で<em>ログイン</em>」のような<strong>認証</strong>用途で広く使われていた歴史的経緯があり、それを正式に標準化したのが OpenID Connect です。
      </p>

      <h2>なぜ OAuth 2.0 が生まれたのか</h2>
      <p>
        OAuth 以前、サードパーティアプリからユーザーの Google アカウントにアクセスする場合、<strong>ユーザーが Google のパスワードをそのアプリに教える</strong>しかありませんでした。
      </p>
      <p>
        例えば「自分の Gmail のメールを別のメールクライアントに表示したい」時、メールクライアントに Gmail のパスワードを渡す必要があった。明らかに危険：
      </p>
      <ul>
        <li>そのアプリが信頼できるかわからない</li>
        <li>パスワードが漏れたらアカウント乗っ取り</li>
        <li>スコープを限定できない（メール読むだけのつもりが Drive も Calendar も全部見られる）</li>
        <li>個別に取り消せない（アプリを使うのをやめるだけでは権限は消えない）</li>
      </ul>
      <p>
        OAuth 2.0 の目的はこの「パスワードを渡さずに、限定的な権限を委任する」仕組みを作ること。<strong>「アクセストークン」という限定権限の鍵</strong>を発行する形に変えたのが画期的でした。
      </p>

      <h2>OAuth 2.0 の登場人物</h2>
      <ol>
        <li>
          <strong>Resource Owner（リソース所有者）</strong>: ユーザー本人
        </li>
        <li>
          <strong>Client（クライアント）</strong>: アクセスを欲しがるアプリ（例: 写真アップロードしたいサードパーティ）
        </li>
        <li>
          <strong>Authorization Server（認可サーバ）</strong>: ユーザーの同意を取り、トークンを発行する（例: Google）
        </li>
        <li>
          <strong>Resource Server（リソースサーバ）</strong>: 守るべきAPI（例: Google Drive API）
        </li>
      </ol>
      <p>
        多くの実装では Authorization Server と Resource Server は同じ事業者ですが、論理的には別の役割です。
      </p>

      <h2>Authorization Code Flow（最重要・現代の推奨）</h2>
      <p>
        OAuth 2.0 には複数のフロー（grant type）が定義されていますが、Web/SPA/モバイルアプリで使うべきは<strong>Authorization Code Flow</strong>です。
      </p>
      <p>
        全体の流れ：
      </p>
      <pre><code>{`1. ユーザーがクライアント上で「Google でログイン」を押す
   ↓
2. クライアントがブラウザを認可サーバへリダイレクト
   GET https://accounts.google.com/o/oauth2/auth
       ?client_id=APP_ID
       &redirect_uri=https://app.example.com/callback
       &response_type=code
       &scope=email profile
       &state=ランダム値
   ↓
3. 認可サーバ上でユーザーがログイン + 同意
   「app.example.com に email と profile を渡しますか？」
   ↓
4. 認可サーバが認可コード(code)付きで callback URL にリダイレクト
   https://app.example.com/callback?code=ABC123&state=ランダム値
   ↓
5. クライアント(サーバ側)が認可コードをトークンに交換
   POST https://oauth2.googleapis.com/token
     grant_type=authorization_code
     code=ABC123
     client_id=APP_ID
     client_secret=APP_SECRET    ← ここが重要
     redirect_uri=https://app.example.com/callback
   ↓
6. アクセストークン(と必要に応じてリフレッシュトークン)を取得
   { access_token: "...", refresh_token: "...", expires_in: 3600 }
   ↓
7. アクセストークンを使って API を叩く
   GET https://www.googleapis.com/oauth2/v3/userinfo
   Authorization: Bearer ...`}</code></pre>
      <p>
        2段階に分けるのには明確な理由があります：
      </p>
      <ul>
        <li>
          <strong>認可コード</strong>: ブラウザを経由するので、URL に出る = 漏洩リスクがある。短命（数十秒〜数分）で1回しか使えない
        </li>
        <li>
          <strong>アクセストークン</strong>: サーバ間通信で取得するので URL に出ない。長命（1時間程度）で API 呼び出しに使える
        </li>
      </ul>
      <p>
        client_secret はクライアントのバックエンドが持つ秘密で、認可コードをトークンに交換する時の本人確認に使います。<strong>SPA やモバイルアプリだと client_secret を安全に隠せない問題</strong>があり、これを解決するのが PKCE です。
      </p>

      <h2>PKCE - SPA/モバイルでの拡張</h2>
      <p>
        <strong>PKCE（Proof Key for Code Exchange、ピクシーと読む）</strong>は、「秘密を隠せないクライアント」のための拡張仕様（RFC 7636）。仕組みは単純：
      </p>
      <ol>
        <li>クライアントが毎回ランダムな <code>code_verifier</code> を生成</li>
        <li>そのハッシュ <code>code_challenge = SHA256(code_verifier)</code> を認可サーバに送る</li>
        <li>認可コード受け取り時、トークン交換で <code>code_verifier</code> 生原文を渡す</li>
        <li>認可サーバ側で <code>SHA256(code_verifier) == code_challenge</code> を検証</li>
      </ol>
      <p>
        これで「認可コードを傍受しても、code_verifier を知らない攻撃者はトークンに交換できない」状態になります。<strong>2025年現在は SPA/モバイルだけでなく、すべての OAuth クライアントで PKCE 必須</strong>というのが OAuth 2.1 の方針です。
      </p>

      <h2>使ってはいけないフロー</h2>

      <h3>Implicit Flow（廃止）</h3>
      <p>
        SPA向けに「ブラウザに直接アクセストークンを返す」シンプル版でしたが、URL fragment にトークンが出る、リフレッシュトークン取れない、リプレイ攻撃に弱い等の問題で<strong>廃止</strong>されました。代わりに Authorization Code + PKCE を使います。
      </p>

      <h3>Resource Owner Password Credentials Flow（廃止予定）</h3>
      <p>
        ユーザーのID・パスワードをアプリが直接受け取って認可サーバに送る方式。<strong>パスワードを渡さない</strong>という OAuth 本来の目的に反する。レガシー対応以外で使ってはいけません。
      </p>

      <h2>OpenID Connect（OIDC）: OAuth に「あなたは誰」を加える</h2>
      <p>
        ここまで OAuth 2.0 は「認可（権限委任）」の仕組みでした。「Drive を読む権限をください」のような。
      </p>
      <p>
        ところが現実には、多くのサービスが OAuth を「ログイン」目的で使っていました。<strong>「Google にログインできる ≒ そのGoogleアカウントの本人」</strong>という暗黙の前提で。これは規格的にはグレーで、実際にセキュリティ問題も起きていました（攻撃者がアクセストークンを奪うとログインできてしまう）。
      </p>
      <p>
        この曖昧さを解消するのが <strong>OpenID Connect</strong>。OAuth 2.0 のフローに乗せて、<strong>「ID トークン」</strong>という認証用の追加トークンを発行します。
      </p>
      <pre><code>{`# scope に "openid" を含めるだけで OIDC モードになる
GET https://accounts.google.com/o/oauth2/auth
    ?client_id=...
    &response_type=code
    &scope=openid email profile  ← "openid" 必須
    &...

# トークンエンドポイントから2種類のトークンが返る
{
  "access_token": "...",     ← OAuth のアクセストークン（API呼び出し用）
  "id_token": "eyJhbGciOi...", ← OIDC の ID トークン（認証情報、JWT形式）
  "expires_in": 3600
}`}</code></pre>
      <p>
        ID トークンの中身（<Link href="/tools/jwt-decoder">JWT Decoder</Link> で復号できます）：
      </p>
      <pre><code>{`{
  "iss": "https://accounts.google.com",  // 発行者
  "sub": "10769150350006150715113",       // ユーザー固有ID
  "aud": "your-app-client-id",            // このトークンの宛先
  "exp": 1735689600,                      // 有効期限
  "iat": 1735686000,                      // 発行時刻
  "email": "user@example.com",
  "email_verified": true,
  "name": "Tanaka Taro",
  "picture": "https://..."
}`}</code></pre>
      <p>
        ID トークンは<strong>署名付き JWT</strong>。クライアントが署名を検証することで「この情報は本当に Google が発行したもの」と確信できます。<Link href="/learn/security/jwt-security-issues">JWT のセキュリティ問題</Link> で書いた通り、署名検証を絶対サボらないのが鉄則。
      </p>

      <h2>access_token と id_token の使い分け</h2>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>access_token</th>
            <th>id_token</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>目的</td>
            <td>API呼び出し（認可）</td>
            <td>ユーザー識別（認証）</td>
          </tr>
          <tr>
            <td>送り先</td>
            <td>リソースサーバ（API）</td>
            <td>クライアント自身（ログイン処理）</td>
          </tr>
          <tr>
            <td>形式</td>
            <td>不透明文字列も多い</td>
            <td>必ず JWT</td>
          </tr>
          <tr>
            <td>署名検証</td>
            <td>クライアントは検証しない</td>
            <td>クライアントが必ず検証する</td>
          </tr>
          <tr>
            <td>例</td>
            <td>"ya29.A0ARrdaM..."</td>
            <td>"eyJhbGci..."</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>「アクセストークンをログインに使う」は誤り</strong>。アクセストークンは「APIを叩く権利」であって「本人性の証明」ではありません。誰かのアクセストークンを奪った攻撃者でも有効に使えてしまうので、ログイン用途には id_token を使うのが OIDC の作法です。
      </p>

      <h2>UserInfo エンドポイント</h2>
      <p>
        ID トークンに含めない追加情報（メアド、プロフィール画像 URL 等）が欲しい時は、access_token を使って UserInfo エンドポイントを叩きます：
      </p>
      <pre><code>{`GET https://openidconnect.googleapis.com/v1/userinfo
Authorization: Bearer ya29.A0ARrdaM...

→ {
    "sub": "10769150350006150715113",
    "name": "Tanaka Taro",
    "email": "user@example.com",
    ...
  }`}</code></pre>
      <p>
        ID トークンを軽量に保ちつつ、必要に応じて詳細を取得する設計です。
      </p>

      <h2>セキュリティで必ず守ること</h2>

      <h3>1. state パラメータで CSRF 対策</h3>
      <p>
        OAuth フロー中の <code>state</code> パラメータは、<Link href="/learn/security/csrf">CSRF</Link> 対策。クライアントがランダム値を生成して認可サーバに送り、callback で同じ値が戻ってきたか確認することで、攻撃者が偽の callback リクエストを送り込む攻撃を防ぎます。
      </p>

      <h3>2. nonce で id_token のリプレイ対策</h3>
      <p>
        OIDC では <code>nonce</code> パラメータも使います。クライアントが生成 → 認可サーバに送信 → ID トークンに含めて返す → クライアントが検証。攻撃者が古い ID トークンを再利用する攻撃を防ぎます。
      </p>

      <h3>3. redirect_uri の完全一致</h3>
      <p>
        認可サーバに事前登録した redirect_uri と、リクエスト時の redirect_uri が<strong>完全一致</strong>することを認可サーバ側がチェックします。一致しないと redirect 自体されない。<strong>ワイルドカードや前方一致は事故の元</strong>。
      </p>

      <h3>4. ID トークンの aud / iss / exp / 署名 検証</h3>
      <p>
        受け取った ID トークンは、何よりまず：
      </p>
      <ul>
        <li>署名（<Link href="/learn/security/public-key-crypto">RSA/ECDSA</Link> の公開鍵で）</li>
        <li><code>iss</code>（発行者）が期待した認可サーバか</li>
        <li><code>aud</code>（対象）が自分の client_id か</li>
        <li><code>exp</code>（期限）が切れていないか</li>
        <li><code>nonce</code> が自分が発行したものと一致するか</li>
      </ul>
      <p>
        を全て検証する必要があります。<strong>ライブラリに任せて、自前実装は避ける</strong>のが鉄則。
      </p>

      <h3>5. PKCE を使う</h3>
      <p>
        2025年以降、SPA/モバイルだけでなくサーバサイドでも PKCE は必須化の流れ。最初から有効化しておきましょう。
      </p>

      <h2>実装は自前で書かない</h2>
      <p>
        OAuth/OIDC の実装は<strong>「自前で書かない」が最優先のセキュリティ対策</strong>です。落とし穴が多すぎる：
      </p>
      <ul>
        <li>state / nonce の検証漏れ</li>
        <li>redirect_uri の検証漏れ</li>
        <li>ID トークンの署名検証スキップ</li>
        <li>PKCE 未対応</li>
        <li>クッキーセキュリティ属性の設定漏れ</li>
      </ul>
      <p>
        各言語の主要ライブラリ：
      </p>
      <ul>
        <li><strong>Node.js</strong>: <code>openid-client</code>, <code>NextAuth.js</code> / <code>Auth.js</code></li>
        <li><strong>Python</strong>: <code>authlib</code>, <code>django-allauth</code></li>
        <li><strong>Go</strong>: <code>golang.org/x/oauth2</code> + <code>go-oidc</code></li>
        <li><strong>Ruby</strong>: <code>omniauth</code></li>
        <li><strong>Spring</strong>: <code>spring-security-oauth2-client</code></li>
      </ul>
      <p>
        さらにマネージド IDaaS（Auth0 / Clerk / WorkOS / Firebase Authentication / Cognito）を使えば、自前のコード量はほぼゼロにできます。
      </p>

      <h2>OAuth と OIDC のまとめ</h2>
      <p>
        最終的に覚えるべき要点：
      </p>
      <ul>
        <li>
          <strong>OAuth 2.0 は認可（Authorization）の仕組み</strong> - 「APIアクセスの権限を委任する」
        </li>
        <li>
          <strong>OIDC は認証（Authentication）の仕組み</strong> - 「ユーザーを識別する」
        </li>
        <li>
          <strong>使うフローは Authorization Code + PKCE</strong>（Implicit / Password Flow は廃止）
        </li>
        <li>
          <strong>access_token は API 用、id_token はログイン用</strong>（用途を混ぜない）
        </li>
        <li>
          <strong>state / nonce / PKCE / 署名検証は省略不可</strong>
        </li>
        <li>
          <strong>自前実装は避け、信頼できるライブラリを使う</strong>
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        OAuth と OIDC は学習コストが高いですが、現代の Web 認証/認可の<strong>基盤プロトコル</strong>です。一度理解すれば、SaaS 連携、API 認証、SSO、社内ID基盤、すべてに応用できます。
      </p>
      <p>
        本サイトの <Link href="/tools/jwt-decoder">JWT Decoder</Link> で実際に Google や GitHub から取得した id_token を貼り付けると、claims（iss/sub/aud/exp/email等）の構造を可視化できます。OIDC を実装する時の理解の助けにしてください。
      </p>
      <p>
        関連: <Link href="/learn/security/session-vs-jwt">セッション vs JWT 認証</Link> / <Link href="/learn/security/jwt-security-issues">JWT のセキュリティ問題</Link> / <Link href="/learn/security/public-key-crypto">公開鍵暗号の基本</Link>
      </p>
    </ArticleLayout>
  );
}
