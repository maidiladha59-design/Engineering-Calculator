"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { rotationalKineticEnergy } from "@/lib/math/mechanics";
import { ANGULAR_SPEED_UNITS } from "@/lib/units";

const EXAMPLE_A = rotationalKineticEnergy(2, 3);
const EXAMPLE_B = rotationalKineticEnergy(0.5, (300 * Math.PI) / 30);
const EXAMPLE_C = rotationalKineticEnergy(1.2, (120 * Math.PI) / 30);

export default function EnergiKinetikRotasiCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          id: "inertia",
          label: "Momen inersia (I)",
          unit: "kg·m²",
          rule: "non-negative",
          hint: "Gunakan kalkulator Momen Inersia jika belum diketahui.",
        },
        {
          id: "angularSpeed",
          label: "Kecepatan sudut (ω)",
          units: ANGULAR_SPEED_UNITS,
          defaultUnit: "rad/s",
          rule: "non-negative",
          hint: "Contoh: 3 rad/s atau 300 rpm",
        },
      ]}
      formulaTex={String.raw`E_k=\tfrac{1}{2}I\omega^{2}`}
      formulaDescription="Energi kinetik rotasi bergantung pada momen inersia dan kuadrat kecepatan sudut. Pastikan kecepatan sudut dinyatakan dalam radian per detik sebelum dimasukkan ke rumus."
      variables={[
        { symbol: "E_k", name: "Energi kinetik rotasi", unit: "J", note: "Energi yang dimiliki benda berputar" },
        { symbol: "I", name: "Momen inersia", unit: "kg·m²", note: "Kelembaman benda terhadap poros" },
        { symbol: "ω", name: "Kecepatan sudut", unit: "rad/s", note: "Besar sudut yang ditempuh per detik" },
      ]}
      compute={({ values }) => {
        const energy = rotationalKineticEnergy(
          values.inertia,
          values.angularSpeed,
        );

        return {
          label: "Energi kinetik rotasi (E_k)",
          value: formatNumber(energy),
          unit: "J",
          rows: [
            { label: "Momen inersia", value: `${formatNumber(values.inertia)} kg·m²` },
            { label: "Kecepatan sudut (SI)", value: `${formatNumber(values.angularSpeed)} rad/s` },
            {
              label: "Kecepatan sudut dalam rpm",
              value: `${formatNumber((values.angularSpeed * 60) / (2 * Math.PI))} rpm`,
            },
          ],
          footnote:
            "Jika energi yang dihasilkan sangat kecil atau sangat besar, hasil ditampilkan dalam notasi ilmiah.",
          steps: [
            {
              title: "Samakan satuan kecepatan sudut",
              detail: `ω = ${formatNumber(values.angularSpeed)} rad/s (nilai rpm sudah dikonversi dengan faktor 2π/60).`,
            },
            {
              title: "Kuadratkan kecepatan sudut",
              detail: `ω² = (${formatNumber(values.angularSpeed)})² = ${formatNumber(values.angularSpeed ** 2)} rad²/s².`,
            },
            {
              title: "Hitung energi kinetik rotasi",
              detail: `E_k = ½ × ${formatNumber(values.inertia)} × ${formatNumber(values.angularSpeed ** 2)} = ${formatNumber(energy)} J.`,
            },
            {
              title: "Periksa hasil",
              detail:
                "Energi selalu bernilai nol atau positif. Hasil negatif menandakan ada kesalahan tanda pada input.",
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Roda dengan momen inersia 2 kg·m² berputar pada 3 rad/s. Berapa energi kinetik rotasinya?",
          detail: `E_k = ½ × 2 × 3² = ${formatNumber(EXAMPLE_A)} J.`,
          answer: `${formatNumber(EXAMPLE_A)} J`,
          values: { inertia: "2", angularSpeed: "3", angularSpeedUnit: "rad/s" },
        },
        {
          problem:
            "Sebuah piringan memiliki momen inersia 0,5 kg·m² dan berputar 300 rpm. Hitung energi kinetik rotasinya.",
          detail: `300 rpm = 300 × 2π/60 = ${formatNumber((300 * Math.PI) / 30)} rad/s. E_k = ½ × 0,5 × (${formatNumber((300 * Math.PI) / 30)})² = ${formatNumber(EXAMPLE_B)} J.`,
          answer: `${formatNumber(EXAMPLE_B)} J`,
          values: { inertia: "0.5", angularSpeed: "300", angularSpeedUnit: "rpm" },
        },
        {
          problem:
            "Benda dengan momen inersia 1,2 kg·m² berputar 120 rpm. Hitung energi kinetik rotasinya.",
          detail: `120 rpm = ${formatNumber((120 * Math.PI) / 30)} rad/s. E_k = ½ × 1,2 × (${formatNumber((120 * Math.PI) / 30)})² = ${formatNumber(EXAMPLE_C)} J.`,
          answer: `${formatNumber(EXAMPLE_C)} J`,
          values: { inertia: "1.2", angularSpeed: "120", angularSpeedUnit: "rpm" },
        },
      ]}
      mistakes={[
        "Memasukkan rpm langsung ke rumus tanpa mengubahnya ke rad/s, sehingga hasilnya terlalu kecil sekitar 0,01 kali.",
        "Mengkuadratkan momen inersia, padahal yang dikuadratkan adalah kecepatan sudut.",
        "Memakai diameter sebagai jari-jari saat menghitung momen inersia benda.",
      ]}
      tips={[
        "Ingat konversi cepat: 1 rpm = 2π/60 ≈ 0,10472 rad/s.",
        "Untuk benda menggelinding, energi kinetik total adalah jumlah energi translasi dan rotasi.",
        "Gunakan satuan SI secara konsisten agar hasil langsung dalam joule.",
      ]}
    />
  );
}
