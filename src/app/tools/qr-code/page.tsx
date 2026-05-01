"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";

type ErrorLevel = "L" | "M" | "Q" | "H";

const ERROR_LEVELS: {
  value: ErrorLevel;
  label: string;
  recovery: string;
}[] = [
  { value: "L", label: "L", recovery: "約7%" },
  { value: "M", label: "M", recovery: "約15%" },
  { value: "Q", label: "Q", recovery: "約25%" },
  { value: "H", label: "H", recovery: "約30%" },
];

export default function QrCodePage() {
  const [text, setText] = useState("https://secutils.vercel.app/");
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("M");
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!text) {
      setSvg("");
      setError(null);
      return;
    }
    let cancelled = false;
    QRCode.toString(text, {
      type: "svg",
      errorCorrectionLevel: errorLevel,
      margin: 2,
      color: { dark: foreground, light: background },
    })
      .then((s) => {
        if (cancelled) return;
        setSvg(s);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "QRコード生成に失敗しました");
        setSvg("");
      });
    return () => {
      cancelled = true;
    };
  }, [text, errorLevel, foreground, background]);

  const downloadSvg = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadPng = async (size: number) => {
    if (!text) return;
    try {
      const dataUrl = await QRCode.toDataURL(text, {
        errorCorrectionLevel: errorLevel,
        margin: 2,
        width: size,
        color: { dark: foreground, light: background },
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `qrcode-${size}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      // ignore
    }
  };

  const copySvg = async () => {
    if (!svg) return;
    await navigator.clipboard.writeText(svg);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        📱 QR Code Generator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        テキストやURLからQRコードを生成。エラー訂正レベル・色をカスタマイズし、SVG/PNGでダウンロードできます。
        生成はすべてブラウザ内で行われ、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="qr-text" className="text-sm font-medium block mb-2">
          テキスト / URL（入力）
        </label>
        <textarea
          id="qr-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="https://example.com または任意のテキスト"
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all"
          spellCheck={false}
        />
        <div className="mt-2 text-xs text-black/50 dark:text-white/50 font-mono">
          {text.length.toLocaleString()} 文字 ·{" "}
          {new TextEncoder().encode(text).length.toLocaleString()} bytes
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm font-medium mb-2">エラー訂正レベル</div>
          <div className="flex gap-2 flex-wrap">
            {ERROR_LEVELS.map((lvl) => (
              <button
                key={lvl.value}
                onClick={() => setErrorLevel(lvl.value)}
                title={`${lvl.label} - ${lvl.recovery} の復元能力`}
                className={`px-3 py-1.5 rounded text-xs font-mono border transition ${
                  errorLevel === lvl.value
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {lvl.label}
                <span className="ml-1 text-[10px] opacity-70">
                  {lvl.recovery}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-black/50 dark:text-white/50 mt-2">
            高いほどQRコードが汚れても読み取れますが、データ密度が増します。
          </p>
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm font-medium mb-2">配色</div>
          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2 text-xs">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-black/10 dark:border-white/10"
                aria-label="前景色"
              />
              前景
              <span className="font-mono text-black/50 dark:text-white/50">
                {foreground}
              </span>
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-black/10 dark:border-white/10"
                aria-label="背景色"
              />
              背景
              <span className="font-mono text-black/50 dark:text-white/50">
                {background}
              </span>
            </label>
          </div>
          <button
            onClick={() => {
              setForeground("#000000");
              setBackground("#ffffff");
            }}
            className="mt-2 text-[11px] text-black/50 dark:text-white/50 hover:text-foreground underline"
          >
            標準（黒/白）に戻す
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
          ⚠ {error}
        </div>
      ) : svg ? (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className="text-sm font-medium">QRコード（プレビュー）</span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => downloadPng(512)}
                className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition"
              >
                PNG 512px
              </button>
              <button
                onClick={() => downloadPng(1024)}
                className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition"
              >
                PNG 1024px
              </button>
              <button
                onClick={downloadSvg}
                className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition"
              >
                SVG
              </button>
              <button
                onClick={copySvg}
                className="px-3 py-1 rounded text-xs font-medium border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
                title="SVGコードをコピー"
              >
                {copied ? "Copied!" : "Copy SVG"}
              </button>
            </div>
          </div>
          <div
            className="mx-auto bg-white rounded p-4 max-w-xs"
            // qrcode パッケージが生成するSVGはサニタイズ不要（外部入力依存なし、固定タグ構造）
            dangerouslySetInnerHTML={{ __html: svg }}
            aria-label="生成されたQRコード"
          />
        </div>
      ) : (
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-8 text-center text-black/40 dark:text-white/40 text-sm">
          テキストを入力するとQRコードがここに表示されます
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 QRコードについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>エラー訂正レベル</strong>: QRコードが部分的に汚れたり破損しても、ある程度復元できる仕組み（Reed-Solomon符号）。L=7% / M=15% / Q=25% / H=30% まで復元可能ですが、高くなるほどデータ密度が上がりサイズが大きくなります。
          </li>
          <li>
            <strong>SVG vs PNG</strong>: SVG は無限に拡大しても劣化しないため印刷用途に最適。PNG は SNS 投稿やプレゼン資料の貼り付けに便利です。
          </li>
          <li>
            <strong>色のコントラスト</strong>:
            前景色（暗）と背景色（明）の<strong>輝度差を十分に</strong>確保しないと読み取れない場合があります。配色を変える場合は必ず実機テストを推奨します。
          </li>
          <li>
            最大データ容量はQRバージョンとエラー訂正レベルで決まります。長文URLや日本語が多い場合は H レベルを避けるか短縮URL の利用も検討してください。
          </li>
        </ul>
      </div>
    </div>
  );
}
