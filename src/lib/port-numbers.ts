export type PortCategory =
  | "web"
  | "mail"
  | "remote"
  | "file"
  | "db"
  | "dir"
  | "infra"
  | "app";

export type PortEntry = {
  port: number;
  service: string;
  protocol: "TCP" | "UDP" | "TCP/UDP";
  category: PortCategory;
  description: string;
  /** 平文・無認証・攻撃多発などで注意喚起したいポート */
  caution?: boolean;
  /** 補足（典型用途 or セキュリティ上の注意点） */
  note?: string;
};

export const PORT_CATEGORY_ORDER: PortCategory[] = [
  "web",
  "mail",
  "remote",
  "file",
  "db",
  "dir",
  "infra",
  "app",
];

export const PORT_CATEGORY_LABELS: Record<PortCategory, string> = {
  web: "Web / HTTP",
  mail: "メール",
  remote: "リモート接続",
  file: "ファイル共有・転送",
  db: "データベース",
  dir: "認証・ディレクトリ・DNS",
  infra: "ネットワーク基盤・VPN",
  app: "アプリ・運用ツール",
};

/** フィルタボタン用の短縮ラベル */
export const PORT_CATEGORY_SHORT: Record<PortCategory, string> = {
  web: "Web",
  mail: "メール",
  remote: "リモート",
  file: "ファイル",
  db: "DB",
  dir: "認証/DNS",
  infra: "基盤/VPN",
  app: "アプリ/運用",
};

export const PORT_CATEGORY_COLORS: Record<PortCategory, string> = {
  web: "text-sky-600 dark:text-sky-400",
  mail: "text-violet-600 dark:text-violet-400",
  remote: "text-amber-600 dark:text-amber-400",
  file: "text-emerald-600 dark:text-emerald-400",
  db: "text-rose-600 dark:text-rose-400",
  dir: "text-indigo-600 dark:text-indigo-400",
  infra: "text-teal-600 dark:text-teal-400",
  app: "text-fuchsia-600 dark:text-fuchsia-400",
};

export const PORTS: PortEntry[] = [
  // ─── Web / HTTP ───────────────────────────────────────────────
  { port: 80, service: "HTTP", protocol: "TCP", category: "web", description: "Web の平文通信。", note: "本番では HTTPS(443) へリダイレクトするのが基本。" },
  { port: 443, service: "HTTPS", protocol: "TCP/UDP", category: "web", description: "TLS で暗号化された Web 通信。", note: "HTTP/3 では同じ 443 番を UDP(QUIC) でも使う。" },
  { port: 8080, service: "HTTP 代替 / プロキシ", protocol: "TCP", category: "web", description: "アプリサーバーやプロキシ（Tomcat 等）でよく使う代替 HTTP ポート。" },
  { port: 8443, service: "HTTPS 代替", protocol: "TCP", category: "web", description: "管理画面やアプリサーバーで使われる代替 HTTPS ポート。" },
  { port: 8000, service: "HTTP 代替 / 開発", protocol: "TCP", category: "web", description: "開発用 Web サーバーや管理 API でよく使われる。" },
  { port: 3000, service: "開発サーバー / Grafana", protocol: "TCP", category: "web", description: "Node.js / React / Next.js などの開発サーバーや Grafana の既定ポート。" },
  { port: 8888, service: "HTTP 代替 / Jupyter", protocol: "TCP", category: "web", description: "Jupyter Notebook や代替 HTTP でよく使われる。" },

  // ─── メール ────────────────────────────────────────────────────
  { port: 25, service: "SMTP", protocol: "TCP", category: "mail", description: "サーバー間のメール転送(MTA)。", note: "送信は平文。多くの ISP が 25 番送信をブロックする(OP25B)。クライアント送信は 587 を使う。" },
  { port: 587, service: "SMTP Submission", protocol: "TCP", category: "mail", description: "メール送信(クライアント→サーバー、STARTTLS)。", note: "現在のメール送信の標準ポート。" },
  { port: 465, service: "SMTPS", protocol: "TCP", category: "mail", description: "SMTP over TLS（暗黙的 TLS の送信ポート）。" },
  { port: 110, service: "POP3", protocol: "TCP", category: "mail", caution: true, description: "メール受信(ダウンロード型)。平文。", note: "暗号化版は 995(POP3S)。" },
  { port: 995, service: "POP3S", protocol: "TCP", category: "mail", description: "POP3 over TLS（暗号化された受信）。" },
  { port: 143, service: "IMAP", protocol: "TCP", category: "mail", caution: true, description: "メール受信(サーバー保持型)。平文。", note: "暗号化版は 993(IMAPS)。" },
  { port: 993, service: "IMAPS", protocol: "TCP", category: "mail", description: "IMAP over TLS（暗号化された受信）。" },

  // ─── リモート接続 ──────────────────────────────────────────────
  { port: 22, service: "SSH / SFTP / SCP", protocol: "TCP", category: "remote", description: "暗号化されたリモートシェル。ファイル転送やトンネルにも使う。", note: "総当たりの標的になりやすい。公開鍵認証・ポート変更・fail2ban 等で守る。" },
  { port: 23, service: "Telnet", protocol: "TCP", category: "remote", caution: true, description: "平文のリモートログイン。", note: "盗聴されるため非推奨。SSH(22) に置き換える。" },
  { port: 3389, service: "RDP", protocol: "TCP/UDP", category: "remote", caution: true, description: "Windows リモートデスクトップ。", note: "インターネット直公開はランサムウェアの主要侵入経路。VPN / RD Gateway の内側に置く。" },
  { port: 5900, service: "VNC", protocol: "TCP", category: "remote", caution: true, description: "画面共有(リモートデスクトップ)。", note: "認証が弱く平文のことが多い。VPN / SSH トンネル経由に限定する。" },
  { port: 5985, service: "WinRM (HTTP)", protocol: "TCP", category: "remote", description: "Windows リモート管理 / PowerShell Remoting（平文）。" },
  { port: 5986, service: "WinRM (HTTPS)", protocol: "TCP", category: "remote", description: "Windows リモート管理（TLS）。" },

  // ─── ファイル共有・転送 ───────────────────────────────────────
  { port: 21, service: "FTP", protocol: "TCP", category: "file", caution: true, description: "ファイル転送の制御チャネル。", note: "認証情報もデータも平文。SFTP(22) / FTPS へ移行を推奨。" },
  { port: 20, service: "FTP-DATA", protocol: "TCP", category: "file", description: "FTP のデータ転送チャネル（アクティブモード）。" },
  { port: 69, service: "TFTP", protocol: "UDP", category: "file", caution: true, description: "簡易ファイル転送。認証なし。", note: "ネットワーク機器のファーム配布等の内部用途に限定する。" },
  { port: 445, service: "SMB / CIFS", protocol: "TCP", category: "file", caution: true, description: "Windows ファイル共有。", note: "EternalBlue / WannaCry で悪用された。インターネットに出さない。" },
  { port: 139, service: "NetBIOS Session", protocol: "TCP", category: "file", caution: true, description: "旧来の Windows ファイル共有(NetBIOS)。", note: "外部公開は危険。445 と合わせて境界で遮断する。" },
  { port: 137, service: "NetBIOS Name", protocol: "UDP", category: "file", description: "Windows の名前解決(NetBIOS、レガシー)。" },
  { port: 138, service: "NetBIOS Datagram", protocol: "UDP", category: "file", description: "Windows のデータグラムサービス(NetBIOS、レガシー)。" },
  { port: 2049, service: "NFS", protocol: "TCP/UDP", category: "file", description: "Unix 系のネットワークファイル共有。" },
  { port: 873, service: "rsync", protocol: "TCP", category: "file", description: "rsync デーモンによる同期・バックアップ。" },
  { port: 548, service: "AFP", protocol: "TCP", category: "file", description: "Apple Filing Protocol（macOS の旧ファイル共有）。" },

  // ─── データベース ─────────────────────────────────────────────
  { port: 1433, service: "Microsoft SQL Server", protocol: "TCP", category: "db", caution: true, description: "SQL Server のデータベース接続。", note: "外部公開は厳禁。ファイアウォール内・VPN に限定する。" },
  { port: 1521, service: "Oracle Database", protocol: "TCP", category: "db", description: "Oracle DB のリスナー。" },
  { port: 3306, service: "MySQL / MariaDB", protocol: "TCP", category: "db", caution: true, description: "MySQL / MariaDB の接続ポート。", note: "インターネットに晒すと総当たり・情報漏洩の標的になる。" },
  { port: 5432, service: "PostgreSQL", protocol: "TCP", category: "db", caution: true, description: "PostgreSQL の接続ポート。", note: "外部公開せず VPN / 内部ネットワークに限定する。" },
  { port: 6379, service: "Redis", protocol: "TCP", category: "db", caution: true, description: "Redis(インメモリ KVS)。", note: "既定で認証なし。公開すると乗っ取り・データ消去の被害が多い。bind とパスワード必須。" },
  { port: 11211, service: "Memcached", protocol: "TCP/UDP", category: "db", caution: true, description: "Memcached(分散キャッシュ)。", note: "UDP 公開は増幅 DDoS に悪用される。外部に出さない。" },
  { port: 27017, service: "MongoDB", protocol: "TCP", category: "db", caution: true, description: "MongoDB の接続ポート。", note: "既定無認証のまま公開して大量漏洩する事故が多発。認証と bind 設定を必須に。" },
  { port: 9200, service: "Elasticsearch (HTTP)", protocol: "TCP", category: "db", caution: true, description: "Elasticsearch の REST API。", note: "無認証公開で情報漏洩が多発。認証・ネットワーク制限を行う。" },
  { port: 9300, service: "Elasticsearch (transport)", protocol: "TCP", category: "db", description: "Elasticsearch のノード間通信。" },
  { port: 5984, service: "CouchDB", protocol: "TCP", category: "db", description: "Apache CouchDB の HTTP API。" },
  { port: 9042, service: "Cassandra (CQL)", protocol: "TCP", category: "db", description: "Apache Cassandra のクエリ用ポート。" },
  { port: 8086, service: "InfluxDB", protocol: "TCP", category: "db", description: "時系列データベース InfluxDB の HTTP API。" },

  // ─── 認証・ディレクトリ・DNS ──────────────────────────────────
  { port: 53, service: "DNS", protocol: "TCP/UDP", category: "dir", description: "名前解決。通常は UDP、大きな応答やゾーン転送は TCP を使う。" },
  { port: 853, service: "DNS over TLS", protocol: "TCP", category: "dir", description: "暗号化 DNS(DoT)。" },
  { port: 88, service: "Kerberos", protocol: "TCP/UDP", category: "dir", description: "Kerberos 認証（Active Directory 等）。" },
  { port: 389, service: "LDAP", protocol: "TCP/UDP", category: "dir", description: "ディレクトリサービス(平文)。" },
  { port: 636, service: "LDAPS", protocol: "TCP", category: "dir", description: "LDAP over TLS(暗号化)。" },
  { port: 3268, service: "Global Catalog (LDAP)", protocol: "TCP", category: "dir", description: "Active Directory のグローバルカタログ。" },
  { port: 464, service: "Kerberos kpasswd", protocol: "TCP/UDP", category: "dir", description: "Kerberos のパスワード変更。" },
  { port: 1812, service: "RADIUS Authentication", protocol: "UDP", category: "dir", description: "RADIUS 認証（VPN / Wi-Fi 等）。" },
  { port: 1813, service: "RADIUS Accounting", protocol: "UDP", category: "dir", description: "RADIUS のアカウンティング(課金・記録)。" },

  // ─── ネットワーク基盤・VPN ────────────────────────────────────
  { port: 67, service: "DHCP (server)", protocol: "UDP", category: "infra", description: "DHCP サーバー(IP アドレス配布)。" },
  { port: 68, service: "DHCP (client)", protocol: "UDP", category: "infra", description: "DHCP クライアント。" },
  { port: 123, service: "NTP", protocol: "UDP", category: "infra", description: "時刻同期。", note: "monlist 等の増幅 DDoS に悪用された歴史がある。" },
  { port: 161, service: "SNMP", protocol: "UDP", category: "infra", caution: true, description: "ネットワーク機器の監視。", note: "community 名(public)放置や v1/v2c の公開は危険。" },
  { port: 162, service: "SNMP Trap", protocol: "UDP", category: "infra", description: "SNMP の通知(trap)受信。" },
  { port: 514, service: "Syslog", protocol: "UDP", category: "infra", description: "ログの集約・転送。" },
  { port: 179, service: "BGP", protocol: "TCP", category: "infra", description: "経路制御プロトコル(BGP)。" },
  { port: 500, service: "IKE / IPsec", protocol: "UDP", category: "infra", description: "IPsec VPN の鍵交換(IKE)。" },
  { port: 4500, service: "IPsec NAT-T", protocol: "UDP", category: "infra", description: "NAT 越えの IPsec 通信。" },
  { port: 1194, service: "OpenVPN", protocol: "UDP", category: "infra", description: "OpenVPN の既定ポート。" },
  { port: 1701, service: "L2TP", protocol: "UDP", category: "infra", description: "L2TP（通常 IPsec と併用）。" },
  { port: 1723, service: "PPTP", protocol: "TCP", category: "infra", caution: true, description: "旧式 VPN(PPTP)。", note: "暗号が脆弱で非推奨。WireGuard / IPsec へ移行する。" },
  { port: 51820, service: "WireGuard", protocol: "UDP", category: "infra", description: "WireGuard VPN の既定ポート。" },
  { port: 3478, service: "STUN / TURN", protocol: "UDP", category: "infra", description: "NAT 越え(WebRTC 等の P2P 通信)。" },
  { port: 1900, service: "SSDP / UPnP", protocol: "UDP", category: "infra", caution: true, description: "UPnP の機器探索。", note: "外部公開は反射 DDoS・機器乗っ取りに悪用される。境界で閉じる。" },

  // ─── アプリ・運用ツール ───────────────────────────────────────
  { port: 6443, service: "Kubernetes API", protocol: "TCP", category: "app", description: "Kubernetes の API サーバー。" },
  { port: 2379, service: "etcd (client)", protocol: "TCP", category: "app", description: "Kubernetes 等の etcd クライアント通信。" },
  { port: 2380, service: "etcd (peer)", protocol: "TCP", category: "app", description: "etcd のノード間通信。" },
  { port: 10250, service: "kubelet API", protocol: "TCP", category: "app", description: "Kubernetes ノードの kubelet。" },
  { port: 2375, service: "Docker API (平文)", protocol: "TCP", category: "app", caution: true, description: "Docker Engine API(TLS なし)。", note: "公開するとホスト乗っ取り＝実質 root。絶対に外部公開しない。" },
  { port: 2376, service: "Docker API (TLS)", protocol: "TCP", category: "app", description: "Docker Engine API(TLS あり)。" },
  { port: 9090, service: "Prometheus", protocol: "TCP", category: "app", description: "Prometheus 監視サーバー。" },
  { port: 9100, service: "node_exporter", protocol: "TCP", category: "app", description: "Prometheus 用のノードメトリクス。" },
  { port: 5601, service: "Kibana", protocol: "TCP", category: "app", description: "Elastic Stack の可視化(Kibana)。" },
  { port: 5672, service: "AMQP (RabbitMQ)", protocol: "TCP", category: "app", description: "メッセージキュー(RabbitMQ / AMQP)。" },
  { port: 15672, service: "RabbitMQ 管理 UI", protocol: "TCP", category: "app", description: "RabbitMQ の管理コンソール。" },
  { port: 9092, service: "Kafka", protocol: "TCP", category: "app", description: "Apache Kafka のブローカー。" },
  { port: 2181, service: "ZooKeeper", protocol: "TCP", category: "app", description: "分散協調サービス(ZooKeeper)。" },
  { port: 25565, service: "Minecraft", protocol: "TCP", category: "app", description: "Minecraft サーバーの既定ポート。" },
  { port: 631, service: "IPP / CUPS", protocol: "TCP", category: "app", description: "ネットワーク印刷(IPP / CUPS)。" },
  { port: 5060, service: "SIP", protocol: "TCP/UDP", category: "app", description: "VoIP の呼制御(SIP、平文)。" },
  { port: 5061, service: "SIP-TLS", protocol: "TCP", category: "app", description: "暗号化された SIP。" },
  { port: 5222, service: "XMPP (client)", protocol: "TCP", category: "app", description: "XMPP / Jabber のクライアント接続。" },
  { port: 6667, service: "IRC", protocol: "TCP", category: "app", description: "IRC チャット。", note: "古くはボットネットの C2 に悪用された。" },
  { port: 4444, service: "（要注意）リバースシェル常用", protocol: "TCP", category: "app", caution: true, description: "正規サービスの既定ではない。", note: "Metasploit の既定リスナーや一部マルウェアのリバースシェルで多用される。社内で開いていたら要調査。" },
  { port: 31337, service: "（要注意）バックドア象徴", protocol: "TCP", category: "app", caution: true, description: "「elite/leet」を意味する象徴的ポート。", note: "Back Orifice 等の古典的バックドアで使われた。正規用途はほぼ無い。" },
];
