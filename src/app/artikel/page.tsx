import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Artikel Edukasi Teknik",
  description:
    "Artikel edukasi tentang hukum Ohm, momen gaya, bilangan biner, konversi satuan, suhu, dan volume beton. Penjelasan rumus, contoh, dan kesalahan umum.",
  alternates: {
    canonical: "/artikel",
  },
};

export default function ArticlesPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Artikel" }]} />

      <header className="max-w-2xl">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Artikel edukasi
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Belajar konsep di balik perhitungan
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Setiap artikel membahas rumus, satuan, contoh perhitungan, dan
          kesalahan umum yang sering terjadi. Di bagian akhir, Anda dapat membuka
          kalkulator terkait untuk mencoba angka sendiri.
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {article.topic}
            </p>
            <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-900">
              <Link
                href={`/artikel/${article.slug}`}
                className="rounded transition hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {article.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {article.readingTimeMinutes} menit baca
              </span>
              <Link
                href={`/artikel/${article.slug}`}
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 transition hover:text-indigo-800"
              >
                Baca
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
