"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SriAlgo = "sha256" | "sha384" | "sha512";
type Mode = "text" | "file";
type ResourceType = "script" | "link";

const ALGOS: SriAlgo[] = ["sha256", "sha384", "sha512"];

const SUBTLE_NAME: Record<SriAlgo, "SHA-256" | "SHA-384" | "SHA-512"> = {
  sha256: "SHA-256",
  sha384: "SHA-384",
  sha512: "SHA-512",
};

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB（Web リソース想定）

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  const CHUNK = 0x8000;
  let bin = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...Array.from(bytes.subarray(i, i + CHUNK)));
  }
  return btoa(bin);
}

async function sriToken(algo: SriAlgo, data: BufferSource): Promise<string> {
  const buf = await crypto.subtle.digest(SUBTLE_NAME[algo], data);
  return `${algo}-${bufToBase64(buf)}`;
}

const EMPTY: Record<SriAlgo, string> = { sha256: "", sha384: "", sha512: "" };

export default function SriHashPage() {
  const [mode, setMode] = useState<Mode>("file");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [tokens, setTokens] = useState<Record<SriAlgo, string>>(EMPTY);
  const [selectedAlgo, setSelectedAlgo] = useState<SriAlgo>("sha384");
  const [resourceType, setResourceType] = useState<ResourceType>("script");
  const [resourceUrl, setResourceUrl] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // テキストモード: 入力変更で再計算
  useEffect(() => {
    if (mode !== "text") return;
    let cancelled = false;
    (async () => {
      const data = new TextEncoder().encode(input);
      const [sha256, sha384, sha512] = await Promise.all([
        sriToken("sha256", data),
        sriToken("sha384", data),
        sriToken("sha512", data),
      ]);
      if (cancelled) return;
      setTokens({ sha256, sha384, sha512 });
    })();
    return () => {
      cancelled = true;
    };
  }, [input, mode]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setTokens(EMPTY);
    setFile(null);
  };

  const handleFile = async (f: File) => {
    setError(null);
    if (f.size > MAX_FILE_SIZE) {
      setError(
        `ファイルサイズが上限（${formatBytes(MAX_FILE_SIZE)}）を超えています: ${formatBytes(f.size)}`,
      );
      setFile(null);
      setTokens(EMPTY);
      return;
    }
    setFile(f);
    setTokens(EMPTY);
    setProcessing(true);
    try {
      const arrayBuffer = await f.arrayBuffer();
      const [sha256, sha384, sha512] = await Promise.all([
        sriToken("sha256", arrayBuffer),
        sriToken("sha384", arrayBuffer),
        sriToken("sha512", arrayBuffer),
      ]);
      setTokens({ sha256, sha384, sha512 });
    } catch (e) {
      setError(
        e instanceof Error
          ? `ファイル処理エラー: ${e.message}`
          : "ファイル処理に失敗しました",
      );
    } finally {
      setProcessing(false);
    }
  };

  const copy = async (key: string, value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const token = tokens[selectedAlgo];
  const hasToken = Boolean(token);
  const url =
    resourceUrl.trim() ||
    (resourceType === "script"
      ? "https://example.com/library.js"
      : "https://example.com/style.css");
  const snippet =
    resourceType === "script"
      ? `<script src="${url}" integrity="${token}" crossorigin="anonymous"></script>`
      : `<link rel="stylesheet" href="${url}" integrity="${token}" crossorigin="anonymous">`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🛡️ SRI Hash Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        JS / CSS ファイルやテキストから Subresource Integrity ハッシュ（
        <code className="font-mono">sha256 / sha384 / sha512</code>）を生成し、
        <code className="font-mono">integrity</code> 属性付きのタグをそのまま出力します。計算はブラウザ標準の{" "}
        <code className="font-mono">crypto.subtle</code> で行われ、内容はサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 mb-6 inline-flex bg-black/5 dark:bg-white/5">
        {(["file", "text"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              mode === m
                ? "bg-emerald-600 text-white"
                : "text-black/70 dark:text-white/70 hover:text-foreground"
            }`}
          >
            {m === "file" ? "ファイル" : "テキスト"}
          </button>
        ))}
      </div>

      {mode === "text" ? (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
          <label className="block text-sm font-medium mb-2">入力テキスト</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            placeholder="ハッシュ化したいスクリプト・スタイルなどを貼り付け..."
            className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50"
          />
          <div className="mt-2 text-xs text-black/50 dark:text-white/50">
            {input.length.toLocaleString()} 文字（UTF-8 のバイト列としてハッシュ化）
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            className={`rounded-lg border-2 border-dashed p-8 text-center transition ${
              isDragging
                ? "border-emerald-500 bg-emerald-500/5"
                : "border-black/10 dark:border-white/10"
            }`}
          >
            <div className="text-3xl mb-2">📂</div>
            <p className="text-sm mb-1">ここに JS / CSS ファイルをドロップ</p>
            <p className="text-xs text-black/50 dark:text-white/50 mb-4">または</p>
            <label className="inline-block cursor-pointer">
              <input
                type="file"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                  e.target.value = "";
                }}
                className="hidden"
              />
              <span className="inline-block px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition">
                ファイルを選択
              </span>
            </label>
            <p className="text-xs text-black/40 dark:text-white/40 mt-4">
              最大 {formatBytes(MAX_FILE_SIZE)} ・ ファイルはアップロードされません
            </p>
          </div>

          {file && !error && (
            <div className="mt-3 rounded-lg border border-black/10 dark:border-white/10 px-4 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-sm truncate">{file.name}</div>
                <div className="text-xs text-black/50 dark:text-white/50 mt-0.5">
                  {formatBytes(file.size)}
                  {file.type && ` · ${file.type}`}
                </div>
              </div>
              {processing && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse shrink-0">
                  計算中…
                </span>
              )}
            </div>
          )}

          {error && (
            <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400">
              ⚠ {error}
            </div>
          )}
        </div>
      )}

      {/* ハッシュトークン一覧 */}
      <div className="space-y-3">
        {ALGOS.map((algo) => {
          const value = tokens[algo];
          const isCopied = copiedKey === algo;
          const recommended = algo === "sha384";
          return (
            <div
              key={algo}
              className="rounded-lg border border-black/10 dark:border-white/10 p-4"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mono font-semibold text-sm">{algo}</span>
                  {recommended && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                      推奨
                    </span>
                  )}
                </div>
                <button
                  onClick={() => copy(algo, value)}
                  disabled={!value}
                  className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="font-mono text-xs sm:text-sm break-all bg-black/5 dark:bg-white/5 rounded px-3 py-2">
                {value || (
                  <span className="text-black/30 dark:text-white/30">
                    {processing ? "（計算中…）" : "（未入力）"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* タグスニペット出力 */}
      <div className="mt-8 rounded-lg border border-black/10 dark:border-white/10 p-5">
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <h2 className="text-sm font-semibold">integrity 属性付きタグ</h2>
          <div className="flex flex-wrap gap-2">
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-0.5 inline-flex bg-black/5 dark:bg-white/5">
              {(["script", "link"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setResourceType(t)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                    resourceType === t
                      ? "bg-emerald-600 text-white"
                      : "text-black/70 dark:text-white/70 hover:text-foreground"
                  }`}
                >
                  {t === "script" ? "<script>" : "<link>"}
                </button>
              ))}
            </div>
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-0.5 inline-flex bg-black/5 dark:bg-white/5">
              {ALGOS.map((a) => (
                <button
                  key={a}
                  onClick={() => setSelectedAlgo(a)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                    selectedAlgo === a
                      ? "bg-emerald-600 text-white"
                      : "text-black/70 dark:text-white/70 hover:text-foreground"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="block text-xs text-black/60 dark:text-white/60 mb-1">
          リソースの URL（任意・スニペットに差し込みます）
        </label>
        <input
          type="text"
          value={resourceUrl}
          onChange={(e) => setResourceUrl(e.target.value)}
          placeholder={
            resourceType === "script"
              ? "https://cdn.example.com/library.min.js"
              : "https://cdn.example.com/style.min.css"
          }
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 mb-3"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="relative">
          <pre className="font-mono text-xs sm:text-sm break-all whitespace-pre-wrap bg-black/5 dark:bg-white/5 rounded px-3 py-3 pr-16">
            {hasToken ? (
              snippet
            ) : (
              <span className="text-black/30 dark:text-white/30">
                ファイルまたはテキストを入力するとタグを生成します
              </span>
            )}
          </pre>
          <button
            onClick={() => copy("snippet", snippet)}
            disabled={!hasToken}
            className="absolute top-2 right-2 px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 bg-background hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copiedKey === "snippet" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 Subresource Integrity (SRI) について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>役割</strong>:{" "}
            <code className="font-mono">integrity</code>{" "}
            属性を付けると、ブラウザはダウンロードしたファイルのハッシュが一致したときだけ実行・適用します。CDN
            侵害やサプライチェーン攻撃で差し替えられたファイルをブロックできます。
          </li>
          <li>
            <strong>crossorigin が必須</strong>: 別オリジン（CDN
            等）から読み込む場合は{" "}
            <code className="font-mono">crossorigin=&quot;anonymous&quot;</code>{" "}
            が必要です。これが無いと SRI チェックは行われません。
          </li>
          <li>
            <strong>アルゴリズム</strong>: 仕様では{" "}
            <strong>sha384</strong>{" "}
            が推奨です。複数を空白区切りで併記すると、ブラウザは対応する最も強いものを使います。
          </li>
          <li>
            <strong>1 バイトでも変われば不一致</strong>:
            ファイルを更新したらハッシュも再生成が必要です。バージョン固定（URL
            にバージョンを含める）と併用すると安全です。
          </li>
          <li>
            <strong>プライバシー</strong>:
            計算はブラウザ内で完結し、ファイル内容や入力テキストはサーバーへ送信されません。
          </li>
        </ul>
      </div>
    </div>
  );
}
