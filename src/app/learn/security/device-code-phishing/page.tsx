import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "device-code-phishing")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>デバイスコードフィッシング</strong>は、<strong>正規のMicrosoftログイン画面</strong>を使うフィッシングです。偽サイトもAitMプロキシも要りません。被害者は本物の <code>microsoft.com/devicelogin</code> でログインし、<strong>自分の手でMFAを完了させる</strong>——にもかかわらず、発行されたトークンは攻撃者の手に渡ります。多要素認証は、この攻撃に対してほとんど無力です。
      </p>
      <p>
        Microsoft が <strong>Storm-2372</strong> と名付けたロシア系の攻撃グループは、この手口で政府・NGO・各種業界を狙ってきました。2026年初頭にかけて攻撃は<strong>37倍に急増</strong>し、PhaaS（Phishing-as-a-Service）プラットフォーム <strong>EvilTokens</strong> の登場で「誰でも使える攻撃」へと商品化。<strong>5か国340以上のMicrosoft 365組織</strong>が標的になったと報告されています。本記事は、なぜMFAが効かないのか、その仕組みと対策を整理します。
      </p>

      <h2>そもそもデバイスコードフローとは</h2>
      <p>
        デバイスコードフロー（OAuth 2.0 Device Authorization Grant, RFC 8628）は、<strong>キーボードのない・入力しづらい機器</strong>のための正規の認証方式です。スマートTV、CLIツール、IoT機器などが対象で、流れはこうです。
      </p>
      <ol>
        <li>機器が認証サーバに要求し、<strong>短いコード（例: ABCD-EFGH）と認証用URL</strong>を受け取る。</li>
        <li>利用者は<strong>別の端末（スマホやPC）でそのURLを開き、コードを入力</strong>してログイン・MFAを済ませる。</li>
        <li>その間、機器はサーバを<strong>ポーリング</strong>し続け、認証が完了すると<strong>アクセストークンとリフレッシュトークン</strong>を受け取る。</li>
      </ol>
      <p>
        仕組み自体は{" "}
        <a href="/learn/security/oauth-oidc">OAuth / OpenID Connect</a>{" "}
        の正規仕様です。問題は、<strong>「コードを入力する人」と「トークンを受け取る機器」が別物でよい</strong>という設計を、攻撃者が悪用できる点にあります。
      </p>

      <h2>攻撃の仕組み：なぜMFAが効かないのか</h2>
      <p>攻撃者は、この正規フローに<strong>自分が「機器」として割り込みます</strong>。</p>
      <ol>
        <li><strong>攻撃者</strong>が、標的のテナント向けにデバイスコードフローを開始し、<strong>有効なコードを取得</strong>する（コードの寿命は通常15分程度）。</li>
        <li>そのコードを、<strong>フィッシングのエサ</strong>として被害者に送る。「Teams会議に参加するにはこのコードを入力してください」「共有ファイルを開くには認証が必要です」など、ITサポートや同僚を装う。</li>
        <li><strong>被害者は本物のMicrosoftのURL</strong>を開き、コードを入力し、<strong>自分でID・パスワード・MFAを完了</strong>する。画面は正規なので違和感がない。</li>
        <li>認証が成立した瞬間、<strong>ポーリングしていた攻撃者のもとにアクセストークンとリフレッシュトークンが届く</strong>。攻撃者は本人として侵入する。</li>
      </ol>
      <p>
        ここが核心です。<strong>MFAのチャレンジは、攻撃者の代わりに被害者本人がクリアしている</strong>——だからOTPもSMSも、多くの場合 Passkey すら障害になりません。さらに、得られた<strong>リフレッシュトークンはパスワードをリセットしても生き残る</strong>ため、対応が後手に回りやすいのも厄介な点です。
      </p>

      <h2>図解案：正規フローと攻撃の違い</h2>
      <pre>
        <code>{`【正規】
  自分の機器 →コード発行→ 自分がURLでコード入力＋MFA → 自分の機器にトークン

【攻撃（デバイスコードフィッシング）】
  攻撃者の端末 →コード発行→ ┐
                            │ コードをフィッシングで送付
                            ▼
        被害者が本物のMS画面でコード入力＋MFA（本人が完了）
                            │ 認証成立
                            ▼
        ★攻撃者の端末にトークンが届く（IDもPWもMFAも本人が通した）

要点：偽サイト不要。本物の認証画面のまま、トークンの“受け取り先”だけが攻撃者`}</code>
      </pre>

      <h2>Storm-2372 の進化：デバイス登録から PRT へ</h2>
      <p>
        Storm-2372 は単なるトークン窃取に留まりませんでした。<strong>Microsoft Authentication Broker のクライアントID</strong>を悪用してリフレッシュトークンを取得し、<strong>攻撃者が管理するデバイスを Entra ID に登録</strong>。これにより <strong>Primary Refresh Token（PRT）</strong> を得て、組織リソースへの<strong>深く永続的なアクセス</strong>を確立しました。
      </p>
      <p>
        2026年4月には Microsoft が<strong>AIを使って自動化・大規模化されたデバイスコードフィッシング</strong>キャンペーンを報告しています。文面生成からコード配布、トークン回収までが自動化され、攻撃の規模とスピードが一段上がりました。前述の <strong>EvilTokens</strong> のようなPhaaSが、この敷居をさらに下げています。
      </p>

      <h2>対策</h2>
      <h3>1. デバイスコードフローを「止める」（最優先）</h3>
      <p>
        最も効くのは、<strong>使っていないなら、そもそもフローを無効化する</strong>ことです。Microsoft は、<strong>過去25日間デバイスコードフローを使っていないテナントにはブロックを推奨</strong>しています。<strong>条件付きアクセス（Conditional Access）</strong>の「認証フロー」条件で <strong>Device Code Flow をブロック</strong>するポリシーを作成し、まず<strong>レポート専用モード</strong>で正規利用を洗い出してから本適用します。スマートTVやCLIなど正規の用途がある場合は、<strong>特定ユーザー・信頼できる場所に限定</strong>して許可します。
      </p>
      <h3>2. 検知と監視</h3>
      <ul>
        <li><strong>Entra IDサインインログ</strong>を「認証プロトコル＝Device Code」で絞り込み、過去90日分の利用を棚卸しする。正規利用がほぼ無いはずなら、出現自体が異常シグナル。</li>
        <li><strong>デバイスコード認証の直後48時間以内の新規デバイス登録</strong>を要警戒イベントとして検知。<code>Dsreg/10.0</code> や <code>DeviceRegistrationClient</code> といったUser-Agentは自動登録ツールの痕跡。</li>
        <li><strong>Entra ID Protection</strong> の異常なデバイスコード認証アラート、<strong>Defender for Office 365</strong> の配信前ブロックを活用する。</li>
      </ul>
      <h3>3. 侵害時の封じ込め</h3>
      <ul>
        <li>パスワードリセットだけでは不十分。<strong>リフレッシュトークンを失効（revoke sign-in sessions）</strong>させ、生きているトークンを無効化する（{" "}
          <a href="/learn/security/infostealer-session-hijacking">トークン窃取への対応</a>{" "}
          と同じ考え方）。
        </li>
        <li>不審に登録されたデバイスを Entra ID から<strong>削除</strong>し、PRTを失効させる。</li>
        <li><strong>継続的アクセス評価（CAE）</strong>やトークン保護で、失効が即時に効くようにする。</li>
      </ul>
      <h3>4. 利用者教育</h3>
      <p>
        合言葉はシンプルです——<strong>「人から送られてきたコードを認証画面に入力しない」</strong>。正規のデバイスコードは、<strong>自分が、自分の機器で開始したとき</strong>にだけ入力するものです。メールやチャットで「このコードを入れて」と促されたら、それは攻撃を疑うべきサインです。
      </p>

      <h2>まとめ</h2>
      <p>
        デバイスコードフィッシングは、<strong>正規の認証フローと本物のログイン画面を使う</strong>ため、偽サイトを見破る訓練やMFAだけでは防げません。被害者本人がMFAを通してしまう以上、守りの主役は<strong>「条件付きアクセスでフローを止める」「異常なデバイスコード認証と新規デバイス登録を検知する」「侵害時はトークンとデバイスごと失効させる」</strong>という設定・運用側にあります。
      </p>
      <p>
        この攻撃は{" "}
        <a href="/learn/security/quishing">Quishing</a>{" "}
        や{" "}
        <a href="/learn/security/infostealer-session-hijacking">インフォスティーラー</a>{" "}
        と同じく、最終ゴールは<strong>「認証済みトークンの奪取＝MFA回避」</strong>です。フローの土台は{" "}
        <a href="/learn/security/oauth-oidc">OAuth / OIDC</a>、認証方式の比較は{" "}
        <a href="/learn/security/mfa-totp-fido2">MFA・FIDO2・Passkeyの違い</a>{" "}
        も合わせてご覧ください。
      </p>
      <p>
        ※ 本記事の攻撃者名・統計値・推奨設定は、Microsoft／Okta／各セキュリティベンダーの公表内容および報道に基づきます。製品仕様や推奨は更新されるため、設定時は最新の公式ドキュメントをご確認ください。
      </p>
    </ArticleLayout>
  );
}
