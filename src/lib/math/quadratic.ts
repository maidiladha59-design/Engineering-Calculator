import { assertFinite, cleanNumber, MathDomainError } from "./errors";

export type QuadraticKind = "two-real" | "one-real" | "complex";

export interface ComplexRoot {
  real: number;
  imaginary: number;
}

export interface QuadraticSolution {
  kind: QuadraticKind;
  discriminant: number;
  sqrtDiscriminant: number | null;
  roots: [ComplexRoot, ComplexRoot];
  vertex: { x: number; y: number };
  axisOfSymmetry: number;
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticSolution {
  assertFinite(a, "Koefisien a");
  assertFinite(b, "Koefisien b");
  assertFinite(c, "Koefisien c");

  if (a === 0) {
    throw new MathDomainError(
      "Koefisien a tidak boleh 0 karena persamaan menjadi linear, bukan kuadrat.",
    );
  }

  const discriminant = cleanNumber(b * b - 4 * a * c);
  const axisOfSymmetry = cleanNumber(-b / (2 * a));
  const vertex = {
    x: axisOfSymmetry,
    y: cleanNumber(c - (b * b) / (4 * a)),
  };

  if (discriminant > 0) {
    const sqrtDiscriminant = cleanNumber(Math.sqrt(discriminant));
    const rootA = cleanNumber((-b + sqrtDiscriminant) / (2 * a));
    const rootB = cleanNumber((-b - sqrtDiscriminant) / (2 * a));

    return {
      kind: "two-real",
      discriminant,
      sqrtDiscriminant,
      roots: [
        { real: rootA, imaginary: 0 },
        { real: rootB, imaginary: 0 },
      ],
      vertex,
      axisOfSymmetry,
    };
  }

  if (discriminant === 0) {
    const root = cleanNumber(-b / (2 * a));

    return {
      kind: "one-real",
      discriminant,
      sqrtDiscriminant: 0,
      roots: [
        { real: root, imaginary: 0 },
        { real: root, imaginary: 0 },
      ],
      vertex,
      axisOfSymmetry,
    };
  }

  const realPart = cleanNumber(-b / (2 * a));
  const imaginaryPart = cleanNumber(Math.sqrt(-discriminant) / (2 * a));

  return {
    kind: "complex",
    discriminant,
    sqrtDiscriminant: null,
    roots: [
      { real: realPart, imaginary: imaginaryPart },
      { real: realPart, imaginary: -imaginaryPart },
    ],
    vertex,
    axisOfSymmetry,
  };
}
