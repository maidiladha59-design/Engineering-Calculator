"use client";

import { useMemo, type ReactNode } from "react";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { ExampleBlock } from "@/components/calculator/ExampleBlock";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { GuidanceBlock } from "@/components/calculator/GuidanceBlock";
import { MeasurementField } from "@/components/calculator/MeasurementField";
import { NumberField } from "@/components/calculator/NumberField";
import { ResultCard } from "@/components/calculator/ResultCard";
import { SelectField, type SelectOption } from "@/components/calculator/SelectField";
import { StepsList, type StepItem } from "@/components/calculator/StepsList";
import { TextField } from "@/components/calculator/TextField";
import { VariableTable, type VariableRow } from "@/components/calculator/VariableTable";
import { useCalculatorState } from "@/components/calculator/useCalculatorState";
import type { NumberRule } from "@/lib/validation";
import { validateNumberFields, type FieldSpec } from "@/lib/validation";
import { convertToBase, type UnitDefinition } from "@/lib/units";

type FormValues = Record<string, string>;

export interface NumberFieldConfig {
  kind?: "number";
  id: string;
  label: string;
  rule?: NumberRule;
  placeholder?: string;
  hint?: string;
  unit?: string;
  units?: UnitDefinition[];
  defaultUnit?: string;
  showWhen?: (form: FormValues) => boolean;
}

export interface SelectFieldConfig {
  kind: "select";
  id: string;
  label: string;
  options: SelectOption[];
  hint?: string;
  showWhen?: (form: FormValues) => boolean;
}

export type EngineField = NumberFieldConfig | SelectFieldConfig | TextFieldConfig;

export interface TextFieldConfig {
  kind: "text";
  id: string;
  label: string;
  placeholder?: string;
  hint?: string;
  mono?: boolean;
  validate?: (value: string) => string | undefined;
  showWhen?: (form: FormValues) => boolean;
}

export interface ComputeContext {
  form: FormValues;
  values: Record<string, number>;
}

export interface ComputeOutput {
  label: string;
  value: string;
  unit?: string;
  rows?: { label: string; value: ReactNode }[];
  footnote?: ReactNode;
  steps: StepItem[];
}

export interface EngineExample {
  problem: ReactNode;
  detail?: ReactNode;
  answer: ReactNode;
  values: FormValues;
}

export interface SimpleCalculatorProps {
  title: string;
  description: string;
  categoryName: string;
  fields: EngineField[];
  defaults?: FormValues;
  formulaTex: string;
  formulaDescription?: ReactNode;
  variables: VariableRow[];
  compute: (context: ComputeContext) => ComputeOutput;
  examples: EngineExample[];
  mistakes: string[];
  tips: string[];
}

function isNumberField(field: EngineField): field is NumberFieldConfig {
  return field.kind !== "select" && field.kind !== "text";
}

function isTextField(field: EngineField): field is TextFieldConfig {
  return field.kind === "text";
}

function buildInitialForm(
  fields: EngineField[],
  defaults?: FormValues,
): FormValues {
  const initial: FormValues = {};

  for (const field of fields) {
    if (field.kind === "select") {
      initial[field.id] = field.options[0]?.value ?? "";
    } else if (isTextField(field)) {
      initial[field.id] = "";
    } else {
      initial[field.id] = "";
      if (field.units) {
        initial[`${field.id}Unit`] =
          field.defaultUnit ?? field.units[0]?.value ?? "";
      }
    }
  }

  return { ...initial, ...defaults };
}

export function SimpleCalculator({
  title,
  description,
  categoryName,
  fields,
  defaults,
  formulaTex,
  formulaDescription,
  variables,
  compute,
  examples,
  mistakes,
  tips,
}: SimpleCalculatorProps) {
  const initialForm = useMemo(
    () => buildInitialForm(fields, defaults),
    [fields, defaults],
  );
  const calculator = useCalculatorState(initialForm);
  const visibleFields = fields.filter(
    (field) => !field.showWhen || field.showWhen(calculator.form),
  );

  function handleCalculate() {
    const numericFields = visibleFields.filter(isNumberField);
    const specs: Record<string, FieldSpec> = {};
    const rawInputs: Record<string, string> = {};

    for (const field of numericFields) {
      specs[field.id] = {
        label: field.label,
        rule: field.rule ?? "any",
      };
      rawInputs[field.id] = calculator.form[field.id];
    }

    const validation = validateNumberFields(rawInputs, specs);
    const textErrors: Record<string, string> = {};

    for (const field of visibleFields.filter(isTextField)) {
      const value = (calculator.form[field.id] ?? "").trim();

      if (value.length === 0) {
        textErrors[field.id] = `${field.label} wajib diisi.`;
        continue;
      }

      const message = field.validate?.(value);

      if (message) {
        textErrors[field.id] = message;
      }
    }

    if (validation.hasErrors || Object.keys(textErrors).length > 0) {
      const mergedErrors: Record<string, string> = { ...textErrors };

      for (const [key, message] of Object.entries(validation.errors)) {
        if (message) {
          mergedErrors[key] = message;
        }
      }

      calculator.setFieldErrors(mergedErrors);
      calculator.showError(
        "Periksa kembali input yang ditandai merah sebelum menghitung.",
      );
      return;
    }

    const values: Record<string, number> = { ...validation.values };

    for (const field of numericFields) {
      if (field.units) {
        values[field.id] = convertToBase(
          validation.values[field.id],
          calculator.form[`${field.id}Unit`],
          field.units,
        );
      }
    }

    calculator.setFieldErrors({});

    calculator.run(() => {
      const output = compute({ form: calculator.form, values });

      return (
        <div className="space-y-5">
          <ResultCard
            label={output.label}
            value={output.value}
            unit={output.unit}
            rows={output.rows}
            footnote={output.footnote}
          />
          <StepsList steps={output.steps} />
        </div>
      );
    });
  }

  function applyExample(values: FormValues) {
    calculator.setMany({ ...initialForm, ...values });
  }

  return (
    <CalculatorLayout
      title={title}
      description={description}
      categoryName={categoryName}
      onCalculate={handleCalculate}
      onReset={calculator.reset}
      isCalculating={calculator.isCalculating}
      error={calculator.error}
      result={calculator.result}
      formula={
        <FormulaBlock tex={formulaTex} description={formulaDescription} />
      }
      variables={<VariableTable rows={variables} />}
      example={
        <div className="grid gap-5 lg:grid-cols-2">
          {examples.map((example, index) => (
            <ExampleBlock
              key={`contoh-${index + 1}`}
              problem={example.problem}
              detail={example.detail}
              answer={example.answer}
              onUse={() => applyExample(example.values)}
            />
          ))}
        </div>
      }
      notes={<GuidanceBlock mistakes={mistakes} tips={tips} />}
    >
      {visibleFields.map((field) => {
        if (field.kind === "select") {
          return (
            <SelectField
              key={field.id}
              id={field.id}
              label={field.label}
              value={calculator.form[field.id] ?? ""}
              onChange={(value) => calculator.setField(field.id, value)}
              options={field.options}
              hint={field.hint}
            />
          );
        }

        if (isTextField(field)) {
          return (
            <TextField
              key={field.id}
              id={field.id}
              label={field.label}
              value={calculator.form[field.id] ?? ""}
              onChange={(value) => calculator.setField(field.id, value)}
              placeholder={field.placeholder}
              hint={field.hint}
              error={calculator.errors[field.id]}
              mono={field.mono}
            />
          );
        }

        if (field.units) {
          return (
            <MeasurementField
              key={field.id}
              id={field.id}
              label={field.label}
              value={calculator.form[field.id] ?? ""}
              onChange={(value) => calculator.setField(field.id, value)}
              unitValue={calculator.form[`${field.id}Unit`] ?? ""}
              onUnitChange={(value) =>
                calculator.setField(`${field.id}Unit`, value)
              }
              units={field.units}
              error={calculator.errors[field.id]}
              hint={field.hint}
              placeholder={field.placeholder}
            />
          );
        }

        return (
          <NumberField
            key={field.id}
            id={field.id}
            label={field.label}
            value={calculator.form[field.id] ?? ""}
            onChange={(value) => calculator.setField(field.id, value)}
            unit={field.unit}
            error={calculator.errors[field.id]}
            hint={field.hint}
            placeholder={field.placeholder}
          />
        );
      })}
    </CalculatorLayout>
  );
}
