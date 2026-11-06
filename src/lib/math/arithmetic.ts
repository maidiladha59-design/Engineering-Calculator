import { assertFinite, cleanNumber, MathDomainError } from "./errors";

export type BasicOperator = "+" | "-" | "×" | "÷" | "*" | "/";

export const BASIC_OPERATORS: Array<{ value: BasicOperator; label: string }> = [
  { value: "+", label: "Penjumlahan (+)" },
  { value: "-", label: "Pengurangan (−)" },
  { value: "×", label: "Perkalian (×)" },
  { value: "÷", label: "Pembagian (÷)" },
];

export function operatorSymbol(operator: BasicOperator): string {
  if (operator === "*") return "×";
  if (operator === "/") return "÷";
  return operator;
}

export function basicArithmetic(
  a: number,
  b: number,
  operator: BasicOperator,
): number {
  assertFinite(a, "Angka pertama");
  assertFinite(b, "Angka kedua");

  let result: number;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "×":
    case "*":
      result = a * b;
      break;
    case "÷":
    case "/":
      if (b === 0) {
        throw new MathDomainError(
          "Pembagian dengan nol tidak terdefinisi. Ubah angka pembagi.",
        );
      }
      result = a / b;
      break;
    default:
      throw new MathDomainError("Operasi aritmatika tidak dikenali.");
  }

  return cleanNumber(result);
}
