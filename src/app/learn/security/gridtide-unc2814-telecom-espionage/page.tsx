import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "gridtide-unc2814-telecom-espionage")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        GoogleとMandiantが、世界40カ国以上の通信事業者・政府機関を標的にした大規模なサイバー諜報作戦を摘発した。コードネームは<strong>GRIDTIDE</strong>、背後にいるのは中国系の国家支援アクター<strong>UNC2814</strong>とみられる。最も注目すべきは、攻撃者が指令通信（C2）の経路として<strong>Google SheetsのAPI</strong>を悪用し、自らの通信を正規のクラウドトラフィックに紛れ込ませていた点だ。本稿では、この作戦の手口と、正規SaaSがC2に転用される時代に日本企業の情シスが何を監視すべきかを実務目線で解説する。
      </p>

      <h2>概要</h2>
      <ul>
        <li>
          <strong>脅威アクター</strong>：UNC2814。中国（PRC）系と疑われる国家支援のサイバー諜報グループで、Google Threat Intelligence Group（GTIG）が2017年から追跡。
        </li>
        <li>
          <strong>標的</strong>：通信事業者と政府機関。確認された侵害は<strong>42カ国の53組織</strong>、標的の疑いを含めると<strong>70カ国超</strong>（アフリカ・アジア・南北アメリカ）に及ぶ。
        </li>
        <li>
          <strong>マルウェア</strong>：C言語製バックドア「GRIDTIDE」。任意シェルコマンド実行・ファイル送受信が可能で、C2に<strong>Google Sheets API</strong>を悪用する。
        </li>
        <li>
          <strong>目的</strong>：加入者の個人情報（PII）窃取。氏名・電話番号・生年月日・有権者ID・国民IDなどを抜き、特定人物の監視に用いたとみられる。
        </li>
        <li>
          <strong>対応</strong>：2026年2月、Googleが攻撃者の管理するクラウドプロジェクト・インフラ・APIアカウントを一斉に無効化し、IOC（侵害指標）を公開して作戦を妨害した。
        </li>
      </ul>

      <h2>何が起きたのか</h2>
      <p>
        Google Threat Intelligence Group、Mandiant、およびパートナーは、通信事業者と政府機関を狙ったグローバルなスパイ活動「GRIDTIDE」を摘発し、その基盤を無効化した。攻撃者UNC2814は2017年から追跡されてきた中国系の諜報グループとみられ、今回の作戦では4大陸にまたがる広範な標的を侵害していた。
      </p>
      <p>
        通信事業者が狙われるのには明確な理由がある。通信網は<strong>あらゆる人物の通話・通信・位置情報・加入者データが集約される結節点</strong>だからだ。国家系アクターにとって、特定の要人・反体制派・外国政府関係者を監視するうえで、通信事業者の内部システムは「合法的傍受（lawful intercept）の仕組みごと乗っ取れる」究極の標的になる。実際GRIDTIDEが窃取していたのは、氏名・電話番号・生年月日に加え、有権者IDや国民IDといった<strong>個人を一意に特定できるPII</strong>であり、監視対象者を割り出す目的が色濃い。
      </p>
      <p>
        Googleは2026年2月、攻撃者が司令塔として悪用していたGoogle Cloudプロジェクトとサービスアカウントを特定し、まとめて無効化した。同時にIOCを公開し、世界中の防御側が自組織の侵害有無を確認できるようにした。
      </p>

      <h2>技術的な解説</h2>
      <h3>Google Sheets を「司令塔」にするC2</h3>
      <p>
        GRIDTIDE最大の特徴は、C2（コマンド&amp;コントロール）通信に<strong>Google SheetsのAPI</strong>を悪用した点にある。通常、マルウェアは攻撃者が用意したサーバーと通信して指令を受け取るが、その通信は「見慣れない宛先への怪しい接続」として検知されやすい。
      </p>
      <p>
        GRIDTIDEはこの弱点を、正規クラウドサービスへの「擬態」で回避した。具体的には次のように動く。
      </p>
      <ul>
        <li>攻撃者は特定のGoogleスプレッドシートに、コマンドを書き込む</li>
        <li>感染端末上のGRIDTIDEは、Sheets APIで定期的にそのセルを読み（例：セルA1の値を取得）、指令を受け取る</li>
        <li>コマンドはBase64エンコードされたシェルコマンドとして渡され、端末上で実行される</li>
        <li>窃取データは45KB程度の断片に分割され、スプレッドシートのセルへ書き戻す形で持ち出される</li>
      </ul>
      <p>
        防御側のファイアウォールやプロキシから見れば、これらは<strong>「Google Sheetsへの正常なAPIアクセス」</strong>にしか見えない。多くの企業がGoogle Workspaceを業務利用している以上、Googleドメインへの通信を一律ブロックするのは現実的でなく、攻撃者はその「正規サービスは信頼される」という前提を逆手に取った。これは<a href="/learn/security/lolbins-living-off-the-land">正規ツールを悪用するLOLBins</a>の発想を、クラウドサービスのレイヤーに拡張したものと言える。
      </p>
      <h3>systemd と「xapt」による永続化</h3>
      <p>
        Linuxサーバーに居座るため、GRIDTIDEは<code>/etc/systemd/system/xapt.service</code>という<strong>悪性のsystemdサービス</strong>を作成し、<code>/usr/sbin/xapt</code>のバイナリをroot権限で起動させる。<code>xapt</code>という名前は、Debian系に存在する正規ツールを連想させる<strong>偽装</strong>であり、管理者がプロセス一覧を眺めても見過ごしやすい。
      </p>
      <p>
        さらに攻撃者は<strong>SoftEther VPN Bridge</strong>を展開し、暗号化されたアウトバウンド接続を確立していた。SoftEetherはオープンソースの正規VPNソフトであり、これもまた「正規ツールの悪用」の一例だ。難読化にはURLセーフなBase64（<code>+</code>/<code>/</code>を<code>-</code>/<code>_</code>に置換）を用いるなど、通信を正規API呼び出しに見せかける工夫が徹底されていた。
      </p>
      <h3>どうやって見つかったのか</h3>
      <p>
        高度に擬態されたこの作戦は、ネットワーク通信の異常からではなく<strong>ホスト上のプロセスの振る舞い</strong>から発見された。Mandiantは、Google Security Operations（SecOps）を通じて不審なプロセスツリーを検知した。具体的には、<code>/var/tmp/</code>配下の見慣れないバイナリが<code>sh</code>を起動し、<code>id</code>コマンドを実行して<code>uid=0(root)</code>を確認する——という、攻撃者が侵入直後に権限を確かめる典型的な挙動だ。
      </p>
      <p>
        ここに重要な教訓がある。C2通信を正規クラウドに擬態されると<strong>ネットワーク境界での検知は極めて難しい</strong>。だが、攻撃者がホスト上で行う「権限確認」「永続化設定」「不審なプロセス起動」といった<strong>挙動（behavior）</strong>は隠しきれない。境界防御に頼り切らず、エンドポイントでの振る舞い検知（EDR）を併用することが、この種の高度な脅威に対する突破口になる。
      </p>
      <h3>Salt Typhoon との違い</h3>
      <p>
        通信事業者を狙う中国系アクターとしては、米国の通信網を侵害した「Salt Typhoon」が広く知られている。しかしGoogleは、GRIDTIDE / UNC2814はSalt Typhoonとは<strong>重複しない別個の作戦</strong>であり、TTP（戦術・技術・手順）も標的とする国・組織も異なると評価している。つまり、通信インフラを狙う国家系の諜報活動が<strong>複数並行して</strong>進行している実態を示している。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        GRIDTIDEが直接侵害したのは海外の通信事業者・政府機関だが、その手口と教訓は日本企業にそのまま当てはまる。
      </p>
      <ul>
        <li>
          <strong>正規SaaSのC2悪用は業種を問わない</strong>：Google Sheetsに限らず、攻撃者はGitHub・Slack・Telegram・各種クラウドストレージをC2に転用する。Google Workspaceを使う日本企業にとって、「Googleドメインだから安全」という前提は崩れている。
        </li>
        <li>
          <strong>通信・インフラ事業者は直接の標的たり得る</strong>：日本の通信キャリアやMVNO、データセンター事業者は、加入者データを抱える以上、国家系アクターの監視ニーズの対象になり得る。
        </li>
        <li>
          <strong>サプライチェーン経由の波及</strong>：政府機関や重要インフラと取引のある日本企業は、踏み台や情報源として狙われる可能性がある。
        </li>
      </ul>
      <p>
        国家系APTは金銭目的のランサムウェアと異なり、<strong>長期間にわたって静かに潜伏し情報を抜き続ける</strong>のが特徴だ。<a href="/learn/security/apt28-prismex-nato">APT28</a>や<a href="/learn/security/muddywater-teams-fake-ransomware">MuddyWater</a>の事例でも見たとおり、派手な被害が出ないぶん発見が遅れやすく、気づいたときには数年分のデータを抜かれていることもある。
      </p>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. 正規クラウドサービスへのアウトバウンド通信を可視化する</h3>
      <p>
        GRIDTIDEの教訓は「正規サービスへの通信＝安全ではない」という点に尽きる。Google API・GitHub・各種SaaSへのアウトバウンド通信を可視化し、次のような異常を検知できるようにする。
      </p>
      <ul>
        <li>サーバー（特に業務ロジックを持たない基盤サーバー）からの予期しないクラウドAPIアクセス</li>
        <li>業務時間外・一定間隔（ビーコン的）での定期的なAPI通信</li>
        <li>通常使わないGoogle/SaaSアカウントを用いた認証</li>
      </ul>
      <h3>2. systemd の永続化を監査する</h3>
      <p>
        Linuxサーバーで不審なsystemdサービスが仕込まれていないかを確認する。<code>xapt</code>のように正規ツールを装う名前に注意したい。
      </p>
      <pre><code>{`# 有効化されている systemd サービスを一覧（見覚えのない項目を精査）
systemctl list-unit-files --type=service --state=enabled

# 最近作成・変更されたユニットファイルを確認
ls -lat /etc/systemd/system/*.service /usr/lib/systemd/system/*.service | head

# 怪しいサービスの実体（ExecStart のバイナリパス）を確認
systemctl cat <service-name>`}</code></pre>
      <h3>3. 不審なプロセスと一時ディレクトリを確認する</h3>
      <p>
        GRIDTIDEは<code>/var/tmp/</code>や<code>/usr/sbin/</code>にバイナリを置いていた。書き込み可能なディレクトリから実行されるバイナリや、root権限で動く見慣れないプロセスを洗い出す。
      </p>
      <pre><code>{`# /tmp・/var/tmp から実行されているプロセスを確認
ls -la /var/tmp /tmp
ps -ef --forest

# 不審なアウトバウンド接続（VPNブリッジ等）を確認
ss -tunp | grep ESTAB`}</code></pre>
      <h3>4. EDRによる「振る舞い検知」を併用する</h3>
      <p>
        ネットワーク境界での検知が効きにくいぶん、エンドポイント側で挙動を捉える層が決め手になる。侵入直後の権限確認（<code>id</code>・<code>whoami</code>）、永続化設定、不審な子プロセス生成といった<strong>攻撃者の振る舞い</strong>をEDRで検知・アラート化する。<a href="/learn/security/mitre-attack">MITRE ATT&amp;CK</a>のTTPにマッピングして検知ルールの抜けを点検すると効果的だ。
      </p>
      <h3>5. 公開されたIOCで自組織を点検する</h3>
      <p>
        GoogleはGRIDTIDEのIOC（バイナリのハッシュ値、C2サーバーのIPアドレス、ドメイン、YARAルール等）を公開している。これらを自組織のSIEM・EDR・プロキシログに照合し、過去にさかのぼって痕跡がないかを確認する。万一ヒットした場合は<a href="/learn/security/incident-response-guide">インシデント対応手順</a>に沿って封じ込めと証拠保全を進める。
      </p>

      <h2>参考情報</h2>
      <ul>
        <li>Google Cloud Threat Intelligence / Mandiant: Disrupting the GRIDTIDE Global Cyber Espionage Campaign</li>
        <li>Google Threat Intelligence Group（GTIG）: UNC2814 に関する分析・IOC公開</li>
        <li>Mandiant: 通信事業者を狙う国家支援アクターの脅威動向</li>
      </ul>
    </ArticleLayout>
  );
}
