import { assertFinite, cleanNumber, MathDomainError } from "./errors";

export function logarithm(value: number, base: number): number {
  assertFinite(value, "Nilai logaritma");
  assertFinite(base, "Basis logaritma");

  if (value <= 0) {
    throw new MathDomainError(
      "Nilai logaritma harus lebih dari 0 (domain x > 0).",
    );
  }

  if (base <= 0) {
    throw new MathDomainError("Basis logaritma harus lebih dari 0.");
  }

  if (base === 1) {
    throw new MathDomainError("Basis logaritma tidak boleh 1.");
  }

  return cleanNumber(Math.log(value) / Math.log(base));
}
