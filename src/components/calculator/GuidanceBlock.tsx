import { AlertTriangle, Lightbulb } from "lucide-react";

export function GuidanceBlock({
  mistakes,
  tips,
}: {
  mistakes: string[];
  tips: string[];
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-rose-600">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Kesalahan umum
          </h2>
          <ul className="mt-3 space-y-2.5">
            {mistakes.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-slate-700"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
            Tips
          </h2>
          <ul className="mt-3 space-y-2.5">
            {tips.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-slate-700"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
