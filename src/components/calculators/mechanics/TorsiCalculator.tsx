"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { torque } from "@/lib/math/mechanics";
import { ANGLE_UNITS, FORCE_UNITS, LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = torque(100, 0.2, 90);
const EXAMPLE_B = torque(80, 0.3, 60);

export default function TorsiCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          id: "force",
          label: "Gaya (F)",
          units: FORCE_UNITS,
          defaultUnit: "N",
          rule: "non-negative",
          hint: "Contoh: 100",
        },
        {
          id: "radius",
          label: "Jari-jari poros (r)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "non-negative",
          hint: "Gunakan jari-jari, bukan diameter",
        },
        {
          id: "angle",
          label: "Sudut gaya terhadap lengan (θ)",
          units: ANGLE_UNITS,
          defaultUnit: "deg",
          hint: "Contoh: 90",
        },
      ]}
      formulaTex={String.raw`\tau=F\,r\,\sin\theta`}
      formulaDescription="Torsi adalah momen yang menyebabkan poros berputar. Rumusnya sama dengan momen gaya, tetapi r menyatakan jari-jari titik kerja gaya terhadap sumbu poros."
      variables={[
        { symbol: "τ", name: "Torsi", unit: "N·m", note: "Momen putar terhadap sumbu poros" },
        { symbol: "F", name: "Gaya", unit: "N", note: "Gaya yang bekerja pada poros" },
        { symbol: "r", name: "Jari-jari", unit: "m", note: "Jarak dari sumbu ke titik kerja gaya" },
        { symbol: "θ", name: "Sudut", unit: "° atau rad", note: "Sudut antara gaya dan lengan" },
      ]}
      compute={({ values }) => {
        const result = torque(values.force, values.radius, values.angle);

        return {
          label: "Torsi (τ)",
          value: formatNumber(result.torque),
          unit: "N·m",
          rows: [
            { label: "Gaya tangensial", value: `${formatNumber(result.tangentialForce)} N` },
            { label: "Jari-jari (SI)", value: `${formatNumber(values.radius)} m` },
            { label: "Gaya (SI)", value: `${formatNumber(values.force)} N` },
            { label: "Sudut", value: `${formatNumber(values.angle)}°` },
          ],
          steps: [
            {
              title: "Samakan satuan",
              detail: `F = ${formatNumber(values.force)} N, r = ${formatNumber(values.radius)} m, θ = ${formatNumber(values.angle)}°.`,
            },
            {
              title: "Hitung komponen gaya yang memutar poros",
              detail: `F sin θ = ${formatNumber(values.force)} × sin(${formatNumber(values.angle)}°) = ${formatNumber(result.tangentialForce)} N.`,
            },
            {
              title: "Kalikan dengan jari-jari",
              detail: `τ = ${formatNumber(result.tangentialForce)} N × ${formatNumber(values.radius)} m = ${formatNumber(result.torque)} N·m.`,
            },
            {
              title: "Periksa satuan",
              detail: "Newton dikali meter menghasilkan newton meter (N·m), bukan joule, karena torsi bukan energi.",
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Sebuah gaya 100 N bekerja tegak lurus pada jari-jari 0,2 m. Berapa torsi pada poros?",
          detail: `sin 90° = 1, sehingga τ = 100 × 0,2 × 1 = ${formatNumber(EXAMPLE_A.torque)} N·m.`,
          answer: `${formatNumber(EXAMPLE_A.torque)} N·m`,
          values: { force: "100", radius: "0.2", angle: "90" },
        },
        {
          problem:
            "Gaya 80 N bekerja pada jari-jari 0,3 m dengan sudut 60°. Hitung torsinya.",
          detail: `Komponen tangensial = 80 × sin 60° = ${formatNumber(EXAMPLE_B.tangentialForce)} N. τ = ${formatNumber(EXAMPLE_B.tangentialForce)} × 0,3 = ${formatNumber(EXAMPLE_B.torque)} N·m.`,
          answer: `${formatNumber(EXAMPLE_B.torque)} N·m`,
          values: { force: "80", radius: "0.3", angle: "60" },
        },
      ]}
      mistakes={[
        "Memasukkan diameter sebagai jari-jari, sehingga hasil torsi menjadi dua kali lipat.",
        "Mengabaikan sudut gaya dan menganggap semua gaya bekerja tegak lurus.",
        "Menulis satuan torsi sebagai joule; torsi dan energi memiliki dimensi yang mirip tetapi maknanya berbeda.",
      ]}
      tips={[
        "Bagi diameter dengan dua terlebih dahulu jika yang diketahui adalah diameter poros.",
        "Torsi maksimum diperoleh saat gaya tegak lurus terhadap lengan, yaitu θ = 90°.",
        "Untuk sistem dengan beberapa gaya, hitung torsi masing-masing terhadap sumbu yang sama lalu jumlahkan dengan tanda arah yang konsisten.",
      ]}
    />
  );
}
