import { describe, expect, it } from "vitest";
import { articles, getArticle, getArticlesForCalculator } from "@/data/articles";
import { getCalculator } from "@/data/calculators";

function articleText(article: (typeof articles)[number]): string {
  return article.blocks
    .map((block) => {
      if (block.type === "paragraph" || block.type === "heading") {
        return block.text;
      }
      if (block.type === "list") {
        return block.items.join(" ");
      }
      if (block.type === "formula") {
        return block.description ?? "";
      }
      if (block.type === "table") {
        return [block.caption ?? "", block.headers.join(" "), ...block.rows.map((row) => row.join(" "))].join(" ");
      }
      return `${block.title} ${block.text}`;
    })
    .join(" ");
}

describe("article data", () => {
  it("has six unique articles", () => {
    expect(articles).toHaveLength(6);
    expect(new Set(articles.map((article) => article.slug)).size).toBe(6);
  });

  it("has at least 500 words per article", () => {
    for (const article of articles) {
      const wordCount = articleText(article)
        .split(/\s+/)
        .filter(Boolean).length;
      expect(wordCount, `${article.slug} hanya ${wordCount} kata`).toBeGreaterThanOrEqual(500);
    }
  });

  it("links every article to at least two active calculators", () => {
    for (const article of articles) {
      expect(article.relatedCalculators.length, article.slug).toBeGreaterThanOrEqual(2);
      for (const related of article.relatedCalculators) {
        const calculator = getCalculator(related.category, related.slug);
        expect(calculator, `${article.slug} -> ${related.category}/${related.slug}`).toBeDefined();
        expect(calculator?.status).toBe("active");
      }
    }
  });

  it("provides metadata and mixed content blocks", () => {
    for (const article of articles) {
      expect(article.description.length).toBeGreaterThan(50);
      expect(article.readingTimeMinutes).toBeGreaterThan(0);
      const types = new Set(article.blocks.map((block) => block.type));
      expect(types.has("paragraph")).toBe(true);
      expect(types.has("heading")).toBe(true);
      expect(types.has("formula")).toBe(true);
      expect(types.has("callout")).toBe(true);
    }
  });

  it("finds article by slug and calculator relations bidirectionally", () => {
    expect(getArticle("hukum-ohm")?.title).toContain("Hukum Ohm");
    expect(getArticle("tidak-ada")).toBeUndefined();
    const related = getArticlesForCalculator("teknik-elektro", "hukum-ohm");
    expect(related.some((article) => article.slug === "hukum-ohm")).toBe(true);
    expect(getArticlesForCalculator("teknik-elektro", "tidak-ada")).toHaveLength(0);
  });
});
