import { assertFinite, MathDomainError } from "./math/errors";

export interface UnitDefinition {
  value: string;
  label: string;
  symbol: string;
  factor: number;
}

export const LENGTH_UNITS: UnitDefinition[] = [
  { value: "m", label: "Meter (m)", symbol: "m", factor: 1 },
  { value: "km", label: "Kilometer (km)", symbol: "km", factor: 1000 },
  { value: "cm", label: "Sentimeter (cm)", symbol: "cm", factor: 0.01 },
  { value: "mm", label: "Milimeter (mm)", symbol: "mm", factor: 0.001 },
];

export const TIME_UNITS: UnitDefinition[] = [
  { value: "s", label: "Detik (s)", symbol: "s", factor: 1 },
  { value: "min", label: "Menit (menit)", symbol: "menit", factor: 60 },
  { value: "h", label: "Jam (jam)", symbol: "jam", factor: 3600 },
  { value: "ms", label: "Milidetik (ms)", symbol: "ms", factor: 0.001 },
];

export const SPEED_UNITS: UnitDefinition[] = [
  { value: "m/s", label: "Meter per detik (m/s)", symbol: "m/s", factor: 1 },
  {
    value: "km/h",
    label: "Kilometer per jam (km/jam)",
    symbol: "km/jam",
    factor: 1000 / 3600,
  },
  { value: "cm/s", label: "Sentimeter per detik (cm/s)", symbol: "cm/s", factor: 0.01 },
];

export const ACCELERATION_UNITS: UnitDefinition[] = [
  { value: "m/s2", label: "Meter per detik kuadrat (m/s²)", symbol: "m/s²", factor: 1 },
  {
    value: "cm/s2",
    label: "Sentimeter per detik kuadrat (cm/s²)",
    symbol: "cm/s²",
    factor: 0.01,
  },
];

export const MASS_UNITS: UnitDefinition[] = [
  { value: "kg", label: "Kilogram (kg)", symbol: "kg", factor: 1 },
  { value: "g", label: "Gram (g)", symbol: "g", factor: 0.001 },
  { value: "ton", label: "Ton (ton)", symbol: "ton", factor: 1000 },
];

export const FORCE_UNITS: UnitDefinition[] = [
  { value: "N", label: "Newton (N)", symbol: "N", factor: 1 },
  { value: "kN", label: "Kilonewton (kN)", symbol: "kN", factor: 1000 },
];

export const ENERGY_UNITS: UnitDefinition[] = [
  { value: "J", label: "Joule (J)", symbol: "J", factor: 1 },
  { value: "kJ", label: "Kilojoule (kJ)", symbol: "kJ", factor: 1000 },
];

export const POWER_UNITS: UnitDefinition[] = [
  { value: "W", label: "Watt (W)", symbol: "W", factor: 1 },
  { value: "kW", label: "Kilowatt (kW)", symbol: "kW", factor: 1000 },
];

export const PRESSURE_UNITS: UnitDefinition[] = [
  { value: "Pa", label: "Pascal (Pa)", symbol: "Pa", factor: 1 },
  { value: "kPa", label: "Kilopascal (kPa)", symbol: "kPa", factor: 1000 },
  { value: "bar", label: "Bar (bar)", symbol: "bar", factor: 100000 },
  { value: "atm", label: "Atmosfer (atm)", symbol: "atm", factor: 101325 },
];

export const AREA_UNITS: UnitDefinition[] = [
  { value: "m2", label: "Meter persegi (m²)", symbol: "m²", factor: 1 },
  { value: "cm2", label: "Sentimeter persegi (cm²)", symbol: "cm²", factor: 0.0001 },
  { value: "mm2", label: "Milimeter persegi (mm²)", symbol: "mm²", factor: 0.000001 },
];

export const VOLUME_UNITS: UnitDefinition[] = [
  { value: "m3", label: "Meter kubik (m³)", symbol: "m³", factor: 1 },
  { value: "L", label: "Liter (L)", symbol: "L", factor: 0.001 },
  { value: "cm3", label: "Sentimeter kubik (cm³)", symbol: "cm³", factor: 0.000001 },
];

export const DENSITY_UNITS: UnitDefinition[] = [
  { value: "kg/m3", label: "Kilogram per meter kubik (kg/m³)", symbol: "kg/m³", factor: 1 },
  { value: "g/cm3", label: "Gram per sentimeter kubik (g/cm³)", symbol: "g/cm³", factor: 1000 },
];

export const ANGLE_UNITS: UnitDefinition[] = [
  { value: "deg", label: "Derajat (°)", symbol: "°", factor: 1 },
  { value: "rad", label: "Radian (rad)", symbol: "rad", factor: 180 / Math.PI },
];

export const ANGULAR_SPEED_UNITS: UnitDefinition[] = [
  { value: "rad/s", label: "Radian per detik (rad/s)", symbol: "rad/s", factor: 1 },
  {
    value: "rpm",
    label: "Putaran per menit (rpm)",
    symbol: "rpm",
    factor: (2 * Math.PI) / 60,
  },
];

export const MOMENT_UNITS: UnitDefinition[] = [
  { value: "N.m", label: "Newton meter (N·m)", symbol: "N·m", factor: 1 },
  { value: "kN.m", label: "Kilonewton meter (kN·m)", symbol: "kN·m", factor: 1000 },
];

export const INERTIA_UNITS: UnitDefinition[] = [
  { value: "kg.m2", label: "Kilogram meter persegi (kg·m²)", symbol: "kg·m²", factor: 1 },
];

export const VOLTAGE_UNITS: UnitDefinition[] = [
  { value: "V", label: "Volt (V)", symbol: "V", factor: 1 },
  { value: "mV", label: "Milivolt (mV)", symbol: "mV", factor: 0.001 },
  { value: "kV", label: "Kilovolt (kV)", symbol: "kV", factor: 1000 },
];

export const CURRENT_UNITS: UnitDefinition[] = [
  { value: "A", label: "Ampere (A)", symbol: "A", factor: 1 },
  { value: "mA", label: "Miliampere (mA)", symbol: "mA", factor: 0.001 },
];

export const RESISTANCE_UNITS: UnitDefinition[] = [
  { value: "ohm", label: "Ohm (Ω)", symbol: "Ω", factor: 1 },
  { value: "kohm", label: "Kiloohm (kΩ)", symbol: "kΩ", factor: 1000 },
  { value: "Mohm", label: "Megaohm (MΩ)", symbol: "MΩ", factor: 1000000 },
];

export const CHARGE_UNITS: UnitDefinition[] = [
  { value: "C", label: "Coulomb (C)", symbol: "C", factor: 1 },
  { value: "Ah", label: "Ampere jam (Ah)", symbol: "Ah", factor: 3600 },
];

export const ELECTRICAL_ENERGY_UNITS: UnitDefinition[] = [
  { value: "J", label: "Joule (J)", symbol: "J", factor: 1 },
  { value: "kJ", label: "Kilojoule (kJ)", symbol: "kJ", factor: 1000 },
  { value: "kWh", label: "Kilowatt jam (kWh)", symbol: "kWh", factor: 3600000 },
];

export const STRESS_UNITS: UnitDefinition[] = [
  { value: "Pa", label: "Pascal (Pa)", symbol: "Pa", factor: 1 },
  { value: "kPa", label: "Kilopascal (kPa)", symbol: "kPa", factor: 1000 },
  { value: "MPa", label: "Megapascal (MPa)", symbol: "MPa", factor: 1000000 },
  { value: "GPa", label: "Gigapascal (GPa)", symbol: "GPa", factor: 1000000000 },
];

export const AREA_UNITS_LARGE: UnitDefinition[] = [
  { value: "m2", label: "Meter persegi (m²)", symbol: "m²", factor: 1 },
  { value: "are", label: "Are (are)", symbol: "are", factor: 100 },
  { value: "ha", label: "Hektare (ha)", symbol: "ha", factor: 10000 },
  { value: "km2", label: "Kilometer persegi (km²)", symbol: "km²", factor: 1000000 },
];


export function findUnit(
  unitValue: string,
  units: UnitDefinition[],
): UnitDefinition {
  const unit = units.find((candidate) => candidate.value === unitValue);

  if (!unit) {
    throw new MathDomainError("Satuan yang dipilih tidak dikenali.");
  }

  return unit;
}

export function unitSymbol(unitValue: string, units: UnitDefinition[]): string {
  return findUnit(unitValue, units).symbol;
}

export function convertToBase(
  value: number,
  unitValue: string,
  units: UnitDefinition[],
): number {
  assertFinite(value, "Nilai");
  return value * findUnit(unitValue, units).factor;
}

export function convertFromBase(
  value: number,
  unitValue: string,
  units: UnitDefinition[],
): number {
  assertFinite(value, "Nilai");
  return value / findUnit(unitValue, units).factor;
}

export function unitOptions(units: UnitDefinition[]): Array<{
  value: string;
  label: string;
}> {
  return units.map((unit) => ({ value: unit.value, label: unit.label }));
}
