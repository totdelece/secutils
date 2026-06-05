import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "ironworm-npm-ebpf-supply-chain")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        開発者のCI/CD環境は今や攻撃者にとって最も費用対効果の高い標的の一つだ。クラウドの認証情報・AIプロバイダーのAPIキー・SSH秘密鍵が集中する場所に、<code>npm install</code>の一言で侵入できる。2026年6月3日、JFrogセキュリティリサーチチームが発見した「<strong>IronWorm</strong>」はその危険性を具現化した存在だ。Rust製のこのワームは、eBPFカーネルルートキットで自身を完全に隠蔽し、Torネットワーク経由でC2通信を行い、npmのOIDC Trusted Publishing機能を悪用してCI環境で自己増殖する。過去のnpmマルウェアと根本的に異なる洗練度を持つ本件を、その仕組みから日本企業の実務対策まで解説する。
      </p>

      <h2>概要</h2>
      <ul>
        <li>
          <strong>発見日</strong>：2026年6月3日（JFrog Security Research）
        </li>
        <li>
          <strong>感染経路</strong>：asteroidDAO関連の37のnpmパッケージ（weavedb-sdk等）
        </li>
        <li>
          <strong>主な標的</strong>：Web3・Arweave/WeaveDB開発者エコシステム、CI/CD環境
        </li>
        <li>
          <strong>窃取対象</strong>：86種の環境変数・20以上のクレデンシャルファイル（AWS、Azure、GCP、npm、GitHub、AI APIキー、SSH鍵、Exodusウォレット等）
        </li>
        <li>
          <strong>特徴</strong>：eBPFカーネルルートキット、TorネットワークC2、OIDC Trusted Publishing悪用による自己増殖
        </li>
        <li>
          <strong>Shai-Huludとの関係</strong>：JFrogは「Shai-Huludの錆びた従兄弟」と呼ぶが、eBPFルートキット・Tor C2は独自機能。既知シグネチャとの一致なし
        </li>
      </ul>

      <h2>何が起きたのか</h2>
      <h3>発見の経緯</h3>
      <p>
        JFrogの研究者は2026年6月3日、npmレジストリ上で<code>weavedb-sdk@0.45.3</code>が実行時に異常な挙動を示すことを検出した。調査を進めるとasteroidDAOのnpmアカウントから公開された37のパッケージが悪意あるコードを含んでいることが判明。マルウェアは「IronWorm」と命名された。
      </p>
      <p>
        JFrogは既知のインフォスティーラー・eBPFルートキット・C2フレームワークすべてと比較照合したが「完全に一致するものは一つもなかった」と報告している。バイナリ内にソースリポジトリへの参照もなく、既存のコードを流用した痕跡も認められない。
      </p>
      <h3>被害の全容</h3>
      <ul>
        <li>感染パッケージ数：37（asteroidDAOアカウント管理下）</li>
        <li>侵害が確認されたGitHub組織：9つ</li>
        <li>確認された悪意あるコミット：14件</li>
        <li>コミット日付の偽装：最大13年前に遡って改ざん</li>
        <li>なりすまし：「Claude AIアシスタント」「Dependabot」など正規CIボットのIDを使用</li>
      </ul>
      <p>
        また攻撃者は自身のBIP-39リカバリフレーズをウォレット窃取のスキップリストにハードコードしていた。自分の暗号資産は盗まないための実装だが、攻撃者が暗号資産窃取を主要収益源として設計していることを示している。
      </p>

      <h2>技術的な解説</h2>
      <h3>preinstallスクリプトからの自動起動</h3>
      <p>
        IronWormの本体は976 KBのLinux ELFバイナリ（Rust製）で、npmパッケージの<code>preinstall</code>スクリプトから実行される。つまり<code>npm install</code>を実行するだけで、ユーザーが何も意図せずマルウェアが起動する。バイナリには以下の多層的な難読化が施されている：
      </p>
      <ul>
        <li><strong>改変済みUPXスタブ</strong>：標準アンパッカーによるシグネチャ検知を回避するためUPXスタブを独自改変</li>
        <li><strong>文字列暗号化</strong>：内部文字列はすべて呼び出し箇所ごとに異なるキーで暗号化され、静的解析を困難にする</li>
        <li><strong>ソースリポジトリURLなし</strong>：バイナリ内にコードへの参照が一切ない</li>
      </ul>

      <h3>eBPFカーネルルートキット：プロセスを「存在しないもの」にする</h3>
      <p>
        IronWormが従来のnpmマルウェアと根本的に異なる最大の特徴が、<strong>eBPF（Extended Berkeley Packet Filter）を悪用したカーネルレベルのルートキット</strong>の搭載だ。
      </p>
      <p>
        eBPFはLinuxカーネル内で安全にプログラムを実行するための正規技術で、本来はネットワーク監視・システム観測に使われる。IronWormはこれを悪用し以下を実現している：
      </p>
      <ul>
        <li><code>/proc</code>のディレクトリリスティングをカーネルレベルで書き換え、自身のプロセスIDを隠蔽</li>
        <li><code>ps</code>、<code>top</code>、<code>ls</code>などユーザーランドツールから完全に姿を消す</li>
        <li>ネットワーク接続情報も隠蔽し、通信の痕跡を消去</li>
        <li>デバッグや解析の試みを妨害</li>
      </ul>
      <p>
        LD_PRELOADベースなどユーザーランドで動作するrootkitは比較的検出されやすい。しかしeBPFはカーネル空間での操作であるため、<strong>EDR製品が参照するシステム情報そのものが偽装されている</strong>状態になる。「何も見えない」まま認証情報が盗まれ続けるリスクがある。
      </p>

      <h3>Torネットワーク経由のC2通信</h3>
      <p>
        盗んだ認証情報の送信にはTorネットワークを使用する。これによりC2サーバーのIPアドレスが完全に隠蔽され、通信先のIPベースのブロックリスト化が機能しない。ネットワーク監視ツールによるC2通信の特定も困難になる。
      </p>

      <h3>86種の認証情報を狙うインフォスティーラー</h3>
      <p>
        IronWormは以下を対象として86の環境変数と20以上のクレデンシャルファイルパスを網羅的にスキャンする：
      </p>
      <ul>
        <li><strong>クラウド基盤</strong>：AWS、GCP、Azure</li>
        <li><strong>コンテナ/オーケストレーション</strong>：Kubernetes、Docker</li>
        <li><strong>シークレット管理</strong>：HashiCorp Vault</li>
        <li><strong>CI/CDトークン</strong>：npm、GitHub Personal Access Token</li>
        <li><strong>AIプロバイダー（2026世代）</strong>：Anthropic、OpenAI、Gemini、Cohere、Mistral、Groq、Perplexity、xAI</li>
        <li><strong>暗号資産ウォレット</strong>：Exodus</li>
        <li><strong>SSHキー</strong>：ホームディレクトリ以下のすべて</li>
      </ul>
      <p>
        「2026世代のAIプロバイダーAPIキー」を明示的に対象としている点が注目される。AI開発者・AI企業のCI/CD環境が主要標的として意図されていることを示している。
      </p>

      <h3>OIDC Trusted Publishingを悪用した自己増殖メカニズム</h3>
      <p>
        IronWormが「ワーム」と呼ばれる核心がここにある。npmは2023年以降、<strong>Trusted Publishing</strong>機能を提供している。CI/CDパイプライン（GitHub Actions等）がOIDCトークンを使って一時的なnpm公開トークンを取得できる仕組みで、長期有効なトークンをCI環境に保存しなくて済むというセキュリティ上の利点がある。IronWormはこれを次のように悪用した：
      </p>
      <ol>
        <li>感染したCI/CD環境（GitHub ActionsランナーなどLinux環境）でOIDCトークンをリクエスト</li>
        <li>そのOIDCトークンを短命なnpm公開トークンに交換</li>
        <li>被害者が所有するパッケージの新バージョンとして<strong>トロイの木馬版を公開</strong></li>
        <li>そのパッケージを依存関係として持つ別の開発者やCI環境が次々と感染</li>
      </ol>
      <p>
        この自己増殖チェーンは<strong>保存された認証情報が一切なくても機能する</strong>。npmトークンをローテーションしても対策にならない。さらにGitHub上では最大13年前の日付に偽装したコミットを作成し、正規のリポジトリ履歴に溶け込ませる工作まで行った。
      </p>

      <h2>日本企業への影響</h2>
      <p>
        npmパッケージをCI/CDパイプラインで利用しているすべての企業・開発チームが対象となる。特にリスクが高い組織は以下の通りだ：
      </p>
      <ul>
        <li>GitHub Actionsなどクラウド型CIを利用している組織</li>
        <li>Web3・ブロックチェーン・暗号資産関連の開発を行っているプロジェクト</li>
        <li>AWS、Azure、GCPの認証情報をCI環境の環境変数に設定している組織</li>
        <li>AIサービス（Anthropic、OpenAI等）のAPIキーをCI/CD環境に設定している組織</li>
      </ul>
      <p>
        日本のSIer・受託開発会社ではCI/CDパイプラインのセキュリティ設定が開発チームに委ねられているケースが多く、組織的なセキュリティ監査が行き届きにくい。また、複数クライアントのCI環境を同一ランナーで運用している場合、一つの感染が横断的な侵害につながる可能性がある。
      </p>
      <p>
        eBPFルートキットが持つ最大の問題は「<strong>感染に気づかないまま時間が経過する</strong>」点だ。EDR製品がプロセスを監視できない状態でAWSクレデンシャルが盗まれた場合、CloudTrailに不審なAPI呼び出しが記録されるまで侵害を把握できない。その間にEC2インスタンスが大量起動されてクラウド請求が爆発するケースは珍しくない。
      </p>

      <h2>今すぐ確認すべきポイント</h2>
      <h3>1. 感染確認</h3>
      <ul>
        <li><code>npm install</code>ログを確認し、asteroidDAO関連パッケージ（weavedb-sdk等）の使用有無を確認</li>
        <li>GitHub Organization内のリポジトリで不審なコミット（特に「Claude」や「Dependabot」名義の自動コミット）の有無を確認</li>
        <li>npmレジストリ上で自社管理パッケージの不審なバージョンが公開されていないか確認</li>
        <li>CI/CDランナーのジョブログに異常なプロセス起動や外部通信がないか確認</li>
      </ul>
      <h3>2. 認証情報のローテーション（感染が疑われる場合）</h3>
      <ul>
        <li>AWS：アクセスキーを即座に無効化し新規発行。CloudTrailで不審なAPI呼び出しを遡及確認</li>
        <li>GitHub：すべてのPersonal Access TokenおよびDeployキーを無効化</li>
        <li>npm：すべての公開トークンを無効化し、Trusted Publishing設定を見直し</li>
        <li>AIプロバイダー（Anthropic、OpenAI等）：APIキーをローテーション</li>
        <li>SSH秘密鍵：全サーバーの<code>authorized_keys</code>を確認し不審なエントリを削除</li>
      </ul>
      <h3>3. 予防策</h3>
      <ul>
        <li><code>npm install --ignore-scripts</code>フラグを使用し、preinstallスクリプトの実行を無効化（一部パッケージへの影響に注意）</li>
        <li>Socket.devやDepscanなどのサプライチェーンセキュリティツールを導入し、悪意あるパッケージを事前検知</li>
        <li>CI/CDランナーにSeccompプロファイルを適用し、eBPFシステムコールの利用を制限</li>
        <li>OIDC Trusted Publishingの権限スコープを最小化し、不要なパッケージへの公開権限を排除</li>
        <li><code>npm ci</code>とlockfileを使ってバージョンを固定し、予期しないパッケージの取り込みを防止</li>
      </ul>

      <h2>参考情報</h2>
      <ul>
        <li>JFrog Security Research: IronWorm: Shai-Hulud&apos;s rustier cousin（2026年6月3日）</li>
        <li>BleepingComputer: New IronWorm malware hits 36 packages in npm supply-chain attack</li>
        <li>Dark Reading: Rust-Written IronWorm Hits NPM Supply Chain</li>
        <li>Phoenix Security: IronWorm — Rust-Built npm Worm Ships an eBPF Rootkit, Tor C2, and a Self-Propagating Supply Chain Implant</li>
      </ul>
    </ArticleLayout>
  );
}
