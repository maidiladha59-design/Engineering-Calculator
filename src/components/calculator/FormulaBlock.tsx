import katex from "katex";
import type { ReactNode } from "react";

function renderTex(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
      output: "htmlAndMathml",
    });
  } catch {
    return `<code>${tex
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</code>`;
  }
}

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
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h2>
      <div
        className="mt-3 overflow-x-auto rounded-xl bg-slate-50 px-4 py-4 text-slate-900"
        dangerouslySetInnerHTML={{ __html: renderTex(tex, true) }}
      />
      {description ? (
        <div className="mt-3 text-sm leading-relaxed text-slate-600">
          {description}
        </div>
      ) : null}
    </section>
  );
}

export function InlineMath({ tex }: { tex: string }) {
  return (
    <span
      className="inline-block align-middle"
      dangerouslySetInnerHTML={{ __html: renderTex(tex, false) }}
    />
  );
}
