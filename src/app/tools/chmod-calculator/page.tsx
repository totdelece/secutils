"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// =====================================================================
// chmod Calculator
//   Unix / Linux のファイルパーミッションを、記号表記(rwxr-xr-x)と
//   8進数(755)・chmod コマンドの間で相互変換する。
//   内部状態は 12bit の数値 mode（0o0000〜0o7777）を単一の真実源とする:
//     bit  9-11 : 特殊ビット setuid(4000) / setgid(2000) / sticky(1000)
//     bit  6-8  : 所有者 r(400) w(200) x(100)
//     bit  3-5  : グループ r(40) w(20) x(10)
//     bit  0-2  : その他   r(4) w(2) x(1)
//   すべてブラウザ内で計算し、入力はサーバーに送信しない。
// =====================================================================

const SETUID = 0o4000;
const SETGID = 0o2000;
const STICKY = 0o1000;

const classRows = [
  { key: "u", name: "所有者", sub: "(user)", r: 0o400, w: 0o200, x: 0o100 },
  { key: "g", name: "グループ", sub: "(group)", r: 0o40, w: 0o20, x: 0o10 },
  { key: "o", name: "その他", sub: "(other)", r: 0o4, w: 0o2, x: 0o1 },
] as const;

const specialBits = [
  { name: "setuid", bit: SETUID, octal: "4000", hint: "実行時に所有者権限で動作（権限昇格に注意）" },
  { name: "setgid", bit: SETGID, octal: "2000", hint: "実行時にグループ権限／ディレクトリで所有グループを継承" },
  { name: "sticky", bit: STICKY, octal: "1000", hint: "ディレクトリ内は所有者のみ削除可（/tmp など）" },
] as const;

const fileTypes = [
  { char: "-", label: "通常ファイル" },
  { char: "d", label: "ディレクトリ" },
  { char: "l", label: "シンボリックリンク" },
  { char: "c", label: "キャラクタデバイス" },
  { char: "b", label: "ブロックデバイス" },
  { char: "p", label: "名前付きパイプ" },
  { char: "s", label: "ソケット" },
] as const;
const fileTypeChars: string[] = fileTypes.map((f) => f.char);

const presets = [
  { octal: "644", label: "一般ファイル", desc: "所有者のみ書込・全員読取" },
  { octal: "755", label: "実行・ディレクトリ", desc: "所有者フル・他は読取実行" },
  { octal: "600", label: "秘密鍵・機密", desc: "所有者のみ読み書き" },
  { octal: "700", label: "専用ディレクトリ", desc: "所有者のみアクセス" },
  { octal: "664", label: "グループ共同編集", desc: "所有者/グループ書込" },
  { octal: "775", label: "共有ディレクトリ", desc: "グループも書込可" },
  { octal: "640", label: "グループ読取", desc: "所有者書込・グループ読取" },
  { octal: "777", label: "全員フル", desc: "誰でも書込・危険", warn: true },
] as const;

// ---- mode → 各表記 -----------------------------------------------------
function toOctalStr(mode: number): string {
  const special = (mode >> 9) & 7;
  const perm = (mode & 0o777).toString(8).padStart(3, "0");
  return special ? special.toString(8) + perm : perm;
}

function permTriad(
  mode: number,
  rBit: number,
  wBit: number,
  xBit: number,
  specialBit: number,
  sLower: string,
  sUpper: string,
): string {
  const r = mode & rBit ? "r" : "-";
  const w = mode & wBit ? "w" : "-";
  let x: string;
  if (mode & specialBit) {
    x = mode & xBit ? sLower : sUpper;
  } else {
    x = mode & xBit ? "x" : "-";
  }
  return r + w + x;
}

function toSymbolic(mode: number): string {
  return (
    permTriad(mode, 0o400, 0o200, 0o100, SETUID, "s", "S") +
    permTriad(mode, 0o40, 0o20, 0o10, SETGID, "s", "S") +
    permTriad(mode, 0o4, 0o2, 0o1, STICKY, "t", "T")
  );
}

function classLetters(
  mode: number,
  rBit: number,
  wBit: number,
  xBit: number,
  specialBit: number,
  specialChar: string,
): string {
  let s = "";
  if (mode & rBit) s += "r";
  if (mode & wBit) s += "w";
  if (mode & xBit) s += "x";
  if (mode & specialBit) s += specialChar;
  return s;
}

function toSymbolicCommand(mode: number): string {
  const u = classLetters(mode, 0o400, 0o200, 0o100, SETUID, "s");
  const g = classLetters(mode, 0o40, 0o20, 0o10, SETGID, "s");
  const o = classLetters(mode, 0o4, 0o2, 0o1, STICKY, "t");
  return `chmod u=${u},g=${g},o=${o} ファイル名`;
}

// ---- 入力 → mode -------------------------------------------------------
const SYMBOLIC_RE = /^[r-][w-][xsS-][r-][w-][xsS-][r-][w-][xtT-]$/;

function parseSymbolic(s: string): number {
  let mode = 0;
  if (s[0] === "r") mode |= 0o400;
  if (s[1] === "w") mode |= 0o200;
  if (s[2] === "x" || s[2] === "s") mode |= 0o100;
  if (s[2] === "s" || s[2] === "S") mode |= SETUID;
  if (s[3] === "r") mode |= 0o40;
  if (s[4] === "w") mode |= 0o20;
  if (s[5] === "x" || s[5] === "s") mode |= 0o10;
  if (s[5] === "s" || s[5] === "S") mode |= SETGID;
  if (s[6] === "r") mode |= 0o4;
  if (s[7] === "w") mode |= 0o2;
  if (s[8] === "x" || s[8] === "t") mode |= 0o1;
  if (s[8] === "t" || s[8] === "T") mode |= STICKY;
  return mode;
}

function parseInput(raw: string): number | null {
  const t = raw.trim();
  if (!t) return null;
  // 8進数（3〜4桁）
  if (/^[0-7]{3,4}$/.test(t)) return parseInt(t, 8) & 0o7777;
  // 記号表記（9桁、または ls -l の先頭種別を含む10桁）
  const s = t.length === 10 ? t.slice(1) : t;
  if (SYMBOLIC_RE.test(s)) return parseSymbolic(s);
  return null;
}

const examples = ["755", "644", "600", "rwxr-xr-x", "rw-------", "4755", "drwxr-xr-x"];

export default function ChmodCalculatorPage() {
  const [mode, setMode] = useState(0o644);
  const [text, setText] = useState("644");
  const [fileType, setFileType] = useState("-");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  // チェックボックス／プリセットからの更新（入力欄も8進数へ同期）
  const applyMode = (nm: number) => {
    const m = nm & 0o7777;
    setMode(m);
    setText(toOctalStr(m));
    setInvalid(false);
  };

  const toggleBit = (bit: number) => applyMode(mode ^ bit);

  const handleText = (v: string) => {
    setText(v);
    const t = v.trim();
    if (t.length === 10 && fileTypeChars.includes(t[0])) setFileType(t[0]);
    const parsed = parseInput(v);
    if (parsed !== null) {
      setMode(parsed);
      setInvalid(false);
    } else {
      setInvalid(t.length > 0);
    }
  };

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1200);
  };

  const symbolic = useMemo(() => toSymbolic(mode), [mode]);
  const octalStr = useMemo(() => toOctalStr(mode), [mode]);
  const hasSpecial = ((mode >> 9) & 7) !== 0;
  const fileTypeLabel =
    fileTypes.find((f) => f.char === fileType)?.label ?? "通常ファイル";

  const rows: { label: string; value: string; sub?: string; warn?: boolean }[] = [
    {
      label: "8進数",
      value: octalStr,
      sub: hasSpecial ? "先頭桁 = 特殊ビット（setuid/setgid/sticky）" : "所有者・グループ・その他",
    },
    { label: "記号表記", value: symbolic, sub: "r=読取(4) w=書込(2) x=実行(1)" },
    {
      label: "ls -l 表示",
      value: fileType + symbolic,
      sub: `先頭 "${fileType}" = ${fileTypeLabel}`,
    },
    { label: "chmod（数値）", value: `chmod ${octalStr} ファイル名` },
    { label: "chmod（記号）", value: toSymbolicCommand(mode) },
  ];

  const digits = [
    { name: "所有者", digit: (mode >> 6) & 7, sym: symbolic.slice(0, 3) },
    { name: "グループ", digit: (mode >> 3) & 7, sym: symbolic.slice(3, 6) },
    { name: "その他", digit: mode & 7, sym: symbolic.slice(6, 9) },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔑 chmod Calculator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        Unix / Linux のファイルパーミッションを、記号表記（
        <code className="font-mono">rwxr-xr-x</code>）と 8 進数（
        <code className="font-mono">755</code>）・
        <code className="font-mono">chmod</code>{" "}
        コマンドの間で相互変換します。チェックを切り替えるだけで数値が求まり、setuid / setgid /
        スティッキービットにも対応しています。計算はすべてブラウザ内で行われ、入力はサーバーに送信されません。
      </p>

      {/* 入力欄 */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="chmod-input" className="text-sm font-medium block mb-2">
          8進数 または 記号表記
        </label>
        <input
          id="chmod-input"
          type="text"
          value={text}
          onChange={(e) => handleText(e.target.value)}
          placeholder="例: 755 / 4755 / rwxr-xr-x / drwxr-xr-x"
          className={`w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 ${
            invalid ? "ring-2 ring-red-500/50" : "focus:ring-emerald-500/50"
          }`}
          autoComplete="off"
          spellCheck={false}
        />
        {invalid && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-2">
            ⚠ 認識できません。8進数（3〜4桁の 0〜7）か、9桁の記号表記（rwxr-xr-x）で入力してください。
          </p>
        )}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="text-xs text-black/50 dark:text-white/50 mr-1 self-center">
            例:
          </span>
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => handleText(ex)}
              className="text-xs font-mono px-2 py-0.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* チェックボックスのマトリクス */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden mb-4">
        <div className="grid grid-cols-[1fr_repeat(3,minmax(0,4.5rem))] items-center bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60">
          <span>対象</span>
          <span className="text-center">読取 (4)</span>
          <span className="text-center">書込 (2)</span>
          <span className="text-center">実行 (1)</span>
        </div>
        <div className="divide-y divide-black/5 dark:divide-white/10">
          {classRows.map((row) => (
            <div
              key={row.key}
              className="grid grid-cols-[1fr_repeat(3,minmax(0,4.5rem))] items-center px-4 py-2.5"
            >
              <span className="text-sm">
                {row.name}{" "}
                <span className="text-xs font-mono text-black/40 dark:text-white/40">
                  {row.sub}
                </span>
              </span>
              {([row.r, row.w, row.x] as const).map((bit, i) => (
                <label
                  key={i}
                  className="flex justify-center cursor-pointer"
                  title={`${row.name}の${["読取", "書込", "実行"][i]}`}
                >
                  <input
                    type="checkbox"
                    checked={(mode & bit) !== 0}
                    onChange={() => toggleBit(bit)}
                    className="h-5 w-5 accent-emerald-600 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
        {/* 特殊ビット */}
        <div className="border-t border-black/10 dark:border-white/10 px-4 py-3 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="text-xs font-medium text-black/60 dark:text-white/60 mb-2">
            特殊ビット
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {specialBits.map((sp) => (
              <label
                key={sp.name}
                className="flex items-center gap-2 cursor-pointer"
                title={sp.hint}
              >
                <input
                  type="checkbox"
                  checked={(mode & sp.bit) !== 0}
                  onChange={() => toggleBit(sp.bit)}
                  className="h-4 w-4 accent-amber-600 cursor-pointer"
                />
                <span className="text-sm font-mono">{sp.name}</span>
                <span className="text-xs text-black/40 dark:text-white/40 font-mono">
                  {sp.octal}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 桁の内訳 */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 px-4 py-3 mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="text-xs text-black/50 dark:text-white/50">桁の内訳:</span>
        {hasSpecial && (
          <span className="font-mono">
            <span className="text-amber-600 dark:text-amber-400">
              {(mode >> 9) & 7}
            </span>
            <span className="text-xs text-black/40 dark:text-white/40">
              {" "}
              (特殊)
            </span>
          </span>
        )}
        {digits.map((d) => (
          <span key={d.name} className="font-mono">
            {d.name}=<strong>{d.digit}</strong>
            <span className="text-xs text-black/40 dark:text-white/40">
              {" "}
              ({d.sym})
            </span>
          </span>
        ))}
      </div>

      {/* 結果 */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden mb-4">
        <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60 flex items-center justify-between">
          <span>結果</span>
          <label className="flex items-center gap-1.5 font-normal">
            <span className="text-black/50 dark:text-white/50">ファイル種別:</span>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="bg-transparent border border-black/10 dark:border-white/10 rounded px-1.5 py-0.5 text-xs outline-none"
            >
              {fileTypes.map((f) => (
                <option key={f.char} value={f.char}>
                  {f.char === "-" ? "- " : f.char + " "}
                  {f.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="divide-y divide-black/5 dark:divide-white/10">
          {rows.map((row) => (
            <div
              key={row.label}
              className="px-4 py-3 flex items-start gap-3 hover:bg-black/5 dark:hover:bg-white/5 group"
            >
              <div className="text-xs text-black/50 dark:text-white/50 w-28 sm:w-36 shrink-0 pt-0.5">
                {row.label}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm break-all">{row.value}</div>
                {row.sub && (
                  <div className="font-mono text-xs text-black/40 dark:text-white/40 mt-0.5 break-all">
                    {row.sub}
                  </div>
                )}
              </div>
              <button
                onClick={() => copy(row.label, row.value)}
                className="text-xs px-2 py-1 rounded border border-black/10 dark:border-white/10 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition shrink-0"
                title={`「${row.label}」をコピー`}
              >
                {copiedKey === row.label ? "✓" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* プリセット */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 mb-8">
        <div className="text-xs font-medium text-black/60 dark:text-white/60 mb-2">
          よく使うパーミッション
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map((p) => (
            <button
              key={p.octal}
              onClick={() => {
                setFileType("-");
                applyMode(parseInt(p.octal, 8));
              }}
              className={`text-left rounded border px-3 py-2 transition hover:bg-black/5 dark:hover:bg-white/5 ${
                octalStr === p.octal
                  ? "border-emerald-500 bg-emerald-500/5"
                  : "border-black/10 dark:border-white/10"
              }`}
            >
              <div className="font-mono text-sm font-semibold flex items-center gap-1.5">
                {p.octal}
                {"warn" in p && p.warn && (
                  <span className="text-amber-600 dark:text-amber-400" title="広すぎる権限は危険">
                    ⚠
                  </span>
                )}
              </div>
              <div className="text-xs text-black/60 dark:text-white/60">{p.label}</div>
              <div className="text-[11px] text-black/40 dark:text-white/40 leading-tight mt-0.5">
                {p.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 解説 */}
      <div className="text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 パーミッションの読み方
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>3つのクラス × 3つの権限</strong>: 所有者 (u)・グループ (g)・その他 (o)
            それぞれに、読取 <code className="font-mono">r=4</code>・書込{" "}
            <code className="font-mono">w=2</code>・実行{" "}
            <code className="font-mono">x=1</code> があります。クラスごとに合計した数字を並べたものが
            8 進数表記です（例:{" "}
            <code className="font-mono">rwx=7, r-x=5</code> →{" "}
            <code className="font-mono">755</code>）。
          </li>
          <li>
            <strong>ディレクトリの x</strong>: ファイルでは「実行」ですが、ディレクトリでは
            「中に入る（cd・中のファイルへアクセスする）」権限を意味します。読取{" "}
            <code className="font-mono">r</code> だけでは一覧表示のみで、cd するには{" "}
            <code className="font-mono">x</code> が必要です。
          </li>
          <li>
            <strong>特殊ビット</strong>: 先頭にもう 1 桁付きます。
            <code className="font-mono">setuid(4000)</code>{" "}
            は実行時に所有者権限で動作、
            <code className="font-mono">setgid(2000)</code>{" "}
            はグループ権限での実行やディレクトリの所有グループ継承、
            <code className="font-mono">sticky(1000)</code>{" "}
            はディレクトリ内で所有者だけが削除できるようにします（
            <code className="font-mono">/tmp</code> が代表例）。記号表記では実行位置が{" "}
            <code className="font-mono">s</code> / <code className="font-mono">t</code>{" "}
            になり、元の実行ビットが無い場合は大文字{" "}
            <code className="font-mono">S</code> / <code className="font-mono">T</code>{" "}
            で表示されます。
          </li>
          <li>
            <strong>セキュリティ上の注意</strong>:{" "}
            <code className="font-mono">777</code> は誰でも書き換え・実行できるため原則避けます。
            秘密鍵や認証情報は <code className="font-mono">600</code>、
            SSH の <code className="font-mono">~/.ssh</code> ディレクトリは{" "}
            <code className="font-mono">700</code> が基本です。想定外のファイルに{" "}
            <code className="font-mono">setuid</code>{" "}
            が付いていると権限昇格の起点になり得るため、点検にも使えます。
          </li>
        </ul>
      </div>
    </div>
  );
}
