import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "sql-injection")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>SQL インジェクションとは</h2>
      <p>
        <strong>SQL インジェクション（SQLi）</strong>は、Web アプリケーションが受け取った文字列をそのまま SQL クエリに連結することで、攻撃者が任意の SQL を実行できてしまう脆弱性です。1998 年に <em>Phrack Magazine</em> で広く知られて以降、四半世紀経った今でも上位の攻撃カテゴリに残り続けています。
      </p>
      <p>
        OWASP Top 10 - 2021 では <strong>A03:2021 Injection</strong> として XSS と統合されたカテゴリの中心。情報漏洩・データ改ざん・認証回避・場合によってはサーバー OS への侵入まで、被害の幅広さでは XSS を上回ることもあります。
      </p>

      <h2>原因はたった一つ: 文字列連結でクエリを組み立てる</h2>
      <p>
        SQLi は教科書的には <strong>「ユーザー入力を、SQL の構文として解釈する場所にそのまま流し込んだ」</strong> という、たった一つのパターンから生まれます。例えば PHP でログイン処理を書く時：
      </p>
      <pre><code>{`// ❌ 危険なコード
$id = $_POST['id'];
$pw = $_POST['pw'];
$sql = "SELECT * FROM users WHERE id = '" . $id . "' AND pw = '" . $pw . "'";`}</code></pre>
      <p>
        <code>id</code> に <code>{"admin' --"}</code> という文字列を入れると、組み立て後の SQL はこうなります：
      </p>
      <pre><code>{`SELECT * FROM users WHERE id = 'admin' --' AND pw = '...'`}</code></pre>
      <p>
        <code>--</code> は SQL のコメント開始記号。<strong>パスワード判定がコメントとして消滅</strong>し、admin としてログインが成立してしまいます。
      </p>

      <h2>典型的な攻撃パターン3種</h2>

      <h3>1. 認証回避（Authentication Bypass）</h3>
      <p>
        上記の <code>--</code> 系。<code>{"' OR '1'='1"}</code> もよく見ます：
      </p>
      <pre><code>{`SELECT * FROM users WHERE id = '' OR '1'='1' AND pw = '...'`}</code></pre>
      <p>
        OR の優先順位で AND の条件が無視され、1 行目のユーザーでログイン成立。CTF 問題でもおなじみのパターン。
      </p>

      <h3>2. UNION ベース攻撃</h3>
      <p>
        商品検索のような <strong>「結果を返す」エンドポイント</strong>から、別テーブルの内容を取り出す攻撃。
      </p>
      <pre><code>{`-- 元のクエリ
SELECT name, price FROM products WHERE category = '\${q}'

-- 攻撃文字列
\${q} = "x' UNION SELECT username, password FROM users --"

-- 組み立て後
SELECT name, price FROM products WHERE category = 'x'
UNION SELECT username, password FROM users --'`}</code></pre>
      <p>
        商品リストの隣に <strong>users テーブルのパスワードハッシュが並んで返ってくる</strong>。データベース全体が攻撃対象になる、典型的に被害の大きいパターン。
      </p>

      <h3>3. Blind SQLi（盲目型）</h3>
      <p>
        エラーメッセージも結果も画面に出ない場合に使う、<strong>「条件式の真偽でレスポンスの違いを見る」</strong>テクニック：
      </p>
      <pre><code>{`?id=1 AND SUBSTRING(database(),1,1) = 'a'  → 200 OK
?id=1 AND SUBSTRING(database(),1,1) = 'b'  → 200 OK
...
?id=1 AND SUBSTRING(database(),1,1) = 'm'  → 200 OK
?id=1 AND SUBSTRING(database(),1,1) = 'n'  → 500 Error`}</code></pre>
      <p>
        1文字ずつ二分探索で確定させていく。手作業だと死ぬほど面倒なので、<code>sqlmap</code> のような自動化ツールが使われます。「画面に何も出ないから安全」は完全な誤解で、Blind SQLi は実質的に UNION 系と同じ情報量を取り出せます。
      </p>

      <h2>正しい対策: プリペアドステートメント（パラメータ化クエリ）</h2>
      <p>
        SQLi の<strong>唯一の本質的な対策</strong>がこれです。SQL の構文と値を <strong>DB ドライバレベルで完全分離</strong>し、値はあくまで「値」としてのみ扱われるように依頼する仕組み。
      </p>
      <pre><code>{`// ✅ 安全なコード（PHP / PDO）
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ? AND pw = ?");
$stmt->execute([$id, $pw]);

// ✅ 安全なコード（Python / psycopg）
cur.execute("SELECT * FROM users WHERE id = %s AND pw = %s", (id, pw))

// ✅ 安全なコード（Node.js / pg）
await client.query("SELECT * FROM users WHERE id = $1 AND pw = $2", [id, pw])

// ✅ 安全なコード（Go / database/sql）
db.Query("SELECT * FROM users WHERE id = ? AND pw = ?", id, pw)`}</code></pre>
      <p>
        プレースホルダ（<code>?</code>, <code>$1</code>, <code>%s</code>）の文法は言語ごとに違いますが、原理は同じ：<strong>「クエリの形」を先にDBに渡し、「値」は別経路で渡す</strong>。値の中に <code>{"' OR 1=1 --"}</code> が入っていても、それは <em>id 列の値として</em>扱われるので、構文として解釈されません。
      </p>

      <h2>ORM を使えば自動で安全？</h2>
      <p>
        Prisma / TypeORM / Sequelize / SQLAlchemy / Active Record のような ORM は、<strong>普通の使い方をしている限り自動でパラメータ化されます</strong>。これが「ORM を入れるとセキュアになる」と言われる根拠。
      </p>
      <p>
        ただし<strong>「生 SQL を書ける機能」を使うと自分でやる必要</strong>があります：
      </p>
      <pre><code>{`// ❌ 危険（Prisma）
prisma.$queryRawUnsafe(\`SELECT * FROM users WHERE id = '\${id}'\`)

// ✅ 安全（Prisma）
prisma.$queryRaw\`SELECT * FROM users WHERE id = \${id}\`  // タグ付きテンプレート

// ❌ 危険（SQLAlchemy）
session.execute(f"SELECT * FROM users WHERE id = '{id}'")

// ✅ 安全（SQLAlchemy）
session.execute(text("SELECT * FROM users WHERE id = :id"), {"id": id})`}</code></pre>
      <p>
        各 ORM の API は「安全な書き方」と「危険な書き方」が紙一重で並んでいることが多いので、ドキュメントの「raw query」「unsafe」と書かれた API を見たら<strong>パラメータ化されているか必ず確認</strong>してください。
      </p>

      <h2>やってはいけない「対策」</h2>

      <h3>1. ブラックリストでキーワードを弾く</h3>
      <p>
        <code>SELECT</code>, <code>UNION</code>, <code>--</code>, <code>'</code> をリクエストから消す方式。<strong>必ずバイパスされます</strong>。
      </p>
      <ul>
        <li><code>SeLeCt</code> のような大小文字混在</li>
        <li><code>SE/**/LECT</code> のようにコメント挿入</li>
        <li><code>%53ELECT</code> のように URL エンコード</li>
        <li><code>{"' OR 1=1 -- "}</code> をエンコードして二重デコード</li>
      </ul>
      <p>
        WAF が補助的に使う場面はあるが、<strong>アプリ層の本対策にはなりません</strong>。
      </p>

      <h3>2. シングルクォートをエスケープ</h3>
      <p>
        <code>{"'"}</code> を <code>{"\\'"}</code> に置換するアプローチ。文字列値については一見有効ですが、<strong>数値カラムや LIKE 句、ORDER BY などでは保護されません</strong>：
      </p>
      <pre><code>{`-- 数値カラム（クォート不要）
SELECT * FROM products WHERE id = \${id}
-- id="1 OR 1=1" でバイパス成立

-- ORDER BY（プレースホルダで代用不可）
SELECT * FROM products ORDER BY \${col}
-- col="(SELECT password FROM users LIMIT 1)" 系の攻撃可能`}</code></pre>
      <p>
        ORDER BY の列名や ASC/DESC のような<strong>プレースホルダ化できない部分</strong>はホワイトリスト（許容値の固定リスト）と照合する別アプローチが必要です。
      </p>

      <h3>3. 「内部APIだから不要」</h3>
      <p>
        管理画面・社内ツール・マイクロサービス間の API も SQLi 対策は必須。<strong>境界突破された後の被害最小化</strong>（多層防御）の観点で、すべてのSQLでパラメータ化を徹底するのが現代の常識。
      </p>

      <h2>多層防御として組み合わせる</h2>
      <p>
        プリペアドステートメントが本丸ですが、追加で：
      </p>
      <ul>
        <li>
          <strong>最小権限のDBユーザー</strong>: アプリ用ユーザーは <code>SELECT/INSERT/UPDATE/DELETE</code> のみ、<code>DROP TABLE</code> は不可
        </li>
        <li>
          <strong>エラーメッセージの本番非表示</strong>: <code>SQLSTATE</code> やカラム名がエラーで漏れると Blind SQLi の手間が大幅に減る
        </li>
        <li>
          <strong>WAF</strong>: 既知のシグネチャを弾く時間稼ぎ
        </li>
        <li>
          <strong>監査ログ</strong>: 異常なクエリパターン（複数 UNION、長すぎる WHERE 句）の検知
        </li>
        <li>
          <strong>カラム暗号化</strong>: パスワードは <Link href="/learn/security/password-hashing">適切なハッシュ関数</Link> で保存。SQLi で取り出されてもオフライン解析が困難に
        </li>
      </ul>

      <h2>チェックリスト</h2>
      <ul>
        <li>☐ すべてのクエリでプレースホルダ（パラメータ化）を使い、文字列連結していない</li>
        <li>☐ ORM の「生 SQL / unsafe」系 API を使う箇所を把握し、パラメータ化している</li>
        <li>☐ プレースホルダ化できない部分（<code>ORDER BY</code> の列名等）はホワイトリスト照合</li>
        <li>☐ アプリ用 DB ユーザーは最小権限（<code>DROP</code> 等は不可）</li>
        <li>☐ 本番では SQL エラーの詳細をクライアントに返していない</li>
        <li>☐ パスワードは適切なハッシュで保存（漏えい時の被害を限定）</li>
        <li>☐ ブラックリスト／クォートエスケープを「本対策」として頼っていない</li>
      </ul>

      <h2>参考（一次情報）</h2>
      <ul>
        <li>
          <a
            href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            OWASP — SQL Injection Prevention Cheat Sheet
          </a>
        </li>
        <li>
          <a href="https://owasp.org/Top10/A03_2021-Injection/" target="_blank" rel="noopener noreferrer">
            OWASP Top 10 — A03:2021 Injection
          </a>
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        SQLi の根は「SQL クエリを文字列連結で組み立てる」だけ。<strong>プリペアドステートメント / ORM 経由のクエリビルダ</strong>を徹底すれば原理的に発生しません。本当に難しい部分は「すでに書かれた数千行のレガシーコードに散らばる文字列連結を、すべて洗い出して直す」という<strong>運用面</strong>であって、技術的にはとてもシンプルな話です。
      </p>
      <p>
        SQLi は <Link href="/learn/security/xss">XSS</Link> と並ぶ Injection 系の代表で、両方とも <Link href="/learn/security/owasp-top-10">OWASP Top 10 の A03</Link> に分類されます。「ユーザー入力を別言語の構文として解釈する場所に出力する時は必ずエスケープ／パラメータ化」という共通原則を意識してみてください。
      </p>
    </ArticleLayout>
  );
}
