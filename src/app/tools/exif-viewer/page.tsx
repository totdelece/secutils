"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  EXIF_GROUP_ORDER,
  parseExif,
  stripJpegMetadata,
  type ExifResult,
} from "@/lib/exif";

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = () => reject(new Error("画像の読み込みに失敗しました"));
    im.src = src;
  });
}

// JPEG 以外（PNG/WebP 等）や解析失敗時のフォールバック。
// canvas に描き直して再エンコードすることで、すべてのメタデータを除去する。
async function stripViaCanvas(srcUrl: string, type: string): Promise<Blob> {
  const img = await loadImage(srcUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas を利用できません");
  ctx.drawImage(img, 0, 0);
  const outType = type === "image/jpeg" ? "image/jpeg" : "image/png";
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("画像の生成に失敗しました"))),
      outType,
      outType === "image/jpeg" ? 0.95 : undefined,
    );
  });
}

export default function ExifViewerPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const [exif, setExif] = useState<ExifResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [stripping, setStripping] = useState(false);
  const [stripped, setStripped] = useState<{
    url: string;
    size: number;
    name: string;
  } | null>(null);

  // オブジェクトURLは差し替え・アンマウント時に解放してリークを防ぐ
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  useEffect(() => {
    return () => {
      if (stripped) URL.revokeObjectURL(stripped.url);
    };
  }, [stripped]);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setStripped(null);
    setExif(null);
    setDims(null);
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください。");
      return;
    }
    if (file.size > 40 * 1024 * 1024) {
      setError("ファイルが大きすぎます（40MB以下にしてください）。");
      return;
    }
    setFileName(file.name);
    setFileType(file.type);
    setFileSize(file.size);
    setPreviewUrl(URL.createObjectURL(file));
    try {
      const buf = await file.arrayBuffer();
      setBuffer(buf);
      setExif(parseExif(buf));
    } catch {
      setError("ファイルの読み込みに失敗しました。");
    }
  }, []);

  const handleStrip = useCallback(async () => {
    if (!buffer || !fileName || !previewUrl) return;
    setStripping(true);
    setError(null);
    try {
      const base = fileName.replace(/\.[^.]+$/, "");
      const isJpeg = fileType === "image/jpeg" || /\.jpe?g$/i.test(fileName);
      const bytes = isJpeg ? stripJpegMetadata(buffer) : null;
      let blob: Blob;
      let name: string;
      if (bytes) {
        blob = new Blob([bytes], { type: "image/jpeg" });
        name = `${base}_no-exif.jpg`;
      } else {
        blob = await stripViaCanvas(previewUrl, fileType);
        name = `${base}_no-exif.${blob.type === "image/jpeg" ? "jpg" : "png"}`;
      }
      setStripped({ url: URL.createObjectURL(blob), size: blob.size, name });
    } catch {
      setError("メタデータの除去に失敗しました。");
    } finally {
      setStripping(false);
    }
  }, [buffer, fileName, fileType, previewUrl]);

  const reset = () => {
    setFileName(null);
    setFileType("");
    setFileSize(0);
    setPreviewUrl(null);
    setDims(null);
    setBuffer(null);
    setExif(null);
    setError(null);
    setStripped(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🖼️ EXIF Viewer / Stripper
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        写真に埋め込まれた EXIF メタデータ（GPS の撮影位置・撮影日時・カメラ機種など）を表示し、ワンクリックで取り除いた画像をダウンロードできます。
        画像の読み込み・解析・除去はすべてブラウザ内で完結し、ファイルはサーバーに送信されません。
      </p>

      {/* ドロップゾーン */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className={`rounded-lg border-2 border-dashed p-8 text-center transition ${
          dragOver
            ? "border-emerald-500 bg-emerald-500/5"
            : "border-black/15 dark:border-white/15"
        }`}
      >
        <input
          id="exif-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
        <label
          htmlFor="exif-file"
          className="inline-block cursor-pointer px-4 py-2 rounded bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
        >
          画像を選択
        </label>
        <p className="mt-3 text-xs text-black/50 dark:text-white/50">
          またはここに画像をドラッグ＆ドロップ（JPEG / PNG / WebP など）
        </p>
        <p className="mt-1 text-xs text-black/40 dark:text-white/40">
          🔒 画像はブラウザ内だけで処理され、サーバーには送信されません。
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400">
          ⚠ {error}
        </div>
      )}

      {previewUrl && (
        <>
          {/* プレビュー＋ファイル情報 */}
          <div className="mt-6 rounded-lg border border-black/10 dark:border-white/10 p-5">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="読み込んだ画像のプレビュー"
                  onLoad={(e) =>
                    setDims({
                      w: e.currentTarget.naturalWidth,
                      h: e.currentTarget.naturalHeight,
                    })
                  }
                  className="max-h-40 max-w-full sm:max-w-[180px] rounded border border-black/10 dark:border-white/10 object-contain bg-black/5 dark:bg-white/5"
                />
              </div>
              <div className="min-w-0 text-sm">
                <div className="font-medium break-all">{fileName}</div>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-black/60 dark:text-white/60">
                  <dt>形式</dt>
                  <dd className="font-mono">{fileType || "不明"}</dd>
                  <dt>サイズ</dt>
                  <dd className="font-mono">{fmtBytes(fileSize)}</dd>
                  {dims && (
                    <>
                      <dt>寸法</dt>
                      <dd className="font-mono">
                        {dims.w} × {dims.h} px
                      </dd>
                    </>
                  )}
                </dl>
                <button
                  onClick={reset}
                  className="mt-3 text-xs underline text-black/50 dark:text-white/50 hover:text-foreground"
                >
                  別の画像を選ぶ
                </button>
              </div>
            </div>
          </div>

          {/* GPS 警告 */}
          {exif?.gps && (
            <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4">
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                ⚠ この画像には撮影場所（GPS座標）が記録されています
              </p>
              <p className="mt-1 text-xs text-red-700/80 dark:text-red-300/80 leading-relaxed">
                SNS などに公開すると、自宅・職場・行動範囲が特定される恐れがあります。共有する前に、下の「メタデータを除去」で取り除くことを推奨します。
              </p>
              <p className="mt-2 font-mono text-sm text-red-800 dark:text-red-200 break-all">
                {exif.gps.text}
              </p>
              <a
                href={`https://www.google.com/maps?q=${exif.gps.lat},${exif.gps.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs underline text-red-700 dark:text-red-300"
              >
                Googleマップで位置を確認（クリックすると外部サイトに座標を送信します）
              </a>
            </div>
          )}

          {/* EXIF 一覧 */}
          {exif &&
            (exif.hasExif ? (
              <div className="mt-4 space-y-4">
                {EXIF_GROUP_ORDER.filter((g) =>
                  exif.fields.some((f) => f.group === g),
                ).map((group) => (
                  <div
                    key={group}
                    className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden"
                  >
                    <div className="px-4 py-2 bg-black/[0.03] dark:bg-white/[0.04] text-sm font-semibold">
                      {group}
                    </div>
                    <dl className="divide-y divide-black/5 dark:divide-white/5">
                      {exif.fields
                        .filter((f) => f.group === group)
                        .map((f, i) => (
                          <div key={i} className="flex gap-3 px-4 py-2 text-sm">
                            <dt className="w-32 sm:w-40 shrink-0 text-black/55 dark:text-white/55">
                              {f.label}
                            </dt>
                            <dd
                              className={`min-w-0 break-all font-mono text-xs sm:text-sm ${
                                f.sensitive
                                  ? "text-red-600 dark:text-red-400 font-semibold"
                                  : ""
                              }`}
                            >
                              {f.value}
                              {f.sensitive && (
                                <span className="ml-1.5 align-middle text-[10px] font-sans font-normal rounded bg-red-500/15 px-1 py-0.5 text-red-600 dark:text-red-400">
                                  要注意
                                </span>
                              )}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-black/10 dark:border-white/10 p-5 text-sm text-black/60 dark:text-white/60">
                この画像から EXIF メタデータは検出されませんでした。すでに除去済みか、この形式（
                {fileType || "不明"}）にメタデータが含まれていない可能性があります。
              </div>
            ))}

          {/* 除去＋ダウンロード */}
          <div className="mt-6 rounded-lg border border-black/10 dark:border-white/10 p-5">
            <h2 className="text-sm font-bold mb-2">メタデータを除去してダウンロード</h2>
            <p className="text-xs text-black/55 dark:text-white/55 leading-relaxed mb-3">
              EXIF・GPS・XMP・IPTC・コメントなどのメタデータを取り除いた画像を作成します。JPEG は再圧縮せず該当領域だけを削除するため画質は劣化しません。その他の形式は再エンコードで除去します。処理はすべてブラウザ内で完結します。
            </p>
            <button
              onClick={handleStrip}
              disabled={stripping}
              className="px-4 py-2 rounded bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {stripping ? "処理中…" : "メタデータを除去"}
            </button>
            {stripped && (
              <div className="mt-4 rounded border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm">
                <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                  ✓ メタデータを除去しました。
                </p>
                <p className="mt-1 text-xs font-mono text-emerald-700/80 dark:text-emerald-300/80">
                  {fmtBytes(fileSize)} → {fmtBytes(stripped.size)}
                </p>
                <a
                  href={stripped.url}
                  download={stripped.name}
                  className="mt-3 inline-block px-4 py-2 rounded bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition break-all"
                >
                  ⬇ {stripped.name} をダウンロード
                </a>
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 EXIF メタデータとプライバシー
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>GPS（位置情報）</strong>:
            スマホで撮影した写真には、撮影した場所の緯度・経度が記録されることがあります。そのまま公開すると自宅や職場が特定される最大のリスク要因です。
          </li>
          <li>
            <strong>撮影日時・カメラ機種・シリアル番号</strong>:
            行動パターンの推測や、同一端末で撮られた写真の紐付けに使われることがあります。
          </li>
          <li>
            <strong>SNSの自動除去は過信しない</strong>:
            主要SNSは投稿時にEXIFを削るものが多いですが、ファイル直送やクラウド共有、一部サービスでは残ります。公開前に自分で確認・除去するのが確実です。
          </li>
          <li>
            <strong>JPEGの除去は劣化なし</strong>:
            このツールはJPEGをデコードし直さず、メタデータ領域だけを削除します。画像の画素データはそのまま温存されます。
          </li>
        </ul>
      </div>
    </div>
  );
}
