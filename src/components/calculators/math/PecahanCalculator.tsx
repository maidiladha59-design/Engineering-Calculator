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
import {
  addFractions,
  fractionToDecimal,
  fractionToMixed,
  fractionToText,
  gcd,
  mixedToText,
  operateFractions,
  type Fraction,
  type FractionOperator,
} from "@/lib/math/fraction";
import { validateNumberFields } from "@/lib/validation";

const INITIAL = {
  numerator1: "",
  denominator1: "",
  numerator2: "",
  denominator2: "",
  operator: "+" as FractionOperator,
};

const OPERATORS = [
  { value: "+", label: "Penjumlahan (+)" },
  { value: "-", label: "Pengurangan (−)" },
  { value: "×", label: "Perkalian (×)" },
  { value: "÷", label: "Pembagian (÷)" },
];

export default function PecahanCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);

  function handleCalculate() {
    const { values, errors, hasErrors } = validateNumberFields(
      {
        numerator1: calculator.form.numerator1,
        denominator1: calculator.form.denominator1,
        numerator2: calculator.form.numerator2,
        denominator2: calculator.form.denominator2,
      },
      {
        numerator1: { label: "Pembilang 1", rule: "integer" },
        denominator1: { label: "Penyebut 1", rule: "integer" },
        numerator2: { label: "Pembilang 2", rule: "integer" },
        denominator2: { label: "Penyebut 2", rule: "integer" },
      },
    );

    const operator = calculator.form.operator;
    const nextErrors = { ...errors };

    if (!nextErrors.denominator1 && values.denominator1 === 0) {
      nextErrors.denominator1 = "Penyebut tidak boleh 0.";
    }

    if (!nextErrors.denominator2 && values.denominator2 === 0) {
      nextErrors.denominator2 = "Penyebut tidak boleh 0.";
    }

    if (
      !nextErrors.numerator2 &&
      operator === "÷" &&
      values.numerator2 === 0
    ) {
      nextErrors.numerator2 =
        "Pembilang pecahan kedua tidak boleh 0 saat membagi.";
    }

    if (hasErrors || Object.keys(nextErrors).length > 0) {
      calculator.setFieldErrors(nextErrors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      const fractionA: Fraction = {
        numerator: values.numerator1,
        denominator: values.denominator1,
      };
      const fractionB: Fraction = {
        numerator: values.numerator2,
        denominator: values.denominator2,
      };
      const result = operateFractions(fractionA, fractionB, operator);

      let rawNumerator = 0;
      let rawDenominator = 1;

      if (operator === "+" || operator === "-") {
        rawNumerator =
          operator === "+"
            ? values.numerator1 * values.denominator2 +
              values.numerator2 * values.denominator1
            : values.numerator1 * values.denominator2 -
              values.numerator2 * values.denominator1;
        rawDenominator = values.denominator1 * values.denominator2;
      } else if (operator === "×") {
        rawNumerator = values.numerator1 * values.numerator2;
        rawDenominator = values.denominator1 * values.denominator2;
      } else {
        rawNumerator = values.numerator1 * values.denominator2;
        rawDenominator = values.denominator1 * values.numerator2;
      }

      if (rawDenominator < 0) {
        rawNumerator = -rawNumerator;
        rawDenominator = -rawDenominator;
      }

      const rawGcd = gcd(rawNumerator, rawDenominator);
      const mixed = fractionToMixed(result);
      const isImproper =
        Math.abs(result.numerator) > result.denominator && result.denominator !== 1;

      const rows = [
        {
          label: "Desimal",
          value: formatNumber(fractionToDecimal(result)),
        },
        { label: "Operasi", value: operator },
      ];

      if (isImproper) {
        rows.push({ label: "Bentuk campuran", value: mixedToText(result) });
      }

      const operationSteps = [
        {
          title: "Tulis operasi pecahan",
          detail: `${values.numerator1}/${values.denominator1} ${operator} ${values.numerator2}/${values.denominator2}`,
        },
      ];

      if (operator === "+" || operator === "-") {
        operationSteps.push({
          title: "Samakan penyebut",
          detail: `Penyebut bersama = ${values.denominator1} × ${values.denominator2} = ${rawDenominator}. Pembilang menjadi ${values.numerator1}×${values.denominator2} ${operator} ${values.numerator2}×${values.denominator1} = ${rawNumerator}.`,
        });
      } else if (operator === "×") {
        operationSteps.push({
          title: "Kalikan pembilang dan penyebut",
          detail: `Pembilang: ${values.numerator1} × ${values.numerator2} = ${rawNumerator}. Penyebut: ${values.denominator1} × ${values.denominator2} = ${rawDenominator}.`,
        });
      } else {
        operationSteps.push({
          title: "Balik pecahan kedua lalu kalikan",
          detail: `${values.numerator2}/${values.denominator2} dibalik menjadi ${values.denominator2}/${values.numerator2}. Hasil: ${values.numerator1}×${values.denominator2} / (${values.denominator1}×${values.numerator2}) = ${rawNumerator}/${rawDenominator}.`,
        });
      }

      operationSteps.push({
        title: "Sederhanakan dengan FPB",
        detail:
          rawGcd > 1
            ? `FPB dari ${Math.abs(rawNumerator)} dan ${Math.abs(rawDenominator)} adalah ${rawGcd}. Bagi keduanya: ${rawNumerator}÷${rawGcd} / ${rawDenominator}÷${rawGcd} = ${fractionToText(result)}.`
            : `FPB dari ${Math.abs(rawNumerator)} dan ${Math.abs(rawDenominator)} adalah 1, sehingga ${fractionToText(result)} sudah paling sederhana.`,
      });

      if (isImproper) {
        operationSteps.push({
          title: "Ubah ke pecahan campuran",
          detail: `${fractionToText(result)} = ${mixed.whole} ${mixed.numerator}/${mixed.denominator}.`,
        });
      }

      return (
        <div className="space-y-5">
          <ResultCard
            label="Hasil"
            value={fractionToText(result)}
            rows={rows}
            footnote={`Bentuk paling sederhana: ${fractionToText(result)}`}
          />
          <StepsList steps={operationSteps} />
        </div>
      );
    });
  }

  const exampleA: Fraction = { numerator: 1, denominator: 2 };
  const exampleB: Fraction = { numerator: 1, denominator: 3 };
  const exampleResult = addFractions(exampleA, exampleB);

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
\frac{a}{b}+\frac{c}{d} &= \frac{ad+bc}{bd}\\
\frac{a}{b}-\frac{c}{d} &= \frac{ad-bc}{bd}\\
\frac{a}{b}\times\frac{c}{d} &= \frac{ac}{bd}\\
\frac{a}{b}\div\frac{c}{d} &= \frac{ad}{bc}\qquad (c\neq 0)
\end{aligned}`}
          description="Penyebut tidak boleh 0. Hasil selalu disederhanakan menggunakan FPB, dan pecahan tidak wajar juga ditampilkan dalam bentuk campuran."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "a, c", name: "Pembilang", note: "Bilangan bulat di atas garis pecahan" },
            { symbol: "b, d", name: "Penyebut", note: "Bilangan bulat, tidak boleh 0" },
            { symbol: "FPB", name: "Faktor persekutuan terbesar", note: "Dipakai untuk menyederhanakan hasil" },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem="Hitung 1/2 + 1/3."
          detail={`Penyebut bersama 6: 1/2 = 3/6 dan 1/3 = 2/6. Maka 3/6 + 2/6 = 5/6.`}
          answer={`${fractionToText(exampleResult)} (${formatNumber(fractionToDecimal(exampleResult))})`}
        />
      }
    >
      <SelectField
        id="pecahan-operator"
        label="Operasi"
        value={calculator.form.operator}
        onChange={(value) =>
          calculator.setField("operator", value as FractionOperator)
        }
        options={OPERATORS}
      />

      <div>
        <p className="text-sm font-semibold text-slate-800">Pecahan pertama</p>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <NumberField
            id="pecahan-num1"
            label="Pembilang (a)"
            value={calculator.form.numerator1}
            onChange={(value) => calculator.setField("numerator1", value)}
            error={calculator.errors.numerator1}
            hint="Contoh: 1"
          />
          <NumberField
            id="pecahan-den1"
            label="Penyebut (b)"
            value={calculator.form.denominator1}
            onChange={(value) => calculator.setField("denominator1", value)}
            error={calculator.errors.denominator1}
            hint="Tidak boleh 0"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">Pecahan kedua</p>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <NumberField
            id="pecahan-num2"
            label="Pembilang (c)"
            value={calculator.form.numerator2}
            onChange={(value) => calculator.setField("numerator2", value)}
            error={calculator.errors.numerator2}
            hint="Contoh: 1"
          />
          <NumberField
            id="pecahan-den2"
            label="Penyebut (d)"
            value={calculator.form.denominator2}
            onChange={(value) => calculator.setField("denominator2", value)}
            error={calculator.errors.denominator2}
            hint="Tidak boleh 0"
          />
        </div>
      </div>
    </CalculatorLayout>
  );
}
