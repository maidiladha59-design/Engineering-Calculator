"use client";

import { cn } from "@/lib/cn";

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  mono = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  mono?: boolean;
}) {
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "mt-1.5 h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4",
          mono ? "font-mono tracking-wide" : "",
          error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
            : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
