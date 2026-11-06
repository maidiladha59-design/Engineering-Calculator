import type { ReactNode } from "react";

export interface StepItem {
  title: string;
  detail?: ReactNode;
}

export function StepsList({
  steps,
  title = "Langkah perhitungan",
}: {
  steps: StepItem[];
  title?: string;
}) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h2>
      <ol className="mt-4 space-y-4">
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800">{step.title}</p>
              {step.detail ? (
                <div className="mt-1 break-words text-sm leading-relaxed text-slate-600">
                  {step.detail}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
