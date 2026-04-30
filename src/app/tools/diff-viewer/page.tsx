"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type DiffOp = "equal" | "delete" | "insert";
type DiffLine = {
  op: DiffOp;
  line: string;
  leftNo?: number;
  rightNo?: number;
};

const MAX_LINES = 5000;

function normalize(
  line: string,
  ignoreWhitespace: boolean,
  ignoreCase: boolean,
): string {
  let s = line;
  if (ignoreWhitespace) s = s.replace(/\s+/g, " ").trim();
  if (ignoreCase) s = s.toLowerCase();
  return s;
}

function lcsDiff(
  a: string[],
  b: string[],
  ignoreWhitespace: boolean,
  ignoreCase: boolean,
): DiffLine[] {
  const n = a.length;
  const m = b.length;
  const an = a.map((l) => normalize(l, ignoreWhitespace, ignoreCase));
  const bn = b.map((l) => normalize(l, ignoreWhitespace, ignoreCase));
  // Uint32Array で確保（最大 5000x5000 = 25M セル → 100MB は厳しい）
  // 5000 x 5000 = 25,000,000 cells * 2 bytes (Uint16) = 50MB → そのままだとOOMの懸念
  // 行制限を MAX_LINES にしているのでギリ通る。Uint16でOK（max LCS長=5000）
  const dp: Uint16Array[] = [];
  for (let i = 0; i <= n; i++) dp.push(new Uint16Array(m + 1));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (an[i - 1] === bn[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        const u = dp[i - 1][j];
        const l = dp[i][j - 1];
        dp[i][j] = u >= l ? u : l;
      }
    }
  }
  const result: DiffLine[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && an[i - 1] === bn[j - 1]) {
      result.push({
        op: "equal",
        line: a[i - 1],
        leftNo: i,
        rightNo: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ op: "insert", line: b[j - 1], rightNo: j });
      j--;
    } else {
      result.push({ op: "delete", line: a[i - 1], leftNo: i });
      i--;
    }
  }
  return result.reverse();
}

function computeStats(lines: DiffLine[]) {
  let added = 0;
  let removed = 0;
  let unchanged = 0;
  for (const l of lines) {
    if (l.op === "insert") added++;
    else if (l.op === "delete") removed++;
    else unchanged++;
  }
  return { added, removed, unchanged };
}

const SAMPLE_LEFT = `function hello(name) {
  console.log("hello, " + name);
  return name.length;
}

const x = 42;`;

const SAMPLE_RIGHT = `function hello(name) {
  console.log(\`hello, \${name}\`);
  return name.trim().length;
}

const x = 100;
const y = "new";`;

export default function DiffViewerPage() {
  const [left, setLeft] = useState(SAMPLE_LEFT);
  const [right, setRight] = useState(SAMPLE_RIGHT);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);

  const { lines, error, stats } = useMemo(() => {
    const aLines = left === "" ? [] : left.split("\n");
    const bLines = right === "" ? [] : right.split("\n");
    if (aLines.length > MAX_LINES || bLines.length > MAX_LINES) {
      return {
        lines: [] as DiffLine[],
        error: `行数が多すぎます（最大 ${MAX_LINES.toLocaleString()} 行ずつ）`,
        stats: null,
      };
    }
    const result = lcsDiff(aLines, bLines, ignoreWhitespace, ignoreCase);
    return {
      lines: result,
      error: null as string | null,
      stats: computeStats(result),
    };
  }, [left, right, ignoreWhitespace, ignoreCase]);

  const swap = () => {
    const tmp = left;
    setLeft(right);
    setRight(tmp);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🆚 Diff Viewer
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        2つのテキストを行単位で比較。LCS（最長共通部分列）アルゴリズムで差分を計算し、追加・削除をハイライト表示。
        すべてブラウザ内で処理され、入力データはサーバーに送信されません。
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="diff-left" className="text-sm font-medium">
              左（変更前）
            </label>
            <span className="text-xs text-black/50 dark:text-white/50 font-mono">
              {left === "" ? 0 : left.split("\n").length} 行
            </span>
          </div>
          <textarea
            id="diff-left"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            rows={10}
            placeholder="変更前のテキスト..."
            className="w-full font-mono text-xs bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50"
            spellCheck={false}
          />
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="diff-right" className="text-sm font-medium">
              右（変更後）
            </label>
            <span className="text-xs text-black/50 dark:text-white/50 font-mono">
              {right === "" ? 0 : right.split("\n").length} 行
            </span>
          </div>
          <textarea
            id="diff-right"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            rows={10}
            placeholder="変更後のテキスト..."
            className="w-full font-mono text-xs bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={swap}
          className="text-xs px-3 py-1.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
          title="左右の入れ替え"
        >
          ↔ 左右入れ替え
        </button>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="accent-emerald-600"
          />
          <span>空白の差分を無視</span>
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="accent-emerald-600"
          />
          <span>大文字小文字を無視</span>
        </label>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
          ⚠ {error}
        </div>
      ) : (
        <>
          {stats && (
            <div className="flex gap-4 mb-3 text-sm font-mono">
              <span className="text-emerald-600 dark:text-emerald-400">
                + {stats.added} 追加
              </span>
              <span className="text-red-600 dark:text-red-400">
                − {stats.removed} 削除
              </span>
              <span className="text-black/50 dark:text-white/50">
                = {stats.unchanged} 同一
              </span>
            </div>
          )}

          <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
            <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60">
              差分（unified）
            </div>
            <pre className="overflow-x-auto text-xs leading-relaxed">
              {lines.length === 0 ? (
                <div className="p-4 text-black/40 dark:text-white/40">
                  （両方空、または完全一致）
                </div>
              ) : (
                lines.map((l, idx) => {
                  const bg =
                    l.op === "insert"
                      ? "bg-emerald-500/15 dark:bg-emerald-400/15"
                      : l.op === "delete"
                        ? "bg-red-500/15 dark:bg-red-400/15"
                        : "";
                  const sign =
                    l.op === "insert"
                      ? "+"
                      : l.op === "delete"
                        ? "−"
                        : " ";
                  const signColor =
                    l.op === "insert"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : l.op === "delete"
                        ? "text-red-600 dark:text-red-400"
                        : "text-black/30 dark:text-white/30";
                  return (
                    <div
                      key={idx}
                      className={`flex gap-2 px-3 py-0.5 font-mono ${bg}`}
                    >
                      <span className="text-black/30 dark:text-white/30 w-10 text-right shrink-0 select-none">
                        {l.leftNo ?? ""}
                      </span>
                      <span className="text-black/30 dark:text-white/30 w-10 text-right shrink-0 select-none">
                        {l.rightNo ?? ""}
                      </span>
                      <span className={`w-3 shrink-0 select-none ${signColor}`}>
                        {sign}
                      </span>
                      <span className="flex-1 whitespace-pre break-all">
                        {l.line || "​"}
                      </span>
                    </div>
                  );
                })
              )}
            </pre>
          </div>
        </>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 Diffについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>LCS（最長共通部分列）</strong>アルゴリズムで2テキスト間の最小編集列を計算。古典的な方法ですが、行数が大きすぎなければ実用上十分です。
          </li>
          <li>
            行数は最大 {MAX_LINES.toLocaleString()} 行ずつまで。それ以上はメモリ消費とブラウザ保護のため拒否します（git diff など外部ツールの利用を推奨）。
          </li>
          <li>
            <strong>空白の差分を無視</strong>: 連続する空白を1つに正規化し、行頭・行末の空白も無視。インデント変更やエディタ自動整形を除外したい場合に。
          </li>
          <li>
            行番号は左（変更前）と右（変更後）を別々に表示。挿入のみの行は左、削除のみの行は右が空欄になります。
          </li>
        </ul>
      </div>
    </div>
  );
}
