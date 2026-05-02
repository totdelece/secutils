import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "https-tls")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「鍵マーク」の正体</h2>
      <p>
        ブラウザのアドレスバーに表示される鍵マーク。当たり前のように毎日見ていますが、あれは <strong>HTTPS（HTTP over TLS）</strong>で通信が暗号化・認証されていることを示しています。
      </p>
      <p>
        この記事では、HTTP と HTTPS の違い、TLS というプロトコルが何をしてくれるのか、なぜ証明書の仕組みで「正しいサイトかどうか」が分かるのか、を初学者向けに解説します。
      </p>

      <h2>HTTP は丸見えのプロトコル</h2>
      <p>
        通常の HTTP は<strong>平文</strong>で通信します。同じ Wi-Fi に接続している攻撃者や、経路上の ISP、企業ネットワークの管理者は、あなたが送受信した内容（URL、Cookie、フォーム入力、レスポンス HTML すべて）を覗き見できます。
      </p>
      <p>
        さらに悪いことに、<strong>改ざん</strong>もできます。経路上の誰かが「正規のレスポンスに広告 JS を差し込む」「Form の送信先を書き換える」のような攻撃が技術的には可能です。
      </p>

      <h2>HTTPS は TLS で守られた HTTP</h2>
      <p>
        HTTPS は HTTP プロトコルそのままで、<strong>下に TLS（Transport Layer Security）という暗号化レイヤを挟んだもの</strong>です。TLS は次の3つを保証します：
      </p>
      <ol>
        <li>
          <strong>機密性</strong>: 通信内容を経路上の第三者に読まれない（暗号化）
        </li>
        <li>
          <strong>完全性</strong>: 通信内容を経路上で改ざんされない（メッセージ認証）
        </li>
        <li>
          <strong>認証</strong>: 通信相手が「本当に <code>example.com</code> のサーバーである」ことを確認（サーバー証明書）
        </li>
      </ol>
      <p>
        TLS は SSL の後継で、現在主流は <strong>TLS 1.3</strong>（2018年標準化）。古い TLS 1.0 / 1.1 は脆弱なため非推奨で、すでに主要ブラウザは無効化しています。
      </p>

      <h2>TLS ハンドシェイク（簡略版）</h2>
      <p>
        TLS 接続を確立する流れの大枠：
      </p>
      <pre><code>{`1. クライアント → サーバー: ClientHello
   "TLS 1.3 で話したい、対応暗号アルゴリズムはこれ"

2. サーバー → クライアント: ServerHello + 証明書 + 鍵交換情報
   "OK、TLS 1.3 で AES-256-GCM を使おう。
    証明書はこれ、鍵交換にはこの楕円曲線パラメータを使って"

3. クライアントが証明書を検証
   "この証明書は信頼できる CA に署名されてる、
    ドメイン名も example.com で一致、有効期限も OK"

4. 鍵交換（ECDHE）
   "両者がそれぞれ秘密の値を生成し、公開部分を交換することで、
    経路上の誰にも知られない共有秘密を作る"

5. 共有秘密からセッション鍵を導出 → 以降この鍵で対称暗号化通信`}</code></pre>
      <p>
        TLS 1.3 ではこのハンドシェイクが <strong>1 RTT</strong>（往復1回）で完了します。古い TLS 1.2 だと 2 RTT 必要で、初回接続が遅い欠点がありました。
      </p>

      <h2>サーバー証明書はなぜ信頼できるのか</h2>
      <p>
        TLS 接続時にサーバーから送られてくる「証明書」は、本質的には次の3つが含まれた電子文書です：
      </p>
      <ul>
        <li>サーバーの公開鍵</li>
        <li>サーバーのドメイン名（CN / SAN）</li>
        <li>これに対する <strong>認証局（CA、Certificate Authority）</strong>の署名</li>
      </ul>
      <p>
        ブラウザや OS は<strong>あらかじめ信頼する CA のリスト（ルート証明書ストア）</strong>を持っています。受け取った証明書の署名がこの信頼リストの CA で検証できれば、「この証明書は本物だ」と判断します。
      </p>
      <p>
        実際には、CA は「中間 CA」を通じて証明書を発行する階層構造になっています。これを <strong>証明書チェーン</strong>と呼びます：
      </p>
      <pre><code>{`example.com の証明書
  └─ 中間 CA "DigiCert TLS RSA SHA256 2020 CA1" の署名
    └─ ルート CA "DigiCert Global Root CA" の署名
      ↑ ブラウザの信頼リストに入っている`}</code></pre>
      <p>
        無料で証明書を発行してくれる <strong>Let&apos;s Encrypt</strong> も、この CA の一つです。多くの個人サイトや小規模サービスはここを使っています。
      </p>

      <h2>HMAC は TLS の中でも使われている</h2>
      <p>
        TLS のメッセージ認証（改ざん検知）には <strong>HMAC</strong> や <strong>AEAD（GCM、ChaCha20-Poly1305）</strong>が使われています。AEAD は暗号化と認証を一体化したもので、TLS 1.3 ではこちらが主流です。
      </p>
      <p>
        HMAC は身近な「Webhook の署名検証」「JWT の HS256/384/512」「AWS Signature V4」などでも同じ仕組みが使われています。本サイトの HMAC Generator で実際に挙動を確認できます。
      </p>

      <h2>HSTS: HTTPS を強制する仕組み</h2>
      <p>
        ユーザーがアドレスバーに <code>example.com</code>（http なし）と入れると、ブラウザはまず HTTP で接続を試み、サーバーが HTTPS にリダイレクトする、という流れが伝統的でした。しかしこの「最初の HTTP 通信」が中間者攻撃の入口になります（SSL ストリッピング攻撃）。
      </p>
      <p>
        これを塞ぐのが <strong>HSTS（HTTP Strict Transport Security）</strong>。サーバーが次のヘッダーを返すと、ブラウザは「このドメインは今後常に HTTPS でアクセスする」と記憶します。
      </p>
      <pre><code>{`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`}</code></pre>
      <p>
        本サイトもこれを設定済みで、初回からすべて HTTPS で扱われます。
      </p>

      <h2>中間者攻撃（MITM）と CA の信頼</h2>
      <p>
        TLS の信頼モデルは <strong>「ブラウザが信頼するすべての CA を信頼する」</strong>という構造です。これは強力な反面、<strong>悪意ある CA が偽の証明書を発行する</strong>と中間者攻撃が成立してしまう弱点があります。過去にも DigiNotar（2011年）等の事件がありました。
      </p>
      <p>
        この弱点を補う仕組み：
      </p>
      <ul>
        <li>
          <strong>Certificate Transparency（CT）</strong>: 発行された証明書を公開ログに記録し、不正発行を検知できるようにする
        </li>
        <li>
          <strong>HPKP / Expect-CT</strong>（一部ブラウザでは廃止）
        </li>
        <li>
          <strong>CAA レコード</strong>: DNS で「うちのドメインの証明書はこの CA だけが発行してよい」と宣言
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        HTTPS / TLS は<strong>「鍵マークが出てれば OK」</strong>と思いがちですが、その裏では複数の暗号アルゴリズム・PKI（公開鍵基盤）・CA の信頼チェーンが動いています。仕組みを理解しておくと、自前サーバーの設定（Let&apos;s Encrypt、Nginx の SSL 設定）や、企業環境のプロキシ証明書を信頼させる場面で迷わなくなります。
      </p>
      <p>
        本サイトも HSTS / 厳格な CSP / 強い暗号スイート前提で配信されています。<a href="https://securityheaders.com/?q=secutils.vercel.app" target="_blank" rel="noopener noreferrer">securityheaders.com</a> で実際の評価を確認できます。
      </p>
    </ArticleLayout>
  );
}
