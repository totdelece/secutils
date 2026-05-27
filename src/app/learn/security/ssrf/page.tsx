import { ArticleLayout } from "../../_components/ArticleLayout";
import { getArticle } from "@/lib/articles";

const article = getArticle("security", "ssrf")!;

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>SSRF とは何か</h2>
      <p>
        <strong>SSRF（Server-Side Request Forgery）</strong>は、攻撃者が用意した URL をサーバー側に取得させ、本来アクセスできないはずの内部リソースへ接続させる攻撃です。OWASP Top 10 2021 では <strong>A10:2021 - Server-Side Request Forgery</strong> として単独項目に格上げされました（2017年版にはなく、調査で多数報告された結果の格上げ）。
      </p>
      <p>
        鍵となるのは <strong>「サーバーはクライアントよりも強い権限とネットワーク到達範囲を持つ」</strong>という点です。クラウド環境では特に致命的で、AWS/GCP/Azure のメタデータサービスを経由して認証情報（一時クレデンシャル）を奪われると、そのクラウドアカウント全体が侵害されます。
      </p>

      <h2>典型的な脆弱なコード</h2>
      <p>
        URL を受け取って画像をプロキシ取得する、よくあるサムネイル生成 API：
      </p>
      <pre><code>{`# 脆弱な例（Python/Flask）
@app.route("/thumbnail")
def thumbnail():
    url = request.args.get("url")
    response = requests.get(url)  # ← URL検証なし
    return process_image(response.content)`}</code></pre>
      <p>
        攻撃者は次の URL を送り込めます：
      </p>
      <pre><code>{`# AWS のインスタンスメタデータサービスを直接取得
GET /thumbnail?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/

# 内部 Redis を叩く
GET /thumbnail?url=http://localhost:6379/

# 内部管理画面
GET /thumbnail?url=http://10.0.0.5/admin

# file:// で /etc/passwd を読む
GET /thumbnail?url=file:///etc/passwd`}</code></pre>

      <h2>クラウド IMDS を狙う攻撃（最大の脅威）</h2>
      <p>
        AWS/GCP/Azure には <strong>インスタンスメタデータサービス（IMDS）</strong>があり、EC2 等から特定 IP に HTTP リクエストを送るとそのインスタンスに紐づく <strong>IAM 一時クレデンシャル</strong>を取得できます。
      </p>
      <table>
        <thead>
          <tr>
            <th>クラウド</th>
            <th>メタデータエンドポイント</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AWS</td>
            <td><code>http://169.254.169.254/latest/meta-data/</code></td>
          </tr>
          <tr>
            <td>GCP</td>
            <td><code>http://metadata.google.internal/</code></td>
          </tr>
          <tr>
            <td>Azure</td>
            <td><code>http://169.254.169.254/metadata/</code></td>
          </tr>
        </tbody>
      </table>
      <p>
        SSRF でこの内部 IP に到達できれば、EC2 にアタッチされた IAM Role の一時アクセスキー・シークレット・セッショントークンが <strong>そのまま JSON で返ってきます</strong>。攻撃者はそれを盗んで AWS API を直接叩き、S3 全件ダウンロード・DB スナップショット作成・新規 IAM ユーザー作成といった操作が可能になります。
      </p>

      <h2>Capital One 事件（1億件流出）</h2>
      <p>
        2019年に発生した <strong>Capital One（米大手銀行）の1億件流出</strong>は、SSRF が引き金となった代表的な事例です。
      </p>
      <ul>
        <li>WAF に SSRF 脆弱性が存在</li>
        <li>攻撃者が SSRF を悪用し、EC2 メタデータから WAF にアタッチされていた IAM Role の一時クレデンシャルを取得</li>
        <li>そのクレデンシャルで S3 バケットをリスト・取得</li>
        <li>米国のクレジットカード申込者 約1億600万件、カナダの約600万件のデータが流出</li>
        <li>Capital One には1億9000万ドルの和解金</li>
      </ul>
      <p>
        この事件以降、クラウド業界での SSRF と IMDS 保護の重要性は決定的になりました。
      </p>

      <h2>防御1: IMDSv2 への移行（AWS）</h2>
      <p>
        AWS は事件を受けて <strong>IMDSv2</strong>を導入しました。IMDSv2 では、メタデータ取得前にトークン取得 PUT リクエストを必須化し、SSRF による単純な GET 攻撃を防ぎます：
      </p>
      <pre><code>{`# IMDSv2: まず PUT でトークン取得（TTL指定が必須）
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

# その後 GET にトークンをヘッダで付与
curl -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/iam/security-credentials/`}</code></pre>
      <p>
        多くの SSRF は GET リクエストしか送れない（URL 取得型）ため、PUT を強制することで実害を大きく減らせます。さらに <code>X-Forwarded-For</code> ヘッダがあると IMDSv2 はリクエストを拒否し、リバースプロキシ越しの SSRF にも耐性を持たせています。
      </p>
      <p>
        2024年以降、AWS は新規 EC2 のデフォルトを IMDSv2 のみに変更しました。既存環境は <strong>IMDSv1 を明示的に無効化</strong>することが推奨されます。
      </p>

      <h2>防御2: 許可リスト方式の URL 検証</h2>
      <p>
        ユーザー入力 URL を取得する場合、<strong>「禁止リスト」ではなく「許可リスト」</strong>で実装します。禁止リストは DNS Rebinding、IPv6 表記、10進整数表記、URL ショートナー、リダイレクトなどで容易に回避されるためです。
      </p>
      <pre><code>{`# 悪い例（禁止リスト方式 - 回避されやすい）
if "169.254" in url or "localhost" in url:
    raise ValidationError()

# 良い例（許可リスト方式）
ALLOWED_HOSTS = {"images.example.com", "cdn.example.com"}
parsed = urlparse(url)
if parsed.hostname not in ALLOWED_HOSTS:
    raise ValidationError()
if parsed.scheme not in {"http", "https"}:
    raise ValidationError()`}</code></pre>

      <h2>防御3: 名前解決後の IP チェック</h2>
      <p>
        DNS Rebinding 攻撃を防ぐため、<strong>「名前解決した IP がプライベート IP 範囲かをチェック」</strong>し、外部接続前にも同じチェックを再度行います。プライベート IP には次が含まれます：
      </p>
      <ul>
        <li><code>10.0.0.0/8</code>（プライベートクラスA）</li>
        <li><code>172.16.0.0/12</code>（プライベートクラスB）</li>
        <li><code>192.168.0.0/16</code>（プライベートクラスC）</li>
        <li><code>169.254.0.0/16</code>（リンクローカル、IMDS含む）</li>
        <li><code>127.0.0.0/8</code>（ループバック）</li>
        <li><code>::1/128</code>, <code>fc00::/7</code>, <code>fe80::/10</code>（IPv6 各種）</li>
      </ul>
      <p>
        IP 範囲チェックには <a href="/tools/cidr-calculator">CIDR Calculator</a> で許可・禁止範囲を整理しておくと検証コードに転用しやすくなります。
      </p>

      <h2>防御4: ネットワーク層での隔離</h2>
      <p>
        アプリケーション層の防御に加え、<strong>ネットワーク層でも内部リソースへの egress を制限</strong>します：
      </p>
      <ul>
        <li>EC2 から IMDS への到達は IAM Role が必要な特定プロセスだけに制限（ホストファイアウォール）</li>
        <li>VPC 内のサービスからインターネット egress を NAT Gateway 経由に集約し、egress ルールで内部 IP を遮断</li>
        <li>コンテナ環境では Pod の <code>NetworkPolicy</code> で他 Pod・メタデータサービスへの到達を制御</li>
        <li>WAF レベルで <code>169.254.169.254</code> 等の宛先を拒否</li>
      </ul>

      <h2>SSRF が見つかる典型箇所</h2>
      <ul>
        <li><strong>画像プロキシ・サムネイル生成</strong>（URL から画像取得）</li>
        <li><strong>Webhook 送信機能</strong>（ユーザー指定 URL に POST）</li>
        <li><strong>OAuth Discovery</strong>（issuer URL の <code>.well-known</code> 取得）</li>
        <li><strong>PDF 生成</strong>（HTML 内の <code>&lt;img&gt;</code> をサーバー側で取得）</li>
        <li><strong>RSS リーダー、URL プレビュー</strong>（OGP 取得）</li>
        <li><strong>SSRF 経由でクラウド API、内部管理画面、Redis/Memcached を叩く</strong></li>
      </ul>

      <h2>まとめ</h2>
      <p>
        SSRF は「サーバーに URL を取得させる」というシンプルな手口ながら、クラウド環境では <strong>1リクエストでアカウント全体侵害</strong>に直結する破壊力を持ちます。Capital One 事件はその実例で、教訓として AWS は IMDSv2 を導入しました。
      </p>
      <p>
        実装時の鉄則は <strong>(1) IMDSv2 強制、(2) URL 許可リスト方式、(3) 名前解決後 IP チェック、(4) ネットワーク層 egress 制限</strong>の4段重ね。1層に穴があっても他層で止まる多層防御を構築してください。
      </p>
      <p>
        IP 範囲の確認には <a href="/tools/cidr-calculator">CIDR Calculator</a>、関連リスクは <a href="/learn/security/owasp-top-10">OWASP Top 10 入門</a>、ネットワーク基礎は <a href="/learn/network/nat-port-forwarding">NAT とポートフォワーディング</a>も合わせてご覧ください。
      </p>
    </ArticleLayout>
  );
}
