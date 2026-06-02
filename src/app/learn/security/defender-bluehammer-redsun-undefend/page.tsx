import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "defender-bluehammer-redsun-undefend")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>何が起きたのか</h2>
      <p>
        2026年4〜5月にかけて、Microsoft Defender Antivirusに3つのゼロデイ脆弱性が連続して発覚した。コードネームはそれぞれ<strong>BlueHammer</strong>（CVE-2026-33825）、<strong>RedSun</strong>（CVE-2026-41091）、<strong>UnDefend</strong>（CVE-2026-45498）。この3つが攻撃チェーンとして組み合わされて実際の攻撃に悪用されていることをセキュリティ企業Huntressが確認した。
      </p>
      <p>
        最大の問題は攻撃の構造にある。BlueHammerまたはRedSunでSYSTEM権限を取得した後、UnDefendでDefenderのウイルス定義更新を無効化する——この「権限昇格 → セキュリティ層の段階的な劣化」という組み合わせは、後続の攻撃活動（マルウェア展開・データ窃取・横展開）を検知されにくくするための戦略的な手順だ。
      </p>

      <h2>3つの脆弱性の詳細</h2>
      <h3>BlueHammer（CVE-2026-33825）— SAMデータベースを使ったSYSTEM昇格</h3>
      <p>
        BlueHammerはMicrosoft Defenderのシグネチャ更新プロセスの競合条件（race condition）を悪用するローカル権限昇格（LPE）脆弱性だ。「Chaotic Eclipse」ハンドルの研究者が4月7日にPoCを公開し、1週間後の4月14日のPatch Tuesdayでパッチが提供された。しかし公開から1週間でBleepingComputerはすでに野放し悪用を観測しており、「PoC公開後即悪用」の典型例となった。
      </p>
      <p>
        攻撃の仕組みは以下のとおりだ。
      </p>
      <ol>
        <li>オペレーションロック（oplock）を使いDefenderの動作を一時停止する</li>
        <li>シグネチャ更新をトリガーし、Defenderに<strong>SAM（Security Account Manager）データベース</strong>を出力ディレクトリにコピーさせる</li>
        <li>コピーされたSAMハイブをパースし、ユーザーのNTハッシュを復号する</li>
        <li>全ユーザーのパスワードを一時的に新しいものに変更し、その認証情報で管理者セッションを生成する</li>
        <li>管理者セッションからSYSTEM権限を取得する</li>
      </ol>
      <p>
        SAMデータベースはWindowsユーザーの資格情報ハッシュを格納する重要ファイルであり、通常はSYSTEMとAdministratorsのみがアクセスできる。Defenderの信頼された権限を逆用してSAMを読み出させる点が巧妙だ。
      </p>

      <h3>RedSun（CVE-2026-41091）— システムファイル書き換えによるSYSTEM昇格</h3>
      <p>
        RedSunはBlueHammerと同様のLPE脆弱性だが、悪用メカニズムが異なる。CVSS 7.8のリンクフォロー（link-following）問題であり、存在しない「悪性ファイル」をDefenderが復元しようとする動作を悪用する。
      </p>
      <p>
        攻撃の流れは以下のとおりだ。
      </p>
      <ol>
        <li>攻撃者がDefenderに「指定パスの悪性ファイルを検疫して復元せよ」と命じる</li>
        <li>Defenderは「復元対象ファイル」が存在しないため、攻撃者のファイルをSystem32ディレクトリにコピーする（Defenderの高権限を利用）</li>
        <li>System32に配置されたファイルがSYSTEM権限のシェルを起動する</li>
      </ol>
      <p>
        BlueHammerがデータ読み取りの信頼を悪用するのに対し、RedSunはファイル書き込みの信頼を悪用する。どちらも「セキュリティ製品が信頼されているがゆえに可能な操作」を踏み台にしている。
      </p>

      <h3>UnDefend（CVE-2026-45498）— 一般ユーザーがDefender更新を無効化</h3>
      <p>
        UnDefendはCVSS 4.0と数値は低いが、実際の攻撃チェーンでは極めて重要な役割を担う。標準ユーザー権限でMicrosoft Defenderのウイルス定義更新を停止させられる。
      </p>
      <p>
        Defenderの定義ファイルが更新されなければ、新しいマルウェアシグネチャが追加されず、既存の検知ロジックも改善されない。攻撃者はSYSTEM権限取得後にUnDefendを使うことで、その後に展開するマルウェアや後続の攻撃ツールがDefenderに検知されにくい状態を維持できる。
      </p>

      <h2>技術的な解説</h2>
      <h3>3つを組み合わせた「段階的劣化戦略」</h3>
      <p>
        Huntressはこの攻撃チェーンを「段階的劣化戦略（Layered Degradation Strategy）」と表現した。単一のエクスプロイトで終わりではなく、防御レイヤーを順番に崩していく構造になっている。
      </p>
      <table>
        <thead>
          <tr>
            <th>ステップ</th>
            <th>使用する脆弱性</th>
            <th>目的</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1. SYSTEM権限取得</td>
            <td>BlueHammer または RedSun</td>
            <td>OS上の全権限を取得し、後続操作のベースを作る</td>
          </tr>
          <tr>
            <td>2. Defender更新の無効化</td>
            <td>UnDefend</td>
            <td>定義更新を止め、後続マルウェアの検知率を低下させる</td>
          </tr>
          <tr>
            <td>3. 後続活動</td>
            <td>（各種マルウェア・RAT）</td>
            <td>ランサムウェア展開・データ窃取・横展開・バックドア設置</td>
          </tr>
        </tbody>
      </table>

      <h3>セキュリティ製品そのものが攻撃面になる構造的問題</h3>
      <p>
        この3つの脆弱性が共通して示す問題は「セキュリティ製品が高い権限で動作するほど、その製品の脆弱性は致命的になる」という構造的なジレンマだ。
      </p>
      <p>
        Defenderがシステムを保護するには、ファイルシステム・プロセス・ネットワーク・レジストリへの広範なアクセス権が必要だ。しかしその権限こそが、脆弱性を突かれた際の影響範囲を大きくする。<a href="/learn/security/apex-one-cve-2026-34926">Trend Micro Apex One CVE-2026-34926</a>や<a href="/learn/security/forticlient-ems-cve-2026-35616">FortiClient EMS CVE-2026-35616</a>でも、セキュリティ製品が攻撃経路に変わった事例として解説した通り、これは業界全体の課題だ。
      </p>

      <h3>PoCの公開が悪用を加速した</h3>
      <p>
        BlueHammerはPoCコードが公開されてから1週間以内に野放し悪用が始まった。PoCの公開は防御側が対策を学ぶ機会を提供する一方、攻撃者にすぐに使えるエクスプロイトを提供することにもなる。Microsoftが翌週のPatch Tuesdayでパッチを提供したため修正版は入手可能だったが、「パッチが出てもすぐに適用できない組織」が現実には多く存在する。
      </p>

      <h3>Defender以外にBYOVDとの組み合わせリスク</h3>
      <p>
        BYOVD（Bring Your Own Vulnerable Driver）は脆弱な正規ドライバをロードしてカーネルレベルでEDRを無効化する手口だ（<a href="/learn/security/fog-ransomware-propagation">Fog ランサムウェア</a>でも解説）。今回のUnDefendは「ユーザーランドからDefenderの定義更新を止める」という異なるアプローチだが、両者を組み合わせれば複数のセキュリティレイヤーを同時に無効化できる。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        Windows Defenderは日本を含む世界中でデフォルトのエンドポイント保護として使われており、サードパーティのEDRを導入していない中小企業・中規模組織では唯一の防御線になっているケースも多い。
      </p>
      <p>
        Defender自体を狙うこれらの脆弱性が悪用されると、以下のリスクが生じる。
      </p>
      <ul>
        <li>SYSTEM権限取得後にランサムウェアを展開される</li>
        <li>定義更新が停止した状態でバックドアが維持される</li>
        <li>攻撃者がSYSTEM権限でActive Directoryに対してDCSync攻撃を行い、組織全体のハッシュを窃取する</li>
        <li>UnDefendによる更新停止後、新型マルウェアが検知されない状態が続く</li>
      </ul>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. Defender Antimalware Platformのバージョンを確認する</h3>
      <p>
        MicrosoftはDefender Antimalware Platform <strong>バージョン 4.18.26040.7</strong> でBlueHammerとRedSun、UnDefendの修正を提供している。以下のコマンドで現在のバージョンを確認できる。
      </p>
      <pre><code>{`# PowerShellで確認
Get-MpComputerStatus | Select-Object AMProductVersion, AMServiceVersion, AMEngineVersion

# 期待値: AMProductVersion が 4.18.26040.7 以降であること`}</code></pre>

      <h3>2. Defenderの自動更新が正常に機能しているか確認する</h3>
      <p>
        Defenderの定義更新・プラットフォーム更新が有効になっているかを確認する。UnDefendで更新が停止されていれば、そのエンドポイントは既に侵害されている可能性が高い。
      </p>
      <pre><code>{`# 定義ファイルの最終更新日時を確認
Get-MpComputerStatus | Select-Object AntivirusSignatureLastUpdated, AntispywareSignatureLastUpdated

# 通常は1日以内に更新されているはずだが、数日以上更新がない場合は要調査`}</code></pre>

      <h3>3. BlueHammerの悪用ログを調査する</h3>
      <p>
        BlueHammerは4月10日から悪用が観測されている。以下の痕跡を確認する。
      </p>
      <ul>
        <li>Defenderの隔離フォルダ・ログに異常なファイル操作の記録がないか</li>
        <li>予期しないSAMデータベースのコピーやアクセスがないか（WindowsイベントID 4656・4663）</li>
        <li>通常とは異なる管理者セッションの作成がないか（WindowsイベントID 4624 LogonType 3）</li>
      </ul>

      <h3>4. Windowsの自動更新とWSUSの設定を確認する</h3>
      <p>
        Defender Antimalware Platformはセキュリティインテリジェンス更新と別のチャネルで更新される。Windows UpdateおよびWSUS（Windows Server Update Services）でDefender Platformの更新が有効になっているかを確認する。一部のポリシーで「ドライバーの更新のみ除外」設定が誤ってPlatform更新も除外してしまうケースがある。
      </p>

      <h3>5. 標準ユーザー権限でのDefender設定変更をブロックする</h3>
      <p>
        UnDefendはCVSS 4.0とはいえ標準ユーザーが実行可能な点が問題だ。AppLockerやWDACで未署名ファイルの実行を制限し、攻撃ツールのロードを防ぐことがUnDefendの悪用を含む攻撃チェーン全体への対策になる。
      </p>

      <h3>6. 多層防御でDefenderのみへの依存を排除する</h3>
      <p>
        Defenderのみをエンドポイント保護として使っている場合、Defenderが無効化された際のフォールバックが存在しない。EDRの追加・ネットワーク異常検知・SIEMによるログ集約を組み合わせた多層防御の構築を検討する。
      </p>

      <h2>参考情報</h2>
      <ul>
        <li>The Hacker News: Three Microsoft Defender Zero-Days Actively Exploited; Two Still Unpatched</li>
        <li>SecurityWeek: Microsoft Patches Exploited UnDefend and RedSun Defender Zero-Days</li>
        <li>BleepingComputer: New Microsoft Defender "RedSun" zero-day PoC grants SYSTEM privileges</li>
        <li>BleepingComputer: CISA orders feds to patch BlueHammer flaw exploited as zero-day</li>
        <li>The Hacker News: Microsoft Warns of Two Actively Exploited Defender Vulnerabilities</li>
        <li>CISA: Known Exploited Vulnerabilities Catalog（CVE-2026-41091, CVE-2026-45498）</li>
      </ul>
    </ArticleLayout>
  );
}
