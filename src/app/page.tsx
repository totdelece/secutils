import Link from "next/link";
import { tools, categoryLabels, type ToolCategory } from "@/lib/tools";

export default function Home() {
  const grouped = tools.reduce<Record<ToolCategory, typeof tools>>(
    (acc, tool) => {
      (acc[tool.category] ||= []).push(tool);
      return acc;
    },
    {} as Record<ToolCategory, typeof tools>,
  );

  const orderedCategories: ToolCategory[] = [
    "security",
    "encoding",
    "network",
    "misc",
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          エンジニアのための
          <br className="sm:hidden" />
          <span className="text-emerald-600 dark:text-emerald-400">
            セキュリティ＆ユーティリティ
          </span>
          ツール集
        </h1>
        <p className="mt-4 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-2xl">
          パスワード生成、ハッシュ、エンコード、ネットワーク調査……
          エンジニアの日常を高速化する小さなツールを集めました。すべてブラウザ完結、データは送信されません。
        </p>
      </section>

      {orderedCategories.map((cat) => {
        const list = grouped[cat];
        if (!list?.length) return null;
        return (
          <section key={cat} className="mb-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-black/50 dark:text-white/50 mb-4">
              {categoryLabels[cat]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition"
                >
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <div className="font-semibold mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {tool.title}
                  </div>
                  <div className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                    {tool.description}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
