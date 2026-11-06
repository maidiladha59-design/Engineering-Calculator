"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { getFriendlyError } from "@/lib/validation";

interface RunnerState {
  isCalculating: boolean;
  error: string | null;
  result: ReactNode | null;
}

export function useCalculatorState<T extends Record<string, string>>(initial: T) {
  const [form, setForm] = useState<T>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<RunnerState>({
    isCalculating: false,
    error: null,
    result: null,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const setField = useCallback((field: keyof T & string, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!(field in previous)) {
        return previous;
      }

      const next = { ...previous };
      delete next[field];
      return next;
    });
  }, []);

  const setFieldErrors = useCallback((nextErrors: Record<string, string>) => {
    setErrors(nextErrors);
  }, []);

  const run = useCallback(
    (calculate: () => ReactNode) => {
      clearTimer();
      setState({ isCalculating: true, error: null, result: null });
      timerRef.current = setTimeout(() => {
        try {
          const result = calculate();
          setState({ isCalculating: false, error: null, result });
        } catch (error) {
          setState({
            isCalculating: false,
            error: getFriendlyError(error),
            result: null,
          });
        }
        timerRef.current = null;
      }, 140);
    },
    [clearTimer],
  );

  const reset = useCallback(() => {
    clearTimer();
    setForm(initial);
    setErrors({});
    setState({ isCalculating: false, error: null, result: null });
  }, [clearTimer, initial]);

  const setMany = useCallback(
    (values: Partial<T>) => {
      clearTimer();
      setForm((previous) => ({ ...previous, ...values }));
      setErrors({});
      setState({ isCalculating: false, error: null, result: null });
    },
    [clearTimer],
  );

  const showError = useCallback((message: string) => {
    setState({ isCalculating: false, error: message, result: null });
  }, []);

  return {
    form,
    setField,
    errors,
    setFieldErrors,
    reset,
    setMany,
    run,
    showError,
    isCalculating: state.isCalculating,
    error: state.error,
    result: state.result,
  };
}
