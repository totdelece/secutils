import { getBaseUrl, getToolSeo, siteDescription, siteName } from "./site";
import { tools } from "./tools";
import {
  articleCategoryLabels,
  articles,
  getArticleSeoDescription,
  getArticleSeoTitle,
} from "./articles";

function jsonLdScript(data: object) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify はクオート/タグ閉じを安全にエスケープ済み（XSSリスクなし）
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function SiteJsonLd() {
  const url = getBaseUrl();
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description: siteDescription,
    url,
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: siteName,
      url,
    },
  });
}

export function ArticleJsonLd({ slug }: { slug: string }) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  const base = getBaseUrl();
  const url = `${base}/learn/${article.category}/${article.slug}`;
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: getArticleSeoTitle(article),
    description: getArticleSeoDescription(article),
    url,
    inLanguage: "ja",
    datePublished: article.date,
    dateModified: article.date,
    articleSection: articleCategoryLabels[article.category],
    author: {
      "@type": "Organization",
      name: siteName,
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: base,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  });
}

export function ArticleFaqJsonLd({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
}

export function ToolJsonLd({ slug }: { slug: string }) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;
  const base = getBaseUrl();
  const url = `${base}/tools/${tool.slug}`;
  const seo = getToolSeo(slug);
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: seo?.title ?? tool.title,
    description: seo?.description ?? tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (Web Browser)",
    url,
    inLanguage: "ja",
    isAccessibleForFree: true,
    browserRequirements: "Requires a modern web browser with JavaScript enabled.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: base,
    },
  });
}
