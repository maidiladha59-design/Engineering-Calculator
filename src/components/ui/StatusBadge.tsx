import type { CalculatorStatus } from "@/data/calculators";
import { cn } from "@/lib/cn";

export function StatusBadge({
  status,
  className,
}: {
  status: CalculatorStatus;
  className?: string;
}) {
  const isActive = status === "active";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        isActive
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-50 text-slate-500",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isActive ? "bg-emerald-500" : "bg-slate-400",
        )}
        aria-hidden="true"
      />
      {isActive ? "Aktif" : "Segera Hadir"}
    </span>
  );
}
