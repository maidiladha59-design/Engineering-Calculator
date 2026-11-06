"use client";

import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  hint?: string;
  className?: string;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  hint,
  className,
}: SelectFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white bg-[linear-gradient(45deg,transparent_50%,#64748b_50%),linear-gradient(135deg,#64748b_50%,transparent_50%)] bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-18px)_center,calc(100%-13px)_center] bg-no-repeat px-3.5 pr-10 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export interface UnitSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export function UnitSelect({
  id,
  label,
  value,
  onChange,
  options,
  className,
}: UnitSelectProps) {
  return (
    <SelectField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      options={options}
      className={cn("sm:col-span-1", className)}
    />
  );
}
