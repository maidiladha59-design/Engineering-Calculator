import { describe, expect, it } from "vitest";
import {
  boxVolume,
  buildingArea,
  circularColumnVolume,
  concreteMaterials,
  concreteMixPerSack,
  rectangularColumnVolume,
  rebarWeight,
} from "./civil";

describe("volume beton dan balok", () => {
  it("menghitung volume balok", () => {
    expect(boxVolume(2, 3, 0.1)).toBeCloseTo(0.6, 10);
  });

  it("menghitung volume kolom persegi panjang", () => {
    expect(rectangularColumnVolume(0.2, 0.3, 3)).toBeCloseTo(0.18, 10);
  });

  it("menghitung volume kolom bulat", () => {
    expect(circularColumnVolume(0.4, 3)).toBeCloseTo(0.3769911184, 8);
  });

  it("menolak dimensi nol", () => {
    expect(() => boxVolume(2, 0, 0.1)).toThrow(/lebih dari 0/);
    expect(() => circularColumnVolume(0, 3)).toThrow(/lebih dari 0/);
  });
});

describe("luas bangunan", () => {
  it("menghitung luas bangunan dua lantai", () => {
    expect(buildingArea(10, 8, 2)).toBe(160);
  });

  it("menolak jumlah lantai pecahan", () => {
    expect(() => buildingArea(10, 8, 1.5)).toThrow(/bilangan bulat/);
  });
});

describe("kebutuhan material beton", () => {
  it("menghitung material campuran 1:2:3 untuk 1 m3", () => {
    const result = concreteMaterials(1, "1:2:3");
    expect(result.dryVolume).toBeCloseTo(1.5, 10);
    expect(result.cementKg).toBeCloseTo(360, 10);
    expect(result.cementSacks).toBeCloseTo(7.2, 10);
    expect(result.sandM3).toBeCloseTo(0.5, 10);
    expect(result.gravelM3).toBeCloseTo(0.75, 10);
  });

  it("menghitung material campuran 1:2:4", () => {
    const result = concreteMaterials(1, "1:2:4");
    expect(result.cementKg).toBeCloseTo(308.5714286, 6);
    expect(result.sandM3).toBeCloseTo(0.4285714286, 6);
    expect(result.gravelM3).toBeCloseTo(0.8571428571, 6);
  });

  it("menambahkan cadangan material", () => {
    const result = concreteMaterials(1, "1:2:3", 10);
    expect(result.volume).toBeCloseTo(1.1, 10);
    expect(result.cementKg).toBeCloseTo(396, 10);
  });

  it("menghitung campuran per sak semen", () => {
    const result = concreteMixPerSack("1:2:3", 1);
    expect(result.sandM3).toBeCloseTo(0.0694444444, 8);
    expect(result.gravelM3).toBeCloseTo(0.1041666667, 8);
    expect(result.estimatedWaterLiters).toBe(25);
  });

  it("menolak persentase cadangan yang tidak masuk akal", () => {
    expect(() => concreteMaterials(1, "1:2:3", 100)).toThrow(/kurang dari 100/);
  });
});

describe("berat besi beton", () => {
  it("menghitung berat 10 batang besi diameter 10 mm panjang 12 m", () => {
    const result = rebarWeight(10, 12, 10);
    expect(result.totalLengthM).toBe(120);
    expect(result.weightKg).toBeCloseTo(73.9845, 3);
    expect(result.weightTon).toBeCloseTo(0.0739845, 6);
  });

  it("mendekati rumus praktis d kuadrat per 162", () => {
    const result = rebarWeight(10, 1, 1);
    expect(result.massPerMeterKg).toBeCloseTo(10 ** 2 / 162, 2);
  });

  it("menolak jumlah batang pecahan", () => {
    expect(() => rebarWeight(10, 12, 1.5)).toThrow(/bilangan bulat/);
  });
});
