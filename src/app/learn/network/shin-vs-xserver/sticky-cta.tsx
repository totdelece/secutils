"use client";
import { useState } from "react";

const XSERVER_URL = "https://px.a8.net/svt/ejp?a8mat=4B3LMV+C506SY+CO4+61JSI";
const SHIN_URL = "https://px.a8.net/svt/ejp?a8mat=4B5ZKL+DG1FLE+5GDG+5YZ76";

export function StickyCta() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <>
      {/* スマホ: 画面下部固定 */}
      <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden">
        <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-black text-slate-600">レンタルサーバー比較</p>
            <button
              onClick={() => setClosed(true)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500 hover:bg-slate-200"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={XSERVER_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex min-h-12 flex-col items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-white no-underline transition hover:bg-blue-700"
            >
              <span className="text-xs font-black">エックスサーバー</span>
              <span className="mt-0.5 text-[10px] opacity-80">10日間無料お試し</span>
            </a>
            <a
              href={SHIN_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex min-h-12 flex-col items-center justify-center rounded-xl bg-emerald-600 px-3 py-2 text-white no-underline transition hover:bg-emerald-700"
            >
              <span className="text-xs font-black">シン・レンタルサーバー</span>
              <span className="mt-0.5 text-[10px] opacity-80">10日間無料お試し</span>
            </a>
          </div>
        </div>
      </div>

      {/* PC: 右サイド固定 */}
      <div className="fixed bottom-28 right-5 z-50 hidden w-52 sm:block">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-black text-amber-600">🏆 総合評価 No.1</p>
            <button
              onClick={() => setClosed(true)}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] text-slate-500 hover:bg-slate-200"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
          <p className="text-sm font-black text-slate-950">エックスサーバー</p>
          <div className="mt-1 flex items-center gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-sm text-amber-400">★</span>
            ))}
            <span className="text-sm text-amber-300">★</span>
            <span className="ml-1 text-xs text-slate-500">4.7</span>
          </div>
          <a
            href={XSERVER_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-3 flex w-full flex-col items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-white no-underline transition hover:bg-blue-700"
          >
            <span className="text-xs font-black">公式サイトを見る →</span>
            <span className="mt-0.5 text-[10px] opacity-80">10日間無料お試しつき</span>
          </a>
          <a
            href={SHIN_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-2 flex w-full items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700 no-underline transition hover:bg-emerald-100"
          >
            シン・レンタルサーバーへ →
          </a>
        </div>
      </div>
    </>
  );
}
