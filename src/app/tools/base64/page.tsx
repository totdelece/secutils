"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Mode = "encode" | "decode";

function encodeStandard(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function decodeStandard(b64: string): string {
  const cleaned = b64.replace(/\s+/g, "");
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function toUrlSafe(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromUrlSafe(b64url: string): string {
  let s = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad === 2) s += "==";
  else if (pad === 3) s += "=";
  else if (pad === 1) throw new Error("不正なBase64長");
  return s;
}

function transform(input: string, mode: Mode, urlSafe: boolean): string {
  if (input === "") return "";
  if (mode === "encode") {
    const std = encodeStandard(input);
    return urlSafe ? toUrlSafe(std) : std;
  } else {
    const std = urlSafe ? fromUrlSafe(input.replace(/\s+/g, "")) : input;
    return decodeStandard(std);
  }
}

export default function Base64Page() {
  const [mode, setMode] = useState<Mode>("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    try {
      return { output: transform(input, mode, urlSafe), error: null as string | null };
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "デコードに失敗しました（不正なBase64文字列の可能性）";
      return { output: "", error: msg };
    }
  }, [input, mode, urlSafe]);

  useEffect(() => {
    setCopied(false);
  }, [output]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const swap = () => {
    if (!output || error) return;
    setInput(output);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const inputBytes = useMemo(
    () => new TextEncoder().encode(input).length,
    [input],
  );

  const placeholder =
    mode === "encode"
      ? "エンコードしたいテキストを入力..."
      : "デコードしたいBase64文字列を貼り付け...";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔁 Base64 Encode / Decode
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        テキストとBase64の相互変換。UTF-8マルチバイト文字対応、URL-safe（base64url）にも対応。
        すべてブラウザ内で処理され、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 mb-4 inline-flex bg-black/5 dark:bg-white/5">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              mode === m
                ? "bg-emerald-600 text-white"
                : "text-black/70 dark:text-white/70 hover:text-foreground"
            }`}
          >
            {m === "encode" ? "エンコード" : "デコード"}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
            className="accent-emerald-600"
          />
          <span>URL-safe (base64url)</span>
          <span className="text-xs text-black/50 dark:text-white/50">
            — `+`/`/` を `-`/`_` に置換、パディング省略
          </span>
        </label>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">
            {mode === "encode" ? "テキスト（入力）" : "Base64（入力）"}
          </label>
          <span className="text-xs text-black/50 dark:text-white/50">
            {input.length.toLocaleString()} 文字 · {inputBytes.toLocaleString()} bytes
          </span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={placeholder}
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all"
        />
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={swap}
          disabled={!output || !!error}
          className="text-xs px-3 py-1.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
          title="出力を入力欄に移してモード切替"
        >
          ↕ 入れ替え
        </button>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">
            {mode === "encode" ? "Base64（出力）" : "テキスト（出力）"}
          </label>
          <button
            onClick={copy}
            disabled={!output}
            className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {error ? (
          <div className="font-mono text-sm text-red-600 dark:text-red-400 bg-red-500/10 rounded p-3">
            ⚠ {error}
          </div>
        ) : (
          <textarea
            readOnly
            value={output}
            rows={6}
            placeholder="ここに結果が表示されます"
            className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y break-all"
            onFocus={(e) => e.currentTarget.select()}
          />
        )}
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 Base64について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Base64は<strong>暗号化ではなくエンコード</strong>です。誰でも復号できるため、機密情報の保護目的では使用しないでください。
          </li>
          <li>
            <strong>標準（RFC 4648）</strong> は <code className="font-mono">A-Z a-z 0-9 + /</code> と末尾パディング <code className="font-mono">=</code> を使用します。
          </li>
          <li>
            <strong>URL-safe（base64url）</strong> は <code className="font-mono">+</code>/<code className="font-mono">/</code> を <code className="font-mono">-</code>/<code className="font-mono">_</code> に置換し、パディングを省略します（JWT等で使用）。
          </li>
          <li>
            日本語などのマルチバイト文字も UTF-8 で正しくエンコード・デコードされます。
          </li>
        </ul>
      </div>
    </div>
  );
}
