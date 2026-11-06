"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import {
  binaryPlaceValues,
  decimalToBinary,
  decimalToBinarySteps,
  decimalToHex,
  decimalToOctal,
  isBinary,
  parseBinary,
  parseDecimal,
} from "@/lib/math/binary";

function validateBinary(value: string): string | undefined {
  if (!isBinary(value)) {
    return "Hanya boleh berisi angka 0 dan 1.";
  }

  if (value.trim().length > 32) {
    return "Gunakan maksimal 32 bit.";
  }

  return undefined;
}

function validateDecimal(value: string): string | undefined {
  if (!/^\d+$/.test(value.trim())) {
    return "Hanya boleh berisi angka 0–9 tanpa tanda minus atau titik.";
  }

  if (value.trim().length > 12) {
    return "Gunakan maksimal 12 digit desimal.";
  }

  return undefined;
}

export default function KonversiBinerDesimalCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const exampleBinary = parseBinary("1011");
  const exampleDecimal = parseDecimal("45");
  const exampleBinaryFromDecimal = decimalToBinary(exampleDecimal);

  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          kind: "select",
          id: "mode",
          label: "Arah konversi",
          options: [
            { value: "biner-desimal", label: "Biner → Desimal" },
            { value: "desimal-biner", label: "Desimal → Biner" },
          ],
          hint: "Pilih arah sesuai data yang Anda miliki.",
        },
        {
          kind: "text",
          id: "binary",
          label: "Bilangan biner",
          placeholder: "Contoh: 1011",
          hint: "Hanya digit 0 dan 1.",
          mono: true,
          validate: validateBinary,
          showWhen: (form) => form.mode === "biner-desimal",
        },
        {
          kind: "text",
          id: "decimal",
          label: "Bilangan desimal",
          placeholder: "Contoh: 45",
          hint: "Hanya angka 0–9, tanpa tanda minus.",
          mono: true,
          validate: validateDecimal,
          showWhen: (form) => form.mode === "desimal-biner",
        },
      ]}
      formulaTex={String.raw`N=\sum b_i\,2^{i}\qquad N=\sum_{k} q_k\,2^{k}`}
      formulaDescription="Biner ke desimal dihitung dengan menjumlahkan nilai tempat bit yang aktif. Desimal ke biner dihitung dengan membagi dua berulang dan membaca sisa pembagian dari bawah ke atas."
      variables={[
        { symbol: "N", name: "Nilai desimal", unit: "—", note: "Bilangan basis 10" },
        { symbol: "b_i", name: "Bit biner", unit: "0 atau 1", note: "Dimulai dari bit paling kanan" },
        { symbol: "q_k", name: "Sisa pembagian", unit: "0 atau 1", note: "Dibaca dari bawah ke atas" },
      ]}
      compute={({ form }) => {
        if (form.mode === "desimal-biner") {
          const decimal = parseDecimal(form.decimal, "Bilangan desimal");
          const binary = decimalToBinary(decimal);
          const divisionSteps = decimalToBinarySteps(decimal);

          return {
            label: "Bilangan biner",
            value: binary,
            unit: "",
            rows: [
              { label: "Nilai desimal", value: decimal.toString() },
              { label: "Heksadesimal", value: `0x${decimalToHex(decimal)}` },
              { label: "Oktal", value: `0o${decimalToOctal(decimal)}` },
              { label: "Panjang biner", value: `${binary.length} bit` },
            ],
            steps: [
              ...divisionSteps.map((step) => ({
                title: `Pembagian ke-${step.step}`,
                detail: `${step.dividend} ÷ 2 = ${step.quotient} sisa ${step.remainder}.`,
              })),
              {
                title: "Baca sisa dari bawah ke atas",
                detail: `Sisa terakhir sampai sisa pertama membentuk ${binary}.`,
              },
              {
                title: "Periksa hasil",
                detail: `Biner ${binary} dikonversi kembali ke desimal menghasilkan ${decimal.toString()}.`,
              },
            ],
          };
        }

        const input = form.binary.trim();
        const decimal = parseBinary(input);
        const places = binaryPlaceValues(input);
        const activePlaces = places.filter((place) => place.bit === "1");

        return {
          label: "Nilai desimal",
          value: decimal.toString(),
          rows: [
            { label: "Heksadesimal", value: `0x${decimalToHex(decimal)}` },
            { label: "Oktal", value: `0o${decimalToOctal(decimal)}` },
            { label: "Jumlah bit", value: `${input.length} bit` },
          ],
          steps: [
            {
              title: "Tulis nilai tempat",
              detail: places
                .map((place) => `${place.bit}×2^${place.power}`)
                .join(" + "),
            },
            {
              title: "Jumlahkan kontribusi",
              detail: activePlaces.length
                ? `${activePlaces.map((place) => place.contribution).join(" + ")} = ${decimal.toString()}.`
                : "Semua bit nol, sehingga hasilnya 0.",
            },
          ],
        };
      }}
      examples={[
        {
          problem: "Konversi biner 1011 ke desimal.",
          detail: `8 + 0 + 2 + 1 = ${exampleBinary.toString()}.`,
          answer: `${exampleBinary.toString()} desimal`,
          values: { mode: "biner-desimal", binary: "1011" },
        },
        {
          problem: "Konversi desimal 45 ke biner.",
          detail: `45 ÷ 2 berulang menghasilkan sisa 1, 0, 1, 1, 0, 1. Dibaca dari bawah: ${exampleBinaryFromDecimal}.`,
          answer: `${exampleBinaryFromDecimal} biner`,
          values: { mode: "desimal-biner", decimal: "45" },
        },
        {
          problem: "Konversi desimal 255 ke biner.",
          detail: `255 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1, sehingga binernya 11111111.`,
          answer: "11111111 biner",
          values: { mode: "desimal-biner", decimal: "255" },
        },
      ]}
      mistakes={[
        "Membaca sisa pembagian dari atas ke bawah sehingga urutan bit terbalik.",
        "Menjumlahkan nilai tempat dari kiri ke kanan dengan pangkat yang salah.",
        "Memasukkan angka desimal pada mode biner atau sebaliknya.",
      ]}
      tips={[
        "Untuk desimal ke biner, bagi dua terus sampai hasil bagi nol.",
        "Biner dengan n bit dapat menampung nilai 0 sampai 2ⁿ − 1.",
        "Gunakan konversi ke heksadesimal sebagai pemeriksaan cepat untuk bilangan panjang.",
      ]}
    />
  );
}
