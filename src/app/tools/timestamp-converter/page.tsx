"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Parsed = {
  date: Date;
  interpretation: string;
};

function parseInput(input: string): { parsed: Parsed | null; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { parsed: null, error: null };

  // 数値のみ → UNIX timestamp
  if (/^-?\d+$/.test(trimmed)) {
    const n = Number(trimmed);
    if (!Number.isFinite(n)) {
      return { parsed: null, error: "数値が大きすぎます" };
    }
    let ms: number;
    let interp: string;
    const len = trimmed.replace(/^-/, "").length;
    if (len <= 10) {
      ms = n * 1000;
      interp = "UNIX 秒";
    } else if (len <= 13) {
      ms = n;
      interp = "UNIX ミリ秒";
    } else if (len <= 16) {
      ms = Math.floor(n / 1000);
      interp = "UNIX マイクロ秒";
    } else if (len <= 19) {
      ms = Math.floor(n / 1000000);
      interp = "UNIX ナノ秒";
    } else {
      return { parsed: null, error: "桁数が大きすぎます（最大19桁）" };
    }
    const d = new Date(ms);
    if (isNaN(d.getTime())) {
      return { parsed: null, error: "変換不能な値です" };
    }
    return { parsed: { date: d, interpretation: interp }, error: null };
  }

  // 日付文字列
  const d = new Date(trimmed);
  if (isNaN(d.getTime())) {
    return {
      parsed: null,
      error:
        "日付として認識できません（例: 2026-04-30T12:34:56Z, 1714477200, Tue Apr 30 2026）",
    };
  }
  return {
    parsed: { date: d, interpretation: "日付文字列" },
    error: null,
  };
}

const DAY_JA = ["日", "月", "火", "水", "木", "金", "土"];

function formatTz(d: Date, timeZone: string): string {
  // sv-SE は YYYY-MM-DD HH:mm:ss 形式に近い
  return d.toLocaleString("sv-SE", { timeZone, hour12: false });
}

function dayOfWeek(d: Date, timeZone: string): string {
  const idx = parseInt(
    d.toLocaleString("en-US", { timeZone, weekday: "narrow" }),
    10,
  );
  // narrowが数字を返すロケールはあるので別アプローチ
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
  }).format(d);
  const map: Record<string, string> = {
    Sunday: "日",
    Monday: "月",
    Tuesday: "火",
    Wednesday: "水",
    Thursday: "木",
    Friday: "金",
    Saturday: "土",
  };
  return (map[wd] ?? "?") + "曜日";
}

function formatRelative(d: Date, nowMs: number): string {
  const diff = (d.getTime() - nowMs) / 1000;
  const abs = Math.abs(diff);
  if (abs < 1) return "ちょうど今";
  const future = diff > 0;
  let value: string;
  if (abs < 60) value = `${Math.floor(abs)}秒`;
  else if (abs < 3600) value = `${Math.floor(abs / 60)}分`;
  else if (abs < 86400) value = `${Math.floor(abs / 3600)}時間`;
  else if (abs < 86400 * 30) value = `${Math.floor(abs / 86400)}日`;
  else if (abs < 86400 * 365)
    value = `${Math.floor(abs / (86400 * 30))}ヶ月`;
  else value = `${Math.floor(abs / (86400 * 365))}年`;
  return future ? `${value}後` : `${value}前`;
}

type Row = { label: string; value: string; sub?: string };

function buildRows(d: Date, nowMs: number, localTz: string): Row[] {
  const unixSec = Math.floor(d.getTime() / 1000);
  const unixMs = d.getTime();
  const localDay = dayOfWeek(d, localTz);
  const jstDay = dayOfWeek(d, "Asia/Tokyo");
  return [
    { label: "UNIX 秒", value: String(unixSec), sub: "10桁" },
    { label: "UNIX ミリ秒", value: String(unixMs), sub: "13桁" },
    {
      label: "ISO 8601 (UTC)",
      value: d.toISOString(),
      sub: "API/ログ標準",
    },
    {
      label: "UTC",
      value: formatTz(d, "UTC"),
      sub: "Coordinated Universal Time",
    },
    {
      label: "ローカル",
      value: formatTz(d, localTz),
      sub: `${localTz} · ${localDay}`,
    },
    {
      label: "JST",
      value: formatTz(d, "Asia/Tokyo"),
      sub: `Asia/Tokyo · ${jstDay}`,
    },
    {
      label: "RFC 2822",
      value: d.toUTCString(),
      sub: "メールヘッダ等で使用",
    },
    {
      label: "相対時刻",
      value: formatRelative(d, nowMs),
      sub: nowMs > d.getTime() ? "現在より過去" : "現在より未来",
    },
  ];
}

export default function TimestampConverterPage() {
  const localTz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );
  const [input, setInput] = useState(() => String(Math.floor(Date.now() / 1000)));
  const [nowMs, setNowMs] = useState(Date.now());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 1秒ごとに「相対時刻」を更新
  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { parsed, error } = useMemo(() => parseInput(input), [input]);

  const rows = useMemo(
    () => (parsed ? buildRows(parsed.date, nowMs, localTz) : []),
    [parsed, nowMs, localTz],
  );

  const setNow = () => setInput(String(Math.floor(Date.now() / 1000)));
  const setNowMillis = () => setInput(String(Date.now()));

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1200);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🕐 Timestamp Converter
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        UNIX timestamp（秒/ミリ秒/マイクロ秒/ナノ秒）と ISO 8601・RFC 2822 を相互変換。UTC・JST・ローカル時刻、曜日、相対時刻を同時表示。
        すべてブラウザ内で処理され、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="ts-input" className="text-sm font-medium block mb-2">
          入力（UNIX timestamp または日付文字列）
        </label>
        <input
          id="ts-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例: 1714477200 / 2026-04-30T12:34:56Z / Tue Apr 30 2026"
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={setNow}
            className="px-3 py-1.5 rounded text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition"
          >
            現在（秒）
          </button>
          <button
            onClick={setNowMillis}
            className="px-3 py-1.5 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            現在（ミリ秒）
          </button>
          <button
            onClick={() => setInput(new Date().toISOString())}
            className="px-3 py-1.5 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            現在（ISO）
          </button>
        </div>

        {parsed && (
          <p className="mt-3 text-xs text-black/50 dark:text-white/50">
            入力解釈: <span className="font-mono">{parsed.interpretation}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
          ⚠ {error}
        </div>
      )}

      {parsed && !error && (
        <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
          <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60">
            すべての形式（クリックでコピー）
          </div>
          <div className="divide-y divide-black/5 dark:divide-white/10">
            {rows.map((row) => (
              <div
                key={row.label}
                className="px-4 py-3 flex items-start gap-3 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="text-xs text-black/50 dark:text-white/50 w-32 sm:w-36 shrink-0 pt-0.5">
                  {row.label}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm break-all">
                    {row.value}
                  </div>
                  {row.sub && (
                    <div className="text-xs text-black/40 dark:text-white/40 mt-0.5">
                      {row.sub}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => copy(row.label, row.value)}
                  className="text-xs px-2 py-1 rounded border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition shrink-0"
                  title={`「${row.label}」をコピー`}
                >
                  {copiedKey === row.label ? "✓" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 タイムスタンプについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>UNIX timestamp</strong>: 1970-01-01T00:00:00Z からの経過時間。秒（10桁）が最も一般的、ミリ秒（13桁）はJavaScript標準。
          </li>
          <li>
            <strong>桁数による自動判定</strong>: 10桁=秒, 13桁=ミリ秒, 16桁=マイクロ秒, 19桁=ナノ秒。中間桁数の場合はミリ秒として解釈します。
          </li>
          <li>
            <strong>ISO 8601</strong>: <code className="font-mono">2026-04-30T12:34:56.789Z</code> 形式。タイムゾーン情報を含む国際標準で API/ログで広く使われます。
          </li>
          <li>
            <strong>RFC 2822</strong>: <code className="font-mono">Tue, 30 Apr 2026 12:34:56 GMT</code> 形式。メールヘッダ・HTTP <code className="font-mono">Date</code> ヘッダで使用。
          </li>
          <li>
            JavaScript の <code className="font-mono">Number</code> は 53bit 整数までしか正確に扱えないため、ナノ秒精度は内部でミリ秒に丸められます。
          </li>
        </ul>
      </div>
    </div>
  );
}
