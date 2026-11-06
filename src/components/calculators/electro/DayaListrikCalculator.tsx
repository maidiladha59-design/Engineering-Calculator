"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { electricalPower, type PowerMethod } from "@/lib/math/electricity";
import { CURRENT_UNITS, RESISTANCE_UNITS, VOLTAGE_UNITS } from "@/lib/units";

const EXAMPLE_A = electricalPower("vi", 220, 0.5);
const EXAMPLE_B = electricalPower("i2r", 2, 10);
const EXAMPLE_C = electricalPower("v2r", 220, 44);

export default function DayaListrikCalculator(props: {
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
          id: "method",
          label: "Metode perhitungan",
          options: [
            { value: "vi", label: "P = V × I (tegangan dan arus)" },
            { value: "i2r", label: "P = I² × R (arus dan hambatan)" },
            { value: "v2r", label: "P = V² / R (tegangan dan hambatan)" },
          ],
          hint: "Pilih pasangan data yang Anda miliki.",
        },
        {
          id: "voltage",
          label: "Tegangan (V)",
          units: VOLTAGE_UNITS,
          defaultUnit: "V",
          rule: "non-negative",
          showWhen: (form) => form.method === "vi" || form.method === "v2r",
          hint: "Contoh: 220",
        },
        {
          id: "current",
          label: "Arus (I)",
          units: CURRENT_UNITS,
          defaultUnit: "A",
          rule: "non-negative",
          showWhen: (form) => form.method === "vi" || form.method === "i2r",
          hint: "Contoh: 0,5",
        },
        {
          id: "resistance",
          label: "Hambatan (R)",
          units: RESISTANCE_UNITS,
          defaultUnit: "ohm",
          rule: "positive",
          showWhen: (form) => form.method === "i2r" || form.method === "v2r",
          hint: "Contoh: 10",
        },
      ]}
      formulaTex={String.raw`P=V\,I\qquad P=I^{2}R\qquad P=\frac{V^{2}}{R}`}
      formulaDescription="Ketiga rumus daya listrik saling setara melalui hukum Ohm. Gunakan pasangan data yang tersedia agar tidak perlu menghitung besaran perantara."
      variables={[
        { symbol: "P", name: "Daya listrik", unit: "W", note: "Energi listrik per detik" },
        { symbol: "V", name: "Tegangan", unit: "V", note: "Beda potensial pada komponen" },
        { symbol: "I", name: "Arus", unit: "A", note: "Arus yang mengalir melalui komponen" },
        { symbol: "R", name: "Hambatan", unit: "Ω", note: "Hambatan komponen" },
      ]}
      compute={({ form, values }) => {
        const method = form.method as PowerMethod;
        const voltage = values.voltage ?? 0;
        const current = values.current ?? 0;
        const resistance = values.resistance ?? 0;

        let power: number;
        let formula: string;
        let substitution: string;

        if (method === "i2r") {
          power = electricalPower("i2r", current, resistance);
          formula = "P = I² × R";
          substitution = `P = (${formatNumber(current)})² × ${formatNumber(resistance)}`;
        } else if (method === "v2r") {
          power = electricalPower("v2r", voltage, resistance);
          formula = "P = V² / R";
          substitution = `P = (${formatNumber(voltage)})² / ${formatNumber(resistance)}`;
        } else {
          power = electricalPower("vi", voltage, current);
          formula = "P = V × I";
          substitution = `P = ${formatNumber(voltage)} × ${formatNumber(current)}`;
        }

        return {
          label: "Daya listrik (P)",
          value: formatNumber(power),
          unit: "W",
          rows: [
            { label: "Daya dalam kilowatt", value: `${formatNumber(power / 1000)} kW` },
            { label: "Rumus yang dipakai", value: formula },
            {
              label: "Energi per jam",
              value: `${formatNumber(power / 1000)} kWh`,
            },
          ],
          steps: [
            {
              title: "Pilih rumus sesuai data",
              detail: `${formula}.`,
            },
            {
              title: "Masukkan nilai dalam satuan SI",
              detail: `${substitution}.`,
            },
            {
              title: "Hitung daya",
              detail: `P = ${formatNumber(power)} W = ${formatNumber(power / 1000)} kW.`,
            },
            {
              title: "Periksa kewajaran hasil",
              detail:
                power > 0
                  ? "Daya positif berarti komponen menyerap energi listrik."
                  : "Daya nol berarti tidak ada beda potensial atau arus yang mengalir.",
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Lampu dihubungkan ke tegangan 220 V dan menarik arus 0,5 A. Berapa daya listriknya?",
          detail: `P = 220 × 0,5 = ${formatNumber(EXAMPLE_A)} W.`,
          answer: `${formatNumber(EXAMPLE_A)} W`,
          values: {
            method: "vi",
            voltage: "220",
            voltageUnit: "V",
            current: "0.5",
            currentUnit: "A",
          },
        },
        {
          problem:
            "Arus 2 A mengalir melalui resistor 10 Ω. Hitung daya yang diserap resistor.",
          detail: `P = 2² × 10 = ${formatNumber(EXAMPLE_B)} W.`,
          answer: `${formatNumber(EXAMPLE_B)} W`,
          values: {
            method: "i2r",
            current: "2",
            currentUnit: "A",
            resistance: "10",
            resistanceUnit: "ohm",
          },
        },
        {
          problem:
            "Tegangan 220 V diterapkan pada hambatan 44 Ω. Berapa daya yang terpakai?",
          detail: `P = 220² / 44 = ${formatNumber(EXAMPLE_C)} W.`,
          answer: `${formatNumber(EXAMPLE_C)} W`,
          values: {
            method: "v2r",
            voltage: "220",
            voltageUnit: "V",
            resistance: "44",
            resistanceUnit: "ohm",
          },
        },
      ]}
      mistakes={[
        "Memakai rumus P = V² / R dengan arus sebagai pengganti tegangan.",
        "Lupa mengkuadratkan arus atau tegangan pada rumus P = I²R dan P = V²/R.",
        "Mencampur watt dan kilowatt saat menghitung energi atau biaya listrik.",
      ]}
      tips={[
        "Untuk peralatan rumah, daya biasanya tertulis dalam watt atau VA; keduanya berbeda jika ada faktor daya.",
        "Energi listrik dalam kWh sama dengan daya dalam kW dikali waktu dalam jam.",
        "Resistor dengan daya lebih kecil dari hasil perhitungan berisiko panas berlebih.",
      ]}
    />
  );
}
