import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "password-strength")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「強いパスワード」って何が強いのか</h2>
      <p>
        「8文字以上にしてください」「記号を入れてください」など、サービスごとに違うパスワードのルール。なぜそんなことを言われるのか、どこまでやれば本当に安全なのか、初学者にはイメージしづらい部分です。
      </p>
      <p>
        この記事では、パスワード強度を支える <strong>「エントロピー」という考え方</strong> を中心に、なぜ「16文字以上」が目安として挙がるのか、どうやって計算するのかを解説します。
      </p>

      <h2>エントロピーとは「攻撃者が試す回数」のこと</h2>
      <p>
        パスワードの世界での<strong>エントロピー（bit）</strong>は、ざっくり言うと「攻撃者があなたのパスワードを総当たりで当てるまでに、最悪何通り試す必要があるか」を 2 を底とする対数で表したものです。
      </p>
      <p>
        式は単純で、<strong>使える文字種の数 N</strong> と <strong>パスワードの長さ L</strong> から：
      </p>
      <pre><code>{`エントロピー (bit) = L × log2(N)`}</code></pre>
      <p>
        例えば「英小文字のみ（N=26）8文字」なら：
      </p>
      <pre><code>{`8 × log2(26) ≈ 8 × 4.7 ≈ 37.6 bit
試行回数 ≈ 2^37.6 ≈ 2,000億通り`}</code></pre>
      <p>
        2,000 億と聞くと多そうですが、現代の GPU を使えばオフラインで<strong>数分以内に総当たりできる</strong>レベルです。
      </p>

      <h2>文字種類を増やすとどう変わるか</h2>
      <p>
        同じ 8 文字でも、文字種類を増やすとエントロピーが増えます：
      </p>
      <table>
        <thead>
          <tr>
            <th>文字構成</th>
            <th>N</th>
            <th>8文字のbit</th>
            <th>16文字のbit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>英小文字のみ</td>
            <td>26</td>
            <td>~38</td>
            <td>~75</td>
          </tr>
          <tr>
            <td>英大小文字</td>
            <td>52</td>
            <td>~46</td>
            <td>~91</td>
          </tr>
          <tr>
            <td>英数字</td>
            <td>62</td>
            <td>~48</td>
            <td>~95</td>
          </tr>
          <tr>
            <td>英数字 + 記号</td>
            <td>~94</td>
            <td>~52</td>
            <td>~105</td>
          </tr>
        </tbody>
      </table>
      <p>
        ただし<strong>「文字種類の追加 vs 文字数の追加」を比べると、文字数を伸ばす方が効率的</strong>です。
      </p>
      <ul>
        <li>記号を追加（94→52bit）→ 約4bitしか増えない</li>
        <li>1文字追加（94を9文字）→ 約6.5bit増える</li>
      </ul>
      <p>
        これがパスワードのベストプラクティスとして「短く複雑」より<strong>「長く覚えやすい」</strong>が推奨される理由です。
      </p>

      <h2>総当たり攻撃の実時間</h2>
      <p>
        現代の GPU を使ったオフライン攻撃の目安：
      </p>
      <table>
        <thead>
          <tr>
            <th>エントロピー</th>
            <th>所要時間（GPU 1台想定）</th>
            <th>評価</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>~40 bit</td>
            <td>数分〜数時間</td>
            <td>弱い</td>
          </tr>
          <tr>
            <td>~60 bit</td>
            <td>数日〜数ヶ月</td>
            <td>普通</td>
          </tr>
          <tr>
            <td>~80 bit</td>
            <td>数十年</td>
            <td>強い</td>
          </tr>
          <tr>
            <td>100+ bit</td>
            <td>宇宙の年齢を超える</td>
            <td>非常に強い</td>
          </tr>
        </tbody>
      </table>
      <p>
        サーバー側のパスワード保存が <strong>bcrypt / scrypt / Argon2</strong> のような遅いハッシュなら、攻撃速度は劇的に下がります（ハッシュ1回計算に 0.1 秒かけるだけで、SHA-256 比 10万倍遅くなる）。逆に、速い MD5/SHA-1 で生のハッシュを保存していると上記の数字に近い時間で破られます。
      </p>

      <h2>パスフレーズが強い理由</h2>
      <p>
        XKCD #936 の有名なネタで <code>correct horse battery staple</code> がありますが、これは<strong>4語のランダムな英単語</strong>を組み合わせたパスフレーズです。
      </p>
      <p>
        例えば 7,000 語の辞書から 5 語を独立に選ぶと：
      </p>
      <pre><code>{`5 × log2(7000) ≈ 5 × 12.8 ≈ 64 bit`}</code></pre>
      <p>
        スペース込み 28 文字、記号もないのに、英数字 11 文字とほぼ同じエントロピーを持ちます。<strong>覚えやすい長さ</strong>と<strong>強さ</strong>を両立できるのがパスフレーズ最大の利点です。
      </p>
      <blockquote>
        <p>
          ⚠ ただし「思いついた英文をそのまま使う」は弱い：辞書語が独立に並んでいるからエントロピーがあるのであって、「I love my dog」のような自然文は文法的相関で実質的なエントロピーが激減します。<strong>必ずランダム生成</strong>すること。
        </p>
      </blockquote>

      <h2>実用的なガイドライン</h2>
      <ol>
        <li>
          <strong>サービス用パスワード</strong>: パスワードマネージャに任せ、16〜30 文字のランダム英数字記号で生成（人間が覚えなくていい）
        </li>
        <li>
          <strong>マスターパスワード（パスワードマネージャの鍵）</strong>: パスフレーズで 6〜7 語以上（覚えられる範囲で長く）
        </li>
        <li>
          <strong>2 要素認証（TOTP / FIDO2）を併用</strong>: パスワードが漏れても突破されない
        </li>
        <li>
          <strong>使い回しは絶対に避ける</strong>: 1 サービスの漏洩が他サービスへ波及する
        </li>
      </ol>

      <h2>おわりに</h2>
      <p>
        パスワード強度はエントロピーで定量化できます。「16文字以上」「4種類混在」というガイドラインは、ざっくり 100 bit のエントロピーを目指している、という根拠があります。
      </p>
      <p>
        本サイトの Password Generator は、パスワード／パスフレーズ両モードで暗号学的に安全な乱数から生成し、エントロピーをリアルタイム表示します。実際に値をいじって、強度バーがどう変化するか試してみてください。
      </p>
    </ArticleLayout>
  );
}
