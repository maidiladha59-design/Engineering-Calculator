"use client";

import type { ReactNode } from "react";
import { Play } from "lucide-react";

export function ExampleBlock({
  problem,
  detail,
  answer,
  onUse,
  actionLabel = "Coba contoh ini",
}: {
  problem: ReactNode;
  detail?: ReactNode;
  answer: ReactNode;
  onUse?: () => void;
  actionLabel?: string;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-700">
        Contoh soal
      </h2>
      <div className="mt-3 text-sm leading-relaxed text-slate-700">{problem}</div>
      {detail ? (
        <div className="mt-3 rounded-xl border border-amber-100 bg-white/80 px-4 py-3 text-sm leading-relaxed text-slate-700">
          {detail}
        </div>
      ) : null}
      <p className="mt-4 text-sm text-slate-700">
        <span className="font-semibold text-amber-800">Jawaban: </span>
        <span className="font-semibold text-slate-900">{answer}</span>
      </p>
      {onUse ? (
        <button
          type="button"
          onClick={onUse}
          className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 text-xs font-semibold text-amber-800 transition hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
