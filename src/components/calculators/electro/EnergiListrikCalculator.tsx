"use client";

import { SimpleCalculator } from "@/components/calculator/SimpleCalculator";
import { formatNumber, formatRupiah } from "@/lib/format";
import { electricalEnergy } from "@/lib/math/electricity";
import { POWER_UNITS } from "@/lib/units";

const EXAMPLE_A = electricalEnergy(0.1, 10, 1500);
const EXAMPLE_B = electricalEnergy(1, 8, 1444.7);

export default function EnergiListrikCalculator(props: {
  title: string;
  description: string;
  categoryName: string;
}) {
  return (
    <SimpleCalculator
      {...props}
      fields={[
        {
          id: "power",
          label: "Daya peralatan (P)",
          units: POWER_UNITS,
          defaultUnit: "W",
          rule: "non-negative",
          hint: "Contoh: 100 W atau 1 kW",
        },
        {
          id: "hours",
          label: "Lama pemakaian (t)",
          unit: "jam",
          rule: "non-negative",
          hint: "Contoh: 8",
        },
        {
          id: "tariff",
          label: "Tarif listrik",
          unit: "Rp/kWh",
          rule: "non-negative",
          hint: "Sesuaikan dengan tarif golongan Anda, contoh 1.444,70.",
        },
      ]}
      formulaTex={String.raw`E=P\,t\qquad \text{biaya}=E\,(\text{kWh})\times \text{tarif}`}
      formulaDescription="Energi listrik adalah daya dikali waktu pemakaian. Untuk tagihan, energi dihitung dalam kilowatt jam (kWh), lalu dikalikan tarif per kWh."
      variables={[
        { symbol: "E", name: "Energi listrik", unit: "kWh", note: "Energi yang terpakai selama waktu tertentu" },
        { symbol: "P", name: "Daya", unit: "kW", note: "Daya peralatan dalam kilowatt" },
        { symbol: "t", name: "Waktu", unit: "jam", note: "Lama peralatan menyala" },
        { symbol: "tarif", name: "Tarif listrik", unit: "Rp/kWh", note: "Harga per kilowatt jam" },
      ]}
      compute={({ values }) => {
        const powerKw = values.power / 1000;
        const result = electricalEnergy(powerKw, values.hours, values.tariff);

        return {
          label: "Energi listrik (E)",
          value: formatNumber(result.kilowattHours),
          unit: "kWh",
          rows: [
            { label: "Energi dalam joule", value: `${formatNumber(result.joules)} J` },
            { label: "Daya", value: `${formatNumber(values.power)} W = ${formatNumber(powerKw)} kW` },
            { label: "Lama pemakaian", value: `${formatNumber(values.hours)} jam` },
            { label: "Perkiraan biaya", value: formatRupiah(result.cost) },
          ],
          footnote:
            "Biaya belum termasuk pajak, biaya administrasi, atau golongan tarif bertingkat. Gunakan tarif rata-rata tagihan Anda untuk estimasi yang lebih dekat.",
          steps: [
            {
              title: "Ubah daya ke kilowatt",
              detail: `P = ${formatNumber(values.power)} W / 1.000 = ${formatNumber(powerKw)} kW.`,
            },
            {
              title: "Kalikan daya dengan waktu",
              detail: `E = ${formatNumber(powerKw)} kW × ${formatNumber(values.hours)} jam = ${formatNumber(result.kilowattHours)} kWh.`,
            },
            {
              title: "Ubah energi ke joule",
              detail: `E = ${formatNumber(result.kilowattHours)} × 3.600.000 = ${formatNumber(result.joules)} J.`,
            },
            {
              title: "Hitung perkiraan biaya",
              detail: `Biaya = ${formatNumber(result.kilowattHours)} kWh × ${formatRupiah(values.tariff)}/kWh = ${formatRupiah(result.cost)}.`,
            },
          ],
        };
      }}
      examples={[
        {
          problem:
            "Lampu 100 W menyala 10 jam sehari. Dengan tarif Rp1.500 per kWh, berapa energi dan biaya listriknya?",
          detail: `P = 0,1 kW. E = 0,1 × 10 = ${formatNumber(EXAMPLE_A.kilowattHours)} kWh. Biaya = ${formatRupiah(EXAMPLE_A.cost)}.`,
          answer: `${formatNumber(EXAMPLE_A.kilowattHours)} kWh, ${formatRupiah(EXAMPLE_A.cost)}`,
          values: { power: "100", powerUnit: "W", hours: "10", tariff: "1500" },
        },
        {
          problem:
            "Pompa 1 kW beroperasi 8 jam setiap hari dengan tarif Rp1.444,70 per kWh. Hitung pemakaian energi dan biayanya.",
          detail: `E = 1 × 8 = ${formatNumber(EXAMPLE_B.kilowattHours)} kWh. Biaya = ${formatRupiah(EXAMPLE_B.cost)}.`,
          answer: `${formatNumber(EXAMPLE_B.kilowattHours)} kWh, ${formatRupiah(EXAMPLE_B.cost)}`,
          values: { power: "1", powerUnit: "kW", hours: "8", tariff: "1444.7" },
        },
      ]}
      mistakes={[
        "Memakai daya dalam watt tanpa membaginya dengan 1.000 saat menghitung kWh.",
        "Memasukkan waktu dalam menit padahal rumus memakai jam.",
        "Menganggap hasil biaya sudah termasuk pajak dan biaya beban.",
      ]}
      tips={[
        "1 kWh = 1.000 W × 1 jam = 3,6 juta joule.",
        "Untuk memperkirakan tagihan bulanan, kalikan hasil harian dengan jumlah hari pemakaian.",
        "Peralatan dengan daya besar tetapi waktu singkat bisa lebih hemat daripada peralatan berdaya kecil yang menyala terus.",
      ]}
    />
  );
}
