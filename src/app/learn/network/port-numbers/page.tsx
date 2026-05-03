import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "port-numbers")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「:443」って何？</h2>
      <p>
        URL の中に <code>https://example.com:443</code> や <code>ssh user@host -p 22</code> のように出てくる<strong>ポート番号</strong>。これが何のために必要で、なぜ「80 = HTTP」「443 = HTTPS」のように決まっているのかを整理します。
      </p>

      <h2>ポート番号は「アプリの受付窓口」</h2>
      <p>
        IP アドレスは「サーバーマシン本体の住所」を指しますが、1 台のサーバーには複数のサービス（Web、SSH、メール、DB...）が同時に動いていることが普通です。届いたパケットを<strong>どのサービスに渡すか</strong>を決めるための番号がポート番号です。
      </p>
      <pre><code>{`example.com (IP: 93.184.215.14)
├─ :22   → SSH デーモン
├─ :80   → HTTP サーバー
├─ :443  → HTTPS サーバー
├─ :3306 → MySQL
└─ :5432 → PostgreSQL`}</code></pre>
      <p>
        ポート番号は <strong>0〜65535（16bit）</strong>の範囲で、TCP と UDP がそれぞれ独立して持っています。「TCP の 80 番」と「UDP の 80 番」は別物です。
      </p>

      <h2>IANA による 3 区分</h2>
      <p>
        IANA（Internet Assigned Numbers Authority）はポート番号を以下の 3 区分に分けて管理しています：
      </p>
      <table>
        <thead>
          <tr>
            <th>区分</th>
            <th>範囲</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Well-known Ports</td>
            <td>0 - 1023</td>
            <td>定番プロトコル用に予約。Linux/Unix では root 権限が必要</td>
          </tr>
          <tr>
            <td>Registered Ports</td>
            <td>1024 - 49151</td>
            <td>各アプリベンダーが申請して割り当てを受ける</td>
          </tr>
          <tr>
            <td>Dynamic / Private / Ephemeral</td>
            <td>49152 - 65535</td>
            <td>クライアント側が一時的に使う（OS が自動割当）</td>
          </tr>
        </tbody>
      </table>

      <h2>覚えておきたい well-known ポート</h2>
      <table>
        <thead>
          <tr>
            <th>ポート</th>
            <th>プロトコル</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>20 / 21</td>
            <td>FTP</td>
            <td>ファイル転送（古典）</td>
          </tr>
          <tr>
            <td>22</td>
            <td>SSH / SFTP</td>
            <td>セキュアな遠隔ログイン</td>
          </tr>
          <tr>
            <td>25</td>
            <td>SMTP</td>
            <td>メール送信</td>
          </tr>
          <tr>
            <td>53</td>
            <td>DNS</td>
            <td>名前解決（UDP/TCP両方）</td>
          </tr>
          <tr>
            <td>67 / 68</td>
            <td>DHCP</td>
            <td>IP 自動割当</td>
          </tr>
          <tr>
            <td>80</td>
            <td>HTTP</td>
            <td>Web 通信（平文）</td>
          </tr>
          <tr>
            <td>110</td>
            <td>POP3</td>
            <td>メール受信（古典）</td>
          </tr>
          <tr>
            <td>123</td>
            <td>NTP</td>
            <td>時刻同期（UDP）</td>
          </tr>
          <tr>
            <td>143</td>
            <td>IMAP</td>
            <td>メール受信</td>
          </tr>
          <tr>
            <td>443</td>
            <td>HTTPS</td>
            <td>Web 通信（暗号化）</td>
          </tr>
          <tr>
            <td>465 / 587</td>
            <td>SMTPS</td>
            <td>暗号化メール送信</td>
          </tr>
          <tr>
            <td>993 / 995</td>
            <td>IMAPS / POP3S</td>
            <td>暗号化メール受信</td>
          </tr>
        </tbody>
      </table>
      <p>
        実務でよく使う registered ポートも覚えておくと便利：
      </p>
      <ul>
        <li><strong>3000</strong>: Node.js / Next.js dev server</li>
        <li><strong>3306</strong>: MySQL</li>
        <li><strong>5432</strong>: PostgreSQL</li>
        <li><strong>6379</strong>: Redis</li>
        <li><strong>8080 / 8443</strong>: 代替 HTTP / HTTPS（管理画面・テスト用）</li>
        <li><strong>9200</strong>: Elasticsearch</li>
        <li><strong>27017</strong>: MongoDB</li>
      </ul>

      <h2>クライアント側のポート: ephemeral port</h2>
      <p>
        ブラウザでサイトにアクセスするとき、「サーバー側のポート」は 443 ですが、「クライアント側（あなたの PC）のポート」も必要です。これは OS が動的に空きポートを選んで割り当てます。
      </p>
      <pre><code>{`あなたのPC:54321  ←→  example.com:443
└── ephemeral
    ↑ OS が自動的に割り当てる`}</code></pre>
      <p>
        Linux のデフォルトは <code>32768-60999</code>、Windows は <code>49152-65535</code> あたりです。ブラウザでタブを大量に開くと、このポートが枯渇して通信できなくなる場合もあります（実用上はほぼ起きないが、サーバー側で大量にコネクションを張る用途では考慮が必要）。
      </p>

      <h2>ポートスキャンの基本</h2>
      <p>
        セキュリティ調査の入口となるのが <strong>ポートスキャン</strong>です。「サーバーのどのポートが開いているか」を調べる行為で、定番ツールは <strong>nmap</strong>。
      </p>
      <pre><code>{`# 一般的なスキャン（top 1000 ポート）
nmap example.com

# 特定ポートのみ
nmap -p 22,80,443 example.com

# UDP スキャン（遅い）
nmap -sU -p 53,123 example.com

# サービス検出 + バージョン特定
nmap -sV example.com`}</code></pre>
      <p>
        ⚠ <strong>許可なく他人のサーバーをスキャンするのは法的にグレー〜違法</strong>です。学習目的なら自宅 LAN や <code>scanme.nmap.org</code>（Nmap 公式が用意した練習用ホスト）で試してください。
      </p>

      <h2>セキュリティ視点: ポートを「閉じる」</h2>
      <p>
        サーバー運用で最重要の習慣の 1 つが <strong>「使わないポートを閉じる」</strong> ことです。攻撃者が侵入経路として使えるポートが少ないほど、攻撃面（attack surface）が小さくなります。
      </p>
      <ul>
        <li>
          <strong>クラウドのセキュリティグループ / ファイアウォール</strong> でインバウンドを 22 / 443 のみに絞る
        </li>
        <li>
          管理用ポート（DB の 3306、Redis の 6379 等）は<strong>絶対にインターネットに公開しない</strong>。VPC 内部 / SSH トンネル経由のみ
        </li>
        <li>
          SSH ポート（22）を別番号に変えるのは<strong>セキュリティ強化にはならない</strong>（運用ノイズが減るだけ）。SSH 鍵認証 / Fail2ban の方が本質
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        ポート番号は「サーバーが家、サービスが家の中の各部屋、ポートが部屋のドア番号」と例えるとイメージしやすいです。アクセス制御を考えるときは、<strong>「どのドアを誰に開けるか」</strong>を意識すると、ファイアウォール設計の話が腹落ちしやすくなります。
      </p>
    </ArticleLayout>
  );
}
