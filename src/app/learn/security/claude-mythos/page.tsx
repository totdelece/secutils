import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "claude-mythos")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>Claude Mythos とは</h2>
      <p>
        <strong>Claude Mythos Preview</strong> は、Anthropic が <strong>2026年4月7日</strong>に公表したフロンティアAIモデルです。最大の特徴は、<strong>サイバーセキュリティ、とりわけ脆弱性の発見と悪用（エクスプロイト生成）に「際立って高い能力」</strong>を示した点にあります。
      </p>
      <p>
        本記事は特定の CVE への緊急対応ではなく、<strong>「AI が自律的に脆弱性を見つける時代に、攻防とエンジニアの備えがどう変わるか」</strong>を整理する解説です。数値・発見事例はいずれも<strong>Anthropic の公表値および報道（IEEE Spectrum 等）に基づく事実</strong>に絞り、未確認の扇情的な主張は扱いません。
      </p>

      <h2>Anthropic が公表した能力と発見</h2>
      <p>
        Anthropic および報道によると、Mythos Preview は次のような結果を示したとされています（いずれも<strong>Anthropic 公表ベース</strong>）。
      </p>
      <ul>
        <li>
          主要な OS・Web ブラウザに対し、<strong>ゼロデイ脆弱性を発見し、動作するエクスプロイトを自律生成</strong>した。
        </li>
        <li>
          Firefox の JavaScript エンジンに対するベンチマークで、<strong>数百回の試行のうち181回で動作するエクスプロイト</strong>を生成（前世代 Opus 4.6 は2回）。
        </li>
        <li>
          複数の脆弱性を<strong>連鎖（チェイン）させてLinuxカーネルのrootやJITヒープスプレー等の高度なエクスプロイト</strong>を構成した。
        </li>
        <li>
          明示的な専用訓練なしに、<strong>多数の高〜重大深刻度の脆弱性</strong>を発見したと報告。
        </li>
      </ul>
      <p>具体的に開示された発見例には次のものがあります。</p>
      <ul>
        <li>
          <strong>CVE-2026-4747</strong>: <strong>17年間</strong>存在していた FreeBSD の NFS の脆弱性。未認証で root を取得し得る RCE。
        </li>
        <li>
          <strong>27年もの</strong>の OpenBSD の TCP SACK 実装の脆弱性（修正済み）。
        </li>
        <li>
          <strong>16年もの</strong>の FFmpeg の H.264 コーデックの脆弱性（FFmpeg のコーデックの複数の問題が 8.1 で修正）。
        </li>
      </ul>
      <p>
        Anthropic は<strong>「発見した脆弱性の99%超がまだ未修正」</strong>であることを理由に、詳細の公開を限定しているとしています。
      </p>

      <h2>Project Glasswing と提供方針</h2>
      <p>
        Anthropic は同時に、Mythos の発見能力を<strong>「世界で最も重要なソフトウェアの防御」に向ける取り組みとして Project Glasswing</strong> を打ち出しました。モデルは<strong>一般提供（generally available）されておらず</strong>、当初は<strong>限られた重要産業のパートナーやオープンソース開発者</strong>へ限定的に配布されるとしています。
      </p>
      <p>
        あわせて、<strong>危険な出力を検知・ブロックする安全策（セーフガード）</strong>の開発や、正当なアクセスを必要とするセキュリティ専門家向けの<strong>Cyber Verification Program</strong> の整備も表明されています。「能力をまず防御側に届ける」という配慮がうかがえます。
      </p>

      <h2>本質は「二段刃（デュアルユース）」</h2>
      <p>
        この種の能力で最も重要な論点は、<strong>脆弱性を「見つける力」と「悪用する力」は表裏一体</strong>だという点です。防御に使えるツールは、原理的に攻撃にも使えます。だからこそ、防御側は次の前提で動く必要があります。
      </p>
      <ul>
        <li>
          <strong>「発見から悪用までの時間」がさらに短くなる</strong>: AI 支援で攻撃側のエクスプロイト開発が加速すれば、パッチ公開後の猶予はますます縮む。<strong>パッチ適用の速度</strong>が決定的になる。
        </li>
        <li>
          <strong>「古いコードほど危険」</strong>: 27年・17年・16年と、長く生き残ってきたバグが次々に表面化した事実は、<strong>レガシーコード・古い依存・メモリ非安全な実装</strong>が大きな負債であることを示す。
        </li>
        <li>
          <strong>網羅性の非対称</strong>: 機械スケールで「干し草の山の針」を探されると、守る側は<strong>一点突破を許さない多層防御</strong>と、資産・依存の可視化が不可欠になる。
        </li>
      </ul>

      <h2>過信は禁物: 専門家が指摘する注意点</h2>
      <p>
        IEEE Spectrum の報道では、専門家は能力を評価しつつ、<strong>AI に任せきりにすることへの明確な警鐘</strong>も鳴らしています。
      </p>
      <ul>
        <li>
          <strong>誤検知（false positive）</strong>: AI は誤検知も生み、OSS メンテナにトリアージ（選別）負担を強いる。報告の質を担保する人手が要る。
        </li>
        <li>
          <strong>AI 自身が攻撃対象</strong>: モデルは<strong>プロンプトインジェクション</strong>などで操作され得る。AI を組み込んだパイプラインは新たな攻撃面になる（{" "}
          <a href="/learn/security/langflow-cve-2025-34291">Langflow の事例</a> も参照）。
        </li>
        <li>
          <strong>人間の判断は代替できない</strong>: 「セキュア設計レビューやペネトレーションテストの代わりにはならない」「検証の層と人間の専門性を組み込んでこそ有効」というのが共通認識。
        </li>
      </ul>

      <h2>エンジニア・防御側の備え</h2>
      <ol>
        <li>
          <strong>パッチ速度を上げる</strong>: 依存の自動更新（Dependabot 等）、KEV/EPSS を軸にした優先度付け、緊急パッチの自動適用を整える。<strong>「悪用されているか」を最優先シグナル</strong>に。
        </li>
        <li>
          <strong>資産と依存の可視化（SBOM）</strong>: 「今どのコンポーネントのどのバージョンが動いているか」を即答できる状態にする。発見が機械スケール化するほど、棚卸しの速さが効く。
        </li>
        <li>
          <strong>古い負債を計画的に減らす</strong>: メモリ安全な言語・最新の保守された依存へ移行し、長期放置のレガシーを優先的に手当てする。
        </li>
        <li>
          <strong>AI を「補助」として正しく使う</strong>: AI 支援の SAST/ファジングは強力だが、<strong>人間による検証・トリアージを必ず挟む</strong>。出力を鵜呑みにしない。
        </li>
        <li>
          <strong>AI 基盤自体を守る</strong>: 社内で動かす AI ツール／エージェントは、認証・ネットワーク分離・プロンプトインジェクション対策を施し、不用意に公開しない。
        </li>
      </ol>

      <h2>まとめ</h2>
      <p>
        Claude Mythos は、<strong>AI による自律的な脆弱性発見が現実の段階に入った</strong>ことを示す象徴的な事例です。ポイントは過度な楽観でも悲観でもなく、<strong>「発見の自動化は攻防双方を加速させる二段刃」</strong>だと理解し、防御側が<strong>パッチ速度・可視化・レガシー削減・人間によるレビュー</strong>という基本を一段引き上げることにあります。
      </p>
      <p>
        新しいツールが登場しても、効く守りは Web とソフトウェアの基礎の延長線上にあります。全体像は{" "}
        <a href="/learn/security/owasp-top-10">OWASP Top 10 入門</a>、AI 基盤特有のリスクは{" "}
        <a href="/learn/security/langflow-cve-2025-34291">Langflow（CVE-2025-34291）の解説</a>、サプライチェーンの観点は{" "}
        <a href="/learn/security/shai-hulud">Shai-Hulud 詳解</a> も合わせてご覧ください。
      </p>
      <p>
        ※ 本記事の数値・発見事例は Anthropic の公表内容および報道に基づきます。提供状況や対象は変わり得るため、最新情報は公式発表をご確認ください。
      </p>
    </ArticleLayout>
  );
}
