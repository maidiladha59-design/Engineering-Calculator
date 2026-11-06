# Engineering Calculator

Kalkulator teknik online gratis untuk matematika, fisika, mekanika teknik,
teknik elektro, teknik sipil, matematika komputer, dan konversi satuan. Semua
perhitungan berjalan di browser: tanpa login, tanpa database, dan tanpa API
berbayar.

## Fitur

- 53 kalkulator aktif dalam 7 kategori, plus 7 kalkulator berlabel
  **Segera Hadir** yang dinonaktifkan dengan jelas.
- Setiap kalkulator menampilkan rumus (KaTeX), langkah perhitungan dengan angka
  yang benar-benar dipakai, tabel variabel dan satuan, minimal dua contoh soal
  yang dihitung dengan fungsi yang sama, kesalahan umum, dan tips.
- Input menerima desimal dengan koma atau titik, konversi satuan otomatis, serta
  validasi dan pesan error yang jelas.
- Pencarian kalkulator dengan navigasi keyboard.
- Mode gelap, tampilan responsif 320 px hingga desktop, dan halaman 404 khusus.
- SEO: metadata per halaman, canonical, Open Graph/Twitter, JSON-LD, sitemap,
  robots, dan FAQ.
- AdSense opsional dengan banner persetujuan cookie. Tanpa variabel lingkungan
  AdSense, tidak ada skrip iklan maupun cookie iklan yang dimuat.

## Stack

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 14.2.35 (App Router) |
| Bahasa | TypeScript 5.9 (strict) |
| UI | React 18.3, Tailwind CSS 4, lucide-react |
| Rumus | KaTeX 0.16 (dirender saat build, tanpa JS KaTeX di browser) |
| Tes | Vitest 3 |
| Hosting | Vercel (disarankan) |

Versi Next.js **dipatok** di 14.2.35. Jangan meng-upgrade Next.js tanpa
persetujuan; lihat bagian "Keputusan yang menunggu" di
[docs/CHECKLIST-SEBELUM-LIVE.md](docs/CHECKLIST-SEBELUM-LIVE.md).

## Menjalankan lokal

Prasyarat: Node.js 20 LTS atau lebih baru, npm.

```bash
npm install
cp .env.example .env.local   # opsional; sesuaikan nilainya
npm run dev                  # http://localhost:3000
```

Untuk menguji build produksi:

```bash
npm run build
npm start                    # http://localhost:3000
```

## Skrip

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi |
| `npm start` | Menjalankan hasil build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Pemeriksaan TypeScript |
| `npm test` | Seluruh tes Vitest |
| `npm run generate:formulas` | Regenerasi `src/data/formula-html.json` |
| `npm run audit:calculators` | Audit runtime semua kalkulator (butuh server di port 3000) |

`generate:formulas` memindai `String.raw` pada sumber kalkulator dan merender
KaTeX menjadi HTML statis. Jalankan ulang setiap kali rumus berubah; tes akan
gagal bila peta HTML tidak sinkron.

`audit:calculators` membuka setiap halaman kalkulator di Chrome headless,
menekan "Coba contoh ini" lalu HITUNG untuk semua contoh, dan menulis laporan ke
`.audit/report.md`. Butuh Chrome dan server produksi lokal. Hasil terakhir:
146/146 contoh sesuai, lihat [docs/AUDIT-KALKULATOR.md](docs/AUDIT-KALKULATOR.md).

## Struktur proyek

```
src/
  app/                    Rute App Router, metadata, sitemap, robots
  components/
    calculator/           Komponen UI kalkulator yang dipakai ulang
    calculators/          Satu komponen per kalkulator, dikelompokkan per bidang
    layout/               Navbar, footer, tema
    ads/                  Slot AdSense dan banner persetujuan
    seo/                  JSON-LD dan FAQ
  data/                   Daftar kalkulator, konversi, artikel, FAQ
  lib/
    math/                 Fungsi hitung murni per bidang
    units.ts              Definisi satuan dan konversi ke satuan SI
    validation.ts         Parsing angka dan validasi input
    format.ts             Format angka lokal Indonesia
scripts/                  Generator rumus dan audit browser
docs/                     Audit, checklist AdSense, checklist sebelum live
```

Prinsip utama: logika hitung berada di `src/lib/math` sebagai fungsi murni dan
diuji terpisah; komponen hanya mengatur input, tampilan, dan langkah.

## Menambah kalkulator

1. Tambahkan entri di `src/data/calculators.ts` (slug, nama, kategori,
   deskripsi, kata kunci, status `active`).
2. Buat komponen di `src/components/calculators/<bidang>/`.
3. Gunakan `SimpleCalculator` bila polanya standar, atau `CalculatorLayout`
   bila butuh input/tampilan khusus.
4. Letakkan rumus sebagai `String.raw` agar ikut dirender saat build.
5. Daftarkan komponen di `src/components/calculators/CalculatorRenderer.tsx`.
6. Tambahkan tes fungsi murni di `src/lib/math/*.test.ts`, lalu jalankan
   `npm run generate:formulas`, `npm test`, dan `npm run build`.

Jangan menampilkan hasil hardcode, tombol tanpa aksi, atau fitur setengah jadi
sebagai fitur selesai. Kalkulator yang belum siap memakai status `coming-soon`
dan tampil nonaktif.

## Konfigurasi lingkungan

Lihat [.env.example](.env.example). Variabel publik:

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Ya di produksi | URL kanonik, tanpa garis miring di akhir |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Tidak | `ca-pub-...`; mengaktifkan skrip iklan dan banner cookie |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | Tidak | Slot iklan beranda |
| `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT` | Tidak | Slot iklan halaman kalkulator |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Tidak | Email pada halaman kontak |

## Keamanan

- Header keamanan dipasang di `next.config.mjs`: CSP, `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, dan HSTS.
- CSP mengizinkan domain skrip iklan Google agar AdSense tidak rusak. Karena
  Next.js menyisipkan skrip bootstrap inline, `script-src` memuat
  `'unsafe-inline'` (dan `'unsafe-eval'` untuk kompatibilitas kreatif iklan).
  Tidak ada konten buatan pengguna yang dirender sebagai HTML.
- Tiga penggunaan `dangerouslySetInnerHTML` seluruhnya berasal dari data
  internal: skrip tema statis, HTML KaTeX hasil build, dan JSON-LD yang sudah
  di-escape. Tidak ada `eval` atau `new Function`.
- Tidak ada rahasia di repositori. Hanya `.env.example` yang di-commit.

## SEO dan AdSense

- Metadata, canonical, OG/Twitter, JSON-LD, sitemap, dan robots sudah aktif.
- Panduan iklan: [docs/ADSENSE-CHECKLIST.md](docs/ADSENSE-CHECKLIST.md).
- Checklist rilis: [docs/CHECKLIST-SEBELUM-LIVE.md](docs/CHECKLIST-SEBELUM-LIVE.md).

## Deploy ke Vercel

1. Hubungkan repositori ke Vercel dan pilih framework Next.js.
2. Tambahkan `NEXT_PUBLIC_SITE_URL` dengan domain produksi.
3. Deploy, lalu tambahkan variabel AdSense setelah akun disetujui dan deploy
   ulang.
4. Ikuti checklist sebelum live untuk verifikasi pascadeploy.
