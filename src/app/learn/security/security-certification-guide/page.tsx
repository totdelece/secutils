import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "security-certification-guide")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>セキュリティ資格を取る前に知っておくこと</h2>
      <p>
        「セキュリティ資格を取りたいけど何から始めればいい？」は多くの人が抱える疑問だ。情報処理安全確保支援士・CISSP・CompTIA Security+・CEH・OSCP など、選択肢は多く、それぞれ難易度・費用・取得条件・業界での評価が大きく異なる。
      </p>
      <p>
        資格は「目的のための手段」であり、何を目指すかによって最適な資格が変わる。本記事では主要なセキュリティ資格を比較して、自分のキャリアステージと目標に合った資格を選ぶための判断材料を提供する。
      </p>

      <h2>主要セキュリティ資格の一覧比較</h2>
      <table>
        <thead>
          <tr>
            <th>資格名</th>
            <th>主催</th>
            <th>難易度</th>
            <th>実務経験要件</th>
            <th>受験費用</th>
            <th>国際通用性</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>情報処理安全確保支援士</td>
            <td>IPA（日本）</td>
            <td>中〜高</td>
            <td>不要</td>
            <td>約7,500円</td>
            <td>主に国内</td>
          </tr>
          <tr>
            <td>CISSP</td>
            <td>(ISC)²（国際）</td>
            <td>高</td>
            <td>5年（2ドメイン以上）</td>
            <td>約$749（約12万円）</td>
            <td>非常に高い</td>
          </tr>
          <tr>
            <td>CompTIA Security+</td>
            <td>CompTIA（国際）</td>
            <td>低〜中</td>
            <td>不要（2年推奨）</td>
            <td>約$392（約6万円）</td>
            <td>高い</td>
          </tr>
          <tr>
            <td>CEH（Certified Ethical Hacker）</td>
            <td>EC-Council</td>
            <td>中</td>
            <td>2年推奨</td>
            <td>約$950（約15万円）</td>
            <td>中程度</td>
          </tr>
          <tr>
            <td>OSCP</td>
            <td>Offensive Security</td>
            <td>非常に高</td>
            <td>不要（実技力必須）</td>
            <td>約$1,499（約24万円、コース込）</td>
            <td>高い（ペネトレーション専門）</td>
          </tr>
          <tr>
            <td>AWS Security Specialty</td>
            <td>Amazon Web Services</td>
            <td>中〜高</td>
            <td>5年のIT・2年のAWSセキュリティ推奨</td>
            <td>約$300（約5万円）</td>
            <td>AWS環境で非常に高い</td>
          </tr>
          <tr>
            <td>CompTIA CySA+</td>
            <td>CompTIA（国際）</td>
            <td>中</td>
            <td>不要（4年推奨）</td>
            <td>約$392（約6万円）</td>
            <td>高い</td>
          </tr>
        </tbody>
      </table>
      <p>
        費用は為替レートにより変動する。試験費用のほか、テキスト・学習コース費用も考慮すること。
      </p>

      <h2>資格別の詳細解説</h2>

      <h3>情報処理安全確保支援士（登録セキスペ）</h3>
      <p>
        <strong>こんな人に向いている</strong>: 日本国内でのセキュリティキャリアを築きたい人・情シス担当者・コンプライアンス対応が必要な業種
      </p>
      <ul>
        <li>IPA（情報処理推進機構）が認定する国家資格。年2回（春・秋）実施</li>
        <li>午前I・午前II（多肢選択式）＋午後（記述式）の3区分構成</li>
        <li>合格率は約20〜22%。受験料は7,500円と他国際資格より圧倒的に安い</li>
        <li>3年ごとの更新講習が必要（登録しない場合は試験合格のみでもキャリアに使える）</li>
        <li>国内の求人では「情報処理安全確保支援士歓迎」の記載が増加中</li>
      </ul>
      <p>
        <strong>弱点</strong>: 海外での知名度はほとんどなく、グローバル展開には CISSP が必要になる。
      </p>

      <h3>CISSP（Certified Information Systems Security Professional）</h3>
      <p>
        <strong>こんな人に向いている</strong>: セキュリティマネジメント・CISO職・外資系企業・グローバルな仕事
      </p>
      <ul>
        <li>(ISC)² が認定する国際資格。180以上の国で認知される「セキュリティ資格の最高峰」</li>
        <li>8ドメイン（セキュリティとリスク管理・IAM・ソフトウェア開発セキュリティ等）で幅広い知識が問われる</li>
        <li>5年以上の実務経験が必要（Associate of (ISC)²制度で実務経験なしでも受験可能）</li>
        <li>日本語試験あり（250問・6時間）。英語CAT試験（125〜175問・3時間）もある</li>
        <li>取得後は毎年CPE 40時間・年会費$125が必要</li>
      </ul>
      <p>
        <strong>弱点</strong>: 費用が高く、維持コストもかかる。技術よりマネジメント寄りのため、ハンズオンの技術力は別途必要。
      </p>

      <h3>CompTIA Security+</h3>
      <p>
        <strong>こんな人に向いている</strong>: セキュリティ入門・IT技術者の知識補完・海外就職の第一歩
      </p>
      <ul>
        <li>セキュリティの基礎から中級レベルまでを網羅する国際資格</li>
        <li>90分・最大90問（多肢選択式＋パフォーマンスベース問題）</li>
        <li>米国政府機関（DoD）の採用要件にも含まれる</li>
        <li>日本語版はなく、英語での受験になる</li>
        <li>3年ごとに50 CEUを取得するか再受験で更新</li>
      </ul>
      <p>
        <strong>弱点</strong>: 日本国内での認知度は情報処理安全確保支援士より低い。英語での受験が必要。
      </p>

      <h3>CEH（Certified Ethical Hacker）</h3>
      <p>
        <strong>こんな人に向いている</strong>: ペネトレーションテストに興味がある・攻撃手法を体系的に学びたい
      </p>
      <ul>
        <li>EC-Councilが認定。攻撃者の手法（フットプリンティング・スキャニング・ソーシャルエンジニアリング等）を体系的に学ぶ</li>
        <li>筆記試験（125問・4時間）中心で実技は少なめ</li>
        <li>「攻撃を知ることで防御を強化する」概念の普及に貢献したが、近年は OSCP の実技重視が評価される傾向</li>
      </ul>
      <p>
        <strong>弱点</strong>: 試験が筆記中心で実際のハッキングスキル証明にはならないという批判もある。
      </p>

      <h3>OSCP（Offensive Security Certified Professional）</h3>
      <p>
        <strong>こんな人に向いている</strong>: ペネトレーションテスター・レッドチーム・本格的な攻撃技術の証明
      </p>
      <ul>
        <li>Offensive Securityが提供するPWKコース（Penetration Testing with Kali Linux）修了後に受験</li>
        <li>24時間の実機試験（複数のマシンを実際にハッキングしてフラグを取得）</li>
        <li>「Try Harder」の精神で知られる高難度資格。業界でのブランド力が高い</li>
        <li>一度取得すれば更新不要</li>
      </ul>
      <p>
        <strong>弱点</strong>: 非常に難しく取得まで時間がかかる。マネジメント職には不向き。
      </p>

      <h3>AWS Security Specialty</h3>
      <p>
        <strong>こんな人に向いている</strong>: クラウドエンジニア・AWS環境のセキュリティ担当
      </p>
      <ul>
        <li>AWSのセキュリティサービス（IAM・KMS・CloudTrail・GuardDuty・Security Hub等）の深い知識を証明</li>
        <li>AWS認定の中では最難関に近い専門資格（Specialty）</li>
        <li>クラウドシフトが進む現代では需要が増加中</li>
      </ul>
      <p>
        <strong>弱点</strong>: AWSに特化しており、Azure・GCPには別の資格が必要。
      </p>

      <h2>キャリアステージ別の推奨資格</h2>
      <table>
        <thead>
          <tr>
            <th>キャリアステージ</th>
            <th>おすすめの順番</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>未経験・IT入門</td>
            <td>CompTIA Security+ → 情報処理安全確保支援士</td>
          </tr>
          <tr>
            <td>IT経験あり・セキュリティへの転向</td>
            <td>情報処理安全確保支援士 → 実務経験を積んでCISSP</td>
          </tr>
          <tr>
            <td>セキュリティ実務者・キャリアアップ</td>
            <td>CISSP（マネジメント志向）or OSCP（技術志向）</td>
          </tr>
          <tr>
            <td>クラウドエンジニア</td>
            <td>AWS SAA → AWS Security Specialty</td>
          </tr>
          <tr>
            <td>ペネトレーションテスト専門</td>
            <td>CompTIA Security+ / CEH → OSCP</td>
          </tr>
          <tr>
            <td>管理職・CISO志望</td>
            <td>情報処理安全確保支援士 → CISSP → CISM（ISACAが提供）</td>
          </tr>
        </tbody>
      </table>

      <h2>資格取得の費用対効果を考える</h2>
      <p>
        資格取得には受験料・テキスト・場合によってはスクール費用がかかる。費用対効果を考えるポイントをまとめる。
      </p>
      <ul>
        <li>
          <strong>まず国内資格から</strong>: 情報処理安全確保支援士は受験料7,500円と非常に安く、国内での評価が高い。コスパ最高の選択肢だ。
        </li>
        <li>
          <strong>CISSP は実務経験が先</strong>: 実務経験なしで CISSP の勉強をするのは非効率。まず経験を積みながら情報処理安全確保支援士を取り、CISSP は5年後の目標にする。
        </li>
        <li>
          <strong>英語力は投資対象</strong>: 国際資格を目指すなら英語での学習・受験が必要になる。英語で技術文書を読む習慣を先に作ると選択肢が広がる。
        </li>
        <li>
          <strong>資格より実務スキルが先</strong>: 資格は証明手段。実際に手を動かして学べる CTF（Capture The Flag）・TryHackMe・HackTheBox などの実践的学習と組み合わせることで、資格の価値が最大化される。
        </li>
      </ul>

      <h2>よくある質問</h2>
      <h3>セキュリティ資格はどれを取るべきですか？</h3>
      <p>
        目標によって異なる。国内でのセキュリティ担当者キャリアなら情報処理安全確保支援士、IT全般の入門なら CompTIA Security+、グローバルや管理職を目指すなら CISSP が適している。まず Security+ または情報処理安全確保支援士で基礎を固めるのが一般的なキャリアパスだ。
      </p>

      <h3>セキュリティ資格なしでもセキュリティエンジニアになれますか？</h3>
      <p>
        なれる。実務経験と技術力が最重視される業界だ。資格は学習意欲と知識の証明として有効で、未経験からの転職では差別化になるが、必須条件ではない。
      </p>

      <h3>CompTIA Security+とは何ですか？</h3>
      <p>
        CompTIA が認定する国際的なセキュリティ入門〜中級資格だ。米国政府機関の採用要件にも含まれ、英語で受験するが国際的な認知度がある。日本国内での認知は情報処理安全確保支援士より低い。
      </p>

      <h3>OSCPとは何ですか？</h3>
      <p>
        Offensive Security が認定するペネトレーションテストの実技資格。24時間の実機試験で実際にシステムへの侵入を求められる高難度資格で、ペネトレーションテスター業界での評価が高い。
      </p>

      <h3>セキュリティ資格の維持にはどのくらい費用がかかりますか？</h3>
      <p>
        情報処理安全確保支援士は3年ごとの更新講習で約2〜5万円、CISSP は年会費$125＋120 CPE/3年、CompTIA Security+ は3年ごとの更新、OSCP は一度取得すれば更新不要だ。
      </p>

      <h2>関連記事</h2>
      <ul>
        <li><a href="/learn/security/sc-exam-guide">情報処理安全確保支援士 勉強方法・合格率</a> — 国内資格の詳細ガイド</li>
        <li><a href="/learn/security/cissp-guide">CISSP難易度・合格率・勉強時間</a> — グローバル最高峰資格の詳細</li>
        <li><a href="/learn/security/owasp-top-10">OWASP Top 10 入門</a> — 資格試験頻出のWebセキュリティ基礎</li>
        <li><a href="/learn/security/incident-response-guide">セキュリティインシデント対応手順</a> — 実務で使えるインシデント対応の基礎</li>
      </ul>
    </ArticleLayout>
  );
}
