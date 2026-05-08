import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "secure-randomness")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>はじめに: 「乱数」は1種類じゃない</h2>
      <p>
        「ランダムな値が欲しい」と思った時、JavaScript なら反射的に <code>Math.random()</code>、Python なら <code>random.randint()</code> と書きがちです。サイコロやおみくじ、ゲームのアイテムドロップ判定なら問題ありません。
      </p>
      <p>
        しかし<strong>パスワード生成、セッショントークン、暗号鍵、UUID</strong> などセキュリティが絡む場面で <code>Math.random()</code> を使うと、<strong>そのアプリは確実にハッキング可能</strong>になります。理由を理解するには、「疑似乱数」と「暗号学的乱数」という2種類の乱数を区別する必要があります。
      </p>

      <h2>疑似乱数（PRNG）と暗号学的乱数（CSPRNG）</h2>
      <p>
        コンピュータは決定論的な機械なので、<strong>本物の乱数を作れません</strong>。代わりに「ランダムに見える数列」を計算で生成しています。これを<strong>疑似乱数（Pseudo-Random Number Generator, PRNG）</strong>と呼びます。
      </p>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>PRNG（普通の乱数）</th>
            <th>CSPRNG（暗号学的乱数）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>速度</td>
            <td>非常に速い</td>
            <td>少し遅い（OS呼び出し含む）</td>
          </tr>
          <tr>
            <td>予測可能性</td>
            <td>過去の出力から次が予測可能</td>
            <td>過去の出力からは予測不可能</td>
          </tr>
          <tr>
            <td>用途</td>
            <td>シミュレーション、ゲーム</td>
            <td>暗号鍵、トークン、パスワード</td>
          </tr>
          <tr>
            <td>JS での代表</td>
            <td><code>Math.random()</code></td>
            <td><code>crypto.getRandomValues()</code></td>
          </tr>
          <tr>
            <td>Python</td>
            <td><code>random</code> モジュール</td>
            <td><code>secrets</code> モジュール</td>
          </tr>
        </tbody>
      </table>
      <p>
        鍵となる違いは<strong>「過去の出力から次の出力を予測できるかどうか」</strong>。PRNG はアルゴリズムと内部状態（シード）が分かれば次が予測できます。CSPRNG はそれが計算的に困難になるよう設計されています。
      </p>

      <h2>Math.random の中身</h2>
      <p>
        現代のブラウザの <code>Math.random</code> は <strong>xorshift128+</strong> や <strong>xoshiro128**</strong> といった高速な PRNG を使っています。シード（初期状態）はブラウザ起動時に決まり、それ以降は計算で次々と数列を生成します。
      </p>
      <p>
        2015 年、研究者によって V8（Chrome）の <code>Math.random</code> 実装が解析され、<strong>「数個の出力を観測すれば内部状態を復元できる」</strong>ことが示されました。これは攻撃者にとって：
      </p>
      <ul>
        <li>3個ほど出力を観測（例: ある画面に表示された連番ID）</li>
        <li>内部状態を復元</li>
        <li>「次の <code>Math.random()</code>」が何になるか<strong>完全に予測</strong>できる</li>
      </ul>
      <p>
        という攻撃を意味します。
      </p>

      <h2>実際に起きた事故</h2>
      <p>
        Math.random / 弱い乱数による事故は枚挙にいとまがありません：
      </p>

      <h3>Hacker News のパスワードリセット脆弱性</h3>
      <p>
        2017 年、ある SaaS で「パスワードリセット用のトークンが <code>Math.random()</code> で生成されていた」ことが発覚し、攻撃者が任意のユーザーのパスワードをリセットできる状態でした。
      </p>

      <h3>暗号資産ウォレットの秘密鍵漏洩</h3>
      <p>
        2013 年、Android の Bitcoin ウォレットで Java の <code>SecureRandom</code> が <strong>同じシードを使ってしまうバグ</strong>があり、複数ユーザーが同じ秘密鍵を持つ事故が起きて数千ドル相当のビットコインが盗まれました。CSPRNG であっても実装ミスで弱くなる例。
      </p>

      <h3>セッション ID の予測</h3>
      <p>
        古い PHP のセッション ID 生成は弱く、複数のセッション ID を観測することで他ユーザーのセッションを予測する攻撃が成立した時代がありました（PHP 7 以降は CSPRNG ベースに改善）。
      </p>

      <h2>JavaScript で正しく書く</h2>

      <h3>ブラウザ・Node.js</h3>
      <pre><code>{`// ❌ 危険
const token = Math.random().toString(36).substring(2)

// ✅ 安全（ブラウザ・Node.js 両対応）
const buf = new Uint8Array(32)
crypto.getRandomValues(buf)
const token = Array.from(buf, b => b.toString(16).padStart(2, "0")).join("")

// ✅ UUID v4 が欲しいだけならこれで十分
const id = crypto.randomUUID()`}</code></pre>
      <p>
        <code>crypto.getRandomValues</code> は OS の CSPRNG（Linux なら <code>/dev/urandom</code>、Windows なら CryptGenRandom 系）を呼び出します。<code>crypto.randomUUID</code> はそれを使って RFC 4122 v4 の UUID を返す便利関数。
      </p>
      <p>
        本サイトの <Link href="/tools/password-generator">Password Generator</Link> も <Link href="/tools/uuid-generator">UUID Generator</Link> も、内部で <code>crypto.getRandomValues</code> / <code>crypto.randomUUID</code> を使っています。<code>Math.random</code> は1箇所も使いません。
      </p>

      <h3>Python</h3>
      <pre><code>{`# ❌ 危険
import random
token = random.randint(100000, 999999)

# ✅ 安全
import secrets
token = secrets.token_urlsafe(32)         # URLセーフな乱数文字列
n = secrets.randbelow(1_000_000)          # 0以上1,000,000未満の整数
choice = secrets.choice(["a", "b", "c"])  # リストから1つ`}</code></pre>
      <p>
        Python は 3.6 で <code>secrets</code> モジュールが追加され、それ以前は <code>os.urandom</code> を直接使っていました。<code>random</code> モジュールは Mersenne Twister という高速な PRNG で、暗号用途には<strong>絶対に</strong>使ってはいけません。
      </p>

      <h3>その他の言語</h3>
      <ul>
        <li><strong>Go</strong>: <code>crypto/rand</code> パッケージ（<code>math/rand</code>ではなく）</li>
        <li><strong>Java</strong>: <code>java.security.SecureRandom</code>（<code>java.util.Random</code>ではなく）</li>
        <li><strong>Ruby</strong>: <code>SecureRandom</code> モジュール（<code>Random</code>ではなく）</li>
        <li><strong>Rust</strong>: <code>rand::rngs::OsRng</code> または <code>getrandom</code> クレート</li>
      </ul>
      <p>
        共通パターンは「<strong>標準の <code>random</code> 系を使わず、<code>secure</code> / <code>crypto</code> / <code>os</code> を冠したモジュールを使う</strong>」。これだけ覚えておけば事故は激減します。
      </p>

      <h2>Modulo Bias - もう一つの罠</h2>
      <p>
        CSPRNG を使えば終わり、ではありません。<strong>「乱数を範囲内に収める方法」</strong>でもバイアスが入ることがあります。
      </p>
      <p>
        例えば「0〜9 のランダム整数が欲しい」時、悪い実装：
      </p>
      <pre><code>{`// ❌ modulo bias あり
const buf = new Uint8Array(1)
crypto.getRandomValues(buf)  // 0〜255 の乱数
const n = buf[0] % 10        // 0〜9 にしたい`}</code></pre>
      <p>
        この方法、見た目は問題ないですが偏りがあります。0〜255 の256個の値を10で割ると：
      </p>
      <ul>
        <li>0, 1, 2, 3, 4, 5 → 26回ずつ出る（256÷10 = 25.6）</li>
        <li>6, 7, 8, 9 → 25回ずつ</li>
      </ul>
      <p>
        小さい値（0〜5）が4%多く出る<strong>偏り</strong>が発生します。10要素なら誤差程度ですが、「62文字（A-Za-z0-9）から1文字選ぶ」場合、256 ÷ 62 = 4.13… で<strong>かなりの偏り</strong>が出ます。これはパスワードのエントロピーを実質的に下げます。
      </p>

      <h3>正しい方法: rejection sampling</h3>
      <pre><code>{`// ✅ 偏りなし（rejection sampling）
function randomInt(max) {
  const buf = new Uint8Array(1)
  let n
  do {
    crypto.getRandomValues(buf)
    n = buf[0]
  } while (n >= 256 - (256 % max))  // 余りが出る範囲を弾く
  return n % max
}`}</code></pre>
      <p>
        余りが出る範囲（256 - 256 % 10 = 250 以上）に当たったら<strong>その乱数を捨てて</strong>もう一度引く。これで完全に均等な分布になります。本サイトの Password Generator も rejection sampling を使っています。
      </p>
      <p>
        <code>crypto.getRandomValues</code> + <code>%</code> で済ませてしまう実装は世の中に多いですが、<strong>セキュリティ用途では bias が長期的に攻撃可能性を高める</strong>ので、ライブラリ（<code>secrets.randbelow</code>, <code>SecureRandom.uniform</code> 等）を使うか、自前で書くなら rejection sampling を理解した上で書きましょう。
      </p>

      <h2>シードの問題: そもそもエントロピーがない時</h2>
      <p>
        CSPRNG も<strong>シード（初期エントロピー）がなければ無力</strong>です。組み込み機器、起動直後の VM、コンテナの大量複製などで「OS のエントロピープールが空」になり、CSPRNG が予測可能な状態に陥ることがあります。
      </p>
      <p>
        対策：
      </p>
      <ul>
        <li>Linux では <code>getrandom(2)</code> を使う（<code>/dev/urandom</code>を直接読まない、ブロッキング含めて適切に処理）</li>
        <li>VM/コンテナでは Hardware RNG（<code>RDSEED</code>等）または <code>virtio-rng</code> を有効化</li>
        <li>起動直後にエントロピーが必要な処理は遅延実行</li>
      </ul>
      <p>
        Web アプリの開発で意識する場面は少ないですが、IoT / 組み込み / クラウドネイティブな環境では実際に問題になる箇所です。
      </p>

      <h2>実用チェックリスト</h2>
      <p>
        コードレビューで「この乱数は危ないかも」と判断する時の早見表：
      </p>
      <table>
        <thead>
          <tr>
            <th>用途</th>
            <th>CSPRNG必須？</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>パスワード生成</td>
            <td>必須 ✅</td>
            <td>+ rejection sampling</td>
          </tr>
          <tr>
            <td>セッションID</td>
            <td>必須 ✅</td>
            <td>16バイト以上</td>
          </tr>
          <tr>
            <td>CSRFトークン</td>
            <td>必須 ✅</td>
            <td>32バイト推奨</td>
          </tr>
          <tr>
            <td>パスワードリセットトークン</td>
            <td>必須 ✅</td>
            <td>有効期限を短く</td>
          </tr>
          <tr>
            <td>API キー</td>
            <td>必須 ✅</td>
            <td>長い文字列</td>
          </tr>
          <tr>
            <td>UUID v4 / v7</td>
            <td>必須 ✅</td>
            <td><code>crypto.randomUUID</code> で OK</td>
          </tr>
          <tr>
            <td>暗号鍵 / IV / nonce</td>
            <td>必須 ✅</td>
            <td>絶対に再利用しない</td>
          </tr>
          <tr>
            <td>シャッフル（音楽アプリ等）</td>
            <td>不要</td>
            <td>Math.randomで十分</td>
          </tr>
          <tr>
            <td>ゲームのダメージ判定</td>
            <td>不要</td>
            <td>速度優先</td>
          </tr>
          <tr>
            <td>シミュレーション</td>
            <td>不要</td>
            <td>再現性を取りたい時はシード固定</td>
          </tr>
        </tbody>
      </table>

      <h2>おわりに</h2>
      <p>
        「乱数」と一括りにせず、<strong>「予測可能でいい乱数」と「予測不可能でないと困る乱数」を区別する</strong>のがセキュリティの第一歩です。<code>Math.random</code> / <code>random.randint</code> はゲームやシミュレーション用、<code>crypto.getRandomValues</code> / <code>secrets</code> はセキュリティ用、と<strong>使い分けの習慣</strong>を最初に身につけてしまえば事故は防げます。
      </p>
      <p>
        本サイトの <Link href="/tools/password-generator">Password Generator</Link> は <code>crypto.getRandomValues</code> + rejection sampling で実装していて、<Link href="/tools/uuid-generator">UUID Generator</Link> は <code>crypto.randomUUID</code> ベース。両方とも「サーバに送らずブラウザ完結」で、生成された値はあなただけのもの。実際に触って、暗号学的乱数の感触を試してみてください。
      </p>
      <p>
        関連: <Link href="/learn/security/password-strength">パスワード強度はどう決まるか</Link> / <Link href="/learn/security/password-hashing">パスワードハッシュの選び方</Link> / <Link href="/learn/security/public-key-crypto">公開鍵暗号の基本</Link>
      </p>
    </ArticleLayout>
  );
}
