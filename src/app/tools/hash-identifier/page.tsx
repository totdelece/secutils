"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// =====================================================================
// ハッシュ種別の推定（すべてブラウザ内で判定。入力はサーバーに送らない）
//   判定の優先順位:
//   1. 接頭辞つきの構造化ハッシュ（bcrypt / Argon2 / sha512crypt 等）→ 確定的
//   2. 16進数の桁数（= ビット長）から候補を列挙（MD5/SHA系など）
//   3. Base64 と推定できる場合はデコード長から候補を提示
//   ※ MD5 と NTLM のように「形式が同一で区別できない」ものは併記する
// =====================================================================

type Conf = "high" | "medium" | "low";
type Result =
  | {
      kind: "ok";
      charset: string;
      length: number;
      bits?: number;
      confidence: Conf;
      candidates: string[];
      notes: string[];
    }
  | { kind: "empty" }
  | { kind: "error"; message: string };

// ---- 接頭辞つき（確度: 高）-------------------------------------------
const prefixRules: { re: RegExp; name: string; note?: string }[] = [
  {
    re: /^\$2[abxy]?\$\d{2}\$[./A-Za-z0-9]{53}$/,
    name: "bcrypt (Blowfish)",
    note: "$2a$/$2b$/$2y$ + コスト係数。パスワード保存の標準的な方式です。",
  },
  {
    re: /^\$argon2(id|i|d)\$/,
    name: "Argon2",
    note: "Password Hashing Competition 優勝の最新方式（$argon2id$ が推奨）。",
  },
  { re: /^\$6\$/, name: "sha512crypt", note: "Linux /etc/shadow の標準（$6$）。" },
  { re: /^\$5\$/, name: "sha256crypt", note: "Unix crypt の SHA-256 版（$5$）。" },
  { re: /^\$1\$/, name: "md5crypt", note: "FreeBSD/旧Linux の MD5 crypt（$1$）。現在は非推奨。" },
  { re: /^\$apr1\$/, name: "Apache apr1 (htpasswd MD5)", note: "Apache の .htpasswd で使われる MD5。" },
  { re: /^\$P\$/, name: "phpass (WordPress / phpBB3)", note: "$P$ は WordPress 等で使われるポータブルハッシュ。" },
  { re: /^\$H\$/, name: "phpass (phpBB3)", note: "$H$ は phpBB3 の phpass。" },
  { re: /^\$y\$/, name: "yescrypt", note: "新しめの Linux ディストリの /etc/shadow 既定（$y$）。" },
  { re: /^\$7\$/, name: "scrypt", note: "メモリハードな KDF（$7$）。" },
  {
    re: /^pbkdf2_(sha256|sha1|sha512)\$\d+\$/,
    name: "Django PBKDF2",
    note: "Django の標準パスワードハッシュ（algorithm$iterations$salt$hash）。",
  },
  {
    re: /^\{(SSHA|SHA|SMD5|MD5|CRYPT)\}/i,
    name: "LDAP ハッシュ (Base64)",
    note: "{SSHA} などの接頭辞付き。OpenLDAP 等で使われます。",
  },
  {
    re: /^\*[0-9A-Fa-f]{40}$/,
    name: "MySQL 4.1+ (SHA1(SHA1(pw)))",
    note: "先頭 * + 40桁16進。MySQL の PASSWORD() 形式。",
  },
];

// ---- 16進の桁数（ビット長）→ 候補 ------------------------------------
const hexByLength: Record<number, { conf: Conf; algos: string[]; note?: string }> = {
  8: { conf: "low", algos: ["CRC-32", "Adler-32", "CRC-32B", "FNV-32"], note: "チェックサムの可能性が高く、暗号学的ハッシュではありません。" },
  16: { conf: "low", algos: ["CRC-64", "MySQL323（旧MySQL ≤4.0）", "FNV-64"], note: "短く、衝突しやすい値です。" },
  32: {
    conf: "medium",
    algos: ["MD5", "NTLM (Windows)", "MD4", "LM hash", "RIPEMD-128", "MD2"],
    note: "MD5・NTLM・LM・MD4 は同じ32桁16進で、形式だけでは区別できません。生成元（Windowsアカウント＝NTLM、一般的なハッシュ＝MD5）など文脈で判断します。",
  },
  40: {
    conf: "medium",
    algos: ["SHA-1", "RIPEMD-160", "HAS-160", "Tiger-160", "Haval-160"],
    note: "SHA-1 が最も一般的です。",
  },
  56: { conf: "medium", algos: ["SHA-224", "SHA3-224", "SHA-512/224", "Haval-224"] },
  64: {
    conf: "medium",
    algos: ["SHA-256", "SHA3-256", "BLAKE2s-256", "RIPEMD-256", "Keccak-256", "GOST R 34.11"],
    note: "SHA-256 が最も一般的です。",
  },
  96: { conf: "medium", algos: ["SHA-384", "SHA3-384", "SHA-512/384"] },
  128: {
    conf: "medium",
    algos: ["SHA-512", "SHA3-512", "BLAKE2b-512", "Whirlpool", "Keccak-512"],
    note: "SHA-512 が最も一般的です。",
  },
};

// ---- Base64 デコード長（バイト）→ 候補 -------------------------------
const bytesToAlgos: Record<number, string[]> = {
  16: ["MD5", "NTLM", "MD4"],
  20: ["SHA-1", "RIPEMD-160"],
  28: ["SHA-224", "SHA3-224"],
  32: ["SHA-256", "SHA3-256", "BLAKE2s"],
  48: ["SHA-384", "SHA3-384"],
  64: ["SHA-512", "SHA3-512", "BLAKE2b", "Whirlpool"],
};

function base64DecodedLength(s: string): number | null {
  try {
    // ブラウザの atob で生バイト長を求める（標準 Base64 のみ）
    const bin = atob(s);
    return bin.length;
  } catch {
    return null;
  }
}

function identify(raw: string): Result {
  const input = raw.trim();
  if (!input) return { kind: "empty" };

  // JWT は「ハッシュではない」案内をして JWT Decoder へ誘導
  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\./.test(input)) {
    return {
      kind: "ok",
      charset: "JWT トークン",
      length: input.length,
      confidence: "high",
      candidates: ["JWT (JSON Web Token)"],
      notes: [
        "ハッシュではなく JWT です。3つの Base64URL 部（Header.Payload.Signature）で構成されます。中身は JWT Decoder で確認できます。",
      ],
    };
  }

  // 1) 接頭辞つき構造化ハッシュ
  for (const rule of prefixRules) {
    if (rule.re.test(input)) {
      return {
        kind: "ok",
        charset: "接頭辞つきハッシュ",
        length: input.length,
        confidence: "high",
        candidates: [rule.name],
        notes: rule.note ? [rule.note] : [],
      };
    }
  }

  // 2) hash:salt 形式（hashcat 等）→ 左側を解析して注記
  let target = input;
  const notes: string[] = [];
  if (input.includes(":")) {
    const parts = input.split(":");
    if (parts.length === 2 && /^[0-9a-fA-F]+$/.test(parts[0]) && parts[0].length >= 8) {
      target = parts[0];
      notes.push("「ハッシュ:ソルト」形式の可能性があります（左側を解析）。");
    }
  }

  // 3) 16進数
  if (/^[0-9a-fA-F]+$/.test(target) && target.length % 2 === 0) {
    const info = hexByLength[target.length];
    if (info) {
      return {
        kind: "ok",
        charset: "16進数 (hex)",
        length: target.length,
        bits: target.length * 4,
        confidence: info.conf,
        candidates: info.algos,
        notes: [...notes, ...(info.note ? [info.note] : [])],
      };
    }
    return {
      kind: "ok",
      charset: "16進数 (hex)",
      length: target.length,
      bits: target.length * 4,
      confidence: "low",
      candidates: [],
      notes: [
        ...notes,
        `${target.length}桁（${target.length * 4}bit）は一般的なハッシュ長と一致しません。切り詰め・連結・独自形式の可能性があります。`,
      ],
    };
  }

  // 4) Base64 と推定
  if (/^[A-Za-z0-9+/]+={0,2}$/.test(input) && input.length >= 16) {
    const decoded = base64DecodedLength(input);
    if (decoded !== null) {
      const algos = bytesToAlgos[decoded];
      return {
        kind: "ok",
        charset: "Base64 の可能性",
        length: input.length,
        bits: decoded * 8,
        confidence: "low",
        candidates: algos ?? [],
        notes: [
          `Base64 としてデコードすると ${decoded} バイト（${decoded * 8}bit）です。` +
            (algos
              ? "下記アルゴリズムの生ハッシュを Base64 化したものかもしれません。"
              : "一般的なハッシュ長には一致しませんでした。"),
          "Base64 はハッシュ以外（鍵・トークン・バイナリ）の可能性もあります。",
        ],
      };
    }
  }

  return {
    kind: "error",
    message:
      "ハッシュ形式として認識できませんでした。例: 5f4dcc3b…（MD5）, $2y$10$…（bcrypt）, $6$…（sha512crypt）",
  };
}

const examples: { label: string; value: string }[] = [
  { label: "MD5", value: "5f4dcc3b5aa765d61d8327deb882cf99" },
  { label: "SHA-1", value: "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8" },
  { label: "SHA-256", value: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" },
  { label: "bcrypt", value: "$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy" },
  { label: "sha512crypt", value: "$6$rounds=5000$usesomesillysalt$" },
  { label: "NTLM", value: "8846f7eaee8fb117ad06bdd830b7586c" },
];

const confLabel: Record<Conf, { text: string; cls: string }> = {
  high: { text: "確度: 高", cls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  medium: { text: "確度: 中", cls: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30" },
  low: { text: "確度: 低", cls: "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 border-black/10 dark:border-white/15" },
};

export default function HashIdentifierPage() {
  const [input, setInput] = useState("5f4dcc3b5aa765d61d8327deb882cf99");

  const result = useMemo(() => identify(input), [input]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🔎 Hash Identifier
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-8">
        ハッシュ文字列を貼り付けると、長さ・文字種・接頭辞から種類（MD5 / SHA系 / bcrypt / Argon2 / NTLM
        など）を確度つきで推定します。CTF やインシデント調査の切り分けに。
        判定はすべてブラウザ内で行われ、入力データはサーバーに送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-4">
        <label htmlFor="hash-input" className="text-sm font-medium block mb-2">
          ハッシュ文字列
        </label>
        <textarea
          id="hash-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例: 5f4dcc3b5aa765d61d8327deb882cf99 または $2y$10$..."
          rows={2}
          className="w-full font-mono text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y break-all"
          autoComplete="off"
          spellCheck={false}
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="text-xs text-black/50 dark:text-white/50 mr-1 self-center">
            例:
          </span>
          {examples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setInput(ex.value)}
              className="text-xs font-mono px-2 py-0.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
              title={ex.value}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {result.kind === "error" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-red-600 dark:text-red-400">
          ⚠ {result.message}
        </div>
      )}

      {result.kind === "ok" && (
        <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
          <div className="bg-black/5 dark:bg-white/5 px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className="text-black/50 dark:text-white/50">
              文字種: <span className="font-medium text-foreground">{result.charset}</span>
            </span>
            <span className="text-black/50 dark:text-white/50">
              長さ: <span className="font-mono font-medium text-foreground">{result.length}</span>
            </span>
            {result.bits !== undefined && (
              <span className="text-black/50 dark:text-white/50">
                ビット長: <span className="font-mono font-medium text-foreground">{result.bits}bit</span>
              </span>
            )}
            <span
              className={`ml-auto rounded-full border px-2 py-0.5 font-medium ${confLabel[result.confidence].cls}`}
            >
              {confLabel[result.confidence].text}
            </span>
          </div>

          {result.candidates.length > 0 ? (
            <ol className="divide-y divide-black/5 dark:divide-white/10">
              {result.candidates.map((name, i) => (
                <li
                  key={name}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="text-xs font-mono text-black/40 dark:text-white/40 w-6 shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-mono text-sm">{name}</span>
                  {i === 0 && result.candidates.length > 1 && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded px-1.5 py-0.5">
                      最有力
                    </span>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <div className="px-4 py-3 text-sm text-black/50 dark:text-white/50">
              該当する候補が見つかりませんでした。
            </div>
          )}

          {result.notes.length > 0 && (
            <div className="border-t border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-4 py-3 space-y-1.5">
              {result.notes.map((note, i) => (
                <p key={i} className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                  ※ {note}
                </p>
              ))}
              {result.candidates[0] === "JWT (JSON Web Token)" && (
                <Link
                  href="/tools/jwt-decoder"
                  className="inline-block text-xs text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
                >
                  → JWT Decoder で中身を見る
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 ハッシュ種別の見分け方
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>桁数（ビット長）が最大の手がかり</strong>: 16進で 32桁=128bit（MD5系）、40桁=160bit（SHA-1系）、64桁=256bit（SHA-256系）、128桁=512bit（SHA-512系）。
          </li>
          <li>
            <strong>形式が同じものは区別できない</strong>: MD5・NTLM・LM・MD4 はすべて32桁16進です。どこから取得したか（Windowsの認証情報なら NTLM など）で判断します。
          </li>
          <li>
            <strong>接頭辞があれば確実</strong>: <code className="font-mono">$2y$</code>=bcrypt、<code className="font-mono">$argon2id$</code>=Argon2、<code className="font-mono">$6$</code>=sha512crypt、<code className="font-mono">$1$</code>=md5crypt、<code className="font-mono">$P$</code>=phpass(WordPress)。これらはソルトとパラメータを内包します。
          </li>
          <li>
            <strong>これは推定です</strong>: 文字列の形だけで100%の特定はできません。パスワード保存には MD5/SHA-1 単体ではなく、bcrypt / Argon2 / scrypt などソルト付きの遅いハッシュを使ってください。
          </li>
        </ul>
      </div>
    </div>
  );
}
