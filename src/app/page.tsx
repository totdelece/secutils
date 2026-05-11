import Link from "next/link";
import { articles } from "@/lib/articles";
import { tools } from "@/lib/tools";
import { ToolGrid } from "./_components/ToolGrid";

const featuredSlugs = [
  "password-generator",
  "jwt-decoder",
  "json-formatter",
  "cidr-calculator",
];

export default function Home() {
  const featuredTools = featuredSlugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            すべてブラウザ内で処理
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            セキュリティと開発作業を、迷わず片付ける。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
            secutils は、JWT解析、ハッシュ計算、JSON整形、CIDR計算などをまとめた
            開発者向けツール集です。入力したパスワード、トークン、設定値はサーバーへ送信せず、
            手元のブラウザで処理します。
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#tools"
              className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              ツールを探す
            </a>
            <Link
              href="/learn"
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white/70 px-5 text-sm font-semibold text-slate-900 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-emerald-400"
            >
              基礎記事を読む
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-950 dark:text-white">
              よく使われる入口
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {tools.length} tools
            </span>
          </div>
          <div className="grid gap-3">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex items-start gap-3 rounded-md border border-slate-200 p-3 transition hover:border-emerald-500 hover:bg-emerald-50/60 dark:border-white/10 dark:hover:border-emerald-400 dark:hover:bg-emerald-400/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                  {tool.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                    {tool.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {tool.useCase}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          ["Privacy first", "入力データはサーバーに送信しない設計"],
          ["Fast utility", "検索、カテゴリ、用途からすぐ見つかる"],
          ["Learn linked", `${articles.length}本の記事から背景知識も確認`],
        ].map(([title, text]) => (
          <div
            key={title}
            className="rounded-lg border border-slate-200 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="text-sm font-bold text-slate-950 dark:text-white">
              {title}
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {text}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-emerald-200 bg-white p-5 shadow-sm dark:border-emerald-400/30 dark:bg-white/[0.04] sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Server comparison
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              初心者向けレンタルサーバー比較
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              エックスサーバーとConoHa WINGを、無料お試し、WordPressの始めやすさ、更新料金の確認ポイントから整理しています。
            </p>
          </div>
          <Link
            href="/learn/network/xserver-vs-conoha-wing"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            サーバー比較を見る
          </Link>
        </div>
      </section>

      <section id="tools" className="mt-12 scroll-mt-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              ツール一覧
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              やりたい作業名、技術名、用途で検索できます。
            </p>
          </div>
        </div>
        <ToolGrid tools={tools} />
      </section>
    </div>
  );
}
