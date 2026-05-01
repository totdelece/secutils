"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage が使えない（プライベートブラウジング等）場合は無視
    }
    setTheme(next);
  };

  // SSR時はサイズだけ確保して非表示（FOUC + hydration mismatch防止）
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-block w-8 h-8 rounded border border-transparent"
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={
        theme === "dark" ? "ライトモードに切替" : "ダークモードに切替"
      }
      title={theme === "dark" ? "ライトモードに切替" : "ダークモードに切替"}
      className="w-8 h-8 rounded border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-center text-sm leading-none"
    >
      <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
