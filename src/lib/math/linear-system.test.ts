import { describe, expect, it } from "vitest";
import { MathDomainError } from "./errors";
import { solveLinearSystem } from "./linear-system";

describe("solveLinearSystem", () => {
  it("menemukan solusi unik (3, 2) untuk 2x + 3y = 12 dan x - y = 1", () => {
    const solution = solveLinearSystem(2, 3, 12, 1, -1, 1);

    expect(solution.kind).toBe("unique");
    expect(solution.determinant).toBe(-5);
    expect(solution.determinantX).toBe(-15);
    expect(solution.determinantY).toBe(-10);
    expect(solution.x).toBe(3);
    expect(solution.y).toBe(2);
  });

  it("mendeteksi tak hingga solusi untuk dua persamaan berimpit", () => {
    const solution = solveLinearSystem(1, 1, 2, 2, 2, 4);

    expect(solution.kind).toBe("infinite");
    expect(solution.x).toBeNull();
    expect(solution.y).toBeNull();
  });

  it("mendeteksi tidak ada solusi untuk dua garis sejajar", () => {
    const solution = solveLinearSystem(1, 1, 2, 1, 1, 5);

    expect(solution.kind).toBe("none");
    expect(solution.message).toMatch(/sejajar/);
  });

  it("mendeteksi persamaan 0 = konstanta bukan nol", () => {
    const solution = solveLinearSystem(0, 0, 5, 1, 1, 1);

    expect(solution.kind).toBe("none");
  });

  it("mendeteksi dua persamaan 0 = 0 sebagai tak hingga solusi", () => {
    const solution = solveLinearSystem(0, 0, 0, 0, 0, 0);

    expect(solution.kind).toBe("infinite");
  });

  it("menangani solusi pecahan", () => {
    const solution = solveLinearSystem(2, 1, 5, 1, -1, 1);

    expect(solution.kind).toBe("unique");
    expect(solution.x).toBe(2);
    expect(solution.y).toBe(1);
  });

  it("menolak koefisien bukan bilangan berhingga", () => {
    expect(() =>
      solveLinearSystem(1, Number.NaN, 2, 1, 1, 1),
    ).toThrow(MathDomainError);
  });
});
