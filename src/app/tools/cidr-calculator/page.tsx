"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// =====================================================================
// IPv4 utilities
// =====================================================================

function parseIpv4Cidr(
  input: string,
): { ip: number; prefix: number } | null {
  const m = input.match(
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/,
  );
  if (!m) return null;
  const o = [m[1], m[2], m[3], m[4]].map((s) => parseInt(s, 10));
  if (o.some((n) => n < 0 || n > 255)) return null;
  const prefix = parseInt(m[5], 10);
  if (prefix < 0 || prefix > 32) return null;
  const ip = ((o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]) >>> 0;
  return { ip, prefix };
}

function ipv4ToString(ip: number): string {
  return [
    (ip >>> 24) & 0xff,
    (ip >>> 16) & 0xff,
    (ip >>> 8) & 0xff,
    ip & 0xff,
  ].join(".");
}

function ipv4Mask(prefix: number): number {
  if (prefix === 0) return 0;
  if (prefix === 32) return 0xffffffff;
  return (0xffffffff << (32 - prefix)) >>> 0;
}

function ipv4ToBinary(ip: number): string {
  const bits = ip.toString(2).padStart(32, "0");
  return `${bits.slice(0, 8)}.${bits.slice(8, 16)}.${bits.slice(16, 24)}.${bits.slice(24, 32)}`;
}

function calcIpv4(ip: number, prefix: number) {
  const mask = ipv4Mask(prefix);
  const wildcard = ~mask >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const totalAddrs = prefix === 0 ? 0x100000000 : 2 ** (32 - prefix);
  // RFC 3021: /31 は 2 ホスト, /32 は 1 ホスト
  const usableHosts =
    prefix >= 31 ? totalAddrs : Math.max(0, totalAddrs - 2);
  const firstHost = prefix >= 31 ? network : (network + 1) >>> 0;
  const lastHost = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;
  return {
    network,
    broadcast,
    mask,
    wildcard,
    totalAddrs,
    usableHosts,
    firstHost,
    lastHost,
  };
}

function ipv4Class(ip: number): string {
  const first = (ip >>> 24) & 0xff;
  if (first < 128) return "Class A";
  if (first < 192) return "Class B";
  if (first < 224) return "Class C";
  if (first < 240) return "Class D (Multicast)";
  return "Class E (Reserved)";
}

function ipv4PrivateRange(ip: number): string | null {
  // 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8, 169.254.0.0/16
  const a = (ip >>> 24) & 0xff;
  const b = (ip >>> 16) & 0xff;
  if (a === 10) return "プライベート (RFC 1918, 10.0.0.0/8)";
  if (a === 172 && b >= 16 && b <= 31)
    return "プライベート (RFC 1918, 172.16.0.0/12)";
  if (a === 192 && b === 168)
    return "プライベート (RFC 1918, 192.168.0.0/16)";
  if (a === 127) return "ループバック (127.0.0.0/8)";
  if (a === 169 && b === 254) return "リンクローカル (169.254.0.0/16)";
  if (a >= 224 && a <= 239) return "マルチキャスト (224.0.0.0/4)";
  return null;
}

// =====================================================================
// IPv6 utilities
// =====================================================================

function ipv6ToBigInt(addr: string): bigint | null {
  if (!/^[0-9a-fA-F:]+$/.test(addr)) return null;
  let parts: string[];
  if (addr.includes("::")) {
    const halves = addr.split("::");
    if (halves.length !== 2) return null;
    const left = halves[0] ? halves[0].split(":") : [];
    const right = halves[1] ? halves[1].split(":") : [];
    if (left.length + right.length > 8) return null;
    const fillCount = 8 - left.length - right.length;
    parts = [...left, ...Array(fillCount).fill("0"), ...right];
  } else {
    parts = addr.split(":");
  }
  if (parts.length !== 8) return null;
  let ip = 0n;
  for (const part of parts) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(part)) return null;
    ip = (ip << 16n) | BigInt(parseInt(part, 16));
  }
  return ip;
}

function compressIpv6Parts(parts: string[]): string {
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
  const left = parts.slice(0, bestStart).join(":");
  const right = parts.slice(bestStart + bestLen).join(":");
  if (bestStart === 0 && bestStart + bestLen === parts.length) return "::";
  return `${left}::${right}`;
}

function bigIntToIpv6(ip: bigint): string {
  const parts: string[] = [];
  for (let i = 7; i >= 0; i--) {
    parts.push(((ip >> BigInt(i * 16)) & 0xffffn).toString(16));
  }
  return compressIpv6Parts(parts);
}

function parseIpv6Cidr(
  input: string,
): { ip: bigint; prefix: number } | null {
  const slash = input.lastIndexOf("/");
  if (slash === -1) return null;
  const addr = input.slice(0, slash);
  const prefixStr = input.slice(slash + 1);
  if (!/^\d{1,3}$/.test(prefixStr)) return null;
  const prefix = parseInt(prefixStr, 10);
  if (prefix < 0 || prefix > 128) return null;
  const ip = ipv6ToBigInt(addr);
  if (ip === null) return null;
  return { ip, prefix };
}

function calcIpv6(ip: bigint, prefix: number) {
  const hostBits = 128 - prefix;
  const mask =
    prefix === 0
      ? 0n
      : (((1n << BigInt(prefix)) - 1n) << BigInt(hostBits)) &
        ((1n << 128n) - 1n);
  const network = ip & mask;
  const last = prefix === 128 ? network : network | ((1n << BigInt(hostBits)) - 1n);
  const totalAddrs = 1n << BigInt(hostBits);
  return { network, last, mask, totalAddrs };
}

function ipv6PrivateNote(ip: bigint): string | null {
  // fc00::/7 ULA, fe80::/10 link-local, ::1/128 loopback, ff00::/8 multicast
  const high8 = Number((ip >> 120n) & 0xffn);
  if ((high8 & 0xfe) === 0xfc) return "Unique Local Address (fc00::/7)";
  if (high8 === 0xfe) {
    const high10 = Number((ip >> 118n) & 0x3ffn);
    // fe80::/10 で先頭10bitが 1111111010
    if ((high10 & 0x3c0) === 0x380) return "リンクローカル (fe80::/10)";
  }
  if (high8 === 0xff) return "マルチキャスト (ff00::/8)";
  if (ip === 1n) return "ループバック (::1)";
  if (ip === 0n) return "未指定 (::)";
  return null;
}

// =====================================================================
// React component
// =====================================================================

type Row = { label: string; value: string; sub?: string };
type Result =
  | { kind: "ipv4"; rows: Row[]; cidr: string }
  | { kind: "ipv6"; rows: Row[]; cidr: string }
  | { kind: "empty" }
  | { kind: "error"; message: string };

function calculate(input: string): Result {
  const trimmed = input.trim();
  if (!trimmed) return { kind: "empty" };

  const v4 = parseIpv4Cidr(trimmed);
  if (v4) {
    const r = calcIpv4(v4.ip, v4.prefix);
    const cls = ipv4Class(r.network);
    const note = ipv4PrivateRange(v4.ip);
    const rows: Row[] = [
      {
        label: "ネットワーク",
        value: `${ipv4ToString(r.network)}/${v4.prefix}`,
      },
      { label: "ブロードキャスト", value: ipv4ToString(r.broadcast) },
      {
        label: "ホスト範囲",
        value:
          v4.prefix === 32
            ? "（ホストなし、単一アドレス）"
            : `${ipv4ToString(r.firstHost)} 〜 ${ipv4ToString(r.lastHost)}`,
      },
      {
        label: "総アドレス数",
        value: r.totalAddrs.toLocaleString(),
        sub: `2^${32 - v4.prefix}`,
      },
      {
        label: "使用可能ホスト数",
        value: r.usableHosts.toLocaleString(),
        sub:
          v4.prefix === 31
            ? "RFC 3021 (point-to-point)"
            : v4.prefix === 32
              ? "single host"
              : "総数 - ネットワーク - ブロードキャスト",
      },
      {
        label: "サブネットマスク",
        value: ipv4ToString(r.mask),
        sub: ipv4ToBinary(r.mask),
      },
      {
        label: "ワイルドカードマスク",
        value: ipv4ToString(r.wildcard),
        sub: "Cisco ACL 等で使用",
      },
      {
        label: "クラス分類",
        value: cls,
        sub: note ?? undefined,
      },
    ];
    return { kind: "ipv4", rows, cidr: trimmed };
  }

  const v6 = parseIpv6Cidr(trimmed);
  if (v6) {
    const r = calcIpv6(v6.ip, v6.prefix);
    const note = ipv6PrivateNote(v6.ip);
    const total = r.totalAddrs.toString();
    const totalDisplay =
      total.length > 30 ? `${total.slice(0, 1)}.${total.slice(1, 4)}…e+${total.length - 1}` : total;
    const rows: Row[] = [
      {
        label: "ネットワーク",
        value: `${bigIntToIpv6(r.network)}/${v6.prefix}`,
      },
      {
        label: "最終アドレス",
        value: bigIntToIpv6(r.last),
      },
      {
        label: "プレフィックス長",
        value: `/${v6.prefix}`,
        sub: `ホスト部 ${128 - v6.prefix} bit`,
      },
      {
        label: "総アドレス数",
        value: totalDisplay,
        sub: total.length > 30 ? `(正確には ${total} 個)` : undefined,
      },
    ];
    if (note) rows.push({ label: "用途", value: note });
    return { kind: "ipv6", rows, cidr: trimmed };
  }

  return {
    kind: "error",
    message:
      "CIDR表記として認識できません。例: 192.168.1.0/24, 10.0.0.0/8, 2001:db8::/32, fd00::/8",
  };
}

const examples = [
  "192.168.1.0/24",
  "10.0.0.0/8",
  "172.16.0.0/12",
  "192.0.2.128/26",
  "203.0.113.0/30",
  "2001:db8::/32",
  "fd00::/8",
];

export default function CidrCalculatorPage() {
  const [input, setInput] = useState("192.168.1.0/24");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const result = useMemo(() => calculate(input), [input]);

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
        🌐 CIDR / Subnet Calculator
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        CIDR表記からネットワーク・ブロードキャスト・ホスト範囲・マスク等を計算。IPv4 と IPv6 を自動判定。
        計算はすべてブラウザ内で行われ、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label
          htmlFor="cidr-input"
          className="text-sm font-medium block mb-2"
        >
          CIDR表記
        </label>
        <input
          id="cidr-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例: 192.168.1.0/24 または 2001:db8::/32"
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
              {result.cidr}
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
                  <div className="font-mono text-sm break-all">
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
          💡 CIDR / サブネットについて
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>CIDR (Classless Inter-Domain Routing)</strong>: IPアドレスとプレフィックス長で範囲を表記する方式（RFC 4632）。<code className="font-mono">192.168.1.0/24</code> は先頭24bitがネットワーク部、残り8bitがホスト部。
          </li>
          <li>
            <strong>使用可能ホスト数</strong>: 通常は <code className="font-mono">2^(32-prefix) - 2</code>（ネットワークアドレスとブロードキャストアドレスを除く）。<code className="font-mono">/31</code> はP2P用（RFC 3021、2ホスト）、<code className="font-mono">/32</code> は単一ホスト。
          </li>
          <li>
            <strong>ワイルドカードマスク</strong>: サブネットマスクのビット反転。Cisco の ACL で使われます（例: <code className="font-mono">/24</code> → <code className="font-mono">0.0.0.255</code>）。
          </li>
          <li>
            <strong>IPv6</strong>: 128bit アドレス。プレフィックス <code className="font-mono">/64</code> が一般的なサブネット。<code className="font-mono">fc00::/7</code> はIPv4の RFC 1918 に相当する Unique Local Address。
          </li>
        </ul>
      </div>
    </div>
  );
}
