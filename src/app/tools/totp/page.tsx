"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Algorithm = "SHA-1" | "SHA-256" | "SHA-512";
type Digits = 6 | 7 | 8;

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input: string): Uint8Array<ArrayBuffer> {
  const cleaned = input.replace(/[\s=]/g, "").toUpperCase();
  if (!cleaned) {
    return new Uint8Array(new ArrayBuffer(0));
  }
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of cleaned) {
    const idx = BASE32_ALPHABET.indexOf(ch);
    if (idx === -1) {
      throw new Error(`不正なBase32文字: ${ch}（A-Z, 2-7 のみ使用可能）`);
    }
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      out.push((value >> bits) & 0xff);
    }
  }
  const buf = new ArrayBuffer(out.length);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < out.length; i++) arr[i] = out[i];
  return arr;
}

async function computeTOTP(
  secret: string,
  algorithm: Algorithm,
  digits: Digits,
  period: number,
  unixSec: number,
): Promise<string> {
  const keyBytes = base32Decode(secret);
  if (keyBytes.length === 0) throw new Error("秘密鍵が空です");

  const counter = Math.floor(unixSec / period);
  const counterBuf = new ArrayBuffer(8);
  const view = new DataView(counterBuf);
  view.setUint32(0, Math.floor(counter / 0x100000000), false);
  view.setUint32(4, counter % 0x100000000, false);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: algorithm },
    false,
    ["sign"],
  );
  const hmac = await crypto.subtle.sign("HMAC", cryptoKey, counterBuf);
  const hmacArr = new Uint8Array(hmac);

  const offset = hmacArr[hmacArr.length - 1] & 0x0f;
  const code =
    ((hmacArr[offset] & 0x7f) << 24) |
    ((hmacArr[offset + 1] & 0xff) << 16) |
    ((hmacArr[offset + 2] & 0xff) << 8) |
    (hmacArr[offset + 3] & 0xff);

  const otp = code % 10 ** digits;
  return String(otp).padStart(digits, "0");
}

function buildOtpauthUri(
  secret: string,
  algorithm: Algorithm,
  digits: Digits,
  period: number,
  label: string,
  issuer: string,
): string {
  const cleanSecret = secret.replace(/\s/g, "").toUpperCase();
  const params = new URLSearchParams({
    secret: cleanSecret,
    issuer,
    algorithm: algorithm.replace("-", ""),
    digits: String(digits),
    period: String(period),
  });
  return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(label)}?${params.toString()}`;
}

export default function TotpPage() {
  const [secret, setSecret] = useState("JBSWY3DPEHPK3PXP");
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-1");
  const [digits, setDigits] = useState<Digits>(6);
  const [period, setPeriod] = useState(30);
  const [showSecret, setShowSecret] = useState(false);
  const [label, setLabel] = useState("user@example.com");
  const [issuer, setIssuer] = useState("secutils");

  const [now, setNow] = useState<number | null>(null);
  const [previousCode, setPreviousCode] = useState("");
  const [currentCode, setCurrentCode] = useState("");
  const [nextCode, setNextCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // クライアント側で初期化（hydration mismatch回避）
  useEffect(() => {
    const tick = () => setNow(Math.floor(Date.now() / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // コード再計算
  useEffect(() => {
    if (now === null) return;
    if (!secret.trim()) {
      setError(null);
      setCurrentCode("");
      setPreviousCode("");
      setNextCode("");
      return;
    }
    let cancelled = false;
    Promise.all([
      computeTOTP(secret, algorithm, digits, period, now - period),
      computeTOTP(secret, algorithm, digits, period, now),
      computeTOTP(secret, algorithm, digits, period, now + period),
    ])
      .then(([prev, cur, nxt]) => {
        if (cancelled) return;
        setPreviousCode(prev);
        setCurrentCode(cur);
        setNextCode(nxt);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "計算エラー");
        setCurrentCode("");
        setPreviousCode("");
        setNextCode("");
      });
    return () => {
      cancelled = true;
    };
  }, [secret, algorithm, digits, period, now]);

  const remaining = now === null ? 0 : period - (now % period);
  const progress = now === null ? 0 : 100 - ((now % period) / period) * 100;

  const copy = async () => {
    if (!currentCode) return;
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const otpauth = buildOtpauthUri(
    secret,
    algorithm,
    digits,
    period,
    label,
    issuer,
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔢 TOTP Generator (2FA)
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        RFC 6238 の Time-based One-Time Password を計算します。Google Authenticator / Authy / 1Password 互換。秘密鍵はブラウザ内のみで処理され、サーバーには送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="totp-secret" className="text-sm font-medium">
            秘密鍵（Base32）
          </label>
          <button
            onClick={() => setShowSecret((s) => !s)}
            className="text-xs text-black/50 dark:text-white/50 hover:text-foreground underline"
            type="button"
          >
            {showSecret ? "隠す" : "表示"}
          </button>
        </div>
        <input
          id="totp-secret"
          type={showSecret ? "text" : "password"}
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="JBSWY3DPEHPK3PXP"
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50"
          autoComplete="off"
          spellCheck={false}
        />
        <p className="text-[11px] text-black/50 dark:text-white/50 mt-2">
          ⚠ 本物の 2FA 秘密鍵を入力する場合は、HTTPS / 信頼できる端末である事を確認してください
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400 mb-4">
          ⚠ {error}
        </div>
      ) : currentCode ? (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 mb-4 text-center">
          <div className="text-xs text-black/50 dark:text-white/50 mb-2">
            現在のコード
          </div>
          <div
            className="text-5xl sm:text-6xl font-mono font-bold tracking-widest mb-3 select-all"
            onClick={(e) => {
              const r = document.createRange();
              r.selectNodeContents(e.currentTarget);
              const s = window.getSelection();
              s?.removeAllRanges();
              s?.addRange(r);
            }}
          >
            {currentCode.match(/.{1,3}/g)?.join(" ")}
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <button
              onClick={copy}
              className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-black/10 dark:bg-white/10 rounded overflow-hidden mb-1">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-black/50 dark:text-white/50 font-mono">
              残り {remaining} 秒
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-8 text-center text-black/40 dark:text-white/40 text-sm mb-4">
          秘密鍵を入力するとコードが表示されます
        </div>
      )}

      {currentCode && (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 mb-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xs text-black/40 dark:text-white/40 mb-1">
              前のコード
            </div>
            <div className="font-mono text-sm text-black/60 dark:text-white/60">
              {previousCode}
            </div>
          </div>
          <div>
            <div className="text-xs text-black/40 dark:text-white/40 mb-1">
              次のコード
            </div>
            <div className="font-mono text-sm text-black/60 dark:text-white/60">
              {nextCode}
            </div>
          </div>
        </div>
      )}

      <details className="rounded-lg border border-black/10 dark:border-white/10 mb-4">
        <summary className="px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
          詳細設定（アルゴリズム / 桁数 / 期間）
        </summary>
        <div className="p-5 space-y-4 border-t border-black/5 dark:border-white/10">
          <div>
            <div className="text-sm font-medium mb-2">アルゴリズム</div>
            <div className="flex gap-2 flex-wrap">
              {(["SHA-1", "SHA-256", "SHA-512"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAlgorithm(a)}
                  className={`px-3 py-1.5 rounded text-xs font-mono border transition ${
                    algorithm === a
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-black/50 dark:text-white/50 mt-1">
              Google Authenticator は SHA-1（256/512非対応の実装が多い）
            </p>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">桁数</div>
            <div className="flex gap-2">
              {([6, 7, 8] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDigits(d)}
                  className={`px-3 py-1.5 rounded text-xs font-mono border transition ${
                    digits === d
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {d}桁
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">期間（秒）</div>
            <input
              type="number"
              min={10}
              max={120}
              step={10}
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value) || 30)}
              className="w-24 bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono text-sm"
            />
            <span className="text-xs text-black/50 dark:text-white/50 ml-2">
              一般的には 30 秒
            </span>
          </div>
        </div>
      </details>

      <details className="rounded-lg border border-black/10 dark:border-white/10 mb-4">
        <summary className="px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
          otpauth:// URI 生成（QRコード化用）
        </summary>
        <div className="p-5 space-y-4 border-t border-black/5 dark:border-white/10">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium block mb-1">
                Issuer（サービス名）
              </label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="w-full font-mono text-xs bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1">
                Label（アカウント名）
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full font-mono text-xs bg-black/5 dark:bg-white/5 rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>
          <div>
            <div className="text-xs font-medium mb-1">otpauth URI</div>
            <pre className="text-[10px] sm:text-xs font-mono bg-black/5 dark:bg-white/5 rounded p-2 overflow-x-auto break-all">
              {otpauth}
            </pre>
            <p className="text-[11px] text-black/50 dark:text-white/50 mt-2">
              この URI を{" "}
              <Link
                href="/tools/qr-code"
                className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                QR Code Generator
              </Link>{" "}
              に貼って QR 化すれば、認証アプリでスキャン登録できます。
            </p>
          </div>
        </div>
      </details>

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 TOTP について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>TOTP（RFC 6238）</strong>は HOTP（RFC 4226）の拡張。30秒ごとに変わるカウンター値で HMAC を計算し、6 桁を取り出す仕組みです。
          </li>
          <li>
            <strong>2要素認証の「持ち物」要素</strong>として広く使われます（Google / GitHub / AWS 等のアカウントログイン）。
          </li>
          <li>
            計算には<strong>正確な時刻</strong>が必要です。サーバーとクライアントの時刻が大きくずれているとコードが合いません。多くの実装は前後 1 ステップの猶予を持っています。
          </li>
          <li>
            秘密鍵は<strong>紙で保管 / オフラインバックアップ</strong>することが強く推奨されます。スマホ紛失時に再設定不能になる事故が頻発します。
          </li>
          <li>
            TOTP は<strong>フィッシングに弱い</strong>（攻撃者にコードを横流ししてしまう）ため、より強固な 2FA としては FIDO2 / Passkey が推奨されます。
          </li>
        </ul>
      </div>
    </div>
  );
}
