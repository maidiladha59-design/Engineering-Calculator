"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber } from "@/lib/format";
import {
  concreteMaterials,
  type ConcreteMixRatio,
} from "@/lib/math/civil";

const EXAMPLE_A = concreteMaterials(1, "1:2:3", 5);
const EXAMPLE_B = concreteMaterials(2, "1:2:4", 0);

export default function KebutuhanMaterialCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          id: "volume",
          label: "Volume beton (V)",
          unit: "m³",
          rule: "non-negative",
          hint: "Gunakan kalkulator volume beton jika belum diketahui.",
        },
        {
          kind: "select",
          id: "ratio",
          label: "Perbandingan campuran",
          options: [
            { value: "1:2:3", label: "1 : 2 : 3 (semen : pasir : kerikil)" },
            { value: "1:2:4", label: "1 : 2 : 4 (semen : pasir : kerikil)" },
          ],
          hint: "Campuran 1:2:3 lebih kaya semen; 1:2:4 lebih ekonomis.",
        },
        {
          id: "waste",
          label: "Cadangan material",
          unit: "%",
          rule: "non-negative",
          hint: "Contoh: 5 untuk cadangan 5%.",
        },
      ]}
      formulaTex={String.raw`V_{\text{kering}}=V\times 1{,}5\qquad \text{semen}=\frac{V_{\text{kering}}\times 1}{\text{jumlah bagian}}\times 1440`}
      formulaDescription="Volume beton dikonversi ke volume kering dengan faktor 1,5, lalu dibagi menurut perbandingan campuran. Kebutuhan semen memakai massa jenis 1.440 kg/m³ dan satu sak semen 50 kg."
      variables={[
        { symbol: "V", name: "Volume beton", unit: "m³", note: "Volume pekerjaan cor" },
        { symbol: "V_kering", name: "Volume kering", unit: "m³", note: "Volume beton × faktor 1,5" },
        { symbol: "bagian", name: "Jumlah bagian campuran", unit: "—", note: "1:2:3 = 6 bagian; 1:2:4 = 7 bagian" },
        { symbol: "semen", name: "Kebutuhan semen", unit: "kg atau sak", note: "1 sak = 50 kg" },
        { symbol: "pasir, kerikil", name: "Kebutuhan agregat", unit: "m³", note: "Volume pasir dan kerikil" },
      ]}
      compute={({ form, values }) => {
        const ratio = form.ratio as ConcreteMixRatio;
        const result = concreteMaterials(values.volume, ratio, values.waste ?? 0);
        const parts = ratio === "1:2:3" ? 6 : 7;

        return {
          label: "Kebutuhan semen",
          value: formatNumber(result.cementSacks),
          unit: "sak (50 kg)",
          rows: [
            { label: "Semen", value: `${formatNumber(result.cementKg)} kg` },
            {
              label: "Semen dibulatkan ke atas",
              value: `${formatNumber(Math.ceil(result.cementSacks))} sak`,
            },
            { label: "Pasir", value: `${formatNumber(result.sandM3)} m³` },
            { label: "Kerikil", value: `${formatNumber(result.gravelM3)} m³` },
            { label: "Volume setelah cadangan", value: `${formatNumber(result.volume)} m³` },
            { label: "Volume kering", value: `${formatNumber(result.dryVolume)} m³` },
          ],
          footnote:
            "Estimasi ini memakai faktor volume kering 1,5 dan tidak memperhitungkan kadar air agregat. Selalu bulatkan pembelian material ke atas.",
          steps: [
            {
              title: "Tambahkan cadangan",
              detail: `V = ${formatNumber(values.volume)} m³ × (1 + ${formatNumber(values.waste ?? 0)}/100) = ${formatNumber(result.volume)} m³.`,
            },
            {
              title: "Ubah ke volume kering",
              detail: `V_kering = ${formatNumber(result.volume)} × 1,5 = ${formatNumber(result.dryVolume)} m³.`,
            },
            {
              title: "Bagi sesuai perbandingan",
              detail: `Campuran ${ratio} memiliki ${parts} bagian. Volume semen = ${formatNumber(result.dryVolume)} × 1/${parts} = ${formatNumber(result.dryVolume / parts)} m³.`,
            },
            {
              title: "Hitung semen dan agregat",
              detail: `Semen = ${formatNumber(result.dryVolume / parts)} × 1.440 = ${formatNumber(result.cementKg)} kg = ${formatNumber(result.cementSacks)} sak. Pasir = ${formatNumber(result.sandM3)} m³, kerikil = ${formatNumber(result.gravelM3)} m³.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Satu meter kubik beton dibuat dengan campuran 1:2:3 dan cadangan 5%. Hitung kebutuhan semen, pasir, dan kerikil.",
          detail: `Volume kering = 1 × 1,05 × 1,5 = ${formatNumber(EXAMPLE_A.dryVolume)} m³. Semen = ${formatNumber(EXAMPLE_A.cementKg)} kg (${formatNumber(EXAMPLE_A.cementSacks)} sak), pasir = ${formatNumber(EXAMPLE_A.sandM3)} m³, kerikil = ${formatNumber(EXAMPLE_A.gravelM3)} m³.`,
          answer: `${formatNumber(EXAMPLE_A.cementSacks)} sak semen, ${formatNumber(EXAMPLE_A.sandM3)} m³ pasir, ${formatNumber(EXAMPLE_A.gravelM3)} m³ kerikil`,
          values: { volume: "1", ratio: "1:2:3", waste: "5" },
        },
        {
          problem:
            "Dua meter kubik beton dicor dengan campuran 1:2:4 tanpa cadangan. Berapa kebutuhan semen dan agregatnya?",
          detail: `Volume kering = 2 × 1,5 = ${formatNumber(EXAMPLE_B.dryVolume)} m³. Semen = ${formatNumber(EXAMPLE_B.cementKg)} kg (${formatNumber(EXAMPLE_B.cementSacks)} sak), pasir = ${formatNumber(EXAMPLE_B.sandM3)} m³, kerikil = ${formatNumber(EXAMPLE_B.gravelM3)} m³.`,
          answer: `${formatNumber(EXAMPLE_B.cementSacks)} sak semen, ${formatNumber(EXAMPLE_B.sandM3)} m³ pasir, ${formatNumber(EXAMPLE_B.gravelM3)} m³ kerikil`,
          values: { volume: "2", ratio: "1:2:4", waste: "0" },
        },
      ]}
      mistakes={[
        "Menghitung material dari volume beton basah tanpa faktor volume kering 1,5.",
        "Menganggap satu sak semen selalu 40 kg, padahal perhitungan ini memakai sak 50 kg.",
        "Tidak menambahkan cadangan untuk tumpahan, pemadatan, dan sisa di alat.",
      ]}
      tips={[
        "Campuran 1:2:3 menghasilkan beton yang lebih kuat tetapi memakai semen lebih banyak.",
        "Bulatkan jumlah sak ke atas agar material tidak kurang di lokasi.",
        "Kadar air pasir dan kerikil dapat mengubah takaran air di lapangan.",
      ]}
    />
  );
}
