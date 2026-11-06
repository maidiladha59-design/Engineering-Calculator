import { MathDomainError } from "./errors";

export interface BinaryAdditionBit {
  position: number;
  bitA: number;
  bitB: number;
  carryIn: number;
  sum: number;
  resultBit: number;
  carryOut: number;
}

export interface BinarySubtractionBit {
  position: number;
  bitA: number;
  bitB: number;
  borrowIn: number;
  difference: number;
  resultBit: number;
  borrowOut: number;
}

export interface BinaryAdditionResult {
  sum: string;
  decimal: string;
  bits: BinaryAdditionBit[];
  finalCarry: number;
}

export interface BinarySubtractionResult {
  difference: string;
  decimal: string;
  bits: BinarySubtractionBit[];
}

export interface PlaceValue {
  bit: string;
  power: number;
  contribution: string;
}

export interface DivisionStep {
  step: number;
  dividend: string;
  quotient: string;
  remainder: string;
}

function normalizeDigits(input: string, label: string): string {
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    throw new MathDomainError(`${label} wajib diisi.`);
  }

  return trimmed;
}

export function isBinary(input: string): boolean {
  return /^[01]+$/.test(input.trim());
}

export function parseBinary(input: string, label = "Bilangan biner"): bigint {
  const normalized = normalizeDigits(input, label);

  if (!/^[01]+$/.test(normalized)) {
    throw new MathDomainError(
      `${label} hanya boleh berisi angka 0 dan 1, tanpa spasi atau tanda baca.`,
    );
  }

  return BigInt(`0b${normalized}`);
}

export function decimalToBinary(value: bigint): string {
  if (value < BigInt(0)) {
    throw new MathDomainError(
      "Bilangan desimal harus nol atau positif untuk konversi biner tak bertanda.",
    );
  }

  return value.toString(2);
}

export function parseDecimal(input: string, label = "Bilangan desimal"): bigint {
  const normalized = normalizeDigits(input, label);

  if (!/^\d+$/.test(normalized)) {
    throw new MathDomainError(
      `${label} hanya boleh berisi angka 0–9 tanpa tanda minus, titik, atau koma.`,
    );
  }

  return BigInt(normalized);
}

export function binaryToDecimal(input: string, label = "Bilangan biner"): bigint {
  return parseBinary(input, label);
}

export function binaryPlaceValues(input: string): PlaceValue[] {
  const normalized = normalizeDigits(input, "Bilangan biner");

  if (!/^[01]+$/.test(normalized)) {
    throw new MathDomainError("Bilangan biner hanya boleh berisi 0 dan 1.");
  }

  return normalized.split("").map((bit, index) => {
    const power = normalized.length - 1 - index;
    const contribution = bit === "1" ? BigInt(2) ** BigInt(power) : BigInt(0);

    return {
      bit,
      power,
      contribution: contribution.toString(),
    };
  });
}

export function decimalToBinarySteps(value: bigint): DivisionStep[] {
  if (value < BigInt(0)) {
    throw new MathDomainError("Bilangan harus nol atau positif.");
  }

  if (value === BigInt(0)) {
    return [{ step: 1, dividend: "0", quotient: "0", remainder: "0" }];
  }

  const steps: DivisionStep[] = [];
  let remaining = value;
  let step = 1;

  while (remaining > BigInt(0)) {
    const quotient = remaining / BigInt(2);
    const remainder = remaining % BigInt(2);
    steps.push({
      step,
      dividend: remaining.toString(),
      quotient: quotient.toString(),
      remainder: remainder.toString(),
    });
    remaining = quotient;
    step += 1;
  }

  return steps;
}

export function addBinary(a: string, b: string): BinaryAdditionResult {
  const valueA = parseBinary(a, "Bilangan biner pertama");
  const valueB = parseBinary(b, "Bilangan biner kedua");

  if (valueA < BigInt(0) || valueB < BigInt(0)) {
    throw new MathDomainError("Bilangan biner harus nol atau positif.");
  }

  const normalizedA = a.trim();
  const normalizedB = b.trim();
  const width = Math.max(normalizedA.length, normalizedB.length);
  const paddedA = normalizedA.padStart(width, "0");
  const paddedB = normalizedB.padStart(width, "0");

  const bits: BinaryAdditionBit[] = [];
  let carry = 0;
  let result = "";

  for (let index = width - 1; index >= 0; index -= 1) {
    const bitA = Number(paddedA[index]);
    const bitB = Number(paddedB[index]);
    const sum = bitA + bitB + carry;
    const resultBit = sum % 2;
    const carryOut = sum >= 2 ? 1 : 0;

    bits.push({
      position: width - 1 - index,
      bitA,
      bitB,
      carryIn: carry,
      sum,
      resultBit,
      carryOut,
    });

    result = String(resultBit) + result;
    carry = carryOut;
  }

  if (carry === 1) {
    result = `1${result}`;
  }

  return {
    sum: result,
    decimal: (valueA + valueB).toString(),
    bits,
    finalCarry: carry,
  };
}

export function subtractBinary(a: string, b: string): BinarySubtractionResult {
  const valueA = parseBinary(a, "Bilangan biner pertama");
  const valueB = parseBinary(b, "Bilangan biner kedua");

  if (valueA < valueB) {
    throw new MathDomainError(
      "Pengurangan ini menghasilkan bilangan negatif. Kalkulator biner ini menampilkan hasil tak bertanda, jadi bilangan pertama harus lebih besar atau sama dengan bilangan kedua.",
    );
  }

  const normalizedA = a.trim().padStart(Math.max(a.trim().length, b.trim().length), "0");
  const normalizedB = b.trim().padStart(normalizedA.length, "0");
  const bits: BinarySubtractionBit[] = [];
  let borrow = 0;
  let result = "";

  for (let index = normalizedA.length - 1; index >= 0; index -= 1) {
    const bitA = Number(normalizedA[index]);
    const bitB = Number(normalizedB[index]);
    let difference = bitA - borrow - bitB;
    const borrowOut = difference < 0 ? 1 : 0;

    if (difference < 0) {
      difference += 2;
    }

    bits.push({
      position: normalizedA.length - 1 - index,
      bitA,
      bitB,
      borrowIn: borrow,
      difference,
      resultBit: difference,
      borrowOut,
    });

    result = String(difference) + result;
    borrow = borrowOut;
  }

  const trimmed = result.replace(/^0+(?=\d)/, "") || "0";

  return {
    difference: trimmed,
    decimal: (valueA - valueB).toString(),
    bits,
  };
}

export function parseHex(input: string, label = "Bilangan heksadesimal"): bigint {
  const normalized = normalizeDigits(input, label).toUpperCase();

  if (!/^[0-9A-F]+$/.test(normalized)) {
    throw new MathDomainError(
      `${label} hanya boleh berisi 0–9 dan A–F.`,
    );
  }

  return BigInt(`0x${normalized}`);
}

export function decimalToHex(value: bigint): string {
  if (value < BigInt(0)) {
    throw new MathDomainError("Bilangan desimal harus nol atau positif.");
  }

  return value.toString(16).toUpperCase();
}

export function parseOctal(input: string, label = "Bilangan oktal"): bigint {
  const normalized = normalizeDigits(input, label);

  if (!/^[0-7]+$/.test(normalized)) {
    throw new MathDomainError(`${label} hanya boleh berisi angka 0–7.`);
  }

  return BigInt(`0o${normalized}`);
}

export function decimalToOctal(value: bigint): string {
  if (value < BigInt(0)) {
    throw new MathDomainError("Bilangan desimal harus nol atau positif.");
  }

  return value.toString(8);
}

export function decimalToHexSteps(value: bigint): DivisionStep[] {
  if (value < BigInt(0)) {
    throw new MathDomainError("Bilangan desimal harus nol atau positif.");
  }

  if (value === BigInt(0)) {
    return [{ step: 1, dividend: "0", quotient: "0", remainder: "0" }];
  }

  const steps: DivisionStep[] = [];
  let remaining = value;
  let step = 1;

  while (remaining > BigInt(0)) {
    const quotient = remaining / BigInt(16);
    const remainder = remaining % BigInt(16);
    steps.push({
      step,
      dividend: remaining.toString(),
      quotient: quotient.toString(),
      remainder: remainder.toString(16).toUpperCase(),
    });
    remaining = quotient;
    step += 1;
  }

  return steps;
}

export function decimalToOctalSteps(value: bigint): DivisionStep[] {
  if (value < BigInt(0)) {
    throw new MathDomainError("Bilangan desimal harus nol atau positif.");
  }

  if (value === BigInt(0)) {
    return [{ step: 1, dividend: "0", quotient: "0", remainder: "0" }];
  }

  const steps: DivisionStep[] = [];
  let remaining = value;
  let step = 1;

  while (remaining > BigInt(0)) {
    const quotient = remaining / BigInt(8);
    const remainder = remaining % BigInt(8);
    steps.push({
      step,
      dividend: remaining.toString(),
      quotient: quotient.toString(),
      remainder: remainder.toString(),
    });
    remaining = quotient;
    step += 1;
  }

  return steps;
}

export function hexPlaceValues(input: string): PlaceValue[] {
  const normalized = normalizeDigits(input, "Bilangan heksadesimal").toUpperCase();

  if (!/^[0-9A-F]+$/.test(normalized)) {
    throw new MathDomainError("Bilangan heksadesimal tidak valid.");
  }

  return normalized.split("").map((digit, index) => {
    const power = normalized.length - 1 - index;
    const decimalDigit = parseInt(digit, 16);
    const contribution = BigInt(decimalDigit) * BigInt(16) ** BigInt(power);

    return {
      bit: digit,
      power,
      contribution: contribution.toString(),
    };
  });
}
