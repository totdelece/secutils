"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Status = "good" | "warn" | "missing" | "info";

type Check = {
  label: string;
  status: Status;
  present: boolean;
  value?: string;
  detail: string;
  recommendation?: string;
  example?: string;
  core: boolean;
};

type Report = {
  checks: Check[];
  coreSet: number;
  coreTotal: number;
  grade: string;
  hasSetCookie: boolean;
};

// 生のレスポンスヘッダー（curl -I やブラウザ devtools のコピー）をパース。
// ステータス行（HTTP/2 200 等）は読み飛ばし、同名ヘッダーは配列で保持する。
function parseHeaders(raw: string): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t) continue;
    if (/^HTTP\/\d/i.test(t)) continue; // ステータス行
    const i = t.indexOf(":");
    if (i === -1) continue;
    const name = t.slice(0, i).trim().toLowerCase();
    const value = t.slice(i + 1).trim();
    if (!name) continue;
    const arr = map.get(name) ?? [];
    arr.push(value);
    map.set(name, arr);
  }
  return map;
}

function analyze(raw: string): Report {
  const headers = parseHeaders(raw);
  const get = (name: string): string | undefined => headers.get(name)?.[0];
  const checks: Check[] = [];

  // --- 1. HSTS（コア） ---
  const hsts = get("strict-transport-security");
  if (!hsts) {
    checks.push({
      label: "Strict-Transport-Security (HSTS)",
      status: "missing",
      present: false,
      core: true,
      detail:
        "未設定です。ブラウザに「常に HTTPS で接続する」よう強制できず、初回アクセス時の中間者攻撃（SSLストリップ）に対して無防備です。",
      recommendation:
        "HTTPS でのみ提供しているなら設定を推奨。max-age は最低でも 180 日（15552000 秒）以上を。",
      example: "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
    });
  } else {
    const m = /max-age\s*=\s*(\d+)/i.exec(hsts);
    const maxAge = m ? parseInt(m[1], 10) : null;
    const hasPreload = /preload/i.test(hsts);
    const hasSub = /includeSubDomains/i.test(hsts);
    const notes = [
      `max-age=${maxAge ?? "(なし)"}`,
      hasSub ? "includeSubDomains あり" : "includeSubDomains なし",
      hasPreload ? "preload あり" : "preload なし",
    ].join(" / ");
    if (maxAge === null || maxAge < 15552000) {
      checks.push({
        label: "Strict-Transport-Security (HSTS)",
        status: "warn",
        present: true,
        value: hsts,
        core: true,
        detail: `設定済みですが max-age が短い、または未指定です（${notes}）。短いと保護期間がすぐ切れます。`,
        recommendation:
          "max-age を 1〜2 年（31536000〜63072000）に延長し、サブドメインも HTTPS なら includeSubDomains を付与。",
        example: "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
      });
    } else {
      checks.push({
        label: "Strict-Transport-Security (HSTS)",
        status: "good",
        present: true,
        value: hsts,
        core: true,
        detail: `十分な期間で設定されています（${notes}）。`,
      });
    }
  }

  // --- 2. Content-Security-Policy（コア） ---
  const csp = get("content-security-policy");
  if (!csp) {
    checks.push({
      label: "Content-Security-Policy (CSP)",
      status: "missing",
      present: false,
      core: true,
      detail:
        "未設定です。XSS が起きた際にスクリプトの読み込み元を制限できず、被害が拡大しやすくなります。最も効果の大きい防御の一つです。",
      recommendation:
        "まずは default-src 'self' から始め、必要な配信元だけを許可リスト方式で足していくのが安全です。",
      example: "Content-Security-Policy: default-src 'self'; object-src 'none'; frame-ancestors 'none'",
    });
  } else {
    const unsafeInline = /'unsafe-inline'/i.test(csp);
    const unsafeEval = /'unsafe-eval'/i.test(csp);
    const hasDefault = /(^|;)\s*default-src/i.test(csp);
    const hasScript = /(^|;)\s*script-src/i.test(csp);
    const issues: string[] = [];
    if (unsafeInline) issues.push("'unsafe-inline'（インラインスクリプトを許可＝XSS耐性が大きく下がる）");
    if (unsafeEval) issues.push("'unsafe-eval'（eval 等を許可）");
    if (!hasDefault && !hasScript) issues.push("default-src も script-src も無い（土台が緩い）");
    if (issues.length > 0) {
      checks.push({
        label: "Content-Security-Policy (CSP)",
        status: "warn",
        present: true,
        value: csp,
        core: true,
        detail: `設定済みですが弱点があります: ${issues.join(" / ")}。`,
        recommendation:
          "'unsafe-inline' を外し、nonce か hash 方式に移行するのが理想。最低限 default-src を定義してください。",
        example: "Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'",
      });
    } else {
      checks.push({
        label: "Content-Security-Policy (CSP)",
        status: "good",
        present: true,
        value: csp,
        core: true,
        detail: "設定済みで、目立つ緩い指定（unsafe-inline / unsafe-eval）も見当たりません。",
      });
    }
  }

  // --- 3. X-Frame-Options（コア。CSP frame-ancestors でも代替可） ---
  const xfo = get("x-frame-options");
  const cspFrameAncestors = csp ? /frame-ancestors/i.test(csp) : false;
  if (!xfo && !cspFrameAncestors) {
    checks.push({
      label: "X-Frame-Options",
      status: "missing",
      present: false,
      core: true,
      detail:
        "未設定です。ページを iframe に埋め込まれ、クリックジャッキング（透明フレームでの操作誘導）に悪用される恐れがあります。",
      recommendation:
        "埋め込みを許可しないなら DENY を。モダンには CSP frame-ancestors 'none' が推奨で、両方併用も可。",
      example: "X-Frame-Options: DENY",
    });
  } else if (!xfo && cspFrameAncestors) {
    checks.push({
      label: "X-Frame-Options",
      status: "good",
      present: false,
      value: "(CSP frame-ancestors で代替)",
      core: true,
      detail: "X-Frame-Options 自体は無いものの、CSP の frame-ancestors で埋め込みが制御されています。",
    });
  } else {
    const v = (xfo ?? "").toUpperCase();
    if (v.startsWith("ALLOW-FROM")) {
      checks.push({
        label: "X-Frame-Options",
        status: "warn",
        present: true,
        value: xfo,
        core: true,
        detail: "ALLOW-FROM は多くのブラウザで非対応（廃止）です。",
        recommendation: "CSP の frame-ancestors に置き換えてください。",
        example: "Content-Security-Policy: frame-ancestors https://trusted.example.com",
      });
    } else {
      checks.push({
        label: "X-Frame-Options",
        status: "good",
        present: true,
        value: xfo,
        core: true,
        detail: `${v} が設定され、クリックジャッキングを防げます。`,
      });
    }
  }

  // --- 4. X-Content-Type-Options（コア） ---
  const xcto = get("x-content-type-options");
  if (!xcto) {
    checks.push({
      label: "X-Content-Type-Options",
      status: "missing",
      present: false,
      core: true,
      detail:
        "未設定です。ブラウザが Content-Type を無視して中身を推測（MIMEスニッフィング）し、テキストをスクリプトとして実行される等のリスクがあります。",
      recommendation: "nosniff を付けるだけでスニッフィングを抑止できます。",
      example: "X-Content-Type-Options: nosniff",
    });
  } else if (xcto.toLowerCase() !== "nosniff") {
    checks.push({
      label: "X-Content-Type-Options",
      status: "warn",
      present: true,
      value: xcto,
      core: true,
      detail: "値が nosniff ではありません。有効な値は nosniff のみです。",
      recommendation: "nosniff に修正してください。",
      example: "X-Content-Type-Options: nosniff",
    });
  } else {
    checks.push({
      label: "X-Content-Type-Options",
      status: "good",
      present: true,
      value: xcto,
      core: true,
      detail: "nosniff が設定され、MIMEスニッフィングを抑止できます。",
    });
  }

  // --- 5. Referrer-Policy（コア） ---
  const ref = get("referrer-policy");
  const weakRef = ["unsafe-url", "no-referrer-when-downgrade", ""];
  if (!ref) {
    checks.push({
      label: "Referrer-Policy",
      status: "missing",
      present: false,
      core: true,
      detail:
        "未設定です。外部サイトへ遷移する際に Referer ヘッダーで URL（パスやクエリ）が漏れることがあります。",
      recommendation: "クロスオリジンにはオリジンのみ送る strict-origin-when-cross-origin が無難です。",
      example: "Referrer-Policy: strict-origin-when-cross-origin",
    });
  } else if (weakRef.includes(ref.toLowerCase())) {
    checks.push({
      label: "Referrer-Policy",
      status: "warn",
      present: true,
      value: ref,
      core: true,
      detail: "値が緩く、フルURLが外部に送られる可能性があります。",
      recommendation: "strict-origin-when-cross-origin か no-referrer を検討してください。",
      example: "Referrer-Policy: strict-origin-when-cross-origin",
    });
  } else {
    checks.push({
      label: "Referrer-Policy",
      status: "good",
      present: true,
      value: ref,
      core: true,
      detail: "Referer の送信範囲が制御されています。",
    });
  }

  // --- 6. Permissions-Policy（コア） ---
  const pp = get("permissions-policy");
  if (!pp) {
    checks.push({
      label: "Permissions-Policy",
      status: "missing",
      present: false,
      core: true,
      detail:
        "未設定です。カメラ・マイク・位置情報などの強力なブラウザ機能を、ページや埋め込み先がどこまで使えるかを制限できていません。",
      recommendation: "使わない機能は明示的に無効化（空の許可リスト）しておくと安全です。",
      example: "Permissions-Policy: geolocation=(), camera=(), microphone=()",
    });
  } else {
    checks.push({
      label: "Permissions-Policy",
      status: "good",
      present: true,
      value: pp,
      core: true,
      detail: "ブラウザ機能の利用範囲が制御されています。",
    });
  }

  // --- 追加: Cross-Origin-Opener-Policy（非コア・任意） ---
  const coop = get("cross-origin-opener-policy");
  if (coop) {
    checks.push({
      label: "Cross-Origin-Opener-Policy",
      status: "good",
      present: true,
      value: coop,
      core: false,
      detail: "別オリジンとのウィンドウ参照を分離し、クロスオリジンの情報漏えい（XS-Leaks）対策になります。",
    });
  } else {
    checks.push({
      label: "Cross-Origin-Opener-Policy",
      status: "info",
      present: false,
      core: false,
      detail: "未設定（任意）。高い分離が必要なアプリでは same-origin を検討してください。",
      example: "Cross-Origin-Opener-Policy: same-origin",
    });
  }

  // --- 情報漏えい系ヘッダー（非コア・あると減点要素） ---
  const leakHeaders: { name: string; label: string }[] = [
    { name: "server", label: "Server" },
    { name: "x-powered-by", label: "X-Powered-By" },
    { name: "x-aspnet-version", label: "X-AspNet-Version" },
    { name: "x-aspnetmvc-version", label: "X-AspNetMvc-Version" },
  ];
  for (const { name, label } of leakHeaders) {
    const v = get(name);
    if (!v) continue;
    const hasVersion = /\d/.test(v);
    checks.push({
      label: `${label}（情報露出）`,
      status: hasVersion ? "warn" : "info",
      present: true,
      value: v,
      core: false,
      detail: hasVersion
        ? "ソフトウェア名やバージョンが露出しています。攻撃者に既知脆弱性の狙いどころを与えます。"
        : "サーバー実装の情報が露出しています。",
      recommendation: "不要な実装情報はヘッダーから削除（またはバージョンを隠す）のが望ましいです。",
    });
  }

  // --- グレード計算: コア6項目のうち「設定済み（good/warn）」の数で採点 ---
  const coreChecks = checks.filter((c) => c.core);
  const coreTotal = coreChecks.length;
  const coreSet = coreChecks.filter((c) => c.status === "good" || c.status === "warn").length;
  const coreWarn = coreChecks.some((c) => c.status === "warn");

  let grade: string;
  if (coreSet >= 6) grade = "A";
  else if (coreSet === 5) grade = "B";
  else if (coreSet === 4) grade = "C";
  else if (coreSet === 3) grade = "D";
  else if (coreSet === 2) grade = "E";
  else grade = "F";
  // 全コアが good（warn ゼロ）かつ満点なら A+
  if (grade === "A" && !coreWarn) grade = "A+";

  const hasSetCookie = headers.has("set-cookie");

  return { checks, coreSet, coreTotal, grade, hasSetCookie };
}

const SAMPLE_GOOD = `HTTP/2 200
strict-transport-security: max-age=63072000; includeSubDomains; preload
content-security-policy: default-src 'self'; object-src 'none'; frame-ancestors 'none'
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
permissions-policy: geolocation=(), camera=(), microphone=()
cross-origin-opener-policy: same-origin`;

const SAMPLE_MIXED = `HTTP/2 200
strict-transport-security: max-age=63072000; includeSubDomains; preload
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline'
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
server: nginx/1.24.0
x-powered-by: PHP/8.2.1
set-cookie: session=abc123; Path=/; Secure; HttpOnly; SameSite=Lax`;

const STATUS_META: Record<Status, { icon: string; cls: string }> = {
  good: { icon: "✓", cls: "text-emerald-600 dark:text-emerald-400" },
  warn: { icon: "⚠", cls: "text-amber-600 dark:text-amber-400" },
  missing: { icon: "✗", cls: "text-red-600 dark:text-red-400" },
  info: { icon: "ℹ", cls: "text-black/40 dark:text-white/40" },
};

function gradeColor(grade: string): string {
  if (grade.startsWith("A")) return "bg-emerald-600";
  if (grade === "B" || grade === "C") return "bg-amber-500";
  return "bg-red-600";
}

export default function SecurityHeadersPage() {
  const [input, setInput] = useState(SAMPLE_MIXED);
  const report = useMemo(() => analyze(input), [input]);

  const coreChecks = report.checks.filter((c) => c.core);
  const extraChecks = report.checks.filter((c) => !c.core);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
        🛡️ Security Headers Analyzer
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        HTTP レスポンスヘッダーを貼り付けると、CSP・HSTS・X-Frame-Options などのセキュリティヘッダーを採点し、各項目の意味と修正例を表示します。
        URL ではなく「すでに取得済みのヘッダー」を解析するので、入力はすべてブラウザ内で処理され、サーバーには送信されません。
      </p>

      <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4 mb-4 text-xs text-black/60 dark:text-white/60">
        <p className="font-medium text-black/70 dark:text-white/70 mb-1">
          ヘッダーの取得方法
        </p>
        <p className="font-mono break-all">curl -sI https://example.com</p>
        <p className="mt-1">
          または、ブラウザの開発者ツール → Network → 対象リクエスト → Response Headers をコピー
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => setInput(SAMPLE_MIXED)}
          className="px-3 py-1.5 rounded text-xs font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition"
        >
          サンプル（不十分な例）
        </button>
        <button
          onClick={() => setInput(SAMPLE_GOOD)}
          className="px-3 py-1.5 rounded text-xs font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition"
        >
          サンプル（良好な例）
        </button>
        <button
          onClick={() => setInput("")}
          className="px-3 py-1.5 rounded text-xs font-medium text-black/50 dark:text-white/50 hover:text-foreground transition"
        >
          クリア
        </button>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
        <label htmlFor="hdr-input" className="text-sm font-medium block mb-2">
          レスポンスヘッダー（貼り付け）
        </label>
        <textarea
          id="hdr-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder={"HTTP/2 200\nstrict-transport-security: max-age=63072000\ncontent-security-policy: default-src 'self'\n..."}
          className="w-full font-mono text-xs sm:text-sm bg-black/5 dark:bg-white/5 rounded p-3 outline-none resize-y focus:ring-2 focus:ring-emerald-500/50 break-all"
          spellCheck={false}
        />
      </div>

      {input.trim() === "" ? (
        <div className="text-sm text-black/40 dark:text-white/40">
          ヘッダーを貼り付けると、ここに採点結果が表示されます。
        </div>
      ) : (
        <>
          {/* 総合グレード */}
          <div className="flex items-center gap-4 rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-3xl font-extrabold text-white ${gradeColor(
                report.grade,
              )}`}
            >
              {report.grade}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold">
                コアなセキュリティヘッダー {report.coreSet} / {report.coreTotal} 項目を設定
              </div>
              <p className="mt-1 text-xs text-black/55 dark:text-white/55 leading-relaxed">
                A+ は 6 項目すべてが過不足なく設定された状態（警告ゼロ）。下の各項目で「✗ 未設定」「⚠ 要改善」を潰すとグレードが上がります。
              </p>
            </div>
          </div>

          {/* コア項目 */}
          <h2 className="text-sm font-bold text-black/70 dark:text-white/70 mb-3">
            コアなセキュリティヘッダー
          </h2>
          <div className="space-y-3 mb-8">
            {coreChecks.map((check, i) => (
              <CheckCard key={i} check={check} />
            ))}
          </div>

          {/* 追加・情報 */}
          {extraChecks.length > 0 && (
            <>
              <h2 className="text-sm font-bold text-black/70 dark:text-white/70 mb-3">
                追加・情報
              </h2>
              <div className="space-y-3 mb-8">
                {extraChecks.map((check, i) => (
                  <CheckCard key={i} check={check} />
                ))}
              </div>
            </>
          )}

          {report.hasSetCookie && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 mb-8 text-sm">
              <p className="text-emerald-800 dark:text-emerald-200">
                Set-Cookie が含まれています。Cookie の Secure / HttpOnly / SameSite 属性は{" "}
                <Link href="/tools/cookie-parser" className="font-semibold underline">
                  HTTP Cookie Parser
                </Link>{" "}
                で詳しく確認できます。
              </p>
            </div>
          )}
        </>
      )}

      <div className="mt-4 text-xs text-black/50 dark:text-white/50 leading-relaxed">
        <p className="mb-2 font-medium text-black/70 dark:text-white/70">
          💡 セキュリティヘッダーの考え方
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>HSTS</strong>: 常に HTTPS を強制。max-age は長く、可能なら preload まで
          </li>
          <li>
            <strong>CSP</strong>: XSS 被害を最小化する最重要ヘッダー。<code className="font-mono">{"'unsafe-inline'"}</code> は避け、nonce / hash 方式へ
          </li>
          <li>
            <strong>X-Frame-Options / frame-ancestors</strong>: クリックジャッキング対策
          </li>
          <li>
            <strong>X-Content-Type-Options: nosniff</strong>: MIMEスニッフィング抑止
          </li>
          <li>
            <strong>Referrer-Policy / Permissions-Policy</strong>: URL 漏れ・強力なブラウザ機能の制御
          </li>
        </ul>
        <p className="mt-3">
          各ヘッダーの詳しい解説は{" "}
          <Link
            href="/learn/security/http-security-headers"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            HTTPセキュリティヘッダー詳解
          </Link>{" "}
          を参照してください。
        </p>
      </div>
    </div>
  );
}

function CheckCard({ check }: { check: Check }) {
  const meta = STATUS_META[check.status];
  return (
    <article className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
      <div className="flex items-baseline gap-2 px-4 py-2.5 bg-black/[0.03] dark:bg-white/[0.04]">
        <span className={`text-base font-bold ${meta.cls}`}>{meta.icon}</span>
        <span className="font-mono text-sm font-semibold">{check.label}</span>
      </div>
      <div className="px-4 py-3 space-y-2 text-xs">
        {check.value && (
          <div className="font-mono text-[11px] text-black/55 dark:text-white/55 break-all bg-black/5 dark:bg-white/5 rounded px-2 py-1.5">
            {check.value}
          </div>
        )}
        <p className="text-black/70 dark:text-white/70 leading-relaxed">{check.detail}</p>
        {check.recommendation && (
          <p className="text-black/55 dark:text-white/55 leading-relaxed">
            <span className="font-medium">→ 推奨: </span>
            {check.recommendation}
          </p>
        )}
        {check.example && (
          <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 break-all bg-emerald-500/10 rounded px-2 py-1.5">
            {check.example}
          </div>
        )}
      </div>
    </article>
  );
}
