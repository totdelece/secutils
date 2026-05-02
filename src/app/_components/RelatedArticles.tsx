import Link from "next/link";
import { articleCategoryLabels, getRelatedArticles } from "@/lib/articles";

export function RelatedArticles({ toolSlug }: { toolSlug: string }) {
  const list = getRelatedArticles(toolSlug);
  if (list.length === 0) return null;
  return (
    <div className="mx-auto max-w-3xl px-6 pb-12">
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
        <h3 className="text-sm font-semibold mb-3">📖 関連する解説記事</h3>
        <ul className="space-y-2">
          {list.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/learn/${a.category}/${a.slug}`}
                className="text-sm text-emerald-700 dark:text-emerald-300 hover:underline"
              >
                {a.title}
              </Link>
              <span className="text-xs text-black/40 dark:text-white/40 ml-2">
                · 約 {a.readingMinutes} 分 ·{" "}
                {articleCategoryLabels[a.category]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
