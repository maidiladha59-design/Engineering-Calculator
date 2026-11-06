import type { StepItem } from "@/components/calculator/StepsList";
import { formatNumber } from "@/lib/format";
import { findUnit, type UnitDefinition } from "@/lib/units";

function baseSymbol(units: UnitDefinition[]): string {
  return units[0]?.symbol ?? "";
}

export function conversionStep(
  title: string,
  value: number,
  unitValue: string,
  units: UnitDefinition[],
): StepItem | null {
  const unit = findUnit(unitValue, units);

  if (unit.factor === 1) {
    return null;
  }

  return {
    title,
    detail: `${formatNumber(value)} ${unit.symbol} × ${formatNumber(unit.factor)} = ${formatNumber(value * unit.factor)} ${baseSymbol(units)}`,
  };
}

export function secondsToMinutes(seconds: number): number {
  return seconds / 60;
}

export function wattsToKilowatts(watts: number): number {
  return watts / 1000;
}
