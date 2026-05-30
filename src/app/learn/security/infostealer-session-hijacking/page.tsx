import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "infostealer-session-hijacking")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        多要素認証（MFA）を有効にしているのに、なぜアカウントが乗っ取られるのか——。その答えの多くは<strong>インフォスティーラー（情報窃取マルウェア）によるセッションCookieの窃取</strong>にあります。攻撃者はMFAを「突破」しているのではありません。<strong>すでに認証済みのセッションをまるごと盗んで、MFAを“迂回”している</strong>のです。
      </p>
      <p>
        被害規模は桁違いです。2024年だけで<strong>4.3百万台の端末から39億件の認証情報</strong>が窃取され、1回の感染あたり平均<strong>1,861個のCookie</strong>が抜かれたと報告されています。2025年には窃取ログ（スティーラーログ）の流通が<strong>前年比72%増の5,170万件</strong>に達しました。本記事は、この「パスワードもMFAも要らない」侵入が成立する仕組みと、最新の防御（ChromeのDBSCなど）を実務目線で整理します。
      </p>

      <h2>インフォスティーラーとは</h2>
      <p>
        インフォスティーラーは、感染した端末から認証情報を根こそぎ抜き取る情報窃取マルウェアです。2026年現在、<strong>LummaC2・StealC・RedLine・ACRStealer・Vidar</strong> といった系統が主流で、上位3種だけで感染の約75%を占めるとされます。多くは<strong>MaaS（Malware-as-a-Service）</strong>として月額250ドル前後で販売され、技術力の低い攻撃者でも使えます。
      </p>
      <p>動作はおそろしく速く、静かです。典型的にはこう動きます。</p>
      <ol>
        <li>端末で実行されると、<strong>30秒ほどで全ブラウザのセッションCookie・保存パスワード・オートフィル情報・暗号資産ウォレットを収集</strong>する。</li>
        <li>集めたデータ（スティーラーログ）を<strong>C2サーバへ送信</strong>する。</li>
        <li>痕跡を消すため<strong>自身を削除</strong>する。被害者は感染に気づかない。</li>
      </ol>
      <p>
        盗まれたログは<strong>Telegramやダークウェブのマーケットで売買</strong>され、別の攻撃者が侵入の足場として使います。個人端末の感染から企業侵害までの平均日数は、わずか<strong>7日</strong>と報告されています。
      </p>

      <h2>なぜMFAが効かないのか：pass-the-cookie</h2>
      <p>
        ここが本記事の核心です。Webサービスにログインすると、サーバは「この人は認証済み」という印として<strong>セッションCookie（セッショントークン）</strong>をブラウザに発行します。<a href="/learn/security/session-vs-jwt">セッション認証やトークン認証</a>の仕組みそのものです。以降のリクエストは、このCookieを提示するだけで通る——<strong>パスワードもMFAも再度問われません</strong>。
      </p>
      <p>
        インフォスティーラーが狙うのは、まさにこの<strong>「認証後のCookie」</strong>です。攻撃者は盗んだCookieを自分のブラウザに読み込ませる（Cookieエディタ等で注入する）だけで、<strong>本人としてログイン済みの画面にそのまま入れます</strong>。これを <strong>pass-the-cookie</strong>（セッションリプレイ）と呼びます。
      </p>
      <pre>
        <code>{`【正規のログイン】
  ユーザー → ID/PW + MFA(OTP/Passkey) → サーバ → セッションCookie発行
                                                   │
【pass-the-cookie】                                 ▼
  攻撃者 ── 盗んだCookieを注入 ──▶ サーバは「認証済み」と判断
        （IDもPWもMFAも不要。Cookieが“通行証”として機能）`}</code>
      </pre>
      <p>
        OTPやSMSはもちろん、<strong>多くの実装ではPasskeyすら無関係</strong>です。なぜなら認証はとっくに完了しており、攻撃者が手にしているのは「認証の結果」だからです。MFAは“ログインの瞬間”を守りますが、<strong>その後に発行されたCookieはMFAの保護範囲の外</strong>——ここが盲点です。
      </p>

      <h2>もう一つの経路：AitMフィッシング</h2>
      <p>
        Cookieを盗むのはマルウェアだけではありません。<strong>AitM（Adversary-in-the-Middle）フィッシング</strong>も同じ獲物を狙います。<strong>Evilginx・Tycoon 2FA・Mamba 2FA</strong> といったフィッシングキットは、本物のログイン画面をリバースプロキシで中継し、被害者が入力したID・パスワード・MFAコードを正規サーバへ転送。そして<strong>正規に発行されたセッションCookieを横取り</strong>します。
      </p>
      <p>
        被害者は本物そっくりの画面でログインに成功し、違和感がありません。しかし攻撃者の手元には有効なセッションCookieが残る——<strong>マルウェア感染が不要</strong>なぶん、こちらも広く使われています。入口は違っても、ゴールは同じ「認証済みセッションの奪取」です。
      </p>

      <h2>感染経路：ClickFixや偽ソフトから</h2>
      <p>
        インフォスティーラーは、近年急増した{" "}
        <a href="/learn/security/clickfix">ClickFix（偽CAPTCHAで自分でコマンドを実行させる手口）</a>{" "}
        の主要な配布物の一つです。ほかにも、<strong>海賊版・クラック版ソフト、偽のアップデート、不正広告（マルバタイジング）、ゲームのチート</strong>などが定番の入口です。
      </p>
      <p>
        重要なのは、<strong>感染するのは私物端末でも構わない</strong>という点。在宅勤務や BYOD で、私物PCのブラウザに業務SaaSのセッションが残っていれば、そこから企業侵害に直結します。「個人の問題」では済みません。
      </p>

      <h2>クラウドでの悪用：Cookie-Bite</h2>
      <p>
        この攻撃はクラウド環境でとくに厄介です。Varonis が報告した <strong>Cookie-Bite</strong> では、Microsoft Entra ID／Microsoft 365 のセッションCookie（ESTSAUTH 等）を盗んでリプレイし、<strong>MFAを回避したまま長期間クラウドにアクセスし続ける</strong>手口が示されました。SaaS全盛のいま、1枚のCookieが組織全体への通行証になり得ます。
      </p>

      <h2>図解案：MFAの「守備範囲」と盗まれるポイント</h2>
      <pre>
        <code>{`時間 ──────────────────────────────────────────▶
 [ログイン] ←MFAが守る区間→ [認証完了] ── 以降はCookieで通過 ──
                                  │
                                  ▼ ★インフォスティーラー/AitMが狙うのはココ
                            セッションCookie
                                  │ 窃取 → pass-the-cookie
                                  ▼
                         攻撃者が本人として侵入
                         （IDもPWもMFAも問われない）

要点：MFAは「入口の瞬間」だけを守る。発行後のCookieは別途守る必要がある。`}</code>
      </pre>

      <h2>防御策</h2>
      <h3>1. セッションを「端末に縛る」：DBSC とトークンバインディング</h3>
      <p>
        最も本質的な対策が、<strong>Cookieを盗んでも他の端末では使えなくする</strong>ことです。Google は2026年4月、Chrome 146（Windows）で <strong>DBSC（Device Bound Session Credentials）</strong> を一般提供しました。DBSCは<strong>TPM などハードウェアに紐づく鍵でセッションを端末に暗号学的にバインド</strong>し、Cookieが流出しても<strong>別端末では無効</strong>にします。「盗まれてから検知する」発想から「盗まれても使えない」発想への転換です。
      </p>
      <p>
        ただし万能ではありません。<strong>攻撃者が感染端末そのもの上で操作する場合</strong>や、<strong>サイト側がDBSCに対応していない</strong>場合は守れません。サーバ・ブラウザ双方の実装が広がるまでは過渡期が続きます。
      </p>
      <h3>2. ログインを強くする：FIDO2/Passkey</h3>
      <p>
        AitMフィッシングに対しては、<a href="/learn/security/mfa-totp-fido2">フィッシング耐性のある FIDO2/Passkey</a>が有効です。Passkeyはオリジンに束縛されるため、中継プロキシ経由ではそもそも認証が成立しません。ただし前述のとおり、<strong>認証後のCookie窃取（pass-the-cookie）まで防ぐにはトークンバインディング/DBSCの併用が必要</strong>です。
      </p>
      <h3>3. セッションの寿命と再認証</h3>
      <ul>
        <li><strong>セッションを短命にし、重要操作では再認証</strong>（step-up認証）を求める。盗まれたCookieの有効時間を縮める。</li>
        <li><strong>条件付きアクセス</strong>：管理対象端末・コンプライアンス準拠端末からのみアクセスを許可し、未知の端末を弾く。</li>
        <li>侵害が疑われたら<strong>全セッションを即時失効（サインアウト・トークン無効化）</strong>。パスワード変更だけでは生きているCookieは切れない。</li>
      </ul>
      <h3>4. 異常検知と端末防御</h3>
      <ul>
        <li><strong>セッション異常の監視</strong>：不可能な移動（impossible travel）、見慣れないUser-Agent・IP・デバイスフィンガープリントの変化を検知してセッションを止める。</li>
        <li><strong>EDRと配布元対策</strong>：海賊版ソフト・不正広告・ClickFixを入口で断つ。私物端末（BYOD）にも最低限の保護と、業務アクセスの分離を。</li>
        <li><strong>スティーラーログの監視</strong>：自組織のドメイン・従業員の認証情報がダークウェブ／Telegramに出回っていないかを監視し、出たら即リセット。</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        インフォスティーラーとAitMフィッシングは、<strong>「MFAを突破する」のではなく「MFAの後にできるCookieをかすめ取る」</strong>ことで認証を迂回します。だからこそ、MFAを入れただけで安心するのは危険です。守りの軸は3つ——<strong>セッションを端末に縛る（DBSC/トークンバインディング）、ログインをフィッシング耐性化する（FIDO2/Passkey）、寿命を短くして異常を検知し即失効する</strong>。
      </p>
      <p>
        入口を断つ観点では{" "}
        <a href="/learn/security/clickfix">ClickFix</a>{" "}
        や{" "}
        <a href="/learn/security/ai-browser-prompt-injection">AIブラウザの乗っ取り</a>{" "}
        も同じ「認証情報・セッション窃取」に行き着きます。認証方式そのものの比較は{" "}
        <a href="/learn/security/mfa-totp-fido2">MFA・TOTP・FIDO2・Passkeyの違い</a>{" "}
        、セッション設計は{" "}
        <a href="/learn/security/session-vs-jwt">セッション認証とJWT認証の違い</a>{" "}
        も合わせてご覧ください。
      </p>
      <p>
        ※ 本記事の統計値・マルウェア名・手法は、各セキュリティベンダーの公表内容および報道に基づきます。攻撃・防御とも変化が速いため、対策時は最新の公式情報をご確認ください。
      </p>
    </ArticleLayout>
  );
}
