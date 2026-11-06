export default function Loading() {
  return (
    <div className="animate-pulse" aria-label="Memuat halaman" role="status">
      <div className="h-4 w-40 rounded bg-slate-200" />
      <div className="mt-4 h-10 w-2/3 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-full max-w-xl rounded bg-slate-200" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-40 rounded-2xl bg-slate-200" />
        <div className="h-40 rounded-2xl bg-slate-200" />
        <div className="h-40 rounded-2xl bg-slate-200" />
      </div>
      <span className="sr-only">Memuat…</span>
    </div>
  );
}
