"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { GuidanceBlock } from "@/components/calculator/GuidanceBlock";
import { MeasurementField } from "@/components/calculator/MeasurementField";
import { NumberField } from "@/components/calculator/NumberField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { formatNumber } from "@/lib/format";
import {
  parallelResistance,
  seriesResistance,
} from "@/lib/math/electricity";
import { VOLTAGE_UNITS } from "@/lib/units";
import { parseNumberInput } from "@/lib/validation";

type CircuitMode = "seri" | "paralel";

interface ResistorRow {
  id: string;
  resistance: string;
}

const EMPTY_FORM: Record<string, string> = {};
let resistorCounter = 0;

function createResistor(value?: number): ResistorRow {
  resistorCounter += 1;

  return {
    id: `resistor-${resistorCounter}`,
    resistance: value === undefined ? "" : String(value),
  };
}

const SERIES_EXAMPLE = seriesResistance([5, 10]);
const PARALLEL_EXAMPLE = parallelResistance([5, 20]);
const PARALLEL_EXAMPLE_TWO = parallelResistance([10, 10]);

const EXAMPLES: Array<{
  mode: CircuitMode;
  voltage: number;
  resistances: number[];
  problem: string;
  detail: string;
  answer: string;
}> = [
  {
    mode: "seri",
    voltage: 10,
    resistances: [5, 10],
    problem:
      "Dua resistor 5 Ω dan 10 Ω disusun seri lalu dihubungkan ke sumber 10 V. Hitung hambatan pengganti dan arus totalnya.",
    detail: `R_s = 5 + 10 = ${formatNumber(SERIES_EXAMPLE)} Ω. I = 10 / ${formatNumber(SERIES_EXAMPLE)} = ${formatNumber(10 / SERIES_EXAMPLE)} A.`,
    answer: `R_s = ${formatNumber(SERIES_EXAMPLE)} Ω, I = ${formatNumber(10 / SERIES_EXAMPLE)} A`,
  },
  {
    mode: "paralel",
    voltage: 10,
    resistances: [5, 20],
    problem:
      "Resistor 5 Ω dan 20 Ω dipasang paralel pada sumber 10 V. Berapa hambatan pengganti dan arus totalnya?",
    detail: `1/R_p = 1/5 + 1/20 = 0,25 S sehingga R_p = ${formatNumber(PARALLEL_EXAMPLE)} Ω. I = 10 / ${formatNumber(PARALLEL_EXAMPLE)} = ${formatNumber(10 / PARALLEL_EXAMPLE)} A.`,
    answer: `R_p = ${formatNumber(PARALLEL_EXAMPLE)} Ω, I = ${formatNumber(10 / PARALLEL_EXAMPLE)} A`,
  },
  {
    mode: "paralel",
    voltage: 12,
    resistances: [10, 10],
    problem:
      "Dua resistor 10 Ω identik dipasang paralel pada sumber 12 V. Hitung hambatan pengganti dan arus tiap cabang.",
    detail: `R_p = ${formatNumber(PARALLEL_EXAMPLE_TWO)} Ω. Arus total 12 / ${formatNumber(PARALLEL_EXAMPLE_TWO)} = ${formatNumber(12 / PARALLEL_EXAMPLE_TWO)} A, terbagi rata ${formatNumber(12 / PARALLEL_EXAMPLE_TWO / 2)} A per cabang.`,
    answer: `R_p = ${formatNumber(PARALLEL_EXAMPLE_TWO)} Ω, I tiap cabang = ${formatNumber(12 / PARALLEL_EXAMPLE_TWO / 2)} A`,
  },
];

export default function RangkaianSeriParalelCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const [mode, setMode] = useState<CircuitMode>("seri");
  const [voltage, setVoltage] = useState("");
  const [voltageUnit, setVoltageUnit] = useState("V");
  const [rows, setRows] = useState<ResistorRow[]>(() => [
    createResistor(),
    createResistor(),
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const calculator = useCalculatorState(EMPTY_FORM);

  function updateResistance(id: string, value: string) {
    setRows((previous) =>
      previous.map((row) =>
        row.id === id ? { ...row, resistance: value } : row,
      ),
    );
    setErrors((previous) => {
      const key = `r-${id}`;
      if (!(key in previous)) {
        return previous;
      }
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function addResistor() {
    if (rows.length >= 8) {
      return;
    }
    setRows((previous) => [...previous, createResistor()]);
  }

  function removeResistor(id: string) {
    setRows((previous) =>
      previous.length > 1
        ? previous.filter((row) => row.id !== id)
        : previous,
    );
  }

  function resetAll() {
    setMode("seri");
    setVoltage("");
    setVoltageUnit("V");
    setRows([createResistor(), createResistor()]);
    setErrors({});
    calculator.reset();
  }

  function handleCalculate() {
    const nextErrors: Record<string, string> = {};
    const resistances: number[] = [];
    const parsedVoltage = parseNumberInput(voltage, "Tegangan sumber");
    const voltageFactor = voltageUnit === "mV" ? 0.001 : voltageUnit === "kV" ? 1000 : 1;

    if (!parsedVoltage.ok) {
      nextErrors.voltage = parsedVoltage.error;
    } else if (parsedVoltage.value < 0) {
      nextErrors.voltage = "Tegangan sumber tidak boleh negatif.";
    }

    rows.forEach((row, index) => {
      const parsed = parseNumberInput(
        row.resistance,
        `Hambatan resistor ${index + 1}`,
      );

      if (!parsed.ok) {
        nextErrors[`r-${row.id}`] = parsed.error;
      } else if (parsed.value <= 0) {
        nextErrors[`r-${row.id}`] =
          `Hambatan resistor ${index + 1} harus lebih dari 0.`;
      } else {
        resistances.push(parsed.value);
      }
    });

    if (Object.keys(nextErrors).length > 0 || !parsedVoltage.ok) {
      setErrors(nextErrors);
      calculator.showError(
        "Lengkapi tegangan sumber dan hambatan setiap resistor. Nilai hambatan harus lebih dari nol.",
      );
      return;
    }

    setErrors({});

    calculator.run(() => {
      const sourceVoltage = parsedVoltage.value * voltageFactor;
      const equivalent =
        mode === "seri"
          ? seriesResistance(resistances)
          : parallelResistance(resistances);
      const totalCurrent = sourceVoltage / equivalent;
      const branchRows = resistances.map((resistance, index) => {
        const branchCurrent =
          mode === "seri" ? totalCurrent : sourceVoltage / resistance;
        const branchVoltage =
          mode === "seri" ? totalCurrent * resistance : sourceVoltage;

        return {
          label: `R${index + 1} (${formatNumber(resistance)} Ω)`,
          value: `${formatNumber(branchVoltage)} V, ${formatNumber(branchCurrent)} A`,
        };
      });

      return (
        <div className="space-y-5">
          <ResultCard
            label={`Hambatan pengganti (${mode === "seri" ? "seri" : "paralel"})`}
            value={formatNumber(equivalent)}
            unit="Ω"
            rows={[
              { label: "Tegangan sumber", value: `${formatNumber(sourceVoltage)} V` },
              { label: "Arus total", value: `${formatNumber(totalCurrent)} A` },
              ...branchRows,
            ]}
            footnote={
              mode === "seri"
                ? "Pada rangkaian seri, arus sama di setiap resistor dan tegangan terbagi sesuai hambatan."
                : "Pada rangkaian paralel, tegangan sama di setiap cabang dan arus terbagi sesuai hambatan."
            }
          />
          <StepsList
            steps={
              mode === "seri"
                ? [
                    {
                      title: "Jumlahkan hambatan seri",
                      detail: `R_s = ${resistances.map((value) => formatNumber(value)).join(" + ")} = ${formatNumber(equivalent)} Ω.`,
                    },
                    {
                      title: "Hitung arus total dengan hukum Ohm",
                      detail: `I = V / R_s = ${formatNumber(sourceVoltage)} / ${formatNumber(equivalent)} = ${formatNumber(totalCurrent)} A.`,
                    },
                    {
                      title: "Hitung tegangan tiap resistor",
                      detail: resistances
                        .map(
                          (value, index) =>
                            `V${index + 1} = ${formatNumber(totalCurrent)} × ${formatNumber(value)} = ${formatNumber(totalCurrent * value)} V`,
                        )
                        .join("; ") + ".",
                    },
                    {
                      title: "Periksa jumlah tegangan",
                      detail: `Jumlah tegangan cabang = ${formatNumber(resistances.reduce((total, value) => total + totalCurrent * value, 0))} V, sama dengan tegangan sumber ${formatNumber(sourceVoltage)} V.`,
                    },
                  ]
                : [
                    {
                      title: "Jumlahkan kebalikan hambatan",
                      detail: `1/R_p = ${resistances.map((value) => `1/${formatNumber(value)}`).join(" + ")} = ${formatNumber(resistances.reduce((total, value) => total + 1 / value, 0))} S.`,
                    },
                    {
                      title: "Balikkan hasilnya",
                      detail: `R_p = 1 / ${formatNumber(resistances.reduce((total, value) => total + 1 / value, 0))} = ${formatNumber(equivalent)} Ω.`,
                    },
                    {
                      title: "Hitung arus total",
                      detail: `I = V / R_p = ${formatNumber(sourceVoltage)} / ${formatNumber(equivalent)} = ${formatNumber(totalCurrent)} A.`,
                    },
                    {
                      title: "Hitung arus tiap cabang",
                      detail: resistances
                        .map(
                          (value, index) =>
                            `I${index + 1} = ${formatNumber(sourceVoltage)} / ${formatNumber(value)} = ${formatNumber(sourceVoltage / value)} A`,
                        )
                        .join("; ") + ".",
                    },
                  ]
            }
          />
        </div>
      );
    });
  }

  function applyExample(example: (typeof EXAMPLES)[number]) {
    setMode(example.mode);
    setVoltage(String(example.voltage));
    setVoltageUnit("V");
    setRows(example.resistances.map((value) => createResistor(value)));
    setErrors({});
    calculator.setMany({});
  }

  return (
    <CalculatorLayout
      {...props}
      onCalculate={handleCalculate}
      onReset={resetAll}
      isCalculating={calculator.isCalculating}
      error={calculator.error}
      result={calculator.result}
      formula={
        <FormulaBlock
          tex={String.raw`R_s=R_1+R_2+\cdots\qquad \frac{1}{R_p}=\frac{1}{R_1}+\frac{1}{R_2}+\cdots`}
          description="Pada rangkaian seri, hambatan dijumlahkan langsung. Pada rangkaian paralel, kebalikan hambatan pengganti sama dengan jumlah kebalikan setiap hambatan."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "R_s", name: "Hambatan pengganti seri", unit: "Ω", note: "Selalu lebih besar dari hambatan terbesar" },
            { symbol: "R_p", name: "Hambatan pengganti paralel", unit: "Ω", note: "Selalu lebih kecil dari hambatan terkecil" },
            { symbol: "V", name: "Tegangan sumber", unit: "V", note: "Sama di setiap cabang paralel" },
            { symbol: "I", name: "Arus total", unit: "A", note: "Sama di setiap resistor seri" },
            { symbol: "R_i", name: "Hambatan resistor ke-i", unit: "Ω", note: "Harus lebih besar dari nol" },
          ]}
        />
      }
      example={
        <div className="grid gap-5 lg:grid-cols-2">
          {EXAMPLES.map((example, index) => (
            <ExampleBlock
              key={`contoh-rangkaian-${index + 1}`}
              problem={example.problem}
              detail={example.detail}
              answer={example.answer}
              onUse={() => applyExample(example)}
            />
          ))}
        </div>
      }
      notes={
        <GuidanceBlock
          mistakes={[
            "Menjumlahkan hambatan paralel secara langsung, padahal yang dijumlahkan adalah kebalikan hambatan.",
            "Menganggap arus total sama dengan arus satu cabang pada rangkaian paralel.",
            "Mengabaikan satuan kΩ atau mA sehingga hasil berbeda seribu kali.",
          ]}
          tips={[
            "Hambatan pengganti paralel selalu lebih kecil daripada hambatan terkecil di rangkaian.",
            "Untuk dua resistor paralel, gunakan rumus cepat R_p = (R₁ × R₂) / (R₁ + R₂).",
            "Periksa hasil dengan menghitung daya total dan memastikan jumlah daya cabang sama.",
          ]}
        />
      }
    >
      <div className="space-y-4">
        <SelectField
          id="mode"
          label="Jenis rangkaian"
          value={mode}
          onChange={(value) => {
            setMode(value as CircuitMode);
            calculator.setMany({});
          }}
          options={[
            { value: "seri", label: "Seri" },
            { value: "paralel", label: "Paralel" },
          ]}
          hint="Seri: arus sama. Paralel: tegangan sama."
        />
        <MeasurementField
          id="voltage"
          label="Tegangan sumber (V)"
          value={voltage}
          onChange={(value) => {
            setVoltage(value);
            setErrors((previous) => {
              if (!("voltage" in previous)) {
                return previous;
              }
              const next = { ...previous };
              delete next.voltage;
              return next;
            });
          }}
          unitValue={voltageUnit}
          onUnitChange={setVoltageUnit}
          units={VOLTAGE_UNITS}
          error={errors.voltage}
          hint="Contoh: 10"
        />

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-slate-600">Daftar resistor</p>
          <span className="text-xs text-slate-400">{rows.length}/8 resistor</span>
        </div>

        {rows.map((row, index) => (
          <div key={row.id} className="flex items-end gap-2">
            <div className="min-w-0 flex-1">
              <NumberField
                id={`r-${row.id}`}
                label={`Hambatan R${index + 1} (Ω)`}
                value={row.resistance}
                onChange={(value) => updateResistance(row.id, value)}
                error={errors[`r-${row.id}`]}
                placeholder="Contoh: 5"
              />
            </div>
            <button
              type="button"
              onClick={() => removeResistor(row.id)}
              disabled={rows.length === 1}
              aria-label={`Hapus resistor ${index + 1}`}
              className="mb-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addResistor}
          disabled={rows.length >= 8}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/60 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Tambah resistor
        </button>
      </div>
    </CalculatorLayout>
  );
}
