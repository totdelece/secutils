import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "secutils はエンジニア向けのセキュリティ＆ユーティリティツール集です。すべてブラウザ完結、サーバーへのデータ送信なし。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight mb-6">About secutils</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          <strong>secutils</strong>{" "}
          は、エンジニアが日常業務で必要とするセキュリティ系・エンコード系・ネットワーク系のユーティリティを集めた Web ツール集です。
          パスワード生成、ハッシュ計算、JWT解析、CIDR計算、正規表現テストなど、開発・運用・セキュリティ業務で頻繁に使うツールを提供します。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">
          設計原則
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>すべてブラウザ内で処理</strong>:
            入力データ（パスワード、トークン、テキスト等）は一切サーバーへ送信せず、ご利用のブラウザ内で計算・変換します。
          </li>
          <li>
            <strong>暗号学的に安全な乱数</strong>: パスワードや UUID 等の生成には{" "}
            <code className="font-mono">crypto.getRandomValues</code> /{" "}
            <code className="font-mono">crypto.randomUUID()</code> を使用します。
            <code className="font-mono">Math.random()</code>{" "}
            のような擬似乱数は使いません。
          </li>
          <li>
            <strong>依存パッケージは最小限</strong>:
            サプライチェーン攻撃のリスクを抑えるため、外部パッケージは厳選しています。
          </li>
          <li>
            <strong>Web 標準を優先</strong>:{" "}
            ブラウザ標準API（SubtleCrypto、TextEncoder、RegExp 等）を最大限活用します。
          </li>
        </ul>

        <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">
          技術スタック
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Next.js 16（App Router、Turbopack）</li>
          <li>React 19</li>
          <li>TypeScript</li>
          <li>Tailwind CSS v4</li>
          <li>Vercel（ホスティング）</li>
        </ul>

        <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">
          セキュリティ
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            HTTP セキュリティヘッダー（CSP、HSTS、X-Frame-Options、Permissions-Policy 他）を全ページに適用。{" "}
            <a
              href="https://securityheaders.com/?q=secutils.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              securityheaders.com で評価可能
            </a>
            。
          </li>
          <li>
            GitHub の Dependabot・CodeQL・Secret Scanning を有効化し、依存パッケージとコードの脆弱性を自動検知。
          </li>
          <li>
            脆弱性の報告は{" "}
            <Link
              href="/contact"
              className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Contact ページ
            </Link>{" "}
            の手順に従ってください。
          </li>
        </ul>

        <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">
          オープンソース
        </h2>
        <p>
          ソースコードは GitHub で公開しています。バグ報告や機能提案は GitHub Issues / Pull Request を歓迎します。
        </p>
        <p>
          <a
            href="https://github.com/totdelece/secutils"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400 font-mono"
          >
            github.com/totdelece/secutils
          </a>
        </p>
      </section>
    </div>
  );
}
