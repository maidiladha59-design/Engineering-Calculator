# Checklist AdSense

Dokumen ini menjelaskan langkah mengaktifkan iklan setelah situs disetujui
Google AdSense. Sebelum disetujui, tidak ada iklan atau skrip AdSense yang
dimuat karena komponen `AdSlot` dan `AdSenseScript` hanya aktif jika variabel
lingkungan terisi.

## 1. Sebelum mendaftar

- [ ] Domain produksi sudah aktif dan dapat diakses publik.
- [ ] `NEXT_PUBLIC_SITE_URL` di Vercel berisi URL produksi tanpa garis miring
      di akhir, misalnya `https://domain-anda.com`.
- [ ] Halaman `/tentang`, `/kontak`, `/kebijakan-privasi`,
      `/syarat-ketentuan`, dan `/disclaimer` sudah dapat dibuka.
- [ ] Kebijakan privasi menyebut penggunaan cookie iklan Google.
- [ ] Banner persetujuan cookie tampil pada kunjungan pertama.
- [ ] Tidak ada konten menyesatkan, hasil palsu, atau tombol yang tidak
      berfungsi.
- [ ] Situs dapat digunakan di ponsel tanpa scroll horizontal.
- [ ] `/sitemap.xml` dan `/robots.txt` dapat dibuka dan memuat URL yang benar.

## 2. Mendaftar AdSense

1. Buka Google AdSense dan daftarkan domain produksi.
2. Tambahkan situs, lalu tunggu peninjauan. Peninjauan bisa memakan beberapa
   hari hingga beberapa minggu.
3. Jangan menambahkan kode iklan sebelum akun disetujui.

## 3. Mengisi variabel lingkungan

Di Vercel, buka Project Settings > Environment Variables, lalu tambahkan:

| Variabel | Nilai | Wajib |
| --- | --- | --- |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXXXXXXXXXX` | Ya, untuk iklan |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | ID slot untuk beranda | Opsional |
| `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT` | ID slot untuk halaman kalkulator | Opsional |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email kontak publik | Opsional |

Lakukan redeploy setelah menambahkan variabel. Skrip AdSense dan banner
persetujuan cookie hanya dimuat bila `NEXT_PUBLIC_ADSENSE_CLIENT` terisi;
tanpa variabel tersebut tidak ada cookie iklan sehingga banner tidak
ditampilkan. Skrip AdSense baru dimuat setelah pengunjung menekan "Setuju"
pada banner cookie.

## 4. ads.txt

1. Buka file `public/ads.txt`.
2. Hapus tanda `#` pada baris yang disediakan dan ganti
   `pub-XXXXXXXXXXXXXXXX` dengan ID publisher asli dari AdSense.
3. Deploy ulang, lalu pastikan `https://domain-anda.com/ads.txt` menampilkan
   baris tanpa komentar.
4. Di AdSense, buka Situs > ads.txt dan tekan "Periksa ulang".

Format baris yang benar:

```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

## 5. Membuat unit iklan

1. Di AdSense, buat unit iklan display responsif.
2. Salin ID slot (deret angka) ke `NEXT_PUBLIC_ADSENSE_SLOT_TOP` atau
   `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`.
3. Deploy ulang dan buka halaman kalkulator. Setelah menyetujui cookie, kotak
   berlabel "Iklan" akan muncul di bawah bagian pertanyaan umum.

## 6. Setelah iklan aktif

- [ ] Iklan tidak menutupi tombol HITUNG, input, atau navigasi.
- [ ] Jangan mengklik iklan sendiri atau meminta orang lain mengkliknya.
- [ ] Pantau laporan kebijakan AdSense secara berkala.
- [ ] Perbarui kebijakan privasi bila menambahkan mitra iklan baru.
- [ ] Pastikan banner persetujuan tetap dapat diubah dengan menghapus kunci
      `ec-cookie-consent` dari penyimpanan lokal browser, lalu memuat ulang.

## 7. Pemecahan masalah

- **Iklan tidak muncul:** pastikan kedua variabel client dan slot terisi,
  cookie sudah disetujui, dan pemblokir iklan dimatikan saat pengujian.
- **Iklan kosong di halaman tertentu:** AdSense dapat membatasi penayangan
  sampai konten terindeks. Periksa juga apakah unit iklan berstatus aktif.
- **Pelanggaran kebijakan:** hentikan penayangan dengan mengosongkan
  `NEXT_PUBLIC_ADSENSE_CLIENT`, lalu deploy ulang.
