// 学習進捗（どの記事を読んだか）をブラウザの localStorage に保持する。
// サーバーには一切送信しない（プライバシー設計に準拠）。

export const READ_ARTICLES_KEY = "secutils:read-articles";

export function getReadSlugs(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(READ_ARTICLES_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

export function markArticleRead(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const set = getReadSlugs();
    if (set.has(slug)) return;
    set.add(slug);
    window.localStorage.setItem(READ_ARTICLES_KEY, JSON.stringify([...set]));
  } catch {
    // localStorage 不可（プライベートモード等）の場合は無視
  }
}
