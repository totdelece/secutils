import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "comptia-security-plus-guide")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>CompTIA Security+</strong> は、セキュリティの基礎を<strong>特定の製品に依存しない形で</strong>体系的に問う国際資格です。国内では情報処理安全確保支援士や CISSP ほど名前が知られていませんが、<strong>実務で必要な範囲がバランスよく出題される</strong>ため、「セキュリティを一通り押さえたい」という段階の人に向いています。
      </p>
      <p>
        そして日本の受験者にとって重要な変化があります。<strong>2024 年 4 月から日本語での受験が可能</strong>になりました。「Security+ は英語で受けるもの」という情報がまだ多く残っていますが、現在は当てはまりません。
      </p>

      <h2>試験の基本情報（SY0-701）</h2>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>試験コード</td>
            <td>SY0-701（V7）</td>
          </tr>
          <tr>
            <td>問題数</td>
            <td>最大 90 問（単一/複数選択＋パフォーマンスベース問題）</td>
          </tr>
          <tr>
            <td>試験時間</td>
            <td>90 分</td>
          </tr>
          <tr>
            <td>合格点</td>
            <td>100〜900 のスコア形式で <strong>750 以上</strong></td>
          </tr>
          <tr>
            <td>言語</td>
            <td>英語・<strong>日本語</strong>・ポルトガル語・スペイン語・タイ語</td>
          </tr>
          <tr>
            <td>日本語試験の開始</td>
            <td>2024 年 4 月 23 日</td>
          </tr>
          <tr>
            <td>受験形式</td>
            <td>テストセンターまたはオンライン監督試験</td>
          </tr>
          <tr>
            <td>有効期限</td>
            <td>3 年（継続教育で更新）</td>
          </tr>
        </tbody>
      </table>
      <p>
        特徴的なのが<strong>パフォーマンスベース問題（PBQ）</strong>です。単純な選択式ではなく、設定画面やログを見て操作・判断する形式で、多くの場合は試験の冒頭に出ます。ここで時間を使いすぎると後半の選択問題が消化できません。<strong>PBQ は一旦フラグを付けて飛ばし、選択問題を終えてから戻る</strong>のが定石とされています。
      </p>
      <p>
        なお<strong>受験料は改定されることがあるため、本記事では金額を記載しません</strong>。申し込み前に CompTIA 公式ストアまたはピアソン VUE で最新の価格を確認してください。バウチャーをまとめ買いする形態もあります。
      </p>

      <h2>5 つの出題ドメインと比率</h2>
      <p>
        SY0-701 は次の 5 ドメインで構成されます。比率を見ると<strong>「運用（Security operations）」が 28% で最大</strong>、次いで「脅威・脆弱性・緩和策」が 22% です。知識を暗記するだけでなく、<strong>運用の現場でどう判断するか</strong>が問われる試験だと分かります。
      </p>
      <table>
        <thead>
          <tr>
            <th>ドメイン</th>
            <th>比率</th>
            <th>問われる内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1. General security concepts（一般的なセキュリティ概念）</td>
            <td>12%</td>
            <td>CIA、認証・認可、暗号の基礎、ゼロトラスト、変更管理</td>
          </tr>
          <tr>
            <td>2. Threats, vulnerabilities, and mitigations（脅威・脆弱性・緩和策）</td>
            <td>22%</td>
            <td>攻撃者の類型、マルウェア、Web の脆弱性、緩和策</td>
          </tr>
          <tr>
            <td>3. Security architecture（セキュリティアーキテクチャ）</td>
            <td>18%</td>
            <td>ネットワーク設計、クラウド、データ保護、レジリエンス</td>
          </tr>
          <tr>
            <td>4. Security operations（セキュリティ運用）</td>
            <td><strong>28%</strong></td>
            <td>監視、脆弱性管理、インシデント対応、資産管理、認証運用</td>
          </tr>
          <tr>
            <td>5. Security program management and oversight（プログラム管理と監督）</td>
            <td>20%</td>
            <td>ガバナンス、リスク管理、第三者リスク、コンプライアンス</td>
          </tr>
        </tbody>
      </table>

      <h2>各ドメインは、この記事で補える</h2>
      <p>
        Security+ の出題範囲は広く、参考書だけでは具体像がつかみにくい項目があります。本サイトの解説記事とドメインの対応をまとめました。<strong>参考書で概念を押さえ、ピンとこない項目をここで掘る</strong>という使い方を想定しています。
      </p>

      <h3>ドメイン 1：一般的なセキュリティ概念（12%）</h3>
      <ul>
        <li><Link href="/learn/security/public-key-crypto">公開鍵暗号の基本</Link> — RSA・ECDSA・署名・鍵交換</li>
        <li><Link href="/learn/security/secure-randomness">安全な乱数</Link> — 暗号学的乱数がなぜ必要か</li>
        <li><Link href="/learn/security/zero-trust-security">ゼロトラストとは</Link> — 出題頻度が上がっている概念</li>
        <li><Link href="/learn/security/mfa-totp-fido2">MFA / TOTP / FIDO2 の違い</Link> — 認証要素の分類</li>
      </ul>

      <h3>ドメイン 2：脅威・脆弱性・緩和策（22%）</h3>
      <ul>
        <li><Link href="/learn/security/owasp-top-10">OWASP Top 10 入門</Link> — Web の脆弱性の全体像</li>
        <li><Link href="/learn/security/ransomware-2026">2026年のランサムウェア</Link> / <Link href="/learn/security/supply-chain-attacks">サプライチェーン攻撃</Link></li>
        <li><Link href="/learn/security/lolbins-living-off-the-land">LOLBins・環境寄生型攻撃</Link> — 検知が難しい手口</li>
        <li><Link href="/learn/security/ipa-10-major-threats-2026">情報セキュリティ10大脅威 2026</Link> — 脅威の全体像を日本の文脈で</li>
      </ul>

      <h3>ドメイン 3：セキュリティアーキテクチャ（18%）</h3>
      <ul>
        <li><Link href="/learn/network/firewall-basics">ファイアウォールの基本</Link> / <Link href="/learn/network/vpn-basics">VPN の基礎</Link></li>
        <li><Link href="/learn/network/https-tls">HTTPS と TLS</Link> — 通信の保護</li>
        <li><Link href="/learn/network/cidr-notation">CIDR 表記</Link> — ネットワーク分割の前提（<Link href="/tools/cidr-calculator">CIDR Calculator</Link> で手を動かせます）</li>
        <li><Link href="/learn/security/http-security-headers">HTTPセキュリティヘッダー</Link>（<Link href="/tools/security-headers">Security Headers Analyzer</Link> で採点できます）</li>
      </ul>

      <h3>ドメイン 4：セキュリティ運用（28%・最重要）</h3>
      <ul>
        <li><Link href="/learn/security/incident-response-guide">インシデント対応手順</Link> — 検知から復旧までのフェーズ</li>
        <li><Link href="/learn/security/mitre-attack">MITRE ATT&amp;CK の読み方</Link> — 攻撃者の戦術・技術の体系</li>
        <li><Link href="/learn/security/infostealer-session-hijacking">インフォスティーラーとセッション乗っ取り</Link></li>
        <li><Link href="/learn/security/password-hashing">パスワードハッシュの選び方</Link>（<Link href="/tools/password-generator">Password Generator</Link> で強度の考え方を確認）</li>
      </ul>

      <h3>ドメイン 5：プログラム管理と監督（20%）</h3>
      <ul>
        <li><Link href="/learn/security/personal-data-breach-report">個人情報が漏えいしたときの報告義務</Link> — 日本の法令要件</li>
        <li><Link href="/learn/security/japan-security-incidents">国内の主要セキュリティインシデント事例</Link> — 第三者リスクの実例</li>
        <li><Link href="/learn/security/supply-chain-attacks">サプライチェーン攻撃</Link> — ベンダー管理の観点</li>
      </ul>
      <p>
        ドメイン 5 は<strong>試験では米国の規制（GDPR・PCI DSS 等）が前提</strong>になりますが、考え方は日本の制度にも共通します。実務で使うなら日本の要件と対応づけて理解しておくほうが役立ちます。
      </p>

      <h2>難易度：支援士・CISSP との位置関係</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>CompTIA Security+</th>
            <th>情報処理安全確保支援士</th>
            <th>CISSP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>位置づけ</td>
            <td>入門〜中級</td>
            <td>中級（国内の定番）</td>
            <td>上級（管理職・設計者）</td>
          </tr>
          <tr>
            <td>実務経験の要件</td>
            <td>不要（推奨はあり）</td>
            <td>不要</td>
            <td><strong>5 年必要</strong>（免除条件あり）</td>
          </tr>
          <tr>
            <td>試験形式</td>
            <td>選択＋PBQ・随時受験可</td>
            <td>午前・午後の記述式・年 2 回</td>
            <td>長時間の選択式</td>
          </tr>
          <tr>
            <td>強み</td>
            <td>国際的な通用性・受験しやすさ</td>
            <td>国内での認知度・法制度への適合</td>
            <td>グローバルでの評価の高さ</td>
          </tr>
        </tbody>
      </table>
      <p>
        国内で働くなら<strong>支援士のほうが認知度は高い</strong>のが実情です。一方 Security+ には、<strong>随時受験できる・実務経験が不要・出題範囲が実務の全体像に沿っている</strong>という利点があります。年 2 回の試験日程を待たずに学習の区切りを付けられるのは、働きながら学ぶ人にとって大きな違いです。
      </p>
      <p>
        資格全体の比較は{" "}
        <Link href="/learn/security/security-certification-guide">セキュリティ資格 比較・一覧</Link>{" "}
        に、それぞれの詳細は{" "}
        <Link href="/learn/security/sc-exam-guide">情報処理安全確保支援士の勉強方法</Link>{" "}
        と{" "}
        <Link href="/learn/security/cissp-guide">CISSP の難易度・勉強時間</Link>{" "}
        にまとめています。
      </p>

      <h2>学習ロードマップ（平日 30 分から）</h2>
      <p>
        まとまった時間が取れない前提で、区切りやすい進め方を示します。IT の基礎知識がある人で、<strong>合計 60〜100 時間程度</strong>が一つの目安です。
      </p>
      <ol>
        <li>
          <strong>第 1〜2 週：出題範囲の地図を作る</strong>
          <br />
          CompTIA 公式が配布する試験目標（Exam Objectives）の PDF に一度目を通し、<strong>知らない用語に印を付ける</strong>だけで構いません。ここで全体量を把握しておくと、以降の学習が迷子になりません。
        </li>
        <li>
          <strong>第 3〜6 週：ドメイン 4 と 2 から着手する</strong>
          <br />
          比率が高い運用（28%）と脅威（22%）で全体の半分を占めます。<strong>配点の大きいところから固める</strong>のが効率的です。
        </li>
        <li>
          <strong>第 7〜9 週：残るドメインと、手を動かす学習</strong>
          <br />
          アーキテクチャと概念は、読むだけだと定着しにくい領域です。サブネットを実際に計算する、セキュリティヘッダーを採点してみるなど、<strong>入力と出力を伴う学習</strong>に置き換えると記憶に残ります。
        </li>
        <li>
          <strong>第 10 週〜：模擬試験で時間配分を作る</strong>
          <br />
          90 分で最大 90 問という配分は、<strong>1 問あたり 1 分</strong>です。PBQ に時間を取られる前提で、選択問題を素早く処理する感覚を作っておきます。
        </li>
      </ol>
      <p>
        学習中に手を動かす道具として、本サイトのツールも使えます。<Link href="/tools/cidr-calculator">CIDR Calculator</Link>（サブネット計算）、<Link href="/tools/security-headers">Security Headers Analyzer</Link>（ヘッダーの採点）、<Link href="/tools/port-reference">Port Number Reference</Link>（ポート番号の確認）、<Link href="/tools/hash-generator">Hash Generator</Link>（ハッシュの体感）あたりは、出題範囲と直接重なります。すべてブラウザ内で完結し、入力内容はサーバーに送信されません。
      </p>

      <h2>取得後：3 年ごとの更新</h2>
      <p>
        Security+ は<strong>取りっぱなしにできない資格</strong>です。認定は 3 年間有効で、期限内に更新しないと失効します。
      </p>
      <ul>
        <li>3 年間で <strong>50 CEU（継続教育単位）</strong>を取得し、年会費を支払う</li>
        <li>CEU は、実務経験・研修受講・上位資格の取得・関連活動などで積み上げる</li>
        <li><strong>CertMaster CE</strong> という更新専用コースを修了すれば、50 CEU をまとめて満たせる</li>
        <li>上位資格（CySA+ など）を取得すると、Security+ も自動的に更新される</li>
        <li>期限を過ぎても <strong>90 日間の猶予期間</strong>が設けられている</li>
      </ul>
      <p>
        更新要件や費用は変更されることがあるため、実際の手続きの際は CompTIA の公式情報を確認してください。
      </p>

      <h2>受験時期の注意：バージョン移行が近い</h2>
      <p>
        CompTIA の試験は<strong>おおむね 3 年周期で改訂</strong>されます。現行の SY0-701 は 2023 年 11 月（日本語版は 2024 年 4 月）に始まったもので、CompTIA の日本語版ページでは<strong>提供終了が「通常、配信開始から 3 年（2027 年を予定）」</strong>と案内されています。
      </p>
      <p>
        次期バージョンの開始時期については、トレーニング事業者や講師コミュニティ発の観測が出ていますが、<strong>本記事執筆時点で CompTIA からの正式発表は確認できていません</strong>。ここは推測を書かず、公式のアナウンスを確認してください。
      </p>
      <p>
        実務上の判断としては、<strong>今から数ヶ月で受験するなら現行の SY0-701 で問題ありません</strong>。旧バージョンは新バージョン開始後もしばらく併存するのが通例で、取得した認定自体は 3 年間有効です。逆に、学習開始が半年以上先になりそうなら、その時点の最新バージョンを確認してから教材を買うほうが無駄がありません。<strong>教材を先に買い込まない</strong>のが、この手の資格での鉄則です。
      </p>

      <h2>実体験：ツールを作る過程が、そのまま出題範囲だった</h2>
      <p>
        本サイトのツールを作る中で、<strong>Security+ の出題範囲とほぼ同じ内容を、実装する側から通ってきた</strong>と感じています。たとえば <Link href="/tools/password-generator">Password Generator</Link> では、乱数を <code>Math.random()</code> ではなく <code>crypto.getRandomValues</code> で生成し、文字種を選んだときに特定の文字が出やすくならないよう rejection sampling で偏りを排除しました。これはドメイン 1 の暗号の基礎そのものです。
      </p>
      <p>
        <Link href="/tools/security-headers">Security Headers Analyzer</Link> を作ったときは、CSP や HSTS を採点する基準を決める必要があり、各ヘッダーが何を防ぐのかを整理し直しました。ドメイン 3 の内容ですが、<strong>「採点基準を自分で決める」という作業をすると、暗記とは違う定着の仕方をします</strong>。自サイトのヘッダー設定も、この過程で見直しています。
      </p>
      <p>
        資格の学習として振り返ると、効いたのは<strong>「読む」より「作る・試す」に寄せたこと</strong>でした。サブネットは計算機を作ってみると桁の意味が腹落ちしますし、ハッシュは実際に文字列を変えて出力の変化を見るほうが早いです。参考書だけで進めて手応えが薄いと感じたら、対象を一つ選んで手を動かしてみることをおすすめします。
      </p>

      <h2>参考にした一次情報</h2>
      <ul>
        <li>CompTIA 公式「Security+」— 試験コード・問題数・試験時間・合格点・出題ドメインと比率・対応言語</li>
        <li>CompTIA 公式（日本語）— 日本語試験の配信開始日（2024 年 4 月 23 日）・提供終了予定</li>
        <li>CompTIA 公式「Continuing Education / Certification Renewal Policy」— 3 年の有効期限・50 CEU・猶予期間</li>
      </ul>
      <p>
        試験の内容・料金・更新要件は改定されます。申し込み前に必ず CompTIA の公式情報で最新の内容をご確認ください。
      </p>

      <h2>おわりに</h2>
      <p>
        Security+ は、<strong>「セキュリティ全体を、実務で使える粒度で一周する」</strong>のに向いた資格です。国内での知名度では支援士に譲りますが、随時受験できて実務経験も要らないため、学習の区切りとして使いやすいという実用的な利点があります。
      </p>
      <p>
        そして日本語で受験できるようになった今、「英語だから」という理由で候補から外す必要はもうありません。上のドメイン別リンクから、気になる項目を 1 つ読むところから始めてみてください。
      </p>
    </ArticleLayout>
  );
}
