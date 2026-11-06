import { describe, expect, it } from "vitest";
import { conversionConfigs, getConversionConfig } from "./conversions";
import { convertToUnit, convertValue, findConversionUnit } from "@/lib/math/conversions";

describe("konfigurasi konversi satuan", () => {
  it("menyediakan sepuluh kategori konversi dengan slug unik", () => {
    expect(conversionConfigs).toHaveLength(10);
    expect(new Set(conversionConfigs.map((config) => config.slug)).size).toBe(10);
  });

  it("setiap kategori memiliki minimal dua contoh dan satuan default yang valid", () => {
    for (const config of conversionConfigs) {
      expect(config.examples.length).toBeGreaterThanOrEqual(2);
      expect(config.units.length).toBeGreaterThanOrEqual(3);
      expect(config.mistakes.length).toBeGreaterThanOrEqual(2);
      expect(config.tips.length).toBeGreaterThanOrEqual(2);

      const values = config.units.map((unit) => unit.value);
      expect(new Set(values).size).toBe(values.length);
      expect(values).toContain(config.defaults.fromUnit);
      expect(values).toContain(config.defaults.toUnit);

      for (const unit of config.units) {
        expect(unit.factor).toBeGreaterThan(0);
      }
    }
  });

  it("nilai default pada setiap kategori dapat dikonversi tanpa error", () => {
    for (const config of conversionConfigs) {
      const result = convertToUnit(
        Number(config.defaults.value),
        config.defaults.fromUnit,
        config.defaults.toUnit,
        config.units,
      );

      expect(Number.isFinite(result)).toBe(true);
    }
  });

  it("seluruh contoh menghasilkan nilai berhingga", () => {
    for (const config of conversionConfigs) {
      for (const example of config.examples) {
        const result = convertToUnit(
          Number(example.value),
          example.fromUnit,
          example.toUnit,
          config.units,
        );

        expect(Number.isFinite(result)).toBe(true);
      }
    }
  });
});

describe("patokan konversi yang diwajibkan", () => {
  const panjang = getConversionConfig("konversi-panjang");
  const suhu = getConversionConfig("konversi-suhu");
  const tekanan = getConversionConfig("konversi-tekanan");

  it("1 km sama dengan 1.000 m", () => {
    expect(panjang).toBeDefined();
    expect(
      convertToUnit(1, "km", "m", panjang!.units),
    ).toBe(1000);
  });

  it("0 °C sama dengan 32 °F dan 273,15 K", () => {
    expect(suhu).toBeDefined();
    expect(convertToUnit(0, "C", "F", suhu!.units)).toBeCloseTo(32, 10);
    expect(convertToUnit(0, "C", "K", suhu!.units)).toBeCloseTo(273.15, 10);
  });

  it("1 atm sama dengan 101.325 Pa", () => {
    expect(tekanan).toBeDefined();
    expect(convertToUnit(1, "atm", "Pa", tekanan!.units)).toBe(101325);
  });

  it("menolak satuan yang tidak terdaftar pada konfigurasi", () => {
    expect(() =>
      findConversionUnit(panjang!.units, "mil-laut"),
    ).toThrow(/tidak dikenali/);
  });

  it("tidak mengubah nilai ketika satuan asal sama dengan tujuan", () => {
    expect(
      convertValue(
        12.5,
        findConversionUnit(suhu!.units, "C"),
        findConversionUnit(suhu!.units, "C"),
      ),
    ).toBe(12.5);
  });
});
