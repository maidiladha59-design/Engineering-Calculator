import { MathDomainError } from "./errors";

export interface Fraction {
  numerator: number;
  denominator: number;
}

export type FractionOperator = "+" | "-" | "×" | "÷";

function assertInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value)) {
    throw new MathDomainError(`${label} harus berupa bilangan bulat.`);
  }
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }

  return x;
}

export function simplifyFraction(numerator: number, denominator: number): Fraction {
  assertInteger(numerator, "Pembilang");
  assertInteger(denominator, "Penyebut");

  if (denominator === 0) {
    throw new MathDomainError("Penyebut tidak boleh nol.");
  }

  let n = numerator;
  let d = denominator;

  if (d < 0) {
    n = -n;
    d = -d;
  }

  if (n === 0) {
    return { numerator: 0, denominator: 1 };
  }

  const divisor = gcd(n, d);

  return {
    numerator: n / divisor,
    denominator: d / divisor,
  };
}

export function addFractions(a: Fraction, b: Fraction): Fraction {
  return simplifyFraction(
    a.numerator * b.denominator + b.numerator * a.denominator,
    a.denominator * b.denominator,
  );
}

export function subtractFractions(a: Fraction, b: Fraction): Fraction {
  return simplifyFraction(
    a.numerator * b.denominator - b.numerator * a.denominator,
    a.denominator * b.denominator,
  );
}

export function multiplyFractions(a: Fraction, b: Fraction): Fraction {
  return simplifyFraction(
    a.numerator * b.numerator,
    a.denominator * b.denominator,
  );
}

export function divideFractions(a: Fraction, b: Fraction): Fraction {
  if (b.numerator === 0) {
    throw new MathDomainError(
      "Tidak dapat membagi dengan pecahan yang bernilai nol.",
    );
  }

  return simplifyFraction(
    a.numerator * b.denominator,
    a.denominator * b.numerator,
  );
}

export function operateFractions(
  a: Fraction,
  b: Fraction,
  operator: FractionOperator,
): Fraction {
  if (a.denominator === 0 || b.denominator === 0) {
    throw new MathDomainError("Penyebut tidak boleh nol.");
  }

  switch (operator) {
    case "+":
      return addFractions(a, b);
    case "-":
      return subtractFractions(a, b);
    case "×":
      return multiplyFractions(a, b);
    case "÷":
      return divideFractions(a, b);
    default:
      throw new MathDomainError("Operasi pecahan tidak dikenali.");
  }
}

export function fractionToDecimal(fraction: Fraction): number {
  return fraction.numerator / fraction.denominator;
}

export function fractionToText(fraction: Fraction): string {
  if (fraction.denominator === 1) {
    return String(fraction.numerator);
  }

  return `${fraction.numerator}/${fraction.denominator}`;
}

export interface MixedNumber {
  whole: number;
  numerator: number;
  denominator: number;
}

export function fractionToMixed(fraction: Fraction): MixedNumber {
  if (fraction.denominator === 1) {
    return {
      whole: fraction.numerator,
      numerator: 0,
      denominator: 1,
    };
  }

  const whole = Math.trunc(fraction.numerator / fraction.denominator);
  const remainder = Math.abs(fraction.numerator % fraction.denominator);

  return {
    whole,
    numerator: remainder,
    denominator: fraction.denominator,
  };
}

export function mixedToText(fraction: Fraction): string {
  const mixed = fractionToMixed(fraction);

  if (mixed.denominator === 1 || mixed.numerator === 0) {
    return String(mixed.whole);
  }

  if (mixed.whole === 0) {
    return `${mixed.numerator}/${mixed.denominator}`;
  }

  return `${mixed.whole} ${mixed.numerator}/${mixed.denominator}`;
}
