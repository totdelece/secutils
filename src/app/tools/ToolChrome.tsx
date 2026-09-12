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
      <nav
        aria-label="パンくずリスト"
        className="mb-7 flex items-center gap-2 text-[13px] text-fg-subtle"
      >
        <Link href="/" className="transition hover:text-fg-primary">
          Tools
        </Link>
        <span>/</span>
        <span>{tool?.title ?? "Tool"}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <ToolWorkspaceSidebar slug={slug} />

        <div className="min-w-0">
          {/* 見出し（h1）と説明文は各ツールの page.tsx が持つ。ここで重ねて出さない */}
          <div className="tool-native">{children}</div>
          {/* ツール固有の解説を先に、回遊用のリンク集を後に置く */}
          <ToolSeoSection slug={slug} />
          <RelatedToolsPanel slug={slug} />
          <RelatedArticlesPanel slug={slug} />
        </div>
      </div>
    </div>
  );
}
