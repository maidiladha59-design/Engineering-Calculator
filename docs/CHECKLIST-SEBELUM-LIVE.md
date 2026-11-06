# Checklist sebelum live

Status verifikasi terakhir: **2026-11-07**, build produksi lokal, Chrome
headless, emulasi mobile Lighthouse.

## 1. Blocker wajib

- [ ] Domain produksi aktif dan DNS mengarah ke Vercel.
- [ ] `NEXT_PUBLIC_SITE_URL` di Vercel berisi domain produksi **tanpa** garis
      miring di akhir.
- [ ] `npm run lint`, `npm run typecheck`, `npm test`, dan `npm run build` lulus
      pada commit yang akan dirilis.
- [ ] `npm run audit:calculators` menunjukkan seluruh contoh OK.
- [ ] Tidak ada `.env` atau kredensial yang ikut ter-commit.
- [ ] Halaman `/tentang`, `/kontak`, `/kebijakan-privasi`,
      `/syarat-ketentuan`, dan `/disclaimer` dapat dibuka.
- [ ] `https://domain-anda.com/ads.txt` menampilkan baris publisher setelah
      AdSense disetujui (lihat `docs/ADSENSE-CHECKLIST.md`).

## 2. Nilai yang perlu diisi Aidil

| Tempat | Nilai | Catatan |
| --- | --- | --- |
| Vercel Environment Variables | `NEXT_PUBLIC_SITE_URL` | Wajib, mis. `https://domain-anda.com` |
| Vercel Environment Variables | `NEXT_PUBLIC_ADSENSE_CLIENT` | Setelah akun AdSense disetujui |
| Vercel Environment Variables | `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | ID slot beranda |
| Vercel Environment Variables | `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT` | ID slot halaman kalkulator |
| Vercel Environment Variables | `NEXT_PUBLIC_CONTACT_EMAIL` | Email kontak publik |
| `public/ads.txt` | `google.com, pub-XXXXXXXX, DIRECT, f08c47fec0942fa0` | Hapus tanda `#`, ganti ID publisher |
| Google Search Console | Verifikasi domain + submit sitemap | Post-deploy |
| Google AdSense | Pendaftaran situs + peninjauan | Jangan pasang iklan sebelum disetujui |

Setelah mengubah variabel lingkungan, lakukan redeploy.

## 3. Hasil gate terakhir

| Gate | Hasil |
| --- | --- |
| ESLint | Lulus tanpa error/warning |
| TypeScript (`tsc --noEmit`) | Lulus |
| Vitest | 23 file, 320 tes lulus |
| Build Next.js | 80 halaman statis + OG image, robots, sitemap |
| Audit kalkulator | 53 kalkulator, 146/146 contoh sesuai, 0 error konsol |
| Sitemap | 74 URL, semuanya HTTP 200 |
| Tautan internal | 72 tautan diperiksa, tidak ada 4xx |
| Halaman 404 | Mengembalikan status 404 |
| Responsif | Tanpa overflow horizontal pada 320/375/414/768/1280 px |
| Mode gelap | `html.dark`, latar `rgb(10, 18, 32)`, warna teks terang |
| Lighthouse mobile beranda | Performa 90 dan 96 pada dua run (TBT 400/230 ms, CLS 0) |
| Lighthouse mobile kalkulator | Performa 94 (TBT 280 ms, CLS 0) |
| Accessibility/Best Practices/SEO | 100 pada halaman yang diuji |

Nilai Lighthouse dapat bervariasi beberapa poin antar-run karena emulasi CPU.
Target minimal 90 terpenuhi pada pengukuran terakhir.

## 4. Verifikasi pascadeploy

```bash
# Header keamanan
curl -sI https://domain-anda.com/ | grep -iE "content-security-policy|x-content-type|x-frame|referrer-policy|permissions-policy|strict-transport"

# SEO
curl -s https://domain-anda.com/robots.txt
curl -s https://domain-anda.com/sitemap.xml | grep -c "<loc>"

# 404
curl -s -o /dev/null -w "%{http_code}\n" https://domain-anda.com/halaman-tidak-ada
```

Manual di browser:

- [ ] Buka beranda, satu halaman kategori, satu kalkulator, dan satu artikel.
- [ ] Jalankan dua contoh pada beberapa kalkulator; hasil dan langkah muncul.
- [ ] Coba input kosong, nol, dan huruf; pesan validasi tampil dan tidak crash.
- [ ] Cek mode gelap dan terang.
- [ ] Cek lebar 320 px, 375 px, dan desktop tanpa scroll horizontal.
- [ ] Pastikan 7 kalkulator "Segera Hadir" tampil nonaktif dan tidak bisa
      dihitung: Matriks, Determinan, Turunan, Integral, Kalor, Gerak Parabola,
      Gaya Gesek.
- [ ] Setelah AdSense aktif: banner cookie muncul pada kunjungan pertama,
      "Setuju" memuat iklan, "Tolak" tidak memuat skrip iklan, dan pilihan
      tersimpan setelah reload.
- [ ] Tidak ada error di konsol browser.

## 5. Keputusan yang menunggu (Butuh keputusan Aidil)

`npm audit` per 2026-11-07: **15 kerentanan** (1 low, 7 moderate, 4 high,
3 critical). Semua perbaikan yang tersedia memerlukan upgrade major.

### Next.js 14.2.35 — critical

`npm audit` mencantumkan beberapa advisory Next.js (DoS Server Components,
cache poisoning, RCE Image Optimizer, SSRF WebSocket, dan lainnya). Perbaikan
tersedia hanya di Next.js 15.5.x/16.x. Brief meminta Next.js 14 dan melarang
upgrade tanpa persetujuan, sehingga versi dibiarkan.

Mitigasi yang sudah berlaku: tidak memakai `next/image` (Image Optimizer tidak
aktif), tidak ada Server Actions, middleware, rewrites, custom server, atau CSP
nonce; halaman bersifat statis/ISR. Risiko yang tersisa tetap ada dan perbaikan
sebenarnya adalah upgrade. **Rekomendasi: setujui upgrade ke Next.js 15.5.28+
(atau 16) di fase terpisah, lalu jalankan ulang seluruh gate dan Lighthouse.**

### Vitest 3 / tinypool — critical (dev-only)

Kerentanan path traversal/RCE pada mock dan worker. Hanya berdampak saat tes
dijalankan terhadap kode yang tidak tepercaya; repositori ini hanya menjalankan
tes sendiri secara lokal/CI. Perbaikan memerlukan Vitest 5 (breaking).
**Rekomendasi: setujui upgrade Vitest 5 di fase terpisah.**

### KaTeX 0.16 — low

Advisory prototype pollution untuk melewati `trust`. KaTeX hanya dipakai saat
build dengan `trust: false`, dan HTML hasilnya dirender sebagai string statis;
tidak ada input pengguna yang masuk ke KaTeX saat runtime. Perbaikan tersedia di
KaTeX 0.18.2+/0.19 (perubahan minor 0.x). **Rekomendasi: upgrade opsional sambil
meregenerasi `formula-html.json` dan memeriksa tampilan rumus.**

### PostCSS (transitif di dalam Next.js) — high

Hanya relevan untuk pemrosesan CSS dengan source map dari sumber tidak
tepercaya; build memproses CSS milik proyek sendiri. Perbaikan menunggu upgrade
Next.js.

### ESLint/glob (dev-only)

Kerentanan pada tooling lint, bukan runtime produksi. Perbaikan menunggu upgrade
`eslint-config-next` (mengikuti Next.js).

## 6. Catatan operasional

- Hasil build berada di `.next`; jangan commit.
- Folder `.audit/` berisi laporan dan tangkapan layar lokal, diabaikan Git.
- Setelah mengubah rumus, jalankan `npm run generate:formulas`.
- Setelah menambah kalkulator, perbarui `CalculatorRenderer`, sitemap otomatis
  mengikuti data, dan jalankan ulang audit.
