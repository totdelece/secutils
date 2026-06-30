"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// =====================================================================
// 入力の自動判定 → IPv4 / IPv6 のどちらかへ正規化
//   対応する入力:
//   - ドット10進  : 192.168.1.10
//   - 10進整数    : 3232235786            （http://3232235786/ 形式）
//   - 16進        : 0xC0A80A0A / C0A80A0A （http://0xC0A80A0A/ 形式）
//   - 8進         : 030052005012          （http://030052005012/ 形式）
//   - IPv6        : 2001:db8::1 / ::1 / ::ffff:192.168.1.10
//   すべてブラウザ内で計算し、入力はサーバーに送信しない。
// =====================================================================

const U32_MAX = 0xffffffffn;
const U128_MAX = (1n << 128n) - 1n;

// ---- IPv4 ヘルパー（32bit を超えるので bit 演算は使わず除算で分解）-------
function ipv4Octets(n: number): [number, number, number, number] {
  return [
    Math.floor(n / 16777216) % 256,
    Math.floor(n / 65536) % 256,
    Math.floor(n / 256) % 256,
    n % 256,
  ];
}

function ipv4FromDotted(input: string): number | null {
  const m = input.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return null;
  const o = [m[1], m[2], m[3], m[4]].map((s) => parseInt(s, 10));
  if (o.some((x) => x < 0 || x > 255)) return null;
  return o[0] * 16777216 + o[1] * 65536 + o[2] * 256 + o[3];
}

function ipv4ToDotted(n: number): string {
  return ipv4Octets(n).join(".");
}

function ipv4ToBinary(n: number): string {
  const bits = n.toString(2).padStart(32, "0");
  return `${bits.slice(0, 8)}.${bits.slice(8, 16)}.${bits.slice(16, 24)}.${bits.slice(24, 32)}`;
}

function ipv4ToHex(n: number): string {
  return "0x" + n.toString(16).toUpperCase().padStart(8, "0");
}

function ipv4ToOctal(n: number): string {
  return "0" + n.toString(8);
}

function reverseDnsV4(n: number): string {
  const [a, b, c, d] = ipv4Octets(n);
  return `${d}.${c}.${b}.${a}.in-addr.arpa`;
}

function ipv4MappedV6(n: number): string {
  const [a, b, c, d] = ipv4Octets(n);
  const hi = ((a << 8) | b).toString(16);
  const lo = ((c << 8) | d).toString(16);
  return `::ffff:${hi}:${lo}`;
}

function ipv4Type(n: number): string {
  const [a, b] = ipv4Octets(n);
  if (n === 0xffffffff) return "リミテッドブロードキャスト (255.255.255.255)";
  if (a === 0) return "このネットワーク (0.0.0.0/8)";
  if (a === 10) return "プライベート (RFC 1918, 10.0.0.0/8)";
  if (a === 172 && b >= 16 && b <= 31) return "プライベート (RFC 1918, 172.16.0.0/12)";
  if (a === 192 && b === 168) return "プライベート (RFC 1918, 192.168.0.0/16)";
  if (a === 127) return "ループバック (127.0.0.0/8)";
  if (a === 169 && b === 254) return "リンクローカル (169.254.0.0/16)";
  if (a === 100 && b >= 64 && b <= 127) return "CGNAT (RFC 6598, 100.64.0.0/10)";
  if (a === 192 && b === 0 && ipv4Octets(n)[2] === 2) return "ドキュメント用 TEST-NET-1 (192.0.2.0/24)";
  if (a === 198 && b === 51 && ipv4Octets(n)[2] === 100) return "ドキュメント用 TEST-NET-2 (198.51.100.0/24)";
  if (a === 203 && b === 0 && ipv4Octets(n)[2] === 113) return "ドキュメント用 TEST-NET-3 (203.0.113.0/24)";
  if (a >= 224 && a <= 239) return "マルチキャスト (224.0.0.0/4)";
  if (a >= 240) return "予約済み (240.0.0.0/4)";
  return "グローバル（パブリック）";
}

// ---- IPv6 ヘルパー -----------------------------------------------------
function ipv6ToBigInt(addrRaw: string): bigint | null {
  let addr = addrRaw.trim();
  // 末尾が IPv4 ドット表記の場合（例: ::ffff:192.168.1.10）→ 2 hextet へ変換
  const dotted = addr.match(/^(.*:)((\d{1,3}\.){3}\d{1,3})$/);
  if (dotted) {
    const v4 = ipv4FromDotted(dotted[2]);
    if (v4 === null) return null;
    const [a, b, c, d] = ipv4Octets(v4);
    const hi = ((a << 8) | b).toString(16);
    const lo = ((c << 8) | d).toString(16);
    addr = `${dotted[1]}${hi}:${lo}`;
  }
  if (!/^[0-9a-fA-F:]+$/.test(addr)) return null;

  let parts: string[];
  if (addr.includes("::")) {
    const halves = addr.split("::");
    if (halves.length !== 2) return null;
    const left = halves[0] ? halves[0].split(":") : [];
    const right = halves[1] ? halves[1].split(":") : [];
    if (left.length + right.length > 7) return null;
    const fill = 8 - left.length - right.length;
    parts = [...left, ...Array(fill).fill("0"), ...right];
  } else {
    parts = addr.split(":");
  }
  if (parts.length !== 8) return null;

  let ip = 0n;
  for (const p of parts) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(p)) return null;
    ip = (ip << 16n) | BigInt(parseInt(p, 16));
  }
  return ip;
}

function ipv6Hextets(ip: bigint): string[] {
  const parts: string[] = [];
  for (let i = 7; i >= 0; i--) {
    parts.push(((ip >> BigInt(i * 16)) & 0xffffn).toString(16));
  }
  return parts;
}

function ipv6Expanded(ip: bigint): string {
  return ipv6Hextets(ip)
    .map((p) => p.padStart(4, "0"))
    .join(":");
}

function ipv6Compressed(ip: bigint): string {
  const parts = ipv6Hextets(ip);
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "0") {
      if (curStart === -1) curStart = i;
      curLen++;
      if (curLen > bestLen) {
        bestStart = curStart;
        bestLen = curLen;
      }
    } else {
      curStart = -1;
      curLen = 0;
    }
  }
  if (bestLen < 2) return parts.join(":");
  if (bestStart === 0 && bestStart + bestLen === parts.length) return "::";
  const left = parts.slice(0, bestStart).join(":");
  const right = parts.slice(bestStart + bestLen).join(":");
  return `${left}::${right}`;
}

function reverseDnsV6(ip: bigint): string {
  const nibbles = ip.toString(16).padStart(32, "0");
  return nibbles.split("").reverse().join(".") + ".ip6.arpa";
}

function ipv6EmbeddedV4(ip: bigint): string | null {
  // IPv4-mapped ::ffff:0:0/96
  if (ip >> 32n === 0xffffn) {
    const low = Number(ip & U32_MAX);
    return `${ipv4ToDotted(low)}（IPv4射影アドレス ::ffff:0:0/96）`;
  }
  return null;
}

function ipv6Type(ip: bigint): string {
  if (ip === 0n) return "未指定アドレス (::)";
  if (ip === 1n) return "ループバック (::1)";
  const high16 = ip >> 112n;
  if ((high16 & 0xfe00n) === 0xfc00n) return "ユニークローカル ULA (fc00::/7)";
  if ((high16 & 0xffc0n) === 0xfe80n) return "リンクローカル (fe80::/10)";
  if ((ip >> 120n) === 0xffn) return "マルチキャスト (ff00::/8)";
  if (ip >> 96n === 0x20010db8n) return "ドキュメント用 (2001:db8::/32)";
  if (ip >> 32n === 0xffffn) return "IPv4射影アドレス (::ffff:0:0/96)";
  if ((ip >> 125n) === 0x1n) return "グローバルユニキャスト (2000::/3)";
  return "その他 / 予約";
}

// =====================================================================
// 入力 → 結果
// =====================================================================
type Row = { label: string; value: string; sub?: string; warn?: boolean };
type Result =
  | { kind: "ipv4"; rows: Row[]; detected: string }
  | { kind: "ipv6"; rows: Row[]; detected: string }
  | { kind: "empty" }
  | { kind: "error"; message: string };

function buildIpv4(n: number, detected: string): Result {
  const rows: Row[] = [
    { label: "ドット10進", value: ipv4ToDotted(n), sub: "標準のIPv4表記" },
    { label: "10進整数 (32bit)", value: String(n), sub: "ネットワークバイトオーダー" },
    { label: "16進", value: ipv4ToHex(n) },
    { label: "8進", value: ipv4ToOctal(n) },
    { label: "2進", value: ipv4ToBinary(n) },
    { label: "逆引き (PTR)", value: reverseDnsV4(n), sub: "in-addr.arpa" },
    { label: "IPv6射影表記", value: ipv4MappedV6(n), sub: `::ffff:${ipv4ToDotted(n)}` },
    { label: "種別", value: ipv4Type(n) },
    {
      label: "難読化URL (SSRF注意)",
      value: `http://${n}/`,
      sub: `${ipv4ToHex(n).toLowerCase()} → http://${ipv4ToHex(n).toLowerCase()}/ ／ 8進 → http://${ipv4ToOctal(n)}/`,
      warn: true,
    },
  ];
  return { kind: "ipv4", rows, detected };
}

function buildIpv6(ip: bigint, detected: string): Result {
  const total = ip.toString();
  const rows: Row[] = [
    { label: "短縮表記", value: ipv6Compressed(ip), sub: "RFC 5952 推奨形式" },
    { label: "完全表記", value: ipv6Expanded(ip) },
    {
      label: "10進整数 (128bit)",
      value: total.length > 24 ? `${total.slice(0, 24)}…` : total,
      sub: total.length > 24 ? total : undefined,
    },
    { label: "16進", value: "0x" + ip.toString(16) },
    { label: "逆引き (PTR)", value: reverseDnsV6(ip), sub: "ip6.arpa（ニブル逆順）" },
    { label: "種別", value: ipv6Type(ip) },
  ];
  const embedded = ipv6EmbeddedV4(ip);
  if (embedded) rows.splice(5, 0, { label: "埋め込みIPv4", value: embedded });
  return { kind: "ipv6", rows, detected };
}

function convert(input: string): Result {
  const t = input.trim();
  if (!t) return { kind: "empty" };

  // IPv6（コロンを含む）
  if (t.includes(":")) {
    const ip = ipv6ToBigInt(t);
    if (ip === null)
      return { kind: "error", message: "IPv6アドレスとして認識できません。例: 2001:db8::1, ::1, ::ffff:192.168.1.10" };
    return buildIpv6(ip, "IPv6 アドレス");
  }

  // ドット10進 IPv4
  const dotted = ipv4FromDotted(t);
  if (dotted !== null) return buildIpv4(dotted, "ドット10進 IPv4");

  // 単一の数値（10進 / 16進 / 8進）
  let big: bigint | null = null;
  let label = "";
  try {
    if (/^0x[0-9a-fA-F]+$/i.test(t)) {
      big = BigInt(t);
      label = "16進の数値";
    } else if (/^0[0-7]+$/.test(t)) {
      big = BigInt("0o" + t.slice(1));
      label = "8進の数値";
    } else if (/^\d+$/.test(t)) {
      big = BigInt(t);
      label = "10進の数値";
    }
  } catch {
    big = null;
  }

  if (big !== null) {
    if (big < 0n) return { kind: "error", message: "負の数は変換できません。" };
    if (big <= U32_MAX) return buildIpv4(Number(big), `${label}（IPv4として解釈）`);
    if (big <= U128_MAX) return buildIpv6(big, `${label}（IPv6として解釈）`);
    return { kind: "error", message: "値が大きすぎます（128bit を超えています）。" };
  }

  return {
    kind: "error",
    message:
      "認識できない入力です。例: 192.168.1.10 / 3232235786 / 0xC0A80A0A / 2001:db8::1",
  };
}

const examples = [
  "192.168.1.10",
  "3232235786",
  "0x7f000001",
  "2130706433",
  "017700000001",
  "::ffff:192.168.1.10",
  "2001:db8::1",
  "fe80::1",
];

export default function IpConverterPage() {
  const [input, setInput] = useState("192.168.1.10");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const result = useMemo(() => convert(input), [input]);

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1200);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔢 IP Address Converter
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        IPアドレスをドット10進・10進整数・16進・8進・2進・逆引き表記へ相互変換します。IPv4 / IPv6
        を自動判定し、<code className="font-mono">http://2130706433/</code>{" "}
        のように難読化されたIPも元に戻せます（SSRF・フィッシングURLの調査に）。
        変換はすべてブラウザ内で行われ、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="ip-input" className="text-sm font-medium block mb-2">
          IPアドレス / 数値
        </label>
        <input
          id="ip-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例: 192.168.1.10 / 3232235786 / 0x7f000001 / 2001:db8::1"
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50"
          autoComplete="off"
          spellCheck={false}
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="text-xs text-black/50 dark:text-white/50 mr-1 self-center">
            例:
          </span>
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setInput(ex)}
              className="text-xs font-mono px-2 py-0.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {result.kind === "error" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
          ⚠ {result.message}
        </div>
      )}

      {(result.kind === "ipv4" || result.kind === "ipv6") && (
        <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
          <div className="bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-black/60 dark:text-white/60 flex items-center justify-between">
            <span>結果（{result.kind.toUpperCase()}）</span>
            <span className="font-mono text-black/40 dark:text-white/40">
              {result.detected}
            </span>
          </div>
          <div className="divide-y divide-black/5 dark:divide-white/10">
            {result.rows.map((row) => (
              <div
                key={row.label}
                className="px-4 py-3 flex items-start gap-3 hover:bg-black/5 dark:hover:bg-white/5 group"
              >
                <div className="text-xs text-black/50 dark:text-white/50 w-32 sm:w-40 shrink-0 pt-0.5">
                  {row.label}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-mono text-sm break-all ${row.warn ? "text-amber-600 dark:text-amber-400" : ""}`}
                  >
                    {row.value}
                  </div>
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
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 IPアドレス表記と難読化について
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>10進整数表記</strong>: IPv4 は 32bit の整数。
            <code className="font-mono">192.168.1.10</code> は{" "}
            <code className="font-mono">192×256³ + 168×256² + 1×256 + 10 = 3232235786</code>。
            多くのブラウザや <code className="font-mono">inet_aton()</code> は{" "}
            <code className="font-mono">http://3232235786/</code> を同じIPとして解釈します。
          </li>
          <li>
            <strong>SSRF / フィッシング対策</strong>:
            攻撃者は許可リストや目視チェックを回避するため、IPを10進・16進（
            <code className="font-mono">0x7f000001</code>）・8進（
            <code className="font-mono">017700000001</code>）に変換して隠すことがあります。いずれも{" "}
            <code className="font-mono">127.0.0.1</code> です。怪しいURLはここで展開して実体を確認できます。
          </li>
          <li>
            <strong>逆引き (PTR)</strong>: IPv4 は octet を逆順にして{" "}
            <code className="font-mono">.in-addr.arpa</code>、IPv6 はニブル（4bit）を逆順にして{" "}
            <code className="font-mono">.ip6.arpa</code> を付けた名前で DNS の PTR を引きます。
          </li>
          <li>
            <strong>IPv6 の短縮</strong>: 連続する <code className="font-mono">0</code> のブロックを{" "}
            <code className="font-mono">::</code> で 1 度だけ省略できます（RFC 5952）。
            <code className="font-mono">::ffff:192.168.1.10</code> は IPv4 を IPv6 で表す射影アドレスです。
          </li>
        </ul>
      </div>
    </div>
  );
}
