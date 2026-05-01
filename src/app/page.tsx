import { tools } from "@/lib/tools";
import { ToolGrid } from "./_components/ToolGrid";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="mb-10">
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

      <ToolGrid tools={tools} />
    </div>
  );
}
