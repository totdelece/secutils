"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Indent = "2" | "4" | "tab" | "min";

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value !== null && typeof value === "object") {
    const sorted: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[k] = sortKeysDeep((value as Record<string, unknown>)[k]);
    }
    return sorted;
  }
  return value;
}

function detectType(value: unknown): string {
  if (Array.isArray(value)) return `Array (${value.length} 件)`;
  if (value === null) return "null";
  if (typeof value === "object") {
    const keys = Object.keys(value as object);
    return `Object (${keys.length} keys)`;
  }
  return typeof value;
}

type ProcessResult = {
  output: string;
  error: string | null;
  type?: string;
  inputBytes: number;
  outputBytes: number;
};

function processJson(
  input: string,
  indent: Indent,
  sortKeys: boolean,
): ProcessResult {
  const inputBytes = new TextEncoder().encode(input).length;
  if (!input.trim()) {
    return { output: "", error: null, inputBytes, outputBytes: 0 };
  }
  try {
    const parsed = JSON.parse(input);
    const target = sortKeys ? sortKeysDeep(parsed) : parsed;
    let output: string;
    if (indent === "min") {
      output = JSON.stringify(target);
    } else if (indent === "tab") {
      output = JSON.stringify(target, null, "\t");
    } else {
      output = JSON.stringify(target, null, parseInt(indent, 10));
    }
    return {
      output,
      error: null,
      type: detectType(parsed),
      inputBytes,
      outputBytes: new TextEncoder().encode(output).length,
    };
  } catch (e) {
    let message = e instanceof Error ? e.message : String(e);
    const posMatch = message.match(/position (\d+)/);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const before = input.slice(0, pos);
      const linesBefore = before.split("\n");
      const line = linesBefore.length;
      const col = linesBefore[linesBefore.length - 1].length + 1;
      const allLines = input.split("\n");
      const errLine = allLines[line - 1] ?? "";
      const truncated =
        errLine.length > 80
          ? "…" + errLine.slice(Math.max(0, col - 40), col + 40) + "…"
          : errLine;
      const caretCol = errLine.length > 80 ? Math.min(col - 1, 40) : col - 1;
      message += `\n  at line ${line}, column ${col}\n${truncated}\n${" ".repeat(Math.max(0, caretCol))}^`;
    }
    return {
      output: "",
      error: message,
      inputBytes,
      outputBytes: 0,
    };
  }
}

const SAMPLE = `{"name":"secutils","tools":["password","hash","jwt","cidr"],"version":1.2,"meta":{"author":"aki","year":2026,"isOpen":true,"tags":null}}`;

export default function JsonFormatterPage() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState<Indent>("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => processJson(input, indent, sortKeys),
    [input, indent, sortKeys],
  );

  const copy = async () => {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const swap = () => {
    if (!result.output || result.error) return;
    setInput(result.output);
  };

  const sizeRatio =
    result.outputBytes > 0 && result.inputBytes > 0
      ? ((result.outputBytes / result.inputBytes - 1) * 100).toFixed(1)
      : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        📋 JSON Formatter / Validator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        JSONの整形・最小化・バリデーション。エラー位置（行・列）表示、キーアルファベット順ソート対応。
        すべてブラウザ内で処理され、入力データはサーバーに送信されません。
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm font-medium">インデント:</span>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 inline-flex bg-black/5 dark:bg-white/5">
          {(["2", "4", "tab", "min"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setIndent(v)}
              className={`px-3 py-1 rounded text-xs font-mono transition ${
                indent === v
                  ? "bg-emerald-600 text-white"
                  : "text-black/70 dark:text-white/70 hover:text-foreground"
              }`}
              title={
                v === "min"
                  ? "minify（空白なし）"
                  : v === "tab"
                    ? "Tab文字でインデント"
                    : `${v}スペース`
              }
            >
              {v === "min" ? "min" : v}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer ml-1">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
            className="accent-emerald-600"
          />
          <span>キーをアルファベット順</span>
        </label>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="json-input" className="text-sm font-medium">
            JSON入力
          </label>
          <span className="text-xs text-black/50 dark:text-white/50 font-mono">
            {input.length.toLocaleString()} 文字 ·{" "}
            {result.inputBytes.toLocaleString()} bytes
          </span>
        </div>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder='{"key": "value"}'
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={swap}
          disabled={!result.output || !!result.error}
          className="text-xs px-3 py-1.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
          title="出力を入力欄に取り込む"
        >
          ↑ 入力に取り込む
        </button>
      </div>

      {result.error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-xs text-red-600 dark:text-red-400 whitespace-pre overflow-x-auto">
          ⚠ {result.error}
        </div>
      ) : (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">出力</span>
              {result.type && (
                <span className="text-xs font-mono text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/10 rounded px-2 py-0.5">
                  {result.type}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-black/50 dark:text-white/50 font-mono">
                {result.outputBytes.toLocaleString()} bytes
                {sizeRatio !== null && (
                  <span
                    className={`ml-1 ${
                      result.outputBytes > result.inputBytes
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    ({result.outputBytes > result.inputBytes ? "+" : ""}
                    {sizeRatio}%)
                  </span>
                )}
              </span>
              <button
                onClick={copy}
                disabled={!result.output}
                className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={result.output}
            rows={12}
            placeholder="ここに整形結果が表示されます"
            className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y"
            onFocus={(e) => e.currentTarget.select()}
          />
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 JSONについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>インデント</strong>: 2スペース（最も一般的）/ 4スペース / Tab / minify（空白なし、転送量削減）から選択。
          </li>
          <li>
            <strong>エラー位置</strong>: 行番号・列番号と該当行のコンテキスト・キャレット位置を表示します。
          </li>
          <li>
            <strong>キーソート</strong>: オブジェクトのキーをアルファベット順に再帰的にソート。差分検出、キャッシュキー生成、ハッシュの一意化に便利です。
          </li>
          <li>
            標準JSON（RFC 8259）に準拠。コメント・末尾カンマ・シングルクォート等の <strong>JSON5 拡張は非対応</strong>です。
          </li>
        </ul>
      </div>
    </div>
  );
}
