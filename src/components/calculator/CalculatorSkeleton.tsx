export function CalculatorSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="h-6 w-40 rounded bg-slate-200" />
      <div className="mt-3 h-9 w-72 max-w-full rounded bg-slate-200" />
      <div className="mt-2 h-4 w-full max-w-xl rounded bg-slate-100" />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="h-80 rounded-2xl border border-slate-200 bg-white" />
        <div className="h-52 rounded-2xl border border-slate-200 bg-white" />
      </div>
    </div>
  );
}
