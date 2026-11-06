import {
  assertNonNegative,
  assertPositive,
  cleanNumber,
  MathDomainError,
} from "./errors";

export const CONCRETE_MIX_RATIOS = {
  "1:2:3": { cement: 1, sand: 2, gravel: 3 },
  "1:2:4": { cement: 1, sand: 2, gravel: 4 },
} as const;

export type ConcreteMixRatio = keyof typeof CONCRETE_MIX_RATIOS;

const DRY_VOLUME_FACTOR = 1.5;
const CEMENT_DENSITY_KG_PER_M3 = 1440;
const SACK_KG = 50;

export function boxVolume(
  length: number,
  width: number,
  height: number,
): number {
  assertPositive(length, "Panjang");
  assertPositive(width, "Lebar");
  assertPositive(height, "Tinggi atau tebal");

  return cleanNumber(length * width * height);
}

export function rectangularColumnVolume(
  sideA: number,
  sideB: number,
  height: number,
): number {
  assertPositive(sideA, "Sisi A");
  assertPositive(sideB, "Sisi B");
  assertPositive(height, "Tinggi kolom");

  return cleanNumber(sideA * sideB * height);
}

export function circularColumnVolume(
  diameter: number,
  height: number,
): number {
  assertPositive(diameter, "Diameter");
  assertPositive(height, "Tinggi kolom");

  return cleanNumber(Math.PI * (diameter / 2) ** 2 * height);
}

export function buildingArea(
  length: number,
  width: number,
  floors: number,
): number {
  assertPositive(length, "Panjang");
  assertPositive(width, "Lebar");
  assertPositive(floors, "Jumlah lantai");

  if (!Number.isInteger(floors)) {
    throw new MathDomainError("Jumlah lantai harus bilangan bulat.");
  }

  return cleanNumber(length * width * floors);
}

export interface ConcreteMaterials {
  volume: number;
  dryVolume: number;
  cementKg: number;
  cementSacks: number;
  sandM3: number;
  gravelM3: number;
}

export function concreteMaterials(
  volume: number,
  ratio: ConcreteMixRatio,
  wastePercent = 0,
): ConcreteMaterials {
  assertNonNegative(volume, "Volume beton");
  assertNonNegative(wastePercent, "Persentase cadangan");

  if (wastePercent >= 100) {
    throw new MathDomainError(
      "Persentase cadangan harus kurang dari 100%.",
    );
  }

  const parts = CONCRETE_MIX_RATIOS[ratio];

  if (!parts) {
    throw new MathDomainError("Perbandingan campuran tidak dikenali.");
  }

  const partsTotal = parts.cement + parts.sand + parts.gravel;
  const adjustedVolume = volume * (1 + wastePercent / 100);
  const dryVolume = adjustedVolume * DRY_VOLUME_FACTOR;
  const cementVolume = (dryVolume * parts.cement) / partsTotal;
  const cementKg = cementVolume * CEMENT_DENSITY_KG_PER_M3;

  return {
    volume: cleanNumber(adjustedVolume),
    dryVolume: cleanNumber(dryVolume),
    cementKg: cleanNumber(cementKg),
    cementSacks: cleanNumber(cementKg / SACK_KG),
    sandM3: cleanNumber((dryVolume * parts.sand) / partsTotal),
    gravelM3: cleanNumber((dryVolume * parts.gravel) / partsTotal),
  };
}

export interface ConcreteMixPerSack {
  ratio: ConcreteMixRatio;
  cementSacks: number;
  sandM3: number;
  gravelM3: number;
  estimatedWaterLiters: number;
}

export function concreteMixPerSack(
  ratio: ConcreteMixRatio,
  sacks: number,
): ConcreteMixPerSack {
  assertPositive(sacks, "Jumlah sak semen");

  const parts = CONCRETE_MIX_RATIOS[ratio];

  if (!parts) {
    throw new MathDomainError("Perbandingan campuran tidak dikenali.");
  }

  const cementVolumePerSack = SACK_KG / CEMENT_DENSITY_KG_PER_M3;
  const sandM3 = cementVolumePerSack * parts.sand * sacks;
  const gravelM3 = cementVolumePerSack * parts.gravel * sacks;

  return {
    ratio,
    cementSacks: cleanNumber(sacks),
    sandM3: cleanNumber(sandM3),
    gravelM3: cleanNumber(gravelM3),
    estimatedWaterLiters: cleanNumber(25 * sacks),
  };
}

export interface RebarWeightResult {
  weightKg: number;
  weightTon: number;
  totalLengthM: number;
  massPerMeterKg: number;
}

const STEEL_DENSITY_KG_PER_M3 = 7850;

export function rebarWeight(
  diameterMm: number,
  lengthM: number,
  count: number,
): RebarWeightResult {
  assertPositive(diameterMm, "Diameter besi");
  assertPositive(lengthM, "Panjang batang");
  assertPositive(count, "Jumlah batang");

  if (!Number.isInteger(count)) {
    throw new MathDomainError("Jumlah batang harus bilangan bulat.");
  }

  const diameterM = diameterMm / 1000;
  const areaM2 = Math.PI * (diameterM / 2) ** 2;
  const massPerMeter = areaM2 * STEEL_DENSITY_KG_PER_M3;
  const totalLength = lengthM * count;
  const weightKg = massPerMeter * totalLength;

  return {
    weightKg: cleanNumber(weightKg),
    weightTon: cleanNumber(weightKg / 1000),
    totalLengthM: cleanNumber(totalLength),
    massPerMeterKg: cleanNumber(massPerMeter),
  };
}
