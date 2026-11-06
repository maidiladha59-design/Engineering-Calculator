import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function LegalPage({
  title,
  description,
  updatedAt,
  children,
}: {
  title: string;
  description: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Breadcrumbs items={[{ label: title }]} />
      <article className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {description}
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Terakhir diperbarui: {updatedAt}
          </p>
        </header>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 sm:text-base">
          {children}
        </div>
      </article>
    </div>
  );
}
