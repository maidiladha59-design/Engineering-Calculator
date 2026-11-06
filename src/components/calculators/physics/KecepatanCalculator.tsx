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
  distanceFromSpeed,
  speed as calculateSpeed,
  timeFromSpeed,
} from "@/lib/math/physics";
import {
  LENGTH_UNITS,
  SPEED_UNITS,
  TIME_UNITS,
  convertFromBase,
  convertToBase,
} from "@/lib/units";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";

type SpeedMode = "speed" | "distance" | "time";

const INITIAL = {
  mode: "speed" as SpeedMode,
  distance: "",
  distanceUnit: "km",
  time: "",
  timeUnit: "h",
  speed: "",
  speedUnit: "km/h",
};

const MODE_OPTIONS = [
  { value: "speed", label: "Cari kecepatan (v)" },
  { value: "distance", label: "Cari jarak (s)" },
  { value: "time", label: "Cari waktu (t)" },
];

export default function KecepatanCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function validate() {
    const specs: Record<"distance" | "time" | "speed", FieldSpec> = {
      distance: {
        label: "Jarak",
        rule: mode === "distance" ? "any" : "non-negative",
      },
      time: {
        label: "Waktu",
        rule: mode === "speed" ? "positive" : "non-negative",
      },
      speed: {
        label: "Kecepatan",
        rule: mode === "time" ? "positive" : "non-negative",
      },
    };

    return validateNumberFields(
      {
        distance: mode === "distance" ? "0" : calculator.form.distance,
        time: mode === "time" ? "0" : calculator.form.time,
        speed: mode === "speed" ? "0" : calculator.form.speed,
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
      const distanceM = values.distance
        ? convertToBase(values.distance, calculator.form.distanceUnit, LENGTH_UNITS)
        : 0;
      const timeS = values.time
        ? convertToBase(values.time, calculator.form.timeUnit, TIME_UNITS)
        : 0;
      const speedMS = values.speed
        ? convertToBase(values.speed, calculator.form.speedUnit, SPEED_UNITS)
        : 0;

      const steps: StepItem[] = [];

      if (mode === "speed") {
        const distanceStep = conversionStep(
          "Konversi jarak ke meter",
          values.distance,
          calculator.form.distanceUnit,
          LENGTH_UNITS,
        );
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        if (distanceStep) steps.push(distanceStep);
        if (timeStep) steps.push(timeStep);

        const result = calculateSpeed(distanceM, timeS);
        const resultKmh = convertFromBase(result, "km/h", SPEED_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus",
            detail: `v = s ÷ t = ${formatNumber(distanceM)} m ÷ ${formatNumber(timeS)} s`,
          },
          {
            title: "Hitung hasil dalam m/s",
            detail: `v = ${formatNumber(result)} m/s`,
          },
          {
            title: "Konversi hasil ke km/jam",
            detail: `${formatNumber(result)} m/s × 3,6 = ${formatNumber(resultKmh)} km/jam`,
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
                { label: "Jarak (SI)", value: `${formatNumber(distanceM)} m` },
                { label: "Waktu (SI)", value: `${formatNumber(timeS)} s` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      if (mode === "distance") {
        const speedStep = conversionStep(
          "Konversi kecepatan ke m/s",
          values.speed,
          calculator.form.speedUnit,
          SPEED_UNITS,
        );
        const timeStep = conversionStep(
          "Konversi waktu ke detik",
          values.time,
          calculator.form.timeUnit,
          TIME_UNITS,
        );

        if (speedStep) steps.push(speedStep);
        if (timeStep) steps.push(timeStep);

        const result = distanceFromSpeed(speedMS, timeS);
        const resultKm = convertFromBase(result, "km", LENGTH_UNITS);

        steps.push(
          {
            title: "Substitusi ke rumus",
            detail: `s = v × t = ${formatNumber(speedMS)} m/s × ${formatNumber(timeS)} s`,
          },
          {
            title: "Hitung hasil",
            detail: `s = ${formatNumber(result)} m = ${formatNumber(resultKm)} km`,
          },
        );

        return (
          <div className="space-y-5">
            <ResultCard
              label="Jarak (s)"
              value={formatNumber(result)}
              unit="m"
              rows={[
                { label: "Ekuivalen", value: `${formatNumber(resultKm)} km` },
                { label: "Kecepatan (SI)", value: `${formatNumber(speedMS)} m/s` },
                { label: "Waktu (SI)", value: `${formatNumber(timeS)} s` },
              ]}
            />
            <StepsList steps={steps} />
          </div>
        );
      }

      const distanceStep = conversionStep(
        "Konversi jarak ke meter",
        values.distance,
        calculator.form.distanceUnit,
        LENGTH_UNITS,
      );
      const speedStep = conversionStep(
        "Konversi kecepatan ke m/s",
        values.speed,
        calculator.form.speedUnit,
        SPEED_UNITS,
      );

      if (distanceStep) steps.push(distanceStep);
      if (speedStep) steps.push(speedStep);

      const result = timeFromSpeed(distanceM, speedMS);
      const resultMinutes = result / 60;
      const resultHours = result / 3600;

      steps.push(
        {
          title: "Substitusi ke rumus",
          detail: `t = s ÷ v = ${formatNumber(distanceM)} m ÷ ${formatNumber(speedMS)} m/s`,
        },
        {
          title: "Hitung hasil",
          detail: `t = ${formatNumber(result)} s = ${formatNumber(resultMinutes)} menit = ${formatNumber(resultHours)} jam`,
        },
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Waktu (t)"
            value={formatNumber(result)}
            unit="s"
            rows={[
              {
                label: "Ekuivalen",
                value: `${formatNumber(resultMinutes)} menit (${formatNumber(resultHours)} jam)`,
              },
              { label: "Jarak (SI)", value: `${formatNumber(distanceM)} m` },
              { label: "Kecepatan (SI)", value: `${formatNumber(speedMS)} m/s` },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const exampleDistanceM = convertToBase(120, "km", LENGTH_UNITS);
  const exampleTimeS = convertToBase(1.5, "h", TIME_UNITS);
  const exampleSpeed = calculateSpeed(exampleDistanceM, exampleTimeS);
  const exampleKmh = convertFromBase(exampleSpeed, "km/h", SPEED_UNITS);

  const exampleSpeedMS = convertToBase(80, "km/h", SPEED_UNITS);
  const exampleTravelTime = convertToBase(2, "h", TIME_UNITS);
  const exampleDistance = distanceFromSpeed(exampleSpeedMS, exampleTravelTime);
  const exampleDistanceKm = convertFromBase(exampleDistance, "km", LENGTH_UNITS);

  const exampleDuration = timeFromSpeed(exampleDistanceM, exampleSpeedMS);
  const exampleDurationHours = convertFromBase(exampleDuration, "h", TIME_UNITS);

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
          tex={String.raw`v=\frac{s}{t}\qquad\Longleftrightarrow\qquad s=v\,t\qquad\Longleftrightarrow\qquad t=\frac{s}{v}`}
          description="Jarak s dibagi waktu t menghasilkan kecepatan v. Pilih variabel yang ingin dicari; kalkulator mengonversi satuan ke SI sebelum menghitung."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "v", name: "Kecepatan", unit: "m/s", note: "Perpindahan per satuan waktu" },
            { symbol: "s", name: "Jarak", unit: "m", note: "Panjang lintasan yang ditempuh" },
            { symbol: "t", name: "Waktu", unit: "s", note: "Harus lebih dari 0 saat mencari kecepatan" },
          ]}
        />
      }
      example={
        <div className="grid gap-4 md:grid-cols-2">
          <ExampleBlock
            problem="Sebuah mobil menempuh 120 km dalam 1,5 jam. Berapa kecepatannya?"
            detail={`Konversi: 120 km = ${formatNumber(exampleDistanceM)} m dan 1,5 jam = ${formatNumber(exampleTimeS)} s. Maka v = ${formatNumber(exampleDistanceM)} ÷ ${formatNumber(exampleTimeS)} = ${formatNumber(exampleSpeed)} m/s.`}
            answer={`${formatNumber(exampleSpeed)} m/s (${formatNumber(exampleKmh)} km/jam)`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "speed",
                distance: "120",
                distanceUnit: "km",
                time: "1.5",
                timeUnit: "h",
              })
            }
          />
          <ExampleBlock
            problem="Mobil melaju 80 km/jam selama 2 jam. Berapa jarak yang ditempuh?"
            detail={`80 km/jam = ${formatNumber(exampleSpeedMS)} m/s dan 2 jam = ${formatNumber(exampleTravelTime)} s. Maka s = ${formatNumber(exampleSpeedMS)} × ${formatNumber(exampleTravelTime)} = ${formatNumber(exampleDistance)} m.`}
            answer={`${formatNumber(exampleDistanceKm)} km`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "distance",
                speed: "80",
                speedUnit: "km/h",
                time: "2",
                timeUnit: "h",
              })
            }
          />
          <ExampleBlock
            problem="Berapa waktu yang dibutuhkan untuk menempuh 120 km dengan kecepatan 80 km/jam?"
            detail={`Kecepatan ${formatNumber(exampleSpeedMS)} m/s dan jarak ${formatNumber(exampleDistanceM)} m. Maka t = ${formatNumber(exampleDistanceM)} ÷ ${formatNumber(exampleSpeedMS)} = ${formatNumber(exampleDuration)} s.`}
            answer={`${formatNumber(exampleDurationHours)} jam`}
            onUse={() =>
              calculator.setMany({
                ...INITIAL,
                mode: "time",
                distance: "120",
                distanceUnit: "km",
                speed: "80",
                speedUnit: "km/h",
              })
            }
          />
        </div>
      }
      notes={
        <GuidanceBlock
          mistakes={[
            "Mencampur satuan, misalnya jarak dalam kilometer tetapi waktu dalam detik, sehingga hasil tidak konsisten.",
            "Membagi waktu dengan jarak saat mencari kecepatan; yang benar adalah jarak dibagi waktu.",
            "Memakai waktu nol, yang membuat pembagian tidak terdefinisi, bukan menghasilkan kecepatan tak hingga.",
            "Menulis 1,5 jam sebagai 1 jam 50 menit sehingga konversi waktunya keliru.",
          ]}
          tips={[
            "Ubah semua besaran ke SI (meter dan detik) lebih dulu, lalu konversi hasilnya ke km/jam bila perlu.",
            "Ingat faktor 3,6: 1 m/s sama dengan 3,6 km/jam, jadi 20 m/s = 72 km/jam.",
            "Gunakan segitiga rumus v = s ÷ t untuk mengingat bahwa s = v × t dan t = s ÷ v.",
          ]}
        />
      }
    >
      <SelectField
        id="kecepatan-mode"
        label="Cari variabel"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as SpeedMode)}
        options={MODE_OPTIONS}
      />

      {mode === "speed" ? (
        <>
          <MeasurementField
            id="kecepatan-jarak"
            label="Jarak (s)"
            value={calculator.form.distance}
            onChange={(value) => calculator.setField("distance", value)}
            unitValue={calculator.form.distanceUnit}
            onUnitChange={(value) => calculator.setField("distanceUnit", value)}
            units={LENGTH_UNITS}
            error={calculator.errors.distance}
            hint="Contoh: 120"
          />
          <MeasurementField
            id="kecepatan-waktu"
            label="Waktu (t)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Contoh: 1,5"
          />
        </>
      ) : null}

      {mode === "distance" ? (
        <>
          <MeasurementField
            id="kecepatan-cepat"
            label="Kecepatan (v)"
            value={calculator.form.speed}
            onChange={(value) => calculator.setField("speed", value)}
            unitValue={calculator.form.speedUnit}
            onUnitChange={(value) => calculator.setField("speedUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.speed}
            hint="Contoh: 80"
          />
          <MeasurementField
            id="kecepatan-waktu-2"
            label="Waktu (t)"
            value={calculator.form.time}
            onChange={(value) => calculator.setField("time", value)}
            unitValue={calculator.form.timeUnit}
            onUnitChange={(value) => calculator.setField("timeUnit", value)}
            units={TIME_UNITS}
            error={calculator.errors.time}
            hint="Contoh: 2"
          />
        </>
      ) : null}

      {mode === "time" ? (
        <>
          <MeasurementField
            id="kecepatan-jarak-2"
            label="Jarak (s)"
            value={calculator.form.distance}
            onChange={(value) => calculator.setField("distance", value)}
            unitValue={calculator.form.distanceUnit}
            onUnitChange={(value) => calculator.setField("distanceUnit", value)}
            units={LENGTH_UNITS}
            error={calculator.errors.distance}
            hint="Contoh: 120"
          />
          <MeasurementField
            id="kecepatan-cepat-2"
            label="Kecepatan (v)"
            value={calculator.form.speed}
            onChange={(value) => calculator.setField("speed", value)}
            unitValue={calculator.form.speedUnit}
            onUnitChange={(value) => calculator.setField("speedUnit", value)}
            units={SPEED_UNITS}
            error={calculator.errors.speed}
            hint="Harus lebih dari 0, contoh: 80"
          />
        </>
      ) : null}
    </CalculatorLayout>
  );
}
