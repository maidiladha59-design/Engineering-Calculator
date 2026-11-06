"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList, type StepItem } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { MeasurementField } from "@/components/calculator/MeasurementField";
import { conversionStep } from "@/components/calculators/physics/helpers";
import { formatNumber } from "@/lib/format";
import {
  power as calculatePower,
  timeFromWork,
  workFromPower,
} from "@/lib/math/physics";
import {
  ENERGY_UNITS,
  POWER_UNITS,
  TIME_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type PowerMode = "power" | "work" | "time";

const INITIAL = {
  mode: "power" as PowerMode,
  work: "",
  workUnit: "J",
  time: "",
  timeUnit: "s",
  power: "",
  powerUnit: "W",
};

const MODE_OPTIONS = [
  { value: "power", label: "Cari daya (P)" },
  { value: "work", label: "Cari usaha (W)" },
  { value: "time", label: "Cari waktu (t)" },
];

export default function DayaCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"work" | "time" | "power", FieldSpec> = {
      work: { label: "Usaha (W)", rule: "any" },
      time: {
        label: "Waktu (t)",
        rule: mode === "power" ? "positive" : "non-negative",
      },
      power: {
        label: "Daya (P)",
        rule: mode === "time" ? "non-zero" : "any",
      },
    };

    return validateNumberFields(
      {
        work: mode === "work" ? "0" : calculator.form.work,
        time: mode === "time" ? "0" : calculator.form.time,
        power: mode === "power" ? "0" : calculator.form.power,
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
      const workJ = convertToBase(values.work, calculator.form.workUnit, ENERGY_UNITS);
      const timeS = convertToBase(values.time, calculator.form.timeUnit, TIME_UNITS);
      const powerW = convertToBase(values.power, calculator.form.powerUnit, POWER_UNITS);

      const steps: StepItem[] = [];

      if (mode === "power") {
        const workStep = conversionStep(
          "Konversi usaha ke joule",
          values.work,
          calculator.form.workUnit,
          ENERGY_UNITS,
        );
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        if (workStep) steps.push(workStep);
        if (timeStep) steps.push(timeStep);

        const result = calculatePower(workJ, timeS);
        const resultKW = convertFromBase(result, "kW", POWER_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus daya",
            detail: `P = W ÷ t = ${formatNumber(workJ)} J ÷ ${formatNumber(timeS)} s`,
          },
          {
            title: "Hitung hasil",
            detail: `P = ${formatNumber(result)} W = ${formatNumber(resultKW)} kW`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Daya (P)"
              value={formatNumber(result)}
              unit="W"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultKW)} kW` },
                { label: "Usaha (SI)", value: `${formatNumber(workJ)} J` },
                { label: "Waktu (SI)", value: `${formatNumber(timeS)} s` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "work") {
        const powerStep = conversionStep(
          "Konversi daya ke watt",
          values.power,
          calculator.form.powerUnit,
          POWER_UNITS,
        );
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        if (powerStep) steps.push(powerStep);
        if (timeStep) steps.push(timeStep);

        const result = workFromPower(powerW, timeS);
        const resultKJ = convertFromBase(result, "kJ", ENERGY_UNITS);

        steps.push(
          {
            title: "Susun ulang rumus",
            detail: "P = W ÷ t  →  W = P × t",
          },
          {
            title: "Substitusi dan hitung",
            detail: `W = ${formatNumber(powerW)} W × ${formatNumber(timeS)} s = ${formatNumber(result)} J = ${formatNumber(resultKJ)} kJ`,
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
                { label: "Daya (SI)", value: `${formatNumber(powerW)} W` },
                { label: "Waktu (SI)", value: `${formatNumber(timeS)} s` },
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
      const powerStep = conversionStep(
        "Konversi daya ke watt",
        values.power,
        calculator.form.powerUnit,
        POWER_UNITS,
      );

      if (workStep) steps.push(workStep);
      if (powerStep) steps.push(powerStep);

      const result = timeFromWork(workJ, powerW);

      steps.push(
        {
          title: "Susun ulang rumus",
          detail: "P = W ÷ t  →  t = W ÷ P",
        },
        {
          title: "Substitusi dan hitung",
          detail: `t = ${formatNumber(workJ)} J ÷ ${formatNumber(powerW)} W = ${formatNumber(result)} s = ${formatNumber(result / 60)} menit`,
        },
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Waktu (t)"
            value={formatNumber(result)}
            unit="s"
            rows={[
              { label: "Ekuivalen", value: `${formatNumber(result / 60)} menit` },
              { label: "Usaha (SI)", value: `${formatNumber(workJ)} J` },
              { label: "Daya (SI)", value: `${formatNumber(powerW)} W` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const examplePower = calculatePower(1200, 4);

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
          tex={String.raw`P=\frac{W}{t}\qquad\Longleftrightarrow\qquad W=P\,t\qquad\Longleftrightarrow\qquad t=\frac{W}{P}`}
          description="Daya adalah laju usaha atau energi per satuan waktu. Saat mencari waktu, daya tidak boleh 0."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "P", name: "Daya", unit: "W", note: "1 W = 1 J/s" },
            { symbol: "W", name: "Usaha atau energi", unit: "J", note: "Energi yang dipindahkan" },
            { symbol: "t", name: "Waktu", unit: "s", note: "Harus lebih dari 0 saat mencari daya" },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem="Mesin melakukan usaha 1.200 J dalam 4 detik. Berapa dayanya?"
          detail="P = W ÷ t = 1.200 J ÷ 4 s."
          answer={`${formatNumber(examplePower)} W (${formatNumber(examplePower / 1000)} kW)`}
        />
      }
    >
      <SelectField
        id="daya-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as PowerMode)}
        options={MODE_OPTIONS}
      />

      {mode === "power" ? (
        <>
          <MeasurementField
            id="daya-W"
            label="Usaha (W)"
            value={calculator.form.work}
            onChange={(value) => calculator.setField("work", value)}
            unitValue={calculator.form.workUnit}
            onUnitChange={(value) => calculator.setField("workUnit", value)}
            units={ENERGY_UNITS}
            error={calculator.errors.work}
            hint="Contoh: 1200"
          />
          <MeasurementField
            id="daya-t"
            label="Waktu (t)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Harus lebih dari 0, contoh: 4"
          />
        </>
      ) : null}

      {mode === "work" ? (
        <>
          <MeasurementField
            id="daya-P"
            label="Daya (P)"
            value={calculator.form.power}
            onChange={(value) => calculator.setField("power", value)}
            unitValue={calculator.form.powerUnit}
            onUnitChange={(value) => calculator.setField("powerUnit", value)}
            units={POWER_UNITS}
            error={calculator.errors.power}
            hint="Contoh: 300"
          />
          <MeasurementField
            id="daya-t-2"
            label="Waktu (t)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Contoh: 4"
          />
        </>
      ) : null}

      {mode === "time" ? (
        <>
          <MeasurementField
            id="daya-W-2"
            label="Usaha (W)"
            value={calculator.form.work}
            onChange={(value) => calculator.setField("work", value)}
            unitValue={calculator.form.workUnit}
            onUnitChange={(value) => calculator.setField("workUnit", value)}
            units={ENERGY_UNITS}
            error={calculator.errors.work}
            hint="Contoh: 1200"
          />
          <MeasurementField
            id="daya-P-2"
            label="Daya (P)"
            value={calculator.form.power}
            onChange={(value) => calculator.setField("power", value)}
            unitValue={calculator.form.powerUnit}
            onUnitChange={(value) => calculator.setField("powerUnit", value)}
            units={POWER_UNITS}
            error={calculator.errors.power}
            hint="Tidak boleh 0, contoh: 300"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
