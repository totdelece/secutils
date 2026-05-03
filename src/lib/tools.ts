export type ToolCategory = "security" | "encoding" | "network" | "misc";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: string;
};

export const categoryLabels: Record<ToolCategory, string> = {
  security: "Security",
  encoding: "Encoding",
  network: "Network",
  misc: "Misc",
};

export const tools: Tool[] = [
  {
    slug: "password-generator",
    title: "Password Generator",
    description:
      "暗号学的に安全なパスワードを生成。長さ・文字種・記号有無を細かく指定できます。",
    category: "security",
    icon: "🔐",
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    description:
      "テキストから MD5 / SHA-1 / SHA-256 / SHA-512 ハッシュを同時計算。コピー対応。",
    category: "security",
    icon: "🔑",
  },
  {
    slug: "base64",
    title: "Base64 Encode / Decode",
    description:
      "テキストとBase64の相互変換。標準/URL-safe両対応、UTF-8対応、即時変換。",
    category: "encoding",
    icon: "🔁",
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    description:
      "JWT（JSON Web Token）をHeader/Payload/Signatureに分解して可視化。標準クレームの説明・有効期限チェック付き。",
    category: "security",
    icon: "🪪",
  },
  {
    slug: "url-encoder",
    title: "URL Encoder / Decoder",
    description:
      "URLとテキストの相互変換。クエリパラメータ用 encodeURIComponent と URL全体用 encodeURI を切替可能、即時変換。",
    category: "encoding",
    icon: "🔗",
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    description:
      "UUID v4（ランダム）/ v7（時系列ソート可能、RFC 9562）を一括生成。1〜1000個・複数フォーマット・個別コピー対応。",
    category: "misc",
    icon: "🆔",
  },
  {
    slug: "cidr-calculator",
    title: "CIDR / Subnet Calculator",
    description:
      "CIDR表記からネットワーク・ブロードキャスト・ホスト範囲・サブネットマスク・ワイルドカードを即時計算。IPv4 / IPv6 両対応。",
    category: "network",
    icon: "🌐",
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description:
      "正規表現のテスト・デバッグ。マッチをハイライト、キャプチャグループ表示、置換プレビュー、6フラグ対応。",
    category: "misc",
    icon: "🔍",
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter / Validator",
    description:
      "JSONの整形・最小化・バリデーション。インデント幅切替、キーソート、エラー位置（行・列）表示。",
    category: "encoding",
    icon: "📋",
  },
  {
    slug: "timestamp-converter",
    title: "Timestamp Converter",
    description:
      "UNIX秒/ミリ秒/マイクロ秒/ナノ秒・ISO 8601・RFC 2822 を相互変換。UTC/JST/ローカル表示・相対時刻・曜日付き。",
    category: "misc",
    icon: "🕐",
  },
  {
    slug: "html-entity",
    title: "HTML Entity Encoder / Decoder",
    description:
      "HTMLエンティティとテキストの相互変換。XSS対策の最小エスケープ・名前付き・数値参照（10進/16進）切替対応。",
    category: "encoding",
    icon: "🏷️",
  },
  {
    slug: "diff-viewer",
    title: "Diff Viewer",
    description:
      "2つのテキストの差分を行単位で表示。LCSベースで追加・削除をハイライト、空白/大小無視オプション、統計表示。",
    category: "misc",
    icon: "🆚",
  },
  {
    slug: "qr-code",
    title: "QR Code Generator",
    description:
      "テキスト・URLからQRコードをブラウザで生成。エラー訂正レベル4段階、色カスタム、SVG/PNGダウンロード対応。",
    category: "misc",
    icon: "📱",
  },
  {
    slug: "json-yaml",
    title: "JSON ↔ YAML Converter",
    description:
      "JSONとYAMLの相互変換。Kubernetes / Docker Compose / GitHub Actions 等の設定ファイル形式変換に。インデント幅切替対応。",
    category: "encoding",
    icon: "🔄",
  },
  {
    slug: "hmac",
    title: "HMAC Generator",
    description:
      "メッセージとシークレットキーから HMAC 署名を生成。SHA-1/256/384/512 対応、hex/base64/base64url 出力切替。Webhook検証・APIシグネチャ生成に。",
    category: "security",
    icon: "🔏",
  },
  {
    slug: "cron-parser",
    title: "Cron Expression Parser",
    description:
      "cron 式を人間に読める日本語に変換し、次回実行予定を5件まで表示。`*/5 * * * *` 等の表記検証・デバッグに。",
    category: "misc",
    icon: "⏱",
  },
  {
    slug: "totp",
    title: "TOTP Generator (2FA)",
    description:
      "RFC 6238 の TOTP（時間ベースワンタイムパスワード）をブラウザ内で計算。Google Authenticator 互換、SHA-1/256/512、Base32秘密鍵対応。",
    category: "security",
    icon: "🔢",
  },
  {
    slug: "bcrypt",
    title: "Bcrypt Hasher / Verifier",
    description:
      "パスワード保存の定番 bcrypt をブラウザで生成・検証。コストファクター調整、ソルト自動生成、ハッシュ照合、計算時間の体感に。",
    category: "security",
    icon: "🧂",
  },
];
