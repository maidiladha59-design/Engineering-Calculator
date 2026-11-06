"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { calculators, categories } from "@/data/calculators";
import { cn } from "@/lib/cn";
import { searchCalculators } from "@/lib/search";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function SearchBox({
  variant = "navbar",
  placeholder,
}: {
  variant?: "navbar" | "hero";
  placeholder?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const results = useMemo(
    () => searchCalculators(query, calculators, categories, 8),
    [query],
  );

  const navigableResults = useMemo(
    () => results.filter((item) => item.calculator.status === "active"),
    [results],
  );

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    setActiveSlug(navigableResults[0]?.calculator.slug ?? null);
  }, [navigableResults]);

  function goToResult(slug: string) {
    const result = results.find((item) => item.calculator.slug === slug);

    if (!result || result.calculator.status !== "active") {
      return;
    }

    setOpen(false);
    setQuery("");
    router.push(`/kalkulator/${result.calculator.category}/${result.calculator.slug}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (activeSlug) {
      goToResult(activeSlug);
    }
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (navigableResults.length === 0) {
        return;
      }

      const currentIndex = navigableResults.findIndex(
        (item) => item.calculator.slug === activeSlug,
      );
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + direction + navigableResults.length) %
        navigableResults.length;

      setActiveSlug(navigableResults[nextIndex].calculator.slug);
      setOpen(true);
      return;
    }

    if (event.key === "Enter" && activeSlug) {
      event.preventDefault();
      goToResult(activeSlug);
    }
  }

  const isHero = variant === "hero";
  const showPanel = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} role="search" className="relative">
        <label htmlFor={`${listId}-input`} className="sr-only">
          Cari kalkulator
        </label>
        <Search
          className={cn(
            "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400",
            isHero ? "h-5 w-5" : "h-4 w-4",
          )}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={`${listId}-input`}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "Cari kalkulator, kategori, atau kata kunci…"}
          autoComplete="off"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={`${listId}-results`}
          aria-autocomplete="list"
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white pl-10 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100",
            isHero ? "h-14 pr-4 text-base" : "h-10 pr-3 text-sm",
          )}
        />
      </form>

      {showPanel ? (
        <div
          className={cn(
            "absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl",
            isHero ? "max-h-[22rem]" : "max-h-80",
          )}
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <p className="text-sm font-semibold text-slate-800">
                Tidak ditemukan
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Tidak ada kalkulator yang cocok dengan “{query.trim()}”. Coba kata
                kunci lain, misalnya “gaya”, “persen”, atau “akar”.
              </p>
            </div>
          ) : (
            <ul
              id={`${listId}-results`}
              className={cn("overflow-y-auto", isHero ? "max-h-[22rem]" : "max-h-80")}
              role="list"
            >
              {results.map(({ calculator, categoryName }) => {
                const isActive = calculator.status === "active";
                const isHighlighted =
                  isActive && calculator.slug === activeSlug;

                const content = (
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {calculator.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {categoryName} · {calculator.description}
                      </p>
                    </div>
                    <StatusBadge status={calculator.status} />
                  </div>
                );

                return (
                  <li key={`${calculator.category}-${calculator.slug}`}>
                    {isActive ? (
                      <Link
                        href={`/kalkulator/${calculator.category}/${calculator.slug}`}
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                        onMouseEnter={() => setActiveSlug(calculator.slug)}
                        className={cn(
                          "block border-b border-slate-100 px-4 py-3 transition last:border-0",
                          isHighlighted
                            ? "bg-indigo-50"
                            : "hover:bg-slate-50",
                        )}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div
                        aria-disabled="true"
                        className="cursor-not-allowed border-b border-slate-100 px-4 py-3 opacity-70 last:border-0"
                      >
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
