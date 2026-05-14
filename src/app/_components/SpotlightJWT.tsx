"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbmctMTIzIiwibmFtZSI6IkVuZ2luZWVyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2MjM5MDIyLCJleHAiOjE3MTYzMjU0MjJ9.signature";

type ParsedJwt =
  | {
      ok: true;
      header: Record<string, unknown>;
      payload: Record<string, unknown>;
      sigPresent: boolean;
    }
  | { ok: false; error: string };

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

function parseJwt(raw: string): ParsedJwt {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, error: "JWT を貼り付けると中身を確認できます。" };
  const parts = trimmed.split(".");
  if (parts.length < 2) {
    return { ok: false, error: "JWT には少なくとも Header と Payload が必要です。" };
  }
  try {
    return {
      ok: true,
      header: JSON.parse(base64UrlDecode(parts[0]) || "{}"),
      payload: JSON.parse(base64UrlDecode(parts[1]) || "{}"),
      sigPresent: Boolean(parts[2]),
    };
  } catch {
    return { ok: false, error: "JSON としてデコードできませんでした。" };
  }
}

export function SpotlightJWT() {
  const [value, setValue] = useState(SAMPLE);
  const result = useMemo(() => parseJwt(value), [value]);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase text-accent">
              Featured tool
            </div>
            <h2 className="mt-4 max-w-xl text-[44px] font-semibold leading-[0.96] text-fg-primary sm:text-[64px]">
              Decode a token before your context switches.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-fg-muted">
              JWT デコーダーは secutils の思想をいちばん分かりやすく示す
              ツールです。貼り付けて、構造を確認して、必要な値だけをコピーする。
              その間、Payload はブラウザの外へ出ません。
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-[11px]">
              {["Header", "Payload", "有効期限", "ローカル処理"].map((label) => (
                <span key={label} className="rounded-full border border-border-subtle bg-bg-elevated/60 px-2.5 py-1 text-fg-muted">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-[30px] p-3 shadow-[0_44px_130px_-84px_rgba(0,0,0,0.82)]">
            <div className="grid gap-3 lg:grid-cols-[1fr_0.92fr]">
              <div className="rounded-3xl border border-border-subtle bg-bg-sunken/45 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase text-fg-subtle">
                    Encoded JWT
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setValue(SAMPLE)}
                      className="rounded-lg border border-border-subtle px-2 py-1 text-[11px] text-fg-muted transition hover:text-fg-primary"
                    >
                      sample
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("")}
                      className="rounded-lg border border-border-subtle px-2 py-1 text-[11px] text-fg-muted transition hover:text-fg-primary"
                    >
                      clear
                    </button>
                  </div>
                </div>
                <textarea
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  spellCheck={false}
                  className="block h-[320px] w-full resize-none rounded-2xl border border-border-subtle bg-bg-base/70 p-4 font-mono text-[12px] leading-6 text-fg-primary outline-none transition focus:border-border-strong"
                />
              </div>

              <div className="rounded-3xl border border-border-subtle bg-bg-elevated/52 p-4">
                {!result.ok ? (
                  <div className="flex h-full min-h-[280px] flex-col justify-center rounded-2xl border border-dashed border-border-subtle p-5 text-[14px] text-fg-muted">
                    <span className="mb-2 text-[11px] font-semibold uppercase text-fg-subtle">
                      入力待ち
                    </span>
                    {result.error}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <DecodedBlock label="Header" obj={result.header} tone="var(--tone-security)" />
                    <DecodedBlock label="Payload" obj={result.payload} tone="var(--tone-encoding)" />
                    <div className="rounded-2xl border border-border-subtle bg-bg-sunken/55 p-4">
                      <div className="text-[11px] font-semibold uppercase text-fg-subtle">
                        Signature
                      </div>
                      <div className="mt-2 text-[13px] font-semibold text-fg-primary">
                        {result.sigPresent ? "あり" : "なし"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link
              href="/tools/jwt-decoder"
              className="magnetic-button mt-3 inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-fg-primary px-5 text-[14px] font-semibold text-bg-base"
            >
              完全版デコーダーを開く
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecodedBlock({
  label,
  obj,
  tone,
}: {
  label: string;
  obj: Record<string, unknown>;
  tone: string;
}) {
  const entries = Object.entries(obj).slice(0, 5);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase" style={{ color: tone }}>
          {label}
        </span>
        <span className="text-[10px] text-fg-subtle">{Object.keys(obj).length} keys</span>
      </div>
      <div className="rounded-2xl border border-border-subtle bg-bg-sunken/55 p-3 font-mono text-[12px] leading-6">
        {entries.map(([key, raw]) => (
          <div key={key} className="flex gap-2 overflow-hidden">
            <span className="shrink-0 text-fg-subtle">&quot;{key}&quot;:</span>
            <span className="truncate text-fg-primary">
              {typeof raw === "string" ? `"${raw}"` : JSON.stringify(raw)}
            </span>
          </div>
        ))}
      </div>
    </div>
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
