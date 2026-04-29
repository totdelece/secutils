import { ImageResponse } from "next/og";
import { tools } from "./tools";
import { siteName, siteTagline } from "./site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function getOgAlt(slug?: string): string {
  if (!slug) return `${siteName} — ${siteTagline}`;
  const tool = tools.find((t) => t.slug === slug);
  return tool ? `${tool.title} | ${siteName}` : siteName;
}

const COLORS = {
  bgFrom: "#0a0a0a",
  bgTo: "#1c1c1c",
  fg: "#fafafa",
  muted: "#a1a1aa",
  accent: "#10b981",
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, ${COLORS.bgFrom} 0%, ${COLORS.bgTo} 100%)`,
        padding: "60px 70px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: COLORS.fg,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        <span style={{ color: COLORS.accent }}>sec</span>
        <span style={{ color: COLORS.fg }}>utils</span>
      </div>
      {children}
    </div>
  );
}

export function renderRootOg() {
  return new ImageResponse(
    (
      <Frame>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: 28,
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              fontSize: 42,
              color: COLORS.muted,
              lineHeight: 1.3,
              maxWidth: 1000,
            }}
          >
            {siteTagline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 44,
              fontSize: 28,
              color: COLORS.accent,
              fontWeight: 600,
            }}
          >
            🛡 ブラウザ完結 · データ送信なし
          </div>
        </div>
      </Frame>
    ),
    ogImageSize,
  );
}

export function renderToolOg(slug: string) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) {
    throw new Error(`Unknown tool: ${slug}`);
  }
  return new ImageResponse(
    (
      <Frame>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 140,
              lineHeight: 1,
              marginBottom: 28,
            }}
          >
            {tool.icon}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            {tool.title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: COLORS.muted,
              lineHeight: 1.4,
              maxWidth: 1060,
            }}
          >
            {tool.description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 70,
            bottom: 60,
            fontSize: 22,
            color: COLORS.accent,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          🛡 ブラウザ完結
        </div>
      </Frame>
    ),
    ogImageSize,
  );
}
