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
];
