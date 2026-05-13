import Link from "next/link";
import { articles, type Article } from "@/lib/articles";

const PATH_SLUGS = [
  "https-tls",
  "owasp-top-10",
  "password-hashing",
  "xss",
  "csrf",
  "jwt-security-issues",
];

function find(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function LearningPath() {
  const steps = PATH_SLUGS.map(find).filter(
    (a): a is Article => Boolean(a),
  );

  if (steps.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Security learning path
            </div>
            <h2 className="mt-2 max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-tight text-fg-primary sm:text-[44px]">
              <span className="text-gradient">基礎から実務まで、</span>
              <br />
              <span className="text-gradient-accent">6 ステップで読む。</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg-muted">
              ネットワークの土台 → Web の脅威 → 認証と暗号 → 実装上の注意点まで、約 40 分で全体像が掴めるカリキュラムです。
            </p>
          </div>
          <Link
            href="/learn"
            className="inline-flex h-10 items-center gap-1.5 self-start rounded-lg border border-border-subtle bg-bg-elevated px-4 text-sm font-medium text-fg-primary transition hover:border-border-strong"
          >
            記事一覧へ
            <Arrow />
          </Link>
        </header>

        <div className="relative">
          <div className="absolute left-0 right-0 top-[34px] hidden h-px lg:block">
            <div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, var(--border-strong) 12%, var(--border-strong) 88%, transparent 100%)",
              }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((article, i) => (
              <Step
                key={article.slug}
                article={article}
                index={i + 1}
                total={steps.length}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center text-[12px] text-fg-subtle">
          <span className="inline-flex items-center gap-2">
            <span className="h-px w-12 bg-border-strong" />
            合計
            <span className="tabular-nums text-fg-secondary">
              {steps.reduce((acc, a) => acc + (a.readingMinutes ?? 5), 0)}
            </span>{" "}
            分で読破
            <span className="h-px w-12 bg-border-strong" />
          </span>
        </div>
      </div>
    </section>
  );
}

function Step({
  article,
  index,
  total,
}: {
  article: Article;
  index: number;
  total: number;
}) {
  return (
    <Link
      href={`/learn/${article.category}/${article.slug}`}
      className="shine-border lift group relative flex flex-col rounded-xl bg-bg-elevated p-4 ring-1 ring-border-subtle"
    >
      <div className="relative flex items-center justify-between">
        <span
          aria-hidden="true"
          className="relative inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-bg-base text-[12px] font-semibold tabular-nums text-fg-secondary ring-1 ring-border-strong"
        >
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-fg-subtle">
          step
        </span>
      </div>
      <div className="mt-3 line-clamp-2 text-[13.5px] font-semibold leading-snug tracking-tight text-fg-primary">
        {article.title}
      </div>
      <p className="mt-1.5 line-clamp-3 flex-1 text-[11.5px] leading-5 text-fg-muted">
        {article.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-[11px]">
        <span className="font-medium text-accent">
          {article.category}
        </span>
        <span className="tabular-nums text-fg-subtle">
          {article.readingMinutes ?? 5} min
        </span>
      </div>
      {index < total && (
        <span
          aria-hidden="true"
          className="absolute right-[-10px] top-[28px] hidden h-px w-[20px] bg-border-strong lg:block"
        />
      )}
    </Link>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}
