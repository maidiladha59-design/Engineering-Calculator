"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Sigma, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchBox } from "@/components/search/SearchBox";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/kalkulator", label: "Kalkulator" },
  { href: "/kalkulator/matematika", label: "Matematika" },
  { href: "/kalkulator/fisika", label: "Fisika" },
  { href: "/artikel", label: "Artikel" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          aria-label="Engineering Calculator — beranda"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Sigma className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="max-w-[6rem] leading-tight sm:max-w-none">
            <span className="block text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
              Engineering Calculator
            </span>
            <span className="hidden text-[11px] font-medium text-slate-500 sm:block">
              Kalkulator teknik gratis
            </span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href === "/kalkulator"
                  ? pathname === "/kalkulator"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onMouseEnter={() => router.prefetch(link.href)}
                onFocus={() => router.prefetch(link.href)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden w-full max-w-[13rem] md:block xl:max-w-xs">
          <SearchBox variant="navbar" />
        </div>

        <div className="ml-auto flex items-center gap-1.5 md:ml-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen((previous) => !previous);
              setMobileMenuOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label={mobileSearchOpen ? "Tutup pencarian" : "Buka pencarian"}
            aria-expanded={mobileSearchOpen}
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((previous) => !previous);
              setMobileSearchOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileSearchOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <SearchBox variant="navbar" />
        </div>
      ) : null}

      {mobileMenuOpen ? (
        <nav
          className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden"
          aria-label="Navigasi seluler"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
