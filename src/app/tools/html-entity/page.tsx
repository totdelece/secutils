"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Mode = "encode" | "decode";
type Level = "minimal" | "named" | "all-non-ascii" | "numeric-dec" | "numeric-hex";

// XSS対策で必須の5文字（HTML5互換、apos の代わりに &#39; を使う）
const MINIMAL: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// 名前付きエンティティ拡張（minimal の上にマージ）
const NAMED_EXTRA: Record<string, string> = {
  " ": "&nbsp;",
  "¢": "&cent;",
  "£": "&pound;",
  "¥": "&yen;",
  "§": "&sect;",
  "©": "&copy;",
  "«": "&laquo;",
  "®": "&reg;",
  "°": "&deg;",
  "±": "&plusmn;",
  "²": "&sup2;",
  "³": "&sup3;",
  "µ": "&micro;",
  "¶": "&para;",
  "»": "&raquo;",
  "¼": "&frac14;",
  "½": "&frac12;",
  "¾": "&frac34;",
  "×": "&times;",
  "÷": "&divide;",
  "–": "&ndash;",
  "—": "&mdash;",
  "‘": "&lsquo;",
  "’": "&rsquo;",
  "“": "&ldquo;",
  "”": "&rdquo;",
  "•": "&bull;",
  "…": "&hellip;",
  "€": "&euro;",
  "™": "&trade;",
  "←": "&larr;",
  "↑": "&uarr;",
  "→": "&rarr;",
  "↓": "&darr;",
  "≤": "&le;",
  "≥": "&ge;",
  "≠": "&ne;",
  "¤": "&curren;",
  "¬": "&not;",
};

const NAMED_DECODE: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  cent: "¢",
  pound: "£",
  yen: "¥",
  sect: "§",
  copy: "©",
  laquo: "«",
  reg: "®",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  micro: "µ",
  para: "¶",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  times: "×",
  divide: "÷",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  bull: "•",
  hellip: "…",
  euro: "€",
  trade: "™",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  le: "≤",
  ge: "≥",
  ne: "≠",
  curren: "¤",
  not: "¬",
};

function encodeText(text: string, level: Level): string {
  if (level === "minimal") {
    return text.replace(/[&<>"']/g, (c) => MINIMAL[c]);
  }
  if (level === "named") {
    let out = "";
    for (const c of text) {
      out += MINIMAL[c] ?? NAMED_EXTRA[c] ?? c;
    }
    return out;
  }
  if (level === "all-non-ascii") {
    let out = "";
    for (const c of text) {
      const cp = c.codePointAt(0)!;
      if (MINIMAL[c]) {
        out += MINIMAL[c];
      } else if (cp >= 0x20 && cp < 0x7f) {
        out += c;
      } else {
        out += `&#${cp};`;
      }
    }
    return out;
  }
  if (level === "numeric-dec") {
    let out = "";
    for (const c of text) {
      out += `&#${c.codePointAt(0)};`;
    }
    return out;
  }
  // numeric-hex
  let out = "";
  for (const c of text) {
    out += `&#x${c.codePointAt(0)!.toString(16).toUpperCase()};`;
  }
  return out;
}

function decodeText(text: string): string {
  return text.replace(
    /&(?:(\w+)|#(\d+)|#[xX]([0-9a-fA-F]+));/g,
    (m, name?: string, dec?: string, hex?: string) => {
      if (name) return NAMED_DECODE[name] ?? m;
      if (dec) {
        const cp = parseInt(dec, 10);
        if (cp < 0 || cp > 0x10ffff) return m;
        try {
          return String.fromCodePoint(cp);
        } catch {
          return m;
        }
      }
      if (hex) {
        const cp = parseInt(hex, 16);
        if (cp < 0 || cp > 0x10ffff) return m;
        try {
          return String.fromCodePoint(cp);
        } catch {
          return m;
        }
      }
      return m;
    },
  );
}

export default function HtmlEntityPage() {
  const [mode, setMode] = useState<Mode>("encode");
  const [level, setLevel] = useState<Level>("minimal");
  const [input, setInput] = useState(
    `<script>alert("XSS & 'hi' — © 2026")</script>`,
  );
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (input === "") return "";
    try {
      return mode === "encode" ? encodeText(input, level) : decodeText(input);
    } catch {
      return "";
    }
  }, [input, mode, level]);

  useEffect(() => {
    setCopied(false);
  }, [output]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const swap = () => {
    if (!output) return;
    setInput(output);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const inputBytes = useMemo(
    () => new TextEncoder().encode(input).length,
    [input],
  );
  const outputBytes = useMemo(
    () => new TextEncoder().encode(output).length,
    [output],
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🏷️ HTML Entity Encoder / Decoder
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        HTMLエンティティとテキストの相互変換。XSS対策の最小エスケープ、名前付きエンティティ、数値参照（10進・16進）の切替に対応。
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

      {mode === "encode" && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">エンコードレベル</div>
          <div className="flex flex-wrap gap-2">
            {(
              [
                {
                  v: "minimal" as const,
                  label: "minimal",
                  hint: "XSS必須5文字: < > & \" '",
                },
                {
                  v: "named" as const,
                  label: "名前付き",
                  hint: "minimal + © ™ — … 等",
                },
                {
                  v: "all-non-ascii" as const,
                  label: "ASCII以外",
                  hint: "非ASCIIをすべて &#数値; に",
                },
                {
                  v: "numeric-dec" as const,
                  label: "全10進数値参照",
                  hint: "全文字を &#数値; に",
                },
                {
                  v: "numeric-hex" as const,
                  label: "全16進数値参照",
                  hint: "全文字を &#x16進; に",
                },
              ] as const
            ).map((opt) => (
              <button
                key={opt.v}
                onClick={() => setLevel(opt.v)}
                title={opt.hint}
                className={`px-3 py-1.5 rounded text-xs font-medium border transition ${
                  level === opt.v
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="he-input" className="text-sm font-medium">
            {mode === "encode" ? "テキスト（入力）" : "HTMLエンティティ（入力）"}
          </label>
          <span className="text-xs text-black/50 dark:text-white/50 font-mono">
            {input.length.toLocaleString()} 文字 ·{" "}
            {inputBytes.toLocaleString()} bytes
          </span>
        </div>
        <textarea
          id="he-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={
            mode === "encode"
              ? "エンコードしたいテキスト..."
              : "&lt;script&gt;alert(1)&lt;/script&gt;"
          }
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all"
        />
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={swap}
          disabled={!output}
          className="text-xs px-3 py-1.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
          title="出力を入力欄に移してモード切替"
        >
          ↕ 入れ替え
        </button>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">
            {mode === "encode" ? "エンティティ（出力）" : "テキスト（出力）"}
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-black/50 dark:text-white/50 font-mono">
              {outputBytes.toLocaleString()} bytes
            </span>
            <button
              onClick={copy}
              disabled={!output}
              className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={output}
          rows={6}
          placeholder="ここに結果が表示されます"
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y break-all"
          onFocus={(e) => e.currentTarget.select()}
        />
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 HTMLエンティティについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>minimal</strong>: XSS対策で必須となる <code className="font-mono">{`< > & " '`}</code> の5文字のみエスケープ。HTMLコンテキストに動的データを埋め込む際の最低ライン。
          </li>
          <li>
            <strong>名前付き</strong>: minimal + 記号類（<code className="font-mono">&amp;copy;</code> <code className="font-mono">&amp;trade;</code> <code className="font-mono">&amp;mdash;</code> 等の40種程度）を可読な形にエスケープ。
          </li>
          <li>
            <strong>ASCII以外</strong>: 印字可能ASCII（0x20〜0x7E）以外をすべて <code className="font-mono">&amp;#数値;</code> に。日本語などをASCIIだけで送信したい場合に。
          </li>
          <li>
            <strong>数値参照</strong>: 10進（<code className="font-mono">&amp;#65;</code>）または16進（<code className="font-mono">&amp;#x41;</code>）でUnicodeコードポイントを表記。すべてのHTMLパーサーで安全に扱えます。
          </li>
          <li>
            デコードは名前付きエンティティ約40種、数値参照（10進/16進）に対応します。
          </li>
        </ul>
      </div>
    </div>
  );
}
