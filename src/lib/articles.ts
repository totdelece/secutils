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
  "teampcp-cloud-credential-theft": {
    title: "TeamPCPがOSSからAWSへ — セキュリティツール汚染で実現するクラウド鍵の大量窃取",
    description:
      "2026年3〜5月に発覚したTeamPCPによるサプライチェーン攻撃を解説。Trivy・KICS・LiteLLMなどDevSecOpsツールに忍び込んだマルウェアがAWSアクセスキー・Kubernetesトークン・GitHub PAT等を自動収集し、クラウド環境への二次侵害へと連鎖した攻撃の全体像と対策を日本語でまとめます。",
  },
  "fog-ransomware-propagation": {
    title: "Fogランサムウェアが「拡散すれば無料復号」の前代未聞の要求 — VPN侵害とLNKフィッシングの実態",
    description:
      "2026年に100件超の被害を出したFogランサムウェアが、「マルウェアを他者に拡散すれば身代金を免除する」という前代未聞の社会工学的手口を採用した。VPNクレデンシャル悪用・BYOVDによるEDR無効化・DOGEロゴ入り脅迫状の仕組み、組織が今すぐすべき対策を日本語で解説します。",
  },
  "apt28-prismex-nato": {
    title: "APT28が新マルウェアPRISMEXでNATO防衛サプライチェーンを標的 — ステガノグラフィとCOMハイジャックの脅威",
    description:
      "ロシア国家系APTグループAPT28（Pawn Storm/Fancy Bear）が2026年に展開した新マルウェアスイートPRISMEXを解説。画像内にペイロードを隠すステガノグラフィ、COMハイジャックによる永続化、CVE-2026-21509/21513の悪用、ウクライナ・NATO加盟国の防衛インフラへの標的型侵害の手口と対策を日本語でまとめます。",
  },
  "foxconn-nitrogen-ransomware": {
    title: "Foxconn北米工場がNitrogenランサムウェアの標的に — Apple・Nvidia設計書8TB流出か",
    description:
      "2026年5月、Apple・Nidia・Intelの主要サプライヤーFoxconnの北米工場がNitrogenランサムウェアに侵害され、8TB・1,100万ファイル超が盗まれたと主張された。Nitrogenの技術的特徴、身代金を払っても復号できない欠陥、EDR無効化手法、製造業のサプライチェーンリスクを日本語で解説します。",
  },
  "daemon-tools-supply-chain": {
    title: "DAEMON Tools公式インストーラに1ヶ月バックドア — 正規署名済みサプライチェーン攻撃の全貌",
    description:
      "2026年4〜5月、仮想ドライブソフト「DAEMON Tools」の公式Webサイトから正規の開発者デジタル署名付きの悪性インストーラが約1ヶ月配布された。Kasperkyが発見したこの中国系攻撃者によるサプライチェーン攻撃の手口、バックドアの挙動、製造業・政府機関への標的型二次ペイロード、対処法を日本語で解説します。",
  },
  "canvas-shinyhunters-breach": {
    title: "Canvas（Instructure）で2.75億人分のデータ漏洩 — ShinyHuntersが世界8,809校を2度侵害",
    description:
      "2026年4〜5月、世界最大級のLMS（学習管理システム）CanvasのInstructureがShinyHuntersに侵害され、8,809校・2.75億人のユーザーデータ3.65TBが流出した。2度の侵害・ログイン画面改ざん・教育機関特有のリスク・ShinyHunters手口の変化を日本語で解説します。",
  },
  "support-scam": {
    title: "サポート詐欺（偽警告詐欺）の手口と対処法 - 偽セキュリティ警告・遠隔操作・電話詐欺",
    description:
      "ブラウザに突然表示される偽のウイルス警告や、Microsoftをかたる電話で遠隔操作ソフトをインストールさせる「サポート詐欺」の手口を日本語で解説。IPA・警察庁の被害統計、画面が閉じられない時の具体的対処、AnyDesk/Quick Assistを使った詐取の流れ、スマートフォン版の新手口、遠隔操作を許してしまった後の対応を整理します。",
  },
  "github-actions-supply-chain": {
    title: "GitHub Actions サプライチェーン攻撃 - tj-actions/GhostAction/Megalodon の手口と対策",
    description:
      "2025年に相次いだGitHub Actionsを狙うサプライチェーン攻撃を日本語で解説。tj-actions/changed-files（CVE-2025-30066、2.3万リポジトリ影響）・GhostAction（3,325シークレット窃取）・Megalodon（5,500件超のリポジトリ汚染）の手口、タグ可変性の問題、SHAピン・OIDC・最小権限による防御を整理します。",
  },
  toolshell: {
    title: "ToolShell（CVE-2025-53770）詳解 - SharePoint RCEゼロデイと国家攻撃者の手口",
    description:
      "2025年7月に悪用が確認されたMicrosoft SharePointのゼロデイ脆弱性チェーン「ToolShell」（CVE-2025-53770＋CVE-2025-53771）を日本語で解説。認証バイパスからRCEへの攻撃の流れ、Linen/Violet Typhoon等中国系APTによる400件超の侵害、MachineKey窃取による永続化、パッチ適用・鍵ローテーション・AMSIによる対策を整理します。",
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
  "cisco-firestarter-backdoor": {
    title: "FIRESTARTERバックドア詳解 - パッチ後も残るCisco ASA/Firewallマルウェアとハードリセットだけが答え",
    description:
      "2026年4月にCISA/NCSCが共同勧告したCisco ASA/Firewallに感染するFIRESTARTERバックドアを日本語で解説。CVE-2025-20333（CVSS 9.9）悪用で米連邦政府機関のFirepowerデバイスに設置され、ファームウェアアップデートでも除去できず物理的な電源抜きが唯一の駆除手段となった実態、LINE VIPERとのマルウェアチェーン、YARAルールによる検出、Cisco機器の継続監査の必要性を日本語で整理します。",
  },
  "forticlient-ems-cve-2026-35616": {
    title: "FortiClient EMS CVE-2026-35616詳解 - 未認証APIバイパスで全管理端末にEKZスティーラーを配布",
    description:
      "2026年5月に積極悪用が確認されたFortiClient EMSの認証バイパス脆弱性CVE-2026-35616（CVSS 9.1）を日本語で解説。未認証でAPIを叩いて特権昇格し、FortiClientの管理チャネルを乗っ取ることで配下の全端末にEKZインフォスティーラーを「公式パッチ」に偽装して配布する攻撃チェーン、Chrome暗号化Cookie迂回、エンドポイント管理基盤が攻撃経路に変わるリスク、修正版と確認手順を日本語でまとめます。",
  },
  "nordvpn-vs-expressvpn": {
    title: "NordVPN vs ExpressVPN 比較2026 - ITエンジニアが選ぶVPNの違いと結論",
    description:
      "NordVPNとExpressVPNを料金・プロトコル・サーバー安全性・追加機能で正直に比較。NordLynx vs Lightway+耐量子暗号Kyber、TrustedServer（全RAM動作）の意味、Double VPN・Threat Protection、2年プランの実際のコスト、シナリオ別おすすめをIT担当者向けに整理します。",
  },
  "pan-os-globalprotect-cve-2026-0257": {
    title: "PAN-OS GlobalProtect CVE-2026-0257詳解 - VPN Cookie偽造とCISA KEV登録・2026年5月から積極悪用",
    description:
      "2026年5月から積極悪用されCISA KEVに登録されたPalo Alto Networks PAN-OSのVPN認証バイパス脆弱性CVE-2026-0257を日本語で解説。Authentication Override Cookieと証明書共有の設定ミスで公開鍵が取得でき正規VPNセッションを偽造できる仕組み、Rapid7が観測した管理者アカウント乗っ取り、影響を受けるPAN-OSバージョンと修正版、GlobalProtect設定の確認と無効化手順を日本語で整理します。",
  },
  "ai-generated-zero-day-exploit": {
    title: "AIが書いたゼロデイエクスプロイト - 初の2FA迂回コードをGoogleが検知、攻撃自動化の到達点",
    description:
      "2026年5月にGoogleが公表した「犯罪グループがAIを使ってゼロデイエクスプロイトを開発した」初の事例を日本語で解説。LLM生成コードに典型的なdocstring・架空のCVSSスコア・教科書的なコード構造で識別された実態、2FA検証ロジックのバグを大量悪用しようとした攻撃者の意図、Mandiantのパッチ前悪用28.3%データが示すTime-to-Exploitの短縮、管理ツールの公開範囲最小化・2FA実装品質評価・脆弱性対応高速化による防御を整理します。",
  },
  "exchange-cve-2026-42897": {
    title: "Microsoft Exchange XSSゼロデイ（CVE-2026-42897）詳解 - メール1通でOWAセッション乗っ取りとBEC基盤化",
    description:
      "2026年5月にCISA KEVに追加されたMicrosoft Exchange Server OWAのXSSゼロデイCVE-2026-42897（CVSS 8.1）を日本語で解説。細工したメールをOWAで開くだけで任意のJavaScript実行・セッションCookie窃取・なりすまし送信・パスワードリセット後も残る転送ルール設置が可能になる仕組み、Exchange 2016/2019/SE全バージョンへの影響、EEMSによる自動緩和の確認手順、BECへの発展リスクと悪性転送ルールの調査コマンドを整理します。",
  },
  "muddywater-teams-fake-ransomware": {
    title: "MuddyWaterがTeamsで社内ITを装う - ランサムウェアを煙幕にするイラン国家スパイ活動の手口",
    description:
      "イラン国家系APT MuddyWater（Mango Sandstorm）が2026年前半にMicrosoft Teamsを使った「社内ITサポートなりすまし」で侵入し、Chaosランサムウェアを偽旗として残しながら諜報・認証情報窃取・データ持ち出しを行った事案をRapid7の分析を基に日本語で解説。Teams外部テナント悪用の仕組み、DLLサイドローディング（SentinelOne製バイナリ悪用）、偽旗作戦の戦術的意味、ランサムウェアインシデントが実は国家スパイである場合のリスク、Teams設定確認・RMMツール制御・初動の偽旗チェックによる対策を整理します。",
  },
  "chatgphish-chatgpt-phishing": {
    title: "ChatGPhish詳解 - ChatGPTのMarkdown信頼を悪用したフィッシング・IP漏洩・QRコードバイパスの手口",
    description:
      "2026年5月にPermiso Securityが公表したChatGPTウェブ要約機能の脆弱性「ChatGPhish」を日本語で解説。chatgpt.comのレスポンスレンダラーがMarkdown画像を自動取得・リンクを信頼済みUI要素として表示する仕組みを悪用し、被害者のIP/UA/Referer流出・クリック可能なフィッシングリンクの埋め込み・デスクトップURLフィルタを回避するQRコードフィッシングが可能になる攻撃チェーン、間接プロンプトインジェクションとの関係、業務利用ChatGPTへの対策ポリシーを整理します。",
  },
  "trellix-source-code-breach": {
    title: "Trellix（旧McAfee/FireEye）ソースコード流出 - RansomHouseが侵害したセキュリティベンダー被害の深刻度",
    description:
      "2026年5月にRansomHouseランサムウェアグループが侵害し、ソースコードリポジトリへの不正アクセスを引き起こしたTrellixインシデントを日本語で解説。McAfee EnterpriseとFireEye合併で生まれた53,000超顧客・2億超エンドポイント保護のセキュリティベンダーのソースコード流出がなぜ一般企業と質的に異なるリスクか（検知回避ロジック把握・未知脆弱性発見・サプライチェーン攻撃基盤）、RSA・FireEye・Okta・Microsoftの過去事例との比較、Trellix製品ユーザーが今すべき確認と多層防御の考え方を整理します。",
  },
  "defender-bluehammer-redsun-undefend": {
    title: "Microsoft Defender 3ゼロデイ詳解（BlueHammer/RedSun/UnDefend）- SYSTEM昇格と定義更新無効化の組み合わせ攻撃",
    description:
      "2026年4〜5月に連続発覚したMicrosoft Defenderの3ゼロデイ BlueHammer（CVE-2026-33825）・RedSun（CVE-2026-41091）・UnDefend（CVE-2026-45498）を日本語で解説。SAMデータベースを使ったSYSTEM昇格（BlueHammer）・システムファイル書き換えによるSYSTEM昇格（RedSun）・一般ユーザーがDefender定義更新を停止するDoS（UnDefend）を段階的に組み合わせる「Layered Degradation Strategy」の仕組み、Huntressが観測した野放し悪用の実態、Antimalware Platformのバージョン確認・定義更新状態のチェック・多層防御の構築を整理します。",
  },
  "the-gentlemen-ransomware": {
    title: "The Gentlemenランサムウェア詳解 - 自己増殖するGo製エンコーダの手口とStorm-2697の脅威",
    description:
      "2026年5月にMicrosoftが解析した自己増殖型ランサムウェア「The Gentlemen」（運用主体Storm-2697）を日本語で解説。Go言語製エンコーダがSMB共有・PsExec・WMI・スケジュールタスク・PowerShellリモーティングなど1標的あたり21通りの実行手段でネットワーク内を自動拡散する仕組み、Defenderリアルタイム監視の無効化・C:\\全体の除外・シャドウコピー削除・イベントログ消去による検知妨害、ファイル毎にCurve25519+XChaCha20を使う暗号化、二重恐喝とRaaS（BreachForums提携）の実態、改ざん防止・制御フォルダーアクセス・ASRルールによる防御を整理します。",
  },
  "charter-vishing-entra-breach": {
    title: "Charter（Spectrum）情報漏えい詳解 - ビッシングでEntra IDを奪い4,200万件を狙ったShinyHunters",
    description:
      "2026年に発覚した米通信大手Charter Communications（Spectrum）の情報漏えいを日本語で解説。ShinyHuntersが電話による音声フィッシング（ビッシング）で従業員のMicrosoft Entraアカウントを乗っ取り、技術的な脆弱性ではなく「人」を突いて侵入した手口、4,200万件を主張・約490万メールが実在確認された規模、CPNIを巡るCharterの見解、なぜヘルプデスク/本人確認の運用が突破口になるのか、ヘルプデスク認証強化・フィッシング耐性MFA・条件付きアクセス・トークン保護による対策を整理します。",
  },
  "autonomous-llm-agent-intrusion": {
    title: "AIエージェントが単独で侵入を遂行 - Sysdigが記録した世界初の自律型LLM攻撃（CVE-2026-39987）",
    description:
      "2026年5月にSysdigが記録した、世界初とされる「自律型LLMエージェントによるサイバー攻撃」を日本語で解説。MarimoのRCE（CVE-2026-39987）で初期侵入後、人間の指示なしに1時間でクラウド認証情報窃取→AWS Secrets ManagerからSSH鍵取得→踏み台サーバー→PostgreSQL全件持ち出しまでを自動遂行した4段階、Cloudflare Workers経由で22秒に11IP・12API呼び出しという検知回避、機械整形コマンド・既知でないスキーマの即時列挙・中国語の計画コメントといったAI由来の痕跡、「参入障壁が技量から推論コストへ変わる」意味、シグネチャから振る舞い検知への転換という防御の指針を整理します。",
  },
  "turla-kazuar-p2p-botnet": {
    title: "Turla Kazuarが「P2Pボットネット」へ進化 - 検知を避ける国家系バックドアの新アーキテクチャ詳解",
    description:
      "2026年5月にMicrosoftが解析したロシアFSB系APT Turla（Secret Blizzard）のバックドア「Kazuar」がモジュール型P2Pボットネットへ進化した事案を日本語で解説。単体の.NETバックドアからKernel/Bridge/Workerの3モジュール構成へ移行し、リーダー選出で外部通信する端末を1台に絞って検知痕跡を最小化する仕組み、150以上の設定項目とHTTP/WebSocket/Exchange Web Services（EWS）の多重C2、AMSI/ETWバイパスや通信ブラックアウトによる隠蔽、外務省・大使館・防衛企業を狙う諜報目的、攻撃面削減ルール・EDRブロックモード・改ざん防止による防御を整理します。",
  },
  "kadnap-edge-proxy-botnet": {
    title: "KadNap詳解 - ASUSルーター1.4万台を「住宅プロキシ」に変えるP2Pボットネットの手口",
    description:
      "Lumen Black Lotus Labsが2026年3月に公表したエッジデバイス狙いのボットネット「KadNap」を日本語で解説。ASUSルーターなど14,000台超（約6割が米国）を侵害し、犯罪用住宅プロキシサービスDoppelganger（旧Faceless）の出口ノードに仕立てる仕組み、KademliaベースのDHTで分散C2を実現しつつ追跡を困難にする設計と、それでも残る2つの中継ノードという急所、ルーター/IoTが攻撃の踏み台になる構造的問題、ファーム更新・管理画面の露出排除・不要サービス停止による対策を整理します。",
  },
  "ivanti-epmm-cve-2026-6973": {
    title: "Ivanti EPMM ゼロデイ CVE-2026-6973詳解 - 度重なるRCE悪用とMDMが攻撃の起点になる理由",
    description:
      "2026年5月に積極悪用が確認されCISA KEVへ即追加されたIvanti Endpoint Manager Mobile（EPMM）のRCEゼロデイCVE-2026-6973を日本語で解説。管理者権限で任意コード実行が可能になる仕組み、2026年1月の未認証RCE（CVE-2026-1281/1340、いずれもCVSS 9.8、Apache RewriteMapのbash注入）と連鎖させる攻撃チェーン、Webシェル設置・リバースシェル・暗号通貨マイナー展開など侵害後の挙動、MDM基盤が全社モバイル端末への侵入起点になるリスク、影響/修正バージョンと侵害痕跡の確認手順を整理します。",
  },
  "copy-fail-cve-2026-31431": {
    title: "Copy Fail（CVE-2026-31431）詳解 - 732バイトでrootを奪うLinuxカーネル権限昇格ゼロデイ",
    description:
      "2026年4月に公開されCISA KEVに即追加されたLinuxカーネルのローカル権限昇格ゼロデイ「Copy Fail」（CVE-2026-31431、CVSS 7.8）を日本語で解説。AF_ALGのalgif_aeadモジュールに2017年から潜んでいた最適化バグで、ディスク上のファイルを書き換えずにページキャッシュ内のsetuidバイナリへ4バイトを上書きしrootを奪う仕組み、競合条件不要で100%再現する決定論的エクスプロイト（732バイトのPythonスクリプト）、Kubernetesコンテナ脱出やマルチテナント侵害につながるクラウドリスク、影響カーネル4.14〜6.19.12と修正手順・algif_aead無効化の緊急回避策を整理します。",
  },
  "kyber-ransomware-post-quantum": {
    title: "Kyberランサムウェア詳解 - 耐量子暗号Kyber1024を実装した「将来も復号不能」な脅迫の登場",
    description:
      "2026年3月にRapid7が解析した耐量子暗号を掲げる新興ランサムウェア「Kyber」を日本語で解説。Windows版（Rust製）はKyber1024（ML-KEM-1024 / FIPS 203）とX25519・AES-256-CTRを本当に実装する一方、Linux/ESXi版は「ポスト量子」を謳いながら実際はChaCha8とRSA-4096という看板倒れだった二面性、シャドウコピー削除・SQL/Exchange停止・実験的なHyper-V停止機能、VMwareデータストアを狙うESXi暗号化、米防衛関連企業が被害に挙がった事実、耐量子暗号が被害者の「将来の復号」希望すら奪う意味と、暗号方式に関わらず鍵管理・バックアップ・ESXi防御が本質である理由を整理します。",
  },
  "gridtide-unc2814-telecom-espionage": {
    title: "GRIDTIDE詳解 - Google Sheetsを司令塔に通信事業者を狙った中国系APT UNC2814のスパイ活動",
    description:
      "2026年にGoogle/Mandiantが摘発した中国系APT UNC2814のグローバル諜報作戦「GRIDTIDE」を日本語で解説。42カ国53組織（疑い含め70カ国超）の通信事業者・政府機関を侵害し、加入者のPII（氏名・電話番号・生年月日・国民ID）を窃取した実態、C言語製バックドアがGoogle SheetsのAPIをC2（指令通信）に悪用して正規クラウドトラフィックに紛れる手口、systemdサービスxaptによる永続化とSoftEther VPNの悪用、Mandiantが異常なプロセスツリーから検知しGoogle Cloudプロジェクトごと無効化した対応、Salt Typhoonとの違い、通信・正規SaaSのアウトバウンド監視という日本企業向けの教訓を整理します。",
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
    slug: "teampcp-cloud-credential-theft",
    category: "security",
    title: "TeamPCPがOSSからAWSへ — セキュリティツール汚染で実現するクラウド鍵の大量窃取",
    description:
      "2026年3〜5月に発覚したTeamPCPによるサプライチェーン攻撃。Trivy・KICS・LiteLLMなどDevSecOpsツールに悪性コードを注入し、AWSアクセスキー・Kubernetesトークン・GitHub PATなどを自動収集してクラウド環境への二次侵害へ連鎖した攻撃の全体像と対策を解説します。",
    date: "2026-05-31",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "fog-ransomware-propagation",
    category: "security",
    title: "Fogランサムウェアが「拡散すれば無料復号」の前代未聞の要求 — VPN侵害とLNKフィッシングの実態",
    description:
      "2026年に100件超の被害を出したFogランサムウェアが「マルウェアを他者に拡散すれば身代金を免除する」という前代未聞の手口を採用。VPNクレデンシャル悪用・BYOVDによるEDR無効化・二重恐喝の仕組み、組織が今すぐすべき対策を解説します。",
    date: "2026-05-31",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "apt28-prismex-nato",
    category: "security",
    title: "APT28が新マルウェアPRISMEXでNATO防衛サプライチェーンを標的 — ステガノグラフィとCOMハイジャックの脅威",
    description:
      "ロシア国家系APT28（Pawn Storm）が2026年に展開した新マルウェアスイートPRISMEXを解説。画像内にペイロードを隠すステガノグラフィ、COMハイジャックによる永続化、CVE-2026-21509悪用、ウクライナ・NATO加盟国の防衛インフラへの標的型侵害の手口と対策をまとめます。",
    date: "2026-05-31",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "foxconn-nitrogen-ransomware",
    category: "security",
    title: "Foxconn北米工場がNitrogenランサムウェアの標的に — Apple・Nvidia設計書8TB流出か",
    description:
      "2026年5月にFoxconnの北米工場がNitrogenランサムウェアに侵害され、8TB超のファイルが盗まれた事案を解説。Nitrogen の技術的特徴、EDR無効化手法、身代金を払っても復号できない欠陥、製造業サプライチェーンへの教訓を整理します。",
    date: "2026-05-31",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "daemon-tools-supply-chain",
    category: "security",
    title: "DAEMON Tools公式インストーラに1ヶ月バックドア — 正規署名済みサプライチェーン攻撃の全貌",
    description:
      "2026年4〜5月に仮想ドライブソフト「DAEMON Tools」の公式サイトから正規署名付きの悪性インストーラが配布されたサプライチェーン攻撃を解説。Kasperskyが発見した中国系攻撃者のバックドア挙動、製造業・政府機関への標的型ペイロード、対処法を整理します。",
    date: "2026-05-31",
    readingMinutes: 9,
    relatedTools: [],
  },
  {
    slug: "canvas-shinyhunters-breach",
    category: "security",
    title: "Canvas（Instructure）で2.75億人のデータ漏洩 — ShinyHuntersが世界8,809校を2度侵害",
    description:
      "2026年4〜5月に世界最大のLMS CanvasのInstructureがShinyHuntersに侵害され、8,809校・2.75億人のデータ3.65TBが流出した事案を解説。2度の侵害・ログイン画面改ざん・教育機関特有のリスク・恐喝型ハッカーの手口の変化を整理します。",
    date: "2026-05-31",
    readingMinutes: 9,
    relatedTools: [],
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
    slug: "github-actions-supply-chain",
    category: "security",
    title: "GitHub Actions サプライチェーン攻撃 - tj-actions/GhostAction/Megalodon の手口と対策",
    description:
      "2025年に相次いだGitHub Actionsを狙うサプライチェーン攻撃を日本語で解説。tj-actions/changed-files（CVE-2025-30066）・GhostAction・Megalodonの手口、タグ可変性の問題、SHAピン・OIDC・最小権限による防御を整理します。",
    date: "2026-05-31",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "toolshell",
    category: "security",
    title: "ToolShell（CVE-2025-53770）詳解 - SharePoint RCEゼロデイと国家攻撃者の手口",
    description:
      "2025年7月に悪用が確認されたMicrosoft SharePointゼロデイ「ToolShell」（CVE-2025-53770・CVE-2025-53771）の仕組み。認証バイパスからRCEへの攻撃チェーン、Linen/Violet Typhoon等中国系APTによる400件超の侵害、MachineKey窃取による永続化、パッチ適用・鍵ローテーション・AMSIによる対策を日本語で解説します。",
    date: "2026-05-31",
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
    slug: "cisco-firestarter-backdoor",
    category: "security",
    title: "FIRESTARTERバックドア詳解 - パッチ後も残るCisco ASAマルウェアと「電源抜き」だけが答え",
    description:
      "2026年4月にCISA/NCSCが共同勧告したCisco ASA/Firewallに感染するFIRESTARTERバックドアを解説。CVE-2025-20333（CVSS 9.9）悪用で米連邦機関のFirepowerデバイスに設置され、ファームウェアアップデートでも除去できず物理的な電源抜きが唯一の駆除手段となった実態、LINE VIPERとのチェーン、YARAルール検出、Cisco機器の継続監査の必要性を日本語で整理します。",
    date: "2026-06-01",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "forticlient-ems-cve-2026-35616",
    category: "security",
    title: "FortiClient EMS CVE-2026-35616詳解 - 未認証APIバイパスで全管理端末にEKZスティーラーを配布",
    description:
      "2026年5月に積極悪用が確認されたFortiClient EMSの認証バイパス脆弱性CVE-2026-35616（CVSS 9.1）を解説。未認証でAPIを叩いて特権昇格し、FortiClientの管理チャネルを乗っ取ることで配下の全端末にEKZインフォスティーラーを「公式パッチ」に偽装して配布する攻撃チェーン、Chrome暗号化Cookie迂回、エンドポイント管理基盤が攻撃経路に変わるリスク、修正版と確認手順を日本語でまとめます。",
    date: "2026-06-01",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "pan-os-globalprotect-cve-2026-0257",
    category: "security",
    title: "PAN-OS GlobalProtect CVE-2026-0257詳解 - VPN Cookie偽造とCISA KEV登録・2026年5月から積極悪用",
    description:
      "2026年5月から積極悪用されCISA KEVに登録されたPalo Alto Networks PAN-OSのVPN認証バイパス脆弱性CVE-2026-0257を解説。Authentication Override Cookieと証明書共有の設定ミスで公開鍵が取得でき正規VPNセッションを偽造できる仕組み、Rapid7が観測した管理者アカウント乗っ取り、影響を受けるPAN-OSバージョンと修正版、GlobalProtect設定の確認と無効化手順を日本語で整理します。",
    date: "2026-06-01",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "ai-generated-zero-day-exploit",
    category: "security",
    title: "AIが書いたゼロデイエクスプロイト - Googleが検知した2FA迂回コードと攻撃自動化の到達点",
    description:
      "2026年5月にGoogleが公表した「犯罪グループがAIを使ってゼロデイエクスプロイトを開発した」初の事例を解説。LLM生成コードの識別特徴（docstring・架空のCVSSスコア・教科書的構造）、2FA検証ロジックのバグを大量悪用しようとした攻撃者の意図、Mandiantのデータが示すTime-to-Exploitの短縮、管理ツールの公開範囲最小化・2FA品質評価・高速パッチ適用による防御を日本語で整理します。",
    date: "2026-06-02",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "exchange-cve-2026-42897",
    category: "security",
    title: "Microsoft Exchange XSSゼロデイ（CVE-2026-42897）詳解 - メール1通でOWAセッション乗っ取り",
    description:
      "2026年5月にCISA KEVに追加されたMicrosoft Exchange Server OWAのXSSゼロデイCVE-2026-42897（CVSS 8.1）を解説。細工したメールをOWAで開くだけで任意のJavaScript実行・セッションCookie窃取・なりすまし送信・パスワードリセット後も残る転送ルール設置が可能になる仕組み、Exchange 2016/2019/SE全バージョンへの影響、EEMSによる緩和確認手順、BECへの発展リスクと転送ルール調査コマンドを日本語で整理します。",
    date: "2026-06-02",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "muddywater-teams-fake-ransomware",
    category: "security",
    title: "MuddyWaterがTeamsで社内ITを装う - ランサムウェアを煙幕にするイラン国家スパイ活動",
    description:
      "イラン国家系APT MuddyWater（Mango Sandstorm）が2026年前半にMicrosoft Teamsを使った「ITサポートなりすまし」で侵入し、Chaosランサムウェアを偽旗として残しながら諜報・認証情報窃取を行った事案をRapid7の分析を基に解説。Teams外部テナント悪用・DLLサイドローディング（SentinelOne製バイナリ悪用）・偽旗作戦の戦術的意味、ランサムウェアが国家スパイの煙幕である場合のリスク、Teams設定確認・RMMツール制御・初動の偽旗チェックによる対策を日本語で整理します。",
    date: "2026-06-02",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "chatgphish-chatgpt-phishing",
    category: "security",
    title: "ChatGPhish詳解 - ChatGPTのMarkdown信頼を悪用したフィッシング・IP漏洩・QRコードバイパス",
    description:
      "2026年5月にPermiso Securityが公表したChatGPTウェブ要約機能の脆弱性「ChatGPhish」を解説。Markdown画像の自動取得でIP/UA/Refererが流出し、フィッシングリンクやQRコードがChatGPTのUIに埋め込まれる仕組み、間接プロンプトインジェクションとの関係、デスクトップURLフィルタの回避、業務ChatGPT利用への対策ポリシーを日本語で整理します。",
    date: "2026-06-02",
    readingMinutes: 10,
    relatedTools: [],
  },
  {
    slug: "trellix-source-code-breach",
    category: "security",
    title: "Trellix（旧McAfee/FireEye）ソースコード流出 - セキュリティベンダー侵害が特別に危険な理由",
    description:
      "2026年5月にRansomHouseが侵害したTrellixのソースコードリポジトリ不正アクセス事案を解説。McAfee Enterprise＋FireEye合併の53,000超顧客ベンダーのコード流出がなぜ一般企業と質的に異なるか（検知回避ロジック把握・未知脆弱性発見）、RSA・FireEye・Okta・Microsoftの歴史的事例との比較、Trellix製品ユーザーの確認手順と多層防御の考え方を日本語で整理します。",
    date: "2026-06-02",
    readingMinutes: 11,
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
    slug: "defender-bluehammer-redsun-undefend",
    category: "security",
    title: "Microsoft Defender 3ゼロデイ（BlueHammer/RedSun/UnDefend）- SYSTEM昇格と定義更新無効化の組み合わせ攻撃",
    description:
      "2026年4〜5月に連続発覚したMicrosoft Defender 3ゼロデイ：SAMを使ったSYSTEM昇格BlueHammer（CVE-2026-33825）・システムファイル書き換えRedSun（CVE-2026-41091）・一般ユーザーが定義更新を停止するUnDefend（CVE-2026-45498）。3つを組み合わせる「Layered Degradation Strategy」の仕組み、Huntressが観測した野放し悪用の実態、Antimalware Platformのバージョン確認・定義更新チェック・多層防御の構築を日本語で整理します。",
    date: "2026-06-02",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "copy-fail-cve-2026-31431",
    category: "security",
    title: "Copy Fail（CVE-2026-31431）詳解 - 732バイトでrootを奪うLinuxカーネル権限昇格ゼロデイ",
    description:
      "2026年4月公開・CISA KEV即追加のLinuxカーネル権限昇格ゼロデイ「Copy Fail」（CVE-2026-31431、CVSS 7.8）を解説。AF_ALGのalgif_aeadに2017年から潜む最適化バグで、ディスクを書き換えずページキャッシュ上のsetuidバイナリへ4バイト上書きしrootを奪う仕組み、競合条件不要で決定論的に動く732バイトのエクスプロイト、Kubernetesコンテナ脱出やマルチテナント侵害のクラウドリスク、影響カーネル4.14〜6.19.12と修正・algif_aead無効化の緊急回避策を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "kyber-ransomware-post-quantum",
    category: "security",
    title: "Kyberランサムウェア詳解 - 耐量子暗号Kyber1024を実装した「将来も復号不能」な脅迫の登場",
    description:
      "2026年3月にRapid7が解析した耐量子暗号を掲げる新興ランサムウェア「Kyber」を解説。Windows版（Rust製）はKyber1024（ML-KEM-1024）とX25519・AES-256-CTRを本当に実装する一方、Linux/ESXi版は「ポスト量子」を謳いつつ実体はChaCha8とRSA-4096という二面性、シャドウコピー削除・SQL/Exchange停止・実験的Hyper-V停止、VMwareデータストアを狙うESXi暗号化、米防衛関連企業の被害、耐量子暗号が「将来の復号」希望まで奪う意味と、暗号方式に関わらず鍵管理・バックアップ・ESXi防御が本質である理由を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "gridtide-unc2814-telecom-espionage",
    category: "security",
    title: "GRIDTIDE詳解 - Google Sheetsを司令塔に通信事業者を狙った中国系APT UNC2814のスパイ活動",
    description:
      "2026年にGoogle/Mandiantが摘発した中国系APT UNC2814の諜報作戦「GRIDTIDE」を解説。42カ国53組織（疑い含め70カ国超）の通信事業者・政府機関を侵害し加入者のPII（氏名・電話番号・生年月日・国民ID）を窃取した実態、C言語製バックドアがGoogle SheetsのAPIをC2に悪用して正規クラウドトラフィックに紛れる手口、systemdサービスxaptによる永続化とSoftEther VPNの悪用、Mandiantが異常なプロセスツリーから検知しGoogle Cloudプロジェクトごと無効化した対応、Salt Typhoonとの違い、通信・正規SaaSのアウトバウンド監視という日本企業向けの教訓を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 12,
    relatedTools: [],
  },
  {
    slug: "turla-kazuar-p2p-botnet",
    category: "security",
    title: "Turla Kazuarが「P2Pボットネット」へ進化 - 検知を避ける国家系バックドアの新アーキテクチャ",
    description:
      "2026年5月にMicrosoftが解析したロシアFSB系APT Turla（Secret Blizzard）のバックドア「Kazuar」がモジュール型P2Pボットネットへ進化した事案を解説。Kernel/Bridge/Workerの3モジュール構成、リーダー選出で外部通信端末を1台に絞り検知痕跡を最小化する仕組み、150超の設定とHTTP/WebSocket/Exchange Web Servicesの多重C2、AMSI/ETWバイパスや通信ブラックアウトによる隠蔽、外務省・大使館・防衛企業を狙う諜報目的、攻撃面削減ルール・EDRブロックモード・改ざん防止による防御を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 12,
    relatedTools: [],
  },
  {
    slug: "kadnap-edge-proxy-botnet",
    category: "security",
    title: "KadNap詳解 - ASUSルーター1.4万台を「住宅プロキシ」に変えるP2Pボットネットの手口",
    description:
      "Lumen Black Lotus Labsが2026年3月に公表したエッジデバイス狙いのボットネット「KadNap」を解説。ASUSルーターなど14,000台超（約6割が米国）を侵害し犯罪用住宅プロキシDoppelganger（旧Faceless）の出口ノードに仕立てる仕組み、KademliaベースのDHTで分散C2を実現しつつ追跡を困難にする設計と、それでも残る2つの中継ノードという急所、ルーター/IoTが踏み台になる構造的問題、ファーム更新・管理画面の露出排除・不要サービス停止による対策を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "ivanti-epmm-cve-2026-6973",
    category: "security",
    title: "Ivanti EPMM ゼロデイ CVE-2026-6973詳解 - 度重なるRCE悪用とMDMが攻撃の起点になる理由",
    description:
      "2026年5月に積極悪用されCISA KEVへ即追加されたIvanti EPMMのRCEゼロデイCVE-2026-6973を解説。管理者権限で任意コード実行が可能になる仕組み、2026年1月の未認証RCE（CVE-2026-1281/1340、CVSS 9.8、Apache RewriteMapのbash注入）と連鎖させる攻撃チェーン、Webシェル設置・リバースシェル・マイナー展開など侵害後の挙動、MDM基盤が全社モバイル端末への侵入起点になるリスク、影響/修正バージョンと侵害痕跡の確認手順を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "the-gentlemen-ransomware",
    category: "security",
    title: "The Gentlemenランサムウェア詳解 - 自己増殖するGo製エンコーダの手口とStorm-2697の脅威",
    description:
      "2026年5月にMicrosoftが解析した自己増殖型ランサムウェア「The Gentlemen」（運用主体Storm-2697）を解説。Go製エンコーダがSMB共有・PsExec・WMI・スケジュールタスク・PowerShellリモーティングなど1標的あたり21通りの実行手段で自動拡散する仕組み、Defender無効化・C:全体の除外・シャドウコピー削除・ログ消去による検知妨害、Curve25519+XChaCha20の暗号化、二重恐喝とRaaS（BreachForums提携）の実態、改ざん防止・制御フォルダーアクセス・ASRルールによる防御を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 12,
    relatedTools: [],
  },
  {
    slug: "charter-vishing-entra-breach",
    category: "security",
    title: "Charter（Spectrum）情報漏えい詳解 - ビッシングでEntra IDを奪い4,200万件を狙ったShinyHunters",
    description:
      "2026年に発覚した米通信大手Charter Communications（Spectrum）の情報漏えいを解説。ShinyHuntersが音声フィッシング（ビッシング）で従業員のMicrosoft Entraアカウントを乗っ取り、技術的脆弱性ではなく「人」を突いて侵入した手口、4,200万件を主張・約490万メールが実在確認された規模、CPNIを巡るCharterの見解、なぜヘルプデスク/本人確認が突破口になるのか、ヘルプデスク認証強化・フィッシング耐性MFA・条件付きアクセス・トークン保護による対策を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 11,
    relatedTools: [],
  },
  {
    slug: "autonomous-llm-agent-intrusion",
    category: "security",
    title: "AIエージェントが単独で侵入を遂行 - Sysdigが記録した世界初の自律型LLM攻撃（CVE-2026-39987）",
    description:
      "2026年5月にSysdigが記録した世界初とされる「自律型LLMエージェントによるサイバー攻撃」を解説。MarimoのRCE（CVE-2026-39987）で初期侵入後、人間の指示なしに1時間でクラウド認証情報窃取→AWS Secrets ManagerからSSH鍵取得→踏み台→PostgreSQL全件持ち出しを自動遂行した4段階、Cloudflare Workers経由で22秒に11IP・12API呼び出しの検知回避、機械整形コマンドや中国語の計画コメントといったAI由来の痕跡、参入障壁が技量から推論コストへ変わる意味、シグネチャから振る舞い検知への転換という防御指針を日本語で整理します。",
    date: "2026-06-03",
    readingMinutes: 12,
    relatedTools: [],
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
    "react2shell",
    "shai-hulud",
    "toolshell",
    "github-actions-supply-chain",
    "foxconn-nitrogen-ransomware",
    "daemon-tools-supply-chain",
    "canvas-shinyhunters-breach",
    "teampcp-cloud-credential-theft",
    "fog-ransomware-propagation",
    "apt28-prismex-nato",
    "support-scam",
    "cpanel-cve-2026-41940",
    "netlogon-cve-2026-41089",
    "apex-one-cve-2026-34926",
    "langflow-cve-2025-34291",
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
    "cisco-firestarter-backdoor",
    "forticlient-ems-cve-2026-35616",
    "pan-os-globalprotect-cve-2026-0257",
    "incident-response-guide",
    "ai-generated-zero-day-exploit",
    "exchange-cve-2026-42897",
    "muddywater-teams-fake-ransomware",
    "chatgphish-chatgpt-phishing",
    "trellix-source-code-breach",
    "defender-bluehammer-redsun-undefend",
    "copy-fail-cve-2026-31431",
    "kyber-ransomware-post-quantum",
    "gridtide-unc2814-telecom-espionage",
    "turla-kazuar-p2p-botnet",
    "kadnap-edge-proxy-botnet",
    "ivanti-epmm-cve-2026-6973",
    "the-gentlemen-ransomware",
    "charter-vishing-entra-breach",
    "autonomous-llm-agent-intrusion",
  ],
  ai: [
    "claude-mythos",
    "mcp-security",
    "ai-browser-prompt-injection",
    "prompt-injection",
    "langflow-cve-2025-34291",
    "ai-generated-zero-day-exploit",
    "chatgphish-chatgpt-phishing",
    "autonomous-llm-agent-intrusion",
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

