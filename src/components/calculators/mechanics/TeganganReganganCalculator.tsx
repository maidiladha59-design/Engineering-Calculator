"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber, formatStress } from "@/lib/format";
import { normalStrain, normalStress } from "@/lib/math/mechanics";
import { AREA_UNITS, FORCE_UNITS, LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_STRESS_A = normalStress(10000, 200e-6);
const EXAMPLE_STRAIN_A = normalStrain(0.0005, 2);
const EXAMPLE_STRESS_B = normalStress(12000, 300e-6);
const EXAMPLE_STRAIN_B = normalStrain(0.00072, 3);

export default function TeganganReganganCalculator(props: {
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
          label: "Gaya aksial (F)",
          units: FORCE_UNITS,
          defaultUnit: "N",
          rule: "any",
          hint: "Gaya tarik positif, gaya tekan negatif.",
        },
        {
          id: "area",
          label: "Luas penampang (A)",
          units: AREA_UNITS,
          defaultUnit: "mm2",
          rule: "positive",
          hint: "Contoh: 200 mm²",
        },
        {
          id: "length",
          label: "Panjang awal (L₀)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 2",
        },
        {
          id: "elongation",
          label: "Perubahan panjang (ΔL)",
          units: LENGTH_UNITS,
          defaultUnit: "mm",
          rule: "any",
          hint: "Bertambah panjang positif, memendek negatif.",
        },
      ]}
      formulaTex={String.raw`\sigma=\frac{F}{A}\qquad \varepsilon=\frac{\Delta L}{L_0}`}
      formulaDescription="Tegangan normal adalah gaya aksial per satuan luas penampang. Regangan aksial adalah perubahan panjang dibagi panjang awal. Keduanya saling berkaitan melalui modulus elastisitas bahan."
      variables={[
        { symbol: "σ", name: "Tegangan normal", unit: "Pa atau MPa", note: "Positif untuk tarik, negatif untuk tekan" },
        { symbol: "F", name: "Gaya aksial", unit: "N", note: "Gaya yang bekerja searah sumbu batang" },
        { symbol: "A", name: "Luas penampang", unit: "m²", note: "Luas bidang yang menahan gaya" },
        { symbol: "ε", name: "Regangan aksial", unit: "—", note: "Tanpa satuan karena panjang dibagi panjang" },
        { symbol: "ΔL", name: "Perubahan panjang", unit: "m", note: "Selisih panjang akhir dan panjang awal" },
        { symbol: "L₀", name: "Panjang awal", unit: "m", note: "Panjang batang sebelum dibebani" },
      ]}
      compute={({ values }) => {
        const stress = normalStress(values.force, values.area);
        const strain = normalStrain(values.elongation, values.length);

        return {
          label: "Tegangan normal (σ)",
          value: formatNumber(stress / 1e6),
          unit: "MPa",
          rows: [
            { label: "Tegangan dalam pascal", value: formatStress(stress) },
            { label: "Regangan aksial (ε)", value: formatNumber(strain) },
            {
              label: "Regangan dalam persen",
              value: `${formatNumber(strain * 100)}%`,
            },
            {
              label: "Jenis pembebanan",
              value:
                stress > 0 ? "Tarik" : stress < 0 ? "Tekan" : "Tanpa beban aksial",
            },
          ],
          footnote:
            "1 MPa = 10⁶ Pa = 1 N/mm². Tanda positif dan negatif mengikuti arah gaya serta perubahan panjang.",
          steps: [
            {
              title: "Samakan satuan",
              detail: `F = ${formatNumber(values.force)} N, A = ${formatNumber(values.area)} m² (${formatNumber(values.area * 1e6)} mm²), L₀ = ${formatNumber(values.length)} m, ΔL = ${formatNumber(values.elongation)} m.`,
            },
            {
              title: "Hitung tegangan normal",
              detail: `σ = F / A = ${formatNumber(values.force)} / ${formatNumber(values.area)} = ${formatStress(stress)}.`,
            },
            {
              title: "Hitung regangan aksial",
              detail: `ε = ΔL / L₀ = ${formatNumber(values.elongation)} / ${formatNumber(values.length)} = ${formatNumber(strain)}.`,
            },
            {
              title: "Periksa tanda hasil",
              detail:
                stress >= 0
                  ? "Tegangan positif berarti batang mengalami tarik."
                  : "Tegangan negatif berarti batang mengalami tekan.",
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Batang tarik menerima gaya 10 kN. Luas penampangnya 200 mm², panjang awal 2 m, dan bertambah panjang 0,5 mm. Hitung tegangan dan regangannya.",
          detail: `A = 200 mm² = 0,0002 m². σ = 10.000 / 0,0002 = ${formatStress(EXAMPLE_STRESS_A)}. ε = 0,0005 / 2 = ${formatNumber(EXAMPLE_STRAIN_A)}.`,
          answer: `σ = ${formatStress(EXAMPLE_STRESS_A)}, ε = ${formatNumber(EXAMPLE_STRAIN_A)}`,
          values: {
            force: "10000",
            forceUnit: "N",
            area: "200",
            areaUnit: "mm2",
            length: "2",
            lengthUnit: "m",
            elongation: "0.5",
            elongationUnit: "mm",
          },
        },
        {
          problem:
            "Kolom pendek menahan gaya tekan 12 kN dengan luas penampang 300 mm². Panjang 3 m memendek 0,72 mm. Hitung tegangan dan regangannya.",
          detail: `σ = −12.000 / 0,0003 = ${formatStress(-EXAMPLE_STRESS_B)} (tekan). ε = −0,00072 / 3 = ${formatNumber(-EXAMPLE_STRAIN_B)}.`,
          answer: `σ = −${formatStress(EXAMPLE_STRESS_B)}, ε = ${formatNumber(-EXAMPLE_STRAIN_B)}`,
          values: {
            force: "-12000",
            forceUnit: "N",
            area: "300",
            areaUnit: "mm2",
            length: "3",
            lengthUnit: "m",
            elongation: "-0.72",
            elongationUnit: "mm",
          },
        },
      ]}
      mistakes={[
        "Memakai diameter sebagai luas penampang, padahal luas lingkaran adalah πd²/4.",
        "Mencampur mm² dan m² tanpa konversi sehingga tegangan meleset satu juta kali.",
        "Menganggap regangan memiliki satuan milimeter, padahal regangan tidak bersatuan.",
      ]}
      tips={[
        "Ingat 1 MPa = 1 N/mm², sehingga gaya dalam newton dibagi luas dalam mm² langsung menghasilkan MPa.",
        "Untuk batang tarik, panjang bertambah dan regangan positif; untuk batang tekan, panjang memendek dan regangan negatif.",
        "Gunakan tegangan izin bahan untuk memeriksa apakah struktur masih aman.",
      ]}
    />
  );
}
