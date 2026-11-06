"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { GuidanceBlock } from "@/components/calculator/GuidanceBlock";
import { NumberField } from "@/components/calculator/NumberField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList, type StepItem } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { MeasurementField } from "@/components/calculator/MeasurementField";
import { conversionStep } from "@/components/calculators/physics/helpers";
import { formatNumber } from "@/lib/format";
import {
  massFromMomentum,
  momentum as calculateMomentum,
  velocityFromMomentum,
} from "@/lib/math/physics";
import {
  MASS_UNITS,
  SPEED_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type MomentumMode = "momentum" | "mass" | "velocity";

const INITIAL = {
  mode: "momentum" as MomentumMode,
  mass: "",
  massUnit: "kg",
  velocity: "",
  velocityUnit: "m/s",
  momentum: "",
};

const MODE_OPTIONS = [
  { value: "momentum", label: "Cari momentum (p)" },
  { value: "mass", label: "Cari massa (m)" },
  { value: "velocity", label: "Cari kecepatan (v)" },
];

export default function MomentumCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"mass" | "velocity" | "momentum", FieldSpec> = {
      mass: {
        label: "Massa (m)",
        rule: mode === "momentum" || mode === "velocity" ? "positive" : "any",
      },
      velocity: {
        label: "Kecepatan (v)",
        rule: mode === "mass" ? "non-zero" : "any",
      },
      momentum: { label: "Momentum (p)", rule: "any" },
    };

    return validateNumberFields(
      {
        mass: mode === "mass" ? "0" : calculator.form.mass,
        velocity: mode === "velocity" ? "0" : calculator.form.velocity,
        momentum: mode === "momentum" ? "0" : calculator.form.momentum,
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
      const velocityMS = convertToBase(
        values.velocity,
        calculator.form.velocityUnit,
        SPEED_UNITS,
      );
      const momentumValue = values.momentum;

      const steps: StepItem[] = [];

      if (mode === "momentum") {
        const massStep = conversionStep(
          "Konversi massa ke kilogram",
          values.mass,
          calculator.form.massUnit,
          MASS_UNITS,
        );
        const velocityStep = conversionStep(
          "Konversi kecepatan ke m/s",
          values.velocity,
          calculator.form.velocityUnit,
          SPEED_UNITS,
        );

        if (massStep) steps.push(massStep);
        if (velocityStep) steps.push(velocityStep);

        const result = calculateMomentum(massKg, velocityMS);

        steps.push(
          {
            title: "Substitusi ke rumus momentum",
            detail: `p = m × v = ${formatNumber(massKg)} kg × ${formatNumber(velocityMS)} m/s`,
          },
          {
            title: "Hitung hasil",
            detail: `p = ${formatNumber(result)} kg·m/s (setara ${formatNumber(result)} N·s)`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Momentum (p)"
              value={formatNumber(result)}
              unit="kg·m/s"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(result)} N·s` },
                { label: "Massa (SI)", value: `${formatNumber(massKg)} kg` },
                { label: "Kecepatan (SI)", value: `${formatNumber(velocityMS)} m/s` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "mass") {
        const velocityStep = conversionStep(
          "Konversi kecepatan ke m/s",
          values.velocity,
          calculator.form.velocityUnit,
          SPEED_UNITS,
        );

        if (velocityStep) steps.push(velocityStep);

        const result = massFromMomentum(momentumValue, velocityMS);
        const resultGram = convertFromBase(result, "g", MASS_UNITS);

        steps.push(
          {
            title: "Susun ulang rumus",
            detail: "p = m × v  →  m = p ÷ v",
          },
          {
            title: "Substitusi dan hitung",
            detail: `m = ${formatNumber(momentumValue)} kg·m/s ÷ ${formatNumber(velocityMS)} m/s = ${formatNumber(result)} kg = ${formatNumber(resultGram)} g`,
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
                { label: "Momentum", value: `${formatNumber(momentumValue)} kg·m/s` },
                { label: "Kecepatan (SI)", value: `${formatNumber(velocityMS)} m/s` },
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

      if (massStep) steps.push(massStep);

      const result = velocityFromMomentum(momentumValue, massKg);
      const resultKmh = convertFromBase(result, "km/h", SPEED_UNITS);

      steps.push(
        {
          title: "Susun ulang rumus",
          detail: "p = m × v  →  v = p ÷ m",
        },
        {
          title: "Substitusi dan hitung",
          detail: `v = ${formatNumber(momentumValue)} kg·m/s ÷ ${formatNumber(massKg)} kg = ${formatNumber(result)} m/s = ${formatNumber(resultKmh)} km/jam`,
        },
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Kecepatan (v)"
            value={formatNumber(result)}
            unit="m/s"
            rows={[
              { label: "Ekuivalen", value: `${formatNumber(resultKmh)} km/jam` },
              { label: "Momentum", value: `${formatNumber(momentumValue)} kg·m/s` },
              { label: "Massa (SI)", value: `${formatNumber(massKg)} kg` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const exampleMomentum = calculateMomentum(1500, 20);
  const exampleMass = massFromMomentum(30000, 20);
  const exampleVelocity = velocityFromMomentum(30000, 1500);

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
          tex={String.raw`p=m\,v\qquad\Longleftrightarrow\qquad m=\frac{p}{v}\qquad\Longleftrightarrow\qquad v=\frac{p}{m}`}
          description="Momentum adalah hasil kali massa dan kecepatan. Satuan kg·m/s setara dengan N·s. Saat mencari massa, kecepatan tidak boleh 0."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "p", name: "Momentum", unit: "kg·m/s", note: "Besar momentum benda" },
            { symbol: "m", name: "Massa", unit: "kg", note: "Harus lebih dari 0" },
            { symbol: "v", name: "Kecepatan", unit: "m/s", note: "Tidak boleh 0 saat mencari massa" },
          ]}
        />
      }
      example={
        <div className="grid gap-4 md:grid-cols-2">
          <ExampleBlock
            problem="Truk 1.500 kg bergerak dengan kecepatan 20 m/s. Berapa momentumnya?"
            detail="p = m × v = 1.500 kg × 20 m/s."
            answer={`${formatNumber(exampleMomentum)} kg·m/s (${formatNumber(exampleMomentum)} N·s)`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "momentum",
                mass: "1500",
                velocity: "20",
              })
            }
          />
          <ExampleBlock
            problem="Benda bermomentum 30.000 kg·m/s bergerak 20 m/s. Berapa massanya?"
            detail="m = p ÷ v = 30.000 kg·m/s ÷ 20 m/s."
            answer={`${formatNumber(exampleMass)} kg`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "mass",
                momentum: "30000",
                velocity: "20",
              })
            }
          />
          <ExampleBlock
            problem="Benda 1.500 kg memiliki momentum 30.000 kg·m/s. Berapa kecepatannya?"
            detail="v = p ÷ m = 30.000 kg·m/s ÷ 1.500 kg."
            answer={`${formatNumber(exampleVelocity)} m/s`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "velocity",
                momentum: "30000",
                mass: "1500",
              })
            }
          />
        </div>
      }
      notes={
        <GuidanceBlock
          mistakes={[
            "Memasukkan kecepatan nol saat mencari massa, yang membuat pembagian tidak terdefinisi.",
            "Mencampur satuan gram dan kilogram atau km/jam dan m/s sehingga hasil meleset.",
            "Mengabaikan arah gerak, padahal momentum adalah besaran vektor yang bertanda.",
            "Menyamakan satuan kg·m/s dengan N tanpa mengalikan waktu, padahal N·s yang setara dengan kg·m/s.",
          ]}
          tips={[
            "Tetapkan arah positif lebih dulu agar tanda momentum pada tumbukan mudah ditafsirkan.",
            "Momentum sama dengan impuls, jadi perubahan momentum dapat dihitung dari gaya dikali selang waktu.",
            "Untuk benda bermassa besar dengan kecepatan kecil, momentumnya bisa tetap besar; jangan hanya melihat kecepatan.",
          ]}
        />
      }
    >
      <SelectField
        id="momentum-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as MomentumMode)}
        options={MODE_OPTIONS}
      />

      {mode === "momentum" ? (
        <>
          <MeasurementField
            id="momentum-m"
            label="Massa (m)"
            value={calculator.form.mass}
            onChange={(value) => calculator.setField("mass", value)}
            unitValue={calculator.form.massUnit}
            onUnitChange={(value) => calculator.setField("massUnit", value)}
            units={MASS_UNITS}
            error={calculator.errors.mass}
            hint="Harus lebih dari 0, contoh: 1500"
          />
          <MeasurementField
            id="momentum-v"
            label="Kecepatan (v)"
            value={calculator.form.velocity}
            onChange={(value) => calculator.setField("velocity", value)}
            unitValue={calculator.form.velocityUnit}
            onUnitChange={(value) => calculator.setField("velocityUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.velocity}
            hint="Contoh: 20"
          />
        </>
      ) : null}

      {mode === "mass" ? (
        <>
          <NumberField
            id="momentum-p"
            label="Momentum (p)"
            value={calculator.form.momentum}
            onChange={(value) => calculator.setField("momentum", value)}
            error={calculator.errors.momentum}
            unit="kg·m/s"
            hint="Contoh: 30000"
          />
          <MeasurementField
            id="momentum-v-2"
            label="Kecepatan (v)"
            value={calculator.form.velocity}
            onChange={(value) => calculator.setField("velocity", value)}
            unitValue={calculator.form.velocityUnit}
            onUnitChange={(value) => calculator.setField("velocityUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.velocity}
            hint="Tidak boleh 0, contoh: 20"
          />
        </>
      ) : null}

      {mode === "velocity" ? (
        <>
          <NumberField
            id="momentum-p-2"
            label="Momentum (p)"
            value={calculator.form.momentum}
            onChange={(value) => calculator.setField("momentum", value)}
            error={calculator.errors.momentum}
            unit="kg·m/s"
            hint="Contoh: 30000"
          />
          <MeasurementField
            id="momentum-m-2"
            label="Massa (m)"
            value={calculator.form.mass}
            onChange={(value) => calculator.setField("mass", value)}
            unitValue={calculator.form.massUnit}
            onUnitChange={(value) => calculator.setField("massUnit", value)}
            units={MASS_UNITS}
            error={calculator.errors.mass}
            hint="Harus lebih dari 0, contoh: 1500"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
