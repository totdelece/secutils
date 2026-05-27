import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "path-traversal")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>パストラバーサルとは</h2>
      <p>
        <strong>パストラバーサル（Path Traversal）</strong>は、別名 <strong>ディレクトリトラバーサル</strong>とも呼ばれ、ユーザー入力で指定されたファイルパスに <code>../</code>（親ディレクトリへの遷移）を含めることで、本来アクセスできないはずのファイルを読み書きさせる攻撃です。
      </p>
      <p>
        OWASP Top 10 2021 では <strong>A01:2021 - Broken Access Control</strong> の代表例に分類されます。意外と古くから知られている攻撃ですが、ファイルアップロード機能、テンプレートエンジン、ZIP展開処理など、ファイルパスを扱うあらゆる箇所で今でも見つかります。
      </p>

      <h2>典型的な脆弱なコード</h2>
      <pre><code>{`# 脆弱な例（Python）
@app.route("/files/<filename>")
def serve_file(filename):
    path = os.path.join("/var/www/uploads", filename)
    return open(path).read()  # ← パス検証なし`}</code></pre>
      <p>
        攻撃者は次の URL を送ります：
      </p>
      <pre><code>{`GET /files/../../../../etc/passwd
GET /files/..%2f..%2f..%2fetc%2fpasswd     # URLエンコード
GET /files/..%252f..%252fetc%252fpasswd    # ダブルエンコード
GET /files/....//....//etc/passwd          # ../を二重に書く
GET /files/..\\..\\..\\windows\\win.ini       # Windows用バックスラッシュ`}</code></pre>
      <p>
        サーバー側では <code>os.path.join("/var/www/uploads", "../../../../etc/passwd")</code> が <code>"/etc/passwd"</code> に解決され、<strong>システム全体のファイルが読まれます</strong>。Linux の <code>/etc/passwd</code> や <code>/proc/self/environ</code>、Windows の <code>win.ini</code> や <code>boot.ini</code> が典型的な検証ターゲットです。
      </p>

      <h2>検査回避の典型パターン</h2>
      <table>
        <thead>
          <tr>
            <th>テクニック</th>
            <th>例</th>
            <th>狙い</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>URLエンコード</td>
            <td><code>%2e%2e%2f</code></td>
            <td>文字列 <code>../</code> の単純検査を回避</td>
          </tr>
          <tr>
            <td>ダブルエンコード</td>
            <td><code>%252e%252e%252f</code></td>
            <td>1回デコードしてから検査するコードを回避</td>
          </tr>
          <tr>
            <td>UTF-8 オーバーロング</td>
            <td><code>%c0%ae%c0%ae/</code></td>
            <td>非正規UTF-8シーケンス（旧IIS脆弱性で有名）</td>
          </tr>
          <tr>
            <td>16bit Unicode</td>
            <td><code>%u002e%u002e%u002f</code></td>
            <td>IIS の独自デコードを利用</td>
          </tr>
          <tr>
            <td>NULL バイト</td>
            <td><code>file.txt%00.png</code></td>
            <td>C言語系で <code>%00</code> 以降を無視させる（Java 7以前、PHP）</td>
          </tr>
          <tr>
            <td>二重 ../</td>
            <td><code>....//</code></td>
            <td><code>../</code> を削除する単純フィルタを回避</td>
          </tr>
          <tr>
            <td>絶対パス</td>
            <td><code>/etc/passwd</code></td>
            <td><code>../</code> を使わず直接アクセス</td>
          </tr>
        </tbody>
      </table>
      <p>
        URL エンコードの実際の変換は <a href="/tools/url-encoder">URL Encoder / Decoder</a> で確認できます。例えば <code>../</code> → <code>%2e%2e%2f</code>、ダブルエンコードで <code>%252e%252e%252f</code> のように二段階で確認できます。
      </p>

      <h2>派生攻撃: ZipSlip</h2>
      <p>
        ZIP ファイルやTAR を展開する処理でも、エントリ名に <code>../</code> が含まれていれば任意のパスへ書き出せます。これは <strong>ZipSlip</strong>と呼ばれ、2018年に Snyk によって多数のライブラリで脆弱性が報告されました。
      </p>
      <pre><code>{`# 危険な ZIP のエントリ例
../../../etc/cron.d/malicious     # cron に書き込み
../../../root/.ssh/authorized_keys  # SSH 公開鍵を上書き`}</code></pre>
      <p>
        対策は ZIP 解凍時に各エントリの解決後パスがベースディレクトリ配下であることを必ず検証することです。
      </p>

      <h2>派生攻撃: パス Confusion（テンプレート / Include）</h2>
      <p>
        テンプレートエンジンや <code>require</code>/<code>include</code> でユーザー入力をパスに使う場合、パストラバーサルから一段進んだ <strong>LFI（Local File Inclusion）</strong>や <strong>RFI（Remote File Inclusion）</strong>に発展します。PHP の <code>include $_GET[&apos;page&apos;]</code> はその代表で、任意ファイルの読み込み＋場合によってはコード実行に直結します。
      </p>

      <h2>防御1: 正規化後の許可リスト</h2>
      <p>
        最も確実な防御は、<strong>「パスを正規化（canonicalize）してから、許可ディレクトリ配下にあるかを確認」</strong>するパターンです。
      </p>
      <pre><code>{`# Python の安全実装例
import os

BASE_DIR = os.path.realpath("/var/www/uploads")

def safe_read(filename: str) -> bytes:
    requested = os.path.realpath(os.path.join(BASE_DIR, filename))
    if not requested.startswith(BASE_DIR + os.sep):
        raise PermissionError("Path traversal detected")
    return open(requested, "rb").read()`}</code></pre>
      <p>
        ポイントは <code>os.path.realpath()</code> でシンボリックリンク・<code>../</code> をすべて解決した <strong>絶対パス</strong>を取得してから、ベースディレクトリの prefix チェックを行うこと。<code>os.path.join()</code> だけでは <code>../</code> 解決が行われないため不十分です。
      </p>

      <h2>防御2: ファイル名のホワイトリスト化</h2>
      <p>
        そもそも任意の文字列をパスに使わせず、<strong>「ID から内部マッピングでファイルパスを引く」</strong>設計にすると、パストラバーサルの余地がなくなります。
      </p>
      <pre><code>{`# 良い設計: IDからDB引きでパスを決定
@app.route("/files/<int:file_id>")
def serve_file(file_id):
    record = db.files.find_one({"id": file_id, "owner": current_user.id})
    if not record:
        abort(404)
    return send_from_directory(UPLOAD_DIR, record["storage_name"])`}</code></pre>
      <p>
        <code>storage_name</code> はサーバー側で生成した UUID やハッシュにしておけば、ユーザーが任意のパスを指定する余地は一切ありません。
      </p>

      <h2>防御3: 抽象化APIの利用</h2>
      <p>
        フレームワークが提供する安全なファイル送信関数を使うのも有効です：
      </p>
      <ul>
        <li>Flask の <code>send_from_directory()</code>: パストラバーサル検証を内部で実施</li>
        <li>Express の <code>res.sendFile()</code>: <code>root</code> オプション併用でディレクトリ脱出を防止</li>
        <li>ASP.NET の <code>VirtualPathUtility.IsAppRelative()</code>: アプリ相対パスのみを許容</li>
        <li>Rails の <code>send_file</code>: <code>:url_based_filename</code> 等で安全化</li>
      </ul>
      <p>
        自前で <code>open()</code>/<code>fopen()</code> を呼ぶよりも、フレームワーク提供の API を経由するのが安全です。
      </p>

      <h2>防御4: 実行ユーザーの権限最小化</h2>
      <p>
        どれだけアプリ層で防御しても完璧ではありません。<strong>「万一突破されても被害が限定される」</strong>ように、アプリ実行ユーザーの権限を最小化します：
      </p>
      <ul>
        <li>Web サーバーは <code>nobody</code> や専用ユーザーで動かす（root 厳禁）</li>
        <li>必要なファイル以外を chmod 600 で root 所有にする</li>
        <li>コンテナで動かす（root のままでもホストへの影響は限定的）</li>
        <li>SELinux/AppArmor で読み取り可能パスを制限</li>
        <li>chroot やコンテナで <code>/etc/passwd</code> 等にアクセスできなくする</li>
      </ul>

      <h2>実装チェックリスト</h2>
      <ul>
        <li>ユーザー入力のパスを直接 <code>open()</code> に渡していないか</li>
        <li>パスを <strong>正規化（realpath / canonicalize）</strong>してから許可ディレクトリ配下か検査しているか</li>
        <li>URL エンコード・ダブルエンコード・NULL バイトを意識して検査しているか</li>
        <li>可能なら<strong>「ID → DB → パス」</strong>の間接参照に置き換えているか</li>
        <li>ZIP/TAR 展開時、エントリパスがベース配下か検証しているか</li>
        <li>ファイル送信はフレームワーク提供の安全関数を使っているか</li>
        <li>アプリ実行ユーザーの権限を最小化しているか</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        パストラバーサルは、Web 黎明期から存在しながら現在も繰り返し発見される根強い脆弱性です。<code>../</code> 文字列を単純にブロックするだけでは <strong>URL エンコード・ダブルエンコード・NULL バイト</strong>などで簡単に回避されます。
      </p>
      <p>
        本質的な対策は <strong>「パスを正規化してから許可ディレクトリ配下か検証する」</strong>か、そもそも <strong>「ユーザーに任意の文字列を渡させず、ID 経由で間接参照する」</strong>設計に切り替えること。組み合わせれば、たとえ検査ロジックに穴があっても被害は限定されます。
      </p>
      <p>
        URL エンコードの確認には <a href="/tools/url-encoder">URL Encoder / Decoder</a>、関連リスクは <a href="/learn/security/owasp-top-10">OWASP Top 10 入門</a> も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
