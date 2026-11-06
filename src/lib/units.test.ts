import { describe, expect, it } from "vitest";
import { MathDomainError } from "./math/errors";
import {
  ACCELERATION_UNITS,
  AREA_UNITS,
  DENSITY_UNITS,
  ENERGY_UNITS,
  FORCE_UNITS,
  LENGTH_UNITS,
  MASS_UNITS,
  POWER_UNITS,
  PRESSURE_UNITS,
  SPEED_UNITS,
  TIME_UNITS,
  VOLUME_UNITS,
  convertFromBase,
  convertToBase,
  findUnit,
  unitOptions,
  unitSymbol,
} from "./units";

describe("konversi satuan panjang dan waktu", () => {
  it("mengubah kilometer ke meter", () => {
    expect(convertToBase(1.5, "km", LENGTH_UNITS)).toBe(1500);
    expect(convertFromBase(1500, "km", LENGTH_UNITS)).toBe(1.5);
  });

  it("mengubah jam dan menit ke detik", () => {
    expect(convertToBase(1.5, "h", TIME_UNITS)).toBe(5400);
    expect(convertToBase(90, "min", TIME_UNITS)).toBe(5400);
    expect(convertFromBase(5400, "h", TIME_UNITS)).toBe(1.5);
  });

  it("mengubah milidetik ke detik", () => {
    expect(convertToBase(500, "ms", TIME_UNITS)).toBe(0.5);
  });
});

describe("konversi satuan kecepatan dan percepatan", () => {
  it("mengubah 72 km/jam menjadi 20 m/s", () => {
    expect(convertToBase(72, "km/h", SPEED_UNITS)).toBeCloseTo(20, 12);
  });

  it("mengubah 20 m/s menjadi 72 km/jam", () => {
    expect(convertFromBase(20, "km/h", SPEED_UNITS)).toBeCloseTo(72, 12);
  });

  it("mengubah cm/s² ke m/s²", () => {
    expect(convertToBase(250, "cm/s2", ACCELERATION_UNITS)).toBeCloseTo(2.5, 12);
  });

  it("mengembalikan nilai yang sama untuk satuan basis", () => {
    expect(convertToBase(42, "m/s", SPEED_UNITS)).toBe(42);
    expect(convertFromBase(42, "m/s", SPEED_UNITS)).toBe(42);
  });
});

describe("konversi satuan mekanika", () => {
  it("mengubah gram dan ton ke kilogram", () => {
    expect(convertToBase(500, "g", MASS_UNITS)).toBe(0.5);
    expect(convertToBase(2, "ton", MASS_UNITS)).toBe(2000);
  });

  it("mengubah kilonewton dan kilojoule", () => {
    expect(convertToBase(2, "kN", FORCE_UNITS)).toBe(2000);
    expect(convertToBase(1.5, "kJ", ENERGY_UNITS)).toBe(1500);
    expect(convertToBase(2, "kW", POWER_UNITS)).toBe(2000);
  });

  it("mengubah bar dan atmosfer ke pascal", () => {
    expect(convertToBase(1, "bar", PRESSURE_UNITS)).toBe(100000);
    expect(convertToBase(1, "atm", PRESSURE_UNITS)).toBe(101325);
    expect(convertFromBase(101325, "atm", PRESSURE_UNITS)).toBe(1);
  });

  it("mengubah cm² dan mm² ke m²", () => {
    expect(convertToBase(10000, "cm2", AREA_UNITS)).toBeCloseTo(1, 12);
    expect(convertToBase(1000000, "mm2", AREA_UNITS)).toBeCloseTo(1, 12);
  });

  it("mengubah liter dan cm³ ke m³", () => {
    expect(convertToBase(1, "L", VOLUME_UNITS)).toBeCloseTo(0.001, 12);
    expect(convertToBase(1000, "cm3", VOLUME_UNITS)).toBeCloseTo(0.001, 12);
  });

  it("mengubah g/cm³ ke kg/m³", () => {
    expect(convertToBase(1, "g/cm3", DENSITY_UNITS)).toBe(1000);
    expect(convertFromBase(1000, "g/cm3", DENSITY_UNITS)).toBe(1);
  });
});

describe("utilitas satuan", () => {
  it("menemukan simbol satuan", () => {
    expect(unitSymbol("km/h", SPEED_UNITS)).toBe("km/jam");
    expect(unitSymbol("m/s2", ACCELERATION_UNITS)).toBe("m/s²");
    expect(findUnit("kg", MASS_UNITS).factor).toBe(1);
  });

  it("menolak satuan tak dikenal", () => {
    expect(() => findUnit("mil", LENGTH_UNITS)).toThrow(MathDomainError);
    expect(() => convertToBase(1, "xyz", LENGTH_UNITS)).toThrow(
      /tidak dikenali/,
    );
  });

  it("menolak nilai bukan bilangan berhingga", () => {
    expect(() => convertToBase(Number.NaN, "km", LENGTH_UNITS)).toThrow(
      MathDomainError,
    );
  });

  it("menghasilkan opsi dropdown dari daftar satuan", () => {
    expect(unitOptions(MASS_UNITS)).toEqual([
      { value: "kg", label: "Kilogram (kg)" },
      { value: "g", label: "Gram (g)" },
      { value: "ton", label: "Ton (ton)" },
    ]);
  });
});
