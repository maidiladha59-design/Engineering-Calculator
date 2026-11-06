"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import { simplySupportedReactions } from "@/lib/math/mechanics";
import { FORCE_UNITS, LENGTH_UNITS } from "@/lib/units";

const EXAMPLE_A = simplySupportedReactions(6, 12000, 3);
const EXAMPLE_B = simplySupportedReactions(8, 20000, 2);

export default function KeseimbanganBendaCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          id: "span",
          label: "Panjang balok (L)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "positive",
          hint: "Contoh: 6",
        },
        {
          id: "load",
          label: "Beban titik (P)",
          units: FORCE_UNITS,
          defaultUnit: "kN",
          rule: "non-negative",
          hint: "Contoh: 12",
        },
        {
          id: "position",
          label: "Posisi beban dari tumpuan kiri (a)",
          units: LENGTH_UNITS,
          defaultUnit: "m",
          rule: "non-negative",
          hint: "Tidak boleh melebihi panjang balok",
        },
      ]}
      formulaTex={String.raw`R_B=\frac{P\,a}{L}\qquad R_A=P-R_B`}
      formulaDescription="Balok sederhana dengan beban titik P pada jarak a dari tumpuan kiri. Reaksi kanan dihitung dari keseimbangan momen terhadap tumpuan kiri, lalu reaksi kiri diperoleh dari keseimbangan gaya vertikal."
      variables={[
        { symbol: "L", name: "Panjang balok", unit: "m", note: "Jarak antar tumpuan" },
        { symbol: "P", name: "Beban titik", unit: "N", note: "Beban yang bekerja ke bawah" },
        { symbol: "a", name: "Posisi beban", unit: "m", note: "Diukur dari tumpuan kiri" },
        { symbol: "R_A", name: "Reaksi tumpuan kiri", unit: "N", note: "Gaya vertikal ke atas" },
        { symbol: "R_B", name: "Reaksi tumpuan kanan", unit: "N", note: "Gaya vertikal ke atas" },
      ]}
      compute={({ values }) => {
        const result = simplySupportedReactions(
          values.span,
          values.load,
          values.position,
        );
        const rightDistance = values.span - values.position;

        return {
          label: "Reaksi tumpuan kiri (R_A)",
          value: formatNumber(result.left),
          unit: "N",
          rows: [
            { label: "Reaksi tumpuan kanan (R_B)", value: `${formatNumber(result.right)} N` },
            { label: "Total reaksi", value: `${formatNumber(result.total)} N` },
            { label: "Beban (SI)", value: `${formatNumber(values.load)} N` },
            { label: "Jarak beban ke tumpuan kanan", value: `${formatNumber(rightDistance)} m` },
          ],
          footnote:
            "Hasil mengasumsikan balok kaku, beban vertikal, dan berat sendiri balok diabaikan.",
          steps: [
            {
              title: "Samakan satuan",
              detail: `L = ${formatNumber(values.span)} m, P = ${formatNumber(values.load)} N, a = ${formatNumber(values.position)} m.`,
            },
            {
              title: "Ambil momen terhadap tumpuan kiri",
              detail: `ΣM_A = 0 → P × a - R_B × L = 0, sehingga R_B = (P × a) ÷ L.`,
            },
            {
              title: "Hitung reaksi kanan",
              detail: `R_B = (${formatNumber(values.load)} × ${formatNumber(values.position)}) ÷ ${formatNumber(values.span)} = ${formatNumber(result.right)} N.`,
            },
            {
              title: "Hitung reaksi kiri dari keseimbangan gaya",
              detail: `R_A = P - R_B = ${formatNumber(values.load)} - ${formatNumber(result.right)} = ${formatNumber(result.left)} N.`,
            },
            {
              title: "Periksa keseimbangan",
              detail: `R_A + R_B = ${formatNumber(result.left)} + ${formatNumber(result.right)} = ${formatNumber(result.total)} N, sama dengan beban P.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Balok sederhana panjang 6 m menahan beban 12 kN tepat di tengah. Hitung reaksi kedua tumpuan.",
          detail: `R_B = (12 × 3) ÷ 6 = ${formatNumber(EXAMPLE_A.right)} kN. R_A = 12 - ${formatNumber(EXAMPLE_A.right)} = ${formatNumber(EXAMPLE_A.left)} kN.`,
          answer: `R_A = ${formatNumber(EXAMPLE_A.left)} kN dan R_B = ${formatNumber(EXAMPLE_A.right)} kN`,
          values: { span: "6", load: "12", position: "3" },
        },
        {
          problem:
            "Balok 8 m menahan beban 20 kN pada jarak 2 m dari tumpuan kiri. Hitung reaksi tumpuan.",
          detail: `R_B = (20 × 2) ÷ 8 = ${formatNumber(EXAMPLE_B.right)} kN. R_A = 20 - ${formatNumber(EXAMPLE_B.right)} = ${formatNumber(EXAMPLE_B.left)} kN.`,
          answer: `R_A = ${formatNumber(EXAMPLE_B.left)} kN dan R_B = ${formatNumber(EXAMPLE_B.right)} kN`,
          values: { span: "8", load: "20", position: "2" },
        },
      ]}
      mistakes={[
        "Mengukur posisi beban dari tumpuan kanan tetapi memasukkannya sebagai jarak dari tumpuan kiri.",
        "Lupa memasukkan berat sendiri balok ketika berat balok cukup besar dibandingkan beban luar.",
        "Menjumlahkan reaksi tanpa memeriksa apakah totalnya sama dengan total beban vertikal.",
      ]}
      tips={[
        "Selalu tetapkan arah positif dan titik acuan sebelum menulis persamaan momen.",
        "Beban yang berada tepat di tengah balok menghasilkan reaksi yang sama besar di kedua tumpuan.",
        "Gunakan pemeriksaan ΣF_y = 0 sebagai langkah terakhir untuk menangkap kesalahan aritmetika.",
      ]}
    />
  );
}
