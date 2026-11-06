import type { ConversionUnit } from "@/lib/math/conversions";

export interface ConversionVariable {
  symbol: string;
  name: string;
  unit?: string;
  note?: string;
}

export interface ConversionExample {
  problem: string;
  value: string;
  fromUnit: string;
  toUnit: string;
  note?: string;
}

export interface ConversionConfig {
  slug: string;
  name: string;
  unitLabel: string;
  description: string;
  keywords: string[];
  baseSymbol: string;
  isTemperature?: boolean;
  units: ConversionUnit[];
  defaults: { value: string; fromUnit: string; toUnit: string };
  formulaTex: string;
  formulaDescription: string;
  variables: ConversionVariable[];
  examples: ConversionExample[];
  mistakes: string[];
  tips: string[];
}

const MULTIPLICATIVE_FORMULA = String.raw`x_{\text{tujuan}}=x_{\text{asal}}\times\frac{f_{\text{asal}}}{f_{\text{tujuan}}}`;

const MULTIPLICATIVE_VARIABLES: ConversionVariable[] = [
  {
    symbol: "x_asal",
    name: "Nilai pada satuan asal",
    note: "Angka yang Anda masukkan sebelum konversi",
  },
  {
    symbol: "f_asal",
    name: "Faktor satuan asal",
    note: "Jumlah satuan dasar yang setara dengan 1 satuan asal",
  },
  {
    symbol: "f_tujuan",
    name: "Faktor satuan tujuan",
    note: "Jumlah satuan dasar yang setara dengan 1 satuan tujuan",
  },
  {
    symbol: "x_tujuan",
    name: "Nilai hasil konversi",
    note: "Nilai yang dinyatakan dalam satuan tujuan",
  },
];

const MULTIPLICATIVE_TIPS = [
  "Periksa arah konversi: mengubah ke satuan yang lebih kecil membuat angka bertambah, sebaliknya angka mengecil.",
  "Gunakan tabel hasil untuk memeriksa silang; nilai pada satuan asal harus sama dengan angka yang Anda masukkan.",
  "Untuk pekerjaan teknis, simpan hasil dengan satuan yang jelas agar tidak tertukar saat dipakai di rumus lain.",
];

export const conversionConfigs: ConversionConfig[] = [
  {
    slug: "konversi-panjang",
    name: "Konversi Panjang",
    unitLabel: "panjang",
    description:
      "Konversi satuan panjang antara milimeter, sentimeter, meter, kilometer, inci, kaki, yard, dan mil dengan hasil dan tabel lengkap.",
    keywords: [
      "konversi panjang",
      "meter ke centimeter",
      "km ke meter",
      "inch ke cm",
      "kaki ke meter",
      "mil ke km",
    ],
    baseSymbol: "m",
    units: [
      { value: "mm", label: "Milimeter (mm)", symbol: "mm", factor: 0.001 },
      { value: "cm", label: "Sentimeter (cm)", symbol: "cm", factor: 0.01 },
      { value: "m", label: "Meter (m)", symbol: "m", factor: 1 },
      { value: "km", label: "Kilometer (km)", symbol: "km", factor: 1000 },
      { value: "in", label: "Inci (in)", symbol: "in", factor: 0.0254 },
      { value: "ft", label: "Kaki (ft)", symbol: "ft", factor: 0.3048 },
      { value: "yd", label: "Yard (yd)", symbol: "yd", factor: 0.9144 },
      { value: "mi", label: "Mil (mi)", symbol: "mi", factor: 1609.344 },
    ],
    defaults: { value: "1", fromUnit: "km", toUnit: "m" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Setiap satuan panjang memiliki faktor terhadap meter. Kalikan nilai asal dengan faktor asal, lalu bagi dengan faktor satuan tujuan.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Sebuah jalan sepanjang 1 kilometer akan dinyatakan dalam meter.",
        value: "1",
        fromUnit: "km",
        toUnit: "m",
        note: "1 km = 1.000 m, karena awalan kilo berarti seribu.",
      },
      {
        problem: "Panjang meja 250 sentimeter akan diubah ke meter.",
        value: "250",
        fromUnit: "cm",
        toUnit: "m",
        note: "Sentimeter adalah seperseratus meter, sehingga 250 cm = 2,5 m.",
      },
      {
        problem: "Tinggi 6 kaki akan dinyatakan dalam sentimeter.",
        value: "6",
        fromUnit: "ft",
        toUnit: "cm",
        note: "Satu kaki sama dengan 0,3048 meter atau 30,48 sentimeter.",
      },
    ],
    mistakes: [
      "Mengalikan dengan faktor satuan tujuan, padahal konvensinya membagi dengan faktor tujuan.",
      "Menganggap 1 inci sama dengan 2,5 cm; nilai yang benar adalah 2,54 cm.",
      "Mencampur satuan panjang saat menghitung luas atau volume tanpa mengkuadratkan atau mengubikkan faktornya.",
    ],
    tips: [
      "Untuk satuan metrik, cukup geser koma: 1 km = 1.000 m = 100.000 cm = 1.000.000 mm.",
      "Hafalkan patokan 1 inci = 2,54 cm dan 1 kaki = 30,48 cm untuk pemeriksaan cepat.",
      "Saat menggambar atau memotong material, bulatkan hasil di akhir pekerjaan, bukan di setiap langkah.",
    ],
  },
  {
    slug: "konversi-massa",
    name: "Konversi Massa",
    unitLabel: "massa",
    description:
      "Konversi satuan massa antara miligram, gram, kilogram, kuintal, ton, ons, dan pon beserta tabel hasil lengkap.",
    keywords: [
      "konversi massa",
      "kg ke gram",
      "gram ke mg",
      "ton ke kg",
      "pon ke kg",
      "ons ke gram",
    ],
    baseSymbol: "kg",
    units: [
      { value: "mg", label: "Miligram (mg)", symbol: "mg", factor: 0.000001 },
      { value: "g", label: "Gram (g)", symbol: "g", factor: 0.001 },
      { value: "kg", label: "Kilogram (kg)", symbol: "kg", factor: 1 },
      { value: "kuintal", label: "Kuintal (kuintal)", symbol: "kuintal", factor: 100 },
      { value: "ton", label: "Ton (ton)", symbol: "ton", factor: 1000 },
      { value: "oz", label: "Ons (oz)", symbol: "oz", factor: 0.028349523125 },
      { value: "lb", label: "Pon (lb)", symbol: "lb", factor: 0.45359237 },
    ],
    defaults: { value: "1", fromUnit: "kg", toUnit: "g" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Massa dapat diubah melalui kilogram sebagai satuan dasar. Faktor asal dibagi faktor tujuan menentukan rasio antara dua satuan.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Berat bahan 2 kilogram akan dinyatakan dalam gram.",
        value: "2",
        fromUnit: "kg",
        toUnit: "g",
        note: "1 kg = 1.000 g, sehingga 2 kg = 2.000 g.",
      },
      {
        problem: "Sebuah paket memiliki massa 1 pon dan perlu dicatat dalam kilogram.",
        value: "1",
        fromUnit: "lb",
        toUnit: "kg",
        note: "1 pon = 0,45359237 kg berdasarkan definisi internasional.",
      },
      {
        problem: "Dosis bahan 500 miligram akan diubah ke gram.",
        value: "500",
        fromUnit: "mg",
        toUnit: "g",
        note: "1.000 mg = 1 g, sehingga 500 mg = 0,5 g.",
      },
    ],
    mistakes: [
      "Menyamakan massa dengan berat; berat bergantung pada gravitasi, sedangkan kilogram mengukur massa.",
      "Menganggap 1 ons selalu 100 gram; ons metrik memang 100 g, tetapi ounce (oz) adalah 28,3495 g.",
      "Salah menghitung ton: 1 ton = 1.000 kg, bukan 100 kg (itu kuintal).",
    ],
    tips: [
      "Untuk kebutuhan sehari-hari, ingat 1 kg = 1.000 g = 1.000.000 mg.",
      "Gunakan pon ke kilogram dengan membagi sekitar 2,2046 untuk perkiraan cepat.",
      "Saat menimbang material bangunan, pastikan satuan pada nota dan timbangan sama sebelum menjumlahkan.",
    ],
  },
  {
    slug: "konversi-luas",
    name: "Konversi Luas",
    unitLabel: "luas",
    description:
      "Konversi satuan luas antara milimeter persegi, sentimeter persegi, meter persegi, are, hektare, kilometer persegi, kaki persegi, dan acre.",
    keywords: [
      "konversi luas",
      "m2 ke cm2",
      "hektare ke m2",
      "are ke meter persegi",
      "kaki persegi ke m2",
      "acre ke hektare",
    ],
    baseSymbol: "m²",
    units: [
      { value: "mm2", label: "Milimeter persegi (mm²)", symbol: "mm²", factor: 0.000001 },
      { value: "cm2", label: "Sentimeter persegi (cm²)", symbol: "cm²", factor: 0.0001 },
      { value: "m2", label: "Meter persegi (m²)", symbol: "m²", factor: 1 },
      { value: "are", label: "Are (are)", symbol: "are", factor: 100 },
      { value: "ha", label: "Hektare (ha)", symbol: "ha", factor: 10000 },
      { value: "km2", label: "Kilometer persegi (km²)", symbol: "km²", factor: 1000000 },
      { value: "ft2", label: "Kaki persegi (ft²)", symbol: "ft²", factor: 0.09290304 },
      { value: "acre", label: "Acre (acre)", symbol: "acre", factor: 4046.8564224 },
    ],
    defaults: { value: "1", fromUnit: "ha", toUnit: "m2" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Satuan luas diturunkan dari satuan panjang yang dikuadratkan. Karena itu, faktor luas adalah faktor panjang pangkat dua.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Tanah seluas 1 hektare akan dinyatakan dalam meter persegi.",
        value: "1",
        fromUnit: "ha",
        toUnit: "m2",
        note: "1 hektare = 10.000 m² atau 100 are.",
      },
      {
        problem: "Luas ruangan 12 meter persegi akan diubah ke sentimeter persegi.",
        value: "12",
        fromUnit: "m2",
        toUnit: "cm2",
        note: "1 m² = 10.000 cm², sehingga 12 m² = 120.000 cm².",
      },
      {
        problem: "Luas lahan 1 acre akan dinyatakan dalam meter persegi.",
        value: "1",
        fromUnit: "acre",
        toUnit: "m2",
        note: "1 acre = 4.046,8564224 m², sedikit di bawah setengah hektare.",
      },
    ],
    mistakes: [
      "Mengalikan faktor panjang saja saat mengubah luas; faktor harus dikuadratkan.",
      "Menganggap 1 are = 1 hektare; 1 hektare sama dengan 100 are.",
      "Menghitung luas bangunan dari satuan campuran, misalnya panjang meter dan lebar sentimeter, tanpa konversi lebih dulu.",
    ],
    tips: [
      "1 are = 100 m², 1 hektare = 100 are = 10.000 m².",
      "Untuk properti, luas tanah sering ditulis dalam m²; periksa apakah angka yang tercantum sudah termasuk bangunan atau hanya tanah.",
      "Gunakan satuan yang sama untuk panjang dan lebar sebelum mengalikan.",
    ],
  },
  {
    slug: "konversi-volume",
    name: "Konversi Volume",
    unitLabel: "volume",
    description:
      "Konversi satuan volume antara mililiter, liter, meter kubik, inci kubik, kaki kubik, dan galon Amerika Serikat.",
    keywords: [
      "konversi volume",
      "liter ke m3",
      "m3 ke liter",
      "ml ke liter",
      "galon ke liter",
      "kaki kubik ke m3",
    ],
    baseSymbol: "m³",
    units: [
      { value: "mL", label: "Mililiter (mL)", symbol: "mL", factor: 0.000001 },
      { value: "L", label: "Liter (L)", symbol: "L", factor: 0.001 },
      { value: "m3", label: "Meter kubik (m³)", symbol: "m³", factor: 1 },
      { value: "in3", label: "Inci kubik (in³)", symbol: "in³", factor: 0.000016387064 },
      { value: "ft3", label: "Kaki kubik (ft³)", symbol: "ft³", factor: 0.028316846592 },
      { value: "gal", label: "Galon AS (gal)", symbol: "gal", factor: 0.003785411784 },
    ],
    defaults: { value: "1", fromUnit: "m3", toUnit: "L" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Volume menggunakan satuan panjang pangkat tiga. Satu meter kubik setara dengan 1.000 liter, dan satu liter setara dengan 1.000 mililiter.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Volume bak 2 meter kubik akan dinyatakan dalam liter.",
        value: "2",
        fromUnit: "m3",
        toUnit: "L",
        note: "1 m³ = 1.000 L, sehingga 2 m³ = 2.000 L.",
      },
      {
        problem: "Botol berisi 500 mililiter akan dicatat dalam liter.",
        value: "500",
        fromUnit: "mL",
        toUnit: "L",
        note: "1.000 mL = 1 L, sehingga 500 mL = 0,5 L.",
      },
      {
        problem: "Mesin berkapasitas 1 kaki kubik akan diubah ke liter.",
        value: "1",
        fromUnit: "ft3",
        toUnit: "L",
        note: "1 ft³ = 28,316846592 L.",
      },
    ],
    mistakes: [
      "Menganggap 1 m³ = 100 L; nilai yang benar adalah 1.000 L.",
      "Mencampur mililiter dan sentimeter kubik tanpa menyadari keduanya setara (1 mL = 1 cm³).",
      "Menggunakan galon Inggris dan galon AS secara bergantian; keduanya berbeda sekitar 20 persen.",
    ],
    tips: [
      "Untuk beton, volume biasanya dihitung dalam m³, sedangkan kebutuhan air dicatat dalam liter.",
      "1 liter setara dengan kubus berukuran 10 cm × 10 cm × 10 cm.",
      "Saat membeli bahan cair, periksa apakah galon yang dimaksud adalah galon AS (3,785 L) atau galon imperial (4,546 L).",
    ],
  },
  {
    slug: "konversi-suhu",
    name: "Konversi Suhu",
    unitLabel: "suhu",
    description:
      "Konversi suhu antara Celsius, Fahrenheit, Kelvin, dan Rankine dengan rumus offset yang ditampilkan langkah demi langkah.",
    keywords: [
      "konversi suhu",
      "celsius ke fahrenheit",
      "fahrenheit ke celsius",
      "celsius ke kelvin",
      "kelvin ke celsius",
      "rankine",
    ],
    baseSymbol: "K",
    isTemperature: true,
    units: [
      { value: "C", label: "Celsius (°C)", symbol: "°C", factor: 1, offset: 273.15 },
      {
        value: "F",
        label: "Fahrenheit (°F)",
        symbol: "°F",
        factor: 5 / 9,
        offset: 459.67,
      },
      { value: "K", label: "Kelvin (K)", symbol: "K", factor: 1 },
      { value: "R", label: "Rankine (°R)", symbol: "°R", factor: 5 / 9 },
    ],
    defaults: { value: "0", fromUnit: "C", toUnit: "F" },
    formulaTex: String.raw`\begin{aligned}
K &= C + 273{,}15\\
F &= \tfrac{9}{5}C + 32\\
C &= \tfrac{5}{9}(F - 32)\\
R &= \tfrac{9}{5}K
\end{aligned}`,
    formulaDescription:
      "Celsius dan Fahrenheit memiliki titik nol yang berbeda, sedangkan Kelvin dan Rankine dimulai dari nol mutlak. Kalkulator mengubah nilai ke Kelvin lebih dulu, lalu ke satuan tujuan.",
    variables: [
      { symbol: "C", name: "Suhu Celsius", unit: "°C", note: "Titik beku air 0 °C, titik didih 100 °C" },
      { symbol: "F", name: "Suhu Fahrenheit", unit: "°F", note: "Titik beku air 32 °F, titik didih 212 °F" },
      { symbol: "K", name: "Suhu Kelvin", unit: "K", note: "Nol mutlak 0 K, tidak memakai tanda derajat" },
      { symbol: "R", name: "Suhu Rankine", unit: "°R", note: "Skala absolut berbasis Fahrenheit" },
    ],
    examples: [
      {
        problem: "Air membeku pada 0 °C. Berapa suhu tersebut dalam Fahrenheit?",
        value: "0",
        fromUnit: "C",
        toUnit: "F",
        note: "0 °C = 32 °F, titik beku air pada skala Fahrenheit.",
      },
      {
        problem: "Suhu ruang 25 °C akan dinyatakan dalam Kelvin.",
        value: "25",
        fromUnit: "C",
        toUnit: "K",
        note: "25 °C + 273,15 = 298,15 K.",
      },
      {
        problem: "Suhu tubuh 98,6 °F akan diubah ke Celsius.",
        value: "98.6",
        fromUnit: "F",
        toUnit: "C",
        note: "98,6 °F kira-kira setara 37 °C.",
      },
    ],
    mistakes: [
      "Menambahkan 273 alih-alih 273,15 untuk konversi Celsius ke Kelvin yang presisi.",
      "Mengalikan Fahrenheit dengan 5/9 tanpa mengurangi 32 terlebih dahulu.",
      "Menulis satuan Kelvin dengan tanda derajat (°K); penulisan yang benar adalah K.",
    ],
    tips: [
      "Gunakan patokan 0 °C = 32 °F, 100 °C = 212 °F, dan −40 °C = −40 °F untuk memeriksa hasil.",
      "Nol mutlak adalah 0 K, −273,15 °C, atau −459,67 °F; tidak ada suhu yang lebih rendah.",
      "Untuk perhitungan teknik, gunakan Kelvin agar perbandingan suhu dan energi menjadi langsung.",
    ],
  },
  {
    slug: "konversi-kecepatan",
    name: "Konversi Kecepatan",
    unitLabel: "kecepatan",
    description:
      "Konversi kecepatan antara meter per detik, kilometer per jam, mil per jam, knot, dan kaki per detik.",
    keywords: [
      "konversi kecepatan",
      "km jam ke m s",
      "m s ke km jam",
      "mph ke km jam",
      "knot ke km jam",
      "kaki per detik",
    ],
    baseSymbol: "m/s",
    units: [
      { value: "m/s", label: "Meter per detik (m/s)", symbol: "m/s", factor: 1 },
      {
        value: "km/h",
        label: "Kilometer per jam (km/jam)",
        symbol: "km/jam",
        factor: 1000 / 3600,
      },
      { value: "mph", label: "Mil per jam (mph)", symbol: "mph", factor: 0.44704 },
      {
        value: "knot",
        label: "Knot (knot)",
        symbol: "knot",
        factor: 1852 / 3600,
      },
      { value: "ft/s", label: "Kaki per detik (ft/s)", symbol: "ft/s", factor: 0.3048 },
    ],
    defaults: { value: "72", fromUnit: "km/h", toUnit: "m/s" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Kecepatan adalah jarak per waktu. Karena itu faktor konversi kecepatan menggabungkan faktor panjang dan kebalikan faktor waktu.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Mobil melaju 72 km/jam. Berapa kecepatannya dalam meter per detik?",
        value: "72",
        fromUnit: "km/h",
        toUnit: "m/s",
        note: "Bagi dengan 3,6: 72 ÷ 3,6 = 20 m/s.",
      },
      {
        problem: "Pelari menempuh 10 m/s. Berapa kecepatan tersebut dalam km/jam?",
        value: "10",
        fromUnit: "m/s",
        toUnit: "km/h",
        note: "Kalikan dengan 3,6: 10 × 3,6 = 36 km/jam.",
      },
      {
        problem: "Kapal berlayar 20 knot. Berapa kecepatannya dalam km/jam?",
        value: "20",
        fromUnit: "knot",
        toUnit: "km/h",
        note: "1 knot = 1,852 km/jam.",
      },
    ],
    mistakes: [
      "Mengalikan dengan 3,6 saat mengubah km/jam ke m/s; seharusnya membagi.",
      "Menganggap knot sama dengan mil per jam; 1 knot = 1,852 km/jam, sedangkan 1 mph = 1,609 km/jam.",
      "Menghitung kecepatan rata-rata dengan menjumlahkan kecepatan tanpa mempertimbangkan waktu tempuh.",
    ],
    tips: [
      "Ingat hubungan cepat: m/s × 3,6 = km/jam dan km/jam ÷ 3,6 = m/s.",
      "Untuk kendaraan, kecepatan pada spedometer biasanya km/jam, sedangkan satuan SI untuk fisika adalah m/s.",
      "Knot dipakai dalam penerbangan dan pelayaran karena setara dengan satu menit busur lintang per jam.",
    ],
  },
  {
    slug: "konversi-waktu",
    name: "Konversi Waktu",
    unitLabel: "waktu",
    description:
      "Konversi satuan waktu antara milidetik, detik, menit, jam, dan hari dengan hasil presisi serta tabel lengkap.",
    keywords: [
      "konversi waktu",
      "detik ke menit",
      "menit ke jam",
      "jam ke detik",
      "hari ke jam",
      "milidetik",
    ],
    baseSymbol: "s",
    units: [
      { value: "ms", label: "Milidetik (ms)", symbol: "ms", factor: 0.001 },
      { value: "s", label: "Detik (s)", symbol: "s", factor: 1 },
      { value: "min", label: "Menit (menit)", symbol: "menit", factor: 60 },
      { value: "h", label: "Jam (jam)", symbol: "jam", factor: 3600 },
      { value: "day", label: "Hari (hari)", symbol: "hari", factor: 86400 },
    ],
    defaults: { value: "1.5", fromUnit: "h", toUnit: "min" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Satuan waktu diubah melalui detik sebagai satuan dasar. Satu menit sama dengan 60 detik, satu jam 3.600 detik, dan satu hari 86.400 detik.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Durasi 1,5 jam akan dinyatakan dalam menit.",
        value: "1.5",
        fromUnit: "h",
        toUnit: "min",
        note: "1 jam = 60 menit, sehingga 1,5 jam = 90 menit.",
      },
      {
        problem: "Waktu tempuh 90 detik akan diubah ke menit.",
        value: "90",
        fromUnit: "s",
        toUnit: "min",
        note: "90 ÷ 60 = 1,5 menit.",
      },
      {
        problem: "Satu hari akan dinyatakan dalam jam.",
        value: "1",
        fromUnit: "day",
        toUnit: "h",
        note: "1 hari = 24 jam = 1.440 menit = 86.400 detik.",
      },
    ],
    mistakes: [
      "Menggunakan basis 100 untuk waktu; menit dan jam berbasis 60.",
      "Menjumlahkan waktu dalam format jam:menit tanpa mengubah ke satuan yang sama.",
      "Menganggap 1 bulan selalu 30 hari saat menghitung durasi panjang.",
    ],
    tips: [
      "Ubah semua durasi ke detik atau menit sebelum menjumlahkan atau mengurangi.",
      "Gunakan format desimal untuk perhitungan, lalu ubah kembali ke jam dan menit saat menampilkan hasil.",
      "Perhatikan satuan milidetik pada pengukuran digital; 1.000 ms = 1 detik.",
    ],
  },
  {
    slug: "konversi-tekanan",
    name: "Konversi Tekanan",
    unitLabel: "tekanan",
    description:
      "Konversi tekanan antara pascal, kilopascal, megapascal, bar, atmosfer, dan psi untuk kebutuhan teknik dan otomotif.",
    keywords: [
      "konversi tekanan",
      "psi ke bar",
      "bar ke psi",
      "atm ke pascal",
      "mpa ke psi",
      "tekanan udara",
    ],
    baseSymbol: "Pa",
    units: [
      { value: "Pa", label: "Pascal (Pa)", symbol: "Pa", factor: 1 },
      { value: "kPa", label: "Kilopascal (kPa)", symbol: "kPa", factor: 1000 },
      { value: "MPa", label: "Megapascal (MPa)", symbol: "MPa", factor: 1000000 },
      { value: "bar", label: "Bar (bar)", symbol: "bar", factor: 100000 },
      { value: "atm", label: "Atmosfer (atm)", symbol: "atm", factor: 101325 },
      {
        value: "psi",
        label: "Pon per inci persegi (psi)",
        symbol: "psi",
        factor: 6894.757293168361,
      },
    ],
    defaults: { value: "1", fromUnit: "atm", toUnit: "Pa" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Tekanan adalah gaya per satuan luas. Pascal adalah satuan SI, sedangkan bar, atmosfer, dan psi adalah satuan turunan yang umum dipakai di industri.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Tekanan udara 1 atmosfer akan dinyatakan dalam pascal.",
        value: "1",
        fromUnit: "atm",
        toUnit: "Pa",
        note: "1 atm = 101.325 Pa = 101,325 kPa.",
      },
      {
        problem: "Tekanan ban 32 psi akan diubah ke bar.",
        value: "32",
        fromUnit: "psi",
        toUnit: "bar",
        note: "1 psi ≈ 0,0689476 bar.",
      },
      {
        problem: "Tekanan hidrolik 2 MPa akan dinyatakan dalam bar.",
        value: "2",
        fromUnit: "MPa",
        toUnit: "bar",
        note: "1 MPa = 10 bar, sehingga 2 MPa = 20 bar.",
      },
    ],
    mistakes: [
      "Menganggap 1 bar sama dengan 1 atm; 1 atm = 1,01325 bar.",
      "Menggunakan psi dan psig secara bergantian; psig adalah tekanan relatif terhadap atmosfer.",
      "Lupa bahwa tekanan gauge (alat ukur) sudah dikurangi tekanan atmosfer.",
    ],
    tips: [
      "Patokan penting: 1 atm = 101.325 Pa = 1,01325 bar = 14,6959 psi.",
      "Pada kompresor dan ban, angka psi biasanya tekanan gauge, bukan tekanan absolut.",
      "Untuk perhitungan struktur, gunakan pascal atau megapascal agar konsisten dengan satuan SI lainnya.",
    ],
  },
  {
    slug: "konversi-energi",
    name: "Konversi Energi",
    unitLabel: "energi",
    description:
      "Konversi energi antara joule, kilojoule, kilowatt jam, kalori, kilokalori, dan BTU dengan hasil dan langkah perhitungan.",
    keywords: [
      "konversi energi",
      "kwh ke joule",
      "kalori ke joule",
      "joule ke kalori",
      "btu ke joule",
      "kilowatt jam",
    ],
    baseSymbol: "J",
    units: [
      { value: "J", label: "Joule (J)", symbol: "J", factor: 1 },
      { value: "kJ", label: "Kilojoule (kJ)", symbol: "kJ", factor: 1000 },
      { value: "kWh", label: "Kilowatt jam (kWh)", symbol: "kWh", factor: 3600000 },
      { value: "cal", label: "Kalori (cal)", symbol: "cal", factor: 4.184 },
      { value: "kcal", label: "Kilokalori (kcal)", symbol: "kcal", factor: 4184 },
      { value: "BTU", label: "British Thermal Unit (BTU)", symbol: "BTU", factor: 1055.05585262 },
    ],
    defaults: { value: "1", fromUnit: "kWh", toUnit: "J" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Semua satuan energi dapat diubah melalui joule. Satu kilowatt jam setara 3,6 juta joule, sedangkan satu kalori setara 4,184 joule.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Pemakaian listrik 1 kWh akan dinyatakan dalam joule.",
        value: "1",
        fromUnit: "kWh",
        toUnit: "J",
        note: "1 kWh = 3.600.000 J = 3,6 MJ.",
      },
      {
        problem: "Energi makanan 500 kalori akan diubah ke joule.",
        value: "500",
        fromUnit: "cal",
        toUnit: "J",
        note: "1 cal = 4,184 J, sehingga 500 cal = 2.092 J.",
      },
      {
        problem: "Kapasitas pendingin 12.000 BTU akan dinyatakan dalam kilojoule.",
        value: "12000",
        fromUnit: "BTU",
        toUnit: "kJ",
        note: "1 BTU ≈ 1,055056 kJ.",
      },
    ],
    mistakes: [
      "Menyamakan kalori dengan kilokalori; 1 kcal = 1.000 cal.",
      "Menganggap kWh adalah satuan daya; kWh adalah energi, sedangkan kW adalah daya.",
      "Mengabaikan perbedaan kalori termokimia (4,184 J) dan kalori lama (4,1868 J) pada perhitungan presisi tinggi.",
    ],
    tips: [
      "Tagihan listrik memakai kWh; untuk menghitung biaya, kalikan kWh dengan tarif per kWh.",
      "1 kWh = 1 kW × 1 jam, sehingga alat 1.000 W yang menyala satu jam memakai 1 kWh.",
      "Gunakan joule untuk perhitungan fisika dan kWh untuk pencatatan pemakaian listrik sehari-hari.",
    ],
  },
  {
    slug: "konversi-daya",
    name: "Konversi Daya",
    unitLabel: "daya",
    description:
      "Konversi daya antara watt, kilowatt, megawatt, tenaga kuda mekanik, dan PS dengan tabel hasil lengkap.",
    keywords: [
      "konversi daya",
      "hp ke watt",
      "watt ke hp",
      "kw ke watt",
      "megawatt",
      "tenaga kuda",
    ],
    baseSymbol: "W",
    units: [
      { value: "W", label: "Watt (W)", symbol: "W", factor: 1 },
      { value: "kW", label: "Kilowatt (kW)", symbol: "kW", factor: 1000 },
      { value: "MW", label: "Megawatt (MW)", symbol: "MW", factor: 1000000 },
      {
        value: "hp",
        label: "Tenaga kuda mekanik (hp)",
        symbol: "hp",
        factor: 745.6998715822702,
      },
      {
        value: "PS",
        label: "PS (metrik)",
        symbol: "PS",
        factor: 735.49875,
      },
    ],
    defaults: { value: "1", fromUnit: "hp", toUnit: "W" },
    formulaTex: MULTIPLICATIVE_FORMULA,
    formulaDescription:
      "Daya adalah energi per satuan waktu. Watt adalah satuan SI, sedangkan hp dan PS adalah satuan tenaga kuda dengan nilai yang sedikit berbeda.",
    variables: MULTIPLICATIVE_VARIABLES,
    examples: [
      {
        problem: "Mesin berdaya 1 hp akan dinyatakan dalam watt.",
        value: "1",
        fromUnit: "hp",
        toUnit: "W",
        note: "1 hp mekanik = 745,6998716 W.",
      },
      {
        problem: "Lampu 1.500 watt akan diubah ke kilowatt.",
        value: "1500",
        fromUnit: "W",
        toUnit: "kW",
        note: "1.500 W = 1,5 kW.",
      },
      {
        problem: "Pembangkit berkapasitas 2 MW akan dinyatakan dalam kilowatt.",
        value: "2",
        fromUnit: "MW",
        toUnit: "kW",
        note: "1 MW = 1.000 kW, sehingga 2 MW = 2.000 kW.",
      },
    ],
    mistakes: [
      "Menyamakan hp mekanik (745,7 W) dengan PS metrik (735,5 W).",
      "Mencampur daya dan energi; watt mengukur daya, watt jam mengukur energi.",
      "Menghitung daya listrik dari tegangan dan arus tanpa mempertimbangkan faktor daya pada beban AC.",
    ],
    tips: [
      "Untuk perkiraan cepat, 1 hp ≈ 746 W dan 1 PS ≈ 735,5 W.",
      "Daya motor listrik sering dicantumkan dalam kW, sedangkan mesin kendaraan dalam hp atau PS.",
      "Pada peralatan rumah tangga, daya watt membantu memperkirakan biaya listrik bersama durasi pemakaian.",
    ],
  },
];

export function getConversionConfig(slug: string): ConversionConfig | undefined {
  return conversionConfigs.find((config) => config.slug === slug);
}
