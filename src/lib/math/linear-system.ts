import { assertFinite, cleanNumber } from "./errors";

export type LinearSystemKind = "unique" | "none" | "infinite";

export interface LinearSystemSolution {
  kind: LinearSystemKind;
  determinant: number;
  determinantX: number;
  determinantY: number;
  x: number | null;
  y: number | null;
  message: string;
}

export function solveLinearSystem(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number,
): LinearSystemSolution {
  assertFinite(a1, "Koefisien a₁");
  assertFinite(b1, "Koefisien b₁");
  assertFinite(c1, "Konstanta c₁");
  assertFinite(a2, "Koefisien a₂");
  assertFinite(b2, "Koefisien b₂");
  assertFinite(c2, "Konstanta c₂");

  const determinant = cleanNumber(a1 * b2 - a2 * b1);
  const determinantX = cleanNumber(c1 * b2 - c2 * b1);
  const determinantY = cleanNumber(a1 * c2 - a2 * c1);

  if (determinant !== 0) {
    return {
      kind: "unique",
      determinant,
      determinantX,
      determinantY,
      x: cleanNumber(determinantX / determinant),
      y: cleanNumber(determinantY / determinant),
      message: "Sistem memiliki satu solusi unik.",
    };
  }

  const rowOneZero = a1 === 0 && b1 === 0;
  const rowTwoZero = a2 === 0 && b2 === 0;

  if (
    (rowOneZero && c1 !== 0) ||
    (rowTwoZero && c2 !== 0)
  ) {
    return {
      kind: "none",
      determinant,
      determinantX,
      determinantY,
      x: null,
      y: null,
      message:
        "Sistem tidak memiliki solusi karena ada persamaan berbentuk 0 = konstanta bukan nol.",
    };
  }

  if (rowOneZero && rowTwoZero) {
    return {
      kind: "infinite",
      determinant,
      determinantX,
      determinantY,
      x: null,
      y: null,
      message: "Kedua persamaan selalu benar, sehingga ada tak hingga solusi.",
    };
  }

  if (rowOneZero || rowTwoZero) {
    return {
      kind: "infinite",
      determinant,
      determinantX,
      determinantY,
      x: null,
      y: null,
      message:
        "Salah satu persamaan tidak membatasi variabel, sehingga ada tak hingga solusi.",
    };
  }

  if (determinantX === 0 && determinantY === 0) {
    return {
      kind: "infinite",
      determinant,
      determinantX,
      determinantY,
      x: null,
      y: null,
      message:
        "Kedua persamaan saling berimpit, sehingga ada tak hingga solusi.",
    };
  }

  return {
    kind: "none",
    determinant,
    determinantX,
    determinantY,
    x: null,
    y: null,
    message:
      "Kedua garis sejajar dan tidak berpotongan, sehingga tidak ada solusi.",
  };
}
