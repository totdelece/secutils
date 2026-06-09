"use client";
import { useState } from "react";

const NORTON_URL = "https://px.a8.net/svt/ejp?a8mat=4B5Q89+123RHU+3IBI+61C2Q";
const VB_URL = "https://px.a8.net/svt/ejp?a8mat=4B5Q84+3B2PRM+3A66+5YRHE";

export function StickyCta() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <>
      {/* スマホ: 画面下部固定 */}
      <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden">
        <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-black text-slate-600">セキュリティソフト比較</p>
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
              href={NORTON_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex min-h-12 flex-col items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-white no-underline transition hover:bg-blue-700"
            >
              <span className="text-xs font-black">ノートン 360</span>
              <span className="mt-0.5 text-[10px] opacity-80">60日返金保証</span>
            </a>
            <a
              href={VB_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex min-h-12 flex-col items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-white no-underline transition hover:bg-red-700"
            >
              <span className="text-xs font-black">ウイルスバスター</span>
              <span className="mt-0.5 text-[10px] opacity-80">30日返金保証</span>
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
          <p className="text-sm font-black text-slate-950">ノートン 360</p>
          <div className="mt-1 flex items-center gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-sm text-amber-400">★</span>
            ))}
            <span className="text-sm text-amber-300">★</span>
            <span className="ml-1 text-xs text-slate-500">4.5</span>
          </div>
          <a
            href={NORTON_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-3 flex w-full flex-col items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-white no-underline transition hover:bg-blue-700"
          >
            <span className="text-xs font-black">公式サイトを見る →</span>
            <span className="mt-0.5 text-[10px] opacity-80">60日間返金保証あり</span>
          </a>
          <a
            href={VB_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-2 flex w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-black text-red-700 no-underline transition hover:bg-red-100"
          >
            ウイルスバスターへ →
          </a>
        </div>
      </div>
    </>
  );
}
