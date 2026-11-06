import {
  assertFinite,
  assertNonNegative,
  assertPositive,
  cleanNumber,
  MathDomainError,
} from "./errors";

function degreesToRadians(degrees: number): number {
  assertFinite(degrees, "Sudut");
  return (degrees * Math.PI) / 180;
}

export function momentOfForce(
  force: number,
  distance: number,
  angleDegrees: number,
): { moment: number; leverArm: number } {
  assertNonNegative(force, "Gaya");
  assertNonNegative(distance, "Lengan gaya");
  const angle = degreesToRadians(angleDegrees);
  const leverArm = distance * Math.sin(angle);

  return {
    moment: cleanNumber(force * leverArm),
    leverArm: cleanNumber(leverArm),
  };
}

export function torque(
  force: number,
  radius: number,
  angleDegrees: number,
): { torque: number; tangentialForce: number } {
  assertNonNegative(force, "Gaya");
  assertNonNegative(radius, "Jari-jari");
  const angle = degreesToRadians(angleDegrees);
  const tangentialForce = force * Math.sin(angle);

  return {
    torque: cleanNumber(radius * tangentialForce),
    tangentialForce: cleanNumber(tangentialForce),
  };
}

export interface BeamReactions {
  left: number;
  right: number;
  total: number;
}

export function simplySupportedReactions(
  span: number,
  load: number,
  loadPosition: number,
): BeamReactions {
  assertPositive(span, "Panjang balok");
  assertNonNegative(load, "Beban");
  assertNonNegative(loadPosition, "Posisi beban");

  if (loadPosition > span) {
    throw new MathDomainError(
      "Posisi beban tidak boleh melebihi panjang balok.",
    );
  }

  const right = (load * loadPosition) / span;
  const left = load - right;

  return {
    left: cleanNumber(left),
    right: cleanNumber(right),
    total: cleanNumber(left + right),
  };
}

export interface MassPoint {
  mass: number;
  x: number;
  y: number;
}

export interface CenterOfMassResult {
  x: number;
  y: number;
  totalMass: number;
  points: number;
}

export function centerOfMass(points: MassPoint[]): CenterOfMassResult {
  if (points.length === 0) {
    throw new MathDomainError("Tambahkan minimal satu titik bermassa.");
  }

  let totalMass = 0;
  let weightedX = 0;
  let weightedY = 0;

  for (const point of points) {
    assertPositive(point.mass, "Massa titik");
    assertFinite(point.x, "Koordinat x");
    assertFinite(point.y, "Koordinat y");
    totalMass += point.mass;
    weightedX += point.mass * point.x;
    weightedY += point.mass * point.y;
  }

  return {
    x: cleanNumber(weightedX / totalMass),
    y: cleanNumber(weightedY / totalMass),
    totalMass: cleanNumber(totalMass),
    points: points.length,
  };
}

export type InertiaShape =
  | "silinder-pejal"
  | "bola-pejal"
  | "batang-tengah"
  | "batang-ujung";

export interface InertiaResult {
  inertia: number;
  formula: string;
  dimensionLabel: string;
}

export function massMomentOfInertia(
  shape: InertiaShape,
  mass: number,
  dimension: number,
): InertiaResult {
  assertPositive(mass, "Massa");
  assertPositive(dimension, "Dimensi");

  if (shape === "silinder-pejal") {
    return {
      inertia: cleanNumber(0.5 * mass * dimension * dimension),
      formula: String.raw`I=\frac{1}{2}mr^{2}`,
      dimensionLabel: "Jari-jari (r)",
    };
  }

  if (shape === "bola-pejal") {
    return {
      inertia: cleanNumber(0.4 * mass * dimension * dimension),
      formula: String.raw`I=\frac{2}{5}mr^{2}`,
      dimensionLabel: "Jari-jari (r)",
    };
  }

  if (shape === "batang-tengah") {
    return {
      inertia: cleanNumber((mass * dimension * dimension) / 12),
      formula: String.raw`I=\frac{1}{12}mL^{2}`,
      dimensionLabel: "Panjang batang (L)",
    };
  }

  return {
    inertia: cleanNumber((mass * dimension * dimension) / 3),
    formula: String.raw`I=\frac{1}{3}mL^{2}`,
    dimensionLabel: "Panjang batang (L)",
  };
}

export function rotationalKineticEnergy(
  inertia: number,
  angularVelocity: number,
): number {
  assertNonNegative(inertia, "Momen inersia");
  assertFinite(angularVelocity, "Kecepatan sudut");

  return cleanNumber(0.5 * inertia * angularVelocity * angularVelocity);
}

export function normalStress(force: number, area: number): number {
  assertFinite(force, "Gaya");
  assertPositive(area, "Luas penampang");

  return cleanNumber(force / area);
}

export function normalStrain(
  elongation: number,
  originalLength: number,
): number {
  assertFinite(elongation, "Perubahan panjang");
  assertPositive(originalLength, "Panjang awal");

  return cleanNumber(elongation / originalLength);
}

export function youngsModulus(stress: number, strain: number): number {
  assertFinite(stress, "Tegangan");
  assertFinite(strain, "Regangan");

  if (strain === 0) {
    throw new MathDomainError(
      "Regangan tidak boleh nol karena modulus elastisitas membagi tegangan dengan regangan.",
    );
  }

  return cleanNumber(stress / strain);
}

export function stressFromModulus(
  modulus: number,
  strain: number,
): number {
  assertPositive(modulus, "Modulus elastisitas");
  assertFinite(strain, "Regangan");

  return cleanNumber(modulus * strain);
}

export function strainFromModulus(
  stress: number,
  modulus: number,
): number {
  assertFinite(stress, "Tegangan");
  assertPositive(modulus, "Modulus elastisitas");

  return cleanNumber(stress / modulus);
}
