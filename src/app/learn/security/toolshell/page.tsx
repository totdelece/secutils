import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "toolshell")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>ToolShell とは</h2>
      <p>
        <strong>ToolShell</strong> は、2025年7月に悪用が確認されたオンプレミス版 <strong>Microsoft SharePoint Server</strong> の脆弱性チェーンです。<strong>CVE-2025-53770</strong>（リモートコード実行、CVSS 9.8）と <strong>CVE-2025-53771</strong>（認証バイパス、CVSS 6.3）を組み合わせることで、<strong>認証なしにサーバー上で任意コードを実行</strong>できます。
      </p>
      <p>
        名称は初期の悪用でターゲットとなった SharePoint の管理ページ <code>/ToolPane.aspx</code> に由来します。Microsoft は7月21日に緊急パッチを公開しましたが、公開前の7月7日にはすでに悪用が始まっていました。400件を超える組織が侵害され、米国の複数の連邦政府機関や核関連施設が被害を受けた大規模インシデントです。
      </p>

      <h2>2 つの CVE とその役割</h2>
      <table>
        <thead>
          <tr>
            <th>CVE</th>
            <th>種別</th>
            <th>CVSS</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CVE-2025-53771</td>
            <td>認証バイパス（Server Spoofing）</td>
            <td>6.3</td>
            <td>
              細工した <code>Referer</code> ヘッダーを付けた POST リクエストを{" "}
              <code>/layouts/15/ToolPane.aspx?DisplayMode=Edit</code> に送ることで
              認証を回避できる。
            </td>
          </tr>
          <tr>
            <td>CVE-2025-53770</td>
            <td>リモートコード実行（RCE）</td>
            <td>9.8</td>
            <td>
              ユーザー制御データの安全でないデシリアライズに起因。認証バイパスと
              チェーンすることで、未認証の攻撃者がサーバー上で任意コードを実行できる。
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        単独では影響が限定されるCVSS 6.3の脆弱性が、CVSS 9.8の脆弱性への踏み台になる——これがチェーン攻撃の典型例です。どちらか一方だけでは成立しない攻撃が、組み合わせることで致命傷になります。
      </p>

      <h2>影響を受けるバージョン</h2>
      <table>
        <thead>
          <tr>
            <th>製品</th>
            <th>影響</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SharePoint Server Subscription Edition（SE）</td>
            <td>影響あり → 緊急パッチ適用必須</td>
          </tr>
          <tr>
            <td>SharePoint Server 2019</td>
            <td>影響あり → 緊急パッチ適用必須</td>
          </tr>
          <tr>
            <td>SharePoint Server 2016</td>
            <td>影響あり → 緊急パッチ適用必須</td>
          </tr>
          <tr>
            <td>SharePoint Online（Microsoft 365）</td>
            <td><strong>影響なし</strong>（クラウド側は自動修正済み）</td>
          </tr>
        </tbody>
      </table>
      <p>
        クラウド移行済みの組織は影響を受けません。一方、オンプレミス環境を継続運用している組織が主なターゲットとなりました。
      </p>

      <h2>攻撃の流れ（概念）</h2>
      <p>
        具体的なエクスプロイトコードは掲載しません。攻撃の概念的な流れのみ示します。
      </p>
      <ol>
        <li>
          <strong>偵察</strong>: インターネットに公開されたオンプレミス SharePoint Server を特定する（Shodan 等で容易に発見可能）。
        </li>
        <li>
          <strong>認証バイパス（CVE-2025-53771）</strong>: 細工した <code>Referer</code> ヘッダーを含む POST リクエストを <code>ToolPane.aspx</code> に送り、認証チェックを迂回する。
        </li>
        <li>
          <strong>RCE（CVE-2025-53770）</strong>: 認証バイパス後、安全でないデシリアライズを悪用して任意コードをサーバー上で実行する。
        </li>
        <li>
          <strong>永続化</strong>: Web シェルを設置し、<strong>SharePoint の MachineKey（暗号鍵）</strong>を窃取する。MachineKey を入手すると、パッチ適用後も偽造トークンでアクセスし続けられる。
        </li>
        <li>
          <strong>横展開・情報窃取</strong>: 認証情報の盗取、MFA/SSO のバイパス、ネットワーク内部への横展開、機密データの持ち出しへと進む。
        </li>
      </ol>

      <h2>攻撃者と被害規模</h2>
      <p>
        Microsoft は複数の中国系 APT グループによる悪用を確認しています。
      </p>
      <ul>
        <li>
          <strong>Linen Typhoon（APT27）</strong>: 2010年頃から活動する中国国家支援グループ。政府・防衛・人権組織を標的とした情報収集を専門とする。
        </li>
        <li>
          <strong>Violet Typhoon（APT31）</strong>: 2012年頃から活動。知的財産窃取を主目的とし、競争優位につながるデータを狙う。
        </li>
        <li>
          <strong>Storm-2603</strong>: MachineKey 窃取とランサムウェアとの関連が指摘される中国系アクター。
        </li>
      </ul>
      <p>
        国家系アクター以外にランサムウェアグループも同じ脆弱性を悪用しており、4波にわたる攻撃キャンペーンで <strong>400件超の組織</strong>が侵害されました。被害組織には米エネルギー省・国土安全保障省・保健福祉省・核安全保障局、欧州・中東の政府機関が含まれます。
      </p>

      <h2>MachineKey 窃取が危険な理由</h2>
      <p>
        SharePoint（および ASP.NET）は <strong>MachineKey</strong> と呼ばれる暗号鍵を使ってセッションやデータ保護トークンを署名・暗号化します。攻撃者がこの鍵を盗むと：
      </p>
      <ul>
        <li>パッチを当てても、鍵が同じままなら偽造トークンでの侵入が継続できる。</li>
        <li>MFA や SSO をバイパスした正規ユーザーになりすませる。</li>
        <li>鍵の有効期間中は検知が非常に困難になる。</li>
      </ul>
      <p>
        これが、パッチ適用と同時に <strong>MachineKey のローテーション</strong>が必須とされる理由です。
      </p>

      <h2>対策</h2>
      <h3>1. 緊急パッチの適用（最優先）</h3>
      <p>
        Microsoft が2025年7月21日に公開した緊急セキュリティ更新プログラムを SharePoint Server 2016 / 2019 / SE 全バージョンに適用します。パッチが出る前から悪用されていたゼロデイのため、<strong>「使っていない」は通用しない——公開サーバーは調べられている</strong>という前提で臨みます。
      </p>

      <h3>2. MachineKey のローテーション</h3>
      <p>
        パッチ適用後は必ず MachineKey を更新します。PowerShell または Central Administration から実行でき、その後 IIS の再起動が必要です。
      </p>
      <pre><code>{`# SharePoint Management Shell で実行
Update-SPMachineKey -WebApplication <WebApp_URL>
# 全 Web アプリに適用後、IIS を再起動
iisreset`}</code></pre>
      <p>
        侵害の有無にかかわらず、パッチと合わせてローテーションを実施します。
      </p>

      <h3>3. AMSI 統合の有効化</h3>
      <p>
        SharePoint の <strong>AMSI（Antimalware Scan Interface）統合</strong>を有効にすると、HTTP リクエスト内のスクリプトコンテンツを Defender がリアルタイムスキャンし、多くの ToolShell ペイロードをブロックできます。AMSI が有効化できない環境では、パッチ適用まで SharePoint サーバーをインターネットから切り離すことを検討します。
      </p>

      <h3>4. 侵害調査（パッチ前に攻撃を受けていた可能性がある場合）</h3>
      <ul>
        <li>Web シェルの痕跡（不審な <code>.aspx</code> ファイルの設置）を確認する。</li>
        <li>SharePoint のアクセスログで <code>/ToolPane.aspx</code> への異常な POST を探す。</li>
        <li>認証情報・サービスアカウントのパスワードをローテーションする。</li>
        <li>CISA が公開している侵害指標（IoC）と突き合わせる。</li>
      </ul>

      <h2>教訓: 「低い CVSS が踏み台になる」チェーン攻撃</h2>
      <p>
        ToolShell が示す重要な教訓は <strong>CVSSスコア単独でリスクを判断しない</strong>ことです。CVE-2025-53771 は単体では CVSS 6.3（Medium）に過ぎませんが、CVSS 9.8 の CVE-2025-53770 への踏み台になることで致命的な攻撃チェーンを形成しました。
      </p>
      <ul>
        <li>脆弱性はスコアではなく<strong>他の脆弱性と組み合わさった時の影響</strong>で評価する。</li>
        <li>インターネットに公開するサービスは、攻撃者が常にスキャンしていると前提する。</li>
        <li>緊急パッチが出た時点でゼロデイ悪用はすでに始まっている場合が多い——パッチ公開と同時に適用する体制を整える。</li>
        <li>「パッチを当てたから安全」ではなく、<strong>「鍵も回した、侵害調査もした」で初めて完了</strong>とする。</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        ToolShell（CVE-2025-53770 ＋ CVE-2025-53771）は、認証バイパスと安全でないデシリアライズを組み合わせたゼロデイ RCE で、中国系 APT 複数グループが国家機関を含む 400 件超の組織を侵害しました。オンプレミス SharePoint Server を運用している場合は、<strong>① 緊急パッチ適用 → ② MachineKey ローテーション → ③ AMSI 有効化 → ④ 侵害調査</strong>を順に実施します。SharePoint Online は影響を受けません。
      </p>
      <p>
        脆弱性チェーンの全体像については <a href="/learn/security/mitre-attack">MITRE ATT&amp;CK 入門</a>、安全でないデシリアライズの仕組みは <a href="/learn/security/owasp-top-10">OWASP Top 10 入門</a>（A08: Software and Data Integrity Failures）も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
