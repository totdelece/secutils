import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "tcp-vs-udp")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>L4 の主役は2つだけ</h2>
      <p>
        ネットワーク通信の話で「TCP」「UDP」という言葉が出てきます。両方とも<strong>トランスポート層（OSI参照モデルの第4層、L4）</strong>のプロトコルで、IP アドレスで届けられたパケットを「アプリケーションのどの口（ポート）に渡すか」を決める役割を担います。
      </p>
      <p>
        この記事では、TCP と UDP がそれぞれ何をしてくれるのか、なぜ両方存在するのかを初学者向けに解説します。
      </p>

      <h2>TCP は「届くまで頑張る」プロトコル</h2>
      <p>
        TCP（Transmission Control Protocol）は、<strong>「データが確実に、順番通りに届く」ことを保証する</strong>のが特徴です。これを実現するために多くの仕組みを持っています：
      </p>
      <ul>
        <li>
          <strong>3-way handshake</strong>: 通信開始時に <code>SYN → SYN/ACK → ACK</code> という 3 ステップで接続を確立する
        </li>
        <li>
          <strong>シーケンス番号</strong>: 各パケットに番号を付け、受信側が並び替える
        </li>
        <li>
          <strong>ACK（確認応答）</strong>: 受信側が「ここまで届いた」と返事する
        </li>
        <li>
          <strong>再送</strong>: ACK が来なければ送信側が再送する
        </li>
        <li>
          <strong>輻輳制御 / フロー制御</strong>: ネットワーク混雑時は送信速度を落とす
        </li>
      </ul>
      <p>
        これらの仕組みのおかげで、HTTP / SSH / メール（SMTP/IMAP）/ ファイル転送（FTP）など「<strong>データの欠損が許されない通信</strong>」で広く使われています。
      </p>

      <h2>UDP は「投げっぱなし」プロトコル</h2>
      <p>
        UDP（User Datagram Protocol）は、TCP のような信頼性機能を<strong>持っていません</strong>。
      </p>
      <ul>
        <li>コネクションを張らない（いきなり送る）</li>
        <li>順序保証なし</li>
        <li>到達確認なし</li>
        <li>再送なし</li>
        <li>輻輳制御なし</li>
      </ul>
      <p>
        「機能が少ない＝劣っている」のではなく、<strong>「機能が少ないからこそ速く軽い」</strong>のが UDP の魅力です。ヘッダーは TCP の半分以下、コネクション確立も不要なので、即座にデータを送り始められます。
      </p>

      <h2>機能比較</h2>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>TCP</th>
            <th>UDP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>コネクション</td>
            <td>あり（3-way handshake）</td>
            <td>なし</td>
          </tr>
          <tr>
            <td>到達保証</td>
            <td>あり</td>
            <td>なし</td>
          </tr>
          <tr>
            <td>順序保証</td>
            <td>あり</td>
            <td>なし</td>
          </tr>
          <tr>
            <td>輻輳制御</td>
            <td>あり</td>
            <td>なし</td>
          </tr>
          <tr>
            <td>ヘッダーサイズ</td>
            <td>20 バイト〜</td>
            <td>8 バイト</td>
          </tr>
          <tr>
            <td>速度</td>
            <td>普通</td>
            <td>速い</td>
          </tr>
          <tr>
            <td>用途</td>
            <td>正確性重視</td>
            <td>リアルタイム性重視</td>
          </tr>
        </tbody>
      </table>

      <h2>用途別: どちらを選ぶか</h2>
      <h3>TCP が向いているもの</h3>
      <ul>
        <li>
          <strong>HTTP / HTTPS</strong>（Web 閲覧）: ページ HTML が一部欠けたら困る
        </li>
        <li>
          <strong>SSH</strong>: コマンドが化けたらまずい
        </li>
        <li>
          <strong>メール（SMTP / IMAP）</strong>: 文字が抜けると意味が変わる
        </li>
        <li>
          <strong>ファイル転送</strong>: 1 バイトでも欠けるとファイルが壊れる
        </li>
        <li>
          <strong>データベース接続</strong>
        </li>
      </ul>

      <h3>UDP が向いているもの</h3>
      <ul>
        <li>
          <strong>DNS</strong>: 1 リクエスト 1 レスポンスで完結、軽量重視
        </li>
        <li>
          <strong>動画・音声ストリーミング</strong>: 一部のフレームが欠けても次に進む方が良い（再送を待つと遅延が酷くなる）
        </li>
        <li>
          <strong>VoIP（音声通話）</strong>: 同上
        </li>
        <li>
          <strong>オンラインゲーム</strong>: リアルタイム性が最優先
        </li>
        <li>
          <strong>NTP</strong>（時刻同期）: 軽量
        </li>
        <li>
          <strong>SNMP</strong>（ネットワーク監視）
        </li>
      </ul>

      <h2>「TCP と UDP のいいとこ取り」を狙うプロトコル</h2>
      <p>
        近年は <strong>QUIC</strong> という新しいプロトコルが台頭しています。QUIC は UDP の上で動く独自プロトコルで、UDP の軽さを活かしつつ、TCP のような信頼性・暗号化（TLS 1.3 込み）・多重化を実現しています。HTTP/3 はこの QUIC の上で動いており、Google・Cloudflare 等が積極採用しています。
      </p>
      <p>
        つまり「UDP は雑な代替」ではなく、<strong>新しい高機能プロトコルの土台</strong>としても活用されているわけです。
      </p>

      <h2>セキュリティ視点での違い</h2>
      <p>
        セキュリティを考える上での違いも知っておくと役立ちます：
      </p>
      <ul>
        <li>
          <strong>送信元偽装</strong>: UDP はコネクションを張らないため、送信元 IP の偽装が容易です。これが <strong>DDoS の amplification attack（DNS / NTP / Memcached 反射攻撃）</strong>に使われる理由です
        </li>
        <li>
          <strong>ステートフル FW</strong>: TCP は接続状態を追えるためファイアウォール制御がしやすい。UDP は擬似的に「直近通信」をフロー単位で追う
        </li>
        <li>
          <strong>ポートスキャン</strong>: TCP は SYN/RST で開閉が判別しやすいが、UDP は応答がないことが「閉じている」とは限らないため、スキャンが遅く確実性も低い
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        TCP と UDP は<strong>競合ではなく補完関係</strong>です。「データを失いたくない」なら TCP、「とにかく速く軽く」なら UDP、と覚えておけば、新しいプロトコルに出会ったときに「ああこれは TCP/UDP どちらの上で動くな」と把握しやすくなります。
      </p>
      <p>
        ネットワーク機器のログやファイアウォールルールを見るとき、ポート番号と一緒に必ず「TCP/UDP」が書かれているのは、両者が完全に別物として扱われているからです。
      </p>
    </ArticleLayout>
  );
}
