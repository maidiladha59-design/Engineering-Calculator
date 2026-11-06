export type ParsedNumber =
  | { ok: true; value: number }
  | { ok: false; error: string };

export type NumberRule =
  | "any"
  | "positive"
  | "non-negative"
  | "non-zero"
  | "integer"
  | "positive-integer";

export interface FieldSpec {
  label: string;
  rule?: NumberRule;
  min?: number;
  max?: number;
  customMessage?: Partial<Record<NumberRule, string>>;
}

export interface ValidationResult<K extends string> {
  values: Record<K, number>;
  errors: Partial<Record<K, string>>;
  hasErrors: boolean;
}

const NUMERIC_PATTERN = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

export function parseNumberInput(raw: string, label: string): ParsedNumber {
  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    return { ok: false, error: `${label} wajib diisi.` };
  }

  const normalized = trimmed.replace(",", ".");

  if (!NUMERIC_PATTERN.test(normalized)) {
    return {
      ok: false,
      error: `${label} harus berupa angka yang valid (contoh: 12,5 atau -3).`,
    };
  }

  const value = Number(normalized);

  if (!Number.isFinite(value)) {
    return { ok: false, error: `${label} harus berupa angka berhingga.` };
  }

  return { ok: true, value };
}

const RULE_MESSAGES: Record<NumberRule, (label: string) => string> = {
  any: () => "",
  positive: (label) => `${label} harus lebih dari 0.`,
  "non-negative": (label) => `${label} tidak boleh negatif.`,
  "non-zero": (label) => `${label} tidak boleh nol.`,
  integer: (label) => `${label} harus berupa bilangan bulat.`,
  "positive-integer": (label) =>
    `${label} harus berupa bilangan bulat positif (minimal 1).`,
};

export function validateNumberFields<K extends string>(
  fields: Record<K, string>,
  specs: Record<K, FieldSpec>,
): ValidationResult<K> {
  const values = {} as Record<K, number>;
  const errors: Partial<Record<K, string>> = {};

  for (const key of Object.keys(fields) as K[]) {
    const spec = specs[key];
    const parsed = parseNumberInput(fields[key], spec.label);

    if (!parsed.ok) {
      errors[key] = parsed.error;
      values[key] = Number.NaN;
      continue;
    }

    let value = parsed.value;
    const rule = spec.rule ?? "any";
    let error: string | null = null;

    if (rule === "positive" && value <= 0) {
      error = spec.customMessage?.positive ?? RULE_MESSAGES.positive(spec.label);
    } else if (rule === "non-negative" && value < 0) {
      error =
        spec.customMessage?.["non-negative"] ??
        RULE_MESSAGES["non-negative"](spec.label);
    } else if (rule === "non-zero" && value === 0) {
      error =
        spec.customMessage?.["non-zero"] ?? RULE_MESSAGES["non-zero"](spec.label);
    } else if (
      (rule === "integer" || rule === "positive-integer") &&
      !Number.isInteger(value)
    ) {
      error =
        spec.customMessage?.[rule] ?? RULE_MESSAGES[rule](spec.label);
    } else if (rule === "positive-integer" && value < 1) {
      error =
        spec.customMessage?.["positive-integer"] ??
        RULE_MESSAGES["positive-integer"](spec.label);
    }

    if (error === null && spec.min !== undefined && value < spec.min) {
      error = `${spec.label} minimal ${spec.min}.`;
    }

    if (error === null && spec.max !== undefined && value > spec.max) {
      error = `${spec.label} maksimal ${spec.max}.`;
    }

    if (error !== null) {
      errors[key] = error;
      value = Number.NaN;
    }

    values[key] = value;
  }

  return {
    values,
    errors,
    hasErrors: Object.keys(errors).length > 0,
  };
}

export function getFriendlyError(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return "Terjadi kesalahan saat menghitung. Periksa kembali input Anda.";
}
