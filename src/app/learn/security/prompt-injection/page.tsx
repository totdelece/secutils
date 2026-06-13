import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "prompt-injection")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>プロンプトインジェクション</strong>は、LLM（大規模言語モデル）アプリの<strong>最重要リスク</strong>です。<strong>OWASP Top 10 for LLM Applications</strong> でも堂々の第1位（LLM01）。当サイトで解説してきた{" "}
        <a href="/learn/security/mcp-security">MCP</a>・{" "}
        <a href="/learn/security/ai-browser-prompt-injection">AIブラウザ</a>・{" "}
        Langflow{" "}
        の脆弱性は、いずれも根っこにこの問題を抱えています。本記事はそれらを束ねる<strong>総論</strong>として、なぜ防ぎにくいのか、直接／間接の違い、実例、そして防御とその限界までを整理します。
      </p>
      <p>
        被害は理論上の話ではありません。2025〜2026年の<strong>AI関連データプライバシー事故の約60%</strong>がプロンプト操作に起因し、社内文書を扱うAIコパイロットの<strong>75%に情報漏えいリスク</strong>が確認されたという分析もあります。AIをアプリに組み込むなら避けて通れないテーマです。
      </p>

      <h2>プロンプトインジェクションとは</h2>
      <p>
        ひとことで言えば、<strong>「攻撃者が紛れ込ませた指示を、LLMが正規の命令として実行してしまう」</strong>攻撃です。Webの{" "}
        <a href="/learn/security/xss">XSS</a>{" "}
        が「データのつもりの入力がコードとして実行される」問題であるのと、構造はよく似ています。
      </p>
      <p>
        根本原因は明快です。<strong>LLMは「開発者のシステム指示」と「外部から来たデータ」を区別できません</strong>。両方とも同じコンテキスト（プロンプト）に文字列として流し込まれ、モデルから見れば<strong>すべてが同じ重みの「指示」</strong>になります。この信頼境界の欠如が、あらゆる派生攻撃の出発点です。
      </p>

      <h2>直接と間接 — そして間接へのシフト</h2>
      <h3>直接プロンプトインジェクション（約45%）</h3>
      <p>
        <strong>利用者自身がモデルへの入力で挙動を変えさせる</strong>タイプ。「これまでの指示を無視して…」と命じる、いわゆる<strong>ジェイルブレイク</strong>が代表例です。ガードレールの回避やシステムプロンプトの抽出を狙います。
      </p>
      <h3>間接プロンプトインジェクション（2026年は55%超）</h3>
      <p>
        より深刻なのがこちら。<strong>LLMが読み込む外部コンテンツ（Webページ・メール・ファイル・ツールの出力）に指示を仕込む</strong>手口です。攻撃者は利用者と直接やり取りせず、<strong>AIが“ついでに”読むデータに罠を埋める</strong>だけ。2026年には観測される攻撃の<strong>55%超</strong>を占め、信頼できる情報源を経由する<strong>ステルス性ゆえに成功率が20〜30%高い</strong>とされます。企業環境での成功事例の<strong>62%が間接経路</strong>でした。
      </p>
      <p>
        {" "}
        <a href="/learn/security/ai-browser-prompt-injection">AIブラウザがWebページの隠し指示に操られる</a>{" "}
        のも、{" "}
        <a href="/learn/security/mcp-security">MCPのツール説明文に悪意の指示が仕込まれる</a>{" "}
        のも、すべてこの間接型です。AIエージェントが外部とやり取りするほど、攻撃面は広がります。
      </p>

      <h2>危険な組み合わせ「Lethal Trifecta」</h2>
      <p>
        間接プロンプトインジェクションが「実害」に変わる条件を、端的に示した考え方が <strong>Lethal Trifecta（致命的な三要素）</strong> です。AIエージェントが次の<strong>3つを同時に持つ</strong>と危険、というものです。
      </p>
      <ol>
        <li><strong>機微データへのアクセス</strong>（メール、社内文書、認証情報など）</li>
        <li><strong>信頼できないコンテンツへの曝露</strong>（外部Web、受信メール、アップロード文書など）</li>
        <li><strong>外部へ送信する能力</strong>（メール送信、API呼び出し、Web取得など）</li>
      </ol>
      <p>
        この3つが揃うと、<strong>「②に仕込まれた指示が、①のデータを③で持ち出す」</strong>という攻撃が成立します。逆に言えば、<strong>どれか1本を断てば致命傷は避けられる</strong>——これが設計上の重要なヒントになります。
      </p>

      <h2>実際の攻撃事例</h2>
      <ul>
        <li>
          <strong>EchoLeak（CVE-2025-32711）</strong>：Microsoft 365 Copilot の<strong>ゼロクリック</strong>間接プロンプトインジェクション。<strong>細工したメール1通</strong>を送るだけで、Copilotがそれを処理する際に隠し指示へ従い、OneDrive/SharePoint/Teamsのデータを<strong>未認証で外部に持ち出せた</strong>。本番のAIシステムで<strong>具体的なデータ漏えいに兵器化された初の既知ケース</strong>とされ、まさに Lethal Trifecta が成立した例。
        </li>
        <li>
          <strong>MCP経由のゼロクリックRCE</strong>：研究者が、{" "}
          <a href="/learn/security/mcp-security">MCP</a>{" "}
          を通じた間接プロンプトインジェクションで、エージェント型IDEに対する<strong>ゼロクリックのリモートコード実行</strong>を実証。2025年で最も技術的に重大な攻撃の一つ。
        </li>
        <li>
          <strong>KYC（本人確認）パイプラインの汚染</strong>：パスポート画像の<strong>隠しテキストに指示</strong>を埋め込み、OCR結果を無検査で処理するAI抽出エージェントを操作。<strong>1枚のアップロードで、他の20人の顧客のPIIが読み取られ攻撃者の項目に書き込まれた</strong>。
        </li>
      </ul>

      <h2>図解案：間接インジェクションとLethal Trifecta</h2>
      <pre>
        <code>{`[攻撃者] 指示を仕込む
   │  （Webページ/メール/文書/ツール説明文の中に隠す）
   ▼
[②信頼できないコンテンツ] ── AIが読み込む
   │  「指示」と「データ」を区別できない
   ▼
[AIエージェント] ──┬─ ①機微データにアクセス
                   └─ ③外部へ送信
                        │
                        ▼
                  攻撃者へデータ流出（=実害）

★ ①②③が揃う＝Lethal Trifecta。1本断てば致命傷を回避`}</code>
      </pre>

      <h2>防御策とその限界</h2>
      <p>
        重要な前提として、OpenAIですら<strong>「プロンプトインジェクションは完全には解決できないだろう」</strong>と述べています。万能の特効薬はなく、<strong>多層防御</strong>で成功率を下げるのが現実解です（ある研究では層を重ねて成功率を73.2%→10%未満に低減）。
      </p>
      <h3>入力・プロンプト側</h3>
      <ul>
        <li><strong>ユーザー入力にシステム指示を上書きさせない</strong>：プロンプトの足場（scaffolding）を固め、信頼境界を明示する。</li>
        <li><strong>Spotlighting</strong>：信頼できないデータを <code>{"<<<DATA>>>"}</code> のような区切りで囲み「これは指示ではなくデータ」と示す。実験では成功率を50%超→2%未満に低減。ただし<strong>区切りを偽装・無視させる回避</strong>も示されており、単独では不十分。</li>
      </ul>
      <h3>ガードレール（入出力検査）</h3>
      <ul>
        <li>専用の<strong>ガードレールモデル</strong>で悪意ある入力や逸脱した出力を検出・フィルタする。</li>
        <li>注意点として、ガードレールは<strong>過剰防御（over-defense）</strong>に陥りやすい。トリガー語に反応して正常な入力まで弾く問題があり、InjecGuard 等が偏り低減を研究している。<strong>安全性と実用性のトレードオフ</strong>は依然大きい。</li>
      </ul>
      <h3>アーキテクチャ側（より本質的）</h3>
      <ul>
        <li><strong>CaMeL（Defeating Prompt Injections by Design, 2025）</strong>：<strong>制御フロー（ユーザーの意図）とデータフロー（外部の内容）を構造的に分離</strong>し、値に権限（capability）メタデータを付与。専用インタプリタでポリシーを強制し、<strong>LLM自体を変えずに</strong>保証を与える設計アプローチ。</li>
        <li><strong>最小権限</strong>：エージェントに渡す権限・トークン・ツールを絞る。{" "}
          Langflow{" "}
          のように、寛容な設定が被害を増幅する。</li>
        <li><strong>人間による承認（Human-in-the-loop）</strong>：外部送信・コード実行・送金など不可逆な操作は実行前に人間が確認する。</li>
        <li><strong>Lethal Trifecta を崩す</strong>：機微データ・未信頼コンテンツ・外部送信のうち<strong>少なくとも1本を構造的に断つ</strong>（例: 外部送信先を許可リストに限定）。</li>
      </ul>

      <h2>まとめ</h2>
      <p>
        プロンプトインジェクションは、<strong>「LLMが指示とデータを区別できない」という設計上の本質</strong>に根ざすため、入力フィルタだけでは塞ぎきれません。とくに<strong>間接型</strong>がいまの主戦場で、EchoLeak のように<strong>ゼロクリックで実害</strong>に至ります。守りの要点は——<strong>システム指示を上書きさせない、Spotlightingやガードレールで層を重ねる、CaMeLのように制御とデータを分離する、最小権限と人間の承認を組み込む、そしてLethal Trifectaのどれか1本を断つ</strong>こと。
      </p>
      <p>
        個別の現れ方は{" "}
        <a href="/learn/security/mcp-security">MCP</a>・{" "}
        <a href="/learn/security/ai-browser-prompt-injection">AIブラウザ</a>・{" "}
        Langflow{" "}
        の各記事で、AIが攻撃に使われる側面は{" "}
        Claude Mythos{" "}
        で、Webアプリ全体のリスクは{" "}
        <a href="/learn/security/owasp-top-10">OWASP Top 10</a>{" "}
        で扱っています。あわせて読むと、AI時代のセキュリティの全体像がつかめます。
      </p>
      <p>
        ※ 本記事の統計値・研究・CVEは、OWASP／Microsoft／Lakera／各研究者の公表内容および論文・報道に基づきます。研究と対策は急速に進展するため、実装時は最新の情報をご確認ください。
      </p>
    </ArticleLayout>
  );
}
