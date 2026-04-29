"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const STANDARD_CLAIMS: Record<string, string> = {
  iss: "Issuer（発行者）",
  sub: "Subject（主体・通常はユーザーID）",
  aud: "Audience（対象者）",
  exp: "Expiration Time（有効期限・UNIX時刻）",
  nbf: "Not Before（有効開始時刻）",
  iat: "Issued At（発行時刻）",
  jti: "JWT ID（一意な識別子）",
  scope: "Scope（権限スコープ）",
  scp: "Scope（権限スコープ）",
  azp: "Authorized Party（認可された相手）",
  email: "メールアドレス",
  name: "氏名",
  preferred_username: "ユーザー名",
};

const TIME_CLAIMS = new Set(["exp", "nbf", "iat", "auth_time"]);

function fromBase64Url(b64url: string): string {
  let s = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad === 2) s += "==";
  else if (pad === 3) s += "=";
  else if (pad === 1) throw new Error("Base64URL文字列の長さが不正です");
  const binary = atob(s);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

type DecodedJWT = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
};

function decodeJWT(token: string): DecodedJWT {
  const trimmed = token.trim();
  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    throw new Error(
      `JWTは3つのパート（Header.Payload.Signature）で構成される必要がありますが、${parts.length}つしかありません`,
    );
  }
  const [headerB64, payloadB64, signature] = parts;
  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;
  try {
    header = JSON.parse(fromBase64Url(headerB64));
  } catch {
    throw new Error("Headerのデコードに失敗しました（不正なBase64URL or JSON）");
  }
  try {
    payload = JSON.parse(fromBase64Url(payloadB64));
  } catch {
    throw new Error("Payloadのデコードに失敗しました（不正なBase64URL or JSON）");
  }
  return { header, payload, signature };
}

function formatTimestamp(unixSec: number): string {
  if (!Number.isFinite(unixSec)) return "—";
  const d = new Date(unixSec * 1000);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getExpirationStatus(
  payload: Record<string, unknown>,
): { state: "valid" | "expired" | "not_yet" | "no_exp"; message: string } {
  const now = Math.floor(Date.now() / 1000);
  const exp = typeof payload.exp === "number" ? payload.exp : null;
  const nbf = typeof payload.nbf === "number" ? payload.nbf : null;
  if (nbf && now < nbf) {
    return {
      state: "not_yet",
      message: `まだ有効化されていません（有効開始: ${formatTimestamp(nbf)}）`,
    };
  }
  if (exp === null) {
    return { state: "no_exp", message: "expクレームがありません（有効期限なし）" };
  }
  if (now >= exp) {
    const ago = Math.floor((now - exp) / 60);
    return {
      state: "expired",
      message: `期限切れ（${ago.toLocaleString()}分前に失効）`,
    };
  }
  const remaining = exp - now;
  const min = Math.floor(remaining / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  let remainStr = `${remaining}秒`;
  if (day > 0) remainStr = `${day}日${hr % 24}時間`;
  else if (hr > 0) remainStr = `${hr}時間${min % 60}分`;
  else if (min > 0) remainStr = `${min}分${remaining % 60}秒`;
  return { state: "valid", message: `有効（残り ${remainStr}）` };
}

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ." +
  "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoderPage() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    try {
      const decoded = decodeJWT(input);
      return { ok: true as const, ...decoded };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : String(e) };
    }
  }, [input]);

  const expStatus =
    result && result.ok ? getExpirationStatus(result.payload) : null;

  const claimRows =
    result && result.ok
      ? Object.entries(result.payload).map(([k, v]) => {
          const isTime = TIME_CLAIMS.has(k) && typeof v === "number";
          return {
            key: k,
            value: typeof v === "object" ? JSON.stringify(v) : String(v),
            timeStr: isTime ? formatTimestamp(v as number) : null,
            meaning: STANDARD_CLAIMS[k] || "—",
          };
        })
      : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🪪 JWT Decoder
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-4">
        JWT（JSON Web Token）をHeader / Payload / Signatureに分解して可視化します。
        すべてブラウザ内で処理され、トークンはサーバーに送信されません。
      </p>
      <div className="text-xs bg-amber-500/10 border border-amber-500/30 rounded p-3 mb-6 text-amber-800 dark:text-amber-300">
        ⚠ <strong>このツールは署名検証を行いません。</strong>
        署名の正当性を確認するには発行者の公開鍵/共有秘密鍵が必要です。デコード結果は信頼できる情報源としては扱わないでください。
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">JWT文字列</label>
          <button
            onClick={() => setInput(SAMPLE_JWT)}
            className="text-xs px-2 py-1 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            サンプルを入力
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full font-mono text-xs sm:text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all"
        />
      </div>

      {result && !result.ok && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 mb-6">
          <div className="font-medium text-red-700 dark:text-red-400 mb-1">
            ⚠ デコードエラー
          </div>
          <div className="text-sm text-red-700 dark:text-red-400">
            {result.error}
          </div>
        </div>
      )}

      {result && result.ok && (
        <div className="space-y-4">
          {expStatus && (
            <div
              className={`rounded-lg p-3 text-sm ${
                expStatus.state === "valid"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                  : expStatus.state === "expired"
                    ? "bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-300"
                    : expStatus.state === "not_yet"
                      ? "bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300"
                      : "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70"
              }`}
            >
              {expStatus.state === "valid" && "✓ "}
              {expStatus.state === "expired" && "✗ "}
              {expStatus.state === "not_yet" && "⏳ "}
              {expStatus.message}
            </div>
          )}

          <Section
            title="Header"
            color="text-rose-600 dark:text-rose-400"
            badge="🟥"
          >
            <pre className="font-mono text-xs sm:text-sm whitespace-pre-wrap break-all">
              {JSON.stringify(result.header, null, 2)}
            </pre>
          </Section>

          <Section
            title="Payload"
            color="text-fuchsia-600 dark:text-fuchsia-400"
            badge="🟪"
          >
            <pre className="font-mono text-xs sm:text-sm whitespace-pre-wrap break-all mb-3">
              {JSON.stringify(result.payload, null, 2)}
            </pre>
            {claimRows.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10">
                      <th className="text-left py-1 pr-3 font-medium">クレーム</th>
                      <th className="text-left py-1 pr-3 font-medium">値</th>
                      <th className="text-left py-1 font-medium">説明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claimRows.map((row) => (
                      <tr
                        key={row.key}
                        className="border-b border-black/5 dark:border-white/5"
                      >
                        <td className="py-1 pr-3 font-mono">{row.key}</td>
                        <td className="py-1 pr-3 font-mono break-all">
                          {row.value}
                          {row.timeStr && (
                            <div className="text-black/50 dark:text-white/50 text-[10px]">
                              → {row.timeStr}
                            </div>
                          )}
                        </td>
                        <td className="py-1 text-black/60 dark:text-white/60">
                          {row.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Section>

          <Section
            title="Signature"
            color="text-cyan-600 dark:text-cyan-400"
            badge="🟦"
          >
            <div className="font-mono text-xs sm:text-sm break-all mb-2">
              {result.signature || "（空）"}
            </div>
            <div className="text-xs text-black/50 dark:text-white/50">
              署名はBase64URL形式のバイナリです。検証には発行元の鍵が必要なため、このツールでは検証しません。
            </div>
          </Section>
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 JWTについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            JWTは <code className="font-mono">Header.Payload.Signature</code> の3パート構成で、各パートはBase64URLでエンコードされています。
          </li>
          <li>
            <strong>Payloadは暗号化されていません</strong>。誰でもデコードして中身を読めるため、機密情報を含めないでください。
          </li>
          <li>
            <strong>署名（Signature）</strong>は改ざん検知のためのもので、ペイロードの秘匿には使えません。
          </li>
          <li>
            <code className="font-mono">alg: none</code>{" "}
            のJWTは署名なしで受け入れる脆弱性の温床になるため、検証側で必ず拒否すべきです。
          </li>
        </ul>
      </div>
    </div>
  );
}

function Section({
  title,
  color,
  badge,
  children,
}: {
  title: string;
  color: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
      <div className={`font-semibold text-sm mb-2 ${color}`}>
        {badge} {title}
      </div>
      <div className="bg-black/5 dark:bg-white/5 rounded p-3">{children}</div>
    </div>
  );
}
