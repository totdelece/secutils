import { toolSeoContent } from "@/lib/tool-seo";
import { tools } from "@/lib/tools";

export function ToolSeoSection({ slug }: { slug: string }) {
  const content = toolSeoContent[slug];
  const tool = tools.find((item) => item.slug === slug);
  if (!content || !tool) return null;

  return (
    <section className="mt-10 overflow-hidden rounded-[32px] border border-border-subtle bg-bg-surface/72 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.10)] backdrop-blur-xl sm:p-7 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-sunken/55 px-3 py-1 text-[10px] font-semibold uppercase text-fg-subtle">
            Search guide
          </div>
          <h2 className="mt-5 text-[22px] font-bold leading-[1.2] text-fg-primary sm:text-[26px]">
            {content.heading}
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-fg-muted">
            {content.lead}
          </p>
          <div className="mt-6 rounded-[24px] border border-border-subtle bg-bg-sunken/50 p-4">
            <div className="text-[10px] font-semibold uppercase text-fg-subtle">
              Browser-native privacy
            </div>
            <p className="mt-2 text-sm leading-7 text-fg-muted">
              {content.privacy}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {content.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[24px] border border-border-subtle bg-bg-base/55 p-5"
            >
              <h3 className="text-[18px] font-semibold text-fg-primary">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-fg-muted">
                {section.body}
              </p>
            </article>
          ))}

          <div className="rounded-[24px] border border-border-subtle bg-bg-base/55 p-5">
            <h3 className="text-[18px] font-semibold text-fg-primary">
              {tool.title} でできること
            </h3>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-fg-muted sm:grid-cols-3">
              {content.bullets.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border-subtle bg-bg-sunken/45 px-3 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
