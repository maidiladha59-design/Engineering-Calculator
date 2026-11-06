import Link from "next/link";
import type { Calculator } from "@/data/calculators";
import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function CalculatorCard({
  calculator,
  categoryName,
  showCategory = false,
}: {
  calculator: Calculator;
  categoryName: string;
  showCategory?: boolean;
}) {
  const isActive = calculator.status === "active";

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {showCategory ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {categoryName}
            </p>
          ) : null}
          <h3
            className={cn(
              "text-base font-semibold text-slate-900",
              showCategory ? "mt-1" : "",
            )}
          >
            {calculator.name}
          </h3>
        </div>
        <StatusBadge status={calculator.status} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {calculator.description}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400">{categoryName}</span>
        {isActive ? (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
            Buka
            <span aria-hidden="true">→</span>
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-400">
            Belum dapat dibuka
          </span>
        )}
      </div>
    </>
  );

  if (!isActive) {
    return (
      <div
        aria-disabled="true"
        className="cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50/70 p-5 opacity-80"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/kalkulator/${calculator.category}/${calculator.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {content}
    </Link>
  );
}
