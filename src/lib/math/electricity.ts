import {
  assertFinite,
  assertNonNegative,
  assertPositive,
  cleanNumber,
  MathDomainError,
} from "./errors";

export type OhmTarget = "voltage" | "current" | "resistance";

export function ohmsLaw(
  target: OhmTarget,
  voltage: number,
  current: number,
  resistance: number,
): number {
  if (target === "voltage") {
    assertNonNegative(current, "Arus");
    assertNonNegative(resistance, "Hambatan");

    return cleanNumber(current * resistance);
  }

  if (target === "current") {
    assertNonNegative(voltage, "Tegangan");
    assertPositive(resistance, "Hambatan");

    return cleanNumber(voltage / resistance);
  }

  assertNonNegative(voltage, "Tegangan");
  assertPositive(current, "Arus");

  return cleanNumber(voltage / current);
}

export type PowerMethod = "vi" | "i2r" | "v2r";

export function electricalPower(
  method: PowerMethod,
  first: number,
  second: number,
): number {
  if (method === "vi") {
    assertNonNegative(first, "Tegangan");
    assertNonNegative(second, "Arus");

    return cleanNumber(first * second);
  }

  if (method === "i2r") {
    assertNonNegative(first, "Arus");
    assertNonNegative(second, "Hambatan");

    return cleanNumber(first * first * second);
  }

  assertNonNegative(first, "Tegangan");
  assertPositive(second, "Hambatan");

  return cleanNumber((first * first) / second);
}

export function wireResistance(
  resistivity: number,
  length: number,
  areaMm2: number,
): number {
  assertNonNegative(resistivity, "Resistivitas");
  assertNonNegative(length, "Panjang kawat");
  assertPositive(areaMm2, "Luas penampang");

  return cleanNumber((resistivity * length) / areaMm2);
}

export function seriesResistance(resistances: number[]): number {
  if (resistances.length === 0) {
    throw new MathDomainError("Tambahkan minimal satu resistor.");
  }

  return cleanNumber(
    resistances.reduce((total, value) => {
      assertNonNegative(value, "Hambatan");
      return total + value;
    }, 0),
  );
}

export function parallelResistance(resistances: number[]): number {
  if (resistances.length === 0) {
    throw new MathDomainError("Tambahkan minimal satu resistor.");
  }

  for (const value of resistances) {
    assertNonNegative(value, "Hambatan");

    if (value === 0) {
      return 0;
    }
  }

  const reciprocal = resistances.reduce(
    (total, value) => total + 1 / value,
    0,
  );

  return cleanNumber(1 / reciprocal);
}

export interface ElectricalEnergyResult {
  kilowattHours: number;
  joules: number;
  cost: number;
}

export function electricalEnergy(
  powerKw: number,
  hours: number,
  tariffPerKwh: number,
): ElectricalEnergyResult {
  assertNonNegative(powerKw, "Daya");
  assertNonNegative(hours, "Waktu");
  assertNonNegative(tariffPerKwh, "Tarif listrik");

  const kilowattHours = powerKw * hours;

  return {
    kilowattHours: cleanNumber(kilowattHours),
    joules: cleanNumber(kilowattHours * 3600000),
    cost: cleanNumber(kilowattHours * tariffPerKwh),
  };
}

export function energyCost(
  energyKwh: number,
  tariffPerKwh: number,
): number {
  assertNonNegative(energyKwh, "Energi");
  assertNonNegative(tariffPerKwh, "Tarif listrik");

  return cleanNumber(energyKwh * tariffPerKwh);
}

export function mechanicalPowerFromTorque(
  torqueNm: number,
  angularVelocityRadPerSecond: number,
): number {
  assertFinite(torqueNm, "Torsi");
  assertFinite(angularVelocityRadPerSecond, "Kecepatan sudut");

  return cleanNumber(torqueNm * angularVelocityRadPerSecond);
}
