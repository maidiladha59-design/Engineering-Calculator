"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { CalculatorComponentProps } from "@/components/calculator/CalculatorLayout";
import { CalculatorSkeleton } from "@/components/calculator/CalculatorSkeleton";

const loading = () => <CalculatorSkeleton />;

const DasarCalculator = dynamic(() => import("./math/DasarCalculator"), {
  loading,
});
const PersentaseCalculator = dynamic(
  () => import("./math/PersentaseCalculator"),
  { loading },
);
const PecahanCalculator = dynamic(() => import("./math/PecahanCalculator"), {
  loading,
});
const PangkatAkarCalculator = dynamic(
  () => import("./math/PangkatAkarCalculator"),
  { loading },
);
const LogaritmaCalculator = dynamic(
  () => import("./math/LogaritmaCalculator"),
  { loading },
);
const PersamaanKuadratCalculator = dynamic(
  () => import("./math/PersamaanKuadratCalculator"),
  { loading },
);
const SistemLinearCalculator = dynamic(
  () => import("./math/SistemLinearCalculator"),
  { loading },
);
const KecepatanCalculator = dynamic(
  () => import("./physics/KecepatanCalculator"),
  { loading },
);
const PercepatanCalculator = dynamic(
  () => import("./physics/PercepatanCalculator"),
  { loading },
);
const GayaCalculator = dynamic(() => import("./physics/GayaCalculator"), {
  loading,
});
const UsahaEnergiCalculator = dynamic(
  () => import("./physics/UsahaEnergiCalculator"),
  { loading },
);
const DayaCalculator = dynamic(() => import("./physics/DayaCalculator"), {
  loading,
});
const MomentumCalculator = dynamic(
  () => import("./physics/MomentumCalculator"),
  { loading },
);
const ImpulsCalculator = dynamic(() => import("./physics/ImpulsCalculator"), {
  loading,
});
const TekananCalculator = dynamic(
  () => import("./physics/TekananCalculator"),
  { loading },
);
const MassaJenisCalculator = dynamic(
  () => import("./physics/MassaJenisCalculator"),
  { loading },
);
const MomenGayaCalculator = dynamic(
  () => import("./mechanics/MomenGayaCalculator"),
  { loading },
);
const TorsiCalculator = dynamic(() => import("./mechanics/TorsiCalculator"), {
  loading,
});
const KeseimbanganBendaCalculator = dynamic(
  () => import("./mechanics/KeseimbanganBendaCalculator"),
  { loading },
);
const PusatMassaCalculator = dynamic(
  () => import("./mechanics/PusatMassaCalculator"),
  { loading },
);
const MomenInersiaCalculator = dynamic(
  () => import("./mechanics/MomenInersiaCalculator"),
  { loading },
);
const EnergiKinetikRotasiCalculator = dynamic(
  () => import("./mechanics/EnergiKinetikRotasiCalculator"),
  { loading },
);
const TeganganReganganCalculator = dynamic(
  () => import("./mechanics/TeganganReganganCalculator"),
  { loading },
);
const ModulusElastisitasCalculator = dynamic(
  () => import("./mechanics/ModulusElastisitasCalculator"),
  { loading },
);
const HukumOhmCalculator = dynamic(
  () => import("./electro/HukumOhmCalculator"),
  { loading },
);
const DayaListrikCalculator = dynamic(
  () => import("./electro/DayaListrikCalculator"),
  { loading },
);
const ResistansiKawatCalculator = dynamic(
  () => import("./electro/ResistansiKawatCalculator"),
  { loading },
);
const RangkaianSeriParalelCalculator = dynamic(
  () => import("./electro/RangkaianSeriParalelCalculator"),
  { loading },
);
const EnergiListrikCalculator = dynamic(
  () => import("./electro/EnergiListrikCalculator"),
  { loading },
);
const KonversiSatuanListrikCalculator = dynamic(
  () => import("./electro/KonversiSatuanListrikCalculator"),
  { loading },
);
const VolumeBetonCalculator = dynamic(
  () => import("./civil/VolumeBetonCalculator"),
  { loading },
);
const VolumeBalokCalculator = dynamic(
  () => import("./civil/VolumeBalokCalculator"),
  { loading },
);
const VolumeKolomCalculator = dynamic(
  () => import("./civil/VolumeKolomCalculator"),
  { loading },
);
const LuasBangunanCalculator = dynamic(
  () => import("./civil/LuasBangunanCalculator"),
  { loading },
);
const KebutuhanMaterialCalculator = dynamic(
  () => import("./civil/KebutuhanMaterialCalculator"),
  { loading },
);
const CampuranBetonCalculator = dynamic(
  () => import("./civil/CampuranBetonCalculator"),
  { loading },
);
const BeratBesiCalculator = dynamic(
  () => import("./civil/BeratBesiCalculator"),
  { loading },
);
const BilanganBinerCalculator = dynamic(
  () => import("./binary/BilanganBinerCalculator"),
  { loading },
);
const PenjumlahanBinerCalculator = dynamic(
  () => import("./binary/PenjumlahanBinerCalculator"),
  { loading },
);
const PenguranganBinerCalculator = dynamic(
  () => import("./binary/PenguranganBinerCalculator"),
  { loading },
);
const KonversiBinerDesimalCalculator = dynamic(
  () => import("./binary/KonversiBinerDesimalCalculator"),
  { loading },
);
const HeksadesimalCalculator = dynamic(
  () => import("./binary/HeksadesimalCalculator"),
  { loading },
);
const OktalCalculator = dynamic(() => import("./binary/OktalCalculator"), {
  loading,
});

const REGISTRY: Record<string, ComponentType<CalculatorComponentProps>> = {
  dasar: DasarCalculator,
  persentase: PersentaseCalculator,
  pecahan: PecahanCalculator,
  "pangkat-akar": PangkatAkarCalculator,
  logaritma: LogaritmaCalculator,
  "persamaan-kuadrat": PersamaanKuadratCalculator,
  "sistem-persamaan-linear": SistemLinearCalculator,
  kecepatan: KecepatanCalculator,
  percepatan: PercepatanCalculator,
  gaya: GayaCalculator,
  "usaha-energi": UsahaEnergiCalculator,
  daya: DayaCalculator,
  momentum: MomentumCalculator,
  impuls: ImpulsCalculator,
  tekanan: TekananCalculator,
  "massa-jenis": MassaJenisCalculator,
  "momen-gaya": MomenGayaCalculator,
  torsi: TorsiCalculator,
  "keseimbangan-benda": KeseimbanganBendaCalculator,
  "pusat-massa": PusatMassaCalculator,
  "momen-inersia": MomenInersiaCalculator,
  "energi-kinetik-rotasi": EnergiKinetikRotasiCalculator,
  "tegangan-regangan": TeganganReganganCalculator,
  "modulus-elastisitas": ModulusElastisitasCalculator,
  "hukum-ohm": HukumOhmCalculator,
  "daya-listrik": DayaListrikCalculator,
  "resistansi-kawat": ResistansiKawatCalculator,
  "rangkaian-seri-paralel": RangkaianSeriParalelCalculator,
  "energi-listrik": EnergiListrikCalculator,
  "konversi-satuan-listrik": KonversiSatuanListrikCalculator,
  "volume-beton": VolumeBetonCalculator,
  "volume-balok": VolumeBalokCalculator,
  "volume-kolom": VolumeKolomCalculator,
  "luas-bangunan": LuasBangunanCalculator,
  "kebutuhan-material": KebutuhanMaterialCalculator,
  "campuran-beton": CampuranBetonCalculator,
  "berat-besi": BeratBesiCalculator,
  "bilangan-biner": BilanganBinerCalculator,
  "penjumlahan-biner": PenjumlahanBinerCalculator,
  "pengurangan-biner": PenguranganBinerCalculator,
  "konversi-biner-desimal": KonversiBinerDesimalCalculator,
  heksadesimal: HeksadesimalCalculator,
  oktal: OktalCalculator,
};

export function CalculatorRenderer({
  calculator,
  categoryName,
}: {
  calculator: {
    slug: string;
    name: string;
    description: string;
    category: string;
  };
  categoryName: string;
}) {
  const Component = REGISTRY[calculator.slug];

  if (!Component) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <p className="text-sm font-semibold text-rose-800">
          Kalkulator belum tersedia
        </p>
        <p className="mt-1 text-sm text-rose-700">
          Komponen untuk kalkulator ini belum terdaftar. Silakan kembali ke
          daftar kalkulator.
        </p>
      </div>
    );
  }

  return (
    <Component
      title={calculator.name}
      description={calculator.description}
      categoryName={categoryName}
    />
  );
}
