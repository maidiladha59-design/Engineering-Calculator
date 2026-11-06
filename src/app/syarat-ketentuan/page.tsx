import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan Engineering Calculator, termasuk batasan penggunaan, kekayaan intelektual, dan tanggung jawab pengguna.",
  alternates: {
    canonical: "/syarat-ketentuan",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Syarat dan Ketentuan"
      description="Aturan penggunaan situs dan kalkulator Engineering Calculator."
      updatedAt="6 November 2026"
    >
      <h2 className="text-lg font-bold text-slate-900">Penerimaan syarat</h2>
      <p>
        Dengan mengakses dan menggunakan Engineering Calculator, Anda setuju
        untuk mematuhi syarat dan ketentuan ini. Jika tidak setuju, silakan
        berhenti menggunakan situs.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Tujuan edukatif</h2>
      <p>
        Kalkulator dan artikel di situs ini disediakan untuk tujuan edukasi,
        estimasi cepat, dan pemeriksaan mandiri. Hasil perhitungan bukan
        pengganti analisis teknik resmi, perhitungan struktur bersertifikat,
        atau konsultasi dengan insinyur profesional.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Tanggung jawab pengguna
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Anda bertanggung jawab memeriksa satuan, input, dan kewajaran hasil
          sebelum mengambil keputusan.
        </li>
        <li>
          Untuk pekerjaan yang menyangkut keselamatan, gunakan standar teknis
          yang berlaku dan libatkan tenaga ahli berwenang.
        </li>
        <li>
          Anda tidak boleh menggunakan situs untuk kegiatan melanggar hukum,
          menyebarkan malware, atau mengganggu layanan.
        </li>
      </ul>

      <h2 className="text-lg font-bold text-slate-900">Ketersediaan layanan</h2>
      <p>
        Kami berupaya menjaga situs tetap tersedia dan akurat, tetapi tidak
        menjamin layanan bebas gangguan atau bebas kesalahan. Fitur dapat
        diubah, ditambah, atau dihentikan tanpa pemberitahuan sebelumnya.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Kekayaan intelektual
      </h2>
      <p>
        Teks, rumus, tata letak, dan kode situs dilindungi hukum yang berlaku.
        Anda boleh menggunakan hasil perhitungan untuk keperluan pribadi,
        pendidikan, atau pekerjaan, tetapi tidak boleh menyalin seluruh konten
        situs untuk diterbitkan ulang tanpa izin tertulis.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Tautan dan layanan pihak ketiga
      </h2>
      <p>
        Situs dapat menampilkan iklan atau tautan ke layanan lain. Kami tidak
        mengendalikan dan tidak bertanggung jawab atas konten, kebijakan, atau
        praktik pihak ketiga tersebut. Kunjungan ke situs pihak ketiga tunduk
        pada syarat mereka sendiri.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Batasan tanggung jawab</h2>
      <p>
        Sejauh diizinkan hukum, kami tidak bertanggung jawab atas kerugian
        langsung atau tidak langsung yang timbul dari penggunaan situs atau
        ketergantungan pada hasil perhitungan. Baca{" "}
        <Link
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          href="/disclaimer"
        >
          disclaimer
        </Link>{" "}
        untuk penjelasan lebih lanjut.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Perubahan syarat</h2>
      <p>
        Syarat ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu
        ditampilkan di halaman ini dengan tanggal pembaruan. Penggunaan situs
        setelah perubahan berarti Anda menerima syarat yang diperbarui.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Hukum yang berlaku</h2>
      <p>
        Syarat ini ditafsirkan sesuai hukum yang berlaku di Indonesia. Setiap
        perselisihan diupayakan diselesaikan secara musyawarah terlebih dahulu.
      </p>
    </LegalPage>
  );
}
