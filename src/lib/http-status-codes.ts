export type StatusCode = {
  code: number;
  name: string;
  category: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
  description: string;
  usage?: string;
};

export const HTTP_STATUS_CODES: StatusCode[] = [
  // 1xx Informational
  { code: 100, name: "Continue", category: "1xx", description: "リクエストの続行を許可。クライアントがヘッダーだけ送って Expect: 100-continue ヘッダーで本文送信OKを確認する仕組み。" },
  { code: 101, name: "Switching Protocols", category: "1xx", description: "サーバーがプロトコル切替に同意。", usage: "WebSocket への昇格時（Upgrade: websocket）" },
  { code: 102, name: "Processing", category: "1xx", description: "WebDAV: リクエスト処理中（タイムアウト防止）。" },
  { code: 103, name: "Early Hints", category: "1xx", description: "本レスポンス前にヒント（Link ヘッダー等）を先送り。", usage: "preload で初期表示高速化" },

  // 2xx Success
  { code: 200, name: "OK", category: "2xx", description: "成功。汎用的な成功レスポンス。" },
  { code: 201, name: "Created", category: "2xx", description: "リソースを新規作成した。", usage: "POST 後、Location ヘッダーで作成先 URL を返すのが定番" },
  { code: 202, name: "Accepted", category: "2xx", description: "受理したが処理は非同期で実行中。" },
  { code: 203, name: "Non-Authoritative Information", category: "2xx", description: "プロキシが書き換えた情報を返している。" },
  { code: 204, name: "No Content", category: "2xx", description: "成功したがレスポンス本文なし。", usage: "DELETE 成功時、PUT で更新成功時" },
  { code: 205, name: "Reset Content", category: "2xx", description: "ブラウザにフォームリセットを指示（あまり使われない）。" },
  { code: 206, name: "Partial Content", category: "2xx", description: "Range リクエストへの部分応答。", usage: "動画のシーク、レジューム可能ダウンロード" },

  // 3xx Redirection
  { code: 300, name: "Multiple Choices", category: "3xx", description: "複数の選択肢あり（実装稀）。" },
  { code: 301, name: "Moved Permanently", category: "3xx", description: "永続的にリダイレクト。検索エンジンは新URLでインデックスし直す。", usage: "ドメイン引越、HTTPS化、URL正規化" },
  { code: 302, name: "Found", category: "3xx", description: "一時的リダイレクト。元URLは引き続き有効扱い。" },
  { code: 303, name: "See Other", category: "3xx", description: "別URLを GET で見るよう指示。", usage: "POST 後の Redirect-After-POST パターン" },
  { code: 304, name: "Not Modified", category: "3xx", description: "条件付きGETでキャッシュ有効。", usage: "If-Modified-Since / If-None-Match 付きリクエストへ" },
  { code: 307, name: "Temporary Redirect", category: "3xx", description: "302 と似るが、HTTPメソッドを保持する。" },
  { code: 308, name: "Permanent Redirect", category: "3xx", description: "301 と似るが、HTTPメソッドを保持する。" },

  // 4xx Client Error
  { code: 400, name: "Bad Request", category: "4xx", description: "リクエストが構文的に不正。", usage: "JSON パース失敗、必須パラメータ欠落" },
  { code: 401, name: "Unauthorized", category: "4xx", description: "認証が必要・認証失敗。WWW-Authenticate ヘッダーで認証方式を指示。", usage: "ログインしていない、トークン期限切れ" },
  { code: 402, name: "Payment Required", category: "4xx", description: "実用は限定的（一部の有料APIで利用）。" },
  { code: 403, name: "Forbidden", category: "4xx", description: "認証は通っているがアクセス権限なし。", usage: "他人のリソースへのアクセス、管理者専用機能" },
  { code: 404, name: "Not Found", category: "4xx", description: "リソースが存在しない。", usage: "URL の打ち間違い、削除済みリソース" },
  { code: 405, name: "Method Not Allowed", category: "4xx", description: "そのリソースに対するそのHTTPメソッドは許可されていない。", usage: "GET 専用エンドポイントへの POST" },
  { code: 406, name: "Not Acceptable", category: "4xx", description: "Accept ヘッダーで指定された形式で返せない。" },
  { code: 407, name: "Proxy Authentication Required", category: "4xx", description: "プロキシ認証が必要。" },
  { code: 408, name: "Request Timeout", category: "4xx", description: "サーバー側のリクエスト受信待ちタイムアウト。" },
  { code: 409, name: "Conflict", category: "4xx", description: "リソース状態の競合。", usage: "楽観ロック、重複作成、Git の競合等" },
  { code: 410, name: "Gone", category: "4xx", description: "永続的に削除された（404 の強化版）。" },
  { code: 411, name: "Length Required", category: "4xx", description: "Content-Length が必要。" },
  { code: 412, name: "Precondition Failed", category: "4xx", description: "If-Match 等の前提条件不一致。" },
  { code: 413, name: "Payload Too Large", category: "4xx", description: "リクエスト本文が大きすぎる。", usage: "ファイルアップロードのサイズ制限超過" },
  { code: 414, name: "URI Too Long", category: "4xx", description: "URL が長すぎる（多くは GET の query が膨大）。" },
  { code: 415, name: "Unsupported Media Type", category: "4xx", description: "Content-Type が対応外。" },
  { code: 416, name: "Range Not Satisfiable", category: "4xx", description: "Range リクエストの範囲がリソースサイズ外。" },
  { code: 417, name: "Expectation Failed", category: "4xx", description: "Expect ヘッダーの要求を満たせない。" },
  { code: 418, name: "I'm a teapot", category: "4xx", description: "ジョーク用ステータス（RFC 2324、エイプリルフール由来）。" },
  { code: 421, name: "Misdirected Request", category: "4xx", description: "サーバーがそのリクエストを処理できない。", usage: "HTTP/2 の接続再利用で Host が違うサーバーに来た時等" },
  { code: 422, name: "Unprocessable Entity", category: "4xx", description: "構文は正しいがバリデーションNG。", usage: "Rails / WebDAV 等で多用、フォームバリデーションエラー" },
  { code: 423, name: "Locked", category: "4xx", description: "WebDAV: ロック中。" },
  { code: 425, name: "Too Early", category: "4xx", description: "リプレイ攻撃のリスクがあるため拒否。" },
  { code: 426, name: "Upgrade Required", category: "4xx", description: "クライアントは別プロトコルへの昇格が必要。" },
  { code: 428, name: "Precondition Required", category: "4xx", description: "条件付きリクエスト必須（lost update防止）。" },
  { code: 429, name: "Too Many Requests", category: "4xx", description: "レート制限超過。", usage: "Retry-After ヘッダーで待機時間を指示" },
  { code: 431, name: "Request Header Fields Too Large", category: "4xx", description: "ヘッダーが大きすぎる。" },
  { code: 451, name: "Unavailable For Legal Reasons", category: "4xx", description: "法的理由で提供不可（GDPR、検閲等）。" },

  // 5xx Server Error
  { code: 500, name: "Internal Server Error", category: "5xx", description: "サーバー内部エラー（汎用）。", usage: "想定外の例外、null pointer 等" },
  { code: 501, name: "Not Implemented", category: "5xx", description: "そのHTTPメソッドが未実装。" },
  { code: 502, name: "Bad Gateway", category: "5xx", description: "ゲートウェイ（プロキシ・LB等）が上流から不正な応答を受け取った。", usage: "アプリサーバーが落ちている、LBから見えない" },
  { code: 503, name: "Service Unavailable", category: "5xx", description: "サーバーが一時的に利用不可。", usage: "メンテナンス、過負荷、Retry-After推奨" },
  { code: 504, name: "Gateway Timeout", category: "5xx", description: "ゲートウェイが上流からの応答を待ってタイムアウト。", usage: "アプリの処理が遅すぎる、LBタイムアウト" },
  { code: 505, name: "HTTP Version Not Supported", category: "5xx", description: "そのHTTPバージョンに非対応。" },
  { code: 506, name: "Variant Also Negotiates", category: "5xx", description: "コンテンツネゴシエーションの設定不正。" },
  { code: 507, name: "Insufficient Storage", category: "5xx", description: "WebDAV: ストレージ不足。" },
  { code: 508, name: "Loop Detected", category: "5xx", description: "WebDAV: 無限ループ検出。" },
  { code: 510, name: "Not Extended", category: "5xx", description: "拡張要件を満たしていない。" },
  { code: 511, name: "Network Authentication Required", category: "5xx", description: "ネットワーク認証が必要。", usage: "公衆Wi-Fiのキャプティブポータル" },
];

export const CATEGORY_LABELS: Record<StatusCode["category"], string> = {
  "1xx": "1xx Informational（情報）",
  "2xx": "2xx Success（成功）",
  "3xx": "3xx Redirection（リダイレクト）",
  "4xx": "4xx Client Error（クライアントエラー）",
  "5xx": "5xx Server Error（サーバーエラー）",
};

export const CATEGORY_COLORS: Record<StatusCode["category"], string> = {
  "1xx": "text-sky-600 dark:text-sky-400",
  "2xx": "text-emerald-600 dark:text-emerald-400",
  "3xx": "text-amber-600 dark:text-amber-400",
  "4xx": "text-orange-600 dark:text-orange-400",
  "5xx": "text-red-600 dark:text-red-400",
};
