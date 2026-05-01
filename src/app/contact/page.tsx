import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "secutils へのお問い合わせ・脆弱性報告・機能提案の受付窓口。GitHub Issues / Security Advisory 経由で受け付けます。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight mb-6">Contact</h1>

      <section className="space-y-8 text-sm leading-relaxed">
        <p>
          secutils へのお問い合わせは、用途に応じて以下の窓口をご利用ください。
        </p>

        <div>
          <h2 className="text-xl font-bold tracking-tight mb-2">
            一般的な質問・機能要望・バグ報告
          </h2>
          <p className="mb-2">
            機能改善のご提案や、ツールの不具合報告は GitHub Issues で受け付けています。
          </p>
          <a
            href="https://github.com/totdelece/secutils/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition"
          >
            GitHub Issues で新規作成 →
          </a>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight mb-2">
            セキュリティ脆弱性の報告
          </h2>
          <p className="mb-2">
            本サイトのコードまたは実装に関するセキュリティ上の問題を発見された場合は、
            <strong>公開 Issue ではなく</strong> GitHub Security Advisory 経由で非公開にご報告ください（{" "}
            <a
              href="https://datatracker.ietf.org/doc/html/rfc9116"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              RFC 9116
            </a>{" "}
            に準拠した{" "}
            <a
              href="/.well-known/security.txt"
              className="underline hover:text-emerald-600 dark:hover:text-emerald-400 font-mono"
            >
              /.well-known/security.txt
            </a>{" "}
            も設置しています）。
          </p>
          <a
            href="https://github.com/totdelece/secutils/security/advisories/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition"
          >
            Security Advisory を作成 →
          </a>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight mb-2">
            ソースコード / Pull Request
          </h2>
          <p className="mb-2">
            ソースコードは MIT 互換的に GitHub で公開しています。Pull Request も歓迎します。
          </p>
          <a
            href="https://github.com/totdelece/secutils"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium font-mono transition"
          >
            github.com/totdelece/secutils
          </a>
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-black/5 dark:bg-white/5">
          <h3 className="text-sm font-bold mb-2">返信について</h3>
          <p className="text-xs text-black/60 dark:text-white/60">
            本サイトは個人運営のため、返信に時間をいただく場合があります（目安: 平日数日以内）。緊急性の高いセキュリティ問題は Security Advisory にチェックを入れていただくと優先的に対応します。個人メールアドレスの公開は行っておりません。
          </p>
        </div>
      </section>
    </div>
  );
}
