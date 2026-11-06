import type { ReactNode } from "react";

export function ExampleBlock({
  problem,
  detail,
  answer,
}: {
  problem: ReactNode;
  detail?: ReactNode;
  answer: ReactNode;
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
    </section>
  );
}
