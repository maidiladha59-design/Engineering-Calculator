"use client";

import { useMemo } from "react";
import { ArrowLeftRight } from "lucide-react";
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
import { getConversionConfig, type ConversionConfig } from "@/data/conversions";
import { formatNumber } from "@/lib/format";
import {
  conversionTable,
  convertValue,
  findConversionUnit,
  type ConversionUnit,
} from "@/lib/math/conversions";
import { parseNumberInput } from "@/lib/validation";

const PRECISION_OPTIONS = [
  { value: "auto", label: "Otomatis (hingga 10 digit)" },
  { value: "0", label: "0 angka desimal" },
  { value: "1", label: "1 angka desimal" },
  { value: "2", label: "2 angka desimal" },
  { value: "3", label: "3 angka desimal" },
  { value: "4", label: "4 angka desimal" },
  { value: "5", label: "5 angka desimal" },
  { value: "6", label: "6 angka desimal" },
];

function formatWithPrecision(value: number, precision: string): string {
  if (precision === "auto") {
    return formatNumber(value);
  }

  const digits = Number(precision);

  if (!Number.isInteger(digits) || digits < 0 || digits > 6) {
    return formatNumber(value);
  }

  if (!Number.isFinite(value)) {
    return "Tidak terdefinisi";
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Object.is(value, -0) ? 0 : value);
}

function baseUnitOf(config: ConversionConfig): ConversionUnit {
  const unit = config.units.find(
    (candidate) => candidate.factor === 1 && !candidate.offset,
  );

  if (!unit) {
    throw new Error("Satuan dasar tidak ditemukan pada konfigurasi konversi.");
  }

  return unit;
}

function ConversionTableView({
  config,
  value,
  fromUnit,
  precision,
  targetValue,
}: {
  config: ConversionConfig;
  value: number;
  fromUnit: ConversionUnit;
  precision: string;
  targetValue: string;
}) {
  const rows = conversionTable(value, fromUnit.value, config.units);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        Semua satuan {config.unitLabel}
      </h2>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Hasil konversi {formatNumber(value)} {fromUnit.symbol} ke seluruh
            satuan {config.unitLabel}
          </caption>
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th scope="col" className="py-2.5 pr-4 font-semibold">
                Satuan
              </th>
              <th scope="col" className="py-2.5 pr-4 font-semibold">
                Simbol
              </th>
              <th scope="col" className="py-2.5 text-right font-semibold">
                Nilai
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isSource = row.unit.value === fromUnit.value;
              const isTarget = row.unit.value === targetValue;

              return (
                <tr
                  key={row.unit.value}
                  className={
                    isSource
                      ? "border-b border-indigo-100 bg-indigo-50/60 last:border-0"
                      : "border-b border-slate-100 last:border-0"
                  }
                >
                  <td className="py-2.5 pr-4 text-slate-700">
                    {row.unit.label}
                    {isSource ? (
                      <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-indigo-600">
                        asal
                      </span>
                    ) : null}
                    {isTarget ? (
                      <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                        tujuan
                      </span>
                    ) : null}
                  </td>
                  <td className="whitespace-nowrap py-2.5 pr-4 font-mono text-slate-600">
                    {row.unit.symbol}
                  </td>
                  <td className="whitespace-nowrap py-2.5 text-right font-medium text-slate-900">
                    {formatWithPrecision(row.value, precision)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function buildSteps(
  config: ConversionConfig,
  value: number,
  from: ConversionUnit,
  to: ConversionUnit,
  result: number,
  formatted: string,
): StepItem[] {
  const base = baseUnitOf(config);
  const baseValue = convertValue(value, from, base);
  const steps: StepItem[] = [];

  if (config.isTemperature) {
    steps.push({
      title: "Ubah nilai ke Kelvin",
      detail: `(${formatNumber(value)}${
        from.offset ? ` + ${formatNumber(from.offset)}` : ""
      }) × ${formatNumber(from.factor)} = ${formatNumber(baseValue)} K.`,
    });
    steps.push({
      title: "Ubah Kelvin ke satuan tujuan",
      detail: `${formatNumber(baseValue)} K ÷ ${formatNumber(to.factor)}${
        to.offset ? ` − ${formatNumber(to.offset)}` : ""
      } = ${formatted} ${to.symbol}.`,
    });
  } else {
    steps.push({
      title: `Ubah ${from.symbol} ke satuan dasar (${config.baseSymbol})`,
      detail: `${formatNumber(value)} ${from.symbol} × ${formatNumber(
        from.factor,
      )} = ${formatNumber(baseValue)} ${config.baseSymbol}.`,
    });
    steps.push({
      title: `Bagi dengan faktor ${to.symbol}`,
      detail: `${formatNumber(baseValue)} ${config.baseSymbol} ÷ ${formatNumber(
        to.factor,
      )} = ${formatted} ${to.symbol}.`,
    });
  }

  steps.push({
    title: "Tuliskan hasil akhir",
    detail: `${formatNumber(value)} ${from.symbol} = ${formatted} ${to.symbol}.`,
  });

  return steps;
}

function ConverterBody({
  config,
  title,
  description,
  categoryName,
}: {
  config: ConversionConfig;
  title: string;
  description: string;
  categoryName: string;
}) {
  const initialForm = useMemo(
    () => ({ ...config.defaults, precision: "auto" }),
    [config],
  );
  const calculator = useCalculatorState(initialForm);

  const fromUnit = findConversionUnit(config.units, calculator.form.fromUnit);
  const toUnit = findConversionUnit(config.units, calculator.form.toUnit);
  const previewValue = convertValue(1, fromUnit, toUnit);

  const examples = useMemo(
    () =>
      config.examples.map((example) => {
        const from = findConversionUnit(config.units, example.fromUnit);
        const to = findConversionUnit(config.units, example.toUnit);
        const answer = convertValue(Number(example.value), from, to);

        return { ...example, from, to, answer };
      }),
    [config],
  );

  function handleCalculate() {
    const parsed = parseNumberInput(calculator.form.value, "Nilai");

    if (!parsed.ok) {
      calculator.setFieldErrors({
        value: parsed.error,
      });
      calculator.showError(
        "Periksa kembali nilai yang ditandai merah sebelum menghitung.",
      );
      return;
    }

    if (config.isTemperature) {
      const kelvin = convertValue(
        parsed.value,
        fromUnit,
        baseUnitOf(config),
      );

      if (kelvin < 0) {
        calculator.setFieldErrors({
          value: "Suhu tidak boleh di bawah nol mutlak (0 K).",
        });
        calculator.showError(
          "Suhu yang dimasukkan berada di bawah nol mutlak, sehingga tidak fisis.",
        );
        return;
      }
    }

    const value = parsed.value;
    const from = fromUnit;
    const to = toUnit;
    const precision = calculator.form.precision;
    const result = convertValue(value, from, to);
    const formatted = formatWithPrecision(result, precision);

    calculator.setFieldErrors({});
    calculator.run(() => {
      const base = baseUnitOf(config);
      const baseValue = convertValue(value, from, base);
      const ratio = convertValue(1, from, to);

      return (
        <div className="space-y-5">
          <ResultCard
            label={`Hasil dalam ${to.label}`}
            value={formatted}
            unit={to.symbol}
            rows={[
              {
                label: "Nilai asal",
                value: `${formatNumber(value)} ${from.symbol}`,
              },
              {
                label: config.isTemperature ? "Setara Kelvin" : "Satuan dasar",
                value: `${formatNumber(baseValue)} ${base.symbol}`,
              },
              {
                label: "Rasio",
                value: `1 ${from.symbol} = ${formatNumber(ratio)} ${to.symbol}`,
              },
            ]}
            footnote="Presisi otomatis menampilkan hingga 10 digit signifikan. Pilih 0–6 angka desimal bila hasil perlu dibulatkan untuk laporan."
          />
          <StepsList
            steps={buildSteps(config, value, from, to, result, formatted)}
          />
          <ConversionTableView
            config={config}
            value={value}
            fromUnit={from}
            precision={precision}
            targetValue={to.value}
          />
        </div>
      );
    });
  }

  function applyExample(values: {
    value: string;
    fromUnit: string;
    toUnit: string;
  }) {
    calculator.setMany({
      ...initialForm,
      value: values.value,
      fromUnit: values.fromUnit,
      toUnit: values.toUnit,
    });
  }

  return (
    <CalculatorLayout
      title={title}
      description={description}
      categoryName={categoryName}
      onCalculate={handleCalculate}
      onReset={calculator.reset}
      isCalculating={calculator.isCalculating}
      error={calculator.error}
      result={calculator.result}
      formula={
        <FormulaBlock
          tex={config.formulaTex}
          description={config.formulaDescription}
        />
      }
      variables={<VariableTable rows={config.variables} />}
      example={
        <div className="grid gap-5 lg:grid-cols-2">
          {examples.map((example) => (
            <ExampleBlock
              key={example.problem}
              problem={example.problem}
              detail={
                <>
                  {example.note ? `${example.note} ` : ""}
                  <span className="font-medium">
                    {example.value} {example.from.symbol} ={" "}
                    {formatNumber(example.answer)} {example.to.symbol}.
                  </span>
                </>
              }
              answer={`${formatNumber(example.answer)} ${example.to.symbol}`}
              onUse={() =>
                applyExample({
                  value: example.value,
                  fromUnit: example.from.value,
                  toUnit: example.to.value,
                })
              }
            />
          ))}
        </div>
      }
      notes={<GuidanceBlock mistakes={config.mistakes} tips={config.tips} />}
    >
      <NumberField
        id="konversi-nilai"
        label="Nilai yang dikonversi"
        value={calculator.form.value}
        onChange={(value) => calculator.setField("value", value)}
        error={calculator.errors.value}
        hint={
          config.isTemperature
            ? "Boleh negatif, contoh: -40"
            : "Boleh desimal, contoh: 12,5"
        }
        placeholder="Contoh: 12,5"
      />

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end">
        <SelectField
          id="konversi-dari"
          label="Dari satuan"
          value={calculator.form.fromUnit}
          onChange={(value) => calculator.setField("fromUnit", value)}
          options={config.units.map((unit) => ({
            value: unit.value,
            label: unit.label,
          }))}
        />
        <button
          type="button"
          onClick={() =>
            calculator.setMany({
              ...calculator.form,
              fromUnit: calculator.form.toUnit,
              toUnit: calculator.form.fromUnit,
            })
          }
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          aria-label="Tukar satuan asal dan tujuan"
        >
          <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
          Tukar
        </button>
        <SelectField
          id="konversi-ke"
          label="Ke satuan"
          value={calculator.form.toUnit}
          onChange={(value) => calculator.setField("toUnit", value)}
          options={config.units.map((unit) => ({
            value: unit.value,
            label: unit.label,
          }))}
        />
      </div>

      <p className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-3.5 py-2.5 text-sm text-slate-700">
        <span className="font-semibold text-indigo-700">Pratinjau: </span>1{" "}
        {fromUnit.symbol} = {formatNumber(previewValue)} {toUnit.symbol}
      </p>

      <SelectField
        id="konversi-presisi"
        label="Presisi hasil"
        value={calculator.form.precision}
        onChange={(value) => calculator.setField("precision", value)}
        options={PRECISION_OPTIONS}
        hint="Pilih otomatis untuk nilai lengkap, atau bulatkan sesuai kebutuhan laporan."
      />
    </CalculatorLayout>
  );
}

export default function UnitConverterCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
  slug?: string;
}) {
  const config = getConversionConfig(props.slug ?? "");

  if (!config) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <p className="text-sm font-semibold text-rose-800">
          Konfigurasi konversi tidak ditemukan
        </p>
        <p className="mt-1 text-sm text-rose-700">
          Kalkulator konversi ini belum memiliki data satuan. Silakan kembali ke
          daftar kalkulator.
        </p>
      </div>
    );
  }

  return (
    <ConverterBody
      config={config}
      title={props.title}
      description={props.description}
      categoryName={props.categoryName}
    />
  );
}
