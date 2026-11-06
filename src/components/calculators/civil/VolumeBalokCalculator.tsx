"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { boxVolume } from "@/lib/math/civil";
import { LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = boxVolume(0.3, 0.5, 6);
const EXAMPLE_B = boxVolume(0.25, 0.4, 4);

export default function VolumeBalokCalculator(props: {
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
          label: "Panjang balok (p)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 6",
        },
        {
          id: "width",
          label: "Lebar balok (l)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 0,3",
        },
        {
          id: "height",
          label: "Tinggi balok (t)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 0,5",
        },
      ]}
      formulaTex={String.raw`V=p\,l\,t`}
      formulaDescription="Volume balok beton dihitung dari hasil kali tiga dimensinya. Balok biasanya berupa elemen struktur memanjang dengan penampang persegi panjang."
      variables={[
        { symbol: "V", name: "Volume balok", unit: "m³", note: "Volume beton elemen balok" },
        { symbol: "p", name: "Panjang", unit: "m", note: "Bentang atau panjang elemen" },
        { symbol: "l", name: "Lebar penampang", unit: "m", note: "Dimensi mendatar penampang" },
        { symbol: "t", name: "Tinggi penampang", unit: "m", note: "Dimensi vertikal penampang" },
      ]}
      compute={({ values }) => {
        const volume = boxVolume(values.length, values.width, values.height);

        return {
          label: "Volume balok (V)",
          value: formatNumber(volume),
          unit: "m³",
          rows: [
            { label: "Volume dalam liter", value: `${formatNumber(volume * 1000)} L` },
            {
              label: "Luas penampang",
              value: `${formatNumber(values.width * values.height)} m²`,
            },
            { label: "Panjang", value: `${formatNumber(values.length)} m` },
          ],
          steps: [
            {
              title: "Hitung luas penampang",
              detail: `A = l × t = ${formatNumber(values.width)} × ${formatNumber(values.height)} = ${formatNumber(values.width * values.height)} m².`,
            },
            {
              title: "Kalikan dengan panjang",
              detail: `V = A × p = ${formatNumber(values.width * values.height)} × ${formatNumber(values.length)} = ${formatNumber(volume)} m³.`,
            },
            {
              title: "Ubah ke liter bila perlu",
              detail: `V = ${formatNumber(volume)} × 1.000 = ${formatNumber(volume * 1000)} L.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Balok beton memiliki penampang 30 cm × 50 cm dan panjang 6 m. Berapa volume betonnya?",
          detail: `0,3 × 0,5 × 6 = ${formatNumber(EXAMPLE_A)} m³.`,
          answer: `${formatNumber(EXAMPLE_A)} m³`,
          values: { length: "6", lengthUnit: "m", width: "0.3", widthUnit: "m", height: "0.5", heightUnit: "m" },
        },
        {
          problem:
            "Sloof berpenampang 25 cm × 40 cm dengan panjang 4 m akan dicor. Hitung volume betonnya.",
          detail: `0,25 × 0,4 × 4 = ${formatNumber(EXAMPLE_B)} m³.`,
          answer: `${formatNumber(EXAMPLE_B)} m³`,
          values: { length: "4", lengthUnit: "m", width: "0.25", widthUnit: "m", height: "0.4", heightUnit: "m" },
        },
      ]}
      mistakes={[
        "Menukar lebar dan tinggi penampang sehingga luas penampang salah.",
        "Memakai ukuran balok dalam sentimeter tanpa mengubahnya ke meter.",
        "Menghitung panjang bersih tanpa memperhitungkan sambungan atau perletakan pada tumpuan.",
      ]}
      tips={[
        "Hitung luas penampang terlebih dahulu, lalu kalikan panjang agar lebih mudah diperiksa.",
        "Untuk balok bertulang, volume beton tidak dikurangi volume besi karena biasanya kecil.",
        "Samakan satuan gambar kerja (biasanya mm) ke meter sebelum menghitung.",
      ]}
    />
  );
}
