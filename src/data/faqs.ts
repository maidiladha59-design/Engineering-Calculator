export interface CalculatorFaq {
  question: string;
  answer: string;
}

export const calculatorFaqs: Record<string, CalculatorFaq[]> = {
  "matematika/dasar": [
    {
      question: "Apakah kalkulator dasar mengikuti urutan operasi matematika?",
      answer:
        "Kalkulator ini menghitung dua bilangan dengan satu operator pada satu waktu, bukan mengevaluasi ekspresi panjang. Untuk ekspresi campuran seperti 2 + 3 × 4, hitung perkalian lebih dulu, lalu penjumlahan.",
    },
    {
      question: "Apa yang terjadi jika saya membagi dengan nol?",
      answer:
        "Hasil tidak ditampilkan dan muncul pesan kesalahan. Pembagian dengan nol tidak terdefinisi dalam matematika, bukan bernilai nol atau tak hingga.",
    },
    {
      question: "Bisakah memasukkan bilangan negatif dan desimal?",
      answer:
        "Bisa. Gunakan tanda minus untuk bilangan negatif dan koma atau titik untuk desimal. Hasil ditampilkan dengan format angka Indonesia.",
    },
  ],
  "matematika/persentase": [
    {
      question: "Apa beda perubahan persen dan selisih persen?",
      answer:
        "Perubahan persen memakai nilai awal sebagai pembagi, misalnya dari 200 ke 250 adalah kenaikan 25%. Selisih persen memakai rata-rata kedua nilai sebagai pembagi sehingga hasilnya simetris, yaitu 22,22% untuk 200 dan 250.",
    },
    {
      question: "Bagaimana menghitung harga setelah diskon 20%?",
      answer:
        "Gunakan mode persen dari angka: hitung 20% × harga awal, lalu kurangkan hasilnya dari harga awal. Untuk harga Rp200.000, diskonnya Rp40.000 dan harga akhirnya Rp160.000.",
    },
    {
      question: "Mengapa perubahan persen dari nilai nol tidak bisa dihitung?",
      answer:
        "Karena rumus perubahan persen membagi selisih dengan nilai awal. Jika nilai awal nol, pembagiannya tidak terdefinisi sehingga kalkulator menampilkan kesalahan.",
    },
  ],
  "matematika/pecahan": [
    {
      question: "Apakah hasil pecahan otomatis disederhanakan?",
      answer:
        "Ya. Pembilang dan penyebut dibagi dengan faktor persekutuan terbesar, lalu hasil juga ditampilkan sebagai pecahan campuran bila nilainya lebih dari satu.",
    },
    {
      question: "Bagaimana cara membagi dua pecahan?",
      answer:
        "Kalikan pecahan pertama dengan kebalikan pecahan kedua. Contohnya 3/4 ÷ 2/5 sama dengan 3/4 × 5/2 = 15/8 atau 1 7/8.",
    },
    {
      question: "Mengapa penyebut nol ditolak?",
      answer:
        "Pecahan dengan penyebut nol tidak terdefinisi karena berarti membagi dengan nol. Kalkulator memvalidasi kedua penyebut sebelum menghitung.",
    },
  ],
  "matematika/pangkat-akar": [
    {
      question: "Mengapa akar genap dari bilangan negatif tidak bisa dihitung?",
      answer:
        "Akar berindeks genap dari bilangan negatif menghasilkan bilangan kompleks, sedangkan kalkulator ini hanya menampilkan bilangan real. Akar berindeks ganjil, seperti akar pangkat tiga dari -8, tetap bisa dihitung.",
    },
    {
      question: "Bagaimana pangkat negatif dihitung?",
      answer:
        "Pangkat negatif berarti kebalikan dari pangkat positif: a⁻ⁿ = 1 ÷ aⁿ. Contohnya 5⁻² = 1 ÷ 25 = 0,04.",
    },
    {
      question: "Bisakah memakai indeks akar selain 2 dan 3?",
      answer:
        "Bisa, selama indeksnya bilangan bulat minimal 2. Indeks 4 berarti akar pangkat empat, indeks 5 akar pangkat lima, dan seterusnya.",
    },
  ],
  "matematika/logaritma": [
    {
      question: "Basis apa saja yang didukung kalkulator logaritma?",
      answer:
        "Semua basis positif yang tidak sama dengan 1, termasuk basis pecahan. Perhitungan memakai perubahan basis: log basis b dari x sama dengan ln x ÷ ln b.",
    },
    {
      question: "Mengapa logaritma dari nol atau bilangan negatif menghasilkan kesalahan?",
      answer:
        "Domain logaritma hanya mencakup bilangan positif. Tidak ada pangkat real yang membuat basis positif menghasilkan nol atau bilangan negatif.",
    },
    {
      question: "Apa bedanya log dan ln?",
      answer:
        "Log umumnya berarti logaritma basis 10, sedangkan ln adalah logaritma natural berbasis e sekitar 2,71828. Kalkulator ini memakai basis yang Anda masukkan secara eksplisit.",
    },
  ],
  "matematika/persamaan-kuadrat": [
    {
      question: "Bagaimana akar ditampilkan jika diskriminan negatif?",
      answer:
        "Akar ditulis sebagai bilangan kompleks konjugat dengan satuan imajiner i. Contohnya x² + 2x + 5 = 0 menghasilkan -1 ± 2i.",
    },
    {
      question: "Mengapa koefisien a tidak boleh nol?",
      answer:
        "Jika a = 0, suku kuadrat hilang dan persamaan berubah menjadi persamaan linear. Rumus abc dengan pembagi 2a juga tidak dapat dipakai.",
    },
    {
      question: "Apa arti akar kembar?",
      answer:
        "Akar kembar terjadi saat diskriminan sama dengan nol. Persamaan tetap memiliki satu solusi real, tetapi solusi tersebut dihitung dua kali.",
    },
  ],
  "matematika/sistem-persamaan-linear": [
    {
      question: "Kapan sistem dua persamaan linear tidak memiliki solusi?",
      answer:
        "Saat determinan utama nol dan kedua garis sejajar, misalnya x + y = 2 dan 2x + 2y = 5. Kalkulator membedakan kondisi tidak ada solusi dari tak hingga solusi.",
    },
    {
      question: "Metode apa yang dipakai kalkulator ini?",
      answer:
        "Metode determinan Cramer, dilengkapi langkah determinan bantu Dx dan Dy serta substitusi balik untuk memeriksa hasil.",
    },
    {
      question: "Bisakah koefisien berupa bilangan negatif atau desimal?",
      answer:
        "Bisa. Masukkan tanda minus bila perlu dan gunakan koma atau titik untuk desimal; kalkulator menghitung dengan nilai tersebut.",
    },
  ],

  "fisika/kecepatan": [
    {
      question: "Satuan apa saja yang didukung kalkulator kecepatan?",
      answer:
        "Panjang dalam meter, kilometer, sentimeter, dan milimeter; waktu dalam detik, menit, dan jam; kecepatan dalam m/s dan km/jam. Semua dikonversi ke satuan SI sebelum dihitung.",
    },
    {
      question: "Bagaimana mengubah kecepatan km/jam menjadi m/s?",
      answer:
        "Bagi nilai km/jam dengan 3,6. Sebaliknya, kalikan m/s dengan 3,6 untuk memperoleh km/jam. Kalkulator melakukan konversi ini secara otomatis.",
    },
    {
      question: "Mengapa waktu nol tidak bisa dipakai saat mencari kecepatan?",
      answer:
        "Kecepatan dihitung sebagai jarak dibagi waktu. Jika waktu nol, pembagian tidak terdefinisi sehingga kalkulator menolak nilai tersebut.",
    },
  ],
  "fisika/percepatan": [
    {
      question: "Apa arti percepatan bernilai negatif?",
      answer:
        "Percepatan negatif berarti kecepatan berkurang bila arah positif sudah ditetapkan, atau arah percepatan berlawanan dengan arah gerak. Nilai negatif tetap valid dan bukan kesalahan.",
    },
    {
      question: "Apakah kecepatan harus dimasukkan dalam m/s?",
      answer:
        "Tidak. Anda bisa memilih km/jam atau m/s; kalkulator mengonversi ke m/s, dan waktu ke detik, sebelum menerapkan rumus a = (v - u) ÷ t.",
    },
    {
      question: "Mengapa percepatan nol tidak bisa dipakai untuk mencari waktu?",
      answer:
        "Rumus waktu adalah t = (v - u) ÷ a. Percepatan nol membuat pembagian tidak terdefinisi, dan secara fisika kecepatan tidak akan berubah.",
    },
  ],
  "fisika/gaya": [
    {
      question: "Apa beda massa dan berat?",
      answer:
        "Massa adalah jumlah materi dan diukur dalam kilogram, sedangkan berat adalah gaya gravitasi pada massa tersebut dan diukur dalam newton. Berat dihitung dengan w = m × g.",
    },
    {
      question: "Satuan massa apa yang bisa dipakai?",
      answer:
        "Kalkulator mendukung gram, kilogram, dan ton. Nilainya dikonversi ke kilogram sebelum dipakai pada rumus F = m × a.",
    },
    {
      question: "Bagaimana jika benda dipengaruhi beberapa gaya?",
      answer:
        "Hitung resultan gaya lebih dulu dengan memperhatikan arahnya, lalu gunakan resultan itu sebagai F. Gaya yang berlawanan arah mengurangi gaya searah.",
    },
  ],
  "fisika/usaha-energi": [
    {
      question: "Apakah kalkulator ini memperhitungkan sudut gaya?",
      answer:
        "Tidak. Kalkulator memakai W = F × s untuk gaya yang searah perpindahan, sehingga cos 0° = 1. Jika gaya membentuk sudut, kalikan F dengan cos sudut terlebih dahulu.",
    },
    {
      question: "Satuan apa yang dipakai untuk usaha?",
      answer:
        "Usaha dinyatakan dalam joule. Satu joule sama dengan satu newton-meter, dan kalkulator juga menampilkan ekuivalen dalam kilojoule bila nilainya besar.",
    },
    {
      question: "Kapan usaha bernilai nol?",
      answer:
        "Usaha nol terjadi bila perpindahannya nol atau gaya tegak lurus terhadap perpindahan. Contohnya gaya angkat saat barang dipindahkan horizontal tidak melakukan usaha.",
    },
  ],
  "fisika/daya": [
    {
      question: "Apa beda watt dan kilowatt jam?",
      answer:
        "Watt adalah satuan daya, yaitu energi per detik. Kilowatt jam adalah satuan energi yang setara dengan daya satu kilowatt selama satu jam, atau 3,6 juta joule.",
    },
    {
      question: "Satuan waktu apa yang bisa dipakai?",
      answer:
        "Detik, menit, dan jam. Kalkulator mengonversi waktu ke detik agar hasil daya langsung dalam watt.",
    },
    {
      question: "Mengapa waktu nol tidak bisa dipakai?",
      answer:
        "Daya dihitung sebagai usaha dibagi waktu. Jika waktu nol, pembagian tidak terdefinisi sehingga kalkulator menampilkan kesalahan validasi.",
    },
  ],
  "fisika/momentum": [
    {
      question: "Apakah momentum termasuk besaran vektor?",
      answer:
        "Ya. Momentum memiliki besar dan arah, sehingga tanda positif atau negatif menunjukkan arah gerak relatif terhadap acuan yang dipilih.",
    },
    {
      question: "Apa satuan momentum?",
      answer:
        "Satuan SI momentum adalah kilogram meter per detik (kg·m/s), yang setara dengan newton sekon (N·s).",
    },
    {
      question: "Bisakah kecepatan dimasukkan sebagai bilangan negatif?",
      answer:
        "Bisa, untuk benda yang bergerak berlawanan arah dengan acuan positif. Momentum hasilnya juga akan bernilai negatif.",
    },
  ],
  "fisika/impuls": [
    {
      question: "Apa hubungan impuls dan momentum?",
      answer:
        "Impuls sama dengan perubahan momentum: I = Δp. Kalkulator impuls memakai I = F × Δt, dan hasilnya setara dengan perubahan momentum benda.",
    },
    {
      question: "Apa satuan impuls?",
      answer:
        "Satuan impuls adalah newton sekon (N·s), yang setara dengan kg·m/s. Keduanya dapat dipakai bergantian.",
    },
    {
      question: "Mengapa selang waktu nol tidak bisa dipakai untuk mencari gaya?",
      answer:
        "Gaya dihitung sebagai impuls dibagi selang waktu. Selang waktu nol membuat pembagian tidak terdefinisi, bukan menghasilkan gaya tak hingga.",
    },
  ],
  "fisika/tekanan": [
    {
      question: "Mengapa luas bidang tekan tidak boleh nol?",
      answer:
        "Tekanan adalah gaya dibagi luas. Luas nol membuat pembagian tidak terdefinisi, sehingga kalkulator menolak nilai tersebut.",
    },
    {
      question: "Satuan luas apa yang didukung?",
      answer:
        "Meter persegi, sentimeter persegi, dan milimeter persegi. Nilainya dikonversi ke meter persegi sebelum dipakai pada rumus P = F ÷ A.",
    },
    {
      question: "Apa beda tekanan dan gaya?",
      answer:
        "Gaya adalah dorongan atau tarikan total dalam newton, sedangkan tekanan adalah gaya yang tersebar per satuan luas dalam pascal. Gaya sama pada luas lebih kecil menghasilkan tekanan lebih besar.",
    },
  ],
  "fisika/massa-jenis": [
    {
      question: "Satuan massa jenis apa yang didukung?",
      answer:
        "Kilogram per meter kubik (kg/m³) dan gram per sentimeter kubik (g/cm³). Satu g/cm³ sama dengan 1.000 kg/m³.",
    },
    {
      question: "Apakah massa jenis sama dengan berat jenis?",
      answer:
        "Tidak. Massa jenis adalah massa per volume, sedangkan berat jenis adalah berat per volume dan diperoleh dengan mengalikan massa jenis dengan percepatan gravitasi.",
    },
    {
      question: "Mengapa volume nol tidak bisa dipakai?",
      answer:
        "Massa jenis dihitung sebagai massa dibagi volume. Volume nol membuat pembagian tidak terdefinisi sehingga kalkulator menolak nilai tersebut.",
    },
  ],

  "mekanika-teknik/momen-gaya": [
    {
      question: "Apa yang dimaksud lengan momen?",
      answer:
        "Lengan momen adalah jarak tegak lurus dari titik acuan ke garis kerja gaya. Semakin panjang lengan momen, semakin besar momen yang dihasilkan untuk gaya yang sama.",
    },
    {
      question: "Apa satuan momen gaya?",
      answer:
        "Momen gaya dinyatakan dalam newton meter (N·m). Satuannya berbeda dengan joule meskipun dimensinya sama, karena momen bukan energi.",
    },
    {
      question: "Mengapa sudut 90° menghasilkan momen terbesar?",
      answer:
        "Karena momen sebanding dengan sin sudut, dan sin 90° = 1. Pada sudut 0° atau 180°, garis kerja gaya melewati titik acuan sehingga momennya nol.",
    },
  ],
  "mekanika-teknik/torsi": [
    {
      question: "Apa beda torsi dan momen gaya?",
      answer:
        "Secara fisika keduanya sama-sama momen. Istilah torsi biasanya dipakai untuk puntiran pada poros, sedangkan momen gaya dipakai untuk gaya yang membengkokkan atau memutar benda.",
    },
    {
      question: "Bagaimana komponen gaya tangensial dihitung?",
      answer:
        "Hanya komponen gaya yang tegak lurus jari-jari yang menghasilkan torsi, yaitu F sin θ bila sudut diukur terhadap arah radial. Kalkulator menampilkan komponen tersebut pada langkah perhitungan.",
    },
    {
      question: "Apa satuan torsi?",
      answer:
        "Torsi dinyatakan dalam newton meter (N·m). Pada mesin, torsi sering juga dinyatakan dalam kgf·m untuk keperluan praktis.",
    },
  ],
  "mekanika-teknik/keseimbangan-benda": [
    {
      question: "Bagaimana reaksi tumpuan dihitung?",
      answer:
        "Kalkulator mengambil momen terhadap salah satu tumpuan untuk memperoleh reaksi di tumpuan lain, lalu memakai keseimbangan gaya vertikal agar jumlah kedua reaksi sama dengan beban.",
    },
    {
      question: "Apakah berat balok sendiri diperhitungkan?",
      answer:
        "Tidak. Perhitungan ini hanya meninjau beban titik yang Anda masukkan. Berat sendiri balok perlu ditambahkan sebagai beban tambahan bila relevan.",
    },
    {
      question: "Apa satuan yang dipakai?",
      answer:
        "Gaya dalam newton atau kilonewton dan jarak dalam meter. Hasil reaksi tumpuan mengikuti satuan gaya yang dipilih.",
    },
  ],
  "mekanika-teknik/pusat-massa": [
    {
      question: "Apakah pusat massa harus berada di salah satu titik massa?",
      answer:
        "Tidak. Pusat massa adalah titik rata-rata berbobot dan bisa berada di antara titik-titik tersebut, misalnya pada dua massa berbeda yang dihubungkan batang ringan.",
    },
    {
      question: "Berapa jumlah titik massa yang bisa dimasukkan?",
      answer:
        "Sampai sepuluh titik. Setiap titik membutuhkan massa lebih dari nol serta koordinat x dan y dalam meter.",
    },
    {
      question: "Mengapa hasil pusat massa dinyatakan dalam meter?",
      answer:
        "Karena koordinat input menggunakan meter. Jika data Anda dalam sentimeter, ubah ke meter lebih dulu agar hasilnya konsisten.",
    },
  ],
  "mekanika-teknik/momen-inersia": [
    {
      question: "Bentuk benda apa saja yang didukung?",
      answer:
        "Silinder pejal, bola pejal, dan batang. Setiap bentuk memiliki rumus berbeda yang bergantung pada massa, dimensi, dan sumbu putar.",
    },
    {
      question: "Mengapa sumbu putar memengaruhi momen inersia?",
      answer:
        "Jarak massa terhadap sumbu menentukan momen inersia. Massa yang lebih jauh dari sumbu memberikan momen inersia lebih besar, sehingga rumus tiap sumbu berbeda.",
    },
    {
      question: "Apa satuan momen inersia?",
      answer:
        "Satuan SI momen inersia adalah kilogram meter persegi (kg·m²), karena massa dikalikan kuadrat jarak.",
    },
  ],
  "mekanika-teknik/energi-kinetik-rotasi": [
    {
      question: "Bagaimana energi kinetik rotasi dihitung?",
      answer:
        "Dengan rumus Ek = ½ × I × ω², yaitu setengah momen inersia dikali kuadrat kecepatan sudut. Kalkulator menampilkan langkah dan konversi satuannya.",
    },
    {
      question: "Apakah kecepatan rpm bisa langsung dipakai?",
      answer:
        "Kalkulator mengonversi rpm ke radian per detik lebih dulu, karena rumus energi kinetik rotasi memakai satuan rad/s.",
    },
    {
      question: "Apa satuan energi kinetik rotasi?",
      answer:
        "Satuannya joule, sama seperti energi kinetik translasi, karena kg·m²/s² setara dengan joule.",
    },
  ],
  "mekanika-teknik/tegangan-regangan": [
    {
      question: "Apa beda tegangan dan regangan?",
      answer:
        "Tegangan adalah gaya per luas penampang dalam pascal, sedangkan regangan adalah perbandingan perubahan panjang terhadap panjang awal dan tidak bersatuan.",
    },
    {
      question: "Satuan apa yang dipakai untuk tegangan?",
      answer:
        "Tegangan dinyatakan dalam pascal (Pa) atau megapascal (MPa). Satu MPa sama dengan satu juta pascal atau satu newton per milimeter persegi.",
    },
    {
      question: "Mengapa luas penampang tidak boleh nol?",
      answer:
        "Tegangan dihitung sebagai gaya dibagi luas. Luas nol membuat pembagian tidak terdefinisi sehingga kalkulator menolak nilai tersebut.",
    },
  ],
  "mekanika-teknik/modulus-elastisitas": [
    {
      question: "Apa satuan modulus elastisitas?",
      answer:
        "Modulus elastisitas memiliki satuan yang sama dengan tegangan, yaitu pascal atau megapascal, karena regangan tidak bersatuan.",
    },
    {
      question: "Apa arti nilai modulus elastisitas yang besar?",
      answer:
        "Semakin besar modulus elastisitas, semakin kaku material tersebut. Untuk regangan yang sama, material dengan modulus lebih besar membutuhkan tegangan lebih tinggi.",
    },
    {
      question: "Bisakah regangan bernilai nol?",
      answer:
        "Regangan nol membuat pembagian tidak terdefinisi saat mencari modulus. Secara fisik, regangan nol berarti tidak ada perubahan panjang sehingga modulus tidak dapat ditentukan.",
    },
  ],

  "teknik-elektro/hukum-ohm": [
    {
      question: "Kapan hukum Ohm tidak berlaku?",
      answer:
        "Hukum Ohm berlaku untuk resistor yang hambatannya relatif tetap. Komponen non-ohmik seperti dioda dan lampu pijar yang berubah suhu tidak mengikuti hubungan linear V = I × R.",
    },
    {
      question: "Satuan apa yang dipakai kalkulator ini?",
      answer:
        "Tegangan dalam volt, arus dalam ampere termasuk miliampere, dan hambatan dalam ohm termasuk kiloohm. Kalkulator mengonversi satuan sebelum menghitung.",
    },
    {
      question: "Mengapa hambatan nol tidak bisa dipakai saat mencari arus?",
      answer:
        "Arus dihitung sebagai tegangan dibagi hambatan. Hambatan nol membuat pembagian tidak terdefinisi, dan secara fisik menunjukkan hubungan singkat.",
    },
  ],
  "teknik-elektro/daya-listrik": [
    {
      question: "Rumus daya listrik mana yang sebaiknya dipakai?",
      answer:
        "P = V × I dipakai bila tegangan dan arus diketahui, P = I² × R bila arus dan hambatan diketahui, dan P = V² ÷ R bila tegangan dan hambatan diketahui. Hasil ketiganya sama untuk beban resistif.",
    },
    {
      question: "Apa satuan daya listrik?",
      answer:
        "Satuan SI daya adalah watt (W). Untuk beban besar, hasil dapat dinyatakan dalam kilowatt, yang sama dengan 1.000 watt.",
    },
    {
      question: "Mengapa hasil daya berbeda saat memakai rumus berbeda?",
      answer:
        "Perbedaan biasanya berasal dari pembulatan nilai arus atau hambatan. Gunakan nilai yang konsisten dan periksa kembali satuan sebelum menyimpulkan ada kesalahan.",
    },
  ],
  "teknik-elektro/resistansi-kawat": [
    {
      question: "Bagaimana hambatan kawat dihitung?",
      answer:
        "Dengan R = ρ × L ÷ A, yaitu resistivitas material dikali panjang kawat dibagi luas penampang. Panjang dikonversi ke meter dan luas penampang ke meter persegi.",
    },
    {
      question: "Satuan luas penampang apa yang bisa dipakai?",
      answer:
        "Kalkulator mendukung milimeter persegi dan meter persegi. Satuan mm² lazim dipakai pada kawat listrik dan dikonversi otomatis.",
    },
    {
      question: "Berapa resistivitas tembaga yang umum dipakai?",
      answer:
        "Sekitar 1,68 × 10⁻⁸ Ω·m pada suhu ruang. Nilai ini bisa berbeda sedikit tergantung kemurnian dan suhu kawat.",
    },
  ],
  "teknik-elektro/rangkaian-seri-paralel": [
    {
      question: "Apa beda rangkaian seri dan paralel?",
      answer:
        "Pada seri, hambatan pengganti adalah jumlah semua hambatan dan arus sama di setiap resistor. Pada paralel, kebalikan hambatan pengganti adalah jumlah kebalikan tiap hambatan dan tegangannya sama.",
    },
    {
      question: "Berapa resistor yang bisa dimasukkan?",
      answer:
        "Jumlah resistor dinamis dan bisa ditambah atau dihapus sesuai kebutuhan. Minimal satu resistor dengan nilai lebih dari nol.",
    },
    {
      question: "Mengapa hambatan paralel lebih kecil dari hambatan terkecil?",
      answer:
        "Karena setiap resistor paralel menambah jalur baru untuk arus. Semakin banyak jalur, semakin mudah arus mengalir sehingga hambatan pengganti menurun.",
    },
  ],
  "teknik-elektro/energi-listrik": [
    {
      question: "Apa hubungan kWh dan joule?",
      answer:
        "Satu kilowatt jam sama dengan 3,6 juta joule. kWh dipakai untuk tagihan listrik karena lebih praktis untuk pemakaian rumah tangga.",
    },
    {
      question: "Bagaimana estimasi biaya listrik dihitung?",
      answer:
        "Energi dalam kWh dikalikan tarif per kWh. Kalkulator menampilkan energi dan biaya berdasarkan daya, waktu pemakaian, serta tarif yang Anda masukkan.",
    },
    {
      question: "Apakah perhitungan ini memperhitungkan daya yang berubah?",
      answer:
        "Tidak. Kalkulator mengasumsikan daya konstan selama waktu pemakaian. Untuk alat dengan daya berubah, hitung per segmen waktu lalu jumlahkan energinya.",
    },
  ],
  "teknik-elektro/konversi-satuan-listrik": [
    {
      question: "Satuan listrik apa saja yang bisa dikonversi?",
      answer:
        "Tegangan (volt), arus (ampere), hambatan (ohm), daya (watt), dan energi (joule atau kilowatt jam). Konversi berlaku dua arah.",
    },
    {
      question: "Apakah konversi bisa dilakukan bolak-balik?",
      answer:
        "Ya. Pilih satuan asal dan satuan tujuan; nilai hasil dapat dipakai sebagai input untuk konversi arah sebaliknya.",
    },
    {
      question: "Bagaimana presisi hasil konversi ditentukan?",
      answer:
        "Hasil ditampilkan dengan pembulatan desimal yang wajar. Untuk kebutuhan presisi tinggi, perhatikan nilai faktor konversi yang ditampilkan pada tabel referensi.",
    },
  ],

  "teknik-sipil/volume-beton": [
    {
      question: "Satuan apa yang harus dipakai?",
      answer:
        "Masukkan panjang, lebar, dan tebal dalam meter. Hasil volume dinyatakan dalam meter kubik (m³), yang bisa dikonversi ke liter dengan mengalikan 1.000.",
    },
    {
      question: "Apakah volume ini sudah termasuk pemborosan material?",
      answer:
        "Belum. Volume yang dihitung adalah volume geometris. Untuk pemesanan beton, tambahkan cadangan sekitar 5–10% agar tidak kekurangan akibat tumpahan dan ketidakrataan.",
    },
    {
      question: "Apakah kalkulator ini bisa dipakai untuk pelat lantai?",
      answer:
        "Bisa. Untuk pelat, gunakan panjang dan lebar pelat sebagai dimensi, lalu tebal pelat sebagai tinggi atau tebal pada rumus volume.",
    },
  ],
  "teknik-sipil/volume-balok": [
    {
      question: "Apa beda volume balok dan volume beton?",
      answer:
        "Prinsipnya sama, yaitu panjang × lebar × tinggi. Kalkulator volume beton menekankan tebal elemen pelat, sedangkan kalkulator volume balok memakai tinggi balok dan menampilkan ekuivalen liter.",
    },
    {
      question: "Bagaimana mengubah meter kubik ke liter?",
      answer:
        "Kalikan volume dalam m³ dengan 1.000. Contohnya 0,5 m³ sama dengan 500 liter.",
    },
    {
      question: "Apakah dimensi harus dalam meter?",
      answer:
        "Ya, agar hasil langsung dalam meter kubik. Jika dimensi dalam sentimeter, ubah ke meter dengan membagi 100 sebelum menghitung.",
    },
  ],
  "teknik-sipil/volume-kolom": [
    {
      question: "Bagaimana volume kolom bulat dihitung?",
      answer:
        "Kalkulator memakai diameter penampang dan tinggi kolom dengan rumus volume silinder, yaitu π × (d ÷ 2)² × tinggi. Pastikan diameter, bukan jari-jari, yang dimasukkan.",
    },
    {
      question: "Apakah bentuk persegi panjang memakai sisi yang berbeda?",
      answer:
        "Ya. Untuk kolom persegi panjang, masukkan kedua sisi penampang dan tinggi kolom; volumenya adalah hasil kali ketiganya.",
    },
    {
      question: "Apakah volume ini cukup untuk memesan beton?",
      answer:
        "Volume ini adalah kebutuhan teoretis. Tambahkan cadangan 5–10% dan sesuaikan dengan metode pengecoran serta dimensi aktual di lapangan.",
    },
  ],
  "teknik-sipil/luas-bangunan": [
    {
      question: "Apakah jumlah lantai ikut dihitung?",
      answer:
        "Ya. Luas satu lantai dihitung dari panjang × lebar, lalu dikalikan jumlah lantai untuk memperoleh luas bangunan total.",
    },
    {
      question: "Apakah luas ini termasuk dinding dan teras?",
      answer:
        "Tidak. Perhitungan ini adalah luas lantai berdasarkan dimensi denah. Luas dinding, teras, dan area terbuka perlu dihitung terpisah.",
    },
    {
      question: "Satuan apa yang dipakai?",
      answer:
        "Masukkan panjang dan lebar dalam meter. Hasil luas dinyatakan dalam meter persegi (m²).",
    },
  ],
  "teknik-sipil/kebutuhan-material": [
    {
      question: "Apa arti campuran 1:2:3?",
      answer:
        "Perbandingan volume semen : pasir : kerikil sebesar 1 : 2 : 3. Kalkulator memakai perbandingan ini untuk memperkirakan kebutuhan tiap material pada volume beton tertentu.",
    },
    {
      question: "Apakah kebutuhan air sudah termasuk?",
      answer:
        "Tidak. Kalkulator ini memperkirakan semen, pasir, dan kerikil. Kebutuhan air diperkirakan pada kalkulator campuran beton per sak semen.",
    },
    {
      question: "Apakah hasilnya sudah memperhitungkan pemborosan?",
      answer:
        "Belum. Tambahkan cadangan sekitar 5–10% untuk material yang tercecer, tertinggal di alat, atau perbedaan dimensi di lapangan.",
    },
  ],
  "teknik-sipil/campuran-beton": [
    {
      question: "Untuk berat sak semen berapa takaran ini dihitung?",
      answer:
        "Takaran dihitung untuk satu sak semen 50 kg. Jika memakai sak dengan berat berbeda, sesuaikan proporsinya secara linear.",
    },
    {
      question: "Apa beda campuran 1:2:3 dan 1:2:4?",
      answer:
        "Campuran 1:2:3 memiliki porsi semen lebih banyak sehingga umumnya lebih kuat, sedangkan 1:2:4 lebih hemat semen untuk kebutuhan struktural ringan. Keduanya harus disesuaikan dengan rencana mutu beton.",
    },
    {
      question: "Bagaimana kebutuhan air ditentukan?",
      answer:
        "Kalkulator memberi perkiraan berdasarkan rasio air terhadap semen. Di lapangan, sesuaikan dengan kadar air pasir dan kerikil agar beton tidak terlalu basah atau terlalu kering.",
    },
  ],
  "teknik-sipil/berat-besi": [
    {
      question: "Bagaimana berat besi beton dihitung?",
      answer:
        "Volume besi dihitung dari diameter dan panjang batang, lalu dikalikan massa jenis baja 7.850 kg/m³. Kalkulator menampilkan berat per batang dan total.",
    },
    {
      question: "Satuan diameter yang dipakai?",
      answer:
        "Diameter dimasukkan dalam milimeter, sesuai penandaan besi beton di pasaran, dan dikonversi ke meter untuk perhitungan volume.",
    },
    {
      question: "Mengapa berat hasil hitung bisa berbeda dari tabel pabrik?",
      answer:
        "Tabel pabrik memakai pembulatan dan toleransi produksi. Selisih kecil wajar; untuk pembelian material, gunakan hasil perhitungan sebagai estimasi dan konfirmasi ke supplier.",
    },
  ],

  "matematika-komputer/bilangan-biner": [
    {
      question: "Apa itu nilai tempat pada bilangan biner?",
      answer:
        "Setiap posisi bit mewakili pangkat dua, mulai 1, 2, 4, 8, dan seterusnya dari kanan. Kalkulator menampilkan nilai tempat setiap bit agar konversinya mudah diperiksa.",
    },
    {
      question: "Bilangan seperti apa yang bisa dikonversi?",
      answer:
        "Bilangan biner bulat non-negatif yang hanya berisi digit 0 dan 1. Karakter lain akan ditolak dengan pesan kesalahan.",
    },
    {
      question: "Apakah hasilnya juga ditampilkan dalam heksadesimal dan oktal?",
      answer:
        "Ya. Selain desimal, kalkulator menampilkan ekuivalen heksadesimal dan oktal beserta langkah nilai tempatnya.",
    },
  ],
  "matematika-komputer/penjumlahan-biner": [
    {
      question: "Bagaimana carry bekerja pada penjumlahan biner?",
      answer:
        "1 + 1 menghasilkan 0 dengan carry 1 ke posisi berikutnya, sedangkan 1 + 1 + 1 menghasilkan 1 dengan carry 1. Tabel per bit menampilkan carry masuk dan keluar.",
    },
    {
      question: "Apakah panjang bit hasil bisa bertambah?",
      answer:
        "Bisa. Jika penjumlahan menghasilkan carry di posisi terakhir, hasilnya memiliki satu bit lebih panjang dari input.",
    },
    {
      question: "Bagaimana cara memeriksa hasil penjumlahan biner?",
      answer:
        "Ubah kedua bilangan ke desimal, jumlahkan, lalu bandingkan dengan hasil biner yang dikonversi ke desimal. Keduanya harus sama.",
    },
  ],
  "matematika-komputer/pengurangan-biner": [
    {
      question: "Bagaimana proses borrow pada pengurangan biner?",
      answer:
        "Jika bit yang dikurangi lebih kecil, pinjam 2 dari bit di kiri sehingga bit tersebut bertambah 2. Tabel per bit menampilkan borrow masuk dan keluar.",
    },
    {
      question: "Mengapa hasil negatif ditolak?",
      answer:
        "Kalkulator ini menampilkan bilangan biner tak bertanda, sehingga bilangan pertama harus lebih besar atau sama dengan bilangan kedua. Untuk hasil negatif diperlukan representasi bertanda seperti komplemen dua.",
    },
    {
      question: "Bagaimana memverifikasi hasil pengurangan?",
      answer:
        "Jumlahkan hasil pengurangan dengan bilangan pengurang. Hasilnya harus sama dengan bilangan pertama.",
    },
  ],
  "matematika-komputer/konversi-biner-desimal": [
    {
      question: "Bagaimana cara mengubah desimal ke biner?",
      answer:
        "Bagi bilangan desimal dengan 2 secara berulang, catat sisanya, lalu baca sisa dari bawah ke atas. Kalkulator menampilkan langkah pembagian tersebut.",
    },
    {
      question: "Apakah konversi berlaku dua arah?",
      answer:
        "Ya. Anda bisa mengubah biner ke desimal atau desimal ke biner dengan memilih arah konversi yang tersedia.",
    },
    {
      question: "Apakah bilangan desimal pecahan didukung?",
      answer:
        "Tidak. Kalkulator ini menangani bilangan bulat non-negatif. Pecahan biner memerlukan penanganan titik radiks yang terpisah.",
    },
  ],
  "matematika-komputer/heksadesimal": [
    {
      question: "Bagaimana huruf A sampai F dibaca?",
      answer:
        "A mewakili 10, B 11, C 12, D 13, E 14, dan F 15. Setiap digit heksadesimal setara dengan empat bit biner.",
    },
    {
      question: "Mengapa heksadesimal sering dipakai di komputer?",
      answer:
        "Karena satu digit heksadesimal merangkum empat bit, sehingga alamat memori dan nilai biner panjang lebih ringkas ditulis dalam heksadesimal.",
    },
    {
      question: "Apakah konversi bisa dari desimal ke heksadesimal?",
      answer:
        "Bisa. Pilih arah konversi desimal ke heksadesimal; kalkulator menampilkan langkah pembagian berulang dengan basis 16.",
    },
  ],
  "matematika-komputer/oktal": [
    {
      question: "Digit apa saja yang valid pada bilangan oktal?",
      answer:
        "Hanya digit 0 sampai 7. Digit 8 dan 9 tidak valid karena basis oktal hanya memiliki delapan simbol.",
    },
    {
      question: "Mengapa oktal berhubungan dengan biner?",
      answer:
        "Karena satu digit oktal setara dengan tiga bit biner. Konversi oktal ke biner dapat dilakukan dengan memecah setiap digit menjadi tiga bit.",
    },
    {
      question: "Apakah kalkulator mendukung konversi dua arah?",
      answer:
        "Ya. Anda bisa mengubah oktal ke desimal maupun desimal ke oktal, lengkap dengan langkah nilai tempat atau pembagian berulang.",
    },
  ],

  "konversi-satuan/konversi-panjang": [
    {
      question: "Satuan panjang apa saja yang didukung?",
      answer:
        "Meter, kilometer, sentimeter, milimeter, inci, kaki, yard, dan mil. Semua dikonversi melalui meter sebagai satuan dasar.",
    },
    {
      question: "Berapa sentimeter dalam satu inci?",
      answer:
        "Satu inci sama dengan 2,54 sentimeter. Satu kaki sama dengan 12 inci atau 30,48 sentimeter.",
    },
    {
      question: "Berapa meter dalam satu mil?",
      answer:
        "Satu mil sama dengan 1.609,344 meter. Angka ini berbeda dari mil laut yang setara 1.852 meter.",
    },
  ],
  "konversi-satuan/konversi-massa": [
    {
      question: "Satuan massa apa saja yang tersedia?",
      answer:
        "Kilogram, gram, miligram, kuintal, ton, ons, dan pon. Nilai dikonversi melalui kilogram sebagai satuan dasar.",
    },
    {
      question: "Berapa kilogram dalam satu ton dan satu kuintal?",
      answer:
        "Satu ton sama dengan 1.000 kilogram, sedangkan satu kuintal sama dengan 100 kilogram. Satu ons yang dipakai di Indonesia setara 100 gram.",
    },
    {
      question: "Berapa kilogram dalam satu pon?",
      answer:
        "Satu pon sama dengan 0,45359237 kilogram. Sebaliknya, satu kilogram sekitar 2,20462 pon.",
    },
  ],
  "konversi-satuan/konversi-luas": [
    {
      question: "Berapa meter persegi dalam satu hektare?",
      answer:
        "Satu hektare sama dengan 10.000 meter persegi. Satu are sama dengan 100 meter persegi.",
    },
    {
      question: "Berapa luas satu acre dalam meter persegi?",
      answer:
        "Satu acre sama dengan sekitar 4.046,86 meter persegi, atau sekitar 0,404686 hektare.",
    },
    {
      question: "Bagaimana mengubah kaki persegi ke meter persegi?",
      answer:
        "Kalikan luas dalam kaki persegi dengan 0,09290304. Sebaliknya, bagi meter persegi dengan angka tersebut untuk memperoleh kaki persegi.",
    },
  ],
  "konversi-satuan/konversi-volume": [
    {
      question: "Berapa liter dalam satu meter kubik?",
      answer:
        "Satu meter kubik sama dengan 1.000 liter. Satu liter juga sama dengan 1.000 mililiter atau 1.000 sentimeter kubik.",
    },
    {
      question: "Berapa liter dalam satu galon AS?",
      answer:
        "Satu galon AS sama dengan 3,785411784 liter. Galon imperial Inggris memiliki nilai berbeda, yaitu sekitar 4,546 liter.",
    },
    {
      question: "Bagaimana mengubah inci kubik ke sentimeter kubik?",
      answer:
        "Kalikan volume dalam inci kubik dengan 16,387064. Satu inci kubik sama dengan 16,387064 cm³.",
    },
  ],
  "konversi-satuan/konversi-suhu": [
    {
      question: "Apa rumus konversi Celsius ke Fahrenheit?",
      answer:
        "F = (9/5) × C + 32. Contohnya 25 °C sama dengan 77 °F. Untuk Fahrenheit ke Celsius dipakai C = (F - 32) × 5/9.",
    },
    {
      question: "Mengapa Kelvin tidak memakai tanda derajat?",
      answer:
        "Kelvin adalah skala absolut, sehingga penulisannya cukup K tanpa simbol derajat. Nol Kelvin adalah nol mutlak, setara -273,15 °C.",
    },
    {
      question: "Apakah kalkulator menerima suhu di bawah nol mutlak?",
      answer:
        "Kalkulator menghitung secara aritmetika, tetapi suhu di bawah 0 K tidak memiliki arti fisik. Periksa kembali input jika hasil konversinya menunjukkan kondisi tersebut.",
    },
  ],
  "konversi-satuan/konversi-kecepatan": [
    {
      question: "Bagaimana mengubah m/s ke km/jam?",
      answer:
        "Kalikan nilai m/s dengan 3,6. Contohnya 20 m/s sama dengan 72 km/jam.",
    },
    {
      question: "Berapa kecepatan satu knot dalam km/jam?",
      answer:
        "Satu knot sama dengan 1,852 km/jam atau sekitar 0,514444 m/s. Knot dipakai dalam navigasi laut dan udara.",
    },
    {
      question: "Berapa km/jam untuk satu mil per jam?",
      answer:
        "Satu mil per jam sama dengan 1,609344 km/jam. Sebaliknya, satu km/jam sekitar 0,621371 mil per jam.",
    },
  ],
  "konversi-satuan/konversi-waktu": [
    {
      question: "Satuan waktu apa saja yang didukung?",
      answer:
        "Milidetik, detik, menit, jam, dan hari. Semua dikonversi melalui detik sebagai satuan dasar.",
    },
    {
      question: "Berapa detik dalam satu hari?",
      answer:
        "Satu hari sama dengan 24 jam atau 86.400 detik. Satu jam sama dengan 3.600 detik.",
    },
    {
      question: "Bagaimana mengubah milidetik ke detik?",
      answer:
        "Bagi nilai milidetik dengan 1.000. Contohnya 2.500 milidetik sama dengan 2,5 detik.",
    },
  ],
  "konversi-satuan/konversi-tekanan": [
    {
      question: "Berapa pascal dalam satu atmosfer?",
      answer:
        "Satu atmosfer standar sama dengan 101.325 pascal atau 101,325 kilopascal. Nilai ini setara 1,01325 bar.",
    },
    {
      question: "Berapa pascal dalam satu psi?",
      answer:
        "Satu psi sama dengan sekitar 6.894,76 pascal. Pada kompresor dan ban, angka psi umumnya menunjukkan tekanan gauge, bukan absolut.",
    },
    {
      question: "Apa beda bar dan pascal?",
      answer:
        "Satu bar sama dengan 100.000 pascal atau 100 kilopascal. Bar sering dipakai di industri karena angkanya lebih ringkas.",
    },
  ],
  "konversi-satuan/konversi-energi": [
    {
      question: "Berapa joule dalam satu kalori?",
      answer:
        "Satu kalori sama dengan 4,184 joule. Satu kilokalori, yang sering disebut kalori pada label makanan, sama dengan 4.184 joule.",
    },
    {
      question: "Berapa joule dalam satu kilowatt jam?",
      answer:
        "Satu kWh sama dengan 3,6 juta joule atau 3,6 megajoule. Nilai ini berasal dari 1.000 watt dikali 3.600 detik.",
    },
    {
      question: "Berapa joule dalam satu BTU?",
      answer:
        "Satu BTU sama dengan sekitar 1.055,056 joule. BTU banyak dipakai pada peralatan pendingin dan pemanas.",
    },
  ],
  "konversi-satuan/konversi-daya": [
    {
      question: "Berapa watt dalam satu tenaga kuda mekanik?",
      answer:
        "Satu horsepower mekanik sama dengan 745,6998716 watt. Nilai ini berbeda dari PS yang dipakai di Eropa.",
    },
    {
      question: "Apa beda hp dan PS?",
      answer:
        "PS atau Pferdestärke sama dengan 735,49875 watt, sedikit lebih kecil dari horsepower mekanik 745,7 watt. Selisihnya sekitar 1,4%.",
    },
    {
      question: "Bagaimana mengubah kilowatt ke megawatt?",
      answer:
        "Bagi nilai kilowatt dengan 1.000. Contohnya 2.500 kW sama dengan 2,5 MW.",
    },
  ],
};

export function getCalculatorFaqs(
  category: string,
  slug: string,
): CalculatorFaq[] {
  return calculatorFaqs[`${category}/${slug}`] ?? [];
}
