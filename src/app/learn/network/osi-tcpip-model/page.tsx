import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "osi-tcpip-model")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「L4」「L7 ロードバランサ」って何の話？</h2>
      <p>
        ネットワーク機器の話で「L2 スイッチ」「L4 ロードバランサ」「L7 でルーティング」のような表現が出てきます。この「L◯」の正体が <strong>OSI 参照モデル（OSI Reference Model）</strong>の階層です。
      </p>
      <p>
        この記事では OSI 7 層モデルと、実装上は支配的な TCP/IP モデルの両方を整理し、「どの層で何が起きているのか」を初学者向けに俯瞰します。
      </p>

      <h2>なぜ階層に分けるのか</h2>
      <p>
        ネットワーク通信は「電気信号で 0/1 を送る」から「メールアドレスで相手にメッセージを届ける」まで、抽象度が大きく違う処理を組み合わせて実現されています。これを 1 つのプログラムで全部書くと、変更が困難で保守できないコードになります。
      </p>
      <p>
        そこで <strong>「各層は隣接する層の機能だけ使い、上下の中身は気にしない」</strong> という設計原則で分割します。たとえば HTTP は「TCP がデータを確実に届けてくれる」前提で動き、TCP は「IP がパケットを宛先に運んでくれる」前提で動きます。下の層が変わっても上の層は影響を受けません（HTTP はそのままで Ethernet → Wi-Fi に変えても動く）。
      </p>

      <h2>OSI 参照モデル（7 層）</h2>
      <p>
        ISO が標準化した「理論上の理想モデル」で、教科書や試験問題で頻出です。下から順に：
      </p>
      <table>
        <thead>
          <tr>
            <th>層</th>
            <th>名称</th>
            <th>役割</th>
            <th>代表プロトコル / 機器</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>L7</td>
            <td>Application</td>
            <td>アプリ向けの通信</td>
            <td>HTTP / HTTPS / SMTP / DNS / SSH</td>
          </tr>
          <tr>
            <td>L6</td>
            <td>Presentation</td>
            <td>データの表現・変換</td>
            <td>TLS の暗号化、文字エンコード</td>
          </tr>
          <tr>
            <td>L5</td>
            <td>Session</td>
            <td>会話の確立・維持・終了</td>
            <td>TLS のセッション、NetBIOS</td>
          </tr>
          <tr>
            <td>L4</td>
            <td>Transport</td>
            <td>End-to-End の通信</td>
            <td>TCP / UDP</td>
          </tr>
          <tr>
            <td>L3</td>
            <td>Network</td>
            <td>論理アドレッシング・ルーティング</td>
            <td>IP（IPv4 / IPv6）/ ICMP / ルーター</td>
          </tr>
          <tr>
            <td>L2</td>
            <td>Data Link</td>
            <td>同一ネットワーク内の伝送</td>
            <td>Ethernet / Wi-Fi / MAC アドレス / スイッチ</td>
          </tr>
          <tr>
            <td>L1</td>
            <td>Physical</td>
            <td>物理的な信号の伝送</td>
            <td>ケーブル / コネクタ / 電波 / ハブ</td>
          </tr>
        </tbody>
      </table>
      <p>
        記憶の小ネタとして、英語の各層の頭文字を「<strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way」（L1→L7）と覚える定番フレーズがあります。
      </p>

      <h2>TCP/IP モデル（4 層）</h2>
      <p>
        実装上は「OSI の L5・L6 はあまり明確に分かれていない」「L1・L2 もまとめて1つで考えることが多い」という実態があり、業界で広く使われるのは <strong>TCP/IP 4 層モデル</strong>です。
      </p>
      <table>
        <thead>
          <tr>
            <th>層</th>
            <th>OSI で言うと</th>
            <th>代表プロトコル</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Application</td>
            <td>L5-L7</td>
            <td>HTTP / SMTP / DNS / SSH / TLS</td>
          </tr>
          <tr>
            <td>Transport</td>
            <td>L4</td>
            <td>TCP / UDP</td>
          </tr>
          <tr>
            <td>Internet</td>
            <td>L3</td>
            <td>IP / ICMP / ARP*</td>
          </tr>
          <tr>
            <td>Link / Network Access</td>
            <td>L1-L2</td>
            <td>Ethernet / Wi-Fi / PPP</td>
          </tr>
        </tbody>
      </table>
      <p>
        * ARP は厳密には L2/L3 の境界に位置する補助プロトコル。
      </p>

      <h2>カプセル化のイメージ</h2>
      <p>
        実際の通信では、上の層のデータを下の層が「自分のヘッダーを付けて包む」処理を行います。これを<strong>カプセル化（encapsulation）</strong>と呼びます。
      </p>
      <pre><code>{`L7  [ HTTP リクエスト        ]
L4  [ TCP ヘッダ | HTTP      ]
L3  [ IP ヘッダ | TCP | HTTP ]
L2  [ Eth ヘッダ | IP | TCP | HTTP | Eth トレーラ ]
L1  電気信号として送信`}</code></pre>
      <p>
        受信側は逆順にヘッダーを剥がして上の層に渡していきます（脱カプセル化）。
      </p>

      <h2>「L4 / L7」が指すもの</h2>
      <p>
        ロードバランサや WAF の文脈で「L4」「L7」と言うとき、それぞれ次のようなニュアンスです：
      </p>
      <ul>
        <li>
          <strong>L4 ロードバランサ</strong>: TCP/UDP のヘッダー（IP / ポート）だけ見て振り分ける。中身（HTTP の URL 等）は見ない / 見られない。高速・軽量。AWS NLB
        </li>
        <li>
          <strong>L7 ロードバランサ</strong>: TLS を終端し HTTP の中身まで見て振り分ける。URL / ヘッダー / Cookie でルーティング可能。AWS ALB / Nginx / Envoy
        </li>
      </ul>

      <h2>各層の代表的な攻撃</h2>
      <p>
        セキュリティの視点でも「攻撃が成立する層」を意識すると整理しやすくなります：
      </p>
      <ul>
        <li>
          <strong>L1-L2</strong>: ARP スプーフィング、MAC アドレスフラッディング、Wi-Fi 盗聴
        </li>
        <li>
          <strong>L3</strong>: IP スプーフィング、ICMP Flood
        </li>
        <li>
          <strong>L4</strong>: SYN Flood、UDP amplification 攻撃
        </li>
        <li>
          <strong>L7</strong>: XSS / SQLi / CSRF / HTTP Flood
        </li>
      </ul>
      <p>
        ファイアウォールも層ごとに役割分担があります（L3/L4 のパケットフィルタリング、L7 の WAF）。
      </p>

      <h2>おわりに</h2>
      <p>
        実装上は TCP/IP モデルで考えれば十分ですが、<strong>OSI 7 層モデルは共通言語として現役</strong>です。L◯ という言い回しに出会ったら、即座にどの層の話か思い出せるようにしておくと、ネットワーク機器のスペック表や障害切り分けの会話が一気に楽になります。
      </p>
      <p>
        当サイトの他の解説記事も、TCP / UDP は L4、IP / CIDR は L3、HTTPS / TLS は L4 〜 L7 にまたがる、という位置関係で読み返してみると理解が深まります。
      </p>
    </ArticleLayout>
  );
}
