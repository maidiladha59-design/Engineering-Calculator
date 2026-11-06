"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList, type StepItem } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { MeasurementField } from "@/components/calculators/physics/MeasurementField";
import { conversionStep } from "@/components/calculators/physics/helpers";
import { formatNumber } from "@/lib/format";
import {
  accelerationFromForce,
  force as calculateForce,
  massFromForce,
} from "@/lib/math/physics";
import {
  ACCELERATION_UNITS,
  FORCE_UNITS,
  MASS_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type ForceMode = "force" | "mass" | "acceleration";

const INITIAL = {
  mode: "force" as ForceMode,
  mass: "",
  massUnit: "kg",
  acceleration: "",
  accelerationUnit: "m/s2",
  force: "",
  forceUnit: "N",
};

const MODE_OPTIONS = [
  { value: "force", label: "Cari gaya (F)" },
  { value: "mass", label: "Cari massa (m)" },
  { value: "acceleration", label: "Cari percepatan (a)" },
];

export default function GayaCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"mass" | "acceleration" | "force", FieldSpec> = {
      mass: {
        label: "Massa (m)",
        rule: mode === "force" || mode === "acceleration" ? "positive" : "any",
      },
      acceleration: {
        label: "Percepatan (a)",
        rule: mode === "mass" ? "non-zero" : "any",
      },
      force: { label: "Gaya (F)", rule: "any" },
    };

    return validateNumberFields(
      {
        mass: mode === "mass" ? "0" : calculator.form.mass,
        acceleration:
          mode === "acceleration" ? "0" : calculator.form.acceleration,
        force: mode === "force" ? "0" : calculator.form.force,
      },
      specs,
    );
  }

  function handleCalculate() {
    const { values, errors, hasErrors } = validate();

    if (hasErrors) {
      calculator.setFieldErrors(errors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      const massKg = convertToBase(values.mass, calculator.form.massUnit, MASS_UNITS);
      const accelerationMS2 = convertToBase(
        values.acceleration,
        calculator.form.accelerationUnit,
        ACCELERATION_UNITS,
      );
      const forceN = convertToBase(values.force, calculator.form.forceUnit, FORCE_UNITS);

      const steps: StepItem[] = [];

      if (mode === "force") {
        const massStep = conversionStep(
          "Konversi massa ke kilogram",
          values.mass,
          calculator.form.massUnit,
          MASS_UNITS,
        );
        const accelerationStep = conversionStep(
          "Konversi percepatan ke m/s²",
          values.acceleration,
          calculator.form.accelerationUnit,
          ACCELERATION_UNITS,
        );

        if (massStep) steps.push(massStep);
        if (accelerationStep) steps.push(accelerationStep);

        const result = calculateForce(massKg, accelerationMS2);
        const resultKN = convertFromBase(result, "kN", FORCE_UNITS);

        steps.push(
          {
            title: "Substitusi ke Hukum Newton II",
            detail: `F = m × a = ${formatNumber(massKg)} kg × ${formatNumber(accelerationMS2)} m/s²`,
          },
          {
            title: "Hitung hasil",
            detail: `F = ${formatNumber(result)} N = ${formatNumber(resultKN)} kN`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Gaya (F)"
              value={formatNumber(result)}
              unit="N"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultKN)} kN` },
                { label: "Massa (SI)", value: `${formatNumber(massKg)} kg` },
                { label: "Percepatan (SI)", value: `${formatNumber(accelerationMS2)} m/s²` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "mass") {
        const forceStep = conversionStep(
          "Konversi gaya ke newton",
          values.force,
          calculator.form.forceUnit,
          FORCE_UNITS,
        );
        const accelerationStep = conversionStep(
          "Konversi percepatan ke m/s²",
          values.acceleration,
          calculator.form.accelerationUnit,
          ACCELERATION_UNITS,
        );

        if (forceStep) steps.push(forceStep);
        if (accelerationStep) steps.push(accelerationStep);

        const result = massFromForce(forceN, accelerationMS2);
        const resultGram = convertFromBase(result, "g", MASS_UNITS);

        steps.push(
          {
            title: "Susun ulang rumus",
            detail: `F = m × a  →  m = F ÷ a`,
          },
          {
            title: "Substitusi dan hitung",
            detail: `m = ${formatNumber(forceN)} N ÷ ${formatNumber(accelerationMS2)} m/s² = ${formatNumber(result)} kg = ${formatNumber(resultGram)} g`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Massa (m)"
              value={formatNumber(result)}
              unit="kg"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultGram)} g` },
                { label: "Gaya (SI)", value: `${formatNumber(forceN)} N` },
                { label: "Percepatan (SI)", value: `${formatNumber(accelerationMS2)} m/s²` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      const forceStep = conversionStep(
        "Konversi gaya ke newton",
        values.force,
        calculator.form.forceUnit,
        FORCE_UNITS,
      );
      const massStep = conversionStep(
        "Konversi massa ke kilogram",
        values.mass,
        calculator.form.massUnit,
        MASS_UNITS,
      );

      if (forceStep) steps.push(forceStep);
      if (massStep) steps.push(massStep);

      const result = accelerationFromForce(forceN, massKg);
      const resultCm = convertFromBase(result, "cm/s2", ACCELERATION_UNITS);

      steps.push(
        {
          title: "Susun ulang rumus",
          detail: `F = m × a  →  a = F ÷ m`,
        },
        {
          title: "Substitusi dan hitung",
          detail: `a = ${formatNumber(forceN)} N ÷ ${formatNumber(massKg)} kg = ${formatNumber(result)} m/s² = ${formatNumber(resultCm)} cm/s²`,
        },
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Percepatan (a)"
            value={formatNumber(result)}
            unit="m/s²"
            rows={[
              { label: "Ekuivalen", value: `${formatNumber(resultCm)} cm/s²` },
              { label: "Gaya (SI)", value: `${formatNumber(forceN)} N` },
              { label: "Massa (SI)", value: `${formatNumber(massKg)} kg` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const exampleForce = calculateForce(1200, 2);

  return (
    <CalculatorLayout
      title={props.title}
      description={props.description}
      categoryName={props.categoryName}
      onCalculate={handleCalculate}
      onReset={calculator.reset}
      isCalculating={calculator.isCalculating}
      error={calculator.error}
      result={calculator.result}
      formula={
        <FormulaBlock
          tex={String.raw`F=ma\qquad\Longleftrightarrow\qquad m=\frac{F}{a}\qquad\Longleftrightarrow\qquad a=\frac{F}{m}`}
          description="Hukum Newton II. Massa dikonversi ke kilogram dan percepatan ke m/s² sebelum menghitung. Saat mencari massa, percepatan tidak boleh 0."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "F", name: "Gaya", unit: "N", note: "Gaya total yang bekerja" },
            { symbol: "m", name: "Massa", unit: "kg", note: "Harus lebih dari 0" },
            { symbol: "a", name: "Percepatan", unit: "m/s²", note: "Tidak boleh 0 saat mencari massa" },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem="Berapa gaya yang diperlukan untuk mempercepat benda 1.200 kg sebesar 2 m/s²?"
          detail={`F = m × a = 1.200 kg × 2 m/s².`}
          answer={`${formatNumber(exampleForce)} N (${formatNumber(exampleForce / 1000)} kN)`}
        />
      }
    >
      <SelectField
        id="gaya-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as ForceMode)}
        options={MODE_OPTIONS}
      />

      {mode === "force" ? (
        <>
          <MeasurementField
            id="gaya-massa"
            label="Massa (m)"
            value={calculator.form.mass}
            onChange={(value) => calculator.setField("mass", value)}
            unitValue={calculator.form.massUnit}
            onUnitChange={(value) => calculator.setField("massUnit", value)}
            units={MASS_UNITS}
            error={calculator.errors.mass}
            hint="Harus lebih dari 0, contoh: 1200"
          />
          <MeasurementField
            id="gaya-a"
            label="Percepatan (a)"
            value={calculator.form.acceleration}
            onChange={(value) => calculator.setField("acceleration", value)}
            unitValue={calculator.form.accelerationUnit}
            onUnitChange={(value) => calculator.setField("accelerationUnit", value)}
            units={ACCELERATION_UNITS}
            error={calculator.errors.acceleration}
            hint="Contoh: 2"
          />
        </>
      ) : null}

      {mode === "mass" ? (
        <>
          <MeasurementField
            id="gaya-F"
            label="Gaya (F)"
            value={calculator.form.force}
            onChange={(value) => calculator.setField("force", value)}
            unitValue={calculator.form.forceUnit}
            onUnitChange={(value) => calculator.setField("forceUnit", value)}
            units={FORCE_UNITS}
            error={calculator.errors.force}
            hint="Contoh: 2400"
          />
          <MeasurementField
            id="gaya-a-2"
            label="Percepatan (a)"
            value={calculator.form.acceleration}
            onChange={(value) => calculator.setField("acceleration", value)}
            unitValue={calculator.form.accelerationUnit}
            onUnitChange={(value) => calculator.setField("accelerationUnit", value)}
            units={ACCELERATION_UNITS}
            error={calculator.errors.acceleration}
            hint="Tidak boleh 0, contoh: 2"
          />
        </>
      ) : null}

      {mode === "acceleration" ? (
        <>
          <MeasurementField
            id="gaya-F-2"
            label="Gaya (F)"
            value={calculator.form.force}
            onChange={(value) => calculator.setField("force", value)}
            unitValue={calculator.form.forceUnit}
            onUnitChange={(value) => calculator.setField("forceUnit", value)}
            units={FORCE_UNITS}
            error={calculator.errors.force}
            hint="Contoh: 2400"
          />
          <MeasurementField
            id="gaya-massa-2"
            label="Massa (m)"
            value={calculator.form.mass}
            onChange={(value) => calculator.setField("mass", value)}
            unitValue={calculator.form.massUnit}
            onUnitChange={(value) => calculator.setField("massUnit", value)}
            units={MASS_UNITS}
            error={calculator.errors.mass}
            hint="Harus lebih dari 0, contoh: 1200"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
