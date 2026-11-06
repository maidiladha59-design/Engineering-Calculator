"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const current =
      document.documentElement.dataset.theme === "dark" || stored === "dark"
        ? "dark"
        : "light";
    setTheme(current);
    setMounted(true);
  }, []);

  function applyTheme(nextTheme: Theme) {
    const root = document.documentElement;
    root.classList.toggle("dark", nextTheme === "dark");
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        className,
      )}
      aria-label={mounted && isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      aria-pressed={mounted ? isDark : undefined}
      title={mounted && isDark ? "Mode terang" : "Mode gelap"}
    >
      {mounted && isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
