import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "ipv4-vs-ipv6")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「IPv4 が枯渇した」と言われ続けて何年か</h2>
      <p>
        2011 年に IANA の IPv4 アドレスプールが枯渇してから 10 数年。「次は IPv6！」と言われ続けながら、なかなか完全移行しないまま現在に至ります。
      </p>
      <p>
        この記事では、IPv4 と IPv6 の違いを<strong>初学者向け</strong>に整理し、なぜ普及が進んでいるのか、自分のサービスで IPv6 対応すべきかを考える材料を提供します。
      </p>

      <h2>圧倒的に違うのはアドレス長</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>IPv4</th>
            <th>IPv6</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>アドレス長</td>
            <td>32 bit</td>
            <td>128 bit</td>
          </tr>
          <tr>
            <td>総アドレス数</td>
            <td>約 43 億</td>
            <td>約 340 澗（3.4 × 10^38）</td>
          </tr>
          <tr>
            <td>表記</td>
            <td><code>192.168.1.10</code></td>
            <td><code>2001:db8::1</code></td>
          </tr>
        </tbody>
      </table>
      <p>
        IPv6 のアドレス空間は事実上無限と言ってよく、<strong>地球上のすべての砂粒に IP を割り当てても余る</strong>と言われます。
      </p>

      <h2>IPv6 アドレスの読み方</h2>
      <p>
        128bit を 16 進数 4 桁ずつ「:」で区切って書きます：
      </p>
      <pre><code>{`2001:0db8:0000:0000:0000:ff00:0042:8329
└─16bit─┘└─16bit─┘└─16bit─┘└─16bit─┘└─16bit─┘└─16bit─┘└─16bit─┘└─16bit─┘
                        計 128bit`}</code></pre>
      <p>
        長いので<strong>省略表記</strong>のルールがあります：
      </p>
      <ul>
        <li>各ブロックの<strong>先頭の 0 は省略</strong>: <code>0db8 → db8</code></li>
        <li>連続する 0 のブロックは <strong><code>::</code></strong> で 1 回だけ省略可能</li>
      </ul>
      <pre><code>{`完全形:  2001:0db8:0000:0000:0000:ff00:0042:8329
省略後:  2001:db8::ff00:42:8329

完全形:  fe80:0000:0000:0000:0000:0000:0000:0001
省略後:  fe80::1`}</code></pre>

      <h2>IPv6 のアドレス種類</h2>
      <table>
        <thead>
          <tr>
            <th>プレフィックス</th>
            <th>用途</th>
            <th>IPv4 で言うと</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>2000::/3</code></td>
            <td>グローバルユニキャスト</td>
            <td>普通のグローバルIP</td>
          </tr>
          <tr>
            <td><code>fc00::/7</code></td>
            <td>ULA（Unique Local）</td>
            <td>RFC 1918（プライベート）</td>
          </tr>
          <tr>
            <td><code>fe80::/10</code></td>
            <td>リンクローカル</td>
            <td>169.254.0.0/16</td>
          </tr>
          <tr>
            <td><code>ff00::/8</code></td>
            <td>マルチキャスト</td>
            <td>224.0.0.0/4</td>
          </tr>
          <tr>
            <td><code>::1</code></td>
            <td>ループバック</td>
            <td>127.0.0.1</td>
          </tr>
          <tr>
            <td><code>::</code></td>
            <td>未指定</td>
            <td>0.0.0.0</td>
          </tr>
        </tbody>
      </table>

      <h2>IPv6 で何が変わるか</h2>
      <h3>① NAT が原則不要</h3>
      <p>
        アドレスが豊富にあるので、すべての機器にグローバルアドレスを直接割り当てられます。<a href="/learn/network/nat-port-forwarding">NAT が要らない</a>と、P2P 通信や自宅サーバー公開がぐっと楽になります。
      </p>

      <h3>② SLAAC による自動構成</h3>
      <p>
        IPv6 では <strong>SLAAC（Stateless Address Autoconfiguration）</strong>という仕組みで、DHCP サーバーがなくても自動的にアドレス取得できます。ルーターが流すプレフィックス + 自分の MAC アドレスから生成する仕組みです。
      </p>
      <p>
        家庭で IPv6 が使えるルーターを買うと、設定なしで全機器に IPv6 アドレスが振られているのはこのためです。
      </p>

      <h3>③ ヘッダーがシンプル化</h3>
      <p>
        IPv4 ヘッダーは可変長で複雑でしたが、IPv6 では<strong>固定長 40 バイト</strong>に整理されました。途中ルーターでのチェックサム計算もなくなり、ルーティング処理が高速化しています。
      </p>

      <h3>④ IPsec が組み込み（建前）</h3>
      <p>
        IPv6 仕様では IPsec が標準実装でした（RFC 6434 で必須から推奨に格下げ）。実運用では IPv4 と同じく<strong>必要な部分にだけ TLS / VPN を被せる</strong>運用が一般的です。
      </p>

      <h3>⑤ ARP が NDP に</h3>
      <p>
        IPv6 では ARP の代わりに <strong>NDP（Neighbor Discovery Protocol）</strong>が使われます。仕組みは似ていますが、ICMPv6 上で動き、プレフィックス通知や近隣到達性検出など機能が増えています。
      </p>

      <h2>移行が進まない理由</h2>
      <p>
        理論的には IPv6 の方が優れていますが、移行は遅々として進みません。理由：
      </p>
      <ul>
        <li>
          <strong>NAT で誤魔化せる</strong>: IPv4 + NAT で当面困らない
        </li>
        <li>
          <strong>レガシー機器・ソフト</strong>: 古いシステムの IPv6 対応コスト
        </li>
        <li>
          <strong>運用ノウハウ不足</strong>: トラブル時に切り分けできるエンジニアが少ない
        </li>
        <li>
          <strong>キャリアグレード NAT で延命</strong>
        </li>
      </ul>
      <p>
        ただしモバイル網（携帯各社）は積極的に IPv6 化しており、Google や Apple のサービスは早くから IPv6 対応済み。<strong>静かに移行は進んでいる</strong>のが現状です。
      </p>

      <h2>デュアルスタックという中間策</h2>
      <p>
        多くの環境は <strong>IPv4 と IPv6 を両方話す「デュアルスタック」</strong>で運用されています。OS は両方のアドレスを取得し、通信時にはどちらかを選びます（DNS の応答にどちらが含まれているか、Happy Eyeballs アルゴリズムで速い方を選ぶ等）。
      </p>
      <p>
        サーバーで IPv6 対応するときも、まず<strong>IPv4 と IPv6 両方で受け付けるデュアルスタック設定</strong>から始めるのが定石です。
      </p>

      <h2>セキュリティ視点</h2>
      <ul>
        <li>
          <strong>IPv6 はスキャンされにくい</strong>: アドレス空間が広すぎて全数スキャンが現実的でない（IPv4 なら数時間で全 4G 個スキャン可能）
        </li>
        <li>
          <strong>逆に「直接アクセス可能」になる</strong>: NAT で隠れていた機器が剥き出しになる。明示的なファイアウォールが必須
        </li>
        <li>
          <strong>家庭ルーターの IPv6 ファイアウォール設定</strong>を確認しよう。多くの製品は適切にブロックしているが要確認
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        IPv6 は<strong>「IPv4 + アルファ」ではなく、ある意味別物のプロトコル</strong>です。アドレスの考え方、自動構成、近隣探索、すべて IPv4 と異なります。今すぐ移行する必要はなくても、<strong>「自分のサービスで IPv6 アクセスログがどう見えるか」</strong>を一度確認しておくと、移行が必要になったときに慌てずに済みます。
      </p>
    </ArticleLayout>
  );
}
