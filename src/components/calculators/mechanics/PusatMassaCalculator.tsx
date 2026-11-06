"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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
import { centerOfMass, type MassPoint } from "@/lib/math/mechanics";
import { parseNumberInput } from "@/lib/validation";

interface PointRow {
  id: string;
  mass: string;
  x: string;
  y: string;
}

const EMPTY_FORM: Record<string, string> = {};
let rowCounter = 0;

function createRow(point?: MassPoint): PointRow {
  rowCounter += 1;

  return {
    id: `titik-${rowCounter}`,
    mass: point ? String(point.mass) : "",
    x: point ? String(point.x) : "",
    y: point ? String(point.y) : "",
  };
}

const EXAMPLE_A = centerOfMass([
  { mass: 2, x: 0, y: 0 },
  { mass: 4, x: 3, y: 0 },
]);
const EXAMPLE_B = centerOfMass([
  { mass: 1, x: 1, y: 1 },
  { mass: 3, x: 3, y: 5 },
]);

const EXAMPLES = [
  {
    problem:
      "Dua massa 2 kg di titik (0, 0) dan 4 kg di titik (3, 0) dihubungkan oleh batang ringan. Di mana pusat massanya?",
    points: [
      { mass: 2, x: 0, y: 0 },
      { mass: 4, x: 3, y: 0 },
    ],
    detail: `x = (2×0 + 4×3) / 6 = ${formatNumber(EXAMPLE_A.x)} m dan y = (2×0 + 4×0) / 6 = ${formatNumber(EXAMPLE_A.y)} m.`,
    answer: `(${formatNumber(EXAMPLE_A.x)}; ${formatNumber(EXAMPLE_A.y)}) m`,
  },
  {
    problem:
      "Dua titik massa: 1 kg di (1, 1) dan 3 kg di (3, 5). Tentukan koordinat pusat massa gabungannya.",
    points: [
      { mass: 1, x: 1, y: 1 },
      { mass: 3, x: 3, y: 5 },
    ],
    detail: `x = (1×1 + 3×3) / 4 = ${formatNumber(EXAMPLE_B.x)} m dan y = (1×1 + 3×5) / 4 = ${formatNumber(EXAMPLE_B.y)} m.`,
    answer: `(${formatNumber(EXAMPLE_B.x)}; ${formatNumber(EXAMPLE_B.y)}) m`,
  },
];

export default function PusatMassaCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const [rows, setRows] = useState<PointRow[]>(() => [
    createRow(),
    createRow(),
    createRow(),
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const calculator = useCalculatorState(EMPTY_FORM);

  function updateRow(id: string, field: keyof PointRow, value: string) {
    setRows((previous) =>
      previous.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
    setErrors((previous) => {
      const key = `${field}-${id}`;
      if (!(key in previous)) {
        return previous;
      }
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function addRow() {
    if (rows.length >= 10) {
      return;
    }
    setRows((previous) => [...previous, createRow()]);
  }

  function removeRow(id: string) {
    setRows((previous) =>
      previous.length > 1 ? previous.filter((row) => row.id !== id) : previous,
    );
  }

  function resetAll() {
    setRows([createRow(), createRow(), createRow()]);
    setErrors({});
    calculator.reset();
  }

  function handleCalculate() {
    const nextErrors: Record<string, string> = {};
    const points: MassPoint[] = [];

    rows.forEach((row, index) => {
      const mass = parseNumberInput(row.mass, `Massa titik ${index + 1}`);
      const x = parseNumberInput(row.x, `Koordinat x titik ${index + 1}`);
      const y = parseNumberInput(row.y, `Koordinat y titik ${index + 1}`);

      if (!mass.ok) {
        nextErrors[`mass-${row.id}`] = mass.error;
      } else if (mass.value <= 0) {
        nextErrors[`mass-${row.id}`] = `Massa titik ${index + 1} harus lebih dari 0.`;
      }

      if (!x.ok) {
        nextErrors[`x-${row.id}`] = x.error;
      }

      if (!y.ok) {
        nextErrors[`y-${row.id}`] = y.error;
      }

      if (mass.ok && x.ok && y.ok && mass.value > 0) {
        points.push({ mass: mass.value, x: x.value, y: y.value });
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      calculator.showError(
        "Periksa massa dan koordinat setiap titik. Semua kolom wajib diisi dengan massa lebih dari nol.",
      );
      return;
    }

    setErrors({});

    calculator.run(() => {
      const result = centerOfMass(points);
      const totalMass = points.reduce((total, point) => total + point.mass, 0);
      const momentX = points.reduce(
        (total, point) => total + point.mass * point.x,
        0,
      );
      const momentY = points.reduce(
        (total, point) => total + point.mass * point.y,
        0,
      );

      return (
        <div className="space-y-5">
          <ResultCard
            label="Pusat massa (x̄; ȳ)"
            value={`(${formatNumber(result.x)}; ${formatNumber(result.y)})`}
            unit="m"
            rows={[
              { label: "Massa total", value: `${formatNumber(result.totalMass)} kg` },
              { label: "Jumlah titik", value: `${result.points} titik` },
              { label: "Σ m·x", value: `${formatNumber(momentX)} kg·m` },
              { label: "Σ m·y", value: `${formatNumber(momentY)} kg·m` },
            ]}
            footnote="Koordinat memakai satuan meter. Jika input dalam sentimeter, ubah dulu ke meter agar hasil konsisten."
          />
          <StepsList
            steps={[
              {
                title: "Jumlahkan massa semua titik",
                detail: `Σm = ${points.map((point) => formatNumber(point.mass)).join(" + ")} = ${formatNumber(totalMass)} kg.`,
              },
              {
                title: "Hitung momen massa terhadap sumbu y",
                detail: `Σm·x = ${points.map((point) => `${formatNumber(point.mass)}×${formatNumber(point.x)}`).join(" + ")} = ${formatNumber(momentX)} kg·m.`,
              },
              {
                title: "Hitung momen massa terhadap sumbu x",
                detail: `Σm·y = ${points.map((point) => `${formatNumber(point.mass)}×${formatNumber(point.y)}`).join(" + ")} = ${formatNumber(momentY)} kg·m.`,
              },
              {
                title: "Bagi momen dengan massa total",
                detail: `x̄ = ${formatNumber(momentX)} / ${formatNumber(totalMass)} = ${formatNumber(result.x)} m; ȳ = ${formatNumber(momentY)} / ${formatNumber(totalMass)} = ${formatNumber(result.y)} m.`,
              },
            ]}
          />
        </div>
      );
    });
  }

  function applyExample(points: MassPoint[]) {
    setRows(points.map((point) => createRow(point)));
    setErrors({});
    calculator.setMany({});
  }

  return (
    <CalculatorLayout
      {...props}
      onCalculate={handleCalculate}
      onReset={resetAll}
      isCalculating={calculator.isCalculating}
      error={calculator.error}
      result={calculator.result}
      formula={
        <FormulaBlock
          tex={String.raw`\bar{x}=\frac{\sum m_i x_i}{\sum m_i}\qquad \bar{y}=\frac{\sum m_i y_i}{\sum m_i}`}
          description="Pusat massa adalah titik rata-rata posisi massa. Setiap koordinat dihitung dengan menjumlahkan massa dikali koordinat, lalu dibagi massa total."
        />
      }
      variables={
        <VariableTable
          rows={[
            { symbol: "m_i", name: "Massa titik ke-i", unit: "kg", note: "Harus lebih besar dari nol" },
            { symbol: "x_i, y_i", name: "Koordinat titik ke-i", unit: "m", note: "Posisi massa pada bidang" },
            { symbol: "x̄, ȳ", name: "Koordinat pusat massa", unit: "m", note: "Titik kesetimbangan massa" },
            { symbol: "Σm_i", name: "Massa total", unit: "kg", note: "Jumlah seluruh massa" },
          ]}
        />
      }
      example={
        <div className="grid gap-5 lg:grid-cols-2">
          {EXAMPLES.map((example, index) => (
            <ExampleBlock
              key={`contoh-pusat-massa-${index + 1}`}
              problem={example.problem}
              detail={example.detail}
              answer={example.answer}
              onUse={() => applyExample(example.points)}
            />
          ))}
        </div>
      }
      notes={
        <GuidanceBlock
          mistakes={[
            "Menjumlahkan koordinat tanpa mengalikannya dengan massa, sehingga titik bermassa besar tidak dominan.",
            "Membagi dengan jumlah titik, padahal pembagi yang benar adalah massa total.",
            "Mencampur satuan sentimeter dan meter pada titik yang berbeda.",
          ]}
          tips={[
            "Pilih titik asal koordinat di salah satu massa agar sebagian suku menjadi nol dan perhitungan lebih cepat.",
            "Pusat massa tidak harus berada tepat di salah satu titik massa; pada contoh dua massa, titiknya berada di antara keduanya.",
            "Untuk benda kontinu, rumus yang sama dipakai dengan integral, bukan penjumlahan titik.",
          ]}
        />
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-slate-600">
            Masukkan massa dan koordinat setiap titik pada bidang xy.
          </p>
          <span className="text-xs text-slate-400">{rows.length}/10 titik</span>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.id}
            className="rounded-xl border border-slate-200 bg-slate-50/60 p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Titik {index + 1}
              </p>
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                disabled={rows.length === 1}
                aria-label={`Hapus titik ${index + 1}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <NumberField
                id={`mass-${row.id}`}
                label="Massa (kg)"
                value={row.mass}
                onChange={(value) => updateRow(row.id, "mass", value)}
                error={errors[`mass-${row.id}`]}
                placeholder="Contoh: 2"
              />
              <NumberField
                id={`x-${row.id}`}
                label="Koordinat x (m)"
                value={row.x}
                onChange={(value) => updateRow(row.id, "x", value)}
                error={errors[`x-${row.id}`]}
                placeholder="Contoh: 0"
              />
              <NumberField
                id={`y-${row.id}`}
                label="Koordinat y (m)"
                value={row.y}
                onChange={(value) => updateRow(row.id, "y", value)}
                error={errors[`y-${row.id}`]}
                placeholder="Contoh: 0"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          disabled={rows.length >= 10}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/60 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Tambah titik massa
        </button>
      </div>
    </CalculatorLayout>
  );
}
