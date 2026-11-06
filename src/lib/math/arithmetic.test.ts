import { describe, expect, it } from "vitest";
import { basicArithmetic, operatorSymbol } from "./arithmetic";
import { MathDomainError } from "./errors";

describe("basicArithmetic", () => {
  it("menjumlahkan dua bilangan", () => {
    expect(basicArithmetic(12.5, 7.5, "+")).toBe(20);
  });

  it("mengurangkan hingga hasil negatif", () => {
    expect(basicArithmetic(10, 15, "-")).toBe(-5);
  });

  it("mengalikan dua bilangan", () => {
    expect(basicArithmetic(6, 7, "×")).toBe(42);
    expect(basicArithmetic(6, 7, "*")).toBe(42);
  });

  it("membagi dengan hasil desimal", () => {
    expect(basicArithmetic(10, 4, "÷")).toBe(2.5);
    expect(basicArithmetic(10, 4, "/")).toBe(2.5);
  });

  it("membersihkan galat floating point", () => {
    expect(basicArithmetic(0.1, 0.2, "+")).toBe(0.3);
  });

  it("mengembalikan 0 saat pembilang nol", () => {
    expect(basicArithmetic(0, 5, "÷")).toBe(0);
  });

  it("menolak pembagian dengan nol", () => {
    expect(() => basicArithmetic(10, 0, "÷")).toThrow(MathDomainError);
    expect(() => basicArithmetic(10, 0, "÷")).toThrow(/Pembagian dengan nol/);
  });

  it("menolak input bukan bilangan berhingga", () => {
    expect(() => basicArithmetic(Number.NaN, 2, "+")).toThrow(MathDomainError);
    expect(() => basicArithmetic(2, Number.POSITIVE_INFINITY, "×")).toThrow(
      MathDomainError,
    );
  });
});

describe("operatorSymbol", () => {
  it("menampilkan simbol kali dan bagi", () => {
    expect(operatorSymbol("*")).toBe("×");
    expect(operatorSymbol("/")).toBe("÷");
    expect(operatorSymbol("+")).toBe("+");
    expect(operatorSymbol("-")).toBe("-");
  });
});
