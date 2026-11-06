import type { CalculatorFaq } from "@/data/faqs";

export function FaqSection({ faqs }: { faqs: CalculatorFaq[] }) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="defer-render mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        Pertanyaan umum
      </h2>
      <div className="mt-3 divide-y divide-slate-200">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-800 marker:content-none">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-lg leading-none text-indigo-500 transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 pr-6 text-sm leading-relaxed text-slate-600">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
