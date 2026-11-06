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
