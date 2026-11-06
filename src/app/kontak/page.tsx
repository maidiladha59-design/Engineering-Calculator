import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Engineering Calculator untuk pertanyaan, koreksi hasil perhitungan, atau usulan kalkulator baru.",
  alternates: {
    canonical: "/kontak",
  },
};

export default function ContactPage() {
  return (
    <LegalPage
      title="Kontak"
      description="Sampaikan pertanyaan, koreksi, atau usulan kalkulator baru kepada tim Engineering Calculator."
      updatedAt="6 November 2026"
    >
      <h2 className="text-lg font-bold text-slate-900">Email</h2>
      {CONTACT_EMAIL ? (
        <p>
          Kirim pesan ke{" "}
          <a
            className="font-semibold text-indigo-600 hover:text-indigo-800"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
          . Kami biasanya membalas dalam beberapa hari kerja.
        </p>
      ) : (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          Alamat email kontak belum dikonfigurasi. Pemilik situs dapat
          mengisinya melalui variabel lingkungan{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">
            NEXT_PUBLIC_CONTACT_EMAIL
          </code>
          .
        </p>
      )}

      <h2 className="text-lg font-bold text-slate-900">
        Agar laporan cepat ditindaklanjuti
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Sertakan tautan halaman kalkulator yang bermasalah.</li>
        <li>Tuliskan nilai input dan satuan yang Anda gunakan.</li>
        <li>Jelaskan hasil yang Anda harapkan beserta sumber rumusnya.</li>
        <li>
          Untuk kesalahan tampilan, sebutkan perangkat, browser, dan lebar layar
          bila memungkinkan.
        </li>
      </ul>

      <h2 className="text-lg font-bold text-slate-900">Yang tidak kami proses</h2>
      <p>
        Kami tidak meminta dan tidak menampung data pribadi sensitif. Jangan
        mengirimkan kata sandi, nomor identitas, atau dokumen rahasia melalui
        email kontak. Perhitungan kalkulator tidak memerlukan data tersebut
        karena seluruh proses berjalan di browser Anda.
      </p>

      <p>
        Sebelum mengirim pertanyaan, periksa bagian “Kesalahan umum” dan
        “Pertanyaan umum” pada halaman kalkulator terkait, karena banyak
        kekeliruan sudah dijelaskan di sana. Informasi tentang pengelolaan data
        tersedia di{" "}
        <Link
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          href="/kebijakan-privasi"
        >
          kebijakan privasi
        </Link>
        .
      </p>
    </LegalPage>
  );
}
