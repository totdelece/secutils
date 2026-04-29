import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/site";

export const metadata: Metadata = getToolMetadata("hash-generator");

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
