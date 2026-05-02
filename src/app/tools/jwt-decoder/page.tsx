"use client";

import { useEffect, useMemo, useState } from "react";
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

type AlgParams =
  | { type: "hmac"; hash: string }
  | { type: "rsa"; hash: string }
  | { type: "ecdsa"; hash: string; curve: string }
  | { type: "rsa-pss"; hash: string; saltLength: number };

const ALG_MAP: Record<string, AlgParams> = {
  HS256: { type: "hmac", hash: "SHA-256" },
  HS384: { type: "hmac", hash: "SHA-384" },
  HS512: { type: "hmac", hash: "SHA-512" },
  RS256: { type: "rsa", hash: "SHA-256" },
  RS384: { type: "rsa", hash: "SHA-384" },
  RS512: { type: "rsa", hash: "SHA-512" },
  ES256: { type: "ecdsa", hash: "SHA-256", curve: "P-256" },
  ES384: { type: "ecdsa", hash: "SHA-384", curve: "P-384" },
  ES512: { type: "ecdsa", hash: "SHA-512", curve: "P-521" },
  PS256: { type: "rsa-pss", hash: "SHA-256", saltLength: 32 },
  PS384: { type: "rsa-pss", hash: "SHA-384", saltLength: 48 },
  PS512: { type: "rsa-pss", hash: "SHA-512", saltLength: 64 },
};

// SubtleCrypto API は BufferSource (= ArrayBufferView<ArrayBuffer> | ArrayBuffer)
// を要求するため、明示的に ArrayBuffer 上の Uint8Array を返す
function base64UrlToBytes(b64url: string): Uint8Array<ArrayBuffer> {
  let s = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad === 2) s += "==";
  else if (pad === 3) s += "=";
  else if (pad === 1) throw new Error("不正なBase64URL長");
  const binary = atob(s);
  const buf = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function pemToBytes(pem: string): Uint8Array<ArrayBuffer> {
  const m = pem.match(
    /-----BEGIN [A-Z0-9 ]+-----([\s\S]+?)-----END [A-Z0-9 ]+-----/,
  );
  if (!m) {
    throw new Error(
      "PEM形式として認識できません（-----BEGIN xxx-----...-----END xxx-----）",
    );
  }
  const cleaned = m[1].replace(/\s+/g, "");
  const binary = atob(cleaned);
  const buf = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function verifyJwt(
  token: string,
  alg: string,
  keyInput: string,
): Promise<boolean> {
  const params = ALG_MAP[alg];
  if (!params) throw new Error(`未対応のアルゴリズム: ${alg}`);

  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("JWT形式が不正です");
  const [headerB64, payloadB64, sigB64] = parts;
  const signedData = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = base64UrlToBytes(sigB64);

  if (params.type === "hmac") {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(keyInput),
      { name: "HMAC", hash: params.hash },
      false,
      ["verify"],
    );
    return crypto.subtle.verify("HMAC", key, signature, signedData);
  }
  if (params.type === "rsa") {
    const spki = pemToBytes(keyInput);
    const key = await crypto.subtle.importKey(
      "spki",
      spki,
      { name: "RSASSA-PKCS1-v1_5", hash: params.hash },
      false,
      ["verify"],
    );
    return crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signature,
      signedData,
    );
  }
  if (params.type === "ecdsa") {
    const spki = pemToBytes(keyInput);
    const key = await crypto.subtle.importKey(
      "spki",
      spki,
      { name: "ECDSA", namedCurve: params.curve },
      false,
      ["verify"],
    );
    return crypto.subtle.verify(
      { name: "ECDSA", hash: params.hash },
      key,
      signature,
      signedData,
    );
  }
  // rsa-pss
  const spki = pemToBytes(keyInput);
  const key = await crypto.subtle.importKey(
    "spki",
    spki,
    { name: "RSA-PSS", hash: params.hash },
    false,
    ["verify"],
  );
  return crypto.subtle.verify(
    { name: "RSA-PSS", saltLength: params.saltLength },
    key,
    signature,
    signedData,
  );
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
    header = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(
        base64UrlToBytes(headerB64),
      ),
    );
  } catch {
    throw new Error("Headerのデコードに失敗しました（不正なBase64URL or JSON）");
  }
  try {
    payload = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(
        base64UrlToBytes(payloadB64),
      ),
    );
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

const SAMPLE_HS256_SECRET = "your-256-bit-secret";

type VerifyState =
  | { kind: "idle" }
  | { kind: "verifying" }
  | { kind: "valid" }
  | { kind: "invalid" }
  | { kind: "error"; message: string };

export default function JwtDecoderPage() {
  const [input, setInput] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [verify, setVerify] = useState<VerifyState>({ kind: "idle" });

  const result = useMemo(() => {
    if (!input.trim()) return null;
    try {
      const decoded = decodeJWT(input);
      return { ok: true as const, ...decoded };
    } catch (e) {
      return {
        ok: false as const,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }, [input]);

  // 入力やキーが変わったら検証結果をリセット
  useEffect(() => {
    setVerify({ kind: "idle" });
  }, [input, keyInput]);

  const detectedAlg =
    result?.ok && typeof result.header.alg === "string"
      ? result.header.alg
      : null;
  const algInfo = detectedAlg ? ALG_MAP[detectedAlg] : null;

  const handleVerify = async () => {
    if (!result?.ok || !detectedAlg || !keyInput.trim()) return;
    setVerify({ kind: "verifying" });
    try {
      const ok = await verifyJwt(input, detectedAlg, keyInput);
      setVerify({ kind: ok ? "valid" : "invalid" });
    } catch (e) {
      setVerify({
        kind: "error",
        message: e instanceof Error ? e.message : "検証エラー",
      });
    }
  };

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

  const keyLabel = !algInfo
    ? "キー"
    : algInfo.type === "hmac"
      ? "シークレットキー（HMAC）"
      : "公開鍵（PEM形式）";

  const keyPlaceholder = !algInfo
    ? "JWTを入力するとアルゴリズムが判定されます"
    : algInfo.type === "hmac"
      ? "your-256-bit-secret"
      : "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...\n-----END PUBLIC KEY-----";

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
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        JWT（JSON Web Token）をHeader / Payload / Signatureに分解して可視化し、HMAC / RSA / ECDSA / RSA-PSS で<strong>署名検証</strong>もできます。
        すべてブラウザ内（<code className="font-mono">SubtleCrypto</code>）で処理され、トークン・キーはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">JWT文字列</label>
          <button
            onClick={() => {
              setInput(SAMPLE_JWT);
              setKeyInput(SAMPLE_HS256_SECRET);
            }}
            className="text-xs px-2 py-1 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            サンプル（HS256）
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full font-mono text-xs sm:text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all"
          spellCheck={false}
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
            <div className="font-mono text-xs sm:text-sm break-all mb-3">
              {result.signature || "（空）"}
            </div>
            {detectedAlg && (
              <div className="text-xs text-black/60 dark:text-white/60 mb-3">
                検出アルゴリズム:{" "}
                <span className="font-mono font-bold">{detectedAlg}</span>
                {algInfo ? (
                  <span className="text-black/40 dark:text-white/40">
                    {" "}
                    ({algInfo.type === "hmac"
                      ? "対称鍵"
                      : algInfo.type === "rsa"
                        ? "RSA 公開鍵"
                        : algInfo.type === "ecdsa"
                          ? "ECDSA 公開鍵"
                          : "RSA-PSS 公開鍵"}
                    )
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">
                    {" "}
                    （未対応・検証不可）
                  </span>
                )}
              </div>
            )}
          </Section>

          {/* 署名検証セクション */}
          <Section
            title="署名検証"
            color="text-emerald-600 dark:text-emerald-400"
            badge="🟩"
          >
            {algInfo ? (
              <>
                <label className="block text-xs font-medium mb-2">
                  {keyLabel}
                </label>
                <textarea
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  rows={algInfo.type === "hmac" ? 2 : 6}
                  placeholder={keyPlaceholder}
                  className="w-full font-mono text-xs bg-white dark:bg-black/30 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all border border-black/10 dark:border-white/10"
                  spellCheck={false}
                  autoComplete="off"
                />

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={handleVerify}
                    disabled={!keyInput.trim() || verify.kind === "verifying"}
                    className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition disabled:opacity-50"
                  >
                    {verify.kind === "verifying" ? "検証中..." : "署名を検証"}
                  </button>

                  {verify.kind === "valid" && (
                    <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                      ✓ 署名は有効です
                    </span>
                  )}
                  {verify.kind === "invalid" && (
                    <span className="text-sm text-red-700 dark:text-red-400 font-medium">
                      ✗ 署名が一致しません
                    </span>
                  )}
                  {verify.kind === "error" && (
                    <span className="text-sm text-red-700 dark:text-red-400 font-medium">
                      ⚠ {verify.message}
                    </span>
                  )}
                </div>

                {algInfo.type !== "hmac" && (
                  <div className="text-[11px] text-black/50 dark:text-white/50 mt-2">
                    💡 公開鍵は <code className="font-mono">SubjectPublicKeyInfo (SPKI)</code> 形式の PEM を貼り付けてください（<code className="font-mono">-----BEGIN PUBLIC KEY-----</code> で始まる）。秘密鍵は不要です。
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-black/50 dark:text-white/50">
                {detectedAlg
                  ? `アルゴリズム ${detectedAlg} は本ツールでは未対応です（HS256/384/512、RS256/384/512、ES256/384/512、PS256/384/512 のみ）。`
                  : "JWTの header に alg クレームが見つからないか、Header をデコードできません。"}
              </div>
            )}
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
            <strong>HMAC（HS*）</strong>は対称鍵で署名・検証も同じシークレットを使います。<strong>RSA / ECDSA / RSA-PSS</strong> は公開鍵で検証のみ行います（秘密鍵は不要）。
          </li>
          <li>
            <code className="font-mono">alg: none</code>{" "}
            のJWTは署名なしで受け入れる脆弱性の温床になるため、検証側で必ず拒否すべきです。本ツールも未対応です。
          </li>
          <li>
            ECDSA署名はJWS仕様（RFC 7515）に従い R||S 連結形式で扱います（DER形式ではない）。
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
