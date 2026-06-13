import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { getBaseUrl, siteDescription, siteName, siteTagline } from "@/lib/site";
import { SiteJsonLd } from "@/lib/ld";
import { tools } from "@/lib/tools";
import { indexedArticleCount } from "@/lib/articles";
import { SiteHeader } from "./_components/SiteHeader";
import { SiteFooter } from "./_components/SiteFooter";
import { CommandPalette } from "./_components/CommandPalette";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

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
      className={`${inter.variable} h-full antialiased`}
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
      <body className="flex min-h-full flex-col">
        <SiteJsonLd />
        <SiteHeader toolCount={tools.length} />
        <main className="flex-1">{children}</main>
        <SiteFooter toolCount={tools.length} articleCount={indexedArticleCount} />
        <CommandPalette />
        <Analytics />
      </body>
    </html>
  );
}
