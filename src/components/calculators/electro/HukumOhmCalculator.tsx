"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { ohmsLaw, type OhmTarget } from "@/lib/math/electricity";
import { CURRENT_UNITS, RESISTANCE_UNITS, VOLTAGE_UNITS } from "@/lib/units";

const EXAMPLE_A = ohmsLaw("current", 12, 0, 6);
const EXAMPLE_B = ohmsLaw("resistance", 9, 0.5, 0);
const EXAMPLE_C = ohmsLaw("voltage", 0, 2, 5);

export default function HukumOhmCalculator(props: {
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
          id: "target",
          label: "Yang ingin dihitung",
          options: [
            { value: "voltage", label: "Tegangan (V)" },
            { value: "current", label: "Arus (I)" },
            { value: "resistance", label: "Hambatan (R)" },
          ],
          hint: "Pilih besaran yang belum diketahui; kolom lain menyesuaikan.",
        },
        {
          id: "voltage",
          label: "Tegangan (V)",
          units: VOLTAGE_UNITS,
          defaultUnit: "V",
          rule: "non-negative",
          showWhen: (form) =>
            form.target === "current" || form.target === "resistance",
          hint: "Contoh: 12",
        },
        {
          id: "current",
          label: "Arus (I)",
          units: CURRENT_UNITS,
          defaultUnit: "A",
          rule: "non-negative",
          showWhen: (form) =>
            form.target === "voltage" || form.target === "resistance",
          hint: "Contoh: 0,5",
        },
        {
          id: "resistance",
          label: "Hambatan (R)",
          units: RESISTANCE_UNITS,
          defaultUnit: "ohm",
          rule: "positive",
          showWhen: (form) =>
            form.target === "voltage" || form.target === "current",
          hint: "Contoh: 6",
        },
      ]}
      formulaTex={String.raw`V=I\,R\qquad I=\frac{V}{R}\qquad R=\frac{V}{I}`}
      formulaDescription="Hukum Ohm menyatakan bahwa tegangan sebanding dengan arus dan hambatan. Pilih besaran yang ingin dicari, lalu masukkan dua besaran lainnya."
      variables={[
        { symbol: "V", name: "Tegangan", unit: "V", note: "Beda potensial antara dua titik" },
        { symbol: "I", name: "Arus listrik", unit: "A", note: "Muatan yang mengalir per detik" },
        { symbol: "R", name: "Hambatan", unit: "Ω", note: "Perlawanan terhadap aliran arus" },
      ]}
      compute={({ form, values }) => {
        const target = form.target as OhmTarget;
        const voltage = values.voltage ?? 0;
        const current = values.current ?? 0;
        const resistance = values.resistance ?? 0;
        const result = ohmsLaw(target, voltage, current, resistance);

        if (target === "current") {
          return {
            label: "Arus listrik (I)",
            value: formatNumber(result),
            unit: "A",
            rows: [
              { label: "Tegangan", value: `${formatNumber(voltage)} V` },
              { label: "Hambatan", value: `${formatNumber(resistance)} Ω` },
              { label: "Daya", value: `${formatNumber(voltage * result)} W` },
            ],
            steps: [
              {
                title: "Gunakan bentuk hukum Ohm untuk arus",
                detail: "I = V / R.",
              },
              {
                title: "Masukkan nilai",
                detail: `I = ${formatNumber(voltage)} V / ${formatNumber(resistance)} Ω.`,
              },
              {
                title: "Hitung hasil",
                detail: `I = ${formatNumber(result)} A.`,
              },
            ],
          };
        }

        if (target === "resistance") {
          return {
            label: "Hambatan (R)",
            value: formatNumber(result),
            unit: "Ω",
            rows: [
              { label: "Tegangan", value: `${formatNumber(voltage)} V` },
              { label: "Arus", value: `${formatNumber(current)} A` },
              { label: "Daya", value: `${formatNumber(voltage * current)} W` },
            ],
            steps: [
              {
                title: "Gunakan bentuk hukum Ohm untuk hambatan",
                detail: "R = V / I.",
              },
              {
                title: "Masukkan nilai",
                detail: `R = ${formatNumber(voltage)} V / ${formatNumber(current)} A.`,
              },
              {
                title: "Hitung hasil",
                detail: `R = ${formatNumber(result)} Ω.`,
              },
            ],
          };
        }

        return {
          label: "Tegangan (V)",
          value: formatNumber(result),
          unit: "V",
          rows: [
            { label: "Arus", value: `${formatNumber(current)} A` },
            { label: "Hambatan", value: `${formatNumber(resistance)} Ω` },
            { label: "Daya", value: `${formatNumber(result * current)} W` },
          ],
          steps: [
            {
              title: "Gunakan bentuk hukum Ohm untuk tegangan",
              detail: "V = I × R.",
            },
            {
              title: "Masukkan nilai",
              detail: `V = ${formatNumber(current)} A × ${formatNumber(resistance)} Ω.`,
            },
            {
              title: "Hitung hasil",
              detail: `V = ${formatNumber(result)} V.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Sebuah resistor 6 Ω dihubungkan ke sumber tegangan 12 V. Berapa arus yang mengalir?",
          detail: `I = 12 / 6 = ${formatNumber(EXAMPLE_A)} A.`,
          answer: `${formatNumber(EXAMPLE_A)} A`,
          values: {
            target: "current",
            voltage: "12",
            voltageUnit: "V",
            resistance: "6",
            resistanceUnit: "ohm",
          },
        },
        {
          problem:
            "Arus 0,5 A mengalir melalui komponen saat tegangannya 9 V. Berapa hambatan komponen tersebut?",
          detail: `R = 9 / 0,5 = ${formatNumber(EXAMPLE_B)} Ω.`,
          answer: `${formatNumber(EXAMPLE_B)} Ω`,
          values: {
            target: "resistance",
            voltage: "9",
            voltageUnit: "V",
            current: "0.5",
            currentUnit: "A",
          },
        },
        {
          problem:
            "Arus 2 A mengalir melalui hambatan 5 Ω. Hitung tegangan pada hambatan tersebut.",
          detail: `V = 2 × 5 = ${formatNumber(EXAMPLE_C)} V.`,
          answer: `${formatNumber(EXAMPLE_C)} V`,
          values: {
            target: "voltage",
            current: "2",
            currentUnit: "A",
            resistance: "5",
            resistanceUnit: "ohm",
          },
        },
      ]}
      mistakes={[
        "Membagi arus dengan hambatan saat mencari tegangan, padahal tegangan adalah arus dikali hambatan.",
        "Memakai hambatan nol saat mencari arus, yang secara matematis menghasilkan pembagian dengan nol.",
        "Mencampur miliampere dan ampere sehingga hasil berbeda seribu kali.",
      ]}
      tips={[
        "Segitiga hukum Ohm membantu: tutup besaran yang dicari, lalu baca rumus dari posisi sisanya.",
        "Hambatan tetap mengikuti hukum Ohm pada resistor biasa; komponen non-ohmik seperti dioda tidak.",
        "Periksa hasil dengan menghitung daya P = V × I sebagai pemeriksaan silang.",
      ]}
    />
  );
}
