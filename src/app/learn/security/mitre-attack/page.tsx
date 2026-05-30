import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "mitre-attack")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>MITRE ATT&amp;CK</strong>（アタック）は、<strong>実際に観測された攻撃者の振る舞いを体系化した知識ベース</strong>です。「攻撃者は何を狙い（戦術）、どうやって実現するのか（技術）」を共通の語彙で整理しており、SOC・脅威ハンティング・検知エンジニアリング・脅威インテリジェンスの<strong>事実上の共通言語</strong>になっています。非営利の MITRE が無償で公開・更新しており、最新は<strong>2026年4月リリースの v19</strong> です。
      </p>
      <p>
        本記事は ATT&amp;CK の<strong>構造（戦術・技術・手順）とID体系</strong>を入門レベルで押さえ、<strong>実務でどう使うか</strong>、そして Cyber Kill Chain など他フレームワークとの違いまでをまとめます。当サイトの個別攻撃記事（{" "}
        <a href="/learn/security/lolbins-living-off-the-land">LOLBins</a>{" "}
        や{" "}
        <a href="/learn/security/clickfix">ClickFix</a>{" "}
        など）が ATT&amp;CK のどこに位置づくかも見えてきます。
      </p>

      <h2>ATT&amp;CK とは何か（OWASPとの違い）</h2>
      <p>
        ATT&amp;CK は <strong>Adversarial Tactics, Techniques, and Common Knowledge</strong> の略。脆弱性のカタログではなく、<strong>「攻撃者が侵入後に何をするか」という“行動”のカタログ</strong>です。ここが{" "}
        <a href="/learn/security/owasp-top-10">OWASP Top 10</a>{" "}
        との大きな違いです。OWASP は「Webアプリのどんな弱点を作り込みがちか（守る側の作り込みリスク）」を扱うのに対し、ATT&amp;CK は<strong>「攻撃者の実際の手口」</strong>を網羅的に扱います。両者は補完関係にあります。
      </p>
      <p>対象範囲（マトリクス）は3つに分かれます。</p>
      <ul>
        <li><strong>Enterprise</strong>：Windows/macOS/Linux、クラウド、コンテナ、ネットワーク機器など。最も使われる。</li>
        <li><strong>Mobile</strong>：iOS / Android。</li>
        <li><strong>ICS</strong>：産業制御システム。</li>
      </ul>

      <h2>3層構造：戦術・技術・手順</h2>
      <p>
        ATT&amp;CK の肝は、攻撃を<strong>抽象度の異なる3つの層</strong>で表すことです。よく「<strong>TTPs</strong>（Tactics, Techniques, and Procedures）」と呼ばれます。
      </p>
      <h3>Tactics（戦術）＝ なぜ（攻撃者の目的）</h3>
      <p>
        マトリクスの<strong>列</strong>にあたる、攻撃者の「達成したいゴール」です。Enterprise には<strong>14の戦術</strong>があり、おおむね攻撃の進行順に並びます。
      </p>
      <pre>
        <code>{`偵察(Reconnaissance) → リソース開発(Resource Development)
→ 初期アクセス(Initial Access) → 実行(Execution)
→ 永続化(Persistence) → 権限昇格(Privilege Escalation)
→ 防御回避(Defense Evasion) → 認証情報アクセス(Credential Access)
→ 探索(Discovery) → 横展開(Lateral Movement)
→ 収集(Collection) → C2(Command and Control)
→ 持ち出し(Exfiltration) → 影響(Impact)`}</code>
      </pre>
      <p>
        各戦術には <strong>TA0001</strong> のようなIDが振られています（例: Initial Access = TA0001）。
      </p>
      <h3>Techniques（技術）＝ どうやって</h3>
      <p>
        戦術を達成する具体的な手段です。<strong>T+4桁の番号</strong>で表し、より細かい<strong>サブ技術</strong>は <code>.001</code> のように枝番が付きます。例：
      </p>
      <ul>
        <li><strong>T1059</strong> Command and Scripting Interpreter（実行）— サブ技術 <strong>T1059.001</strong> = PowerShell。{" "}
          <a href="/learn/security/lolbins-living-off-the-land">LOLBins</a> の記事で扱った手口がここに該当します。
        </li>
        <li><strong>T1566</strong> Phishing（初期アクセス）— {" "}
          <a href="/learn/security/quishing">Quishing</a> や{" "}
          <a href="/learn/security/clickfix">ClickFix</a> 系の入口。
        </li>
        <li><strong>T1539</strong> Steal Web Session Cookie（認証情報アクセス）— {" "}
          <a href="/learn/security/infostealer-session-hijacking">インフォスティーラーのセッション窃取</a> がまさにこれ。
        </li>
      </ul>
      <p>v18時点で Enterprise は <strong>216技術・475サブ技術</strong>を収録しています。</p>
      <h3>Procedures（手順）＝ 実際の実装例</h3>
      <p>
        特定の攻撃グループやマルウェアが、その技術を<strong>具体的にどう実行したか</strong>の記録です。「APT29 が PowerShell でこういうコマンドを使った」といった粒度で、検知ルール作成の素材になります。
      </p>

      <h2>知識ベースを支える4つの要素</h2>
      <p>ATT&amp;CK は技術だけでなく、攻撃の文脈を結びつける情報も持ちます。</p>
      <ul>
        <li><strong>Groups（Gxxxx）</strong>：APT29、Lazarus などの攻撃グループ。使う技術が紐づく。</li>
        <li><strong>Software（Sxxxx）</strong>：マルウェアやツール（Cobalt Strike など）。</li>
        <li><strong>Campaigns（Cxxxx）</strong>：特定の攻撃作戦。期間や標的が紐づく。</li>
        <li><strong>Mitigations / Detection Strategies</strong>：各技術に対する緩和策と検知の指針。v18（2025年10月）で従来の Data Sources/Detections が<strong>Detection Strategies と Analytics に刷新</strong>され、より実装に近い検知記述になりました。</li>
      </ul>
      <p>
        なお<strong>v19（2026年4月）</strong>では、肥大化していた <strong>Defense Evasion（防御回避）戦術が Stealth（隠密）と Defense Impairment（防御妨害）に分割</strong>されるなど、構造の見直しが続いています。フレームワークは生き物であり、バージョンを意識して参照することが大切です。
      </p>

      <h2>実務での使い方</h2>
      <ol>
        <li>
          <strong>共通言語にする</strong>：インシデントや脅威情報を「T1566.002 のフィッシングから T1059.001 で実行」のように記述すると、チーム間・ツール間で齟齬なく共有できる。
        </li>
        <li>
          <strong>検知エンジニアリング</strong>：自社の検知ルール（SIEM/EDR）を技術IDにマッピングし、「どの技術を検知できているか」を棚卸しする。
        </li>
        <li>
          <strong>カバレッジの可視化</strong>：<strong>ATT&amp;CK Navigator</strong> でマトリクスをヒートマップ化し、検知できている技術／いない技術を色分け。<strong>防御の穴</strong>が一目でわかる。
        </li>
        <li>
          <strong>脅威インテリジェンス主導の優先順位付け</strong>：自社の業界を狙う Group が使う技術を優先的に塞ぐ。やみくもに全216技術を追わず、<strong>関連の高いものから</strong>。
        </li>
        <li>
          <strong>パープルチーム／演習</strong>：レッドチームが技術IDで攻撃を再現し、ブルーチームが検知できるかを検証。<strong>ATT&amp;CK Evaluations</strong> はベンダー製品の検知力比較にも使われる。
        </li>
      </ol>

      <h2>図解案：個別攻撃を ATT&amp;CK にマッピング</h2>
      <pre>
        <code>{`戦術:   初期アクセス → 実行 → 認証情報アクセス → C2 → 影響
        ─────────────────────────────────────────────
ClickFix  T1566 ── T1059(PowerShell)
                       │
インフォ              └─▶ T1555/T1539(Cookie/PW窃取)
スティーラー                         │
                                    └─▶ T1071(C2) → ランサムT1486

★ 個別の攻撃も、ATT&CK上では「戦術×技術の連なり」として一望できる`}</code>
      </pre>

      <h2>他フレームワークとの違い</h2>
      <ul>
        <li><strong>Cyber Kill Chain（Lockheed Martin）</strong>：7段階の直線的なモデル。攻撃の<strong>大きな流れ</strong>を捉えるのに向くが、各段の具体的手口は粗い。ATT&amp;CK は<strong>手口を網羅的・実証的</strong>に深掘りする点で補完的。</li>
        <li><strong>Diamond Model</strong>：敵・能力・インフラ・被害者の関係を分析する枠組み。ATT&amp;CK の技術情報と組み合わせて使われる。</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        MITRE ATT&amp;CK は、<strong>攻撃者の振る舞いを「戦術×技術×手順」で体系化した共通言語</strong>です。脆弱性ではなく<strong>“行動”を扱う</strong>点で OWASP と補完関係にあり、検知の棚卸し・脅威情報の整理・防御の穴の可視化に直結します。まずは<strong>自社に関係する技術から ATT&amp;CK Navigator でマッピング</strong>してみるのが、最初の一歩として実用的です。
      </p>
      <p>
        当サイトの攻撃解説——{" "}
        <a href="/learn/security/clickfix">ClickFix</a>、{" "}
        <a href="/learn/security/lolbins-living-off-the-land">LOLBins</a>、{" "}
        <a href="/learn/security/infostealer-session-hijacking">セッション窃取</a>、{" "}
        <a href="/learn/security/supply-chain-attacks">サプライチェーン攻撃</a>{" "}
        ——は、いずれも ATT&amp;CK の特定の戦術・技術に対応します。フレームワークを軸に読み返すと、点だった知識が攻撃ストーリーとしてつながります。
      </p>
      <p>
        ※ 本記事のバージョン情報・統計値は MITRE の公表内容に基づきます（最新は v19・2026年4月）。ATT&amp;CK は定期的に更新されるため、参照時は公式サイトで最新版をご確認ください。
      </p>
    </ArticleLayout>
  );
}
