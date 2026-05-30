"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";
import { RelatedToolsPanel } from "./RelatedToolsPanel";
import { RelatedArticlesPanel } from "./RelatedArticlesPanel";
import { ToolSeoSection } from "./ToolSeoSection";
import { ToolWorkspaceSidebar } from "./ToolWorkspaceSidebar";

export function ToolChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean)[1] ?? "";
  const tool = tools.find((item) => item.slug === slug);

  return (
    <div className="tool-chrome mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-7 flex items-center gap-2 text-[13px] text-fg-subtle">
        <Link href="/" className="transition hover:text-fg-primary">
          Tools
        </Link>
        <span>/</span>
        <span>{tool?.title ?? "Tool"}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <ToolWorkspaceSidebar slug={slug} />

        <div className="min-w-0">
          <section className="tool-hero relative overflow-hidden rounded-[36px] p-6 sm:p-9 lg:p-10">
            <div className="relative grid gap-8 xl:grid-cols-[1fr_0.42fr] xl:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-sunken/45 px-3 py-1 text-[10px] font-semibold uppercase text-fg-subtle backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_18px_currentColor]" />
                  Browser-native / zero upload
                </div>
                <h1 className="mt-6 max-w-4xl text-[28px] font-bold leading-[1.15] text-fg-primary sm:text-[40px]">
                  {tool?.title ?? "secutils tool"}
                </h1>
                <p className="mt-4 max-w-3xl text-[15px] leading-7 text-fg-muted sm:text-[16px] sm:leading-8">
                  {tool?.description ??
                    "入力データを外へ出さず、ブラウザ内だけで処理する開発者向けツールです。"}
                </p>
              </div>

              <div className="tool-hero-panel rounded-[28px] p-4">
                <div className="mb-4 flex items-center justify-between text-[10px] font-semibold uppercase text-fg-subtle">
                  <span>local pipeline</span>
                  <span className="text-accent">sealed</span>
                </div>
                <div className="tool-pipeline">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Metric label="mode" value="local" />
                  <Metric label="tracking" value="zero" />
                </div>
              </div>
            </div>
          </section>

          <div className="tool-native mt-8">{children}</div>
          <RelatedToolsPanel slug={slug} />
          <RelatedArticlesPanel slug={slug} />
          <ToolSeoSection slug={slug} />
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-sunken/50 px-3 py-3">
      <div className="text-[10px] font-semibold uppercase text-fg-subtle">
        {label}
      </div>
      <div className="mt-1 text-[13px] font-semibold text-fg-primary">
        {value}
      </div>
    </div>
  );
}
