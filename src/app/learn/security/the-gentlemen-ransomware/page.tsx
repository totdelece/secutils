import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "the-gentlemen-ransomware")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        「丁寧な紳士」を名乗るランサムウェアグループ<strong>The Gentlemen</strong>が、自己増殖する強力なエンコーダ（暗号化マルウェア）でネットワークを次々と制圧している。2026年5月28日、Microsoftはこのランサムウェアを「Dissecting a self-propagating Go encryptor（自己増殖するGo製エンコーダの解剖）」として詳細に解析した。最大の特徴は、<strong>1台の侵害を起点に、人手をほとんど介さず自動でネットワーク全体へ広がる</strong>点にある。本稿では、その拡散メカニズムと検知妨害の手口、そして組織が「広がる前に止める」ために確認すべきことを解説する。
      </p>

      <h2>概要</h2>
      <ul>
        <li>
          <strong>マルウェア</strong>：ランサムウェア「The Gentlemen」。暗号化モジュールはGo言語で書かれている。
        </li>
        <li>
          <strong>運用主体</strong>：Microsoftが<strong>Storm-2697</strong>と追跡する金銭目的のグループ。2025年中頃に出現し、2025年9月からRaaS（Ransomware-as-a-Service）として提携先（アフィリエイト）に提供。BreachForumsと公式提携し、ペネトレーションテスターや初期アクセスブローカーを募っている。
        </li>
        <li>
          <strong>手口</strong>：二重恐喝（データを暗号化しつつ窃取し、公開すると脅す）。Go製エンコーダが<strong>1標的あたり21通りの実行手段</strong>でネットワーク内を自動拡散する。
        </li>
        <li>
          <strong>標的</strong>：教育・運輸・医療・金融など。北米・南米・欧州・アフリカ・アジアと地理的に広範。
        </li>
      </ul>

      <h2>何が起きたのか</h2>
      <p>
        The Gentlemenは2025年中頃に「閉じた（クローズドな）」ランサムウェアグループとして登場し、同年9月にRaaSモデルへ移行した。RaaSとは、ランサムウェア本体を開発する運営者（ここではStorm-2697）が、実際に攻撃を実行する提携先に「サービス」として貸し出すビジネス形態だ。運営者はツールとインフラを提供し、提携先が侵入・展開を担い、得た身代金を分け合う。
      </p>
      <p>
        さらにThe Gentlemenはサイバー犯罪フォーラムBreachForumsと公式に提携し、侵入の専門家（ペネトレーションテスターや、すでに侵入済みのアクセスを売買する初期アクセスブローカー）を積極的に勧誘している。これは「分業化・産業化したランサムウェアエコシステム」の典型であり、攻撃者は自前で全工程をこなす必要がなく、各専門家が役割を分担する。結果として攻撃の母数と速度が増す。
      </p>
      <p>
        被害は教育・運輸・医療・金融など重要分野に及び、地理的にも5大陸にまたがる。RaaS化と提携先拡大により、短期間で被害組織が積み上がっている。
      </p>

      <h2>技術的な解説</h2>
      <h3>「21通り」で総当たりする自己増殖</h3>
      <p>
        The Gentlemenが厄介なのは、感染した1台から<strong>自動的に他のホストへ伝播する自己増殖能力</strong>だ。Microsoftの解析によれば、エンコーダは次のような段階で拡散する。
      </p>
      <ol>
        <li>感染ホスト上に自身を配置し、<strong>隠しSMB共有</strong>を作成して、拡散用の配布ツールとして<strong>PsExec</strong>を展開する</li>
        <li>ネットワークを列挙し、ワークステーション・サーバー・<strong>ドメインコントローラー</strong>を発見して伝播先を特定する</li>
        <li>各標的に対し、<strong>21通りのリモート実行</strong>を試みる</li>
      </ol>
      <p>
        この「21通り」は、以下のような複数の実行手法を組み合わせたものだ。
      </p>
      <ul>
        <li>PsExecによる実行</li>
        <li>WMIC（WMI）でのプロセス生成</li>
        <li>スケジュールタスク（ユーザー／システム両方の権限）</li>
        <li>Windowsサービスとしての登録</li>
        <li>PowerShellリモーティング</li>
        <li>PowerShell経由のWMI実行</li>
      </ul>
      <p>
        それぞれが、感染ホストのSMB共有上のペイロードと、標的のローカルディレクトリの両方を狙う。Microsoftが指摘するとおり、<strong>「1台に対して1つの手法が成功すれば、そこから拡散が継続する」</strong>。つまり、防御側が大半の経路を塞いでいても、どこか1つの穴が空いていれば突破されてしまう。これらの実行手法はいずれもWindows標準の正規機能（<a href="/learn/security/lolbins-living-off-the-land">LOLBins</a>）であり、マルウェア固有のシグネチャに頼る検知をすり抜けやすい。
      </p>
      <h3>オペレーターが拡散範囲を制御する</h3>
      <p>
        The Gentlemenはコマンドライン引数で挙動を細かく制御できる。暗号化対象を<code>--system</code>（ローカルドライブ）、<code>--shares</code>（ネットワーク共有）、<code>--full</code>（両方）で指定し、横展開に使う認証情報（明示的な資格情報、または現在のセッショントークンの再利用）も指定できる。攻撃者は標的環境に合わせて「どこまで暗号化するか」「どの権限で広がるか」を調整する。
      </p>
      <h3>検知妨害と復旧手段の破壊</h3>
      <p>
        The Gentlemenは暗号化の前に、徹底的に防御と復旧手段を潰す。
      </p>
      <ul>
        <li>
          <strong>セキュリティ製品の無効化</strong>：PowerShellでMicrosoft Defenderのリアルタイム監視を無効化し、マルウェアを除外リストに追加。さらに<strong>C:ドライブ全体をスキャン対象から除外</strong>する。
        </li>
        <li>
          <strong>復旧手段の破壊</strong>：<code>vssadmin</code>と<code>wmic</code>でボリュームシャドウコピーを削除し、<code>wevtutil</code>でシステム・アプリケーション・セキュリティのイベントログを消去する。
        </li>
        <li>
          <strong>フォレンジック痕跡の消去</strong>：プレフェッチファイル、Defender診断ログ、RDPログを削除し、全ユーザープロファイルの<strong>PowerShellコマンド履歴を手動で削除</strong>する。
        </li>
        <li>
          <strong>プロセス・サービスの停止</strong>：データベース（SQL Server / MySQL / PostgreSQL）、バックアップソフト（Veeam）、EDRツール、Officeアプリなど<strong>40以上のプロセスと30以上のサービス</strong>を停止し、ファイルのロックを解いて暗号化できる状態にする。
        </li>
        <li>
          <strong>永続化</strong>：<code>UpdateSystem</code>・<code>UpdateUser</code>というスケジュールタスクと、<code>GupdateS</code>・<code>GupdateU</code>というレジストリRunキーを作成する。
        </li>
      </ul>
      <h3>暗号化の仕組み</h3>
      <p>
        暗号化は堅牢に設計されている。ファイルごとに使い捨て（エフェメラル）の<strong>Curve25519鍵ペア</strong>を生成し、ECDHで導出した共有鍵で<strong>XChaCha20</strong>ストリーム暗号により暗号化する。ノンス（使い捨ての数値）はエフェメラル公開鍵の先頭24バイトから導出される。1MB以下のファイルは全体を暗号化し、それより大きいファイルは分散したオフセットで3つのチャンクを暗号化する。速度フラグで暗号化強度を調整でき、デフォルトでは大きいファイルの約27%、<code>--ultrafast</code>では約0.9%だけを暗号化して高速に人質化する。攻撃者の秘密鍵がなければ復号は現実的に不可能だ。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        The Gentlemenの標的には医療・金融・教育・運輸が含まれ、これは日本の重要インフラ・サービス業の構成と重なる。特に注意すべきは次の点だ。
      </p>
      <ul>
        <li>
          <strong>自己増殖は「初動の遅れ」を致命傷にする</strong>：1台の感染を検知して対処する前に、自動で全社に広がってしまう。従来の「感染端末を1台ずつ隔離」では追いつかない速度で被害が拡大する。
        </li>
        <li>
          <strong>ドメインコントローラーが狙われる</strong>：DCを押さえられると、Active Directory経由で組織全体に展開される。<a href="/learn/security/mfa-totp-fido2">特権アカウントの保護</a>が崩れると一気に全滅する。
        </li>
        <li>
          <strong>バックアップごと破壊される</strong>：シャドウコピー削除とVeeam停止により、オンラインバックアップは無力化される。「バックアップを取っているから大丈夫」が通用しない。
        </li>
        <li>
          <strong>RaaSの提携先拡大で標的が無差別化</strong>：BreachForums提携で攻撃者の母数が増えるほど、知名度の低い中小企業も「たまたま侵入できたから」という理由で被害に遭う。
        </li>
      </ul>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. 改ざん防止（Tamper Protection）を有効化する</h3>
      <p>
        The GentlemenはまずDefenderを無効化しようとする。改ざん防止を有効にしておけば、マルウェアがセキュリティサービスを停止したり除外リストを書き換えたりする操作に抵抗できる。「C:全体を除外」のような不審な除外設定が追加されていないかも確認する。
      </p>
      <h3>2. 横展開の経路を塞ぐ</h3>
      <p>
        自己増殖は横展開の経路に依存する。次を点検する。
      </p>
      <ul>
        <li>PsExec・WMI・PowerShellリモーティングによる端末間のリモート実行を、EDRのASRルール（PSExec/WMIからのプロセス生成をブロック）で制限する</li>
        <li>管理共有（C$・ADMIN$）やSMBによる端末間アクセスを最小化する（ネットワークセグメンテーション、ホストファイアウォール）</li>
        <li>ローカル管理者パスワードを端末ごとに一意にする（LAPS等）。同一資格情報の使い回しは横展開を容易にする</li>
      </ul>
      <h3>3. 制御フォルダーアクセスとEDRブロックモードを有効化する</h3>
      <p>
        Microsoft推奨の防御として、<strong>制御フォルダーアクセス</strong>（重要フォルダへの不正な変更を制限）、<strong>EDRのブロックモード</strong>、<strong>Microsoft Defender XDRの自動攻撃中断</strong>、<strong>クラウド配信の保護</strong>を有効化する。自動攻撃中断は、自己増殖型の攻撃に対し「広がる前に隔離する」効果が期待できる。
      </p>
      <h3>4. オフライン／イミュータブルなバックアップを用意する</h3>
      <p>
        シャドウコピーとオンラインバックアップは破壊される前提で、ネットワークから隔離されたオフラインバックアップ、または書き換え不可能なイミュータブルストレージを用意する。そして<strong>実際に復旧できるかを定期的にテスト</strong>する。
      </p>
      <h3>5. 早期の前兆を検知する</h3>
      <p>
        暗号化本番の前には、必ず「準備行動」がある。これらを検知できれば被害を最小化できる。
      </p>
      <pre><code>{`# ランサムウェアの典型的な前兆。EDR/SIEMでアラート化する
vssadmin delete shadows /all /quiet      # シャドウコピー削除
wevtutil cl Security                      # イベントログ消去
Set-MpPreference -DisableRealtimeMonitoring $true   # Defender無効化
Add-MpPreference -ExclusionPath C:\\       # スキャン除外の追加

# 不審なスケジュールタスク/レジストリRunキーも監視
#  タスク名: UpdateSystem / UpdateUser
#  Runキー : GupdateS / GupdateU`}</code></pre>
      <p>
        これらの兆候や暗号化を検知した場合は、ただちに<a href="/learn/security/incident-response-guide">インシデント対応手順</a>に沿ってネットワーク隔離・封じ込めを行い、自己増殖の連鎖を断つ。
      </p>

      <h2>参考情報</h2>
      <ul>
        <li>Microsoft Security Blog: The Gentlemen ransomware — Dissecting a self-propagating Go encryptor（2026年5月28日）</li>
        <li>Microsoft Threat Intelligence: Storm-2697 / The Gentlemen RaaS に関する分析</li>
        <li>CYFIRMA: Weekly Intelligence Report（The Gentlemen の被害動向）</li>
      </ul>
    </ArticleLayout>
  );
}
