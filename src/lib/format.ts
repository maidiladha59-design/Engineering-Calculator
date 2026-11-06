const numberFormatter = new Intl.NumberFormat("id-ID", {
  maximumSignificantDigits: 10,
});

const integerFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
});

function normalizeZero(value: number): number {
  return Object.is(value, -0) ? 0 : value;
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "Tidak terdefinisi";
  }

  const normalized = normalizeZero(value);
  const absolute = Math.abs(normalized);

  if (absolute !== 0 && (absolute >= 1e12 || absolute < 1e-6)) {
    return normalized
      .toExponential(4)
      .replace(".", ",")
      .replace("e+", " × 10^")
      .replace("e-", " × 10^-");
  }

  return numberFormatter.format(normalized);
}

export function formatInteger(value: number): string {
  if (!Number.isFinite(value)) {
    return "Tidak terdefinisi";
  }

  return integerFormatter.format(normalizeZero(value));
}

export function formatWithUnit(value: number, unit: string): string {
  return `${formatNumber(value)} ${unit}`;
}

export function formatPercent(value: number, digits = 2): string {
  if (!Number.isFinite(value)) {
    return "Tidak terdefinisi";
  }

  return `${new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: digits,
  }).format(normalizeZero(value))}%`;
}

export function formatCoordinate(value: number): string {
  return formatNumber(value);
}
