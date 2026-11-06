export type CategorySlug = "matematika" | "fisika";

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
    "kecepatan",
    "gaya",
    "usaha-energi",
    "persamaan-kuadrat",
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
