import Link from "next/link";
import { articleCategoryLabels } from "@/lib/articles";
import { getToolArticles } from "@/lib/tool-workspace";

export function RelatedArticlesPanel({ slug }: { slug: string }) {
  const list = getToolArticles(slug, 4);
  if (list.length === 0) return null;

  return (
    <section className="mt-8 rounded-[30px] border border-border-subtle bg-bg-elevated/68 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Learn
          </div>
          <h2 className="mt-2 text-[24px] font-semibold text-fg-primary">
            このツールに関連する解説記事
          </h2>
        </div>
        <Link
          href="/learn"
          className="text-sm font-semibold text-accent transition hover:underline"
        >
          すべての記事 →
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {list.map((article) => (
          <Link
            key={article.slug}
            href={`/learn/${article.category}/${article.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-border-subtle bg-bg-sunken/38 p-4 transition hover:-translate-y-0.5 hover:border-border-strong hover:bg-bg-elevated/70"
          >
            <div className="flex items-center gap-2 text-[11px] text-fg-subtle">
              <span className="rounded-md border border-border-subtle bg-bg-base/60 px-1.5 py-0.5 font-semibold text-fg-muted">
                {articleCategoryLabels[article.category]}
              </span>
              <span>約{article.readingMinutes}分</span>
            </div>
            <span className="text-sm font-bold leading-snug text-fg-primary transition group-hover:text-accent">
              {article.title}
            </span>
            <span className="line-clamp-2 text-[12.5px] leading-6 text-fg-muted">
              {article.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
