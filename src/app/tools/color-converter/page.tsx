"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };
type HSV = { h: number; s: number; v: number };

// === 変換関数 ===

function hexToRgb(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rN:
        h = ((gN - bN) / d + (gN < bN ? 6 : 0)) * 60;
        break;
      case gN:
        h = ((bN - rN) / d + 2) * 60;
        break;
      default:
        h = ((rN - gN) / d + 4) * 60;
    }
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;
  let rN = 0;
  let gN = 0;
  let bN = 0;
  if (h < 60) [rN, gN, bN] = [c, x, 0];
  else if (h < 120) [rN, gN, bN] = [x, c, 0];
  else if (h < 180) [rN, gN, bN] = [0, c, x];
  else if (h < 240) [rN, gN, bN] = [0, x, c];
  else if (h < 300) [rN, gN, bN] = [x, 0, c];
  else [rN, gN, bN] = [c, 0, x];
  return {
    r: Math.round((rN + m) * 255),
    g: Math.round((gN + m) * 255),
    b: Math.round((bN + m) * 255),
  };
}

function rgbToHsv({ r, g, b }: RGB): HSV {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (max !== min) {
    switch (max) {
      case rN:
        h = ((gN - bN) / d + (gN < bN ? 6 : 0)) * 60;
        break;
      case gN:
        h = ((bN - rN) / d + 2) * 60;
        break;
      default:
        h = ((rN - gN) / d + 4) * 60;
    }
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

// WCAG コントラスト比
function relativeLuminance({ r, g, b }: RGB): number {
  const ch = (c: number) => {
    const sR = c / 255;
    return sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

function contrastRatio(c1: RGB, c2: RGB): number {
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (light + 0.05) / (dark + 0.05);
}

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#10B981"); // emerald-500
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb) : null;
  const hsv = rgb ? rgbToHsv(rgb) : null;

  // 入力検証
  useEffect(() => {
    setError(rgb ? null : "HEX形式が不正（例: #10B981 または #FFF）");
  }, [hex, rgb]);

  // コントラスト比（白・黒との対比）
  const contrastWhite = rgb ? contrastRatio(rgb, { r: 255, g: 255, b: 255 }) : 0;
  const contrastBlack = rgb ? contrastRatio(rgb, { r: 0, g: 0, b: 0 }) : 0;

  const wcagJudge = (ratio: number) => {
    if (ratio >= 7) return { label: "AAA", color: "text-emerald-600" };
    if (ratio >= 4.5) return { label: "AA", color: "text-emerald-600" };
    if (ratio >= 3) return { label: "AA Large", color: "text-amber-600" };
    return { label: "FAIL", color: "text-red-600" };
  };

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1200);
  };

  const rows: { label: string; value: string }[] = rgb && hsl && hsv
    ? [
        { label: "HEX", value: rgbToHex(rgb) },
        { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { label: "RGB %", value: `rgb(${((rgb.r / 255) * 100).toFixed(1)}%, ${((rgb.g / 255) * 100).toFixed(1)}%, ${((rgb.b / 255) * 100).toFixed(1)}%)` },
        { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        { label: "HSV", value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
      ]
    : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🎨 Color Converter
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        HEX / RGB / HSL / HSV を相互変換し、WCAG コントラスト比を即座に判定します。
        計算はすべてブラウザ内で行われ、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="color-hex" className="text-sm font-medium block mb-3">
          色を選択
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="color"
            value={rgb ? rgbToHex(rgb) : "#000000"}
            onChange={(e) => setHex(e.target.value.toUpperCase())}
            className="w-16 h-16 rounded-lg cursor-pointer border border-black/10 dark:border-white/10"
            aria-label="カラーピッカー"
          />
          <div className="flex-1 min-w-[200px]">
            <input
              id="color-hex"
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#10B981"
              className="w-full font-mono text-base bg-black/5 dark:bg-white/5 rounded p-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50"
              spellCheck={false}
              autoComplete="off"
            />
            {error && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                ⚠ {error}
              </p>
            )}
          </div>
        </div>
      </div>

      {rgb && (
        <>
          <div
            className="rounded-lg border border-black/10 dark:border-white/10 p-8 mb-4 flex items-center justify-center"
            style={{ backgroundColor: rgbToHex(rgb) }}
          >
            <div className="grid grid-cols-2 gap-3 text-center">
              <div
                className="rounded px-3 py-2 bg-white text-black"
                style={{
                  textShadow:
                    "0 0 1px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.2)",
                }}
              >
                <div className="text-[10px] uppercase tracking-widest opacity-60">
                  vs White
                </div>
                <div className="text-lg font-bold">
                  {contrastWhite.toFixed(2)}
                </div>
                <div
                  className={`text-xs font-mono ${wcagJudge(contrastWhite).color}`}
                >
                  {wcagJudge(contrastWhite).label}
                </div>
              </div>
              <div
                className="rounded px-3 py-2 bg-black text-white"
                style={{
                  textShadow:
                    "0 0 1px rgba(255,255,255,0.2), 0 0 1px rgba(255,255,255,0.2)",
                }}
              >
                <div className="text-[10px] uppercase tracking-widest opacity-60">
                  vs Black
                </div>
                <div className="text-lg font-bold">
                  {contrastBlack.toFixed(2)}
                </div>
                <div
                  className={`text-xs font-mono ${wcagJudge(contrastBlack).color}`}
                >
                  {wcagJudge(contrastBlack).label}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden mb-4">
            <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60">
              すべての形式
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/10">
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="px-4 py-3 flex items-center gap-3"
                >
                  <div className="text-xs text-black/50 dark:text-white/50 w-16 shrink-0 font-mono">
                    {r.label}
                  </div>
                  <div className="font-mono text-sm flex-1 break-all">
                    {r.value}
                  </div>
                  <button
                    onClick={() => copy(r.label, r.value)}
                    className="text-xs px-2 py-1 rounded border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition shrink-0"
                  >
                    {copiedKey === r.label ? "✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 色空間と WCAG について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>RGB</strong>: 赤・緑・青の加法混色（モニタ標準）
          </li>
          <li>
            <strong>HSL</strong>: 色相・彩度・<strong>明度</strong>。50% を中心に明暗対称
          </li>
          <li>
            <strong>HSV</strong>: 色相・彩度・<strong>明度（最大）</strong>。100% で「最も鮮やか」
          </li>
          <li>
            <strong>HEX</strong>: RGBの16進表記。Web で最も使われる形式
          </li>
          <li>
            <strong>WCAG コントラスト比</strong>: アクセシビリティ基準。
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>
                <strong>AA（4.5以上）</strong>: 通常テキストの最低基準
              </li>
              <li>
                <strong>AAA（7.0以上）</strong>: 強化基準
              </li>
              <li>
                <strong>AA Large（3.0以上）</strong>: 18pt以上の大きな文字
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
