import Link from "next/link";

export function HomeHero({
  toolCount,
  articleCount,
}: {
  toolCount: number;
  articleCount: number;
}) {
  return (
    <section className="border-b border-border-subtle bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-base px-3 py-1 text-xs font-medium text-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          ブラウザ完結 · 登録不要 · 完全無料
        </span>

        <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-fg-primary sm:text-5xl">
          エンジニアのための
          <br className="hidden sm:block" />
          セキュリティ &amp; 開発ツール集
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-fg-muted sm:text-lg sm:leading-8">
          JWT デコード、ハッシュ計算、パスワード生成、JSON 整形、正規表現テストなど
          <strong className="font-semibold text-fg-secondary">
            {" "}
            {toolCount} 種類
          </strong>
          のツールを、すべてブラウザ内で実行。入力したデータはサーバーに送信されません。
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#tools"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-fg-primary px-6 text-sm font-semibold text-bg-base transition hover:opacity-90"
          >
            ツールを探す
            <ArrowIcon />
          </a>
          <Link
            href="/learn"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border-strong bg-bg-base px-6 text-sm font-semibold text-fg-primary transition hover:bg-bg-sunken"
          >
            解説記事を読む（{articleCount} 本）
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-fg-muted">
          <li className="inline-flex items-center gap-2">
            <CheckIcon />
            全処理がブラウザ内で完結
          </li>
          <li className="inline-flex items-center gap-2">
            <CheckIcon />
            データのサーバー送信なし
          </li>
          <li className="inline-flex items-center gap-2">
            <CheckIcon />
            インストール・登録不要
          </li>
        </ul>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
