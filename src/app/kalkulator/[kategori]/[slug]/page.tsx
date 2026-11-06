import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorRenderer } from "@/components/calculators/CalculatorRenderer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  calculators,
  getCalculator,
  getCategory,
  getCategoryName,
} from "@/data/calculators";

type CalculatorPageProps = {
  params: { kategori: string; slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return calculators
    .filter((calculator) => calculator.status === "active")
    .map((calculator) => ({
      kategori: calculator.category,
      slug: calculator.slug,
    }));
}

export async function generateMetadata({
  params,
}: CalculatorPageProps): Promise<Metadata> {
  const { kategori, slug } = params;
  const calculator = getCalculator(kategori, slug);
  const category = getCategory(kategori);

  if (!calculator || calculator.status !== "active" || !category) {
    return { title: "Kalkulator tidak ditemukan" };
  }

  return {
    title: calculator.name,
    description: calculator.description,
    keywords: calculator.keywords,
    openGraph: {
      title: `${calculator.name} | Engineering Calculator`,
      description: calculator.description,
      type: "website",
    },
  };
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const { kategori, slug } = params;
  const calculator = getCalculator(kategori, slug);
  const category = getCategory(kategori);

  if (!calculator || calculator.status !== "active" || !category) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Kalkulator", href: "/kalkulator" },
          { label: category.name, href: `/kalkulator/${category.slug}` },
          { label: calculator.name },
        ]}
      />

      <CalculatorRenderer
        calculator={{
          slug: calculator.slug,
          name: calculator.name,
          description: calculator.description,
          category: calculator.category,
        }}
        categoryName={getCategoryName(calculator.category)}
      />

      <div className="mt-8">
        <Link
          href={`/kalkulator/${category.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          <span aria-hidden="true">←</span> Kembali ke kalkulator {category.name}
        </Link>
      </div>
    </div>
  );
}
