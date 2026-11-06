"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { GuidanceBlock } from "@/components/calculator/GuidanceBlock";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList, type StepItem } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { MeasurementField } from "@/components/calculator/MeasurementField";
import { conversionStep } from "@/components/calculators/physics/helpers";
import { formatNumber } from "@/lib/format";
import {
  displacementFromWork,
  forceFromWork,
  work as calculateWork,
} from "@/lib/math/physics";
import {
  ENERGY_UNITS,
  FORCE_UNITS,
  LENGTH_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type WorkMode = "work" | "force" | "displacement";

const INITIAL = {
  mode: "work" as WorkMode,
  force: "",
  forceUnit: "N",
  displacement: "",
  displacementUnit: "m",
  work: "",
  workUnit: "J",
};

const MODE_OPTIONS = [
  { value: "work", label: "Cari usaha (W)" },
  { value: "force", label: "Cari gaya (F)" },
  { value: "displacement", label: "Cari perpindahan (s)" },
];

export default function UsahaEnergiCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"force" | "displacement" | "work", FieldSpec> = {
      force: {
        label: "Gaya (F)",
        rule: mode === "displacement" ? "non-zero" : "any",
      },
      displacement: {
        label: "Perpindahan (s)",
        rule: mode === "force" ? "positive" : "non-negative",
      },
      work: { label: "Usaha (W)", rule: "any" },
    };

    return validateNumberFields(
      {
        force: mode === "force" ? "0" : calculator.form.force,
        displacement:
          mode === "displacement" ? "0" : calculator.form.displacement,
        work: mode === "work" ? "0" : calculator.form.work,
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
      const displacementM = convertToBase(
        values.displacement,
        calculator.form.displacementUnit,
        LENGTH_UNITS,
      );
      const workJ = convertToBase(values.work, calculator.form.workUnit, ENERGY_UNITS);

      const steps: StepItem[] = [];

      if (mode === "work") {
        const forceStep = conversionStep(
          "Konversi gaya ke newton",
          values.force,
          calculator.form.forceUnit,
          FORCE_UNITS,
        );
        const displacementStep = conversionStep(
          "Konversi perpindahan ke meter",
          values.displacement,
          calculator.form.displacementUnit,
          LENGTH_UNITS,
        );

        if (forceStep) steps.push(forceStep);
        if (displacementStep) steps.push(displacementStep);

        const result = calculateWork(forceN, displacementM);
        const resultKJ = convertFromBase(result, "kJ", ENERGY_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus usaha",
            detail: `W = F × s = ${formatNumber(forceN)} N × ${formatNumber(displacementM)} m`,
          },
          {
            title: "Hitung hasil",
            detail: `W = ${formatNumber(result)} J = ${formatNumber(resultKJ)} kJ`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Usaha (W)"
              value={formatNumber(result)}
              unit="J"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultKJ)} kJ` },
                { label: "Gaya (SI)", value: `${formatNumber(forceN)} N` },
                { label: "Perpindahan (SI)", value: `${formatNumber(displacementM)} m` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "force") {
        const workStep = conversionStep(
          "Konversi usaha ke joule",
          values.work,
          calculator.form.workUnit,
          ENERGY_UNITS,
        );
        const displacementStep = conversionStep(
          "Konversi perpindahan ke meter",
          values.displacement,
          calculator.form.displacementUnit,
          LENGTH_UNITS,
        );

        if (workStep) steps.push(workStep);
        if (displacementStep) steps.push(displacementStep);

        const result = forceFromWork(workJ, displacementM);
        const resultKN = convertFromBase(result, "kN", FORCE_UNITS);

        steps.push(
          {
            title: "Susun ulang rumus",
            detail: "W = F × s  →  F = W ÷ s",
          },
          {
            title: "Substitusi dan hitung",
            detail: `F = ${formatNumber(workJ)} J ÷ ${formatNumber(displacementM)} m = ${formatNumber(result)} N = ${formatNumber(resultKN)} kN`,
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
                { label: "Usaha (SI)", value: `${formatNumber(workJ)} J` },
                { label: "Perpindahan (SI)", value: `${formatNumber(displacementM)} m` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      const workStep = conversionStep(
        "Konversi usaha ke joule",
        values.work,
        calculator.form.workUnit,
        ENERGY_UNITS,
      );
      const forceStep = conversionStep(
        "Konversi gaya ke newton",
        values.force,
        calculator.form.forceUnit,
        FORCE_UNITS,
      );

      if (workStep) steps.push(workStep);
      if (forceStep) steps.push(forceStep);

      const result = displacementFromWork(workJ, forceN);
      const resultKm = convertFromBase(result, "km", LENGTH_UNITS);

      steps.push(
        {
          title: "Susun ulang rumus",
          detail: "W = F × s  →  s = W ÷ F",
        },
        {
          title: "Substitusi dan hitung",
          detail: `s = ${formatNumber(workJ)} J ÷ ${formatNumber(forceN)} N = ${formatNumber(result)} m = ${formatNumber(resultKm)} km`,
        },
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Perpindahan (s)"
            value={formatNumber(result)}
            unit="m"
            rows={[
              { label: "Ekuivalen", value: `${formatNumber(resultKm)} km` },
              { label: "Usaha (SI)", value: `${formatNumber(workJ)} J` },
              { label: "Gaya (SI)", value: `${formatNumber(forceN)} N` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const exampleWork = calculateWork(50, 8);
  const exampleForce = forceFromWork(400, 8);
  const exampleDisplacement = displacementFromWork(400, 50);

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
          tex={String.raw`W=F\,s\qquad\Longleftrightarrow\qquad F=\frac{W}{s}\qquad\Longleftrightarrow\qquad s=\frac{W}{F}`}
          description="Usaha adalah gaya yang bekerja sepanjang perpindahan. Gaya dan perpindahan harus searah; kalkulator ini memakai besar gaya dan perpindahan."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "W", name: "Usaha atau energi", unit: "J", note: "1 J = 1 N·m" },
            { symbol: "F", name: "Gaya", unit: "N", note: "Tidak boleh 0 saat mencari perpindahan" },
            { symbol: "s", name: "Perpindahan", unit: "m", note: "Tidak boleh 0 saat mencari gaya" },
          ]}
        />
      }
      example={
        <div className="grid gap-4 md:grid-cols-2">
          <ExampleBlock
            problem="Gaya 50 N memindahkan benda sejauh 8 m. Berapa usahanya?"
            detail="W = F × s = 50 N × 8 m."
            answer={`${formatNumber(exampleWork)} J (${formatNumber(exampleWork / 1000)} kJ)`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "work",
                force: "50",
                displacement: "8",
              })
            }
          />
          <ExampleBlock
            problem="Usaha 400 J memindahkan benda sejauh 8 m. Berapa gaya yang bekerja?"
            detail="F = W ÷ s = 400 J ÷ 8 m."
            answer={`${formatNumber(exampleForce)} N`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "force",
                work: "400",
                displacement: "8",
              })
            }
          />
          <ExampleBlock
            problem="Usaha 400 J dilakukan oleh gaya 50 N. Berapa perpindahan benda?"
            detail="s = W ÷ F = 400 J ÷ 50 N."
            answer={`${formatNumber(exampleDisplacement)} m`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "displacement",
                work: "400",
                force: "50",
              })
            }
          />
        </div>
      }
      notes={
        <GuidanceBlock
          mistakes={[
            "Mengabaikan sudut antara gaya dan perpindahan, padahal usaha bergantung pada cos θ.",
            "Memakai perpindahan nol lalu menyimpulkan gayanya nol; gaya tetap ada meskipun benda tidak bergerak.",
            "Mencampur sentimeter dan meter sehingga usaha terhitung 100 kali lebih besar atau lebih kecil.",
            "Menganggap usaha selalu positif; gaya yang melawan arah gerak menghasilkan usaha negatif.",
          ]}
          tips={[
            "Usaha sama dengan perubahan energi, jadi hasilnya bisa diperiksa lewat energi kinetik atau potensial.",
            "Jika gaya searah perpindahan, cos 0° = 1 sehingga W = F × s; jika tegak lurus, usahanya nol.",
            "Pastikan satuan akhir newton-meter, yang setara dengan joule.",
          ]}
        />
      }
    >
      <SelectField
        id="usaha-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as WorkMode)}
        options={MODE_OPTIONS}
      />

      {mode === "work" ? (
        <>
          <MeasurementField
            id="usaha-F"
            label="Gaya (F)"
            value={calculator.form.force}
            onChange={(value) => calculator.setField("force", value)}
            unitValue={calculator.form.forceUnit}
            onUnitChange={(value) => calculator.setField("forceUnit", value)}
            units={FORCE_UNITS}
            error={calculator.errors.force}
            hint="Contoh: 50"
          />
          <MeasurementField
            id="usaha-s"
            label="Perpindahan (s)"
            value={calculator.form.displacement}
            onChange={(value) => calculator.setField("displacement", value)}
            unitValue={calculator.form.displacementUnit}
            onUnitChange={(value) => calculator.setField("displacementUnit", value)}
            units={LENGTH_UNITS}
            error={calculator.errors.displacement}
            hint="Contoh: 8"
          />
        </>
      ) : null}

      {mode === "force" ? (
        <>
          <MeasurementField
            id="usaha-W"
            label="Usaha (W)"
            value={calculator.form.work}
            onChange={(value) => calculator.setField("work", value)}
            unitValue={calculator.form.workUnit}
            onUnitChange={(value) => calculator.setField("workUnit", value)}
            units={ENERGY_UNITS}
            error={calculator.errors.work}
            hint="Contoh: 400"
          />
          <MeasurementField
            id="usaha-s-2"
            label="Perpindahan (s)"
            value={calculator.form.displacement}
            onChange={(value) => calculator.setField("displacement", value)}
            unitValue={calculator.form.displacementUnit}
            onUnitChange={(value) => calculator.setField("displacementUnit", value)}
            units={LENGTH_UNITS}
            error={calculator.errors.displacement}
            hint="Tidak boleh 0, contoh: 8"
          />
        </>
      ) : null}

      {mode === "displacement" ? (
        <>
          <MeasurementField
            id="usaha-W-2"
            label="Usaha (W)"
            value={calculator.form.work}
            onChange={(value) => calculator.setField("work", value)}
            unitValue={calculator.form.workUnit}
            onUnitChange={(value) => calculator.setField("workUnit", value)}
            units={ENERGY_UNITS}
            error={calculator.errors.work}
            hint="Contoh: 400"
          />
          <MeasurementField
            id="usaha-F-2"
            label="Gaya (F)"
            value={calculator.form.force}
            onChange={(value) => calculator.setField("force", value)}
            unitValue={calculator.form.forceUnit}
            onUnitChange={(value) => calculator.setField("forceUnit", value)}
            units={FORCE_UNITS}
            error={calculator.errors.force}
            hint="Tidak boleh 0, contoh: 50"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
