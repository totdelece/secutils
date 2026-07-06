"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// =====================================================================
// URL Parser / Inspector
//   URL を scheme / userinfo / host / port / path / query / fragment に
//   分解し、パーセントエンコードや punycode(IDN) を復元して表示する。
//   さらにフィッシング・SSRF 調査に役立つ危険サインを検出する:
//     - user@host の資格情報埋め込み（正規サイトに見せかける手口）
//     - punycode(xn--) の IDN → Unicode 復元（ホモグラフ詐欺の確認）
//     - javascript: / data: など危険スキーム
//     - 非標準ポート
//     - パストラバーサル（../ ・ %2e%2e ・ %2f）
//     - オープンリダイレクト候補（URLを値に含むクエリ）
//   すべてブラウザ内で処理し、入力した URL はサーバーに送信しない。
// =====================================================================

// ---- RFC 3492 Punycode decode（"xn--" を除いたラベル部分を Unicode へ）----
function punycodeDecode(input: string): string | null {
  const base = 36,
    tmin = 1,
    tmax = 26,
    skew = 38,
    damp = 700,
    initialBias = 72,
    initialN = 128;
  const maxInt = 0x7fffffff;
  const output: number[] = [];

  let basic = input.lastIndexOf("-");
  if (basic < 0) basic = 0;
  for (let j = 0; j < basic; j++) {
    const c = input.charCodeAt(j);
    if (c >= 0x80) return null; // 非 ASCII は不正
    output.push(c);
  }

  const digitOf = (cp: number): number => {
    if (cp - 48 < 10) return cp - 22; // 0-9 -> 26-35
    if (cp - 65 < 26) return cp - 65; // A-Z -> 0-25
    if (cp - 97 < 26) return cp - 97; // a-z -> 0-25
    return base;
  };
  const adapt = (delta: number, numPoints: number, firstTime: boolean): number => {
    delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
    delta += Math.floor(delta / numPoints);
    let k = 0;
    for (; delta > ((base - tmin) * tmax) >> 1; k += base) {
      delta = Math.floor(delta / (base - tmin));
    }
    return Math.floor(k + ((base - tmin + 1) * delta) / (delta + skew));
  };

  let n = initialN,
    i = 0,
    bias = initialBias;
  let index = basic > 0 ? basic + 1 : 0;

  while (index < input.length) {
    const oldi = i;
    let w = 1;
    for (let k = base; ; k += base) {
      if (index >= input.length) return null;
      const digit = digitOf(input.charCodeAt(index++));
      if (digit >= base) return null;
      if (digit > Math.floor((maxInt - i) / w)) return null;
      i += digit * w;
      const t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
      if (digit < t) break;
      if (w > Math.floor(maxInt / (base - t))) return null;
      w *= base - t;
    }
    const out = output.length + 1;
    bias = adapt(i - oldi, out, oldi === 0);
    if (Math.floor(i / out) > maxInt - n) return null;
    n += Math.floor(i / out);
    i %= out;
    output.splice(i++, 0, n);
  }
  try {
    return String.fromCodePoint(...output);
  } catch {
    return null;
  }
}

/** ホスト名の各ラベルの xn-- を Unicode に復元。1つでも復元できたら文字列を返す */
function decodeIdnHost(host: string): string | null {
  if (!/(^|\.)xn--/i.test(host)) return null;
  let changed = false;
  const labels = host.split(".").map((label) => {
    if (/^xn--/i.test(label)) {
      const dec = punycodeDecode(label.slice(4));
      if (dec !== null && dec.length > 0) {
        changed = true;
        return dec;
      }
    }
    return label;
  });
  return changed ? labels.join(".") : null;
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    return s;
  }
}

type WarnLevel = "high" | "med" | "low";
type Warning = {
  level: WarnLevel;
  text: string;
  link?: { href: string; label: string };
};
type QueryParam = { key: string; rawValue: string; value: string; dup: boolean };

type Parsed =
  | { kind: "empty" }
  | { kind: "error"; message: string }
  | {
      kind: "ok";
      assumedScheme: boolean;
      scheme: string;
      username: string;
      password: string;
      host: string;
      hostDecoded: string | null;
      port: string;
      path: string;
      pathDecoded: string | null;
      query: QueryParam[];
      fragment: string;
      origin: string;
      warnings: Warning[];
    };

const DANGEROUS_SCHEMES: Record<string, WarnLevel> = {
  "javascript:": "high",
  "vbscript:": "high",
  "data:": "high",
  "file:": "med",
};

function analyze(raw: string): Parsed {
  const input = raw.trim();
  if (!input) return { kind: "empty" };

  let u: URL | null = null;
  let assumedScheme = false;
  try {
    u = new URL(input);
  } catch {
    // scheme が無ければ https:// を仮定して再挑戦
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(input)) {
      try {
        u = new URL("https://" + input);
        assumedScheme = true;
      } catch {
        /* noop */
      }
    }
  }
  if (!u) {
    return {
      kind: "error",
      message:
        "URL として解釈できませんでした。scheme（https:// など）を含めて入力してください。",
    };
  }

  const warnings: Warning[] = [];

  // 危険スキーム
  const schemeLevel = DANGEROUS_SCHEMES[u.protocol];
  if (schemeLevel) {
    warnings.push({
      level: schemeLevel,
      text:
        u.protocol === "javascript:" || u.protocol === "vbscript:"
          ? `${u.protocol} はスクリプトを実行するスキームです。リンクに仕込まれるとXSSやクリック誘導に悪用されます。`
          : u.protocol === "data:"
            ? "data: スキームはページ内容をURLに直接埋め込みます。フィッシングページの配布に悪用されることがあります。"
            : "file: スキームはローカルファイルを指します。取り扱いに注意してください。",
    });
  }

  // 資格情報の埋め込み（user:pass@host）
  if (u.username || u.password) {
    const shown = u.password ? `${u.username}:${"*".repeat(u.password.length)}` : u.username;
    warnings.push({
      level: "high",
      text: `URL に資格情報（${safeDecode(shown)}）が埋め込まれています。「@」の左側は認証情報で、実際の接続先は右側のホストです。正規サイトに見せかけるフィッシングの典型的な手口です。`,
    });
  }

  // punycode(IDN)
  const hostDecoded = decodeIdnHost(u.hostname);
  if (hostDecoded) {
    warnings.push({
      level: "med",
      text: `ホストが punycode（国際化ドメイン名 IDN）です。実際の表示は「${hostDecoded}」。正規ドメインに似せた文字を使うホモグラフ詐欺の可能性があるため、文字を確認してください。`,
    });
  }

  // ホストが IP アドレス
  const isIpv4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(u.hostname);
  const isIpv6 = u.hostname.startsWith("[");
  const isDecimalIp = /^\d+$/.test(u.hostname) || /^0x[0-9a-f]+$/i.test(u.hostname);
  if (isIpv4 || isIpv6 || isDecimalIp) {
    warnings.push({
      level: isDecimalIp ? "med" : "low",
      text: isDecimalIp
        ? "ホストが 10進/16進の数値表記です。難読化されたIPの可能性があります。IP Address Converter で展開して確認できます。"
        : "ホストがドメイン名ではなくIPアドレスです。正規サービスは通常ドメイン名を使うため、直リンクは慎重に確認してください。",
      link: { href: "/tools/ip-converter", label: "IP Address Converter で展開" },
    });
  }

  // 非標準ポート（特別スキームでは既定ポートは URL API が除去するため、残っていれば非既定）
  if (u.port) {
    warnings.push({
      level: "low",
      text: `既定と異なるポート（:${u.port}）が指定されています。用途を確認してください。`,
    });
  }

  // パストラバーサル（生の入力を走査。ブラウザは http(s) のパスの ../ を
  // 正規化して消すため、u.pathname ではなく入力文字列全体をチェックする）
  const rawPath = u.pathname;
  const decodedPath = safeDecode(rawPath);
  const traversal =
    /\.\.[/\\]/.test(input) ||
    /%2e%2e/i.test(input) ||
    /%2f/i.test(input) ||
    /%5c/i.test(input);
  if (traversal) {
    warnings.push({
      level: "med",
      text: "URL に「../」やエンコードされた ../（%2e%2e）・スラッシュ（%2f）が含まれます。ブラウザ側では正規化されますが、サーバーの実装次第でパストラバーサル（ディレクトリ脱出）の調査対象になります。",
      link: { href: "/learn/security/path-traversal", label: "パストラバーサル解説" },
    });
  }

  // クエリ解析
  const query: QueryParam[] = [];
  const search = u.search.startsWith("?") ? u.search.slice(1) : u.search;
  const seen = new Map<string, number>();
  if (search) {
    for (const pair of search.split("&")) {
      if (pair === "") continue;
      const eq = pair.indexOf("=");
      const rawKey = eq === -1 ? pair : pair.slice(0, eq);
      const rawValue = eq === -1 ? "" : pair.slice(eq + 1);
      const key = safeDecode(rawKey);
      const value = safeDecode(rawValue);
      seen.set(key, (seen.get(key) ?? 0) + 1);
      query.push({ key, rawValue, value, dup: false });
    }
    for (const p of query) p.dup = (seen.get(p.key) ?? 0) > 1;
  }

  // 重複キー
  const dupKeys = [...seen.entries()].filter(([, n]) => n > 1).map(([k]) => k);
  if (dupKeys.length > 0) {
    warnings.push({
      level: "low",
      text: `クエリに重複キーがあります（${dupKeys.join(", ")}）。サーバーごとに「最初/最後/配列」と解釈が分かれ、HTTP パラメータ汚染の原因になります。`,
    });
  }

  // オープンリダイレクト候補（URLを値に持つパラメータ）
  const redirectParam = query.find(
    (p) => /^https?:\/\//i.test(p.value.trim()) || /^\/\//.test(p.value.trim()),
  );
  if (redirectParam) {
    warnings.push({
      level: "med",
      text: `クエリ「${redirectParam.key}」の値が別のURL（${redirectParam.value}）です。検証が甘いとオープンリダイレクトに悪用され、フィッシング誘導に使われます。`,
      link: { href: "/learn/security/ssrf", label: "SSRF・リクエスト偽装の解説" },
    });
  }

  return {
    kind: "ok",
    assumedScheme,
    scheme: u.protocol.replace(/:$/, ""),
    username: u.username,
    password: u.password,
    host: u.hostname || "(なし)",
    hostDecoded,
    port: u.port,
    path: u.pathname,
    pathDecoded: decodedPath !== rawPath ? decodedPath : null,
    query,
    fragment: u.hash.replace(/^#/, ""),
    origin: u.origin && u.origin !== "null" ? u.origin : "",
    warnings,
  };
}

const examples: { label: string; value: string }[] = [
  { label: "通常のURL", value: "https://example.com/blog/post?id=42&lang=ja#top" },
  {
    label: "フィッシング(@)",
    value: "https://support%40paypal.com@evil.example.com/login",
  },
  { label: "IDN(punycode)", value: "https://xn--maana-pta.com/verify" },
  {
    label: "オープンリダイレクト",
    value: "https://example.com/out?next=https://evil.example/phish",
  },
  { label: "危険スキーム", value: "javascript:alert(document.cookie)" },
];

const warnStyle: Record<WarnLevel, { badge: string; box: string; label: string }> = {
  high: {
    badge: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
    box: "border-red-500/20 bg-red-500/5",
    label: "危険",
  },
  med: {
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    box: "border-amber-500/20 bg-amber-500/5",
    label: "注意",
  },
  low: {
    badge:
      "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 border-black/10 dark:border-white/15",
    box: "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]",
    label: "情報",
  },
};

function Row({
  label,
  children,
  warn,
}: {
  label: string;
  children: React.ReactNode;
  warn?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-4">
      <div className="w-28 shrink-0 text-xs font-medium text-black/50 dark:text-white/50">
        {label}
      </div>
      <div
        className={`min-w-0 flex-1 break-all font-mono text-sm ${
          warn ? "text-amber-600 dark:text-amber-400" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function UrlParserPage() {
  const [input, setInput] = useState(
    "https://user:pass@xn--maana-pta.com:8443/a/../b?next=https://evil.example&id=1&id=2#section",
  );

  const result = useMemo(() => analyze(input), [input]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔗 URL Parser / Inspector
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        URL を scheme・ホスト・ポート・パス・クエリ・フラグメントに分解し、パーセントエンコードや
        punycode(IDN) を復元して表示します。<code className="font-mono">user@host</code>{" "}
        の資格情報埋め込み、非標準ポート、パストラバーサル、オープンリダイレクトなど、フィッシング・SSRF
        調査に役立つ危険サインも検出します。処理はすべてブラウザ内で行われ、入力した URL
        はサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="url-input" className="text-sm font-medium block mb-2">
          URL
        </label>
        <textarea
          id="url-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例: https://example.com/path?q=1#top"
          rows={2}
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y break-all"
          autoComplete="off"
          spellCheck={false}
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="text-xs text-black/50 dark:text-white/50 mr-1 self-center">例:</span>
          {examples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setInput(ex.value)}
              className="text-xs px-2 py-0.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
              title={ex.value}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {result.kind === "error" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
          ⚠ {result.message}
        </div>
      )}

      {result.kind === "ok" && (
        <>
          {/* 危険サイン */}
          {result.warnings.length > 0 && (
            <div className="mb-4 space-y-2">
              {result.warnings.map((w, i) => {
                const s = warnStyle[w.level];
                return (
                  <div key={i} className={`rounded-lg border p-3 text-sm ${s.box}`}>
                    <div className="flex items-start gap-2">
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.badge}`}
                      >
                        {s.label}
                      </span>
                      <div className="min-w-0 leading-relaxed text-black/75 dark:text-white/75">
                        {w.text}
                        {w.link && (
                          <>
                            {" "}
                            <Link
                              href={w.link.href}
                              className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
                            >
                              → {w.link.label}
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 構成要素 */}
          <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden divide-y divide-black/5 dark:divide-white/10">
            {result.assumedScheme && (
              <div className="bg-amber-500/5 px-4 py-2 text-xs text-amber-600 dark:text-amber-400">
                ※ scheme が無かったため <code className="font-mono">https://</code> を仮定して解析しました。
              </div>
            )}
            <Row label="scheme">{result.scheme}</Row>
            {(result.username || result.password) && (
              <Row label="userinfo" warn>
                {result.username}
                {result.password && ":" + "*".repeat(result.password.length)}
                <span className="ml-2 text-[11px] text-amber-600 dark:text-amber-400">
                  ⚠ 資格情報の埋め込み
                </span>
              </Row>
            )}
            <Row label="host" warn={Boolean(result.hostDecoded)}>
              {result.host}
              {result.hostDecoded && (
                <div className="mt-0.5 text-xs text-black/50 dark:text-white/50">
                  復元: <span className="text-amber-600 dark:text-amber-400">{result.hostDecoded}</span>（IDN）
                </div>
              )}
            </Row>
            <Row label="port" warn={Boolean(result.port)}>
              {result.port || <span className="text-black/40 dark:text-white/40">既定</span>}
            </Row>
            <Row label="path">
              {result.path || <span className="text-black/40 dark:text-white/40">/</span>}
              {result.pathDecoded && (
                <div className="mt-0.5 text-xs text-black/50 dark:text-white/50">
                  デコード: <span className="text-foreground">{result.pathDecoded}</span>
                </div>
              )}
            </Row>
            <Row label="query">
              {result.query.length === 0 ? (
                <span className="text-black/40 dark:text-white/40">なし</span>
              ) : (
                `${result.query.length} 個のパラメータ`
              )}
            </Row>
            {result.fragment && <Row label="fragment">{result.fragment}</Row>}
            {result.origin && (
              <Row label="origin">
                <span className="text-black/60 dark:text-white/60">{result.origin}</span>
              </Row>
            )}
          </div>

          {/* クエリパラメータ */}
          {result.query.length > 0 && (
            <div className="mt-4 rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
              <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60">
                クエリパラメータ（デコード済み）
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/10">
                {result.query.map((p, i) => (
                  <div key={i} className="flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:gap-4">
                    <div className="w-40 shrink-0 break-all font-mono text-sm text-emerald-700 dark:text-emerald-400">
                      {p.key || <span className="text-black/40">(空)</span>}
                      {p.dup && (
                        <span className="ml-1.5 text-[10px] text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded px-1">
                          重複
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 break-all font-mono text-sm">
                      {p.value || <span className="text-black/40 dark:text-white/40">(空)</span>}
                      {p.rawValue !== p.value && (
                        <span className="ml-2 text-[11px] text-black/40 dark:text-white/40">
                          raw: {p.rawValue}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">💡 URL の読み方と危険サイン</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>接続先は「@」の右側</strong>:{" "}
            <code className="font-mono">https://正規サイト.com@evil.example/</code> のように、@ の左に正規ドメインを置いて信用させ、実際は右側の
            <code className="font-mono">evil.example</code> へ接続させる手口があります。
          </li>
          <li>
            <strong>punycode（xn--）に注意</strong>: 見た目が正規ドメインそっくりの別ドメイン（ホモグラフ詐欺）を検出できます。本ツールは実際の Unicode 表記に復元して表示します。
          </li>
          <li>
            <strong>URLを値に持つクエリ</strong>:{" "}
            <code className="font-mono">?next=https://…</code> のようなパラメータは、検証が甘いとオープンリダイレクトに悪用されます。
          </li>
          <li>
            <strong>すべてブラウザ内で処理</strong>: 入力した URL は外部に送信されません。調査対象の不審な URL も安全に分解できます。
          </li>
        </ul>
      </div>
    </div>
  );
}
