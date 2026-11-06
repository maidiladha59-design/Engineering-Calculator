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
import {
  solveLinearSystem,
  type LinearSystemSolution,
} from "@/lib/math/linear-system";
import { validateNumberFields } from "@/lib/validation";

const INITIAL = {
  a1: "",
  b1: "",
  c1: "",
  a2: "",
  b2: "",
  c2: "",
};

function equationText(
  a: number,
  b: number,
  c: number,
  suffix = "",
): string {
  let left = "";

  if (a !== 0) {
    left += `${a < 0 ? "−" : ""}${formatNumber(Math.abs(a))}x`;
  }

  if (b !== 0) {
    if (left.length > 0) {
      left += b < 0 ? " − " : " + ";
    } else {
      left += b < 0 ? "−" : "";
    }
    left += `${formatNumber(Math.abs(b))}y`;
  }

  if (left.length === 0) {
    left = "0";
  }

  return `${left} = ${formatNumber(c)}${suffix}`;
}

function solutionValue(solution: LinearSystemSolution): string {
  if (solution.kind === "unique") {
    return `x = ${formatNumber(solution.x ?? 0)}, y = ${formatNumber(solution.y ?? 0)}`;
  }

  if (solution.kind === "infinite") {
    return "Tak hingga solusi";
  }

  return "Tidak ada solusi";
}

export default function SistemLinearCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const calculator = useCalculatorState(INITIAL);

  function handleCalculate() {
    const { values, errors, hasErrors } = validateNumberFields(
      {
        a1: calculator.form.a1,
        b1: calculator.form.b1,
        c1: calculator.form.c1,
        a2: calculator.form.a2,
        b2: calculator.form.b2,
        c2: calculator.form.c2,
      },
      {
        a1: { label: "Koefisien a₁" },
        b1: { label: "Koefisien b₁" },
        c1: { label: "Konstanta c₁" },
        a2: { label: "Koefisien a₂" },
        b2: { label: "Koefisien b₂" },
        c2: { label: "Konstanta c₂" },
      },
    );

    if (hasErrors) {
      calculator.setFieldErrors(errors);
      calculator.showError("Periksa kembali input yang ditandai merah sebelum menghitung.");
      return;
    }

    calculator.setFieldErrors({});
    calculator.run(() => {
      const solution = solveLinearSystem(
        values.a1,
        values.b1,
        values.c1,
        values.a2,
        values.b2,
        values.c2,
      );

      const steps = [
        {
          title: "Tulis sistem persamaan",
          detail: `${equationText(values.a1, values.b1, values.c1)} dan ${equationText(values.a2, values.b2, values.c2)}`,
        },
        {
          title: "Hitung determinan utama",
          detail: `D = a₁b₂ − a₂b₁ = (${formatNumber(values.a1)})(${formatNumber(values.b2)}) − (${formatNumber(values.a2)})(${formatNumber(values.b1)}) = ${formatNumber(solution.determinant)}`,
        },
      ];

      if (solution.kind === "unique") {
        steps.push(
          {
            title: "Hitung determinan bantu",
            detail: `Dx = c₁b₂ − c₂b₁ = ${formatNumber(solution.determinantX)}; Dy = a₁c₂ − a₂c₁ = ${formatNumber(solution.determinantY)}.`,
          },
          {
            title: "Hitung nilai variabel",
            detail: `x = Dx ÷ D = ${formatNumber(solution.determinantX)} ÷ ${formatNumber(solution.determinant)} = ${formatNumber(solution.x ?? 0)}. y = Dy ÷ D = ${formatNumber(solution.determinantY)} ÷ ${formatNumber(solution.determinant)} = ${formatNumber(solution.y ?? 0)}.`,
          },
          {
            title: "Periksa hasil",
            detail: `Substitusi balik: a₁x + b₁y = ${formatNumber(values.a1 * (solution.x ?? 0) + values.b1 * (solution.y ?? 0))} (seharusnya ${formatNumber(values.c1)}); a₂x + b₂y = ${formatNumber(values.a2 * (solution.x ?? 0) + values.b2 * (solution.y ?? 0))} (seharusnya ${formatNumber(values.c2)}).`,
          },
        );
      } else {
        steps.push({
          title: "Analisis sistem",
          detail: solution.message,
        });
      }

      return (
        <div className="space-y-5">
          <ResultCard
            label="Solusi sistem"
            value={solutionValue(solution)}
            rows={[
              { label: "Determinan (D)", value: formatNumber(solution.determinant) },
              { label: "Dx", value: formatNumber(solution.determinantX) },
              { label: "Dy", value: formatNumber(solution.determinantY) },
              {
                label: "Jenis solusi",
                value:
                  solution.kind === "unique"
                    ? "Solusi tunggal"
                    : solution.kind === "infinite"
                      ? "Tak hingga"
                      : "Tidak ada",
              },
            ]}
            footnote={solution.message}
          />
          <StepsList steps={steps} />
        </div>
      );
    });
  }

  const example = solveLinearSystem(2, 3, 12, 1, -1, 1);

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
          tex={String.raw`\begin{cases}
a_1x+b_1y=c_1\\
a_2x+b_2y=c_2
\end{cases}
\qquad
x=\frac{D_x}{D},\quad y=\frac{D_y}{D}`}
          description="Metode determinan (Cramer). Jika D = 0, sistem tidak memiliki solusi tunggal: bisa tak hingga solusi (garis berimpit) atau tidak ada solusi (garis sejajar)."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "x, y", name: "Variabel yang dicari", note: "Nilai solusi sistem" },
            { symbol: "a₁, b₁, a₂, b₂", name: "Koefisien variabel", note: "Boleh positif, negatif, atau 0" },
            { symbol: "c₁, c₂", name: "Konstanta ruas kanan", note: "Nilai di kanan tanda sama dengan" },
            { symbol: "D", name: "Determinan utama", note: "D = a₁b₂ − a₂b₁" },
          ]}
        />
      }
      example={
        <ExampleBlock
          problem="Selesaikan 2x + 3y = 12 dan x − y = 1."
          detail={`D = (2)(−1) − (1)(3) = −5. Dx = (12)(−1) − (1)(3) = −15. Dy = (2)(1) − (1)(12) = −10. Maka x = −15 ÷ −5 = 3 dan y = −10 ÷ −5 = 2.`}
          answer={`x = ${formatNumber(example.x ?? 0)}, y = ${formatNumber(example.y ?? 0)}`}
        />
      }
    >
      <div>
        <p className="text-sm font-semibold text-slate-800">Persamaan 1</p>
        <p className="mt-0.5 text-xs text-slate-500">a₁x + b₁y = c₁</p>
        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          <NumberField
            id="linear-a1"
            label="a₁"
            value={calculator.form.a1}
            onChange={(value) => calculator.setField("a1", value)}
            error={calculator.errors.a1}
            hint="Contoh: 2"
          />
          <NumberField
            id="linear-b1"
            label="b₁"
            value={calculator.form.b1}
            onChange={(value) => calculator.setField("b1", value)}
            error={calculator.errors.b1}
            hint="Contoh: 3"
          />
          <NumberField
            id="linear-c1"
            label="c₁"
            value={calculator.form.c1}
            onChange={(value) => calculator.setField("c1", value)}
            error={calculator.errors.c1}
            hint="Contoh: 12"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">Persamaan 2</p>
        <p className="mt-0.5 text-xs text-slate-500">a₂x + b₂y = c₂</p>
        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          <NumberField
            id="linear-a2"
            label="a₂"
            value={calculator.form.a2}
            onChange={(value) => calculator.setField("a2", value)}
            error={calculator.errors.a2}
            hint="Contoh: 1"
          />
          <NumberField
            id="linear-b2"
            label="b₂"
            value={calculator.form.b2}
            onChange={(value) => calculator.setField("b2", value)}
            error={calculator.errors.b2}
            hint="Contoh: -1"
          />
          <NumberField
            id="linear-c2"
            label="c₂"
            value={calculator.form.c2}
            onChange={(value) => calculator.setField("c2", value)}
            error={calculator.errors.c2}
            hint="Contoh: 1"
          />
        </div>
      </div>
    </CalculatorLayout>
  );
}
