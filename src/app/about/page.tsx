import type { Metadata } from "next";
import Link from "next/link";
import { author, editorialPolicy, disclaimerText } from "@/lib/author";

export const metadata: Metadata = {
  title: "About",
  description:
    "secutils の運営者・著者プロフィール、記事の編集・裏取り方針、設計原則を掲載しています。すべてブラウザ完結、サーバーへのデータ送信なし。",
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
          あわせて、Web セキュリティやネットワークの仕組みを開発者向けに解説する記事も公開しています。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">
          運営者・著者
        </h2>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{author.handle}</span>
            <span className="text-xs text-black/55 dark:text-white/55">
              {author.role}
            </span>
          </div>
          <p className="mt-3">{author.bio}</p>
          <p className="mt-3 font-semibold">得意領域</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {author.expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-black/60 dark:text-white/60">
            運営者は匿名で活動していますが、記事はすべて同一の運営者が執筆・確認しています。
            ご連絡・誤りのご指摘は{" "}
            <Link
              href={author.contactPath}
              className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Contact ページ
            </Link>{" "}
            から受け付けています。
          </p>
        </div>

        <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">
          記事の編集・裏取り方針
        </h2>
        <p>{editorialPolicy.summary}</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          {editorialPolicy.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

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
              href="https://securityheaders.com/?q=secutils.jp"
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

        <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">
          免責事項
        </h2>
        <p>{disclaimerText}</p>
        <p className="text-black/60 dark:text-white/60">
          一部の記事には広告・アフィリエイトリンクを含みます。該当記事には広告を含む旨を明記しています。
        </p>
      </section>
    </div>
  );
}
