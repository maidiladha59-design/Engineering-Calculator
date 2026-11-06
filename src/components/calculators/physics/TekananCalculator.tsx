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
  areaFromPressure,
  forceFromPressure,
  pressure as calculatePressure,
} from "@/lib/math/physics";
import {
  AREA_UNITS,
  FORCE_UNITS,
  PRESSURE_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type PressureMode = "pressure" | "force" | "area";

const INITIAL = {
  mode: "pressure" as PressureMode,
  force: "",
  forceUnit: "N",
  area: "",
  areaUnit: "m2",
  pressure: "",
  pressureUnit: "Pa",
};

const MODE_OPTIONS = [
  { value: "pressure", label: "Cari tekanan (P)" },
  { value: "force", label: "Cari gaya (F)" },
  { value: "area", label: "Cari luas bidang (A)" },
];

export default function TekananCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"force" | "area" | "pressure", FieldSpec> = {
      force: { label: "Gaya (F)", rule: "any" },
      area: {
        label: "Luas bidang (A)",
        rule: mode === "area" ? "any" : "positive",
      },
      pressure: {
        label: "Tekanan (P)",
        rule: mode === "area" ? "non-zero" : "any",
      },
    };

    return validateNumberFields(
      {
        force: mode === "force" ? "0" : calculator.form.force,
        area: mode === "area" ? "0" : calculator.form.area,
        pressure: mode === "pressure" ? "0" : calculator.form.pressure,
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
      const areaM2 = convertToBase(values.area, calculator.form.areaUnit, AREA_UNITS);
      const pressurePa = convertToBase(
        values.pressure,
        calculator.form.pressureUnit,
        PRESSURE_UNITS,
      );

      const steps: StepItem[] = [];

      if (mode === "pressure") {
        const forceStep = conversionStep(
          "Konversi gaya ke newton",
          values.force,
          calculator.form.forceUnit,
          FORCE_UNITS,
        );
        const areaStep = conversionStep(
          "Konversi luas ke meter persegi",
          values.area,
          calculator.form.areaUnit,
          AREA_UNITS,
        );

        if (forceStep) steps.push(forceStep);
        if (areaStep) steps.push(areaStep);

        const result = calculatePressure(forceN, areaM2);
        const resultKPa = convertFromBase(result, "kPa", PRESSURE_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus tekanan",
            detail: `P = F ÷ A = ${formatNumber(forceN)} N ÷ ${formatNumber(areaM2)} m²`,
          },
          {
            title: "Hitung hasil",
            detail: `P = ${formatNumber(result)} Pa = ${formatNumber(resultKPa)} kPa`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Tekanan (P)"
              value={formatNumber(result)}
              unit="Pa"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultKPa)} kPa` },
                { label: "Gaya (SI)", value: `${formatNumber(forceN)} N` },
                { label: "Luas (SI)", value: `${formatNumber(areaM2)} m²` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "force") {
        const pressureStep = conversionStep(
          "Konversi tekanan ke pascal",
          values.pressure,
          calculator.form.pressureUnit,
          PRESSURE_UNITS,
        );
        const areaStep = conversionStep(
          "Konversi luas ke meter persegi",
          values.area,
          calculator.form.areaUnit,
          AREA_UNITS,
        );

        if (pressureStep) steps.push(pressureStep);
        if (areaStep) steps.push(areaStep);

        const result = forceFromPressure(pressurePa, areaM2);
        const resultKN = convertFromBase(result, "kN", FORCE_UNITS);

        steps.push(
          {
            title: "Susun ulang rumus",
            detail: "P = F ÷ A  →  F = P × A",
          },
          {
            title: "Substitusi dan hitung",
            detail: `F = ${formatNumber(pressurePa)} Pa × ${formatNumber(areaM2)} m² = ${formatNumber(result)} N = ${formatNumber(resultKN)} kN`,
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
                { label: "Tekanan (SI)", value: `${formatNumber(pressurePa)} Pa` },
                { label: "Luas (SI)", value: `${formatNumber(areaM2)} m²` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      const pressureStep = conversionStep(
        "Konversi tekanan ke pascal",
        values.pressure,
        calculator.form.pressureUnit,
        PRESSURE_UNITS,
      );
      const forceStep = conversionStep(
        "Konversi gaya ke newton",
        values.force,
        calculator.form.forceUnit,
        FORCE_UNITS,
      );

      if (pressureStep) steps.push(pressureStep);
      if (forceStep) steps.push(forceStep);

      const result = areaFromPressure(pressurePa, forceN);
      const resultCm2 = convertFromBase(result, "cm2", AREA_UNITS);

      steps.push(
        {
          title: "Susun ulang rumus",
          detail: "P = F ÷ A  →  A = F ÷ P",
        },
        {
          title: "Substitusi dan hitung",
          detail: `A = ${formatNumber(forceN)} N ÷ ${formatNumber(pressurePa)} Pa = ${formatNumber(result)} m² = ${formatNumber(resultCm2)} cm²`,
        },
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Luas bidang (A)"
            value={formatNumber(result)}
            unit="m²"
            rows={[
              { label: "Ekuivalen", value: `${formatNumber(resultCm2)} cm²` },
              { label: "Tekanan (SI)", value: `${formatNumber(pressurePa)} Pa` },
              { label: "Gaya (SI)", value: `${formatNumber(forceN)} N` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const examplePressure = calculatePressure(500, 0.25);

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
          tex={String.raw`P=\frac{F}{A}\qquad\Longleftrightarrow\qquad F=P\,A\qquad\Longleftrightarrow\qquad A=\frac{F}{P}`}
          description="Tekanan adalah gaya per satuan luas bidang tekan. Luas harus lebih dari 0, dan saat mencari luas tekanan tidak boleh 0."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "P", name: "Tekanan", unit: "Pa", note: "1 Pa = 1 N/m²" },
            { symbol: "F", name: "Gaya", unit: "N", note: "Gaya yang menekan bidang" },
            { symbol: "A", name: "Luas bidang", unit: "m²", note: "Harus lebih dari 0" },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem="Gaya 500 N bekerja pada luas bidang 0,25 m². Berapa tekanannya?"
          detail="P = F ÷ A = 500 N ÷ 0,25 m²."
          answer={`${formatNumber(examplePressure)} Pa (${formatNumber(examplePressure / 1000)} kPa)`}
        />
      }
    >
      <SelectField
        id="tekanan-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as PressureMode)}
        options={MODE_OPTIONS}
      />

      {mode === "pressure" ? (
        <>
          <MeasurementField
            id="tekanan-F"
            label="Gaya (F)"
            value={calculator.form.force}
            onChange={(value) => calculator.setField("force", value)}
            unitValue={calculator.form.forceUnit}
            onUnitChange={(value) => calculator.setField("forceUnit", value)}
            units={FORCE_UNITS}
            error={calculator.errors.force}
            hint="Contoh: 500"
          />
          <MeasurementField
            id="tekanan-A"
            label="Luas bidang (A)"
            value={calculator.form.area}
            onChange={(value) => calculator.setField("area", value)}
            unitValue={calculator.form.areaUnit}
            onUnitChange={(value) => calculator.setField("areaUnit", value)}
            units={AREA_UNITS}
            error={calculator.errors.area}
            hint="Harus lebih dari 0, contoh: 0,25"
          />
        </>
      ) : null}

      {mode === "force" ? (
        <>
          <MeasurementField
            id="tekanan-P"
            label="Tekanan (P)"
            value={calculator.form.pressure}
            onChange={(value) => calculator.setField("pressure", value)}
            unitValue={calculator.form.pressureUnit}
            onUnitChange={(value) => calculator.setField("pressureUnit", value)}
            units={PRESSURE_UNITS}
            error={calculator.errors.pressure}
            hint="Contoh: 2000"
          />
          <MeasurementField
            id="tekanan-A-2"
            label="Luas bidang (A)"
            value={calculator.form.area}
            onChange={(value) => calculator.setField("area", value)}
            unitValue={calculator.form.areaUnit}
            onUnitChange={(value) => calculator.setField("areaUnit", value)}
            units={AREA_UNITS}
            error={calculator.errors.area}
            hint="Harus lebih dari 0, contoh: 0,25"
          />
        </>
      ) : null}

      {mode === "area" ? (
        <>
          <MeasurementField
            id="tekanan-P-2"
            label="Tekanan (P)"
            value={calculator.form.pressure}
            onChange={(value) => calculator.setField("pressure", value)}
            unitValue={calculator.form.pressureUnit}
            onUnitChange={(value) => calculator.setField("pressureUnit", value)}
            units={PRESSURE_UNITS}
            error={calculator.errors.pressure}
            hint="Tidak boleh 0, contoh: 2000"
          />
          <MeasurementField
            id="tekanan-F-2"
            label="Gaya (F)"
            value={calculator.form.force}
            onChange={(value) => calculator.setField("force", value)}
            unitValue={calculator.form.forceUnit}
            onUnitChange={(value) => calculator.setField("forceUnit", value)}
            units={FORCE_UNITS}
            error={calculator.errors.force}
            hint="Contoh: 500"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
