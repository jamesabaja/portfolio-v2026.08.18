/** Gap between neighbouring items in a staggered reveal, in milliseconds. */
const STAGGER_STEP_MS = 90;

/**
 * Past this many items the stagger stops accumulating. A twelve-item grid would
 * otherwise leave its last card waiting a second after its first — long enough
 * to read as a loading state rather than an entrance.
 */
const MAX_STAGGER_STEPS = 6;

/**
 * Per-item delay for a staggered `data-reveal` group.
 *
 * ```tsx
 * {items.map((item, index) => (
 *   <li key={item} data-reveal style={stagger(index)} />
 * ))}
 * ```
 */
export function stagger(index: number, stepMs: number = STAGGER_STEP_MS): React.CSSProperties {
  const steps = Math.min(Math.max(index, 0), MAX_STAGGER_STEPS);

  return { "--reveal-delay": `${steps * stepMs}ms` } as React.CSSProperties;
}
