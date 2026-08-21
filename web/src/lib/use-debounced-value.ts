"use client";

import { useEffect, useState } from "react";

/**
 * Trails `value` by `delay` milliseconds, so typing settles before whatever
 * reads it does its work.
 *
 * The timer is cleared on every change, so a burst of keystrokes produces a
 * single update once the user pauses.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
