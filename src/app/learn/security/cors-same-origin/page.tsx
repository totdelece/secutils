import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "cors-same-origin")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「No 'Access-Control-Allow-Origin' header」エラーで詰まった人へ</h2>
      <p>
        フロントエンド開発で API を叩いた瞬間、コンソールに見覚えのある赤文字：
      </p>
      <pre><code>{`Access to fetch at 'https://api.example.com/users' from origin
'https://app.example.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.`}</code></pre>
      <p>
        この記事は、上記のエラーを「とりあえず動かす」ではなく<strong>「なぜ起きるのか」「どう直すのが正解か」</strong>を理解するためのものです。仕組みを理解すれば、CORS は単なる障害物ではなく Web の安全を支える重要な防壁だと分かります。
      </p>

      <h2>そもそも Same-Origin Policy（同一オリジンポリシー）とは</h2>
      <p>
        ブラウザには <strong>Same-Origin Policy（SOP）</strong>という基本ルールがあり、<strong>「あるオリジンの JavaScript は、別オリジンのリソースに自由にアクセスできない」</strong>という制限がかかっています。1995 年の Netscape Navigator 2.0 に導入されて以来、ブラウザ内セキュリティの土台です。
      </p>
      <p>
        オリジンの定義はシンプルで、<strong>スキーム + ホスト + ポート</strong>の3つ組：
      </p>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>オリジン</th>
            <th>同一？</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>https://example.com/foo</td>
            <td>https://example.com:443</td>
            <td>基準</td>
          </tr>
          <tr>
            <td>https://example.com/bar</td>
            <td>https://example.com:443</td>
            <td>同じ ✅</td>
          </tr>
          <tr>
            <td>http://example.com/foo</td>
            <td>http://example.com:80</td>
            <td>違う ❌（スキーム違い）</td>
          </tr>
          <tr>
            <td>https://api.example.com</td>
            <td>https://api.example.com:443</td>
            <td>違う ❌（ホスト違い）</td>
          </tr>
          <tr>
            <td>https://example.com:8080</td>
            <td>https://example.com:8080</td>
            <td>違う ❌（ポート違い）</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>「サブドメインが違うだけでも別オリジン」</strong>という点が重要。<code>app.example.com</code> から <code>api.example.com</code> を叩く時、別オリジン扱いで CORS が必要になります。
      </p>

      <h2>SOP がなぜ存在するのか</h2>
      <p>
        SOP の目的は2つの攻撃を防ぐこと：
      </p>

      <h3>1. クッキー窃取（Cookie 経由のなりすまし）</h3>
      <p>
        SOP がないと、罠サイト <code>evil.com</code> から <code>fetch("https://bank.example/account")</code> を実行すると、ブラウザは Cookie を律儀に付けて送信し、レスポンスをスクリプトから読めてしまう。残高がそのまま盗まれます。
      </p>
      <p>
        SOP は<strong>「リクエストは送れるが、レスポンスは別オリジンの JS から読めない」</strong>という制限で、これを防ぎます。リクエスト送信自体は防げない点が <Link href="/learn/security/csrf">CSRF</Link> の存在理由です。
      </p>

      <h3>2. DOM 越しの情報漏洩</h3>
      <p>
        罠サイトが <code>iframe</code> で銀行サイトを埋め込み、JavaScript で iframe の中身を読む、という攻撃も SOP で防がれます。<code>iframe.contentDocument</code> へのアクセスはオリジンが違うと例外になります。
      </p>

      <h2>SOP は何を「防がない」か</h2>
      <p>
        ここを誤解すると CORS の意味も曖昧になります。SOP は「JS からのレスポンス読み取り」を防ぐだけで、以下は全て可能です：
      </p>
      <ul>
        <li>
          <code>{'<img src="https://other.com/...">'}</code> で別オリジンの画像表示
        </li>
        <li>
          <code>{'<script src="https://cdn.example/lib.js">'}</code> で別オリジンの JS 読み込み（読み込んだスクリプトは自オリジンで動くので注意）
        </li>
        <li>
          <code>{'<form action="https://other.com/submit" method="POST">'}</code> で別オリジンへの POST 送信
        </li>
        <li>
          <code>fetch</code> や <code>XMLHttpRequest</code> での<strong>リクエスト送信自体</strong>（レスポンスが読めないだけ）
        </li>
      </ul>
      <p>
        最後の項目が大事。<strong>リクエストは飛んでサーバ側で副作用が起きる</strong>。これが <Link href="/learn/security/csrf">CSRF</Link> の根本原理です。
      </p>

      <h2>では CORS とは何か</h2>
      <p>
        <strong>CORS（Cross-Origin Resource Sharing）</strong>は、SOP の「別オリジンレスポンスを JS から読めない」制限に<strong>「サーバ側が許可した場合のみ穴を開ける」</strong>仕組みです。2014 年に W3C で標準化されました。
      </p>
      <p>
        CORS の本質はシンプルで、<strong>レスポンスヘッダ <code>Access-Control-Allow-Origin</code> でサーバが「このオリジンには見せていいよ」と宣言する</strong>こと。
      </p>
      <pre><code>{`# クライアント（app.example.com）からのリクエスト
GET /users HTTP/1.1
Host: api.example.com
Origin: https://app.example.com

# サーバのレスポンス（CORS ヘッダ付き）
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.example.com
Content-Type: application/json

{"users": [...]}`}</code></pre>
      <p>
        ブラウザはレスポンスを受け取ると、<code>Access-Control-Allow-Origin</code> ヘッダの値が自分のオリジンと一致するかチェック。一致すれば JS にレスポンスを渡し、不一致なら CORS エラーで弾く。<strong>判定はブラウザ側</strong>で、サーバはあくまで「許可しますよ」と宣言するだけです。
      </p>

      <h2>2 種類のリクエスト: 単純とプリフライト</h2>
      <p>
        CORS リクエストは「単純リクエスト（Simple Request）」と「プリフライトを伴うリクエスト」の2種類に分かれます。
      </p>

      <h3>単純リクエスト（プリフライト不要）</h3>
      <p>
        以下を<strong>すべて満たす</strong>場合、ブラウザはいきなり本リクエストを送ります：
      </p>
      <ul>
        <li>メソッドが GET / HEAD / POST</li>
        <li>カスタムヘッダ無し（許可されているのは <code>Accept</code>, <code>Accept-Language</code>, <code>Content-Language</code>, <code>Content-Type</code> 等の限定リスト）</li>
        <li><code>Content-Type</code> が <code>application/x-www-form-urlencoded</code> / <code>multipart/form-data</code> / <code>text/plain</code> のいずれか</li>
      </ul>
      <p>
        昔ながらの <code>{'<form>'}</code> から送れるリクエストは大体ここに該当します。<strong>レガシー HTML での挙動と完全互換</strong>にするための設計。
      </p>

      <h3>プリフライト（Preflight）</h3>
      <p>
        単純リクエストの条件を満たさない場合、ブラウザは<strong>本リクエストを送る前に「OPTIONS で許可確認」</strong>を入れます。これが「プリフライト」。
      </p>
      <pre><code>{`# プリフライトリクエスト
OPTIONS /users HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, Authorization

# プリフライトレスポンス
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400`}</code></pre>
      <p>
        OPTIONS で OK が返ったら、ブラウザは本リクエスト（PUT）を送信。<strong>OPTIONS が失敗したら本リクエストは送られない</strong>ので、サーバ側に副作用は起きません。これがプリフライトの安全性。
      </p>
      <p>
        典型的にプリフライトが発生するケース：
      </p>
      <ul>
        <li><code>{'fetch(url, { method: "PUT" })'}</code> や <code>DELETE</code></li>
        <li><code>Authorization: Bearer ...</code> を付けたリクエスト（カスタムヘッダ扱い）</li>
        <li><code>Content-Type: application/json</code> での POST</li>
      </ul>
      <p>
        モダン SPA で API を叩くと、ほぼ必ずプリフライトが発生します。Network タブで OPTIONS リクエストを見たことがあるはず。
      </p>

      <h2>credentials（Cookie 付きリクエスト）</h2>
      <p>
        既定では CORS リクエストに Cookie は付きません。Cookie を送りたければ、クライアント側とサーバ側の両方で明示する必要があります。
      </p>
      <pre><code>{`// クライアント
fetch("https://api.example.com/me", {
  credentials: "include"
})`}</code></pre>
      <pre><code>{`# サーバ
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true`}</code></pre>
      <p>
        重要な制約：<strong><code>Access-Control-Allow-Credentials: true</code> と <code>Access-Control-Allow-Origin: *</code> は併用できない</strong>。Cookie 付きを許可するなら、Origin は具体値で返す必要があります。
      </p>
      <pre><code>{`# ❌ ダメ（ブラウザが拒否）
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

# ✅ OK
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true`}</code></pre>
      <p>
        この仕様は意図的で、<strong>「あらゆるサイトから Cookie 付きで叩ける状態は危険すぎる」</strong>というブラウザベンダーの判断。
      </p>

      <h2>よくある罠</h2>

      <h3>罠1: ワイルドカード <code>*</code> の落とし穴</h3>
      <p>
        「とりあえず <code>Access-Control-Allow-Origin: *</code> で動いた」とよく言われます。確かに動きますが：
      </p>
      <ul>
        <li>Cookie 付きリクエスト（credentials）は使えない</li>
        <li>認証 API では実用にならない</li>
        <li>「全世界に公開していい API」だけに限定すべき</li>
      </ul>
      <p>
        本番環境では<strong>許可するオリジンを動的にチェック</strong>するのが普通：
      </p>
      <pre><code>{`// 例: Express
app.use((req, res, next) => {
  const allowed = ["https://app.example.com", "https://staging.example.com"]
  const origin = req.headers.origin
  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
    res.setHeader("Vary", "Origin")  // キャッシュ汚染防止
  }
  next()
})`}</code></pre>
      <p>
        <code>Vary: Origin</code> の追加を忘れると、CDN キャッシュが「最初の Origin で固定」されて他オリジンから 403 を食らう事故が起きます。
      </p>

      <h3>罠2: プリフライトの 401/403</h3>
      <p>
        OPTIONS リクエストに対して認証ミドルウェアが動いて 401 を返してしまうケース。<strong>OPTIONS は認証チェック前に通す</strong>ように設定します：
      </p>
      <pre><code>{`// 例: 認証ミドルウェアを OPTIONS から除外
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return next()
  return authMiddleware(req, res, next)
})`}</code></pre>

      <h3>罠3: サーバ側にだけ書けば直ると思ってる</h3>
      <p>
        CORS は<strong>「サーバが許可ヘッダを付ける、ブラウザがそれを見て判定する」</strong>という分業。サーバが <code>Allow-Origin</code> を返すだけでなく、<strong>クライアント側のリクエストも適切に書く必要</strong>があります（<code>credentials</code>, <code>mode: "cors"</code> など）。
      </p>

      <h3>罠4: Postman/curl では動くのにブラウザだけダメ</h3>
      <p>
        Postman / curl は SOP/CORS を実装していません。<strong>CORS はあくまでブラウザ内の制限</strong>なので、サーバから見れば普通の HTTP リクエストとして処理されます。<strong>「ブラウザだけが厳格」</strong>のは仕様です。
      </p>

      <h2>「CORS を回避したい」という発想は危険</h2>
      <p>
        ググると <code>Access-Control-Allow-Origin: *</code> + <code>Access-Control-Allow-Credentials</code> を強引に有効化したり、ブラウザの CORS 機能を無効にする拡張機能の使用を勧める記事が出てきます。<strong>絶対にやめてください</strong>。
      </p>
      <p>
        CORS は本番ユーザーの安全のための仕組み。開発時の不便を理由にユーザーを危険にさらすのは本末転倒です。代替案：
      </p>
      <ul>
        <li>
          <strong>開発時のプロキシ</strong>: Webpack/Vite の dev server プロキシ機能で、フロント側からは同オリジンに見せる
        </li>
        <li>
          <strong>BFF（Backend for Frontend）</strong>: API を直接叩かず、自分のバックエンド経由で叩く
        </li>
        <li>
          <strong>許可オリジンの正しい設定</strong>: 自社ドメインだけ許可する
        </li>
      </ul>

      <h2>セキュリティ視点での CORS</h2>
      <p>
        CORS の設定ミスは情報漏洩に直結する深刻な脆弱性です。OWASP も <Link href="/learn/security/owasp-top-10">A05 Security Misconfiguration</Link> として警告しています：
      </p>
      <ul>
        <li>
          <strong>Origin リフレクション</strong>: <code>Origin</code> ヘッダの値を検証なしでそのまま <code>Allow-Origin</code> に返す → どこからでも credentials 付きで叩ける
        </li>
        <li>
          <strong>サブドメインワイルドカード</strong>: <code>*.example.com</code> を許可していると、攻撃者が <code>evil.example.com</code> を取得できれば突破
        </li>
        <li>
          <strong>古い IE / Flash 互換のための設定残骸</strong>: <code>crossdomain.xml</code> が残っていて全公開状態
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        CORS は「動かない」と憎まれがちな仕様ですが、<strong>SOP という Web の根幹を支える防壁の上で安全に通信する仕組み</strong>です。「とりあえず <code>*</code>」で済ませず、許可するオリジンを明示的に管理することで、CORS は強い味方になります。
      </p>
      <p>
        本サイトの <Link href="/tools/http-status">HTTP Status Code Reference</Link> で OPTIONS / 204 / 403 など CORS 関連のステータスコードを、<Link href="/tools/cookie-parser">HTTP Cookie Parser</Link> で credentials 周りの Cookie 属性を確認できます。CORS は <Link href="/learn/security/csrf">CSRF</Link> と表裏一体なので、合わせて読むと理解が深まります。
      </p>
    </ArticleLayout>
  );
}
