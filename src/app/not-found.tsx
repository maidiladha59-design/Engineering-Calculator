import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Alamat yang Anda buka tidak tersedia, sudah dipindahkan, atau masih
        berstatus “Segera Hadir”. Periksa kembali tautannya atau mulai dari
        daftar kalkulator aktif di bawah ini.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/kalkulator"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Semua kalkulator
        </Link>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Kembali ke beranda
        </Link>
        <Link
          href="/artikel"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Baca artikel
        </Link>
      </div>
    </div>
  );
}
