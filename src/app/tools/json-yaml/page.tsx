"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import yaml from "js-yaml";

type Mode = "json-to-yaml" | "yaml-to-json";

const SAMPLE_JSON = `{
  "name": "secutils",
  "version": "1.0",
  "tools": ["password", "hash", "jwt"],
  "config": {
    "isOpen": true,
    "year": 2026,
    "tags": null
  }
}`;

function processInput(
  input: string,
  mode: Mode,
  indent: number,
): { output: string; error: string | null } {
  if (!input.trim()) return { output: "", error: null };
  try {
    if (mode === "json-to-yaml") {
      const obj = JSON.parse(input);
      const yamlStr = yaml.dump(obj, {
        indent,
        lineWidth: 120,
        noRefs: true,
        sortKeys: false,
      });
      return { output: yamlStr, error: null };
    } else {
      const obj = yaml.load(input, { schema: yaml.JSON_SCHEMA });
      if (obj === undefined) {
        return { output: "", error: "YAMLを解釈できませんでした" };
      }
      return {
        output: JSON.stringify(obj, null, indent),
        error: null,
      };
    }
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export default function JsonYamlPage() {
  const [mode, setMode] = useState<Mode>("json-to-yaml");
  const [indent, setIndent] = useState(2);
  const [input, setInput] = useState(SAMPLE_JSON);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => processInput(input, mode, indent),
    [input, mode, indent],
  );

  const swap = () => {
    if (!result.output || result.error) return;
    setInput(result.output);
    setMode(mode === "json-to-yaml" ? "yaml-to-json" : "json-to-yaml");
  };

  const copy = async () => {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const inputBytes = useMemo(
    () => new TextEncoder().encode(input).length,
    [input],
  );
  const outputBytes = useMemo(
    () => new TextEncoder().encode(result.output).length,
    [result.output],
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔄 JSON ↔ YAML Converter
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        JSONとYAMLの相互変換。Kubernetes / Docker Compose / GitHub Actions / CircleCI 等の設定ファイルの形式変換に最適です。
        変換はすべてブラウザ内で行われ、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 mb-4 inline-flex bg-black/5 dark:bg-white/5 flex-wrap">
        <button
          onClick={() => setMode("json-to-yaml")}
          className={`px-4 py-1.5 rounded text-sm font-medium transition ${
            mode === "json-to-yaml"
              ? "bg-emerald-600 text-white"
              : "text-black/70 dark:text-white/70 hover:text-foreground"
          }`}
        >
          JSON → YAML
        </button>
        <button
          onClick={() => setMode("yaml-to-json")}
          className={`px-4 py-1.5 rounded text-sm font-medium transition ${
            mode === "yaml-to-json"
              ? "bg-emerald-600 text-white"
              : "text-black/70 dark:text-white/70 hover:text-foreground"
          }`}
        >
          YAML → JSON
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm font-medium">インデント:</span>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 inline-flex bg-black/5 dark:bg-white/5">
          {[2, 4].map((v) => (
            <button
              key={v}
              onClick={() => setIndent(v)}
              className={`px-3 py-1 rounded text-xs font-mono transition ${
                indent === v
                  ? "bg-emerald-600 text-white"
                  : "text-black/70 dark:text-white/70 hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="jy-input" className="text-sm font-medium">
            {mode === "json-to-yaml" ? "JSON（入力）" : "YAML（入力）"}
          </label>
          <span className="text-xs text-black/50 dark:text-white/50 font-mono">
            {input.length.toLocaleString()} 文字 ·{" "}
            {inputBytes.toLocaleString()} bytes
          </span>
        </div>
        <textarea
          id="jy-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          placeholder={
            mode === "json-to-yaml"
              ? '{"key": "value"}'
              : "key: value\nlist:\n  - item1\n  - item2"
          }
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50"
          spellCheck={false}
        />
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={swap}
          disabled={!result.output || !!result.error}
          className="text-xs px-3 py-1.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
          title="出力を入力欄に移して逆変換"
        >
          ↕ 入れ替え
        </button>
      </div>

      {result.error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
          ⚠ {result.error}
        </div>
      ) : (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              {mode === "json-to-yaml" ? "YAML（出力）" : "JSON（出力）"}
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-black/50 dark:text-white/50 font-mono">
                {outputBytes.toLocaleString()} bytes
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
            rows={10}
            placeholder="ここに変換結果が表示されます"
            className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y"
            onFocus={(e) => e.currentTarget.select()}
          />
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 JSONとYAMLについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>YAML</strong>（YAML Ain&apos;t Markup Language）は人間に読みやすい設定ファイル形式。Kubernetes / Docker Compose / GitHub Actions / Ansible 等で使われます。
          </li>
          <li>
            <strong>JSON</strong>（JavaScript Object Notation）はAPI通信・設定ファイル両方で使われる形式。インデント不要で機械処理に向きますが、コメントが書けない欠点があります。
          </li>
          <li>
            <strong>変換時の注意</strong>: YAMLには JSON にない型（タイムスタンプ、バイナリ等）があり、JSONに変換するとそれらは文字列化されます。逆変換時は元に戻りません。
          </li>
          <li>
            本ツールは <strong>YAMLのアンカー・エイリアス（<code className="font-mono">&amp;name</code>, <code className="font-mono">*name</code>）</strong> を解釈時に展開します。出力時は <code className="font-mono">noRefs: true</code> で再展開せず通常の値として出します。
          </li>
          <li>
            YAML 1.2 / JSON Schema 互換でパースしているので、<code className="font-mono">yes</code> や <code className="font-mono">on</code> のような曖昧な真偽値は文字列扱いです（YAML 1.1 の罠を回避）。
          </li>
        </ul>
      </div>
    </div>
  );
}
