"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { wireResistance } from "@/lib/math/electricity";
import { LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = wireResistance(0.0175, 100, 1.5);
const EXAMPLE_B = wireResistance(0.028, 50, 2.5);

export default function ResistansiKawatCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          id: "resistivity",
          label: "Resistivitas bahan (ρ)",
          unit: "Ω·mm²/m",
          rule: "non-negative",
          hint: "Tembaga 0,0175; aluminium 0,028; besi sekitar 0,1.",
        },
        {
          id: "length",
          label: "Panjang kawat (L)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "non-negative",
          hint: "Contoh: 100",
        },
        {
          id: "area",
          label: "Luas penampang kawat (A)",
          unit: "mm²",
          rule: "positive",
          hint: "Contoh: 1,5 (kawat tembaga 1,5 mm²)",
        },
      ]}
      formulaTex={String.raw`R=\rho\frac{L}{A}`}
      formulaDescription="Hambatan kawat sebanding dengan resistivitas bahan dan panjang kawat, serta berbanding terbalik dengan luas penampang. Rumus ini memakai satuan praktis Ω·mm²/m agar luas penampang dapat diisi langsung dalam mm²."
      variables={[
        { symbol: "R", name: "Hambatan kawat", unit: "Ω", note: "Hambatan total sepanjang kawat" },
        { symbol: "ρ", name: "Resistivitas bahan", unit: "Ω·mm²/m", note: "Sifat bahan; tembaga sekitar 0,0175" },
        { symbol: "L", name: "Panjang kawat", unit: "m", note: "Panjang total penghantar" },
        { symbol: "A", name: "Luas penampang", unit: "mm²", note: "Luas inti konduktor, bukan diameter" },
      ]}
      compute={({ values }) => {
        const resistance = wireResistance(
          values.resistivity,
          values.length,
          values.area,
        );

        return {
          label: "Hambatan kawat (R)",
          value: formatNumber(resistance),
          unit: "Ω",
          rows: [
            { label: "Hambatan dalam miliohm", value: `${formatNumber(resistance * 1000)} mΩ` },
            { label: "Resistivitas", value: `${formatNumber(values.resistivity)} Ω·mm²/m` },
            { label: "Panjang", value: `${formatNumber(values.length)} m` },
            { label: "Luas penampang", value: `${formatNumber(values.area)} mm²` },
          ],
          steps: [
            {
              title: "Pastikan satuan praktis",
              detail: `ρ = ${formatNumber(values.resistivity)} Ω·mm²/m, L = ${formatNumber(values.length)} m, A = ${formatNumber(values.area)} mm².`,
            },
            {
              title: "Bagi panjang dengan luas penampang",
              detail: `L / A = ${formatNumber(values.length)} / ${formatNumber(values.area)} = ${formatNumber(values.length / values.area)} 1/mm².`,
            },
            {
              title: "Kalikan dengan resistivitas",
              detail: `R = ${formatNumber(values.resistivity)} × ${formatNumber(values.length)} / ${formatNumber(values.area)} = ${formatNumber(resistance)} Ω.`,
            },
            {
              title: "Periksa pengaruh ukuran",
              detail:
                "Kawat yang dua kali lebih panjang memiliki hambatan dua kali lebih besar; kawat yang penampangnya dua kali lebih luas memiliki hambatan setengahnya.",
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Kawat tembaga dengan resistivitas 0,0175 Ω·mm²/m memiliki panjang 100 m dan penampang 1,5 mm². Hitung hambatannya.",
          detail: `R = 0,0175 × 100 / 1,5 = ${formatNumber(EXAMPLE_A)} Ω.`,
          answer: `${formatNumber(EXAMPLE_A)} Ω`,
          values: { resistivity: "0.0175", length: "100", lengthUnit: "m", area: "1.5" },
        },
        {
          problem:
            "Kawat aluminium 0,028 Ω·mm²/m sepanjang 50 m dengan penampang 2,5 mm² dipakai pada instalasi. Berapa hambatannya?",
          detail: `R = 0,028 × 50 / 2,5 = ${formatNumber(EXAMPLE_B)} Ω.`,
          answer: `${formatNumber(EXAMPLE_B)} Ω`,
          values: { resistivity: "0.028", length: "50", lengthUnit: "m", area: "2.5" },
        },
      ]}
      mistakes={[
        "Memakai diameter kawat sebagai luas penampang, padahal rumus membutuhkan luas A = πd²/4.",
        "Mengisi panjang dalam sentimeter tanpa mengubahnya ke meter.",
        "Menganggap resistansi kawat selalu dapat diabaikan pada arus besar dan jarak jauh.",
      ]}
      tips={[
        "Untuk kawat tembaga, aturan praktisnya sekitar 0,0175 Ω per meter pada penampang 1 mm².",
        "Hambatan kawat menimbulkan rugi daya I²R dan penurunan tegangan sepanjang kabel.",
        "Gunakan penampang lebih besar untuk mengurangi rugi tegangan pada kabel panjang.",
      ]}
    />
  );
}
