"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { addBinary, isBinary } from "@/lib/math/binary";

function validateBinary(value: string): string | undefined {
  if (!isBinary(value)) {
    return "Hanya boleh berisi angka 0 dan 1.";
  }

  if (value.trim().length > 16) {
    return "Gunakan maksimal 16 bit agar tabel per bit tetap terbaca.";
  }

  return undefined;
}

export default function PenjumlahanBinerCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  const exampleA = addBinary("1011", "0110");
  const exampleB = addBinary("1111", "0001");
  const exampleC = addBinary("110011", "10101");

  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          kind: "text",
          id: "a",
          label: "Bilangan biner pertama",
          placeholder: "Contoh: 1011",
          hint: "Hanya digit 0 dan 1.",
          mono: true,
          validate: validateBinary,
        },
        {
          kind: "text",
          id: "b",
          label: "Bilangan biner kedua",
          placeholder: "Contoh: 0110",
          hint: "Hanya digit 0 dan 1.",
          mono: true,
          validate: validateBinary,
        },
      ]}
      formulaTex={String.raw`A+B=\sum\left(a_i+b_i+\text{carry}_i\right)`}
      formulaDescription="Penjumlahan biner dilakukan dari bit paling kanan. Jika jumlah dua bit ditambah carry mencapai 2 atau 3, bit hasil ditulis 0 atau 1 dan carry 1 dikirim ke bit berikutnya."
      variables={[
        { symbol: "A, B", name: "Bilangan biner", unit: "—", note: "Bilangan yang dijumlahkan" },
        { symbol: "a_i, b_i", name: "Bit ke-i", unit: "0 atau 1", note: "Dibaca dari kanan" },
        { symbol: "carry", name: "Simpanan", unit: "0 atau 1", note: "Dibawa ke bit berikutnya" },
        { symbol: "S", name: "Hasil penjumlahan", unit: "biner", note: "Termasuk carry akhir bila ada" },
      ]}
      compute={({ form }) => {
        const result = addBinary(form.a, form.b);
        const bitSteps = result.bits.map((bit) => ({
          title: `Bit ke-${bit.position} (2^${bit.position})`,
          detail: `${bit.bitA} + ${bit.bitB} + carry ${bit.carryIn} = ${bit.sum} → bit hasil ${bit.resultBit}, carry keluar ${bit.carryOut}.`,
        }));

        return {
          label: "Hasil penjumlahan",
          value: result.sum,
          unit: "biner",
          rows: [
            { label: "Nilai desimal hasil", value: result.decimal },
            { label: "Carry akhir", value: result.finalCarry ? "1" : "0" },
            { label: "Panjang hasil", value: `${result.sum.length} bit` },
          ],
          steps: [
            {
              title: "Samakan panjang bilangan",
              detail: `Isi nol di depan bilangan yang lebih pendek, lalu jumlahkan dari bit paling kanan.`,
            },
            ...bitSteps,
            ...(result.finalCarry
              ? [
                  {
                    title: "Tambahkan carry akhir",
                    detail: `Masih tersisa carry 1 setelah bit terakhir, sehingga hasil menjadi ${result.sum}.`,
                  },
                ]
              : []),
            {
              title: "Periksa dengan desimal",
              detail: `Hasil biner ${result.sum} sama dengan ${result.decimal} dalam desimal.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem: "Jumlahkan 1011 dan 0110 dalam biner.",
          detail: `1011 (11) + 0110 (6) = ${exampleA.sum} (${exampleA.decimal}).`,
          answer: `${exampleA.sum} biner = ${exampleA.decimal} desimal`,
          values: { a: "1011", b: "0110" },
        },
        {
          problem: "Hitung 1111 + 0001 dalam biner.",
          detail: `1111 (15) + 0001 (1) = ${exampleB.sum} (${exampleB.decimal}). Terjadi carry akhir.`,
          answer: `${exampleB.sum} biner = ${exampleB.decimal} desimal`,
          values: { a: "1111", b: "0001" },
        },
        {
          problem: "Jumlahkan 110011 dan 10101.",
          detail: `110011 (51) + 10101 (21) = ${exampleC.sum} (${exampleC.decimal}).`,
          answer: `${exampleC.sum} biner = ${exampleC.decimal} desimal`,
          values: { a: "110011", b: "10101" },
        },
      ]}
      mistakes={[
        "Menjumlahkan dari kiri ke kanan sehingga carry tidak terbawa dengan benar.",
        "Lupa menuliskan carry akhir setelah bit terakhir.",
        "Menghitung 1 + 1 = 2 lalu menuliskan angka 2 pada hasil biner.",
      ]}
      tips={[
        "Tabel per bit membantu memeriksa carry masuk dan carry keluar.",
        "Periksa hasil dengan mengubah kedua bilangan ke desimal lalu menjumlahkannya.",
        "Gunakan padding nol agar kedua bilangan memiliki panjang sama sebelum dijumlahkan.",
      ]}
    />
  );
}
