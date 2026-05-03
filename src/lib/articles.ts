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
