"use client";

import { useState } from "react";
import Link from "next/link";
import bcrypt from "bcryptjs";

type Mode = "hash" | "verify";

const COST_DESCRIPTION: Record<number, string> = {
  4: "極小（テスト用）",
  6: "弱い",
  8: "弱い",
  10: "標準（既定）",
  11: "推奨",
  12: "強い",
  13: "強い",
  14: "非常に強い",
  15: "非常に強い",
  16: "極端に遅い",
};

function describeCost(cost: number): string {
  return COST_DESCRIPTION[cost] ?? "";
}

export default function BcryptPage() {
  const [mode, setMode] = useState<Mode>("hash");

  // Hash mode
  const [password, setPassword] = useState("");
  const [cost, setCost] = useState(10);
  const [hashResult, setHashResult] = useState("");
  const [hashError, setHashError] = useState<string | null>(null);
  const [hashing, setHashing] = useState(false);
  const [hashTime, setHashTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Verify mode
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<
    "idle" | "match" | "no_match" | "verifying" | "error"
  >("idle");
  const [verifyMessage, setVerifyMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const generate = async () => {
    if (!password) return;
    setHashing(true);
    setHashError(null);
    setHashResult("");
    setHashTime(null);
    try {
      const start = performance.now();
      const salt = await bcrypt.genSalt(cost);
      const hash = await bcrypt.hash(password, salt);
      const elapsed = performance.now() - start;
      setHashResult(hash);
      setHashTime(elapsed);
    } catch (e) {
      setHashError(e instanceof Error ? e.message : "ハッシュ生成失敗");
    } finally {
      setHashing(false);
    }
  };

  const verify = async () => {
    if (!verifyPassword || !verifyHash) return;
    setVerifyResult("verifying");
    try {
      const ok = await bcrypt.compare(verifyPassword, verifyHash);
      setVerifyResult(ok ? "match" : "no_match");
      setVerifyMessage("");
    } catch (e) {
      setVerifyResult("error");
      setVerifyMessage(
        e instanceof Error
          ? e.message
          : "ハッシュ形式が不正です（$2a$10$... の形式が必要）",
      );
    }
  };

  const copyHash = async () => {
    if (!hashResult) return;
    await navigator.clipboard.writeText(hashResult);
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
        🧂 Bcrypt Hasher / Verifier
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        パスワード保存の定番 <strong>bcrypt</strong> をブラウザで計算・検証します。コストファクターを上げると指数関数的に遅くなる体感もできます。すべてブラウザ内で処理され、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 mb-6 inline-flex bg-black/5 dark:bg-white/5">
        {(["hash", "verify"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              mode === m
                ? "bg-emerald-600 text-white"
                : "text-black/70 dark:text-white/70 hover:text-foreground"
            }`}
          >
            {m === "hash" ? "ハッシュ生成" : "ハッシュ照合"}
          </button>
        ))}
      </div>

      {mode === "hash" ? (
        <>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="bc-password" className="text-sm font-medium">
                パスワード（平文）
              </label>
              <button
                onClick={() => setShowPassword((s) => !s)}
                className="text-xs text-black/50 dark:text-white/50 hover:text-foreground underline"
                type="button"
              >
                {showPassword ? "隠す" : "表示"}
              </button>
            </div>
            <input
              id="bc-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ハッシュ化したいパスワード..."
              className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50"
              autoComplete="off"
              spellCheck={false}
              maxLength={72}
            />
            <p className="text-[11px] text-black/50 dark:text-white/50 mt-2">
              ⚠ bcrypt は 72 バイト以上のパスワードを切り捨てます
            </p>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">
                コストファクター
              </label>
              <span className="font-mono text-sm">
                {cost}{" "}
                <span className="text-xs text-black/50 dark:text-white/50">
                  ({describeCost(cost)})
                </span>
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={15}
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <p className="text-[11px] text-black/50 dark:text-white/50 mt-2">
              2^{cost} = {Math.pow(2, cost).toLocaleString()} 回のキー導出ラウンド。+1 するごとに計算時間が約 2 倍になります。
            </p>
          </div>

          <button
            onClick={generate}
            disabled={!password || hashing}
            className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-500 disabled:bg-black/10 disabled:text-black/40 dark:disabled:bg-white/10 dark:disabled:text-white/40 text-white text-sm font-medium transition mb-4"
          >
            {hashing ? "計算中…" : "ハッシュを生成"}
          </button>

          {hashError && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400 mb-4">
              ⚠ {hashError}
            </div>
          )}

          {hashResult && (
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">ハッシュ結果</span>
                  {hashTime !== null && (
                    <span className="text-xs text-black/50 dark:text-white/50 font-mono">
                      ({(hashTime / 1000).toFixed(2)} 秒)
                    </span>
                  )}
                </div>
                <button
                  onClick={copyHash}
                  className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="font-mono text-xs sm:text-sm bg-black/5 dark:bg-white/5 rounded p-3 break-all select-all">
                {hashResult}
              </div>
              <div className="text-[11px] text-black/50 dark:text-white/50 mt-2 font-mono">
                $2a$ = bcrypt 識別子 · $cost$ = コスト · 残り 22 文字 = ソルト · 残り = ハッシュ
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
            <label className="text-sm font-medium block mb-2">
              パスワード（平文）
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              placeholder="検証したいパスワード..."
              className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              onClick={() => setShowPassword((s) => !s)}
              className="text-xs text-black/50 dark:text-white/50 hover:text-foreground underline mt-2"
              type="button"
            >
              {showPassword ? "パスワードを隠す" : "パスワードを表示"}
            </button>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
            <label className="text-sm font-medium block mb-2">
              ハッシュ（$2a$… 形式）
            </label>
            <textarea
              value={verifyHash}
              onChange={(e) => setVerifyHash(e.target.value)}
              rows={3}
              placeholder="$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
              className="w-full font-mono text-xs sm:text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all"
              spellCheck={false}
            />
          </div>

          <button
            onClick={verify}
            disabled={
              !verifyPassword ||
              !verifyHash ||
              verifyResult === "verifying"
            }
            className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-500 disabled:bg-black/10 disabled:text-black/40 dark:disabled:bg-white/10 dark:disabled:text-white/40 text-white text-sm font-medium transition mb-4"
          >
            {verifyResult === "verifying" ? "検証中…" : "ハッシュを検証"}
          </button>

          {verifyResult === "match" && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300 font-medium">
              ✓ パスワードはハッシュと一致します
            </div>
          )}
          {verifyResult === "no_match" && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-700 dark:text-red-300 font-medium">
              ✗ パスワードはハッシュと一致しません
            </div>
          )}
          {verifyResult === "error" && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
              ⚠ {verifyMessage}
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 bcrypt について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>bcrypt</strong>（1999年）は OpenBSD の Niels Provos らが開発した、パスワード保存に特化したハッシュ関数。Blowfish 暗号をベースにしています。
          </li>
          <li>
            <strong>「遅い」のが特徴</strong>: 一般的なハッシュ（SHA-256 等）が GPU で 1 秒間に数十億回計算できるのに対し、bcrypt はコストファクター 10 で 1 秒間に 数百〜数千回しか計算できません。これが総当たり攻撃に対する強さの源です。
          </li>
          <li>
            <strong>コストファクターの推奨値</strong>: 現代のサーバーでは 10〜12 が主流。サービスの規模・サーバー性能と相談して設定。
          </li>
          <li>
            <strong>ソルト自動生成</strong>: bcrypt はハッシュ内部にソルトを含むため、別途ソルトを保存する必要がありません。
          </li>
          <li>
            <strong>72バイト制限</strong>: bcrypt は内部的にパスワードを 72 バイトで切り捨てます。長いパスワードを使う場合は事前に SHA-256 で固定長にハッシュしてから渡す手法もあります（ただし $2y$/$2a$ の互換性に注意）。
          </li>
          <li>
            <strong>もっと強い選択肢</strong>: <strong>scrypt</strong>（メモリ硬性）/ <strong>Argon2</strong>（PHC 受賞、推奨）も検討してください。bcrypt は今でも実用的ですが、新規実装なら Argon2id が第一選択です。
          </li>
        </ul>
      </div>
    </div>
  );
}
