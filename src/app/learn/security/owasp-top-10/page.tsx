import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "owasp-top-10")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>OWASP Top 10 とは</h2>
      <p>
        <strong>OWASP（Open Worldwide Application Security Project）</strong>は Web アプリケーションセキュリティのオープンコミュニティで、ボランティアによって運営されています。彼らが数年に一度公開する <strong>Top 10</strong> は、世界中の脆弱性データを集計して「実務で本当に多発している Web リスクの上位10カテゴリ」を示したもので、<strong>事実上の業界標準</strong>として ISO 27001 や PCI DSS の参照資料にも組み込まれています。
      </p>
      <p>
        本記事では、最新版である <strong>OWASP Top 10 - 2021</strong> の10項目を初学者向けに俯瞰します（次版は2025〜2026年中に出る見込み）。各項目には「何が問題か」「典型例」「対策の要点」を1セクションずつ。
      </p>

      <h2>A01: Broken Access Control（アクセス制御の不備）</h2>
      <p>
        前回（2017）から1位に躍進した、<strong>現在最も多発しているカテゴリ</strong>です。「ログインしているユーザー X が、ユーザー Y のデータを閲覧/編集できてしまう」が典型。
      </p>
      <ul>
        <li>URL の <code>/users/123/profile</code> の <code>123</code> を <code>456</code> に変えると他人のページが見える（IDOR）</li>
        <li>管理画面 <code>/admin</code> がリンク無いだけで認証チェックされていない</li>
        <li>API で「自分のデータだけ返す」ロジックを忘れて全件返してしまう</li>
      </ul>
      <p>
        <strong>対策の要点</strong>: 「URL に出てる ID は信用しない」が鉄則。<strong>すべての操作で「セッション上のユーザーがそのリソースに権限を持つか」をサーバ側で必ず確認</strong>。デフォルト拒否、ホワイトリスト方式、ログ監査。
      </p>

      <h2>A02: Cryptographic Failures（暗号化の失敗）</h2>
      <p>
        2017 年版では「機密データの露出」だったカテゴリ。原因が「適切な暗号化が無い／弱い」に絞られ改名。
      </p>
      <ul>
        <li>ログインページが HTTP（盗聴可能）</li>
        <li>パスワードを <strong>MD5 や SHA-1 で生のハッシュ保存</strong>（GPU で即時総当たり）</li>
        <li>古い TLS 1.0 / 1.1 で運用</li>
        <li>独自暗号アルゴリズム（ほぼ確実に弱い）</li>
      </ul>
      <p>
        <strong>対策の要点</strong>: 通信は <strong>TLS 1.2 以上必須 + HSTS</strong>。パスワード保存は <strong>bcrypt / scrypt / Argon2</strong>。一般データ暗号化は <strong>AES-GCM</strong> 等の認証付き暗号。「自作するな、標準ライブラリを使え」。
      </p>
      <p className="text-sm">
        関連: <Link href="/learn/security/password-strength">パスワード強度はどう決まるか</Link> · <Link href="/learn/network/https-tls">HTTPS と TLS の仕組み</Link>
      </p>

      <h2>A03: Injection（インジェクション）</h2>
      <p>
        SQL インジェクション、コマンドインジェクション、LDAP インジェクション、そして <strong>XSS もこのカテゴリに統合</strong>されました。共通点は「ユーザー入力を、別の言語の構文として解釈する場所にそのまま流し込んだ」こと。
      </p>
      <ul>
        <li>SQLi: <code>{`"SELECT * FROM users WHERE id = " + req.query.id`}</code></li>
        <li>OS コマンド: <code>{`exec("ping " + req.query.host)`}</code></li>
        <li>XSS: <code>{`html = "<p>" + userInput + "</p>"`}</code></li>
      </ul>
      <p>
        <strong>対策の要点</strong>: <strong>パラメータ化クエリ（プリペアドステートメント）</strong>と<strong>出力時エスケープ</strong>。「文字列連結で組み立てない」が原則。ORM、テンプレートエンジンを通すこと。
      </p>
      <p className="text-sm">
        関連: <Link href="/learn/security/xss">XSS の基礎と防御</Link>
      </p>

      <h2>A04: Insecure Design（セキュアでない設計）</h2>
      <p>
        2021 年版で新設。コーディングミスではなく <strong>設計段階で抜けている脅威</strong>を扱います。
      </p>
      <ul>
        <li>パスワードリセットを「秘密の質問」だけで通す（Q&A は公開情報になりがち）</li>
        <li>レート制限なしで「年齢確認」だけで子供アカウント作成可</li>
        <li>無料試用を電話番号で識別 → SMS の使い捨て番号で無限取得可</li>
      </ul>
      <p>
        <strong>対策の要点</strong>: 設計レビューに <strong>脅威モデリング（STRIDE 等）</strong>を組み込む。ビジネス要件と一緒に「悪用シナリオ」も列挙する。実装前に「この機能を悪用されたら何が起きるか」を必ず議論。
      </p>

      <h2>A05: Security Misconfiguration（セキュリティ設定ミス）</h2>
      <p>
        コードは正しいのに、サーバ・フレームワーク・クラウドの設定で穴を開けてしまうカテゴリ。
      </p>
      <ul>
        <li>本番にデバッグモードが有効でスタックトレースが出ている</li>
        <li>S3 バケットがパブリック公開</li>
        <li>不要なサービス（管理ポート、デフォルト管理者アカウント）が開いたまま</li>
        <li>CSP / HSTS / X-Frame-Options 等のセキュリティヘッダ未設定</li>
      </ul>
      <p>
        <strong>対策の要点</strong>: <strong>「最小権限」「不要なものは無効化」</strong>。Infrastructure as Code（Terraform 等）で設定を版管理し、定期スキャンで逸脱検出。本サイト自身も securityheaders.com で A 評価を維持しています。
      </p>

      <h2>A06: Vulnerable and Outdated Components（古い・脆弱なコンポーネント）</h2>
      <p>
        Apache Struts の脆弱性で Equifax が 1.5 億人分の個人情報を流出させた事件が代表例。<strong>使っているライブラリ・OS・フレームワークが脆弱なまま</strong>放置されているケース。
      </p>
      <p>
        <strong>対策の要点</strong>: <strong>SBOM（依存リスト）の管理</strong>と<strong>自動アップデート</strong>。GitHub なら Dependabot、Node なら <code>npm audit</code>、Python なら <code>safety</code>、コンテナイメージは Trivy / Snyk でスキャン。本サイトも Dependabot + npm audit を CI に組み込み済みです。
      </p>

      <h2>A07: Identification and Authentication Failures（識別・認証の失敗）</h2>
      <p>
        旧「Broken Authentication」。ログイン・セッション管理周りの脆弱性全般。
      </p>
      <ul>
        <li>クレデンシャルスタッフィング（漏洩パスワード辞書での総当たり）に無防備</li>
        <li>セッション ID が予測可能 / URL に出ている</li>
        <li>パスワードリセットで脆弱なトークン</li>
        <li>多要素認証なし</li>
      </ul>
      <p>
        <strong>対策の要点</strong>: <strong>強いパスワードポリシー + 漏洩パスワードチェック（HIBP API）</strong>、<strong>レート制限・アカウントロック</strong>、<strong>TOTP / FIDO2 (Passkey) による MFA</strong>、セッション ID は cryptographically random。
      </p>

      <h2>A08: Software and Data Integrity Failures（整合性の検証不足）</h2>
      <p>
        2021 年版で新設。サプライチェーン攻撃と CI/CD パイプラインへの注目で追加されました。
      </p>
      <ul>
        <li>npm パッケージを署名検証なしで取得（依存パッケージ乗っ取りで RCE）</li>
        <li>CDN から JS を読み込むが <strong>SRI（Subresource Integrity）</strong>未設定で改ざん検出不可</li>
        <li>署名なしオートアップデート（SolarWinds 事件型）</li>
        <li>シリアライズデータの逆シリアライズで任意コード実行</li>
      </ul>
      <p>
        <strong>対策の要点</strong>: ライブラリは <strong>lockfile + ハッシュ検証</strong>、外部スクリプトは <strong>SRI</strong>、デプロイは<strong>署名済みアーティファクト</strong>。逆シリアライズは信頼できる入力のみ。
      </p>

      <h2>A09: Security Logging and Monitoring Failures（ロギング・監視の不足）</h2>
      <p>
        実際に侵害が起きても気付けない、調査できない問題。検知までの平均日数（MTTD）は業界平均で <strong>200 日以上</strong>と言われています。
      </p>
      <ul>
        <li>ログイン失敗・権限拒否・入力バリデーションエラーが記録されていない</li>
        <li>ログが平文で書かれパスワードまで含む</li>
        <li>アラートがそもそも設定されていない</li>
      </ul>
      <p>
        <strong>対策の要点</strong>: <strong>認証・権限・入力検証・サーバ側エラーは必ず記録</strong>。中央集約型のログ基盤（ELK / CloudWatch / Datadog）と異常検知。インシデント対応プレイブックを事前に用意。
      </p>

      <h2>A10: Server-Side Request Forgery（SSRF）</h2>
      <p>
        2021 年版で新設。「サーバ側で URL を取得しに行く機能」を悪用される攻撃。クラウド時代の代名詞的な脆弱性です。
      </p>
      <pre><code>{`// プレビュー機能で任意URLをfetch
const url = req.body.url
const html = await fetch(url).then(r => r.text())`}</code></pre>
      <p>
        攻撃者が <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code>（AWS インスタンスメタデータ）を渡すと、サーバは内部ネットワークから一時クレデンシャルを取得して返してしまいます（Capital One 事件型）。
      </p>
      <p>
        <strong>対策の要点</strong>: <strong>URL ホワイトリスト</strong>、<strong>内部ネットワーク・IMDS への接続を ファイアウォールで遮断</strong>、IMDSv2 強制、HTTP リダイレクト追跡しない / 追跡先も検証。
      </p>

      <h2>使い方: チェックリストとして</h2>
      <p>
        OWASP Top 10 は<strong>「これだけ守れば安全」というリストではない</strong>点に注意。あくまで「最頻出のカテゴリ」であって、業界・サービス特性によっては他のリスクが上回ることも普通にあります。とはいえ、新規プロジェクトの設計レビューや既存システムの自己診断には<strong>最良の出発点</strong>。
      </p>
      <p>
        実務での使い方の例：
      </p>
      <ol>
        <li>新機能の設計時、10項目をチェックリストで通す</li>
        <li>外部監査・ペネトレ依頼前のセルフチェック</li>
        <li>セキュリティ研修の構成テンプレ</li>
        <li>SOC 2 / ISO 27001 等のコンプライアンス文書の参照</li>
      </ol>

      <h2>おわりに</h2>
      <p>
        OWASP Top 10 はWebセキュリティの<strong>共通言語</strong>。エンジニア・PM・経営層が同じ用語で会話するために整備されているとも言えます。各項目を深掘りした記事は本サイトの Learn に順次追加していくので、関連記事リンクから掘り下げてみてください。
      </p>
      <p className="text-sm">
        参考: <a href="https://owasp.org/Top10/" target="_blank" rel="noopener noreferrer">OWASP Top 10 公式（owasp.org）</a>
      </p>
    </ArticleLayout>
  );
}
