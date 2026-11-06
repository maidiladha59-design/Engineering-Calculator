"use client";

import { useState } from "react";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { GuidanceBlock } from "@/components/calculator/GuidanceBlock";
import { MeasurementField } from "@/components/calculator/MeasurementField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { formatNumber } from "@/lib/format";
import {
  CURRENT_UNITS,
  ELECTRICAL_ENERGY_UNITS,
  POWER_UNITS,
  RESISTANCE_UNITS,
  VOLTAGE_UNITS,
  convertFromBase,
  convertToBase,
  type UnitDefinition,
} from "@/lib/units";
import { parseNumberInput } from "@/lib/validation";

const GROUPS = {
  tegangan: { label: "Tegangan", units: VOLTAGE_UNITS },
  arus: { label: "Arus", units: CURRENT_UNITS },
  hambatan: { label: "Hambatan", units: RESISTANCE_UNITS },
  daya: { label: "Daya", units: POWER_UNITS },
  energi: { label: "Energi listrik", units: ELECTRICAL_ENERGY_UNITS },
} satisfies Record<string, { label: string; units: UnitDefinition[] }>;

type GroupKey = keyof typeof GROUPS;

const EMPTY_FORM: Record<string, string> = {};

const EXAMPLES: Array<{
  group: GroupKey;
  value: string;
  unit: string;
  problem: string;
  detail: string;
  answer: string;
}> = [
  {
    group: "tegangan",
    value: "5",
    unit: "kV",
    problem:
      "Tegangan saluran distribusi tertulis 5 kV. Berapa nilainya dalam volt?",
    detail: "1 kV = 1.000 V, sehingga 5 kV = 5 × 1.000 = 5.000 V.",
    answer: "5.000 V",
  },
  {
    group: "arus",
    value: "2500",
    unit: "mA",
    problem:
      "Sebuah sensor mengalirkan arus 2.500 mA. Nyatakan arus tersebut dalam ampere.",
    detail: "1 A = 1.000 mA, sehingga 2.500 mA = 2.500 / 1.000 = 2,5 A.",
    answer: "2,5 A",
  },
  {
    group: "energi",
    value: "1",
    unit: "kWh",
    problem:
      "Pemakaian listrik tercatat 1 kWh. Berapa energi tersebut dalam joule?",
    detail: "1 kWh = 3.600.000 J.",
    answer: "3.600.000 J",
  },
  {
    group: "hambatan",
    value: "2200",
    unit: "ohm",
    problem:
      "Sebuah resistor bernilai 2.200 Ω. Nyatakan nilainya dalam kiloohm.",
    detail: "1 kΩ = 1.000 Ω, sehingga 2.200 Ω = 2,2 kΩ.",
    answer: "2,2 kΩ",
  },
];

export default function KonversiSatuanListrikCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const [group, setGroup] = useState<GroupKey>("tegangan");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("V");
  const [error, setError] = useState<string | undefined>();
  const calculator = useCalculatorState(EMPTY_FORM);
  const activeGroup = GROUPS[group];

  function changeGroup(nextGroup: GroupKey) {
    setGroup(nextGroup);
    setUnit(GROUPS[nextGroup].units[0].value);
    setValue("");
    setError(undefined);
    calculator.setMany({});
  }

  function changeValue(nextValue: string) {
    setValue(nextValue);
    setError(undefined);
    calculator.setMany({});
  }

  function changeUnit(nextUnit: string) {
    setUnit(nextUnit);
    calculator.setMany({});
  }

  function resetAll() {
    setGroup("tegangan");
    setValue("");
    setUnit("V");
    setError(undefined);
    calculator.reset();
  }

  function handleCalculate() {
    const parsed = parseNumberInput(value, `Nilai ${activeGroup.label.toLowerCase()}`);

    if (!parsed.ok) {
      setError(parsed.error);
      calculator.showError(parsed.error);
      return;
    }

    setError(undefined);

    calculator.run(() => {
      const units = activeGroup.units;
      const baseUnit = units[0];
      const sourceUnit = units.find((candidate) => candidate.value === unit) ?? baseUnit;
      const baseValue = convertToBase(parsed.value, sourceUnit.value, units);
      const rows = units
        .filter((candidate) => candidate.value !== sourceUnit.value)
        .map((candidate) => ({
          label: candidate.label,
          value: `${formatNumber(convertFromBase(baseValue, candidate.value, units))} ${candidate.symbol}`,
        }));
      const sampleTarget = units.find((candidate) => candidate.value !== sourceUnit.value);

      return (
        <div className="space-y-5">
          <ResultCard
            label={`Nilai dalam ${baseUnit.label}`}
            value={formatNumber(baseValue)}
            unit={baseUnit.symbol}
            rows={[
              {
                label: "Nilai masukan",
                value: `${formatNumber(parsed.value)} ${sourceUnit.symbol}`,
              },
              ...rows,
            ]}
            footnote="Konversi memakai faktor satuan SI. Hasil dibulatkan hingga 10 digit signifikan."
          />
          <StepsList
            steps={[
              {
                title: "Ubah nilai ke satuan dasar",
                detail: `Nilai dasar = ${formatNumber(parsed.value)} × faktor ${sourceUnit.symbol} = ${formatNumber(baseValue)} ${baseUnit.symbol}.`,
              },
              ...(sampleTarget
                ? [
                    {
                      title: "Bagi dengan faktor satuan tujuan",
                      detail: `${formatNumber(baseValue)} ${baseUnit.symbol} ÷ ${formatNumber(sampleTarget.factor)} = ${formatNumber(convertFromBase(baseValue, sampleTarget.value, units))} ${sampleTarget.symbol}.`,
                    },
                  ]
                : []),
              {
                title: "Gunakan tabel hasil",
                detail:
                  "Semua satuan pada kelompok yang sama ditampilkan pada hasil, sehingga Anda tidak perlu menghitung ulang satu per satu.",
              },
            ]}
          />
        </div>
      );
    });
  }

  function applyExample(example: (typeof EXAMPLES)[number]) {
    setGroup(example.group);
    setUnit(example.unit);
    setValue(example.value);
    setError(undefined);
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
          tex={String.raw`\text{nilai}_{\text{tujuan}}=\text{nilai}_{\text{asal}}\times\frac{f_{\text{asal}}}{f_{\text{tujuan}}}`}
          description="Setiap satuan memiliki faktor terhadap satuan dasar. Untuk berpindah satuan, ubah dulu ke satuan dasar, lalu bagi dengan faktor satuan tujuan."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "nilai_asal", name: "Nilai pada satuan asal", note: "Angka yang Anda masukkan" },
            { symbol: "f_asal", name: "Faktor satuan asal", note: "Contoh kV = 1.000 terhadap volt" },
            { symbol: "f_tujuan", name: "Faktor satuan tujuan", note: "Contoh mV = 0,001 terhadap volt" },
            { symbol: "nilai_tujuan", name: "Hasil konversi", note: "Nilai pada satuan yang dipilih" },
          ]}
        />
      }
      example={
        <div className="grid gap-5 lg:grid-cols-2">
          {EXAMPLES.map((example, index) => (
            <ExampleBlock
              key={`contoh-konversi-listrik-${index + 1}`}
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
            "Mengonversi satuan energi (kWh) dengan faktor yang sama seperti satuan daya (kW).",
            "Menganggap kVA sama dengan kW, padahal keduanya berbeda jika faktor daya tidak sama dengan satu.",
            "Menukar arah konversi, misalnya mengalikan saat seharusnya membagi.",
          ]}
          tips={[
            "Selalu ubah ke satuan dasar terlebih dahulu agar arah konversi tidak tertukar.",
            "1 kWh = 3,6 × 10⁶ J, sedangkan 1 kW = 1.000 W.",
            "Untuk peralatan AC, daya nyata (W) sama dengan daya semu (VA) dikali faktor daya.",
          ]}
        />
      }
    >
      <div className="space-y-4">
        <SelectField
          id="group"
          label="Jenis besaran listrik"
          value={group}
          onChange={(nextGroup) => changeGroup(nextGroup as GroupKey)}
          options={Object.entries(GROUPS).map(([key, groupValue]) => ({
            value: key,
            label: groupValue.label,
          }))}
          hint="Setiap jenis besaran memiliki satuan dan faktor konversi sendiri."
        />
        <MeasurementField
          id="nilai"
          label={`Nilai ${activeGroup.label.toLowerCase()}`}
          value={value}
          onChange={changeValue}
          unitValue={unit}
          onUnitChange={changeUnit}
          units={activeGroup.units}
          error={error}
          hint="Contoh: 5"
        />
      </div>
    </CalculatorLayout>
  );
}
