import { assertFinite, MathDomainError } from "./errors";

export interface ConversionUnit {
  value: string;
  label: string;
  symbol: string;
  factor: number;
  offset?: number;
}

export function findConversionUnit(
  units: ConversionUnit[],
  value: string,
): ConversionUnit {
  const unit = units.find((candidate) => candidate.value === value);

  if (!unit) {
    throw new MathDomainError("Satuan yang dipilih tidak dikenali.");
  }

  return unit;
}

export function convertValue(
  value: number,
  from: ConversionUnit,
  to: ConversionUnit,
): number {
  assertFinite(value, "Nilai");
  assertFinite(from.factor, "Faktor satuan asal");
  assertFinite(to.factor, "Faktor satuan tujuan");

  if (from.factor <= 0 || to.factor <= 0) {
    throw new MathDomainError("Faktor satuan harus lebih dari nol.");
  }

  const baseValue = (value + (from.offset ?? 0)) * from.factor;
  const result = baseValue / to.factor - (to.offset ?? 0);

  return Object.is(result, -0) ? 0 : Number(result.toPrecision(15));
}

export function convertToUnit(
  value: number,
  fromValue: string,
  toValue: string,
  units: ConversionUnit[],
): number {
  return convertValue(
    value,
    findConversionUnit(units, fromValue),
    findConversionUnit(units, toValue),
  );
}

export function conversionTable(
  value: number,
  fromValue: string,
  units: ConversionUnit[],
): Array<{ unit: ConversionUnit; value: number }> {
  const from = findConversionUnit(units, fromValue);

  return units.map((unit) => ({
    unit,
    value: convertValue(value, from, unit),
  }));
}
