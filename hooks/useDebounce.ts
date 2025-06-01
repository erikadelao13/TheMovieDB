// src/hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a rapidly‐changing value.
 * @param value  The input value to debounce (string, number, etc.).
 * @param delay  How long (ms) to wait after the last change before updating debouncedValue.
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If `value` changes again before `delay` ms, clear the timeout.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
