/**
 * Durations live here and nowhere else.
 *
 * CSS consumes them as var(--d-*); the values are injected at boot, the same
 * way palettes.js colours are. A number can therefore never be stale in one
 * place and fresh in the other — which is exactly what went wrong before:
 * the hook waited 2000ms for an animation that finished at 1600ms.
 *
 * Invariant: d-flap <= d-card-delay + d-card, or the timer cuts the stage
 * while the flap is still moving.
 */
export const MOTION = {
  'd-flap': 900,        // flap swings open
  'd-card': 1100,       // card rises and comes forward
  'd-card-delay': 450,  // card waits for the flap to clear
  'd-seal': 400,        // wax seal fades out
  'd-hold': 220,        // beat on the risen card before the reveal cuts
};

/** Wall-clock length of the whole opening, for the one timer that needs it. */
export const OPEN_TOTAL_MS =
  MOTION['d-card-delay'] + MOTION['d-card'] + MOTION['d-hold'];

export function applyMotionVars(root = document.documentElement) {
  Object.entries(MOTION).forEach(([k, v]) => root.style.setProperty(`--${k}`, `${v}ms`));
}
