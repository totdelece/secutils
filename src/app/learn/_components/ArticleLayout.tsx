import Link from "next/link";
import {
  articleCategoryLabels,
  type Article,
  getRelatedArticles,
} from "@/lib/articles";
import { tools } from "@/lib/tools";

export function ArticleLayout({
  article,
  children,
}: {
  article: Article;
  children: React.ReactNode;
}) {
  const relatedTools = (article.relatedTools ?? [])
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  // 同じツールに紐づく他の記事
  const relatedArticles = (article.relatedTools ?? [])
    .flatMap((toolSlug) => getRelatedArticles(toolSlug))
    .filter((a) => a.slug !== article.slug)
    // dedupe
    .filter(
      (a, idx, arr) => arr.findIndex((b) => b.slug === a.slug) === idx,
    );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-black/50 dark:text-white/50 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-foreground">
          Tools
        </Link>
        <span>·</span>
        <Link href="/learn" className="hover:text-foreground">
          Learn
        </Link>
        <span>·</span>
        <span className="text-black/40 dark:text-white/40">
          {articleCategoryLabels[article.category]}
        </span>
      </nav>

      <header className="mb-8">
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
          📖 {articleCategoryLabels[article.category]}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 leading-snug">
          {article.title}
        </h1>
        <p className="text-base text-black/60 dark:text-white/60 leading-relaxed">
          {article.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-black/40 dark:text-white/40 mt-4 font-mono">
          <time dateTime={article.date}>{article.date}</time>
          <span>·</span>
          <span>約 {article.readingMinutes} 分</span>
        </div>
      </header>

      <article
        className="
          [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:tracking-tight [&_h2]:scroll-mt-20
          [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2
          [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base [&_p]:mb-4 [&_p]:text-black/80 dark:[&_p]:text-white/80
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:mb-4 [&_ul]:text-sm sm:[&_ul]:text-base [&_ul]:text-black/80 dark:[&_ul]:text-white/80
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_ol]:mb-4 [&_ol]:text-sm sm:[&_ol]:text-base [&_ol]:text-black/80 dark:[&_ol]:text-white/80
          [&_li]:leading-relaxed
          [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:bg-black/5 dark:[&_code]:bg-white/10 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5
          [&_pre]:bg-black/5 dark:[&_pre]:bg-white/5 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:my-4 [&_pre]:border [&_pre]:border-black/5 dark:[&_pre]:border-white/10
          [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[12px]
          [&_strong]:font-bold [&_strong]:text-foreground
          [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500/50 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-4 [&_blockquote]:text-black/70 dark:[&_blockquote]:text-white/70 [&_blockquote]:italic
          [&_a]:underline [&_a]:text-emerald-600 dark:[&_a]:text-emerald-400 hover:[&_a]:opacity-80
          [&_table]:w-full [&_table]:my-4 [&_table]:text-sm
          [&_th]:text-left [&_th]:py-2 [&_th]:px-2 [&_th]:border-b [&_th]:border-black/10 dark:[&_th]:border-white/10 [&_th]:font-semibold
          [&_td]:py-2 [&_td]:px-2 [&_td]:border-b [&_td]:border-black/5 dark:[&_td]:border-white/5
        "
      >
        {children}
      </article>

      {relatedTools.length > 0 && (
        <section className="mt-12 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
          <h3 className="font-semibold mb-3 text-sm">
            🛠 この記事と一緒に使うツール
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-lg border border-black/10 dark:border-white/10 bg-background p-3 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition flex items-center gap-3"
              >
                <span className="text-2xl">{tool.icon}</span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {tool.title}
                  </div>
                  <div className="text-xs text-black/50 dark:text-white/50">
                    使ってみる →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="mt-8 rounded-lg border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-3 text-sm">📖 関連する記事</h3>
          <ul className="space-y-2">
            {relatedArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/learn/${a.category}/${a.slug}`}
                  className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {a.title}
                </Link>
                <span className="text-xs text-black/40 dark:text-white/40 ml-2">
                  · 約 {a.readingMinutes} 分
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 text-sm">
        <Link
          href="/learn"
          className="text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          ← Learn の他の記事を見る
        </Link>
      </div>
    </div>
  );
}
