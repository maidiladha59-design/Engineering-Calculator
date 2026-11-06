"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import {
  decimalToBinary,
  decimalToHex,
  decimalToHexSteps,
  decimalToOctal,
  hexPlaceValues,
  parseDecimal,
  parseHex,
} from "@/lib/math/binary";

function validateHex(value: string): string | undefined {
  if (!/^[0-9a-fA-F]+$/.test(value.trim())) {
    return "Hanya boleh berisi angka 0–9 dan huruf A–F.";
  }

  if (value.trim().length > 8) {
    return "Gunakan maksimal 8 digit heksadesimal.";
  }

  return undefined;
}

function validateDecimal(value: string): string | undefined {
  if (!/^\d+$/.test(value.trim())) {
    return "Hanya boleh berisi angka 0–9.";
  }

  if (value.trim().length > 10) {
    return "Gunakan maksimal 10 digit desimal.";
  }

  return undefined;
}

export default function HeksadesimalCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const exampleHex = parseHex("FF");
  const exampleHexTwo = parseHex("1A3");
  const exampleDecimal = parseDecimal("255");

  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          kind: "select",
          id: "mode",
          label: "Arah konversi",
          options: [
            { value: "hex-desimal", label: "Heksadesimal → Desimal" },
            { value: "desimal-hex", label: "Desimal → Heksadesimal" },
          ],
          hint: "Pilih arah sesuai data yang Anda miliki.",
        },
        {
          kind: "text",
          id: "hex",
          label: "Bilangan heksadesimal",
          placeholder: "Contoh: FF",
          hint: "Gunakan digit 0–9 dan A–F.",
          mono: true,
          validate: validateHex,
          showWhen: (form) => form.mode === "hex-desimal",
        },
        {
          kind: "text",
          id: "decimal",
          label: "Bilangan desimal",
          placeholder: "Contoh: 255",
          hint: "Hanya angka 0–9.",
          mono: true,
          validate: validateDecimal,
          showWhen: (form) => form.mode === "desimal-hex",
        },
      ]}
      formulaTex={String.raw`N=\sum d_i\,16^{i}`}
      formulaDescription="Setiap digit heksadesimal memiliki nilai tempat pangkat 16. Digit A–F bernilai 10–15. Untuk arah sebaliknya, bagi bilangan desimal dengan 16 berulang dan baca sisanya dari bawah ke atas."
      variables={[
        { symbol: "N", name: "Nilai desimal", unit: "—", note: "Bilangan basis 10" },
        { symbol: "d_i", name: "Digit heksadesimal", unit: "0–F", note: "A=10, B=11, C=12, D=13, E=14, F=15" },
        { symbol: "16^i", name: "Nilai tempat", unit: "—", note: "1, 16, 256, 4.096, dan seterusnya" },
      ]}
      compute={({ form }) => {
        if (form.mode === "desimal-hex") {
          const decimal = parseDecimal(form.decimal, "Bilangan desimal");
          const hexadecimal = decimalToHex(decimal);
          const divisionSteps = decimalToHexSteps(decimal);

          return {
            label: "Bilangan heksadesimal",
            value: hexadecimal,
            unit: "",
            rows: [
              { label: "Nilai desimal", value: decimal.toString() },
              { label: "Biner", value: `0b${decimalToBinary(decimal)}` },
              { label: "Oktal", value: `0o${decimalToOctal(decimal)}` },
            ],
            steps: [
              ...divisionSteps.map((step) => ({
                title: `Pembagian ke-${step.step}`,
                detail: `${step.dividend} ÷ 16 = ${step.quotient} sisa ${step.remainder}.`,
              })),
              {
                title: "Baca sisa dari bawah ke atas",
                detail: `Sisa terakhir sampai sisa pertama membentuk 0x${hexadecimal}.`,
              },
              {
                title: "Periksa hasil",
                detail: `0x${hexadecimal} dikonversi kembali ke desimal menghasilkan ${decimal.toString()}.`,
              },
            ],
          };
        }

        const input = form.hex.trim().toUpperCase();
        const decimal = parseHex(input);
        const places = hexPlaceValues(input);
        const activePlaces = places.filter((place) => place.bit !== "0");

        return {
          label: "Nilai desimal",
          value: decimal.toString(),
          rows: [
            { label: "Heksadesimal", value: `0x${input}` },
            { label: "Biner", value: `0b${decimalToBinary(decimal)}` },
            { label: "Oktal", value: `0o${decimalToOctal(decimal)}` },
            { label: "Jumlah digit", value: `${input.length} digit` },
          ],
          steps: [
            {
              title: "Tulis nilai tempat setiap digit",
              detail: places
                .map((place) => `${place.bit}×16^${place.power}`)
                .join(" + "),
            },
            {
              title: "Ubah digit A–F menjadi 10–15",
              detail: activePlaces
                .map(
                  (place) =>
                    `${place.bit} = ${parseInt(place.bit, 16)} → kontribusi ${place.contribution}`,
                )
                .join("; "),
            },
            {
              title: "Jumlahkan semua kontribusi",
              detail: `${activePlaces.map((place) => place.contribution).join(" + ")} = ${decimal.toString()}.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem: "Konversi FF heksadesimal ke desimal.",
          detail: `F = 15. 15×16 + 15 = 240 + 15 = ${exampleHex.toString()}.`,
          answer: `${exampleHex.toString()} desimal`,
          values: { mode: "hex-desimal", hex: "FF" },
        },
        {
          problem: "Konversi 1A3 heksadesimal ke desimal.",
          detail: `1×256 + 10×16 + 3 = 256 + 160 + 3 = ${exampleHexTwo.toString()}.`,
          answer: `${exampleHexTwo.toString()} desimal`,
          values: { mode: "hex-desimal", hex: "1A3" },
        },
        {
          problem: "Konversi desimal 255 ke heksadesimal.",
          detail: `255 ÷ 16 = 15 sisa 15 (F); 15 ÷ 16 = 0 sisa 15 (F). Dibaca dari bawah: FF.`,
          answer: `${decimalToHex(exampleDecimal)} heksadesimal`,
          values: { mode: "desimal-hex", decimal: "255" },
        },
      ]}
      mistakes={[
        "Menganggap huruf A–F sebagai angka biasa 1–6.",
        "Membaca sisa pembagian dari atas ke bawah sehingga urutan digit terbalik.",
        "Menulis 16 sebagai digit heksadesimal, padahal digit tertinggi adalah F (15).",
      ]}
      tips={[
        "Satu digit heksadesimal mewakili tepat empat bit biner.",
        "Hafalkan pasangan umum: A=10, B=11, C=12, D=13, E=14, F=15.",
        "Prefix 0x dipakai untuk menandai bilangan heksadesimal dalam pemrograman.",
      ]}
    />
  );
}
