import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "mac-arp")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「IP アドレスがあれば届く」は半分正解</h2>
      <p>
        IP アドレスはインターネット全体を貫く論理的な住所ですが、<strong>実際にケーブルや電波の上をパケットが流れる時点では、別の住所</strong>が必要です。それが <strong>MAC アドレス</strong>です。
      </p>
      <p>
        この記事では、L2（データリンク層）で何が起きているのか、なぜ MAC アドレスが必要なのか、そして IP→MAC の解決を担う <strong>ARP</strong> の仕組みを解説します。
      </p>

      <h2>MAC アドレスは「機器の固有番号」</h2>
      <p>
        MAC アドレス（Media Access Control address）は、ネットワーク機器の<strong>NIC（ネットワークインターフェイスカード）に焼き付けられた48bitの識別子</strong>です。出荷時に決まっており、原則変わりません（OS で擬似的に変更は可能）。
      </p>
      <pre><code>{`例: 00:1A:2B:3C:4D:5E
    └────┬────┘└────┬────┘
       OUI(製造元)  シリアル番号
       Apple, Cisco 等の識別     機器ごとに一意`}</code></pre>
      <p>
        前半 24bit は IEEE が管理する <strong>OUI（Organizationally Unique Identifier）</strong>で、メーカー固有。これを見れば「これは Apple 製品だな」「Cisco のルーターだな」と推測できます。
      </p>

      <h2>L2 と L3 の役割分担</h2>
      <p>
        IP（L3）と MAC（L2）の関係は次のように整理できます：
      </p>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>IP アドレス（L3）</th>
            <th>MAC アドレス（L2）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>使われる範囲</td>
            <td>インターネット全体</td>
            <td>同一ネットワーク内のみ</td>
          </tr>
          <tr>
            <td>長さ</td>
            <td>32bit (v4) / 128bit (v6)</td>
            <td>48bit</td>
          </tr>
          <tr>
            <td>変更</td>
            <td>サブネット移動時に変わる</td>
            <td>原則固定</td>
          </tr>
          <tr>
            <td>誰が決める</td>
            <td>ISP / 管理者 / DHCP</td>
            <td>NIC メーカー</td>
          </tr>
          <tr>
            <td>例</td>
            <td><code>192.168.1.10</code></td>
            <td><code>00:1A:2B:3C:4D:5E</code></td>
          </tr>
        </tbody>
      </table>
      <p>
        パケットが LAN 内を流れるときは、IP ヘッダーで「最終目的地」、Ethernet（L2）ヘッダーで「<strong>次にこのパケットを物理的に渡す相手</strong>」を指定しています。ルーターを経由するたびに L2 アドレスは書き換えられ、L3 アドレスは変わりません。
      </p>

      <h2>ARP: IP から MAC を解決する</h2>
      <p>
        では「<code>192.168.1.10</code> に送りたい」と思ったとき、その IP を持っている機器の MAC アドレスをどう知るか？ ここで <strong>ARP（Address Resolution Protocol）</strong>が登場します。
      </p>
      <pre><code>{`PC（送信者）が同一 LAN 内の 192.168.1.10 に送りたい

1. ARP Request をブロードキャスト
   "192.168.1.10 さん、MAC アドレス教えて！"
   宛先 MAC: ff:ff:ff:ff:ff:ff（全員に届く）

2. 192.168.1.10 を持っている PC が応答（ARP Reply）
   "私のMACは 00:1A:2B:3C:4D:5E です"
   送信者だけにユニキャスト

3. 送信者は IP→MAC のマッピングを ARP テーブルにキャッシュ
   以降そのキャッシュを使って通信`}</code></pre>
      <p>
        Linux/macOS で <code>arp -a</code>、Windows で <code>arp -a</code> とコマンドを打つと、現在覚えている ARP テーブルが見られます。
      </p>

      <h2>ARP テーブルのキャッシュ</h2>
      <p>
        毎回 ARP するとブロードキャストが大量に流れるので、<strong>ARP テーブルにキャッシュ</strong>されます。OS によって違いますが、通常 数分〜20分 程度で期限切れになり、再 ARP されます。
      </p>
      <p>
        サーバーを別の物理マシンに切り替えた直後、ネットワーク的につながらない時間が生じることがあります。これは古い ARP キャッシュが残っているためで、しばらくすれば自然に解決するか、<code>arp -d</code> でキャッシュをクリアすれば即座に直ります。
      </p>

      <h2>セキュリティ問題: ARP スプーフィング</h2>
      <p>
        ARP には<strong>認証の仕組みが一切ありません</strong>。攻撃者が「<code>192.168.1.1</code>（ゲートウェイ）の MAC は私です」という偽の ARP Reply を流すと、被害者の通信が攻撃者に流れてしまいます。これを <strong>ARP スプーフィング / ARP ポイズニング</strong>と呼びます。
      </p>
      <pre><code>{`正常: PC ─→ ゲートウェイ ─→ Internet

攻撃: PC ─→ 攻撃者(MITM) ─→ ゲートウェイ ─→ Internet
          ↑ ARP Reply で偽装し、通信を中継しながら盗聴・改ざん`}</code></pre>
      <p>
        対策：
      </p>
      <ul>
        <li>
          <strong>HTTPS / TLS</strong>: ARP スプーフィングされても暗号化されているので中身は読めない
        </li>
        <li>
          <strong>静的 ARP エントリ</strong>: 重要な機器の MAC を手動で固定（運用負荷大）
        </li>
        <li>
          <strong>Dynamic ARP Inspection（DAI）</strong>: 業務用スイッチの機能
        </li>
        <li>
          <strong>VPN を使う</strong>: 公衆 Wi-Fi でとくに有効
        </li>
      </ul>

      <h2>IPv6 では ARP が違う</h2>
      <p>
        IPv6 では ARP は使われず、代わりに <strong>NDP（Neighbor Discovery Protocol）</strong>が同じ役割を担います。NDP は ICMPv6 上で動き、ARP より洗練された機能（プレフィックス通知、自動構成、近隣到達性検出）を持ちます。
      </p>

      <h2>MAC アドレスのプライバシー問題</h2>
      <p>
        MAC アドレスは原則固定なので、店舗の Wi-Fi 等を使うと「同じ人が来た」と追跡可能です。これを防ぐため、最近のスマホ・PC は <strong>MAC アドレスランダム化</strong>機能を持っています：
      </p>
      <ul>
        <li>iOS: 設定 → Wi-Fi → 該当ネットワーク → プライベート Wi-Fi アドレス</li>
        <li>Android: ネットワークごとにランダム化（標準）</li>
        <li>Windows 10/11: ネットワーク設定 → 「ランダムなハードウェアアドレスを使う」</li>
      </ul>

      <h2>おわりに</h2>
      <p>
        日常では意識しない MAC アドレスと ARP ですが、トラブルシュートで <code>arp -a</code> の結果を読めるかどうかで切り分けの精度が大きく変わります。<strong>「同一 LAN 内の通信は MAC で動く、ルーターを越えるたびに MAC は書き換わる」</strong>という基本を押さえておくと、ネットワークの動きが立体的に理解できます。
      </p>
    </ArticleLayout>
  );
}
