import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "fog-ransomware-propagation")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>概要</h2>
      <p>
        2026年、ランサムウェアグループ「Fog」が業界を驚かせる新手口を採用した。身代金ノートの末尾に「<strong>マルウェアを他の誰かに送りつけてくれれば、あなたのシステムを無料で復号する</strong>」という一文を加えたのである。身代金の免除と引き換えに、被害者自身をマルウェアの拡散役（インサイダー脅威エージェント）として利用する前代未聞の社会工学的アプローチだ。
      </p>
      <p>
        Fogは2024年6月に登場し、2026年1月〜5月だけで100件以上の組織を侵害している。初期侵入には主に<strong>VPNクレデンシャルの悪用</strong>と<strong>LNKファイルを使ったフィッシングメール</strong>が使われ、侵入後はBYOVD（脆弱なドライバーの持ち込み）でEDRを無力化した上でWindowsとLinux両環境のファイルを暗号化する。身代金の中央値は22万ドル（約3,300万円）で、データ窃取を組み合わせた二重恐喝型を採用している。
      </p>

      <h2>何が起きたのか</h2>
      <h3>「拡散すれば免除」という前代未聞の要求</h3>
      <p>
        Fogのランサムノートには通常の支払い要求に加え、次のような趣旨の条件が記載されるようになった:
      </p>
      <blockquote>
        <p>「支払いが難しいなら、このランサムウェアを他の2組織に感染させてください。成功を確認した時点で、あなたの復号キーを無償で提供します。」</p>
      </blockquote>
      <p>
        これは被害者に対し、<strong>金銭的苦境を利用してインサイダー脅威の実行者になるよう誘導する</strong>手口である。身代金を払えない中小企業・教育機関・医療機関がターゲットになりやすく、経済的プレッシャーと組み合わせることで新たな被害者を生み出す連鎖を意図している。
      </p>
      <p>
        加えて、同グループはDOGE（米国行政効率化省）をロゴや文言に使ったランサムノートも使用しており、社会的・政治的な話題を悪用して被害者を動揺させる演出も行っている。
      </p>
      <h3>2026年の被害状況</h3>
      <p>
        2026年1月〜5月だけで確認された被害は100件超で、2月単月で53件と急増した。教育機関・金融機関・製造業・医療機関が主な標的となっており、特にアジアの金融機関では攻撃者が2週間にわたって内部に潜伏した後に暗号化を実行するケースも確認された。
      </p>

      <h2>技術的な解説</h2>
      <h3>初期侵入: VPN vs フィッシング</h3>
      <p>
        Fogの初期侵入経路は主に2種類ある。
      </p>
      <p>
        <strong>① VPNクレデンシャル悪用</strong>: SonicWall SSL-VPNの脆弱性（CVE-2024-40766）の悪用や、Initial Access Broker（IAB）から購入した企業VPNのアカウント情報を使って組織に侵入する。VPN経由の侵入はエンドポイントのセキュリティ製品を通らないため、検知が遅れやすい。
      </p>
      <p>
        <strong>② LNKフィッシング</strong>: 「Pay Adjustment.zip」という給与調整を装ったZIPファイルをメールで送付し、内部のLNKファイルを開かせる。LNKファイルが実行されると多段階のPowerShellスクリプト（stage1.ps1）が起動し、次のコンポーネントをダウンロードする:
      </p>
      <ul>
        <li><code>cwiper.exe</code>: ランサムウェアのローダー本体</li>
        <li><code>ktool.exe</code>: BYOVD（脆弱なドライバーの持ち込み）による権限昇格ツール</li>
        <li>追加のPowerShellスクリプト群</li>
        <li>Moneroウォレット宛のQRコード画像</li>
      </ul>
      <h3>BYOVDによるEDR無効化</h3>
      <p>
        侵入後の最大の障壁はEDR（Endpoint Detection and Response）製品である。Fogはこれを回避するために<strong>BYOVD（Bring Your Own Vulnerable Driver）</strong>手法を採用している。これはWindowsカーネルの署名要件を満たした正規の（しかし既知の脆弱性を持つ）ドライバーを持ち込み、その脆弱性を突いてカーネル権限を取得した上でEDRプロセスを強制終了する手法だ。
      </p>
      <p>
        BYOVDはFogだけでなく、多くの現代のランサムウェアグループが採用しており、「EDRを入れれば安全」という考えが通用しなくなっていることを示している。
      </p>
      <h3>WindowsとLinux両対応のランサムウェア</h3>
      <p>
        Fogは<strong>Windows環境とLinux/VMware ESXi環境の両方</strong>を暗号化できる。クラウドやオンプレミスで仮想マシンを多数運用している組織では、ESXiホストが暗号化されると多数のVMが一度に停止するため、被害が広範かつ即時になる点が特に危険である。
      </p>
      <h3>二重恐喝の構造</h3>
      <p>
        Fogは単なるファイル暗号化にとどまらず、暗号化の前に機密データを窃取してダークウェブのリークサイトに掲載すると脅す<strong>二重恐喝</strong>モデルを採用している。これにより「バックアップから復元できるから身代金を払わない」という選択肢が機能しにくくなる。さらに今回の「拡散免除」条件は、事実上<strong>三重の圧力</strong>（暗号化・データ公開・第三者への拡散）を課す構造になっている。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        Fogランサムウェアは国内企業にとっても無縁ではない。以下の点で直接的なリスクがある。
      </p>
      <ul>
        <li><strong>VPN侵害が主要経路</strong>: SonicWall・Fortinet・Palo Alto等のSSL-VPN製品を使用している組織が主なターゲットになりやすい。国内企業の多くがこれらの製品を使用しており、管理者認証情報の管理が甘い組織は特に危険である。</li>
        <li><strong>「拡散すれば免除」の社会工学が国内でも機能する可能性</strong>: 身代金を払えない中小企業・自治体・教育機関が被害を受けた場合、経済的プレッシャーからこの条件を受け入れようとする担当者が現れるリスクがある。<strong>この条件を受け入れることは犯罪への共謀であり、絶対に行ってはならない</strong>。</li>
        <li><strong>ESXi環境の暗号化が重大リスク</strong>: 多数の仮想マシンをVMware ESXi上で運用している組織では、ESXiホスト1台の暗号化で事業が全面停止するリスクがある。</li>
      </ul>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>VPNの緊急確認</h3>
      <ul>
        <li>SonicWall SSL-VPNを使用している場合: CVE-2024-40766のパッチ適用を確認する</li>
        <li>VPN管理者アカウントのパスワードを確認し、MFAが有効になっているか確認する</li>
        <li>IAB（Initial Access Broker）に自組織のVPN認証情報が出回っていないか、Have I Been Pwned等で確認する</li>
        <li>VPNのログインログを確認し、不審な地域・時間帯からのアクセスがないか調べる</li>
      </ul>
      <h3>EDRの「生存確認」</h3>
      <ul>
        <li>BYOVDへの対応として、EDR製品が<strong>脆弱なドライバーのブロックリスト</strong>（Windows HVCI等）を有効にしているか確認する</li>
        <li>EDRが<strong>改ざん防止（Tamper Protection）</strong>モードで動作しているか確認する。Tamper Protectionが無効だとEDRプロセスを管理者権限で終了できてしまう</li>
        <li>定期的にEDRが実際に機能しているか検証するテスト（MITRE ATT&amp;CKベースのレッドチーム等）を実施する</li>
      </ul>
      <h3>バックアップの確認</h3>
      <ul>
        <li>オフラインバックアップ（ネットワーク非接続）が存在するか確認する</li>
        <li>ESXi・仮想マシンのスナップショットが別ストレージに保存されているか確認する</li>
        <li>バックアップからの復旧テストを定期的に行い、実際に復旧できることを確認する</li>
      </ul>
      <h3>「拡散すれば免除」への組織的対応方針</h3>
      <ul>
        <li>この条件を提示された場合の対応方針を事前に組織として定め、インシデント対応計画に含める</li>
        <li>マルウェアの拡散は刑法上の不正指令電磁的記録供用罪（通称：ウイルス罪）に当たる可能性があり、<strong>絶対に実行してはならない</strong></li>
        <li>身代金交渉・支払い判断は経営層と法務・セキュリティ専門家が連携して行う体制を整備する</li>
      </ul>

      <h2>参考情報</h2>
      <ul>
        <li>Dark Reading: <em>Fog Hackers Troll Victims With DOGE Ransom Notes</em></li>
        <li>Trend Micro: <em>FOG Ransomware Spread by Cybercriminals Claiming Ties to DOGE</em></li>
        <li>CrowdStrike: <em>What is Fog Ransomware?</em></li>
        <li>SC Media: <em>Fog ransomware notes troll with DOGE references, bait insider attacks</em></li>
        <li>SentinelOne: <em>Fog Ransomware: In-Depth Analysis, Detection, and Mitigation</em></li>
      </ul>
      <p>
        ランサムウェアの全体トレンドは <a href="/learn/security/ransomware-2026">ランサムウェア2026</a>、MITRE ATT&amp;CKによる攻撃フレームワークの理解は <a href="/learn/security/mitre-attack">MITRE ATT&amp;CK 入門</a> も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
