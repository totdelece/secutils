import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { getBaseUrl, siteDescription, siteName, siteTagline } from "@/lib/site";
import { SiteJsonLd } from "@/lib/ld";
import { ThemeToggle } from "./_components/ThemeToggle";

const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var t=(s==='dark'||s==='light')?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('light');}})();`;

const defaultTitle = `${siteName} - ${siteTagline}`;

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
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1275613569762995"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SiteJsonLd />
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-background/85 backdrop-blur dark:border-white/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-mono text-lg font-black tracking-tight text-slate-950 dark:text-white">
                <span className="text-emerald-600 dark:text-emerald-400">
                  sec
                </span>
                utils
              </span>
              <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:inline">
                browser tools
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Link
                href="/"
                className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white"
              >
                Tools
              </Link>
              <Link
                href="/learn"
                className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white"
              >
                Learn
              </Link>
              <Link
                href="/about"
                className="hidden rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white sm:inline-flex"
              >
                About
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-16 border-t border-slate-200 dark:border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>secutils - private, fast, browser-based developer tools.</div>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/learn" className="hover:text-slate-950 dark:hover:text-white">
                Learn
              </Link>
              <Link href="/about" className="hover:text-slate-950 dark:hover:text-white">
                About
              </Link>
              <Link href="/privacy" className="hover:text-slate-950 dark:hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-slate-950 dark:hover:text-white">
                Contact
              </Link>
              <a
                href="https://github.com/totdelece/secutils"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-950 dark:hover:text-white"
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
