import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "dhcp-basics")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「IP アドレス、誰が決めてるの？」</h2>
      <p>
        家の Wi-Fi につなぐと自動で IP アドレスが割り振られ、ネットができます。会社のオフィスでも同じです。誰も手動で IP を入力していないのに、なぜ動くのでしょうか？
      </p>
      <p>
        この陰の立役者が <strong>DHCP（Dynamic Host Configuration Protocol）</strong>です。地味ですが、なくなった瞬間に LAN 全体が機能しなくなるくらい重要な仕組みです。
      </p>

      <h2>DHCP は「IP アドレスの配布係」</h2>
      <p>
        DHCP サーバーは LAN 内に必ず 1 台（家庭ならルーターが兼任）あり、新しいデバイスがネットワークに参加するときに IP アドレスとその他の設定を自動的に渡します。
      </p>
      <p>
        渡される情報は IP アドレスだけではありません：
      </p>
      <ul>
        <li>IP アドレス（例: 192.168.1.10）</li>
        <li>サブネットマスク（例: 255.255.255.0）</li>
        <li>デフォルトゲートウェイ（ルーターの IP、例: 192.168.1.1）</li>
        <li>DNS サーバーアドレス（例: 1.1.1.1）</li>
        <li>リース期間（このアドレスを使ってよい時間）</li>
      </ul>

      <h2>DORA: 4ステップの IP 取得</h2>
      <p>
        DHCP の中核は <strong>DORA（ドラ）</strong> と呼ばれる4ステップの会話です：
      </p>
      <pre><code>{`PC（新規参加）                          DHCP サーバー
   |                                          |
   |  ① Discover（誰かいませんか〜？）         |
   |  ──────ブロードキャスト─────────────→  |
   |                                          |
   |  ② Offer（こちらの IP どうですか？）     |
   |  ←─────ブロードキャスト or ユニキャスト─ |
   |                                          |
   |  ③ Request（その IP もらいます！）       |
   |  ──────ブロードキャスト─────────────→  |
   |                                          |
   |  ④ Ack（OK、確定です）                   |
   |  ←─────ユニキャスト─────────────────  |
   |                                          |
   ↓ IP 取得完了、通信開始`}</code></pre>

      <h3>各ステップの詳細</h3>
      <ol>
        <li>
          <strong>DHCP Discover</strong>: PC が起動直後、まだ IP を持っていない状態で「誰か助けて」とブロードキャストする。送信元は <code>0.0.0.0</code>、宛先は <code>255.255.255.255</code>
        </li>
        <li>
          <strong>DHCP Offer</strong>: DHCP サーバーが「<code>192.168.1.10</code> を使ってください、リース期間は 24 時間です、ゲートウェイは...」と提案。複数の DHCP サーバーがいると複数 Offer が来る
        </li>
        <li>
          <strong>DHCP Request</strong>: クライアントは届いた Offer の中から1つを選び、「これを正式にもらいます」と公式リクエスト。他のサーバーには「あなたのは要りません」となる
        </li>
        <li>
          <strong>DHCP Ack</strong>: サーバーが「確定」と返事。クライアントはここでようやく IP を使い始める
        </li>
      </ol>

      <h2>リース期間とリリース</h2>
      <p>
        DHCP で取得した IP には<strong>有効期限（リース期間）</strong>があります。家庭用だと数時間〜1日が一般的。期限が来る前に更新（renew）リクエストを送り、サーバーが OK すればリースが延長されます。
      </p>
      <ul>
        <li>
          <strong>リース期間が短い</strong>（例: 1 時間）: ネットワーク参加・離脱が頻繁な環境（カフェ・空港）向け
        </li>
        <li>
          <strong>リース期間が長い</strong>（例: 7 日）: オフィス内の固定 PC 向け、サーバー負荷軽減
        </li>
      </ul>
      <p>
        PC をシャットダウンするときに <code>dhclient -r</code> 等で明示的にリースを解放するとサーバーは即座にそのアドレスを再利用できますが、多くの環境では明示解放せずリース期間で管理しています。
      </p>

      <h2>DHCP リレー: 複数サブネット対応</h2>
      <p>
        DHCP Discover はブロードキャストなので、原則同じ LAN 内にしか届きません。複数サブネットがある企業ネットワークでは、各サブネットに DHCP サーバーを置くと運用が大変です。
      </p>
      <p>
        そこで <strong>DHCP リレーエージェント</strong>が登場。各ルーターが DHCP Discover を中央の DHCP サーバーへ「中継」してくれる仕組みです。
      </p>

      <h2>静的割当 vs 動的割当</h2>
      <p>
        プリンタやサーバー等、IP が変わると困る機器は固定 IP を使いたいものです。選択肢：
      </p>
      <ol>
        <li>
          <strong>機器側で静的設定</strong>: OS で「IP は 192.168.1.50」と手動入力
        </li>
        <li>
          <strong>DHCP の予約</strong>（推奨）: DHCP サーバー側で「この MAC アドレスにはいつも 192.168.1.50 を渡す」と予約
        </li>
      </ol>
      <p>
        2 の方が一元管理しやすく、ルーター設定で完結するため運用上推奨されます。
      </p>

      <h2>セキュリティ問題: ローグ DHCP サーバー</h2>
      <p>
        DHCP には<strong>認証の仕組みがありません</strong>。攻撃者が悪意ある DHCP サーバーを LAN に持ち込むと、新規参加デバイスに次のような情報を渡せます：
      </p>
      <ul>
        <li>
          <strong>偽のデフォルトゲートウェイ</strong>: 全通信を攻撃者経由（中間者攻撃）
        </li>
        <li>
          <strong>偽の DNS サーバー</strong>: 偽サイトへ誘導（ファーミング攻撃）
        </li>
      </ul>
      <p>
        対策：
      </p>
      <ul>
        <li>
          <strong>業務用スイッチの DHCP Snooping</strong>: 信頼するポートからしか DHCP Offer を受け付けない
        </li>
        <li>
          公衆 Wi-Fi では <strong>VPN を使う</strong>
        </li>
        <li>
          <strong>HTTPS / HSTS の徹底</strong>: 暗号化と証明書検証で MITM が無効化される
        </li>
      </ul>

      <h2>DHCP が止まると何が起きるか</h2>
      <p>
        家庭用ルーターの DHCP 機能が停止すると、新しい機器がつながらなくなります。すでに接続中の機器はリース期間が切れるまで通信できますが、それ以降は順次脱落します。
      </p>
      <p>
        トラブル時の応急処置として、PC 側で IP・サブネットマスク・ゲートウェイを<strong>手動設定</strong>すれば一時的に通信できます。Windows なら「コントロールパネル → ネットワーク」、macOS なら「ネットワーク環境設定」で設定可能。
      </p>

      <h2>診断コマンド</h2>
      <ul>
        <li>
          <strong>Linux</strong>: <code>dhclient -v eth0</code> で詳細ログ付き取得
        </li>
        <li>
          <strong>macOS</strong>: <code>ipconfig getpacket en0</code> で取得した DHCP パケット内容表示
        </li>
        <li>
          <strong>Windows</strong>: <code>ipconfig /all</code> でリース期間・DHCP サーバー IP 等を確認、<code>ipconfig /release</code> + <code>/renew</code> で再取得
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        DHCP は<strong>「黙って動いていれば誰も気づかないが、止まると全員困る」</strong>典型的なインフラサービスです。トラブルシュートでは「DHCP サーバーは動いているか」「リース範囲は枯渇していないか」「DHCP リレーは正しく設定されているか」を切り分けると、原因にたどり着きやすくなります。
      </p>
    </ArticleLayout>
  );
}
