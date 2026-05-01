import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy
// - nonce方式は使わない（静的レンダリング/CDNキャッシュを温存するため）
// - Next.jsのSSRがinline script/styleを出すため 'unsafe-inline' を許容
// - 'unsafe-eval' は dev のみ（Reactのエラースタック復元に必要）
// - Vercel Analytics: script は va.vercel-scripts.com から、ビーコンは
//   vitals.vercel-insights.com に POST される
// - Google AdSense: 多数のドメインへのアクセスが必要（script/img/iframe/connect）
const adsenseScriptHosts = [
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://googleads.g.doubleclick.net",
  "https://*.g.doubleclick.net",
  "https://tpc.googlesyndication.com",
  "https://partner.googleadservices.com",
  "https://www.googletagservices.com",
  "https://adservice.google.com",
  "https://*.adtrafficquality.google",
].join(" ");

const adsenseImgHosts = [
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://*.g.doubleclick.net",
  "https://*.googleusercontent.com",
  "https://www.google.com",
  "https://*.gstatic.com",
].join(" ");

const adsenseFrameHosts = [
  "https://googleads.g.doubleclick.net",
  "https://tpc.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://*.g.doubleclick.net",
  "https://*.adtrafficquality.google",
].join(" ");

const adsenseConnectHosts = [
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://*.g.doubleclick.net",
  "https://www.google.com",
  "https://*.adtrafficquality.google",
].join(" ");

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com ${adsenseScriptHosts}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${adsenseImgHosts}`,
  "font-src 'self' data:",
  `connect-src 'self' https://vitals.vercel-insights.com ${adsenseConnectHosts}`,
  `frame-src 'self' ${adsenseFrameHosts}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
];

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=(), payment=(), usb=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
