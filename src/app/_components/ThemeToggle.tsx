"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Ignore storage failures in restricted browsing modes.
    }
    window.dispatchEvent(new StorageEvent("storage", { key: "theme" }));
  }

  return (
    <button
      onClick={toggle}
      aria-label={
        theme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え"
      }
      title={theme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
