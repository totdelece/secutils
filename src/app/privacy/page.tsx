import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "secutils のプライバシーポリシー。ツール入力データはサーバーに送信されません。アクセスログ・解析・第三者サービスの取扱いを明示します。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6">
        <Link href="/" className="hover:text-foreground">
          ← Tools
        </Link>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight mb-2">
        プライバシーポリシー
      </h1>
      <p className="text-xs text-black/50 dark:text-white/50 mb-8">
        最終更新: 2026-05-01
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          secutils（以下「本サイト」）は、利用者のプライバシーを最大限尊重します。本ポリシーは、本サイトが収集する情報・利用方法・第三者提供の有無を明らかにするものです。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          1. ツールへの入力データ
        </h2>
        <p>
          本サイトの全ツール（パスワード生成、ハッシュ計算、JWT解析、Base64 / URL / HTML エンコード、JSON 整形、Diff、CIDR 計算、正規表現テスト、UUID 生成、タイムスタンプ変換 等）は、
          <strong>すべてご利用のブラウザ内（クライアントサイド）で処理</strong>{" "}
          されます。入力された値（パスワード文字列、JWT、HTMLソース、IPアドレス、テキスト等）は{" "}
          <strong>本サイトのサーバーに送信されることはありません</strong>。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          2. アクセスログ
        </h2>
        <p>
          本サイトは Vercel（米国法人 Vercel Inc.）のホスティングインフラ上で稼働しています。Vercel のインフラレベルで、リクエストログ（IPアドレス、User-Agent、リクエストパス、タイムスタンプ等）が一定期間保管されます。これらは Vercel のセキュリティおよび運用保守の目的で利用されるもので、本サイト運営者が個別に追跡・分析することはありません。
        </p>
        <p>
          詳細は{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Vercel のプライバシーポリシー
          </a>{" "}
          をご参照ください。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          3. アクセス解析
        </h2>
        <p>
          現時点でアクセス解析ツールは導入していません。将来的に Vercel Analytics（Cookie 不要・個人特定不可な集計データ）または同等のプライバシーフレンドリーな解析サービスを導入する可能性があり、その場合は本ポリシーを更新します。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          4. Cookie
        </h2>
        <p>
          現時点で本サイト独自の Cookie は設定していません。将来的に第三者サービス（広告等）を導入した場合、その第三者が Cookie を設定する可能性があります。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          5. 第三者サービス（広告）
        </h2>
        <p>
          将来的に Google AdSense 等の広告サービスを導入する可能性があります。広告サービスはユーザーのブラウザに Cookie を設定し、過去のアクセス情報に基づいて広告を表示することがあります。導入時には本ポリシーを更新するとともに、広告に関する利用者のオプトアウト方法を明示します。
        </p>
        <p>
          Google による広告 Cookie の利用については{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Google の広告ポリシー
          </a>{" "}
          をご参照ください。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          6. 外部リンク
        </h2>
        <p>
          本サイトは外部サイトへのリンクを含むことがあります。リンク先のプライバシーポリシーについては各サイトの規定をご確認ください。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          7. ポリシーの改定
        </h2>
        <p>
          本ポリシーは予告なく改定することがあります。改定後の内容は本ページに掲載した時点で効力を生じます。重要な変更があった場合は、トップページ等で告知します。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          8. お問い合わせ
        </h2>
        <p>
          本ポリシーに関するご質問は{" "}
          <Link
            href="/contact"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Contact ページ
          </Link>{" "}
          の連絡手段からお願いします。
        </p>
      </section>
    </div>
  );
}
