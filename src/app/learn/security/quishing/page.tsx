import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "quishing")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Quishing（クイッシング）</strong>は、<strong>QR Code</strong> と <strong>Phishing</strong> を組み合わせた造語で、<strong>悪意あるURLをQRコードの画像に隠すフィッシング</strong>です。メール本文にリンクを貼る代わりにQR画像を載せ、「スマホで読み取ってください」と誘導する——たったこれだけの工夫が、企業のメール防御に大きな穴を開けています。
      </p>
      <p>
        Microsoft の脅威インテリジェンスによると、Quishing は<strong>2026年第1四半期に最も急成長したメール攻撃</strong>でした。攻撃量は1月の760万件から3月の1,870万件へと、<strong>四半期で146%増加</strong>。2025年だけで約5倍に伸び、全フィッシングの<strong>12%にQRコードが含まれ</strong>、その<strong>68%がモバイル利用者を標的</strong>にしていました。本記事は、なぜQRコードがこれほど有効なのか、最新の回避テクニック、実際の攻撃事例、そして本当に効く対策を整理します。
      </p>

      <h2>なぜQRコードはフィッシングに有効なのか</h2>
      <p>
        Quishing が厄介なのは、<strong>従来のフィッシング対策が前提にしている「リンクをテキストとして検査する」仕組みをすり抜ける</strong>点にあります。理由は大きく3つです。
      </p>
      <ul>
        <li>
          <strong>URLが画像の中に隠れる</strong>：メールのセキュリティゲートウェイの多くはテキストのリンクを解析して評価しますが、<strong>QRは画像</strong>です。中のURLをデコードしなければ判定できず、画像を解析しない製品は<strong>素通り</strong>させてしまいます。
        </li>
        <li>
          <strong>管理されたPCから、管理外のスマホへ誘導される</strong>：QRを読むのは個人のスマートフォン。すると<strong>EDR、Webプロキシ、社内DNSフィルタといった企業の防御をすべて飛び越え</strong>、保護のない端末で悪性サイトを開いてしまいます。
        </li>
        <li>
          <strong>利用者が行き先を確認しない</strong>：ある調査では<strong>73%の人がQRの遷移先を確認せずにスキャン</strong>していました。コードを見ても人間にはURLが読めないため、警戒が働きません。
        </li>
      </ul>

      <h2>典型的な攻撃シナリオ</h2>
      <p>
        ビジネスを狙う Quishing は、もっともらしい業務メールを装います。代表的なパターンはこうです。
      </p>
      <ol>
        <li>「<strong>多要素認証の再設定が必要です</strong>」「<strong>給与明細を確認してください</strong>」「<strong>共有ドキュメントが届きました</strong>」といった件名のメールが届く。</li>
        <li>本文にはMicrosoftやDocuSign風のロゴと<strong>QRコード</strong>。「社内ポリシーによりスマホでの認証が必要」などと、スキャンを正当化する文面が添えられる。</li>
        <li>QRを読むと、本物そっくりのMicrosoft 365ログイン画面（実は<strong>AitMフィッシングサイト</strong>）に飛ぶ。</li>
        <li>利用者がID・パスワード・MFAコードを入力すると、<strong>背後のプロキシが正規サーバへ中継し、発行されたセッションCookieを横取り</strong>する。</li>
      </ol>
      <p>
        最後の段が重要です。最近の Quishing は単なる認証情報窃取に留まらず、<strong>AitM（Adversary-in-the-Middle）でセッショントークンを盗み、MFAを回避</strong>します。これは{" "}
        <a href="/learn/security/infostealer-session-hijacking">セッションCookie窃取（pass-the-cookie）</a>{" "}
        と同じゴールで、QRはその「入口」を担うわけです。
      </p>
      <p>
        物理世界の Quishing も増えています。<strong>駐車場の料金機・飲食店メニュー・ポスターに偽QRシールを上から貼る</strong>手口で、決済情報やログイン情報を盗みます。「貼り紙のQR」も無条件には信用できません。
      </p>

      <h2>進化する検知回避テクニック</h2>
      <p>
        メール製品がQR画像をデコードして検査し始めると、攻撃者はすぐに回避策を編み出しました。2026年に観測されている主な手口です。
      </p>
      <ul>
        <li>
          <strong>ロゴ埋め込みの「装飾QR」</strong>：ブランドロゴやカラー、独自のモジュール形状を混ぜ込む。読み取りは可能なまま、検知ツールのパターン認識を狂わせる。
        </li>
        <li>
          <strong>ASCIIアート／Unicode QR</strong>：画像ではなく<strong>文字の組み合わせでQRを描く</strong>。「画像添付だけをスキャンする」フィルタを根本から回避する。
        </li>
        <li>
          <strong>PDF添付に同梱</strong>：メール本体にはリンクもQRも置かず、<strong>添付PDFの中にQRを入れて「スマホで読んで」</strong>と誘導。検査の階層を一段増やす。
        </li>
        <li>
          <strong>分割・入れ子QR、マルチパートMIME悪用、Blob URI</strong>：ペイロードを複数の画像要素に<strong>断片化</strong>して、単純な画像解析では1枚の悪性QRと認識させない。
        </li>
        <li>
          <strong>AIによる量産</strong>：本物そっくりのフィッシングページを瞬時に生成し、標的ごとに文面を最適化。検知をかいくぐりながら大量配信する。
        </li>
      </ul>

      <h2>実際の攻撃事例：北朝鮮 Kimsuky</h2>
      <p>
        Quishing は金銭目的の犯罪者だけでなく、<strong>国家支援型の攻撃者</strong>も使います。2026年1月、FBIはフラッシュアラートを発出し、<strong>北朝鮮系の攻撃グループ Kimsuky</strong> が、<strong>シンクタンク・学術機関・米政府機関</strong>を狙うスピアフィッシングメールにQRコードを埋め込んでいたと警告しました。これらの攻撃は一貫して、<strong>AitMプロキシによるセッショントークン窃取とMFA回避</strong>で締めくくられていたとされます。標的型の世界でも、QRは有力な初期侵入手段になっています。
      </p>

      <h2>図解案：Quishingが防御をすり抜ける経路</h2>
      <pre>
        <code>{`[攻撃メール] 本文にQR画像（URLは画像内に隠蔽）
      │  ← テキスト型メールフィルタは中身を読めず素通り
      ▼
[管理されたPC] でメールを閲覧
      │  「スマホで読み取ってください」
      ▼
[個人のスマホ] でQRをスキャン  ← EDR/プロキシ/社内DNSの“外側”
      │
      ▼
[AitMフィッシングサイト] 本物そっくりのログイン
      │  ID/PW/MFAを中継 → セッションCookieを横取り
      ▼
[アカウント乗っ取り] MFA有効でも侵入成立

要点：検査の“盲点（画像）”と防御の“境界外（個人スマホ）”を同時に突く`}</code>
      </pre>

      <h2>対策</h2>
      <h3>1. 認証をフィッシング耐性化する（最も効く）</h3>
      <p>
        どれだけ巧妙なQuishingでも、<strong>Passkey／FIDO2セキュリティキー</strong>なら認証そのものが成立しません。Passkeyは正規オリジンに束縛されるため、AitMプロキシ経由のログインでは鍵が反応しないのです。Quishing対策の本命は技術であり、<a href="/learn/security/mfa-totp-fido2">フィッシング耐性のある認証への移行</a>が最優先です。OTP・SMSベースのMFAは<strong>AitMで回避され得る</strong>点に注意してください。
      </p>
      <h3>2. 画像・QRを解析できるメールセキュリティ</h3>
      <ul>
        <li>添付画像・PDF内のQRを<strong>デコードしてURLを評価</strong>できる製品を選ぶ。テキストリンクだけの検査では不十分。</li>
        <li>装飾QRやASCIIアートQRにも対応できるか、回避耐性を確認する。</li>
      </ul>
      <h3>3. セッション窃取を前提にした多層防御</h3>
      <ul>
        <li><strong>条件付きアクセス</strong>：管理対象端末からのみ業務アカウントにアクセス許可。個人スマホからの認証を制限する。</li>
        <li><strong>セッションを短命に・異常検知で即失効</strong>。盗まれたトークンの有効時間を縮める（{" "}
          <a href="/learn/security/infostealer-session-hijacking">セッション窃取対策</a>{" "}
          と共通）。
        </li>
      </ul>
      <h3>4. 利用者教育</h3>
      <ul>
        <li><strong>「メールやチャットのQRで認証・ログインを求められたら疑う」</strong>を周知。正規のMFA設定は通常QRスキャンを強要しない。</li>
        <li>スキャン前に<strong>遷移先URLのプレビューを確認</strong>する習慣（多くのスマホカメラはURLを一旦表示する）。</li>
        <li>物理QR（貼り紙・店頭）も、<strong>シールの上貼りがないか</strong>確認する。</li>
        <li>QRを自分で作る・読む仕組みを理解しておくと判断が速い（{" "}
          <a href="/tools/qr-code">QR Code ジェネレーター</a>{" "}
          でQRの中身がURLそのものであることを体感できます）。
        </li>
      </ul>

      <h2>まとめ</h2>
      <p>
        Quishing が急増しているのは、<strong>「画像という検査の盲点」と「個人スマホという防御の境界外」を同時に突ける</strong>からです。そしてゴールは多くの場合、AitMによる<strong>セッション窃取とMFA回避</strong>。つまり Quishing は{" "}
        <a href="/learn/security/clickfix">ClickFix</a>{" "}
        や{" "}
        <a href="/learn/security/infostealer-session-hijacking">インフォスティーラー</a>{" "}
        と同じ「認証済みセッションの奪取」へ至る入口の一つです。
      </p>
      <p>
        守りの結論はシンプルです——<strong>Passkey/FIDO2でログインそのものをフィッシング耐性化し、画像対応のメール検査と条件付きアクセスで多層化する</strong>。教育は不可欠ですが、73%がURLを確認せずスキャンする以上、<strong>技術的な防御を主役</strong>に据えるのが現実解です。認証方式の比較は{" "}
        <a href="/learn/security/mfa-totp-fido2">MFA・TOTP・FIDO2・Passkeyの違い</a>{" "}
        も合わせてご覧ください。
      </p>
      <p>
        ※ 本記事の統計値・事例・手法は、Microsoft／FBI／各セキュリティベンダーの公表内容および報道に基づきます。攻撃手法は変化が速いため、対策時は最新の公式情報をご確認ください。
      </p>
    </ArticleLayout>
  );
}
