"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  HTTP_STATUS_CODES,
  type StatusCode,
} from "@/lib/http-status-codes";

type Filter = "all" | StatusCode["category"];

export default function HttpStatusPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HTTP_STATUS_CODES.filter((s) => {
      if (filter !== "all" && s.category !== filter) return false;
      if (q) {
        const haystack =
          `${s.code} ${s.name} ${s.description} ${s.usage ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, filter]);

  const grouped = useMemo(() => {
    const g: Record<StatusCode["category"], StatusCode[]> = {
      "1xx": [],
      "2xx": [],
      "3xx": [],
      "4xx": [],
      "5xx": [],
    };
    for (const s of filtered) g[s.category].push(s);
    return g;
  }, [filtered]);

  const isFiltered = filter !== "all" || query !== "";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        📟 HTTP Status Code Reference
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        全 HTTP ステータスコード（100-599）の意味・用途を日本語で網羅。「404 ってなんだっけ」が即解決します。
      </p>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="コード・名称・説明で検索..."
            aria-label="ステータスコード検索"
            className="w-full bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2.5 pl-9 outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
            autoComplete="off"
          />
          <span
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 text-sm pointer-events-none"
          >
            🔍
          </span>
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="検索クリア"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-foreground text-sm w-6 h-6 rounded flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1 rounded-lg border border-black/10 dark:border-white/10 p-1 bg-black/5 dark:bg-white/5">
          {(["all", "1xx", "2xx", "3xx", "4xx", "5xx"] as Filter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                filter === c
                  ? "bg-emerald-600 text-white"
                  : "text-black/70 dark:text-white/70 hover:text-foreground"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-black/40 dark:text-white/40 text-sm">
          該当するステータスコードがありません
        </div>
      ) : (
        (["1xx", "2xx", "3xx", "4xx", "5xx"] as const).map((cat) => {
          const list = grouped[cat];
          if (!list.length) return null;
          return (
            <section key={cat} className="mb-8">
              <h2
                className={`text-sm font-mono uppercase tracking-widest mb-3 ${CATEGORY_COLORS[cat]}`}
              >
                {CATEGORY_LABELS[cat]}{" "}
                <span className="text-black/30 dark:text-white/30 normal-case font-sans tracking-normal">
                  ({list.length})
                </span>
              </h2>
              <div className="space-y-2">
                {list.map((s) => (
                  <article
                    key={s.code}
                    className="rounded-lg border border-black/10 dark:border-white/10 p-4 hover:border-emerald-500/30 transition"
                  >
                    <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                      <span
                        className={`font-mono font-bold text-2xl ${CATEGORY_COLORS[cat]}`}
                      >
                        {s.code}
                      </span>
                      <span className="font-semibold text-base">{s.name}</span>
                    </div>
                    <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                      {s.description}
                    </p>
                    {s.usage && (
                      <p className="text-xs text-black/50 dark:text-white/50 mt-2">
                        <span className="font-medium">典型例:</span> {s.usage}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })
      )}

      {isFiltered && filtered.length > 0 && (
        <div className="text-xs text-black/40 dark:text-white/40 text-center mt-2">
          {filtered.length} / {HTTP_STATUS_CODES.length} 件を表示中
        </div>
      )}

      <div className="mt-12 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 HTTP ステータスコードについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>1xx</strong>: 情報 / <strong>2xx</strong>: 成功 / <strong>3xx</strong>: リダイレクト / <strong>4xx</strong>: クライアントエラー / <strong>5xx</strong>: サーバーエラー
          </li>
          <li>
            <strong>API設計時のおすすめ</strong>: 200/201/204、400/401/403/404/409/422/429、500/503 を中心に使う
          </li>
          <li>
            <strong>4xx と 5xx の責任分界</strong>: 4xx = クライアント側のミス（直してもらえば直る）、5xx = サーバー側のミス（こちらで修正必要）
          </li>
          <li>
            <strong>418 I&apos;m a teapot</strong> はジョーク（RFC 2324）。一部の API がレート制限の代替で実用しているケースもあります
          </li>
        </ul>
      </div>
    </div>
  );
}
