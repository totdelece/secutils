import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "icmp-ping-traceroute")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「サーバー繋がらない」を切り分ける3点セット</h2>
      <p>
        サービスがダウンしたとき、まず最初に確認するのが <strong>ping</strong>、続いて <strong>traceroute</strong>、そして両者の土台となる <strong>ICMP</strong> プロトコル。これらは <a href="/learn/network/osi-tcpip-model">L3</a> での「ネットワーク疎通の状態」を確認する基本ツールです。
      </p>
      <p>
        この記事では、ICMP の正体と、ping / traceroute の仕組み、結果の読み方を初学者向けに整理します。
      </p>

      <h2>ICMP は「ネットワークの便り」</h2>
      <p>
        ICMP（Internet Control Message Protocol）は、IP の補助として動く<strong>制御・診断用のプロトコル</strong>です。データを運ぶ目的ではなく、「宛先に届かなかったよ」「TTL が切れたよ」のようなネットワーク状態の通知に使われます。
      </p>
      <p>
        ICMP は IP の上で動きますが、TCP や UDP のような<strong>ポート番号は持ちません</strong>（IP プロトコル番号 1）。代わりに「Type」と「Code」というフィールドでメッセージの種類を識別します。
      </p>
      <p>代表的な ICMPv4 のタイプ：</p>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>名称</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>Echo Reply</td>
            <td>ping の返事</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Destination Unreachable</td>
            <td>宛先不到達（ホストなし、ポート閉、FW拒否等）</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Echo Request</td>
            <td>ping の問い合わせ</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Time Exceeded</td>
            <td>TTL 切れ（traceroute が利用）</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Parameter Problem</td>
            <td>IP ヘッダー不正</td>
          </tr>
        </tbody>
      </table>

      <h2>ping: 一番シンプルな疎通確認</h2>
      <p>
        ping は <code>Echo Request</code>（Type 8）を送って、相手が <code>Echo Reply</code>（Type 0）を返すかを見るだけのツールです。返事が来れば「ネットワーク的には届いている」、返事がなければ「どこかで止まっている」と分かります。
      </p>
      <pre><code>{`$ ping example.com
PING example.com (93.184.215.14): 56 data bytes
64 bytes from 93.184.215.14: icmp_seq=0 ttl=56 time=12.345 ms
64 bytes from 93.184.215.14: icmp_seq=1 ttl=56 time=11.987 ms
64 bytes from 93.184.215.14: icmp_seq=2 ttl=56 time=12.012 ms

--- example.com ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.987/12.115/12.345/0.158 ms`}</code></pre>
      <p>結果から読み取れること：</p>
      <ul>
        <li>
          <strong>time</strong>（往復時間, RTT）: 12ms ならネットワーク的に近い、200ms 超なら海外経由か無線が悪い
        </li>
        <li>
          <strong>ttl</strong>: 受信時の TTL から逆算してホップ数を推測（ttl=56 なら初期値64-56 = 8ホップ程度）
        </li>
        <li>
          <strong>packet loss</strong>: 0% が理想。数% でも長期通信では深刻な品質劣化
        </li>
        <li>
          <strong>stddev</strong>（ジッタ）: ばらつきが大きいと音声通話・ゲームで支障
        </li>
      </ul>

      <h2>ping が返ってこない = 落ちている、とは限らない</h2>
      <p>
        ping が返らないとき、即「サーバー死亡」と判断するのは早計です。次の可能性があります：
      </p>
      <ul>
        <li>
          <strong>ICMP がファイアウォールで遮断</strong>されている: AWS のセキュリティグループはデフォルトで ICMP を許可しない。クラウド上のサーバーは ping 不通でも HTTP は元気、というケース多数
        </li>
        <li>
          <strong>サーバー OS で ICMP 応答を無効化</strong>している（セキュリティポリシー）
        </li>
        <li>
          <strong>経路上のルーターが ICMP を捨てている</strong>
        </li>
      </ul>
      <p>
        本番のサーバー監視では、ping だけでなく <code>curl https://example.com/healthz</code> のような<strong>実際のサービス層</strong>での疎通を見るべきです。
      </p>

      <h2>traceroute: 経路を可視化する</h2>
      <p>
        traceroute は<strong>パケットがどんな経路でサーバーに届いているか</strong>を表示するツールです。「自宅 → ISP → 海底ケーブル → 米国 → サーバー」のような経路が hop ごとに見えます。
      </p>
      <pre><code>{`$ traceroute example.com
 1  router.local (192.168.1.1)         1.234 ms
 2  10.0.0.1 (10.0.0.1)                5.678 ms
 3  isp-gateway-01.example-isp.jp       8.901 ms
 4  jp-tokyo-edge.example-isp.jp       12.345 ms
 5  * * *
 6  us-la-edge.upstream-tier1.net      120.456 ms
 7  edge.example.com (93.184.215.14)   122.789 ms`}</code></pre>

      <h3>仕組み: TTL を意図的に小さくする</h3>
      <p>
        traceroute の賢いところは、<strong>TTL（Time To Live）の仕組みを利用する</strong>点です。
      </p>
      <ol>
        <li>TTL=1 のパケットを送る → 最初のルーターで TTL=0 になり、Type 11（Time Exceeded）を返してくる
        </li>
        <li>TTL=2 → 2番目のルーターから返事
        </li>
        <li>TTL=3 → 3番目のルーター
        </li>
        <li>...宛先に届くまで繰り返す</li>
      </ol>
      <p>
        各 hop の応答元 IP を記録することで、経路全体が見えるという仕組みです。
      </p>

      <h3>結果の読み方</h3>
      <ul>
        <li>
          <strong>* * *</strong>: そのルーターが ICMP を返さない設定。経路自体は通っている可能性が高い
        </li>
        <li>
          <strong>急に時間が跳ねる hop</strong>: その間に長距離ホップ（海底ケーブル等）がある
        </li>
        <li>
          <strong>途中で止まる</strong>: ルーティング切れ・FW 遮断・経路 BGP 障害の可能性
        </li>
      </ul>

      <h3>OS 別の細かい違い</h3>
      <ul>
        <li>
          <strong>Linux / macOS の <code>traceroute</code></strong>: デフォルトで UDP を使い、宛先からの ICMP Port Unreachable で終端を検知
        </li>
        <li>
          <strong>Windows の <code>tracert</code></strong>: ICMP Echo Request を使う
        </li>
        <li>
          <strong>mtr</strong>: traceroute + ping を継続実行する強化版。ロス率が見やすい
        </li>
      </ul>

      <h2>「Smurf 攻撃」と ICMP 制限</h2>
      <p>
        昔の DDoS 手法で、送信元を被害者に偽装した ICMP Echo Request をブロードキャストアドレスに送り、大量の Echo Reply を被害者に殺到させる「Smurf 攻撃」というものがありました。これに対抗するため、現代のルーターは <strong>ICMP Echo へのブロードキャスト応答を無効化</strong>しています。
      </p>
      <p>
        サーバー側で ICMP を制限する場合も、<strong>「全部捨てる」ではなく Type 3（Destination Unreachable）と Type 11（Time Exceeded）は通す</strong>のが推奨です。これらを完全遮断すると Path MTU Discovery が動かなくなり、特定のパケットサイズで通信が詰まる「PMTU ブラックホール」現象を起こします。
      </p>

      <h2>覚えておきたいコマンド早見表</h2>
      <table>
        <thead>
          <tr>
            <th>用途</th>
            <th>Linux / macOS</th>
            <th>Windows</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>疎通確認</td>
            <td><code>ping example.com</code></td>
            <td><code>ping example.com</code></td>
          </tr>
          <tr>
            <td>経路調査</td>
            <td><code>traceroute example.com</code></td>
            <td><code>tracert example.com</code></td>
          </tr>
          <tr>
            <td>継続的経路監視</td>
            <td><code>mtr example.com</code></td>
            <td><code>pathping example.com</code></td>
          </tr>
          <tr>
            <td>ポート疎通</td>
            <td><code>nc -zv example.com 443</code></td>
            <td><code>Test-NetConnection example.com -Port 443</code></td>
          </tr>
        </tbody>
      </table>

      <h2>おわりに</h2>
      <p>
        「ping が通らない」は便利な切り分け情報ですが、ICMP は途中で遮断されることが多いプロトコルなので、<strong>ping だけで判断しない</strong>のが現代的な作法です。実サービスのエンドポイントへの HTTP 確認や、明示的なポートチェック（<code>nc</code> / <code>curl</code> / <code>Test-NetConnection</code>）を組み合わせて、レイヤごとに切り分けていくのが正しいアプローチです。
      </p>
    </ArticleLayout>
  );
}
