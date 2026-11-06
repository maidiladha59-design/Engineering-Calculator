import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
import {
  categories,
  getActiveCalculatorsByCategory,
  getCalculatorsByCategory,
  getCategory,
} from "@/data/calculators";

type CategoryPageProps = {
  params: { kategori: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ kategori: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { kategori } = params;
  const category = getCategory(kategori);

  if (!category) {
    return { title: "Kategori tidak ditemukan" };
  }

  const active = getActiveCalculatorsByCategory(kategori);

  return {
    title: `${category.name} — ${active.length} Kalkulator Aktif`,
    description: category.description,
    keywords: [category.name, "kalkulator", ...active.map((item) => item.name)],
    alternates: {
      canonical: `/kalkulator/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { kategori } = params;
  const category = getCategory(kategori);

  if (!category) {
    notFound();
  }

  const allCalculators = getCalculatorsByCategory(kategori);
  const activeCalculators = allCalculators.filter(
    (calculator) => calculator.status === "active",
  );
  const comingSoon = allCalculators.filter(
    (calculator) => calculator.status === "coming-soon",
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Kalkulator", href: "/kalkulator" },
          { label: category.name },
        ]}
      />

      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Kategori · {category.tagline}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Kalkulator {category.name}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              {category.description}
            </p>
          </div>
          <div className="flex gap-2 text-center">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2">
              <p className="text-xl font-bold text-emerald-700">
                {activeCalculators.length}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
                Aktif
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
              <p className="text-xl font-bold text-slate-600">
                {comingSoon.length}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Segera
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Kalkulator aktif
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Pilih kalkulator untuk mulai menghitung dengan langkah lengkap.
        </p>

        {activeCalculators.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-base font-semibold text-slate-800">
              Belum ada kalkulator aktif di kategori ini
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
              Kalkulator {category.name} sedang disiapkan. Sementara itu, Anda
              dapat menjelajah kategori lain yang sudah aktif.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/kalkulator"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Lihat semua kalkulator
              </Link>
              <Link
                href="/kalkulator/matematika"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Kalkulator Matematika
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeCalculators.map((calculator) => (
              <CalculatorCard
                key={calculator.slug}
                calculator={calculator}
                categoryName={category.name}
              />
            ))}
          </div>
        )}
      </section>

      {comingSoon.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Segera hadir
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Kalkulator ini sudah direncanakan, tetapi belum dapat dibuka.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((calculator) => (
              <CalculatorCard
                key={calculator.slug}
                calculator={calculator}
                categoryName={category.name}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
