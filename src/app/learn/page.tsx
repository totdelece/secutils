import type { Metadata } from "next";
import { articles } from "@/lib/articles";
import { LearnBrowser } from "./_components/LearnBrowser";

export const metadata: Metadata = {
  title: "Learn - セキュリティとネットワークの学習ハブ",
  description:
    "JWT、XSS、CSRF、認証、暗号、TCP/IP、DNS、TLSなど、開発者向けのセキュリティとネットワークの基礎を日本語解説。検索とカテゴリで読みたい記事をすぐ見つけられます。",
  alternates: {
    canonical: "/learn",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default function LearnPage() {
  return (
    <div className="learn-stage relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Hero（補助要素として簡潔に。主役は検索） */}
        <header className="text-center">
          <h1 className="mx-auto text-[24px] font-bold leading-[1.2] tracking-tight text-fg-primary sm:text-[30px]">
            Security Knowledge Base
          </h1>
        </header>

        {/* 検索 → カテゴリ → Featured → Latest → All */}
        <div className="mt-7">
          <LearnBrowser />
        </div>

        {/* ページ最下部の概要（検索エンジン向けの説明） */}
        <footer className="mt-20 border-t border-border-subtle pt-8">
          <p className="max-w-3xl text-[13px] leading-7 text-fg-subtle">
            secutils の Learn は、Webセキュリティ（XSS・CSRF・SQLインジェクション・認証/認可・暗号）と
            ネットワーク（TCP/IP・DNS・TLS・HTTP）の仕組み、そして最新の脅威やCVEを日本語で解説する
            技術リファレンスです。現在 {articles.length} 本の記事を公開しており、各テーマは
            ブラウザ完結のツールと連携しています。用語や概念は上部の検索・カテゴリから引けます。
          </p>
        </footer>
      </div>
    </div>
  );
}
