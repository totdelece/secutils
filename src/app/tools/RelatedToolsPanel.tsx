import Link from "next/link";
import { getRelatedTools, getToolGuideLinks } from "@/lib/tool-workspace";

export function RelatedToolsPanel({ slug }: { slug: string }) {
  const related = getRelatedTools(slug);
  const guides = getToolGuideLinks(slug);
  if (related.length === 0 && guides.length === 0) return null;

  return (
    <section className="mt-10 rounded-[30px] border border-border-subtle bg-bg-elevated/68 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Next workflow
          </div>
          <h2 className="mt-2 text-[24px] font-semibold text-fg-primary">
            次に使うツール
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-fg-muted">
          作業の流れに近いツールへすぐ移動できます。
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {related.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group rounded-2xl border border-border-subtle bg-bg-sunken/38 p-4 transition hover:-translate-y-0.5 hover:border-border-strong hover:bg-bg-elevated/70"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 min-w-10 items-center justify-center rounded-2xl border border-border-subtle bg-bg-base px-2 text-xs font-bold text-fg-primary">
                  {tool.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-fg-primary">
                    {tool.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-fg-muted">
                    {tool.useCase}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {guides.length > 0 && (
        <div className="mt-5 border-t border-border-subtle pt-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
            Related guides
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-2xl border border-border-subtle bg-bg-sunken/32 px-4 py-3 text-sm font-semibold text-fg-muted transition hover:border-border-strong hover:text-fg-primary"
              >
                {guide.title}
                <span className="ml-2 text-xs font-normal text-fg-subtle">
                  {guide.meta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
