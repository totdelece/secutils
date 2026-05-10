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
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  const relatedArticles = (article.relatedTools ?? [])
    .flatMap((toolSlug) => getRelatedArticles(toolSlug))
    .filter((item) => item.slug !== article.slug)
    .filter(
      (item, index, array) =>
        array.findIndex((candidate) => candidate.slug === item.slug) === index,
    );

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
      <nav className="mb-7 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-slate-950 dark:hover:text-white">
          Tools
        </Link>
        <span>/</span>
        <Link href="/learn" className="hover:text-slate-950 dark:hover:text-white">
          Learn
        </Link>
        <span>/</span>
        <span>{articleCategoryLabels[article.category]}</span>
      </nav>

      <header className="mb-9">
        <div className="mb-3 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          {articleCategoryLabels[article.category]}
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
          {article.description}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <time dateTime={article.date}>{article.date}</time>
          <span>/</span>
          <span>約{article.readingMinutes}分</span>
        </div>
      </header>

      {article.affiliate && (
        <aside
          role="note"
          aria-label="広告表記"
          className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100"
        >
          <p className="font-bold">この記事には広告リンクが含まれます。</p>
          <p className="mt-2 leading-6">
            リンク経由で申し込みがあった場合、当サイトに紹介料が支払われることがあります。
            比較内容は編集判断に基づき、価格やキャンペーンは記事執筆時点の情報です。
          </p>
        </aside>
      )}

      <article
        className="
          [&_h2]:mt-11 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-slate-950 dark:[&_h2]:text-white
          [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-950 dark:[&_h3]:text-white
          [&_p]:mb-5 [&_p]:text-base [&_p]:leading-8 [&_p]:text-slate-700 dark:[&_p]:text-slate-300
          [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-base [&_ul]:leading-8 [&_ul]:text-slate-700 dark:[&_ul]:text-slate-300
          [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-base [&_ol]:leading-8 [&_ol]:text-slate-700 dark:[&_ol]:text-slate-300
          [&_li]:leading-8
          [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em] dark:[&_code]:bg-white/10
          [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-slate-200 [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-xs [&_pre]:text-slate-100 dark:[&_pre]:border-white/10
          [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[12px]
          [&_strong]:font-bold [&_strong]:text-slate-950 dark:[&_strong]:text-white
          [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:bg-emerald-50 [&_blockquote]:py-3 [&_blockquote]:pl-4 [&_blockquote]:text-slate-700 dark:[&_blockquote]:bg-emerald-400/10 dark:[&_blockquote]:text-slate-200
          [&_a]:text-emerald-700 [&_a]:underline hover:[&_a]:opacity-80 dark:[&_a]:text-emerald-300
          [&_table]:my-5 [&_table]:w-full [&_table]:text-sm
          [&_th]:border-b [&_th]:border-slate-200 [&_th]:px-2 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold dark:[&_th]:border-white/10
          [&_td]:border-b [&_td]:border-slate-100 [&_td]:px-2 [&_td]:py-2 dark:[&_td]:border-white/10
        "
      >
        {children}
      </article>

      {relatedTools.length > 0 && (
        <section className="mt-12 rounded-lg border border-emerald-500/20 bg-emerald-50 p-5 dark:bg-emerald-400/10">
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">
            この記事と一緒に使えるツール
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3 transition hover:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-400"
              >
                <span className="flex h-10 min-w-10 items-center justify-center rounded-md bg-slate-100 px-2 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                  {tool.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-slate-950 dark:text-white">
                    {tool.title}
                  </span>
                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                    {tool.useCase}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">
            関連記事
          </h2>
          <ul className="mt-3 space-y-2">
            {relatedArticles.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/learn/${item.category}/${item.slug}`}
                  className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
                >
                  {item.title}
                </Link>
                <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                  約{item.readingMinutes}分
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 text-sm">
        <Link
          href="/learn"
          className="font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
        >
          Learn の記事一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
