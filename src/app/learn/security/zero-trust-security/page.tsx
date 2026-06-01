import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "zero-trust-security")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>ゼロトラストとは</h2>
      <p>
        <strong>ゼロトラスト（Zero Trust）</strong>とは、「社内ネットワークにいるから安全」「一度認証したから信頼できる」という前提をすべて取り除き、<strong>すべてのユーザー・デバイス・通信を信頼しない（Zero Trust）</strong>ことを前提としたセキュリティの考え方だ。
      </p>
      <p>
        原則は <strong>「Never Trust, Always Verify（信頼しない、常に確認する）」</strong>。アクセスのたびに「誰が」「どのデバイスから」「何を」しようとしているかを確認し、最小限の権限だけを与える。
      </p>
      <p>
        2010年に Forrester Research のアナリスト <strong>John Kindervag</strong> が提唱し、2020年に米国国立標準技術研究所（NIST）が <strong>SP 800-207</strong> として標準化した。日本では経済産業省や総務省もゼロトラスト移行を推進しており、特に政府機関・金融機関で導入が加速している。
      </p>

      <h2>なぜゼロトラストが必要になったのか</h2>
      <p>
        従来のセキュリティは「境界型防御」が中心だった。ファイアウォールで社内・社外を区切り、社内ネットワークに入れた人・デバイスは信頼するという考え方だ。
      </p>
      <p>
        この前提は、以下の変化によって崩れた。
      </p>
      <ul>
        <li>
          <strong>テレワーク・リモートアクセスの普及</strong>: 社員が自宅・カフェ・海外から業務システムにアクセスする。「社内にいる＝安全」が成立しない。
        </li>
        <li>
          <strong>クラウドサービスへの移行</strong>: データが社内サーバーではなく AWS・Microsoft 365・Google Workspace に置かれる。「境界の中にデータがある」という前提がない。
        </li>
        <li>
          <strong>BYOD（個人デバイスの業務利用）</strong>: 管理されていない個人の PC・スマートフォンで業務データにアクセスする。デバイスの安全性が保証できない。
        </li>
        <li>
          <strong>内部脅威の増加</strong>: 正規の社員・委託業者・取引先が情報を漏洩させるケースが増えた。「社内ネットワークにいる＝信頼できる人間」ではない。
        </li>
        <li>
          <strong>VPN の限界</strong>: VPN に侵入した攻撃者は社内ネットワーク全体にアクセスできる。ランサムウェアが VPN 経由で広がる事例が後を絶たない。
        </li>
      </ul>

      <h2>従来型セキュリティとゼロトラストの違い</h2>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>従来型（境界型防御）</th>
            <th>ゼロトラスト</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>基本的な前提</td>
            <td>社内＝安全、社外＝危険</td>
            <td>どこからのアクセスも信頼しない</td>
          </tr>
          <tr>
            <td>認証のタイミング</td>
            <td>ネットワーク境界で一度</td>
            <td>アクセスのたびに継続的に確認</td>
          </tr>
          <tr>
            <td>VPNに入った後</td>
            <td>社内リソースに自由にアクセス可能</td>
            <td>リソースごとに個別に認可が必要</td>
          </tr>
          <tr>
            <td>横展開（Lateral Movement）</td>
            <td>侵入されると広がりやすい</td>
            <td>マイクロセグメンテーションで封じ込め</td>
          </tr>
          <tr>
            <td>デバイス信頼</td>
            <td>社内ネットワーク接続で信頼</td>
            <td>デバイスの健全性を継続的に評価</td>
          </tr>
          <tr>
            <td>クラウド・リモートワーク</td>
            <td>後から追加するのが難しい</td>
            <td>設計思想として前提に組み込まれている</td>
          </tr>
        </tbody>
      </table>

      <h2>NIST SP 800-207 の7原則</h2>
      <p>
        NIST（米国国立標準技術研究所）は SP 800-207「Zero Trust Architecture」でゼロトラストの7原則を定義している。
      </p>
      <ol>
        <li>
          <strong>すべてのデータ・サービスはリソースとして扱う</strong>: 物理デバイス・IoT機器・クラウドサービスをすべてリソースとして一元管理する。
        </li>
        <li>
          <strong>すべての通信は場所によらず保護する</strong>: 社内・社外・VPN内を問わず、すべての通信を暗号化し認証を行う。
        </li>
        <li>
          <strong>リソースへのアクセスはセッションごとに許可する</strong>: 一度認証したからといって継続アクセスを許可しない。セッションごとに再確認する。
        </li>
        <li>
          <strong>リソースへのアクセスは動的ポリシーで決定する</strong>: ユーザーの属性・デバイスの状態・場所・時間などの複合要素でアクセス可否を動的に判断する。
        </li>
        <li>
          <strong>すべての資産のセキュリティ態勢を継続的に監視・検証する</strong>: デバイスの健全性（パッチ適用状況・マルウェア検知・設定など）を常時監視する。
        </li>
        <li>
          <strong>すべての認証・認可を厳格に行う</strong>: アクセス前に厳格な本人確認と権限確認を行う。
        </li>
        <li>
          <strong>資産・インフラ・通信から収集した情報を活用してセキュリティ態勢を改善する</strong>: ログ・テレメトリを分析してポリシーを継続的に改善する。
        </li>
      </ol>

      <h2>ゼロトラストを構成する主要な技術要素</h2>
      <h3>① ID・アクセス管理（IAM）/ 多要素認証（MFA）</h3>
      <p>
        ゼロトラストの土台。「誰が」アクセスしているかを確実に確認するために、<strong>MFA（多要素認証）</strong>と<strong>IDプロバイダー（IdP）</strong>を整備する。パスワードだけの認証は廃止し、FIDO2・パスキー・TOTP などを組み合わせる。
      </p>
      <h3>② デバイスコンプライアンス / MDM</h3>
      <p>
        アクセスしてくるデバイスが「管理された安全な状態か」を検証する。MDM（モバイルデバイス管理）や EDR を使い、パッチ適用状況・暗号化設定・マルウェア感染の有無を確認する。
      </p>
      <h3>③ 最小権限アクセス（Least Privilege）</h3>
      <p>
        業務に必要な最小限のリソースだけにアクセスを許可する。「全社のファイルサーバーにアクセスできる」ではなく「この業務に必要なフォルダだけアクセスできる」という粒度で権限を設計する。
      </p>
      <h3>④ マイクロセグメンテーション</h3>
      <p>
        ネットワークを細かく分割し、セグメント間の通信を明示的に許可したものだけに限定する。侵入された場合でも横展開（Lateral Movement）を防ぐ。
      </p>
      <h3>⑤ 継続的な監視とログ分析</h3>
      <p>
        「信頼した後も監視し続ける」。異常なアクセスパターン・不審なデータ転送・ログイン場所の急変などを SIEM / SOAR で検知し、動的にアクセスを遮断する。
      </p>

      <h2>代表的な製品・サービス</h2>
      <table>
        <thead>
          <tr>
            <th>カテゴリ</th>
            <th>代表製品</th>
            <th>特徴</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>IDプロバイダー / IAM</td>
            <td>Microsoft Entra ID（旧 Azure AD）、Okta、Google Workspace</td>
            <td>MFA・条件付きアクセス・シングルサインオン</td>
          </tr>
          <tr>
            <td>デバイス管理</td>
            <td>Microsoft Intune、Jamf、CrowdStrike Falcon</td>
            <td>MDM・EDR・デバイスコンプライアンス評価</td>
          </tr>
          <tr>
            <td>ネットワークアクセス制御（ZTNA）</td>
            <td>Zscaler Private Access、Cloudflare Access、Google BeyondCorp</td>
            <td>VPN不要でアプリごとのアクセス制御</td>
          </tr>
          <tr>
            <td>SASE（統合型）</td>
            <td>Zscaler、Prisma Access（Palo Alto）、Netskope</td>
            <td>ZTNA + SWG + CASB + FWaaS をクラウドで統合</td>
          </tr>
          <tr>
            <td>ログ・監視</td>
            <td>Microsoft Sentinel、Splunk、CrowdStrike Falcon LogScale</td>
            <td>SIEM・異常検知・自動対応（SOAR）</td>
          </tr>
        </tbody>
      </table>
      <p>
        Microsoft Entra ID は Microsoft 365 環境を使っている企業ならすでに利用可能で、条件付きアクセスポリシーを設定するだけでゼロトラストの基礎を始められる。まず追加費用なしで始められる領域から着手するのが現実的だ。
      </p>

      <h2>ゼロトラスト導入のメリット</h2>
      <ul>
        <li>
          <strong>侵害時の被害を最小化できる</strong>: 攻撃者が一つのアカウントを乗っ取っても、最小権限と細かいセグメンテーションにより横展開を防ぐ。ランサムウェアの拡散も抑制できる。
        </li>
        <li>
          <strong>テレワーク・クラウド環境に適している</strong>: 場所を問わず同じポリシーで管理できるため、在宅勤務・出張・海外拠点で異なるセキュリティルールを適用する必要がなくなる。
        </li>
        <li>
          <strong>可視性が高まる</strong>: 誰がいつどのリソースにアクセスしたかが常に記録される。インシデント発生時の調査が容易になる。
        </li>
        <li>
          <strong>コンプライアンス対応がしやすい</strong>: アクセスログの網羅的な記録、最小権限の実装は GDPR・個人情報保護法・ISO 27001 などの要件を満たすうえで重要だ。
        </li>
      </ul>

      <h2>導入時の課題</h2>
      <ul>
        <li>
          <strong>一度に全部はできない</strong>: ゼロトラストは「製品を導入して終わり」ではなく、ID・デバイス・ネットワーク・アプリ・データの各レイヤーを段階的に整備する継続的なプロセスだ。
        </li>
        <li>
          <strong>初期コストと運用コスト</strong>: ZTNA・IAM・MDM 製品の導入費用に加え、ポリシー設計・運用担当者の育成コストがかかる。
        </li>
        <li>
          <strong>レガシーシステムへの対応</strong>: MFA に対応していない古いシステムをどう扱うかが課題になる。特に製造業・医療では古い業務システムが多い。
        </li>
        <li>
          <strong>利便性との兼ね合い</strong>: 過度に厳しいポリシーは業務効率を下げ、シャドーITを誘発する。ユーザーが不満を持たない程度のバランス設計が重要だ。
        </li>
      </ul>

      <h2>日本企業がゼロトラスト導入を始める現実的なステップ</h2>
      <ol>
        <li>
          <strong>MFA の全社展開（最初の一歩）</strong>: 追加費用が最小限で最も効果が高い施策。Microsoft 365 / Google Workspace ならほぼ無料で設定できる。
        </li>
        <li>
          <strong>条件付きアクセスポリシーの設定</strong>: 管理されていないデバイスや異常なアクセス（海外 IP・深夜）をブロックするポリシーを設定する。
        </li>
        <li>
          <strong>特権アカウントの管理強化</strong>: 管理者権限の最小化・Just-in-Time アクセスの導入・特権アクセスの監視。
        </li>
        <li>
          <strong>デバイス管理の整備（MDM）</strong>: 業務端末を MDM に登録し、パッチ適用状況・暗号化の強制・紛失時のリモートワイプを整備する。
        </li>
        <li>
          <strong>ネットワークセグメンテーション</strong>: VLAN・ファイアウォールルールを見直し、業務システムを細かく分割する。
        </li>
      </ol>

      <h2>よくある質問</h2>
      <h3>ゼロトラストとは何ですか？わかりやすく教えてください。</h3>
      <p>
        「社内ネットワークにいるから安全」という前提を捨て、すべてのユーザー・デバイス・通信を信頼しないことを前提にしたセキュリティの考え方だ。アクセスのたびに認証・認可・検査を行う。
      </p>

      <h3>ゼロトラストはなぜ今必要なのですか？</h3>
      <p>
        テレワーク普及・クラウド移行・BYOD導入により「社内＝安全」という境界が崩れたためだ。VPN で社内ネットワークに入れば安全という従来の境界型防御では、侵入された後の横展開を防げない。
      </p>

      <h3>ゼロトラスト導入にかかるコストはどのくらいですか？</h3>
      <p>
        中小企業では Microsoft Entra ID P1（ユーザーあたり月数百円）から MFA・条件付きアクセスを始めることができる。大企業では Zscaler や CrowdStrike などを組み合わせると数千万〜億円規模になることもある。
      </p>

      <h3>ゼロトラストとSASEの違いは何ですか？</h3>
      <p>
        ゼロトラストはセキュリティの「考え方・原則」、SASE はその実現手段の一つだ。SASE は Gartner が提唱した概念で、ネットワーク機能（SD-WAN）とセキュリティ機能をクラウドで統合するアーキテクチャである。
      </p>

      <h3>ゼロトラスト導入はどこから始めればよいですか？</h3>
      <p>
        まず MFA の全社展開から始めるのが最も費用対効果が高い。次に IDプロバイダーの統合・条件付きアクセスポリシーの設定・デバイス管理を段階的に整備する。
      </p>

      <h2>関連記事</h2>
      <ul>
        <li><a href="/learn/security/mfa-totp-fido2">MFA・TOTP・FIDO2・Passkey の違い</a> — ゼロトラストの土台となる認証の基礎</li>
        <li><a href="/learn/security/oauth-oidc">OAuth 2.0 と OpenID Connect 入門</a> — IDプロバイダー連携の仕組み</li>
        <li><a href="/learn/security/device-code-phishing">デバイスコードフィッシング</a> — MFAを回避するEntra ID狙いの手口</li>
        <li><a href="/learn/security/lolbins-living-off-the-land">LOLBins・環境寄生型攻撃</a> — 内部からの脅威の実態</li>
        <li><a href="/learn/security/incident-response-guide">セキュリティインシデント対応手順</a> — ゼロトラストが機能しなかった場合の対応</li>
        <li><a href="/learn/network/vpn-basics">VPNの仕組み</a> — ゼロトラストが置き換えようとしている技術</li>
      </ul>
    </ArticleLayout>
  );
}
