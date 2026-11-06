"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { GuidanceBlock } from "@/components/calculator/GuidanceBlock";
import { NumberField } from "@/components/calculator/NumberField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField } from "@/components/calculator/SelectField";
import { StepsList } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import {
  BASIC_OPERATORS,
  basicArithmetic,
  operatorSymbol,
  type BasicOperator,
} from "@/lib/math/arithmetic";
import { formatNumber } from "@/lib/format";
import { validateNumberFields } from "@/lib/validation";

const INITIAL = { a: "", b: "", operator: "+" };

export default function DasarCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);

  function handleCalculate() {
    const { values, errors, hasErrors } = validateNumberFields(
      { a: calculator.form.a, b: calculator.form.b },
      {
        a: { label: "Angka pertama" },
        b: { label: "Angka kedua" },
      },
    );

    const operator = calculator.form.operator as BasicOperator;
    const nextErrors = { ...errors };

    if (
      !nextErrors.b &&
      (operator === "÷" || operator === "/") &&
      values.b === 0
    ) {
      nextErrors.b = "Pembagi tidak boleh 0 (pembagian dengan nol tidak terdefinisi).";
    }

    if (hasErrors || nextErrors.b) {
      calculator.setFieldErrors(nextErrors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      const result = basicArithmetic(values.a, values.b, operator);
      const symbol = operatorSymbol(operator);

      return (
        <div className="space-y-5">
          <ResultCard
            label={`Hasil ${symbol}`}
            value={formatNumber(result)}
            rows={[
              { label: "Angka pertama", value: formatNumber(values.a) },
              { label: "Angka kedua", value: formatNumber(values.b) },
              { label: "Operasi", value: symbol },
            ]}
          />
          <StepsList
            steps={[
              {
                title: "Tulis operasi",
                detail: `${formatNumber(values.a)} ${symbol} ${formatNumber(values.b)}`,
              },
              {
                title: "Lakukan operasi",
                detail:
                  operator === "÷" || operator === "/"
                    ? `${formatNumber(values.a)} dibagi ${formatNumber(values.b)}. Pembagi bukan nol, sehingga operasi valid.`
                    : `Operasi ${symbol === "+" ? "penjumlahan" : symbol === "-" ? "pengurangan" : "perkalian"} diterapkan pada kedua angka.`,
              },
              {
                title: "Hasil akhir",
                detail: `${formatNumber(values.a)} ${symbol} ${formatNumber(values.b)} = ${formatNumber(result)}`,
              },
            ]}
          />
        </div>
      );
    });
  }

  const exampleSum = basicArithmetic(12.5, 7.5, "+");
  const exampleDivision = basicArithmetic(18, 6, "÷");
  const exampleProduct = basicArithmetic(7, 8, "×");

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
a + b &= c\\
a - b &= c\\
a \times b &= c\\
a \div b &= c \qquad (b \neq 0)
\end{aligned}`}
          description="Pilih operasi, masukkan dua angka, lalu tekan HITUNG. Pembagian dengan nol akan ditolak dengan pesan yang jelas."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "a", name: "Angka pertama", note: "Bilangan yang dioperasikan" },
            { symbol: "b", name: "Angka kedua", note: "Bilangan pembagi, pengurang, atau pengali" },
            { symbol: "c", name: "Hasil", note: "Hasil operasi aritmatika" },
          ]}
        />
      }
      example={
        <div className="grid gap-4 md:grid-cols-2">
          <ExampleBlock
            problem="Hitung 12,5 + 7,5."
            detail="Angka pertama 12,5 dan angka kedua 7,5 dijumlahkan menggunakan operasi penjumlahan."
            answer={formatNumber(exampleSum)}
            onUse={() =>
              calculator.setMany({ ...INITIAL, a: "12.5", b: "7.5", operator: "+" })
            }
          />
          <ExampleBlock
            problem="Hitung 18 ÷ 6."
            detail="Pembagian valid karena pembagi 6 bukan nol."
            answer={formatNumber(exampleDivision)}
            onUse={() =>
              calculator.setMany({ ...INITIAL, a: "18", b: "6", operator: "÷" })
            }
          />
          <ExampleBlock
            problem="Hitung 7 × 8."
            detail="Perkalian diterapkan pada kedua angka untuk memperoleh hasil."
            answer={formatNumber(exampleProduct)}
            onUse={() =>
              calculator.setMany({ ...INITIAL, a: "7", b: "8", operator: "×" })
            }
          />
        </div>
      }
      notes={
        <GuidanceBlock
          mistakes={[
            "Membagi dengan nol. Pembagian seperti 5 ÷ 0 tidak terdefinisi, bukan 0 atau tak hingga.",
            "Mengabaikan urutan operasi saat menggabungkan beberapa perhitungan. Hitung isi tanda kurung lebih dahulu.",
            "Membulatkan hasil antara terlalu awal, sehingga hasil akhir bergeser dari nilai sebenarnya.",
            "Menganggap hasil pembagian selalu bilangan bulat, padahal hasilnya bisa desimal atau pecahan.",
          ]}
          tips={[
            "Periksa hasil dengan operasi kebalikan, misalnya penjumlahan dengan pengurangan atau perkalian dengan pembagian.",
            "Gunakan tanda kurung ketika ragu tentang urutan operasi.",
            "Desimal boleh ditulis dengan koma atau titik; kalkulator menormalkan keduanya.",
          ]}
        />
      }
    >
      <SelectField
        id="dasar-operator"
        label="Operasi"
        value={calculator.form.operator}
        onChange={(value) => calculator.setField("operator", value)}
        options={BASIC_OPERATORS.map((operation) => ({
          value: operation.value,
          label: operation.label,
        }))}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="dasar-a"
          label="Angka pertama"
          value={calculator.form.a}
          onChange={(value) => calculator.setField("a", value)}
          error={calculator.errors.a}
          placeholder="Contoh: 12,5"
        />
        <NumberField
          id="dasar-b"
          label="Angka kedua"
          value={calculator.form.b}
          onChange={(value) => calculator.setField("b", value)}
          error={calculator.errors.b}
          placeholder="Contoh: 7,5"
        />
      </div>
    </CalculatorLayout>
  );
}
