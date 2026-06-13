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

// A8.net アフィリエイト用（バナー画像・計測ピクセル両方）
const a8ImgHosts = [
  "https://*.a8.net",
  "https://*.a8.com",
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
  `img-src 'self' data: blob: ${adsenseImgHosts} ${a8ImgHosts}`,
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

// pillar 統合で削除した記事を、対応する解説記事へ 301 転送（AdSense対策・Phase1）。
// 旧URLを 404 にせず評価を pillar に引き継ぐ。
const consolidatedRedirects = [
  { slug: "fog-ransomware-propagation", to: "ransomware-2026" },
  { slug: "foxconn-nitrogen-ransomware", to: "ransomware-2026" },
  { slug: "kyber-ransomware-post-quantum", to: "ransomware-2026" },
  { slug: "the-gentlemen-ransomware", to: "ransomware-2026" },
  { slug: "shai-hulud", to: "supply-chain-attacks" },
  { slug: "teampcp-cloud-credential-theft", to: "supply-chain-attacks" },
  { slug: "daemon-tools-supply-chain", to: "supply-chain-attacks" },
  { slug: "github-actions-supply-chain", to: "supply-chain-attacks" },
  { slug: "redhat-npm-miasma-supply-chain", to: "supply-chain-attacks" },
  { slug: "ironworm-npm-ebpf-supply-chain", to: "supply-chain-attacks" },
  // Phase2: 国内インシデント事例12本 → japan-security-incidents へ
  { slug: "kadokawa-blacksuit-ransomware-2024", to: "japan-security-incidents" },
  { slug: "asahi-group-qilin-ransomware-2025", to: "japan-security-incidents" },
  { slug: "iseto-8base-ransomware-2024", to: "japan-security-incidents" },
  { slug: "osaka-acute-care-elbie-ransomware-2022", to: "japan-security-incidents" },
  { slug: "nagoya-port-nuts-lockbit-2023", to: "japan-security-incidents" },
  { slug: "hoya-hunters-international-ransomware-2024", to: "japan-security-incidents" },
  { slug: "mitsubishi-electric-blacktech-cyberattack-2020", to: "japan-security-incidents" },
  { slug: "kojima-press-ransomware-toyota-shutdown-2022", to: "japan-security-incidents" },
  { slug: "lineyahoo-naver-unauthorized-access-2023", to: "japan-security-incidents" },
  { slug: "fujitsu-projectweb-unauthorized-access-2021", to: "japan-security-incidents" },
  { slug: "honda-ekans-snake-ransomware-2020", to: "japan-security-incidents" },
  { slug: "handa-hospital-lockbit-ransomware-2021", to: "japan-security-incidents" },
  // Phase3: CVE/ゼロデイ速報 → owasp-top-10
  { slug: "toolshell", to: "owasp-top-10" },
  { slug: "cpanel-cve-2026-41940", to: "owasp-top-10" },
  { slug: "netlogon-cve-2026-41089", to: "owasp-top-10" },
  { slug: "apex-one-cve-2026-34926", to: "owasp-top-10" },
  { slug: "langflow-cve-2025-34291", to: "owasp-top-10" },
  { slug: "forticlient-ems-cve-2026-35616", to: "owasp-top-10" },
  { slug: "pan-os-globalprotect-cve-2026-0257", to: "owasp-top-10" },
  { slug: "exchange-cve-2026-42897", to: "owasp-top-10" },
  { slug: "copy-fail-cve-2026-31431", to: "owasp-top-10" },
  { slug: "ivanti-epmm-cve-2026-6973", to: "owasp-top-10" },
  { slug: "citrix-netscaler-cve-2026-3055", to: "owasp-top-10" },
  { slug: "mirasvit-magento-cve-2026-45247", to: "owasp-top-10" },
  { slug: "cisco-sdwan-manager-cve-2026-20245", to: "owasp-top-10" },
  { slug: "everest-forms-pro-cve-2026-3300", to: "owasp-top-10" },
  { slug: "android-cve-2025-48595-framework-zero-day", to: "owasp-top-10" },
  { slug: "cisco-firestarter-backdoor", to: "owasp-top-10" },
  { slug: "react2shell", to: "owasp-top-10" },
  { slug: "defender-bluehammer-redsun-undefend", to: "owasp-top-10" },
  // Phase3: APT・国家系 → mitre-attack
  { slug: "apt28-prismex-nato", to: "mitre-attack" },
  { slug: "gridtide-unc2814-telecom-espionage", to: "mitre-attack" },
  { slug: "turla-kazuar-p2p-botnet", to: "mitre-attack" },
  { slug: "operation-dragon-weave-azure-c2", to: "mitre-attack" },
  { slug: "muddywater-teams-fake-ransomware", to: "mitre-attack" },
  // Phase3: AI悪用 → prompt-injection
  { slug: "claude-mythos", to: "prompt-injection" },
  { slug: "ai-generated-zero-day-exploit", to: "prompt-injection" },
  { slug: "autonomous-llm-agent-intrusion", to: "prompt-injection" },
  { slug: "ai-built-ransomware-toolkit-edr-evasion", to: "prompt-injection" },
  { slug: "chatgphish-chatgpt-phishing", to: "prompt-injection" },
  // Phase3: 情報漏えい → incident-response-guide
  { slug: "canvas-shinyhunters-breach", to: "incident-response-guide" },
  { slug: "trellix-source-code-breach", to: "incident-response-guide" },
  { slug: "nyc-health-hospitals-biometric-breach", to: "incident-response-guide" },
  { slug: "charter-vishing-entra-breach", to: "incident-response-guide" },
].map(({ slug, to }) => ({
  source: `/learn/security/${slug}`,
  destination: `/learn/security/${to}`,
  permanent: true,
}));

// Phase3: 詐欺・恐喝・botnet（適切な個別pillarが無いもの）→ Learn ハブへ
const hubRedirects = [
  "silent-ransom-group-in-person-extortion",
  "fifa-world-cup-2026-cyber-fraud",
  "kadnap-edge-proxy-botnet",
].map((slug) => ({
  source: `/learn/security/${slug}`,
  destination: "/learn",
  permanent: true,
}));

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "secutils.vercel.app" }],
        destination: "https://secutils.jp/:path*",
        permanent: true,
      },
      ...consolidatedRedirects,
      ...hubRedirects,
    ];
  },
};

export default nextConfig;
