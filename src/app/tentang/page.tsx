import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Tentang Engineering Calculator: kalkulator teknik gratis tanpa login, dengan rumus, langkah perhitungan, dan penjelasan variabel yang transparan.",
  alternates: {
    canonical: "/tentang",
  },
};

export default function AboutPage() {
  return (
    <LegalPage
      title="Tentang Engineering Calculator"
      description="Kalkulator teknik online yang gratis, cepat, dan transparan untuk pelajar, mahasiswa, dan praktisi."
      updatedAt="6 November 2026"
    >
      <p>
        Engineering Calculator adalah kumpulan kalkulator teknik berbasis web
        yang dapat digunakan tanpa akun, tanpa langganan, dan tanpa memasang
        aplikasi. Semua perhitungan berjalan langsung di browser Anda, sehingga
        angka yang Anda masukkan tidak dikirim ke server kami.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Untuk siapa situs ini</h2>
      <p>
        Situs ini ditujukan untuk pelajar SMA, mahasiswa teknik, teknisi, dan
        praktisi yang membutuhkan perhitungan cepat namun tetap ingin memahami
        prosesnya. Setiap kalkulator menampilkan rumus, langkah perhitungan
        dengan angka yang Anda masukkan, penjelasan variabel, contoh soal, serta
        kesalahan umum yang perlu dihindari.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Apa yang tersedia</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Matematika: aritmatika, persentase, pecahan, pangkat dan akar,
          logaritma, persamaan kuadrat, serta sistem persamaan linear.
        </li>
        <li>
          Fisika: gerak, gaya, usaha dan energi, daya, momentum, impuls,
          tekanan, dan massa jenis.
        </li>
        <li>
          Mekanika teknik: momen gaya, torsi, keseimbangan, pusat massa, momen
          inersia, energi rotasi, tegangan-regangan, dan modulus elastisitas.
        </li>
        <li>
          Teknik elektro: hukum Ohm, daya listrik, resistansi kawat, rangkaian
          seri-paralel, energi listrik, dan konversi satuan listrik.
        </li>
        <li>
          Teknik sipil: volume beton, balok, kolom, luas bangunan, kebutuhan
          material, campuran beton, dan berat besi.
        </li>
        <li>
          Matematika komputer: konversi dan aritmatika biner, heksadesimal, dan
          oktal.
        </li>
        <li>
          Konversi satuan: panjang, massa, luas, volume, suhu, kecepatan, waktu,
          tekanan, energi, dan daya.
        </li>
      </ul>

      <h2 className="text-lg font-bold text-slate-900">Prinsip kami</h2>
      <p>
        Kami tidak menampilkan hasil palsu atau tombol yang hanya berfungsi
        sebagai pajangan. Kalkulator yang belum siap diberi label “Segera Hadir”
        dan tidak dapat dibuka. Contoh soal dihitung dengan fungsi yang sama
        yang dipakai kalkulator, sehingga angka pada contoh dan hasil
        perhitungan selalu konsisten.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Batasan</h2>
      <p>
        Hasil perhitungan bersifat edukatif dan estimasi. Untuk pekerjaan
        struktur, instalasi listrik, atau keputusan keselamatan, verifikasi
        hasil dengan standar yang berlaku dan insinyur yang berwenang. Baca{" "}
        <Link className="font-semibold text-indigo-600 hover:text-indigo-800" href="/disclaimer">
          disclaimer
        </Link>{" "}
        kami untuk penjelasan lengkap.
      </p>

      <h2 className="text-lg font-bold text-slate-900">Kontak</h2>
      <p>
        Pertanyaan, koreksi, atau usulan kalkulator baru dapat disampaikan
        melalui halaman{" "}
        <Link className="font-semibold text-indigo-600 hover:text-indigo-800" href="/kontak">
          kontak
        </Link>
        .
      </p>
    </LegalPage>
  );
}
