import type { CategorySlug } from "@/data/calculators";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "formula"; tex: string; description?: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string };

export interface RelatedCalculator {
  category: CategorySlug;
  slug: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  topic: string;
  publishedAt: string;
  readingTimeMinutes: number;
  keywords: string[];
  relatedCalculators: RelatedCalculator[];
  blocks: ArticleBlock[];
}

export const articles: Article[] = [
  {
    slug: "hukum-ohm",
    title: "Hukum Ohm: Hubungan Tegangan, Arus, dan Hambatan",
    description:
      "Memahami V = I × R, cara memilih bentuk rumus yang tepat, dan kesalahan satuan yang sering terjadi saat menghitung rangkaian listrik.",
    topic: "Teknik Elektro",
    publishedAt: "2026-11-06",
    readingTimeMinutes: 6,
    keywords: [
      "hukum ohm",
      "tegangan arus hambatan",
      "rumus v ir",
      "rangkaian listrik",
      "resistansi",
    ],
    relatedCalculators: [
      { category: "teknik-elektro", slug: "hukum-ohm" },
      { category: "teknik-elektro", slug: "daya-listrik" },
      { category: "teknik-elektro", slug: "rangkaian-seri-paralel" },
      { category: "teknik-elektro", slug: "resistansi-kawat" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Hukum Ohm adalah salah satu hubungan paling dasar dalam analisis rangkaian listrik. Hukum ini menyatakan bahwa arus yang mengalir melalui konduktor berbanding lurus dengan tegangan yang diberikan dan berbanding terbalik dengan hambatannya. Selama suhu dan sifat bahan tidak berubah, hubungan tersebut dapat dituliskan dalam satu persamaan sederhana yang menghubungkan tiga besaran pokok: tegangan, arus, dan hambatan.",
      },
      {
        type: "formula",
        tex: String.raw`V = I \times R \qquad\Longleftrightarrow\qquad I = \frac{V}{R} \qquad\Longleftrightarrow\qquad R = \frac{V}{I}`,
        description:
          "V adalah tegangan dalam volt (V), I adalah arus dalam ampere (A), dan R adalah hambatan dalam ohm (Ω).",
      },
      {
        type: "heading",
        text: "Membaca rumus sesuai variabel yang dicari",
      },
      {
        type: "paragraph",
        text: "Banyak kesalahan terjadi bukan karena rumusnya salah, melainkan karena bentuk rumus yang dipakai tidak sesuai pertanyaan. Jika yang diketahui tegangan dan hambatan, gunakan I = V ÷ R. Jika yang diketahui arus dan hambatan, gunakan V = I × R. Jika yang diketahui tegangan dan arus, gunakan R = V ÷ I. Membiasakan diri menuliskan besaran yang diketahui beserta satuannya sebelum menghitung dapat mencegah tertukarnya posisi angka.",
      },
      {
        type: "paragraph",
        text: "Sebagai contoh, sebuah resistor 4 Ω dihubungkan pada sumber 12 V. Arus yang mengalir adalah I = 12 V ÷ 4 Ω = 3 A. Jika arus 3 A mengalir melalui resistor 4 Ω, tegangan pada resistor tersebut adalah V = 3 A × 4 Ω = 12 V. Kedua perhitungan konsisten karena menggunakan data yang sama. Konsistensi seperti ini berguna untuk memeriksa hasil sebelum dipakai pada perhitungan berikutnya.",
      },
      {
        type: "heading",
        text: "Contoh kedua: mencari hambatan",
      },
      {
        type: "paragraph",
        text: "Misalkan sebuah perangkat bekerja pada tegangan 230 V dan menarik arus 0,5 A. Hambatan ekuivalen perangkat tersebut adalah R = 230 V ÷ 0,5 A = 460 Ω. Nilai ini adalah hambatan ekuivalen saat perangkat beroperasi, bukan tentu nilai resistor tunggal di dalamnya. Untuk rangkaian yang mengandung motor, lampu, atau komponen elektronik, hambatan ekuivalen dapat berubah ketika tegangan atau suhu berubah, sehingga hasilnya harus dipahami sebagai pendekatan pada titik kerja tersebut.",
      },
      {
        type: "heading",
        text: "Rangkaian seri dan paralel",
      },
      {
        type: "paragraph",
        text: "Pada rangkaian seri, hambatan total adalah jumlah semua hambatan, sehingga arus yang mengalir sama besar di setiap komponen. Pada rangkaian paralel, kebalikan hambatan total sama dengan jumlah kebalikan masing-masing hambatan, dan tegangan pada setiap cabang sama. Hukum Ohm tetap berlaku untuk setiap komponen maupun untuk keseluruhan rangkaian, asalkan hambatan yang digunakan sesuai dengan bagian rangkaian yang ditinjau. Karena itu, menghitung hambatan ekuivalen lebih dahulu sering menyederhanakan analisis.",
      },
      {
        type: "paragraph",
        text: "Sebagai pemeriksaan tambahan, daya listrik pada komponen dapat dihitung dengan P = V × I. Pada contoh resistor 4 Ω dengan arus 3 A, tegangannya 12 V sehingga dayanya 36 W. Jika hasil daya terasa tidak masuk akal dibandingkan ukuran komponen, kemungkinan ada kesalahan satuan atau data yang tertukar. Pemeriksaan silang seperti ini jauh lebih cepat daripada mengulang seluruh perhitungan dari awal.",
      },
      {
        type: "heading",
        text: "Kesalahan umum",
      },
      {
        type: "list",
        items: [
          "Mencampur satuan tanpa konversi. Arus 250 mA harus ditulis 0,25 A sebelum dimasukkan ke rumus, bukan 250.",
          "Menganggap semua komponen bersifat ohmik. Dioda, lampu pijar, dan motor tidak selalu mengikuti hubungan linear yang sama pada semua kondisi.",
          "Memakai tegangan sumber untuk komponen yang sebenarnya hanya mendapat sebagian tegangan, misalnya pada rangkaian seri.",
          "Lupa bahwa hambatan dapat berubah karena panas. Resistor daya besar yang bekerja lama bisa memiliki nilai efektif yang berbeda dari nilai nominalnya.",
        ],
      },
      {
        type: "callout",
        title: "Tips praktis",
        text: "Selalu tuliskan rumus, substitusi angka beserta satuan, lalu hasil akhir dengan satuannya. Jika dua dari tiga besaran diketahui, besaran ketiga dapat dihitung; jika hanya satu yang diketahui, informasi masih kurang. Gunakan kalkulator Hukum Ohm untuk memeriksa hasil dan melihat langkah perhitungan dengan angka Anda sendiri.",
      },
    ],
  },
  {
    slug: "momen-gaya",
    title: "Momen Gaya: Konsep, Rumus, dan Cara Menentukan Arah Putaran",
    description:
      "Pelajari cara menghitung momen gaya dengan lengan momen yang benar, menentukan arah putaran, dan menghindari kesalahan sudut pada soal mekanika.",
    topic: "Mekanika Teknik",
    publishedAt: "2026-11-06",
    readingTimeMinutes: 6,
    keywords: [
      "momen gaya",
      "torsi",
      "lengan momen",
      "arah putaran",
      "mekanika teknik",
    ],
    relatedCalculators: [
      { category: "mekanika-teknik", slug: "momen-gaya" },
      { category: "mekanika-teknik", slug: "torsi" },
      { category: "mekanika-teknik", slug: "keseimbangan-benda" },
      { category: "mekanika-teknik", slug: "pusat-massa" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Momen gaya, yang juga sering disebut torsi, mengukur kecenderungan suatu gaya untuk memutar benda terhadap suatu titik acuan. Besarnya tidak hanya bergantung pada besar gaya, tetapi juga pada seberapa jauh garis kerja gaya berada dari titik acuan. Kunci perhitungannya adalah lengan momen, yaitu jarak tegak lurus dari titik acuan ke garis kerja gaya, bukan jarak dari titik acuan ke titik tangkap gaya jika arah gaya tidak tegak lurus.",
      },
      {
        type: "formula",
        tex: String.raw`\tau = F \times l \times \sin\theta`,
        description:
          "τ adalah momen gaya (N·m), F adalah besar gaya (N), l adalah jarak dari titik acuan ke titik tangkap (m), dan θ adalah sudut antara gaya dan lengan.",
      },
      {
        type: "heading",
        text: "Lengan momen dan sudut",
      },
      {
        type: "paragraph",
        text: "Jika gaya tegak lurus terhadap lengan, sin 90° = 1 sehingga momen sama dengan F × l. Jika gaya sejajar dengan lengan, sin 0° = 0 sehingga gaya tersebut tidak menghasilkan momen terhadap titik acuan. Untuk sudut di antaranya, komponen gaya yang tegak lurus terhadap lengan yang menghasilkan momen. Karena itu, menggambar garis kerja gaya dan menarik garis tegak lurus dari titik acuan adalah langkah yang sangat membantu sebelum memasukkan angka.",
      },
      {
        type: "paragraph",
        text: "Contoh pertama: sebuah gaya 200 N bekerja tegak lurus pada ujung kunci sepanjang 0,5 m. Momen terhadap titik poros adalah τ = 200 N × 0,5 m = 100 N·m. Contoh kedua: gaya 300 N bekerja pada lengan 0,8 m dengan sudut 30° terhadap lengan. Momennya adalah τ = 300 × 0,8 × sin 30° = 300 × 0,8 × 0,5 = 120 N·m. Perhatikan bahwa sudut yang dipakai adalah sudut antara gaya dan lengan, bukan sudut terhadap garis horizontal atau vertikal secara otomatis.",
      },
      {
        type: "heading",
        text: "Arah putaran dan tanda",
      },
      {
        type: "paragraph",
        text: "Dalam analisis dua dimensi, momen yang memutar berlawanan arah jarum jam biasanya diberi tanda positif, sedangkan yang searah jarum jam diberi tanda negatif. Kesepakatan ini bukan aturan mutlak, tetapi harus konsisten dalam satu perhitungan. Untuk benda yang berada dalam keseimbangan, jumlah momen terhadap titik acuan mana pun sama dengan nol. Memilih titik acuan yang tepat, misalnya titik tumpu atau titik di mana gaya yang tidak diketahui bekerja, dapat menghilangkan suku tertentu dan menyederhanakan persamaan.",
      },
      {
        type: "paragraph",
        text: "Satuan momen gaya adalah newton meter (N·m). Satuan ini secara dimensi sama dengan joule, tetapi maknanya berbeda: joule mengukur energi atau usaha, sedangkan N·m di sini mengukur kecenderungan memutar. Karena itu, dalam penulisan teknik sebaiknya tetap gunakan N·m untuk momen agar tidak tertukar dengan energi. Pada soal yang melibatkan beberapa gaya, hitung momen masing-masing secara terpisah terlebih dahulu, baru jumlahkan dengan memperhatikan tandanya.",
      },
      {
        type: "table",
        caption: "Contoh pengaruh sudut terhadap momen gaya",
        headers: ["Gaya (N)", "Jarak (m)", "Sudut", "Momen (N·m)"],
        rows: [
          ["200", "0,5", "90°", "100"],
          ["200", "0,5", "30°", "50"],
          ["300", "0,8", "30°", "120"],
          ["300", "0,8", "0°", "0"],
        ],
      },
      {
        type: "heading",
        text: "Kesalahan umum",
      },
      {
        type: "list",
        items: [
          "Memakai jarak titik tangkap sebagai lengan momen tanpa memperhatikan arah gaya. Untuk gaya miring, jarak tersebut harus dikalikan sin sudut.",
          "Menjumlahkan besar momen tanpa memperhatikan arah putaran. Dua momen yang berlawanan arah harus saling mengurangi.",
          "Mengganti satuan panjang secara tidak konsisten. Jika gaya dalam newton dan jarak dalam sentimeter, hasilnya bukan N·m sampai jarak diubah ke meter.",
          "Menganggap momen sama dengan gaya. Momen memiliki satuan N·m dan bergantung pada titik acuan, sedangkan gaya tidak.",
        ],
      },
      {
        type: "callout",
        title: "Cara memeriksa hasil",
        text: "Tanyakan tiga hal setelah menghitung: titik acuan mana yang dipakai, berapa lengan tegak lurusnya, dan ke arah mana gaya memutar benda. Jika ketiga jawaban konsisten, hasil momen biasanya benar. Gunakan kalkulator Momen Gaya untuk melihat langkah substitusi dengan angka Anda.",
      },
    ],
  },
  {
    slug: "konversi-biner-desimal",
    title: "Cara Mengubah Biner ke Desimal dan Sebaliknya",
    description:
      "Metode posisi biner, pembagian berulang untuk desimal ke biner, contoh bilangan 1011 dan 156, serta kesalahan urutan bit yang sering terjadi.",
    topic: "Matematika Komputer",
    publishedAt: "2026-11-06",
    readingTimeMinutes: 6,
    keywords: [
      "biner ke desimal",
      "desimal ke biner",
      "konversi bilangan",
      "bilangan biner",
      "bit",
    ],
    relatedCalculators: [
      { category: "matematika-komputer", slug: "konversi-biner-desimal" },
      { category: "matematika-komputer", slug: "bilangan-biner" },
      { category: "matematika-komputer", slug: "heksadesimal" },
      { category: "matematika-komputer", slug: "penjumlahan-biner" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Bilangan biner adalah sistem bilangan berbasis dua yang hanya memakai digit 0 dan 1. Setiap posisi digit memiliki nilai tempat berupa pangkat dua. Dari kanan ke kiri, nilai tempatnya adalah 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8, dan seterusnya. Mengubah biner ke desimal berarti menjumlahkan nilai tempat dari setiap bit yang bernilai 1. Konsep ini sama dengan sistem desimal, hanya basisnya yang berbeda.",
      },
      {
        type: "formula",
        tex: String.raw`(b_n b_{n-1}\ldots b_1 b_0)_2 = \sum_{k=0}^{n} b_k \times 2^k`,
        description:
          "b_k adalah bit pada posisi ke-k, dan 2^k adalah nilai tempat posisi tersebut. Bit paling kanan selalu memiliki pangkat 0.",
      },
      {
        type: "heading",
        text: "Contoh: 1011₂",
      },
      {
        type: "paragraph",
        text: "Tuliskan nilai tempat dari kanan: 1, 2, 4, 8. Bit 1011₂ berarti 1×8 + 0×4 + 1×2 + 1×1 = 8 + 0 + 2 + 1 = 11. Jadi 1011₂ = 11₁₀. Cara memeriksanya adalah dengan mengubah kembali 11 ke biner: 11 dibagi 2 menghasilkan 5 sisa 1, 5 dibagi 2 menghasilkan 2 sisa 1, 2 dibagi 2 menghasilkan 1 sisa 0, dan 1 dibagi 2 menghasilkan 0 sisa 1. Membaca sisa dari bawah ke atas menghasilkan 1011, sesuai bilangan awal.",
      },
      {
        type: "paragraph",
        text: "Contoh lain: 110101₂. Nilai tempat yang menyala adalah 32, 16, 4, dan 1, sehingga jumlahnya 32 + 16 + 4 + 1 = 53. Bilangan ini lebih panjang, tetapi metodenya tetap sama. Menuliskan tabel nilai tempat terlebih dahulu sangat membantu untuk bilangan yang memiliki banyak bit dan mengurangi risiko melewatkan satu posisi.",
      },
      {
        type: "table",
        caption: "Nilai tempat biner untuk delapan bit",
        headers: ["Bit ke-", "7", "6", "5", "4", "3", "2", "1", "0"],
        rows: [
          ["Pangkat dua", "128", "64", "32", "16", "8", "4", "2", "1"],
        ],
      },
      {
        type: "heading",
        text: "Desimal ke biner dengan pembagian berulang",
      },
      {
        type: "paragraph",
        text: "Untuk mengubah desimal ke biner, bagi bilangan dengan 2 secara berulang, catat sisanya, lalu hentikan ketika hasil bagi menjadi 0. Sisa terakhir yang dibaca dari bawah ke atas adalah bilangan binernya. Contoh: 156 ÷ 2 = 78 sisa 0; 78 ÷ 2 = 39 sisa 0; 39 ÷ 2 = 19 sisa 1; 19 ÷ 2 = 9 sisa 1; 9 ÷ 2 = 4 sisa 1; 4 ÷ 2 = 2 sisa 0; 2 ÷ 2 = 1 sisa 0; 1 ÷ 2 = 0 sisa 1. Membaca dari bawah ke atas menghasilkan 10011100₂. Periksa: 128 + 16 + 8 + 4 = 156.",
      },
      {
        type: "paragraph",
        text: "Biner juga dapat dikelompokkan menjadi empat bit untuk memudahkan konversi ke heksadesimal. Kelompok 1001 bernilai 9 dan kelompok 1100 bernilai 12 atau C, sehingga 10011100₂ sama dengan 9C₁₆. Pengelompokan ini dipakai karena satu digit heksadesimal mewakili tepat empat bit, sehingga penulisan alamat memori dan kode warna menjadi lebih ringkas tanpa mengubah nilai.",
      },
      {
        type: "heading",
        text: "Kesalahan umum",
      },
      {
        type: "list",
        items: [
          "Membaca sisa pembagian dari atas ke bawah. Urutan yang benar adalah dari sisa terakhir menuju sisa pertama.",
          "Mulai nilai tempat dari 2¹, bukan 2⁰. Bit paling kanan selalu bernilai 1 jika bernilai 1.",
          "Mengabaikan nol di depan atau di tengah. Nol tetap menempati posisi dan memengaruhi nilai bit di sebelah kirinya.",
          "Menjumlahkan semua nilai tempat, termasuk posisi yang bitnya 0. Hanya posisi dengan bit 1 yang dijumlahkan.",
        ],
      },
      {
        type: "callout",
        title: "Tips menghitung cepat",
        text: "Hafalkan delapan nilai tempat pertama: 128, 64, 32, 16, 8, 4, 2, 1. Untuk bilangan yang lebih besar, lanjutkan dengan 256, 512, 1024, dan seterusnya. Setelah menghitung, selalu lakukan pemeriksaan balik dengan arah konversi yang berlawanan.",
      },
    ],
  },
  {
    slug: "konversi-panjang-massa-volume",
    title: "Konversi Panjang, Massa, dan Volume: Panduan Satuan Metrik",
    description:
      "Ringkasan faktor konversi metrik dan imperial untuk panjang, massa, dan volume, lengkap dengan contoh teknik dan jebakan satuan kuadrat serta kubik.",
    topic: "Konversi Satuan",
    publishedAt: "2026-11-06",
    readingTimeMinutes: 6,
    keywords: [
      "konversi panjang",
      "konversi massa",
      "konversi volume",
      "satuan metrik",
      "faktor konversi",
    ],
    relatedCalculators: [
      { category: "konversi-satuan", slug: "konversi-panjang" },
      { category: "konversi-satuan", slug: "konversi-massa" },
      { category: "konversi-satuan", slug: "konversi-volume" },
      { category: "fisika", slug: "massa-jenis" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Konversi satuan adalah keterampilan dasar yang menentukan kebenaran hampir semua perhitungan teknik. Kesalahan kecil pada satuan dapat mengubah hasil beberapa kali lipat, terutama ketika besaran yang dikonversi memiliki pangkat, seperti luas dan volume. Satuan metrik menggunakan kelipatan sepuluh yang konsisten, sehingga konversi di dalam sistem ini relatif mudah asalkan arah perkalian atau pembagiannya dipahami.",
      },
      {
        type: "formula",
        tex: String.raw`\begin{aligned}
1\ \text{km} &= 1000\ \text{m}\\
1\ \text{kg} &= 1000\ \text{g}\\
1\ \text{m}^3 &= 1000\ \text{L}\\
1\ \text{L} &= 1000\ \text{cm}^3
\end{aligned}`,
        description:
          "Hubungan dasar ini menjadi acuan untuk konversi panjang, massa, dan volume dalam sistem metrik.",
      },
      {
        type: "heading",
        text: "Panjang",
      },
      {
        type: "paragraph",
        text: "Satuan panjang metrik yang umum adalah milimeter, sentimeter, meter, dan kilometer. Satu meter sama dengan 1.000 milimeter atau 100 sentimeter, sedangkan satu kilometer sama dengan 1.000 meter. Untuk satuan imperial, satu inci sama dengan 2,54 sentimeter dan satu kaki sama dengan 12 inci atau 0,3048 meter. Contoh: 250 cm = 2,5 m karena dibagi 100, dan 1,5 km = 1.500 m karena dikalikan 1.000.",
      },
      {
        type: "heading",
        text: "Massa",
      },
      {
        type: "paragraph",
        text: "Satuan massa metrik yang umum adalah miligram, gram, kilogram, kuintal, dan ton. Satu kilogram sama dengan 1.000 gram, satu kuintal sama dengan 100 kilogram, dan satu ton metrik sama dengan 1.000 kilogram. Untuk satuan imperial, satu pon kira-kira 0,453592 kilogram dan satu ons kira-kira 28,3495 gram. Contoh: 2,5 ton = 2.500 kg, dan 750 gram = 0,75 kg. Perhatikan bahwa istilah ton dapat berbeda antarnegara, sehingga dalam konteks teknik sebaiknya tuliskan ton metrik secara eksplisit.",
      },
      {
        type: "heading",
        text: "Volume",
      },
      {
        type: "paragraph",
        text: "Volume metrik biasanya dinyatakan dalam mililiter, liter, dan meter kubik. Satu liter sama dengan 1.000 mililiter, satu meter kubik sama dengan 1.000 liter, dan satu liter setara 1.000 sentimeter kubik. Untuk satuan imperial, satu galon Amerika Serikat kira-kira 3,785 liter. Contoh: 2 m³ = 2.000 liter, dan 500 mL = 0,5 liter. Hubungan 1 mL = 1 cm³ sangat berguna saat berpindah antara volume dan dimensi benda.",
      },
      {
        type: "table",
        caption: "Faktor konversi yang sering dipakai",
        headers: ["Besaran", "Dari", "Ke", "Faktor"],
        rows: [
          ["Panjang", "1 km", "m", "× 1.000"],
          ["Panjang", "1 inci", "cm", "× 2,54"],
          ["Massa", "1 kg", "g", "× 1.000"],
          ["Massa", "1 pon", "kg", "× 0,453592"],
          ["Volume", "1 m³", "liter", "× 1.000"],
          ["Volume", "1 liter", "cm³", "× 1.000"],
        ],
      },
      {
        type: "heading",
        text: "Contoh penerapan teknik",
      },
      {
        type: "paragraph",
        text: "Sebuah tangki berukuran 2 m³ diisi air. Volume tersebut sama dengan 2.000 liter. Jika massa jenis air sekitar 1.000 kg/m³, massa airnya sekitar 2.000 kg atau 2 ton metrik. Rangkaian konversi ini menunjukkan pentingnya menjaga satuan tetap konsisten: volume diubah ke satuan yang sesuai, lalu dikalikan massa jenis yang satuannya cocok. Mengalikan 2 dengan 1.000 tanpa memeriksa satuan bisa menghasilkan angka yang tampak benar tetapi maknanya keliru.",
      },
      {
        type: "heading",
        text: "Kesalahan umum",
      },
      {
        type: "list",
        items: [
          "Mengonversi satuan luas atau volume dengan faktor panjang saja. Satu meter sama dengan 100 cm, tetapi satu meter persegi sama dengan 10.000 cm² dan satu meter kubik sama dengan 1.000.000 cm³.",
          "Membalik arah perkalian. Dari kilometer ke meter berarti dikalikan 1.000, sedangkan dari meter ke kilometer berarti dibagi 1.000.",
          "Mencampur ton metrik dengan ton pendek atau ton panjang. Selisihnya cukup besar untuk memengaruhi perhitungan material.",
          "Membulatkan terlalu awal. Simpan beberapa angka desimal selama perhitungan dan bulatkan pada hasil akhir.",
        ],
      },
      {
        type: "callout",
        title: "Tips memeriksa konversi",
        text: "Tuliskan satuan di setiap langkah dan pastikan satuan yang tidak dipakai saling menghapus. Jika hasilnya terasa terlalu besar atau terlalu kecil, periksa apakah Anda mengalikan atau membagi dengan faktor yang benar. Kalkulator konversi satuan menampilkan tabel lengkap sehingga hasil dapat dibandingkan langsung.",
      },
    ],
  },
  {
    slug: "konversi-suhu",
    title: "Konversi Suhu Celsius, Fahrenheit, dan Kelvin",
    description:
      "Rumus konversi suhu beserta contoh 0 °C, 100 °C, dan -40°, penjelasan titik nol mutlak, serta kesalahan offset yang sering terjadi.",
    topic: "Konversi Satuan",
    publishedAt: "2026-11-06",
    readingTimeMinutes: 5,
    keywords: [
      "konversi suhu",
      "celsius ke fahrenheit",
      "kelvin",
      "rumus suhu",
      "nol mutlak",
    ],
    relatedCalculators: [
      { category: "konversi-satuan", slug: "konversi-suhu" },
      { category: "konversi-satuan", slug: "konversi-energi" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Suhu adalah besaran yang menunjukkan tingkat panas suatu benda. Berbeda dari panjang atau massa, konversi suhu melibatkan titik nol yang tidak sama antara skala. Celsius dan Fahrenheit memiliki titik nol yang dipilih berdasarkan perilaku air, sedangkan Kelvin dimulai dari nol mutlak. Karena itu, konversi suhu tidak cukup hanya dengan mengalikan faktor, tetapi juga perlu menambahkan atau mengurangi offset.",
      },
      {
        type: "formula",
        tex: String.raw`\begin{aligned}
^\circ F &= \frac{9}{5}\,^\circ C + 32\\
^\circ C &= \frac{5}{9}\left(^\circ F - 32\right)\\
K &= ^\circ C + 273{,}15\\
^\circ C &= K - 273{,}15
\end{aligned}`,
        description:
          "Gunakan offset 273,15 untuk konversi yang teliti. Untuk perhitungan sehari-hari, 273 sering dipakai sebagai pembulatan.",
      },
      {
        type: "heading",
        text: "Titik acuan yang perlu diingat",
      },
      {
        type: "paragraph",
        text: "Air membeku pada 0 °C, yang sama dengan 32 °F dan 273,15 K. Air mendidih pada 100 °C, yang sama dengan 212 °F dan 373,15 K. Suhu -40 °C sama dengan -40 °F, satu-satunya titik di mana kedua skala menunjukkan angka yang sama. Nol mutlak adalah 0 K, setara -273,15 °C atau -459,67 °F. Tidak ada suhu yang lebih rendah dari nol mutlak, sehingga nilai Kelvin tidak boleh negatif.",
      },
      {
        type: "heading",
        text: "Contoh perhitungan",
      },
      {
        type: "paragraph",
        text: "Ubah 25 °C ke Fahrenheit. Kalikan 25 dengan 9/5 sehingga diperoleh 45, lalu tambahkan 32, hasilnya 77 °F. Untuk arah sebaliknya, ubah 77 °F ke Celsius: kurangi 32 menjadi 45, lalu kalikan 5/9 sehingga hasilnya 25 °C. Contoh lain, 300 K setara 300 − 273,15 = 26,85 °C. Jika suhu 300 K diubah ke Fahrenheit, ubah dulu ke Celsius, lalu gunakan rumus Fahrenheit; hasilnya sekitar 80,33 °F.",
      },
      {
        type: "paragraph",
        text: "Konversi Fahrenheit langsung ke Kelvin dapat dilakukan dengan K = (F − 32) × 5/9 + 273,15. Sebagai contoh, 212 °F dikurangi 32 menjadi 180, dikalikan 5/9 menjadi 100, lalu ditambah 273,15 sehingga hasilnya 373,15 K. Langkah ini setara dengan mengubah Fahrenheit ke Celsius terlebih dahulu, kemudian menambahkan 273,15. Menuliskan langkah antara membuat kesalahan offset lebih mudah ditemukan, terutama ketika suhu yang dihitung mendekati titik beku air.",
      },
      {
        type: "table",
        caption: "Titik acuan suhu",
        headers: ["Keterangan", "Celsius", "Fahrenheit", "Kelvin"],
        rows: [
          ["Nol mutlak", "-273,15 °C", "-459,67 °F", "0 K"],
          ["Air membeku", "0 °C", "32 °F", "273,15 K"],
          ["Suhu kamar (perkiraan)", "25 °C", "77 °F", "298,15 K"],
          ["Air mendidih", "100 °C", "212 °F", "373,15 K"],
        ],
      },
      {
        type: "paragraph",
        text: "Kelvin banyak dipakai dalam sains karena titik nolnya berada di nol mutlak, sehingga perbandingan suhu menjadi lebih langsung. Dalam hukum gas, pemuaian, dan perpindahan panas, suhu sering harus dinyatakan dalam kelvin agar persamaan tidak memerlukan koreksi offset. Selisih suhu 1 K sama dengan selisih 1 °C, tetapi nilai mutlaknya berbeda. Karena itu, ketika rumus membedakan suhu, menggunakan Celsius atau Kelvin dapat memberikan hasil yang sama; ketika rumus menggunakan suhu secara langsung, Kelvin biasanya menjadi pilihan yang benar.",
      },
      {
        type: "heading",
        text: "Kesalahan umum",
      },
      {
        type: "list",
        items: [
          "Menambahkan 32 sebelum mengalikan. Urutan yang benar untuk Celsius ke Fahrenheit adalah kalikan 9/5 terlebih dahulu, baru tambahkan 32.",
          "Menggunakan faktor 9/5 pada arah yang salah. Dari Fahrenheit ke Celsius, gunakan 5/9 setelah mengurangi 32.",
          "Lupa offset Kelvin. 0 °C bukan 0 K, melainkan 273,15 K.",
          "Menghasilkan Kelvin negatif. Jika perhitungan memberi nilai di bawah 0 K, ada kesalahan input atau rumus karena suhu tersebut tidak mungkin.",
        ],
      },
      {
        type: "callout",
        title: "Tips",
        text: "Hafalkan tiga titik acuan, yaitu nol mutlak, titik beku air, dan titik didih air. Dengan tiga titik ini, Anda dapat memeriksa apakah hasil konversi masuk akal. Kalkulator konversi suhu juga menampilkan langkah melalui Kelvin sehingga jejak perhitungannya mudah diperiksa.",
      },
    ],
  },
  {
    slug: "volume-beton-material",
    title: "Menghitung Volume Beton dan Kebutuhan Material",
    description:
      "Cara menghitung volume plat, balok, dan kolom, menambahkan cadangan, serta memperkirakan kebutuhan semen, pasir, dan kerikil secara realistis.",
    topic: "Teknik Sipil",
    publishedAt: "2026-11-06",
    readingTimeMinutes: 7,
    keywords: [
      "volume beton",
      "kebutuhan material",
      "campuran beton",
      "volume plat",
      "rencana anggaran",
    ],
    relatedCalculators: [
      { category: "teknik-sipil", slug: "volume-beton" },
      { category: "teknik-sipil", slug: "kebutuhan-material" },
      { category: "teknik-sipil", slug: "campuran-beton" },
      { category: "teknik-sipil", slug: "berat-besi" },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Perhitungan volume beton adalah langkah awal dalam menyusun rencana anggaran dan jadwal pengecoran. Volume yang salah dapat menyebabkan kekurangan material di tengah pekerjaan atau sisa material yang terbuang. Prinsip dasarnya sederhana: hitung volume geometri elemen struktur dalam meter kubik, lalu tambahkan cadangan yang wajar. Namun, setiap elemen memiliki bentuk dan dimensi yang berbeda, sehingga ketelitian pada tahap pengukuran sangat menentukan.",
      },
      {
        type: "formula",
        tex: String.raw`V_{\text{plat}} = p \times l \times t \qquad V_{\text{balok}} = b \times h \times L \qquad V_{\text{kolom}} = b \times h \times H`,
        description:
          "Semua dimensi harus dalam satuan yang sama. Jika ukuran lapangan dalam sentimeter, ubah ke meter sebelum mengalikan.",
      },
      {
        type: "heading",
        text: "Contoh plat lantai",
      },
      {
        type: "paragraph",
        text: "Sebuah plat lantai memiliki panjang 6 m, lebar 4 m, dan tebal 12 cm. Ubah tebal menjadi 0,12 m, lalu hitung volume: 6 × 4 × 0,12 = 2,88 m³. Jika cadangan 5% ditambahkan, kebutuhan beton menjadi sekitar 3,02 m³. Cadangan ini penting karena permukaan dasar tidak selalu rata, bekisting dapat bergeser sedikit, dan sebagian beton tertinggal di alat angkut. Untuk pekerjaan yang kompleks, cadangan 5% sampai 10% umum dipakai, tetapi keputusan akhirnya bergantung pada kondisi lapangan.",
      },
      {
        type: "heading",
        text: "Contoh balok dan kolom",
      },
      {
        type: "paragraph",
        text: "Balok dengan lebar 0,25 m, tinggi 0,4 m, dan panjang 5 m memiliki volume 0,25 × 0,4 × 5 = 0,5 m³. Kolom dengan penampang 0,3 m × 0,3 m dan tinggi 3,5 m memiliki volume 0,315 m³. Jika ada enam kolom serupa, totalnya 1,89 m³. Untuk struktur yang memiliki banyak elemen, buat tabel perhitungan agar setiap elemen tercatat dan tidak ada yang terlewat. Jangan menjumlahkan dimensi dalam sentimeter dengan hasil dalam meter tanpa konversi yang konsisten.",
      },
      {
        type: "table",
        caption: "Contoh rekap volume elemen",
        headers: ["Elemen", "Dimensi", "Jumlah", "Volume (m³)"],
        rows: [
          ["Plat lantai", "6 × 4 × 0,12 m", "1", "2,88"],
          ["Balok", "0,25 × 0,4 × 5 m", "4", "2,00"],
          ["Kolom", "0,3 × 0,3 × 3,5 m", "6", "1,89"],
        ],
      },
      {
        type: "heading",
        text: "Memperkirakan material",
      },
      {
        type: "paragraph",
        text: "Kebutuhan semen, pasir, dan kerikil bergantung pada mutu beton dan rancangan campuran. Untuk beton struktur umum, dibutuhkan sekitar 300 sampai 400 kg semen per meter kubik, dengan proporsi pasir dan kerikil yang ditentukan oleh mix design. Angka ini bukan resep universal; kadar air, ukuran agregat, dan mutu yang diminta dapat mengubahnya. Karena itu, gunakan perkiraan hanya untuk anggaran awal, lalu minta rancangan campuran yang sesuai untuk pekerjaan sebenarnya.",
      },
      {
        type: "paragraph",
        text: "Sebagai ilustrasi, untuk 3,02 m³ beton dengan kebutuhan semen 350 kg/m³, semen yang diperlukan sekitar 1.057 kg, atau sekitar 22 sak berisi 50 kg. Pasir dan kerikil dihitung dari proporsi campuran yang dipilih. Pembulatan ke atas perlu dilakukan karena material tidak dapat dibeli dalam pecahan sak. Namun, angka ini harus diperiksa kembali terhadap spesifikasi proyek dan kondisi material di lokasi.",
      },
      {
        type: "heading",
        text: "Kesalahan umum",
      },
      {
        type: "list",
        items: [
          "Lupa mengubah sentimeter ke meter. Tebal 12 cm harus menjadi 0,12 m, bukan 12.",
          "Menghitung volume bersih tanpa cadangan, sehingga material kurang saat pengecoran.",
          "Menjumlahkan volume elemen yang saling bertumpuk, misalnya balok dan plat pada daerah yang sama, tanpa mengurangi bagian yang tumpang tindih.",
          "Menggunakan angka kebutuhan semen generik tanpa memperhatikan mutu beton dan rancangan campuran.",
        ],
      },
      {
        type: "callout",
        title: "Catatan penting",
        text: "Hasil perhitungan volume dan material bersifat estimasi untuk perencanaan awal. Untuk pekerjaan struktur, tetap gunakan gambar kerja, spesifikasi teknis, dan rancangan campuran yang disetujui oleh perencana. Kalkulator volume beton dan kebutuhan material membantu memeriksa angka, bukan menggantikan dokumen proyek.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesForCalculator(
  category: string,
  slug: string,
): Article[] {
  return articles.filter((article) =>
    article.relatedCalculators.some(
      (related) => related.category === category && related.slug === slug,
    ),
  );
}

export function getLatestArticles(limit = 3): Article[] {
  return [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
