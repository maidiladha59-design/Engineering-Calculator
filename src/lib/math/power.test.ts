import { describe, expect, it } from "vitest";
import { MathDomainError } from "./errors";
import { nthRoot, power } from "./power";

describe("power", () => {
  it("menghitung 2^10 = 1024", () => {
    expect(power(2, 10)).toBe(1024);
  });

  it("menghitung pangkat negatif 2^-2 = 0,25", () => {
    expect(power(2, -2)).toBe(0.25);
  });

  it("menghitung pangkat nol selain nol = 1", () => {
    expect(power(5, 0)).toBe(1);
    expect(power(-5, 0)).toBe(1);
  });

  it("menghitung pangkat ganjil bilangan negatif", () => {
    expect(power(-2, 3)).toBe(-8);
  });

  it("menolak 0^0", () => {
    expect(() => power(0, 0)).toThrow(/0 pangkat 0/);
  });

  it("menolak pangkat pecahan dari bilangan negatif", () => {
    expect(() => power(-2, 0.5)).toThrow(MathDomainError);
  });

  it("menolak input bukan bilangan berhingga", () => {
    expect(() => power(Number.NaN, 2)).toThrow(MathDomainError);
  });
});

describe("nthRoot", () => {
  it("menghitung akar pangkat tiga dari 27", () => {
    expect(nthRoot(27, 3)).toBe(3);
  });

  it("menghitung akar kuadrat dari 16", () => {
    expect(nthRoot(16, 2)).toBe(4);
  });

  it("menghitung akar dari 0", () => {
    expect(nthRoot(0, 2)).toBe(0);
  });

  it("mendukung akar ganjil dari bilangan negatif", () => {
    expect(nthRoot(-8, 3)).toBe(-2);
  });

  it("menghitung akar irasional dengan presisi wajar", () => {
    expect(nthRoot(2, 2)).toBeCloseTo(1.4142135623731, 10);
  });

  it("menolak akar genap dari bilangan negatif", () => {
    expect(() => nthRoot(-4, 2)).toThrow(/bilangan real/);
  });

  it("menolak indeks kurang dari 2", () => {
    expect(() => nthRoot(4, 1)).toThrow(/minimal 2/);
  });

  it("menolak indeks bukan bilangan bulat", () => {
    expect(() => nthRoot(4, 2.5)).toThrow(/bilangan bulat/);
  });
});
