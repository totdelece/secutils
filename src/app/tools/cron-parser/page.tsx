"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Field = number[];

type Parsed = {
  minute: Field;
  hour: Field;
  day: Field;
  month: Field;
  weekday: Field;
};

const MONTH_NAMES: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
};
const WEEKDAY_NAMES: Record<string, number> = {
  SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6,
};

const ALIASES: Record<string, string> = {
  "@yearly": "0 0 1 1 *",
  "@annually": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@midnight": "0 0 * * *",
  "@hourly": "0 * * * *",
};

function parseField(
  expr: string,
  min: number,
  max: number,
  names?: Record<string, number>,
): Field {
  // names 解決（JAN, MON 等を数値に）
  if (names) {
    const upper = expr.toUpperCase();
    expr = upper.replace(/[A-Z]+/g, (s) => {
      if (s in names) return String(names[s]);
      throw new Error(`未知の名前: ${s}`);
    });
  }

  // カンマで分割
  const parts = expr.split(",");
  const result = new Set<number>();

  for (const part of parts) {
    // step (`/`) 抽出
    let step = 1;
    let body = part;
    const slash = part.indexOf("/");
    if (slash !== -1) {
      step = parseInt(part.slice(slash + 1), 10);
      if (!Number.isInteger(step) || step < 1) {
        throw new Error(`不正なステップ: ${part}`);
      }
      body = part.slice(0, slash);
    }

    // 範囲解析
    let from: number, to: number;
    if (body === "*") {
      from = min;
      to = max;
    } else if (body.includes("-")) {
      const [a, b] = body.split("-").map((s) => parseInt(s, 10));
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error(`不正な範囲: ${body}`);
      }
      from = a;
      to = b;
    } else {
      const v = parseInt(body, 10);
      if (!Number.isInteger(v)) {
        throw new Error(`不正な値: ${body}`);
      }
      // step あり + 単一値 → from-max を step 刻み（例: 5/15 → 5,20,35,50）
      if (slash !== -1) {
        from = v;
        to = max;
      } else {
        from = v;
        to = v;
      }
    }

    if (from < min || to > max || from > to) {
      throw new Error(
        `値が範囲外: ${body}（${min}-${max} の範囲で指定してください）`,
      );
    }

    for (let i = from; i <= to; i += step) {
      result.add(i);
    }
  }

  return Array.from(result).sort((a, b) => a - b);
}

function parseCron(input: string): Parsed {
  let trimmed = input.trim();
  if (!trimmed) throw new Error("cron式が空です");

  // alias 展開
  if (trimmed in ALIASES) {
    trimmed = ALIASES[trimmed];
  } else if (trimmed === "@reboot") {
    throw new Error("@reboot は固定スケジュールではないため、本ツールでは対応していません");
  }

  const fields = trimmed.split(/\s+/);
  if (fields.length !== 5) {
    throw new Error(
      `5 フィールド必要です（分 時 日 月 曜日）。現在 ${fields.length} フィールド: ${fields.join(" ")}`,
    );
  }

  const [m, h, dom, mon, dow] = fields;

  const weekdayField = parseField(dow, 0, 7, WEEKDAY_NAMES);
  // 0 と 7 はどちらも日曜
  const weekday = Array.from(
    new Set(weekdayField.map((v) => (v === 7 ? 0 : v))),
  ).sort((a, b) => a - b);

  return {
    minute: parseField(m, 0, 59),
    hour: parseField(h, 0, 23),
    day: parseField(dom, 1, 31),
    month: parseField(mon, 1, 12, MONTH_NAMES),
    weekday,
  };
}

function describeField(
  field: Field,
  fullRange: number[],
  unit: string,
  formatter: (n: number) => string = (n) => String(n),
): string {
  if (field.length === fullRange.length) return `毎${unit}`;
  if (field.length === 1) return `${formatter(field[0])} ${unit}`;
  // 等差数列を検出
  if (field.length >= 3) {
    const diffs = field.slice(1).map((v, i) => v - field[i]);
    if (diffs.every((d) => d === diffs[0])) {
      // 全範囲で N 間隔か？
      if (
        field[0] === fullRange[0] &&
        field[field.length - 1] >= fullRange[fullRange.length - 1] - diffs[0] + 1
      ) {
        return `${diffs[0]} ${unit}おき`;
      }
    }
  }
  return field.map(formatter).join(", ") + ` ${unit}`;
}

function describeCron(p: Parsed): string {
  const minStr = describeField(p.minute, range(0, 59), "分");
  const hourStr = describeField(p.hour, range(0, 23), "時");
  const dayStr =
    p.day.length === 31
      ? "毎日"
      : `${p.day.join(", ")} 日`;
  const monthStr =
    p.month.length === 12
      ? ""
      : `${p.month.join(", ")} 月の`;
  const weekdayStr =
    p.weekday.length === 7
      ? ""
      : `${p.weekday
          .map((w) => ["日", "月", "火", "水", "木", "金", "土"][w])
          .join("/")}曜日`;

  // 簡易組み立て
  const parts: string[] = [];
  if (monthStr) parts.push(monthStr);
  if (weekdayStr) parts.push(weekdayStr);
  if (p.day.length === 31) {
    // 毎日（ただし weekday 制約あれば「曜日」優先）
    if (!weekdayStr) parts.push("毎日");
  } else {
    parts.push(dayStr);
  }
  parts.push(`${hourStr} ${minStr}`);
  return parts.join(" ");
}

function range(from: number, to: number): number[] {
  const r: number[] = [];
  for (let i = from; i <= to; i++) r.push(i);
  return r;
}

function matches(p: Parsed, d: Date): boolean {
  return (
    p.minute.includes(d.getMinutes()) &&
    p.hour.includes(d.getHours()) &&
    p.day.includes(d.getDate()) &&
    p.month.includes(d.getMonth() + 1) &&
    p.weekday.includes(d.getDay())
  );
}

function nextExecutions(p: Parsed, count: number, from: Date): Date[] {
  const results: Date[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  // 最大 ~2 年（1051200分）まで探す
  const limitMinutes = 366 * 24 * 60 * 2;
  for (let i = 0; i < limitMinutes && results.length < count; i++) {
    if (matches(p, cursor)) {
      results.push(new Date(cursor));
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return results;
}

function formatDate(d: Date): string {
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  const wd = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} (${wd}) ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const EXAMPLES = [
  { expr: "*/5 * * * *", note: "5分ごと" },
  { expr: "0 9 * * 1-5", note: "平日9時" },
  { expr: "0 0 * * 0", note: "毎週日曜0時" },
  { expr: "0 0 1 * *", note: "毎月1日0時" },
  { expr: "30 2 * * *", note: "毎日2:30" },
  { expr: "@daily", note: "@daily エイリアス" },
];

export default function CronParserPage() {
  const [input, setInput] = useState("*/5 * * * *");
  const [now, setNow] = useState<Date | null>(null);

  // クライアント側で初期化（SSR/hydration mismatch回避）
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: false as const, error: "" };
    try {
      const parsed = parseCron(input);
      return { ok: true as const, parsed };
    } catch (e) {
      return {
        ok: false as const,
        error: e instanceof Error ? e.message : "解析エラー",
      };
    }
  }, [input]);

  const description = result.ok ? describeCron(result.parsed) : "";
  const upcoming =
    result.ok && now ? nextExecutions(result.parsed, 5, now) : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        ⏱ Cron Expression Parser
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        cron 式を人間に読みやすい日本語に変換し、次回実行予定を表示します。範囲・リスト・ステップ・@daily 等のエイリアスに対応。
        計算はすべてブラウザ内で行われ、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="cron-input" className="text-sm font-medium block mb-2">
          cron式（5フィールド形式: 分 時 日 月 曜日）
        </label>
        <input
          id="cron-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="*/5 * * * *"
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50"
          autoComplete="off"
          spellCheck={false}
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="text-xs text-black/50 dark:text-white/50 self-center mr-1">
            例:
          </span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.expr}
              onClick={() => setInput(ex.expr)}
              title={ex.note}
              className="text-xs font-mono px-2 py-0.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {ex.expr}
            </button>
          ))}
        </div>
      </div>

      {result.ok ? (
        <>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5 mb-4">
            <div className="text-xs text-black/50 dark:text-white/50 mb-2">
              意味（日本語）
            </div>
            <div className="text-base font-medium">{description}</div>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden mb-4">
            <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60">
              次回実行予定（ローカル時刻）
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/10">
              {upcoming.length === 0 ? (
                <div className="px-4 py-3 text-sm text-black/40 dark:text-white/40">
                  該当する実行時刻が今後 2 年以内に見つかりません（条件が厳しすぎる可能性）
                </div>
              ) : (
                upcoming.map((d, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 flex items-baseline gap-3 font-mono text-sm"
                  >
                    <span className="text-xs text-black/40 dark:text-white/40 shrink-0 w-8">
                      #{i + 1}
                    </span>
                    <span>{formatDate(d)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <details className="rounded-lg border border-black/10 dark:border-white/10 mb-4">
            <summary className="px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
              内部解析結果（フィールド毎の値）
            </summary>
            <div className="px-4 py-3 text-xs font-mono space-y-1 text-black/70 dark:text-white/70">
              <div>分: {result.parsed.minute.join(", ")}</div>
              <div>時: {result.parsed.hour.join(", ")}</div>
              <div>日: {result.parsed.day.join(", ")}</div>
              <div>月: {result.parsed.month.join(", ")}</div>
              <div>
                曜日:{" "}
                {result.parsed.weekday
                  .map(
                    (w) =>
                      `${w}(${["日", "月", "火", "水", "木", "金", "土"][w]})`,
                  )
                  .join(", ")}
              </div>
            </div>
          </details>
        </>
      ) : (
        input.trim() && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
            ⚠ {result.error}
          </div>
        )
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 cron式について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>5 フィールド</strong>: <code className="font-mono">分(0-59) 時(0-23) 日(1-31) 月(1-12) 曜日(0-6, 0=日)</code>
          </li>
          <li>
            <strong>記号</strong>: <code className="font-mono">*</code>=全部、 <code className="font-mono">,</code>=リスト、 <code className="font-mono">-</code>=範囲、 <code className="font-mono">/</code>=ステップ
          </li>
          <li>
            <strong>名前</strong>: <code className="font-mono">JAN-DEC</code>（月）、<code className="font-mono">SUN-SAT</code>（曜日）も使えます
          </li>
          <li>
            <strong>エイリアス</strong>: <code className="font-mono">@yearly</code>, <code className="font-mono">@monthly</code>, <code className="font-mono">@weekly</code>, <code className="font-mono">@daily</code>, <code className="font-mono">@hourly</code>
          </li>
          <li>
            「日」と「曜日」を両方指定すると、<strong>OR 条件</strong>として扱う実装が多いですが、本ツールは AND として扱います。実環境（cron / Kubernetes CronJob 等）と挙動が異なる場合があるのでご注意ください。
          </li>
        </ul>
      </div>
    </div>
  );
}
