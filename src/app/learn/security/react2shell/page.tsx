import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "react2shell")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>React2Shell（CVE-2025-55182）とは</h2>
      <p>
        <strong>React2Shell</strong> は、2025年12月3日に <strong>Meta と Vercel</strong> が公表した <strong>React Server Components（RSC）</strong>の致命的な脆弱性です。CVE 番号は <strong>CVE-2025-55182</strong>、深刻度は <strong>CVSS 10.0（最大値）</strong>。<strong>認証前（事前認証）のリモートコード実行（RCE）</strong>が可能で、攻撃者は細工した HTTP リクエスト 1 通でサーバー上に任意のコードを実行できます。
      </p>
      <p>
        React / Next.js は世界中の Web アプリで使われているため影響範囲が極めて広く、業界では Log4Shell（CVE-2021-44228）に並ぶ規模のフレームワーク層脆弱性として扱われました。
      </p>

      <h2>なぜこれほど危険なのか</h2>
      <ul>
        <li><strong>事前認証</strong>: ログイン不要。公開エンドポイントに到達できれば誰でも攻撃を試みられる。</li>
        <li><strong>RCE</strong>: 情報漏えいに留まらず、サーバーそのものを乗っ取れる（コインマイナー設置や横展開の起点になる）。</li>
        <li><strong>CVSS 10.0</strong>: 攻撃の容易さ・影響の大きさともに最大評価。</li>
        <li><strong>普及度</strong>: React 19 / Next.js を使う多数のアプリが対象になりうる。</li>
      </ul>
      <p>
        公表直後（2025年12月5日頃）から悪用の試みが観測され、当初はレッドチームによる検証が中心でしたが、実際の攻撃者がコインマイナーを設置する事例も報告されました。
      </p>

      <h2>根本原因: 安全でないデシリアライズ</h2>
      <p>
        React Server Components は、クライアントからのリクエストを<strong>サーバー側の関数呼び出し（Server Functions / Server Actions）</strong>に変換するため、リクエストのペイロードを<strong>デシリアライズ</strong>します。CVE-2025-55182 は、この<strong>ペイロードのデコード処理に十分な検証がなかった</strong>ことに起因します。
      </p>
      <p>
        攻撃者が Server Function のエンドポイントに細工したペイロードを送ると、本来データとして扱うべき入力がサーバー側の処理へ流れ込み、<strong>安全でないデシリアライズ（Insecure Deserialization）</strong>を経て任意コード実行に至ります。これは OWASP でいう <strong>A08:2021 - Software and Data Integrity Failures</strong> に分類される、古典的かつ強力な脆弱性パターンです。
      </p>
      <blockquote>
        <p>
          「ユーザーから来たデータをそのままオブジェクトや処理に復元する」とき、信頼境界を越えた入力が実行コンテキストに混入しうる——これがデシリアライズ系脆弱性の本質です。
        </p>
      </blockquote>

      <h2>攻撃の流れ（概念）</h2>
      <p>
        悪用を助長しないため、具体的なエクスプロイトコードは載せず、流れの概念だけを示します。
      </p>
      <ol>
        <li>攻撃者が RSC の Server Function を受け付けるエンドポイントを特定する（多くは通常の POST エンドポイント）。</li>
        <li>デシリアライズ処理を悪用する細工済みペイロードを HTTP リクエストとして送信する。</li>
        <li>サーバーが検証不十分なままペイロードをデコード・処理し、任意コードが実行される。</li>
        <li>以降、Web シェル設置・認証情報窃取・横展開などに繋がる。</li>
      </ol>

      <h2>影響を受けるバージョンと修正版</h2>
      <p>
        以下は公表時点で示された主なバージョンです。<strong>最終的な対象・修正版は必ず公式の GitHub Security Advisory / NVD で確認してください</strong>（アドバイザリは更新されることがあります）。Next.js 側にも関連して <strong>CVE-2025-66478</strong> が併せて報告されています。
      </p>
      <table>
        <thead>
          <tr>
            <th>対象</th>
            <th>影響を受けるバージョン</th>
            <th>修正版</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>React Server Components</td>
            <td>19.0.0 / 19.1.0 / 19.1.1 / 19.2.0</td>
            <td>19.0.3 / 19.1.4 / 19.2.3</td>
          </tr>
          <tr>
            <td>Next.js</td>
            <td>上記 RSC を含む各系列</td>
            <td>15.0.5 / 15.1.9 / 15.2.6 / 15.3.6 / 15.4.8 / 15.5.7 / 16.0.7</td>
          </tr>
          <tr>
            <td>対象 npm パッケージ</td>
            <td colSpan={2}>
              <code>react-server-dom-webpack</code> / <code>react-server-dom-turbopack</code> / <code>react-server-dom-parcel</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>自分のアプリは影響を受けるか</h2>
      <ul>
        <li><strong>Server Actions / Server Functions を使っている</strong>（フォーム送信やサーバー関数呼び出し）→ 影響大。最優先で対応する。</li>
        <li><strong>RSC を使う SSR / App Router 構成</strong> → 対象バージョンなら対応が必要。</li>
        <li><strong>静的書き出し中心・クライアントコンポーネントのみで Server Function を持たない</strong> → 攻撃面は限定的だが、バージョンは上げておく。</li>
      </ul>
      <p>まず使用バージョンを確認します。</p>
      <pre><code>{`# Next.js / React のバージョンを確認
npm ls next react react-dom

# package.json と lockfile（package-lock.json 等）も確認する`}</code></pre>

      <h2>対策</h2>
      <ol>
        <li><strong>修正版へ即アップグレード</strong>（最優先）。React / Next.js を公式アドバイザリ記載のパッチ版以上に上げる。</li>
        <li><strong>一時緩和</strong>: すぐに上げられない場合、WAF で Server Function エンドポイントへの異常なペイロードを遮断し、不要なら該当機能を無効化する。</li>
        <li><strong>監視</strong>: 公表後に観測された不審なプロセス（コインマイナー等）や外向き通信を検知する。侵害の痕跡（IoC）はベンダーのアドバイザリを参照。</li>
        <li><strong>多層防御</strong>: egress 制限・最小権限・ネットワーク隔離で、万一 RCE が成立しても被害を局所化する。</li>
      </ol>

      <h2>教訓: デシリアライズと信頼境界</h2>
      <p>
        React2Shell は新概念の脆弱性ではなく、<strong>「外部入力を検証せずに復元・実行してはならない」</strong>という古典的原則の再来です。フレームワークが裏側で行うデシリアライズも、ユーザー入力が絡む以上は信頼境界の対象になります。
      </p>
      <ul>
        <li>ユーザー由来データはあくまでデータとして扱い、コード/オブジェクト復元の経路に直結させない。</li>
        <li>依存フレームワークのセキュリティ通知を購読し、CVSS 9.0 以上は即時対応するフローを用意しておく。</li>
        <li>SBOM や依存可視化で「どのバージョンを使っているか」を常に即答できる状態にしておく。</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        React2Shell（CVE-2025-55182）は CVSS 10.0・事前認証 RCE という最悪クラスの脆弱性で、原因は RSC のペイロードデシリアライズの検証不足でした。対応はシンプルで、<strong>(1) バージョン確認 → (2) 修正版へアップグレード → (3) 監視と一時緩和</strong>の順に進めます。フレームワーク任せの処理であっても、ユーザー入力が通る以上は信頼境界が存在することを思い出させる事例です。
      </p>
      <p>
        関連リスクの全体像は <a href="/learn/security/owasp-top-10">OWASP Top 10 入門</a>、ヘッダによる多層防御は <a href="/learn/security/http-security-headers">HTTP セキュリティヘッダ詳解</a> も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
