import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "lolbins-living-off-the-land")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        マルウェアを一切持ち込まずに侵入し、横展開し、データを盗む——。そんな攻撃が、いまや<strong>例外ではなく主流</strong>になっています。CrowdStrike によれば、<strong>2024年のサイバー攻撃検出の79%はマルウェアを伴っていません</strong>。攻撃者は独自のマルウェアの代わりに、<strong>OSに最初から入っている正規のツール</strong>を悪用しているのです。
      </p>
      <p>
        この手口を <strong>Living off the Land（環境寄生型攻撃、LOTL）</strong>、悪用される正規バイナリを <strong>LOLBins（Living off the Land Binaries）</strong> と呼びます。本記事は、なぜこの「武器を持ち込まない攻撃」がこれほど厄介なのか、よく悪用されるツールと <strong>MITRE ATT&amp;CK</strong> 技法の対応、実際の攻撃キャンペーン、そして検知・防御の勘所を実務目線で整理します。
      </p>

      <h2>Living off the Land とは何か</h2>
      <p>
        Living off the Land は本来「現地調達で生き延びる」という意味です。サイバー攻撃では、攻撃者が<strong>標的の環境にすでにある正規ツールだけで目的を達成する</strong>ことを指します。Windows には管理・運用のための強力なツールが標準で揃っており、それらは<strong>Microsoft が署名した正規バイナリ</strong>です。
      </p>
      <p>これが防御側にとって極めて不利な3つの理由があります。</p>
      <ul>
        <li>
          <strong>「ファイルレス」で痕跡が残りにくい</strong>：ディスクに不審な実行ファイルを置かず、メモリ上やスクリプトで完結する。シグネチャ型のアンチウイルスは検出対象（不審なファイル）を見つけられない。
        </li>
        <li>
          <strong>正規ツールなので「正常」に見える</strong>：PowerShell や certutil は管理者も日常的に使う。単体の実行はブロックも警告もしにくい。
        </li>
        <li>
          <strong>誰でも使えるほど一般化した</strong>：<strong>LOLBAS Project</strong> には悪用可能な Windows バイナリが<strong>100種類以上カタログ化</strong>されており、国家支援型からランサムウェアの犯罪者まで広く使う「コモディティ」になっている。
        </li>
      </ul>

      <h2>よく悪用される LOLBins と ATT&amp;CK 技法</h2>
      <p>
        代表的な正規ツールと、その典型的な悪用、対応する MITRE ATT&amp;CK 技法IDを挙げます。脅威ハンティングの出発点として有用です。
      </p>
      <ul>
        <li>
          <strong>PowerShell</strong>（T1059.001）：LOTL攻撃の<strong>71%に登場</strong>する主役。外部スクリプトのメモリ実行、難読化、情報収集、横展開まで何でもこなす。
        </li>
        <li>
          <strong>cmd.exe</strong>（T1059.003）：バッチ実行・コマンド連結の起点。
        </li>
        <li>
          <strong>mshta.exe</strong>（T1218.005）：遠隔の HTA（HTML Application）を実行。{" "}
          <a href="/learn/security/clickfix">ClickFix</a>{" "}
          やフィッシングで定番。
        </li>
        <li>
          <strong>rundll32.exe</strong>（T1218.011）：DLL やスクリプトを正規プロセスとして実行。
        </li>
        <li>
          <strong>regsvr32.exe</strong>（T1218.010）：いわゆる Squiblydoo。遠隔スクリプトをCOM経由で実行。
        </li>
        <li>
          <strong>certutil.exe</strong>（T1105）：本来は証明書ユーティリティだが、<strong>ファイルのダウンロードや Base64 デコード</strong>に悪用される。
        </li>
        <li>
          <strong>wmic.exe / WMI</strong>（T1047）：偵察・横展開・永続化。Ryuk ランサムウェアが横展開に使用。
        </li>
        <li>
          <strong>MSBuild.exe</strong>：Visual Studio のビルドツール。インラインタスクで<strong>メモリ上から任意コードを実行</strong>でき、2026年に悪用が急増。
        </li>
        <li>
          <strong>bitsadmin / curl / schtasks / PsExec</strong>：ダウンロード・永続化・遠隔実行の補助に。
        </li>
      </ul>

      <h2>実際の攻撃キャンペーン</h2>
      <p>LOLBins はもはや高度な攻撃者の専売特許ではありません。近年の事例を見れば、その広がりがわかります。</p>
      <ul>
        <li>
          <strong>Flax Typhoon（中国系APT）</strong>：2026年初頭の Remcos／NetSupport RAT キャンペーンで、<strong>初期侵入から永続化まで独自マルウェアをゼロ</strong>に。純粋な LOLBins だけで活動した。
        </li>
        <li>
          <strong>MSBuild × PlugX（2026年2月、Lab52報告）</strong>：会議招待を装ったアーカイブ添付から MSBuild を悪用し、<strong>PlugX をファイルレスで展開</strong>。
        </li>
        <li>
          <strong>PipeMagic バックドア（2025年）</strong>：<strong>certutil が配信チェーンに登場</strong>。CVE-2025-29824 を悪用したランサムウェア作戦で、米・スペイン・ベネズエラ・サウジの標的に使われた。
        </li>
        <li>
          <strong>TA505（金銭目的の犯罪グループ）</strong>：LOLBins を連鎖させてランサムウェアやバンキングトロジャンの配信パイプラインを構築。手口が完全に<strong>コモディティ化</strong>している証左。
        </li>
        <li>
          歴史的にも <strong>FIN7（mshta フィッシング）、Emotet（PowerShell）、Dridex（rundll32）、APT29（PowerShell ファイルレス）</strong> など枚挙にいとまがない。
        </li>
      </ul>

      <h2>なぜ EDR でも捕まえにくいのか</h2>
      <p>
        最大の難所は<strong>「チェイン（連鎖）」</strong>です。攻撃者は5〜8個の正規バイナリを順番につなぎますが、<strong>一つひとつの実行はどれも正常に見えます</strong>。「certutil がファイルを取得」「rundll32 がDLLを読み込み」——個別には日常的な操作で、単独のルールでは止められません。捕まえる唯一の道は、<strong>一連の流れ（ふるまいの系列）を文脈で見る</strong>ことです。
      </p>
      <p>
        さらに、ふるまい検知に引っかかりそうになると、攻撃者は <strong>BYOVD（Bring Your Own Vulnerable Driver）</strong> にエスカレートします。<strong>正規だが脆弱なカーネルドライバを読み込んで EDR 自体を無効化</strong>し、その後は LOLBins も独自マルウェアも検知されずに動く——という展開です。
      </p>

      <h2>図解案：LOLBinsチェインの一例</h2>
      <pre>
        <code>{`[Officeマクロ/ClickFix]
   │ プロセス系譜の異常 = winword.exe → powershell.exe
   ▼
[powershell] ── certutil ──▶ ペイロード取得（T1105）
   │
   ▼
[rundll32 / mshta] メモリ実行（T1218）
   │
   ▼
[wmic / schtasks] 横展開・永続化（T1047 / T1053）
   │
   ▼
[必要なら BYOVD] 脆弱ドライバでEDRを無効化 → 検知不能

★ 各ステップは“正常”。点ではなく「線（系列）」で見ないと捕まらない`}</code>
      </pre>

      <h2>検知のポイント</h2>
      <p>
        CISA の2025年ガイダンスは、単体シグネチャではなく<strong>ヒューリスティック（文脈）</strong>での検知を推奨しています。価値の高いシグナルの例です。
      </p>
      <ul>
        <li><strong>プロセス系譜</strong>：Office アプリ（winword.exe / excel.exe）が <strong>powershell.exe や cmd.exe を生成</strong>する。ブラウザやエクスプローラーが mshta を起動する（{" "}
          <a href="/learn/security/clickfix">ClickFix</a>{" "}
          の典型）。
        </li>
        <li><strong>certutil がファイルをダウンロード</strong>している、<strong>rundll32 が一時ディレクトリのDLLを読み込む</strong>。</li>
        <li>実行の<strong>時間帯・ユーザー権限・端末の役割</strong>との不一致（深夜の管理コマンド、一般ユーザーによる wmic 横展開など）。</li>
        <li><strong>Sysmon</strong>（Sysinternals）を導入し、プロセス生成・ネットワーク・イメージロードを詳細記録して系列分析に回す。</li>
      </ul>

      <h2>防御策</h2>
      <ol>
        <li>
          <strong>アプリケーション制御（WDAC / AppLocker）と ASR ルール</strong>：<strong>mshta.exe・certutil.exe・wmic.exe・rundll32.exe・psexec.exe</strong> などを、承認した管理アカウント以外で実行・悪用できないよう制限する。
        </li>
        <li>
          <strong>PowerShell の防御強化</strong>：Constrained Language Mode、スクリプトブロックロギング、AMSI 連携を有効化。難読化された <code>iex</code> 実行を可視化する（ExecutionPolicy はセキュリティ境界ではない点に注意）。
        </li>
        <li>
          <strong>最小権限と横展開の抑制</strong>：一般ユーザーから管理ツールを使わせない。ネットワーク分割で wmic / PsExec による横展開を狭める。
        </li>
        <li>
          <strong>BYOVD 対策</strong>：Microsoft の脆弱ドライバブロックリストや HVCI（メモリ整合性）を有効化し、EDR のタンパープロテクションをオンにする。
        </li>
        <li>
          <strong>脅威ハンティング</strong>：ATT&amp;CK にマッピングして「正常に見える系列」を能動的に探す。インフォスティーラー（{" "}
          <a href="/learn/security/infostealer-session-hijacking">セッション窃取</a>{" "}
          ）やランサムウェアの前段に LOLBins が潜む前提で監視する。
        </li>
      </ol>

      <h2>まとめ</h2>
      <p>
        LOLBins・環境寄生型攻撃の本質は、<strong>「持ち込んだ悪意」ではなく「もともと正規にあるもの」を武器に変える</strong>点にあります。だからマルウェアの有無で守る発想は通用せず、検出の79%が無マルウェアという現実が生まれました。守りの軸は<strong>「点ではなく線で見る」</strong>こと——プロセス系譜とふるまいの系列を捉え、アプリ制御で不要な正規ツールを封じ、PowerShell を可視化し、BYOVD でEDRを殺させないことです。
      </p>
      <p>
        入口は{" "}
        <a href="/learn/security/clickfix">ClickFix</a>{" "}
        や{" "}
        <a href="/learn/security/quishing">Quishing</a>{" "}
        のようなソーシャル攻撃、出口は{" "}
        <a href="/learn/security/infostealer-session-hijacking">認証情報・セッション窃取</a>{" "}
        やランサムウェア——LOLBins はその<strong>「中間」をつなぐ常套手段</strong>です。全体像を ATT&amp;CK で捉えると、各記事の手口が一本の攻撃ストーリーとして見えてきます。
      </p>
      <p>
        ※ 本記事の統計値・キャンペーン名・技法IDは、CrowdStrike／CISA／MITRE ATT&amp;CK／各セキュリティベンダーの公表内容および報道に基づきます。攻撃・防御とも変化が速いため、対策時は最新の公式情報をご確認ください。
      </p>
    </ArticleLayout>
  );
}
