import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "turla-kazuar-p2p-botnet")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        ロシアの国家支援APTグループ<strong>Turla</strong>（Microsoftの呼称はSecret Blizzard）が、長年使い続けてきたバックドア<strong>Kazuar</strong>を、モジュール型のP2P（ピアツーピア）ボットネットへと作り替えた。2026年5月14日にMicrosoftが「Kazuar: Anatomy of a nation-state botnet」として詳細を公表した本事案は、国家系の諜報マルウェアが「いかにして長期間気づかれずに居座るか」を突き詰めた到達点を示している。単なる新型マルウェアの紹介ではなく、<strong>検知を避けるための設計思想そのもの</strong>が脅威の核心だ。本稿ではその構造と、防御側が取るべき対策を解説する。
      </p>

      <h2>概要</h2>
      <ul>
        <li>
          <strong>脅威アクター</strong>：Turla / Secret Blizzard。ロシア連邦保安庁（FSB）Center 16に紐づくとされる国家支援グループ（別名 Venomous Bear / Snake / Uroburos など）。
        </li>
        <li>
          <strong>マルウェア</strong>：.NET製バックドア「Kazuar」。2017年から使われ続けてきたが、単体（モノリシック）構成から<strong>Kernel・Bridge・Workerの3モジュール型P2Pボットネット</strong>へ進化。
        </li>
        <li>
          <strong>狙い</strong>：外務省・大使館・政府機関・防衛省庁・防衛関連企業。欧州・中央アジア・ウクライナが中心の長期的な諜報（情報収集）。
        </li>
        <li>
          <strong>本質</strong>：機能の派手さではなく「<strong>検知されにくさ</strong>」を徹底追求した設計。リーダー選出で外部通信する端末を1台に絞り、ネットワーク上の痕跡を最小化する。
        </li>
      </ul>

      <h2>何が起きたのか</h2>
      <p>
        Kazuarは2017年から観測されてきた成熟したバックドアであり、Turlaの主力ツールの一つだ。Microsoftの最新解析は、このKazuarが「比較的伝統的な単体バックドア」から「高度にモジュール化されたP2Pボットネットのエコシステム」へと変貌した過程を明らかにした。
      </p>
      <p>
        なぜ国家系アクターがわざわざこのような作り替えを行うのか。答えは彼らの目的にある。金銭目的のサイバー犯罪が「素早く侵入し、素早く換金する」のに対し、国家系の諜報活動は<strong>何ヶ月、何年にもわたって標的の内部に潜み、情報を抜き続ける</strong>ことを目指す。そのためには、単発の侵入よりも「気づかれずに居座り続ける持続性（パーシステンス）」と「発見されても全体が崩れない冗長性」が決定的に重要になる。Kazuarのモジュール化とP2P化は、まさにこの長期潜伏を最適化するための進化だった。
      </p>

      <h2>技術的な解説</h2>
      <h3>3つのモジュール：Kernel・Bridge・Worker</h3>
      <p>
        新しいKazuarは、役割を明確に分けた3種類のモジュールで構成される。一枚岩のマルウェアを分割することで、各端末が担う機能を最小化し、解析や検知を難しくしている。
      </p>
      <table>
        <thead>
          <tr>
            <th>モジュール</th>
            <th>役割</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kernel（中核）</td>
            <td>タスクの割り当て・他モジュールの制御・通信の統括を行う司令塔。リーダー選出を実装し、外部通信を担う代表を決める。</td>
          </tr>
          <tr>
            <td>Bridge（橋渡し）</td>
            <td>リーダーKernelとC2インフラの間を中継する外部通信層。使用するトランスポート（通信方式）に依存せず動く。</td>
          </tr>
          <tr>
            <td>Worker（実働）</td>
            <td>実際のタスクを実行し、スクリーンショット・キーストローク・ファイル・メールなどの情報を収集する。</td>
          </tr>
        </tbody>
      </table>
      <h3>「リーダー選出」が検知を難しくする</h3>
      <p>
        最も注目すべき仕組みが<strong>リーダー選出（leadership election）</strong>だ。あるネットワーク内で複数の端末がKazuarに感染している場合、全端末がそれぞれ外部のC2サーバーと通信すれば、その通信量と接続先の不審さから検知されやすくなる。
      </p>
      <p>
        Kazuarはこれを避けるため、感染端末同士でローカルに連携（P2P）し、<strong>外部と通信する代表を1台だけ選出</strong>する。選出はWindowsの「Mailslot」という端末間通信の仕組みを使い、稼働時間（再起動やログオフによる中断を差し引いたアップタイム）を基準に行われる。残りの端末は、この代表を経由して指令を受け取りデータを送る。結果として、外向きの通信痕跡が劇的に減り、ネットワーク監視からの発見が難しくなる。1台が駆除されても別の端末が新たなリーダーになるため、ボットネット全体は生き残る冗長性も備える。
      </p>
      <h3>HTTP・WebSocket・Exchange Web Servicesの多重C2</h3>
      <p>
        外部C2との通信チャネルは3種類用意されている。
      </p>
      <ul>
        <li><strong>HTTP</strong>（デフォルト）</li>
        <li><strong>WebSocket（WSS）</strong></li>
        <li><strong>Exchange Web Services（EWS）</strong>——メールベースの通信。正規のExchange/メールトラフィックに紛れる。</li>
      </ul>
      <p>
        特にEWSを使ったメール経由の指令通信は、業務メールの中に紛れ込むため検知が極めて難しい。さらにKazuarは<strong>150種類以上の設定項目</strong>を持ち、通信方式・実行/インジェクション・セキュリティ回避・送信タイミング・収集対象などを細かく調整できる。攻撃者は標的環境に合わせて挙動を最適化し、「目立たない設定」を選べる。
      </p>
      <h3>隠蔽・対解析の徹底</h3>
      <p>
        Kazuarはアンチ解析・サンドボックス検知のルーチンを多数備え、さらにWindowsの防御機構を無効化・回避する。
      </p>
      <ul>
        <li><strong>AMSI</strong>（Antimalware Scan Interface）のバイパス——スクリプトのスキャンを回避</li>
        <li><strong>ETW</strong>（Event Tracing for Windows）のバイパス——イベントログによる追跡を妨害</li>
        <li><strong>WLDP</strong>（Windows Lockdown Policy）のバイパス</li>
        <li><strong>通信ブラックアウト期間</strong>の設定——一定時間通信を止め、正常な通信パターンに溶け込む</li>
      </ul>
      <p>
        これらは「侵入する技術」というより「<strong>居座り続けるための技術</strong>」だ。検知ロジックの目をかいくぐり、ログに残らず、通信のリズムを偽装する——国家系アクターが時間をかけて磨き上げた持続性の結晶と言える。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        Turlaが直接狙うのは欧州・中央アジア・ウクライナの政府・防衛機関であり、日本企業がいきなり主標的になる可能性は相対的に低い。しかし、ここから学ぶべき教訓は日本の組織にも普遍的に当てはまる。
      </p>
      <ul>
        <li>
          <strong>「侵入検知」だけでは不十分</strong>：Kazuarのような脅威は、侵入そのものより「侵入後に何ヶ月も気づかれずに潜伏する」点が脅威だ。境界での侵入検知に偏重し、内部での持続的活動を見ていない組織は、長期潜伏型の攻撃に弱い。
        </li>
        <li>
          <strong>正規プロトコルのC2悪用は防ぎにくい</strong>：EWS（Exchange）やHTTPS/WebSocketを使ったC2は、業務通信に紛れる。<a href="/learn/security/gridtide-unc2814-telecom-espionage">Google SheetsをC2に悪用したGRIDTIDE</a>と同様、「正規サービスへの通信＝安全」という前提が崩れている。
        </li>
        <li>
          <strong>防衛・先端技術・政府関連の取引先は標的になり得る</strong>：直接の標的でなくとも、サプライチェーンや情報源として日本企業が経由地にされる懸念は残る。
        </li>
      </ul>
      <p>
        国家系APTは<a href="/learn/security/apt28-prismex-nato">APT28</a>や<a href="/learn/security/muddywater-teams-fake-ransomware">MuddyWater</a>の事例でも見たとおり、静かに長期間潜む。派手な被害が出ないぶん発見が遅れ、気づけば長期間にわたり情報を抜かれていることもある。
      </p>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. 攻撃面削減（ASR）ルールを有効化する</h3>
      <p>
        MicrosoftはKazuar対策として攻撃面削減（Attack Surface Reduction）ルールの適用を推奨している。難読化スクリプトの実行、PSExecやWMIによるコマンド実行をブロックすることで、Kazuarが多用する実行手法を封じられる。
      </p>
      <h3>2. EDRのブロックモードとネットワーク保護を有効化する</h3>
      <p>
        Microsoft Defender for Endpointの<strong>ブロックモード</strong>、<strong>ネットワーク保護</strong>、<strong>改ざん防止（Tamper Protection）</strong>、<strong>クラウド配信の保護</strong>を有効にする。Kazuarが定義更新の無効化やセキュリティ製品の改ざんを試みても、改ざん防止が働けば抵抗できる。
      </p>
      <h3>3. PowerShellログとスクリプト実行を統制する</h3>
      <p>
        AMSIやETWのバイパスを試みる挙動を捉えるため、PowerShellのスクリプトブロックログ・モジュールログを有効化する。SmartScreenと実行ポリシーで未署名スクリプトの実行を制限し、ログが取れる状態を維持する。
      </p>
      <h3>4. 内部の横方向通信（Mailslot/IPC）を監視する</h3>
      <p>
        Kazuarのリーダー選出はWindowsのMailslotやメッセージング機構を使う。端末間の予期しないIPC通信や、内部ネットワークでの不審な相互接続を監視対象に加える。「外向き通信が1台に集中している」という偏りも、リーダー集約の兆候になり得る。
      </p>
      <h3>5. EWS・メール経由のC2を疑う</h3>
      <p>
        Exchange Web Services経由のC2は業務メールに紛れる。Exchange/OWAのアクセスログで、自動化された不審なEWSアクセス、見覚えのないアプリ・サービスアカウントによる接続、定期的（ビーコン的）なパターンがないかを確認する。<a href="/learn/security/exchange-cve-2026-42897">Exchange関連の脅威</a>と併せて、メール基盤の監視を強化したい。
      </p>
      <h3>6. 長期潜伏を前提にスレットハンティングを実施する</h3>
      <p>
        「侵入されていないか」ではなく「すでに潜伏されていないか」という視点で、定期的なスレットハンティングを行う。少しでも痕跡が見つかれば<a href="/learn/security/incident-response-guide">インシデント対応手順</a>に沿って対応する。
      </p>

      <h2>参考情報</h2>
      <ul>
        <li>Microsoft Security Blog: Kazuar — Anatomy of a nation-state botnet（2026年5月14日）</li>
        <li>The Hacker News: Turla Turns Kazuar Backdoor Into Modular P2P Botnet for Persistent Access</li>
        <li>BleepingComputer: Russian hackers turn Kazuar backdoor into modular P2P botnet</li>
        <li>Security Affairs: Russian APT Turla builds long-term access tool with Kazuar Botnet evolution</li>
      </ul>
    </ArticleLayout>
  );
}
