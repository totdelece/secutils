"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Format = "uppercase" | "lowercase";

const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const ENCODING_LEN = ENCODING.length;
const TIME_LEN = 10;
const RANDOM_LEN = 16;

function encodeTime(now: number): string {
  let mod;
  let str = "";
  for (let len = TIME_LEN; len > 0; len--) {
    mod = now % ENCODING_LEN;
    str = ENCODING.charAt(mod) + str;
    now = (now - mod) / ENCODING_LEN;
  }
  return str;
}

function encodeRandom(): string {
  const bytes = new Uint8Array(RANDOM_LEN);
  crypto.getRandomValues(bytes);
  let str = "";
  for (let i = 0; i < RANDOM_LEN; i++) {
    str += ENCODING.charAt(bytes[i] % ENCODING_LEN);
  }
  return str;
}

function generateULID(): string {
  return encodeTime(Date.now()) + encodeRandom();
}

function extractTimestamp(ulid: string): Date | null {
  if (ulid.length !== 26) return null;
  const timePart = ulid.slice(0, 10).toUpperCase();
  let ms = 0;
  for (const c of timePart) {
    const idx = ENCODING.indexOf(c);
    if (idx === -1) return null;
    ms = ms * ENCODING_LEN + idx;
  }
  return new Date(ms);
}

function formatTimestamp(d: Date): string {
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
}

function applyFormat(ulid: string, format: Format): string {
  return format === "lowercase" ? ulid.toLowerCase() : ulid;
}

export default function UlidGeneratorPage() {
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<Format>("uppercase");
  const [ulids, setUlids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [decodeInput, setDecodeInput] = useState("");

  const generate = useCallback(() => {
    const safeCount = Math.max(1, Math.min(1000, Math.floor(count) || 1));
    const result: string[] = [];
    for (let i = 0; i < safeCount; i++) result.push(generateULID());
    setUlids(result);
  }, [count]);

  useEffect(() => {
    generate();
  }, [generate]);

  const formattedUlids = useMemo(
    () => ulids.map((u) => applyFormat(u, format)),
    [ulids, format],
  );

  const allText = useMemo(() => formattedUlids.join("\n"), [formattedUlids]);

  const copyAll = async () => {
    if (!allText) return;
    await navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const copyOne = async (idx: number) => {
    await navigator.clipboard.writeText(formattedUlids[idx]);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  const decodedTimestamp = useMemo(() => {
    const trimmed = decodeInput.trim();
    if (!trimmed) return null;
    return extractTimestamp(trimmed);
  }, [decodeInput]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🆔 ULID Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        Crockford Base32 でエンコードされた 26 文字の ULID（Universally Unique Lexicographically Sortable Identifier）を生成します。
        先頭 48 bit がミリ秒タイムスタンプ、残り 80 bit がランダムで、文字列ソートで時系列順に並びます。すべてブラウザ内で <code className="font-mono">crypto.getRandomValues</code> による暗号学的乱数で生成され、サーバーには送信されません。
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="ulid-count"
            className="text-sm font-medium block mb-2"
          >
            個数
          </label>
          <div className="flex items-center gap-2">
            <input
              id="ulid-count"
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
              className="w-32 bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono text-sm"
            />
            <span className="text-xs text-black/50 dark:text-white/50">
              1〜1000
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="ulid-format"
            className="text-sm font-medium block mb-2"
          >
            表記
          </label>
          <select
            id="ulid-format"
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
            className="bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm w-full sm:w-auto"
          >
            <option value="uppercase">大文字（仕様準拠）</option>
            <option value="lowercase">小文字</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={generate}
          className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition"
        >
          ↻ 再生成
        </button>
        <button
          onClick={copyAll}
          disabled={ulids.length === 0}
          className="px-4 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition disabled:opacity-50"
        >
          {copiedAll ? "Copied!" : "全部コピー"}
        </button>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
        <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60 flex items-center justify-between">
          <span>結果（{formattedUlids.length} 件）</span>
          <span className="text-black/40 dark:text-white/40">
            タイムスタンプ（ローカル時刻）
          </span>
        </div>
        <div className="divide-y divide-black/5 dark:divide-white/10 max-h-96 overflow-y-auto">
          {formattedUlids.map((u, idx) => {
            const ts = extractTimestamp(ulids[idx]);
            return (
              <div
                key={`${idx}-${u}`}
                className="flex items-center gap-3 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 group"
              >
                <span className="font-mono text-xs sm:text-sm break-all flex-1">
                  {u}
                </span>
                {ts && (
                  <span className="hidden sm:inline text-xs text-black/40 dark:text-white/40 font-mono whitespace-nowrap">
                    {formatTimestamp(ts)}
                  </span>
                )}
                <button
                  onClick={() => copyOne(idx)}
                  className="text-xs px-2 py-1 rounded border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition shrink-0"
                  title="このULIDをコピー"
                >
                  {copiedIdx === idx ? "✓" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3">タイムスタンプを抽出</h2>
        <p className="text-xs text-black/50 dark:text-white/50 mb-3">
          既存のULIDを貼り付けると、先頭10文字から生成時刻を取り出します。
        </p>
        <input
          type="text"
          value={decodeInput}
          onChange={(e) => setDecodeInput(e.target.value)}
          placeholder="01ARZ3NDEKTSV4RRFFQ69G5FAV"
          className="w-full bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono text-sm"
          spellCheck={false}
          autoCapitalize="characters"
        />
        {decodeInput.trim() && (
          <div className="mt-3 text-sm">
            {decodedTimestamp ? (
              <div className="rounded border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                <div className="text-xs text-black/50 dark:text-white/50 mb-1">
                  生成時刻
                </div>
                <div className="font-mono">
                  {formatTimestamp(decodedTimestamp)}
                </div>
                <div className="text-xs text-black/40 dark:text-white/40 font-mono mt-1">
                  UNIX ms: {decodedTimestamp.getTime()}
                </div>
              </div>
            ) : (
              <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-600 dark:text-red-400 text-xs">
                26文字のULID（Crockford Base32: 0-9 / A-Z 但しI、L、O、U除く）を入力してください。
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 ULID について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>26文字、固定長</strong>: UUID（36文字、ハイフン込み）より短く、URLやログに入れやすい形式です。
          </li>
          <li>
            <strong>辞書順 = 時系列順</strong>: 先頭48bitがUNIXミリ秒なので、文字列としてソートすると生成時刻順に並びます。RDBの主キーやログ識別子に使うと、B-treeインデックスのページ分散が抑えられ書き込みが安定します。
          </li>
          <li>
            <strong>Crockford Base32</strong>: アルファベット <code className="font-mono">0123456789ABCDEFGHJKMNPQRSTVWXYZ</code>。視認性を上げるため <code className="font-mono">I</code> / <code className="font-mono">L</code> / <code className="font-mono">O</code> / <code className="font-mono">U</code> を除外しています。
          </li>
          <li>
            <strong>UUID v7との関係</strong>: 設計思想は近く、どちらも先頭にタイムスタンプを置く方式です。UUID v7はバイナリ16バイトのHEX表記（36文字）、ULIDはBase32表記（26文字）という違いがあります。
          </li>
          <li>
            ランダム部分は <code className="font-mono">crypto.getRandomValues</code> による暗号学的に安全な乱数で生成します。<code className="font-mono">Math.random()</code> は使いません。
          </li>
        </ul>
      </div>
    </div>
  );
}
