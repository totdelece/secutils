"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Mode = "encode" | "decode";
type Algorithm = "component" | "uri";

function transform(input: string, mode: Mode, algorithm: Algorithm): string {
  if (input === "") return "";
  if (mode === "encode") {
    return algorithm === "component"
      ? encodeURIComponent(input)
      : encodeURI(input);
  } else {
    return algorithm === "component"
      ? decodeURIComponent(input)
      : decodeURI(input);
  }
}

export default function UrlEncoderPage() {
  const [mode, setMode] = useState<Mode>("encode");
  const [algorithm, setAlgorithm] = useState<Algorithm>("component");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    try {
      return {
        output: transform(input, mode, algorithm),
        error: null as string | null,
      };
    } catch (e) {
      const msg =
        e instanceof URIError
          ? "デコードに失敗しました（不正な %XX シーケンスが含まれています）"
          : e instanceof Error
            ? e.message
            : "変換に失敗しました";
      return { output: "", error: msg };
    }
  }, [input, mode, algorithm]);

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
      ? algorithm === "component"
        ? "エンコードしたい文字列を入力（例: hello world & foo=bar）..."
        : "エンコードしたいURLを入力（例: https://example.com/パス?q=値）..."
      : "デコードしたい URL エンコード文字列を貼り付け...";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔗 URL Encoder / Decoder
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        URLとテキストの相互変換。クエリパラメータ用の <code className="font-mono">encodeURIComponent</code> と URL全体用の{" "}
        <code className="font-mono">encodeURI</code> を切替可能。
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
        <div className="text-sm font-medium mb-2">エンコード方式</div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="algorithm"
              value="component"
              checked={algorithm === "component"}
              onChange={() => setAlgorithm("component")}
              className="accent-emerald-600 mt-0.5"
            />
            <span>
              <span className="font-mono">encodeURIComponent</span>
              <span className="block text-xs text-black/50 dark:text-white/50">
                クエリ値用 ·{" "}
                <code className="font-mono">/ ? = & #</code> もエンコード
              </span>
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="algorithm"
              value="uri"
              checked={algorithm === "uri"}
              onChange={() => setAlgorithm("uri")}
              className="accent-emerald-600 mt-0.5"
            />
            <span>
              <span className="font-mono">encodeURI</span>
              <span className="block text-xs text-black/50 dark:text-white/50">
                URL全体用 · 構造文字（<code className="font-mono">/ ? = & #</code>等）は保持
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">
            {mode === "encode" ? "テキスト / URL（入力）" : "エンコード済み文字列（入力）"}
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
            {mode === "encode" ? "エンコード結果（出力）" : "デコード結果（出力）"}
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
          💡 URL エンコードについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            URLで使えない文字（日本語・スペース・記号など）を <code className="font-mono">%XX</code> 形式（パーセントエンコーディング、RFC 3986）に変換します。
          </li>
          <li>
            <strong>encodeURIComponent</strong>: クエリパラメータの<strong>値</strong>として使う文字列に推奨。<code className="font-mono">/</code> <code className="font-mono">?</code> <code className="font-mono">=</code> <code className="font-mono">&amp;</code> <code className="font-mono">#</code> もエンコードするため、URL構造を壊しません。
          </li>
          <li>
            <strong>encodeURI</strong>: 完全なURL文字列をエンコードする用途。URL構造を表す文字（<code className="font-mono">/</code> <code className="font-mono">?</code> <code className="font-mono">=</code> など）はそのまま残します。日本語パスを含むURLの正規化に便利です。
          </li>
          <li>
            日本語など UTF-8 マルチバイト文字も正しく変換されます（1文字あたり <code className="font-mono">%XX%XX%XX</code> のように複数バイト分エンコード）。
          </li>
          <li>
            デコード時に不正な <code className="font-mono">%</code> シーケンス（例: <code className="font-mono">%ZZ</code>）が含まれているとエラーになります。
          </li>
        </ul>
      </div>
    </div>
  );
}
