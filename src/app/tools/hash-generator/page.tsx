"use client";

import { useEffect, useMemo, useState } from "react";
import { md5 } from "js-md5";
import Link from "next/link";

type Algorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

const ALGOS: Algorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

const ALGO_NOTES: Record<Algorithm, { label: string; warn?: string }> = {
  MD5: {
    label: "MD5",
    warn: "暗号用途では非推奨（衝突攻撃が現実的）。チェックサム用途のみ。",
  },
  "SHA-1": {
    label: "SHA-1",
    warn: "暗号用途では非推奨（2017年に衝突攻撃が実証）。",
  },
  "SHA-256": { label: "SHA-256" },
  "SHA-512": { label: "SHA-512" },
};

async function computeSHA(
  algorithm: "SHA-1" | "SHA-256" | "SHA-512",
  text: string,
): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function formatCase(hex: string, upper: boolean): string {
  return upper ? hex.toUpperCase() : hex.toLowerCase();
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<Algorithm, string>>({
    MD5: "",
    "SHA-1": "",
    "SHA-256": "",
    "SHA-512": "",
  });
  const [upperCase, setUpperCase] = useState(false);
  const [copiedAlgo, setCopiedAlgo] = useState<Algorithm | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [sha1, sha256, sha512] = await Promise.all([
        computeSHA("SHA-1", input),
        computeSHA("SHA-256", input),
        computeSHA("SHA-512", input),
      ]);
      if (cancelled) return;
      setHashes({
        MD5: md5(input),
        "SHA-1": sha1,
        "SHA-256": sha256,
        "SHA-512": sha512,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [input]);

  const byteLength = useMemo(
    () => new TextEncoder().encode(input).length,
    [input],
  );

  const copy = async (algo: Algorithm) => {
    const value = formatCase(hashes[algo], upperCase);
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopiedAlgo(algo);
    setTimeout(() => setCopiedAlgo(null), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔑 Hash Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        テキストから MD5 / SHA-1 / SHA-256 / SHA-512 を同時計算します。
        SHA系はブラウザ標準の{" "}
        <code className="font-mono">crypto.subtle</code>{" "}
        で計算され、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
        <label className="block text-sm font-medium mb-2">入力テキスト</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="ハッシュ化したい文字列を入力..."
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50"
        />
        <div className="flex items-center justify-between mt-2 text-xs text-black/50 dark:text-white/50">
          <span>
            {input.length.toLocaleString()} 文字 ·{" "}
            {byteLength.toLocaleString()} bytes (UTF-8)
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={upperCase}
              onChange={(e) => setUpperCase(e.target.checked)}
              className="accent-emerald-600"
            />
            <span>大文字で表示</span>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        {ALGOS.map((algo) => {
          const meta = ALGO_NOTES[algo];
          const value = formatCase(hashes[algo], upperCase);
          const isCopied = copiedAlgo === algo;
          return (
            <div
              key={algo}
              className="rounded-lg border border-black/10 dark:border-white/10 p-4"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-semibold text-sm">
                    {meta.label}
                  </span>
                  <span className="text-xs text-black/50 dark:text-white/50">
                    {value.length} chars
                  </span>
                </div>
                <button
                  onClick={() => copy(algo)}
                  disabled={!value}
                  className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="font-mono text-xs sm:text-sm break-all bg-black/5 dark:bg-white/5 rounded px-3 py-2">
                {value || (
                  <span className="text-black/30 dark:text-white/30">
                    （計算中...）
                  </span>
                )}
              </div>
              {meta.warn && (
                <div className="mt-2 text-xs text-amber-700 dark:text-amber-400">
                  ⚠ {meta.warn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 ハッシュ関数について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>MD5 / SHA-1</strong>:
            衝突攻撃が知られているため、現代の暗号用途（署名・パスワード保存等）には使用しないでください。チェックサム・キャッシュキーなどの非暗号用途であれば実用上問題ありません。
          </li>
          <li>
            <strong>SHA-256 / SHA-512</strong>:
            現時点で実用的な攻撃は知られていません。一般的な暗号用途に推奨されます。
          </li>
          <li>
            パスワード保存には、ハッシュ関数を直接使うのではなく{" "}
            <strong>bcrypt / scrypt / Argon2</strong>{" "}
            のような遅いキー導出関数を使用してください。
          </li>
        </ul>
      </div>
    </div>
  );
}
