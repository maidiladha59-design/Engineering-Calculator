"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import {
  decimalToBinary,
  decimalToHex,
  decimalToOctal,
  decimalToOctalSteps,
  parseDecimal,
  parseOctal,
} from "@/lib/math/binary";

function validateOctal(value: string): string | undefined {
  if (!/^[0-7]+$/.test(value.trim())) {
    return "Hanya boleh berisi angka 0–7.";
  }

  if (value.trim().length > 12) {
    return "Gunakan maksimal 12 digit oktal.";
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

export default function OktalCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const exampleOctal = parseOctal("755");
  const exampleOctalTwo = parseOctal("64");
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
            { value: "oktal-desimal", label: "Oktal → Desimal" },
            { value: "desimal-oktal", label: "Desimal → Oktal" },
          ],
          hint: "Pilih arah sesuai data yang Anda miliki.",
        },
        {
          kind: "text",
          id: "octal",
          label: "Bilangan oktal",
          placeholder: "Contoh: 755",
          hint: "Hanya digit 0–7.",
          mono: true,
          validate: validateOctal,
          showWhen: (form) => form.mode === "oktal-desimal",
        },
        {
          kind: "text",
          id: "decimal",
          label: "Bilangan desimal",
          placeholder: "Contoh: 255",
          hint: "Hanya angka 0–9.",
          mono: true,
          validate: validateDecimal,
          showWhen: (form) => form.mode === "desimal-oktal",
        },
      ]}
      formulaTex={String.raw`N=\sum d_i\,8^{i}`}
      formulaDescription="Setiap digit oktal memiliki nilai tempat pangkat 8. Untuk arah sebaliknya, bagi bilangan desimal dengan 8 berulang dan baca sisanya dari bawah ke atas."
      variables={[
        { symbol: "N", name: "Nilai desimal", unit: "—", note: "Bilangan basis 10" },
        { symbol: "d_i", name: "Digit oktal", unit: "0–7", note: "Digit tertinggi adalah 7" },
        { symbol: "8^i", name: "Nilai tempat", unit: "—", note: "1, 8, 64, 512, dan seterusnya" },
      ]}
      compute={({ form }) => {
        if (form.mode === "desimal-oktal") {
          const decimal = parseDecimal(form.decimal, "Bilangan desimal");
          const octal = decimalToOctal(decimal);
          const divisionSteps = decimalToOctalSteps(decimal);

          return {
            label: "Bilangan oktal",
            value: octal,
            unit: "",
            rows: [
              { label: "Nilai desimal", value: decimal.toString() },
              { label: "Biner", value: `0b${decimalToBinary(decimal)}` },
              { label: "Heksadesimal", value: `0x${decimalToHex(decimal)}` },
            ],
            steps: [
              ...divisionSteps.map((step) => ({
                title: `Pembagian ke-${step.step}`,
                detail: `${step.dividend} ÷ 8 = ${step.quotient} sisa ${step.remainder}.`,
              })),
              {
                title: "Baca sisa dari bawah ke atas",
                detail: `Sisa terakhir sampai sisa pertama membentuk 0o${octal}.`,
              },
              {
                title: "Periksa hasil",
                detail: `0o${octal} dikonversi kembali ke desimal menghasilkan ${decimal.toString()}.`,
              },
            ],
          };
        }

        const input = form.octal.trim();
        const decimal = parseOctal(input);
        const digits = input.split("").map((digit, index) => {
          const power = input.length - 1 - index;

          return {
            digit,
            power,
            contribution: (BigInt(Number(digit)) * BigInt(8) ** BigInt(power)).toString(),
          };
        });
        const activeDigits = digits.filter((item) => item.digit !== "0");

        return {
          label: "Nilai desimal",
          value: decimal.toString(),
          rows: [
            { label: "Oktal", value: `0o${input}` },
            { label: "Biner", value: `0b${decimalToBinary(decimal)}` },
            { label: "Heksadesimal", value: `0x${decimalToHex(decimal)}` },
            { label: "Jumlah digit", value: `${input.length} digit` },
          ],
          steps: [
            {
              title: "Tulis nilai tempat setiap digit",
              detail: digits
                .map((item) => `${item.digit}×8^${item.power}`)
                .join(" + "),
            },
            {
              title: "Hitung kontribusi digit",
              detail: activeDigits.length
                ? activeDigits
                    .map(
                      (item) =>
                        `${item.digit}×${(BigInt(8) ** BigInt(item.power)).toString()} = ${item.contribution}`,
                    )
                    .join("; ")
                : "Semua digit nol.",
            },
            {
              title: "Jumlahkan kontribusi",
              detail: activeDigits.length
                ? `${activeDigits.map((item) => item.contribution).join(" + ")} = ${decimal.toString()}.`
                : "0",
            },
          ],
        };
      }}
      examples={[
        {
          problem: "Konversi oktal 755 ke desimal.",
          detail: `7×64 + 5×8 + 5×1 = 448 + 40 + 5 = ${exampleOctal.toString()}.`,
          answer: `${exampleOctal.toString()} desimal`,
          values: { mode: "oktal-desimal", octal: "755" },
        },
        {
          problem: "Konversi oktal 64 ke desimal.",
          detail: `6×8 + 4×1 = 48 + 4 = ${exampleOctalTwo.toString()}.`,
          answer: `${exampleOctalTwo.toString()} desimal`,
          values: { mode: "oktal-desimal", octal: "64" },
        },
        {
          problem: "Konversi desimal 255 ke oktal.",
          detail: `255 ÷ 8 = 31 sisa 7; 31 ÷ 8 = 3 sisa 7; 3 ÷ 8 = 0 sisa 3. Dibaca dari bawah: 377.`,
          answer: `${decimalToOctal(exampleDecimal)} oktal`,
          values: { mode: "desimal-oktal", decimal: "255" },
        },
      ]}
      mistakes={[
        "Memasukkan digit 8 atau 9 pada bilangan oktal.",
        "Membaca sisa pembagian dari atas ke bawah sehingga urutan digit terbalik.",
        "Menganggap oktal sama dengan desimal karena penulisannya mirip.",
      ]}
      tips={[
        "Satu digit oktal mewakili tepat tiga bit biner.",
        "Oktal sering dipakai untuk izin berkas pada sistem Unix.",
        "Prefix 0o dipakai untuk menandai bilangan oktal dalam banyak bahasa pemrograman.",
      ]}
    />
  );
}
