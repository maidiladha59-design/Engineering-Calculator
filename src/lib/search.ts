import type { Calculator, Category } from "@/data/calculators";

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export interface SearchResult {
  calculator: Calculator;
  categoryName: string;
  score: number;
}

function scoreCalculator(
  query: string,
  calculator: Calculator,
  categoryName: string,
): number {
  const name = normalizeText(calculator.name);
  const category = normalizeText(categoryName);
  const keywords = calculator.keywords.map(normalizeText);
  const description = normalizeText(calculator.description);

  if (name === query) return 100;
  if (name.startsWith(query)) return 85;
  if (name.includes(query)) return 70;
  if (keywords.some((keyword) => keyword === query)) return 60;
  if (keywords.some((keyword) => keyword.includes(query))) return 50;
  if (category === query) return 45;
  if (category.includes(query)) return 35;
  if (description.includes(query)) return 15;

  return 0;
}

export function searchCalculators(
  query: string,
  calculators: Calculator[],
  categories: Category[],
  limit = 8,
): SearchResult[] {
  const normalizedQuery = normalizeText(query);

  if (normalizedQuery.length === 0) {
    return [];
  }

  const categoryNames = new Map(
    categories.map((category) => [category.slug, category.name]),
  );

  return calculators
    .map((calculator) => {
      const categoryName =
        categoryNames.get(calculator.category) ?? calculator.category;
      const score = scoreCalculator(normalizedQuery, calculator, categoryName);

      return { calculator, categoryName, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.calculator.status !== b.calculator.status) {
        return a.calculator.status === "active" ? -1 : 1;
      }
      return a.calculator.name.localeCompare(b.calculator.name, "id");
    })
    .slice(0, limit);
}
