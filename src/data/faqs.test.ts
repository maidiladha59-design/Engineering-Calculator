import { describe, expect, it } from "vitest";
import { calculators } from "./calculators";
import { calculatorFaqs, getCalculatorFaqs } from "./faqs";

const activeCalculators = calculators.filter(
  (calculator) => calculator.status === "active",
);

describe("calculator FAQs", () => {
  it("has an entry for every active calculator", () => {
    for (const calculator of activeCalculators) {
      const key = `${calculator.category}/${calculator.slug}`;
      expect(calculatorFaqs[key], `FAQ hilang untuk ${key}`).toBeDefined();
    }
  });

  it("contains 3 to 5 FAQs per calculator", () => {
    for (const calculator of activeCalculators) {
      const faqs = getCalculatorFaqs(calculator.category, calculator.slug);
      expect(faqs.length).toBeGreaterThanOrEqual(3);
      expect(faqs.length).toBeLessThanOrEqual(5);
    }
  });

  it("has non-empty, unique questions and answers", () => {
    for (const [key, faqs] of Object.entries(calculatorFaqs)) {
      const questions = new Set<string>();

      for (const faq of faqs) {
        expect(faq.question.trim().length, key).toBeGreaterThan(10);
        expect(faq.answer.trim().length, key).toBeGreaterThan(40);
        expect(questions.has(faq.question), `${key}: ${faq.question}`).toBe(false);
        questions.add(faq.question);
      }
    }
  });

  it("does not contain FAQs for unknown calculators", () => {
    const known = new Set(
      calculators.map((calculator) => `${calculator.category}/${calculator.slug}`),
    );

    for (const key of Object.keys(calculatorFaqs)) {
      expect(known.has(key), `FAQ tidak dikenal: ${key}`).toBe(true);
    }
  });

  it("returns an empty list for unknown keys", () => {
    expect(getCalculatorFaqs("matematika", "tidak-ada")).toEqual([]);
  });
});
