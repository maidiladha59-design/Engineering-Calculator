export interface VariableRow {
  symbol: string;
  name: string;
  unit?: string;
  note?: string;
}

export function VariableTable({
  rows,
  title = "Keterangan variabel",
}: {
  rows: VariableRow[];
  title?: string;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h2>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th scope="col" className="py-2.5 pr-4 font-semibold">
                Simbol
              </th>
              <th scope="col" className="py-2.5 pr-4 font-semibold">
                Variabel
              </th>
              <th scope="col" className="py-2.5 pr-4 font-semibold">
                Satuan
              </th>
              <th scope="col" className="py-2.5 font-semibold">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.symbol}-${row.name}`}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="whitespace-nowrap py-2.5 pr-4 font-mono font-semibold text-indigo-700">
                  {row.symbol}
                </td>
                <td className="py-2.5 pr-4 text-slate-800">{row.name}</td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-slate-600">
                  {row.unit ?? "—"}
                </td>
                <td className="py-2.5 text-slate-600">{row.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
