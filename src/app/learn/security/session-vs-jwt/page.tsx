import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "session-vs-jwt")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>はじめに: 「ログイン状態」の保ち方</h2>
      <p>
        HTTP は<strong>ステートレス</strong>なプロトコルで、リクエストごとに「あなたは誰なのか」をサーバ側に思い出させる仕組みが必要です。これを実現する代表的な方式が2つ：
      </p>
      <ul>
        <li><strong>セッション認証</strong>（伝統的、サーバ状態あり）</li>
        <li><strong>JWT 認証</strong>（モダン、ステートレス）</li>
      </ul>
      <p>
        この記事では「結局どっちがいいの？」という問いに、シーン別の答えを示します。結論を先に書くと：<strong>「Webサービスのログインなら原則セッション、API/SPA/モバイルとの組み合わせで JWT、組織横断SSOなら OIDC」</strong> ──ですが、なぜそうなるのかを順を追って整理します。
      </p>

      <h2>方式1: セッション認証</h2>
      <p>
        1990年代から続く伝統的な方式。仕組みは単純：
      </p>
      <ol>
        <li>ユーザーがログイン → サーバは<strong>ランダムなセッションID</strong>を発行</li>
        <li>サーバ側 DB / Redis に <code>session_id → user_id</code> のマッピングを保存</li>
        <li>クライアントには Set-Cookie でセッション ID を渡す</li>
        <li>以降のリクエストでは、ブラウザが Cookie を自動付与してサーバに送信</li>
        <li>サーバは Cookie のセッション ID で DB を引いて、ユーザーを特定</li>
      </ol>
      <pre><code>{`# ログインレスポンス
HTTP/1.1 200 OK
Set-Cookie: sid=a1b2c3d4e5f6; HttpOnly; Secure; SameSite=Lax

# 以降のリクエスト
GET /api/me HTTP/1.1
Cookie: sid=a1b2c3d4e5f6`}</code></pre>
      <p>
        セッション ID 自体は<strong>意味のないランダム文字列</strong>で、サーバ側のセッションストアが「真実の保管場所」です。
      </p>

      <h3>セッション認証の利点</h3>
      <ul>
        <li>
          <strong>サーバ側で即時に無効化可能</strong>: ログアウト時、不正検知時、セッションストアからレコードを消すだけ
        </li>
        <li>
          <strong>権限変更が即時反映</strong>: 「この人を管理者から外す」が次のリクエストで反映
        </li>
        <li>
          <strong>クライアント側にユーザー情報を持たない</strong>: 漏洩時の被害が限定的
        </li>
        <li>
          <strong>枯れていて実装が安定</strong>: フレームワーク標準サポート（Rails / Django / Laravel / Express-session）
        </li>
      </ul>

      <h3>セッション認証の欠点</h3>
      <ul>
        <li>
          <strong>サーバ側に状態を持つ</strong>: スケールアウトする時、複数サーバ間でセッションストアを共有する必要（Redis / DB）
        </li>
        <li>
          <strong>クロスドメインで使いづらい</strong>: 別ドメインの API を叩く時、Cookie の SameSite 制約や CORS で詰まる
        </li>
        <li>
          <strong>モバイルアプリで Cookie が扱いづらい</strong>: WebView 経由でないと自然にいかない
        </li>
      </ul>

      <h2>方式2: JWT 認証</h2>
      <p>
        2010年代に SPA / モバイルアプリの普及とともに広まった方式。<strong>JWT（JSON Web Token）</strong>はユーザー情報そのものをトークンに署名付きで詰め込む仕組み。
      </p>
      <p>
        例えばログインすると、サーバはこんなトークンを返します：
      </p>
      <pre><code>{`eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJleHAiOjE3MzAwMDAwMDB9.signature

# Base64 デコードすると…
{"alg":"HS256"}.{"sub":"123","exp":1730000000}.{署名}`}</code></pre>
      <p>
        Payload に <code>sub</code>（ユーザーID）や <code>exp</code>（有効期限）を入れ、サーバの秘密鍵で<strong>署名</strong>します。サーバは受け取ったトークンの署名を検証するだけでユーザーを認証できる。<strong>サーバ側にセッションストア不要</strong>がポイント。
      </p>
      <pre><code>{`# 以降のリクエスト
GET /api/me HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWI...`}</code></pre>

      <h3>JWT 認証の利点</h3>
      <ul>
        <li>
          <strong>ステートレス</strong>: サーバ側にセッションストア不要、水平スケールが楽
        </li>
        <li>
          <strong>マイクロサービス間で共有しやすい</strong>: トークン1個で複数サービスが認証可能
        </li>
        <li>
          <strong>クロスドメインで使いやすい</strong>: <code>Authorization</code> ヘッダ経由で Cookie の制約を受けない
        </li>
        <li>
          <strong>モバイル/SPAで自然</strong>: ブラウザ依存の Cookie ではなく、アプリのストレージで管理可能
        </li>
        <li>
          <strong>ユーザー情報を含められる</strong>: 各リクエストで DB を引かなくても <code>sub</code>, <code>role</code> 等が分かる
        </li>
      </ul>

      <h3>JWT 認証の欠点</h3>
      <ul>
        <li>
          <strong>即時失効が困難</strong>: 一度発行したトークンは <code>exp</code> まで有効。不正検知して即ログアウトさせたい時にブラックリストが必要 → 結局サーバ状態を持つ
        </li>
        <li>
          <strong>権限変更がリアルタイム反映されない</strong>: 「管理者から降格」を実行しても、次のトークン更新まで反映されない
        </li>
        <li>
          <strong>ペイロードが大きい</strong>: Cookie/ヘッダのサイズが膨らむ（数百バイト〜KB単位）
        </li>
        <li>
          <strong>署名検証の落とし穴が多い</strong>: alg=none、アルゴリズム混同、弱い秘密鍵等。詳細は <Link href="/learn/security/jwt-security-issues">JWT のよくあるセキュリティ問題</Link> 参照
        </li>
      </ul>

      <h2>保管場所: Cookie か localStorage か</h2>
      <p>
        JWT を採用すると次に必ず議論になるのが「ブラウザでどう保管するか」。選択肢は3つあり、それぞれ XSS / CSRF への耐性が違います。
      </p>
      <table>
        <thead>
          <tr>
            <th>保管場所</th>
            <th>XSS耐性</th>
            <th>CSRF耐性</th>
            <th>送信</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>localStorage</td>
            <td>❌ JS から読めるので窃取可</td>
            <td>✅ 自動送信されない</td>
            <td>JS で <code>Authorization</code> ヘッダ付与</td>
          </tr>
          <tr>
            <td>HttpOnly Cookie</td>
            <td>✅ JS から読めない</td>
            <td>❌ 自動送信されるので CSRF 対策必要</td>
            <td>ブラウザが自動付与</td>
          </tr>
          <tr>
            <td>メモリ（変数）</td>
            <td>△ JS スコープ次第</td>
            <td>✅ 自動送信されない</td>
            <td>リロードで消える</td>
          </tr>
        </tbody>
      </table>
      <p>
        現代の推奨は<strong>「アクセストークンはメモリ、リフレッシュトークンは HttpOnly Cookie」</strong>のハイブリッドパターンが多いです。XSS の影響範囲を「短命なメモリトークンの窃取」に限定でき、長命のリフレッシュトークンは JS から触れない位置に置く。
      </p>
      <blockquote>
        <p>
          ⚠ 「localStorage に JWT を入れる」はセキュリティ的に最弱。XSS 1個で全ユーザーのトークンが盗まれます。
        </p>
      </blockquote>

      <h2>リフレッシュトークン: 寿命の使い分け</h2>
      <p>
        JWT を実運用すると、すぐに「即時失効できない問題」と「短命にすると再ログインが多すぎる問題」のジレンマに直面します。解決策が<strong>2種類のトークン</strong>を使い分けるパターン：
      </p>
      <ul>
        <li>
          <strong>アクセストークン</strong>: 短命（5〜15分）、API 呼び出しに使用、漏洩しても影響限定
        </li>
        <li>
          <strong>リフレッシュトークン</strong>: 長命（数日〜数週間）、アクセストークン更新専用、サーバ側で失効管理
        </li>
      </ul>
      <p>
        フロー：
      </p>
      <ol>
        <li>ログイン → 両トークンを発行</li>
        <li>API 呼び出しはアクセストークンで（普通の JWT 検証のみ、サーバ状態不要）</li>
        <li>アクセストークンが期限切れになったら、リフレッシュトークンで新しいアクセストークンを取得</li>
        <li>リフレッシュ時にサーバ側で「このリフレッシュトークンが失効していないか」を DB で確認</li>
      </ol>
      <p>
        この設計だと、<strong>「99% のリクエストはステートレス、ログイン延長の瞬間だけサーバ状態を読む」</strong>という良いとこ取りができます。
      </p>

      <h2>結局どちらを選ぶ？</h2>

      <h3>シナリオA: 一般的な Web サービス（SSR ベース）</h3>
      <p>
        Rails / Django / Laravel 等のサーバーサイドレンダリングが主体で、フロントエンドが同じドメインで動く構成。
      </p>
      <p>
        → <strong>セッション認証</strong>。フレームワーク標準、安全、シンプル。JWT を導入するメリットは薄い。
      </p>

      <h3>シナリオB: SPA + 別ドメインの API</h3>
      <p>
        React/Vue の SPA がフロント、API が別サーバ（別ドメイン）。
      </p>
      <p>
        → <strong>JWT または同ドメインに寄せたセッション</strong>。
        <ul>
          <li>API を <code>api.example.com</code>、フロントを <code>app.example.com</code> のように<strong>サブドメイン構成</strong>にすれば Cookie でセッション認証も可能</li>
          <li>完全別ドメイン or マイクロサービス構成なら JWT の方が素直</li>
        </ul>
      </p>

      <h3>シナリオC: モバイルアプリ + API</h3>
      <p>
        ネイティブアプリと API サーバ。
      </p>
      <p>
        → <strong>JWT</strong>。Cookie ベースのセッションは扱いづらい。アクセス + リフレッシュトークンで運用。
      </p>

      <h3>シナリオD: マイクロサービス / 複数システム</h3>
      <p>
        サービス A → サービス B → サービス C と認証を引き継ぐ必要がある構成。
      </p>
      <p>
        → <strong>JWT or OIDC</strong>。各サービスが独立に署名検証できる JWT が向く。組織横断 SSO なら <strong>OpenID Connect (OIDC)</strong>（中身は JWT ベース）。
      </p>

      <h3>シナリオE: 第三者サービス連携（OAuth）</h3>
      <p>
        「Google でログイン」のような第三者連携。
      </p>
      <p>
        → <strong>OAuth 2.0 / OIDC</strong>。自前で JWT を発行する話とは別軸で、第三者の発行する ID トークン（JWT）を受け取る形。
      </p>

      <h2>「JWT がモダンだから JWT」は間違い</h2>
      <p>
        2015〜2018年頃の SPA ブームで「セッションは古い、これからは JWT」という空気がありましたが、2026年現在の評価はかなり揺り戻しが起きています：
      </p>
      <ul>
        <li>JWT を「使うべきでないところ」で使うとハマるポイントが多すぎる</li>
        <li>「JWT in localStorage」の事例ほぼ全てがセキュリティ的にアウト</li>
        <li>セッション認証 + Cookie の組み合わせが、2026 年の SameSite 既定値・HttpOnly・Secure と相まって極めて堅牢になった</li>
      </ul>
      <p>
        Hacker News や Reddit の議論でも「<em>Stop using JWT for sessions</em>」の論調が定着しています。<strong>「ステートレスである必要が本当にあるのか」</strong>を最初に問うのが大事。
      </p>

      <h2>セキュリティチェックリスト</h2>
      <p>
        どちらを選んでも共通でやること：
      </p>
      <ul>
        <li>
          <strong>HTTPS 必須</strong>: 平文 HTTP で Cookie/JWT が飛んだら盗聴で終わり（<Link href="/learn/network/https-tls">HTTPS と TLS の仕組み</Link>）
        </li>
        <li>
          <strong>HttpOnly + Secure + SameSite=Lax</strong>: Cookie の3点セット（<Link href="/learn/security/csrf">CSRF</Link>）
        </li>
        <li>
          <strong>適切な失効/期限</strong>: アクセストークンは短く、リフレッシュトークンは管理可能に
        </li>
        <li>
          <strong>パスワード保存は別問題</strong>: 認証方式を選ぶ前に <Link href="/learn/security/password-hashing">適切なハッシュ関数</Link> で保存
        </li>
        <li>
          <strong>多要素認証で底上げ</strong>: <Link href="/learn/security/mfa-totp-fido2">MFA</Link> を併用
        </li>
        <li>
          <strong>JWT を使うなら署名検証の罠を理解</strong>: <Link href="/learn/security/jwt-security-issues">JWT のよくあるセキュリティ問題</Link>
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        セッション vs JWT は<strong>「モダン or 古い」ではなく「使う場所が違う」</strong>という関係です。新規プロジェクトでは「ステートレスな必要性が本当にあるか」を最初に考え、必要なければセッションが安全で楽。SPA + API / モバイル / マイクロサービスのような分散構成では JWT が活きます。
      </p>
      <p>
        本サイトの <Link href="/tools/jwt-decoder">JWT Decoder</Link> で実際の JWT トークンを分解し、署名検証まで実行できます。<Link href="/tools/cookie-parser">HTTP Cookie Parser</Link> で Set-Cookie の SameSite/HttpOnly 設定をチェックすれば、セッション側の運用も整理できます。
      </p>
    </ArticleLayout>
  );
}
