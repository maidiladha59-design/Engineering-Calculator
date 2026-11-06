import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SearchBox } from "@/components/search/SearchBox";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getLatestArticles } from "@/data/articles";
import {
  activeCalculatorCount,
  categories,
  getCalculatorsByCategory,
  getCategoryName,
  getLatestCalculators,
  getPopularCalculators,
} from "@/data/calculators";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const popular = getPopularCalculators(6);
  const latest = getLatestCalculators(3);
  const latestArticles = getLatestArticles(3);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: absoluteUrl("/"),
          inLanguage: "id",
          description: SITE_DESCRIPTION,
        }}
      />
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-10 shadow-sm sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-100/70 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {activeCalculatorCount} kalkulator aktif · 100% gratis
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Hitung cepat.
            <span className="block text-indigo-600">Pahami langkahnya.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Kalkulator teknik online untuk matematika, fisika, dan bidang teknik
            lainnya. Setiap hasil disertai rumus, langkah perhitungan dengan angka
            Anda, konversi satuan, dan penjelasan variabel.
          </p>
          <div className="mt-6 max-w-xl">
            <SearchBox
              variant="hero"
              placeholder="Cari: persen, akar, kecepatan, tekanan…"
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Contoh kata kunci:{" "}
            <span className="font-medium text-slate-600">
              diskon, logaritma, momentum, massa jenis
            </span>
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
            <li className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Tanpa login
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Dihitung di browser
            </li>
            <li className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Rumus + langkah lengkap
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Jelajahi kategori
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pilih bidang perhitungan yang Anda butuhkan.
            </p>
          </div>
          <Link
            href="/kalkulator"
            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Semua kalkulator →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const all = getCalculatorsByCategory(category.slug);
            const active = all.filter(
              (calculator) => calculator.status === "active",
            );

            return (
              <Link
                key={category.slug}
                href={`/kalkulator/${category.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <CategoryIcon slug={category.slug} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {active.length} aktif / {all.length} total
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-indigo-600">
                  {category.tagline}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                  Lihat kategori
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ? (
        <AdSlot
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP}
          className="mt-12"
        />
      ) : null}

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Kalkulator populer
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Mulai dari perhitungan yang paling sering dipakai.
            </p>
          </div>
          <Link
            href="/kalkulator"
            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Lihat semua →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((calculator) => (
            <CalculatorCard
              key={`${calculator.category}-${calculator.slug}`}
              calculator={calculator}
              categoryName={getCategoryName(calculator.category)}
              showCategory
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Kalkulator terbaru
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Kalkulator yang baru ditambahkan ke platform.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((calculator) => (
            <CalculatorCard
              key={`${calculator.category}-${calculator.slug}`}
              calculator={calculator}
              categoryName={getCategoryName(calculator.category)}
              showCategory
            />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Artikel edukasi
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Belajar konsep di balik perhitungan
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Rumus, satuan, contoh, dan kesalahan umum yang sering terjadi,
              dijelaskan dalam bahasa yang mudah diikuti.
            </p>
          </div>
          <Link
            href="/artikel"
            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Semua artikel →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <article
              key={article.slug}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-indigo-200 hover:bg-indigo-50/40"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {article.topic}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900">
                <Link
                  href={`/artikel/${article.slug}`}
                  className="rounded transition hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {article.description}
              </p>
              <Link
                href={`/artikel/${article.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition hover:text-indigo-800"
              >
                Baca artikel
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-slate-900 px-5 py-8 text-white sm:px-8 sm:py-10">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          Bukan sekadar hasil
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              01 · Input
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Masukkan angka dengan satuan yang Anda punya. Kalkulator
              mengonversinya ke satuan SI bila diperlukan.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              02 · Hitung
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Rumus ditampilkan dengan KaTeX dan setiap input divalidasi sebelum
              perhitungan dijalankan.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              03 · Pahami
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Lihat langkah dengan angka asli, keterangan variabel, dan contoh
              soal yang dihitung dengan rumus yang sama.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
