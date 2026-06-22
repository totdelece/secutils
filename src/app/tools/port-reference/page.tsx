"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PORTS,
  PORT_CATEGORY_COLORS,
  PORT_CATEGORY_LABELS,
  PORT_CATEGORY_ORDER,
  PORT_CATEGORY_SHORT,
  type PortCategory,
  type PortEntry,
} from "@/lib/port-numbers";

type Filter = "all" | PortCategory;

const PROTOCOL_BADGE: Record<PortEntry["protocol"], string> = {
  TCP: "bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-500/30",
  UDP: "bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/30",
  "TCP/UDP": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
};

export default function PortReferencePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [cautionOnly, setCautionOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PORTS.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (cautionOnly && !p.caution) return false;
      if (q) {
        const haystack =
          `${p.port} ${p.service} ${p.description} ${p.note ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, filter, cautionOnly]);

  const grouped = useMemo(() => {
    const g = {} as Record<PortCategory, PortEntry[]>;
    for (const c of PORT_CATEGORY_ORDER) g[c] = [];
    for (const p of filtered) g[p.category].push(p);
    for (const c of PORT_CATEGORY_ORDER) g[c].sort((a, b) => a.port - b.port);
    return g;
  }, [filtered]);

  const isFiltered = filter !== "all" || query !== "" || cautionOnly;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔌 Port Number Reference
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        よく使われる TCP / UDP のポート番号を、サービス名・用途・リスクから検索できます。「このポート何だっけ？」「不審に開いているけど大丈夫？」が即解決します。
      </p>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ポート番号・サービス名・用途で検索..."
            aria-label="ポート検索"
            className="w-full bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2.5 pl-9 outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
            autoComplete="off"
            inputMode="text"
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

        <label className="flex items-center gap-2 text-xs text-black/70 dark:text-white/70 select-none shrink-0 cursor-pointer">
          <input
            type="checkbox"
            checked={cautionOnly}
            onChange={(e) => setCautionOnly(e.target.checked)}
            className="accent-amber-600 w-4 h-4"
          />
          ⚠ 要注意ポートのみ
        </label>
      </div>

      <div className="mb-6 flex flex-wrap gap-1 rounded-lg border border-black/10 dark:border-white/10 p-1 bg-black/5 dark:bg-white/5">
        {(["all", ...PORT_CATEGORY_ORDER] as Filter[]).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition ${
              filter === c
                ? "bg-emerald-600 text-white"
                : "text-black/70 dark:text-white/70 hover:text-foreground"
            }`}
          >
            {c === "all" ? "すべて" : PORT_CATEGORY_SHORT[c]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-black/40 dark:text-white/40 text-sm">
          該当するポートがありません
        </div>
      ) : (
        PORT_CATEGORY_ORDER.map((cat) => {
          const list = grouped[cat];
          if (!list.length) return null;
          return (
            <section key={cat} className="mb-8">
              <h2
                className={`text-sm font-semibold uppercase tracking-widest mb-3 ${PORT_CATEGORY_COLORS[cat]}`}
              >
                {PORT_CATEGORY_LABELS[cat]}{" "}
                <span className="text-black/30 dark:text-white/30 normal-case tracking-normal font-normal">
                  ({list.length})
                </span>
              </h2>
              <div className="space-y-2">
                {list.map((p) => (
                  <article
                    key={`${p.port}-${p.service}`}
                    className="rounded-lg border border-black/10 dark:border-white/10 p-4 hover:border-emerald-500/30 transition"
                  >
                    <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                      <span
                        className={`font-mono font-bold text-2xl ${PORT_CATEGORY_COLORS[cat]}`}
                      >
                        {p.port}
                      </span>
                      <span className="font-semibold text-base">{p.service}</span>
                      <span
                        className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${PROTOCOL_BADGE[p.protocol]}`}
                      >
                        {p.protocol}
                      </span>
                      {p.caution && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300">
                          ⚠ 要注意
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                      {p.description}
                    </p>
                    {p.note && (
                      <p
                        className={`text-xs mt-2 leading-relaxed ${
                          p.caution
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-black/50 dark:text-white/50"
                        }`}
                      >
                        <span className="font-medium">
                          {p.caution ? "注意: " : "補足: "}
                        </span>
                        {p.note}
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
          {filtered.length} / {PORTS.length} 件を表示中
        </div>
      )}

      <div className="mt-12 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 ポート番号の基礎
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>ウェルノウンポート (0–1023)</strong>: HTTP / SSH / DNS など主要サービスが使う予約済み範囲。
          </li>
          <li>
            <strong>登録済みポート (1024–49151)</strong>: アプリやミドルウェアが使う範囲（MySQL 3306、Redis 6379 等）。
          </li>
          <li>
            <strong>動的・エフェメラルポート (49152–65535)</strong>: クライアント側が一時的に使う送信元ポート。
          </li>
          <li>
            <strong>TCP と UDP</strong>: TCP は接続確立して順序・再送を保証、UDP は軽量で DNS・VPN・ストリーミング向き。同じ番号でも別物として扱われます。
          </li>
          <li>
            <strong>守りの基本</strong>: 使わないポートは閉じる。RDP(3389)・SMB(445)・各種 DB ポートはインターネットに公開せず、VPN や内部ネットワークに限定します。
          </li>
        </ul>
        <p className="mt-3 text-[11px] text-black/40 dark:text-white/40">
          ※ ポート番号は慣習・既定値であり、実際の運用では変更されている場合があります。正式な割り当ては IANA のレジストリを参照してください。
        </p>
      </div>
    </div>
  );
}
