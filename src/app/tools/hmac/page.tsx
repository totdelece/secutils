"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Algorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
type Format = "hex" | "base64" | "base64url";

const ALGORITHMS: { value: Algorithm; label: string; bits: number }[] = [
  { value: "SHA-1", label: "HMAC-SHA1", bits: 160 },
  { value: "SHA-256", label: "HMAC-SHA256", bits: 256 },
  { value: "SHA-384", label: "HMAC-SHA384", bits: 384 },
  { value: "SHA-512", label: "HMAC-SHA512", bits: 512 },
];

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

function bufToBase64(buf: ArrayBuffer): string {
  let s = "";
  const bytes = new Uint8Array(buf);
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

function bufToBase64Url(buf: ArrayBuffer): string {
  return bufToBase64(buf)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function computeHmac(
  message: string,
  secret: string,
  algorithm: Algorithm,
): Promise<ArrayBuffer> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: algorithm },
    false,
    ["sign"],
  );
  return crypto.subtle.sign("HMAC", key, enc.encode(message));
}

export default function HmacPage() {
  const [message, setMessage] = useState("Hello, secutils!");
  const [secret, setSecret] = useState("my-secret-key");
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256");
  const [format, setFormat] = useState<Format>("hex");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    let cancelled = false;
    computeHmac(message, secret, algorithm)
      .then((buf) => {
        if (cancelled) return;
        let formatted: string;
        switch (format) {
          case "hex":
            formatted = bufToHex(buf);
            break;
          case "base64":
            formatted = bufToBase64(buf);
            break;
          case "base64url":
            formatted = bufToBase64Url(buf);
            break;
        }
        setResult(formatted);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setResult("");
        setError(e instanceof Error ? e.message : "HMAC計算に失敗しました");
      });
    return () => {
      cancelled = true;
    };
  }, [message, secret, algorithm, format]);

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔏 HMAC Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        メッセージとシークレットキーから HMAC（Hash-based Message Authentication Code）を計算。Webhook 署名検証・API シグネチャ生成・JWT署名等で使用します。
        ブラウザの <code className="font-mono">SubtleCrypto</code> API で計算され、データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="hmac-message" className="text-sm font-medium block mb-2">
          メッセージ（入力）
        </label>
        <textarea
          id="hmac-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="HMAC を計算する対象のテキスト..."
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50"
          spellCheck={false}
        />
        <div className="mt-1 text-xs text-black/50 dark:text-white/50 font-mono">
          {message.length.toLocaleString()} 文字 ·{" "}
          {new TextEncoder().encode(message).length.toLocaleString()} bytes
        </div>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="hmac-secret" className="text-sm font-medium">
            シークレットキー
          </label>
          <button
            onClick={() => setShowSecret((s) => !s)}
            className="text-xs text-black/50 dark:text-white/50 hover:text-foreground underline"
            type="button"
          >
            {showSecret ? "隠す" : "表示"}
          </button>
        </div>
        <input
          id="hmac-secret"
          type={showSecret ? "text" : "password"}
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="シークレットキー（任意の文字列）"
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50"
          autoComplete="off"
          spellCheck={false}
        />
        <div className="mt-1 text-xs text-black/50 dark:text-white/50 font-mono">
          {new TextEncoder().encode(secret).length.toLocaleString()} bytes
          {secret.length === 0 && " · ⚠ 空のキーは使わないでください"}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm font-medium mb-2">アルゴリズム</div>
          <div className="flex flex-wrap gap-2">
            {ALGORITHMS.map((a) => (
              <button
                key={a.value}
                onClick={() => setAlgorithm(a.value)}
                title={`${a.bits} bit 出力`}
                className={`px-3 py-1.5 rounded text-xs font-mono border transition ${
                  algorithm === a.value
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">出力フォーマット</div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 inline-flex bg-black/5 dark:bg-white/5">
            {(["hex", "base64", "base64url"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-3 py-1 rounded text-xs font-mono transition ${
                  format === f
                    ? "bg-emerald-600 text-white"
                    : "text-black/70 dark:text-white/70 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
          ⚠ {error}
        </div>
      ) : (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              HMAC（{algorithm}, {format}）
            </label>
            <button
              onClick={copy}
              disabled={!result}
              className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div
            className="font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 break-all min-h-[3rem] select-all"
            onClick={(e) => {
              const range = document.createRange();
              range.selectNodeContents(e.currentTarget);
              const sel = window.getSelection();
              sel?.removeAllRanges();
              sel?.addRange(range);
            }}
          >
            {result || (
              <span className="text-black/30 dark:text-white/30">
                計算中…
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 HMACについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>HMAC（RFC 2104）</strong>はメッセージとシークレットキーから一方向ハッシュを計算する仕組み。鍵を知っている人だけが正しい署名を作れるため、メッセージの<strong>改ざん検出</strong>と<strong>送信者認証</strong>に使われます。
          </li>
          <li>
            <strong>主な用途</strong>: Stripe / GitHub / Slack 等の Webhook 署名検証、AWS Signature V4、JWT (HS256/HS384/HS512) の署名部分、API リクエストの整合性チェック。
          </li>
          <li>
            <strong>SHA-1 は非推奨</strong>: 衝突攻撃が現実的になっているため、新規実装では <strong>SHA-256 以上</strong> を推奨します。HMAC-SHA1 自体は HMAC 構造の特性で当面安全とされますが、将来的な安全性のために避けるのが無難です。
          </li>
          <li>
            <strong>シークレットキーの長さ</strong>: ハッシュ出力長と同じか長くするのが推奨（HMAC-SHA256 なら 32 bytes 以上）。短すぎると総当たり攻撃に弱くなります。本ツールでも空のキーには警告を出します。
          </li>
          <li>
            出力フォーマットの<strong>用途別目安</strong>: hex（最も一般的、ログ・URL）、base64（HTTPヘッダー）、base64url（JWT、URL中）。
          </li>
        </ul>
      </div>
    </div>
  );
}
