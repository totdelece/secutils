"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { WORDLIST } from "@/lib/wordlist";

// 暗号学的乱数（Math.random は使わない）。rejection sampling で modulo bias を排除。
function randUint32(): number {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0];
}
function randInt(min: number, max: number): number {
  const range = max - min + 1;
  if (range <= 0) return min;
  const limit = Math.floor(4294967296 / range) * range;
  let x = randUint32();
  while (x >= limit) x = randUint32();
  return min + (x % range);
}
function pick<T>(arr: readonly T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

const FIRST_NAMES = [
  "Alex", "Sam", "Taro", "Hanako", "Maria", "John", "Emma", "Liam",
  "Olivia", "Noah", "Yuki", "Ken", "Sora", "Mia", "Lucas", "Ava",
  "Hiro", "Aoi", "David", "Sophia", "Leo", "Nina", "Omar", "Lena",
];
const LAST_NAMES = [
  "Smith", "Tanaka", "Garcia", "Kim", "Suzuki", "Johnson", "Lee", "Brown",
  "Sato", "Muller", "Rossi", "Yamada", "Davis", "Chen", "Lopez", "Ito",
  "Walker", "Novak", "Khan", "Ferrari", "Watanabe", "Silva", "Cohen", "Park",
];
const DOMAINS = ["example.com", "example.org", "test.dev", "mail.example", "demo.io", "sample.net"];
const COUNTRIES = ["Japan", "United States", "Germany", "France", "Brazil", "India", "Canada", "Australia", "Spain", "Italy", "Korea", "Mexico"];
const CITIES = ["Tokyo", "Osaka", "New York", "London", "Berlin", "Paris", "Sydney", "Toronto", "Madrid", "Seoul", "Mumbai", "Sao Paulo"];
const COMPANIES = ["Acme Inc.", "Globex", "Initech", "Umbrella", "Soylent", "Hooli", "Vehement", "Massive Dynamic", "Stark Industries", "Wonka", "Cyberdyne", "Aperture"];
const JOB_TITLES = ["Engineer", "Designer", "Manager", "Analyst", "Developer", "Consultant", "Architect", "Specialist", "Director", "Coordinator", "Researcher", "Administrator"];

type FieldType =
  | "id" | "uuid" | "fullName" | "firstName" | "lastName" | "email" | "username"
  | "boolean" | "integer" | "float" | "price" | "date" | "datetime" | "phone"
  | "country" | "city" | "company" | "jobTitle" | "word" | "sentence"
  | "paragraph" | "url" | "ipv4" | "color" | "enum";

const TYPE_OPTIONS: { value: FieldType; label: string }[] = [
  { value: "id", label: "ID（連番）" },
  { value: "uuid", label: "UUID" },
  { value: "fullName", label: "氏名" },
  { value: "firstName", label: "名" },
  { value: "lastName", label: "姓" },
  { value: "email", label: "メール" },
  { value: "username", label: "ユーザー名" },
  { value: "boolean", label: "真偽値" },
  { value: "integer", label: "整数" },
  { value: "float", label: "小数" },
  { value: "price", label: "価格" },
  { value: "date", label: "日付 (YYYY-MM-DD)" },
  { value: "datetime", label: "日時 (ISO 8601)" },
  { value: "phone", label: "電話番号" },
  { value: "country", label: "国" },
  { value: "city", label: "市区" },
  { value: "company", label: "会社名" },
  { value: "jobTitle", label: "職種" },
  { value: "word", label: "単語" },
  { value: "sentence", label: "文" },
  { value: "paragraph", label: "段落" },
  { value: "url", label: "URL" },
  { value: "ipv4", label: "IPv4" },
  { value: "color", label: "色 (HEX)" },
  { value: "enum", label: "選択肢（カンマ区切り）" },
];

function sentence(): string {
  const n = randInt(4, 10);
  const words: string[] = [];
  for (let i = 0; i < n; i++) words.push(pick(WORDLIST));
  const s = words.join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}

function genValue(type: FieldType, index: number, values?: string): unknown {
  switch (type) {
    case "id":
      return index + 1;
    case "uuid":
      return crypto.randomUUID();
    case "firstName":
      return pick(FIRST_NAMES);
    case "lastName":
      return pick(LAST_NAMES);
    case "fullName":
      return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
    case "email":
      return `${pick(FIRST_NAMES).toLowerCase()}.${pick(LAST_NAMES).toLowerCase()}@${pick(DOMAINS)}`;
    case "username":
      return `${pick(FIRST_NAMES).toLowerCase()}_${randInt(10, 9999)}`;
    case "boolean":
      return randInt(0, 1) === 1;
    case "integer":
      return randInt(0, 10000);
    case "float":
      return randInt(0, 100000) / 100;
    case "price":
      return randInt(100, 99999) / 100;
    case "date": {
      const d = new Date(Date.now() - randInt(0, 1095) * 86400000);
      return d.toISOString().slice(0, 10);
    }
    case "datetime": {
      const d = new Date(Date.now() - randInt(0, 1095) * 86400000 - randInt(0, 86399) * 1000);
      return d.toISOString();
    }
    case "phone":
      return `0${randInt(7, 9)}0-${String(randInt(0, 9999)).padStart(4, "0")}-${String(randInt(0, 9999)).padStart(4, "0")}`;
    case "country":
      return pick(COUNTRIES);
    case "city":
      return pick(CITIES);
    case "company":
      return pick(COMPANIES);
    case "jobTitle":
      return pick(JOB_TITLES);
    case "word":
      return pick(WORDLIST);
    case "sentence":
      return sentence();
    case "paragraph": {
      const n = randInt(3, 5);
      const arr: string[] = [];
      for (let i = 0; i < n; i++) arr.push(sentence());
      return arr.join(" ");
    }
    case "url":
      return `https://${pick(DOMAINS)}/${pick(WORDLIST)}/${pick(WORDLIST)}`;
    case "ipv4":
      return `${randInt(1, 255)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`;
    case "color":
      return `#${randInt(0, 0xffffff).toString(16).padStart(6, "0")}`;
    case "enum": {
      const opts = (values ?? "").split(",").map((s) => s.trim()).filter(Boolean);
      return opts.length > 0 ? pick(opts) : null;
    }
    default:
      return null;
  }
}

type Field = { key: number; name: string; type: FieldType; values?: string };
type Format = "array" | "ndjson" | "object";

const DEFAULT_FIELDS: Omit<Field, "key">[] = [
  { name: "id", type: "id" },
  { name: "name", type: "fullName" },
  { name: "email", type: "email" },
  { name: "createdAt", type: "datetime" },
  { name: "active", type: "boolean" },
];

// フィールド行の安定キー採番（React の key 用。render 中に ref を触らないようモジュールスコープで保持）
let fieldKeySeq = 0;
function makeField(f: Omit<Field, "key">): Field {
  return { ...f, key: fieldKeySeq++ };
}

export default function MockJsonGeneratorPage() {
  const [fields, setFields] = useState<Field[]>(() => DEFAULT_FIELDS.map(makeField));
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<Format>("array");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const named = fields.filter((f) => f.name.trim() !== "");
    const n = Math.max(1, Math.min(1000, count || 1));
    const rows: Record<string, unknown>[] = [];
    for (let i = 0; i < n; i++) {
      const obj: Record<string, unknown> = {};
      for (const f of named) obj[f.name.trim()] = genValue(f.type, i, f.values);
      rows.push(obj);
    }
    if (format === "object") {
      setOutput(JSON.stringify(rows[0] ?? {}, null, 2));
    } else if (format === "ndjson") {
      setOutput(rows.map((r) => JSON.stringify(r)).join("\n"));
    } else {
      setOutput(JSON.stringify(rows, null, 2));
    }
  }, [fields, count, format]);

  // 初回と設定変更時に自動生成
  useEffect(() => {
    generate();
  }, [generate]);

  const addField = () =>
    setFields((prev) => [...prev, makeField({ name: `field${prev.length + 1}`, type: "word" })]);
  const removeField = (key: number) =>
    setFields((prev) => prev.filter((f) => f.key !== key));
  const updateField = (key: number, patch: Partial<Field>) =>
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, ...patch } : f)));

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const download = () => {
    if (!output) return;
    const ext = format === "ndjson" ? "jsonl" : "json";
    const mime = format === "ndjson" ? "application/x-ndjson" : "application/json";
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mock-data.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🧪 Mock JSON Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        フィールドと型を定義して、テスト用のダミー JSON データを生成します。API のモック、フロントの表示確認、DB 投入用のサンプルづくりに。
        生成はすべてブラウザ内で行われ、データはサーバーに送信されません（乱数は <code className="font-mono">crypto.getRandomValues</code> を使用）。
      </p>

      {/* フィールド定義 */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 mb-4">
        <div className="text-sm font-medium mb-3">フィールド定義</div>
        <div className="space-y-2">
          {fields.map((f) => (
            <div key={f.key} className="flex flex-wrap items-center gap-2">
              <input
                value={f.name}
                onChange={(e) => updateField(f.key, { name: e.target.value })}
                placeholder="キー名"
                className="flex-1 min-w-[120px] font-mono text-sm bg-black/5 dark:bg-white/5 rounded px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/50"
                spellCheck={false}
              />
              <select
                value={f.type}
                onChange={(e) => updateField(f.key, { type: e.target.value as FieldType })}
                className="text-sm bg-black/5 dark:bg-white/5 rounded px-2 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {f.type === "enum" && (
                <input
                  value={f.values ?? ""}
                  onChange={(e) => updateField(f.key, { values: e.target.value })}
                  placeholder="例: A, B, C"
                  className="flex-1 min-w-[120px] font-mono text-sm bg-black/5 dark:bg-white/5 rounded px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/50"
                  spellCheck={false}
                />
              )}
              <button
                onClick={() => removeField(f.key)}
                className="px-2 py-1.5 rounded text-xs text-black/50 dark:text-white/50 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition"
                aria-label="フィールド削除"
                title="削除"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addField}
          className="mt-3 px-3 py-1.5 rounded text-xs font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition"
        >
          ＋ フィールド追加
        </button>
      </div>

      {/* 設定 */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <label className="text-sm">
          <span className="block mb-1 font-medium">件数</span>
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
            className="w-24 font-mono text-sm bg-black/5 dark:bg-white/5 rounded px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </label>
        <label className="text-sm">
          <span className="block mb-1 font-medium">出力形式</span>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
            className="text-sm bg-black/5 dark:bg-white/5 rounded px-2 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="array">整形 JSON 配列</option>
            <option value="ndjson">NDJSON / JSON Lines</option>
            <option value="object">単一オブジェクト</option>
          </select>
        </label>
        <button
          onClick={generate}
          className="px-4 py-2 rounded bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
        >
          再生成
        </button>
      </div>

      {/* 出力 */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">出力</span>
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {copied ? "Copied!" : "コピー"}
            </button>
            <button
              onClick={download}
              className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition"
            >
              ダウンロード
            </button>
          </div>
        </div>
        <textarea
          value={output}
          readOnly
          rows={16}
          className="w-full font-mono text-xs sm:text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y"
          spellCheck={false}
        />
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">💡 使い方のヒント</p>
        <ul className="list-disc list-inside space-y-1">
          <li>「ID（連番）」は 1 から始まる連番、「UUID」は <code className="font-mono">crypto.randomUUID()</code> で生成します。</li>
          <li>「選択肢」型はカンマ区切りで候補を入力すると、その中からランダムに選ばれます（ステータスや区分の表現に便利）。</li>
          <li><strong>NDJSON / JSON Lines</strong> は1行1レコード形式。BigQuery や各種ログ取り込み、ストリーム処理のテストに使えます。</li>
          <li>生成された値はダミーです。実在の個人・組織とは関係ありません。</li>
        </ul>
      </div>
    </div>
  );
}
