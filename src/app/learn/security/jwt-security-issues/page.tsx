import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "jwt-security-issues")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>はじめに：JWT の落とし穴</h2>
      <p>
        JWT（JSON Web Token）は API 認証の事実上の標準として広く使われていますが、<strong>正しく使わないと深刻なセキュリティ問題</strong>に直結します。「ライブラリに任せれば安全」と思いがちですが、JWT に固有の罠は意外と多く、一度実装した認証基盤が侵入経路になる事例は珍しくありません。
      </p>
      <p>
        この記事では、初学者が JWT を扱うときに知っておきたい <strong>5つの典型的な問題</strong> と、その対策をまとめます。
      </p>

      <h2>JWT の構造（おさらい）</h2>
      <p>
        JWT は <code>Header.Payload.Signature</code> の3パート構成で、それぞれが Base64URL でエンコードされています。
      </p>
      <pre><code>{`eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSJ9.SflKxwRJSMeKKF2QT4...
└── Header ──┘└── Payload ──┘└─── Signature ───┘`}</code></pre>
      <p>
        Header と Payload は単なる Base64URL なので<strong>誰でも読めます</strong>（後述）。Signature だけが、発行者の鍵を知っている人にしか作れません。
      </p>

      <h2>問題1: <code>alg=none</code> 攻撃</h2>
      <p>
        JWT の Header には <code>alg</code>（アルゴリズム）クレームがあり、検証側のライブラリはこの値を見てアルゴリズムを切り替えます。ここで <strong>攻撃者が <code>alg</code> を <code>none</code> に書き換える</strong> と、署名なしで通ってしまうライブラリがありました。
      </p>
      <pre><code>{`{"alg":"none","typ":"JWT"}.{"sub":"admin"}.    ← 署名空欄`}</code></pre>
      <p>
        2015年の有名な脆弱性で、当時の多くのライブラリが影響を受けました。<strong>対策</strong> は単純で、検証側で受け入れる <code>alg</code> をハードコードで限定することです。「Header の <code>alg</code> を信頼する」のが間違いの始まりです。
      </p>

      <h2>問題2: アルゴリズム混同（RS256 → HS256）</h2>
      <p>
        RS256（RSA 公開鍵署名）で運用しているサービスを攻撃者が見つけたとき、<code>alg</code> を <code>HS256</code>（HMAC）に書き換えて、<strong>公開鍵をそのまま HMAC の秘密鍵として使う</strong> 攻撃です。
      </p>
      <p>
        多くのライブラリが「RS256 用に渡された公開鍵」を「HS256 の検証鍵」としてそのまま受け入れてしまうのが問題でした。公開鍵は誰でも入手できるので、攻撃者は任意のトークンを生成できてしまいます。
      </p>
      <p>
        <strong>対策</strong>: 検証時に「このトークンは RS256 でなければならない」と明示する。<code>verify(token, key, &#123; algorithms: [&apos;RS256&apos;] &#125;)</code> のように、許可するアルゴリズムを<strong>必ず指定</strong>してください。
      </p>

      <h2>問題3: 弱い HMAC 秘密鍵</h2>
      <p>
        HMAC（HS256/384/512）を使う場合、秘密鍵が<strong>短すぎる・推測しやすい</strong>とブルートフォースで割られます。<code>secret</code> や <code>jwt-key</code> のような語、辞書単語、12文字以下などは数分〜数時間で破られる可能性があります。
      </p>
      <ul>
        <li>
          <strong>長さ</strong>: HS256 なら 32 バイト（256 bit）以上を推奨
        </li>
        <li>
          <strong>由来</strong>: <code>crypto.randomBytes(32)</code> 等の暗号学的乱数で生成し、環境変数や Secret Manager で管理
        </li>
        <li>
          <strong>禁止</strong>: ハードコード、Git にコミット、ドキュメントに掲載
        </li>
      </ul>

      <h2>問題4: Payload は誰でも読める</h2>
      <p>
        Base64URL は<strong>暗号化ではなく単なるエンコーディング</strong>です。JWT を持っている人なら誰でも Payload を復元できます。
      </p>
      <pre><code>{`echo "eyJzdWIiOiJ1c2VyMSIsInJvbGUiOiJhZG1pbiJ9" | base64 -d
{"sub":"user1","role":"admin"}`}</code></pre>
      <p>
        この事実を忘れて<strong>機密情報（クレジットカード番号、パスワード、社内識別子など）を Payload に入れる</strong>と、トークンを取得した第三者にすべて見えてしまいます。Payload に入れていいのは「公開しても問題ない識別子」だけだと考えてください。
      </p>
      <p>
        本当に秘匿が必要なら JWE（JSON Web Encryption）を使うか、そもそもセッション ID を使ってサーバー側にデータを保持する従来型の方が無難です。
      </p>

      <h2>問題5: トークンの取り消しが難しい</h2>
      <p>
        JWT は「有効期限が来るまで有効」が基本設計で、<strong>サーバー側で個別に無効化するのが構造的に苦手</strong>です。ユーザーがログアウトしても、トークン自体は <code>exp</code> まで使い続けられます。漏洩に気づいたときに即座に止めにくいのは大きな弱点です。
      </p>
      <p>対策の方向性：</p>
      <ul>
        <li>
          <strong>有効期限を短く</strong>（数分〜1時間）し、リフレッシュトークンで延長する
        </li>
        <li>
          サーバー側で<strong>取り消しリスト（denylist）</strong>を持って検証時に照合する（JWT らしさは犠牲になるが現実的）
        </li>
        <li>
          重要操作（決済・パスワード変更）の前にだけ<strong>再認証</strong>を要求する
        </li>
      </ul>

      <h2>防御策まとめ</h2>
      <ol>
        <li>
          検証時に許可する <code>alg</code> をハードコードで限定する
        </li>
        <li>
          <code>iss</code>, <code>aud</code>, <code>exp</code>, <code>nbf</code> を<strong>必ず</strong>検証する
        </li>
        <li>
          HMAC の秘密鍵は 32 バイト以上の暗号学的乱数
        </li>
        <li>
          Payload に機密を入れない
        </li>
        <li>
          短い有効期限 + リフレッシュ + 必要に応じて denylist
        </li>
        <li>
          JWT ライブラリは継続的にアップデートする
        </li>
      </ol>

      <h2>おわりに</h2>
      <p>
        JWT そのものは仕様としてよく設計されていますが、<strong>「使う側の油断が事故を生む」</strong>のがほとんどのケースです。実装を書くときは、信頼境界（誰が何を作れるか）を必ず意識してください。
      </p>
      <p>
        本サイトの JWT Decoder は実際に署名検証もできるので、手元のトークンで <code>alg</code> 検証や鍵の強さを確認してみてください。
      </p>
    </ArticleLayout>
  );
}
