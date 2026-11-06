export class MathDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MathDomainError";
  }
}

export function assertFinite(value: number, label = "Nilai"): number {
  if (!Number.isFinite(value)) {
    throw new MathDomainError(`${label} harus berupa bilangan berhingga.`);
  }

  return value;
}

export function assertPositive(value: number, label: string): number {
  assertFinite(value, label);

  if (value <= 0) {
    throw new MathDomainError(`${label} harus lebih dari 0.`);
  }

  return value;
}

export function assertNonNegative(value: number, label: string): number {
  assertFinite(value, label);

  if (value < 0) {
    throw new MathDomainError(`${label} tidak boleh negatif.`);
  }

  return value;
}

export function assertNonZero(value: number, label: string): number {
  assertFinite(value, label);

  if (value === 0) {
    throw new MathDomainError(`${label} tidak boleh nol.`);
  }

  return value;
}

export function cleanNumber(value: number): number {
  if (!Number.isFinite(value)) {
    throw new MathDomainError("Hasil perhitungan di luar jangkauan angka.");
  }

  const cleaned = Number(value.toPrecision(15));

  return Object.is(cleaned, -0) ? 0 : cleaned;
}
