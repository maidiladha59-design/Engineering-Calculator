"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { isBinary, subtractBinary } from "@/lib/math/binary";

function validateBinary(value: string): string | undefined {
  if (!isBinary(value)) {
    return "Hanya boleh berisi angka 0 dan 1.";
  }

  if (value.trim().length > 16) {
    return "Gunakan maksimal 16 bit agar tabel per bit tetap terbaca.";
  }

  return undefined;
}

export default function PenguranganBinerCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const exampleA = subtractBinary("1101", "1011");
  const exampleB = subtractBinary("10000", "0111");
  const exampleC = subtractBinary("11111111", "00000001");

  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          kind: "text",
          id: "a",
          label: "Bilangan biner pertama (yang dikurangi)",
          placeholder: "Contoh: 1101",
          hint: "Harus lebih besar atau sama dengan bilangan kedua.",
          mono: true,
          validate: validateBinary,
        },
        {
          kind: "text",
          id: "b",
          label: "Bilangan biner kedua (pengurang)",
          placeholder: "Contoh: 1011",
          hint: "Hanya digit 0 dan 1.",
          mono: true,
          validate: validateBinary,
        },
      ]}
      formulaTex={String.raw`A-B=\sum\left(a_i-b_i-\text{borrow}_i\right)`}
      formulaDescription="Pengurangan biner dilakukan dari bit paling kanan. Jika bit yang dikurangi lebih kecil dari pengurang, pinjam 2 dari bit sebelah kiri dan catat borrow 1."
      variables={[
        { symbol: "A", name: "Bilangan yang dikurangi", unit: "biner", note: "Harus ≥ B untuk hasil tak bertanda" },
        { symbol: "B", name: "Bilangan pengurang", unit: "biner", note: "Bilangan yang dikurangkan" },
        { symbol: "borrow", name: "Pinjaman", unit: "0 atau 1", note: "Diambil dari bit di sebelah kiri" },
        { symbol: "D", name: "Selisih", unit: "biner", note: "Hasil pengurangan tak bertanda" },
      ]}
      compute={({ form }) => {
        const result = subtractBinary(form.a, form.b);
        const bitSteps = result.bits.map((bit) => ({
          title: `Bit ke-${bit.position} (2^${bit.position})`,
          detail: `${bit.bitA} − ${bit.bitB} − borrow ${bit.borrowIn} = ${bit.difference} → bit hasil ${bit.resultBit}, borrow keluar ${bit.borrowOut}.`,
        }));

        return {
          label: "Selisih",
          value: result.difference,
          unit: "biner",
          rows: [
            { label: "Nilai desimal selisih", value: result.decimal },
            { label: "Panjang hasil", value: `${result.difference.length} bit` },
            {
              label: "Ada pinjaman",
              value: result.bits.some((bit) => bit.borrowOut === 1) ? "Ya" : "Tidak",
            },
          ],
          steps: [
            {
              title: "Samakan panjang bilangan",
              detail: "Tambahkan nol di depan bilangan yang lebih pendek, lalu kurangkan dari bit paling kanan.",
            },
            ...bitSteps,
            {
              title: "Periksa dengan desimal",
              detail: `Selisih biner ${result.difference} sama dengan ${result.decimal} dalam desimal.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem: "Kurangkan 1011 dari 1101 dalam biner.",
          detail: `1101 (13) − 1011 (11) = ${exampleA.difference} (${exampleA.decimal}).`,
          answer: `${exampleA.difference} biner = ${exampleA.decimal} desimal`,
          values: { a: "1101", b: "1011" },
        },
        {
          problem: "Hitung 10000 − 0111.",
          detail: `10000 (16) − 0111 (7) = ${exampleB.difference} (${exampleB.decimal}).`,
          answer: `${exampleB.difference} biner = ${exampleB.decimal} desimal`,
          values: { a: "10000", b: "0111" },
        },
        {
          problem: "Kurangkan 00000001 dari 11111111.",
          detail: `255 − 1 = ${exampleC.decimal}, yaitu ${exampleC.difference} biner.`,
          answer: `${exampleC.difference} biner = ${exampleC.decimal} desimal`,
          values: { a: "11111111", b: "00000001" },
        },
      ]}
      mistakes={[
        "Mengurangi bit yang lebih kecil tanpa meminjam 2 dari bit kiri.",
        "Menghitung 0 − 1 = −1 lalu menuliskan tanda minus pada hasil biner.",
        "Mengabaikan borrow yang masih tersisa pada bit berikutnya.",
      ]}
      tips={[
        "Periksa hasil dengan menjumlahkan kembali selisih dan pengurang; hasilnya harus sama dengan bilangan pertama.",
        "Kalkulator ini menampilkan hasil tak bertanda, sehingga bilangan pertama harus lebih besar atau sama dengan bilangan kedua.",
        "Untuk bilangan negatif, komputer memakai representasi komplemen dua, bukan tanda minus.",
      ]}
    />
  );
}
