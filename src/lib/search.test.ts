import { describe, expect, it } from "vitest";
import { categories, calculators } from "@/data/calculators";
import { normalizeText, searchCalculators } from "./search";

const search = (query: string, limit = 8) =>
  searchCalculators(query, calculators, categories, limit);

describe("normalizeText", () => {
  it("mengubah ke huruf kecil dan merapikan spasi", () => {
    expect(normalizeText("  Persamaan   KUADRAT ")).toBe("persamaan kuadrat");
  });

  it("menghapus tanda diakritik", () => {
    expect(normalizeText("Kalkulator Café")).toBe("kalkulator cafe");
  });

  it("menangani string kosong", () => {
    expect(normalizeText("   ")).toBe("");
  });
});

describe("searchCalculators", () => {
  it("mengembalikan hasil kosong untuk kueri kosong", () => {
    expect(search("")).toEqual([]);
    expect(search("   ")).toEqual([]);
  });

  it("mencari berdasarkan nama tanpa membedakan huruf besar-kecil", () => {
    const results = search("KECEPATAN");
    expect(results[0]?.calculator.slug).toBe("kecepatan");
    expect(results[0]?.score).toBe(100);
    expect(results[0]?.categoryName).toBe("Fisika");
  });

  it("mencari berdasarkan kata kunci", () => {
    const results = search("diskon");
    expect(results.some((result) => result.calculator.slug === "persentase")).toBe(
      true,
    );
  });

  it("mencari berdasarkan kategori", () => {
    const results = search("matematika");
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((result) => result.calculator.category === "matematika"),
    ).toBe(true);
  });

  it("mengutamakan nama yang diawali kueri", () => {
    const results = search("akar");
    expect(results[0]?.calculator.slug).toBe("pangkat-akar");
  });

  it("mengurutkan kalkulator aktif sebelum segera hadir pada skor sama", () => {
    const results = search("gaya");
    const slugs = results.map((result) => result.calculator.slug);
    expect(slugs.indexOf("gaya")).toBeLessThan(slugs.indexOf("gaya-gesek"));
  });

  it("menyertakan kalkulator segera hadir agar dapat diberi label", () => {
    const results = search("kalor");
    expect(results.some((result) => result.calculator.slug === "kalor")).toBe(
      true,
    );
    expect(
      results.find((result) => result.calculator.slug === "kalor")?.calculator
        .status,
    ).toBe("coming-soon");
  });

  it("mengembalikan hasil kosong untuk kueri yang tidak cocok", () => {
    expect(search("zzzz")).toEqual([]);
  });

  it("membatasi jumlah hasil", () => {
    expect(search("a", 3)).toHaveLength(3);
  });
});
