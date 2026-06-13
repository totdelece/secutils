import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "japan-security-incidents")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        セキュリティ対策を考えるとき、海外の派手な事件より<strong>「同じ国・同じ商習慣・同じ規制の下で起きた事故」</strong>のほうがはるかに参考になります。委託構造、Just-In-Time 生産、個人情報保護委員会や総務省の行政指導——日本企業ならではの文脈が、被害の広がり方と「効いた対策／効かなかった対策」を決めているからです。
      </p>
      <p>
        この記事は、2020〜2025 年に公表された<strong>国内の主要なセキュリティインシデント 12 件</strong>を一覧で俯瞰し、そこから<strong>繰り返し現れる侵入口と失敗パターン</strong>を抽出します。個別事件の速報ではなく、「自社で同じことが起きないために何を確認すべきか」を引き出すための事例研究です。
      </p>

      <h2>主要インシデント一覧（2020–2025）</h2>
      <p>
        時系列で並べると、<strong>侵入口の多くが「VPN・境界機器」と「委託先・グループ会社」に集中</strong>していることが見えてきます。
      </p>
      <table>
        <thead>
          <tr>
            <th>事案</th>
            <th>時期</th>
            <th>種別・攻撃者</th>
            <th>侵入口</th>
            <th>主な被害</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>三菱電機</td>
            <td>2020年1月公表</td>
            <td>標的型APT（BlackTech）</td>
            <td>ウイルス対策製品の管理サーバ（CVE-2019-9489）</td>
            <td>防衛・官公庁関連情報の流出懸念、延べ24.5万台が調査対象</td>
          </tr>
          <tr>
            <td>ホンダ</td>
            <td>2020年6月</td>
            <td>ランサム（EKANS/Snake・ICS標的）</td>
            <td>標的型（固有ドメイン判定をコードに内蔵）</td>
            <td>狭山・寄居など国内外の工場が相次ぎ停止</td>
          </tr>
          <tr>
            <td>富士通 ProjectWEB</td>
            <td>2021年5月</td>
            <td>不正アクセス（SaaS）</td>
            <td>正規の認証情報を悪用</td>
            <td>NISC・国交省・外務省など142組織に波及</td>
          </tr>
          <tr>
            <td>つるぎ町立半田病院</td>
            <td>2021年10月</td>
            <td>ランサム（LockBit 2.0）</td>
            <td>FortiGate VPN の未修正脆弱性（CVE-2018-13379）</td>
            <td>電子カルテ約60日停止・復旧費用約2億円</td>
          </tr>
          <tr>
            <td>小島プレス工業（トヨタ）</td>
            <td>2022年2月</td>
            <td>ランサム（二重脅迫）</td>
            <td>特定に至らず</td>
            <td>トヨタ国内全14工場停止・約1.3万台に影響</td>
          </tr>
          <tr>
            <td>大阪急性期・総合医療センター</td>
            <td>2022年10月</td>
            <td>ランサム（Phobos亜種 Elbie）</td>
            <td>給食委託業者の FortiGate VPN を踏み台</td>
            <td>電子カルテ約73日停止・被害額約20億円</td>
          </tr>
          <tr>
            <td>名古屋港統一ターミナル（NUTS）</td>
            <td>2023年7月</td>
            <td>ランサム（LockBit・重要インフラ）</td>
            <td>特定に至らず（証拠が消失）</td>
            <td>コンテナ約2万本・トヨタ4拠点が停止</td>
          </tr>
          <tr>
            <td>LINEヤフー</td>
            <td>2023年10月</td>
            <td>不正アクセス</td>
            <td>委託先PCのマルウェア感染→共通認証基盤（NAVER）</td>
            <td>約44万件漏洩・総務省の行政指導</td>
          </tr>
          <tr>
            <td>HOYA</td>
            <td>2024年3月</td>
            <td>ランサム（Hunters International）</td>
            <td>窃取型</td>
            <td>約170万ファイル窃取・15億円要求を拒否し約24日で復旧</td>
          </tr>
          <tr>
            <td>イセトー</td>
            <td>2024年5月</td>
            <td>ランサム（8Base）</td>
            <td>3年未更新VPN＋7年同一の弱いパスワード＋MFA無し</td>
            <td>307万件超漏洩・自治体/金融など30社以上に波及</td>
          </tr>
          <tr>
            <td>KADOKAWA</td>
            <td>2024年6月</td>
            <td>ランサム（BlackSuit）</td>
            <td>EDR未導入・ESXi集中管理・ネットワーク分離不備</td>
            <td>ニコニコ等が約2ヶ月停止・約25.4万件漏洩・特別損失24億円</td>
          </tr>
          <tr>
            <td>アサヒグループHD</td>
            <td>2025年9月</td>
            <td>ランサム（Qilin）</td>
            <td>VPN経由・パスワード脆弱性で権限奪取</td>
            <td>30工場停止・191万件漏洩・損失70億円超</td>
          </tr>
        </tbody>
      </table>

      <h2>横断して見える共通パターン</h2>

      <h3>パターン1：VPN・境界機器の「未更新」が最大の入口</h3>
      <p>
        半田病院（CVE-2018-13379）、大阪急性期・総合医療センター（委託業者の古い FortiGate）、イセトー（3年間 VPN 未更新）、アサヒ（VPN 経由）——<strong>侵入口が判明した事案の多くが、VPN や境界機器の既知脆弱性・設定不備</strong>でした。境界機器は「インターネットに常時露出し、かつ社内へ直結する」ため、パッチ遅れが致命傷になります。
      </p>
      <ul>
        <li>VPN/ファイアウォール/メール gateway の<strong>ファーム更新を最優先のSLAで運用</strong>する</li>
        <li>EOL（保守終了）機器を残さない。<strong>使っていない VPN アカウント・機器は廃止</strong>する</li>
        <li>VPN に<strong>多要素認証（MFA）</strong>を必須化する（<Link href="/learn/security/mfa-totp-fido2">MFA / TOTP / FIDO2</Link>）</li>
      </ul>

      <h3>パターン2：委託先・グループ会社経由（サプライチェーン）</h3>
      <p>
        富士通 ProjectWEB（SaaS 1 本の侵害が 142 組織へ）、LINEヤフー（委託先 PC →グループ共通の認証基盤）、イセトー（BPO 企業の侵害が委託元 30 社超へ）、大阪の医療センター（給食委託業者の VPN）——<strong>自社の防御が堅くても、つながった先の弱点から侵入される</strong>構図が繰り返されています。
      </p>
      <ul>
        <li>委託先の<strong>セキュリティ要件を契約で明示</strong>し、定期的に点検する</li>
        <li>グループ間の<strong>共通認証基盤は「単一障害点」</strong>になり得る。境界・権限を分離する</li>
        <li>外部に預けるデータは<strong>最小化</strong>し、不要になったら確実に削除させる</li>
      </ul>
      <p>
        ソフトウェア側のサプライチェーンについては{" "}
        <Link href="/learn/security/supply-chain-attacks">サプライチェーン攻撃の6類型と防御</Link>{" "}
        も合わせてご覧ください。
      </p>

      <h3>パターン3：認証の弱さ（共通パスワード・長期間未変更・MFA無し）</h3>
      <p>
        イセトー（英小文字のみ11桁を7年間使い回し）、大阪の医療センター（全ユーザー管理者権限・パスワード共通化）が典型です。侵入後に<strong>横展開と権限昇格を容易にした</strong>のは、こうした認証運用の甘さでした。
      </p>
      <ul>
        <li>管理者権限は<strong>最小化</strong>し、共有アカウント・共通パスワードを廃止</li>
        <li>長く強い資格情報を使う（<Link href="/tools/password-generator">Password Generator</Link>）。可能なら<strong>フィッシング耐性のある MFA</strong>へ</li>
        <li><strong>ゼロトラスト</strong>の発想で「内部だから信頼」をやめる（<Link href="/learn/security/zero-trust-security">ゼロトラストとは</Link>）</li>
      </ul>

      <h3>パターン4：製造ライン・重要インフラへの波及（Just-In-Time の脆さ）</h3>
      <p>
        小島プレス（Tier1 の停止でトヨタ全14工場が止まる）、ホンダ（ICS/OT を標的）、名古屋港（港湾機能の停止）、アサヒ（30工場停止）——<strong>IT の事故が物理の生産・物流を止める</strong>段階に来ています。在庫を絞る JIT は効率的な反面、1点の停止が全体に波及します。
      </p>
      <ul>
        <li><strong>OT/IT を分離</strong>する（アサヒでは製造ラインを守った成功要因とされる）</li>
        <li>主要サプライヤーの<strong>インシデント時の代替・縮退運転</strong>を事前に計画する</li>
      </ul>

      <h3>パターン5：復旧優先か、証拠保全か</h3>
      <p>
        名古屋港は約3日で復旧を優先した結果、<strong>バックアップからもマルウェアが検出され、侵入経路の特定に至りませんでした</strong>。事業継続のための早期復旧と、原因究明・再発防止のための証拠保全は、しばしば対立します。平時に方針を決めておくことが重要です（<Link href="/learn/security/incident-response-guide">インシデント対応の進め方</Link>）。
      </p>

      <h3>パターン6：身代金を「払っても戻らない」</h3>
      <p>
        KADOKAWA は身代金を支払ったとされますが<strong>データは回復しませんでした</strong>。一方 HOYA は 15 億円の要求を<strong>拒否して自力で復旧</strong>しています。支払いは復旧も漏洩停止も保証せず、攻撃者の資金源になります。<strong>「バックアップと復旧計画」こそが交渉力</strong>です。なお、暗号化を伴わない窃取型恐喝の増加など最新動向は{" "}
        <Link href="/learn/security/ransomware-2026">2026年のランサムウェア</Link>{" "}
        を参照してください。
      </p>

      <h3>パターン7：セキュリティ製品・管理サーバ自体が踏み台に</h3>
      <p>
        三菱電機では<strong>ウイルス対策製品の管理サーバのゼロデイ</strong>が突破口になり、更新機能を通じて感染が拡大しました。高権限で全端末に接続する管理基盤（資産管理・EDR・MDM 等）は、攻撃者にとって魅力的な標的です。<strong>管理基盤の保護・監視・最小権限</strong>を忘れないでください。
      </p>

      <h2>日本企業が今すぐ確認すべきチェックリスト</h2>
      <ul>
        <li>☐ インターネットに面した VPN・境界機器のファームを最新化し、未使用機器/アカウントを廃止した</li>
        <li>☐ VPN・管理系・特権アクセスに MFA を必須化した</li>
        <li>☐ 管理者権限を最小化し、共有・共通パスワードを廃止した</li>
        <li>☐ 委託先・グループ会社のセキュリティ要件を契約で定め、点検している</li>
        <li>☐ バックアップを<strong>オフライン/イミュータブル</strong>で保持し、復旧手順を実際に試した</li>
        <li>☐ OT/IT を分離し、主要サプライヤー停止時の縮退運転を計画した</li>
        <li>☐ 資産管理・EDR・MDM など高権限の管理基盤を保護・監視している</li>
        <li>☐ 早期復旧と証拠保全の優先順位を平時に決め、インシデント対応手順を整備した</li>
      </ul>

      <h2>関連する解説</h2>
      <ul>
        <li><Link href="/learn/security/incident-response-guide">セキュリティインシデント対応手順</Link>（初動〜報告書）</li>
        <li><Link href="/learn/security/ransomware-2026">2026年のランサムウェア</Link>（手口の最新動向）</li>
        <li><Link href="/learn/security/supply-chain-attacks">サプライチェーン攻撃の6類型と防御</Link></li>
        <li><Link href="/learn/security/zero-trust-security">ゼロトラストとは</Link></li>
        <li><Link href="/learn/security/mfa-totp-fido2">MFA / TOTP / FIDO2 の違い</Link></li>
      </ul>

      <h2>おわりに</h2>
      <p>
        12 件を並べると、攻撃の名前や攻撃者は違っても、<strong>入口は「未更新の境界機器」と「委託・グループ経由」、被害拡大の鍵は「弱い認証」</strong>という共通項が浮かび上がります。逆に言えば、ここを押さえるだけで多くの事案は防げた、あるいは被害を小さくできた可能性が高い、ということです。自社の状況を上のチェックリストで一度棚卸ししてみてください。
      </p>
      <p>
        ※ 本記事の事実関係は、各社・各機関の公表資料、IPA／JPCERT/CC、個人情報保護委員会・総務省などの公開情報に基づく事例研究です。詳細・最新の状況は各一次情報をご確認ください。
      </p>
    </ArticleLayout>
  );
}
