"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import {
  binaryPlaceValues,
  decimalToBinary,
  decimalToHex,
  decimalToOctal,
  isBinary,
  parseBinary,
} from "@/lib/math/binary";

function validateBinary(value: string): string | undefined {
  if (!isBinary(value)) {
    return "Hanya boleh berisi angka 0 dan 1, tanpa spasi atau tanda baca.";
  }

  if (value.trim().length > 32) {
    return "Gunakan maksimal 32 bit agar langkah perhitungan tetap terbaca.";
  }

  return undefined;
}

export default function BilanganBinerCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const exampleA = parseBinary("1011");
  const exampleB = parseBinary("11111111");
  const exampleC = parseBinary("100000000");

  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          kind: "text",
          id: "binary",
          label: "Bilangan biner",
          placeholder: "Contoh: 1011",
          hint: "Gunakan hanya digit 0 dan 1.",
          mono: true,
          validate: validateBinary,
        },
      ]}
      formulaTex={String.raw`N=\sum_{i=0}^{n-1} b_i\,2^{i}`}
      formulaDescription="Setiap bit biner memiliki nilai tempat pangkat dua. Jumlahkan nilai tempat semua bit yang bernilai 1 untuk memperoleh nilai desimalnya."
      variables={[
        { symbol: "N", name: "Nilai desimal", unit: "—", note: "Hasil konversi ke basis 10" },
        { symbol: "b_i", name: "Bit ke-i", unit: "0 atau 1", note: "Dibaca dari kanan sebagai pangkat 0" },
        { symbol: "2^i", name: "Nilai tempat", unit: "—", note: "1, 2, 4, 8, 16, dan seterusnya" },
      ]}
      compute={({ form }) => {
        const input = form.binary.trim();
        const decimal = parseBinary(input);
        const places = binaryPlaceValues(input);
        const activePlaces = places.filter((place) => place.bit === "1");
        const hexadecimal = decimalToHex(decimal);
        const octal = decimalToOctal(decimal);

        return {
          label: "Nilai desimal",
          value: decimal.toString(),
          rows: [
            { label: "Heksadesimal", value: `0x${hexadecimal}` },
            { label: "Oktal", value: `0o${octal}` },
            { label: "Jumlah bit", value: `${input.length} bit` },
            {
              label: "Bit aktif",
              value: activePlaces.map((place) => `2^${place.power}`).join(", ") || "tidak ada",
            },
          ],
          steps: [
            {
              title: "Tulis nilai tempat setiap bit",
              detail: places
                .map((place) => `${place.bit}×2^${place.power}`)
                .join(" + "),
            },
            {
              title: "Jumlahkan kontribusi bit yang bernilai 1",
              detail: activePlaces.length
                ? `${activePlaces.map((place) => place.contribution).join(" + ")} = ${decimal.toString()}.`
                : "Semua bit bernilai 0, sehingga nilai desimalnya 0.",
            },
            {
              title: "Konversi ke heksadesimal",
              detail: `Kelompokkan bit per empat dari kanan, lalu ubah setiap kelompok. Hasilnya 0x${hexadecimal}.`,
            },
            {
              title: "Konversi ke oktal",
              detail: `Kelompokkan bit per tiga dari kanan, lalu ubah setiap kelompok. Hasilnya 0o${octal}.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem: "Ubah bilangan biner 1011 menjadi desimal.",
          detail: `1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = ${exampleA.toString()}.`,
          answer: `${exampleA.toString()} desimal (0xB)`,
          values: { binary: "1011" },
        },
        {
          problem: "Berapa nilai desimal dari 11111111 biner?",
          detail: `1×2⁷ + … + 1×2⁰ = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = ${exampleB.toString()}.`,
          answer: `${exampleB.toString()} desimal (0xFF)`,
          values: { binary: "11111111" },
        },
        {
          problem: "Ubah 100000000 biner menjadi desimal.",
          detail: `Hanya bit ke-8 yang aktif: 1×2⁸ = ${exampleC.toString()}.`,
          answer: `${exampleC.toString()} desimal (0x100)`,
          values: { binary: "100000000" },
        },
      ]}
      mistakes={[
        "Membaca bit dari kiri sebagai pangkat nol, padahal pangkat nol berada paling kanan.",
        "Menganggap 1011 biner sama dengan 1011 desimal.",
        "Memasukkan spasi atau tanda baca di antara bit.",
      ]}
      tips={[
        "Hafalkan nilai tempat 1, 2, 4, 8, 16, 32, 64, 128 untuk konversi cepat.",
        "Biner 8 bit dapat menampung 0–255; 16 bit menampung 0–65.535.",
        "Gunakan prefix 0b saat menulis biner dan 0x saat menulis heksadesimal di banyak bahasa pemrograman.",
      ]}
    />
  );
}
