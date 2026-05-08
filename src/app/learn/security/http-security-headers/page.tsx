import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "http-security-headers")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>はじめに: 7つのヘッダで防御層を作る</h2>
      <p>
        Web アプリの脆弱性対策はコード側だけではありません。<strong>HTTP レスポンスヘッダ</strong>でブラウザに「この挙動は禁止」「この通信ルールに従って」と指示することで、コード側の漏れを補う多層防御が成立します。
      </p>
      <p>
        本サイト <code>secutils</code> 自身も <a href="https://securityheaders.com" target="_blank" rel="noopener noreferrer">securityheaders.com</a> で <strong>A評価</strong>を取得しており、本記事ではその実装例を交えながら主要ヘッダ7つを解説します。<strong>無料で、コード変更ほぼゼロで、すぐに導入できる</strong>のがセキュリティヘッダの最大の魅力です。
      </p>

      <h2>① Content-Security-Policy（CSP）- XSS の最後の砦</h2>
      <p>
        最重要のヘッダ。「このページが読み込み・実行できるリソースの出所」をブラウザに宣言します。<Link href="/learn/security/xss">XSS</Link> 対策の本丸が出力時エスケープなのは前提として、<strong>もしエスケープが破れた時の最後の砦</strong>がこの CSP です。
      </p>
      <p>
        本サイトの実装例（<code>next.config.ts</code> から抜粋）：
      </p>
      <pre><code>{`Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com ...;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: ...;
  font-src 'self' data:;
  connect-src 'self' https://vitals.vercel-insights.com ...;
  frame-src 'self' ...;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests`}</code></pre>
      <p>
        各ディレクティブの役割：
      </p>
      <table>
        <thead>
          <tr>
            <th>ディレクティブ</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>default-src 'self'</code></td>
            <td>未指定の他ディレクティブのフォールバック。同一オリジンのみ</td>
          </tr>
          <tr>
            <td><code>script-src</code></td>
            <td>JavaScript の出所制限。ここが最重要</td>
          </tr>
          <tr>
            <td><code>style-src</code></td>
            <td>CSSの出所制限</td>
          </tr>
          <tr>
            <td><code>img-src</code></td>
            <td>画像の出所制限</td>
          </tr>
          <tr>
            <td><code>connect-src</code></td>
            <td><code>fetch</code>/XHR/WebSocketの宛先制限</td>
          </tr>
          <tr>
            <td><code>frame-src</code></td>
            <td>iframe で埋め込めるオリジン</td>
          </tr>
          <tr>
            <td><code>object-src 'none'</code></td>
            <td>Flash等プラグインを完全禁止（推奨）</td>
          </tr>
          <tr>
            <td><code>base-uri 'self'</code></td>
            <td><code>{'<base>'}</code> タグの改ざん攻撃を防止</td>
          </tr>
          <tr>
            <td><code>form-action 'self'</code></td>
            <td>フォーム送信先を自オリジンに限定</td>
          </tr>
          <tr>
            <td><code>frame-ancestors 'none'</code></td>
            <td>このページの iframe 埋め込み禁止（クリックジャッキング対策）</td>
          </tr>
          <tr>
            <td><code>upgrade-insecure-requests</code></td>
            <td>http:// リソースを自動で https:// に書き換え</td>
          </tr>
        </tbody>
      </table>

      <h3>CSP の難所: 'unsafe-inline'</h3>
      <p>
        本来 CSP の真価は <code>{"'unsafe-inline'"}</code> を排除することにあります。<code>{'<script>...</script>'}</code> や <code>onclick="..."</code> のようなインライン JS を全て禁止すると、XSS で <code>script</code> タグを注入されても実行できなくなる。
      </p>
      <p>
        ただし React/Next.js のようなフレームワークは<strong>初期ハイドレーション用に必ずインライン script を出す</strong>ため、<code>{"'unsafe-inline'"}</code> を許可しないと動きません。回避策は2つ：
      </p>
      <ul>
        <li>
          <strong>nonce 方式</strong>: リクエストごとにランダムな nonce を発行、許可されたインライン script にだけ <code>nonce="..."</code> を付ける。動的レンダリングが必須になり、CDN キャッシュが効かなくなる
        </li>
        <li>
          <strong>hash 方式</strong>: 許可するインライン script の SHA256 ハッシュを CSP に書く。スクリプト内容が変わるたびに更新が必要
        </li>
      </ul>
      <p>
        本サイトは「Vercel 無料枠で静的化を温存」という運用要件から、<code>{"'unsafe-inline'"}</code> 許容の構成を選択。代わりに <code>frame-ancestors 'none'</code>, <code>object-src 'none'</code>, <code>base-uri 'self'</code> など他の防御を厚くしてA評価を取っています。
      </p>
      <blockquote>
        <p>
          ⚠ A+評価を取るには nonce/hash 方式が必須。「セキュリティ最高ランク」と「静的化による高速 + 低コスト」のトレードオフはサービスの性質で判断します。
        </p>
      </blockquote>

      <h2>② Strict-Transport-Security（HSTS）- HTTPS 強制</h2>
      <p>
        ブラウザに「このサイトは今後 HTTPS でしか接続するな」と命令するヘッダ。MITM 攻撃や HTTP→HTTPS リダイレクトの隙間を突く攻撃を防ぎます。
      </p>
      <pre><code>{`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`}</code></pre>
      <table>
        <thead>
          <tr>
            <th>パラメータ</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>max-age=63072000</code></td>
            <td>2年間（秒数）。ブラウザがこのサイトをHTTPS強制と覚える期間</td>
          </tr>
          <tr>
            <td><code>includeSubDomains</code></td>
            <td>サブドメインも HTTPS 必須にする</td>
          </tr>
          <tr>
            <td><code>preload</code></td>
            <td><a href="https://hstspreload.org/" target="_blank" rel="noopener noreferrer">hstspreload.org</a> 経由でブラウザにバンドルされる宣言</td>
          </tr>
        </tbody>
      </table>
      <p>
        重要な注意：<strong>HSTS を設定するとロールバック困難</strong>です。max-age が長期間（2年）の間、ブラウザは強制的に HTTPS を使うので、間違えて全サブドメインに <code>includeSubDomains</code> を効かせると、HTTP 専用の社内ツールが繋がらなくなる事故が起きえます。<strong>本番投入前に短い max-age で慣らし、徐々に伸ばすのが鉄則</strong>。
      </p>

      <h2>③ X-Frame-Options - クリックジャッキング対策</h2>
      <p>
        他サイトの iframe にこのページを埋め込まれることを防ぎます。クリックジャッキング（透明な iframe を上に重ねてユーザーに気付かせず操作させる攻撃）対策。
      </p>
      <pre><code>{`X-Frame-Options: DENY`}</code></pre>
      <p>
        値の選択肢：
      </p>
      <ul>
        <li><code>DENY</code>: 全てのサイトから iframe 埋め込み禁止（推奨）</li>
        <li><code>SAMEORIGIN</code>: 同一オリジンのみ iframe 埋め込み許可</li>
        <li><code>ALLOW-FROM uri</code>: 特定オリジンを許可（廃止予定、CSP の <code>frame-ancestors</code> を使う）</li>
      </ul>
      <p>
        <code>X-Frame-Options</code> と CSP の <code>frame-ancestors</code> は機能的に重複しており、現代では CSP 側が主流。ただし<strong>古いブラウザ互換</strong>のために両方設定するのが慣例で、本サイトも両方入れています。
      </p>

      <h2>④ X-Content-Type-Options - MIME スニッフィング無効化</h2>
      <pre><code>{`X-Content-Type-Options: nosniff`}</code></pre>
      <p>
        ブラウザは時として「サーバが返した Content-Type を信用せず、内容から型を推測する」MIME スニッフィングを行います。これが脆弱性につながります：
      </p>
      <ul>
        <li>サーバが画像 (<code>image/png</code>) として返したファイルが、内容に JS が混入していると、ブラウザが「これは JS だ」と判断して実行</li>
        <li>ユーザーがアップロードした画像が実は JS で、攻撃成立</li>
      </ul>
      <p>
        <code>nosniff</code> を付けると<strong>「Content-Type を信じる、推測しない」</strong>挙動になり、この攻撃面が消えます。<strong>無設定で困ることはまずない</strong>ので、必ず付けるべきヘッダ。
      </p>

      <h2>⑤ Referrer-Policy - リファラ漏洩制御</h2>
      <p>
        外部サイトに遷移した時に <code>Referer</code> ヘッダで「どこから来たか」をどこまで伝えるかを制御します。プライバシーと機能性のバランスが論点。
      </p>
      <pre><code>{`Referrer-Policy: strict-origin-when-cross-origin`}</code></pre>
      <p>
        主な値：
      </p>
      <table>
        <thead>
          <tr>
            <th>値</th>
            <th>挙動</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>no-referrer</code></td>
            <td>常にRefererを送らない（最強プライバシー、Analyticsで参照元不明に）</td>
          </tr>
          <tr>
            <td><code>strict-origin-when-cross-origin</code></td>
            <td>同一オリジンならフルパス、別オリジンならオリジンのみ。<strong>現代ブラウザ既定</strong>かつ推奨</td>
          </tr>
          <tr>
            <td><code>same-origin</code></td>
            <td>別オリジンには一切送らない</td>
          </tr>
          <tr>
            <td><code>unsafe-url</code></td>
            <td>常にフルURLを送る（避けるべき）</td>
          </tr>
        </tbody>
      </table>
      <p>
        URL にトークンやセッション ID が入る可能性があるなら、<strong>厳格な値にしてリファラ経由の漏洩を防ぐ</strong>のが基本。
      </p>

      <h2>⑥ Permissions-Policy - ブラウザAPI制限</h2>
      <p>
        旧称 Feature-Policy。「カメラ・マイク・位置情報など機微なAPIを、このサイト/iframeから使用可能にするか」を宣言します。
      </p>
      <pre><code>{`Permissions-Policy:
  camera=(),
  microphone=(),
  geolocation=(),
  browsing-topics=(),
  interest-cohort=(),
  payment=(),
  usb=()`}</code></pre>
      <p>
        <code>()</code>（空）は「どこからも使用不可」の意味。本サイトは静的ツール集なので、これらのAPIを一切必要としないので全部閉じています。
      </p>
      <p>
        特に注目すべき項目：
      </p>
      <ul>
        <li>
          <code>browsing-topics=()</code> / <code>interest-cohort=()</code>: Google が推進した広告ターゲティング技術（Topics API / FLoC）を無効化。プライバシー視点では推奨
        </li>
        <li>
          <code>camera=()</code> / <code>microphone=()</code>: 不要なら必ず無効化。XSS された時に勝手にカメラを起動される攻撃を防ぐ
        </li>
      </ul>

      <h2>⑦ X-DNS-Prefetch-Control - DNSプリフェッチ</h2>
      <pre><code>{`X-DNS-Prefetch-Control: on`}</code></pre>
      <p>
        ページ内のリンク先ホスト名の DNS 解決を、ユーザーがクリックする前にブラウザに先回りさせる設定。<strong>セキュリティではなく速度のためのヘッダ</strong>ですが、securityheaders.com の評価項目に含まれているので合わせて設定します。
      </p>
      <p>
        プライバシー重視なら <code>off</code> もあり（DNS クエリで興味関心が漏れる懸念）。本サイトは外部リンクが少ないので <code>on</code> でデフォルトの体験を優先しています。
      </p>

      <h2>「設定しない」べきヘッダもある</h2>

      <h3>X-XSS-Protection（廃止）</h3>
      <p>
        昔は <code>X-XSS-Protection: 1; mode=block</code> が推奨されていましたが、ブラウザ側のヒューリスティックが脆弱性を生むことが判明し、Chromeは2020年に削除。<strong>無くてOK、CSPで防御</strong>。
      </p>

      <h3>Server / X-Powered-By</h3>
      <p>
        サーバ実装情報を漏らすヘッダ（<code>Server: nginx/1.18.0</code> など）。攻撃者にバージョン依存の脆弱性を狙う手がかりを与えるので、<strong>削除する</strong>のがベストプラクティス。Next.js は <code>poweredByHeader: false</code> で明示的に切れます。
      </p>

      <h2>Cookie のセキュリティ属性も合わせて</h2>
      <p>
        ヘッダ群とは別ですが、Cookie のセキュリティ属性も同じレイヤーで対策します。詳しくは <Link href="/tools/cookie-parser">HTTP Cookie Parser</Link> ツールで属性可視化できますが、要点は3つ：
      </p>
      <ul>
        <li><code>Secure</code>: HTTPS でのみ送信</li>
        <li><code>HttpOnly</code>: JS から読めない（<Link href="/learn/security/xss">XSS</Link> での Cookie 窃取を防止）</li>
        <li><code>SameSite=Lax</code>（または <code>Strict</code>）: クロスサイトでの自動送信を制限（<Link href="/learn/security/csrf">CSRF</Link>対策）</li>
      </ul>

      <h2>導入手順とテスト</h2>
      <p>
        どこに書くか：
      </p>
      <ul>
        <li>
          <strong>Next.js</strong>: <code>next.config.ts</code> の <code>headers()</code> で
        </li>
        <li>
          <strong>Express</strong>: <a href="https://helmetjs.github.io/" target="_blank" rel="noopener noreferrer">helmet</a> ミドルウェア
        </li>
        <li>
          <strong>Nginx / Apache</strong>: 各設定ファイルで <code>add_header</code> / <code>Header set</code>
        </li>
        <li>
          <strong>Cloudflare / Vercel / Netlify</strong>: ダッシュボード or 設定ファイル
        </li>
      </ul>
      <p>
        テストは2ステップ：
      </p>
      <ol>
        <li>
          <a href="https://securityheaders.com" target="_blank" rel="noopener noreferrer">securityheaders.com</a> でグレード確認（A以上が目安）
        </li>
        <li>
          <a href="https://csp-evaluator.withgoogle.com/" target="_blank" rel="noopener noreferrer">CSP Evaluator</a>（Google）で CSP の弱点をピンポイント分析
        </li>
      </ol>
      <p>
        どちらも無料。設定変更のたびにチェックする習慣を付けると、CSP デプロイ事故が減ります。
      </p>

      <h2>段階的導入のコツ</h2>
      <p>
        いきなり厳格なCSPを本番投入すると、サイトが壊れて顧客に迷惑をかける可能性があります。<strong>Report-Only モード</strong>から始めるのが定石：
      </p>
      <pre><code>{`Content-Security-Policy-Report-Only: ...`}</code></pre>
      <p>
        このヘッダはブロックせずに違反だけレポートさせる。1〜2週間運用してログを見て、本来許可すべきリソースを特定してから本番モードに切り替えます。
      </p>
      <p>
        HSTS も同様に、<code>max-age</code> を最初は短く（数時間 → 数日 → 数ヶ月 → 2年）と段階的に伸ばすのが安全。
      </p>

      <h2>まとめ: 最小構成のテンプレート</h2>
      <p>
        新規サイトの初期設定として、最低限これを入れれば securityheaders.com で A評価を狙えます：
      </p>
      <pre><code>{`Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none'

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()`}</code></pre>
      <p>
        7行のヘッダ追加で、<strong>XSS / クリックジャッキング / MIMEスニッフィング / リファラ漏洩 / 機微API濫用 / HTTPダウングレード</strong> 全てに対する基礎防御が成立します。
      </p>

      <h2>おわりに</h2>
      <p>
        セキュリティヘッダは<strong>「コード変更ほぼゼロで A 評価が取れる」</strong>コスパ最強の対策です。<Link href="/learn/security/owasp-top-10">OWASP Top 10 の A05（Security Misconfiguration）</Link>を一発で改善できる、見過ごせない打ち手。
      </p>
      <p>
        本サイトの <Link href="/tools/http-status">HTTP Status Code Reference</Link> や <Link href="/tools/cookie-parser">HTTP Cookie Parser</Link> で関連ヘッダの動作を確認できます。設定後は securityheaders.com でグレードチェックする習慣を付けてください。
      </p>
      <p>
        関連: <Link href="/learn/security/xss">XSS の基礎と防御</Link> / <Link href="/learn/security/csrf">CSRF の仕組みと対策</Link> / <Link href="/learn/network/https-tls">HTTPS と TLS の仕組み</Link>
      </p>
    </ArticleLayout>
  );
}
