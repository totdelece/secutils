"use client";

import { useEffect } from "react";
import { markArticleRead } from "@/lib/read-progress";

// 記事ページを開いたら「読んだ」記録を残す（学習パスの進捗に反映）
export function MarkArticleRead({ slug }: { slug: string }) {
  useEffect(() => {
    markArticleRead(slug);
  }, [slug]);
  return null;
}
