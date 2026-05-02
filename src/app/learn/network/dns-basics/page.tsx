import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "dns-basics")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>DNS は「インターネットの電話帳」</h2>
      <p>
        ブラウザに <code>https://example.com</code> と入れると、あなたの PC は「<code>example.com</code> って実際どの IP アドレスにあるの？」を調べないと通信できません。この「ドメイン名 → IP アドレス」の変換を担うのが <strong>DNS（Domain Name System）</strong>です。
      </p>
      <p>
        この記事では、URL を入れてから IP アドレスが返ってくるまでの流れと、よく出てくる用語（権威サーバー、フルリゾルバ、TTL、A/AAAA/MX 等）を整理します。
      </p>

      <h2>名前解決の主役: 4 種類のサーバー</h2>
      <p>
        DNS の世界には役割の違うサーバーが4種類あります。
      </p>
      <ol>
        <li>
          <strong>スタブリゾルバ</strong>: あなたの OS / ブラウザに組み込まれた小さなクライアント。実際の問い合わせはフルリゾルバに丸投げする
        </li>
        <li>
          <strong>フルリゾルバ（キャッシュサーバー）</strong>: 複数の権威サーバーを辿って最終回答を取りに行く。ISP、Google Public DNS（<code>8.8.8.8</code>）、Cloudflare（<code>1.1.1.1</code>）等
        </li>
        <li>
          <strong>権威 DNS サーバー</strong>: あるドメインの「公式回答」を持つ。Route 53、Cloudflare DNS、ConoHa DNS 等
        </li>
        <li>
          <strong>ルート DNS サーバー</strong>: ドメイン名階層の頂点。<code>.com</code> や <code>.jp</code> 等の TLD（Top Level Domain）の場所を教える
        </li>
      </ol>

      <h2>名前解決の流れ（フルリゾルバの旅）</h2>
      <p>
        <code>www.example.com</code> を引く場合の典型的な流れ：
      </p>
      <pre><code>{`1. PC「www.example.com の IP は？」 → フルリゾルバ
2. フルリゾルバ→ ルート「.com を担当する権威サーバーは？」
3. ルート → ".com の権威は a.gtld-servers.net …"
4. フルリゾルバ → .com 権威「example.com の権威は？」
5. .com 権威 → "example.com の権威は ns1.example.com"
6. フルリゾルバ → example.com 権威「www.example.com の A は？」
7. example.com 権威 → "93.184.215.14"
8. フルリゾルバ → PC「93.184.215.14 だよ」`}</code></pre>
      <p>
        実際にはフルリゾルバが結果を <strong>キャッシュ</strong> するので、毎回これだけのやり取りが発生するわけではありません。同じドメインへの 2 回目以降は数ミリ秒で返ります。
      </p>

      <h2>TTL: キャッシュの有効期限</h2>
      <p>
        各 DNS レコードには <strong>TTL（Time To Live）</strong>が秒単位で設定されています。フルリゾルバや OS はこの時間だけ結果をキャッシュし、過ぎたら再問い合わせします。
      </p>
      <ul>
        <li>
          <strong>TTL を長くする</strong>（例: 86400 秒 = 1 日）: クエリ数が減りパフォーマンス◎ / 障害復旧時のフェイルオーバーが遅い
        </li>
        <li>
          <strong>TTL を短くする</strong>（例: 60 秒〜300 秒）: 切替が早い / クエリ負荷増
        </li>
      </ul>
      <p>
        本番運用ではドメインの引っ越し直前に TTL を短くしておき、移行後に長く戻す、という運用が一般的です。
      </p>

      <h2>代表的なレコードタイプ</h2>
      <table>
        <thead>
          <tr>
            <th>タイプ</th>
            <th>用途</th>
            <th>例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A</strong></td>
            <td>ドメイン → IPv4 アドレス</td>
            <td><code>example.com → 93.184.215.14</code></td>
          </tr>
          <tr>
            <td><strong>AAAA</strong></td>
            <td>ドメイン → IPv6 アドレス</td>
            <td><code>example.com → 2606:2800:21f:cb07:6820:80da:af6b:8b2c</code></td>
          </tr>
          <tr>
            <td><strong>CNAME</strong></td>
            <td>別名（実際の名前を指す）</td>
            <td><code>www.example.com → example.com</code></td>
          </tr>
          <tr>
            <td><strong>MX</strong></td>
            <td>メールサーバーの場所</td>
            <td><code>example.com の MX → mail.example.com (priority 10)</code></td>
          </tr>
          <tr>
            <td><strong>TXT</strong></td>
            <td>任意の文字列（SPF / DKIM / 検証用）</td>
            <td><code>v=spf1 include:_spf.google.com ~all</code></td>
          </tr>
          <tr>
            <td><strong>NS</strong></td>
            <td>そのドメインの権威 DNS サーバー</td>
            <td><code>example.com の NS → ns1.example.com</code></td>
          </tr>
          <tr>
            <td><strong>SOA</strong></td>
            <td>ゾーンの基本情報</td>
            <td>シリアル番号、TTL、責任者メールアドレス</td>
          </tr>
          <tr>
            <td><strong>PTR</strong></td>
            <td>逆引き（IP → ドメイン）</td>
            <td><code>93.184.215.14 → example.com</code></td>
          </tr>
          <tr>
            <td><strong>CAA</strong></td>
            <td>証明書発行の許可制御</td>
            <td><code>0 issue "letsencrypt.org"</code></td>
          </tr>
        </tbody>
      </table>

      <h2>セキュリティ視点での DNS</h2>
      <h3>DNS スプーフィング / キャッシュポイズニング</h3>
      <p>
        フルリゾルバのキャッシュに偽の回答を仕込まれると、ユーザーは正しいドメイン名を打っても偽サイトへ誘導されます。これに対抗する仕組みが <strong>DNSSEC</strong>（電子署名で回答の正当性を検証）ですが、対応している権威サーバー・フルリゾルバ両方で初めて有効です。
      </p>

      <h3>DNS over HTTPS / DNS over TLS</h3>
      <p>
        従来の DNS は平文 UDP で流れるため、ISP や中間者にクエリ内容が筒抜けでした。これを暗号化するのが <strong>DoH（DNS over HTTPS）</strong>と <strong>DoT（DNS over TLS）</strong>です。Firefox や Chrome は DoH をデフォルトで使う方向に動いています。
      </p>

      <h3>権威 DNS の乗っ取り</h3>
      <p>
        ドメインのレジストラ・権威 DNS の管理アカウントが侵害されると、攻撃者は任意の IP を A レコードに設定できます。<strong>レジストラのアカウントは特に強固に守る</strong>（ハードウェアキー必須等）べき領域です。
      </p>

      <h2>困ったときに使うコマンド</h2>
      <p>
        DNS のトラブルシュートで頻出するコマンド：
      </p>
      <ul>
        <li>
          <code>dig example.com A</code>: A レコードを直接問い合わせ（Linux/macOS 標準）
        </li>
        <li>
          <code>dig example.com MX +short</code>: MX のみ簡易表示
        </li>
        <li>
          <code>dig @8.8.8.8 example.com</code>: 特定の DNS サーバーに問い合わせ
        </li>
        <li>
          <code>nslookup example.com</code>: Windows 標準
        </li>
        <li>
          <code>host example.com</code>: 簡易版
        </li>
      </ul>
      <p>
        「ブラウザでは見えるが API 経由だとつながらない」のようなトラブル時、まず <code>dig</code> で名前解決の段階で問題があるかを確認すると切り分けが進みます。
      </p>

      <h2>おわりに</h2>
      <p>
        DNS は普段は意識しませんが、「サイトがつながらない」障害の<strong>4 割は DNS が原因</strong>と言われるくらい、ハマると厄介な領域です。フルリゾルバ・権威・キャッシュ・TTL の関係を一度きちんと押さえておくと、後で必ず役に立ちます。
      </p>
    </ArticleLayout>
  );
}
