import { ImageResponse } from "next/og";
import { tools } from "./tools";
import { siteName, siteTagline } from "./site";
import { articleCategoryLabels, articles } from "./articles";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function getOgAlt(slug?: string): string {
  if (!slug) return `${siteName} — ${siteTagline}`;
  const tool = tools.find((t) => t.slug === slug);
  return tool ? `${tool.title} | ${siteName}` : siteName;
}

export function getArticleOgAlt(slug: string): string {
  const article = articles.find((a) => a.slug === slug);
  return article ? `${article.title} | ${siteName}` : siteName;
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

export function renderArticleOg(slug: string) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    throw new Error(`Unknown article: ${slug}`);
  }
  const categoryLabel = articleCategoryLabels[article.category];
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
              fontSize: 22,
              color: COLORS.accent,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            📖 LEARN · {categoryLabel}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 28,
            }}
          >
            {article.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: COLORS.muted,
              lineHeight: 1.45,
              maxWidth: 1060,
            }}
          >
            {article.description.length > 140
              ? article.description.slice(0, 140) + "…"
              : article.description}
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
          🛡 secutils
        </div>
      </Frame>
    ),
    ogImageSize,
  );
}

export function renderServerComparisonOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #eef6ff 0%, #ffffff 50%, #fff7ed 100%)",
          padding: "48px 58px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#0f172a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -130,
            top: -150,
            width: 430,
            height: 430,
            borderRadius: 430,
            background: "rgba(37, 99, 235, 0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -120,
            bottom: -160,
            width: 400,
            height: 400,
            borderRadius: 400,
            background: "rgba(249, 115, 22, 0.14)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            <span style={{ color: "#059669" }}>sec</span>
            <span>utils</span>
            <span
              style={{
                fontSize: 18,
                color: "#64748b",
                fontWeight: 700,
                marginLeft: 4,
              }}
            >
              レンタルサーバー比較
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 999,
              background: "#ffffff",
              border: "1px solid #dbeafe",
              padding: "10px 18px",
              color: "#1d4ed8",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            PR / 2026年版
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 30,
            }}
          >
            <ServicePill label="Xserver" color="#059669" bg="#ecfdf5" />
            <div
              style={{
                color: "#94a3b8",
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              vs
            </div>
            <ServicePill label="ConoHa WING" color="#ea580c" bg="#fff7ed" />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontSize: 70,
              lineHeight: 1.08,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            <div>迷ったらXserver。</div>
            <div style={{ color: "#1d4ed8" }}>
              すぐブログ開始ならConoHa WING。
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              gap: 14,
            }}
          >
            <DecisionCard
              title="無料で試して判断"
              service="Xserver"
              color="#059669"
              bg="#ecfdf5"
            />
            <DecisionCard
              title="WordPressを早く始める"
              service="ConoHa WING"
              color="#ea580c"
              bg="#fff7ed"
            />
            <DecisionCard
              title="料金と更新条件を確認"
              service="公式サイトで比較"
              color="#2563eb"
              bg="#eff6ff"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#64748b",
            fontSize: 21,
            fontWeight: 700,
          }}
        >
          <div>料金・無料お試し・WordPressの始めやすさ・サポートを整理</div>
          <div>secutils.dev</div>
        </div>
      </div>
    ),
    ogImageSize,
  );
}

function ServicePill({
  label,
  color,
  bg,
}: {
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: 18,
        background: bg,
        border: `2px solid ${color}`,
        color,
        padding: "16px 24px",
        fontSize: 34,
        fontWeight: 900,
      }}
    >
      {label}
    </div>
  );
}

function DecisionCard({
  title,
  service,
  color,
  bg,
}: {
  title: string;
  service: string;
  color: string;
  bg: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 315,
        borderRadius: 18,
        background: "#ffffff",
        border: "1px solid #dbe3ef",
        padding: "18px 20px",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#64748b",
          fontSize: 18,
          fontWeight: 800,
          marginBottom: 9,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          borderRadius: 999,
          background: bg,
          color,
          padding: "8px 14px",
          fontSize: 21,
          fontWeight: 900,
        }}
      >
        {service}
      </div>
    </div>
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
