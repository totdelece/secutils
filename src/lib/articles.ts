export type ArticleCategory = "security" | "network";

export const articleCategoryLabels: Record<ArticleCategory, string> = {
  security: "Security",
  network: "Network",
};

export type Article = {
  slug: string;
  category: ArticleCategory;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  relatedTools?: string[];
  affiliate?: boolean;
};

export const articles: Article[] = [
  {
    slug: "jwt-security-issues",
    category: "security",
    title: "JWT のよくあるセキュリティ問題",
    description:
      "alg=none、アルゴリズム混同、弱い秘密鍵、payloadの過信など、JWTで起きがちな事故を実務目線で整理します。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: ["jwt-decoder", "hmac"],
  },
  {
    slug: "password-strength",
    category: "security",
    title: "パスワード強度はどう決まるか",
    description:
      "文字数だけではなく、エントロピー、総当たり時間、パスフレーズの考え方から安全なパスワードを説明します。",
    date: "2026-05-02",
    readingMinutes: 5,
    relatedTools: ["password-generator"],
  },
  {
    slug: "xss",
    category: "security",
    title: "XSS の基本と防ぎ方",
    description:
      "Reflected / Stored / DOM XSS の違い、出力エスケープ、CSP、危険な実装パターンを整理します。",
    date: "2026-05-08",
    readingMinutes: 8,
    relatedTools: ["html-entity"],
  },
  {
    slug: "csrf",
    category: "security",
    title: "CSRF の仕組みと対策",
    description:
      "SameSite Cookie、CSRFトークン、Origin検証を中心に、ログイン済みユーザーを狙う攻撃を理解します。",
    date: "2026-05-08",
    readingMinutes: 7,
    relatedTools: ["cookie-parser"],
  },
  {
    slug: "sql-injection",
    category: "security",
    title: "SQLインジェクション入門",
    description:
      "文字列連結が危険な理由、プレースホルダ、ORM利用時の注意点、Blind SQLi の考え方を解説します。",
    date: "2026-05-08",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "owasp-top-10",
    category: "security",
    title: "OWASP Top 10 入門",
    description:
      "Webアプリの代表的なリスクを、A01からA10まで実装者が押さえるべき観点で読み解きます。",
    date: "2026-05-08",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "mfa-totp-fido2",
    category: "security",
    title: "MFA、TOTP、FIDO2、Passkey の違い",
    description:
      "多要素認証の方式ごとの強み、フィッシング耐性、復旧手段を比較して選び方を整理します。",
    date: "2026-05-08",
    readingMinutes: 7,
    relatedTools: ["totp"],
  },
  {
    slug: "password-hashing",
    category: "security",
    title: "パスワードハッシュの選び方",
    description:
      "平文保存が危険な理由、salt、pepper、bcrypt / scrypt / Argon2 の位置づけを説明します。",
    date: "2026-05-08",
    readingMinutes: 7,
    relatedTools: ["bcrypt", "hash-generator"],
  },
  {
    slug: "cors-same-origin",
    category: "security",
    title: "CORS と Same-Origin Policy",
    description:
      "ブラウザの同一オリジン制約、プリフライト、credentials、危険なCORS設定を整理します。",
    date: "2026-05-08",
    readingMinutes: 8,
    relatedTools: [],
  },
  {
    slug: "session-vs-jwt",
    category: "security",
    title: "セッション認証とJWT認証の違い",
    description:
      "保存場所、失効、リフレッシュトークン、用途別の選び方を比較します。",
    date: "2026-05-08",
    readingMinutes: 7,
    relatedTools: ["jwt-decoder", "cookie-parser"],
  },
  {
    slug: "public-key-crypto",
    category: "security",
    title: "公開鍵暗号の基本",
    description:
      "RSA、ECDSA、Ed25519、鍵交換、署名、証明書の役割を開発者向けに整理します。",
    date: "2026-05-08",
    readingMinutes: 8,
    relatedTools: ["hmac"],
  },
  {
    slug: "oauth-oidc",
    category: "security",
    title: "OAuth 2.0 と OpenID Connect 入門",
    description:
      "認可と認証の違い、Authorization Code + PKCE、id_token と access_token の役割を説明します。",
    date: "2026-05-08",
    readingMinutes: 8,
    relatedTools: ["jwt-decoder"],
  },
  {
    slug: "http-security-headers",
    category: "security",
    title: "HTTPセキュリティヘッダー詳解",
    description:
      "CSP、HSTS、X-Frame-Options、Permissions-Policy など、ブラウザ防御に効くヘッダーを整理します。",
    date: "2026-05-08",
    readingMinutes: 8,
    relatedTools: ["http-status"],
  },
  {
    slug: "secure-randomness",
    category: "security",
    title: "安全な乱数の基本",
    description:
      "CSPRNG と Math.random の違い、modulo bias、rejection sampling を実装者視点で説明します。",
    date: "2026-05-08",
    readingMinutes: 6,
    relatedTools: ["password-generator", "uuid-generator"],
  },
  {
    slug: "cidr-notation",
    category: "network",
    title: "CIDR記法の読み方と仕組み",
    description:
      "/24 の意味、サブネットマスク、ホスト数、/31 の扱いなどをネットワーク初学者向けに解説します。",
    date: "2026-05-02",
    readingMinutes: 5,
    relatedTools: ["cidr-calculator"],
  },
  {
    slug: "tcp-vs-udp",
    category: "network",
    title: "TCP と UDP の違い",
    description:
      "信頼性と速度のトレードオフ、HTTP、DNS、動画配信、QUICなど用途別の選び方を説明します。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "dns-basics",
    category: "network",
    title: "DNSの仕組みと名前解決の流れ",
    description:
      "ブラウザにURLを入力してからIPアドレスが見つかるまでを、レコード種別とキャッシュ込みで追います。",
    date: "2026-05-02",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "https-tls",
    category: "network",
    title: "HTTPS と TLS の仕組み",
    description:
      "TLSハンドシェイク、証明書チェーン、HSTS、MITM対策など、HTTPSの基本を整理します。",
    date: "2026-05-02",
    readingMinutes: 7,
    relatedTools: ["hmac"],
  },
  {
    slug: "osi-tcpip-model",
    category: "network",
    title: "OSI参照モデルとTCP/IPモデル",
    description:
      "L1からL7までの役割、カプセル化、代表プロトコル、障害切り分けへの使い方を説明します。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "port-numbers",
    category: "network",
    title: "ポート番号の基本",
    description:
      "well-known、registered、dynamic/private の違いと、80、443、22など代表的な番号を整理します。",
    date: "2026-05-02",
    readingMinutes: 5,
    relatedTools: [],
  },
  {
    slug: "nat-port-forwarding",
    category: "network",
    title: "NAT とポートフォワーディング",
    description:
      "家庭用ルーターで何が起きているか、NAPT、UPnP、CGNAT、IPv6との関係を説明します。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: ["cidr-calculator"],
  },
  {
    slug: "icmp-ping-traceroute",
    category: "network",
    title: "ICMP / ping / traceroute の基本",
    description:
      "疎通確認、TTL、経路調査、パケットロスの読み方など、ネットワーク調査の入口を説明します。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "mac-arp",
    category: "network",
    title: "MACアドレスとARPの仕組み",
    description:
      "L2でパケットが届く仕組み、ARP Request/Reply、ARP spoofing、IPv6のNDPとの違いを整理します。",
    date: "2026-05-03",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "http-versions",
    category: "network",
    title: "HTTP/1.1、HTTP/2、HTTP/3 の違い",
    description:
      "Keep-Alive、多重化、Head-of-Line Blocking、QUICなど、Web通信の進化を比較します。",
    date: "2026-05-03",
    readingMinutes: 7,
    relatedTools: ["http-status"],
  },
  {
    slug: "vpn-basics",
    category: "network",
    title: "VPNの仕組み",
    description:
      "IPsec、OpenVPN、WireGuard、リモートアクセス、プライバシー面の誤解を整理します。",
    date: "2026-05-03",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "ipv4-vs-ipv6",
    category: "network",
    title: "IPv4 と IPv6 の違い",
    description:
      "アドレス長、表記、SLAAC、NDP、デュアルスタック、NAT不要という設計思想を解説します。",
    date: "2026-05-03",
    readingMinutes: 6,
    relatedTools: ["cidr-calculator"],
  },
  {
    slug: "firewall-basics",
    category: "network",
    title: "ファイアウォールの基本",
    description:
      "ステートレス、ステートフル、L7、WAF、クラウドのセキュリティグループまで整理します。",
    date: "2026-05-03",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "dhcp-basics",
    category: "network",
    title: "DHCP の仕組み",
    description:
      "Discover / Offer / Request / Ack の流れ、リース、DHCPリレー、トラブルシュートを説明します。",
    date: "2026-05-03",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "xserver-vs-conoha-wing",
    category: "network",
    title: "エックスサーバー vs ConoHa WING 比較",
    description:
      "個人サイトやブログ向けに、料金、速度、使いやすさ、サポート、向いている人を比較します。",
    date: "2026-05-08",
    readingMinutes: 10,
    relatedTools: [],
    affiliate: true,
  },
];

export function getArticle(
  category: ArticleCategory,
  slug: string,
): Article | undefined {
  return articles.find((article) => article.category === category && article.slug === slug);
}

export function getRelatedArticles(toolSlug: string): Article[] {
  return articles.filter((article) => article.relatedTools?.includes(toolSlug));
}
