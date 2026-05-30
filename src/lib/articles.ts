import type { Metadata } from "next";

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

type ArticleSeo = {
  title: string;
  description: string;
};

const articleSeo: Record<string, ArticleSeo> = {
  "jwt-security-issues": {
    title: "JWT の脆弱性とセキュリティ問題 - alg=none・署名検証・弱い秘密鍵の対策",
    description:
      "JWTの代表的な脆弱性を日本語で解説。alg=none、アルゴリズム混同、署名検証漏れ、弱い秘密鍵、payloadの過信など、開発者が実装時に確認すべき対策を整理します。",
  },
  "password-strength": {
    title: "パスワード強度の考え方 - エントロピー・総当たり時間・安全な作り方",
    description:
      "パスワード強度を文字数、文字種、エントロピー、総当たり時間から解説。安全なパスフレーズやパスワード生成の考え方を開発者向けに整理します。",
  },
  xss: {
    title: "XSS の仕組みと対策 - Reflected・Stored・DOM XSS の防ぎ方",
    description:
      "XSSの種類、攻撃例、出力エスケープ、CSP、DOM操作の注意点を日本語で解説。Webアプリ開発で必要なクロスサイトスクリプティング対策を整理します。",
  },
  csrf: {
    title: "CSRF の仕組みと対策 - SameSite Cookie・CSRFトークン・Origin検証",
    description:
      "CSRF攻撃の流れと防ぎ方を解説。SameSite Cookie、CSRFトークン、Origin/Referer検証、API設計時の注意点を実装者向けに整理します。",
  },
  "sql-injection": {
    title: "SQLインジェクション入門 - 原因・攻撃例・プレースホルダによる対策",
    description:
      "SQLインジェクションが起きる理由、文字列連結の危険性、Blind SQLi、プレースホルダ、ORM利用時の注意点を開発者向けに解説します。",
  },
  "owasp-top-10": {
    title: "OWASP Top 10 入門 - Webアプリの主要セキュリティリスクを解説",
    description:
      "OWASP Top 10の各リスクを日本語で整理。アクセス制御、暗号化、インジェクション、認証、設定ミスなど、開発者が押さえるべきWebセキュリティの基本を解説します。",
  },
  "mfa-totp-fido2": {
    title: "MFA・TOTP・FIDO2・Passkey の違い - 多要素認証の選び方",
    description:
      "MFA、TOTP、FIDO2、Passkeyの違いを比較。フィッシング耐性、運用負荷、復旧手段、認証方式の選び方を開発者向けに整理します。",
  },
  "password-hashing": {
    title: "パスワードハッシュの選び方 - bcrypt・scrypt・Argon2・salt の基本",
    description:
      "パスワード保存で必要なハッシュ化、salt、pepper、bcrypt、scrypt、Argon2の違いを解説。平文保存を避けるための実装判断を整理します。",
  },
  "cors-same-origin": {
    title: "CORS と Same-Origin Policy の違い - プリフライトと安全な設定",
    description:
      "ブラウザのSame-Origin Policy、CORS、プリフライト、credentials、Access-Control-Allow-Originの危険な設定例を日本語で解説します。",
  },
  "session-vs-jwt": {
    title: "セッション認証とJWT認証の違い - Cookie・失効・保存場所の比較",
    description:
      "セッション認証とJWT認証を比較。Cookie保存、トークン失効、リフレッシュトークン、サーバー管理、用途別の選び方を開発者向けに解説します。",
  },
  "public-key-crypto": {
    title: "公開鍵暗号の基本 - RSA・ECDSA・Ed25519・署名・鍵交換を解説",
    description:
      "公開鍵暗号の仕組み、RSA、ECDSA、Ed25519、鍵交換、電子署名、証明書の役割を開発者向けに日本語で整理します。",
  },
  "oauth-oidc": {
    title: "OAuth 2.0 と OpenID Connect 入門 - 認可・認証・PKCE の違い",
    description:
      "OAuth 2.0とOpenID Connectの違い、Authorization Code Flow、PKCE、id_token、access_tokenの役割を実装者向けに解説します。",
  },
  "http-security-headers": {
    title: "HTTPセキュリティヘッダー詳解 - CSP・HSTS・X-Frame-Options の設定",
    description:
      "CSP、HSTS、X-Frame-Options、Permissions-Policy、Referrer-Policyなど、Webアプリを守るHTTPセキュリティヘッダーを解説します。",
  },
  "secure-randomness": {
    title: "安全な乱数の基本 - CSPRNG・Math.random・modulo bias の違い",
    description:
      "暗号学的に安全な乱数、CSPRNG、Math.randomの危険性、modulo bias、rejection samplingを開発者向けに解説します。",
  },
  "cidr-notation": {
    title: "CIDR記法の読み方 - /24・サブネットマスク・ホスト数の計算",
    description:
      "CIDR記法、/24の意味、サブネットマスク、ネットワークアドレス、ブロードキャスト、ホスト数の計算方法を初心者向けに解説します。",
  },
  "tcp-vs-udp": {
    title: "TCP と UDP の違い - 信頼性・速度・用途別の使い分け",
    description:
      "TCPとUDPの違いを、信頼性、速度、再送制御、順序保証、HTTP、DNS、動画配信、QUICなどの用途からわかりやすく比較します。",
  },
  "dns-basics": {
    title: "DNSの仕組み - 名前解決の流れ・レコード種別・キャッシュを解説",
    description:
      "DNSの名前解決の流れ、A/AAAA/CNAME/MX/TXTレコード、リゾルバ、権威DNS、キャッシュ、TTLを初心者向けに解説します。",
  },
  "https-tls": {
    title: "HTTPS と TLS の仕組み - 証明書・暗号化・ハンドシェイクを解説",
    description:
      "HTTPSとTLSの仕組み、TLSハンドシェイク、証明書チェーン、暗号化、HSTS、MITM対策を開発者向けに日本語で整理します。",
  },
  "osi-tcpip-model": {
    title: "OSI参照モデルとTCP/IPモデル - 7階層・4階層・プロトコルの違い",
    description:
      "OSI参照モデルとTCP/IPモデルの違い、L1からL7の役割、カプセル化、代表プロトコル、障害切り分けへの使い方を解説します。",
  },
  "port-numbers": {
    title: "ポート番号の基本 - 80・443・22・well-known port の意味",
    description:
      "ポート番号の役割、well-known、registered、dynamic/privateの違い、HTTP 80、HTTPS 443、SSH 22など代表的な番号を解説します。",
  },
  "nat-port-forwarding": {
    title: "NAT とポートフォワーディングの仕組み - NAPT・UPnP・CGNAT を解説",
    description:
      "NAT、NAPT、ポートフォワーディング、UPnP、CGNAT、IPv6との関係を初心者向けに整理。家庭用ルーターで何が起きるかを解説します。",
  },
  "icmp-ping-traceroute": {
    title: "ICMP・ping・traceroute の基本 - 疎通確認と経路調査の読み方",
    description:
      "ICMP、ping、tracerouteの仕組み、TTL、パケットロス、遅延、経路調査の読み方をネットワーク調査の入口として解説します。",
  },
  "mac-arp": {
    title: "MACアドレスとARPの仕組み - L2通信・ARP Request・ARP spoofing",
    description:
      "MACアドレス、ARP Request/Reply、L2通信、ARPテーブル、ARP spoofing、IPv6のNDPとの違いを初心者向けに整理します。",
  },
  "http-versions": {
    title: "HTTP/1.1・HTTP/2・HTTP/3 の違い - 多重化・QUIC・通信性能を比較",
    description:
      "HTTP/1.1、HTTP/2、HTTP/3の違いを比較。Keep-Alive、多重化、Head-of-Line Blocking、QUIC、TLSとの関係を解説します。",
  },
  "vpn-basics": {
    title: "VPNの仕組み - IPsec・OpenVPN・WireGuard・プライバシーの基本",
    description:
      "VPNの仕組み、IPsec、OpenVPN、WireGuard、リモートアクセス、通信暗号化、プライバシー面の誤解を初心者向けに解説します。",
  },
  "ipv4-vs-ipv6": {
    title: "IPv4 と IPv6 の違い - アドレス表記・NAT・SLAAC・NDPを比較",
    description:
      "IPv4とIPv6の違いを、アドレス長、表記、NAT、SLAAC、NDP、デュアルスタック、移行方式からわかりやすく解説します。",
  },
  "firewall-basics": {
    title: "ファイアウォールの基本 - ステートフル・WAF・セキュリティグループ",
    description:
      "ファイアウォールの種類、ステートレス、ステートフル、L7、WAF、クラウドのセキュリティグループまで、通信制御の基本を解説します。",
  },
  "dhcp-basics": {
    title: "DHCP の仕組み - Discover・Offer・Request・Ack とIP自動割り当て",
    description:
      "DHCPの仕組み、DORA、IPアドレスの自動割り当て、リース、DHCPリレー、トラブルシュートの観点を初心者向けに解説します。",
  },
  "xserver-vs-conoha-wing": {
    title: "エックスサーバー vs ConoHa WING 比較 - WordPress初心者におすすめはどっち？",
    description:
      "エックスサーバーとConoHa WINGを料金、無料お試し、WordPressの始めやすさ、表示速度、サポート、更新時の注意点で比較します。",
  },
  "xserver-vps-guide": {
    title: "XServer VPSとは？初心者向けの始め方とレンタルサーバーとの違い",
    description:
      "VPSとは何かを初心者向けに解説。共有レンタルサーバーとの違い、マイクラサーバーやDiscord Botなどの代表的な用途、XServer VPSを選ぶ判断材料を整理します。",
  },
  "xserver-domain-guide": {
    title: "独自ドメインの取得方法 - XServerドメインで.jp/.com/.devを選ぶ判断と設定手順",
    description:
      "独自ドメインのメリット、.jp/.com/.devなどTLDの違い、XServerドメインでの取得手順、Vercel・レンタルサーバーとのDNS連携設定、AdSense承認との関係を実体験ベースで日本語で解説します。",
  },
  clickjacking: {
    title: "クリックジャッキング詳解 - 透明iframe攻撃とX-Frame-Options/CSP対策",
    description:
      "クリックジャッキングの仕組み、透明iframeによる典型攻撃、UIリドレッシング全般、X-Frame-OptionsとCSP frame-ancestorsによる防御、フレームバスティングの限界を日本語で解説します。",
  },
  ssrf: {
    title: "SSRF 詳解 - クラウドIMDS狙いとCapital One事件・IMDSv2の防御",
    description:
      "SSRF（Server-Side Request Forgery）の仕組み、クラウドメタデータサービス（IMDS 169.254.169.254）を狙う攻撃、Capital One事件の解説、許可リスト方式とIMDSv2による防御を日本語で整理します。",
  },
  "path-traversal": {
    title: "パストラバーサル詳解 - ../攻撃・URLエンコード回避・正規化後の許可リスト",
    description:
      "パストラバーサル攻撃の仕組み、../ や %2e%2e%2f によるディレクトリ脱出、Null Byte挿入、ZipSlip、防御策としての正規化後の許可リスト・抽象化APIを日本語で解説します。",
  },
  react2shell: {
    title: "React2Shell（CVE-2025-55182）とは - RSC/Next.jsの事前認証RCEと対策",
    description:
      "2025年12月にMeta/Vercelが公表したReact Server Componentsの致命的脆弱性 React2Shell（CVE-2025-55182、CVSS 10.0）を日本語で解説。安全でないデシリアライズによる事前認証RCEの仕組み、影響バージョンと修正版、Next.jsアプリの確認・対策手順を整理します。",
  },
  "shai-hulud": {
    title: "Shai-Hulud詳解 - npm史上初の自己増殖ワームとサプライチェーン対策",
    description:
      "2025年に出現したnpm史上初の自己増殖型サプライチェーンワーム Shai-Hulud を日本語で解説。postinstall等のライフサイクルスクリプトでトークンを窃取し感染を連鎖させる仕組み、被害規模、--ignore-scriptsやlockfile・2FA・短命トークンによる開発者/CIの対策を整理します。",
  },
  "cpanel-cve-2026-41940": {
    title: "cPanel認証バイパス（CVE-2026-41940）とは - WHM乗っ取りの仕組みと対策",
    description:
      "2026年4月に公表されたcPanel & WHMの認証バイパス脆弱性 CVE-2026-41940（CVSS 9.8）を日本語で解説。セッションCookieへのCRLFインジェクションでrootとして管理画面を乗っ取る仕組み、影響範囲と修正版、約2か月先行したゼロデイ悪用の経緯、レンタルサーバー利用者・管理者の確認/対策手順を整理します。",
  },
  "netlogon-cve-2026-41089": {
    title: "Netlogon RCE（CVE-2026-41089）とは - ドメインコントローラ乗っ取りとZerologonの教訓",
    description:
      "2026年5月のPatch Tuesdayで修正されたWindows Netlogonの重大脆弱性 CVE-2026-41089（CVSS 9.8）を日本語で解説。未認証の遠隔攻撃でドメインコントローラ上にSYSTEM権限のコード実行を許す仕組み（MS-NRPCのバッファオーバーフロー）、影響範囲、Zerologon（CVE-2020-1472）との類似と教訓、AD管理者の確認/対策手順を整理します。",
  },
  "apex-one-cve-2026-34926": {
    title: "Trend Micro Apex One脆弱性（CVE-2026-34926）とは - EDRが攻撃経路に変わる悪用とCVSSの落とし穴",
    description:
      "2026年5月にCISA KEV入りした Trend Micro Apex One の悪用中脆弱性 CVE-2026-34926（CVSS 6.7・パストラバーサル）を日本語で解説。EDRサーバの信頼された配信チャネルを全端末へのマルウェア配布路に変える仕組み、影響範囲と修正版、CVSSの数値より「悪用中か」を優先すべき理由、管理者の確認/対策手順を整理します。",
  },
  "langflow-cve-2025-34291": {
    title: "Langflow脆弱性（CVE-2025-34291）とは - AIエージェント基盤のRCEとCORS/CSRFの教訓",
    description:
      "2026年5月にCISA KEV入りした AIエージェント構築基盤 Langflow の悪用中脆弱性 CVE-2025-34291（CVSS 9.4）を日本語で解説。寛容なCORS・弱いCSRF・コード実行エンドポイントの連鎖で未認証RCEとアカウント乗っ取り・全APIキー露出に至る仕組み、影響範囲と修正版、AIフレームワーク特有の攻撃面と対策を整理します。",
  },
  "claude-mythos": {
    title: "Claude Mythosとは - AIによる自律的な脆弱性発見が変える攻防とエンジニアの備え",
    description:
      "Anthropicが2026年4月に公表したフロンティアモデル Claude Mythos Preview を、AIによる自律的な脆弱性発見という観点から日本語で解説。FreeBSDの17年もの・OpenBSDの27年もののバグ発見などAnthropic公表の事実、二段刃（攻撃にも転用可能）の本質、誤検知やプロンプトインジェクションの注意点、防御側（パッチ速度・SBOM・人間によるレビュー）の備えを整理します。",
  },
  "mcp-security": {
    title: "MCP（Model Context Protocol）のセキュリティ - Tool Poisoning・Rug Pull・実例と対策",
    description:
      "AIエージェントの標準プロトコルMCPのセキュリティを日本語で体系解説。ツール説明文に悪意の指示を仕込むTool Poisoning、承認後に定義を差し替えるRug Pull（MCPoison/CVE-2025-54136）、偽MCPサーバのサプライチェーン攻撃、過剰権限トークン、MCP Inspector RCE（CVE-2025-49596）など2025〜26年の実インシデントと、最小権限・人間による承認・ゲートウェイ検証・サーバ検証といった防御策を整理します。",
  },
  clickfix: {
    title: "ClickFix攻撃とは - 偽CAPTCHAで「自分で感染させる」手口とFileFix亜種・対策",
    description:
      "2025〜26年に急増したソーシャルエンジニアリング攻撃 ClickFix を日本語で解説。偽CAPTCHA・偽エラーで利用者にWin+R／PowerShellへコマンドを貼り付け実行させ、LummaやStealCなどのインフォスティーラーを「自分で感染させる」手口、Run無効化を回避するFileFix亜種、700サイト改ざん（Ghost CMS・CVE-2026-26980）などの実例、利用者教育・GPO/Intune・ASR・PowerShellロギングによる多層防御を整理します。",
  },
  "ai-browser-prompt-injection": {
    title: "AIブラウザの危険性 - Comet/Atlasを乗っ取る間接プロンプトインジェクション",
    description:
      "Perplexity CometやChatGPT AtlasなどのAIブラウザ（エージェントブラウザ）を狙う間接プロンプトインジェクションを日本語で解説。Webページに隠した指示でAIを操り、ログイン中のGmailや1Passwordを横断悪用してOTP・認証情報を窃取するBraveのPoC、Zenityのゼロクリック乗っ取り（PleaseFix/CometJacking）、Same-Origin Policy/CORSが無力化される理由、Braveが示す入力分離・出力検証・操作ゲート・モード分離などの対策を整理します。",
  },
  "infostealer-session-hijacking": {
    title: "インフォスティーラーとセッションCookie窃取 - MFAを回避するpass-the-cookieと対策",
    description:
      "インフォスティーラー（情報窃取マルウェア）がMFAを「突破」ではなく「迂回」する仕組みを日本語で解説。Lumma/StealC/RedLineが数十秒で全ブラウザのセッションCookieと保存パスワードを盗み、攻撃者がpass-the-cookie（セッションリプレイ）で本人になりすます流れ、3.9億件規模の被害、ClickFix等の感染経路、Chromeのデバイスバインドセッション認証（DBSC）やFIDO2・短命セッション・条件付きアクセス・異常検知による多層防御を整理します。",
  },
  quishing: {
    title: "Quishing（QRコードフィッシング）とは - 急増する手口と回避テクニック・対策",
    description:
      "2026年Q1に四半期で146%増と最速で伸びるメール攻撃 Quishing（QRコードフィッシング）を日本語で解説。URLをQR画像に隠してメールフィルタを回避し、利用者を管理外のスマホへ誘導する仕組み、ロゴ埋め込み・ASCIIアートQR・PDF添付・分割QRなどの検知回避、AitMによるセッション窃取とMFA回避、北朝鮮Kimsukyの標的型事例、Passkey/FIDO2・画像対応メールセキュリティ・利用者教育による多層防御を整理します。",
  },
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
    title: "エックスサーバー vs ConoHa WING 比較 - 初心者向けおすすめ診断",
    description:
      "無料お試し、料金の見方、WordPressの始めやすさ、サポート、更新時の注意点を比較し、初心者が納得して選べる判断基準を整理します。",
    date: "2026-05-11",
    readingMinutes: 10,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "xserver-vps-guide",
    category: "network",
    title: "XServer VPSとは？初心者向けの始め方とレンタルサーバーとの違い",
    description:
      "VPSと共有レンタルサーバーの違い、マイクラサーバーやDiscord Botなど代表的な用途、XServer VPSを選ぶときの判断材料を初心者向けに整理します。",
    date: "2026-05-17",
    readingMinutes: 11,
    relatedTools: ["cidr-calculator"],
    affiliate: true,
  },
  {
    slug: "xserver-domain-guide",
    category: "network",
    title: "独自ドメイン取得ガイド - XServerドメインで .jp / .com / .dev を選ぶ判断",
    description:
      "独自ドメインのメリット、TLDの選び方、XServerドメインでの取得手順、Vercelとの連携、AdSense承認との関係を実体験ベースで整理します。",
    date: "2026-05-26",
    readingMinutes: 10,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "clickjacking",
    category: "security",
    title: "クリックジャッキング詳解 - 透明iframeとX-Frame-Options/CSPで防ぐ",
    description:
      "透明iframeでUIを重ねて意図しないクリックを誘発する攻撃の仕組み、likejacking/cursorjackingなどUIリドレッシング全般、X-Frame-Options と CSP frame-ancestors による防御を解説します。",
    date: "2026-05-27",
    readingMinutes: 8,
    relatedTools: ["cookie-parser"],
  },
  {
    slug: "ssrf",
    category: "security",
    title: "SSRF 詳解 - クラウドメタデータ狙いとCapital One事件・IMDSv2",
    description:
      "SSRFの仕組みと典型攻撃、AWS IMDS (169.254.169.254) を狙うクラウドAPI悪用、Capital One 1億件流出事件、許可リスト方式・IMDSv2・SSRFガード設計を日本語で解説します。",
    date: "2026-05-27",
    readingMinutes: 10,
    relatedTools: ["cidr-calculator"],
  },
  {
    slug: "path-traversal",
    category: "security",
    title: "パストラバーサル詳解 - ../攻撃・URLエンコード回避・防御の基本",
    description:
      "パストラバーサル（ディレクトリトラバーサル）の仕組み、../ や URLエンコードを使った検査回避、Null Byte挿入、ZipSlip、防御策としての正規化後の許可リスト・抽象化APIを解説します。",
    date: "2026-05-27",
    readingMinutes: 9,
    relatedTools: ["url-encoder"],
  },
  {
    slug: "react2shell",
    category: "security",
    title: "React2Shell（CVE-2025-55182）詳解 - RSC/Next.jsの事前認証RCE",
    description:
      "2025年12月公表のReact Server Components脆弱性 React2Shell（CVE-2025-55182、CVSS 10.0）の仕組み、安全でないデシリアライズによる事前認証RCE、影響バージョンと修正版、Next.jsアプリの確認と対策を日本語で解説します。",
    date: "2026-05-29",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "shai-hulud",
    category: "security",
    title: "Shai-Hulud詳解 - npm史上初の自己増殖ワームとサプライチェーン対策",
    description:
      "npm史上初の自己増殖型サプライチェーンワーム Shai-Hulud の仕組み。postinstall等のライフサイクルスクリプトでトークンを窃取し感染を連鎖させる流れ、被害規模、--ignore-scripts・lockfile・2FA・短命トークンによる開発者/CIの対策を日本語で解説します。",
    date: "2026-05-29",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "cpanel-cve-2026-41940",
    category: "security",
    title: "cPanel認証バイパス（CVE-2026-41940）詳解 - WHM乗っ取りの仕組みと対策",
    description:
      "2026年4月公表のcPanel & WHM認証バイパス CVE-2026-41940（CVSS 9.8）の仕組み。セッションCookieへのCRLFインジェクションでrootとして管理画面を乗っ取る流れ、影響範囲と修正版、約2か月先行したゼロデイ悪用の経緯、レンタルサーバー利用者・管理者の確認と対策を日本語で解説します。",
    date: "2026-05-29",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "netlogon-cve-2026-41089",
    category: "security",
    title: "Netlogon RCE（CVE-2026-41089）詳解 - DC乗っ取りとZerologonの教訓",
    description:
      "2026年5月公表のWindows Netlogon脆弱性 CVE-2026-41089（CVSS 9.8）の仕組み。未認証の遠隔攻撃でドメインコントローラ上にSYSTEM権限のコード実行を許すMS-NRPCのバッファオーバーフロー、影響範囲、Zerologon（CVE-2020-1472）との類似と教訓、AD管理者の確認と対策を日本語で解説します。",
    date: "2026-05-29",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "apex-one-cve-2026-34926",
    category: "security",
    title: "Trend Micro Apex One脆弱性（CVE-2026-34926）詳解 - EDRが攻撃経路に変わる悪用",
    description:
      "2026年5月にCISA KEV入りしたTrend Micro Apex Oneの悪用中脆弱性 CVE-2026-34926（CVSS 6.7・パストラバーサル）の仕組み。EDRサーバの信頼された配信チャネルを全端末へのマルウェア配布路に変える流れ、影響範囲と修正版、CVSSより悪用中かを優先すべき理由、管理者の確認と対策を日本語で解説します。",
    date: "2026-05-29",
    readingMinutes: 8,
    relatedTools: [],
  },
  {
    slug: "langflow-cve-2025-34291",
    category: "security",
    title: "Langflow脆弱性（CVE-2025-34291）詳解 - AIエージェント基盤のRCEとCORS/CSRF",
    description:
      "2026年5月にCISA KEV入りしたAIエージェント構築基盤 Langflow の悪用中脆弱性 CVE-2025-34291（CVSS 9.4）の仕組み。寛容なCORS・弱いCSRF・コード実行エンドポイントの連鎖で未認証RCEとアカウント乗っ取り・全APIキー露出に至る流れ、影響範囲と修正版、AIフレームワーク特有の攻撃面と対策を日本語で解説します。",
    date: "2026-05-29",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "claude-mythos",
    category: "security",
    title: "Claude Mythosとは - AIによる自律的な脆弱性発見が変える攻防と備え",
    description:
      "Anthropicが2026年4月に公表したフロンティアモデル Claude Mythos Preview を、AIによる自律的な脆弱性発見の観点から解説。FreeBSDの17年もの・OpenBSDの27年もののバグ発見などAnthropic公表の事実、攻撃にも転用可能な二段刃の本質、誤検知やプロンプトインジェクションの注意点、防御側（パッチ速度・SBOM・人間のレビュー）の備えを日本語で整理します。",
    date: "2026-05-29",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "mcp-security",
    category: "security",
    title: "MCPのセキュリティ - Tool Poisoning・Rug Pull・サプライチェーンの実例と対策",
    description:
      "AIエージェントの標準プロトコルMCPの攻撃面を体系整理。ツール説明文に指示を仕込むTool Poisoning、承認後に定義を差し替えるRug Pull（CVE-2025-54136）、偽MCPサーバのサプライチェーン、過剰権限トークン、MCP Inspector RCEなど2025〜26年の実例と、最小権限・人間による承認・サーバ検証の防御を日本語で解説します。",
    date: "2026-05-30",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "clickfix",
    category: "security",
    title: "ClickFix攻撃とは - 偽CAPTCHAで「自分で感染させる」手口とFileFix亜種・対策",
    description:
      "偽CAPTCHA・偽エラーでWin+RやPowerShellにコマンドを貼り付け実行させ、Lumma/StealCなどを自分で感染させるClickFix攻撃を解説。Run無効化を回避するFileFix亜種、700サイト改ざん（CVE-2026-26980）などの実例、利用者教育・GPO・ASR・ログ監視による多層防御を日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "ai-browser-prompt-injection",
    category: "security",
    title: "AIブラウザの危険性 - Comet/Atlasを乗っ取る間接プロンプトインジェクション",
    description:
      "Perplexity CometやChatGPT AtlasなどのAIブラウザを狙う間接プロンプトインジェクションを解説。Webページに隠した指示でAIを操り、ログイン中のGmailや1Passwordを横断悪用してOTPを盗むBraveのPoC、Zenityのゼロクリック乗っ取り、Same-Origin Policyが無力化される理由、入力分離・操作ゲート・モード分離による対策を日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "infostealer-session-hijacking",
    category: "security",
    title: "インフォスティーラーとセッションCookie窃取 - MFAを回避するpass-the-cookie",
    description:
      "情報窃取マルウェアがMFAを突破ではなく迂回する仕組みを解説。Lumma/StealCが数十秒で全ブラウザのCookieと保存パスワードを盗み、攻撃者がpass-the-cookieで本人になりすます流れ、3.9億件規模の被害、ClickFix等の感染経路、ChromeのDBSC・FIDO2・短命セッション・条件付きアクセス・異常検知による多層防御を日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 11,
    relatedTools: ["cookie-parser"],
  },
  {
    slug: "quishing",
    category: "security",
    title: "Quishing（QRコードフィッシング）とは - 急増する手口と回避テク・対策",
    description:
      "2026年Q1に四半期で146%増と最速で伸びるQuishing（QRコードフィッシング）を解説。URLをQR画像に隠してメールフィルタを回避し利用者を管理外スマホへ誘導する仕組み、ASCIIアートQRやPDF添付などの検知回避、AitMによるセッション窃取とMFA回避、北朝鮮Kimsukyの事例、Passkey・画像対応メールセキュリティ・教育による多層防御を日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 10,
    relatedTools: ["qr-code"],
  },
];

export function getArticle(
  category: ArticleCategory,
  slug: string,
): Article | undefined {
  return articles.find((article) => article.category === category && article.slug === slug);
}

export function getArticleSeoTitle(article: Article): string {
  return articleSeo[article.slug]?.title ?? article.title;
}

export function getArticleSeoDescription(article: Article): string {
  return articleSeo[article.slug]?.description ?? article.description;
}

export function getArticleMetadata(article: Article): Metadata {
  const path = `/learn/${article.category}/${article.slug}`;
  const title = getArticleSeoTitle(article);
  const description = getArticleSeoDescription(article);
  const imagePath =
    article.slug === "xserver-vs-conoha-wing"
      ? `${path}/opengraph-image.png`
      : `${path}/opengraph-image`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${title} | secutils`,
      description,
      url: path,
      publishedTime: article.date,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | secutils`,
      description,
      images: [imagePath],
    },
  };
}

export function getRelatedArticles(toolSlug: string): Article[] {
  return articles.filter((article) => article.relatedTools?.includes(toolSlug));
}
