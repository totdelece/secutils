import { articles, type Article } from "./articles";
import { tools, type Tool, type ToolCategory } from "./tools";

export const RECENT_STORAGE_KEY = "secutils:recent";
export const FAVORITE_TOOLS_STORAGE_KEY = "secutils:favorite-tools";
export const RECENT_MAX = 8;

export type WorkspaceTool = Tool & {
  href: string;
};

export const popularToolSlugs = [
  "jwt-decoder",
  "json-formatter",
  "base64",
  "url-encoder",
  "password-generator",
  "hash-generator",
  "cidr-calculator",
  "regex-tester",
];

export const relatedToolSlugs: Record<string, string[]> = {
  "jwt-decoder": ["base64", "json-formatter", "url-encoder", "hmac"],
  base64: ["jwt-decoder", "url-encoder", "json-formatter", "html-entity"],
  "json-formatter": ["json-yaml", "base64", "jwt-decoder", "diff-viewer"],
  "url-encoder": ["base64", "html-entity", "jwt-decoder", "qr-code"],
  "password-generator": ["bcrypt", "hash-generator", "uuid-generator", "totp"],
  "hash-generator": ["hmac", "sri-hash", "bcrypt", "password-generator"],
  "sri-hash": ["hash-generator", "security-headers", "hmac", "cookie-parser"],
  hmac: ["hash-generator", "jwt-decoder", "base64", "json-formatter"],
  bcrypt: ["password-generator", "hash-generator", "hmac", "totp"],
  totp: ["qr-code", "jwt-decoder", "base64", "password-generator"],
  "cookie-parser": ["security-headers", "jwt-decoder", "http-status", "html-entity"],
  "security-headers": ["cookie-parser", "sri-hash", "http-status", "html-entity"],
  "exif-viewer": ["hash-generator", "security-headers", "qr-code", "color-converter"],
  "mock-json-generator": ["json-formatter", "json-yaml", "uuid-generator", "lorem-ipsum"],
  "html-entity": ["url-encoder", "json-formatter", "cookie-parser", "regex-tester"],
  "cidr-calculator": ["ip-converter", "http-status", "port-reference", "regex-tester"],
  "ip-converter": ["cidr-calculator", "port-reference", "http-status", "url-encoder"],
  "http-status": ["port-reference", "security-headers", "cookie-parser", "cidr-calculator"],
  "port-reference": ["http-status", "cidr-calculator", "ip-converter", "security-headers"],
  "uuid-generator": ["timestamp-converter", "password-generator", "json-formatter", "qr-code"],
  "regex-tester": ["diff-viewer", "json-formatter", "html-entity", "url-encoder"],
  "timestamp-converter": ["uuid-generator", "json-formatter", "cron-parser", "diff-viewer"],
  "diff-viewer": ["json-formatter", "json-yaml", "regex-tester", "hash-generator"],
  "qr-code": ["url-encoder", "totp", "base64", "uuid-generator"],
  "json-yaml": ["json-formatter", "diff-viewer", "base64", "regex-tester"],
  "cron-parser": ["timestamp-converter", "regex-tester", "json-formatter", "diff-viewer"],
  "color-converter": ["json-formatter", "diff-viewer", "regex-tester", "qr-code"],
};

export const shortcutActions: Record<
  string,
  { label: string; href: string; hint: string }[]
> = {
  "jwt-decoder": [
    { label: "Base64を確認", href: "/tools/base64", hint: "Header/Payloadの中身" },
    { label: "JSON整形", href: "/tools/json-formatter", hint: "Payloadを読みやすく" },
    { label: "HMAC署名", href: "/tools/hmac", hint: "HS256の検証補助" },
  ],
  base64: [
    { label: "JWTへ移動", href: "/tools/jwt-decoder", hint: "Base64URLトークンを読む" },
    { label: "URL変換", href: "/tools/url-encoder", hint: "URL-safe値を確認" },
    { label: "JSON整形", href: "/tools/json-formatter", hint: "デコード後を整える" },
  ],
  "json-formatter": [
    { label: "YAML変換", href: "/tools/json-yaml", hint: "設定形式を変換" },
    { label: "差分比較", href: "/tools/diff-viewer", hint: "整形前後を確認" },
    { label: "JWTへ移動", href: "/tools/jwt-decoder", hint: "Payload調査" },
  ],
  "url-encoder": [
    { label: "Base64変換", href: "/tools/base64", hint: "トークン値を確認" },
    { label: "QR作成", href: "/tools/qr-code", hint: "URL共有" },
    { label: "HTML Entity", href: "/tools/html-entity", hint: "表示文字を確認" },
  ],
};

export function toolHref(slug: string) {
  return `/tools/${slug}`;
}

export function entryIdForTool(slug: string) {
  return `tool:${slug}`;
}

export function resolveTool(slug: string): WorkspaceTool | undefined {
  const tool = tools.find((item) => item.slug === slug);
  return tool ? { ...tool, href: toolHref(tool.slug) } : undefined;
}

export function resolveTools(slugs: string[]): WorkspaceTool[] {
  return slugs
    .map((slug) => resolveTool(slug))
    .filter((tool): tool is WorkspaceTool => Boolean(tool));
}

export function getPopularTools(): WorkspaceTool[] {
  return resolveTools(popularToolSlugs);
}

export function getRelatedTools(slug: string): WorkspaceTool[] {
  const explicit = relatedToolSlugs[slug] ?? [];
  const current = resolveTool(slug);
  const fallback = current
    ? tools
        .filter((tool) => tool.category === current.category && tool.slug !== slug)
        .map((tool) => tool.slug)
    : [];
  return resolveTools([...explicit, ...fallback]).slice(0, 5);
}

// ツール → 解説記事のフォールバック。明示の relatedTools が無い／少ない
// ツールでも Learn へ自然に橋渡しできるよう、関連の深い記事を手当てする。
const toolArticleFallback: Record<string, string[]> = {
  "password-generator": ["password-strength", "password-hashing", "secure-randomness"],
  "hash-generator": ["password-hashing", "public-key-crypto", "https-tls"],
  "sri-hash": ["supply-chain-attacks", "http-security-headers"],
  "jwt-decoder": ["jwt-security-issues", "session-vs-jwt", "oauth-oidc"],
  hmac: ["public-key-crypto", "jwt-security-issues", "https-tls"],
  bcrypt: ["password-hashing", "password-strength", "secure-randomness"],
  totp: ["mfa-totp-fido2", "oauth-oidc", "jwt-security-issues"],
  "cookie-parser": ["csrf", "session-vs-jwt", "http-security-headers"],
  "security-headers": ["http-security-headers", "clickjacking", "csrf"],
  base64: ["jwt-security-issues", "public-key-crypto"],
  "url-encoder": ["xss", "path-traversal", "ssrf"],
  "html-entity": ["xss", "csrf", "http-security-headers"],
  "json-formatter": ["http-security-headers", "owasp-top-10"],
  "json-yaml": ["http-security-headers", "supply-chain-attacks"],
  "regex-tester": ["xss", "sql-injection"],
  "diff-viewer": ["owasp-top-10", "supply-chain-attacks"],
  "cidr-calculator": ["cidr-notation", "ipv4-vs-ipv6", "nat-port-forwarding"],
  "ip-converter": ["ipv4-vs-ipv6", "ssrf", "cidr-notation"],
  "http-status": ["http-security-headers", "http-versions", "cors-same-origin"],
  "port-reference": ["nat-port-forwarding", "ipv4-vs-ipv6", "http-security-headers"],
  "uuid-generator": ["secure-randomness", "public-key-crypto"],
  "ulid-generator": ["secure-randomness"],
  "timestamp-converter": ["jwt-security-issues", "session-vs-jwt"],
  "qr-code": ["quishing", "mfa-totp-fido2"],
};

// ツールページ下部に出す「関連解説記事」。明示の relatedTools を優先し、
// 足りなければフォールバックで補完して最大 limit 件返す。
export function getToolArticles(slug: string, limit = 4): Article[] {
  const explicit = articles.filter((article) =>
    article.relatedTools?.includes(slug),
  );
  const fallback = (toolArticleFallback[slug] ?? [])
    .map((s) => articles.find((article) => article.slug === s))
    .filter((article): article is Article => Boolean(article));

  const merged: Article[] = [];
  for (const article of [...explicit, ...fallback]) {
    if (!merged.some((m) => m.slug === article.slug)) merged.push(article);
  }
  return merged.slice(0, limit);
}

export function toolsByCategory(): Record<ToolCategory, WorkspaceTool[]> {
  return tools.reduce<Record<ToolCategory, WorkspaceTool[]>>(
    (acc, tool) => {
      acc[tool.category].push({ ...tool, href: toolHref(tool.slug) });
      return acc;
    },
    {
      security: [],
      encoding: [],
      network: [],
      misc: [],
    } satisfies Record<ToolCategory, WorkspaceTool[]>,
  );
}
