import Link from "next/link";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
        <li>
          <Link
            href="/"
            className="rounded font-medium text-slate-600 transition hover:text-indigo-700"
          >
            Beranda
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded font-medium text-slate-600 transition hover:text-indigo-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "max-w-[14rem] truncate",
                    isLast ? "font-semibold text-slate-900" : "font-medium",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
