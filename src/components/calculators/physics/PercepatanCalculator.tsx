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
  acceleration as calculateAcceleration,
  finalVelocity,
  initialVelocity,
  timeFromAcceleration,
} from "@/lib/math/physics";
import {
  ACCELERATION_UNITS,
  SPEED_UNITS,
  TIME_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type AccelerationMode = "acceleration" | "final" | "initial" | "time";

const INITIAL = {
  mode: "acceleration" as AccelerationMode,
  initial: "",
  initialUnit: "m/s",
  final: "",
  finalUnit: "m/s",
  acceleration: "",
  accelerationUnit: "m/s2",
  time: "",
  timeUnit: "s",
};

const MODE_OPTIONS = [
  { value: "acceleration", label: "Cari percepatan (a)" },
  { value: "final", label: "Cari kecepatan akhir (v)" },
  { value: "initial", label: "Cari kecepatan awal (u)" },
  { value: "time", label: "Cari waktu (t)" },
];

export default function PercepatanCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"initial" | "final" | "acceleration" | "time", FieldSpec> = {
      initial: { label: "Kecepatan awal (u)", rule: "any" },
      final: { label: "Kecepatan akhir (v)", rule: "any" },
      acceleration: { label: "Percepatan (a)", rule: "any" },
      time: {
        label: "Waktu (t)",
        rule: mode === "acceleration" ? "positive" : "non-negative",
      },
    };

    return validateNumberFields(
      {
        initial: mode === "initial" ? "0" : calculator.form.initial,
        final: mode === "final" ? "0" : calculator.form.final,
        acceleration:
          mode === "acceleration" ? "0" : calculator.form.acceleration,
        time: mode === "time" ? "0" : calculator.form.time,
      },
      specs,
    );
  }

  function handleCalculate() {
    const { values, errors, hasErrors } = validate();
    const nextErrors = { ...errors };

    if (mode === "time" && !nextErrors.acceleration && values.acceleration === 0) {
      nextErrors.acceleration =
        "Percepatan tidak boleh 0 saat mencari waktu (pembagian dengan nol).";
    }

    if (hasErrors || Object.keys(nextErrors).length > 0) {
      calculator.setFieldErrors(nextErrors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      const initialMS = convertToBase(
        values.initial,
        calculator.form.initialUnit,
        SPEED_UNITS,
      );
      const finalMS = convertToBase(
        values.final,
        calculator.form.finalUnit,
        SPEED_UNITS,
      );
      const accelerationMS2 = convertToBase(
        values.acceleration,
        calculator.form.accelerationUnit,
        ACCELERATION_UNITS,
      );
      const timeS = convertToBase(values.time, calculator.form.timeUnit, TIME_UNITS);

      const steps: StepItem[] = [];

      if (mode === "acceleration") {
        const initialStep = conversionStep(
          "Konversi kecepatan awal ke m/s",
          values.initial,
          calculator.form.initialUnit,
          SPEED_UNITS,
        );
        const finalStep = conversionStep(
          "Konversi kecepatan akhir ke m/s",
          values.final,
          calculator.form.finalUnit,
          SPEED_UNITS,
        );
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        if (initialStep) steps.push(initialStep);
        if (finalStep) steps.push(finalStep);
        if (timeStep) steps.push(timeStep);

        const result = calculateAcceleration(finalMS, initialMS, timeS);
        const resultCm = convertFromBase(result, "cm/s2", ACCELERATION_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus",
            detail: `a = (v − u) ÷ t = (${formatNumber(finalMS)} − ${formatNumber(initialMS)}) ÷ ${formatNumber(timeS)}`,
          },
          {
            title: "Hitung hasil",
            detail: `a = ${formatNumber(finalMS - initialMS)} ÷ ${formatNumber(timeS)} = ${formatNumber(result)} m/s²`,
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
                { label: "Kecepatan awal (SI)", value: `${formatNumber(initialMS)} m/s` },
                { label: "Kecepatan akhir (SI)", value: `${formatNumber(finalMS)} m/s` },
                { label: "Waktu (SI)", value: `${formatNumber(timeS)} s` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "final") {
        const initialStep = conversionStep(
          "Konversi kecepatan awal ke m/s",
          values.initial,
          calculator.form.initialUnit,
          SPEED_UNITS,
        );
        const accelerationStep = conversionStep(
          "Konversi percepatan ke m/s²",
          values.acceleration,
          calculator.form.accelerationUnit,
          ACCELERATION_UNITS,
        );
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        if (initialStep) steps.push(initialStep);
        if (accelerationStep) steps.push(accelerationStep);
        if (timeStep) steps.push(timeStep);

        const result = finalVelocity(initialMS, accelerationMS2, timeS);
        const resultKmh = convertFromBase(result, "km/h", SPEED_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus",
            detail: `v = u + a·t = ${formatNumber(initialMS)} + ${formatNumber(accelerationMS2)} × ${formatNumber(timeS)}`,
          },
          {
            title: "Hitung hasil",
            detail: `v = ${formatNumber(initialMS)} + ${formatNumber(accelerationMS2 * timeS)} = ${formatNumber(result)} m/s`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Kecepatan akhir (v)"
              value={formatNumber(result)}
              unit="m/s"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultKmh)} km/jam` },
                { label: "Kecepatan awal (SI)", value: `${formatNumber(initialMS)} m/s` },
                { label: "Percepatan (SI)", value: `${formatNumber(accelerationMS2)} m/s²` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "initial") {
        const finalStep = conversionStep(
          "Konversi kecepatan akhir ke m/s",
          values.final,
          calculator.form.finalUnit,
          SPEED_UNITS,
        );
        const accelerationStep = conversionStep(
          "Konversi percepatan ke m/s²",
          values.acceleration,
          calculator.form.accelerationUnit,
          ACCELERATION_UNITS,
        );
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        if (finalStep) steps.push(finalStep);
        if (accelerationStep) steps.push(accelerationStep);
        if (timeStep) steps.push(timeStep);

        const result = initialVelocity(finalMS, accelerationMS2, timeS);
        const resultKmh = convertFromBase(result, "km/h", SPEED_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus",
            detail: `u = v − a·t = ${formatNumber(finalMS)} − ${formatNumber(accelerationMS2)} × ${formatNumber(timeS)}`,
          },
          {
            title: "Hitung hasil",
            detail: `u = ${formatNumber(finalMS)} − ${formatNumber(accelerationMS2 * timeS)} = ${formatNumber(result)} m/s`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Kecepatan awal (u)"
              value={formatNumber(result)}
              unit="m/s"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultKmh)} km/jam` },
                { label: "Kecepatan akhir (SI)", value: `${formatNumber(finalMS)} m/s` },
                { label: "Percepatan (SI)", value: `${formatNumber(accelerationMS2)} m/s²` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      const initialStep = conversionStep(
        "Konversi kecepatan awal ke m/s",
        values.initial,
        calculator.form.initialUnit,
        SPEED_UNITS,
      );
      const finalStep = conversionStep(
        "Konversi kecepatan akhir ke m/s",
        values.final,
        calculator.form.finalUnit,
        SPEED_UNITS,
      );
      const accelerationStep = conversionStep(
        "Konversi percepatan ke m/s²",
        values.acceleration,
        calculator.form.accelerationUnit,
        ACCELERATION_UNITS,
      );

      if (initialStep) steps.push(initialStep);
      if (finalStep) steps.push(finalStep);
      if (accelerationStep) steps.push(accelerationStep);

      const result = timeFromAcceleration(finalMS, initialMS, accelerationMS2);

      steps.push(
        {
          title: "Substitusi ke rumus",
          detail: `t = (v − u) ÷ a = (${formatNumber(finalMS)} − ${formatNumber(initialMS)}) ÷ ${formatNumber(accelerationMS2)}`,
        },
        {
          title: "Hitung hasil",
          detail: `t = ${formatNumber(finalMS - initialMS)} ÷ ${formatNumber(accelerationMS2)} = ${formatNumber(result)} s = ${formatNumber(result / 60)} menit`,
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
              { label: "Kecepatan awal (SI)", value: `${formatNumber(initialMS)} m/s` },
              { label: "Kecepatan akhir (SI)", value: `${formatNumber(finalMS)} m/s` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const exampleInitial = convertToBase(0, "km/h", SPEED_UNITS);
  const exampleFinal = convertToBase(72, "km/h", SPEED_UNITS);
  const exampleTime = convertToBase(10, "s", TIME_UNITS);
  const exampleAcceleration = calculateAcceleration(
    exampleFinal,
    exampleInitial,
    exampleTime,
  );

  const exampleFinalVelocity = finalVelocity(10, 2, 5);
  const exampleElapsed = timeFromAcceleration(30, 10, 2);

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
          tex={String.raw`a=\frac{v-u}{t}\qquad\Longleftrightarrow\qquad v=u+at\qquad\Longleftrightarrow\qquad u=v-at\qquad\Longleftrightarrow\qquad t=\frac{v-u}{a}`}
          description="Percepatan adalah perubahan kecepatan per satuan waktu. Satuan kecepatan dikonversi ke m/s dan waktu ke detik sebelum rumus digunakan."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "u", name: "Kecepatan awal", unit: "m/s", note: "Kecepatan pada awal selang waktu" },
            { symbol: "v", name: "Kecepatan akhir", unit: "m/s", note: "Kecepatan pada akhir selang waktu" },
            { symbol: "a", name: "Percepatan", unit: "m/s²", note: "Tidak boleh 0 saat mencari waktu" },
            { symbol: "t", name: "Waktu", unit: "s", note: "Harus lebih dari 0 saat mencari percepatan" },
          ]}
        />
      }
      example={
        <div className="grid gap-4 md:grid-cols-2">
          <ExampleBlock
            problem="Mobil dari keadaan diam mencapai 72 km/jam dalam 10 detik. Berapa percepatannya?"
            detail={`72 km/jam = ${formatNumber(exampleFinal)} m/s. Maka a = (${formatNumber(exampleFinal)} − 0) ÷ ${formatNumber(exampleTime)} = ${formatNumber(exampleAcceleration)} m/s².`}
            answer={`${formatNumber(exampleAcceleration)} m/s²`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "acceleration",
                initial: "0",
                initialUnit: "km/h",
                final: "72",
                finalUnit: "km/h",
                time: "10",
                timeUnit: "s",
              })
            }
          />
          <ExampleBlock
            problem="Benda bergerak 10 m/s dengan percepatan 2 m/s² selama 5 detik. Berapa kecepatan akhirnya?"
            detail={`v = u + a·t = 10 + 2 × 5 = ${formatNumber(exampleFinalVelocity)} m/s.`}
            answer={`${formatNumber(exampleFinalVelocity)} m/s`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "final",
                initial: "10",
                acceleration: "2",
                time: "5",
              })
            }
          />
          <ExampleBlock
            problem="Kecepatan benda naik dari 10 m/s menjadi 30 m/s dengan percepatan 2 m/s². Berapa waktunya?"
            detail={`t = (v − u) ÷ a = (30 − 10) ÷ 2 = ${formatNumber(exampleElapsed)} s.`}
            answer={`${formatNumber(exampleElapsed)} s`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "time",
                initial: "10",
                final: "30",
                acceleration: "2",
              })
            }
          />
        </div>
      }
      notes={
        <GuidanceBlock
          mistakes={[
            "Membalik urutan pengurangan menjadi u − v, sehingga tanda percepatan menjadi kebalikannya.",
            "Memakai kecepatan dalam km/jam tanpa mengubahnya ke m/s, padahal waktu diukur dalam detik.",
            "Memasukkan percepatan nol saat mencari waktu, yang membuat pembagian tidak terdefinisi.",
            "Menganggap percepatan selalu positif; perlambatan menghasilkan nilai negatif yang valid.",
          ]}
          tips={[
            "Tetapkan satu arah sebagai positif agar tanda percepatan dan kecepatan konsisten.",
            "Konversi km/jam ke m/s dengan membagi 3,6 sebelum memakai rumus.",
            "Pada grafik kecepatan terhadap waktu, percepatan adalah kemiringan garisnya.",
          ]}
        />
      }
    >
      <SelectField
        id="percepatan-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as AccelerationMode)}
        options={MODE_OPTIONS}
      />

      {mode === "acceleration" ? (
        <>
          <MeasurementField
            id="percepatan-u"
            label="Kecepatan awal (u)"
            value={calculator.form.initial}
            onChange={(value) => calculator.setField("initial", value)}
            unitValue={calculator.form.initialUnit}
            onUnitChange={(value) => calculator.setField("initialUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.initial}
            hint="Contoh: 0"
          />
          <MeasurementField
            id="percepatan-v"
            label="Kecepatan akhir (v)"
            value={calculator.form.final}
            onChange={(value) => calculator.setField("final", value)}
            unitValue={calculator.form.finalUnit}
            onUnitChange={(value) => calculator.setField("finalUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.final}
            hint="Contoh: 72"
          />
          <MeasurementField
            id="percepatan-t"
            label="Waktu (t)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Harus lebih dari 0, contoh: 10"
          />
        </>
      ) : null}

      {mode === "final" ? (
        <>
          <MeasurementField
            id="percepatan-u-2"
            label="Kecepatan awal (u)"
            value={calculator.form.initial}
            onChange={(value) => calculator.setField("initial", value)}
            unitValue={calculator.form.initialUnit}
            onUnitChange={(value) => calculator.setField("initialUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.initial}
            hint="Contoh: 10"
          />
          <MeasurementField
            id="percepatan-a"
            label="Percepatan (a)"
            value={calculator.form.acceleration}
            onChange={(value) => calculator.setField("acceleration", value)}
            unitValue={calculator.form.accelerationUnit}
            onUnitChange={(value) =>
              calculator.setField("accelerationUnit", value)
            }
            units={ACCELERATION_UNITS}
            error={calculator.errors.acceleration}
            hint="Contoh: 2"
          />
          <MeasurementField
            id="percepatan-t-2"
            label="Waktu (t)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Contoh: 5"
          />
        </>
      ) : null}

      {mode === "initial" ? (
        <>
          <MeasurementField
            id="percepatan-v-2"
            label="Kecepatan akhir (v)"
            value={calculator.form.final}
            onChange={(value) => calculator.setField("final", value)}
            unitValue={calculator.form.finalUnit}
            onUnitChange={(value) => calculator.setField("finalUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.final}
            hint="Contoh: 30"
          />
          <MeasurementField
            id="percepatan-a-2"
            label="Percepatan (a)"
            value={calculator.form.acceleration}
            onChange={(value) => calculator.setField("acceleration", value)}
            unitValue={calculator.form.accelerationUnit}
            onUnitChange={(value) =>
              calculator.setField("accelerationUnit", value)
            }
            units={ACCELERATION_UNITS}
            error={calculator.errors.acceleration}
            hint="Contoh: 2"
          />
          <MeasurementField
            id="percepatan-t-3"
            label="Waktu (t)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Contoh: 5"
          />
        </>
      ) : null}

      {mode === "time" ? (
        <>
          <MeasurementField
            id="percepatan-u-3"
            label="Kecepatan awal (u)"
            value={calculator.form.initial}
            onChange={(value) => calculator.setField("initial", value)}
            unitValue={calculator.form.initialUnit}
            onUnitChange={(value) => calculator.setField("initialUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.initial}
            hint="Contoh: 0"
          />
          <MeasurementField
            id="percepatan-v-3"
            label="Kecepatan akhir (v)"
            value={calculator.form.final}
            onChange={(value) => calculator.setField("final", value)}
            unitValue={calculator.form.finalUnit}
            onUnitChange={(value) => calculator.setField("finalUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.final}
            hint="Contoh: 20"
          />
          <MeasurementField
            id="percepatan-a-3"
            label="Percepatan (a)"
            value={calculator.form.acceleration}
            onChange={(value) => calculator.setField("acceleration", value)}
            unitValue={calculator.form.accelerationUnit}
            onUnitChange={(value) =>
              calculator.setField("accelerationUnit", value)
            }
            units={ACCELERATION_UNITS}
            error={calculator.errors.acceleration}
            hint="Tidak boleh 0, contoh: 2"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
