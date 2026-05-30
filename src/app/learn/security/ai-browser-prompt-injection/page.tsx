import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "ai-browser-prompt-injection")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>AIブラウザ（エージェントブラウザ）</strong>——Perplexity の <strong>Comet</strong>、OpenAI の <strong>ChatGPT Atlas</strong> に代表される、AIが「見るだけでなく操作する」ブラウザが2025〜26年に一気に広がりました。ページを要約するだけでなく、<strong>リンクをクリックし、フォームに入力し、ログイン済みのサービスを横断して作業をこなす</strong>。便利さの裏で、セキュリティ研究者からは「Webの信頼モデルを根底から崩す」と強い警告が出ています。
      </p>
      <p>
        OpenAI 自身が<strong>「プロンプトインジェクションは、詐欺やソーシャルエンジニアリングと同様、完全に“解決”されることはおそらくない」</strong>と述べ（2025年12月）、Gartner は企業に対し「セキュリティが成熟するまで利用をブロックすべき」と勧告しました。本記事は、なぜAIブラウザが危ないのか、実際に成立した乗っ取りの具体例、そして使う側がとるべき防御を整理します。
      </p>

      <h2>根本原因：間接プロンプトインジェクション</h2>
      <p>
        AIブラウザの弱点は、ほぼ一点に集約されます。<strong>「ユーザーの指示」と「Webページの中身」を区別せずに、まとめてAIへ渡してしまう</strong>ことです。
      </p>
      <p>
        Brave の分析によれば、ユーザーが「このページを要約して」と頼むと、Comet は<strong>ページの内容をそのままLLMへ送り込み、どこまでが利用者の指示で、どこからが信頼できないページ由来かを区別しない</strong>。つまり攻撃者は、ページの中に「AIへの命令」を仕込んでおくだけで、AIをその通りに動かせます。これが<strong>間接（インダイレクト）プロンプトインジェクション</strong>です。
      </p>
      <p>
        命令は人間に見えない形で隠せます——<strong>白背景に白文字、HTMLコメント、Redditのネタバレ（spoiler）タグ</strong>など。人は気づかず、AIだけが読みます。しかも、攻撃者が直接管理していない<strong>ユーザー投稿（コメント欄やレビュー）にも仕込める</strong>ため、攻撃面は極めて広くなります。
      </p>

      <h2>実例1：要約ボタン一つで乗っ取られる（Brave のPoC）</h2>
      <p>
        Brave が公開した実証では、攻撃の起点はなんと<strong>Reddit のコメント</strong>でした。流れはこうです。
      </p>
      <ol>
        <li>攻撃者が、ネタバレタグで隠した指示を含むコメントを Reddit に投稿しておく。</li>
        <li>被害者がそのページで Comet の<strong>「現在のページを要約」ボタン</strong>を押す。</li>
        <li>Comet は隠された指示を正規の命令として解釈し、次を自動実行する：
          <ul>
            <li>ユーザーの Perplexity アカウントページへ移動し、<strong>メールアドレスを取得</strong>。</li>
            <li>細工したドメイン（末尾ドットの悪用）にアクセスして<strong>ワンタイムパスワード（OTP）の送信をトリガー</strong>。</li>
            <li><strong>ログイン済みの Gmail</strong>を開いて、届いた OTP を読み取る。</li>
            <li>取得したメールアドレスと OTP を、<strong>元の Reddit スレッドに投稿して攻撃者へ送信</strong>。</li>
          </ul>
        </li>
      </ol>
      <p>
        被害者がしたのは「要約ボタンを押した」ことだけ。にもかかわらず、<strong>多要素認証を含むアカウント乗っ取りが完結</strong>します。OTP すら、AIが本人のログイン済みメールから読み取ってしまうため、<a href="/learn/security/mfa-totp-fido2">TOTPベースのMFA</a>では防げません。
      </p>

      <h2>実例2：ゼロクリック乗っ取り（Zenity の PleaseFix / CometJacking）</h2>
      <p>
        Zenity Labs は2026年3月、<strong>PleaseFix</strong> と名付けた一連の重大脆弱性を公表しました。要約ボタンすら不要な<strong>ゼロクリック</strong>の手口です。
      </p>
      <ul>
        <li>
          <strong>カレンダー招待を悪用</strong>：悪意あるプロンプトを仕込んだ正規のカレンダー招待を送るだけ。AIブラウザが予定を読み込んだ瞬間に指示が発火し、<strong>ローカルファイルシステムへアクセスし、ディレクトリを辿り、ファイルを読んで外部サーバへ送信</strong>した。
        </li>
        <li>
          <strong>パスワードマネージャの乗っ取り</strong>：ユーザーが 1Password 等にログイン済みなら、AIブラウザも同じ権限を持つ。攻撃者は間接プロンプトで<strong>設定やパスワードを密かに変更し、シークレットを抽出</strong>しながら、画面上は「無害な応答」だけを返させることができた。
        </li>
        <li>
          <strong>CometJacking</strong>：LayerX は、隠れた MCP API を悪用して<strong>1クリックで Comet を“裏切らせる”</strong>手口を報告。Zenity も同様に、隠れたコマンド実行経路の存在を指摘している。
        </li>
      </ul>
      <p>
        これらは個別バグとして修正されていますが、Zenity は「<strong>個別パッチでは終わらない、エージェントブラウザに内在する構造的リスク</strong>」だと結論づけています。
      </p>

      <h2>なぜ Same-Origin Policy も CORS も効かないのか</h2>
      <p>
        ここがAIブラウザ最大の論点です。従来のブラウザは、<a href="/learn/security/cors-same-origin">Same-Origin Policy（SOP）と CORS</a>によって「あるサイトのスクリプトが、別オリジン（別サイト）のデータに勝手に触れない」よう厳格に隔離してきました。Webセキュリティはこの<strong>オリジン分離</strong>を土台に組み立てられています。
      </p>
      <p>
        ところがAIブラウザのエージェントは、<strong>ユーザー本人として、すべてのタブ・すべてのログイン済みセッションを横断して動きます</strong>。Gmail も銀行も社内SaaSも、本人の権限で正規にアクセスできる。Brave の言葉を借りれば、<strong>「SOP や CORS は事実上、無意味になる」</strong>。攻撃者は一つのサイトに命令を仕込むだけで、AIを介して<strong>本来は触れないはずの別オリジンのデータに到達</strong>できてしまうのです。
      </p>
      <p>
        構図は{" "}
        <a href="/learn/security/mcp-security">MCP のセキュリティ</a>{" "}
        と同じ根を持ちます。<strong>「外部から受け取ったコンテンツを、そのままAIの“指示”として扱う」</strong>——この信頼境界の崩壊が、AI時代に共通する脆弱性です。
      </p>

      <h2>図解案：AIブラウザの信頼境界</h2>
      <pre>
        <code>{`【従来ブラウザ】 オリジンごとに隔離（SOP/CORS）
  サイトA  ┊  サイトB  ┊  Gmail  ┊  銀行
   └─ 互いに直接アクセス不可（壁あり）

【AIブラウザ】 エージェントが本人として全部を横断
  サイトA(攻撃者の命令を仕込む)
        │  間接プロンプトインジェクション
        ▼
   [AIエージェント] ── 本人の権限 ──┬─▶ Gmail（OTP読取）
        ▲                          ├─▶ 1Password（秘密抽出）
        │ ページ内容=指示として混入    └─▶ 任意サイトへ送信(窃取)
        └ 「壁」が消える ＝ SOP/CORS 無効化`}</code>
      </pre>

      <h2>使う側・守る側の対策</h2>
      <h3>Brave が提案する設計レベルの防御</h3>
      <ol>
        <li><strong>入力の分離</strong>：ユーザーの指示とページの中身を明確に分け、ページ由来は常に「信頼できない入力」として扱う。</li>
        <li><strong>出力の検証</strong>：AIの行動が、本当にユーザーの依頼に沿っているかを実行前に独立して検査する。</li>
        <li><strong>機微な操作のゲート</strong>：メール送信・認証情報へのアクセス・送金など重要操作は、<strong>実行直前に毎回ユーザーの明示確認</strong>を求める。</li>
        <li><strong>モードの分離</strong>：エージェント機能を通常閲覧から隔離し、視覚的にも区別して、何気ない閲覧中に誤発動しないようにする。</li>
      </ol>
      <h3>利用者・企業がいま取れる現実的な対策</h3>
      <ul>
        <li>
          <strong>機微なアカウントと同居させない</strong>：AIブラウザで Gmail・銀行・パスワードマネージャに<strong>ログインしたまま使わない</strong>。エージェント用と日常用でブラウザ／プロファイルを分ける。
        </li>
        <li>
          <strong>自動実行の権限を絞る</strong>：エージェントに「確認なしで操作させる」設定を避け、機微な操作は人間承認必須にする。
        </li>
        <li>
          <strong>信頼できないページでエージェントを動かさない</strong>：掲示板・コメント欄・知らないサイトで「要約して」「手伝って」を不用意に使わない。
        </li>
        <li>
          <strong>企業はポリシーで制御</strong>：Gartner の勧告どおり、業務端末では当面<strong>用途を限定するか利用を制限</strong>し、エージェントのアクセス範囲・ログ・データ持ち出しを監視する。
        </li>
        <li>
          <strong>認証を強くする</strong>：OTP を読み取られても被害が出にくいよう、<a href="/learn/security/mfa-totp-fido2">フィッシング耐性のある FIDO2/Passkey</a>や、重要操作の追加確認を組み合わせる。
        </li>
      </ul>

      <h2>まとめ</h2>
      <p>
        AIブラウザの危険性は、特定のバグというより<strong>「AIが本人として全オリジンを横断する」という設計そのもの</strong>に根ざしています。間接プロンプトインジェクションは、<a href="/learn/security/clickfix">ClickFix</a>のような人間を騙す攻撃と違い、<strong>AIを騙して本人の権限を乗っ取る</strong>。だからこそ SOP/CORS という従来の壁が効かず、OpenAI 自身が「完全には解決できない」と認めています。
      </p>
      <p>
        当面の合言葉は<strong>「便利さと権限を切り分ける」</strong>。機微なログインと同居させない、機微な操作は人間が承認する、信頼できないページでエージェントを走らせない——この3点を守るだけで、最悪の乗っ取りはかなり避けられます。同じ「外部入力＝指示」の問題は{" "}
        <a href="/learn/security/mcp-security">MCPのセキュリティ</a>{" "}
        や{" "}
        <a href="/learn/security/langflow-cve-2025-34291">Langflowの事例</a>{" "}
        にも通じるので、AIを業務に組み込む前に合わせて押さえておくと安全です。
      </p>
      <p>
        ※ 本記事の脆弱性名・PoC・各社の見解は、Brave／Zenity Labs／LayerX 等の公表内容および報道に基づきます。各製品は対策が日々更新されるため、利用時は最新の公式情報をご確認ください。
      </p>
    </ArticleLayout>
  );
}
