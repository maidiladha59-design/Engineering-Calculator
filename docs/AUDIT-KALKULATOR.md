# Audit kalkulator (Phase 6)

Tanggal audit: 2026-11-07. Metode: Chrome headless (CDP) terhadap build produksi lokal, klik "Coba contoh ini" lalu HITUNG pada setiap contoh, bandingkan jawaban contoh dengan kartu hasil yang dirender.

Hasil: **146/146 contoh pada 53 kalkulator aktif sesuai**, tanpa error konsol.

Dihasilkan oleh `npm run audit:calculators` terhadap build produksi.

| Kategori | Kalkulator | Contoh | Input | Expected | Actual | Status |
| --- | --- | --- | --- | --- | --- | --- |
| matematika | Kalkulator Dasar | 1 | Operasi=+; Angka pertama=12.5; Angka kedua=7.5 | 20 | 20 (Angka pertama12,5; Angka kedua7,5; Operasi+) | OK |
| matematika | Kalkulator Dasar | 2 | Operasi=÷; Angka pertama=18; Angka kedua=6 | 3 | 3 (Angka pertama18; Angka kedua6; Operasi÷) | OK |
| matematika | Kalkulator Dasar | 3 | Operasi=×; Angka pertama=7; Angka kedua=8 | 56 | 56 (Angka pertama7; Angka kedua8; Operasi×) | OK |
| matematika | Persentase | 1 | Jenis perhitungan=of; Persentase=15; Angka=200000 | 30.000 | 30.000 (Persentase15%; Angka awal200.000) | OK |
| matematika | Persentase | 2 | Jenis perhitungan=change; Nilai awal=200; Nilai akhir=250 | 25% | 25% (Nilai awal200; Nilai akhir250; Arah perubahanNaik) | OK |
| matematika | Persentase | 3 | Jenis perhitungan=difference; Nilai pertama=200; Nilai kedua=250 | 22,22% | 22,22% (Nilai pertama200; Nilai kedua250; Rata-rata absolut225) | OK |
| matematika | Pecahan | 1 | Operasi=+; Pembilang (a)=1; Penyebut (b)=2; Pembilang (c)=1; Penyebut (d)=3 | 5/6 (0,8333333333) | 5/6 (Desimal0,8333333333; Operasi+) | OK |
| matematika | Pecahan | 2 | Operasi=×; Pembilang (a)=3; Penyebut (b)=4; Pembilang (c)=2; Penyebut (d)=5 | 3/10 (0,3) | 3/10 (Desimal0,3; Operasi×) | OK |
| matematika | Pecahan | 3 | Operasi=-; Pembilang (a)=7; Penyebut (b)=4; Pembilang (c)=1; Penyebut (d)=2 | 5/4 (1,25) | 5/4 (Desimal1,25; Operasi-; Bentuk campuran1 1/4) | OK |
| matematika | Pangkat & Akar | 1 | Jenis perhitungan=power; Bilangan pokok (a)=2; Pangkat (n)=10 | 1.024 | 1.024 (Bilangan pokok2; Pangkat10) | OK |
| matematika | Pangkat & Akar | 2 | Jenis perhitungan=power; Bilangan pokok (a)=5; Pangkat (n)=-2 | 0,04 | 0,04 (Bilangan pokok5; Pangkat-2) | OK |
| matematika | Pangkat & Akar | 3 | Jenis perhitungan=root; Bilangan yang diakar (a)=27; Indeks akar (n)=3 | 3 | 3 (Bilangan27; Indeks akar3; Uji balik3^{3} = 27) | OK |
| matematika | Logaritma | 1 | Nilai (x)=32; Basis (b)=2 | 5 | 5 (⁽2⁾log 325; ln x3,465735903; ln b0,6931471806) | OK |
| matematika | Logaritma | 2 | Nilai (x)=1000; Basis (b)=10 | 3 | 3 (⁽10⁾log 1.0003; ln x6,907755279; ln b2,302585093) | OK |
| matematika | Logaritma | 3 | Nilai (x)=81; Basis (b)=3 | 4 | 4 (⁽3⁾log 814; ln x4,394449155; ln b1,098612289) | OK |
| matematika | Persamaan Kuadrat | 1 | Koefisien a=1; Koefisien b=-5; Konstanta c=6 | x₁ = 3, x₂ = 2 | x₁ = 3, x₂ = 2 (Diskriminan (D)1; Jenis akarDua akar real berbeda (D > 0); Titik puncak(2,5, -0,25); Sumbu simetrix = 2,5) | OK |
| matematika | Persamaan Kuadrat | 2 | Koefisien a=1; Koefisien b=2; Konstanta c=5 | x₁ = -1 + 2i, x₂ = -1 − 2i | x₁ = -1 + 2i, x₂ = -1 − 2i (Diskriminan (D)-16; Jenis akarDua akar kompleks konjugat (D < 0); Titik puncak(-1, 4); Sumbu simetrix = -1) | OK |
| matematika | Persamaan Kuadrat | 3 | Koefisien a=1; Koefisien b=-6; Konstanta c=9 | x₁ = x₂ = 3 | x₁ = x₂ = 3 (Diskriminan (D)0; Jenis akarAkar real kembar (D = 0); Titik puncak(3, 0); Sumbu simetrix = 3) | OK |
| matematika | Sistem Persamaan Linear 2 Variabel | 1 | a₁=2; b₁=3; c₁=12; a₂=1; b₂=-1; c₂=1 | x = 3, y = 2 | x = 3, y = 2 (Determinan (D)-5; Dx-15; Dy-10; Jenis solusiSolusi tunggal) | OK |
| matematika | Sistem Persamaan Linear 2 Variabel | 2 | a₁=4; b₁=1; c₁=9; a₂=1; b₂=-1; c₂=1 | x = 2, y = 1 | x = 2, y = 1 (Determinan (D)-5; Dx-10; Dy-5; Jenis solusiSolusi tunggal) | OK |
| matematika | Sistem Persamaan Linear 2 Variabel | 3 | a₁=1; b₁=1; c₁=2; a₂=2; b₂=2; c₂=5 | Tidak ada solusi | Tidak ada solusi (Determinan (D)0; Dx-1; Dy1; Jenis solusiTidak ada) | OK: Jawaban non-numerik cocok. |
| fisika | Kecepatan | 1 | Cari variabel=speed; Jarak (s)=120; Satuan=km; Waktu (t)=1.5; Satuan=h | 22,22222222 m/s (80 km/jam) | 22,22222222 m/s (Ekuivalen80 km/jam; Jarak (SI)120.000 m; Waktu (SI)5.400 s) | OK |
| fisika | Kecepatan | 2 | Cari variabel=distance; Kecepatan (v)=80; Satuan=km/h; Waktu (t)=2; Satuan=h | 160 km | 160.000 m (Ekuivalen160 km; Kecepatan (SI)22,22222222 m/s; Waktu (SI)7.200 s) | OK |
| fisika | Kecepatan | 3 | Cari variabel=time; Jarak (s)=120; Satuan=km; Kecepatan (v)=80; Satuan=km/h | 1,5 jam | 5.400 s (Ekuivalen90 menit (1,5 jam); Jarak (SI)120.000 m; Kecepatan (SI)22,22222222 m/s) | OK |
| fisika | Percepatan | 1 | Cari variabel=acceleration; Kecepatan awal (u)=0; Satuan=km/h; Kecepatan akhir (v)=72; Satuan=km/h; Waktu (t)=10; Satuan=s | 2 m/s² | 2 m/s² (Ekuivalen200 cm/s²; Kecepatan awal (SI)0 m/s; Kecepatan akhir (SI)20 m/s; Waktu (SI)10 s) | OK |
| fisika | Percepatan | 2 | Cari variabel=final; Kecepatan awal (u)=10; Satuan=m/s; Percepatan (a)=2; Satuan=m/s2; Waktu (t)=5; Satuan=s | 20 m/s | 20 m/s (Ekuivalen72 km/jam; Kecepatan awal (SI)10 m/s; Percepatan (SI)2 m/s²) | OK |
| fisika | Percepatan | 3 | Cari variabel=time; Kecepatan awal (u)=10; Satuan=m/s; Kecepatan akhir (v)=30; Satuan=m/s; Percepatan (a)=2; Satuan=m/s2 | 10 s | 10 s (Ekuivalen0,1666666667 menit; Kecepatan awal (SI)10 m/s; Kecepatan akhir (SI)30 m/s) | OK |
| fisika | Gaya (Hukum Newton II) | 1 | Cari variabel=force; Massa (m)=1200; Satuan=kg; Percepatan (a)=2; Satuan=m/s2 | 2.400 N (2,4 kN) | 2.400 N (Ekuivalen2,4 kN; Massa (SI)1.200 kg; Percepatan (SI)2 m/s²) | OK |
| fisika | Gaya (Hukum Newton II) | 2 | Cari variabel=mass; Gaya (F)=2400; Satuan=N; Percepatan (a)=2; Satuan=m/s2 | 1.200 kg | 1.200 kg (Ekuivalen1.200.000 g; Gaya (SI)2.400 N; Percepatan (SI)2 m/s²) | OK |
| fisika | Gaya (Hukum Newton II) | 3 | Cari variabel=acceleration; Gaya (F)=2400; Satuan=N; Massa (m)=1200; Satuan=kg | 2 m/s² | 2 m/s² (Ekuivalen200 cm/s²; Gaya (SI)2.400 N; Massa (SI)1.200 kg) | OK |
| fisika | Usaha & Energi | 1 | Cari variabel=work; Gaya (F)=50; Satuan=N; Perpindahan (s)=8; Satuan=m | 400 J (0,4 kJ) | 400 J (Ekuivalen0,4 kJ; Gaya (SI)50 N; Perpindahan (SI)8 m) | OK |
| fisika | Usaha & Energi | 2 | Cari variabel=force; Usaha (W)=400; Satuan=J; Perpindahan (s)=8; Satuan=m | 50 N | 50 N (Ekuivalen0,05 kN; Usaha (SI)400 J; Perpindahan (SI)8 m) | OK |
| fisika | Usaha & Energi | 3 | Cari variabel=displacement; Usaha (W)=400; Satuan=J; Gaya (F)=50; Satuan=N | 8 m | 8 m (Ekuivalen0,008 km; Usaha (SI)400 J; Gaya (SI)50 N) | OK |
| fisika | Daya | 1 | Cari variabel=power; Usaha (W)=1200; Satuan=J; Waktu (t)=4; Satuan=s | 300 W (0,3 kW) | 300 W (Ekuivalen0,3 kW; Usaha (SI)1.200 J; Waktu (SI)4 s) | OK |
| fisika | Daya | 2 | Cari variabel=work; Daya (P)=300; Satuan=W; Waktu (t)=4; Satuan=s | 1.200 J | 1.200 J (Ekuivalen1,2 kJ; Daya (SI)300 W; Waktu (SI)4 s) | OK |
| fisika | Daya | 3 | Cari variabel=time; Usaha (W)=1200; Satuan=J; Daya (P)=300; Satuan=W | 4 s | 4 s (Ekuivalen0,06666666667 menit; Usaha (SI)1.200 J; Daya (SI)300 W) | OK |
| fisika | Momentum | 1 | Cari variabel=momentum; Massa (m)=1500; Satuan=kg; Kecepatan (v)=20; Satuan=m/s | 30.000 kg·m/s (30.000 N·s) | 30.000 kg·m/s (Ekuivalen30.000 N·s; Massa (SI)1.500 kg; Kecepatan (SI)20 m/s) | OK |
| fisika | Momentum | 2 | Cari variabel=mass; Momentum (p)=30000; Kecepatan (v)=20; Satuan=m/s | 1.500 kg | 1.500 kg (Ekuivalen1.500.000 g; Momentum30.000 kg·m/s; Kecepatan (SI)20 m/s) | OK |
| fisika | Momentum | 3 | Cari variabel=velocity; Momentum (p)=30000; Massa (m)=1500; Satuan=kg | 20 m/s | 20 m/s (Ekuivalen72 km/jam; Momentum30.000 kg·m/s; Massa (SI)1.500 kg) | OK |
| fisika | Impuls | 1 | Cari variabel=impulse; Gaya (F)=20; Satuan=N; Selang waktu (Δt)=0.5; Satuan=s | 10 N·s | 10 N·s (Gaya (SI)20 N; Selang waktu (SI)0,5 s) | OK |
| fisika | Impuls | 2 | Cari variabel=force; Impuls (I)=10; Selang waktu (Δt)=0.5; Satuan=s | 20 N | 20 N (Ekuivalen0,02 kN; Impuls10 N·s; Selang waktu (SI)0,5 s) | OK |
| fisika | Impuls | 3 | Cari variabel=time; Impuls (I)=10; Gaya (F)=20; Satuan=N | 0,5 s | 0,5 s (Ekuivalen500 ms; Impuls10 N·s; Gaya (SI)20 N) | OK |
| fisika | Tekanan | 1 | Cari variabel=pressure; Gaya (F)=500; Satuan=N; Luas bidang (A)=0.25; Satuan=m2 | 2.000 Pa (2 kPa) | 2.000 Pa (Ekuivalen2 kPa; Gaya (SI)500 N; Luas (SI)0,25 m²) | OK |
| fisika | Tekanan | 2 | Cari variabel=force; Tekanan (P)=2000; Satuan=Pa; Luas bidang (A)=0.25; Satuan=m2 | 500 N | 500 N (Ekuivalen0,5 kN; Tekanan (SI)2.000 Pa; Luas (SI)0,25 m²) | OK |
| fisika | Tekanan | 3 | Cari variabel=area; Tekanan (P)=2000; Satuan=Pa; Gaya (F)=500; Satuan=N | 0,25 m² | 0,25 m² (Ekuivalen2.500 cm²; Tekanan (SI)2.000 Pa; Gaya (SI)500 N) | OK |
| fisika | Massa Jenis | 1 | Cari variabel=density; Massa (m)=2; Satuan=kg; Volume (V)=0.002; Satuan=m3 | 1.000 kg/m³ (1 g/cm³) | 1.000 kg/m³ (Ekuivalen1 g/cm³; Massa (SI)2 kg; Volume (SI)0,002 m³) | OK |
| fisika | Massa Jenis | 2 | Cari variabel=mass; Massa jenis (ρ)=1000; Satuan=kg/m3; Volume (V)=0.002; Satuan=m3 | 2 kg | 2 kg (Ekuivalen2.000 g; Massa jenis (SI)1.000 kg/m³; Volume (SI)0,002 m³) | OK |
| fisika | Massa Jenis | 3 | Cari variabel=volume; Massa (m)=2; Satuan=kg; Massa jenis (ρ)=1000; Satuan=kg/m3 | 0,002 m³ | 0,002 m³ (Ekuivalen2 L; Massa (SI)2 kg; Massa jenis (SI)1.000 kg/m³) | OK |
| mekanika-teknik | Momen Gaya | 1 | Gaya (F)=20; Satuan=N; Jarak titik acuan ke titik gaya (d)=0.5; Satuan=m; Sudut antara gaya dan lengan (θ)=90; Satuan=deg | 10 N·m | 10 N·m (Lengan momen0,5 m; Gaya (SI)20 N; Jarak (SI)0,5 m; Sudut90°) | OK |
| mekanika-teknik | Momen Gaya | 2 | Gaya (F)=50; Satuan=N; Jarak titik acuan ke titik gaya (d)=2; Satuan=m; Sudut antara gaya dan lengan (θ)=30; Satuan=deg | 50 N·m | 50 N·m (Lengan momen1 m; Gaya (SI)50 N; Jarak (SI)2 m; Sudut30°) | OK |
| mekanika-teknik | Torsi | 1 | Gaya (F)=100; Satuan=N; Jari-jari poros (r)=0.2; Satuan=m; Sudut gaya terhadap lengan (θ)=90; Satuan=deg | 20 N·m | 20 N·m (Gaya tangensial100 N; Jari-jari (SI)0,2 m; Gaya (SI)100 N; Sudut90°) | OK |
| mekanika-teknik | Torsi | 2 | Gaya (F)=80; Satuan=N; Jari-jari poros (r)=0.3; Satuan=m; Sudut gaya terhadap lengan (θ)=60; Satuan=deg | 20,78460969 N·m | 20,78460969 N·m (Gaya tangensial69,2820323 N; Jari-jari (SI)0,3 m; Gaya (SI)80 N; Sudut60°) | OK |
| mekanika-teknik | Keseimbangan Benda | 1 | Panjang balok (L)=6; Satuan=m; Beban titik (P)=12; Satuan=kN; Posisi beban dari tumpuan kiri (a)=3; Satuan=m | R_A = 6.000 kN dan R_B = 6.000 kN | 6.000 N (Reaksi tumpuan kanan (R_B)6.000 N; Total reaksi12.000 N; Beban (SI)12.000 N; Jarak beban ke tumpuan kanan3 m) | OK |
| mekanika-teknik | Keseimbangan Benda | 2 | Panjang balok (L)=8; Satuan=m; Beban titik (P)=20; Satuan=kN; Posisi beban dari tumpuan kiri (a)=2; Satuan=m | R_A = 15.000 kN dan R_B = 5.000 kN | 15.000 N (Reaksi tumpuan kanan (R_B)5.000 N; Total reaksi20.000 N; Beban (SI)20.000 N; Jarak beban ke tumpuan kanan6 m) | OK |
| mekanika-teknik | Pusat Massa | 1 | Massa (kg)=2; Koordinat x (m)=0; Koordinat y (m)=0; Massa (kg)=4; Koordinat x (m)=3; Koordinat y (m)=0 | (2; 0) m | (2; 0) m (Massa total6 kg; Jumlah titik2 titik; Σ m·x12 kg·m; Σ m·y0 kg·m) | OK |
| mekanika-teknik | Pusat Massa | 2 | Massa (kg)=1; Koordinat x (m)=1; Koordinat y (m)=1; Massa (kg)=3; Koordinat x (m)=3; Koordinat y (m)=5 | (2,5; 4) m | (2,5; 4) m (Massa total4 kg; Jumlah titik2 titik; Σ m·x10 kg·m; Σ m·y16 kg·m) | OK |
| mekanika-teknik | Momen Inersia | 1 | Bentuk benda dan letak poros=silinder-pejal; Massa benda (m)=2; Satuan=kg; Jari-jari (r) atau panjang batang (L)=0.5; Satuan=m | 0,25 kg·m² | 0,25 kg·m² (Bentuk bendaSilinder pejal dengan poros di sumbu; Rumus yang dipakaiI=\frac{1}{2}mr^{2}; Massa2 kg; Jari-jari (r)0,5 m) | OK |
| mekanika-teknik | Momen Inersia | 2 | Bentuk benda dan letak poros=batang-tengah; Massa benda (m)=3; Satuan=kg; Jari-jari (r) atau panjang batang (L)=2; Satuan=m | 1 kg·m² | 1 kg·m² (Bentuk bendaBatang dengan poros di tengah; Rumus yang dipakaiI=\frac{1}{12}mL^{2}; Massa3 kg; Panjang batang (L)2 m) | OK |
| mekanika-teknik | Momen Inersia | 3 | Bentuk benda dan letak poros=bola-pejal; Massa benda (m)=1.5; Satuan=kg; Jari-jari (r) atau panjang batang (L)=0.2; Satuan=m | 0,024 kg·m² | 0,024 kg·m² (Bentuk bendaBola pejal dengan poros melalui pusat; Rumus yang dipakaiI=\frac{2}{5}mr^{2}; Massa1,5 kg; Jari-jari (r)0,2 m) | OK |
| mekanika-teknik | Energi Kinetik Rotasi | 1 | Momen inersia (I)=2; Kecepatan sudut (ω)=3; Satuan=rad/s | 9 J | 9 J (Momen inersia2 kg·m²; Kecepatan sudut (SI)3 rad/s; Kecepatan sudut dalam rpm28,64788976 rpm) | OK |
| mekanika-teknik | Energi Kinetik Rotasi | 2 | Momen inersia (I)=0.5; Kecepatan sudut (ω)=300; Satuan=rpm | 246,74011 J | 246,74011 J (Momen inersia0,5 kg·m²; Kecepatan sudut (SI)31,41592654 rad/s; Kecepatan sudut dalam rpm300 rpm) | OK |
| mekanika-teknik | Energi Kinetik Rotasi | 3 | Momen inersia (I)=1.2; Kecepatan sudut (ω)=120; Satuan=rpm | 94,74820225 J | 94,74820225 J (Momen inersia1,2 kg·m²; Kecepatan sudut (SI)12,56637061 rad/s; Kecepatan sudut dalam rpm120 rpm) | OK |
| mekanika-teknik | Tegangan & Regangan | 1 | Gaya aksial (F)=10000; Satuan=N; Luas penampang (A)=200; Satuan=mm2; Panjang awal (L₀)=2; Satuan=m; Perubahan panjang (ΔL)=0.5; Satuan=mm | σ = 50 MPa, ε = 0,00025 | 50 MPa (Tegangan dalam pascal50 MPa; Regangan aksial (ε)0,00025; Regangan dalam persen0,025%; Jenis pembebananTarik) | OK |
| mekanika-teknik | Tegangan & Regangan | 2 | Gaya aksial (F)=-12000; Satuan=N; Luas penampang (A)=300; Satuan=mm2; Panjang awal (L₀)=3; Satuan=m; Perubahan panjang (ΔL)=-0.72; Satuan=mm | σ = −40 MPa, ε = -0,00024 | -40 MPa (Tegangan dalam pascal-40 MPa; Regangan aksial (ε)-0,00024; Regangan dalam persen-0,024%; Jenis pembebananTekan) | OK |
| mekanika-teknik | Modulus Elastisitas | 1 | Yang ingin dihitung=modulus; Tegangan (σ)=200; Satuan=MPa; Regangan (ε)=0.001 | 200 GPa | 200 GPa (Modulus dalam pascal200 GPa; Tegangan200 MPa; Regangan0,001) | OK |
| mekanika-teknik | Modulus Elastisitas | 2 | Yang ingin dihitung=stress; Modulus elastisitas (E)=70; Satuan=GPa; Regangan (ε)=0.002 | 140 MPa | 140 MPa (Tegangan dalam pascal140 MPa; Modulus elastisitas70 GPa; Regangan0,002) | OK |
| mekanika-teknik | Modulus Elastisitas | 3 | Yang ingin dihitung=strain; Modulus elastisitas (E)=70; Satuan=GPa; Tegangan (σ)=140; Satuan=MPa | 0,002 | 0,002 (Regangan dalam persen0,2%; Tegangan140 MPa; Modulus elastisitas70 GPa) | OK |
| teknik-elektro | Hukum Ohm | 1 | Yang ingin dihitung=current; Tegangan (V)=12; Satuan=V; Hambatan (R)=6; Satuan=ohm | 2 A | 2 A (Tegangan12 V; Hambatan6 Ω; Daya24 W) | OK |
| teknik-elektro | Hukum Ohm | 2 | Yang ingin dihitung=resistance; Tegangan (V)=9; Satuan=V; Arus (I)=0.5; Satuan=A | 18 Ω | 18 Ω (Tegangan9 V; Arus0,5 A; Daya4,5 W) | OK |
| teknik-elektro | Hukum Ohm | 3 | Yang ingin dihitung=voltage; Arus (I)=2; Satuan=A; Hambatan (R)=5; Satuan=ohm | 10 V | 10 V (Arus2 A; Hambatan5 Ω; Daya20 W) | OK |
| teknik-elektro | Daya Listrik | 1 | Metode perhitungan=vi; Tegangan (V)=220; Satuan=V; Arus (I)=0.5; Satuan=A | 110 W | 110 W (Daya dalam kilowatt0,11 kW; Rumus yang dipakaiP = V × I; Energi per jam0,11 kWh) | OK |
| teknik-elektro | Daya Listrik | 2 | Metode perhitungan=i2r; Arus (I)=2; Satuan=A; Hambatan (R)=10; Satuan=ohm | 40 W | 40 W (Daya dalam kilowatt0,04 kW; Rumus yang dipakaiP = I² × R; Energi per jam0,04 kWh) | OK |
| teknik-elektro | Daya Listrik | 3 | Metode perhitungan=v2r; Tegangan (V)=220; Satuan=V; Hambatan (R)=44; Satuan=ohm | 1.100 W | 1.100 W (Daya dalam kilowatt1,1 kW; Rumus yang dipakaiP = V² / R; Energi per jam1,1 kWh) | OK |
| teknik-elektro | Resistansi Kawat | 1 | Resistivitas bahan (ρ)=0.0175; Panjang kawat (L)=100; Satuan=m; Luas penampang kawat (A)=1.5 | 1,166666667 Ω | 1,166666667 Ω (Hambatan dalam miliohm1.166,666667 mΩ; Resistivitas0,0175 Ω·mm²/m; Panjang100 m; Luas penampang1,5 mm²) | OK |
| teknik-elektro | Resistansi Kawat | 2 | Resistivitas bahan (ρ)=0.028; Panjang kawat (L)=50; Satuan=m; Luas penampang kawat (A)=2.5 | 0,56 Ω | 0,56 Ω (Hambatan dalam miliohm560 mΩ; Resistivitas0,028 Ω·mm²/m; Panjang50 m; Luas penampang2,5 mm²) | OK |
| teknik-elektro | Rangkaian Seri & Paralel | 1 | Jenis rangkaian=seri; Tegangan sumber (V)=10; Satuan=V; Hambatan R1 (Ω)=5; Hambatan R2 (Ω)=10 | R_s = 15 Ω, I = 0,6666666667 A | 15 Ω (Tegangan sumber10 V; Arus total0,6666666667 A; R1 (5 Ω)3,333333333 V, 0,6666666667 A; R2 (10 Ω)6,666666667 V, 0,6666666667 A) | OK |
| teknik-elektro | Rangkaian Seri & Paralel | 2 | Jenis rangkaian=paralel; Tegangan sumber (V)=10; Satuan=V; Hambatan R1 (Ω)=5; Hambatan R2 (Ω)=20 | R_p = 4 Ω, I = 2,5 A | 4 Ω (Tegangan sumber10 V; Arus total2,5 A; R1 (5 Ω)10 V, 2 A; R2 (20 Ω)10 V, 0,5 A) | OK |
| teknik-elektro | Rangkaian Seri & Paralel | 3 | Jenis rangkaian=paralel; Tegangan sumber (V)=12; Satuan=V; Hambatan R1 (Ω)=10; Hambatan R2 (Ω)=10 | R_p = 5 Ω, I tiap cabang = 1,2 A | 5 Ω (Tegangan sumber12 V; Arus total2,4 A; R1 (10 Ω)12 V, 1,2 A; R2 (10 Ω)12 V, 1,2 A) | OK |
| teknik-elektro | Energi Listrik | 1 | Daya peralatan (P)=100; Satuan=W; Lama pemakaian (t)=10; Tarif listrik=1500 | 1 kWh, Rp 1.500 | 1 kWh (Energi dalam joule3.600.000 J; Daya100 W = 0,1 kW; Lama pemakaian10 jam; Perkiraan biayaRp 1.500) | OK |
| teknik-elektro | Energi Listrik | 2 | Daya peralatan (P)=1; Satuan=kW; Lama pemakaian (t)=8; Tarif listrik=1444.7 | 8 kWh, Rp 11.558 | 8 kWh (Energi dalam joule28.800.000 J; Daya1.000 W = 1 kW; Lama pemakaian8 jam; Perkiraan biayaRp 11.558) | OK |
| teknik-elektro | Konversi Satuan Listrik | 1 | Jenis besaran listrik=tegangan; Nilai tegangan=5; Satuan=kV | 5.000 V | 5.000 V (Nilai masukan5 kV; Volt (V)5.000 V; Milivolt (mV)5.000.000 mV) | OK |
| teknik-elektro | Konversi Satuan Listrik | 2 | Jenis besaran listrik=arus; Nilai arus=2500; Satuan=mA | 2,5 A | 2,5 A (Nilai masukan2.500 mA; Ampere (A)2,5 A) | OK |
| teknik-elektro | Konversi Satuan Listrik | 3 | Jenis besaran listrik=energi; Nilai energi listrik=1; Satuan=kWh | 3.600.000 J | 3.600.000 J (Nilai masukan1 kWh; Joule (J)3.600.000 J; Kilojoule (kJ)3.600 kJ) | OK |
| teknik-elektro | Konversi Satuan Listrik | 4 | Jenis besaran listrik=hambatan; Nilai hambatan=2200; Satuan=ohm | 2,2 kΩ | 2.200 Ω (Nilai masukan2.200 Ω; Kiloohm (kΩ)2,2 kΩ; Megaohm (MΩ)0,0022 MΩ) | OK |
| teknik-sipil | Volume Beton | 1 | Panjang pelat (p)=4; Satuan=m; Lebar pelat (l)=3; Satuan=m; Tebal pelat (t)=0.12; Satuan=m | 1,44 m³ | 1,44 m³ (Volume dalam liter1.440 L; Panjang4 m; Lebar3 m; Tebal0,12 m) | OK |
| teknik-sipil | Volume Beton | 2 | Panjang pelat (p)=6; Satuan=m; Lebar pelat (l)=2.5; Satuan=m; Tebal pelat (t)=0.15; Satuan=m | 2,25 m³ | 2,25 m³ (Volume dalam liter2.250 L; Panjang6 m; Lebar2,5 m; Tebal0,15 m) | OK |
| teknik-sipil | Volume Balok | 1 | Panjang balok (p)=6; Satuan=m; Lebar balok (l)=0.3; Satuan=m; Tinggi balok (t)=0.5; Satuan=m | 0,9 m³ | 0,9 m³ (Volume dalam liter900 L; Luas penampang0,15 m²; Panjang6 m) | OK |
| teknik-sipil | Volume Balok | 2 | Panjang balok (p)=4; Satuan=m; Lebar balok (l)=0.25; Satuan=m; Tinggi balok (t)=0.4; Satuan=m | 0,4 m³ | 0,4 m³ (Volume dalam liter400 L; Luas penampang0,1 m²; Panjang4 m) | OK |
| teknik-sipil | Volume Kolom | 1 | Bentuk penampang kolom=persegi; Sisi A penampang=0.3; Satuan=m; Sisi B penampang=0.3; Satuan=m; Tinggi kolom (h)=4; Satuan=m | 0,36 m³ | 0,36 m³ (Luas penampang0,09 m²; Tinggi kolom4 m; Volume dalam liter360 L) | OK |
| teknik-sipil | Volume Kolom | 2 | Bentuk penampang kolom=bulat; Diameter kolom (D)=0.4; Satuan=m; Tinggi kolom (h)=4; Satuan=m | 0,5026548246 m³ | 0,5026548246 m³ (Luas penampang0,1256637061 m²; Tinggi kolom4 m; Volume dalam liter502,6548246 L) | OK |
| teknik-sipil | Luas Bangunan | 1 | Panjang lantai (p)=10; Satuan=m; Lebar lantai (l)=8; Satuan=m; Jumlah lantai=2 | 160 m² | 160 m² (Luas satu lantai80 m²; Jumlah lantai2 lantai; Luas dalam are1,6 are; Luas dalam hektare0,016 ha) | OK |
| teknik-sipil | Luas Bangunan | 2 | Panjang lantai (p)=12; Satuan=m; Lebar lantai (l)=9; Satuan=m; Jumlah lantai=1 | 108 m² | 108 m² (Luas satu lantai108 m²; Jumlah lantai1 lantai; Luas dalam are1,08 are; Luas dalam hektare0,0108 ha) | OK |
| teknik-sipil | Kebutuhan Material Beton | 1 | Volume beton (V)=1; Perbandingan campuran=1:2:3; Cadangan material=5 | 7,56 sak semen, 0,525 m³ pasir, 0,7875 m³ kerikil | 7,56 sak (50 kg) (Semen378 kg; Semen dibulatkan ke atas8 sak; Pasir0,525 m³; Kerikil0,7875 m³; Volume setelah cadangan1,05 m³; Volume kering1,575 m³) | OK |
| teknik-sipil | Kebutuhan Material Beton | 2 | Volume beton (V)=2; Perbandingan campuran=1:2:4; Cadangan material=0 | 12,34285714 sak semen, 0,8571428571 m³ pasir, 1,714285714 m³ kerikil | 12,34285714 sak (50 kg) (Semen617,1428571 kg; Semen dibulatkan ke atas13 sak; Pasir0,8571428571 m³; Kerikil1,714285714 m³; Volume setelah cadangan2 m³; Volume kering3 m³) | OK |
| teknik-sipil | Campuran Beton | 1 | Perbandingan campuran=1:2:3; Jumlah sak semen=1 | 0,06944444444 m³ pasir, 0,1041666667 m³ kerikil, 25 L air | 0,06944444444 m³ (Kerikil0,1041666667 m³; Perkiraan air25 L; Jumlah semen1 sak = 50 kg; Volume semen0,03472222222 m³; Campuran1:2:3) | OK |
| teknik-sipil | Campuran Beton | 2 | Perbandingan campuran=1:2:4; Jumlah sak semen=5 | 0,3472222222 m³ pasir, 0,6944444444 m³ kerikil | 0,3472222222 m³ (Kerikil0,6944444444 m³; Perkiraan air125 L; Jumlah semen5 sak = 250 kg; Volume semen0,1736111111 m³; Campuran1:2:4) | OK |
| teknik-sipil | Berat Besi Beton | 1 | Diameter besi (d)=10; Panjang satu batang (L)=12; Satuan=m; Jumlah batang=10 | 73,98450699 kg | 73,98450699 kg (Berat dalam ton0,07398450699 ton; Berat per meter0,6165375583 kg/m; Panjang total120 m; Jumlah batang10 batang) | OK |
| teknik-sipil | Berat Besi Beton | 2 | Diameter besi (d)=13; Panjang satu batang (L)=12; Satuan=m; Jumlah batang=5 | 62,51690841 kg | 62,51690841 kg (Berat dalam ton0,06251690841 ton; Berat per meter1,041948473 kg/m; Panjang total60 m; Jumlah batang5 batang) | OK |
| matematika-komputer | Bilangan Biner | 1 | Bilangan biner=1011 | 11 desimal (0xB) | 11 (Heksadesimal0xB; Oktal0o13; Jumlah bit4 bit; Bit aktif2^3, 2^1, 2^0) | OK |
| matematika-komputer | Bilangan Biner | 2 | Bilangan biner=11111111 | 255 desimal (0xFF) | 255 (Heksadesimal0xFF; Oktal0o377; Jumlah bit8 bit; Bit aktif2^7, 2^6, 2^5, 2^4, 2^3, 2^2, 2^1, 2^0) | OK |
| matematika-komputer | Bilangan Biner | 3 | Bilangan biner=100000000 | 256 desimal (0x100) | 256 (Heksadesimal0x100; Oktal0o400; Jumlah bit9 bit; Bit aktif2^8) | OK |
| matematika-komputer | Penjumlahan Biner | 1 | Bilangan biner pertama=1011; Bilangan biner kedua=0110 | 10001 biner = 17 desimal | 10001 biner (Nilai desimal hasil17; Carry akhir1; Panjang hasil5 bit) | OK |
| matematika-komputer | Penjumlahan Biner | 2 | Bilangan biner pertama=1111; Bilangan biner kedua=0001 | 10000 biner = 16 desimal | 10000 biner (Nilai desimal hasil16; Carry akhir1; Panjang hasil5 bit) | OK |
| matematika-komputer | Penjumlahan Biner | 3 | Bilangan biner pertama=110011; Bilangan biner kedua=10101 | 1001000 biner = 72 desimal | 1001000 biner (Nilai desimal hasil72; Carry akhir1; Panjang hasil7 bit) | OK |
| matematika-komputer | Pengurangan Biner | 1 | Bilangan biner pertama (yang dikurangi)=1101; Bilangan biner kedua (pengurang)=1011 | 10 biner = 2 desimal | 10 biner (Nilai desimal selisih2; Panjang hasil2 bit; Ada pinjamanYa) | OK |
| matematika-komputer | Pengurangan Biner | 2 | Bilangan biner pertama (yang dikurangi)=10000; Bilangan biner kedua (pengurang)=0111 | 1001 biner = 9 desimal | 1001 biner (Nilai desimal selisih9; Panjang hasil4 bit; Ada pinjamanYa) | OK |
| matematika-komputer | Pengurangan Biner | 3 | Bilangan biner pertama (yang dikurangi)=11111111; Bilangan biner kedua (pengurang)=00000001 | 11111110 biner = 254 desimal | 11111110 biner (Nilai desimal selisih254; Panjang hasil8 bit; Ada pinjamanTidak) | OK |
| matematika-komputer | Konversi Biner ↔ Desimal | 1 | Arah konversi=biner-desimal; Bilangan biner=1011 | 11 desimal | 11 (Heksadesimal0xB; Oktal0o13; Jumlah bit4 bit) | OK |
| matematika-komputer | Konversi Biner ↔ Desimal | 2 | Arah konversi=desimal-biner; Bilangan desimal=45 | 101101 biner | 101101 (Nilai desimal45; Heksadesimal0x2D; Oktal0o55; Panjang biner6 bit) | OK |
| matematika-komputer | Konversi Biner ↔ Desimal | 3 | Arah konversi=desimal-biner; Bilangan desimal=255 | 11111111 biner | 11111111 (Nilai desimal255; Heksadesimal0xFF; Oktal0o377; Panjang biner8 bit) | OK |
| matematika-komputer | Heksadesimal | 1 | Arah konversi=hex-desimal; Bilangan heksadesimal=FF | 255 desimal | 255 (Heksadesimal0xFF; Biner0b11111111; Oktal0o377; Jumlah digit2 digit) | OK |
| matematika-komputer | Heksadesimal | 2 | Arah konversi=hex-desimal; Bilangan heksadesimal=1A3 | 419 desimal | 419 (Heksadesimal0x1A3; Biner0b110100011; Oktal0o643; Jumlah digit3 digit) | OK |
| matematika-komputer | Heksadesimal | 3 | Arah konversi=desimal-hex; Bilangan desimal=255 | FF heksadesimal | FF (Nilai desimal255; Biner0b11111111; Oktal0o377) | OK: Jawaban non-numerik cocok. |
| matematika-komputer | Oktal | 1 | Arah konversi=oktal-desimal; Bilangan oktal=755 | 493 desimal | 493 (Oktal0o755; Biner0b111101101; Heksadesimal0x1ED; Jumlah digit3 digit) | OK |
| matematika-komputer | Oktal | 2 | Arah konversi=oktal-desimal; Bilangan oktal=64 | 52 desimal | 52 (Oktal0o64; Biner0b110100; Heksadesimal0x34; Jumlah digit2 digit) | OK |
| matematika-komputer | Oktal | 3 | Arah konversi=desimal-oktal; Bilangan desimal=255 | 377 oktal | 377 (Nilai desimal255; Biner0b11111111; Heksadesimal0xFF) | OK |
| konversi-satuan | Konversi Panjang | 1 | Nilai yang dikonversi=1; Dari satuan=km; Ke satuan=m; Presisi hasil=auto | 1.000 m | 1.000 m (Nilai asal1 km; Satuan dasar1.000 m; Rasio1 km = 1.000 m) | OK |
| konversi-satuan | Konversi Panjang | 2 | Nilai yang dikonversi=250; Dari satuan=cm; Ke satuan=m; Presisi hasil=auto | 2,5 m | 2,5 m (Nilai asal250 cm; Satuan dasar2,5 m; Rasio1 cm = 0,01 m) | OK |
| konversi-satuan | Konversi Panjang | 3 | Nilai yang dikonversi=6; Dari satuan=ft; Ke satuan=cm; Presisi hasil=auto | 182,88 cm | 182,88 cm (Nilai asal6 ft; Satuan dasar1,8288 m; Rasio1 ft = 30,48 cm) | OK |
| konversi-satuan | Konversi Massa | 1 | Nilai yang dikonversi=2; Dari satuan=kg; Ke satuan=g; Presisi hasil=auto | 2.000 g | 2.000 g (Nilai asal2 kg; Satuan dasar2 kg; Rasio1 kg = 1.000 g) | OK |
| konversi-satuan | Konversi Massa | 2 | Nilai yang dikonversi=1; Dari satuan=lb; Ke satuan=kg; Presisi hasil=auto | 0,45359237 kg | 0,45359237 kg (Nilai asal1 lb; Satuan dasar0,45359237 kg; Rasio1 lb = 0,45359237 kg) | OK |
| konversi-satuan | Konversi Massa | 3 | Nilai yang dikonversi=500; Dari satuan=mg; Ke satuan=g; Presisi hasil=auto | 0,5 g | 0,5 g (Nilai asal500 mg; Satuan dasar0,0005 kg; Rasio1 mg = 0,001 g) | OK |
| konversi-satuan | Konversi Luas | 1 | Nilai yang dikonversi=1; Dari satuan=ha; Ke satuan=m2; Presisi hasil=auto | 10.000 m² | 10.000 m² (Nilai asal1 ha; Satuan dasar10.000 m²; Rasio1 ha = 10.000 m²) | OK |
| konversi-satuan | Konversi Luas | 2 | Nilai yang dikonversi=12; Dari satuan=m2; Ke satuan=cm2; Presisi hasil=auto | 120.000 cm² | 120.000 cm² (Nilai asal12 m²; Satuan dasar12 m²; Rasio1 m² = 10.000 cm²) | OK |
| konversi-satuan | Konversi Luas | 3 | Nilai yang dikonversi=1; Dari satuan=acre; Ke satuan=m2; Presisi hasil=auto | 4.046,856422 m² | 4.046,856422 m² (Nilai asal1 acre; Satuan dasar4.046,856422 m²; Rasio1 acre = 4.046,856422 m²) | OK |
| konversi-satuan | Konversi Volume | 1 | Nilai yang dikonversi=2; Dari satuan=m3; Ke satuan=L; Presisi hasil=auto | 2.000 L | 2.000 L (Nilai asal2 m³; Satuan dasar2 m³; Rasio1 m³ = 1.000 L) | OK |
| konversi-satuan | Konversi Volume | 2 | Nilai yang dikonversi=500; Dari satuan=mL; Ke satuan=L; Presisi hasil=auto | 0,5 L | 0,5 L (Nilai asal500 mL; Satuan dasar0,0005 m³; Rasio1 mL = 0,001 L) | OK |
| konversi-satuan | Konversi Volume | 3 | Nilai yang dikonversi=1; Dari satuan=ft3; Ke satuan=L; Presisi hasil=auto | 28,31684659 L | 28,31684659 L (Nilai asal1 ft³; Satuan dasar0,02831684659 m³; Rasio1 ft³ = 28,31684659 L) | OK |
| konversi-satuan | Konversi Suhu | 1 | Nilai yang dikonversi=0; Dari satuan=C; Ke satuan=F; Presisi hasil=auto | 32 °F | 32 °F (Nilai asal0 °C; Setara Kelvin273,15 K; Rasio1 °C = 33,8 °F) | OK |
| konversi-satuan | Konversi Suhu | 2 | Nilai yang dikonversi=25; Dari satuan=C; Ke satuan=K; Presisi hasil=auto | 298,15 K | 298,15 K (Nilai asal25 °C; Setara Kelvin298,15 K; Rasio1 °C = 274,15 K) | OK |
| konversi-satuan | Konversi Suhu | 3 | Nilai yang dikonversi=98.6; Dari satuan=F; Ke satuan=C; Presisi hasil=auto | 37 °C | 37 °C (Nilai asal98,6 °F; Setara Kelvin310,15 K; Rasio1 °F = -17,22222222 °C) | OK |
| konversi-satuan | Konversi Kecepatan | 1 | Nilai yang dikonversi=72; Dari satuan=km/h; Ke satuan=m/s; Presisi hasil=auto | 20 m/s | 20 m/s (Nilai asal72 km/jam; Satuan dasar20 m/s; Rasio1 km/jam = 0,2777777778 m/s) | OK |
| konversi-satuan | Konversi Kecepatan | 2 | Nilai yang dikonversi=10; Dari satuan=m/s; Ke satuan=km/h; Presisi hasil=auto | 36 km/jam | 36 km/jam (Nilai asal10 m/s; Satuan dasar10 m/s; Rasio1 m/s = 3,6 km/jam) | OK |
| konversi-satuan | Konversi Kecepatan | 3 | Nilai yang dikonversi=20; Dari satuan=knot; Ke satuan=km/h; Presisi hasil=auto | 37,04 km/jam | 37,04 km/jam (Nilai asal20 knot; Satuan dasar10,28888889 m/s; Rasio1 knot = 1,852 km/jam) | OK |
| konversi-satuan | Konversi Waktu | 1 | Nilai yang dikonversi=1.5; Dari satuan=h; Ke satuan=min; Presisi hasil=auto | 90 menit | 90 menit (Nilai asal1,5 jam; Satuan dasar5.400 s; Rasio1 jam = 60 menit) | OK |
| konversi-satuan | Konversi Waktu | 2 | Nilai yang dikonversi=90; Dari satuan=s; Ke satuan=min; Presisi hasil=auto | 1,5 menit | 1,5 menit (Nilai asal90 s; Satuan dasar90 s; Rasio1 s = 0,01666666667 menit) | OK |
| konversi-satuan | Konversi Waktu | 3 | Nilai yang dikonversi=1; Dari satuan=day; Ke satuan=h; Presisi hasil=auto | 24 jam | 24 jam (Nilai asal1 hari; Satuan dasar86.400 s; Rasio1 hari = 24 jam) | OK |
| konversi-satuan | Konversi Tekanan | 1 | Nilai yang dikonversi=1; Dari satuan=atm; Ke satuan=Pa; Presisi hasil=auto | 101.325 Pa | 101.325 Pa (Nilai asal1 atm; Satuan dasar101.325 Pa; Rasio1 atm = 101.325 Pa) | OK |
| konversi-satuan | Konversi Tekanan | 2 | Nilai yang dikonversi=32; Dari satuan=psi; Ke satuan=bar; Presisi hasil=auto | 2,206322334 bar | 2,206322334 bar (Nilai asal32 psi; Satuan dasar220.632,2334 Pa; Rasio1 psi = 0,06894757293 bar) | OK |
| konversi-satuan | Konversi Tekanan | 3 | Nilai yang dikonversi=2; Dari satuan=MPa; Ke satuan=bar; Presisi hasil=auto | 20 bar | 20 bar (Nilai asal2 MPa; Satuan dasar2.000.000 Pa; Rasio1 MPa = 10 bar) | OK |
| konversi-satuan | Konversi Energi | 1 | Nilai yang dikonversi=1; Dari satuan=kWh; Ke satuan=J; Presisi hasil=auto | 3.600.000 J | 3.600.000 J (Nilai asal1 kWh; Satuan dasar3.600.000 J; Rasio1 kWh = 3.600.000 J) | OK |
| konversi-satuan | Konversi Energi | 2 | Nilai yang dikonversi=500; Dari satuan=cal; Ke satuan=J; Presisi hasil=auto | 2.092 J | 2.092 J (Nilai asal500 cal; Satuan dasar2.092 J; Rasio1 cal = 4,184 J) | OK |
| konversi-satuan | Konversi Energi | 3 | Nilai yang dikonversi=12000; Dari satuan=BTU; Ke satuan=kJ; Presisi hasil=auto | 12.660,67023 kJ | 12.660,67023 kJ (Nilai asal12.000 BTU; Satuan dasar12.660.670,23 J; Rasio1 BTU = 1,055055853 kJ) | OK |
| konversi-satuan | Konversi Daya | 1 | Nilai yang dikonversi=1; Dari satuan=hp; Ke satuan=W; Presisi hasil=auto | 745,6998716 W | 745,6998716 W (Nilai asal1 hp; Satuan dasar745,6998716 W; Rasio1 hp = 745,6998716 W) | OK |
| konversi-satuan | Konversi Daya | 2 | Nilai yang dikonversi=1500; Dari satuan=W; Ke satuan=kW; Presisi hasil=auto | 1,5 kW | 1,5 kW (Nilai asal1.500 W; Satuan dasar1.500 W; Rasio1 W = 0,001 kW) | OK |
| konversi-satuan | Konversi Daya | 3 | Nilai yang dikonversi=2; Dari satuan=MW; Ke satuan=kW; Presisi hasil=auto | 2.000 kW | 2.000 kW (Nilai asal2 MW; Satuan dasar2.000.000 W; Rasio1 MW = 1.000 kW) | OK |

## Error konsol

Tidak ada error konsol selama audit.

