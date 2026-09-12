import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "secutils のプライバシーポリシー。ツール入力データはサーバーに送信されません。アクセス解析・Cookie・広告（Google AdSense）・アフィリエイト（A8.net）の取扱いを明示します。",
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
        最終更新: 2026-09-12
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
          2. ブラウザ内に保存する情報
        </h2>
        <p>
          表示テーマ（ライト / ダーク）、最近使ったツール、お気に入りに登録したツールは、お使いのブラウザの
          localStorage に保存します。これらの情報はサーバーに送信されず、ブラウザのサイトデータを削除すると消去されます。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          3. アクセスログ
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
          4. アクセス解析（Vercel Web Analytics）
        </h2>
        <p>
          本サイトはアクセス解析として{" "}
          <strong>Vercel Web Analytics</strong>{" "}
          を使用しています。Vercel Web Analytics は<strong>Cookie を使わず</strong>、リクエストから生成したハッシュで訪問者を区別します（このセッション情報は24時間で破棄されます）。記録は個人や IP アドレスと結び付かない匿名の集計データとして行われ、主に次の情報が含まれます:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>閲覧日時と、閲覧したページの URL（クエリパラメータはフィルタ処理されたもの）</li>
          <li>リファラー（参照元URL）</li>
          <li>おおよその地域（国・地域・都市）</li>
          <li>デバイス種別、OS・ブラウザとそのバージョン</li>
        </ul>
        <p className="mt-2">
          詳細は{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Vercel Web Analytics の Privacy and Compliance
          </a>{" "}
          をご参照ください。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          5. Cookie
        </h2>
        <p>
          本サイト自身は Cookie を発行していません。ただし、第6項の Google AdSense と第7項の A8.net は、それぞれ広告の配信や成果の計測のために Cookie を使用することがあります。Cookie はブラウザの設定で無効にしたり削除したりできます。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          6. 広告配信（Google AdSense）
        </h2>
        <p>
          本サイトは第三者配信の広告サービス <strong>Google AdSense</strong> を使用しています。広告配信事業者は、利用者の興味に応じた広告を表示するために Cookie（{" "}
          <a
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Cookieポリシー
          </a>{" "}
          ）を使用することがあります。
        </p>
        <p>
          Google などの第三者配信事業者は、Cookie を使用して、利用者が当サイトや他のサイトに過去アクセスした際の情報に基づいて広告を表示します。Google が広告 Cookie を使用することにより、Google やそのパートナーは、当サイトや他のサイトへのアクセス情報に基づいて利用者に適切な広告を表示できます。
        </p>
        <p>
          利用者は以下の方法で<strong>パーソナライズ広告を無効化</strong>できます:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Google アカウントの広告設定
            </a>{" "}
            から個別に無効化
          </li>
          <li>
            <a
              href="https://www.aboutads.info/choices"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              www.aboutads.info/choices
            </a>{" "}
            から第三者ベンダー全体のパーソナライズ広告を無効化
          </li>
        </ul>
        <p className="mt-2">
          Google による広告 Cookie の詳細は{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Google の広告ポリシー
          </a>{" "}
          、Google がデータをどう使用するかは{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Google のサービスを使用するサイトやアプリから収集した情報の Google による使用
          </a>{" "}
          をご参照ください。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          7. アフィリエイトプログラム（A8.net）
        </h2>
        <p>
          本サイトは、アフィリエイトサービス <strong>A8.net</strong>{" "}
          のプログラムに参加しており、一部の記事に広告リンクを掲載しています。広告リンクを含む記事には、記事の冒頭にその旨を表示しています。
        </p>
        <p>
          広告リンクをクリックすると、成果を計測するために A8.net のサーバーから固有の ID を含む Cookie が発行され、お使いのブラウザに保存されます。また、広告を含むページでは、表示回数を計測するために A8.net の計測用画像を読み込みます。
        </p>
        <p>
          詳細は{" "}
          <a
            href="https://support.a8.net/a8/as/faq/2008/08/post_6.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            A8.net ヘルプ「クッキー（Cookie）とは？」
          </a>{" "}
          をご参照ください。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          8. 外部リンク
        </h2>
        <p>
          本サイトは外部サイトへのリンクを含むことがあります。リンク先のプライバシーポリシーについては各サイトの規定をご確認ください。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          9. ポリシーの改定
        </h2>
        <p>
          本ポリシーは予告なく改定することがあります。改定後の内容は本ページに掲載した時点で効力を生じます。重要な変更があった場合は、トップページ等で告知します。
        </p>

        <h2 className="text-xl font-bold tracking-tight mt-8 mb-3">
          10. お問い合わせ
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
