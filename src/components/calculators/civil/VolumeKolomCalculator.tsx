"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import {
  circularColumnVolume,
  rectangularColumnVolume,
} from "@/lib/math/civil";
import { LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = rectangularColumnVolume(0.3, 0.3, 4);
const EXAMPLE_B = circularColumnVolume(0.4, 4);

export default function VolumeKolomCalculator(props: {
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
          id: "shape",
          label: "Bentuk penampang kolom",
          options: [
            { value: "persegi", label: "Persegi / persegi panjang" },
            { value: "bulat", label: "Bulat" },
          ],
          hint: "Pilih bentuk sesuai gambar struktur.",
        },
        {
          id: "sideA",
          label: "Sisi A penampang",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          showWhen: (form) => form.shape === "persegi",
          hint: "Contoh: 0,3",
        },
        {
          id: "sideB",
          label: "Sisi B penampang",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          showWhen: (form) => form.shape === "persegi",
          hint: "Contoh: 0,3",
        },
        {
          id: "diameter",
          label: "Diameter kolom (D)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          showWhen: (form) => form.shape === "bulat",
          hint: "Contoh: 0,4",
        },
        {
          id: "height",
          label: "Tinggi kolom (h)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 4",
        },
      ]}
      formulaTex={String.raw`V_{\text{persegi}}=a\,b\,h\qquad V_{\text{bulat}}=\pi\left(\frac{D}{2}\right)^{2}h`}
      formulaDescription="Volume kolom adalah luas penampang dikali tinggi. Kolom persegi memakai hasil kali kedua sisi, sedangkan kolom bulat memakai luas lingkaran."
      variables={[
        { symbol: "V", name: "Volume kolom", unit: "m³", note: "Volume beton kolom" },
        { symbol: "a, b", name: "Sisi penampang persegi", unit: "m", note: "Ukuran kedua sisi penampang" },
        { symbol: "D", name: "Diameter kolom bulat", unit: "m", note: "Ukuran diameter penampang" },
        { symbol: "h", name: "Tinggi kolom", unit: "m", note: "Tinggi bersih elemen kolom" },
      ]}
      compute={({ form, values }) => {
        const isRound = form.shape === "bulat";
        const volume = isRound
          ? circularColumnVolume(values.diameter, values.height)
          : rectangularColumnVolume(values.sideA, values.sideB, values.height);
        const area = isRound
          ? Math.PI * (values.diameter / 2) ** 2
          : values.sideA * values.sideB;

        return {
          label: "Volume kolom (V)",
          value: formatNumber(volume),
          unit: "m³",
          rows: [
            { label: "Luas penampang", value: `${formatNumber(area)} m²` },
            { label: "Tinggi kolom", value: `${formatNumber(values.height)} m` },
            { label: "Volume dalam liter", value: `${formatNumber(volume * 1000)} L` },
          ],
          steps: [
            {
              title: "Hitung luas penampang",
              detail: isRound
                ? `A = π × (D/2)² = π × (${formatNumber(values.diameter / 2)})² = ${formatNumber(area)} m².`
                : `A = a × b = ${formatNumber(values.sideA)} × ${formatNumber(values.sideB)} = ${formatNumber(area)} m².`,
            },
            {
              title: "Kalikan luas dengan tinggi",
              detail: `V = ${formatNumber(area)} m² × ${formatNumber(values.height)} m = ${formatNumber(volume)} m³.`,
            },
            {
              title: "Ubah ke liter bila perlu",
              detail: `V = ${formatNumber(volume * 1000)} L.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Kolom beton berpenampang persegi 30 cm × 30 cm dengan tinggi 4 m. Hitung volume betonnya.",
          detail: `A = 0,3 × 0,3 = 0,09 m². V = 0,09 × 4 = ${formatNumber(EXAMPLE_A)} m³.`,
          answer: `${formatNumber(EXAMPLE_A)} m³`,
          values: {
            shape: "persegi",
            sideA: "0.3",
            sideAUnit: "m",
            sideB: "0.3",
            sideBUnit: "m",
            height: "4",
            heightUnit: "m",
          },
        },
        {
          problem:
            "Kolom bulat berdiameter 40 cm dan tinggi 4 m akan dicor. Berapa volume beton yang diperlukan?",
          detail: `A = π × 0,2² = ${formatNumber(Math.PI * 0.04)} m². V = ${formatNumber(Math.PI * 0.04)} × 4 = ${formatNumber(EXAMPLE_B)} m³.`,
          answer: `${formatNumber(EXAMPLE_B)} m³`,
          values: {
            shape: "bulat",
            diameter: "0.4",
            diameterUnit: "m",
            height: "4",
            heightUnit: "m",
          },
        },
      ]}
      mistakes={[
        "Memakai diameter sebagai jari-jari pada kolom bulat sehingga volume menjadi empat kali lebih besar.",
        "Menggunakan tinggi total bangunan, padahal tinggi kolom dihitung per lantai.",
        "Mengabaikan pembesaran penampang pada daerah sambungan balok.",
      ]}
      tips={[
        "Untuk kolom bulat, hitung jari-jari setengah diameter lebih dulu.",
        "Volume kolom biasanya dihitung sampai permukaan balok, bukan sampai tepi atas pelat.",
        "Kalikan volume satu kolom dengan jumlah kolom bertipe sama untuk kebutuhan total.",
      ]}
    />
  );
}
