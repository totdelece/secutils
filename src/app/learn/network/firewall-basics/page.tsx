import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "firewall-basics")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「ファイアウォール」と一言で済ませがちだけど</h2>
      <p>
        会社の PC にも、家庭ルーターにも、AWS のセキュリティグループにも「ファイアウォール」という言葉が出てきます。が、それぞれ<strong>守る範囲も動作原理も違うもの</strong>です。
      </p>
      <p>
        この記事では、ファイアウォールの 3 世代分類と、ホストベース vs ネットワークベース、現代のクラウド時代における意味を初学者向けに整理します。
      </p>

      <h2>第1世代: パケットフィルタ（ステートレス）</h2>
      <p>
        最も古典的なファイアウォール。<strong>パケットの IP / ポートを見て、許可/拒否を決める</strong>だけのシンプルな仕組みです。
      </p>
      <pre><code>{`ルール例:
ALLOW src=any           dst=10.0.0.5  port=80    proto=TCP
ALLOW src=any           dst=10.0.0.5  port=443   proto=TCP
DENY  src=any           dst=10.0.0.5  port=any   proto=any`}</code></pre>
      <p>
        各パケットを単独で評価するため<strong>「ステートレス」</strong>と呼ばれます。Cisco ルーターの ACL（Access Control List）が代表例。
      </p>
      <p>
        メリット：シンプル・高速・処理が軽い<br/>
        デメリット：戻りパケットの扱いが不器用、TCP の状態を追えない
      </p>

      <h3>戻りパケット問題</h3>
      <p>
        例えば「内側から外への HTTP は許可」したい場合、ステートレスではどうやって戻りパケットを受け入れるかが難題です。「TCP ACK ビットが立っているもの」だけ許可する等のヒューリスティクスを使うのですが、攻撃者がこれを偽装することもできてしまいます。
      </p>

      <h2>第2世代: ステートフル インスペクション</h2>
      <p>
        各 TCP コネクションの状態を覚えておき、<strong>「これは内側から張った通信の戻りパケットだから OK」</strong>と判断できる仕組みが <strong>ステートフルファイアウォール</strong>です。
      </p>
      <pre><code>{`内側から外への新規接続を ALLOW
   ↓ 同時にルーターが「コネクションテーブル」に登録
   src=10.0.0.5:54321 → dst=example.com:443 (ESTABLISHED)

戻りパケットが届く
   ↓ コネクションテーブルにマッチ → 自動的に通す`}</code></pre>
      <p>
        現代の家庭ルーター・AWS Security Group・Linux iptables（の <code>state</code> モジュール）はすべてステートフルです。「アウトバウンドだけ許可していれば、レスポンスは自動で通る」のはこのおかげです。
      </p>

      <h2>第3世代: アプリケーション層ファイアウォール（次世代 FW / WAF）</h2>
      <p>
        IP/ポートだけでなく、<strong>HTTP の中身まで見て判断する</strong>ファイアウォール。L7 で動くので、「URL パスごとの許可/拒否」「特定の SQL インジェクション攻撃文字列をブロック」のような細かい制御が可能です。
      </p>
      <ul>
        <li>
          <strong>WAF（Web Application Firewall）</strong>: HTTP/HTTPS 専門。AWS WAF / Cloudflare WAF / ModSecurity
        </li>
        <li>
          <strong>NGFW（Next-Generation Firewall）</strong>: アプリ識別 + IPS + アンチウイルスを統合。Palo Alto Networks / Fortinet 等
        </li>
        <li>
          <strong>IDS / IPS</strong>: 侵入検知/防御。シグネチャベース（Snort、Suricata）
        </li>
      </ul>

      <h2>ホストベース vs ネットワークベース</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ホストベース</th>
            <th>ネットワークベース</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>導入場所</td>
            <td>各サーバー / PC 内</td>
            <td>ネットワーク境界の機器</td>
          </tr>
          <tr>
            <td>例</td>
            <td>iptables / nftables / Windows Defender FW</td>
            <td>クラウドの SG、専用 FW アプライアンス</td>
          </tr>
          <tr>
            <td>強み</td>
            <td>細かい個別制御</td>
            <td>一括管理、性能</td>
          </tr>
          <tr>
            <td>弱み</td>
            <td>各台で個別運用が必要</td>
            <td>横移動（lateral movement）に弱い</td>
          </tr>
        </tbody>
      </table>
      <p>
        実運用では<strong>両者を組み合わせて多層防御</strong>するのがセオリーです。
      </p>

      <h2>クラウド時代のファイアウォール</h2>
      <p>
        AWS / GCP / Azure では伝統的なファイアウォールアプライアンスは登場せず、代わりに<strong>論理的なセキュリティポリシー</strong>として実装されています：
      </p>
      <ul>
        <li>
          <strong>Security Group（AWS）</strong>: ENI 単位のステートフル FW。allow ルールのみ（deny は書けない）
        </li>
        <li>
          <strong>Network ACL（AWS）</strong>: サブネット単位のステートレス FW。allow と deny 両方書ける
        </li>
        <li>
          <strong>Firewall Rules（GCP）</strong>: VPC 全体に対するルール
        </li>
        <li>
          <strong>NSG（Azure）</strong>: NIC / サブネット単位
        </li>
      </ul>
      <p>
        これらをコード（Terraform / CloudFormation 等）で管理する <strong>Infrastructure as Code</strong> が標準になっています。
      </p>

      <h2>WAF が守るもの・守らないもの</h2>
      <p>
        WAF は<strong>「Web 層の攻撃」</strong>に特化しています：
      </p>
      <h3>WAF が得意</h3>
      <ul>
        <li>SQL インジェクションのシグネチャマッチ</li>
        <li>XSS（Cross-Site Scripting）の検出</li>
        <li>DDoS 緩和（レート制限）</li>
        <li>OWASP Top 10 系の攻撃</li>
      </ul>
      <h3>WAF が苦手</h3>
      <ul>
        <li>ビジネスロジックの脆弱性（権限昇格・水平権限突破等）</li>
        <li>暗号化トラフィック内の精密な検査（TLS 終端が必要）</li>
        <li>0day 攻撃（シグネチャがない）</li>
      </ul>
      <p>
        <strong>WAF は補助輪</strong>であり、アプリ自体のセキュリティ実装が本丸であることは忘れないでください。
      </p>

      <h2>「全許可」「全拒否」の哲学</h2>
      <p>
        ファイアウォールルールの設計には 2 つの基本姿勢があります：
      </p>
      <ul>
        <li>
          <strong>デフォルト拒否（allow-list）</strong>: 必要なものだけ許可、それ以外は全部 deny。<strong>セキュリティの原則</strong>
        </li>
        <li>
          <strong>デフォルト許可（deny-list）</strong>: 危険なもののみブロック。穴を見落としやすい
        </li>
      </ul>
      <p>
        本番環境ではほぼ常に<strong>デフォルト拒否</strong>が正解です。「足りないものに気づく」運用負荷より、「気づかないうちに開いていた穴」のリスクの方が遥かに高いからです。
      </p>

      <h2>セキュリティグループ設計の例（AWS）</h2>
      <pre><code>{`Web サーバー SG:
  Inbound:
    - HTTPS (443/TCP) from 0.0.0.0/0       # ユーザーのブラウザ
    - SSH (22/TCP) from 踏み台 SG          # 管理アクセスは踏み台経由のみ
  Outbound:
    - HTTPS (443/TCP) to 0.0.0.0/0          # 外部 API 呼び出し
    - PostgreSQL (5432/TCP) to DB SG

DB SG:
  Inbound:
    - PostgreSQL (5432/TCP) from Web SG    # Web サーバーからのみ
  Outbound:
    - 必要なものだけ`}</code></pre>
      <p>
        DB に直接インターネットから繋がせない、SSH は踏み台のみ、というレイヤ分離が定石です。
      </p>

      <h2>おわりに</h2>
      <p>
        ファイアウォールは「ルールを作る → 動かす」のは簡単ですが、<strong>「適切な粒度のルールを設計する」</strong>のが本当の難しさです。最小権限の原則、デフォルト拒否、レイヤごとの責務分離、を意識すると、長期運用でも穴が空きにくいルール体系を維持できます。
      </p>
    </ArticleLayout>
  );
}
