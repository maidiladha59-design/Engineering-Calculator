"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CalculatorComponentProps {
  title: string;
  description: string;
  categoryName: string;
}

export interface CalculatorLayoutProps extends CalculatorComponentProps {
  children: ReactNode;
  result?: ReactNode;
  error?: string | null;
  isCalculating?: boolean;
  onCalculate: () => void;
  onReset: () => void;
  formula?: ReactNode;
  variables?: ReactNode;
  example?: ReactNode;
  notes?: ReactNode;
}

function ResultSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      role="status"
      aria-label="Menghitung"
    >
      <div className="h-3 w-20 rounded bg-slate-200" />
      <div className="mt-4 h-9 w-40 rounded bg-slate-200" />
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-4/5 rounded bg-slate-100" />
        <div className="h-3 w-3/5 rounded bg-slate-100" />
      </div>
      <span className="sr-only">Menghitung…</span>
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl font-semibold text-slate-400"
        aria-hidden="true"
      >
        =
      </span>
      <p className="mt-3 text-sm font-medium text-slate-700">Hasil muncul di sini</p>
      <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
        Isi input, lalu tekan HITUNG untuk melihat hasil, langkah perhitungan, dan
        penjelasan.
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      className="rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:p-6"
      role="alert"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
        Tidak dapat menghitung
      </p>
      <p className="mt-2 text-sm leading-relaxed text-rose-800">{message}</p>
      <p className="mt-3 text-xs text-rose-600">
        Periksa kembali angka dan satuan, lalu tekan HITUNG lagi.
      </p>
    </div>
  );
}

export function CalculatorLayout({
  title,
  description,
  categoryName,
  children,
  result,
  error,
  isCalculating = false,
  onCalculate,
  onReset,
  formula,
  variables,
  example,
  notes,
}: CalculatorLayoutProps) {
  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
          Kalkulator {categoryName}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onCalculate();
          }}
          noValidate
          className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Input
            </h2>
            <span className="text-xs text-slate-400">
              Desimal boleh pakai koma atau titik
            </span>
          </div>

          <div className="mt-5 space-y-4">{children}</div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isCalculating}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:bg-indigo-400"
            >
              {isCalculating ? (
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
              ) : null}
              {isCalculating ? "MENGHITUNG…" : "HITUNG"}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              RESET
            </button>
          </div>
        </form>

        <div className="min-w-0 lg:sticky lg:top-24">
          {isCalculating ? (
            <ResultSkeleton />
          ) : error ? (
            <ErrorState message={error} />
          ) : result ? (
            result
          ) : (
            <EmptyResult />
          )}
        </div>
      </div>

      {formula || variables || example ? (
        <div className={cn("mt-8 grid gap-5", variables ? "lg:grid-cols-2" : "")}>
          {formula}
          {variables}
          {example ? <div className="lg:col-span-2">{example}</div> : null}
        </div>
      ) : null}

      {notes ? <div className="mt-8">{notes}</div> : null}
    </div>
  );
}
