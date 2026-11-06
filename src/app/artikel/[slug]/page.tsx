import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getArticle, articles } from "@/data/articles";
import { getCalculator } from "@/data/calculators";

type ArticlePageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = getArticle(params.slug);

  if (!article) {
    return { title: "Artikel tidak ditemukan" };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: `${article.title} | Engineering Calculator`,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const related = article.relatedCalculators
    .map((relatedCalculator) => ({
      calculator: getCalculator(
        relatedCalculator.category,
        relatedCalculator.slug,
      ),
      category: relatedCalculator.category,
    }))
    .filter(
      (item) =>
        item.calculator !== undefined && item.calculator.status === "active",
    );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Artikel", href: "/artikel" },
          { label: article.title },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {article.topic}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {article.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span>Dipublikasikan {formatDate(article.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {article.readingTimeMinutes} menit baca
            </span>
          </div>
        </header>

        <div className="mt-8 space-y-5">
          {article.blocks.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="pt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "paragraph") {
              return (
                <p key={index} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {block.text}
                </p>
              );
            }

            if (block.type === "list") {
              const List = block.ordered ? "ol" : "ul";
              return (
                <List
                  key={index}
                  className={
                    block.ordered
                      ? "list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base"
                      : "list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base"
                  }
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </List>
              );
            }

            if (block.type === "formula") {
              return (
                <FormulaBlock
                  key={index}
                  tex={block.tex}
                  description={block.description}
                />
              );
            }

            if (block.type === "table") {
              return (
                <figure key={index} className="min-w-0">
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full min-w-[32rem] border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-left">
                          {block.headers.map((header) => (
                            <th
                              key={header}
                              scope="col"
                              className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-700"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row) => (
                          <tr key={row.join("|")} className="even:bg-slate-50/60">
                            {row.map((cell, cellIndex) => (
                              <td
                                key={`${cellIndex}-${cell}`}
                                className="border-b border-slate-100 px-4 py-3 text-slate-700 last:border-b-0"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {block.caption ? (
                    <figcaption className="mt-2 text-xs text-slate-500">
                      {block.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            }

            return (
              <aside
                key={index}
                className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5"
              >
                <p className="text-sm font-semibold text-amber-800">
                  {block.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {block.text}
                </p>
              </aside>
            );
          })}
        </div>

        {related.length > 0 ? (
          <section className="mt-10 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-bold text-slate-900">
              Coba dengan kalkulator
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Terapkan konsep di artikel ini menggunakan angka Anda sendiri.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map(({ calculator, category }) => (
                <Link
                  key={`${category}-${calculator?.slug}`}
                  href={`/kalkulator/${category}/${calculator?.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/40"
                >
                  <span className="font-medium text-slate-800">
                    {calculator?.name}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-indigo-600 transition group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-8">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            <span aria-hidden="true">←</span> Kembali ke semua artikel
          </Link>
        </div>
      </article>
    </div>
  );
}
