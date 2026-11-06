import type { ReactNode } from "react";

export interface ResultRow {
  label: string;
  value: ReactNode;
}

export function ResultCard({
  value,
  unit,
  label = "Hasil",
  rows = [],
  footnote,
}: {
  value: string;
  unit?: string;
  label?: string;
  rows?: ResultRow[];
  footnote?: ReactNode;
}) {
  return (
    <section
      className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white p-5 shadow-sm sm:p-6"
      aria-live="polite"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
        {label}
      </p>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="break-all text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {value}
        </span>
        {unit ? (
          <span className="text-base font-semibold text-slate-500">{unit}</span>
        ) : null}
      </p>
      {rows.length > 0 ? (
        <dl className="mt-4 space-y-2 border-t border-indigo-100 pt-4">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-wrap justify-between gap-2 text-sm">
              <dt className="text-slate-500">{row.label}</dt>
              <dd className="font-medium text-slate-800">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {footnote ? (
        <div className="mt-4 text-xs leading-relaxed text-slate-500">
          {footnote}
        </div>
      ) : null}
    </section>
  );
}
