import { assertFinite, cleanNumber, MathDomainError } from "./errors";

export function percentOf(percent: number, value: number): number {
  assertFinite(percent, "Persen");
  assertFinite(value, "Angka");

  return cleanNumber((percent / 100) * value);
}

export function percentChange(from: number, to: number): number {
  assertFinite(from, "Nilai awal");
  assertFinite(to, "Nilai akhir");

  if (from === 0) {
    throw new MathDomainError(
      "Nilai awal tidak boleh 0 karena perubahan persen membagi dengan nilai awal.",
    );
  }

  return cleanNumber(((to - from) / Math.abs(from)) * 100);
}

export function percentDifference(a: number, b: number): number {
  assertFinite(a, "Nilai pertama");
  assertFinite(b, "Nilai kedua");

  const average = (Math.abs(a) + Math.abs(b)) / 2;

  if (average === 0) {
    throw new MathDomainError(
      "Selisih persen tidak dapat dihitung jika kedua nilai bernilai 0.",
    );
  }

  return cleanNumber((Math.abs(a - b) / average) * 100);
}
