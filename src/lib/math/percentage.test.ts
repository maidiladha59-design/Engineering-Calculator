import { describe, expect, it } from "vitest";
import { MathDomainError } from "./errors";
import { percentChange, percentDifference, percentOf } from "./percentage";

describe("percentOf", () => {
  it("menghitung 25% dari 200", () => {
    expect(percentOf(25, 200)).toBe(50);
  });

  it("mengembalikan 0 saat persen 0", () => {
    expect(percentOf(0, 500)).toBe(0);
  });

  it("mendukung nilai negatif", () => {
    expect(percentOf(10, -50)).toBe(-5);
  });

  it("menolak input bukan bilangan berhingga", () => {
    expect(() => percentOf(Number.NaN, 10)).toThrow(MathDomainError);
  });
});

describe("percentChange", () => {
  it("menghitung kenaikan dari 200 ke 250", () => {
    expect(percentChange(200, 250)).toBe(25);
  });

  it("menghitung penurunan dari 200 ke 150", () => {
    expect(percentChange(200, 150)).toBe(-25);
  });

  it("menangani nilai awal negatif", () => {
    expect(percentChange(-100, -50)).toBe(50);
  });

  it("menolak nilai awal nol", () => {
    expect(() => percentChange(0, 10)).toThrow(MathDomainError);
    expect(() => percentChange(0, 10)).toThrow(/tidak boleh 0/);
  });
});

describe("percentDifference", () => {
  it("menghitung selisih persen 100 dan 120", () => {
    expect(percentDifference(100, 120)).toBeCloseTo(18.1818181818182, 10);
  });

  it("mengembalikan 0 untuk dua nilai sama", () => {
    expect(percentDifference(75, 75)).toBe(0);
  });

  it("menolak kedua nilai nol", () => {
    expect(() => percentDifference(0, 0)).toThrow(MathDomainError);
  });

  it("menolak input bukan bilangan berhingga", () => {
    expect(() => percentDifference(10, Number.POSITIVE_INFINITY)).toThrow(
      MathDomainError,
    );
  });
});
