import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "cidr-notation")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「/24」って何？</h2>
      <p>
        ネットワーク機器の設定や AWS のセキュリティグループを触っていると、<code>192.168.1.0/24</code> のような表記をよく目にします。この末尾の <code>/24</code> が <strong>CIDR（Classless Inter-Domain Routing）</strong>の記法です。
      </p>
      <p>
        最初は呪文に見えますが、仕組みを知ってしまえば 5 分で読めるようになります。
      </p>

      <h2>IPv4 アドレスは 32 bit</h2>
      <p>
        IPv4 アドレスは 0〜255 の数字を 4 つ並べた形で書きますが、内部的には<strong>32 bit（2 進数で 32 桁）</strong>の数値です。
      </p>
      <pre><code>{`192.168.1.10
↓ 各オクテットを 8bit 2 進数に
11000000.10101000.00000001.00001010
└─8bit─┘└─8bit─┘└─8bit─┘└─8bit─┘  = 32 bit`}</code></pre>

      <h2>CIDR の数字は「先頭何ビットがネットワーク部か」</h2>
      <p>
        CIDR 表記の <code>/N</code> は、<strong>32 bit のうち先頭 N bit が「ネットワーク部」、残りが「ホスト部」</strong>であることを示します。
      </p>
      <pre><code>{`192.168.1.0/24
   192.168.1 .  0
   ↓ 24 bit = ネットワーク部
   ↓ 残り 8 bit = ホスト部
ネットワーク: 192.168.1.0
ホスト範囲:   192.168.1.0 〜 192.168.1.255`}</code></pre>
      <p>
        つまり <code>/24</code> は「同じ <code>192.168.1.x</code> グループに属する 256 個のアドレス」を表しています。
      </p>

      <h2>サブネットマスクとの関係</h2>
      <p>
        昔の表記では <code>192.168.1.0/255.255.255.0</code> のように<strong>サブネットマスク</strong>を書いていました。これは「ネットワーク部の bit を 1、ホスト部の bit を 0 にした 32bit の値」です。
      </p>
      <pre><code>{`/24 = 11111111.11111111.11111111.00000000 = 255.255.255.0
/16 = 11111111.11111111.00000000.00000000 = 255.255.0.0
/8  = 11111111.00000000.00000000.00000000 = 255.0.0.0`}</code></pre>
      <p>
        CIDR 記法はこれを「先頭の 1 が何個あるか」で表現するだけで、本質は同じです。<code>/24</code> も <code>255.255.255.0</code> も同じ意味です。
      </p>

      <h2>ホスト数の計算</h2>
      <p>
        ホスト部が H bit なら、そのネットワーク内のアドレスは <strong>2^H 個</strong>です。
      </p>
      <table>
        <thead>
          <tr>
            <th>CIDR</th>
            <th>サブネットマスク</th>
            <th>総アドレス数</th>
            <th>使用可能ホスト数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>/24</td>
            <td>255.255.255.0</td>
            <td>256</td>
            <td>254</td>
          </tr>
          <tr>
            <td>/25</td>
            <td>255.255.255.128</td>
            <td>128</td>
            <td>126</td>
          </tr>
          <tr>
            <td>/26</td>
            <td>255.255.255.192</td>
            <td>64</td>
            <td>62</td>
          </tr>
          <tr>
            <td>/30</td>
            <td>255.255.255.252</td>
            <td>4</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
      <p>
        「使用可能ホスト数」が「総数 - 2」になっているのは、各ネットワークで以下の 2 アドレスが特殊用途に予約されているためです：
      </p>
      <ul>
        <li>
          <strong>ネットワークアドレス</strong>（先頭、ホスト部全部 0）: そのネットワーク自体を指す。例: <code>192.168.1.0</code>
        </li>
        <li>
          <strong>ブロードキャストアドレス</strong>（末尾、ホスト部全部 1）: そのネットワーク内全員に送る用。例: <code>192.168.1.255</code>
        </li>
      </ul>

      <h2>/31 と /32 はなぜ特別か</h2>
      <p>
        通常「総アドレス - 2」がホスト数ですが、<strong>/31 と /32 だけ例外</strong>です。
      </p>
      <ul>
        <li>
          <code>/32</code>: ホスト部 0 bit、つまり <strong>1 アドレスだけ</strong>のネットワーク。AWS の Security Group で「特定の IP からのみ許可」する用途で頻出
        </li>
        <li>
          <code>/31</code>: ホスト部 1 bit、つまり <strong>2 アドレスだけ</strong>。本来「総数 - 2 = 0 ホスト」になり使えないはずだが、<strong>RFC 3021</strong> で「point-to-point リンクでは2アドレス両方をホストに使ってよい」と特別に定義された
        </li>
      </ul>
      <p>
        ルーター間の直結リンク（P2P リンク）でアドレス節約のために <code>/31</code> を使うのが現代の流儀です。古い機器では対応していないこともあるので、<code>/30</code>（2 ホスト + ネットワーク + ブロードキャスト = 4 アドレス）を使うこともあります。
      </p>

      <h2>CIDR の実用シーン</h2>
      <p>初学者がよく出会う場面：</p>
      <ul>
        <li>
          <strong>VPC のサブネット設計</strong>（AWS / GCP / Azure）: <code>10.0.0.0/16</code> を <code>/24</code> 単位で複数の AZ に分割する、等
        </li>
        <li>
          <strong>ファイアウォール / Security Group</strong>: 「<code>0.0.0.0/0</code> から HTTPS を許可」「<code>10.0.0.0/8</code> から SSH を許可」のような ACL ルール
        </li>
        <li>
          <strong>VPN / IPsec の通信対象指定</strong>
        </li>
        <li>
          <strong>DHCP の払い出し範囲指定</strong>
        </li>
      </ul>
      <p>
        どの場面でも <strong>CIDR ブロックのサイズ感（/24 ≒ 254 ホスト、/16 ≒ 65000 ホスト）</strong> が頭に入っていると話が早く進みます。
      </p>

      <h2>プライベートアドレス（RFC 1918）</h2>
      <p>
        インターネット上で使われない、社内ネットワーク用に予約されたアドレス帯：
      </p>
      <ul>
        <li>
          <code>10.0.0.0/8</code> （約 1670 万アドレス、大企業向け）
        </li>
        <li>
          <code>172.16.0.0/12</code> （約 100 万アドレス、中規模）
        </li>
        <li>
          <code>192.168.0.0/16</code> （約 6.5 万アドレス、家庭・小規模）
        </li>
      </ul>
      <p>
        家庭用ルーターのデフォルト LAN が <code>192.168.0.0/24</code> や <code>192.168.1.0/24</code> なのは、この RFC 1918 の慣習に従っているためです。
      </p>

      <h2>おわりに</h2>
      <p>
        CIDR は最初は分かりにくいですが、<strong>「/N の N は先頭何 bit がネットワーク部か」</strong> さえ覚えれば、あとは桁を数えるだけです。
      </p>
      <p>
        本サイトの CIDR / Subnet Calculator では、CIDR を入れると即座にネットワーク・ブロードキャスト・ホスト範囲・マスク・ワイルドカードを表示します。慣れるまでは手元で確認しながら使ってみてください。
      </p>
    </ArticleLayout>
  );
}
