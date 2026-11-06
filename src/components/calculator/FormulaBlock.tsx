import "katex/dist/katex.min.css";
import type { ReactNode } from "react";
import formulaHtml from "@/data/formula-html.json";

/* Rendered from the TeX sources at build time by
   scripts/formula-html.mjs so KaTeX never ships to the browser. */
const FORMULA_HTML: Record<string, string> = formulaHtml;

export interface FormulaBlockProps {
  tex: string;
  title?: string;
  description?: ReactNode;
}

export function FormulaBlock({
  tex,
  title = "Rumus",
  description,
}: FormulaBlockProps) {
  const html = FORMULA_HTML[tex];

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h2>
      {html ? (
        <div
          className="mt-3 overflow-x-auto rounded-xl bg-slate-50 px-4 py-4 text-slate-900"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-50 px-4 py-4 text-sm text-slate-900">
          <code>{tex}</code>
        </pre>
      )}
      {description ? (
        <div className="mt-3 text-sm leading-relaxed text-slate-600">
          {description}
        </div>
      ) : null}
    </section>
  );
}
