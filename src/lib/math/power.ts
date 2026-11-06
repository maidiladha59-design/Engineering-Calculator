import { assertFinite, cleanNumber, MathDomainError } from "./errors";

export function power(base: number, exponent: number): number {
  assertFinite(base, "Bilangan pokok");
  assertFinite(exponent, "Pangkat");

  if (base === 0 && exponent === 0) {
    throw new MathDomainError("0 pangkat 0 tidak terdefinisi.");
  }

  if (base < 0 && !Number.isInteger(exponent)) {
    throw new MathDomainError(
      "Pangkat pecahan dari bilangan negatif menghasilkan bilangan kompleks dan tidak didukung di sini.",
    );
  }

  return cleanNumber(Math.pow(base, exponent));
}

export function nthRoot(radicand: number, index: number): number {
  assertFinite(radicand, "Bilangan yang diakar");
  assertFinite(index, "Indeks akar");

  if (!Number.isInteger(index)) {
    throw new MathDomainError("Indeks akar harus berupa bilangan bulat.");
  }

  if (index < 2) {
    throw new MathDomainError("Indeks akar minimal 2.");
  }

  if (radicand < 0 && index % 2 === 0) {
    throw new MathDomainError(
      "Akar berindeks genap dari bilangan negatif tidak menghasilkan bilangan real.",
    );
  }

  const magnitude = Math.pow(Math.abs(radicand), 1 / index);

  return cleanNumber(radicand < 0 ? -magnitude : magnitude);
}
