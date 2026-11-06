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
import { formatNumber } from "@/lib/format";
import { nthRoot, power } from "@/lib/math/power";
import { validateNumberFields } from "@/lib/validation";

type PowerMode = "power" | "root";

const INITIAL = {
  mode: "power" as PowerMode,
  base: "",
  exponent: "",
  radicand: "",
  index: "",
};

const MODE_OPTIONS = [
  { value: "power", label: "Pangkat (aⁿ)" },
  { value: "root", label: "Akar (ⁿ√a)" },
];

export default function PangkatAkarCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);
  const mode = calculator.form.mode;

  function handleCalculate() {
    if (mode === "power") {
      const { values, errors, hasErrors } = validateNumberFields(
        { base: calculator.form.base, exponent: calculator.form.exponent },
        {
          base: { label: "Bilangan pokok" },
          exponent: { label: "Pangkat" },
        },
      );

      if (hasErrors) {
        calculator.setFieldErrors(errors);
        calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
        return;
      }

      calculator.setFieldErrors({});
      calculator.run(() => {
        const result = power(values.base, values.exponent);

        return (
          <div className="space-y-5">
            <ResultCard
              label="Hasil pangkat"
              value={formatNumber(result)}
              rows={[
                { label: "Bilangan pokok", value: formatNumber(values.base) },
                { label: "Pangkat", value: formatNumber(values.exponent) },
              ]}
            />
            <StepsList
              steps={[
                {
                  title: "Substitusi ke rumus",
                  detail: `${formatNumber(values.base)}^${formatNumber(values.exponent)}`,
                },
                {
                  title: "Hitung hasil",
                  detail:
                    values.exponent < 0
                      ? `Pangkat negatif berarti kebalikan: 1 ÷ ${formatNumber(values.base)}^{${formatNumber(Math.abs(values.exponent))}} = ${formatNumber(result)}.`
                      : `${formatNumber(values.base)} dipangkatkan ${formatNumber(values.exponent)} menghasilkan ${formatNumber(result)}.`,
                },
              ]}
            />
          </div>
        );
      });
      return;
    }

    const { values, errors, hasErrors } = validateNumberFields(
      { radicand: calculator.form.radicand, index: calculator.form.index },
      {
        radicand: { label: "Bilangan yang diakar" },
        index: { label: "Indeks akar", rule: "positive-integer" },
      },
    );

    const nextErrors = { ...errors };

    if (!nextErrors.index && values.index === 1) {
      nextErrors.index = "Indeks akar minimal 2.";
    }

    if (hasErrors || Object.keys(nextErrors).length > 0) {
      calculator.setFieldErrors(nextErrors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      const result = nthRoot(values.radicand, values.index);

      return (
        <div className="space-y-5">
          <ResultCard
            label="Hasil akar"
            value={formatNumber(result)}
            rows={[
              { label: "Bilangan", value: formatNumber(values.radicand) },
              { label: "Indeks akar", value: formatNumber(values.index) },
              {
                label: "Uji balik",
                value: `${formatNumber(result)}^{${formatNumber(values.index)}} = ${formatNumber(power(result, values.index))}`,
              },
            ]}
          />
          <StepsList
            steps={[
              {
                title: "Substitusi ke bentuk akar",
                detail: `ⁿ√${formatNumber(values.radicand)} dengan n = ${formatNumber(values.index)}`,
              },
              {
                title: "Ubah ke bentuk pangkat",
                detail: `${formatNumber(values.radicand)}^{1/${formatNumber(values.index)}}`,
              },
              {
                title: "Hitung hasil",
                detail:
                  values.radicand < 0
                    ? `Indeks ganjil pada bilangan negatif menghasilkan akar negatif: ${formatNumber(result)}.`
                    : `Akar ${formatNumber(values.index)} dari ${formatNumber(values.radicand)} adalah ${formatNumber(result)}.`,
              },
            ]}
          />
        </div>
      );
    });
  }

  const powerExample = power(2, 10);
  const rootExample = nthRoot(27, 3);

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
a^n &= \underbrace{a\times a\times\cdots\times a}_{n\text{ faktor}}\\
\sqrt[n]{a} &= a^{1/n}, \qquad n\geq 2
\end{aligned}`}
          description="Untuk akar berindeks genap, bilangan di bawah akar tidak boleh negatif. Akar berindeks ganjil dari bilangan negatif menghasilkan bilangan real negatif."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "a", name: "Bilangan pokok atau bilangan yang diakar", note: "Bilangan real" },
            { symbol: "n", name: "Pangkat atau indeks akar", note: "Indeks akar harus bilangan bulat minimal 2" },
            { symbol: "hasil", name: "Hasil perhitungan", note: "Nilai real" },
          ]}
        />
      }
      example={
        mode === "power" ? (
          <ExampleBlock
            problem="Hitung 2¹⁰."
            detail="Kalikan angka 2 sebanyak 10 faktor: 2 × 2 × … × 2."
            answer={formatNumber(powerExample)}
          />
        ) : (
          <ExampleBlock
            problem="Hitung akar pangkat tiga dari 27 (∛27)."
            detail="Cari bilangan yang jika dipangkatkan 3 menghasilkan 27. Bilangan itu adalah 3 karena 3³ = 27."
            answer={formatNumber(rootExample)}
          />
        )
      }
    >
      <SelectField
        id="pangkat-mode"
        label="Jenis perhitungan"
        value={mode}
        onChange={(value) => calculator.setField("mode", value as PowerMode)}
        options={MODE_OPTIONS}
      />

      {mode === "power" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="pangkat-base"
            label="Bilangan pokok (a)"
            value={calculator.form.base}
            onChange={(value) => calculator.setField("base", value)}
            error={calculator.errors.base}
            hint="Contoh: 2"
          />
          <NumberField
            id="pangkat-exponent"
            label="Pangkat (n)"
            value={calculator.form.exponent}
            onChange={(value) => calculator.setField("exponent", value)}
            error={calculator.errors.exponent}
            hint="Boleh negatif atau desimal"
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="akar-radicand"
            label="Bilangan yang diakar (a)"
            value={calculator.form.radicand}
            onChange={(value) => calculator.setField("radicand", value)}
            error={calculator.errors.radicand}
            hint="Contoh: 27"
          />
          <NumberField
            id="akar-index"
            label="Indeks akar (n)"
            value={calculator.form.index}
            onChange={(value) => calculator.setField("index", value)}
            error={calculator.errors.index}
            hint="Bilangan bulat ≥ 2, misalnya 2 atau 3"
          />
        </div>
      )}
    </CalculatorLayout>
  );
}
