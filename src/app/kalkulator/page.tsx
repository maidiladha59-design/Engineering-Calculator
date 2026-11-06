import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  calculators,
  categories,
  getCalculatorsByCategory,
} from "@/data/calculators";

export const metadata: Metadata = {
  title: "Semua Kalkulator",
  description:
    "Direktori seluruh kalkulator teknik: matematika, fisika, mekanika, elektro, sipil, matematika komputer, dan konversi satuan, beserta status ketersediaannya.",
  alternates: {
    canonical: "/kalkulator",
  },
};

export default function CalculatorDirectoryPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Kalkulator" }]} />
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Semua kalkulator
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {calculators.length} kalkulator terdaftar dalam {categories.length}{" "}
          kategori. Kalkulator berstatus Segera Hadir belum dapat dibuka.
        </p>
      </header>

      <div className="mt-8 space-y-8">
        {categories.map((category) => {
          const categoryCalculators = getCalculatorsByCategory(category.slug);
          const active = categoryCalculators.filter(
            (calculator) => calculator.status === "active",
          );
          const comingSoon = categoryCalculators.filter(
            (calculator) => calculator.status === "coming-soon",
          );

          return (
            <section key={category.slug}>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {category.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {active.length} aktif, {comingSoon.length} segera hadir
                  </p>
                </div>
                <Link
                  href={`/kalkulator/${category.slug}`}
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                >
                  Buka kategori →
                </Link>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {categoryCalculators.map((calculator) => (
                  <li key={`${category.slug}-${calculator.slug}`}>
                    {calculator.status === "active" ? (
                      <Link
                        href={`/kalkulator/${category.slug}/${calculator.slug}`}
                        className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition hover:border-indigo-200 hover:bg-indigo-50/40"
                      >
                        <span className="font-medium text-slate-800">
                          {calculator.name}
                        </span>
                        <span className="text-xs font-semibold text-indigo-600">
                          Aktif
                        </span>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm">
                        <span className="font-medium text-slate-600">
                          {calculator.name}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          Segera Hadir
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
