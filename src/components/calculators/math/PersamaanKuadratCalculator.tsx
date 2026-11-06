"use client";

import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { GuidanceBlock } from "@/components/calculator/GuidanceBlock";
import { NumberField } from "@/components/calculator/NumberField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { StepsList } from "@/components/calculator/StepsList";
import { VariableTable } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import { formatNumber } from "@/lib/format";
import {
  solveQuadratic,
  type ComplexRoot,
  type QuadraticSolution,
} from "@/lib/math/quadratic";
import { validateNumberFields } from "@/lib/validation";

const INITIAL = { a: "", b: "", c: "" };

function rootText(root: ComplexRoot): string {
  if (root.imaginary === 0) {
    return formatNumber(root.real);
  }

  const sign = root.imaginary >= 0 ? "+" : "−";
  return `${formatNumber(root.real)} ${sign} ${formatNumber(Math.abs(root.imaginary))}i`;
}

function rootsDescription(solution: QuadraticSolution): string {
  if (solution.kind === "two-real") {
    return `x₁ = ${rootText(solution.roots[0])},  x₂ = ${rootText(solution.roots[1])}`;
  }

  if (solution.kind === "one-real") {
    return `x₁ = x₂ = ${rootText(solution.roots[0])}`;
  }

  return `x₁ = ${rootText(solution.roots[0])},  x₂ = ${rootText(solution.roots[1])}`;
}

function rootKindLabel(solution: QuadraticSolution): string {
  if (solution.kind === "two-real") return "Dua akar real berbeda (D > 0)";
  if (solution.kind === "one-real") return "Akar real kembar (D = 0)";
  return "Dua akar kompleks konjugat (D < 0)";
}

export default function PersamaanKuadratCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);

  function handleCalculate() {
    const { values, errors, hasErrors } = validateNumberFields(
      {
        a: calculator.form.a,
        b: calculator.form.b,
        c: calculator.form.c,
      },
      {
        a: { label: "Koefisien a", rule: "non-zero" },
        b: { label: "Koefisien b" },
        c: { label: "Konstanta c" },
      },
    );

    if (hasErrors) {
      calculator.setFieldErrors(errors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      const solution = solveQuadratic(values.a, values.b, values.c);

      const steps = [
        {
          title: "Tulis koefisien",
          detail: `a = ${formatNumber(values.a)}, b = ${formatNumber(values.b)}, c = ${formatNumber(values.c)}`,
        },
        {
          title: "Hitung diskriminan",
          detail: `D = b² − 4ac = (${formatNumber(values.b)})² − 4(${formatNumber(values.a)})(${formatNumber(values.c)}) = ${formatNumber(solution.discriminant)}`,
        },
        {
          title: "Tentukan jenis akar",
          detail:
            solution.kind === "two-real"
              ? "D > 0, sehingga ada dua akar real berbeda."
              : solution.kind === "one-real"
                ? "D = 0, sehingga kedua akar real sama."
                : "D < 0, sehingga akar berupa bilangan kompleks konjugat.",
        },
      ];

      if (solution.kind === "complex") {
        steps.push({
          title: "Hitung akar kompleks",
          detail: `√D = √(${formatNumber(solution.discriminant)}) = ${formatNumber(Math.sqrt(-solution.discriminant))}i. Rumus abc menghasilkan x = ${rootText(solution.roots[0])} dan x = ${rootText(solution.roots[1])}.`,
        });
      } else {
        steps.push({
          title: "Gunakan rumus abc",
          detail: `√D = ${formatNumber(solution.sqrtDiscriminant ?? 0)}. x = (−b ± √D) ÷ 2a = (${formatNumber(-values.b)} ± ${formatNumber(solution.sqrtDiscriminant ?? 0)}) ÷ ${formatNumber(2 * values.a)}.`,
        });
        steps.push({
          title: "Hitung masing-masing akar",
          detail:
            solution.kind === "one-real"
              ? `x = ${formatNumber(solution.roots[0].real)}`
              : `x₁ = ${formatNumber(solution.roots[0].real)} dan x₂ = ${formatNumber(solution.roots[1].real)}`,
        });
      }

      steps.push({
        title: "Titik puncak parabola",
        detail: `x_p = −b ÷ 2a = ${formatNumber(solution.vertex.x)}. y_p = c − b² ÷ 4a = ${formatNumber(solution.vertex.y)}. Titik puncak (${formatNumber(solution.vertex.x)}, ${formatNumber(solution.vertex.y)}).`,
      });

      return (
        <div className="space-y-5">
          <ResultCard
            label="Akar persamaan"
            value={rootsDescription(solution)}
            rows={[
              {
                label: "Diskriminan (D)",
                value: formatNumber(solution.discriminant),
              },
              { label: "Jenis akar", value: rootKindLabel(solution) },
              {
                label: "Titik puncak",
                value: `(${formatNumber(solution.vertex.x)}, ${formatNumber(solution.vertex.y)})`,
              },
              {
                label: "Sumbu simetri",
                value: `x = ${formatNumber(solution.axisOfSymmetry)}`,
              },
            ]}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const example = solveQuadratic(1, -5, 6);
  const exampleComplex = solveQuadratic(1, 2, 5);
  const exampleDouble = solveQuadratic(1, -6, 9);

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
          tex={String.raw`ax^2+bx+c=0,\quad a\neq 0`}
          description="Rumus abc: x = (−b ± √D) ÷ 2a dengan diskriminan D = b² − 4ac. Jika D negatif, akar ditulis dengan satuan imajiner i."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "a", name: "Koefisien kuadrat", note: "Tidak boleh 0" },
            { symbol: "b", name: "Koefisien linear", note: "Boleh positif, negatif, atau 0" },
            { symbol: "c", name: "Konstanta", note: "Boleh positif, negatif, atau 0" },
            { symbol: "D", name: "Diskriminan", unit: "—", note: "D = b² − 4ac" },
            { symbol: "i", name: "Satuan imajiner", note: "i² = −1, muncul saat D < 0" },
          ]}
        />
      }
      example={
        <div className="grid gap-4 md:grid-cols-2">
          <ExampleBlock
            problem="Selesaikan x² − 5x + 6 = 0."
            detail="Koefisien: a = 1, b = −5, c = 6. Diskriminan D = (−5)² − 4(1)(6) = 25 − 24 = 1. Akar: x = (5 ± 1) ÷ 2."
            answer={rootsDescription(example)}
            onUse={() =>
              calculator.setMany({ ...INITIAL, a: "1", b: "-5", c: "6" })
            }
          />
          <ExampleBlock
            problem="Selesaikan x² + 2x + 5 = 0."
            detail="D = 2² − 4(1)(5) = 4 − 20 = −16. Karena D negatif, akar berupa bilangan kompleks konjugat."
            answer={rootsDescription(exampleComplex)}
            onUse={() =>
              calculator.setMany({ ...INITIAL, a: "1", b: "2", c: "5" })
            }
          />
          <ExampleBlock
            problem="Selesaikan x² − 6x + 9 = 0."
            detail="D = (−6)² − 4(1)(9) = 36 − 36 = 0, sehingga akar real kembar x = 3."
            answer={rootsDescription(exampleDouble)}
            onUse={() =>
              calculator.setMany({ ...INITIAL, a: "1", b: "-6", c: "9" })
            }
          />
        </div>
      }
      notes={
        <GuidanceBlock
          mistakes={[
            "Memasukkan a = 0. Jika a nol, persamaan menjadi linear, bukan kuadrat, sehingga rumus abc tidak berlaku.",
            "Salah tanda saat b negatif: untuk x² − 5x + 6, b = −5 sehingga −b = +5, bukan −5.",
            "Mengabaikan diskriminan dan tetap menulis akar real padahal D < 0 sehingga solusinya kompleks.",
            "Menyimpulkan akar kembar berarti tidak ada solusi; D = 0 justru memberi satu solusi real yang dihitung dua kali.",
          ]}
          tips={[
            "Substitusikan akar yang diperoleh kembali ke persamaan asli; hasil harus nol.",
            "Gunakan hubungan x₁ + x₂ = −b/a dan x₁ · x₂ = c/a sebagai pemeriksaan cepat.",
            "Titik puncak parabola berada di x = −b ÷ 2a, yang juga menjadi titik tengah kedua akar real.",
          ]}
        />
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          id="kuadrat-a"
          label="Koefisien a"
          value={calculator.form.a}
          onChange={(value) => calculator.setField("a", value)}
          error={calculator.errors.a}
          hint="Tidak boleh 0"
        />
        <NumberField
          id="kuadrat-b"
          label="Koefisien b"
          value={calculator.form.b}
          onChange={(value) => calculator.setField("b", value)}
          error={calculator.errors.b}
          hint="Contoh: -5"
        />
        <NumberField
          id="kuadrat-c"
          label="Konstanta c"
          value={calculator.form.c}
          onChange={(value) => calculator.setField("c", value)}
          error={calculator.errors.c}
          hint="Contoh: 6"
        />
      </div>
    </CalculatorLayout>
  );
}
