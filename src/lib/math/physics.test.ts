import { describe, expect, it } from "vitest";
import { MathDomainError } from "./errors";
import {
  acceleration,
  accelerationFromForce,
  areaFromPressure,
  density,
  displacementFromWork,
  distanceFromSpeed,
  finalVelocity,
  force,
  forceFromImpulse,
  forceFromPressure,
  forceFromWork,
  impulse,
  initialVelocity,
  massFromDensity,
  massFromForce,
  massFromMomentum,
  momentum,
  power,
  pressure,
  speed,
  timeFromAcceleration,
  timeFromImpulse,
  timeFromSpeed,
  timeFromWork,
  velocityFromMomentum,
  volumeFromDensity,
  work,
  workFromPower,
} from "./physics";

describe("Kecepatan (v = s/t)", () => {
  it("menghitung kecepatan 100 m dalam 20 s", () => {
    expect(speed(100, 20)).toBe(5);
  });

  it("menghitung jarak dari kecepatan 20 m/s selama 5 s", () => {
    expect(distanceFromSpeed(20, 5)).toBe(100);
    expect(timeFromSpeed(100, 20)).toBe(5);
  });

  it("menghasilkan 0 untuk jarak 0", () => {
    expect(speed(0, 10)).toBe(0);
  });

  it("menolak waktu nol dan jarak negatif", () => {
    expect(() => speed(10, 0)).toThrow(/Waktu harus lebih dari 0/);
    expect(() => speed(-10, 5)).toThrow(/Jarak tidak boleh negatif/);
    expect(() => timeFromSpeed(100, 0)).toThrow(MathDomainError);
  });
});

describe("Percepatan (a = Δv/t)", () => {
  it("menghitung percepatan 0 ke 20 m/s dalam 5 s", () => {
    expect(acceleration(20, 0, 5)).toBe(4);
  });

  it("menghitung kecepatan akhir dan awal", () => {
    expect(finalVelocity(0, 2, 10)).toBe(20);
    expect(initialVelocity(20, 2, 10)).toBe(0);
    expect(timeFromAcceleration(20, 0, 2)).toBe(10);
  });

  it("menghasilkan 0 saat kecepatan tidak berubah", () => {
    expect(acceleration(10, 10, 5)).toBe(0);
  });

  it("menolak waktu nol", () => {
    expect(() => acceleration(10, 0, 0)).toThrow(/Waktu harus lebih dari 0/);
  });

  it("menolak waktu hasil perhitungan negatif", () => {
    expect(() => timeFromAcceleration(0, 20, 2)).toThrow(/negatif/);
    expect(() => timeFromAcceleration(10, 0, 0)).toThrow(/tidak boleh nol/);
  });
});

describe("Gaya (F = m·a)", () => {
  it("menghitung gaya 1200 kg × 2 m/s²", () => {
    expect(force(1200, 2)).toBe(2400);
  });

  it("menghitung massa dan percepatan dari gaya", () => {
    expect(massFromForce(2400, 2)).toBe(1200);
    expect(accelerationFromForce(2400, 1200)).toBe(2);
  });

  it("menghasilkan 0 saat percepatan 0", () => {
    expect(force(75, 0)).toBe(0);
  });

  it("menolak massa nol atau negatif", () => {
    expect(() => force(0, 2)).toThrow(/Massa harus lebih dari 0/);
    expect(() => force(-5, 2)).toThrow(MathDomainError);
  });

  it("menolak massa hasil perhitungan tidak positif", () => {
    expect(() => massFromForce(-2400, 2)).toThrow(/harus positif/);
    expect(() => massFromForce(2400, 0)).toThrow(/tidak boleh nol/);
  });
});

describe("Usaha & Energi (W = F·s)", () => {
  it("menghitung usaha 50 N × 8 m = 400 J", () => {
    expect(work(50, 8)).toBe(400);
  });

  it("menghitung gaya dan perpindahan dari usaha", () => {
    expect(forceFromWork(400, 8)).toBe(50);
    expect(displacementFromWork(400, 50)).toBe(8);
  });

  it("menghasilkan 0 saat perpindahan 0", () => {
    expect(work(50, 0)).toBe(0);
  });

  it("menolak perpindahan negatif", () => {
    expect(() => work(50, -8)).toThrow(/tidak boleh negatif/);
  });

  it("menolak pembagi nol saat mencari gaya atau perpindahan", () => {
    expect(() => forceFromWork(400, 0)).toThrow(/lebih dari 0/);
    expect(() => displacementFromWork(400, 0)).toThrow(/tidak boleh nol/);
    expect(() => displacementFromWork(-400, 50)).toThrow(/negatif/);
  });
});

describe("Daya (P = W/t)", () => {
  it("menghitung daya 1200 J dalam 4 s = 300 W", () => {
    expect(power(1200, 4)).toBe(300);
  });

  it("menghitung usaha dan waktu dari daya", () => {
    expect(workFromPower(300, 4)).toBe(1200);
    expect(timeFromWork(1200, 300)).toBe(4);
  });

  it("menghasilkan 0 saat usaha 0", () => {
    expect(power(0, 4)).toBe(0);
  });

  it("menolak waktu nol", () => {
    expect(() => power(1200, 0)).toThrow(/Waktu harus lebih dari 0/);
  });

  it("menolak waktu hasil perhitungan negatif", () => {
    expect(() => timeFromWork(-1200, 300)).toThrow(/negatif/);
    expect(() => timeFromWork(1200, 0)).toThrow(/tidak boleh nol/);
  });
});

describe("Momentum (p = m·v)", () => {
  it("menghitung momentum 1500 kg × 20 m/s", () => {
    expect(momentum(1500, 20)).toBe(30000);
  });

  it("menghitung massa dan kecepatan dari momentum", () => {
    expect(massFromMomentum(30000, 20)).toBe(1500);
    expect(velocityFromMomentum(30000, 1500)).toBe(20);
  });

  it("menghasilkan 0 saat kecepatan 0", () => {
    expect(momentum(10, 0)).toBe(0);
  });

  it("mendukung kecepatan negatif (arah berlawanan)", () => {
    expect(momentum(2, -3)).toBe(-6);
  });

  it("menolak massa tidak positif", () => {
    expect(() => momentum(0, 10)).toThrow(/Massa harus lebih dari 0/);
    expect(() => massFromMomentum(-100, 20)).toThrow(/harus positif/);
  });

  it("menolak kecepatan nol saat mencari massa", () => {
    expect(() => massFromMomentum(100, 0)).toThrow(/tidak boleh nol/);
  });
});

describe("Impuls (I = F·t)", () => {
  it("menghitung impuls 20 N × 0,5 s = 10 N·s", () => {
    expect(impulse(20, 0.5)).toBe(10);
  });

  it("menghitung gaya dan waktu dari impuls", () => {
    expect(forceFromImpulse(10, 2)).toBe(5);
    expect(timeFromImpulse(10, 20)).toBe(0.5);
  });

  it("menghasilkan 0 saat gaya 0", () => {
    expect(impulse(0, 0.5)).toBe(0);
  });

  it("menolak waktu nol atau negatif", () => {
    expect(() => impulse(20, 0)).toThrow(/Selang waktu harus lebih dari 0/);
    expect(() => impulse(20, -1)).toThrow(MathDomainError);
  });

  it("menolak waktu hasil perhitungan negatif", () => {
    expect(() => timeFromImpulse(-10, 20)).toThrow(/negatif/);
    expect(() => timeFromImpulse(10, 0)).toThrow(/tidak boleh nol/);
  });
});

describe("Tekanan (P = F/A)", () => {
  it("menghitung tekanan 500 N / 0,25 m² = 2000 Pa", () => {
    expect(pressure(500, 0.25)).toBe(2000);
  });

  it("menghitung gaya dan luas dari tekanan", () => {
    expect(forceFromPressure(2000, 0.25)).toBe(500);
    expect(areaFromPressure(2000, 500)).toBe(0.25);
  });

  it("menghasilkan 0 saat gaya 0", () => {
    expect(pressure(0, 0.25)).toBe(0);
  });

  it("menolak luas nol atau negatif", () => {
    expect(() => pressure(500, 0)).toThrow(/Luas bidang harus lebih dari 0/);
    expect(() => pressure(500, -0.25)).toThrow(MathDomainError);
  });

  it("menolak luas hasil perhitungan tidak positif", () => {
    expect(() => areaFromPressure(-2000, 500)).toThrow(/harus positif/);
    expect(() => areaFromPressure(2000, 0)).toThrow(/tidak boleh nol/);
  });
});

describe("Massa Jenis (ρ = m/V)", () => {
  it("menghitung massa jenis 2 kg / 0,002 m³ = 1000 kg/m³", () => {
    expect(density(2, 0.002)).toBeCloseTo(1000, 9);
  });

  it("menghitung massa dan volume dari massa jenis", () => {
    expect(massFromDensity(1000, 0.002)).toBeCloseTo(2, 9);
    expect(volumeFromDensity(2, 1000)).toBeCloseTo(0.002, 12);
  });

  it("menghasilkan 0 saat massa 0", () => {
    expect(density(0, 2)).toBe(0);
  });

  it("menolak volume nol atau negatif", () => {
    expect(() => density(2, 0)).toThrow(/Volume harus lebih dari 0/);
    expect(() => density(2, -1)).toThrow(MathDomainError);
  });

  it("menolak massa negatif", () => {
    expect(() => density(-2, 1)).toThrow(/Massa tidak boleh negatif/);
    expect(() => massFromDensity(-1000, 1)).toThrow(MathDomainError);
  });

  it("menolak massa jenis nol saat mencari volume", () => {
    expect(() => volumeFromDensity(2, 0)).toThrow(/tidak boleh nol/);
    expect(() => volumeFromDensity(2, -1000)).toThrow(/negatif/);
  });
});
