import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "cissp-guide")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>CISSPとは</h2>
      <p>
        <strong>CISSP（Certified Information Systems Security Professional）</strong>は、非営利組織 <strong>(ISC)²</strong>（International Information System Security Certification Consortium）が認定する、世界で最も権威のある情報セキュリティ資格の一つだ。1994年に創設され、現在（2025年時点）で世界180以上の国に16万人以上の認定者がいる。
      </p>
      <p>
        セキュリティのマネジメントからアーキテクチャ、運用まで幅広い知識体系を問う試験で、「セキュリティ全般を深く理解した管理職・上級エンジニア向けの資格」という位置づけだ。取得には実務経験が必要なため、若手エンジニアが最初に目指す資格というよりは、セキュリティキャリアの集大成として取得するものと考えると適切だ。
      </p>

      <h2>CISSPの8つのドメイン</h2>
      <p>
        CISSP の出題範囲は <strong>CBK（Common Body of Knowledge）</strong>と呼ばれる知識体系に基づく8ドメインで構成される。2024年改定の最新版は以下の通りだ。
      </p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ドメイン名</th>
            <th>出題比率</th>
            <th>主な内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>セキュリティとリスク管理</td>
            <td>16%</td>
            <td>ガバナンス・法律・倫理・リスク評価・BCP/DR</td>
          </tr>
          <tr>
            <td>2</td>
            <td>資産セキュリティ</td>
            <td>10%</td>
            <td>情報分類・所有権・プライバシー保護・データ管理</td>
          </tr>
          <tr>
            <td>3</td>
            <td>セキュリティアーキテクチャとエンジニアリング</td>
            <td>13%</td>
            <td>設計原則・暗号化・物理セキュリティ・脆弱性</td>
          </tr>
          <tr>
            <td>4</td>
            <td>通信とネットワークセキュリティ</td>
            <td>13%</td>
            <td>OSI/TCP-IP・プロトコル・VPN・ファイアウォール</td>
          </tr>
          <tr>
            <td>5</td>
            <td>IDおよびアクセス管理（IAM）</td>
            <td>13%</td>
            <td>認証・認可・アクセス制御モデル・ID管理</td>
          </tr>
          <tr>
            <td>6</td>
            <td>セキュリティアセスメントとテスト</td>
            <td>12%</td>
            <td>脆弱性評価・ペネトレーションテスト・監査</td>
          </tr>
          <tr>
            <td>7</td>
            <td>セキュリティ運用</td>
            <td>13%</td>
            <td>インシデント対応・フォレンジック・BCP・ログ管理</td>
          </tr>
          <tr>
            <td>8</td>
            <td>ソフトウェア開発セキュリティ</td>
            <td>10%</td>
            <td>セキュアコーディング・SDLCセキュリティ・APIセキュリティ</td>
          </tr>
        </tbody>
      </table>
      <p>
        ドメイン1「セキュリティとリスク管理」が出題比率16%と最も高く、ガバナンスやリスク管理の考え方が重視されていることがわかる。日本の技術系資格と異なり、マネジメント視点の問題が多いのがCISSPの特徴だ。
      </p>

      <h2>CISSPの難易度</h2>
      <p>
        CISSPが難しいとされる理由は複数ある。
      </p>
      <h3>知識の幅広さ</h3>
      <p>
        8ドメインにわたる幅広い知識が求められる。技術的な内容だけでなく、法律・規制・ガバナンス・倫理・事業継続など、純粋な技術エンジニアが不得意とする分野も含まれる。「一つの専門分野を深く勉強する」のではなく「セキュリティ全般を満遍なく理解する」勉強が必要だ。
      </p>
      <h3>思考の転換が必要</h3>
      <p>
        CISSPでは「マネージャー・CISO としての視点」が求められる。「最も安全な方法は何か」ではなく「ビジネスリスクと費用対効果のバランスを取った最善の方法は何か」という思考が必要だ。技術的に正しくても、ビジネス観点では誤りになる選択肢が多い。
      </p>
      <h3>実務経験要件</h3>
      <p>
        試験合格後に実務経験の審査がある。ただし試験に合格することは難しいため、まず試験合格を目指すことが優先だ。
      </p>

      <h2>必要な実務経験</h2>
      <p>
        CISSP の取得には <strong>8ドメインのうち2つ以上の分野で通算5年以上の有給実務経験</strong>が必要だ。ただし例外がある。
      </p>
      <table>
        <thead>
          <tr>
            <th>条件</th>
            <th>必要な経験年数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>標準</td>
            <td>5年（8ドメインのうち2つ以上）</td>
          </tr>
          <tr>
            <td>4年制大学の学位保有</td>
            <td>4年</td>
          </tr>
          <tr>
            <td>(ISC)²認定の追加資格保有（CompTIA Security+など）</td>
            <td>4年</td>
          </tr>
        </tbody>
      </table>
      <h3>Associate of (ISC)² — 経験なしでも試験を受けられる</h3>
      <p>
        実務経験がなくても CISSP 試験を受験できる。合格後は <strong>Associate of (ISC)²</strong> として認定され、<strong>6年以内に実務経験を証明</strong>できれば正式な CISSP に昇格できる。学生や未経験者にとっては「先に試験に合格しておく」という戦略が有効だ。
      </p>

      <h2>勉強時間の目安</h2>
      <p>
        受験者のバックグラウンドによって大きく異なるが、一般的な目安は以下の通りだ。
      </p>
      <table>
        <thead>
          <tr>
            <th>バックグラウンド</th>
            <th>目安勉強時間</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>セキュリティ実務経験5年以上・幅広い知識あり</td>
            <td>150〜250時間</td>
          </tr>
          <tr>
            <td>IT実務経験あり・セキュリティ特化ではない</td>
            <td>250〜400時間</td>
          </tr>
          <tr>
            <td>IT経験が少ない・初めて体系学習する</td>
            <td>400〜600時間</td>
          </tr>
        </tbody>
      </table>
      <p>
        毎日2時間学習するとして、150時間なら約2.5ヶ月、400時間なら約7ヶ月の計算だ。
      </p>
      <h3>おすすめの参考書・学習リソース</h3>
      <ul>
        <li>
          <strong>Official (ISC)² CISSP Study Guide（英語）</strong>: 公式テキスト。最も網羅的だが英語のみ。全体把握に使いつつ、苦手分野を深掘りする形で活用する。
        </li>
        <li>
          <strong>CISSP 公式問題集（日本語版あり）</strong>: (ISC)² 公式の演習問題集。問題の「癖」に慣れるために必須。
        </li>
        <li>
          <strong>Mike Chapple / David Seidl 著 "CISSP Study Guide"（Sybex）</strong>: 受験者に人気のサードパーティテキスト。解説がわかりやすい。
        </li>
        <li>
          <strong>Prabh Nair の YouTube チャンネル（英語）</strong>: 無料で各ドメインを動画解説。理解の補完に効果的。
        </li>
      </ul>

      <h2>日本語試験について</h2>
      <p>
        CISSP は日本語でも受験できる。ただし日本語試験は英語の CAT 試験とは形式が異なる点に注意が必要だ。
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>英語試験（CAT）</th>
            <th>日本語試験（線形）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>問題数</td>
            <td>125〜175問（適応型）</td>
            <td>250問（固定）</td>
          </tr>
          <tr>
            <td>試験時間</td>
            <td>3時間</td>
            <td>6時間</td>
          </tr>
          <tr>
            <td>形式</td>
            <td>CAT（Computer Adaptive Testing）</td>
            <td>線形（全問を順番に解く）</td>
          </tr>
          <tr>
            <td>受験料</td>
            <td>同額</td>
            <td>同額</td>
          </tr>
        </tbody>
      </table>
      <p>
        CAT 形式は正解するほど難しい問題が出題される適応型テストで、最短125問で終了することもある。日本語試験は線形形式で問題数が多く、長時間の集中力が必要だ。英語で受験できる場合は CAT 形式の方が有利という意見もある。
      </p>

      <h2>CISSP・情報処理安全確保支援士・CompTIA Security+ の比較</h2>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>CISSP</th>
            <th>情報処理安全確保支援士</th>
            <th>CompTIA Security+</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>主催</td>
            <td>(ISC)²（国際）</td>
            <td>IPA（日本）</td>
            <td>CompTIA（国際）</td>
          </tr>
          <tr>
            <td>難易度</td>
            <td>高（実務経験5年必要）</td>
            <td>中〜高</td>
            <td>低〜中（入門向け）</td>
          </tr>
          <tr>
            <td>実務経験要件</td>
            <td>5年必須</td>
            <td>不要</td>
            <td>不要</td>
          </tr>
          <tr>
            <td>国際通用性</td>
            <td>非常に高い</td>
            <td>主に国内</td>
            <td>高い</td>
          </tr>
          <tr>
            <td>更新</td>
            <td>3年ごと（CPE 120時間・年会費）</td>
            <td>3年ごと（更新講習）</td>
            <td>3年ごと（CEU 50単位）</td>
          </tr>
          <tr>
            <td>向いている人</td>
            <td>CISO・上級セキュリティ管理職・グローバル展開</td>
            <td>国内でのセキュリティキャリア証明</td>
            <td>IT技術者のセキュリティ入門</td>
          </tr>
        </tbody>
      </table>
      <p>
        国内のセキュリティ担当者として働く場合は情報処理安全確保支援士が有効で、グローバル展開やコンサルタント・CISO・外資系企業を目指す場合は CISSP が強い武器になる。まず Security+ または情報処理安全確保支援士で基礎を固め、実務経験を積んでから CISSP に挑戦するキャリアパスが一般的だ。
      </p>

      <h2>CISSP取得後の維持管理</h2>
      <p>
        CISSP は取得後の維持管理も重要だ。
      </p>
      <ul>
        <li><strong>継続教育（CPE）</strong>: 3年間で120時間の CPE（継続教育単位）を取得する必要がある。セキュリティカンファレンス参加・ウェビナー受講・記事執筆・教育活動などが対象。</li>
        <li><strong>年会費</strong>: 毎年$125（約2万円）の年会費が必要。</li>
        <li><strong>倫理規定</strong>: (ISC)² の倫理規定（Code of Ethics）を遵守する義務がある。</li>
      </ul>

      <h2>よくある質問</h2>
      <h3>CISSPを取得するのに必要な実務経験はどのくらいですか？</h3>
      <p>
        8ドメインのうち2つ以上の分野で5年以上の有給実務経験が必要だ。4年制大学の学位または (ISC)² が認定する資格（CompTIA Security+ など）を持っている場合は4年で OK。実務経験がなくても試験に合格して Associate of (ISC)² になり、6年以内に経験を積んで昇格できる。
      </p>

      <h3>CISSPの試験は日本語で受けられますか？</h3>
      <p>
        はい、日本語試験がある。ただし日本語試験は線形形式（250問・6時間）で、英語の CAT 試験（125〜175問・3時間）より問題数が多く試験時間も長い。
      </p>

      <h3>CISSPの難易度と合格率はどのくらいですか？</h3>
      <p>
        (ISC)² は合格率を公表していない。受験者の体感では60〜70%程度と言われている。ただし受験者はすでに実務経験5年以上のプロフェッショナルが中心なので、実質的な難易度は高い。
      </p>

      <h3>CISSPの勉強時間はどのくらい必要ですか？</h3>
      <p>
        セキュリティ実務経験者で200〜300時間、広範な知識が必要な場合は300〜500時間が目安だ。8ドメインにわたる幅広い知識が問われる。
      </p>

      <h3>情報処理安全確保支援士とCISSPはどちらが難しいですか？</h3>
      <p>
        一般的に CISSP の方が難しいとされている。実務経験要件・8ドメインの幅広さ・維持コストなど、取得・維持コストが高い。国内評価では情報処理安全確保支援士、国際評価では CISSP が強みを持つ。
      </p>

      <h2>関連記事</h2>
      <ul>
        <li><a href="/learn/security/sc-exam-guide">情報処理安全確保支援士 勉強方法・合格率</a> — 国内資格の先行ステップとして</li>
        <li><a href="/learn/security/owasp-top-10">OWASP Top 10 入門</a> — ドメイン8（ソフトウェア開発）に直結</li>
        <li><a href="/learn/security/mfa-totp-fido2">MFA・TOTP・FIDO2・Passkey の違い</a> — ドメイン5（IAM）の実践知識</li>
        <li><a href="/learn/security/incident-response-guide">セキュリティインシデント対応手順</a> — ドメイン7（セキュリティ運用）の実践</li>
        <li><a href="/learn/security/http-security-headers">HTTPセキュリティヘッダー詳解</a> — ドメイン3・8に関連</li>
      </ul>
    </ArticleLayout>
  );
}
