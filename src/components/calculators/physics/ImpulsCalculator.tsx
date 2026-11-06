"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { NumberField } from "@/components/calculator/NumberField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList, type StepItem } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { MeasurementField } from "@/components/calculators/physics/MeasurementField";
import { conversionStep } from "@/components/calculators/physics/helpers";
import { formatNumber } from "@/lib/format";
import {
  forceFromImpulse,
  impulse as calculateImpulse,
  timeFromImpulse,
} from "@/lib/math/physics";
import {
  FORCE_UNITS,
  TIME_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type ImpulseMode = "impulse" | "force" | "time";

const INITIAL = {
  mode: "impulse" as ImpulseMode,
  force: "",
  forceUnit: "N",
  time: "",
  timeUnit: "s",
  impulse: "",
};

const MODE_OPTIONS = [
  { value: "impulse", label: "Cari impuls (I)" },
  { value: "force", label: "Cari gaya (F)" },
  { value: "time", label: "Cari selang waktu (Δt)" },
];

export default function ImpulsCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"force" | "time" | "impulse", FieldSpec> = {
      force: {
        label: "Gaya (F)",
        rule: mode === "time" ? "non-zero" : "any",
      },
      time: {
        label: "Selang waktu (Δt)",
        rule: mode === "time" ? "any" : "positive",
      },
      impulse: { label: "Impuls (I)", rule: "any" },
    };

    return validateNumberFields(
      {
        force: mode === "force" ? "0" : calculator.form.force,
        time: mode === "time" ? "0" : calculator.form.time,
        impulse: mode === "impulse" ? "0" : calculator.form.impulse,
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
      const forceN = convertToBase(values.force, calculator.form.forceUnit, FORCE_UNITS);
      const timeS = convertToBase(values.time, calculator.form.timeUnit, TIME_UNITS);
      const impulseValue = values.impulse;

      const steps: StepItem[] = [];

      if (mode === "impulse") {
        const forceStep = conversionStep(
          "Konversi gaya ke newton",
          values.force,
          calculator.form.forceUnit,
          FORCE_UNITS,
        );
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        if (forceStep) steps.push(forceStep);
        if (timeStep) steps.push(timeStep);

        const result = calculateImpulse(forceN, timeS);

        steps.push(
          {
            title: "Substitusi ke rumus impuls",
            detail: `I = F × Δt = ${formatNumber(forceN)} N × ${formatNumber(timeS)} s`,
          },
          {
            title: "Hitung hasil",
            detail: `I = ${formatNumber(result)} N·s`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Impuls (I)"
              value={formatNumber(result)}
              unit="N·s"
              rows={[
                { label: "Gaya (SI)", value: `${formatNumber(forceN)} N` },
                { label: "Selang waktu (SI)", value: `${formatNumber(timeS)} s` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "force") {
        const impulseStep = {
          title: "Gunakan impuls yang diketahui",
          detail: `I = ${formatNumber(impulseValue)} N·s`,
        };
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        steps.push(impulseStep);
        if (timeStep) steps.push(timeStep);

        const result = forceFromImpulse(impulseValue, timeS);
        const resultKN = convertFromBase(result, "kN", FORCE_UNITS);

        steps.push(
          {
            title: "Susun ulang rumus",
            detail: "I = F × Δt  →  F = I ÷ Δt",
          },
          {
            title: "Substitusi dan hitung",
            detail: `F = ${formatNumber(impulseValue)} N·s ÷ ${formatNumber(timeS)} s = ${formatNumber(result)} N = ${formatNumber(resultKN)} kN`,
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
                { label: "Impuls", value: `${formatNumber(impulseValue)} N·s` },
                { label: "Selang waktu (SI)", value: `${formatNumber(timeS)} s` },
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

      if (forceStep) steps.push(forceStep);

      const result = timeFromImpulse(impulseValue, forceN);
      const resultMs = convertFromBase(result, "ms", TIME_UNITS);

      steps.push(
        {
          title: "Susun ulang rumus",
          detail: "I = F × Δt  →  Δt = I ÷ F",
        },
        {
          title: "Substitusi dan hitung",
          detail: `Δt = ${formatNumber(impulseValue)} N·s ÷ ${formatNumber(forceN)} N = ${formatNumber(result)} s = ${formatNumber(resultMs)} ms`,
        },
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Selang waktu (Δt)"
            value={formatNumber(result)}
            unit="s"
            rows={[
              { label: "Ekuivalen", value: `${formatNumber(resultMs)} ms` },
              { label: "Impuls", value: `${formatNumber(impulseValue)} N·s` },
              { label: "Gaya (SI)", value: `${formatNumber(forceN)} N` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const exampleImpulse = calculateImpulse(20, 0.5);

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
          tex={String.raw`I=F\,\Delta t\qquad\Longleftrightarrow\qquad F=\frac{I}{\Delta t}\qquad\Longleftrightarrow\qquad \Delta t=\frac{I}{F}`}
          description="Impuls adalah gaya yang bekerja selama selang waktu tertentu. Hasil dalam N·s setara dengan perubahan momentum (kg·m/s)."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "I", name: "Impuls", unit: "N·s", note: "Setara dengan perubahan momentum" },
            { symbol: "F", name: "Gaya", unit: "N", note: "Tidak boleh 0 saat mencari selang waktu" },
            { symbol: "Δt", name: "Selang waktu", unit: "s", note: "Harus lebih dari 0" },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem="Gaya 20 N bekerja selama 0,5 detik. Berapa impulsnya?"
          detail="I = F × Δt = 20 N × 0,5 s."
          answer={`${formatNumber(exampleImpulse)} N·s`}
        />
      }
    >
      <SelectField
        id="impuls-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as ImpulseMode)}
        options={MODE_OPTIONS}
      />

      {mode === "impulse" ? (
        <>
          <MeasurementField
            id="impuls-F"
            label="Gaya (F)"
            value={calculator.form.force}
            onChange={(value) => calculator.setField("force", value)}
            unitValue={calculator.form.forceUnit}
            onUnitChange={(value) => calculator.setField("forceUnit", value)}
            units={FORCE_UNITS}
            error={calculator.errors.force}
            hint="Contoh: 20"
          />
          <MeasurementField
            id="impuls-t"
            label="Selang waktu (Δt)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Contoh: 0,5"
          />
        </>
      ) : null}

      {mode === "force" ? (
        <>
          <NumberField
            id="impuls-I"
            label="Impuls (I)"
            value={calculator.form.impulse}
            onChange={(value) => calculator.setField("impulse", value)}
            error={calculator.errors.impulse}
            unit="N·s"
            hint="Contoh: 10"
          />
          <MeasurementField
            id="impuls-t-2"
            label="Selang waktu (Δt)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Contoh: 0,5"
          />
        </>
      ) : null}

      {mode === "time" ? (
        <>
          <NumberField
            id="impuls-I-2"
            label="Impuls (I)"
            value={calculator.form.impulse}
            onChange={(value) => calculator.setField("impulse", value)}
            error={calculator.errors.impulse}
            unit="N·s"
            hint="Contoh: 10"
          />
          <MeasurementField
            id="impuls-F-2"
            label="Gaya (F)"
            value={calculator.form.force}
            onChange={(value) => calculator.setField("force", value)}
            unitValue={calculator.form.forceUnit}
            onUnitChange={(value) => calculator.setField("forceUnit", value)}
            units={FORCE_UNITS}
            error={calculator.errors.force}
            hint="Tidak boleh 0, contoh: 20"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
