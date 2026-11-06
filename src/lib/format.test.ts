import { describe, expect, it } from "vitest";
import {
  formatCoordinate,
  formatInteger,
  formatNumber,
  formatPercent,
  formatWithUnit,
} from "./format";

describe("formatNumber", () => {
  it("memformat angka dengan pemisah ribuan Indonesia", () => {
    expect(formatNumber(1234.5)).toBe("1.234,5");
  });

  it("menormalkan nol negatif menjadi 0", () => {
    expect(formatNumber(-0)).toBe("0");
  });

  it("memformat angka kecil dan besar dengan notasi ilmiah", () => {
    expect(formatNumber(1e12)).toBe("1,0000 × 10^12");
    expect(formatNumber(5e-7)).toBe("5,0000 × 10^-7");
  });

  it("tetap memakai desimal biasa untuk 0,000001", () => {
    expect(formatNumber(0.000001)).toBe("0,000001");
  });

  it("menangani nilai bukan bilangan berhingga", () => {
    expect(formatNumber(Number.NaN)).toBe("Tidak terdefinisi");
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe("Tidak terdefinisi");
  });
});

describe("formatInteger", () => {
  it("membulatkan ke bilangan bulat dengan pemisah ribuan", () => {
    expect(formatInteger(1234.56)).toBe("1.235");
  });

  it("menangani nilai bukan bilangan berhingga", () => {
    expect(formatInteger(Number.NaN)).toBe("Tidak terdefinisi");
  });
});

describe("formatPercent", () => {
  it("memformat persen dengan desimal Indonesia", () => {
    expect(formatPercent(12.5)).toBe("12,5%");
  });

  it("membatasi jumlah digit desimal", () => {
    expect(formatPercent(18.181818, 2)).toBe("18,18%");
  });

  it("menangani nilai bukan bilangan berhingga", () => {
    expect(formatPercent(Number.NaN)).toBe("Tidak terdefinisi");
  });
});

describe("formatWithUnit dan formatCoordinate", () => {
  it("menggabungkan angka dengan satuan", () => {
    expect(formatWithUnit(20, "m/s")).toBe("20 m/s");
  });

  it("memformat koordinat dengan format angka", () => {
    expect(formatCoordinate(-2.5)).toBe("-2,5");
  });
});
