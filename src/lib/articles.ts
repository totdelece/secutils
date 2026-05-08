export type ArticleCategory = "security" | "network";

export const articleCategoryLabels: Record<ArticleCategory, string> = {
  security: "セキュリティ",
  network: "ネットワーク",
};

export type Article = {
  slug: string;
  category: ArticleCategory;
  title: string;
  description: string;
  date: string; // ISO 8601 日付
  readingMinutes: number;
  /** 関連ツールの slug（src/lib/tools.ts と一致） */
  relatedTools?: string[];
};

export const articles: Article[] = [
  {
    slug: "jwt-security-issues",
    category: "security",
    title: "JWT のよくあるセキュリティ問題",
    description:
      "JWT は便利だが落とし穴も多い。alg=none攻撃、アルゴリズム混同、弱い秘密鍵、Payloadの過信など、実務で遭遇する典型問題を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: ["jwt-decoder", "hmac"],
  },
  {
    slug: "password-strength",
    category: "security",
    title: "パスワード強度はどう決まるか - エントロピーと総当たり攻撃",
    description:
      "「16文字以上」と言われる根拠は？ エントロピー(bit)の意味、総当たり攻撃の所要時間、パスフレーズが強い理由を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 5,
    relatedTools: ["password-generator"],
  },
  {
    slug: "cidr-notation",
    category: "network",
    title: "CIDR 記法の読み方と仕組み",
    description:
      "「/24」とは何を意味するのか。サブネットマスクとの関係、ホスト数の計算方法、なぜ /31 が特別なのかを初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 5,
    relatedTools: ["cidr-calculator"],
  },
  {
    slug: "tcp-vs-udp",
    category: "network",
    title: "TCP と UDP の違い - 信頼性 vs 速度のトレードオフ",
    description:
      "L4 プロトコルの代表 TCP と UDP は何が違うのか。コネクション、再送、順序保証、用途別の選び方（HTTP/DNS/動画/ゲーム）を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "dns-basics",
    category: "network",
    title: "DNS の仕組みと名前解決の流れ",
    description:
      "ブラウザに URL を入れてから IP アドレスが解決されるまで。ルート/TLD/権威/フルリゾルバ・キャッシュ・代表的レコード（A/AAAA/MX/CNAME/TXT）を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "https-tls",
    category: "network",
    title: "HTTPS と TLS の仕組み - 暗号化と認証の基本",
    description:
      "HTTP と HTTPS の違い、TLS ハンドシェイクで何をしているか、証明書がなぜ信頼できるのか、HSTS / 中間者攻撃の話まで初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 7,
    relatedTools: ["hmac"],
  },
  {
    slug: "osi-tcpip-model",
    category: "network",
    title: "OSI参照モデルと TCP/IP モデル - L1 から L7 まで",
    description:
      "ネットワーク学習の入口となる OSI 7 層モデルと、実際に使われる TCP/IP 4 層モデル。各層の役割とプロトコル例（Ethernet / IP / TCP / HTTP）を初学者向けに整理。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "port-numbers",
    category: "network",
    title: "ポート番号の話 - well-known / registered / dynamic",
    description:
      "ポート番号とは何か、80・443・22 はなぜ決まっているのか。0-65535 の範囲、IANA の3区分、よく使われるポート一覧、ポートスキャンの基本を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 5,
    relatedTools: [],
  },
  {
    slug: "nat-port-forwarding",
    category: "network",
    title: "NAT とポートフォワーディング - 家庭ルーターから理解する",
    description:
      "なぜ家庭の PC 全部から外に出られるのか。NAT / NAPT の仕組み、ポートフォワーディング、CGNAT、IPv6 で NAT が要らない理由を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: ["cidr-calculator"],
  },
  {
    slug: "icmp-ping-traceroute",
    category: "network",
    title: "ICMP / ping / traceroute - ネットワーク調査の基本",
    description:
      "「サーバーに繋がらない」を切り分けるための基本3点セット。ICMP プロトコルとは何か、ping と traceroute の仕組み、結果の読み方、パケット落とされたときの判断材料を初学者向けに解説。",
    date: "2026-05-02",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "mac-arp",
    category: "network",
    title: "MAC アドレスと ARP の仕組み - L2 で何が起きているのか",
    description:
      "IP アドレスだけではパケットは届かない？ Ethernet/Wi-Fi で必要な MAC アドレスと、IP→MAC を解決する ARP の動き、ARP スプーフィングの危険性まで初学者向けに解説。",
    date: "2026-05-03",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "http-versions",
    category: "network",
    title: "HTTP/1.1 / HTTP/2 / HTTP/3 の違い - Web の進化を追う",
    description:
      "なぜ HTTP に複数バージョンが存在するのか。Keep-Alive、多重化、ヘッダー圧縮、Head-of-Line Blocking、QUIC ベースの HTTP/3 まで、各バージョンの改善点を初学者向けに解説。",
    date: "2026-05-03",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "vpn-basics",
    category: "network",
    title: "VPN の仕組み - トンネルと暗号化の基本",
    description:
      "VPN とは何か、なぜ「会社のネットワークに繋がる」「IP アドレスを変えられる」が両立するのか。IPsec / OpenVPN / WireGuard の違い、ゼロトラスト時代の VPN 観も含めて初学者向けに解説。",
    date: "2026-05-03",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "ipv4-vs-ipv6",
    category: "network",
    title: "IPv4 と IPv6 の違い - アドレス枯渇と次世代インターネット",
    description:
      "IPv4 が枯渇したから IPv6 へ、と聞くが何が違うのか。アドレス長、表記法、グローバル前提の設計、NAT 不要、自動構成（SLAAC）など初学者向けに解説。",
    date: "2026-05-03",
    readingMinutes: 6,
    relatedTools: ["cidr-calculator"],
  },
  {
    slug: "firewall-basics",
    category: "network",
    title: "ファイアウォールの基本 - パケットフィルタからWAFまで",
    description:
      "ステートレス / ステートフル / アプリケーション層の3世代。L3-L4 ACL、L7 WAF、ホストベース vs ネットワークベースの違い、クラウド時代のセキュリティグループまで初学者向けに解説。",
    date: "2026-05-03",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "dhcp-basics",
    category: "network",
    title: "DHCP の仕組み - IP アドレス自動割当の DORA 4ステップ",
    description:
      "PC を Wi-Fi に繋ぐと自動で IP アドレスが割り振られる仕組み。Discover / Offer / Request / Ack の 4 ステップ、リース期間、ローグ DHCP の脅威まで初学者向けに解説。",
    date: "2026-05-03",
    readingMinutes: 6,
    relatedTools: [],
  },
  {
    slug: "xss",
    category: "security",
    title: "XSS（クロスサイトスクリプティング）の基礎と防御",
    description:
      "Web アプリの定番脆弱性 XSS を初学者向けに解説。Reflected / Stored / DOM-based の3種、HTMLエスケープと CSP による多層防御、よくある誤解（input サニタイズ）まで。",
    date: "2026-05-08",
    readingMinutes: 7,
    relatedTools: ["html-entity"],
  },
  {
    slug: "csrf",
    category: "security",
    title: "CSRF（クロスサイトリクエストフォージェリ）の仕組みと対策",
    description:
      "ログイン中のユーザーを罠サイト経由で意図しない操作に巻き込む CSRF。XSS との違い、SameSite Cookie / CSRF トークン / Origin チェックなど現代的防御を初学者向けに解説。",
    date: "2026-05-08",
    readingMinutes: 6,
    relatedTools: ["cookie-parser"],
  },
  {
    slug: "owasp-top-10",
    category: "security",
    title: "OWASP Top 10 入門 - Web アプリの主要リスク10選",
    description:
      "Web セキュリティの世界標準ガイドライン OWASP Top 10（2021）を初学者向けに俯瞰。アクセス制御不備、暗号化失敗、インジェクション、識別認証不備など、10カテゴリの要点と実例。",
    date: "2026-05-08",
    readingMinutes: 9,
    relatedTools: ["jwt-decoder", "password-generator", "html-entity", "cookie-parser"],
  },
  {
    slug: "sql-injection",
    category: "security",
    title: "SQL インジェクション入門 - 文字列連結という根本原因",
    description:
      "Web脆弱性の代表格 SQLi を初学者向けに解説。なぜ起きるのか、典型的な攻撃パターン（認証回避・UNION・Blind）、プリペアドステートメントによる根本対策、ORM 利用時の注意点まで。",
    date: "2026-05-08",
    readingMinutes: 7,
    relatedTools: [],
  },
  {
    slug: "mfa-totp-fido2",
    category: "security",
    title: "多要素認証（MFA）入門 - SMS / TOTP / FIDO2 / Passkey の違い",
    description:
      "「2段階認証」と一括りにされがちな MFA の中身を初学者向けに解説。SMS の弱点、TOTP（Google Authenticator）の仕組み、FIDO2/WebAuthn と Passkey の関係、フィッシング耐性の差を整理。",
    date: "2026-05-08",
    readingMinutes: 8,
    relatedTools: ["totp"],
  },
  {
    slug: "password-hashing",
    category: "security",
    title: "パスワードハッシュ関数の選び方 - bcrypt / scrypt / Argon2",
    description:
      "「SHA-256 で保存」が間違いである理由から、bcrypt / scrypt / Argon2 の選び方まで。レインボーテーブル、ソルト、ペッパー、コストファクター、メモリハード関数の意義を初学者向けに解説。",
    date: "2026-05-08",
    readingMinutes: 8,
    relatedTools: ["bcrypt", "hash-generator"],
  },
  {
    slug: "cors-same-origin",
    category: "security",
    title: "CORS と Same-Origin Policy 入門 - なぜブラウザに弾かれるのか",
    description:
      "「Access-Control-Allow-Origin が無い」エラーで詰まる初学者向けに、Same-Origin Policy の歴史、なぜ存在するのか、CORS でどう穴を開けるのか、プリフライト・credentials・ワイルドカード制限まで実装目線で解説。",
    date: "2026-05-08",
    readingMinutes: 8,
    relatedTools: ["http-status", "cookie-parser"],
  },
  {
    slug: "session-vs-jwt",
    category: "security",
    title: "セッション認証 vs JWT 認証 - どちらを選ぶべきか",
    description:
      "Web認証の二大方式を初学者向けに比較。サーバ状態 vs ステートレス、Cookie vs localStorage、トークンの失効、リフレッシュトークン、サイズ、CSRF/XSS耐性の違いを実務目線で整理。",
    date: "2026-05-08",
    readingMinutes: 9,
    relatedTools: ["jwt-decoder", "cookie-parser"],
  },
  {
    slug: "public-key-crypto",
    category: "security",
    title: "公開鍵暗号の基本 - RSA / ECDSA / 鍵交換のしくみ",
    description:
      "「公開鍵」と「秘密鍵」が結局何なのか、初学者向けに整理。共通鍵暗号との違い、デジタル署名、RSA/ECDSA/Ed25519 の使い分け、Diffie-Hellman 鍵交換、量子耐性まで。",
    date: "2026-05-08",
    readingMinutes: 9,
    relatedTools: ["jwt-decoder", "hmac"],
  },
  {
    slug: "oauth-oidc",
    category: "security",
    title: "OAuth 2.0 と OpenID Connect 入門 - 認可と認証の違い",
    description:
      "「Google でログイン」の裏側を初学者向けに解説。OAuth 2.0 が解く問題、Authorization Code フロー、PKCE、OpenID Connect で認証が乗っかる仕組み、ID トークンと access トークンの違いまで。",
    date: "2026-05-08",
    readingMinutes: 9,
    relatedTools: ["jwt-decoder"],
  },
  {
    slug: "http-security-headers",
    category: "security",
    title: "HTTP セキュリティヘッダ詳解 - CSP / HSTS / X-Frame-Options",
    description:
      "Webサイトを多層防御するレスポンスヘッダ群を初学者向けに解説。Content-Security-Policy / HSTS / X-Frame-Options / Permissions-Policy 等の役割と推奨値、本サイト自身の実装例も含めて整理。",
    date: "2026-05-08",
    readingMinutes: 9,
    relatedTools: ["http-status", "cookie-parser"],
  },
  {
    slug: "secure-randomness",
    category: "security",
    title: "安全な乱数とは - Math.random の罠と CSPRNG",
    description:
      "「乱数」と一括りにされがちな疑似乱数（PRNG）と暗号学的乱数（CSPRNG）の違いを初学者向けに解説。Math.random で起きる事故、crypto.getRandomValues / randomUUID の使い方、modulo bias の回避まで。",
    date: "2026-05-08",
    readingMinutes: 7,
    relatedTools: ["password-generator", "uuid-generator"],
  },
];

export function getArticle(
  category: ArticleCategory,
  slug: string,
): Article | undefined {
  return articles.find((a) => a.category === category && a.slug === slug);
}

export function getRelatedArticles(toolSlug: string): Article[] {
  return articles.filter((a) => a.relatedTools?.includes(toolSlug));
}
