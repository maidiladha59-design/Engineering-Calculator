"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import {
  concreteMixPerSack,
  type ConcreteMixRatio,
} from "@/lib/math/civil";

const EXAMPLE_A = concreteMixPerSack("1:2:3", 1);
const EXAMPLE_B = concreteMixPerSack("1:2:4", 5);

export default function CampuranBetonCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          kind: "select",
          id: "ratio",
          label: "Perbandingan campuran",
          options: [
            { value: "1:2:3", label: "1 : 2 : 3 (semen : pasir : kerikil)" },
            { value: "1:2:4", label: "1 : 2 : 4 (semen : pasir : kerikil)" },
          ],
          hint: "Perbandingan dihitung berdasarkan volume.",
        },
        {
          id: "sacks",
          label: "Jumlah sak semen",
          unit: "sak",
          rule: "positive-integer",
          hint: "Satu sak diasumsikan 50 kg.",
        },
      ]}
      formulaTex={String.raw`V_{\text{pasir}}=\frac{50}{1440}\times 2\times n\qquad V_{\text{kerikil}}=\frac{50}{1440}\times 3\times n`}
      formulaDescription="Satu sak semen 50 kg memiliki volume sekitar 0,0347 m³. Volume pasir dan kerikil mengikuti perbandingan campuran terhadap semen. Air diperkirakan 25 liter per sak."
      variables={[
        { symbol: "n", name: "Jumlah sak semen", unit: "sak", note: "Bilangan bulat positif" },
        { symbol: "V_pasir", name: "Volume pasir", unit: "m³", note: "Mengikuti angka perbandingan pasir" },
        { symbol: "V_kerikil", name: "Volume kerikil", unit: "m³", note: "Mengikuti angka perbandingan kerikil" },
        { symbol: "V_air", name: "Perkiraan air", unit: "L", note: "Sekitar 25 liter per sak" },
      ]}
      compute={({ form, values }) => {
        const ratio = form.ratio as ConcreteMixRatio;
        const result = concreteMixPerSack(ratio, values.sacks);
        const cementVolume = values.sacks * (50 / 1440);

        return {
          label: "Kebutuhan pasir",
          value: formatNumber(result.sandM3),
          unit: "m³",
          rows: [
            { label: "Kerikil", value: `${formatNumber(result.gravelM3)} m³` },
            { label: "Perkiraan air", value: `${formatNumber(result.estimatedWaterLiters)} L` },
            { label: "Jumlah semen", value: `${formatNumber(result.cementSacks)} sak = ${formatNumber(result.cementSacks * 50)} kg` },
            { label: "Volume semen", value: `${formatNumber(cementVolume)} m³` },
            { label: "Campuran", value: ratio },
          ],
          footnote:
            "Takaran air 25 liter per sak adalah perkiraan awal. Kebutuhan air sebenarnya bergantung pada kelembapan pasir dan kerikil.",
          steps: [
            {
              title: "Hitung volume semen",
              detail: `50 kg / 1.440 kg/m³ = 0,0347 m³ per sak. Untuk ${formatNumber(values.sacks)} sak: ${formatNumber(cementVolume)} m³.`,
            },
            {
              title: "Kalikan volume semen dengan angka pasir",
              detail: `V_pasir = ${formatNumber(cementVolume)} m³ × 2 = ${formatNumber(result.sandM3)} m³.`,
            },
            {
              title: "Kalikan volume semen dengan angka kerikil",
              detail: `V_kerikil = ${formatNumber(cementVolume)} m³ × ${ratio === "1:2:3" ? "3" : "4"} = ${formatNumber(result.gravelM3)} m³.`,
            },
            {
              title: "Perkirakan air",
              detail: `Air = 25 L × ${formatNumber(values.sacks)} sak = ${formatNumber(result.estimatedWaterLiters)} L.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Satu sak semen 50 kg akan dicampur dengan perbandingan 1:2:3. Berapa pasir, kerikil, dan air yang dibutuhkan?",
          detail: `Volume semen 0,0347 m³. Pasir = 0,0347 × 2 = ${formatNumber(EXAMPLE_A.sandM3)} m³; kerikil = 0,0347 × 3 = ${formatNumber(EXAMPLE_A.gravelM3)} m³; air ≈ ${formatNumber(EXAMPLE_A.estimatedWaterLiters)} L.`,
          answer: `${formatNumber(EXAMPLE_A.sandM3)} m³ pasir, ${formatNumber(EXAMPLE_A.gravelM3)} m³ kerikil, ${formatNumber(EXAMPLE_A.estimatedWaterLiters)} L air`,
          values: { ratio: "1:2:3", sacks: "1" },
        },
        {
          problem:
            "Lima sak semen akan dicampur dengan perbandingan 1:2:4. Hitung kebutuhan pasir dan kerikilnya.",
          detail: `Volume semen = 5 × 0,0347 = ${formatNumber(5 * (50 / 1440))} m³. Pasir = ${formatNumber(EXAMPLE_B.sandM3)} m³; kerikil = ${formatNumber(EXAMPLE_B.gravelM3)} m³.`,
          answer: `${formatNumber(EXAMPLE_B.sandM3)} m³ pasir, ${formatNumber(EXAMPLE_B.gravelM3)} m³ kerikil`,
          values: { ratio: "1:2:4", sacks: "5" },
        },
      ]}
      mistakes={[
        "Menakar pasir dan kerikil dengan berat, padahal perbandingan ini berbasis volume.",
        "Memakai air sebanyak mungkin agar mudah diaduk, yang justru menurunkan kekuatan beton.",
        "Menganggap perbandingan 1:2:4 dan 1:2:3 menghasilkan kekuatan yang sama.",
      ]}
      tips={[
        "Gunakan ember atau kotak takar yang sama untuk semua material agar perbandingan konsisten.",
        "Campur pasir dan kerikil lebih dulu, lalu tambahkan semen agar merata.",
        "Air 25 liter per sak adalah titik awal; sesuaikan sampai adukan mudah dikerjakan tanpa berair.",
      ]}
    />
  );
}
