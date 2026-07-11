import { getBaseUrl, getToolSeo, siteDescription, siteName } from "./site";
import { author, editorialPolicy } from "./author";
import { tools } from "./tools";
import {
  articleCategoryLabels,
  articles,
  getArticleSeoDescription,
  getArticleSeoTitle,
} from "./articles";
import { articleFaqs } from "./faqs";

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
  const faqs = articleFaqs[slug];
  return (
    <>
      {jsonLdScript({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: getArticleSeoTitle(article),
        description: getArticleSeoDescription(article),
        url,
        inLanguage: "ja",
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        articleSection: articleCategoryLabels[article.category],
        author: {
          "@type": "Person",
          name: author.handle,
          description: author.role,
          url: `${base}${author.profilePath}`,
        },
        publisher: {
          "@type": "Organization",
          name: siteName,
          url: base,
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      })}
      {faqs && faqs.length > 0 &&
        jsonLdScript({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        })}
    </>
  );
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

export function AuthorJsonLd() {
  const base = getBaseUrl();
  const url = `${base}${author.profilePath}`;
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    inLanguage: "ja",
    mainEntity: {
      "@type": "Person",
      name: author.handle,
      jobTitle: author.role,
      description: author.bio,
      knowsAbout: [...author.expertise],
      url,
      sameAs: ["https://github.com/totdelece/secutils"],
      worksFor: {
        "@type": "Organization",
        name: siteName,
        url: base,
      },
    },
    about: {
      "@type": "Person",
      name: author.handle,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: base,
    },
    description: editorialPolicy.summary,
  });
}

/** PR単体レビュー記事用: Product + Review 構造化データ。
    Google の「レビュー スニペット」（検索結果の★表示）と
    「長所と短所」（positiveNotes / negativeNotes）リッチリザルトに対応。
    編集部の単一レビューなので aggregateRating は付けない（実態と一致させる） */
export function PrReviewJsonLd({
  productName,
  reviewTitle,
  description,
  ratingValue,
  pros,
  cons,
}: {
  productName: string;
  reviewTitle: string;
  description?: string;
  /** 5点満点の評価。例: "4.1" */
  ratingValue: string;
  pros?: string[];
  cons?: string[];
}) {
  const base = getBaseUrl();
  const notes = (items?: string[]) =>
    items && items.length > 0
      ? {
          "@type": "ItemList",
          itemListElement: items.map((name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
          })),
        }
      : undefined;
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description,
    review: {
      "@type": "Review",
      name: reviewTitle,
      inLanguage: "ja",
      author: {
        "@type": "Person",
        name: author.handle,
        url: `${base}${author.profilePath}`,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: base,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue,
        bestRating: "5",
        worstRating: "1",
      },
      positiveNotes: notes(pros),
      negativeNotes: notes(cons),
    },
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
