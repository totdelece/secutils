import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "ransomware-2026")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        「ランサムウェア＝ファイルを暗号化して身代金を要求するマルウェア」というイメージは、2026年にはもう古くなりつつあります。攻撃者の多くは<strong>暗号化をやめ、データを盗んで「公開するぞ」と脅すだけ</strong>に移行しました。実行役はRaaS（サービス型）で調達され、侵入経路は<strong>初期アクセスブローカー</strong>から買う——攻撃は完全に<strong>分業ビジネス</strong>になっています。
      </p>
      <p>
        本記事は「ランサムウェアとは」という入門ではなく、<strong>2026年の実態がどう変わったか</strong>を実務者目線で整理します。被害は依然高水準で、2025年の被害公表は前年比<strong>約58%増、リークサイト掲載は7,500組織超</strong>。2026年2月だけでも<strong>54グループが680件</strong>を主張しました。何が変わり、どこを守ればよいのかを見ていきます。
      </p>

      <h2>変化1：暗号化しない「データ恐喝」への移行</h2>
      <p>
        最大の変化は、<strong>暗号化を伴わないデータ窃取のみの恐喝（encryptionless extortion）</strong>の急増です。2026年第1四半期には<strong>インシデントの約35%</strong>がこのタイプで、前年同期の18%から倍増。ある調査では<strong>2024年11月→2025年11月で約11倍</strong>（IR案件の2%→22%）に増えたとされます。
      </p>
      <p>攻撃者がこちらを好む理由は合理的です。</p>
      <ul>
        <li><strong>EDRに引っかかりにくい</strong>：大量のファイル暗号化という派手な挙動がないため、検知の最後の砦を回避しやすい。</li>
        <li><strong>バックアップが効かない</strong>：どれだけ完璧に復元できても、<strong>すでに盗まれたデータの公開は止められない</strong>。「バックアップがあるから大丈夫」が通用しない。</li>
        <li><strong>法規制が圧力になる</strong>：GDPR・HIPAA や各国の個人情報保護法のもとでは、<strong>情報漏えいそのものが重い制裁・通知義務</strong>につながり、被害者は払いやすい。</li>
        <li><strong>開発コストが低い</strong>：堅牢な暗号実装より、盗んで脅す方が手間が少ない。</li>
      </ul>

      <h2>変化2：恐喝の多重化（二重〜四重）</h2>
      <p>圧力の掛け方も進化しました。</p>
      <ul>
        <li><strong>二重恐喝</strong>：暗号化＋窃取データの公開で脅す（従来の主流）。</li>
        <li><strong>三重恐喝</strong>：さらに<strong>DDoS</strong>を加える、あるいは<strong>顧客・従業員に直接連絡</strong>して「あなたの情報が漏れた」と知らせ、組織への圧力を高める。</li>
        <li><strong>四重恐喝</strong>：取引先・規制当局・メディアへの通報をちらつかせる。</li>
      </ul>
      <p>
        データ恐喝への移行は、この多重化の延長線上にあります。「暗号化」はあくまで圧力手段の一つにすぎなくなりました。
      </p>

      <h2>変化3：完全な分業エコシステム（RaaSとIAB）</h2>
      <p>
        いまのランサムウェアは、単一の犯罪者ではなく<strong>役割分担された経済圏</strong>で動きます。
      </p>
      <h3>RaaS（Ransomware-as-a-Service）</h3>
      <p>
        ランサムウェア本体・リークサイト・交渉インフラを<strong>運営者が用意し、実行役（アフィリエイト）に貸し出す</strong>モデル。2024年だけで<strong>55の新興RaaSファミリー</strong>が登場（前年比67%増）。アフィリエイトは身代金の分け前を得ます。
      </p>
      <h3>初期アクセスブローカー（IAB）</h3>
      <p>
        <strong>侵入経路だけを専門に売る</strong>業者です。盗んだVPN/RDP/RDWeb の認証情報や、{" "}
        <a href="/learn/security/infostealer-session-hijacking">インフォスティーラーが抜いたセッション</a>{" "}
        を、アフィリエイトに販売します。2025年にIABが生んだ収益は<strong>約1,400万ドル</strong>規模とされ、近年は<strong>RDWeb（リモートアクセス）への注目</strong>が高まっています。攻撃者は「侵入」を自分でやらず、<strong>買ってくる</strong>のです。
      </p>

      <h2>主要グループの動き（2025〜2026）</h2>
      <ul>
        <li>
          <strong>Qilin</strong>：2025年に最も活発な標的型グループに台頭。2026年2月は<strong>104件</strong>を主張し2か月連続首位。アフィリエイトをオープンに募る一方、Akira等に比べ<strong>非支払い率が高い</strong>傾向。
        </li>
        <li>
          <strong>Cl0p</strong>：<strong>サプライチェーン型の大量攻撃</strong>が真骨頂。広く使われるファイル転送・業務ソフトの脆弱性を突き、一度に多数を侵害する。2025年は <strong>Oracle EBS の CVE-2025-61882 / CVE-2025-61884</strong> を悪用し、数週間で<strong>100超の組織</strong>をリークサイトに掲載。{" "}
          <a href="/learn/security/supply-chain-attacks">サプライチェーン攻撃</a>{" "}
          の発想と地続きです。
        </li>
        <li>
          <strong>Akira</strong>：派手さはないが<strong>安定して継続</strong>。運用の堅実さで被害を積み上げる。
        </li>
        <li>
          <strong>RansomHub</strong>：2025年に急成長し急に休眠。RaaS市場の<strong>不安定さ</strong>を象徴。Qilin が空白を埋めた。
        </li>
      </ul>
      <p>
        「グループ数は減り、1件あたりの影響は増す（fewer groups, higher impact）」が2026年の基調です。摘発も進み、データ売買フォーラム <strong>LeakBase が2026年3月に押収</strong>されましたが、空白は別のフォーラムが埋めると見られています。
      </p>

      <h2>2026年に注目された個別事例</h2>
      <p>
        ここまでの変化が、実際の事案でどう現れたかを4つ挙げます。
      </p>
      <ul>
        <li>
          <strong>Fog</strong>：2026年に100件超の被害。「<strong>マルウェアを他者に拡散すれば身代金を免除する</strong>」という前代未聞の社会工学的手口を持ち込んだ。侵入はVPNクレデンシャルの悪用、実行前に <strong>BYOVD でEDRを無効化</strong>し、DOGEロゴ入りの脅迫状で二重恐喝を行った。
        </li>
        <li>
          <strong>Nitrogen（Foxconn事案）</strong>：2026年5月、Apple・Nvidia・Intelの主要サプライヤーである Foxconn の北米工場が侵害され、<strong>8TB・1,100万ファイル超の窃取</strong>が主張された。<strong>身代金を払っても復号できない欠陥</strong>を抱える点が特徴で、製造業のサプライチェーンリスクを改めて示した。
        </li>
        <li>
          <strong>Kyber</strong>：2026年3月にRapid7が解析した、<strong>耐量子暗号を掲げる</strong>新興。Windows版（Rust製）は Kyber1024（ML-KEM-1024）＋X25519＋AES-256-CTR を本当に実装する一方、Linux/ESXi版は ChaCha8＋RSA-4096 の看板倒れという二面性を持つ。シャドウコピー削除・SQL/Exchange停止・ESXi暗号化を行い、米防衛関連企業が被害に挙がった。耐量子を謳うことは、被害者の「将来の復号」の望みすら断つ意味を持つ。
        </li>
        <li>
          <strong>The Gentlemen（Storm-2697）</strong>：2026年5月にMicrosoftが解析。Go製エンコーダが<strong>1標的あたり21通り</strong>（PsExec／WMI／スケジュールタスク／PowerShellリモーティング／SMB共有など）の手段でネットワーク内を自動拡散する。Defenderの無効化・C:全体の除外・シャドウコピー削除・イベントログ消去で検知を妨害し、Curve25519＋XChaCha20で暗号化する二重恐喝型RaaS。
        </li>
      </ul>

      <h2>変化4：EDRを殺してから動く（BYOVD）</h2>
      <p>
        ペイロード実行前に<strong>防御を無力化する</strong>のが標準戦術になりました。<strong>EDRキラー</strong>と呼ばれるツール群で監視エージェントを停止させます。代表が <strong>BYOVD（Bring Your Own Vulnerable Driver）</strong>——<strong>正規だが脆弱なカーネルドライバを読み込み、カーネルレベルでEDR/AVを盲目化</strong>する手口です。Cl0p も暗号化前のBYOVDでセキュリティ製品を無効化していました。{" "}
        <a href="/learn/security/lolbins-living-off-the-land">LOLBins／環境寄生型攻撃</a>{" "}
        と同じく、「正規のものを悪用する」発想が一貫しています。
      </p>

      <h2>図解案：攻撃ライフサイクルと防御点</h2>
      <pre>
        <code>{`[IABから侵入経路を購入] ─ 盗まれたVPN/RDWeb/セッション
        │  ← ★ID防御（フィッシング耐性MFA・条件付きアクセス）
        ▼
[初期アクセス] ─ フィッシング/脆弱性(Cl0p型)
        │  ← ★外部公開資産の即時パッチ（KEV優先）
        ▼
[探索・横展開] ─ LOLBins / 正規ツール
        │  ← ★ふるまい検知・ネットワーク分割・最小権限
        ▼
[データ持ち出し] ─ 大量外部送信
        │  ← ★出口監視/DLP（恐喝はここを止めないと無力化できない）
        ▼
[EDR無効化(BYOVD) → 暗号化 or 公開脅迫]
           ← ★脆弱ドライバブロック・HVCI・タンパープロテクション

要点：ランサムウェアは攻撃の“最後”。手前の各段で止めるほど被害は小さい`}</code>
      </pre>

      <h2>2026年に効く防御の優先順位</h2>
      <ol>
        <li>
          <strong>ID（認証）を最優先で固める</strong>：初期アクセスの多くは正規アカウントの悪用。{" "}
          <a href="/learn/security/mfa-totp-fido2">フィッシング耐性MFA（FIDO2/Passkey）</a>、条件付きアクセス、{" "}
          <a href="/learn/security/device-code-phishing">デバイスコードフィッシング</a> 等のMFA迂回への対処を。
        </li>
        <li>
          <strong>外部公開資産を即パッチ</strong>：Cl0p型はファイル転送・VPN・エッジ機器を大量に突く。<strong>KEV（悪用が確認された脆弱性）優先</strong>で緊急適用する。
        </li>
        <li>
          <strong>データ持ち出しを止める</strong>：暗号化対策（バックアップ）だけでは恐喝に勝てない。<strong>出口監視・DLP・セグメンテーション</strong>で大量外部送信を検知・遮断する。
        </li>
        <li>
          <strong>BYOVD対策</strong>：脆弱ドライバブロックリスト、HVCI（メモリ整合性）、EDRのタンパープロテクションを有効化。
        </li>
        <li>
          <strong>“手前”で検知する</strong>：ランサムウェアは最終段。偵察・LOLBins・横展開を{" "}
          <a href="/learn/security/mitre-attack">MITRE ATT&amp;CK</a>{" "}
          にマッピングして早期に捉える。
        </li>
        <li>
          <strong>インシデント対応の準備</strong>：オフライン/イミュータブルバックアップ、復旧手順の演習、<strong>漏えい時の法的・通知対応</strong>まで含めて備える。「払う／払わない」を事前に方針化する。
        </li>
      </ol>

      <h2>まとめ</h2>
      <p>
        2026年のランサムウェアは、<strong>「暗号化マルウェア」から「データ恐喝ビジネス」へ</strong>と本質が移りました。だからこそ、<strong>バックアップ中心の発想だけでは守り切れません</strong>。守りの軸は——<strong>IDを固めて初期アクセスを断つ、外部公開資産を即パッチする、データ持ち出しを出口で止める、BYOVDでEDRを殺させない、そして攻撃の手前で検知する</strong>。
      </p>
      <p>
        ランサムウェアは、当サイトで解説してきた{" "}
        <a href="/learn/security/clickfix">ClickFix</a>・{" "}
        <a href="/learn/security/infostealer-session-hijacking">セッション窃取</a>・{" "}
        <a href="/learn/security/lolbins-living-off-the-land">LOLBins</a>・{" "}
        <a href="/learn/security/supply-chain-attacks">サプライチェーン攻撃</a>{" "}
        が連なった<strong>攻撃ストーリーの終着点</strong>です。各段を理解しておくことが、最終段を防ぐ最善策になります。
      </p>
      <p>
        ※ 本記事の統計値・グループ名・CVEは、Securelist／Check Point／Chainalysis／各セキュリティベンダーの公表内容および報道に基づきます。状況は急速に変化するため、対応時は最新の公式情報をご確認ください。
      </p>
    </ArticleLayout>
  );
}
