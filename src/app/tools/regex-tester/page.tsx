"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";

const FLAGS = [
  { key: "g", desc: "global — 全マッチ" },
  { key: "i", desc: "case insensitive — 大小無視" },
  { key: "m", desc: "multiline — ^ $ が各行に適用" },
  { key: "s", desc: "dotAll — . が改行にもマッチ" },
  { key: "u", desc: "unicode — Unicode対応" },
  { key: "y", desc: "sticky — lastIndex から" },
];

const MAX_MATCHES = 5000;

type Match = {
  index: number;
  text: string;
  groups: (string | undefined)[];
  namedGroups: Record<string, string | undefined>;
};

function runRegex(
  pattern: string,
  flags: string,
  text: string,
): { matches: Match[]; error: string | null } {
  if (!pattern) return { matches: [], error: null };
  try {
    const finalFlags = flags.includes("g") ? flags : flags + "g";
    const re = new RegExp(pattern, finalFlags);
    const matches: Match[] = [];
    let count = 0;
    for (const m of text.matchAll(re)) {
      matches.push({
        index: m.index ?? 0,
        text: m[0],
        groups: m.slice(1),
        namedGroups: m.groups ?? {},
      });
      if (++count >= MAX_MATCHES) break;
    }
    return { matches, error: null };
  } catch (e) {
    return {
      matches: [],
      error: e instanceof Error ? e.message : "正規表現エラー",
    };
  }
}

function renderHighlight(text: string, matches: Match[]): ReactNode {
  if (text === "") {
    return (
      <span className="text-black/30 dark:text-white/30">（テキストが空）</span>
    );
  }
  if (matches.length === 0) {
    return (
      <span className="text-black/60 dark:text-white/60">{text}</span>
    );
  }

  const parts: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (m.index > cursor) {
      parts.push(<span key={`p${i}`}>{text.slice(cursor, m.index)}</span>);
    }
    if (m.text === "") {
      parts.push(
        <mark
          key={`m${i}`}
          className="bg-emerald-500/30 dark:bg-emerald-400/30 rounded px-0.5"
          title={`空文字マッチ @ ${m.index}`}
        >
          {"​"}
        </mark>,
      );
    } else {
      parts.push(
        <mark
          key={`m${i}`}
          className="bg-emerald-500/30 dark:bg-emerald-400/30 rounded px-0.5"
        >
          {m.text}
        </mark>,
      );
    }
    cursor = m.index + m.text.length;
  });
  if (cursor < text.length) {
    parts.push(<span key="tail">{text.slice(cursor)}</span>);
  }
  return parts;
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState(
    "Contact: hello@example.com or admin@test.co.jp\nNot an email: foo bar @ baz",
  );
  const [showReplace, setShowReplace] = useState(false);
  const [replacement, setReplacement] = useState("[EMAIL]");
  const [copied, setCopied] = useState(false);

  const { matches, error } = useMemo(
    () => runRegex(pattern, flags, text),
    [pattern, flags, text],
  );

  const replaced = useMemo(() => {
    if (!showReplace || error || !pattern) return text;
    try {
      const finalFlags = flags.includes("g") ? flags : flags + "g";
      const re = new RegExp(pattern, finalFlags);
      return text.replace(re, replacement);
    } catch {
      return "";
    }
  }, [showReplace, pattern, flags, text, replacement, error]);

  const toggleFlag = (key: string) => {
    setFlags((cur) =>
      cur.includes(key) ? cur.replace(key, "") : cur + key,
    );
  };

  const copyReplaced = async () => {
    await navigator.clipboard.writeText(replaced);
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
        🔍 Regex Tester
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        正規表現のテストとデバッグ。マッチをハイライト、キャプチャグループ表示、置換プレビュー対応。
        すべてブラウザ内（JavaScript の <code className="font-mono">RegExp</code>）で処理され、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label
          htmlFor="regex-pattern"
          className="text-sm font-medium block mb-2"
        >
          正規表現パターン
        </label>
        <div className="flex items-center gap-1 font-mono text-sm">
          <span className="text-black/40 dark:text-white/40 select-none">
            /
          </span>
          <input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="\d+|hello|(\w+)@\w+"
            className="flex-1 bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="text-black/40 dark:text-white/40 select-none">
            /{flags}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {FLAGS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFlag(f.key)}
              title={f.desc}
              className={`px-2.5 py-1 rounded text-xs font-mono border transition ${
                flags.includes(f.key)
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {f.key}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label
          htmlFor="regex-text"
          className="text-sm font-medium block mb-2"
        >
          テスト対象テキスト
        </label>
        <textarea
          id="regex-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50"
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400 mb-4">
          ⚠ {error}
        </div>
      ) : (
        <div className="rounded-lg border border-black/10 dark:border-white/10 mb-4 overflow-hidden">
          <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60 flex items-center justify-between">
            <span>ハイライト</span>
            <span className="text-black/40 dark:text-white/40">
              {matches.length === MAX_MATCHES
                ? `${MAX_MATCHES}+ 件マッチ（上限到達）`
                : `${matches.length} 件マッチ`}
            </span>
          </div>
          <pre className="p-4 font-mono text-sm whitespace-pre-wrap break-all">
            {renderHighlight(text, matches)}
          </pre>
        </div>
      )}

      {!error && matches.length > 0 && (
        <div className="rounded-lg border border-black/10 dark:border-white/10 mb-4 overflow-hidden">
          <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60">
            マッチ詳細（最大100件表示）
          </div>
          <div className="divide-y divide-black/5 dark:divide-white/10 max-h-72 overflow-y-auto">
            {matches.slice(0, 100).map((m, i) => (
              <div key={i} className="px-4 py-2.5 text-sm">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs text-black/50 dark:text-white/50 font-mono shrink-0">
                    #{i + 1} @ {m.index}
                  </span>
                  <span className="font-mono break-all flex-1">
                    {m.text || (
                      <span className="text-black/40 dark:text-white/40">
                        （空文字マッチ）
                      </span>
                    )}
                  </span>
                </div>
                {m.groups.length > 0 && (
                  <div className="text-xs ml-12 space-y-0.5 mt-1">
                    {m.groups.map((g, gi) => (
                      <div key={gi} className="font-mono">
                        <span className="text-black/40 dark:text-white/40">
                          ${gi + 1}:
                        </span>{" "}
                        {g === undefined ? (
                          <span className="text-black/30 dark:text-white/30">
                            (undefined)
                          </span>
                        ) : (
                          <span className="text-black/70 dark:text-white/70">
                            {g}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {Object.keys(m.namedGroups).length > 0 && (
                  <div className="text-xs ml-12 space-y-0.5 mt-1">
                    {Object.entries(m.namedGroups).map(([name, val]) => (
                      <div key={name} className="font-mono">
                        <span className="text-black/40 dark:text-white/40">
                          &lt;{name}&gt;:
                        </span>{" "}
                        {val === undefined ? (
                          <span className="text-black/30 dark:text-white/30">
                            (undefined)
                          </span>
                        ) : (
                          <span className="text-black/70 dark:text-white/70">
                            {val}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer mb-3 w-fit">
          <input
            type="checkbox"
            checked={showReplace}
            onChange={(e) => setShowReplace(e.target.checked)}
            className="accent-emerald-600"
          />
          <span className="font-medium">置換プレビュー</span>
        </label>
        {showReplace && (
          <>
            <input
              type="text"
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              placeholder="置換文字列（$1, $<name>, $&, $$ 使用可）"
              className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50 mb-3"
              autoComplete="off"
              spellCheck={false}
            />
            <div className="rounded border border-black/5 dark:border-white/10 overflow-hidden">
              <div className="bg-black/5 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-black/60 dark:text-white/60 flex items-center justify-between">
                <span>置換結果</span>
                <button
                  onClick={copyReplaced}
                  disabled={!replaced || !!error}
                  className="text-xs px-2 py-0.5 rounded border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-3 font-mono text-sm whitespace-pre-wrap break-all">
                {replaced || (
                  <span className="text-black/40 dark:text-white/40">
                    （結果なし）
                  </span>
                )}
              </pre>
            </div>
          </>
        )}
      </div>

      <div className="text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 正規表現について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            JavaScript の <code className="font-mono">RegExp</code> 構文（ECMAScript）。PCRE / Python の <code className="font-mono">re</code> と細部が異なります（例: 後方参照、ルックアラウンド、Unicodeプロパティ）。
          </li>
          <li>
            <strong>キャプチャグループ</strong>: <code className="font-mono">(...)</code> で部分文字列を取得、<code className="font-mono">(?&lt;name&gt;...)</code> で名前付き、<code className="font-mono">(?:...)</code> で非キャプチャ。
          </li>
          <li>
            <strong>置換文字列の特殊記号</strong>: <code className="font-mono">$1</code> = 1番目のグループ、<code className="font-mono">$&lt;name&gt;</code> = 名前付き、<code className="font-mono">$&amp;</code> = フルマッチ、<code className="font-mono">$$</code> = リテラル <code className="font-mono">$</code>。
          </li>
          <li>
            <code className="font-mono">u</code> フラグを付けると{" "}
            <code className="font-mono">{"\\p{...}"}</code>
            （Unicodeプロパティ）が使えるようになります。例:{" "}
            <code className="font-mono">{"\\p{Script=Hiragana}"}</code>。
          </li>
          <li>
            マッチ数は最大 {MAX_MATCHES.toLocaleString()} 件で打ち切り（ブラウザ保護のため）。
          </li>
        </ul>
      </div>
    </div>
  );
}
