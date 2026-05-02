"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { WORDLIST, WORDLIST_SIZE } from "@/lib/wordlist";

type Mode = "password" | "passphrase";

const CHARSETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{};:,.<>?/~",
};

type CharsetKey = keyof typeof CHARSETS;

const SEPARATORS = [
  { value: "-", label: "ハイフン -" },
  { value: " ", label: "スペース␣" },
  { value: ".", label: "ドット ." },
  { value: "_", label: "アンダースコア _" },
  { value: "+", label: "プラス +" },
] as const;
type Separator = (typeof SEPARATORS)[number]["value"];

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

function generatePassphrase(
  wordCount: number,
  separator: Separator,
  capitalize: boolean,
  appendNumber: boolean,
): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    let w = WORDLIST[secureRandomInt(WORDLIST_SIZE)];
    if (capitalize) w = w.charAt(0).toUpperCase() + w.slice(1);
    words.push(w);
  }
  let pf = words.join(separator);
  if (appendNumber) {
    pf += String(secureRandomInt(100)).padStart(2, "0");
  }
  return pf;
}

function calcPasswordEntropy(
  length: number,
  enabled: Record<CharsetKey, boolean>,
): number {
  const charsetSize = (Object.keys(CHARSETS) as CharsetKey[])
    .filter((k) => enabled[k])
    .reduce((sum, k) => sum + CHARSETS[k].length, 0);
  if (charsetSize === 0) return 0;
  return length * Math.log2(charsetSize);
}

function calcPassphraseEntropy(
  wordCount: number,
  appendNumber: boolean,
): number {
  // 大文字オプションは「単語の先頭のみ」なので追加エントロピーゼロ（攻撃者は試行する）
  let bits = wordCount * Math.log2(WORDLIST_SIZE);
  if (appendNumber) bits += Math.log2(100);
  return bits;
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
  const [mode, setMode] = useState<Mode>("password");

  // password mode
  const [length, setLength] = useState(16);
  const [enabled, setEnabled] = useState<Record<CharsetKey, boolean>>({
    lower: true,
    upper: true,
    number: true,
    symbol: true,
  });

  // passphrase mode
  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState<Separator>("-");
  const [capitalize, setCapitalize] = useState(false);
  const [appendNumber, setAppendNumber] = useState(false);

  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const regenerate = useCallback(() => {
    if (mode === "password") {
      setOutput(generatePassword(length, enabled));
    } else {
      setOutput(
        generatePassphrase(wordCount, separator, capitalize, appendNumber),
      );
    }
    setCopied(false);
  }, [mode, length, enabled, wordCount, separator, capitalize, appendNumber]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const entropy = useMemo(() => {
    return mode === "password"
      ? calcPasswordEntropy(length, enabled)
      : calcPassphraseEntropy(wordCount, appendNumber);
  }, [mode, length, enabled, wordCount, appendNumber]);
  const strength = strengthLabel(entropy);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
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
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        暗号学的に安全な乱数（<code className="font-mono">crypto.getRandomValues</code>
        ）でパスワードまたはパスフレーズを生成。すべてブラウザ内で完結し、サーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 mb-6 inline-flex bg-black/5 dark:bg-white/5">
        {(["password", "passphrase"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              mode === m
                ? "bg-emerald-600 text-white"
                : "text-black/70 dark:text-white/70 hover:text-foreground"
            }`}
          >
            {m === "password" ? "パスワード" : "パスフレーズ"}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <input
            readOnly
            value={output}
            className="flex-1 font-mono text-base sm:text-lg bg-black/5 dark:bg-white/5 rounded px-3 py-2 outline-none select-all break-all"
            onFocus={(e) => e.currentTarget.select()}
          />
          <button
            onClick={copy}
            className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition shrink-0"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={regenerate}
            aria-label="再生成"
            className="px-3 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-sm transition shrink-0"
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

      {mode === "password" ? (
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
      ) : (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">単語数</label>
              <span className="font-mono text-sm">{wordCount}</span>
            </div>
            <input
              type="range"
              min={3}
              max={10}
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <p className="text-[11px] text-black/50 dark:text-white/50 mt-1">
              辞書サイズ {WORDLIST_SIZE} 語 · 5語以上を推奨（{calcPassphraseEntropy(5, false).toFixed(0)} bit）
            </p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">セパレータ</label>
            <div className="flex flex-wrap gap-2">
              {SEPARATORS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSeparator(s.value)}
                  className={`px-3 py-1.5 rounded text-xs border transition ${
                    separator === s.value
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono">
                    {s.value === " " ? "␣" : s.value}
                  </span>
                  <span className="ml-1 text-[10px] opacity-70">
                    {s.label.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 px-3 py-2 rounded border border-black/10 dark:border-white/10 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition">
              <input
                type="checkbox"
                checked={capitalize}
                onChange={(e) => setCapitalize(e.target.checked)}
                className="accent-emerald-600"
              />
              <span className="text-sm">各単語の先頭を大文字にする</span>
            </label>
            <label className="flex items-center gap-2 px-3 py-2 rounded border border-black/10 dark:border-white/10 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition">
              <input
                type="checkbox"
                checked={appendNumber}
                onChange={(e) => setAppendNumber(e.target.checked)}
                className="accent-emerald-600"
              />
              <span className="text-sm">
                末尾に2桁の数字を追加する{" "}
                <span className="text-black/50 dark:text-white/50 text-xs">
                  (+{Math.log2(100).toFixed(1)} bit)
                </span>
              </span>
            </label>
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 パスワード vs パスフレーズ
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>パスワード</strong>:
            ランダムな文字列。短くて済むがタイプしにくく覚えにくい。サービスの最大長制限に合わせて使う。
          </li>
          <li>
            <strong>パスフレーズ</strong>:
            複数の単語をつないだもの（XKCD #936 の <code className="font-mono">correct-horse-battery-staple</code> が有名）。長いが覚えやすい。マスターパスワード・SSH鍵パスフレーズに最適。
          </li>
          <li>
            一般的に <strong>16文字以上 + 4種類混在 = エントロピー 100 bit 以上</strong> あれば現在の総当たり攻撃に十分安全です。パスフレーズなら <strong>6語以上</strong> でほぼ同等のエントロピーになります。
          </li>
          <li>
            乱数生成にはブラウザ標準の Web Crypto API（
            <code className="font-mono">crypto.getRandomValues</code>）を使用、
            <code className="font-mono">Math.random()</code> は使いません。
          </li>
        </ul>
      </div>
    </div>
  );
}
