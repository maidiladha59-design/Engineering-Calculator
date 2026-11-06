"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { buildingArea } from "@/lib/math/civil";
import { LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = buildingArea(10, 8, 2);
const EXAMPLE_B = buildingArea(12, 9, 1);

export default function LuasBangunanCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          id: "length",
          label: "Panjang lantai (p)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 10",
        },
        {
          id: "width",
          label: "Lebar lantai (l)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 8",
        },
        {
          id: "floors",
          label: "Jumlah lantai",
          unit: "lantai",
          rule: "positive-integer",
          hint: "Contoh: 2",
        },
      ]}
      formulaTex={String.raw`L=p\,l\,n`}
      formulaDescription="Luas bangunan total adalah luas satu lantai dikali jumlah lantai. Luas satu lantai dihitung dari panjang dikali lebar denah."
      variables={[
        { symbol: "L", name: "Luas bangunan total", unit: "m²", note: "Luas seluruh lantai" },
        { symbol: "p", name: "Panjang lantai", unit: "m", note: "Dimensi memanjang denah" },
        { symbol: "l", name: "Lebar lantai", unit: "m", note: "Dimensi melintang denah" },
        { symbol: "n", name: "Jumlah lantai", unit: "lantai", note: "Bilangan bulat positif" },
      ]}
      compute={({ values }) => {
        const area = buildingArea(values.length, values.width, values.floors);

        return {
          label: "Luas bangunan total (L)",
          value: formatNumber(area),
          unit: "m²",
          rows: [
            {
              label: "Luas satu lantai",
              value: `${formatNumber(values.length * values.width)} m²`,
            },
            { label: "Jumlah lantai", value: `${formatNumber(values.floors)} lantai` },
            { label: "Luas dalam are", value: `${formatNumber(area / 100)} are` },
            { label: "Luas dalam hektare", value: `${formatNumber(area / 10000)} ha` },
          ],
          footnote:
            "Luas ini adalah luas lantai kotor. Luas bersih setelah dikurangi dinding dan void akan lebih kecil.",
          steps: [
            {
              title: "Hitung luas satu lantai",
              detail: `A = ${formatNumber(values.length)} × ${formatNumber(values.width)} = ${formatNumber(values.length * values.width)} m².`,
            },
            {
              title: "Kalikan jumlah lantai",
              detail: `L = ${formatNumber(values.length * values.width)} m² × ${formatNumber(values.floors)} = ${formatNumber(area)} m².`,
            },
            {
              title: "Ubah ke satuan lahan bila perlu",
              detail: `L = ${formatNumber(area / 100)} are = ${formatNumber(area / 10000)} ha.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Rumah dua lantai memiliki denah 10 m × 8 m. Berapa luas bangunan totalnya?",
          detail: `Luas per lantai 80 m². Total = 80 × 2 = ${formatNumber(EXAMPLE_A)} m².`,
          answer: `${formatNumber(EXAMPLE_A)} m²`,
          values: { length: "10", lengthUnit: "m", width: "8", widthUnit: "m", floors: "2" },
        },
        {
          problem:
            "Bangunan satu lantai berukuran 12 m × 9 m. Hitung luas bangunannya.",
          detail: `L = 12 × 9 × 1 = ${formatNumber(EXAMPLE_B)} m².`,
          answer: `${formatNumber(EXAMPLE_B)} m²`,
          values: { length: "12", lengthUnit: "m", width: "9", widthUnit: "m", floors: "1" },
        },
      ]}
      mistakes={[
        "Mengalikan luas tanah dengan jumlah lantai, padahal yang dikalikan adalah luas denah bangunan.",
        "Memasukkan jumlah lantai dalam pecahan atau nol.",
        "Menganggap luas bangunan sama dengan luas tanah.",
      ]}
      tips={[
        "Luas bangunan digunakan untuk estimasi biaya per meter persegi, sedangkan luas tanah untuk nilai lahan.",
        "Untuk denah tidak beraturan, pecah menjadi beberapa persegi panjang lalu jumlahkan.",
        "Luas kotor mencakup dinding; luas bersih ruangan biasanya 10–20% lebih kecil.",
      ]}
    />
  );
}
