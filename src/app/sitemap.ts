import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { calculators, categories } from "@/data/calculators";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const calculatorPages: MetadataRoute.Sitemap = calculators
    .filter((calculator) => calculator.status === "active")
    .map((calculator) => ({
      url: absoluteUrl(`/kalkulator/${calculator.category}/${calculator.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/kalkulator/${category.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/artikel/${article.slug}`),
    lastModified: new Date(article.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/kalkulator"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...categoryPages,
    ...calculatorPages,
    {
      url: absoluteUrl("/artikel"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...articlePages,
    {
      url: absoluteUrl("/tentang"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/kontak"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/kebijakan-privasi"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/syarat-ketentuan"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/disclaimer"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
