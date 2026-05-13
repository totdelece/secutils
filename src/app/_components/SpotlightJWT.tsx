"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbmctMTIzIiwibmFtZSI6IkVuZ2luZWVyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2MjM5MDIyLCJleHAiOjE3MTYzMjU0MjJ9.signature";

function base64UrlDecode(input: string): string {
  const pad = "=".repeat((4 - (input.length % 4)) % 4);
  const b64 = (input + pad).replace(/-/g, "+").replace(/_/g, "/");
  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return "";
  }
}

type ParsedJwt =
  | {
      ok: true;
      header: Record<string, unknown>;
      payload: Record<string, unknown>;
      sigPresent: boolean;
    }
  | { ok: false; error: string };

function parseJwt(raw: string): ParsedJwt {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, error: "JWT を貼り付けてください" };
  const parts = trimmed.split(".");
  if (parts.length < 2)
    return { ok: false, error: "ピリオド区切りが3つ必要です" };
  try {
    const headerJson = JSON.parse(base64UrlDecode(parts[0]) || "{}");
    const payloadJson = JSON.parse(base64UrlDecode(parts[1]) || "{}");
    return {
      ok: true,
      header: headerJson,
      payload: payloadJson,
      sigPresent: Boolean(parts[2]),
    };
  } catch {
    return { ok: false, error: "デコードに失敗しました。形式を確認してください" };
  }
}

export function SpotlightJWT() {
  const [value, setValue] = useState<string>(SAMPLE);
  const result = useMemo(() => parseJwt(value), [value]);

  const useSample = () => setValue(SAMPLE);
  const clear = () => setValue("");

  const exp =
    result.ok && typeof result.payload.exp === "number"
      ? new Date((result.payload.exp as number) * 1000)
      : null;
  const iat =
    result.ok && typeof result.payload.iat === "number"
      ? new Date((result.payload.iat as number) * 1000)
      : null;
  const expired = exp ? exp.getTime() < Date.now() : null;

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Try it now
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl">
              JWT を貼って、すぐ確認。
            </h2>
            <p className="mt-2 max-w-2xl text-[14px] leading-7 text-fg-muted">
              本物のJWTをここに貼り付けると、Header と Payload を瞬時に展開します。サーバーには一切送信されません。
            </p>
          </div>
          <Link
            href="/tools/jwt-decoder"
            className="hidden h-10 items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-elevated px-4 text-sm font-medium text-fg-primary transition hover:border-border-strong lg:inline-flex"
          >
            完全版ツールへ
            <Arrow />
          </Link>
        </div>

        <div className="shine-border relative overflow-hidden rounded-2xl bg-bg-elevated ring-1 ring-border-subtle">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
            <div className="border-b border-border-subtle p-5 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="mb-3 flex items-center justify-between text-[11px] font-medium">
                <span className="inline-flex items-center gap-2 text-fg-subtle">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Encoded JWT
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={useSample}
                    className="rounded-md px-2 py-1 text-[11px] font-medium text-fg-muted ring-1 ring-border-subtle transition hover:text-fg-primary hover:ring-border-strong"
                  >
                    sample
                  </button>
                  <button
                    onClick={clear}
                    className="rounded-md px-2 py-1 text-[11px] font-medium text-fg-muted ring-1 ring-border-subtle transition hover:text-fg-primary hover:ring-border-strong"
                  >
                    clear
                  </button>
                </div>
              </div>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                spellCheck={false}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.signature"
                className="block h-44 w-full resize-none rounded-lg bg-bg-sunken p-3 font-mono text-[12.5px] leading-6 text-fg-primary outline-none ring-1 ring-border-subtle transition focus:ring-border-strong"
              />
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-fg-subtle">
                  {value.length} 文字 · {value.split(".").length - 1} ピリオド
                </span>
                <span className="inline-flex items-center gap-1.5 text-fg-muted">
                  <Lock />
                  Browser-only
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {!result.ok ? (
                <div className="flex h-full min-h-[260px] flex-col items-start justify-center gap-2 rounded-lg border border-dashed border-border-subtle bg-bg-sunken/40 p-5 text-sm text-fg-muted">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                    Awaiting input
                  </span>
                  <span>{result.error}</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <DecodedBlock
                    label="Header"
                    tone="var(--tone-security)"
                    obj={result.header}
                  />
                  <DecodedBlock
                    label="Payload"
                    tone="var(--tone-encoding)"
                    obj={result.payload}
                  />
                  <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4 text-[12px]">
                    {iat && (
                      <Meta label="iat" value={iat.toISOString().slice(0, 19) + "Z"} />
                    )}
                    {exp && (
                      <Meta
                        label="exp"
                        value={exp.toISOString().slice(0, 19) + "Z"}
                        warn={expired === true}
                      />
                    )}
                    {expired === true && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-500 ring-1 ring-amber-500/30">
                        expired
                      </span>
                    )}
                    {expired === false && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
                        <Check />
                        valid window
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end lg:hidden">
          <Link
            href="/tools/jwt-decoder"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-primary"
          >
            完全版ツールへ
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DecodedBlock({
  label,
  tone,
  obj,
}: {
  label: string;
  tone: string;
  obj: Record<string, unknown>;
}) {
  const entries = Object.entries(obj);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: tone }}
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: tone }}
          >
            {label}
          </span>
        </span>
        <span className="text-[10px] text-fg-subtle tabular-nums">
          {entries.length} keys
        </span>
      </div>
      <div className="rounded-lg bg-bg-sunken px-3.5 py-3 font-mono text-[12.5px] leading-6 ring-1 ring-border-subtle">
        {entries.length === 0 ? (
          <div className="text-fg-subtle">(empty)</div>
        ) : (
          entries.map(([k, v]) => (
            <div key={k} className="flex gap-2 text-fg-muted">
              <span className="text-fg-subtle">&quot;{k}&quot;</span>
              <span className="text-fg-subtle">:</span>
              <span className="text-fg-primary">
                {typeof v === "string" ? `"${v}"` : JSON.stringify(v)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Meta({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
        warn
          ? "bg-amber-500/10 text-amber-500 ring-amber-500/30"
          : "bg-bg-sunken text-fg-muted ring-border-subtle",
      ].join(" ")}
    >
      <span className="text-fg-subtle">{label}</span>
      <span className="tabular-nums">{value}</span>
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
