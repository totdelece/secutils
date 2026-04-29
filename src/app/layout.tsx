import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "secutils — エンジニア向けセキュリティ＆ユーティリティツール集",
    template: "%s | secutils",
  },
  description:
    "セキュリティ寄りのWebツール集。パスワード生成、ハッシュ計算、エンコード、ネットワーク調査など、エンジニアの日常作業を高速化します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-mono text-lg font-bold tracking-tight"
            >
              <span className="text-emerald-600 dark:text-emerald-400">
                sec
              </span>
              utils
            </Link>
            <nav className="text-sm text-black/60 dark:text-white/60">
              <Link href="/" className="hover:text-foreground transition">
                Tools
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/10 mt-16">
          <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-black/50 dark:text-white/50">
            secutils — built for engineers, by engineers.
          </div>
        </footer>
      </body>
    </html>
  );
}
