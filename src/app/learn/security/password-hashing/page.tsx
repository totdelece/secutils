import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "password-hashing")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「パスワードを保存する」とはどういうことか</h2>
      <p>
        サービスに新規登録する時、ユーザーが入力したパスワードはサーバーに送られます。サーバ側で<strong>そのまま DB に保存してはダメ</strong>、というのは現代では常識ですが、なぜダメなのか、ではどうすればいいのか、を順を追って整理します。
      </p>
      <p>
        平文保存の問題はシンプルで、<strong>DB が漏洩した瞬間に全ユーザーのパスワードが攻撃者の手に渡る</strong>から。Yahoo!（30億件）、LinkedIn（1.6億件）、Adobe（1.5億件）など、過去にも DB 漏洩事件は枚挙にいとまがなく、<strong>「漏洩する前提で設計する」</strong>のが現代のスタンスです。
      </p>

      <h2>第1段階: ハッシュ関数で保存</h2>
      <p>
        パスワードを<strong>一方向ハッシュ関数</strong>（MD5 / SHA-1 / SHA-256 等）に通して、結果を保存する方式。
      </p>
      <pre><code>{`保存:    hash = SHA256(password)
検証:    SHA256(input) === stored_hash ?`}</code></pre>
      <p>
        ハッシュ関数は<strong>一方向</strong>（出力から入力を逆算するのが計算的に困難）なので、DB が漏れても元のパスワードは分からない…<strong>はず</strong>でした。
      </p>

      <h2>レインボーテーブル攻撃</h2>
      <p>
        単純なハッシュ保存には致命的な弱点があります。<strong>同じパスワードからは同じハッシュが生まれる</strong>ため、攻撃者は事前に「よく使われるパスワード→ハッシュ」の対応表を作っておけば、漏洩 DB のハッシュを表で引くだけで一致が見つかります。
      </p>
      <p>
        この対応表が <strong>レインボーテーブル</strong>。`password123` のハッシュは何回計算しても同じ値なので、世界中のサーバで同じハッシュ値が登録されています：
      </p>
      <pre><code>{`MD5("password123")    = 482c811da5d5b4bc6d497ffa98491e38
SHA-1("password123")  = cbfdac6008f9cab4083784cbd1874f76618d2a97
SHA-256("password123") = ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`}</code></pre>
      <p>
        Google で<code>ef92b778bafe...</code>を検索しても元のパスワードが分かるレベル。実際、<a href="https://crackstation.net/" target="_blank" rel="noopener noreferrer">crackstation.net</a> のような無料サイトに 150 億件のレインボーテーブルが置かれています。
      </p>

      <h2>第2段階: ソルト（Salt）の追加</h2>
      <p>
        レインボーテーブル対策の基本が<strong>ソルト</strong>。ユーザーごとにランダムな文字列を生成し、パスワードと連結してからハッシュします：
      </p>
      <pre><code>{`保存:
  salt = randomBytes(16)
  hash = SHA256(salt + password)
  DB に (salt, hash) を保存

検証:
  SHA256(stored_salt + input) === stored_hash ?`}</code></pre>
      <p>
        ソルトの効果：
      </p>
      <ul>
        <li>
          <strong>同じパスワードでも違うハッシュ</strong>: ユーザーAとBが同じ`password123`を使っていても、ソルトが違うので DB 上のハッシュは別の値
        </li>
        <li>
          <strong>レインボーテーブルが無効化</strong>: 16バイトソルトの組み合わせ数（2^128）ぶんのテーブルが必要になり、事実上不可能
        </li>
      </ul>
      <p>
        ソルトは<strong>秘密にする必要はない</strong>（DBに平文で並べてOK）。攻撃者はソルトを知ってもユーザーごとに個別に総当たりしないといけないので、レインボーテーブル方式が崩れます。
      </p>

      <h2>第3段階: それでも GPU で総当たりされる問題</h2>
      <p>
        ソルトを付けてもまだ問題があります。<strong>SHA-256 は速すぎる</strong>のです。
      </p>
      <p>
        現代の GPU（NVIDIA RTX 4090）の SHA-256 計算速度はおよそ <strong>20 GH/s（200億回/秒）</strong>。8文字英数字パスワード（62^8 ≈ 218兆通り）でも、ソルト込みで <strong>3時間</strong>で全パターンを試せてしまいます。
      </p>
      <pre><code>{`62^8 通り / 20,000,000,000 通り/秒
≈ 218,000,000,000,000 / 20,000,000,000
≈ 10,900 秒
≈ 3 時間`}</code></pre>
      <p>
        ソルトはレインボーテーブル攻撃を防いだだけで、<strong>個別の総当たり攻撃には無力</strong>でした。これを防ぐには「ハッシュ計算自体を遅くする」必要があります。
      </p>

      <h2>第4段階: 「遅いハッシュ関数」 = bcrypt / scrypt / Argon2</h2>
      <p>
        正規ユーザーのログイン時間（数百ミリ秒なら気にならない）と、攻撃者の総当たり時間（1秒に何回試せるか）は、同じ計算量に対して大きな差を意図的に作れます。これが<strong>パスワードハッシュ専用関数</strong>の発想です。
      </p>
      <p>
        計算を内部で何千〜何万回繰り返し、1ハッシュに 0.1 秒程度かけることで：
      </p>
      <ul>
        <li>正規ログイン: 0.1秒（人は気にならない）</li>
        <li>攻撃者の総当たり: 0.1秒/試行 → 10回/秒 → 元のSHA-256比で<strong>10億倍遅くなる</strong></li>
      </ul>

      <h3>bcrypt（1999年〜）</h3>
      <p>
        Blowfish 暗号を改造したハッシュ関数。<strong>コストファクター</strong>（4〜31）でループ回数を <code>2^cost</code> 倍します。
      </p>
      <pre><code>{`$2b$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
↑     ↑   ↑                       ↑
方式  cost ソルト(22文字)         ハッシュ(31文字)`}</code></pre>
      <p>
        cost=12 が現代の推奨値（2024年時点、約 0.3 秒）。マシンが速くなったら cost を上げて再ハッシュすることで、長期運用にも耐えます。
      </p>
      <p>
        弱点：
      </p>
      <ul>
        <li>
          <strong>72バイト制限</strong>: 入力パスワードを 72 バイトで切り捨てる仕様。長いパスフレーズで「73バイト目以降が無視される」事故が起きうる
        </li>
        <li>
          <strong>メモリ使用量が小さい</strong>: GPU/ASIC で並列化しやすく、超大規模攻撃には弱い
        </li>
      </ul>
      <p>
        とはいえ枯れていて実装が安定しており、「現代でも合格点」の選択肢。本サイトの <Link href="/tools/bcrypt">Bcrypt Hasher</Link> で実際に生成・検証できます。
      </p>

      <h3>scrypt（2009年〜）</h3>
      <p>
        Litecoin の PoW 関数として有名。bcrypt の「並列化耐性が弱い」問題に対応するため、<strong>大量のメモリを使わせる</strong>設計（メモリハード関数）。
      </p>
      <p>
        パラメータ：
      </p>
      <ul>
        <li><strong>N</strong>: CPU/メモリコスト（典型 16384〜1048576）</li>
        <li><strong>r</strong>: ブロックサイズ（典型 8）</li>
        <li><strong>p</strong>: 並列度（典型 1）</li>
      </ul>
      <p>
        ASIC を作ろうとしても大容量 RAM が必要になり、コスト効率が悪化する。GPU でも VRAM 帯域がボトルネック化します。
      </p>

      <h3>Argon2（2015年〜、現代の推奨）</h3>
      <p>
        2013年からの <strong>Password Hashing Competition</strong> の優勝アルゴリズム。bcrypt / scrypt の弱点を一通り解消した「現時点のベストプラクティス」。
      </p>
      <p>
        3つのバリアント：
      </p>
      <table>
        <thead>
          <tr>
            <th>種類</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Argon2d</td>
            <td>GPU 攻撃耐性最大、サイドチャネル攻撃には注意</td>
          </tr>
          <tr>
            <td>Argon2i</td>
            <td>サイドチャネル耐性、GPU 攻撃にやや弱い</td>
          </tr>
          <tr>
            <td><strong>Argon2id</strong></td>
            <td>両者のハイブリッド（<strong>OWASP 推奨</strong>、現代の標準）</td>
          </tr>
        </tbody>
      </table>
      <p>
        OWASP 2024 推奨パラメータ：
      </p>
      <pre><code>{`Argon2id:
  memory cost (m) = 19 MiB 以上
  time cost (t)   = 2 以上
  parallelism (p) = 1`}</code></pre>
      <p>
        なお、Argon2 は標準ライブラリでサポートされる言語が増えてきており、Python（<code>argon2-cffi</code>）、Node（<code>argon2</code>）、Go（<code>golang.org/x/crypto/argon2</code>）等で利用可能です。
      </p>

      <h2>結局どれを使えばいい？</h2>
      <p>
        2024〜2026年の OWASP 推奨：
      </p>
      <ol>
        <li>
          <strong>Argon2id</strong>（一番おすすめ） - 新規プロジェクトはこれ
        </li>
        <li>
          <strong>scrypt</strong> - Argon2 が使えない時の次善
        </li>
        <li>
          <strong>bcrypt（cost=12以上）</strong> - レガシー互換が必要な時
        </li>
      </ol>
      <p>
        <strong>絶対に避ける</strong>：
      </p>
      <ul>
        <li>
          <strong>素のMD5 / SHA-1 / SHA-256 / SHA-512</strong>（速すぎる、レインボーテーブル攻撃に弱い）
        </li>
        <li>
          <strong>ソルトなしハッシュ</strong>
        </li>
        <li>
          <strong>独自ハッシュアルゴリズム</strong>（ほぼ確実に弱い）
        </li>
        <li>
          <strong>双方向暗号化（AES等）でパスワード保存</strong>（鍵が漏れたら全部復号される）
        </li>
      </ul>

      <h2>おまけ: ペッパー（Pepper）</h2>
      <p>
        さらに防御を厚くするなら<strong>ペッパー</strong>を追加する手があります。ソルトと違って<strong>サーバー側に固定の秘密値（環境変数等）として持つ</strong>追加要素：
      </p>
      <pre><code>{`hash = Argon2id(salt + password + pepper)`}</code></pre>
      <p>
        DB が漏洩しても、ペッパー（コード/環境変数側）が漏れていなければ攻撃者は総当たりすらできない。<strong>ソルト = ユーザーごと・公開、ペッパー = アプリ全体・秘匿</strong>の使い分け。
      </p>
      <p>
        運用面では「ペッパーをローテーションする時に全パスワードを再ハッシュできない」問題があるため、必須ではなく「上級向けオプション」位置付けです。
      </p>

      <h2>HMAC との関係</h2>
      <p>
        ペッパーは「ハッシュに秘密鍵を混ぜる」設計なので、本質的には HMAC と同じ発想です。実装上、<code>HMAC-SHA256(pepper, password)</code> を Argon2 に通す、というパターンも取られます。HMAC については別記事 <Link href="/learn/network/https-tls">HTTPS と TLS の仕組み</Link> でも触れています。
      </p>

      <h2>正規ユーザーへの影響: コストの調整</h2>
      <p>
        遅いハッシュは攻撃者を遅くしますが、<strong>正規ユーザーのログインも遅くなります</strong>。実用的な目安：
      </p>
      <table>
        <thead>
          <tr>
            <th>用途</th>
            <th>1回あたりのコスト</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>通常Webサービス</td>
            <td>0.2〜0.5 秒</td>
          </tr>
          <tr>
            <td>低レイテンシ要求（ゲーム等）</td>
            <td>0.1 秒以下</td>
          </tr>
          <tr>
            <td>銀行/医療システム</td>
            <td>1 秒以上でもOK</td>
          </tr>
        </tbody>
      </table>
      <p>
        サーバ CPU 負荷との兼ね合いで、ログインが集中する瞬間の同時接続数も計算に入れる必要があります。<strong>「高負荷時にログインができなくなる」サービス停止リスクのほうが、ハッシュ強度を1段階下げる害より大きい</strong>こともあるので、本番投入前に必ず負荷試験を。
      </p>

      <h2>おわりに</h2>
      <p>
        パスワード保存は技術的には「Argon2id でハッシュ化」と一行で書けるほどシンプルですが、その一行に至るまでには「平文 → ハッシュ → ソルト付きハッシュ → 遅いハッシュ」と何度も失敗してきた歴史があります。
      </p>
      <p>
        新規プロジェクトでは <strong>Argon2id</strong>（or 言語ライブラリの最新推奨）一択でOK。本サイトの <Link href="/tools/bcrypt">Bcrypt Hasher</Link> でコストファクターを変えながら計算時間を体感したり、<Link href="/tools/hash-generator">Hash Generator</Link> で SHA-256 と比較して「速さの違い」を実機で確認すると、なぜパスワード専用ハッシュが必要なのか直感的に掴めます。
      </p>
      <p>
        パスワード保存は <Link href="/learn/security/owasp-top-10">OWASP Top 10 の A02（Cryptographic Failures）</Link> に分類される重要分野。ユーザー側の対策としての「強いパスワード作成」は <Link href="/learn/security/password-strength">パスワード強度はどう決まるか</Link> で、認証強化の観点では <Link href="/learn/security/mfa-totp-fido2">多要素認証</Link> も合わせて読んでみてください。
      </p>
    </ArticleLayout>
  );
}
