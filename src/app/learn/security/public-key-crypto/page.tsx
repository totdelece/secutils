import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "public-key-crypto")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「公開鍵」と「秘密鍵」、結局なに？</h2>
      <p>
        SSH のセットアップで「公開鍵を貼り付けてください」と言われ、JWT の検証で「公開鍵」「秘密鍵」が出てきて、HTTPS の証明書も「公開鍵」「秘密鍵」で語られる──現代の認証/暗号の至るところに登場するこの2つを、初学者向けに整理します。
      </p>
      <p>
        要点は<strong>「2つで1セットの鍵ペアで、片方で施錠したものはもう片方でしか開けられない」</strong>という非対称な関係。これが <strong>公開鍵暗号（Public-Key Cryptography）</strong>の核心です。
      </p>

      <h2>共通鍵暗号との違い</h2>
      <p>
        まず比較対象として<strong>共通鍵暗号（対称鍵暗号）</strong>を理解しましょう。これは「同じ鍵で施錠も開錠もする」普通の鍵のイメージ。
      </p>
      <pre><code>{`# 共通鍵暗号（AES など）
encrypted = AES_encrypt("hello", key)
decrypted = AES_decrypt(encrypted, key)  // 同じ key を使う`}</code></pre>
      <p>
        共通鍵暗号の問題は1つ：<strong>「鍵をどうやって安全に相手に渡すか」</strong>。鍵を平文の通信路で送ったら盗聴されて終わりです。これが「鍵配送問題」と呼ばれる古典的な難問でした。
      </p>
      <p>
        この難問を1976年に Diffie と Hellman が解決したのが<strong>公開鍵暗号</strong>。鍵を2つに分け、片方を公開しても安全な仕組みです：
      </p>
      <pre><code>{`# 公開鍵暗号（RSA など）
encrypted = RSA_encrypt("hello", public_key)   // 公開されている鍵で施錠
decrypted = RSA_decrypt(encrypted, private_key) // 秘密鍵を持つ人だけ開錠可能`}</code></pre>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>共通鍵暗号</th>
            <th>公開鍵暗号</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>鍵の数</td>
            <td>1個（同一）</td>
            <td>2個（公開/秘密のペア）</td>
          </tr>
          <tr>
            <td>速度</td>
            <td>速い（1秒で GB 単位）</td>
            <td>遅い（1秒で KB 単位）</td>
          </tr>
          <tr>
            <td>鍵配送</td>
            <td>難しい</td>
            <td>公開鍵は配ってOK</td>
          </tr>
          <tr>
            <td>用途</td>
            <td>大量データの暗号化</td>
            <td>鍵交換、署名、認証</td>
          </tr>
          <tr>
            <td>代表例</td>
            <td>AES, ChaCha20</td>
            <td>RSA, ECDSA, Ed25519</td>
          </tr>
        </tbody>
      </table>
      <p>
        公開鍵暗号は<strong>圧倒的に遅い</strong>ので、大量データの暗号化には向きません。実際の HTTPS では「公開鍵暗号で共通鍵を交換 → 以降の通信は共通鍵で高速暗号化」のハイブリッド構成を取ります（後述）。
      </p>

      <h2>2つの使い方: 暗号化と署名</h2>
      <p>
        鍵ペアの「片方で施錠 → もう片方で開錠」という性質は、<strong>暗号化</strong>と<strong>デジタル署名</strong>の2つの目的に使えます。
      </p>

      <h3>使い方1: 暗号化（Encryption）</h3>
      <p>
        受信者の<strong>公開鍵で暗号化</strong>すると、対応する<strong>秘密鍵を持つ受信者だけが復号</strong>できる。「秘密のメッセージを送る」用途。
      </p>
      <pre><code>{`Alice → Bob にメッセージを送る:
  Alice: ciphertext = encrypt("hi", Bob_public_key)  // Bob の公開鍵で施錠
  Alice: ciphertext を送信
  Bob:   plaintext  = decrypt(ciphertext, Bob_private_key) // Bob だけが復号可能`}</code></pre>
      <p>
        Alice は Bob の公開鍵さえ知っていれば暗号文を作れます。盗聴されても Bob の秘密鍵がないと復号できないので安全。
      </p>

      <h3>使い方2: デジタル署名（Signature）</h3>
      <p>
        逆向きに使うのが署名。送信者の<strong>秘密鍵で署名</strong>すると、対応する<strong>公開鍵を持つ誰でも検証</strong>できる。「このメッセージは確かにこの人が送った」用途。
      </p>
      <pre><code>{`Alice が「私が送りました」を証明:
  Alice: signature = sign("hi", Alice_private_key)  // Alice の秘密鍵で署名
  Alice: ("hi", signature) を送信
  受信者: verify("hi", signature, Alice_public_key) → True/False`}</code></pre>
      <p>
        署名できるのは秘密鍵を持つ Alice だけ。検証は公開鍵を知っている誰でも可能。これにより<strong>「本人性の証明」「改ざん検知」</strong>が同時に達成できます。JWT の署名や HTTPS の証明書、ソフトウェアの署名はすべてこの仕組み。
      </p>
      <blockquote>
        <p>
          重要: 「署名は逆向きの暗号化」と説明されることが多いですが、現代の暗号アルゴリズム（特に楕円曲線系）では署名と暗号化は別の数学操作です。「鍵ペアの非対称性を使う」という抽象は同じでも、実装は異なります。
        </p>
      </blockquote>

      <h2>主要アルゴリズムの紹介</h2>

      <h3>RSA（1977年〜）</h3>
      <p>
        最も歴史のある公開鍵暗号。<strong>大きな素数の積を素因数分解するのが計算的に困難</strong>という性質を利用しています。
      </p>
      <ul>
        <li>暗号化と署名の両方に使える</li>
        <li>2048 bit が現代の最低ライン、3072 bit 以上が推奨</li>
        <li>遅い（鍵長が大きい）、署名サイズが大きい</li>
        <li>SSL/TLS の旧来構成、JWT の RS256、SSH の RSA 鍵で使われる</li>
      </ul>
      <pre><code>{`# RSA 鍵生成
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem`}</code></pre>

      <h3>ECDSA（楕円曲線署名、2000年代〜）</h3>
      <p>
        <strong>楕円曲線上の離散対数問題</strong>の困難さを利用。RSA と同等のセキュリティを<strong>はるかに短い鍵長</strong>で実現できます。
      </p>
      <ul>
        <li>署名専用（暗号化はECCの別アルゴリズム ECIES）</li>
        <li>256 bit 鍵で RSA 3072 bit 相当のセキュリティ</li>
        <li>RSA より速い</li>
        <li>JWT の ES256, Bitcoin の署名, TLS の現代構成で使われる</li>
      </ul>
      <p>
        曲線の選択肢で代表的なのは <code>secp256r1</code>（NIST P-256）と <code>secp256k1</code>（Bitcoin）。どちらも 256 bit ですが用途が分かれています。
      </p>

      <h3>Ed25519（2011年〜、現代の推奨）</h3>
      <p>
        ECDSA の問題点（実装の落とし穴、サイドチャネル攻撃）を改善した楕円曲線署名。<strong>SSH の現代的な推奨方式</strong>。
      </p>
      <ul>
        <li>署名専用</li>
        <li>256 bit 固定</li>
        <li>非常に速い、決定的署名（同じメッセージなら同じ署名）</li>
        <li>NIST 規格ではないがオープンスタンダード（RFC 8032）</li>
        <li>SSH-Ed25519, JWT の EdDSA, Signal プロトコル等で使われる</li>
      </ul>
      <pre><code>{`# Ed25519 SSH 鍵生成（現代の推奨）
ssh-keygen -t ed25519 -C "your_email@example.com"`}</code></pre>
      <p>
        SSH 鍵を作る時は <code>-t ed25519</code> を指定するのが現代の標準。古い RSA 鍵を使い続けている場合は乗り換えを検討。
      </p>

      <h2>鍵交換（Key Exchange）: HTTPS の核心</h2>
      <p>
        公開鍵暗号は遅いので、HTTPS では「公開鍵暗号で<strong>共通鍵を作って</strong>、以降は共通鍵で高速通信」というハイブリッド構成を取ります。この「共通鍵を作る」プロセスが<strong>鍵交換</strong>。
      </p>

      <h3>古い方式: RSA 鍵交換</h3>
      <p>
        2010年頃まで主流だった素朴な方式：
      </p>
      <ol>
        <li>クライアントがランダムな共通鍵を生成</li>
        <li>サーバの公開鍵で暗号化して送信</li>
        <li>サーバが秘密鍵で復号して共通鍵を取得</li>
        <li>以降は共通鍵で通信</li>
      </ol>
      <p>
        弱点：<strong>サーバの秘密鍵が後日漏洩したら、過去の通信ログが全部復号される</strong>（前方秘匿性なし）。Snowden 事件以降、これは致命的とみなされて TLS 1.3 では廃止されました。
      </p>

      <h3>現代の方式: Diffie-Hellman 鍵交換（DH/ECDH）</h3>
      <p>
        1976年の Diffie-Hellman アルゴリズムは「鍵を交換せずに、両者が同じ秘密値に独立に到達する」魔法のような仕組み。<strong>絵で説明すると</strong>：
      </p>
      <pre><code>{`公開: 黄色い絵の具（誰でも知っている）
Alice: 黄色 + 自分の秘密の色 → 緑色（公開）
Bob:   黄色 + 自分の秘密の色 → 紫色（公開）

Alice: 紫色 + 自分の秘密の色 → 茶色
Bob:   緑色 + 自分の秘密の色 → 茶色

二人とも同じ茶色に到達！しかも傍受者は緑/紫から茶色を逆算できない`}</code></pre>
      <p>
        実際の数学では「絵の具の混合」を「離散対数の指数演算」で行います。<strong>毎回新しい一時鍵を使う</strong>（Ephemeral）ことで、サーバの長期秘密鍵が漏れても過去の通信は守られる<strong>前方秘匿性（Forward Secrecy）</strong>を実現。
      </p>
      <p>
        現代の TLS 1.3 では <strong>ECDHE</strong>（楕円曲線版のephemeral DH）が標準。<Link href="/learn/network/https-tls">HTTPS と TLS</Link> の中身もこれです。
      </p>

      <h2>公開鍵基盤（PKI）: 公開鍵を信頼するには</h2>
      <p>
        公開鍵暗号には1つ大問題があります。<strong>「この公開鍵は本当に Alice のもの？」</strong>を、どう保証するか。攻撃者が偽の公開鍵を Alice の名前で配ったら、Alice 宛のはずの暗号文が攻撃者に読まれてしまいます。
      </p>
      <p>
        この問題を解決するのが <strong>PKI（Public Key Infrastructure）</strong>。「信頼できる第三者」が「この公開鍵は確かに Alice のもの」と署名した<strong>証明書（Certificate）</strong>で配布する仕組みです。
      </p>
      <p>
        HTTPS の場合：
      </p>
      <ol>
        <li>サイト運営者が認証局（CA）に「うちの公開鍵に署名してください」と申請</li>
        <li>CA がドメイン所有確認を行い、サイトの公開鍵に CA の秘密鍵で署名 → 証明書発行</li>
        <li>ブラウザは「信頼するCA一覧」を内蔵していて、CAの署名が確認できれば証明書を信頼</li>
      </ol>
      <p>
        Let's Encrypt が無料で証明書を発行するようになって、HTTPS 化のハードルが大幅に下がりました。詳しくは <Link href="/learn/network/https-tls">HTTPS と TLS の仕組み</Link> 参照。
      </p>

      <h2>HMAC と公開鍵署名の違い</h2>
      <p>
        「メッセージの正当性を検証する」という意味では <Link href="/tools/hmac">HMAC</Link> も似ていますが、根本的に違います：
      </p>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>HMAC</th>
            <th>公開鍵署名</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>使う鍵</td>
            <td>共通鍵（双方が同じ秘密鍵を持つ）</td>
            <td>鍵ペア（送信者の秘密鍵、受信者は公開鍵）</td>
          </tr>
          <tr>
            <td>誰が検証できる？</td>
            <td>秘密鍵を共有している人のみ</td>
            <td>公開鍵を知っている全員</td>
          </tr>
          <tr>
            <td>第三者への証明</td>
            <td>不可（双方が偽造可能）</td>
            <td>可能（Non-repudiation）</td>
          </tr>
          <tr>
            <td>速度</td>
            <td>非常に速い</td>
            <td>遅い</td>
          </tr>
          <tr>
            <td>用途</td>
            <td>API認証、Webhook検証</td>
            <td>HTTPS証明書、JWT(RS/ES)、ソフト署名</td>
          </tr>
        </tbody>
      </table>
      <p>
        JWT の HS256（HMAC）と RS256（RSA）の違いも本質はここ。<strong>「双方が同じ秘密鍵で OK か」「第三者が検証する必要があるか」</strong>で選びます。
      </p>

      <h2>量子コンピュータと耐量子暗号</h2>
      <p>
        2026年現在、暗号界の話題は<strong>「量子コンピュータが実用化されたら現代の公開鍵暗号は破られる」</strong>というシナリオです。
      </p>
      <p>
        Shor のアルゴリズム（1994）により、十分大きな量子コンピュータがあれば<strong>素因数分解と離散対数問題は多項式時間で解ける</strong>ことが証明されています。これは RSA / ECDSA / DH のすべてが破れることを意味します。
      </p>
      <p>
        対策として NIST が標準化した<strong>耐量子暗号（Post-Quantum Cryptography, PQC）</strong>：
      </p>
      <ul>
        <li>
          <strong>ML-KEM</strong>（旧 Kyber）: 鍵交換用、2024年標準化
        </li>
        <li>
          <strong>ML-DSA</strong>（旧 Dilithium）: 署名用、2024年標準化
        </li>
        <li>
          <strong>SLH-DSA</strong>（旧 SPHINCS+）: ハッシュベース署名
        </li>
      </ul>
      <p>
        Google Chrome / Cloudflare はすでに <strong>X25519 + ML-KEM のハイブリッド鍵交換</strong>を実運用に投入しています。「今盗まれた暗号文を量子計算機ができた未来で復号する（Harvest Now, Decrypt Later）」攻撃への対策として、機密性が長期に求められる通信から優先的に切り替えが進んでいます。
      </p>

      <h2>実用上の注意点</h2>
      <ul>
        <li>
          <strong>鍵の保管</strong>: 秘密鍵が漏れたら全てが終わり。<code>~/.ssh/id_ed25519</code> はパーミッション 600 必須、生成時にパスフレーズを設定するのが推奨
        </li>
        <li>
          <strong>古い鍵の更新</strong>: RSA-1024 や DSA は破られている。SSH/PGP/SSL の古い鍵は Ed25519 / RSA-3072+ に作り直す
        </li>
        <li>
          <strong>独自実装は避ける</strong>: 公開鍵暗号の実装は数学的にも実装的にも非常に難しい。<code>libsodium</code> / <code>OpenSSL</code> / 言語標準ライブラリを使う
        </li>
        <li>
          <strong>サイドチャネル攻撃に注意</strong>: 計算時間や電力消費から秘密鍵が漏れることがある。サーバ側では定数時間実装のライブラリを使う
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        公開鍵暗号は現代インターネットの「信頼の根」を支える仕組みです。HTTPS、SSH、JWT、Bitcoin、Signal──すべてが鍵ペアの非対称性に依存しています。
      </p>
      <p>
        本サイトの <Link href="/tools/jwt-decoder">JWT Decoder</Link> は HS256（HMAC = 共通鍵）と RS256/ES256（公開鍵署名）の両方の検証に対応しています。実際にトークンを貼り付けて、共通鍵と公開鍵で検証フローがどう違うか体感できます。<Link href="/tools/hmac">HMAC Generator</Link> と並べて触ると、対称鍵 vs 非対称鍵のメンタルモデルが定着します。
      </p>
      <p>
        この基礎知識は <Link href="/learn/network/https-tls">HTTPS と TLS</Link>、<Link href="/learn/security/jwt-security-issues">JWT のセキュリティ問題</Link>、<Link href="/learn/security/password-hashing">パスワードハッシュ</Link> など多くの記事の前提となっています。詰まったら戻って読み直す、リファレンスとして活用してください。
      </p>
    </ArticleLayout>
  );
}
