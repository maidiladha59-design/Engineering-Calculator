export type CategorySlug =
  | "matematika"
  | "fisika"
  | "mekanika-teknik"
  | "teknik-elektro"
  | "teknik-sipil"
  | "matematika-komputer"
  | "konversi-satuan";

export type CalculatorStatus = "active" | "coming-soon";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  tagline: string;
}

export interface Calculator {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  keywords: string[];
  status: CalculatorStatus;
}

export const categories: Category[] = [
  {
    slug: "matematika",
    name: "Matematika",
    description:
      "Operasi dasar, persentase, pecahan, pangkat, logaritma, dan persamaan aljabar untuk perhitungan teknik sehari-hari.",
    tagline: "Aritmatika sampai aljabar",
  },
  {
    slug: "fisika",
    name: "Fisika",
    description:
      "Mekanika dasar: gerak, gaya, usaha dan energi, daya, momentum, impuls, tekanan, serta massa jenis.",
    tagline: "Gerak, gaya, dan energi",
  },
  {
    slug: "mekanika-teknik",
    name: "Mekanika Teknik",
    description:
      "Momen gaya, torsi, keseimbangan balok, pusat massa, momen inersia, energi rotasi, tegangan-regangan, dan modulus elastisitas.",
    tagline: "Gaya, momen, dan konstruksi",
  },
  {
    slug: "teknik-elektro",
    name: "Teknik Elektro",
    description:
      "Hukum Ohm, daya listrik, resistansi kawat, rangkaian seri-paralel, energi listrik, dan konversi satuan listrik.",
    tagline: "Rangkaian dan daya listrik",
  },
  {
    slug: "teknik-sipil",
    name: "Teknik Sipil",
    description:
      "Volume beton, balok, kolom, luas bangunan, kebutuhan material, campuran beton, dan berat besi beton.",
    tagline: "Volume dan material bangunan",
  },
  {
    slug: "matematika-komputer",
    name: "Matematika Komputer",
    description:
      "Konversi dan aritmatika bilangan biner, heksadesimal, dan oktal dengan langkah per bit yang transparan.",
    tagline: "Biner, heksadesimal, oktal",
  },
  {
    slug: "konversi-satuan",
    name: "Konversi Satuan",
    description:
      "Konversi panjang, massa, luas, volume, suhu, kecepatan, waktu, tekanan, energi, dan daya dengan tabel hasil lengkap.",
    tagline: "Satuan metrik dan imperial",
  },
];

export const calculators: Calculator[] = [
  {
    slug: "dasar",
    name: "Kalkulator Dasar",
    category: "matematika",
    description:
      "Operasi aritmatika dasar: penjumlahan, pengurangan, perkalian, dan pembagian dengan penanganan pembagian nol.",
    keywords: [
      "tambah",
      "kurang",
      "kali",
      "bagi",
      "aritmatika",
      "operasi",
      "plus",
      "minus",
      "kalkulator",
    ],
    status: "active",
  },
  {
    slug: "persentase",
    name: "Persentase",
    category: "matematika",
    description:
      "Hitung persen dari suatu angka, perubahan persen, dan selisih persen antara dua nilai.",
    keywords: [
      "persen",
      "persentase",
      "diskon",
      "kenaikan",
      "penurunan",
      "perubahan",
      "selisih",
      "persen dari",
    ],
    status: "active",
  },
  {
    slug: "pecahan",
    name: "Pecahan",
    category: "matematika",
    description:
      "Tambah, kurang, kali, dan bagi pecahan. Hasil otomatis disederhanakan dan ditampilkan sebagai pecahan campuran.",
    keywords: [
      "pecahan",
      "fraksi",
      "campuran",
      "pembilang",
      "penyebut",
      "fraction",
      "sederhana",
    ],
    status: "active",
  },
  {
    slug: "pangkat-akar",
    name: "Pangkat & Akar",
    category: "matematika",
    description:
      "Hitung pangkat bilangan dan akar ke-n dengan validasi domain bilangan real.",
    keywords: [
      "pangkat",
      "eksponen",
      "akar",
      "kuadrat",
      "kubik",
      "sqrt",
      "root",
      "power",
      "radikal",
    ],
    status: "active",
  },
  {
    slug: "logaritma",
    name: "Logaritma",
    category: "matematika",
    description:
      "Hitung logaritma dengan basis bebas menggunakan perubahan basis, lengkap dengan validasi domain.",
    keywords: ["log", "logaritma", "ln", "basis", "logaritma natural", "eksponen"],
    status: "active",
  },
  {
    slug: "persamaan-kuadrat",
    name: "Persamaan Kuadrat",
    category: "matematika",
    description:
      "Selesaikan ax² + bx + c = 0: diskriminan, akar real atau kompleks, titik puncak, dan langkah lengkap.",
    keywords: [
      "kuadrat",
      "diskriminan",
      "akar",
      "parabola",
      "persamaan",
      "rumus abc",
      "kompleks",
    ],
    status: "active",
  },
  {
    slug: "sistem-persamaan-linear",
    name: "Sistem Persamaan Linear 2 Variabel",
    category: "matematika",
    description:
      "Selesaikan dua persamaan linear dengan dua variabel, termasuk deteksi solusi tunggal, tak hingga, atau tidak ada.",
    keywords: [
      "sistem persamaan",
      "linear",
      "dua variabel",
      "eliminasi",
      "substitusi",
      "spldv",
      "determinan",
    ],
    status: "active",
  },
  {
    slug: "matriks",
    name: "Matriks",
    category: "matematika",
    description: "Operasi matriks, invers, dan perkalian matriks. Disediakan pada fase berikutnya.",
    keywords: ["matriks", "matrix", "invers", "perkalian matriks"],
    status: "coming-soon",
  },
  {
    slug: "determinan",
    name: "Determinan",
    category: "matematika",
    description: "Determinan matriks 2x2 dan 3x3. Disediakan pada fase berikutnya.",
    keywords: ["determinan", "det", "matriks", "sarrus"],
    status: "coming-soon",
  },
  {
    slug: "turunan",
    name: "Turunan",
    category: "matematika",
    description: "Turunan fungsi aljabar dan trigonometri sederhana. Disediakan pada fase berikutnya.",
    keywords: ["turunan", "derivatif", "diferensial", "kalkulus"],
    status: "coming-soon",
  },
  {
    slug: "integral",
    name: "Integral",
    category: "matematika",
    description: "Integral tak tentu dan tentu. Disediakan pada fase berikutnya.",
    keywords: ["integral", "antiturunan", "kalkulus", "luas"],
    status: "coming-soon",
  },
  {
    slug: "kecepatan",
    name: "Kecepatan",
    category: "fisika",
    description:
      "Hitung kecepatan, jarak, atau waktu dengan konversi satuan otomatis dan langkah perhitungan.",
    keywords: [
      "kecepatan",
      "velocity",
      "jarak",
      "waktu",
      "kelajuan",
      "v=s/t",
      "gerak lurus",
      "km/jam",
      "m/s",
    ],
    status: "active",
  },
  {
    slug: "percepatan",
    name: "Percepatan",
    category: "fisika",
    description:
      "Hitung percepatan, kecepatan awal, kecepatan akhir, atau waktu dari perubahan kecepatan.",
    keywords: [
      "percepatan",
      "acceleration",
      "kecepatan",
      "gerak",
      "m/s2",
      "perubahan kecepatan",
    ],
    status: "active",
  },
  {
    slug: "gaya",
    name: "Gaya (Hukum Newton II)",
    category: "fisika",
    description:
      "Hitung gaya, massa, atau percepatan menggunakan F = m × a dengan konversi satuan massa.",
    keywords: ["gaya", "newton", "hukum newton", "massa", "percepatan", "f=ma", "dinamika"],
    status: "active",
  },
  {
    slug: "usaha-energi",
    name: "Usaha & Energi",
    category: "fisika",
    description:
      "Hitung usaha, gaya, atau perpindahan dengan W = F × s, lengkap dengan konversi joule.",
    keywords: ["usaha", "energi", "kerja", "work", "energy", "joule", "w=fs"],
    status: "active",
  },
  {
    slug: "daya",
    name: "Daya",
    category: "fisika",
    description:
      "Hitung daya, usaha, atau waktu dengan P = W / t, lengkap dengan konversi watt.",
    keywords: ["daya", "power", "watt", "usaha", "waktu", "p=w/t", "kilowatt"],
    status: "active",
  },
  {
    slug: "momentum",
    name: "Momentum",
    category: "fisika",
    description:
      "Hitung momentum, massa, atau kecepatan benda menggunakan p = m × v.",
    keywords: ["momentum", "p=mv", "massa", "kecepatan", "tumbukan"],
    status: "active",
  },
  {
    slug: "impuls",
    name: "Impuls",
    category: "fisika",
    description:
      "Hitung impuls, gaya, atau selang waktu menggunakan I = F × Δt.",
    keywords: ["impuls", "impulse", "gaya", "waktu", "momentum", "i=ft"],
    status: "active",
  },
  {
    slug: "tekanan",
    name: "Tekanan",
    category: "fisika",
    description:
      "Hitung tekanan, gaya, atau luas bidang tekan menggunakan P = F / A.",
    keywords: ["tekanan", "pressure", "pascal", "gaya", "luas", "p=f/a"],
    status: "active",
  },
  {
    slug: "massa-jenis",
    name: "Massa Jenis",
    category: "fisika",
    description:
      "Hitung massa jenis, massa, atau volume menggunakan ρ = m / V.",
    keywords: [
      "massa jenis",
      "densitas",
      "density",
      "rho",
      "volume",
      "massa",
      "kg/m3",
      "g/cm3",
    ],
    status: "active",
  },
  {
    slug: "kalor",
    name: "Kalor",
    category: "fisika",
    description: "Perpindahan kalor dan kalor jenis. Disediakan pada fase berikutnya.",
    keywords: ["kalor", "panas", "suhu", "kalor jenis", "q=mcδt"],
    status: "coming-soon",
  },
  {
    slug: "gerak-parabola",
    name: "Gerak Parabola",
    category: "fisika",
    description: "Analisis gerak parabola. Disediakan pada fase berikutnya.",
    keywords: ["gerak parabola", "proyektil", "lemparan", "sudut elevasi"],
    status: "coming-soon",
  },
  {
    slug: "gaya-gesek",
    name: "Gaya Gesek",
    category: "fisika",
    description: "Gaya gesek statis dan kinetis. Disediakan pada fase berikutnya.",
    keywords: ["gaya gesek", "gesekan", "friksi", "koefisien gesek"],
    status: "coming-soon",
  },
  {
    slug: "momen-gaya",
    name: "Momen Gaya",
    category: "mekanika-teknik",
    description:
      "Hitung momen gaya terhadap titik acuan dengan rumus M = F × d × sin θ, lengkap dengan lengan momen dan arah putaran.",
    keywords: [
      "momen gaya",
      "momen",
      "torsi",
      "lengan momen",
      "gaya",
      "sin theta",
      "m = f d",
      "mekanika",
    ],
    status: "active",
  },
  {
    slug: "torsi",
    name: "Torsi",
    category: "mekanika-teknik",
    description:
      "Hitung torsi pada poros berjari-jari r dari gaya yang membentuk sudut tertentu, beserta komponen gaya tangensial.",
    keywords: ["torsi", "torque", "poros", "jari-jari", "gaya tangensial", "momen putar"],
    status: "active",
  },
  {
    slug: "keseimbangan-benda",
    name: "Keseimbangan Benda",
    category: "mekanika-teknik",
    description:
      "Hitung reaksi tumpuan kiri dan kanan balok sederhana yang menahan beban titik pada posisi tertentu.",
    keywords: [
      "keseimbangan benda",
      "reaksi tumpuan",
      "balok sederhana",
      "reaksi kiri",
      "reaksi kanan",
      "statika",
      "beban titik",
    ],
    status: "active",
  },
  {
    slug: "pusat-massa",
    name: "Pusat Massa",
    category: "mekanika-teknik",
    description:
      "Hitung koordinat pusat massa dari beberapa titik bermassa pada bidang dua dimensi dengan input titik dinamis.",
    keywords: ["pusat massa", "center of mass", "titik berat", "koordinat", "massa titik"],
    status: "active",
  },
  {
    slug: "momen-inersia",
    name: "Momen Inersia",
    category: "mekanika-teknik",
    description:
      "Hitung momen inersia silinder pejal, bola pejal, dan batang dengan memilih bentuk benda serta sumbu putar.",
    keywords: [
      "momen inersia",
      "inertia",
      "silinder",
      "bola",
      "batang",
      "sumbu putar",
      "rotasi",
    ],
    status: "active",
  },
  {
    slug: "energi-kinetik-rotasi",
    name: "Energi Kinetik Rotasi",
    category: "mekanika-teknik",
    description:
      "Hitung energi kinetik benda yang berputar dari momen inersia dan kecepatan sudut, dengan dukungan satuan rpm.",
    keywords: ["energi kinetik rotasi", "rotasi", "momen inersia", "rad/s", "rpm", "energi putar"],
    status: "active",
  },
  {
    slug: "tegangan-regangan",
    name: "Tegangan & Regangan",
    category: "mekanika-teknik",
    description:
      "Hitung tegangan normal dan regangan aksial dari gaya, luas penampang, panjang awal, serta perubahan panjang.",
    keywords: [
      "tegangan",
      "regangan",
      "stress",
      "strain",
      "tegangan normal",
      "regangan aksial",
      "mekanika bahan",
    ],
    status: "active",
  },
  {
    slug: "modulus-elastisitas",
    name: "Modulus Elastisitas",
    category: "mekanika-teknik",
    description:
      "Cari modulus elastisitas, tegangan, atau regangan menggunakan hubungan E = σ / ε dengan mode perhitungan yang jelas.",
    keywords: [
      "modulus elastisitas",
      "modulus young",
      "young modulus",
      "tegangan",
      "regangan",
      "hukum hooke",
    ],
    status: "active",
  },
  {
    slug: "hukum-ohm",
    name: "Hukum Ohm",
    category: "teknik-elektro",
    description:
      "Hitung tegangan, arus, atau hambatan menggunakan V = I × R dengan konversi satuan volt, ampere, dan ohm.",
    keywords: ["hukum ohm", "ohm", "tegangan", "arus", "hambatan", "v = i r", "listrik"],
    status: "active",
  },
  {
    slug: "daya-listrik",
    name: "Daya Listrik",
    category: "teknik-elektro",
    description:
      "Hitung daya listrik dengan tiga metode: P = V × I, P = I² × R, atau P = V² / R, lengkap dengan langkah.",
    keywords: ["daya listrik", "watt", "p = vi", "i kuadrat r", "v kuadrat r", "energi listrik"],
    status: "active",
  },
  {
    slug: "resistansi-kawat",
    name: "Resistansi Kawat",
    category: "teknik-elektro",
    description:
      "Hitung hambatan kawat penghantar menggunakan R = ρ × L / A dengan input resistivitas, panjang, dan luas penampang.",
    keywords: [
      "resistansi kawat",
      "hambatan kawat",
      "resistivitas",
      "rho",
      "r = rho l / a",
      "kawat tembaga",
    ],
    status: "active",
  },
  {
    slug: "rangkaian-seri-paralel",
    name: "Rangkaian Seri & Paralel",
    category: "teknik-elektro",
    description:
      "Hitung hambatan pengganti, tegangan, dan arus tiap cabang untuk rangkaian resistor seri atau paralel dengan jumlah resistor dinamis.",
    keywords: [
      "rangkaian seri",
      "rangkaian paralel",
      "resistor",
      "hambatan pengganti",
      "arus cabang",
      "tegangan cabang",
    ],
    status: "active",
  },
  {
    slug: "energi-listrik",
    name: "Energi Listrik",
    category: "teknik-elektro",
    description:
      "Hitung energi listrik dalam kWh dan joule serta estimasi biaya berdasarkan daya, waktu pemakaian, dan tarif listrik.",
    keywords: ["energi listrik", "kwh", "joule", "biaya listrik", "tarif listrik", "daya"],
    status: "active",
  },
  {
    slug: "konversi-satuan-listrik",
    name: "Konversi Satuan Listrik",
    category: "teknik-elektro",
    description:
      "Konversi satuan tegangan, arus, hambatan, daya, dan energi listrik secara dua arah dengan tabel hasil lengkap.",
    keywords: [
      "konversi satuan listrik",
      "volt ke milivolt",
      "ampere ke miliampere",
      "ohm ke kiloohm",
      "watt ke kilowatt",
    ],
    status: "active",
  },
  {
    slug: "volume-beton",
    name: "Volume Beton",
    category: "teknik-sipil",
    description:
      "Hitung volume beton untuk pelat atau elemen persegi panjang dari panjang, lebar, dan tebal, dalam meter kubik.",
    keywords: ["volume beton", "beton", "pelat beton", "meter kubik", "cor beton", "volume"],
    status: "active",
  },
  {
    slug: "volume-balok",
    name: "Volume Balok",
    category: "teknik-sipil",
    description:
      "Hitung volume balok beton dari dimensi panjang, lebar, dan tinggi, beserta estimasi volume dalam liter.",
    keywords: ["volume balok", "balok beton", "dimensi balok", "meter kubik", "liter"],
    status: "active",
  },
  {
    slug: "volume-kolom",
    name: "Volume Kolom",
    category: "teknik-sipil",
    description:
      "Hitung volume kolom beton berbentuk persegi panjang atau bulat berdasarkan dimensi penampang dan tinggi kolom.",
    keywords: ["volume kolom", "kolom beton", "kolom bulat", "kolom persegi", "meter kubik"],
    status: "active",
  },
  {
    slug: "luas-bangunan",
    name: "Luas Bangunan",
    category: "teknik-sipil",
    description:
      "Hitung luas lantai bangunan dari panjang, lebar, dan jumlah lantai untuk estimasi luas bangunan total.",
    keywords: ["luas bangunan", "luas lantai", "jumlah lantai", "meter persegi", "renovasi"],
    status: "active",
  },
  {
    slug: "kebutuhan-material",
    name: "Kebutuhan Material Beton",
    category: "teknik-sipil",
    description:
      "Estimasi kebutuhan semen, pasir, dan kerikil untuk volume beton tertentu dengan campuran 1:2:3 atau 1:2:4.",
    keywords: [
      "kebutuhan material",
      "semen",
      "pasir",
      "kerikil",
      "campuran beton",
      "1:2:3",
      "1:2:4",
    ],
    status: "active",
  },
  {
    slug: "campuran-beton",
    name: "Campuran Beton",
    category: "teknik-sipil",
    description:
      "Hitung takaran pasir, kerikil, dan perkiraan air per sak semen untuk campuran beton 1:2:3 atau 1:2:4.",
    keywords: ["campuran beton", "takaran beton", "semen pasir kerikil", "per sak", "1:2:3", "1:2:4"],
    status: "active",
  },
  {
    slug: "berat-besi",
    name: "Berat Besi Beton",
    category: "teknik-sipil",
    description:
      "Hitung berat besi beton dari diameter, panjang, dan jumlah batang menggunakan massa jenis baja 7.850 kg/m³.",
    keywords: [
      "berat besi",
      "besi beton",
      "berat besi per meter",
      "diameter besi",
      "tulangan",
      "kg",
    ],
    status: "active",
  },
  {
    slug: "bilangan-biner",
    name: "Bilangan Biner",
    category: "matematika-komputer",
    description:
      "Ubah bilangan biner menjadi desimal, heksadesimal, dan oktal, lengkap dengan nilai tempat setiap bit.",
    keywords: ["bilangan biner", "biner", "binary", "biner ke desimal", "bit", "nilai tempat"],
    status: "active",
  },
  {
    slug: "penjumlahan-biner",
    name: "Penjumlahan Biner",
    category: "matematika-komputer",
    description:
      "Jumlahkan dua bilangan biner dengan tabel per bit yang menampilkan carry masuk dan carry keluar.",
    keywords: ["penjumlahan biner", "tambah biner", "carry", "aritmatika biner", "binary addition"],
    status: "active",
  },
  {
    slug: "pengurangan-biner",
    name: "Pengurangan Biner",
    category: "matematika-komputer",
    description:
      "Kurangkan dua bilangan biner dengan tabel per bit yang menampilkan proses pinjaman (borrow).",
    keywords: ["pengurangan biner", "kurang biner", "borrow", "pinjaman", "aritmatika biner"],
    status: "active",
  },
  {
    slug: "konversi-biner-desimal",
    name: "Konversi Biner ↔ Desimal",
    category: "matematika-komputer",
    description:
      "Konversi biner ke desimal atau desimal ke biner dengan langkah nilai tempat dan pembagian berulang.",
    keywords: ["konversi biner", "biner ke desimal", "desimal ke biner", "konversi bilangan"],
    status: "active",
  },
  {
    slug: "heksadesimal",
    name: "Heksadesimal",
    category: "matematika-komputer",
    description:
      "Konversi bilangan heksadesimal ke desimal atau sebaliknya, dengan dukungan bilangan besar dan langkah nilai tempat.",
    keywords: ["heksadesimal", "hex", "hexadecimal", "ff", "konversi hex", "desimal ke hex"],
    status: "active",
  },
  {
    slug: "oktal",
    name: "Oktal",
    category: "matematika-komputer",
    description:
      "Konversi bilangan oktal ke desimal atau desimal ke oktal dengan validasi digit 0–7 dan langkah perhitungan.",
    keywords: ["oktal", "octal", "konversi oktal", "basis 8", "desimal ke oktal"],
    status: "active",
  },
  {
    slug: "konversi-panjang",
    name: "Konversi Panjang",
    category: "konversi-satuan",
    description:
      "Konversi meter, kilometer, sentimeter, milimeter, inci, kaki, yard, dan mil dengan tabel hasil lengkap.",
    keywords: [
      "konversi panjang",
      "km ke meter",
      "meter ke cm",
      "inci ke cm",
      "kaki ke meter",
      "mil ke km",
    ],
    status: "active",
  },
  {
    slug: "konversi-massa",
    name: "Konversi Massa",
    category: "konversi-satuan",
    description:
      "Konversi kilogram, gram, miligram, kuintal, ton, ons, dan pon dengan langkah perhitungan.",
    keywords: [
      "konversi massa",
      "kg ke gram",
      "ton ke kg",
      "pon ke kg",
      "ons ke gram",
      "miligram",
    ],
    status: "active",
  },
  {
    slug: "konversi-luas",
    name: "Konversi Luas",
    category: "konversi-satuan",
    description:
      "Konversi meter persegi, sentimeter persegi, hektare, are, kilometer persegi, kaki persegi, dan acre.",
    keywords: [
      "konversi luas",
      "hektare ke m2",
      "are ke m2",
      "m2 ke cm2",
      "acre ke hektare",
      "kaki persegi",
    ],
    status: "active",
  },
  {
    slug: "konversi-volume",
    name: "Konversi Volume",
    category: "konversi-satuan",
    description:
      "Konversi liter, mililiter, meter kubik, inci kubik, kaki kubik, dan galon AS dengan tabel hasil.",
    keywords: [
      "konversi volume",
      "liter ke m3",
      "m3 ke liter",
      "ml ke liter",
      "galon ke liter",
      "kaki kubik",
    ],
    status: "active",
  },
  {
    slug: "konversi-suhu",
    name: "Konversi Suhu",
    category: "konversi-satuan",
    description:
      "Konversi Celsius, Fahrenheit, Kelvin, dan Rankine dengan rumus offset dan langkah perhitungan.",
    keywords: [
      "konversi suhu",
      "celsius ke fahrenheit",
      "fahrenheit ke celsius",
      "celsius ke kelvin",
      "kelvin ke celsius",
      "rankine",
    ],
    status: "active",
  },
  {
    slug: "konversi-kecepatan",
    name: "Konversi Kecepatan",
    category: "konversi-satuan",
    description:
      "Konversi meter per detik, kilometer per jam, mil per jam, knot, dan kaki per detik.",
    keywords: [
      "konversi kecepatan",
      "km jam ke m s",
      "m s ke km jam",
      "mph ke km jam",
      "knot ke km jam",
    ],
    status: "active",
  },
  {
    slug: "konversi-waktu",
    name: "Konversi Waktu",
    category: "konversi-satuan",
    description:
      "Konversi milidetik, detik, menit, jam, dan hari dengan hasil presisi serta tabel lengkap.",
    keywords: [
      "konversi waktu",
      "detik ke menit",
      "menit ke jam",
      "jam ke detik",
      "hari ke jam",
    ],
    status: "active",
  },
  {
    slug: "konversi-tekanan",
    name: "Konversi Tekanan",
    category: "konversi-satuan",
    description:
      "Konversi pascal, kilopascal, megapascal, bar, atmosfer, dan psi untuk kebutuhan teknik.",
    keywords: [
      "konversi tekanan",
      "psi ke bar",
      "bar ke psi",
      "atm ke pascal",
      "mpa ke psi",
    ],
    status: "active",
  },
  {
    slug: "konversi-energi",
    name: "Konversi Energi",
    category: "konversi-satuan",
    description:
      "Konversi joule, kilojoule, kilowatt jam, kalori, kilokalori, dan BTU dengan langkah perhitungan.",
    keywords: [
      "konversi energi",
      "kwh ke joule",
      "kalori ke joule",
      "joule ke kalori",
      "btu ke joule",
    ],
    status: "active",
  },
  {
    slug: "konversi-daya",
    name: "Konversi Daya",
    category: "konversi-satuan",
    description:
      "Konversi watt, kilowatt, megawatt, tenaga kuda mekanik (hp), dan PS dengan tabel hasil.",
    keywords: [
      "konversi daya",
      "hp ke watt",
      "watt ke hp",
      "kw ke watt",
      "tenaga kuda",
    ],
    status: "active",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCalculatorsByCategory(slug: string): Calculator[] {
  return calculators.filter((calculator) => calculator.category === slug);
}

export function getActiveCalculatorsByCategory(slug: string): Calculator[] {
  return getCalculatorsByCategory(slug).filter(
    (calculator) => calculator.status === "active",
  );
}

export function getCalculator(
  categorySlug: string,
  calculatorSlug: string,
): Calculator | undefined {
  return calculators.find(
    (calculator) =>
      calculator.category === categorySlug && calculator.slug === calculatorSlug,
  );
}

export function getCategoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug;
}

export const activeCalculatorCount = calculators.filter(
  (calculator) => calculator.status === "active",
).length;

export function getPopularCalculators(limit = 6): Calculator[] {
  const preferred = [
    "dasar",
    "persentase",
    "hukum-ohm",
    "kecepatan",
    "momen-gaya",
    "volume-beton",
    "bilangan-biner",
    "usaha-energi",
  ];

  return preferred
    .map((slug) =>
      calculators.find(
        (calculator) =>
          calculator.slug === slug && calculator.status === "active",
      ),
    )
    .filter((calculator): calculator is Calculator => calculator !== undefined)
    .slice(0, limit);
}

export function getLatestCalculators(limit = 3): Calculator[] {
  return calculators
    .filter((calculator) => calculator.status === "active")
    .slice(-limit)
    .reverse();
}
