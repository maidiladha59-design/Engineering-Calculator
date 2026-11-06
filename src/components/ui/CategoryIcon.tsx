import {
  Atom,
  Binary,
  Building2,
  Calculator,
  Cog,
  Ruler,
  Zap,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  matematika: Calculator,
  fisika: Atom,
  "mekanika-teknik": Cog,
  "teknik-elektro": Zap,
  "teknik-sipil": Building2,
  "matematika-komputer": Binary,
  "konversi-satuan": Ruler,
};

export function CategoryIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[slug] ?? Calculator;

  return <Icon className={className} aria-hidden="true" />;
}
