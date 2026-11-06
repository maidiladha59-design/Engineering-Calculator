"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { boxVolume } from "@/lib/math/civil";
import { LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = boxVolume(4, 3, 0.12);
const EXAMPLE_B = boxVolume(6, 2.5, 0.15);

export default function VolumeBetonCalculator(props: {
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
          label: "Panjang pelat (p)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 4",
        },
        {
          id: "width",
          label: "Lebar pelat (l)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 3",
        },
        {
          id: "thickness",
          label: "Tebal pelat (t)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 0,12 untuk pelat 12 cm",
        },
      ]}
      formulaTex={String.raw`V=p\,l\,t`}
      formulaDescription="Volume beton untuk pelat persegi panjang adalah panjang dikali lebar dikali tebal. Gunakan satuan meter agar hasil langsung dalam meter kubik."
      variables={[
        { symbol: "V", name: "Volume beton", unit: "m³", note: "Volume pekerjaan cor" },
        { symbol: "p", name: "Panjang", unit: "m", note: "Dimensi memanjang pelat" },
        { symbol: "l", name: "Lebar", unit: "m", note: "Dimensi melintang pelat" },
        { symbol: "t", name: "Tebal", unit: "m", note: "Ketebalan pelat atau lapisan beton" },
      ]}
      compute={({ values }) => {
        const volume = boxVolume(values.length, values.width, values.thickness);

        return {
          label: "Volume beton (V)",
          value: formatNumber(volume),
          unit: "m³",
          rows: [
            { label: "Volume dalam liter", value: `${formatNumber(volume * 1000)} L` },
            { label: "Panjang", value: `${formatNumber(values.length)} m` },
            { label: "Lebar", value: `${formatNumber(values.width)} m` },
            { label: "Tebal", value: `${formatNumber(values.thickness)} m` },
          ],
          footnote:
            "Belum termasuk cadangan untuk pemadatan, tumpahan, atau perbedaan elevasi permukaan.",
          steps: [
            {
              title: "Samakan satuan ke meter",
              detail: `p = ${formatNumber(values.length)} m, l = ${formatNumber(values.width)} m, t = ${formatNumber(values.thickness)} m.`,
            },
            {
              title: "Kalikan panjang dan lebar",
              detail: `p × l = ${formatNumber(values.length)} × ${formatNumber(values.width)} = ${formatNumber(values.length * values.width)} m².`,
            },
            {
              title: "Kalikan dengan tebal",
              detail: `V = ${formatNumber(values.length * values.width)} m² × ${formatNumber(values.thickness)} m = ${formatNumber(volume)} m³.`,
            },
            {
              title: "Ubah ke liter bila perlu",
              detail: `1 m³ = 1.000 L, sehingga volume = ${formatNumber(volume * 1000)} L.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Pelat lantai berukuran 4 m × 3 m dengan tebal 12 cm akan dicor. Berapa volume beton yang dibutuhkan?",
          detail: `Tebal 12 cm = 0,12 m. V = 4 × 3 × 0,12 = ${formatNumber(EXAMPLE_A)} m³.`,
          answer: `${formatNumber(EXAMPLE_A)} m³`,
          values: { length: "4", lengthUnit: "m", width: "3", widthUnit: "m", thickness: "0.12", thicknessUnit: "m" },
        },
        {
          problem:
            "Jalan beton sepanjang 6 m dan lebar 2,5 m dibuat dengan tebal 15 cm. Hitung volume betonnya.",
          detail: `V = 6 × 2,5 × 0,15 = ${formatNumber(EXAMPLE_B)} m³.`,
          answer: `${formatNumber(EXAMPLE_B)} m³`,
          values: { length: "6", lengthUnit: "m", width: "2.5", widthUnit: "m", thickness: "0.15", thicknessUnit: "m" },
        },
      ]}
      mistakes={[
        "Memasukkan tebal dalam sentimeter tanpa mengubahnya ke meter.",
        "Menggunakan ukuran luar bekisting tanpa memperhitungkan ketebalan dinding atau selimut beton.",
        "Menghitung volume beton tanpa cadangan, padahal pemadatan dan permukaan tidak rata memerlukan tambahan.",
      ]}
      tips={[
        "Ubah semua ukuran ke meter lebih dulu agar hasil langsung dalam m³.",
        "Tambahkan cadangan sekitar 5–10% untuk pekerjaan cor agar tidak kekurangan material.",
        "1 m³ sama dengan 1.000 liter, memudahkan pembandingan dengan kapasitas mixer.",
      ]}
    />
  );
}
