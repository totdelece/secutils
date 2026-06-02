import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "chatgphish-chatgpt-phishing")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>ChatGPhishとは何か</h2>
      <p>
        2026年5月、セキュリティ研究者のAndi Ahmeti（Permiso Security）が、ChatGPTのウェブ要約機能に存在する攻撃手法「<strong>ChatGPhish</strong>」を公表した。ChatGPTがMarkdownの画像URLを自動取得（auto-fetch）し、リンクをクリック可能な要素として信頼付きで表示する設計を悪用することで、ChatGPTのUIそのものをフィッシング面（phishing surface）に変えられる。
      </p>
      <p>
        最大の問題は、攻撃者が被害者のブラウザやネットワーク環境を直接操作せず、「被害者がChatGPTにWebページを要約させる」という日常的な操作だけで攻撃が完結する点にある。ChatGPTを業務利用している組織ほどリスクが高い。
      </p>

      <h2>何が起きたのか</h2>
      <h3>ChatGPTの「暗黙の信頼」が攻撃面になる</h3>
      <p>
        ChatGPTにURLを渡して「このページを要約して」と指示すると、ChatGPTはページ内容を取得・解析してMarkdown形式で回答を生成する。このとき<strong>chatgpt.comのレスポンスレンダラーは、ページ内のMarkdown画像URL（{`![alt](URL)`}）とMarkdownリンクを、外部から来たものであっても信頼済みのUI要素として扱う</strong>。
      </p>
      <p>
        攻撃者はこの動作を利用できる。悪意のあるペイロードを仕込んだWebページを用意し、被害者がそのページをChatGPTに要約させると以下が起きる。
      </p>

      <h3>攻撃シナリオ1：IP・UA・Refererの流出</h3>
      <p>
        攻撃者のサーバーがホストする画像のURLをページに埋め込んでおく。ChatGPTがページを要約する際にその画像を自動取得するため、攻撃者のサーバーのアクセスログに以下が記録される。
      </p>
      <ul>
        <li>被害者の実IPアドレス（または企業プロキシのIP）</li>
        <li>User-Agent（ブラウザ・OS情報）</li>
        <li>Referer（どのページから要約を依頼したか）</li>
      </ul>
      <p>
        これらの情報はターゲットプロファイリングに使われる。特に、企業のプロキシIPは「どの組織がこのページを見たか」の特定につながる。
      </p>

      <h3>攻撃シナリオ2：クリック可能なフィッシングリンクの埋め込み</h3>
      <p>
        ページに仕込んだMarkdownリンクが、ChatGPTの応答内にクリック可能なリンクとして表示される。UIはChatGPT（chatgpt.com）の信頼された画面であるため、ユーザーは「ChatGPTが薦めているリンク」と認識してクリックしやすくなる。このリンクは攻撃者が管理するフィッシングサイトやマルウェア配布サイトに誘導できる。
      </p>

      <h3>攻撃シナリオ3：偽のシステム警告とQRコードフィッシング</h3>
      <p>
        最も巧妙なのがQRコードを使った手口だ。攻撃者のS3バケットなどにホストしたQRコード画像をMarkdown画像として仕込むと、ChatGPTの応答内にそのQRコードが表示される。ユーザーが「業務ページの要約」を読んでいるつもりで、実際にはフィッシングサイトへのQRコードをChatGPTのUIで見ている状態になる。
      </p>
      <p>
        デスクトップのURLフィルタやセキュアWebゲートウェイ（SWG）は、画像として埋め込まれたQRコード内のURLを直接検査できない。スマートフォンでQRコードをスキャンさせることで、企業のプロキシやDNSフィルタを完全に回避した誘導が実現する。
      </p>

      <h2>技術的な解説</h2>
      <h3>なぜChatGPTはMarkdownを「信頼」するのか</h3>
      <p>
        ChatGPTのレスポンスはMarkdown形式で表示される。Markdownには画像埋め込み（{`![alt](URL)`}）とリンク（{`[text](URL)`}）の記法があり、多くのMarkdownレンダラーはこれらをそのままHTMLの{`<img src>`}や{`<a href>`}に変換する。
      </p>
      <p>
        問題は「外部ページを要約した結果」も同じレンダラーが処理する点にある。本来、外部コンテンツ由来のMarkdownは信頼されたChatGPT自身の生成物と同等に扱うべきではない。この区別の欠如が間接プロンプトインジェクション（<a href="/learn/security/prompt-injection">プロンプトインジェクション総論</a>参照）の攻撃面になっている。
      </p>

      <h3>間接プロンプトインジェクションとの関係</h3>
      <p>
        ChatGPhishは間接プロンプトインジェクション（Indirect Prompt Injection）の一形態だ。攻撃者はChatGPTに直接指示するのではなく、ChatGPTが読み込む外部コンテンツにペイロードを仕込む。ChatGPTはそのコンテンツを「データ」として処理するが、埋め込まれた指示やMarkdown構造が「命令」として機能する。
      </p>
      <p>
        既存の<a href="/learn/security/ai-browser-prompt-injection">AIブラウザの危険性</a>で解説したPerplexity Comet/ChatGPT Atlasを狙う間接プロンプトインジェクションとは異なり、ChatGPhishは「Webブラウジング機能を使ったエージェント型の動作」ではなく「URL要約という日常的な使い方」で発動する点が特徴的だ。より多くのユーザーが影響を受けうる。
      </p>

      <h3>SameOrigin Policyとのコントラスト</h3>
      <p>
        ブラウザの同一オリジンポリシー（<a href="/learn/security/cors-same-origin">CORS と Same-Origin Policy</a>参照）は、あるオリジン（例: chatgpt.com）のスクリプトが別オリジン（例: attacker.com）のリソースを読み取ることを制限する。しかし、画像（{`<img src>`}）は別オリジンからのロードが許可されている。ChatGPhishはこの設計上の例外を利用して情報を流出させる。
      </p>

      <h3>「信頼されたUIを踏み台にする」攻撃の本質</h3>
      <p>
        ChatGPhishが成立する本質的な理由は「ChatGPTというブランドへの信頼」にある。
      </p>
      <ul>
        <li>ユーザーはchatgpt.comのUIで見たリンク・画像を「ChatGPTが出したもの」と認識する</li>
        <li>企業のセキュリティ訓練では「不審なメールのリンクをクリックするな」と教えるが、「ChatGPTの応答内のリンクをクリックするな」とは教えていない</li>
        <li>SWGやメールフィルタはchatgpt.comを信頼ドメインとして扱うため、ChatGPT経由で配信されたリンクは通常の検査対象外になる</li>
      </ul>

      <h2>日本企業への影響</h2>
      <h3>業務利用でChatGPTを使う組織が標的になる</h3>
      <p>
        「競合他社のWebサイトを要約して比較する」「規制文書を要約してコンプライアンス確認する」「取引先のプレスリリースを要約して報告書を書く」——これらはChatGPTの一般的な業務利用だ。しかし攻撃者が悪意のあるWebページを検索結果に表示させたり、被害者にメールでURLを送ったりして「そのURLをChatGPTで要約させる」よう誘導すれば、ChatGPhishが発動する。
      </p>

      <h3>Quishingとの複合利用リスク</h3>
      <p>
        ChatGPhishが生成するQRコードはブラウザのURLフィルタを回避する。<a href="/learn/security/quishing">Quishing（QRコードフィッシング）</a>の手口と組み合わされると、メールフィルタ回避（Quishing）とURLフィルタ回避（ChatGPhish）が二重に機能する高度な攻撃チェーンになる。
      </p>

      <h3>Webリサーチ担当者のリスク</h3>
      <p>
        広報・法務・調達・IR担当者など、日常的に外部URLをChatGPTに読み込ませる業務をしている人物が特にリスクが高い。攻撃者にとっては「どのような組織が、どのような情報を調査しているか」をIPアドレスとRefererから推測できるため、ターゲット選定にも活用される。
      </p>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. ChatGPTへの外部URLの読み込みポリシーを設ける</h3>
      <p>
        業務でChatGPTに外部URLを読み込ませる場合、信頼できるドメイン（政府機関・主要メディア・取引先の公式サイト）に限定するポリシーを設ける。「攻撃者から送られてきたURLをChatGPTで要約する」というシナリオが成立しないよう、URLの出所を確認する習慣を付ける。
      </p>

      <h3>2. ChatGPT応答内のリンクをメールリンクと同様に扱う</h3>
      <p>
        ChatGPTの回答に含まれるリンクは「ChatGPTが薦めている」のではなく「要約したページに含まれていた」可能性がある。応答内のリンクをクリックする前に、URLをホバーで確認する習慣を従業員に周知する。特にQRコードが表示された場合は要注意だ。
      </p>

      <h3>3. ChatGPT利用ガイドラインに追記する</h3>
      <p>
        ChatGPTなどのAIツール利用ガイドラインに以下を追加する。
      </p>
      <ul>
        <li>第三者から受け取ったURLをAIで要約する際は、そのURLが安全かどうかを先に確認する</li>
        <li>AIの回答内のリンク・QRコードは、通常のウェブリンクと同じセキュリティ意識で扱う</li>
        <li>社内機密に関連する作業でAIを使う際は、外部リソースの読み込みを避ける</li>
      </ul>

      <h3>4. SWGのAI/LLMカテゴリポリシーを見直す</h3>
      <p>
        セキュアWebゲートウェイ（SWG）でchatgpt.comを完全許可しているなら、そこから生成されるアウトバウンドリクエスト（ChatGPTが外部URLを取得する際の通信）も監視対象に含めることを検討する。
      </p>

      <h3>5. OpenAI側の修正状況を追う</h3>
      <p>
        Permiso SecurityはOpenAIに対して脆弱性を開示済みであり、OpenAI側でのUI改修・Markdown信頼モデルの変更・外部リソースの自動取得制限などの対応が期待される。定期的に修正状況を確認し、自組織のAI利用ポリシーに反映する。
      </p>

      <h2>参考情報</h2>
      <ul>
        <li>The Hacker News: ChatGPhish Vulnerability Turns ChatGPT Web Summaries Into a Phishing Surface</li>
        <li>SecurityWeek: Malicious GPT Can Phish Credentials, Exfiltrate Them to External Server: Researcher</li>
        <li>The Hacker News: OpenAI Patches ChatGPT Data Exfiltration Flaw and Codex GitHub Token Vulnerability</li>
      </ul>
    </ArticleLayout>
  );
}
