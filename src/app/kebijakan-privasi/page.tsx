import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi Engineering Calculator: perhitungan berjalan di browser, penggunaan penyimpanan lokal, serta informasi cookie iklan Google AdSense.",
  alternates: {
    canonical: "/kebijakan-privasi",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      description="Penjelasan tentang data yang diproses, penyimpanan di browser, dan penggunaan cookie iklan di situs ini."
      updatedAt="6 November 2026"
    >
      <h2 className="text-lg font-bold text-slate-900">Ringkasan</h2>
      <p>
        Engineering Calculator tidak mewajibkan pendaftaran akun. Nilai yang
        Anda masukkan ke kalkulator diproses di browser dan tidak dikirim ke
        server kami. Kami tidak menjual data pribadi dan tidak memasang
        pelacak analitik pihak ketiga.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Perhitungan di browser
      </h2>
      <p>
        Seluruh operasi matematika dijalankan oleh kode yang dimuat ke browser
        Anda. Input seperti angka, satuan, dan pilihan mode tidak disimpan di
        server. Menutup atau memuat ulang halaman akan menghapus input tersebut.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Penyimpanan lokal</h2>
      <p>
        Situs menggunakan penyimpanan lokal browser untuk dua hal: mengingat
        pilihan tema terang atau gelap, dan mencatat bahwa Anda telah melihat
        pemberitahuan cookie. Data ini hanya tersimpan di perangkat Anda dan
        dapat dihapus melalui pengaturan browser.
      </p>

      <h2 className="text-lg font-bold text-slate-900">
        Cookie iklan dan Google AdSense
      </h2>
      <p>
        Jika situs ini menampilkan iklan, kami menggunakan Google AdSense.
        Google dan mitranya dapat menggunakan cookie untuk menayangkan iklan
        berdasarkan kunjungan Anda ke situs ini atau situs lain. Penggunaan
        cookie iklan memungkinkan Google menampilkan iklan yang relevan dan
        mengukur kinerja iklan.
      </p>
      <p>
        Anda dapat mempelajari cara Google menggunakan data pada{" "}
        <a
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          href="https://policies.google.com/technologies/ads"
          rel="noopener noreferrer"
          target="_blank"
        >
          halaman teknologi iklan Google
        </a>{" "}
        dan menonaktifkan iklan yang dipersonalisasi melalui{" "}
        <a
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          href="https://www.google.com/settings/ads"
          rel="noopener noreferrer"
          target="_blank"
        >
          pengaturan iklan Google
        </a>
        . Iklan tetap dapat muncul, tetapi tidak disesuaikan dengan riwayat
        Anda.
      </p>
      <p>
        Cookie iklan hanya dimuat setelah Anda menyetujui pemberitahuan cookie.
        Jika Anda menolak, situs tetap dapat digunakan sepenuhnya tanpa iklan
        yang dipersonalisasi.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Analitik</h2>
      <p>
        Situs ini tidak memasang Google Analytics atau alat pelacak serupa.
        Kami tidak membuat profil pengunjung dan tidak memantau perilaku
        individu di dalam kalkulator.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Email kontak</h2>
      <p>
        Jika Anda mengirim email, kami akan menerima alamat email dan isi pesan
        Anda. Data tersebut hanya dipakai untuk membalas pertanyaan atau
        menindaklanjuti laporan, lalu dihapus ketika tidak lagi diperlukan.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Hak Anda</h2>
      <p>
        Anda dapat meminta informasi, koreksi, atau penghapusan data yang Anda
        kirim melalui email. Permintaan dapat disampaikan ke{" "}
        {CONTACT_EMAIL ? (
          <a
            className="font-semibold text-indigo-600 hover:text-indigo-800"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        ) : (
          "alamat email yang tercantum di halaman kontak setelah dikonfigurasi"
        )}
        .
      </p>

      <h2 className="text-lg font-bold text-slate-900">Anak-anak</h2>
      <p>
        Situs ini tidak ditujukan untuk mengumpulkan data pribadi anak-anak.
        Kami tidak meminta nama, alamat, atau informasi identitas lain untuk
        menggunakan kalkulator.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Perubahan kebijakan</h2>
      <p>
        Kebijakan ini dapat diperbarui bila ada perubahan fitur atau kewajiban
        hukum. Tanggal pembaruan terakhir tercantum di bagian atas halaman.
        Penggunaan situs setelah pembaruan berarti Anda menerima versi terbaru.
      </p>

      <p>
        Lihat juga{" "}
        <Link
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          href="/syarat-ketentuan"
        >
          syarat dan ketentuan
        </Link>{" "}
        serta{" "}
        <Link
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          href="/disclaimer"
        >
          disclaimer
        </Link>
        .
      </p>
    </LegalPage>
  );
}
