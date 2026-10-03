/**
 * Durations live here and nowhere else.
 *
 * CSS consumes them as var(--d-*); the values are injected at boot, the same
 * way palettes.js colours are. A number can therefore never be stale in one
 * place and fresh in the other -- which is exactly what went wrong before:
 * the hook waited 2000ms for an animation that finished at 1600ms.
 *
 * Invariant: d-flap <= d-card-delay + d-card, or the timer cuts the stage
 * while the flap is still moving. PACE_SCALE multiplies both sides of that
 * inequality, so a single multiplier can never break it.
 */
export const MOTION = {
  'd-flap': 900,        // flap swings open
  'd-card': 1100,       // card rises and comes forward
  'd-card-delay': 450,  // card waits for the flap to clear
  'd-seal': 400,        // wax seal fades out
  'd-hold': 220,        // beat on the risen card before the reveal cuts

  'd-reveal': 700,      // a section fading up as it enters the viewport
  'd-stagger': 70,      // gap between consecutive children in a staggered group
  'd-hero': 900,        // hero entrance once the envelope is done
  'd-hover': 220,       // colour and border on hover
  'd-tap': 160,         // the pressed state, deliberately quicker than hover
};

/**
 * The `pace` dimension. ONE number scales every duration on the site: CSS
 * multiplies by --pace-k, and openTotalMs() multiplies the same factor into the
 * one wall-clock timer. They cannot desync, because neither owns the number --
 * this map does.
 *
 * `brisk` is the original timing, kept as a control to compare against.
 * `measured` is the default: 1770ms read as hurried for an object meant to feel
 * like paper. `slow` is for showing someone across a table, not for a guest who
 * opened the link to recheck a venue.
 *
 * A multiplier rather than three full duration maps, because the flap/card/seal
 * numbers are in proportion to one another and that proportion is the thing
 * that was tuned. Three maps would be three chances to get it wrong.
 */
export const PACE_SCALE = { brisk: 1, measured: 1.35, slow: 1.8 };
export const DEFAULT_PACE = 'measured';

/** Unscaled length of the opening. For documentation; never time anything with it. */
export const BASE_OPEN_MS =
  MOTION['d-card-delay'] + MOTION['d-card'] + MOTION['d-hold']; // 1770

/** Length of the whole opening at a given pace.
 *  brisk 1770ms - measured 2390ms - slow 3186ms */
export function openTotalMs(pace) {
  return Math.round(BASE_OPEN_MS * (PACE_SCALE[pace] ?? PACE_SCALE[DEFAULT_PACE]));
}

export function applyMotionVars(root = document.documentElement) {
  Object.entries(MOTION).forEach(([k, v]) => root.style.setProperty(`--${k}`, `${v}ms`));
}

/**
 * Written INLINE, deliberately, for the same reason --d-* are: so PACE_SCALE
 * stays the only source rather than being mirrored by a parallel set of
 * [data-pace] rules that can drift. The corollary is the same footgun --
 * --pace-k must NEVER be defined in a stylesheet rule, only as the fallback
 * inside var(--pace-k, 1.35). An inline custom property beats any rule.
 */
export function applyPaceVar(pace, root = document.documentElement) {
  root.style.setProperty('--pace-k', String(PACE_SCALE[pace] ?? PACE_SCALE[DEFAULT_PACE]));
}
