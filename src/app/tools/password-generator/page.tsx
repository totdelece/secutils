"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

const CHARSETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{};:,.<>?/~",
};

type CharsetKey = keyof typeof CHARSETS;

function secureRandomInt(maxExclusive: number): number {
  const max = Math.floor(0xffffffff / maxExclusive) * maxExclusive;
  const buf = new Uint32Array(1);
  while (true) {
    crypto.getRandomValues(buf);
    if (buf[0] < max) return buf[0] % maxExclusive;
  }
}

function pickRandom(charset: string): string {
  return charset[secureRandomInt(charset.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generatePassword(
  length: number,
  enabled: Record<CharsetKey, boolean>,
): string {
  const enabledSets = (Object.keys(CHARSETS) as CharsetKey[]).filter(
    (k) => enabled[k],
  );
  if (enabledSets.length === 0) return "";

  const chars: string[] = [];
  for (const k of enabledSets) {
    chars.push(pickRandom(CHARSETS[k]));
  }
  const fullCharset = enabledSets.map((k) => CHARSETS[k]).join("");
  while (chars.length < length) {
    chars.push(pickRandom(fullCharset));
  }
  return shuffle(chars).slice(0, length).join("");
}

function calcEntropy(
  length: number,
  enabled: Record<CharsetKey, boolean>,
): number {
  const charsetSize = (Object.keys(CHARSETS) as CharsetKey[])
    .filter((k) => enabled[k])
    .reduce((sum, k) => sum + CHARSETS[k].length, 0);
  if (charsetSize === 0) return 0;
  return length * Math.log2(charsetSize);
}

function strengthLabel(entropy: number): {
  label: string;
  color: string;
  pct: number;
} {
  const pct = Math.min(100, (entropy / 128) * 100);
  if (entropy < 40) return { label: "弱い", color: "bg-red-500", pct };
  if (entropy < 64) return { label: "普通", color: "bg-yellow-500", pct };
  if (entropy < 100) return { label: "強い", color: "bg-emerald-500", pct };
  return { label: "非常に強い", color: "bg-emerald-600", pct };
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [enabled, setEnabled] = useState<Record<CharsetKey, boolean>>({
    lower: true,
    upper: true,
    number: true,
    symbol: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const regenerate = useCallback(() => {
    setPassword(generatePassword(length, enabled));
    setCopied(false);
  }, [length, enabled]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const entropy = useMemo(() => calcEntropy(length, enabled), [length, enabled]);
  const strength = strengthLabel(entropy);

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggle = (key: CharsetKey) => {
    setEnabled((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔐 Password Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        暗号学的に安全な乱数（<code className="font-mono">crypto.getRandomValues</code>
        ）でパスワードを生成します。すべてブラウザ内で完結し、サーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <input
            readOnly
            value={password}
            className="flex-1 font-mono text-base sm:text-lg bg-black/5 dark:bg-white/5 rounded px-3 py-2 outline-none select-all"
            onFocus={(e) => e.currentTarget.select()}
          />
          <button
            onClick={copy}
            className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={regenerate}
            aria-label="Regenerate"
            className="px-3 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-sm transition"
          >
            ↻
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex-1 h-1.5 bg-black/10 dark:bg-white/10 rounded overflow-hidden">
            <div
              className={`h-full ${strength.color} transition-all`}
              style={{ width: `${strength.pct}%` }}
            />
          </div>
          <div className="font-mono text-black/60 dark:text-white/60 whitespace-nowrap">
            {entropy.toFixed(0)} bits · {strength.label}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">長さ</label>
            <span className="font-mono text-sm">{length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["lower", "小文字 (a-z)"],
              ["upper", "大文字 (A-Z)"],
              ["number", "数字 (0-9)"],
              ["symbol", "記号 (!@#...)"],
            ] as [CharsetKey, string][]
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-2 px-3 py-2 rounded border border-black/10 dark:border-white/10 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <input
                type="checkbox"
                checked={enabled[key]}
                onChange={() => toggle(key)}
                className="accent-emerald-600"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 セキュリティについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            乱数生成にはブラウザ標準の Web Crypto API（
            <code className="font-mono">crypto.getRandomValues</code>）を使用しています。
          </li>
          <li>
            生成したパスワードはネットワークに送信されません。
          </li>
          <li>
            一般的に <strong>16文字以上 + 4種類混在 = エントロピー 100 bit 以上</strong>{" "}
            あれば現在の総当たり攻撃に対して十分安全です。
          </li>
        </ul>
      </div>
    </div>
  );
}
