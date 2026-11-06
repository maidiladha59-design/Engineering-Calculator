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
  density as calculateDensity,
  massFromDensity,
  volumeFromDensity,
} from "@/lib/math/physics";
import {
  DENSITY_UNITS,
  MASS_UNITS,
  VOLUME_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type DensityMode = "density" | "mass" | "volume";

const INITIAL = {
  mode: "density" as DensityMode,
  mass: "",
  massUnit: "kg",
  volume: "",
  volumeUnit: "m3",
  density: "",
  densityUnit: "kg/m3",
};

const MODE_OPTIONS = [
  { value: "density", label: "Cari massa jenis (ρ)" },
  { value: "mass", label: "Cari massa (m)" },
  { value: "volume", label: "Cari volume (V)" },
];

export default function MassaJenisCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"mass" | "volume" | "density", FieldSpec> = {
      mass: { label: "Massa (m)", rule: "non-negative" },
      volume: {
        label: "Volume (V)",
        rule: mode === "volume" ? "any" : "positive",
      },
      density: {
        label: "Massa jenis (ρ)",
        rule: mode === "volume" ? "non-zero" : "non-negative",
      },
    };

    return validateNumberFields(
      {
        mass: mode === "mass" ? "0" : calculator.form.mass,
        volume: mode === "volume" ? "0" : calculator.form.volume,
        density: mode === "density" ? "0" : calculator.form.density,
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
      const volumeM3 = convertToBase(
        values.volume,
        calculator.form.volumeUnit,
        VOLUME_UNITS,
      );
      const densityKgM3 = convertToBase(
        values.density,
        calculator.form.densityUnit,
        DENSITY_UNITS,
      );

      const steps: StepItem[] = [];

      if (mode === "density") {
        const massStep = conversionStep(
          "Konversi massa ke kilogram",
          values.mass,
          calculator.form.massUnit,
          MASS_UNITS,
        );
        const volumeStep = conversionStep(
          "Konversi volume ke meter kubik",
          values.volume,
          calculator.form.volumeUnit,
          VOLUME_UNITS,
        );

        if (massStep) steps.push(massStep);
        if (volumeStep) steps.push(volumeStep);

        const result = calculateDensity(massKg, volumeM3);
        const resultGcm3 = convertFromBase(result, "g/cm3", DENSITY_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus massa jenis",
            detail: `ρ = m ÷ V = ${formatNumber(massKg)} kg ÷ ${formatNumber(volumeM3)} m³`,
          },
          {
            title: "Hitung hasil",
            detail: `ρ = ${formatNumber(result)} kg/m³ = ${formatNumber(resultGcm3)} g/cm³`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Massa jenis (ρ)"
              value={formatNumber(result)}
              unit="kg/m³"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultGcm3)} g/cm³` },
                { label: "Massa (SI)", value: `${formatNumber(massKg)} kg` },
                { label: "Volume (SI)", value: `${formatNumber(volumeM3)} m³` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "mass") {
        const densityStep = conversionStep(
          "Konversi massa jenis ke kg/m³",
          values.density,
          calculator.form.densityUnit,
          DENSITY_UNITS,
        );
        const volumeStep = conversionStep(
          "Konversi volume ke meter kubik",
          values.volume,
          calculator.form.volumeUnit,
          VOLUME_UNITS,
        );

        if (densityStep) steps.push(densityStep);
        if (volumeStep) steps.push(volumeStep);

        const result = massFromDensity(densityKgM3, volumeM3);
        const resultGram = convertFromBase(result, "g", MASS_UNITS);

        steps.push(
          {
            title: "Susun ulang rumus",
            detail: "ρ = m ÷ V  →  m = ρ × V",
          },
          {
            title: "Substitusi dan hitung",
            detail: `m = ${formatNumber(densityKgM3)} kg/m³ × ${formatNumber(volumeM3)} m³ = ${formatNumber(result)} kg = ${formatNumber(resultGram)} g`,
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
                { label: "Massa jenis (SI)", value: `${formatNumber(densityKgM3)} kg/m³` },
                { label: "Volume (SI)", value: `${formatNumber(volumeM3)} m³` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      const massStep = conversionStep(
        "Konversi massa ke kilogram",
        values.mass,
        calculator.form.massUnit,
        MASS_UNITS,
      );
      const densityStep = conversionStep(
        "Konversi massa jenis ke kg/m³",
        values.density,
        calculator.form.densityUnit,
        DENSITY_UNITS,
      );

      if (massStep) steps.push(massStep);
      if (densityStep) steps.push(densityStep);

      const result = volumeFromDensity(massKg, densityKgM3);
      const resultLiter = convertFromBase(result, "L", VOLUME_UNITS);

      steps.push(
        {
          title: "Susun ulang rumus",
          detail: "ρ = m ÷ V  →  V = m ÷ ρ",
        },
        {
          title: "Substitusi dan hitung",
          detail: `V = ${formatNumber(massKg)} kg ÷ ${formatNumber(densityKgM3)} kg/m³ = ${formatNumber(result)} m³ = ${formatNumber(resultLiter)} L`,
        },
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Volume (V)"
            value={formatNumber(result)}
            unit="m³"
            rows={[
              { label: "Ekuivalen", value: `${formatNumber(resultLiter)} L` },
              { label: "Massa (SI)", value: `${formatNumber(massKg)} kg` },
              { label: "Massa jenis (SI)", value: `${formatNumber(densityKgM3)} kg/m³` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const exampleDensity = calculateDensity(2, 0.002);

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
          tex={String.raw`\rho=\frac{m}{V}\qquad\Longleftrightarrow\qquad m=\rho V\qquad\Longleftrightarrow\qquad V=\frac{m}{\rho}`}
          description="Massa jenis adalah massa per satuan volume. Volume harus lebih dari 0, dan saat mencari volume massa jenis tidak boleh 0."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "ρ", name: "Massa jenis (rho)", unit: "kg/m³", note: "1 g/cm³ = 1.000 kg/m³" },
            { symbol: "m", name: "Massa", unit: "kg", note: "Tidak boleh negatif" },
            { symbol: "V", name: "Volume", unit: "m³", note: "Harus lebih dari 0" },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem="Benda bermassa 2 kg memiliki volume 0,002 m³. Berapa massa jenisnya?"
          detail={`ρ = m ÷ V = 2 kg ÷ 0,002 m³ = ${formatNumber(exampleDensity)} kg/m³.`}
          answer={`${formatNumber(exampleDensity)} kg/m³ (${formatNumber(convertFromBase(exampleDensity, "g/cm3", DENSITY_UNITS))} g/cm³)`}
        />
      }
    >
      <SelectField
        id="density-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as DensityMode)}
        options={MODE_OPTIONS}
      />

      {mode === "density" ? (
        <>
          <MeasurementField
            id="density-m"
            label="Massa (m)"
            value={calculator.form.mass}
            onChange={(value) => calculator.setField("mass", value)}
            unitValue={calculator.form.massUnit}
            onUnitChange={(value) => calculator.setField("massUnit", value)}
            units={MASS_UNITS}
            error={calculator.errors.mass}
            hint="Contoh: 2"
          />
          <MeasurementField
            id="density-V"
            label="Volume (V)"
            value={calculator.form.volume}
            onChange={(value) => calculator.setField("volume", value)}
            unitValue={calculator.form.volumeUnit}
            onUnitChange={(value) => calculator.setField("volumeUnit", value)}
            units={VOLUME_UNITS}
            error={calculator.errors.volume}
            hint="Harus lebih dari 0, contoh: 0,002"
          />
        </>
      ) : null}

      {mode === "mass" ? (
        <>
          <MeasurementField
            id="density-rho"
            label="Massa jenis (ρ)"
            value={calculator.form.density}
            onChange={(value) => calculator.setField("density", value)}
            unitValue={calculator.form.densityUnit}
            onUnitChange={(value) => calculator.setField("densityUnit", value)}
            units={DENSITY_UNITS}
            error={calculator.errors.density}
            hint="Contoh: 1000"
          />
          <MeasurementField
            id="density-V-2"
            label="Volume (V)"
            value={calculator.form.volume}
            onChange={(value) => calculator.setField("volume", value)}
            unitValue={calculator.form.volumeUnit}
            onUnitChange={(value) => calculator.setField("volumeUnit", value)}
            units={VOLUME_UNITS}
            error={calculator.errors.volume}
            hint="Harus lebih dari 0, contoh: 0,002"
          />
        </>
      ) : null}

      {mode === "volume" ? (
        <>
          <MeasurementField
            id="density-m-2"
            label="Massa (m)"
            value={calculator.form.mass}
            onChange={(value) => calculator.setField("mass", value)}
            unitValue={calculator.form.massUnit}
            onUnitChange={(value) => calculator.setField("massUnit", value)}
            units={MASS_UNITS}
            error={calculator.errors.mass}
            hint="Contoh: 2"
          />
          <MeasurementField
            id="density-rho-2"
            label="Massa jenis (ρ)"
            value={calculator.form.density}
            onChange={(value) => calculator.setField("density", value)}
            unitValue={calculator.form.densityUnit}
            onUnitChange={(value) => calculator.setField("densityUnit", value)}
            units={DENSITY_UNITS}
            error={calculator.errors.density}
            hint="Tidak boleh 0, contoh: 1000"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
