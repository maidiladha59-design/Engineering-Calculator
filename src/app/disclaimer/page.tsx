import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer Engineering Calculator: hasil perhitungan bersifat edukatif dan estimasi, bukan pengganti analisis insinyur profesional atau standar teknis resmi.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Batasan penggunaan hasil perhitungan dan tanggung jawab pengguna."
      updatedAt="6 November 2026"
    >
      <h2 className="text-lg font-bold text-slate-900">
        Hasil bersifat estimasi
      </h2>
      <p>
        Semua kalkulator di situs ini menghasilkan angka berdasarkan rumus dan
        input yang Anda masukkan. Hasil tersebut bersifat edukatif dan estimasi,
        bukan hasil analisis teknik resmi. Pembulatan, asumsi rumus, dan
        kesederhanaan model dapat menyebabkan perbedaan dengan kondisi nyata.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Bukan pengganti insinyur
      </h2>
      <p>
        Perhitungan struktur, instalasi listrik, campuran material, dan
        keputusan konstruksi memerlukan pertimbangan standar teknis, kondisi
        lapangan, faktor keselamatan, serta tanggung jawab profesional. Selalu
        verifikasi hasil dengan insinyur berwenang dan standar yang berlaku
        sebelum digunakan untuk pekerjaan nyata.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Keselamatan dan keputusan penting
      </h2>
      <p>
        Jangan menggunakan situs ini sebagai satu-satunya dasar untuk keputusan
        yang menyangkut keselamatan jiwa, keselamatan bangunan, atau kepatuhan
        regulasi. Untuk kondisi tersebut, gunakan perhitungan tersertifikasi dan
        pengawasan ahli.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Ketepatan dan pembaruan
      </h2>
      <p>
        Kami berupaya menyajikan rumus dan validasi yang benar, tetapi tidak
        menjamin situs bebas dari kesalahan. Jika Anda menemukan hasil yang
        janggal, periksa kembali satuan dan input, lalu laporkan melalui halaman{" "}
        <Link
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          href="/kontak"
        >
          kontak
        </Link>{" "}
        agar dapat diperbaiki.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Tautan eksternal</h2>
      <p>
        Tautan ke situs lain disediakan untuk kemudahan. Kami tidak bertanggung
        jawab atas isi, keakuratan, atau kebijakan situs pihak ketiga.
      </p>

      <p>
        Ketentuan penggunaan secara lengkap tersedia di{" "}
        <Link
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          href="/syarat-ketentuan"
        >
          syarat dan ketentuan
        </Link>
        .
      </p>
    </LegalPage>
  );
}
