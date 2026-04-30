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
];
