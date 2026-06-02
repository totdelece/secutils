import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "muddywater-teams-fake-ransomware")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>何が起きたのか</h2>
      <p>
        イラン国家系APTグループMuddyWater（別名：Mango Sandstorm・Mercury・Seedworm）が、2026年前半にMicrosoft Teamsを使った高度なソーシャルエンジニアリングで組織に侵入し、Chaosランサムウェアのアーティファクトをインシデント対応チームを欺くための「偽旗（false flag）」として残していたことが判明した。セキュリティ研究会社Rapid7が公開したレポートによると、攻撃の本質は金銭目的のランサムウェアではなく、イラン情報省（MOIS）に資する国家スパイ活動（諜報・認証情報窃取・データ持ち出し）である。
      </p>

      <h2>Teams「ITサポートなりすまし」の手口</h2>
      <p>
        攻撃の入り口はMicrosoft Teamsだった。攻撃者は外部テナントのアカウントを用意し、ターゲット組織の従業員に対して「社内ITサポート」を名乗るTeamsメッセージを送信した。
      </p>
      <p>
        Teamsはデフォルト設定で外部テナントからのメッセージ受信を許可していることが多く、組織の従業員は受信したメッセージが本当に社内のITチームからのものかどうかを画面上だけで判断しにくい。攻撃者はこの「信頼の非対称性」を利用した。
      </p>
      <p>
        画面共有セッションが確立されると、攻撃者は以下の操作を実行した。
      </p>
      <ul>
        <li>認証情報の詐取（入力させる、または画面から読み取る）</li>
        <li>MFA保護の操作（認証の承認を被害者本人にさせる）</li>
        <li>正規のリモートアクセスツール（DWAgent・AnyDesk）のインストール誘導</li>
      </ul>
      <p>
        この後、DWAgentやAnyDeskを経由した持続的なリモートアクセス基盤が確立され、攻撃者はいつでも組織内に入り込める状態になった。
      </p>

      <h2>Chaosランサムウェアは「煙幕」だった</h2>
      <p>
        侵害された環境にはChaosランサムウェアのバイナリと関連アーティファクトが残されていた。しかし、実際にファイル暗号化は一切実行されなかった。
      </p>
      <p>
        Rapid7はこの行動を以下のように分析している。
      </p>
      <ul>
        <li><strong>帰属妨害</strong>: ランサムウェアのアーティファクトが見つかれば、インシデント対応チームの調査は「金銭目的の犯罪グループ」という方向に誘導される。国家スパイという仮説に辿り着くまでに時間を稼げる</li>
        <li><strong>対応リソースの分散</strong>: ランサムウェアと認識されると組織の対応はバックアップ確認・復旧・身代金交渉に集中し、攻撃者の真の目標（データ窃取・永続化）の継続が容易になる</li>
        <li><strong>エスカレーション回避</strong>: ランサムウェアインシデントは犯罪として処理されやすいが、国家スパイ活動として認識されれば政府機関への報告・外交問題化が生じ得る</li>
      </ul>

      <h2>技術的な解説</h2>
      <h3>MuddyWaterの帰属根拠</h3>
      <p>
        Rapid7は以下の根拠からMuddyWaterへの帰属を判断した。
      </p>
      <ul>
        <li>悪性実行ファイル「ms_upd.exe」の署名に使われたコードサイニング証明書の名義（"Donald Gay"）がMuddyWaterの過去のキャンペーンで使用したものと一致</li>
        <li>使用されたC2インフラがMuddyWaterの既知IPアドレス範囲と重複</li>
        <li>DWAgentを使った永続化はMuddyWaterのTTPに合致</li>
      </ul>
      <p>
        MuddyWaterは米政府によってイランの情報省（MOIS）と公式に関連付けられているAPTグループであり、2011年頃から活動が観測されている。主な標的は中東・中央アジア・欧米の政府機関・防衛関連企業・通信事業者だが、近年はアジア・太平洋地域への拡大も確認されている。
      </p>

      <h3>DLLサイドローディングによる別キャンペーン</h3>
      <p>
        同時期（2026年第1四半期）に別のMuddyWaterキャンペーンも確認されており、DLLサイドローディング技術を使って4大陸・9カ国・少なくとも9組織を侵害した。このキャンペーンでは正規の署名済みバイナリを踏み台に使った。
      </p>
      <table>
        <thead>
          <tr>
            <th>使用されたバイナリ</th>
            <th>正規の用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>fmapp.exe（Fortemedia製）</td>
            <td>オーディオデバイスドライバ管理</td>
          </tr>
          <tr>
            <td>sentinelmemoryscanner.exe（SentinelOne製）</td>
            <td>セキュリティスキャン</td>
          </tr>
        </tbody>
      </table>
      <p>
        特にSentinelOne製のバイナリを悪用することで、セキュリティ製品そのものがDLLサイドローディングの踏み台になるという皮肉な状況が生まれた。正規のデジタル署名付きバイナリがプロセスを起動するため、多くのEDRは親プロセスの正規性判定をパスしてしまう。
      </p>

      <h3>正規RATの悪用：C2の隠蔽</h3>
      <p>
        MuddyWaterはC2通信に正規のリモート管理ツール（RMM）を好んで使用する。AnyDesk・DWAgent・SimpleHelpなどは正規のサポートソフトウェアであり、URLレピュテーションチェックやプロキシフィルタリングをすり抜けやすい。また、組織内にIT部門が使う「正規のRAT」が存在する環境では、ログの中から悪性の使用を識別することが困難になる。
      </p>

      <h3>偽旗作戦としてのChaosランサムウェア</h3>
      <p>
        Chaosはオープンソースとして公開されているランサムウェアビルダーで、犯罪グループが広く使用している。MuddyWaterはChaosのバイナリをシステム上に置くことで「これは犯罪グループのランサムウェア攻撃だ」という第一印象を作り出した。
      </p>
      <p>
        インシデントレスポンダーはランサムウェアを発見すると、初動対応として以下を実施する傾向がある。
      </p>
      <ol>
        <li>感染拡大の封じ込め（ネットワーク隔離）</li>
        <li>バックアップからの復旧計画立案</li>
        <li>身代金交渉の検討</li>
        <li>ランサムウェアグループの特定</li>
      </ol>
      <p>
        これらに集中している間、攻撃者が設置したバックドアは見落とされ、窃取したデータ・認証情報はすでに外部に出ている可能性がある。
      </p>

      <h2>日本企業への影響</h2>
      <h3>Teamsを使った攻撃は特定APTに限らない</h3>
      <p>
        日本企業がMuddyWater自体に標的にされる可能性は限定的かもしれないが、Teamsを使った「ITサポートなりすまし」手口は複数の攻撃グループで確認されている。
      </p>
      <ul>
        <li><strong>Black Basta</strong>（ランサムウェアグループ）: 2024〜2025年にTeamsを使ったソーシャルエンジニアリング攻撃を大規模展開。社内ITを装ってQuick Assistのインストールを誘導</li>
        <li><strong>Storm-0324</strong>（マルウェアディストリビューター）: TeamsでフィッシングURLを配布し、JSSLoaderを感染させた</li>
      </ul>
      <p>
        つまり「Teams DMでITサポートを名乗って画面共有を求められた場合の対応手順」は、MuddyWaterに限らず広く必要とされる防御だ。
      </p>

      <h3>ランサムウェアの過少診断リスク</h3>
      <p>
        「ランサムウェアに見えるが暗号化されていない」インシデントは、防御側にとって混乱を招く。以下のリスクがある。
      </p>
      <ul>
        <li>侵害の全体像を把握できないまま復旧してしまい、バックドアが残存する</li>
        <li>情報漏洩の事実を認識できず、個人情報保護法の報告義務を満たせない</li>
        <li>攻撃者の真の目的（産業スパイ・技術情報窃取）を見逃す</li>
      </ul>
      <p>
        日本の製造業・防衛関連・半導体・政府調達に関わる組織は、国家スパイの関心対象となる可能性を念頭に置き、「ランサムウェアインシデントが偽旗である可能性」を初動調査の段階から検討すべきだ。
      </p>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. Teams外部アクセス設定を見直す</h3>
      <p>
        外部テナントからTeamsメッセージを受信できる設定になっているかを確認する。不要な場合は外部テナントからの直接DMを無効化するか、許可ドメインを限定する。
      </p>
      <pre><code>{`# Teams管理センターで確認する設定箇所
# 管理センター > 外部アクセス
# 「外部のTeamsユーザーが組織内ユーザーを検索・連絡できるようにする」`}</code></pre>

      <h3>2. 外部からのTeams画面共有要求に確認フローを設ける</h3>
      <p>
        正規の社内ITサポートが画面共有を求める際の標準手順を文書化し、Teamsのみ（電話・別チャネルでの確認なし）の要求では応じないルールを設ける。「TeamsでITサポートを名乗る人物から画面共有を求められたら、IT部門のヘルプデスクチケット番号を確認する」という手順が有効だ。
      </p>

      <h3>3. リモートアクセスツールのインストールを制御する</h3>
      <p>
        AnyDesk・DWAgent・SimpleHelpなど未承認のRMMツールのインストールをアプリ制御ポリシー（WDAC・AppLocker・Intune）でブロックする。インストール済みのRMMツールを定期的に棚卸しし、未承認のものを即時削除する。
      </p>

      <h3>4. ランサムウェアインシデントの初動に「偽旗チェック」を組み込む</h3>
      <p>
        ランサムウェアのアーティファクトが見つかっても、以下を確認してから対応方針を決める。
      </p>
      <ul>
        <li>実際にファイルが暗号化されているか</li>
        <li>身代金メモが表示されているか</li>
        <li>暗号化されていないのにランサムウェアバイナリが置かれている場合は偽旗の可能性を検討する</li>
        <li>C2通信の痕跡・バックドアの存在・認証情報の持ち出しを独立して調査する</li>
      </ul>

      <h3>5. DLLサイドローディングの検知を強化する</h3>
      <p>
        Sysmon・EDRのDLLインジェクション検知を有効化し、正規の署名済みバイナリが予期しないパスからDLLをロードしていないかを監視する。Fortemedia（fmapp.exe）やSentinelOne製バイナリが不審な動作をしていないかをアラートの対象に追加する。
      </p>

      <h3>6. テナント外からのTeams着信を識別できるよう教育する</h3>
      <p>
        TeamsのUIでは外部テナントからのメッセージに「外部」バッジが表示される。このUIの見方を従業員に周知し、外部ユーザーからのITサポートを名乗る連絡を「必ず怪しいと思え」という文化を醸成する。インシデント対応の基本については <a href="/learn/security/incident-response-guide">セキュリティインシデント対応手順</a> も参照されたい。
      </p>

      <h2>参考情報</h2>
      <ul>
        <li>The Hacker News: MuddyWater Uses Microsoft Teams to Steal Credentials in False Flag Ransomware Attack</li>
        <li>SecurityWeek: Iranian APT Intrusion Masquerades as Chaos Ransomware Attack</li>
        <li>BleepingComputer: MuddyWater hackers use Chaos ransomware as a decoy in attacks</li>
        <li>Rapid7: Muddying the Tracks: The State-Sponsored Shadow Behind Chaos Ransomware</li>
        <li>The Hacker News: MuddyWater Uses DLL Side-Loading in Espionage Campaign Targeting 9 Countries</li>
      </ul>
    </ArticleLayout>
  );
}
