"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { NumberField } from "@/components/calculator/NumberField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { StepsList } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { formatNumber } from "@/lib/format";
import { logarithm } from "@/lib/math/logarithm";
import { validateNumberFields } from "@/lib/validation";

const INITIAL = { value: "", base: "" };

export default function LogaritmaCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);

  function handleCalculate() {
    const { values, errors, hasErrors } = validateNumberFields(
      { value: calculator.form.value, base: calculator.form.base },
      {
        value: { label: "Nilai (x)", rule: "positive" },
        base: { label: "Basis (b)", rule: "positive" },
      },
    );

    const nextErrors = { ...errors };

    if (!nextErrors.base && values.base === 1) {
      nextErrors.base = "Basis tidak boleh 1 karena logaritma basis 1 tidak terdefinisi.";
    }

    if (hasErrors || Object.keys(nextErrors).length > 0) {
      calculator.setFieldErrors(nextErrors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      const result = logarithm(values.value, values.base);
      const lnValue = Math.log(values.value);
      const lnBase = Math.log(values.base);

      return (
        <div className="space-y-5">
          <ResultCard
            label="Hasil logaritma"
            value={formatNumber(result)}
            rows={[
              { label: `⁽${formatNumber(values.base)}⁾log ${formatNumber(values.value)}`, value: formatNumber(result) },
              { label: "ln x", value: formatNumber(lnValue) },
              { label: "ln b", value: formatNumber(lnBase) },
            ]}
          />
          <StepsList
            steps={[
              {
                title: "Periksa domain",
                detail: `x = ${formatNumber(values.value)} > 0 dan basis b = ${formatNumber(values.base)} > 0, b ≠ 1. Domain terpenuhi.`,
              },
              {
                title: "Gunakan perubahan basis",
                detail: `⁽ᵇ⁾log x = ln x ÷ ln b`,
              },
              {
                title: "Substitusi nilai",
                detail: `ln ${formatNumber(values.value)} = ${formatNumber(lnValue)} dan ln ${formatNumber(values.base)} = ${formatNumber(lnBase)}`,
              },
              {
                title: "Hitung hasil bagi",
                detail: `${formatNumber(lnValue)} ÷ ${formatNumber(lnBase)} = ${formatNumber(result)}`,
              },
            ]}
          />
        </div>
      );
    });
  }

  const exampleResult = logarithm(32, 2);

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
          tex={String.raw`^{b}\log x = \frac{\ln x}{\ln b}`}
          description="Basis bebas, dengan syarat x > 0, b > 0, dan b ≠ 1. Hasil dihitung menggunakan perubahan basis ke logaritma natural."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "x", name: "Nilai logaritma", note: "Harus lebih dari 0" },
            { symbol: "b", name: "Basis", note: "Harus lebih dari 0 dan tidak sama dengan 1" },
            { symbol: "ln", name: "Logaritma natural", note: "Logaritma dengan basis e" },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem="Hitung log₂ 32."
          detail={`Dengan perubahan basis: ln 32 ÷ ln 2 = ${formatNumber(Math.log(32))} ÷ ${formatNumber(Math.log(2))}.`}
          answer={formatNumber(exampleResult)}
        />
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="log-value"
          label="Nilai (x)"
          value={calculator.form.value}
          onChange={(value) => calculator.setField("value", value)}
          error={calculator.errors.value}
          hint="Harus lebih dari 0, contoh: 32"
        />
        <NumberField
          id="log-base"
          label="Basis (b)"
          value={calculator.form.base}
          onChange={(value) => calculator.setField("base", value)}
          error={calculator.errors.base}
          hint="Contoh: 2 atau 10. Tidak boleh 1."
        />
      </div>
    </CalculatorLayout>
  );
}
