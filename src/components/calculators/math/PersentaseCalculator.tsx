"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { NumberField } from "@/components/calculator/NumberField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { formatNumber, formatPercent } from "@/lib/format";
import {
  percentChange,
  percentDifference,
  percentOf,
} from "@/lib/math/percentage";
import { validateNumberFields } from "@/lib/validation";

type PercentageMode = "of" | "change" | "difference";

const INITIAL = {
  mode: "of" as PercentageMode,
  primary: "",
  secondary: "",
};

const MODE_OPTIONS = [
  { value: "of", label: "Persen dari angka" },
  { value: "change", label: "Perubahan persen" },
  { value: "difference", label: "Selisih persen" },
];

export default function PersentaseCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  const labels =
    mode === "of"
      ? { primary: "Persentase", secondary: "Angka" }
      : mode === "change"
        ? { primary: "Nilai awal", secondary: "Nilai akhir" }
        : { primary: "Nilai pertama", secondary: "Nilai kedua" };

  function handleCalculate() {
    const { values, errors, hasErrors } = validateNumberFields(
      {
        primary: calculator.form.primary,
        secondary: calculator.form.secondary,
      },
      {
        primary: { label: labels.primary },
        secondary: { label: labels.secondary },
      },
    );

    if (hasErrors) {
      calculator.setFieldErrors(errors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      if (mode === "of") {
        const result = percentOf(values.primary, values.secondary);
        const decimal = values.primary / 100;

        return (
          <div className="space-y-5">
            <ResultCard
              label="Hasil"
              value={formatNumber(result)}
              rows={[
                { label: "Persentase", value: formatPercent(values.primary) },
                { label: "Angka awal", value: formatNumber(values.secondary) },
              ]}
            />
            <StepsList
              steps={[
                {
                  title: "Ubah persen menjadi desimal",
                  detail: `${formatNumber(values.primary)}% ÷ 100 = ${formatNumber(decimal)}`,
                },
                {
                  title: "Kalikan dengan angka",
                  detail: `${formatNumber(decimal)} × ${formatNumber(values.secondary)} = ${formatNumber(result)}`,
                },
              ]}
            />
          </div>
        );
      }

      if (mode === "change") {
        const result = percentChange(values.primary, values.secondary);
        const difference = values.secondary - values.primary;

        return (
          <div className="space-y-5">
            <ResultCard
              label={result >= 0 ? "Kenaikan" : "Penurunan"}
              value={formatPercent(Math.abs(result))}
              rows={[
                { label: "Nilai awal", value: formatNumber(values.primary) },
                { label: "Nilai akhir", value: formatNumber(values.secondary) },
                {
                  label: "Arah perubahan",
                  value: result >= 0 ? "Naik" : "Turun",
                },
              ]}
              footnote={`Perubahan bertanda: ${formatPercent(result)}`}
            />
            <StepsList
              steps={[
                {
                  title: "Hitung selisih",
                  detail: `${formatNumber(values.secondary)} − ${formatNumber(values.primary)} = ${formatNumber(difference)}`,
                },
                {
                  title: "Bagi dengan nilai awal absolut",
                  detail: `${formatNumber(difference)} ÷ |${formatNumber(values.primary)}| = ${formatNumber(difference / Math.abs(values.primary))}`,
                },
                {
                  title: "Kalikan 100 untuk persen",
                  detail: `${formatNumber(difference / Math.abs(values.primary))} × 100 = ${formatPercent(result)}`,
                },
              ]}
            />
          </div>
        );
      }

      const result = percentDifference(values.primary, values.secondary);
      const average =
        (Math.abs(values.primary) + Math.abs(values.secondary)) / 2;
      const difference = Math.abs(values.primary - values.secondary);

      return (
        <div className="space-y-5">
          <ResultCard
            label="Selisih persen"
            value={formatPercent(result)}
            rows={[
              { label: "Nilai pertama", value: formatNumber(values.primary) },
              { label: "Nilai kedua", value: formatNumber(values.secondary) },
              { label: "Rata-rata absolut", value: formatNumber(average) },
            ]}
          />
          <StepsList
            steps={[
              {
                title: "Hitung selisih absolut",
                detail: `|${formatNumber(values.primary)} − ${formatNumber(values.secondary)}| = ${formatNumber(difference)}`,
              },
              {
                title: "Hitung rata-rata kedua nilai",
                detail: `(|${formatNumber(values.primary)}| + |${formatNumber(values.secondary)}|) ÷ 2 = ${formatNumber(average)}`,
              },
              {
                title: "Bagi selisih dengan rata-rata",
                detail: `${formatNumber(difference)} ÷ ${formatNumber(average)} = ${formatNumber(difference / average)}`,
              },
              {
                title: "Kalikan 100",
                detail: `${formatNumber(difference / average)} × 100 = ${formatPercent(result)}`,
              },
            ]}
          />
        </div>
      );
    });
  }

  const example = (() => {
    if (mode === "of") {
      const result = percentOf(15, 200000);
      return {
        problem: "Berapa 15% dari Rp200.000?",
        detail: "15% diubah menjadi 0,15 lalu dikalikan dengan 200.000.",
        answer: formatNumber(result),
      };
    }

    if (mode === "change") {
      const result = percentChange(200, 250);
      return {
        problem: "Nilai naik dari 200 menjadi 250. Berapa perubahan persennya?",
        detail: "Selisih 50 dibagi nilai awal 200, lalu dikalikan 100.",
        answer: formatPercent(result),
      };
    }

    const result = percentDifference(200, 250);
    return {
      problem: "Berapa selisih persen antara 200 dan 250?",
      detail: "Selisih absolut 50 dibagi rata-rata 225, lalu dikalikan 100.",
      answer: formatPercent(result),
    };
  })();

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
          tex={String.raw`\begin{aligned}
\text{Persentase dari angka} &= \frac{p}{100}\times n\\
\text{Perubahan persen} &= \frac{n_{\text{akhir}}-n_{\text{awal}}}{|n_{\text{awal}}|}\times 100\%\\
\text{Selisih persen} &= \frac{|a-b|}{(|a|+|b|)/2}\times 100\%
\end{aligned}`}
          description="Pilih jenis perhitungan. Untuk perubahan persen, nilai awal tidak boleh 0. Untuk selisih persen, kedua nilai tidak boleh sama-sama 0."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "p", name: "Persentase", unit: "%", note: "Bagian per seratus" },
            { symbol: "n", name: "Angka atau nilai", note: "Nilai dasar yang dihitung" },
            { symbol: "a, b", name: "Dua nilai", note: "Untuk selisih persen" },
            {
              symbol: "n_awal",
              name: "Nilai awal",
              note: "Tidak boleh 0 pada perubahan persen",
            },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem={example.problem}
          detail={example.detail}
          answer={example.answer}
        />
      }
    >
      <SelectField
        id="persentase-mode"
        label="Jenis perhitungan"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as PercentageMode)}
        options={MODE_OPTIONS}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="persentase-primary"
          label={labels.primary}
          value={calculator.form.primary}
          onChange={(value) => calculator.setField("primary", value)}
          error={calculator.errors.primary}
          unit={mode === "of" ? "%" : undefined}
          hint={
            mode === "of"
              ? "Contoh: 15 untuk 15%"
              : mode === "change"
                ? "Contoh: 200"
                : "Contoh: 200"
          }
        />
        <NumberField
          id="persentase-secondary"
          label={labels.secondary}
          value={calculator.form.secondary}
          onChange={(value) => calculator.setField("secondary", value)}
          error={calculator.errors.secondary}
          hint={
            mode === "of"
              ? "Contoh: 200000"
              : mode === "change"
                ? "Contoh: 250"
                : "Contoh: 250"
          }
        />
      </div>
    </CalculatorLayout>
  );
}
