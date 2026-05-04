"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Mode = "set-cookie" | "cookie";

type ParsedCookie = {
  name: string;
  value: string;
  attributes: Record<string, string | true>;
  warnings: string[];
};

function parseSetCookie(input: string): ParsedCookie[] {
  // 複数の Set-Cookie ヘッダーを行で分割（実際には改行 / カンマ後ろのスペースなど複雑だが簡易対応）
  const lines = input
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return lines.map((line) => {
    // "Set-Cookie: " プレフィックスを除去
    const cleaned = line.replace(/^Set-Cookie:\s*/i, "");
    const parts = cleaned.split(";").map((p) => p.trim());
    if (parts.length === 0 || !parts[0].includes("=")) {
      return {
        name: "(parse error)",
        value: cleaned,
        attributes: {},
        warnings: ["name=value 形式として解釈できません"],
      };
    }
    const [namePart, ...attrParts] = parts;
    const eqIdx = namePart.indexOf("=");
    const name = namePart.slice(0, eqIdx);
    const value = namePart.slice(eqIdx + 1);

    const attributes: Record<string, string | true> = {};
    for (const attr of attrParts) {
      const i = attr.indexOf("=");
      if (i === -1) {
        attributes[attr] = true;
      } else {
        attributes[attr.slice(0, i)] = attr.slice(i + 1);
      }
    }

    const warnings: string[] = [];
    const lowerKeys = Object.keys(attributes).map((k) => k.toLowerCase());

    if (!lowerKeys.includes("secure")) {
      warnings.push(
        "Secure 属性なし: HTTP（平文）でも送信されます。HTTPS強制サイトでは必須にすべき",
      );
    }
    if (!lowerKeys.includes("httponly")) {
      warnings.push(
        "HttpOnly 属性なし: JavaScript（document.cookie）からアクセス可能。XSS で盗まれるリスクあり",
      );
    }
    if (!lowerKeys.includes("samesite")) {
      warnings.push(
        "SameSite 属性なし: 最近のブラウザでは Lax に自動設定されますが、明示することを推奨",
      );
    } else {
      const ss = String(
        attributes[
          Object.keys(attributes).find((k) => k.toLowerCase() === "samesite")!
        ],
      ).toLowerCase();
      if (ss === "none") {
        if (!lowerKeys.includes("secure")) {
          warnings.push(
            "SameSite=None には Secure が必須（モダンブラウザは無視します）",
          );
        }
      }
    }

    if (lowerKeys.includes("expires") && lowerKeys.includes("max-age")) {
      warnings.push(
        "Expires と Max-Age が両方指定されています。Max-Age が優先されます",
      );
    }

    return { name, value, attributes, warnings };
  });
}

function parseCookieHeader(input: string): { name: string; value: string }[] {
  const cleaned = input.replace(/^Cookie:\s*/i, "").trim();
  if (!cleaned) return [];
  return cleaned
    .split(";")
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((part) => {
      const i = part.indexOf("=");
      if (i === -1) return { name: part, value: "" };
      return { name: part.slice(0, i), value: part.slice(i + 1) };
    });
}

const ATTRIBUTE_DESCRIPTIONS: Record<string, string> = {
  domain: "Cookieが送信されるドメイン。指定しない場合は発行元ドメインのみ",
  path: "Cookieが送信されるパス。指定しない場合は現在のパス",
  expires: "有効期限の絶対日時（IMF-fixdate形式）",
  "max-age": "有効期限を秒数で指定（Expires より優先）",
  secure: "HTTPS でのみ送信",
  httponly: "JavaScript からアクセス不可（XSS対策）",
  samesite: "クロスサイト送信制御（Strict/Lax/None）",
  partitioned: "CHIPS（Cookies Having Independent Partitioned State）対応",
  priority: "Chrome 独自: Low/Medium/High",
};

const SAMPLE_SET_COOKIE = `Set-Cookie: session_id=abc123; Domain=.example.com; Path=/; Max-Age=3600; Secure; HttpOnly; SameSite=Lax
Set-Cookie: theme=dark; Path=/
Set-Cookie: csrf_token=xyz789; Path=/; Secure; HttpOnly; SameSite=Strict`;

const SAMPLE_COOKIE = `Cookie: session_id=abc123; theme=dark; csrf_token=xyz789`;

export default function CookieParserPage() {
  const [mode, setMode] = useState<Mode>("set-cookie");
  const [input, setInput] = useState(SAMPLE_SET_COOKIE);

  const result = useMemo(() => {
    try {
      if (mode === "set-cookie") {
        return { ok: true as const, kind: "set-cookie" as const, data: parseSetCookie(input) };
      } else {
        return {
          ok: true as const,
          kind: "cookie" as const,
          data: parseCookieHeader(input),
        };
      }
    } catch (e) {
      return {
        ok: false as const,
        error: e instanceof Error ? e.message : "解析エラー",
      };
    }
  }, [mode, input]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🍪 HTTP Cookie Parser
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        Set-Cookie / Cookie ヘッダーを解析し、各属性を可視化します。Secure / HttpOnly / SameSite 等のセキュリティ属性が抜けていると警告も出します。
        すべてブラウザ内で処理され、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-1 mb-4 inline-flex bg-black/5 dark:bg-white/5">
        {(
          [
            { v: "set-cookie", label: "Set-Cookie ヘッダー" },
            { v: "cookie", label: "Cookie ヘッダー" },
          ] as const
        ).map((m) => (
          <button
            key={m.v}
            onClick={() => {
              setMode(m.v);
              setInput(m.v === "set-cookie" ? SAMPLE_SET_COOKIE : SAMPLE_COOKIE);
            }}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              mode === m.v
                ? "bg-emerald-600 text-white"
                : "text-black/70 dark:text-white/70 hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="cookie-input" className="text-sm font-medium block mb-2">
          {mode === "set-cookie" ? "Set-Cookie ヘッダー（複数行可）" : "Cookie ヘッダー"}
        </label>
        <textarea
          id="cookie-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={mode === "set-cookie" ? 6 : 3}
          placeholder={
            mode === "set-cookie"
              ? "Set-Cookie: session=abc; Path=/; Secure; HttpOnly"
              : "Cookie: session=abc; theme=dark"
          }
          className="w-full font-mono text-xs sm:text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all"
          spellCheck={false}
        />
      </div>

      {result.ok && result.kind === "set-cookie" && (
        <div className="space-y-4">
          {result.data.length === 0 && (
            <div className="text-sm text-black/40 dark:text-white/40">
              入力を解析するとここに表示されます
            </div>
          )}
          {result.data.map((cookie, i) => (
            <article
              key={i}
              className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden"
            >
              <div className="bg-black/5 dark:bg-white/5 px-4 py-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-xs text-black/50 dark:text-white/50">
                  Cookie #{i + 1}
                </span>
                <span className="font-mono font-semibold text-sm">
                  {cookie.name}
                </span>
                <span className="text-black/30 dark:text-white/30 text-sm">
                  =
                </span>
                <span className="font-mono text-xs text-black/60 dark:text-white/60 truncate">
                  {cookie.value || "(空)"}
                </span>
              </div>

              {Object.keys(cookie.attributes).length > 0 && (
                <div className="px-4 py-3 divide-y divide-black/5 dark:divide-white/10">
                  {Object.entries(cookie.attributes).map(([k, v]) => {
                    const lower = k.toLowerCase();
                    const desc = ATTRIBUTE_DESCRIPTIONS[lower];
                    return (
                      <div
                        key={k}
                        className="py-2 grid grid-cols-[120px_1fr] gap-3 items-baseline text-xs"
                      >
                        <div className="font-mono font-medium">{k}</div>
                        <div>
                          <span className="font-mono">
                            {v === true ? "✓ (有効)" : v}
                          </span>
                          {desc && (
                            <div className="text-black/40 dark:text-white/40 mt-0.5">
                              {desc}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {cookie.warnings.length > 0 && (
                <div className="px-4 py-3 bg-amber-500/10 border-t border-amber-500/20">
                  <div className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">
                    ⚠ セキュリティ上の注意
                  </div>
                  <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
                    {cookie.warnings.map((w, j) => (
                      <li key={j}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {result.ok && result.kind === "cookie" && (
        <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
          <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60">
            Cookie ヘッダーの内訳（{result.data.length} 件）
          </div>
          <div className="divide-y divide-black/5 dark:divide-white/10">
            {result.data.map((c, i) => (
              <div key={i} className="px-4 py-2 flex items-baseline gap-3 text-sm">
                <span className="text-xs text-black/40 dark:text-white/40 w-8">
                  #{i + 1}
                </span>
                <span className="font-mono font-semibold">{c.name}</span>
                <span className="text-black/30 dark:text-white/30">=</span>
                <span className="font-mono text-xs text-black/60 dark:text-white/60 break-all flex-1">
                  {c.value || "(空)"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 Cookie 属性のセキュリティ
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Secure</strong>: HTTPS でのみ送信。最近の Web では事実上必須
          </li>
          <li>
            <strong>HttpOnly</strong>: JavaScript からアクセス不可。XSS が起きてもセッション盗難を防ぐ
          </li>
          <li>
            <strong>SameSite</strong>:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>
                <code className="font-mono">Strict</code>: 完全に同一サイトのみ。CSRF最強防御
              </li>
              <li>
                <code className="font-mono">Lax</code>: トップレベルナビゲーション（リンククリック）は許容。多くのサービスのデフォルト
              </li>
              <li>
                <code className="font-mono">None</code>: クロスサイトでも送信。<strong>Secure必須</strong>
              </li>
            </ul>
          </li>
          <li>
            <strong>Domain</strong>: 指定するとサブドメイン全体に送信される。狭く絞るのが原則
          </li>
          <li>
            <strong>Max-Age</strong> vs <strong>Expires</strong>: 両方指定すると Max-Age が優先。Max-Age 推奨（時刻ずれに強い）
          </li>
        </ul>
      </div>
    </div>
  );
}
