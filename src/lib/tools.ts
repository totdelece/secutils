export type ToolCategory = "security" | "encoding" | "network" | "misc";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: string;
  useCase: string;
};

export const categoryLabels: Record<ToolCategory, string> = {
  security: "Security",
  encoding: "Encoding",
  network: "Network",
  misc: "Productivity",
};

export const categoryDescriptions: Record<ToolCategory, string> = {
  security: "認証、署名、ハッシュ、パスワードまわりをブラウザ内で確認できます。",
  encoding: "JSON、URL、Base64、HTML entity などの変換作業をすばやく片付けます。",
  network: "CIDR、HTTP ステータス、通信の基礎を調べるための道具です。",
  misc: "UUID、正規表現、時刻、差分など、日々の開発で使う小道具です。",
};

export const tools: Tool[] = [
  {
    slug: "password-generator",
    title: "Password Generator",
    description:
      "暗号学的に安全な乱数でパスワードやパスフレーズを生成します。長さ、文字種、記号の有無を細かく調整できます。",
    category: "security",
    icon: "🔐",
    useCase: "安全な初期パスワードを作る",
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    description:
      "テキストやファイルから MD5 / SHA-1 / SHA-256 / SHA-512 を計算します。チェックサム確認にも使えます。",
    category: "security",
    icon: "#",
    useCase: "ファイル改ざんや一致確認",
  },
  {
    slug: "sri-hash",
    title: "SRI Hash Generator",
    description:
      "JS / CSS ファイルやテキストから Subresource Integrity ハッシュ（sha256 / sha384 / sha512）を生成し、integrity 属性付きの script / link タグをそのまま出力します。CDN リソースの改ざん対策に。",
    category: "security",
    icon: "SRI",
    useCase: "CDNリソースのintegrity属性を生成",
  },
  {
    slug: "base64",
    title: "Base64 Encode / Decode",
    description:
      "通常の Base64 と URL-safe Base64 を相互変換します。UTF-8 テキストの扱いにも対応しています。",
    category: "encoding",
    icon: "B64",
    useCase: "トークンや設定値の中身を確認",
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    description:
      "JWT を Header / Payload / Signature に分解し、期限やクレームを読みやすく表示します。署名検証にも対応しています。",
    category: "security",
    icon: "JWT",
    useCase: "ログイン不具合の切り分け",
  },
  {
    slug: "url-encoder",
    title: "URL Encoder / Decoder",
    description:
      "URL とクエリ文字列をエンコード/デコードします。encodeURI と encodeURIComponent の違いを選べます。",
    category: "encoding",
    icon: "%20",
    useCase: "壊れたURLや日本語URLの確認",
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    description:
      "UUID v4 と時系列ソートしやすい UUID v7 をまとめて生成します。大量生成とコピーに対応しています。",
    category: "misc",
    icon: "ID",
    useCase: "テストデータのID作成",
  },
  {
    slug: "cidr-calculator",
    title: "CIDR / Subnet Calculator",
    description:
      "IPv4 / IPv6 の CIDR からネットワーク範囲、ホスト数、マスク、ワイルドカードを計算します。",
    category: "network",
    icon: "IP",
    useCase: "サブネット設計の確認",
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description:
      "正規表現のマッチ、キャプチャグループ、置換結果をその場で確認できます。よく使うフラグも切り替えられます。",
    category: "misc",
    icon: ".*",
    useCase: "ログ抽出や入力チェックの検証",
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter / Validator",
    description:
      "JSON の整形、最小化、バリデーションを行います。エラー位置も確認しやすく表示します。",
    category: "encoding",
    icon: "{}",
    useCase: "APIレスポンスの整形",
  },
  {
    slug: "timestamp-converter",
    title: "Timestamp Converter",
    description:
      "UNIX 秒、ミリ秒、ISO 8601、UTC、JST、ローカル時刻を相互変換します。",
    category: "misc",
    icon: "UTC",
    useCase: "ログ時刻や期限の確認",
  },
  {
    slug: "html-entity",
    title: "HTML Entity Encoder / Decoder",
    description:
      "HTML entity と通常テキストを相互変換します。XSS 対策で必要なエスケープ確認にも使えます。",
    category: "encoding",
    icon: "&;",
    useCase: "HTML表示崩れの調査",
  },
  {
    slug: "diff-viewer",
    title: "Diff Viewer",
    description:
      "2つのテキスト差分を行単位で表示します。追加、削除、変更を色分けして確認できます。",
    category: "misc",
    icon: "+-",
    useCase: "設定ファイルの差分確認",
  },
  {
    slug: "qr-code",
    title: "QR Code Generator",
    description:
      "テキストやURLから QR コードを生成します。誤り訂正レベルや色を調整し、SVG/PNGで保存できます。",
    category: "misc",
    icon: "QR",
    useCase: "URL共有用のQR作成",
  },
  {
    slug: "json-yaml",
    title: "JSON ↔ YAML Converter",
    description:
      "JSON と YAML を相互変換します。Kubernetes、Docker Compose、GitHub Actions の設定確認に便利です。",
    category: "encoding",
    icon: "YML",
    useCase: "設定ファイル形式の変換",
  },
  {
    slug: "hmac",
    title: "HMAC Generator",
    description:
      "メッセージと秘密鍵から HMAC 署名を生成します。SHA-1/256/384/512 と複数の出力形式に対応しています。",
    category: "security",
    icon: "MAC",
    useCase: "Webhook署名の検証",
  },
  {
    slug: "cron-parser",
    title: "Cron Expression Parser",
    description:
      "cron 式を人が読める日本語に変換し、次回実行予定を表示します。定期実行の設定レビューに使えます。",
    category: "misc",
    icon: "CRON",
    useCase: "ジョブ実行時刻の確認",
  },
  {
    slug: "totp",
    title: "TOTP Generator (2FA)",
    description:
      "RFC 6238 の TOTP をブラウザ内で生成します。Base32 秘密鍵、otpauth URI、QR 連携に対応しています。",
    category: "security",
    icon: "2FA",
    useCase: "2段階認証の検証",
  },
  {
    slug: "bcrypt",
    title: "Bcrypt Hasher / Verifier",
    description:
      "bcrypt ハッシュの生成と照合を行います。コスト係数を変えながら処理時間も確認できます。",
    category: "security",
    icon: "BC",
    useCase: "パスワード保存方式の確認",
  },
  {
    slug: "http-status",
    title: "HTTP Status Code Reference",
    description:
      "HTTP ステータスコードの意味、よくある用途、注意点を検索できます。API設計や障害調査に便利です。",
    category: "network",
    icon: "HTTP",
    useCase: "APIレスポンスの意味確認",
  },
  {
    slug: "port-reference",
    title: "Port Number Reference",
    description:
      "よく使われる TCP / UDP のポート番号を、サービス名・用途・リスクから検索できます。ファイアウォール設定やポートスキャン結果の確認、不審な開放ポートの調査に便利です。",
    category: "network",
    icon: "PORT",
    useCase: "ポート番号とサービス・リスクの確認",
  },
  {
    slug: "cookie-parser",
    title: "HTTP Cookie Parser",
    description:
      "Cookie / Set-Cookie ヘッダーを分解し、Secure、HttpOnly、SameSite などの属性を見やすく表示します。",
    category: "security",
    icon: "CK",
    useCase: "Cookie設定の安全性確認",
  },
  {
    slug: "color-converter",
    title: "Color Converter",
    description:
      "HEX / RGB / HSL / HSV を相互変換し、WCAG コントラスト比を確認できます。",
    category: "encoding",
    icon: "RGB",
    useCase: "UIカラーの確認",
  },
  {
    slug: "ulid-generator",
    title: "ULID Generator",
    description:
      "Crockford Base32 でエンコードされた 26 文字の ULID を生成します。先頭がタイムスタンプなので文字列ソートで時系列に並びます。",
    category: "misc",
    icon: "ULID",
    useCase: "時系列ソートできるID生成",
  },
  {
    slug: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description:
      "段落数や単語数を指定して Lorem Ipsum のダミーテキストを生成します。日本語ダミーテキストにも対応しています。",
    category: "misc",
    icon: "L¶",
    useCase: "デザイン検証用ダミー文章作成",
  },
  {
    slug: "security-headers",
    title: "Security Headers Analyzer",
    description:
      "HTTP レスポンスヘッダーを貼り付けると、CSP / HSTS / X-Frame-Options などのセキュリティヘッダーを採点し、各項目の意味と修正例を表示します。",
    category: "security",
    icon: "SH",
    useCase: "レスポンスヘッダーの安全性採点",
  },
  {
    slug: "exif-viewer",
    title: "EXIF Viewer / Stripper",
    description:
      "写真の EXIF メタデータ（GPS の撮影位置・撮影日時・カメラ機種など）を表示し、ワンクリックで取り除いた画像をダウンロードできます。画像はブラウザ内だけで処理します。",
    category: "security",
    icon: "EXIF",
    useCase: "画像の位置情報・撮影情報の確認と除去",
  },
  {
    slug: "mock-json-generator",
    title: "Mock JSON Generator",
    description:
      "フィールドと型を定義して、テスト用のダミー JSON データを生成します。名前・メール・日時・UUID・選択肢などに対応し、整形 JSON / NDJSON / 単一オブジェクトで出力できます。",
    category: "misc",
    icon: "MOCK",
    useCase: "テスト用ダミーデータ作成",
  },
  {
    slug: "ip-converter",
    title: "IP Address Converter",
    description:
      "IPアドレスを各表記で相互変換します。IPv4 のドット10進・10進整数・16進・8進・2進・逆引き(in-addr.arpa)、IPv6 の短縮/完全表記・逆引き(ip6.arpa)に対応。http://2130706433/ のような難読化されたIPを元に戻せるので、SSRF やフィッシングURLの調査にも使えます。",
    category: "network",
    icon: "IP↔",
    useCase: "難読化IPの展開・IP表記の相互変換",
  },
];
