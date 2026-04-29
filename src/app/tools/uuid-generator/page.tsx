"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Version = "v4" | "v7";
type Format = "standard" | "uppercase" | "no-hyphen" | "braces";

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function formatUuid(bytes: Uint8Array): string {
  const hex = bytesToHex(bytes);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function generateV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return formatUuid(bytes);
}

function generateV7(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const now = Date.now();
  bytes[0] = Math.floor(now / 0x10000000000) & 0xff;
  bytes[1] = Math.floor(now / 0x100000000) & 0xff;
  bytes[2] = Math.floor(now / 0x1000000) & 0xff;
  bytes[3] = Math.floor(now / 0x10000) & 0xff;
  bytes[4] = Math.floor(now / 0x100) & 0xff;
  bytes[5] = now & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return formatUuid(bytes);
}

function applyFormat(uuid: string, format: Format): string {
  switch (format) {
    case "standard":
      return uuid;
    case "uppercase":
      return uuid.toUpperCase();
    case "no-hyphen":
      return uuid.replace(/-/g, "");
    case "braces":
      return `{${uuid}}`;
  }
}

function extractV7Timestamp(uuid: string): Date | null {
  const hex = uuid.replace(/[-{}]/g, "").slice(0, 12);
  if (!/^[0-9a-f]{12}$/i.test(hex)) return null;
  const ms = parseInt(hex, 16);
  return new Date(ms);
}

function formatTimestamp(d: Date): string {
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
}

export default function UuidGeneratorPage() {
  const [version, setVersion] = useState<Version>("v4");
  const [format, setFormat] = useState<Format>("standard");
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = useCallback(() => {
    const fn = version === "v4" ? generateV4 : generateV7;
    const safeCount = Math.max(1, Math.min(1000, Math.floor(count) || 1));
    const result: string[] = [];
    for (let i = 0; i < safeCount; i++) result.push(fn());
    setUuids(result);
  }, [version, count]);

  useEffect(() => {
    generate();
  }, [generate]);

  const formattedUuids = useMemo(
    () => uuids.map((u) => applyFormat(u, format)),
    [uuids, format],
  );

  const allText = useMemo(
    () => formattedUuids.join("\n"),
    [formattedUuids],
  );

  const copyAll = async () => {
    if (!allText) return;
    await navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const copyOne = async (idx: number) => {
    await navigator.clipboard.writeText(formattedUuids[idx]);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🆔 UUID Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        UUID v4（ランダム）と v7（時系列ソート可能、RFC 9562）を生成。
        すべてブラウザ内で <code className="font-mono">crypto</code> API による暗号学的乱数で生成され、サーバーには送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 mb-3 inline-flex bg-black/5 dark:bg-white/5">
        {(["v4", "v7"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVersion(v)}
            className={`px-4 py-1.5 rounded text-sm font-mono font-medium transition ${
              version === v
                ? "bg-emerald-600 text-white"
                : "text-black/70 dark:text-white/70 hover:text-foreground"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <p className="text-xs text-black/50 dark:text-white/50 mb-6">
        {version === "v4"
          ? "v4: 完全ランダム（122 bit）。汎用的、衝突確率は事実上ゼロ。"
          : "v7: 先頭 48 bit が UNIX ミリ秒 + 残り 74 bit はランダム。文字列ソートで時系列順に並ぶため DB の主キーに最適（B-tree インデックスのページ分散が抑えられる）。"}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="uuid-count"
            className="text-sm font-medium block mb-2"
          >
            個数
          </label>
          <div className="flex items-center gap-2">
            <input
              id="uuid-count"
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
            htmlFor="uuid-format"
            className="text-sm font-medium block mb-2"
          >
            フォーマット
          </label>
          <select
            id="uuid-format"
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
            className="bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm w-full sm:w-auto"
          >
            <option value="standard">標準（小文字 + ハイフン）</option>
            <option value="uppercase">大文字</option>
            <option value="no-hyphen">ハイフンなし</option>
            <option value="braces">中括弧付き {"{...}"}</option>
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
          disabled={uuids.length === 0}
          className="px-4 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition disabled:opacity-50"
        >
          {copiedAll ? "Copied!" : "全部コピー"}
        </button>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
        <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60 flex items-center justify-between">
          <span>結果（{formattedUuids.length} 件）</span>
          {version === "v7" && (
            <span className="text-black/40 dark:text-white/40">
              タイムスタンプ（ローカル時刻）
            </span>
          )}
        </div>
        <div className="divide-y divide-black/5 dark:divide-white/10 max-h-96 overflow-y-auto">
          {formattedUuids.map((u, idx) => {
            const ts =
              version === "v7" ? extractV7Timestamp(uuids[idx]) : null;
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
                  title="このUUIDをコピー"
                >
                  {copiedIdx === idx ? "✓" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 UUID について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>v4</strong>: 122 bit のランダム値。汎用的でアプリケーションID・セッションID 等で広く使われます。衝突確率は宇宙の終わりまで無視できるレベルです。
          </li>
          <li>
            <strong>v7</strong>: 先頭にUNIXミリ秒タイムスタンプを含むため、UUIDを<strong>文字列としてソートすると時系列順</strong>に並びます。MySQL/PostgreSQLの主キーに使うとB-treeインデックスのページ分散が抑えられて挿入が高速です（RFC 9562、2024年標準化）。
          </li>
          <li>
            生成は <code className="font-mono">crypto.getRandomValues</code> / <code className="font-mono">crypto.randomUUID()</code> を使った暗号学的に安全な乱数で行います。<code className="font-mono">Math.random()</code> は使いません。
          </li>
          <li>
            <code className="font-mono">crypto.randomUUID()</code> はセキュアコンテキスト（HTTPS）でのみ動作します。本サイトはHTTPSなので問題なく動作します。
          </li>
        </ul>
      </div>
    </div>
  );
}
