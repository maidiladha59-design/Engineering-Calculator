"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import {
  massMomentOfInertia,
  type InertiaShape,
} from "@/lib/math/mechanics";
import { LENGTH_UNITS, MASS_UNITS } from "@/lib/units";

const SHAPE_LABELS: Record<InertiaShape, string> = {
  "silinder-pejal": "Silinder pejal dengan poros di sumbu",
  "bola-pejal": "Bola pejal dengan poros melalui pusat",
  "batang-tengah": "Batang dengan poros di tengah",
  "batang-ujung": "Batang dengan poros di salah satu ujung",
};

const EXAMPLE_A = massMomentOfInertia("silinder-pejal", 2, 0.5);
const EXAMPLE_B = massMomentOfInertia("batang-tengah", 3, 2);
const EXAMPLE_C = massMomentOfInertia("bola-pejal", 1.5, 0.2);

export default function MomenInersiaCalculator(props: {
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
          label: "Bentuk benda dan letak poros",
          options: [
            { value: "silinder-pejal", label: "Silinder pejal — poros sumbu" },
            { value: "bola-pejal", label: "Bola pejal — poros pusat" },
            { value: "batang-tengah", label: "Batang — poros di tengah" },
            { value: "batang-ujung", label: "Batang — poros di ujung" },
          ],
          hint: "Rumus momen inersia bergantung pada distribusi massa terhadap poros.",
        },
        {
          id: "mass",
          label: "Massa benda (m)",
          units: MASS_UNITS,
          defaultUnit: "kg",
          rule: "positive",
          hint: "Contoh: 2",
        },
        {
          id: "dimension",
          label: "Jari-jari (r) atau panjang batang (L)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Untuk silinder dan bola isi jari-jari; untuk batang isi panjangnya.",
        },
      ]}
      formulaTex={String.raw`I=k\,m\,r^{2}`}
      formulaDescription={
        <>
          Momen inersia mengukur kelembaman benda terhadap rotasi. Nilai k
          bergantung pada bentuk benda: silinder pejal k = 1/2, bola pejal k =
          2/5, batang dengan poros di tengah k = 1/12, dan batang dengan poros
          di ujung k = 1/3. Untuk batang, r pada rumus diganti panjang L.
        </>
      }
      variables={[
        { symbol: "I", name: "Momen inersia", unit: "kg·m²", note: "Kelembaman terhadap rotasi" },
        { symbol: "k", name: "Faktor bentuk", unit: "—", note: "Bergantung pada bentuk dan letak poros" },
        { symbol: "m", name: "Massa benda", unit: "kg", note: "Massa total benda" },
        { symbol: "r / L", name: "Jari-jari atau panjang", unit: "m", note: "Jarak ukuran yang menjadi acuan rumus" },
      ]}
      compute={({ form, values }) => {
        const shape = form.shape as InertiaShape;
        const result = massMomentOfInertia(
          shape,
          values.mass,
          values.dimension,
        );

        return {
          label: "Momen inersia (I)",
          value: formatNumber(result.inertia),
          unit: "kg·m²",
          rows: [
            { label: "Bentuk benda", value: SHAPE_LABELS[shape] },
            { label: "Rumus yang dipakai", value: result.formula },
            { label: "Massa", value: `${formatNumber(values.mass)} kg` },
            {
              label: result.dimensionLabel,
              value: `${formatNumber(values.dimension)} m`,
            },
          ],
          steps: [
            {
              title: "Tentukan rumus sesuai bentuk dan poros",
              detail: `${SHAPE_LABELS[shape]} memakai ${result.formula}.`,
            },
            {
              title: "Masukkan massa dan dimensi",
              detail: `m = ${formatNumber(values.mass)} kg, ${result.dimensionLabel.toLowerCase()} = ${formatNumber(values.dimension)} m.`,
            },
            {
              title: "Hitung momen inersia",
              detail: `I = ${formatNumber(result.inertia)} kg·m².`,
            },
            {
              title: "Periksa satuan",
              detail:
                "kg × m² menghasilkan kg·m². Jika dimensi diubah ke cm, nilai harus dikonversi ke meter sebelum dikuadratkan.",
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Silinder pejal bermassa 2 kg memiliki jari-jari 0,5 m. Hitung momen inersia terhadap poros sumbunya.",
          detail: `I = ½ × 2 × 0,5² = ${formatNumber(EXAMPLE_A.inertia)} kg·m².`,
          answer: `${formatNumber(EXAMPLE_A.inertia)} kg·m²`,
          values: { shape: "silinder-pejal", mass: "2", dimension: "0.5" },
        },
        {
          problem:
            "Batang homogen bermassa 3 kg dan panjang 2 m diputar terhadap poros di tengahnya. Berapa momen inersianya?",
          detail: `I = (1/12) × 3 × 2² = ${formatNumber(EXAMPLE_B.inertia)} kg·m².`,
          answer: `${formatNumber(EXAMPLE_B.inertia)} kg·m²`,
          values: { shape: "batang-tengah", mass: "3", dimension: "2" },
        },
        {
          problem:
            "Bola pejal 1,5 kg dengan jari-jari 20 cm diputar melalui pusatnya. Hitung momen inersia bola.",
          detail: `Ubah r = 20 cm = 0,2 m. I = (2/5) × 1,5 × 0,2² = ${formatNumber(EXAMPLE_C.inertia)} kg·m².`,
          answer: `${formatNumber(EXAMPLE_C.inertia)} kg·m²`,
          values: { shape: "bola-pejal", mass: "1.5", dimension: "0.2" },
        },
      ]}
      mistakes={[
        "Memakai rumus batang poros ujung untuk batang yang diputar di tengah, sehingga hasilnya empat kali terlalu besar.",
        "Lupa mengubah jari-jari dari sentimeter ke meter sebelum dikuadratkan.",
        "Menganggap momen inersia hanya bergantung pada massa, padahal letak poros juga menentukan nilai k.",
      ]}
      tips={[
        "Semakin jauh massa dari poros, semakin besar momen inersia, sehingga benda lebih sulit diputar.",
        "Untuk benda gabungan, jumlahkan momen inersia tiap bagian terhadap poros yang sama.",
        "Gunakan teorema sumbu paralel I = I_pusat + m d² jika poros digeser sejauh d dari pusat massa.",
      ]}
    />
  );
}
