import { describe, expect, it } from "vitest";
import {
  conversionTable,
  convertToUnit,
  convertValue,
  findConversionUnit,
  type ConversionUnit,
} from "./conversions";

const LENGTH: ConversionUnit[] = [
  { value: "m", label: "Meter (m)", symbol: "m", factor: 1 },
  { value: "km", label: "Kilometer (km)", symbol: "km", factor: 1000 },
  { value: "cm", label: "Sentimeter (cm)", symbol: "cm", factor: 0.01 },
  { value: "mm", label: "Milimeter (mm)", symbol: "mm", factor: 0.001 },
];

const TEMPERATURE: ConversionUnit[] = [
  { value: "K", label: "Kelvin (K)", symbol: "K", factor: 1 },
  {
    value: "C",
    label: "Celsius (°C)",
    symbol: "°C",
    factor: 1,
    offset: 273.15,
  },
  {
    value: "F",
    label: "Fahrenheit (°F)",
    symbol: "°F",
    factor: 5 / 9,
    offset: 459.67,
  },
  {
    value: "R",
    label: "Rankine (°R)",
    symbol: "°R",
    factor: 5 / 9,
  },
];

const PRESSURE: ConversionUnit[] = [
  { value: "Pa", label: "Pascal (Pa)", symbol: "Pa", factor: 1 },
  { value: "atm", label: "Atmosfer (atm)", symbol: "atm", factor: 101325 },
];

describe("konversi panjang", () => {
  it("mengubah 1 km menjadi 1000 m", () => {
    expect(convertToUnit(1, "km", "m", LENGTH)).toBe(1000);
  });

  it("mengubah 250 cm menjadi 2,5 m", () => {
    expect(convertToUnit(250, "cm", "m", LENGTH)).toBe(2.5);
  });

  it("mengembalikan nilai yang sama untuk satuan yang sama", () => {
    expect(convertToUnit(12.5, "m", "m", LENGTH)).toBe(12.5);
  });
});

describe("konversi suhu", () => {
  it("mengubah 0 derajat Celsius menjadi 32 Fahrenheit", () => {
    expect(convertToUnit(0, "C", "F", TEMPERATURE)).toBeCloseTo(32, 10);
  });

  it("mengubah 0 derajat Celsius menjadi 273,15 Kelvin", () => {
    expect(convertToUnit(0, "C", "K", TEMPERATURE)).toBeCloseTo(273.15, 10);
  });

  it("mengubah 100 derajat Celsius menjadi 212 Fahrenheit", () => {
    expect(convertToUnit(100, "C", "F", TEMPERATURE)).toBeCloseTo(212, 10);
  });

  it("mengubah 32 Fahrenheit kembali menjadi 0 Celsius", () => {
    expect(convertToUnit(32, "F", "C", TEMPERATURE)).toBeCloseTo(0, 10);
  });

  it("mengubah 300 Kelvin menjadi 26,85 Celsius", () => {
    expect(convertToUnit(300, "K", "C", TEMPERATURE)).toBeCloseTo(26.85, 10);
  });

  it("mendukung Rankine", () => {
    expect(convertToUnit(491.67, "R", "K", TEMPERATURE)).toBeCloseTo(273.15, 8);
  });
});

describe("konversi tekanan", () => {
  it("mengubah 1 atmosfer menjadi 101325 pascal", () => {
    expect(convertToUnit(1, "atm", "Pa", PRESSURE)).toBe(101325);
  });

  it("mengubah 101325 pascal menjadi 1 atmosfer", () => {
    expect(convertToUnit(101325, "Pa", "atm", PRESSURE)).toBe(1);
  });
});

describe("tabel dan validasi konversi", () => {
  it("membuat tabel semua satuan", () => {
    const table = conversionTable(1, "km", LENGTH);
    expect(table).toHaveLength(4);
    expect(table.find((row) => row.unit.value === "m")?.value).toBe(1000);
  });

  it("menolak satuan yang tidak dikenal", () => {
    expect(() => findConversionUnit(LENGTH, "mil")).toThrow(/tidak dikenali/);
  });

  it("menolak nilai tak hingga", () => {
    expect(() =>
      convertValue(
        Number.POSITIVE_INFINITY,
        LENGTH[0],
        LENGTH[1],
      ),
    ).toThrow(/berhingga/);
  });

  it("menormalkan hasil negatif nol", () => {
    expect(Object.is(convertValue(-0, LENGTH[0], LENGTH[1]), -0)).toBe(false);
  });
});
