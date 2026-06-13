import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/site";
import { ToolJsonLd } from "@/lib/ld";
import { RelatedArticles } from "@/app/_components/RelatedArticles";

export const metadata: Metadata = getToolMetadata("mock-json-generator");

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd slug="mock-json-generator" />
      {children}
      <RelatedArticles toolSlug="mock-json-generator" />
    </>
  );
}
