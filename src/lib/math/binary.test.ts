import { describe, expect, it } from "vitest";
import {
  addBinary,
  binaryPlaceValues,
  binaryToDecimal,
  decimalToBinary,
  decimalToBinarySteps,
  decimalToHex,
  decimalToHexSteps,
  decimalToOctal,
  decimalToOctalSteps,
  hexPlaceValues,
  parseDecimal,
  parseHex,
  parseOctal,
  subtractBinary,
} from "./binary";

describe("konversi biner ke desimal", () => {
  it("mengubah 1011 biner menjadi 11 desimal", () => {
    expect(binaryToDecimal("1011")).toBe(BigInt(11));
  });

  it("mengubah 11111111 biner menjadi 255 desimal", () => {
    expect(binaryToDecimal("11111111")).toBe(BigInt(255));
  });

  it("menerima angka nol", () => {
    expect(binaryToDecimal("0")).toBe(BigInt(0));
  });

  it("mengabaikan nol di depan", () => {
    expect(binaryToDecimal("0001011")).toBe(BigInt(11));
  });

  it("menolak digit selain 0 dan 1", () => {
    expect(() => binaryToDecimal("1021")).toThrow(/hanya boleh berisi angka 0 dan 1/);
  });

  it("menolak input kosong", () => {
    expect(() => binaryToDecimal("  ")).toThrow(/wajib diisi/);
  });
});

describe("konversi desimal ke biner", () => {
  it("mengubah 11 desimal menjadi 1011 biner", () => {
    expect(decimalToBinary(BigInt(11))).toBe("1011");
  });

  it("mengubah 255 desimal menjadi 11111111 biner", () => {
    expect(decimalToBinary(BigInt(255))).toBe("11111111");
  });

  it("membuat langkah pembagian berulang", () => {
    const steps = decimalToBinarySteps(BigInt(11));
    expect(steps).toHaveLength(4);
    expect(steps[0]).toEqual({
      step: 1,
      dividend: "11",
      quotient: "5",
      remainder: "1",
    });
    expect(steps[3]).toEqual({
      step: 4,
      dividend: "1",
      quotient: "0",
      remainder: "1",
    });
  });

  it("menolak desimal negatif", () => {
    expect(() => decimalToBinary(BigInt(-1))).toThrow(/nol atau positif/);
  });

  it("menolak input desimal tidak valid", () => {
    expect(() => parseDecimal("12,5")).toThrow(/hanya boleh berisi angka/);
  });

  it("mendukung bilangan lebih besar dari batas Number", () => {
    const value = BigInt("9007199254740993");
    expect(parseDecimal(value.toString())).toBe(value);
    expect(binaryToDecimal(decimalToBinary(value))).toBe(value);
  });
});

describe("nilai tempat biner", () => {
  it("menampilkan kontribusi setiap bit", () => {
    expect(binaryPlaceValues("1011")).toEqual([
      { bit: "1", power: 3, contribution: "8" },
      { bit: "0", power: 2, contribution: "0" },
      { bit: "1", power: 1, contribution: "2" },
      { bit: "1", power: 0, contribution: "1" },
    ]);
  });
});

describe("penjumlahan biner", () => {
  it("menjumlahkan 1011 dan 0110 menjadi 10001", () => {
    const result = addBinary("1011", "0110");
    expect(result.sum).toBe("10001");
    expect(result.decimal).toBe("17");
    expect(result.finalCarry).toBe(1);
  });

  it("menjumlahkan tanpa carry akhir", () => {
    const result = addBinary("1010", "0101");
    expect(result.sum).toBe("1111");
    expect(result.decimal).toBe("15");
  });

  it("mencatat carry per bit", () => {
    const result = addBinary("11", "01");
    expect(result.bits).toHaveLength(2);
    expect(result.bits[0]).toMatchObject({
      position: 0,
      bitA: 1,
      bitB: 1,
      carryIn: 0,
      resultBit: 0,
      carryOut: 1,
    });
    expect(result.bits[1]).toMatchObject({
      position: 1,
      bitA: 1,
      bitB: 0,
      carryIn: 1,
      resultBit: 0,
      carryOut: 1,
    });
  });

  it("menolak digit biner tidak valid", () => {
    expect(() => addBinary("1012", "1")).toThrow(/hanya boleh berisi/);
  });
});

describe("pengurangan biner", () => {
  it("mengurangkan 1011 dengan 0110 menjadi 101", () => {
    const result = subtractBinary("1011", "0110");
    expect(result.difference).toBe("101");
    expect(result.decimal).toBe("5");
  });

  it("mencatat pinjaman per bit", () => {
    const result = subtractBinary("1000", "0011");
    expect(result.difference).toBe("101");
    expect(result.bits.some((bit) => bit.borrowOut === 1)).toBe(true);
  });

  it("menolak hasil negatif", () => {
    expect(() => subtractBinary("0110", "1011")).toThrow(/negatif/);
  });
});

describe("heksadesimal dan oktal", () => {
  it("mengubah FF heksadesimal menjadi 255 desimal", () => {
    expect(parseHex("FF")).toBe(BigInt(255));
  });

  it("mengubah 255 desimal menjadi FF heksadesimal", () => {
    expect(decimalToHex(BigInt(255))).toBe("FF");
  });

  it("menampilkan nilai tempat heksadesimal", () => {
    expect(hexPlaceValues("FF")).toEqual([
      { bit: "F", power: 1, contribution: "240" },
      { bit: "F", power: 0, contribution: "15" },
    ]);
  });

  it("mengubah 377 oktal menjadi 255 desimal", () => {
    expect(parseOctal("377")).toBe(BigInt(255));
  });

  it("mengubah 255 desimal menjadi 377 oktal", () => {
    expect(decimalToOctal(BigInt(255))).toBe("377");
  });

  it("menolak digit heksadesimal tidak valid", () => {
    expect(() => parseHex("FG")).toThrow(/0–9 dan A–F/);
  });

  it("menolak digit oktal tidak valid", () => {
    expect(() => parseOctal("389")).toThrow(/0–7/);
  });

  it("membuat langkah pembagian desimal ke heksadesimal", () => {
    const steps = decimalToHexSteps(BigInt(255));
    expect(steps.map((step) => step.remainder)).toEqual(["F", "F"]);
    expect(steps[0]).toMatchObject({ dividend: "255", quotient: "15" });
  });

  it("membuat langkah pembagian desimal ke oktal", () => {
    const steps = decimalToOctalSteps(BigInt(255));
    expect(steps.map((step) => step.remainder)).toEqual(["7", "7", "3"]);
  });

  it("mengembalikan satu langkah untuk nilai nol", () => {
    expect(decimalToHexSteps(BigInt(0))).toEqual([
      { step: 1, dividend: "0", quotient: "0", remainder: "0" },
    ]);
    expect(decimalToOctalSteps(BigInt(0))).toEqual([
      { step: 1, dividend: "0", quotient: "0", remainder: "0" },
    ]);
  });
});
