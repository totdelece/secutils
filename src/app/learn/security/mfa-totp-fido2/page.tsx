import Link from "next/link";
import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "mfa-totp-fido2")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>「2段階認証」で何が変わるのか</h2>
      <p>
        パスワードは漏れます。フィッシングで、データ侵害で、使い回しで、あらゆる経路で漏れます。仮に <Link href="/learn/security/password-strength">エントロピーの高いパスワード</Link> を使っていても、サービス側が <Link href="/learn/security/password-hashing">ハッシュ保存をサボっていた</Link>瞬間にあなたのパスワードは攻撃者の手元に渡ります。
      </p>
      <p>
        この前提に立つと、<strong>「パスワードだけで守る」モデルはもう破綻している</strong>。だから現代の認証は、パスワードに加えて<strong>別の要素</strong>で確認する <strong>MFA（Multi-Factor Authentication, 多要素認証）</strong>が標準になりつつあります。
      </p>

      <h2>3つの「要素」</h2>
      <p>
        MFA の「Multi-Factor」は<strong>性質の異なる要素を組み合わせる</strong>という意味です。同じ性質を2つ重ねても本当の意味では多要素になりません：
      </p>
      <table>
        <thead>
          <tr>
            <th>要素</th>
            <th>意味</th>
            <th>例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>知識（Something you know）</td>
            <td>本人だけが知っているもの</td>
            <td>パスワード、PIN、秘密の質問</td>
          </tr>
          <tr>
            <td>所有（Something you have）</td>
            <td>本人だけが持っているもの</td>
            <td>スマホ、ハードウェアトークン、IC カード</td>
          </tr>
          <tr>
            <td>生体（Something you are）</td>
            <td>本人の生体的特徴</td>
            <td>指紋、顔、声紋、虹彩</td>
          </tr>
        </tbody>
      </table>
      <p>
        「パスワード + 秘密の質問」は両方とも知識要素なので、MFA とは呼びません。「パスワード + スマホへの SMS」は知識 + 所有なので MFA。「パスワード + 指紋」は知識 + 生体で MFA。
      </p>

      <h2>方式1: SMS / 音声通話による OTP</h2>
      <p>
        最も普及しているが、<strong>セキュリティ的にはおすすめしない</strong>方式。日本の銀行・通販サイトで未だに主流ですが、米 NIST は 2016 年から非推奨化しています。
      </p>
      <p>
        弱点：
      </p>
      <ul>
        <li>
          <strong>SIM スワップ詐欺</strong>: 通信キャリアに身分を偽って SIM を再発行させ、SMS を奪う。実際にイーロン・マスクや暗号資産取引所幹部などが被害に遭っています
        </li>
        <li>
          <strong>SS7 プロトコル攻撃</strong>: 携帯網のシグナリングプロトコルの脆弱性で、SMS が傍受される
        </li>
        <li>
          <strong>フィッシング耐性ゼロ</strong>: 偽サイトで6桁のコードを入力させれば即時に攻撃成立
        </li>
      </ul>
      <p>
        とはいえ「パスワードだけ」より遥かに安全なので、選択肢が SMS しかないなら有効化すべき。<strong>SMS が選べる時は TOTP も選べる場合が多い</strong>ので、その時は TOTP を選びましょう。
      </p>

      <h2>方式2: TOTP（Google Authenticator系）</h2>
      <p>
        スマホアプリ（Google Authenticator / Authy / 1Password）が30秒ごとに6桁の数字を生成する方式。<strong>RFC 6238</strong> で標準化されており、各社互換。
      </p>
      <p>
        仕組みはシンプル：
      </p>
      <ol>
        <li>登録時にサーバが <strong>共有秘密鍵（Base32 文字列）</strong> を発行し、QR コードでアプリに渡す</li>
        <li>アプリはその秘密鍵と<strong>現在時刻（30秒単位に丸めた値）</strong>を HMAC-SHA1 して6桁の数字を作る</li>
        <li>サーバ側も同じ計算をして照合</li>
      </ol>
      <pre><code>{`TOTP = HMAC-SHA1(secret, floor(unix_time / 30))[truncated to 6 digits]`}</code></pre>
      <p>
        サーバ・アプリ間の通信は最初の登録時のみ。日常的な認証ではネットワーク不要。<strong>SMS と違って「時計が合っていれば動く」</strong>のが利点。
      </p>
      <p>
        SMS 比の改善点：
      </p>
      <ul>
        <li>SIM スワップで奪われない（秘密鍵はスマホ内）</li>
        <li>通信キャリアの脆弱性を経由しない</li>
        <li>サービス側の追加コストゼロ（SMS 送信費用がかからない）</li>
      </ul>
      <p>
        弱点：
      </p>
      <ul>
        <li>
          <strong>フィッシング耐性は低い</strong>: 偽サイトで6桁を入力させれば突破される。SMS 同様に Real-time Phishing Proxy（攻撃者がリレー）に弱い
        </li>
        <li>
          <strong>スマホを失くすと終わる</strong>: バックアップコードをサービスごとに保管する必要あり
        </li>
        <li>
          <strong>共有秘密鍵がサーバ侵害で漏洩する</strong>: サーバ側に平文または可逆暗号で保管されるため、DB 漏洩で TOTP 偽造可能になる
        </li>
      </ul>

      <h2>方式3: FIDO2 / WebAuthn / Passkey</h2>
      <p>
        2010年代後半に標準化された<strong>公開鍵暗号ベース</strong>の認証。「パスワードレス」「Passkey」と呼ばれているのはこの方式の一部です。用語が混乱しやすいので整理：
      </p>
      <table>
        <thead>
          <tr>
            <th>用語</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>FIDO2</strong></td>
            <td>FIDO Alliance による認証規格群の総称</td>
          </tr>
          <tr>
            <td><strong>WebAuthn</strong></td>
            <td>FIDO2 のうち、ブラウザから使う W3C 標準 API</td>
          </tr>
          <tr>
            <td><strong>CTAP2</strong></td>
            <td>FIDO2 のうち、ブラウザ⇔認証器（YubiKey 等）の通信プロトコル</td>
          </tr>
          <tr>
            <td><strong>Passkey</strong></td>
            <td>2022年 Apple/Google/MS が打ち出したマーケティング用語。中身は WebAuthn を一般ユーザーに分かりやすく見せたもの</td>
          </tr>
        </tbody>
      </table>
      <p>
        仕組みは公開鍵暗号：
      </p>
      <ol>
        <li>登録時、ブラウザ/OS が<strong>そのサイト専用の鍵ペア</strong>を生成する</li>
        <li><strong>秘密鍵はスマホ/PC/YubiKey に保管</strong>、公開鍵はサーバに送信</li>
        <li>ログイン時、サーバが乱数チャレンジを送る</li>
        <li>認証器が指紋認証 or PIN で本人確認した上で、秘密鍵でチャレンジに署名</li>
        <li>サーバは公開鍵で検証</li>
      </ol>
      <p>
        TOTP / SMS との決定的な違い：
      </p>
      <ul>
        <li>
          <strong>フィッシング耐性がある</strong>: 鍵ペアが「ドメインに紐付く」ため、偽サイトでは認証器が反応しない（origin check）
        </li>
        <li>
          <strong>サーバ漏洩しても安全</strong>: サーバには公開鍵しかなく、漏れても攻撃に使えない
        </li>
        <li>
          <strong>パスワードレス化が可能</strong>: パスワードと組み合わせる必要がなく、認証器単独で認証完結できる
        </li>
        <li>
          <strong>共有秘密鍵が存在しない</strong>: 各サイトごとに独立した鍵ペアなので、1サイトの漏洩が他に波及しない
        </li>
      </ul>

      <h3>Passkey が「Passkey」と呼ばれる理由</h3>
      <p>
        従来の WebAuthn では、秘密鍵は「特定のデバイスから出ない」のが原則でした（YubiKey が代表例）。これだと「スマホ買い替えで全サービスから締め出される」事故が起きるため、<strong>2022年から iCloud / Google Password Manager / 1Password 等で同期できる Passkey</strong> が登場しました。
      </p>
      <p>
        現代の Passkey の挙動：
      </p>
      <ul>
        <li>iPhone で作った Passkey が iCloud Keychain 経由で Mac/iPad に同期</li>
        <li>Android で作った Passkey が Google アカウント経由で他 Android に同期</li>
        <li>同期に対応していない YubiKey などの「Device-bound Passkey」も併存</li>
      </ul>
      <p>
        ユーザー体験的には<strong>「指紋 or 顔認証だけでログイン完了」</strong>。パスワード入力もコード入力も不要。これが「パスワードレス」と呼ばれる所以です。
      </p>

      <h2>実用的な使い分けガイド</h2>
      <table>
        <thead>
          <tr>
            <th>シーン</th>
            <th>推奨</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>銀行・暗号資産・メインメール</td>
            <td><strong>Passkey + ハードウェアキー</strong>（Passkey は便利、ハードキーは復旧用）</td>
          </tr>
          <tr>
            <td>SaaS / 開発ツール（GitHub 等）</td>
            <td><strong>Passkey or TOTP</strong></td>
          </tr>
          <tr>
            <td>SMS しか選べないサービス</td>
            <td><strong>SMS でも有効化</strong>（無いよりずっとマシ）</td>
          </tr>
          <tr>
            <td>会社の業務システム</td>
            <td><strong>SAML/OIDC + IdP 側で MFA 強制</strong>（Okta / Azure AD / Google Workspace）</td>
          </tr>
        </tbody>
      </table>

      <h2>復旧手段（Recovery）の話</h2>
      <p>
        MFA を有効にする時、<strong>「アカウント復旧手段」が結局MFA の弱点になる</strong>のは知っておくべきです。
      </p>
      <p>
        例えば：
      </p>
      <ul>
        <li>Passkey の復旧に SMS が使われる → SMS の弱さが復旧経由で漏れる</li>
        <li>「秘密の質問でパスワードリセット」が残っている → MFA 全部回避される</li>
        <li>カスタマーサポートに電話で身分を偽って復旧 → ソーシャルエンジニアリング成立</li>
      </ul>
      <p>
        理想は<strong>「復旧経路も同じレベルの強度を要求する」</strong>。具体的には：
      </p>
      <ul>
        <li>サービス登録時に<strong>バックアップコード</strong>（10〜20桁の使い捨てコード10個程度）を取得し、紙またはパスワードマネージャに保管</li>
        <li>重要アカウントは<strong>ハードウェアキー2本</strong>を登録（1本紛失しても困らない）</li>
        <li>「秘密の質問」が残っているサービスはランダム文字列で潰す</li>
      </ul>

      <h2>おわりに</h2>
      <p>
        MFA は「とりあえず有効化すれば安全」ではなく、<strong>選んだ方式によって耐性レベルが大きく違います</strong>：
      </p>
      <pre><code>{`SMS < TOTP < Passkey/WebAuthn`}</code></pre>
      <p>
        フィッシング攻撃が高度化している現代では <strong>Passkey / FIDO2 がベスト</strong>。とはいえ「TOTP しかない」「SMS しかない」サービスでも、有効化することで攻撃ハードルは大幅に上がります。本サイトの <Link href="/tools/totp">TOTP Generator</Link> ツールで、Authenticator アプリ内部で何が起きているのか実際に動かして確認できます。
      </p>
    </ArticleLayout>
  );
}
