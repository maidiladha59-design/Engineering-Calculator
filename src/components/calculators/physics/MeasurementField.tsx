"use client";

import { NumberField } from "@/components/calculator/NumberField";
import { UnitSelect } from "@/components/calculator/SelectField";
import type { UnitDefinition } from "@/lib/units";
import { unitOptions } from "@/lib/units";

export function MeasurementField({
  id,
  label,
  value,
  onChange,
  unitValue,
  onUnitChange,
  units,
  error,
  hint,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  unitValue: string;
  onUnitChange: (value: string) => void;
  units: UnitDefinition[];
  error?: string;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-start">
      <NumberField
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        hint={hint}
        placeholder={placeholder}
      />
      <UnitSelect
        id={`${id}-unit`}
        label="Satuan"
        value={unitValue}
        onChange={onUnitChange}
        options={unitOptions(units)}
      />
    </div>
  );
}
