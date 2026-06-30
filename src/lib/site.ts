import type { Metadata } from "next";
import { tools } from "./tools";

export const siteName = "secutils";
export const siteTagline = "ブラウザで使える開発者向けセキュリティツール集";
export const siteDescription =
  "パスワード生成、JWT解析、ハッシュ計算、JSON整形、CIDR計算などをブラウザ内で完結できる開発者向けWebツール集です。入力データはサーバーに送信しません。";

export function getBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

const toolSeo: Record<string, { title: string; description: string }> = {
  "password-generator": {
    title: "Password Generator - 安全なパスワード生成・パスフレーズ作成ツール",
    description:
      "ブラウザ内で安全なパスワードとパスフレーズを生成できる無料ツールです。長さ、記号、数字、大文字小文字を調整し、入力データはサーバーに送信しません。",
  },
  "hash-generator": {
    title: "Hash Generator - SHA-256・SHA-512・MD5 ハッシュ計算ツール",
    description:
      "テキストやファイルからSHA-256、SHA-512、SHA-1、MD5のハッシュ値をブラウザ内で計算します。チェックサム確認や改ざん検知に使える無料ツールです。",
  },
  base64: {
    title: "Base64 Encode / Decode - Base64 エンコード・デコード変換ツール",
    description:
      "Base64とURL-safe Base64をブラウザ内でエンコード・デコードできる無料ツールです。UTF-8テキスト、トークン、設定値の確認に使えます。",
  },
  "jwt-decoder": {
    title: "JWT Decoder - JWT デコード・署名検証・期限確認ツール",
    description:
      "JWTをHeader、Payload、Signatureに分解し、expやiatなどのクレームを読みやすく表示します。HS256系の署名検証もブラウザ内で行えます。",
  },
  "url-encoder": {
    title: "URL Encoder / Decoder - URLエンコード・デコード変換ツール",
    description:
      "URL、クエリ文字列、日本語URLをエンコード・デコードできる無料ツールです。encodeURIとencodeURIComponentの違いを切り替えて確認できます。",
  },
  "uuid-generator": {
    title: "UUID Generator - UUID v4・UUID v7 生成ツール",
    description:
      "UUID v4と時系列ソートしやすいUUID v7をブラウザ内でまとめて生成できる無料ツールです。テストデータやID作成に使えます。",
  },
  "cidr-calculator": {
    title: "CIDR / Subnet Calculator - IPアドレス・サブネット計算ツール",
    description:
      "IPv4/IPv6のCIDRからネットワーク範囲、ホスト数、サブネットマスク、ワイルドカードを計算します。サブネット設計をブラウザ内で確認できます。",
  },
  "regex-tester": {
    title: "Regex Tester - 正規表現テスト・置換確認ツール",
    description:
      "正規表現のマッチ、キャプチャグループ、置換結果をブラウザ内で確認できる無料ツールです。ログ抽出や入力チェックの検証に使えます。",
  },
  "json-formatter": {
    title: "JSON Formatter / Validator - JSON整形・検証・圧縮ツール",
    description:
      "JSONの整形、最小化、バリデーションをブラウザ内で行える無料ツールです。APIレスポンスの確認やエラー位置の特定に使えます。",
  },
  "timestamp-converter": {
    title: "Timestamp Converter - UNIX時間・ISO 8601・JST変換ツール",
    description:
      "UNIX秒、ミリ秒、ISO 8601、UTC、JST、ローカル時刻を相互変換します。ログ時刻、期限、APIレスポンスの日付確認に使える無料ツールです。",
  },
  "html-entity": {
    title: "HTML Entity Encoder / Decoder - HTMLエンティティ変換ツール",
    description:
      "HTMLエンティティと通常テキストをブラウザ内でエンコード・デコードします。XSS対策のエスケープ確認や表示崩れの調査に使えます。",
  },
  "diff-viewer": {
    title: "Diff Viewer - テキスト差分比較ツール",
    description:
      "2つのテキスト差分を行単位で比較し、追加、削除、変更を色分けして表示します。設定ファイルやコード片の差分確認に使える無料ツールです。",
  },
  "qr-code": {
    title: "QR Code Generator - QRコード作成・SVG/PNG保存ツール",
    description:
      "テキストやURLからQRコードをブラウザ内で生成します。誤り訂正レベルや色を調整し、SVG/PNGで保存できる無料ツールです。",
  },
  "json-yaml": {
    title: "JSON YAML Converter - JSON・YAML相互変換ツール",
    description:
      "JSONとYAMLをブラウザ内で相互変換します。Kubernetes、Docker Compose、GitHub Actionsなどの設定ファイル確認に使えます。",
  },
  hmac: {
    title: "HMAC Generator - HMAC SHA-256・署名生成ツール",
    description:
      "メッセージと秘密鍵からHMAC署名を生成します。SHA-1、SHA-256、SHA-384、SHA-512に対応し、Webhook署名の検証に使えます。",
  },
  "cron-parser": {
    title: "Cron Expression Parser - cron式の読み方・次回実行時刻確認ツール",
    description:
      "cron式を人が読める日本語に変換し、次回実行予定を表示します。定期実行ジョブの設定レビューに使える無料ツールです。",
  },
  totp: {
    title: "TOTP Generator - 2FAワンタイムパスワード生成・検証ツール",
    description:
      "RFC 6238のTOTPをブラウザ内で生成します。Base32秘密鍵、otpauth URI、QR連携に対応し、2段階認証の検証に使えます。",
  },
  bcrypt: {
    title: "Bcrypt Hasher / Verifier - bcryptハッシュ生成・照合ツール",
    description:
      "bcryptハッシュの生成と照合をブラウザ内で行います。コスト係数を変えながら処理時間を確認し、パスワード保存方式の検証に使えます。",
  },
  "http-status": {
    title: "HTTP Status Code Reference - HTTPステータスコード検索ツール",
    description:
      "HTTPステータスコードの意味、用途、注意点を検索できる無料リファレンスです。API設計や障害調査でレスポンスコードをすばやく確認できます。",
  },
  "cookie-parser": {
    title: "HTTP Cookie Parser - Cookie・Set-Cookie解析ツール",
    description:
      "CookieとSet-Cookieヘッダーを分解し、Secure、HttpOnly、SameSite、Expiresなどの属性を見やすく表示します。Cookie設定の安全性確認に使えます。",
  },
  "color-converter": {
    title: "Color Converter - HEX・RGB・HSL変換とWCAGコントラスト確認ツール",
    description:
      "HEX、RGB、HSL、HSVを相互変換し、WCAGコントラスト比を確認できます。UIカラーの検証に使えるブラウザ内ツールです。",
  },
  "ulid-generator": {
    title: "ULID Generator - 26文字Crockford Base32の時系列IDを生成",
    description:
      "Crockford Base32エンコードの26文字ULIDをブラウザ内で生成します。先頭48bitがミリ秒タイムスタンプなので文字列ソートで時系列に並びます。",
  },
  "lorem-ipsum": {
    title: "Lorem Ipsum Generator - ダミーテキスト生成（日本語対応）",
    description:
      "段落数、単語数、Lorem ipsum で始めるかを指定してダミーテキストをブラウザ内で生成します。日本語ダミー文章にも対応し、デザイン検証やワイヤーフレーム作成に使えます。",
  },
  "security-headers": {
    title: "Security Headers Analyzer - HTTPセキュリティヘッダー採点ツール",
    description:
      "HTTPレスポンスヘッダーを貼り付けて、CSP・HSTS・X-Frame-Options・X-Content-Type-Options・Referrer-Policy・Permissions-Policyをブラウザ内で採点します。A〜F評価と各ヘッダーの意味・修正例つき。データはサーバーに送信しません。",
  },
  "exif-viewer": {
    title: "EXIF Viewer / Stripper - 画像の位置情報・撮影情報を確認・削除",
    description:
      "写真のEXIFメタデータ（GPSの撮影位置・撮影日時・カメラ機種など）をブラウザ内で表示し、ワンクリックで取り除いた画像をダウンロードできる無料ツールです。JPEGは再圧縮なしで除去。画像はサーバーに送信しません。",
  },
  "mock-json-generator": {
    title: "Mock JSON Generator - テスト用ダミーJSONデータ生成ツール",
    description:
      "フィールドと型を指定してテスト用のダミーJSONデータをブラウザ内で生成できる無料ツールです。名前・メール・日時・UUID・価格・選択肢などに対応し、整形JSON・NDJSON(JSON Lines)・単一オブジェクトで出力。APIモックやテストデータ作成に使えます。",
  },
  "ip-converter": {
    title: "IP Address Converter - IPアドレス表記変換・難読化IP展開ツール",
    description:
      "IPアドレスをドット10進・10進整数・16進・8進・2進・逆引き(in-addr.arpa / ip6.arpa)へブラウザ内で相互変換できる無料ツールです。IPv4 / IPv6 を自動判定し、http://2130706433/ のように整数化・難読化されたIPも展開。SSRF・フィッシングURLの調査に。データはサーバーに送信しません。",
  },
};

export function getToolSeo(slug: string) {
  return toolSeo[slug];
}

export function getToolMetadata(slug: string): Metadata {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};
  const path = `/tools/${tool.slug}`;
  const seo = getToolSeo(slug);
  const title = seo?.title ?? tool.title;
  const description = seo?.description ?? tool.description;
  const fullTitle = `${title} | ${siteName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      url: path,
      siteName,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${path}/opengraph-image`],
    },
  };
}
