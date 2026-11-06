import { describe, expect, it } from "vitest";
import {
  centerOfMass,
  massMomentOfInertia,
  momentOfForce,
  normalStrain,
  normalStress,
  rotationalKineticEnergy,
  simplySupportedReactions,
  strainFromModulus,
  stressFromModulus,
  torque,
  youngsModulus,
} from "./mechanics";

describe("momentOfForce", () => {
  it("menghitung momen dengan sudut 90 derajat", () => {
    expect(momentOfForce(10, 2, 90)).toEqual({ moment: 20, leverArm: 2 });
  });

  it("memakai sin sudut untuk lengan momen", () => {
    const result = momentOfForce(10, 2, 30);
    expect(result.moment).toBeCloseTo(10, 10);
    expect(result.leverArm).toBeCloseTo(1, 10);
  });

  it("menghasilkan nol saat gaya sejajar lengan", () => {
    expect(momentOfForce(50, 3, 0).moment).toBe(0);
  });

  it("menolak jarak negatif", () => {
    expect(() => momentOfForce(10, -1, 90)).toThrow(/tidak boleh negatif/);
  });
});

describe("torque", () => {
  it("menghitung torsi pada sudut tegak lurus", () => {
    expect(torque(20, 0.5, 90)).toEqual({ torque: 10, tangentialForce: 20 });
  });

  it("menghitung komponen gaya tangensial", () => {
    const result = torque(20, 0.5, 30);
    expect(result.torque).toBeCloseTo(5, 10);
    expect(result.tangentialForce).toBeCloseTo(10, 10);
  });

  it("menghasilkan nol saat jari-jari nol", () => {
    expect(torque(10, 0, 90).torque).toBe(0);
  });
});

describe("simplySupportedReactions", () => {
  it("menghitung reaksi tumpuan untuk beban di tengah", () => {
    expect(simplySupportedReactions(6, 12, 3)).toEqual({
      left: 6,
      right: 6,
      total: 12,
    });
  });

  it("menghitung reaksi tumpuan untuk beban tidak simetris", () => {
    const result = simplySupportedReactions(6, 12, 2);
    expect(result.left).toBe(8);
    expect(result.right).toBe(4);
    expect(result.total).toBe(12);
  });

  it("menolak posisi beban di luar balok", () => {
    expect(() => simplySupportedReactions(6, 12, 7)).toThrow(/melebihi/);
  });

  it("menolak panjang balok nol", () => {
    expect(() => simplySupportedReactions(0, 12, 0)).toThrow(/lebih dari 0/);
  });
});

describe("centerOfMass", () => {
  it("menghitung pusat massa dua titik", () => {
    const result = centerOfMass([
      { mass: 1, x: 0, y: 0 },
      { mass: 3, x: 4, y: 0 },
    ]);
    expect(result.x).toBe(3);
    expect(result.y).toBe(0);
    expect(result.totalMass).toBe(4);
  });

  it("menghitung pusat massa pada dua dimensi", () => {
    const result = centerOfMass([
      { mass: 2, x: 0, y: 0 },
      { mass: 2, x: 2, y: 4 },
    ]);
    expect(result.x).toBe(1);
    expect(result.y).toBe(2);
  });

  it("menolak massa nol", () => {
    expect(() => centerOfMass([{ mass: 0, x: 0, y: 0 }])).toThrow(/lebih dari 0/);
  });

  it("menolak daftar titik kosong", () => {
    expect(() => centerOfMass([])).toThrow(/minimal satu titik/);
  });
});

describe("massMomentOfInertia", () => {
  it("menghitung silinder pejal", () => {
    expect(massMomentOfInertia("silinder-pejal", 2, 0.5).inertia).toBe(0.25);
  });

  it("menghitung bola pejal", () => {
    expect(massMomentOfInertia("bola-pejal", 2, 0.5).inertia).toBe(0.2);
  });

  it("menghitung batang terhadap pusat", () => {
    expect(massMomentOfInertia("batang-tengah", 3, 2).inertia).toBe(1);
  });

  it("menghitung batang terhadap ujung", () => {
    expect(massMomentOfInertia("batang-ujung", 3, 2).inertia).toBe(4);
  });

  it("menolak dimensi negatif", () => {
    expect(() => massMomentOfInertia("silinder-pejal", 2, -1)).toThrow(
      /lebih dari 0/,
    );
  });
});

describe("rotationalKineticEnergy", () => {
  it("menghitung energi kinetik rotasi", () => {
    expect(rotationalKineticEnergy(2, 3)).toBe(9);
  });

  it("menghasilkan nol saat benda diam", () => {
    expect(rotationalKineticEnergy(5, 0)).toBe(0);
  });

  it("menolak momen inersia negatif", () => {
    expect(() => rotationalKineticEnergy(-1, 2)).toThrow(/tidak boleh negatif/);
  });
});

describe("tegangan, regangan, dan modulus elastisitas", () => {
  it("menghitung tegangan dari gaya dan luas", () => {
    expect(normalStress(1000, 0.01)).toBe(100000);
  });

  it("menghitung regangan dari perubahan panjang", () => {
    expect(normalStrain(0.5, 1000)).toBe(0.0005);
  });

  it("menghitung modulus elastisitas", () => {
    expect(youngsModulus(200000000, 0.001)).toBe(200000000000);
  });

  it("menghitung tegangan dari modulus dan regangan", () => {
    expect(stressFromModulus(200000000000, 0.001)).toBe(200000000);
  });

  it("menghitung regangan dari tegangan dan modulus", () => {
    expect(strainFromModulus(200000000, 200000000000)).toBe(0.001);
  });

  it("menolak regangan nol saat mencari modulus", () => {
    expect(() => youngsModulus(100, 0)).toThrow(/tidak boleh nol/);
  });

  it("menolak luas penampang nol", () => {
    expect(() => normalStress(100, 0)).toThrow(/lebih dari 0/);
  });
});
