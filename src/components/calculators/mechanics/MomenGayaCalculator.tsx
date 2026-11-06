"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { momentOfForce } from "@/lib/math/mechanics";
import { ANGLE_UNITS, FORCE_UNITS, LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = momentOfForce(20, 0.5, 90);
const EXAMPLE_B = momentOfForce(50, 2, 30);

export default function MomenGayaCalculator(props: {
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
          hint: "Contoh: 20",
        },
        {
          id: "distance",
          label: "Jarak titik acuan ke titik gaya (d)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "non-negative",
          hint: "Contoh: 0,5",
        },
        {
          id: "angle",
          label: "Sudut antara gaya dan lengan (θ)",
          units: ANGLE_UNITS,
          defaultUnit: "deg",
          hint: "Sudut 90° memberi momen maksimum",
        },
      ]}
      formulaTex={String.raw`M=F\,d\,\sin\theta`}
      formulaDescription="Momen gaya adalah hasil kali besar gaya, jarak tegak lurus dari titik acuan, dan sinus sudut antara gaya dengan lengan momen."
      variables={[
        { symbol: "M", name: "Momen gaya", unit: "N·m", note: "Kecenderungan gaya memutar benda" },
        { symbol: "F", name: "Gaya", unit: "N", note: "Besar gaya yang bekerja" },
        { symbol: "d", name: "Jarak ke titik acuan", unit: "m", note: "Diukur dari titik acuan ke titik kerja gaya" },
        { symbol: "θ", name: "Sudut", unit: "° atau rad", note: "Sudut antara vektor gaya dan lengan" },
      ]}
      compute={({ values }) => {
        const result = momentOfForce(values.force, values.distance, values.angle);

        return {
          label: "Momen gaya (M)",
          value: formatNumber(result.moment),
          unit: "N·m",
          rows: [
            { label: "Lengan momen", value: `${formatNumber(result.leverArm)} m` },
            { label: "Gaya (SI)", value: `${formatNumber(values.force)} N` },
            { label: "Jarak (SI)", value: `${formatNumber(values.distance)} m` },
            { label: "Sudut", value: `${formatNumber(values.angle)}°` },
          ],
          footnote:
            "Tanda hasil mengikuti arah putaran. Dengan kesepakatan umum, momen berlawanan arah jarum jam bernilai positif.",
          steps: [
            {
              title: "Samakan satuan",
              detail: `F = ${formatNumber(values.force)} N, d = ${formatNumber(values.distance)} m, θ = ${formatNumber(values.angle)}°.`,
            },
            {
              title: "Hitung lengan momen tegak lurus",
              detail: `d sin θ = ${formatNumber(values.distance)} × sin(${formatNumber(values.angle)}°) = ${formatNumber(result.leverArm)} m.`,
            },
            {
              title: "Kalikan gaya dengan lengan momen",
              detail: `M = ${formatNumber(values.force)} N × ${formatNumber(result.leverArm)} m = ${formatNumber(result.moment)} N·m.`,
            },
            {
              title: "Periksa arah putaran",
              detail:
                result.moment > 0
                  ? "Hasil positif berarti momen memutar ke arah yang disepakati positif."
                  : result.moment < 0
                    ? "Hasil negatif berarti arah putaran berlawanan dengan kesepakatan positif."
                    : "Momen nol karena garis kerja gaya melewati titik acuan.",
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Sebuah kunci pas diberi gaya 20 N tegak lurus pada jarak 0,5 m dari baut. Berapa momen gaya terhadap baut?",
          detail: `Karena θ = 90°, sin 90° = 1 sehingga lengan momen sama dengan 0,5 m. M = 20 × 0,5 × 1 = ${formatNumber(EXAMPLE_A.moment)} N·m.`,
          answer: `${formatNumber(EXAMPLE_A.moment)} N·m`,
          values: { force: "20", distance: "0.5", angle: "90" },
        },
        {
          problem:
            "Gaya 50 N membentuk sudut 30° terhadap lengan sepanjang 2 m. Hitung momen gaya terhadap titik acuan.",
          detail: `Lengan momen = 2 × sin 30° = ${formatNumber(EXAMPLE_B.leverArm)} m. M = 50 × ${formatNumber(EXAMPLE_B.leverArm)} = ${formatNumber(EXAMPLE_B.moment)} N·m.`,
          answer: `${formatNumber(EXAMPLE_B.moment)} N·m`,
          values: { force: "50", distance: "2", angle: "30" },
        },
      ]}
      mistakes={[
        "Memakai jarak sepanjang lengan apa adanya tanpa mengalikan sin θ, padahal yang dibutuhkan adalah komponen gaya yang tegak lurus lengan.",
        "Mencampur satuan sentimeter dan meter sehingga hasil momen menjadi 100 kali lebih besar atau lebih kecil.",
        "Menganggap sudut 0° tetap menghasilkan momen, padahal gaya yang sejajar lengan tidak menghasilkan momen terhadap titik acuan.",
      ]}
      tips={[
        "Pilih titik acuan di tempat yang menghilangkan momen gaya tak diketahui, misalnya di tumpuan.",
        "Momen maksimum terjadi saat gaya tegak lurus lengan, yaitu θ = 90°.",
        "Tulis arah putaran secara konsisten agar tanda positif dan negatif tidak tertukar saat menjumlahkan beberapa momen.",
      ]}
    />
  );
}
