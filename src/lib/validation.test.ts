import { describe, expect, it } from "vitest";
import {
  getFriendlyError,
  parseNumberInput,
  validateNumberFields,
} from "./validation";

describe("parseNumberInput", () => {
  it("menerima koma sebagai pemisah desimal", () => {
    expect(parseNumberInput("12,5", "Angka")).toEqual({ ok: true, value: 12.5 });
  });

  it("menerima titik sebagai pemisah desimal", () => {
    expect(parseNumberInput("12.5", "Angka")).toEqual({ ok: true, value: 12.5 });
  });

  it("menerima angka negatif dan notasi ilmiah", () => {
    expect(parseNumberInput("-3", "Angka")).toEqual({ ok: true, value: -3 });
    expect(parseNumberInput("1,5e3", "Angka")).toEqual({ ok: true, value: 1500 });
  });

  it("menolak input kosong", () => {
    expect(parseNumberInput("   ", "Angka")).toEqual({
      ok: false,
      error: "Angka wajib diisi.",
    });
  });

  it("menolak input bukan angka", () => {
    const result = parseNumberInput("abc", "Angka");
    expect(result.ok).toBe(false);
  });

  it("menolak format angka ganda", () => {
    expect(parseNumberInput("1.2.3", "Angka").ok).toBe(false);
    expect(parseNumberInput("1,2,3", "Angka").ok).toBe(false);
  });
});

describe("validateNumberFields", () => {
  it("mengembalikan nilai saat semua input valid", () => {
    const result = validateNumberFields(
      { massa: "1500", percepatan: "2" },
      {
        massa: { label: "Massa", rule: "positive" },
        percepatan: { label: "Percepatan" },
      },
    );

    expect(result.hasErrors).toBe(false);
    expect(result.values).toEqual({ massa: 1500, percepatan: 2 });
    expect(result.errors).toEqual({});
  });

  it("menandai input kosong dan bukan angka", () => {
    const result = validateNumberFields(
      { a: "", b: "x" },
      {
        a: { label: "Nilai A" },
        b: { label: "Nilai B" },
      },
    );

    expect(result.hasErrors).toBe(true);
    expect(result.errors.a).toMatch(/wajib diisi/);
    expect(result.errors.b).toMatch(/angka yang valid/);
    expect(Number.isNaN(result.values.a)).toBe(true);
    expect(Number.isNaN(result.values.b)).toBe(true);
  });

  it("menegakkan aturan positif, non-negatif, dan non-nol", () => {
    const result = validateNumberFields(
      { a: "0", b: "-1", c: "0" },
      {
        a: { label: "A", rule: "positive" },
        b: { label: "B", rule: "non-negative" },
        c: { label: "C", rule: "non-zero" },
      },
    );

    expect(result.errors.a).toBe("A harus lebih dari 0.");
    expect(result.errors.b).toBe("B tidak boleh negatif.");
    expect(result.errors.c).toBe("C tidak boleh nol.");
  });

  it("menegakkan aturan bilangan bulat dan bulat positif", () => {
    const result = validateNumberFields(
      { a: "2,5", b: "0" },
      {
        a: { label: "Indeks", rule: "integer" },
        b: { label: "Penyebut", rule: "positive-integer" },
      },
    );

    expect(result.errors.a).toMatch(/bilangan bulat/);
    expect(result.errors.b).toMatch(/minimal 1/);
  });

  it("menegakkan batas minimal dan maksimal", () => {
    const result = validateNumberFields(
      { a: "1", b: "50" },
      {
        a: { label: "A", min: 2 },
        b: { label: "B", max: 10 },
      },
    );

    expect(result.errors.a).toBe("A minimal 2.");
    expect(result.errors.b).toBe("B maksimal 10.");
  });

  it("menggunakan pesan khusus bila diberikan", () => {
    const result = validateNumberFields(
      { a: "0" },
      {
        a: {
          label: "Penyebut",
          rule: "positive",
          customMessage: { positive: "Penyebut tidak boleh nol." },
        },
      },
    );

    expect(result.errors.a).toBe("Penyebut tidak boleh nol.");
  });
});

describe("getFriendlyError", () => {
  it("menggunakan pesan Error", () => {
    expect(getFriendlyError(new Error("Pembagian dengan nol."))).toBe(
      "Pembagian dengan nol.",
    );
  });

  it("memberi pesan cadangan untuk nilai tak dikenal", () => {
    expect(getFriendlyError("galat")).toMatch(/Terjadi kesalahan/);
    expect(getFriendlyError(new Error("   "))).toMatch(/Terjadi kesalahan/);
  });
});
