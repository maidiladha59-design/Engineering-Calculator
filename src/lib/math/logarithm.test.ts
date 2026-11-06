import { describe, expect, it } from "vitest";
import { MathDomainError } from "./errors";
import { logarithm } from "./logarithm";

describe("logarithm", () => {
  it("menghitung log basis 2 dari 32 = 5", () => {
    expect(logarithm(32, 2)).toBe(5);
  });

  it("menghitung log basis 10 dari 100 = 2", () => {
    expect(logarithm(100, 10)).toBe(2);
  });

  it("menghitung logaritma natural e", () => {
    expect(logarithm(Math.E, Math.E)).toBe(1);
    expect(logarithm(1, 10)).toBe(0);
  });

  it("menolak nilai logaritma nol atau negatif", () => {
    expect(() => logarithm(0, 10)).toThrow(/x > 0/);
    expect(() => logarithm(-1, 10)).toThrow(/x > 0/);
  });

  it("menolak basis nol atau negatif", () => {
    expect(() => logarithm(10, 0)).toThrow(MathDomainError);
    expect(() => logarithm(10, -2)).toThrow(MathDomainError);
  });

  it("menolak basis 1", () => {
    expect(() => logarithm(10, 1)).toThrow(/tidak boleh 1/);
  });

  it("menolak input bukan bilangan berhingga", () => {
    expect(() => logarithm(Number.POSITIVE_INFINITY, 10)).toThrow(MathDomainError);
  });
});
