import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { getBaseUrl, siteDescription, siteName } from "@/lib/site";
import { SiteJsonLd } from "@/lib/ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTitle = `${siteName} — エンジニア向けセキュリティ＆ユーティリティツール集`;

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "ja_JP",
    url: "/",
    title: defaultTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "EY94qXfgv6HkfKRSJrpCDlLuyOsLU7OUGSovR4D1lUY",
  },
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
        <SiteJsonLd />
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
            <nav className="text-sm text-black/60 dark:text-white/60 flex items-center gap-4">
              <Link href="/" className="hover:text-foreground transition">
                Tools
              </Link>
              <Link
                href="/about"
                className="hover:text-foreground transition"
              >
                About
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/10 mt-16">
          <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-black/50 dark:text-white/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>secutils — built for engineers, by engineers.</div>
            <nav className="flex items-center gap-4">
              <Link href="/about" className="hover:text-foreground transition">
                About
              </Link>
              <Link
                href="/privacy"
                className="hover:text-foreground transition"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition"
              >
                Contact
              </Link>
              <a
                href="https://github.com/totdelece/secutils"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition"
              >
                GitHub
              </a>
            </nav>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
