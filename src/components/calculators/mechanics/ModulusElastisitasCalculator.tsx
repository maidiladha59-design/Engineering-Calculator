"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber, formatStress } from "@/lib/format";
import {
  strainFromModulus,
  stressFromModulus,
  youngsModulus,
} from "@/lib/math/mechanics";
import { STRESS_UNITS } from "@/lib/units";

const EXAMPLE_A = youngsModulus(200e6, 0.001);
const EXAMPLE_B = stressFromModulus(70e9, 0.002);
const EXAMPLE_C = strainFromModulus(140e6, 70e9);

export default function ModulusElastisitasCalculator(props: {
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
          id: "mode",
          label: "Yang ingin dihitung",
          options: [
            { value: "modulus", label: "Modulus elastisitas E" },
            { value: "stress", label: "Tegangan σ" },
            { value: "strain", label: "Regangan ε" },
          ],
          hint: "Pilih salah satu; kolom input menyesuaikan otomatis.",
        },
        {
          id: "modulus",
          label: "Modulus elastisitas (E)",
          units: STRESS_UNITS,
          defaultUnit: "GPa",
          rule: "positive",
          showWhen: (form) => form.mode === "stress" || form.mode === "strain",
          hint: "Baja sekitar 200 GPa, aluminium sekitar 70 GPa.",
        },
        {
          id: "stress",
          label: "Tegangan (σ)",
          units: STRESS_UNITS,
          defaultUnit: "MPa",
          rule: "any",
          showWhen: (form) => form.mode === "modulus" || form.mode === "strain",
          hint: "Gunakan tanda negatif untuk tegangan tekan.",
        },
        {
          id: "strain",
          label: "Regangan (ε)",
          rule: "any",
          showWhen: (form) => form.mode === "modulus" || form.mode === "stress",
          hint: "Tanpa satuan, contoh 0,001.",
        },
      ]}
      formulaTex={String.raw`E=\frac{\sigma}{\varepsilon}\qquad \sigma=E\,\varepsilon\qquad \varepsilon=\frac{\sigma}{E}`}
      formulaDescription="Modulus elastisitas adalah kemiringan kurva tegangan–regangan pada daerah elastis. Ketiga bentuk rumus di atas setara, jadi kalkulator memakai hubungan E = σ / ε untuk mencari besaran yang belum diketahui."
      variables={[
        { symbol: "E", name: "Modulus elastisitas", unit: "Pa atau GPa", note: "Kekakuan bahan pada daerah elastis" },
        { symbol: "σ", name: "Tegangan", unit: "Pa atau MPa", note: "Gaya per satuan luas penampang" },
        { symbol: "ε", name: "Regangan", unit: "—", note: "Perubahan panjang relatif, tanpa satuan" },
      ]}
      compute={({ form, values }) => {
        if (form.mode === "stress") {
          const stress = stressFromModulus(values.modulus, values.strain);

          return {
            label: "Tegangan (σ)",
            value: formatNumber(stress / 1e6),
            unit: "MPa",
            rows: [
              { label: "Tegangan dalam pascal", value: formatStress(stress) },
              { label: "Modulus elastisitas", value: formatStress(values.modulus) },
              { label: "Regangan", value: formatNumber(values.strain) },
            ],
            steps: [
              {
                title: "Tentukan besaran yang dicari",
                detail: "Mode tegangan memakai rumus σ = E × ε.",
              },
              {
                title: "Masukkan nilai",
                detail: `E = ${formatStress(values.modulus)}, ε = ${formatNumber(values.strain)}.`,
              },
              {
                title: "Hitung tegangan",
                detail: `σ = ${formatStress(values.modulus)} × ${formatNumber(values.strain)} = ${formatStress(stress)}.`,
              },
            ],
          };
        }

        if (form.mode === "strain") {
          const strain = strainFromModulus(values.stress, values.modulus);

          return {
            label: "Regangan (ε)",
            value: formatNumber(strain),
            unit: "",
            rows: [
              { label: "Regangan dalam persen", value: `${formatNumber(strain * 100)}%` },
              { label: "Tegangan", value: formatStress(values.stress) },
              { label: "Modulus elastisitas", value: formatStress(values.modulus) },
            ],
            steps: [
              {
                title: "Tentukan besaran yang dicari",
                detail: "Mode regangan memakai rumus ε = σ / E.",
              },
              {
                title: "Masukkan nilai",
                detail: `σ = ${formatStress(values.stress)}, E = ${formatStress(values.modulus)}.`,
              },
              {
                title: "Hitung regangan",
                detail: `ε = ${formatStress(values.stress)} / ${formatStress(values.modulus)} = ${formatNumber(strain)}.`,
              },
            ],
          };
        }

        const modulus = youngsModulus(values.stress, values.strain);

        return {
          label: "Modulus elastisitas (E)",
          value: formatNumber(modulus / 1e9),
          unit: "GPa",
          rows: [
            { label: "Modulus dalam pascal", value: formatStress(modulus) },
            { label: "Tegangan", value: formatStress(values.stress) },
            { label: "Regangan", value: formatNumber(values.strain) },
          ],
          steps: [
            {
              title: "Tentukan besaran yang dicari",
              detail: "Mode modulus memakai rumus E = σ / ε.",
            },
            {
              title: "Masukkan nilai",
              detail: `σ = ${formatStress(values.stress)}, ε = ${formatNumber(values.strain)}.`,
            },
            {
              title: "Hitung modulus elastisitas",
              detail: `E = ${formatStress(values.stress)} / ${formatNumber(values.strain)} = ${formatStress(modulus)}.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Sebuah bahan mengalami tegangan 200 MPa dan regangan 0,001 pada daerah elastis. Berapa modulus elastisitasnya?",
          detail: `E = 200 MPa / 0,001 = 200.000 MPa = ${formatNumber(EXAMPLE_A / 1e9)} GPa.`,
          answer: `${formatNumber(EXAMPLE_A / 1e9)} GPa`,
          values: {
            mode: "modulus",
            stress: "200",
            stressUnit: "MPa",
            strain: "0.001",
          },
        },
        {
          problem:
            "Aluminium dengan modulus elastisitas 70 GPa diberi regangan 0,002. Hitung tegangan yang timbul.",
          detail: `σ = 70 GPa × 0,002 = ${formatNumber(EXAMPLE_B / 1e6)} MPa.`,
          answer: `${formatNumber(EXAMPLE_B / 1e6)} MPa`,
          values: {
            mode: "stress",
            modulus: "70",
            modulusUnit: "GPa",
            strain: "0.002",
          },
        },
        {
          problem:
            "Tegangan 140 MPa bekerja pada baja dengan modulus elastisitas 70 GPa. Berapa regangannya?",
          detail: `ε = 140 MPa / 70 GPa = ${formatNumber(EXAMPLE_C)}.`,
          answer: formatNumber(EXAMPLE_C),
          values: {
            mode: "strain",
            stress: "140",
            stressUnit: "MPa",
            modulus: "70",
            modulusUnit: "GPa",
          },
        },
      ]}
      mistakes={[
        "Membagi regangan dengan tegangan, padahal modulus elastisitas adalah tegangan dibagi regangan.",
        "Mencampur MPa dan GPa tanpa konversi, misalnya 200 MPa dibagi 200 GPa.",
        "Memakai data di luar daerah elastis sehingga hubungan linear E = σ/ε tidak lagi berlaku.",
      ]}
      tips={[
        "Dalam satuan SI, 1 GPa = 1.000 MPa = 10⁹ Pa.",
        "Modulus elastisitas adalah sifat bahan, bukan sifat benda, sehingga tidak berubah ketika ukuran benda berubah.",
        "Nilai E yang lebih besar berarti bahan lebih kaku dan mengalami regangan lebih kecil pada tegangan yang sama.",
      ]}
    />
  );
}
