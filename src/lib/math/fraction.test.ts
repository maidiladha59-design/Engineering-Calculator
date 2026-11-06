import { describe, expect, it } from "vitest";
import { MathDomainError } from "./errors";
import {
  addFractions,
  divideFractions,
  fractionToDecimal,
  fractionToMixed,
  fractionToText,
  gcd,
  mixedToText,
  multiplyFractions,
  operateFractions,
  simplifyFraction,
  subtractFractions,
} from "./fraction";

describe("gcd", () => {
  it("menghitung FPB 12 dan 18", () => {
    expect(gcd(12, 18)).toBe(6);
  });

  it("mendukung bilangan negatif dan nol", () => {
    expect(gcd(-12, 18)).toBe(6);
    expect(gcd(0, 5)).toBe(5);
  });
});

describe("simplifyFraction", () => {
  it("menyederhanakan 6/8 menjadi 3/4", () => {
    expect(simplifyFraction(6, 8)).toEqual({ numerator: 3, denominator: 4 });
  });

  it("memindahkan tanda negatif ke pembilang", () => {
    expect(simplifyFraction(6, -8)).toEqual({ numerator: -3, denominator: 4 });
  });

  it("menyederhanakan nol menjadi 0/1", () => {
    expect(simplifyFraction(0, 9)).toEqual({ numerator: 0, denominator: 1 });
  });

  it("menolak penyebut nol", () => {
    expect(() => simplifyFraction(1, 0)).toThrow(MathDomainError);
  });

  it("menolak pembilang atau penyebut bukan bilangan bulat", () => {
    expect(() => simplifyFraction(1.5, 2)).toThrow(/bilangan bulat/);
    expect(() => simplifyFraction(1, 2.5)).toThrow(/bilangan bulat/);
  });
});

describe("operasi pecahan", () => {
  it("menjumlahkan 1/2 + 1/3 = 5/6", () => {
    expect(
      addFractions({ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 }),
    ).toEqual({ numerator: 5, denominator: 6 });
  });

  it("mengurangkan 3/4 - 1/4 = 1/2", () => {
    expect(
      subtractFractions(
        { numerator: 3, denominator: 4 },
        { numerator: 1, denominator: 4 },
      ),
    ).toEqual({ numerator: 1, denominator: 2 });
  });

  it("mengalikan 2/3 × 3/4 = 1/2", () => {
    expect(
      multiplyFractions(
        { numerator: 2, denominator: 3 },
        { numerator: 3, denominator: 4 },
      ),
    ).toEqual({ numerator: 1, denominator: 2 });
  });

  it("membagi 1/2 ÷ 3/4 = 2/3", () => {
    expect(
      divideFractions(
        { numerator: 1, denominator: 2 },
        { numerator: 3, denominator: 4 },
      ),
    ).toEqual({ numerator: 2, denominator: 3 });
  });

  it("menolak pembagian dengan pecahan bernilai nol", () => {
    expect(() =>
      divideFractions({ numerator: 1, denominator: 2 }, { numerator: 0, denominator: 5 }),
    ).toThrow(/bernilai nol/);
  });

  it("menolak penyebut nol pada operateFractions", () => {
    expect(() =>
      operateFractions(
        { numerator: 1, denominator: 0 },
        { numerator: 1, denominator: 2 },
        "+",
      ),
    ).toThrow(/Penyebut tidak boleh nol/);
  });

  it("menolak operator tidak dikenal", () => {
    expect(() =>
      operateFractions(
        { numerator: 1, denominator: 2 },
        { numerator: 1, denominator: 2 },
        "^" as "+",
      ),
    ).toThrow(/tidak dikenali/);
  });
});

describe("format pecahan", () => {
  it("mengubah pecahan menjadi desimal", () => {
    expect(fractionToDecimal({ numerator: 3, denominator: 4 })).toBe(0.75);
  });

  it("menampilkan pecahan dan bilangan bulat", () => {
    expect(fractionToText({ numerator: 3, denominator: 4 })).toBe("3/4");
    expect(fractionToText({ numerator: 5, denominator: 1 })).toBe("5");
  });

  it("mengubah 7/4 menjadi bilangan campuran 1 3/4", () => {
    expect(fractionToMixed({ numerator: 7, denominator: 4 })).toEqual({
      whole: 1,
      numerator: 3,
      denominator: 4,
    });
    expect(mixedToText({ numerator: 7, denominator: 4 })).toBe("1 3/4");
  });

  it("menampilkan pecahan negatif sebagai bilangan campuran negatif", () => {
    expect(mixedToText({ numerator: -7, denominator: 4 })).toBe("-1 3/4");
  });
});
