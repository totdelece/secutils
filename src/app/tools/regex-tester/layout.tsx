import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/site";

export const metadata: Metadata = getToolMetadata("regex-tester");

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
