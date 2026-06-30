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
  /** 内容を最後に確認・更新した日（ISO yyyy-mm-dd）。未指定なら date を使用。JSON-LD の dateModified にも使う */
  updated?: string;
  readingMinutes: number;
  relatedTools?: string[];
  affiliate?: boolean;
};

type ArticleSeo = {
  title: string;
  description: string;
};

const articleSeo: Record<string, ArticleSeo> = {
  "japan-security-incidents": {
    title:
      "日本の主要セキュリティインシデント事例まとめ（2020-2025）- 共通する侵入経路と教訓",
    description:
      "KADOKAWA・アサヒ・名古屋港・三菱電機・LINEヤフー・富士通など、2020〜2025年の国内主要セキュリティインシデント12件を一覧で俯瞰し、VPN未更新・委託先経由・弱い認証といった共通の侵入経路と失敗パターン、日本企業が確認すべき対策チェックリストを事例研究として整理します。",
  },
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
  "onamae-domain-guide": {
    title: "お名前.comでドメインを取得する方法 - 手順・料金・注意点を解説",
    description:
      "国内シェアNo.1のお名前.comで独自ドメインを取得する方法を解説。主要TLDの初回・更新料金、Whois情報公開代行の設定、申し込み時の注意点、ネームサーバー変更手順を初心者向けにまとめます。",
  },
  "onamae-vs-xserver-domain": {
    title: "お名前.com vs XServerドメイン 比較 - どちらで取得すべきか",
    description:
      "お名前.comとXServerドメインを料金・TLD数・WHOIS代行・サーバー連携の観点で比較。XServerを使うなら一元管理が強み、XServer以外なら豊富なTLDと低コストのお名前.comが有利。用途別の選び方を解説します。",
  },
  "conoha-wing-review": {
    title: "ConoHa WINGの評判は？料金・速度・スペックを徹底検証【2026年】",
    description:
      "GMO運営の高速レンタルサーバー「ConoHa WING」をレビュー。LiteSpeed×WEXAL®の速度、WINGパック通常月額1,331円〜（長期契約＋キャンペーンで実質678円〜）、初期費用0円・独自ドメイン2つ永年無料・自動バックアップ無料・転送量無制限を公式情報から整理します。",
  },
  "xserver-review": {
    title: "エックスサーバーの評判は？料金・速度・スペックを徹底検証【2026年】",
    description:
      "国内シェアNo.1の定番レンタルサーバー「エックスサーバー」をレビュー。NVMe SSD×Xアクセラレータの速度、通常月額990円〜（割引キャンペーン時は実質693円〜）、初期費用0円・10日間の無料お試し・独自ドメイン永年無料（最大2個）を公式情報から整理します。",
  },
  "shin-rental-server-review": {
    title: "シンレンタルサーバーの評判は？料金・速度・スペックを徹底検証【2026年】",
    description:
      "エックスサーバーが運営する新世代レンタルサーバー「シンレンタルサーバー」を解説。NVMe SSDの高速性、実質月額539円〜の料金、独自ドメイン永年無料、10日間の無料お試しといった特徴を、公式スペックをもとに整理します。",
  },
  "xserver-vps-review": {
    title: "XServer VPSの評判は？料金・スペック・使い道を徹底検証【2026年】",
    description:
      "エックスサーバーの仮想専用サーバー XServer VPS をレビュー。AMD EPYC×NVMe SSDの性能、月額990円〜の料金、初期費用0円、Minecraft/Docker等のテンプレート、root権限での自由な用途を公式情報から整理します。",
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
  "support-scam": {
    title: "サポート詐欺（偽警告詐欺）の手口と対処法 - 偽セキュリティ警告・遠隔操作・電話詐欺",
    description:
      "ブラウザに突然表示される偽のウイルス警告や、Microsoftをかたる電話で遠隔操作ソフトをインストールさせる「サポート詐欺」の手口を日本語で解説。IPA・警察庁の被害統計、画面が閉じられない時の具体的対処、AnyDesk/Quick Assistを使った詐取の流れ、スマートフォン版の新手口、遠隔操作を許してしまった後の対応を整理します。",
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
  "lolbins-living-off-the-land": {
    title: "LOLBins・環境寄生型攻撃（Living off the Land）とは - 正規ツール悪用の手口と検知",
    description:
      "PowerShell・certutil・mshta・rundll32・MSBuildなどWindows標準の正規ツールを悪用するLOLBins／環境寄生型（Living off the Land, LOTL）攻撃を日本語で解説。検出の79%がマルウェアを伴わない実態、MITRE ATT&CK技法との対応、Flax TyphoonやTA505など実際のキャンペーン、複数バイナリのチェイン、BYOVDによるEDR無効化、プロセス系譜・Sysmon・アプリ制御（WDAC/AppLocker）・ASR・PowerShellロギングによる検知と防御を整理します。",
  },
  "device-code-phishing": {
    title: "デバイスコードフィッシングとは - MFAを回避するEntra ID乗っ取りの手口と対策",
    description:
      "正規のOAuthデバイスコードフローを悪用してMicrosoft Entra ID／Microsoft 365アカウントを乗っ取るデバイスコードフィッシングを日本語で解説。被害者本人がMFAを完了してしまうためMFAが効かない仕組み、リフレッシュトークンやPrimary Refresh Token（PRT）の悪用、ロシア系Storm-2372の標的型キャンペーン、PhaaS（EvilTokens）による商品化と37倍増の実態、条件付きアクセスでのフロー遮断・サインインログ監視・新規デバイス登録検知・トークン失効による対策を整理します。",
  },
  "supply-chain-attacks": {
    title: "ソフトウェアサプライチェーン攻撃2026 - npm/PyPIの6類型と防御（タイポスクワッティング〜自己増殖ワーム）",
    description:
      "npm/PyPIを狙うソフトウェアサプライチェーン攻撃を6類型（タイポスクワッティング・依存関係混同・slopsquatting・メンテナ乗っ取り・悪意あるインストールスクリプト・自己増殖ワーム）で体系整理。Mini Shai-Hulud（170超パッケージ）やTrapDoor、AIが幻覚した存在しないパッケージ名の悪用、累計120万超の悪性パッケージという実態と、lockfile・--ignore-scripts・Trusted Publishing・リポジトリファイアウォール・SBOM・環境分離による防御を日本語で解説します。",
  },
  "mitre-attack": {
    title: "MITRE ATT&CK入門 - 戦術・技術・手順とID体系、実務での使い方をわかりやすく",
    description:
      "攻撃者の実際の振る舞いを体系化した知識ベース MITRE ATT&CK を日本語で入門解説。Tactics（戦術）/Techniques（技術）/Procedures（手順）の3層構造、TxxxxなどのID体系、14のEnterprise戦術、Groups/Software/Campaigns/Mitigations、v18のDetection Strategies刷新やv19（2026年4月）でのDefense Evasion分割、検知エンジニアリング・脅威インテリジェンス・カバレッジ可視化（Navigator）といった実務での使い方、Cyber Kill Chainとの違いを整理します。",
  },
  "ransomware-2026": {
    title: "ランサムウェア2026の最新動向 - 暗号化なし恐喝・RaaS・初期アクセスブローカーと対策",
    description:
      "2026年のランサムウェアの実態を実務者向けに解説。インシデントの約35%が暗号化を伴わない「データ窃取のみの恐喝」へ移行した理由、RaaS（サービス型）と初期アクセスブローカー（IAB）による分業エコシステム、Qilin・Cl0p・Akiraなど主要グループの動き、Oracle EBSの大量悪用やBYOVDによるEDR無効化、二重〜四重恐喝の進化、攻撃ライフサイクル（初期アクセス→横展開→持ち出し→影響）の各段で効く防御を整理します。",
  },
  "prompt-injection": {
    title: "プロンプトインジェクション総論 - 直接/間接の違い・Lethal Trifecta・実例と対策",
    description:
      "OWASP LLM Top 10の第1位 プロンプトインジェクション（LLM01）を日本語で体系解説。LLMが「指示」と「データ」を区別できないという根本原因、直接（ジェイルブレイク）と間接（外部コンテンツ由来、2026年は55%超）の違い、EchoLeak（CVE-2025-32711）やMCP経由のゼロクリックRCE・KYC文書からのPII漏えいといった実例、危険な組み合わせ「Lethal Trifecta」、Spotlighting・ガードレール・CaMeL・最小権限・人間による承認といった多層防御とその限界を整理します。",
  },
  "nordvpn-vs-expressvpn": {
    title: "NordVPN vs ExpressVPN 比較2026 - ITエンジニアが選ぶVPNの違いと結論",
    description:
      "NordVPNとExpressVPNを料金・プロトコル・サーバー安全性・追加機能で正直に比較。NordLynx vs Lightway+耐量子暗号Kyber、TrustedServer（全RAM動作）の意味、Double VPN・Threat Protection、2年プランの実際のコスト、シナリオ別おすすめをIT担当者向けに整理します。",
  },
  "security-certification-guide": {
    title: "セキュリティ資格 比較・一覧 - 情報処理安全確保支援士・CISSP・CompTIA Security+の選び方",
    description:
      "セキュリティ資格を比較して自分に合ったものを選ぶためのガイドです。情報処理安全確保支援士・CISSP・CompTIA Security+・CEH・OSCP・AWS Security Specialtyなど主要資格の難易度・費用・取得条件・キャリアへの影響を日本語でまとめます。",
  },
  "sc-exam-guide": {
    title: "情報処理安全確保支援士 勉強方法・合格率・おすすめ参考書【独学対策】",
    description:
      "情報処理安全確保支援士（登録セキスペ）の勉強方法を独学で合格した観点から解説。合格率約20%の難易度、午前I・午前II・午後の試験形式、スケジュールの立て方、おすすめ参考書・学習サイト、午後の記述対策まで実務目線でまとめます。",
  },
  "cissp-guide": {
    title: "CISSP難易度・合格率・勉強時間をわかりやすく解説 - 日本語試験・必要な実務経験",
    description:
      "世界最高峰のセキュリティ資格CISSPの難易度、合格率、必要な実務経験、勉強時間の目安を日本語で解説。CAT方式の試験形式、8ドメインの内容、日本語試験の特徴、情報処理安全確保支援士・CompTIA Security+との難易度比較、Associate of (ISC)²の活用法まで整理します。",
  },
  "zero-trust-security": {
    title: "ゼロトラストとは？わかりやすく解説 - 従来型セキュリティとの違い・導入製品・実践手順",
    description:
      "「信頼しない、常に確認する（Never Trust, Always Verify）」を原則とするゼロトラストセキュリティを初心者向けにわかりやすく解説。なぜ境界型防御では不十分なのか、NIST SP 800-207の7原則、SASEとの違い、Zscaler・Microsoft Entra ID・Google BeyondCorpなど代表的な製品・サービス、日本企業の導入ステップを整理します。",
  },
  "incident-response-guide": {
    title: "セキュリティインシデント対応手順 - 初動から報告書作成まで【CSIRTフロー・テンプレート】",
    description:
      "セキュリティインシデント発生時の対応手順をNIST SP 800-61のフレームワークに沿って解説。検知・トリアージ・証拠保全・封じ込め・根絶・復旧・再発防止の各フェーズでやることを実務目線で整理し、ランサムウェア対応の特殊な注意点、報告書のテンプレート、CSIRT構築の考え方まで日本語でまとめます。",
  },
};

export const articles: Article[] = [
  {
    slug: "japan-security-incidents",
    category: "security",
    title: "日本国内の主要セキュリティインシデント事例（2020–2025）",
    description:
      "国内の主要なセキュリティインシデント12件を一覧で俯瞰し、VPN未更新・委託先/グループ経由・弱い認証という繰り返し現れる侵入経路と失敗パターン、日本企業が今すぐ確認すべき対策チェックリストを事例研究として整理します。",
    date: "2026-06-13",
    readingMinutes: 22,
    relatedTools: [],
  },
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
    relatedTools: ["security-headers", "http-status"],
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
    updated: "2026-06-24",
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
    slug: "onamae-domain-guide",
    category: "network",
    title: "お名前.com でドメインを取得する方法 - 料金・手順・注意点を解説",
    description:
      "国内シェアNo.1のお名前.comで独自ドメインを取得する手順、主要TLDの料金比較（初回 vs 更新）、Whois代行の設定方法、申し込み時の注意点を初心者向けに解説します。",
    date: "2026-06-06",
    readingMinutes: 10,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "onamae-vs-xserver-domain",
    category: "network",
    title: "お名前.com vs XServerドメイン 比較 - どちらで取得すべきか",
    description:
      "お名前.comとXServerドメインを料金・TLD数・WHOIS代行・サーバー連携の観点で徹底比較。XServerを使うなら一元管理が強み、XServer以外なら豊富なTLDと低コストのお名前.comが有利。用途別の選び方を解説します。",
    date: "2026-06-06",
    readingMinutes: 8,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "conoha-wing-review",
    category: "network",
    title: "ConoHa WINGの評判は？料金・速度・スペックを徹底検証",
    description:
      "GMO運営の高速レンタルサーバーの料金・スペック・特徴をまとめたレビュー。LiteSpeed×WEXAL®・WINGパック通常月額1,331円〜（長期契約＋キャンペーンで実質678円〜）・独自ドメイン2つ永年無料・自動バックアップ無料を公式情報から整理します。",
    date: "2026-06-23",
    readingMinutes: 8,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "xserver-review",
    category: "network",
    title: "エックスサーバーの評判は？料金・速度・スペックを徹底検証",
    description:
      "国内シェアNo.1の定番レンタルサーバーの料金・スペック・特徴をまとめたレビュー。NVMe SSD×Xアクセラレータ・通常月額990円〜（割引時 実質693円〜）・独自ドメイン永年無料（最大2個）・10日間の無料お試しを公式情報から整理します。",
    date: "2026-06-23",
    readingMinutes: 8,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "shin-rental-server-review",
    category: "network",
    title: "シンレンタルサーバーの評判は？料金・速度・スペックを徹底検証",
    description:
      "エックスサーバー運営の新世代レンタルサーバーの料金・スペック・特徴をまとめたレビュー。NVMe SSD・実質月額539円〜・独自ドメイン永年無料・10日間の無料お試しを公式情報から整理します。",
    date: "2026-06-19",
    updated: "2026-06-30",
    readingMinutes: 8,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "xserver-vps-review",
    category: "network",
    title: "XServer VPSの評判は？料金・スペック・使い道を徹底検証",
    description:
      "エックスサーバーの仮想専用サーバー XServer VPS のレビュー。AMD EPYC×NVMe SSDの性能、月額990円〜の料金、初期費用0円、Minecraft/Docker等のテンプレート、root権限での用途を公式情報から整理します。",
    date: "2026-06-20",
    updated: "2026-06-24",
    readingMinutes: 8,
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
    relatedTools: ["security-headers", "cookie-parser"],
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
    slug: "support-scam",
    category: "security",
    title: "サポート詐欺（偽警告詐欺）の手口と対処法 - 偽セキュリティ警告・遠隔操作・電話詐欺",
    description:
      "ブラウザに突然表示される偽のウイルス警告や、Microsoftをかたる電話で遠隔操作ソフトをインストールさせる「サポート詐欺」の手口。IPA・警察庁の被害統計、画面が閉じられない時の具体的対処、AnyDesk/Quick Assistを使った詐取の流れ、遠隔操作を許してしまった後の対応を日本語で解説します。",
    date: "2026-05-31",
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
  {
    slug: "lolbins-living-off-the-land",
    category: "security",
    title: "LOLBins・環境寄生型攻撃（Living off the Land）とは - 正規ツール悪用の手口と検知",
    description:
      "PowerShell・certutil・mshta・rundll32・MSBuildなどWindows標準ツールを悪用するLOLBins／環境寄生型（LOTL）攻撃を解説。検出の79%がマルウェア無しという実態、MITRE ATT&CK技法との対応、Flax TyphoonやTA505の実例、複数バイナリのチェイン、BYOVDによるEDR無効化、プロセス系譜・Sysmon・アプリ制御・ASR・PowerShellロギングによる検知と防御を日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "device-code-phishing",
    category: "security",
    title: "デバイスコードフィッシングとは - MFAを回避するEntra ID乗っ取りの手口と対策",
    description:
      "正規のOAuthデバイスコードフローを悪用してMicrosoft Entra ID／M365アカウントを乗っ取る手口を解説。被害者本人がMFAを完了するためMFAが効かない仕組み、リフレッシュトークン/PRTの悪用、ロシア系Storm-2372の標的型、PhaaS（EvilTokens）による商品化と37倍増、条件付きアクセスでのフロー遮断・ログ監視・デバイス登録検知・トークン失効による対策を日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "supply-chain-attacks",
    category: "security",
    title: "ソフトウェアサプライチェーン攻撃2026 - npm/PyPIの6類型と防御",
    description:
      "npm/PyPIを狙うサプライチェーン攻撃を6類型（タイポスクワッティング・依存関係混同・slopsquatting・メンテナ乗っ取り・悪意あるインストールスクリプト・自己増殖ワーム）で体系整理。Mini Shai-HuludやTrapDoor、AIが幻覚した存在しないパッケージ名の悪用、累計120万超の悪性パッケージの実態と、lockfile・Trusted Publishing・リポジトリファイアウォール・SBOM・環境分離による防御を日本語で解説します。",
    date: "2026-05-30",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "mitre-attack",
    category: "security",
    title: "MITRE ATT&CK入門 - 戦術・技術・手順とID体系、実務での使い方",
    description:
      "攻撃者の実際の振る舞いを体系化した知識ベース MITRE ATT&CK を入門解説。Tactics/Techniques/Proceduresの3層構造、TxxxxのID体系、14のEnterprise戦術、Groups/Software/Campaigns、v18のDetection Strategies刷新やv19（2026年4月）の変更、検知エンジニアリング・脅威インテリジェンス・カバレッジ可視化での使い方、Cyber Kill Chainとの違いを日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "ransomware-2026",
    category: "security",
    title: "ランサムウェア2026の最新動向 - 暗号化なし恐喝・RaaS・初期アクセスブローカー",
    description:
      "2026年のランサムウェアの実態を実務者向けに解説。約35%が暗号化を伴わない「データ窃取のみの恐喝」へ移行した理由、RaaSと初期アクセスブローカー（IAB）の分業、Qilin・Cl0p・Akiraの動き、Oracle EBS大量悪用やBYOVDによるEDR無効化、二重〜四重恐喝の進化、攻撃ライフサイクル各段で効く防御を日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "prompt-injection",
    category: "security",
    title: "プロンプトインジェクション総論 - 直接/間接の違い・Lethal Trifecta・実例と対策",
    description:
      "OWASP LLM Top 10第1位のプロンプトインジェクション（LLM01）を体系解説。LLMが指示とデータを区別できない根本原因、直接（ジェイルブレイク）と間接（外部コンテンツ由来・2026年は55%超）の違い、EchoLeak（CVE-2025-32711）やMCP経由のゼロクリックRCEなどの実例、危険な組み合わせLethal Trifecta、Spotlighting・ガードレール・CaMeL・最小権限・人間による承認といった多層防御とその限界を日本語で整理します。",
    date: "2026-05-30",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "security-certification-guide",
    category: "security",
    title: "セキュリティ資格 比較・一覧 - 自分に合った資格の選び方",
    description:
      "情報処理安全確保支援士・CISSP・CompTIA Security+・CEH・OSCP・AWS Security Specialtyなど主要セキュリティ資格を難易度・費用・実務経験要件・キャリアへの影響で比較します。",
    date: "2026-06-01",
    readingMinutes: 13,
    relatedTools: [],
  },
  {
    slug: "sc-exam-guide",
    category: "security",
    title: "情報処理安全確保支援士 勉強方法・合格率・おすすめ参考書",
    description:
      "情報処理安全確保支援士（登録セキスペ）の難易度・合格率・試験形式・独学スケジュール・おすすめ参考書・午後対策を実務目線で解説します。",
    date: "2026-06-01",
    readingMinutes: 14,
    relatedTools: [],
  },
  {
    slug: "cissp-guide",
    category: "security",
    title: "CISSP難易度・合格率・勉強時間をわかりやすく解説",
    description:
      "世界最高峰のセキュリティ資格CISSPの難易度、必要な実務経験、勉強時間、日本語試験、情報処理安全確保支援士との比較を解説します。",
    date: "2026-06-01",
    readingMinutes: 13,
    relatedTools: [],
  },
  {
    slug: "zero-trust-security",
    category: "security",
    title: "ゼロトラストとは？わかりやすく解説 - 導入製品と実践手順",
    description:
      "Never Trust, Always Verify を原則とするゼロトラストセキュリティを初心者向けに解説。従来型との違い、NIST SP 800-207、代表製品、導入ステップをまとめます。",
    date: "2026-06-01",
    readingMinutes: 12,
    relatedTools: [],
  },
  {
    slug: "incident-response-guide",
    category: "security",
    title: "セキュリティインシデント対応手順 - 初動から報告書作成まで",
    description:
      "NIST SP 800-61 に沿った検知・証拠保全・封じ込め・根絶・復旧・再発防止の各フェーズ、ランサムウェア対応の注意点、報告書テンプレートを実務目線で整理します。",
    date: "2026-06-01",
    readingMinutes: 16,
    relatedTools: [],
  },
  {
    slug: "nordvpn-vs-expressvpn",
    category: "network",
    title: "NordVPN vs ExpressVPN 比較2026 - ITエンジニアが選ぶVPNの違いと結論",
    description:
      "NordVPNとExpressVPNを料金・プロトコル・安全性・機能で比較。NordLynx vs Lightway+耐量子暗号Kyber、TrustedServer（全RAM動作）の意味、Double VPN・Threat Protection、シナリオ別おすすめをIT担当者向けに整理します。",
    date: "2026-06-02",
    readingMinutes: 12,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "virusbuster-cloud-review",
    category: "security",
    title: "ウイルスバスター クラウド レビュー - 機能・料金・特徴を解説",
    description:
      "トレンドマイクロのウイルスバスタークラウドの機能・料金プランを解説。AI検知・ランサムウェア対策（フォルダシールド）・Pay Guard・フィッシング対策など、国内シェアNo.1セキュリティソフトの全体像をまとめます。",
    date: "2026-06-07",
    readingMinutes: 10,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "norton-360-review",
    category: "security",
    title: "ノートン 360 レビュー - 機能・料金・特徴を解説【世界No.1】",
    description:
      "世界販売台数No.1のノートン（Norton 360）の機能・料金プランを解説。リアルタイム保護・VPN・パスワードマネージャー・クラウドバックアップ・ダークウェブモニタリングなど、オールインワンセキュリティの全体像をまとめます。",
    date: "2026-06-07",
    readingMinutes: 10,
    relatedTools: [],
    affiliate: true,
  },
  {
    slug: "norton-vs-virusbuster",
    category: "security",
    title: "ノートン vs ウイルスバスター 比較2026 - どちらを選ぶべきか",
    description:
      "Norton 360とウイルスバスタークラウドを料金・機能・サポート・動作の軽さで比較。VPN・バックアップ内蔵のオールインワンか、Pay Guard・24時間日本語電話サポートの国内安心感か。用途別の選び方を解説します。",
    date: "2026-06-09",
    readingMinutes: 12,
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

export function getArticleSeoTitle(article: Article): string {
  return articleSeo[article.slug]?.title ?? article.title;
}

export function getArticleSeoDescription(article: Article): string {
  return articleSeo[article.slug]?.description ?? article.description;
}

/* ------------------------------------------------------------------ *
 * noindex 管理（AdSense「有用性の低いコンテンツ」対策）
 * 特定日付のインシデント/CVE/漏えいを要約した「速報型」記事は検索インデックス
 * から外し、サイト評価の主役を普遍的な解説とツールへ寄せる。記事ページ自体は
 * 残るため、直リンクや関連記事からは引き続き読める（index:false, follow:true）。
 * sitemap.ts もこの集合を見て出力対象から除外する。
 * 再 index したくなったら、その slug をこの集合から外すだけでよい。
 * ------------------------------------------------------------------ */
// 速報型記事の noindex 運用は終了。速報は pillar（ransomware-2026 /
// supply-chain-attacks / japan-security-incidents 等）へ統合し個別記事は削除済み。
// 仕組みは温存（将来また個別 slug を noindex したくなったらここに追加する）。
export const noindexArticleSlugs = new Set<string>([]);

export function isArticleNoindexed(slug: string): boolean {
  return noindexArticleSlugs.has(slug);
}

/** 検索 index する evergreen 記事数（速報アーカイブを除く）。サイト全体の記事数表示の単一真実源。 */
export const indexedArticleCount = articles.filter(
  (a) => !noindexArticleSlugs.has(a.slug),
).length;

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
    robots: isArticleNoindexed(article.slug)
      ? { index: false, follow: true }
      : undefined,
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

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/* ------------------------------------------------------------------ *
 * トピックタグ（カテゴリ横断のフィルタ）
 * security / network という大分類に加え、記事を主題で横串にする。
 * 記事側を 1 件ずつ編集せず、ここの slug 集合だけで管理する。
 * ------------------------------------------------------------------ */

export type TopicId = "auth" | "webdef" | "crypto" | "threat" | "ai" | "netbasics";

export const topicLabels: Record<TopicId, string> = {
  auth: "認証・認可",
  webdef: "Web防御",
  crypto: "暗号",
  threat: "脅威・CVE",
  ai: "AI・LLM",
  netbasics: "ネットワーク基礎",
};

export const orderedTopics: TopicId[] = [
  "webdef",
  "auth",
  "crypto",
  "threat",
  "ai",
  "netbasics",
];

const topicSlugs: Record<TopicId, string[]> = {
  auth: [
    "jwt-security-issues",
    "session-vs-jwt",
    "oauth-oidc",
    "mfa-totp-fido2",
    "password-hashing",
    "password-strength",
    "device-code-phishing",
  ],
  webdef: [
    "xss",
    "csrf",
    "sql-injection",
    "cors-same-origin",
    "clickjacking",
    "ssrf",
    "path-traversal",
    "http-security-headers",
    "owasp-top-10",
    "zero-trust-security",
  ],
  crypto: [
    "public-key-crypto",
    "password-hashing",
    "secure-randomness",
    "https-tls",
  ],
  threat: [
    "japan-security-incidents",
    "support-scam",
    "clickfix",
    "ai-browser-prompt-injection",
    "infostealer-session-hijacking",
    "quishing",
    "lolbins-living-off-the-land",
    "supply-chain-attacks",
    "mitre-attack",
    "ransomware-2026",
    "prompt-injection",
    "device-code-phishing",
    "incident-response-guide",
  ],
  ai: [
    "mcp-security",
    "ai-browser-prompt-injection",
    "prompt-injection",
  ],
  netbasics: [
    "cidr-notation",
    "tcp-vs-udp",
    "dns-basics",
    "https-tls",
    "osi-tcpip-model",
    "port-numbers",
    "nat-port-forwarding",
    "icmp-ping-traceroute",
    "mac-arp",
    "http-versions",
    "vpn-basics",
    "ipv4-vs-ipv6",
    "firewall-basics",
    "dhcp-basics",
  ],
};

export function getArticleTopics(slug: string): TopicId[] {
  return orderedTopics.filter((topic) => topicSlugs[topic].includes(slug));
}

