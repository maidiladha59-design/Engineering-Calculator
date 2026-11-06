"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { rebarWeight } from "@/lib/math/civil";
import { LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = rebarWeight(10, 12, 10);
const EXAMPLE_B = rebarWeight(13, 12, 5);

export default function BeratBesiCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          id: "diameter",
          label: "Diameter besi (d)",
          unit: "mm",
          rule: "positive",
          hint: "Contoh: 10 untuk besi polos 10 mm.",
        },
        {
          id: "length",
          label: "Panjang satu batang (L)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 12",
        },
        {
          id: "count",
          label: "Jumlah batang",
          unit: "batang",
          rule: "positive-integer",
          hint: "Contoh: 10",
        },
      ]}
      formulaTex={String.raw`W=\frac{\pi}{4}d^{2}\times 7850\times L\times n`}
      formulaDescription="Berat besi beton dihitung dari luas penampang lingkaran, massa jenis baja 7.850 kg/m³, panjang, dan jumlah batang. Diameter diubah dari milimeter ke meter lebih dulu."
      variables={[
        { symbol: "W", name: "Berat total besi", unit: "kg", note: "Berat seluruh batang" },
        { symbol: "d", name: "Diameter besi", unit: "mm", note: "Diameter nominal tulangan" },
        { symbol: "L", name: "Panjang batang", unit: "m", note: "Panjang satu batang" },
        { symbol: "n", name: "Jumlah batang", unit: "batang", note: "Bilangan bulat positif" },
        { symbol: "ρ_baja", name: "Massa jenis baja", unit: "kg/m³", note: "7.850 kg/m³" },
      ]}
      compute={({ values }) => {
        const result = rebarWeight(values.diameter, values.length, values.count);

        return {
          label: "Berat total besi (W)",
          value: formatNumber(result.weightKg),
          unit: "kg",
          rows: [
            { label: "Berat dalam ton", value: `${formatNumber(result.weightTon)} ton` },
            { label: "Berat per meter", value: `${formatNumber(result.massPerMeterKg)} kg/m` },
            { label: "Panjang total", value: `${formatNumber(result.totalLengthM)} m` },
            { label: "Jumlah batang", value: `${formatNumber(values.count)} batang` },
          ],
          footnote:
            "Berat dihitung dari diameter nominal. Ulir dan toleransi pabrik dapat menyebabkan selisih kecil dari berat aktual.",
          steps: [
            {
              title: "Ubah diameter ke meter",
              detail: `d = ${formatNumber(values.diameter)} mm = ${formatNumber(values.diameter / 1000)} m.`,
            },
            {
              title: "Hitung luas penampang",
              detail: `A = π/4 × d² = π/4 × (${formatNumber(values.diameter / 1000)})² = ${formatNumber((Math.PI / 4) * (values.diameter / 1000) ** 2)} m².`,
            },
            {
              title: "Hitung berat per meter",
              detail: `w = A × 7.850 = ${formatNumber(result.massPerMeterKg)} kg/m.`,
            },
            {
              title: "Kalikan panjang dan jumlah batang",
              detail: `W = ${formatNumber(result.massPerMeterKg)} × ${formatNumber(values.length)} m × ${formatNumber(values.count)} = ${formatNumber(result.weightKg)} kg.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Sepuluh batang besi beton diameter 10 mm, masing-masing panjang 12 m. Berapa berat totalnya?",
          detail: `Berat per meter ≈ ${formatNumber(EXAMPLE_A.massPerMeterKg)} kg/m. Total = ${formatNumber(EXAMPLE_A.weightKg)} kg.`,
          answer: `${formatNumber(EXAMPLE_A.weightKg)} kg`,
          values: { diameter: "10", length: "12", lengthUnit: "m", count: "10" },
        },
        {
          problem:
            "Lima batang besi diameter 13 mm dengan panjang 12 m akan dibeli. Hitung berat totalnya.",
          detail: `Berat per meter ≈ ${formatNumber(EXAMPLE_B.massPerMeterKg)} kg/m. Total = ${formatNumber(EXAMPLE_B.weightKg)} kg.`,
          answer: `${formatNumber(EXAMPLE_B.weightKg)} kg`,
          values: { diameter: "13", length: "12", lengthUnit: "m", count: "5" },
        },
      ]}
      mistakes={[
        "Memakai diameter dalam sentimeter tanpa mengubahnya ke meter.",
        "Menghitung berat satu batang lalu lupa mengalikan dengan jumlah batang.",
        "Menganggap besi ulir dan besi polos berdiameter sama memiliki berat berbeda jauh, padahal pendekatannya sama.",
      ]}
      tips={[
        "Aturan praktis besi polos: berat per meter ≈ 0,006165 × d² dengan d dalam mm.",
        "Tambahkan 5–10% untuk potongan, kait, dan sisa yang terbuang.",
        "Untuk pembelian, bulatkan berat ke atas atau ikuti satuan jual pemasok.",
      ]}
    />
  );
}
