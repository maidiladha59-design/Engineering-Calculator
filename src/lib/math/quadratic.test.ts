import { describe, expect, it } from "vitest";
import { MathDomainError } from "./errors";
import { solveQuadratic } from "./quadratic";

describe("solveQuadratic", () => {
  it("menghasilkan dua akar real untuk x² - 5x + 6 = 0", () => {
    const solution = solveQuadratic(1, -5, 6);

    expect(solution.kind).toBe("two-real");
    expect(solution.discriminant).toBe(1);
    expect(solution.sqrtDiscriminant).toBe(1);
    expect(solution.roots[0]).toEqual({ real: 3, imaginary: 0 });
    expect(solution.roots[1]).toEqual({ real: 2, imaginary: 0 });
    expect(solution.axisOfSymmetry).toBe(2.5);
    expect(solution.vertex).toEqual({ x: 2.5, y: -0.25 });
  });

  it("menghasilkan dua akar real pecahan dan negatif untuk 2x² + 3x - 2 = 0", () => {
    const solution = solveQuadratic(2, 3, -2);

    expect(solution.kind).toBe("two-real");
    expect(solution.discriminant).toBe(25);
    expect(solution.roots[0].real).toBe(0.5);
    expect(solution.roots[1].real).toBe(-2);
  });

  it("menghasilkan satu akar real untuk x² - 4x + 4 = 0", () => {
    const solution = solveQuadratic(1, -4, 4);

    expect(solution.kind).toBe("one-real");
    expect(solution.discriminant).toBe(0);
    expect(solution.roots[0].real).toBe(2);
    expect(solution.roots[1].real).toBe(2);
    expect(solution.vertex).toEqual({ x: 2, y: 0 });
  });

  it("menghasilkan akar kompleks untuk x² + 1 = 0", () => {
    const solution = solveQuadratic(1, 0, 1);

    expect(solution.kind).toBe("complex");
    expect(solution.discriminant).toBe(-4);
    expect(solution.sqrtDiscriminant).toBeNull();
    expect(solution.roots[0]).toEqual({ real: 0, imaginary: 1 });
    expect(solution.roots[1]).toEqual({ real: 0, imaginary: -1 });
  });

  it("menolak koefisien a = 0", () => {
    expect(() => solveQuadratic(0, 2, 1)).toThrow(MathDomainError);
    expect(() => solveQuadratic(0, 2, 1)).toThrow(/linear/);
  });

  it("menolak koefisien bukan bilangan berhingga", () => {
    expect(() => solveQuadratic(Number.NaN, 1, 1)).toThrow(MathDomainError);
  });
});
