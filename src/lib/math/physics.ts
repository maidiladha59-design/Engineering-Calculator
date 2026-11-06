import {
  assertFinite,
  assertNonNegative,
  assertNonZero,
  assertPositive,
  cleanNumber,
  MathDomainError,
} from "./errors";

function finalize(value: number): number {
  return cleanNumber(value);
}

export function speed(distance: number, time: number): number {
  assertNonNegative(distance, "Jarak");
  assertPositive(time, "Waktu");

  return finalize(distance / time);
}

export function distanceFromSpeed(speedValue: number, time: number): number {
  assertNonNegative(speedValue, "Kecepatan");
  assertNonNegative(time, "Waktu");

  return finalize(speedValue * time);
}

export function timeFromSpeed(distance: number, speedValue: number): number {
  assertNonNegative(distance, "Jarak");
  assertPositive(speedValue, "Kecepatan");

  return finalize(distance / speedValue);
}

export function acceleration(
  finalVelocity: number,
  initialVelocity: number,
  time: number,
): number {
  assertFinite(finalVelocity, "Kecepatan akhir");
  assertFinite(initialVelocity, "Kecepatan awal");
  assertPositive(time, "Waktu");

  return finalize((finalVelocity - initialVelocity) / time);
}

export function finalVelocity(
  initialVelocity: number,
  accelerationValue: number,
  time: number,
): number {
  assertFinite(initialVelocity, "Kecepatan awal");
  assertFinite(accelerationValue, "Percepatan");
  assertNonNegative(time, "Waktu");

  return finalize(initialVelocity + accelerationValue * time);
}

export function initialVelocity(
  finalVelocityValue: number,
  accelerationValue: number,
  time: number,
): number {
  assertFinite(finalVelocityValue, "Kecepatan akhir");
  assertFinite(accelerationValue, "Percepatan");
  assertNonNegative(time, "Waktu");

  return finalize(finalVelocityValue - accelerationValue * time);
}

export function timeFromAcceleration(
  finalVelocityValue: number,
  initialVelocityValue: number,
  accelerationValue: number,
): number {
  assertFinite(finalVelocityValue, "Kecepatan akhir");
  assertFinite(initialVelocityValue, "Kecepatan awal");
  assertNonZero(accelerationValue, "Percepatan");

  const time = finalize(
    (finalVelocityValue - initialVelocityValue) / accelerationValue,
  );

  if (time < 0) {
    throw new MathDomainError(
      "Hasil waktu negatif. Periksa tanda kecepatan dan percepatan.",
    );
  }

  return time;
}

export function force(mass: number, accelerationValue: number): number {
  assertPositive(mass, "Massa");
  assertFinite(accelerationValue, "Percepatan");

  return finalize(mass * accelerationValue);
}

export function massFromForce(forceValue: number, accelerationValue: number): number {
  assertFinite(forceValue, "Gaya");
  assertNonZero(accelerationValue, "Percepatan");

  const mass = finalize(forceValue / accelerationValue);

  if (mass <= 0) {
    throw new MathDomainError(
      "Massa hasil perhitungan harus positif. Periksa tanda gaya dan percepatan.",
    );
  }

  return mass;
}

export function accelerationFromForce(forceValue: number, mass: number): number {
  assertFinite(forceValue, "Gaya");
  assertPositive(mass, "Massa");

  return finalize(forceValue / mass);
}

export function work(forceValue: number, displacement: number): number {
  assertFinite(forceValue, "Gaya");
  assertNonNegative(displacement, "Perpindahan");

  return finalize(forceValue * displacement);
}

export function forceFromWork(workValue: number, displacement: number): number {
  assertFinite(workValue, "Usaha");
  assertPositive(displacement, "Perpindahan");

  return finalize(workValue / displacement);
}

export function displacementFromWork(workValue: number, forceValue: number): number {
  assertFinite(workValue, "Usaha");
  assertNonZero(forceValue, "Gaya");

  const displacement = finalize(workValue / forceValue);

  if (displacement < 0) {
    throw new MathDomainError(
      "Perpindahan hasil perhitungan negatif. Periksa tanda usaha dan gaya.",
    );
  }

  return displacement;
}

export function power(workValue: number, time: number): number {
  assertFinite(workValue, "Usaha");
  assertPositive(time, "Waktu");

  return finalize(workValue / time);
}

export function workFromPower(powerValue: number, time: number): number {
  assertFinite(powerValue, "Daya");
  assertNonNegative(time, "Waktu");

  return finalize(powerValue * time);
}

export function timeFromWork(workValue: number, powerValue: number): number {
  assertFinite(workValue, "Usaha");
  assertNonZero(powerValue, "Daya");

  const time = finalize(workValue / powerValue);

  if (time < 0) {
    throw new MathDomainError(
      "Waktu hasil perhitungan negatif. Periksa tanda usaha dan daya.",
    );
  }

  return time;
}

export function momentum(mass: number, velocity: number): number {
  assertPositive(mass, "Massa");
  assertFinite(velocity, "Kecepatan");

  return finalize(mass * velocity);
}

export function massFromMomentum(momentumValue: number, velocity: number): number {
  assertFinite(momentumValue, "Momentum");
  assertNonZero(velocity, "Kecepatan");

  const mass = finalize(momentumValue / velocity);

  if (mass <= 0) {
    throw new MathDomainError(
      "Massa hasil perhitungan harus positif. Periksa tanda momentum dan kecepatan.",
    );
  }

  return mass;
}

export function velocityFromMomentum(momentumValue: number, mass: number): number {
  assertFinite(momentumValue, "Momentum");
  assertPositive(mass, "Massa");

  return finalize(momentumValue / mass);
}

export function impulse(forceValue: number, time: number): number {
  assertFinite(forceValue, "Gaya");
  assertPositive(time, "Selang waktu");

  return finalize(forceValue * time);
}

export function forceFromImpulse(impulseValue: number, time: number): number {
  assertFinite(impulseValue, "Impuls");
  assertPositive(time, "Selang waktu");

  return finalize(impulseValue / time);
}

export function timeFromImpulse(impulseValue: number, forceValue: number): number {
  assertFinite(impulseValue, "Impuls");
  assertNonZero(forceValue, "Gaya");

  const time = finalize(impulseValue / forceValue);

  if (time < 0) {
    throw new MathDomainError(
      "Selang waktu hasil perhitungan negatif. Periksa tanda impuls dan gaya.",
    );
  }

  return time;
}

export function pressure(forceValue: number, area: number): number {
  assertFinite(forceValue, "Gaya");
  assertPositive(area, "Luas bidang");

  return finalize(forceValue / area);
}

export function forceFromPressure(pressureValue: number, area: number): number {
  assertFinite(pressureValue, "Tekanan");
  assertPositive(area, "Luas bidang");

  return finalize(pressureValue * area);
}

export function areaFromPressure(pressureValue: number, forceValue: number): number {
  assertFinite(pressureValue, "Tekanan");
  assertNonZero(forceValue, "Gaya");

  const area = finalize(forceValue / pressureValue);

  if (area <= 0) {
    throw new MathDomainError(
      "Luas hasil perhitungan harus positif. Periksa tanda tekanan dan gaya.",
    );
  }

  return area;
}

export function density(mass: number, volume: number): number {
  assertNonNegative(mass, "Massa");
  assertPositive(volume, "Volume");

  return finalize(mass / volume);
}

export function massFromDensity(densityValue: number, volume: number): number {
  assertNonNegative(densityValue, "Massa jenis");
  assertPositive(volume, "Volume");

  return finalize(densityValue * volume);
}

export function volumeFromDensity(mass: number, densityValue: number): number {
  assertNonNegative(mass, "Massa");
  assertNonZero(densityValue, "Massa jenis");

  const volume = finalize(mass / densityValue);

  if (volume < 0) {
    throw new MathDomainError(
      "Volume hasil perhitungan negatif. Periksa tanda massa dan massa jenis.",
    );
  }

  return volume;
}
