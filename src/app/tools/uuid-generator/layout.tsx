import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/site";

export const metadata: Metadata = getToolMetadata("uuid-generator");

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
