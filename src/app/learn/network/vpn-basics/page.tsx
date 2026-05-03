import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "vpn-basics")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「VPN を使うと安全」って本当？</h2>
      <p>
        広告で「VPN で通信を暗号化！」「VPN で海外動画を見よう！」とよく見かけます。何となく便利そう、というイメージはあっても、<strong>VPN が実際に何をしてくれるのか</strong>は意外と説明しづらいものです。
      </p>
      <p>
        この記事では、VPN の本質的な仕組み（トンネリング + 暗号化）と、代表的なプロトコル、そしてゼロトラスト時代における VPN の位置づけを整理します。
      </p>

      <h2>VPN は「仮想的な専用線」</h2>
      <p>
        VPN（Virtual Private Network）の名前の通り、<strong>インターネット上に仮想的なプライベートネットワークを作る</strong>技術です。
      </p>
      <p>
        本物の専用線（物理的に敷いた光ファイバー）は確実に安全ですが、敷設費用が膨大です。VPN は既存のインターネットを通しつつ、暗号化と認証で「仮想的にプライベート」な通信路を実現します。
      </p>

      <h2>2 つの主な使い方</h2>
      <h3>① リモートアクセス VPN（個人 → 会社など）</h3>
      <p>
        在宅勤務で「会社のイントラネットに繋がる」のがこのタイプ。PC から会社の VPN ゲートウェイへトンネルを張り、社内リソース（社内 Wiki・DB・社内システム）にアクセスできます。
      </p>
      <pre><code>{`自宅PC ──── 暗号化トンネル ───→ 会社VPNゲートウェイ ──→ 社内NW`}</code></pre>

      <h3>② サイト間 VPN（拠点 ↔ 拠点）</h3>
      <p>
        東京本社と大阪支社のネットワークを VPN で接続するパターン。両拠点のルーター同士でトンネルを張り、社員が意識せずとも別拠点のサーバーにアクセスできます。
      </p>
      <pre><code>{`東京LAN ──── 拠点間VPN ────→ 大阪LAN`}</code></pre>

      <h3>③ プライバシー VPN（個人 → 商用 VPN）</h3>
      <p>
        広告でよく見るタイプ。NordVPN・ExpressVPN・Mullvad 等の商用 VPN サーバーを経由して通信します。
      </p>
      <pre><code>{`自宅PC ──暗号化──→ 商用VPNサーバー（米国等） ──→ Internet
                  ↑ ここから先は普通の Internet`}</code></pre>
      <p>
        メリット：
      </p>
      <ul>
        <li>
          公衆 Wi-Fi 上で<strong>盗聴・ARP スプーフィングから守られる</strong>
        </li>
        <li>
          Web サイト側からは VPN サーバーの IP に見える（地域偽装、トラッキング回避）
        </li>
      </ul>
      <p>
        誤解されがちな点：
      </p>
      <ul>
        <li>
          <strong>VPN サーバーから先のインターネットは普通の通信</strong>。HTTPS でない通信は VPN サーバー以降で覗かれる可能性あり
        </li>
        <li>
          <strong>VPN プロバイダ自身を信頼する</strong>必要がある（ログを取らない宣言を信じる）
        </li>
        <li>
          <strong>「絶対匿名」ではない</strong>: アカウント情報・支払い情報・ブラウザ指紋からは身元特定可能
        </li>
      </ul>

      <h2>主な VPN プロトコル</h2>
      <h3>IPsec（IP Security）</h3>
      <ul>
        <li>L3（IP 層）で動作、最も古典的</li>
        <li>企業の拠点間 VPN・大手ベンダー機器でデファクト</li>
        <li>
          設定項目が多く（IKE フェーズ1/2・暗号アルゴリズム・PSK 等）扱いが難しい
        </li>
        <li>2 つのモード: <strong>トンネルモード</strong>（パケット全体を包む）/ <strong>トランスポートモード</strong>（ペイロードのみ暗号化）</li>
      </ul>

      <h3>OpenVPN</h3>
      <ul>
        <li>OSS、TLS ベース、TCP/UDP 両対応</li>
        <li>柔軟だが設定が複雑、パフォーマンスは IPsec より劣る場合あり</li>
        <li>長年の実績、ファイアウォール越えに強い（443/TCP を使えば普通の HTTPS と区別困難）</li>
      </ul>

      <h3>WireGuard</h3>
      <ul>
        <li>2018 年標準化、Linux カーネルに統合された新世代</li>
        <li>
          <strong>軽量・高速・コードベースが小さい（数千行）</strong>: コード監査が容易
        </li>
        <li>UDP のみ、設定が極めてシンプル（公開鍵 + IP のリスト）</li>
        <li>
          Tailscale や Cloudflare WARP の中身もこれ
        </li>
      </ul>

      <h3>その他</h3>
      <ul>
        <li>
          <strong>L2TP/IPsec</strong>: 古い OS に残っている、要 IPsec
        </li>
        <li>
          <strong>SSTP / SoftEther</strong>: 特定環境向け
        </li>
      </ul>

      <h2>VPN の限界とゼロトラスト</h2>
      <p>
        従来の VPN は <strong>「内部 = 信頼、外部 = 不信頼」</strong>という境界モデルでした。VPN を通れば社内扱いとなり、内側の様々なリソースにアクセスできる構造です。
      </p>
      <p>
        しかし現代は：
      </p>
      <ul>
        <li>SaaS 化が進み「社内」と「社外」の境界が曖昧</li>
        <li>VPN アカウントが侵害されると<strong>横移動（lateral movement）</strong>で被害が拡大</li>
        <li>VPN ゲートウェイ自体の脆弱性が大規模事故を引き起こす（Pulse Secure / Fortinet 等の事例）</li>
      </ul>
      <p>
        これに対する解が <strong>ゼロトラスト（Zero Trust）</strong>。「ネットワーク的にどこにいるか」ではなく「<strong>毎リクエストで認証 + 認可</strong>」を徹底するモデルです。Google BeyondCorp、Cloudflare Access 等が代表的実装で、VPN を完全に置き換える方向性です。
      </p>

      <h2>個人で VPN を使うときの注意</h2>
      <ol>
        <li>
          <strong>無料 VPN は基本使わない</strong>: 多くは通信を覗き見・販売してビジネスにしている
        </li>
        <li>
          <strong>商用 VPN を使うなら独立監査済みのもの</strong>: Mullvad / IVPN / ProtonVPN など
        </li>
        <li>
          <strong>HTTPS で本来守られている通信に VPN は不要</strong>: 公衆 Wi-Fi での盗聴対策は HTTPS 普及で限定的になっている
        </li>
        <li>
          <strong>地域回避目的の利用は規約違反の可能性</strong>: Netflix 等は VPN を検出してブロックする
        </li>
      </ol>

      <h2>おわりに</h2>
      <p>
        VPN は<strong>「インターネットの上にプライベートトンネルを張る技術」</strong>であり、目的によって最適なプロトコル・運用方法が変わります。<strong>「VPN を入れたから安全」</strong>ではなく、<strong>「具体的に何を脅威モデルから守りたいのか」</strong>を意識すると、本当に必要な対策が見えてきます。
      </p>
    </ArticleLayout>
  );
}
