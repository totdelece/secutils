import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("network", "http-versions")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「HTTP/3 ってもう普通に使われてるの？」</h2>
      <p>
        Web で当たり前に使われている HTTP プロトコル。実は<strong>1.0 / 1.1 / 2 / 3 と複数バージョンが並列で動いて</strong>います。Cloudflare や Google のサイトを Chrome の DevTools で見ると、もう HTTP/3 で通信していることが多いはずです。
      </p>
      <p>
        この記事では、各バージョンが何を改善してきたのか、初学者向けに整理します。
      </p>

      <h2>HTTP/1.0（1996年）— 1リクエスト1接続</h2>
      <p>
        最初期の HTTP は<strong>「リクエストごとに TCP 接続を張って、レスポンスを受けたら切る」</strong>という素朴な設計でした。
      </p>
      <p>
        当時の Web ページは画像数枚程度だったので問題なかったのですが、画像 30 枚のページを開くと TCP ハンドシェイク 30 回 + TLS 30 回...と、待ち時間ばかりが累積する欠点がありました。
      </p>

      <h2>HTTP/1.1（1997年）— Keep-Alive で接続を再利用</h2>
      <p>
        HTTP/1.1 で追加された目玉が <strong>Keep-Alive（永続接続）</strong>。1 つの TCP 接続を再利用して複数のリクエスト/レスポンスを順番に送れるようになりました。
      </p>
      <p>
        他にも <code>Host</code> ヘッダー（バーチャルホスト対応）、<code>Range</code>（部分ダウンロード）、チャンク転送など、現代の HTTP 機能の多くは 1.1 で追加されました。
      </p>
      <h3>HTTP/1.1 の限界: Head-of-Line Blocking</h3>
      <p>
        Keep-Alive で接続を再利用しても、同じ TCP 接続上では<strong>リクエストが順番待ち</strong>になります。重い画像 1 枚の取得が終わるまで、後続の軽い CSS が待たされる現象が起きます。これが <strong>Head-of-Line Blocking（HoL Blocking）</strong>です。
      </p>
      <p>
        ブラウザは「同一ドメインに対して 6 接続まで並列」する回避策を取りましたが、<strong>本質的な解決ではありません</strong>でした。
      </p>

      <h2>HTTP/2（2015年）— 多重化とヘッダー圧縮</h2>
      <p>
        HTTP/2 の最大の改善は <strong>多重化（multiplexing）</strong>。1 つの TCP 接続上で<strong>複数のリクエストを同時並行で流せる</strong>ようになりました。
      </p>
      <pre><code>{`HTTP/1.1: req1 ──→ res1 ──→ req2 ──→ res2 ──→ req3 ──→ res3
HTTP/2:   req1 + req2 + req3 並行送信
          res1 / res2 / res3 並行受信`}</code></pre>
      <p>
        他の改善：
      </p>
      <ul>
        <li>
          <strong>HPACK によるヘッダー圧縮</strong>: 同じヘッダーを毎回送らない。Cookie が長いサービスで効果大
        </li>
        <li>
          <strong>バイナリプロトコル化</strong>: テキストではなくバイナリフレームに。パースが速い
        </li>
        <li>
          <strong>Server Push</strong>（後に廃止傾向）: サーバーが先回りしてリソースを送る
        </li>
        <li>
          <strong>必須 TLS</strong>: 主要ブラウザの実装は HTTPS のみ
        </li>
      </ul>

      <h3>HTTP/2 の弱点: TCP 層の HoL Blocking</h3>
      <p>
        HTTP/2 はアプリケーション層の HoL Blocking は解決しましたが、<strong>下の TCP 層</strong>には残っていました。1 つでもパケットロスがあると、TCP は「順番通りに届けるため」全体を待たせるので、多重化のメリットが減ります。Wi-Fi や 4G/5G の不安定な回線で顕著です。
      </p>

      <h2>HTTP/3（2022年）— TCP を捨てて UDP の上で動く</h2>
      <p>
        HTTP/3 は思い切って<strong>TCP ではなく UDP の上に「QUIC」という新プロトコルを構築</strong>し、その上で動くように設計されました。
      </p>
      <pre><code>{`HTTP/2:    HTTP / TLS 1.3 / TCP / IP
HTTP/3:    HTTP / QUIC (TLS 1.3 込) / UDP / IP`}</code></pre>
      <p>
        QUIC の利点：
      </p>
      <ul>
        <li>
          <strong>TCP HoL Blocking がない</strong>: ストリームごとに独立して再送
        </li>
        <li>
          <strong>0-RTT 接続再開</strong>: 過去に接続したサーバーには即データ送信可能
        </li>
        <li>
          <strong>TLS 1.3 が組み込み</strong>: 暗号化と接続確立が一体化
        </li>
        <li>
          <strong>コネクションマイグレーション</strong>: Wi-Fi → モバイル切替時もコネクション維持（IP/Port 変わってもコネクション ID で識別）
        </li>
      </ul>

      <h2>各バージョンの比較</h2>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>HTTP/1.1</th>
            <th>HTTP/2</th>
            <th>HTTP/3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>下位プロトコル</td>
            <td>TCP</td>
            <td>TCP + TLS</td>
            <td>UDP + QUIC（TLS1.3込）</td>
          </tr>
          <tr>
            <td>多重化</td>
            <td>×</td>
            <td>○</td>
            <td>○（TCP HoL なし）</td>
          </tr>
          <tr>
            <td>ヘッダー圧縮</td>
            <td>×</td>
            <td>○ HPACK</td>
            <td>○ QPACK</td>
          </tr>
          <tr>
            <td>形式</td>
            <td>テキスト</td>
            <td>バイナリ</td>
            <td>バイナリ</td>
          </tr>
          <tr>
            <td>暗号化</td>
            <td>任意</td>
            <td>必須（実装上）</td>
            <td>必須（仕様上）</td>
          </tr>
          <tr>
            <td>接続確立 RTT</td>
            <td>1 + TLS 2</td>
            <td>1 + TLS 1</td>
            <td>1（再接続は 0）</td>
          </tr>
        </tbody>
      </table>

      <h2>どれが使われているか</h2>
      <p>
        ブラウザは複数バージョンを話せて、サーバー側の対応に合わせて自動選択します（<code>Alt-Svc</code> ヘッダーで HTTP/3 への昇格を提案する仕組み等）。Chrome の DevTools の Network タブで <strong>Protocol 列</strong>を表示すると、各リソースが何で読まれたか確認できます。
      </p>
      <p>
        現状（2026 年）：
      </p>
      <ul>
        <li>
          大手サイト（Google / Facebook / Cloudflare 配下）: <strong>HTTP/3</strong> がデフォルト
        </li>
        <li>
          普通の HTTPS サイト: <strong>HTTP/2</strong> が主流
        </li>
        <li>
          内部 API・古いサイト: <strong>HTTP/1.1</strong> も現役
        </li>
        <li>
          HTTP/1.0 はほぼ絶滅
        </li>
      </ul>

      <h2>セキュリティ視点</h2>
      <ul>
        <li>
          <strong>HTTP/2/3 は事実上 TLS 必須</strong>。HTTP/1.1 と比べて自動的に最低限の暗号化が担保される
        </li>
        <li>
          <strong>HTTP/3 は UDP ベースなので、ファイアウォールで UDP/443 を塞いでいると使えない</strong>。一部の社内 LAN では HTTP/2 にフォールバック
        </li>
        <li>
          <strong>QUIC は途中経路から中身が見えにくい</strong>: 既存の中間装置（SSL Inspection 装置等）が対応していないと監査・フィルタリングが難しくなる
        </li>
      </ul>

      <h2>おわりに</h2>
      <p>
        HTTP のバージョン進化は<strong>「いかに遅延を減らすか」</strong>の歴史でもあります。1.1 で接続再利用、2 で多重化、3 で TCP 制約からの解放と、毎回大きな改善を重ねてきました。
      </p>
      <p>
        Web 開発者として API を作るときは、サーバー（Nginx / CDN）が HTTP/2 / HTTP/3 を有効化されているか一度確認してみると、無料でユーザー体験を向上できます。
      </p>
    </ArticleLayout>
  );
}
