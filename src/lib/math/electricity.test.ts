import { describe, expect, it } from "vitest";
import {
  electricalEnergy,
  electricalPower,
  energyCost,
  mechanicalPowerFromTorque,
  ohmsLaw,
  parallelResistance,
  seriesResistance,
  wireResistance,
} from "./electricity";

describe("ohmsLaw", () => {
  it("menghitung tegangan dari arus dan hambatan", () => {
    expect(ohmsLaw("voltage", 0, 2, 5)).toBe(10);
  });

  it("menghitung arus dari tegangan dan hambatan", () => {
    expect(ohmsLaw("current", 10, 0, 5)).toBe(2);
  });

  it("menghitung hambatan dari tegangan dan arus", () => {
    expect(ohmsLaw("resistance", 10, 2, 0)).toBe(5);
  });

  it("menolak pembagian dengan arus nol", () => {
    expect(() => ohmsLaw("resistance", 10, 0, 0)).toThrow(/lebih dari 0/);
  });

  it("menolak hambatan nol saat mencari arus", () => {
    expect(() => ohmsLaw("current", 10, 0, 0)).toThrow(/lebih dari 0/);
  });
});

describe("electricalPower", () => {
  it("menghitung daya dari tegangan dan arus", () => {
    expect(electricalPower("vi", 12, 2)).toBe(24);
  });

  it("menghitung daya dari arus dan hambatan", () => {
    expect(electricalPower("i2r", 3, 4)).toBe(36);
  });

  it("menghitung daya dari tegangan dan hambatan", () => {
    expect(electricalPower("v2r", 12, 4)).toBe(36);
  });

  it("menolak hambatan nol pada rumus V kuadrat per R", () => {
    expect(() => electricalPower("v2r", 12, 0)).toThrow(/lebih dari 0/);
  });
});

describe("wireResistance", () => {
  it("menghitung hambatan kawat tembaga", () => {
    expect(wireResistance(0.0172, 100, 2.5)).toBeCloseTo(0.688, 10);
  });

  it("menghasilkan nol untuk panjang nol", () => {
    expect(wireResistance(0.0172, 0, 2.5)).toBe(0);
  });

  it("menolak luas penampang nol", () => {
    expect(() => wireResistance(0.0172, 100, 0)).toThrow(/lebih dari 0/);
  });
});

describe("rangkaian seri dan paralel", () => {
  it("menghitung hambatan seri 5 ohm dan 10 ohm", () => {
    expect(seriesResistance([5, 10])).toBe(15);
  });

  it("menghitung hambatan paralel 5 ohm dan 20 ohm", () => {
    expect(parallelResistance([5, 20])).toBe(4);
  });

  it("menghitung tiga resistor paralel", () => {
    expect(parallelResistance([2, 3, 6])).toBe(1);
  });

  it("mengembalikan nol jika ada resistor nol pada rangkaian paralel", () => {
    expect(parallelResistance([5, 0])).toBe(0);
  });

  it("menolak daftar resistor kosong", () => {
    expect(() => seriesResistance([])).toThrow(/minimal satu resistor/);
    expect(() => parallelResistance([])).toThrow(/minimal satu resistor/);
  });
});

describe("electricalEnergy", () => {
  it("menghitung energi listrik dan biaya", () => {
    const result = electricalEnergy(1.5, 4, 1500);
    expect(result.kilowattHours).toBe(6);
    expect(result.joules).toBe(21600000);
    expect(result.cost).toBe(9000);
  });

  it("menghitung biaya dari energi yang sudah diketahui", () => {
    expect(energyCost(6, 1500)).toBe(9000);
  });

  it("menghasilkan nol untuk waktu nol", () => {
    expect(electricalEnergy(2, 0, 1500)).toEqual({
      kilowattHours: 0,
      joules: 0,
      cost: 0,
    });
  });

  it("menolak tarif negatif", () => {
    expect(() => electricalEnergy(1, 1, -1)).toThrow(/tidak boleh negatif/);
  });
});

describe("mechanicalPowerFromTorque", () => {
  it("menghitung daya mekanik dari torsi dan kecepatan sudut", () => {
    expect(mechanicalPowerFromTorque(20, 10)).toBe(200);
  });
});
