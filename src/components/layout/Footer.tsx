import Link from "next/link";
import { Sigma } from "lucide-react";
import { categories } from "@/data/calculators";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-wide text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Sigma className="h-4 w-4" aria-hidden="true" />
            </span>
            Engineering Calculator
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
            Kalkulator teknik online gratis dengan rumus, langkah perhitungan,
            konversi satuan, dan penjelasan variabel yang transparan. Semua
            perhitungan berjalan di browser Anda.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Hasil kalkulator bersifat edukatif dan estimasi, bukan pengganti
            perhitungan resmi dari insinyur atau lembaga berwenang.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Kategori
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/kalkulator/${category.slug}`}
                  className="text-slate-600 transition hover:text-indigo-700"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Navigasi
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/kalkulator"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Semua kalkulator
              </Link>
            </li>
            <li>
              <Link
                href="/kalkulator/matematika"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Kalkulator matematika
              </Link>
            </li>
            <li>
              <Link
                href="/kalkulator/fisika"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Kalkulator fisika
              </Link>
            </li>
            <li>
              <Link
                href="/artikel"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Artikel edukasi
              </Link>
            </li>
            <li>
              <Link
                href="/tentang"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Tentang
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Informasi
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/kontak"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Kontak
              </Link>
            </li>
            <li>
              <Link
                href="/kebijakan-privasi"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Kebijakan privasi
              </Link>
            </li>
            <li>
              <Link
                href="/syarat-ketentuan"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Syarat dan ketentuan
              </Link>
            </li>
            <li>
              <Link
                href="/disclaimer"
                className="text-slate-600 transition hover:text-indigo-700"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Engineering Calculator. Kalkulator teknik gratis.</p>
          <p>Dibuat untuk pelajar, mahasiswa, dan praktisi teknik.</p>
        </div>
      </div>
    </footer>
  );
}
