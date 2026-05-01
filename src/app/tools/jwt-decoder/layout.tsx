import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/site";
import { ToolJsonLd } from "@/lib/ld";

export const metadata: Metadata = getToolMetadata("jwt-decoder");

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd slug="jwt-decoder" />
      {children}
    </>
  );
}
