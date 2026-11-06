import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorRenderer } from "@/components/calculators/CalculatorRenderer";
import { AdSlot } from "@/components/ads/AdSlot";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getArticlesForCalculator } from "@/data/articles";
import { getCalculatorFaqs } from "@/data/faqs";
import {
  calculators,
  getCalculator,
  getCategory,
  getCategoryName,
} from "@/data/calculators";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";

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
    alternates: {
      canonical: `/kalkulator/${kategori}/${slug}`,
    },
    openGraph: {
      title: `${calculator.name} | Engineering Calculator`,
      description: calculator.description,
      type: "website",
      url: `/kalkulator/${kategori}/${slug}`,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${calculator.name} | Engineering Calculator`,
      description: calculator.description,
      images: [OG_IMAGE.url],
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

  const relatedArticles = getArticlesForCalculator(kategori, slug);
  const faqs = getCalculatorFaqs(kategori, slug);
  const pageUrl = absoluteUrl(`/kalkulator/${kategori}/${slug}`);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Kalkulator",
          item: absoluteUrl("/kalkulator"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category.name,
          item: absoluteUrl(`/kalkulator/${category.slug}`),
        },
        {
          "@type": "ListItem",
          position: 4,
          name: calculator.name,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: calculator.name,
      description: calculator.description,
      url: pageUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: "id",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "IDR",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div>
      <JsonLd data={structuredData} />
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

      <FaqSection faqs={faqs} />

      {process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT ? (
        <AdSlot
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT}
          className="mt-8"
        />
      ) : null}

      {relatedArticles.length > 0 ? (
        <section className="defer-render mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Artikel terkait
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Pelajari konsep di balik kalkulator ini sebelum atau sesudah
            menghitung.
          </p>
          <ul className="mt-4 space-y-2">
            {relatedArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/artikel/${article.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm transition hover:border-indigo-200 hover:bg-indigo-50/40"
                >
                  <span className="font-medium text-slate-800">
                    {article.title}
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-indigo-600">
                    Baca →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

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
