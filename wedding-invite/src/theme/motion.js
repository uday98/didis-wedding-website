/**
 * Durations live here and nowhere else.
 *
 * CSS consumes them as var(--d-*); the values are injected at boot, the same
 * way palettes.js colours are. A number can therefore never be stale in one
 * place and fresh in the other -- which is exactly what went wrong before:
 * the hook waited 2000ms for an animation that finished at 1600ms.
 *
 * The opening is a sequence of beats, authored here at `brisk` (unscaled). At
 * the default `measured` pace (x1.35) they land on the intended shape:
 *
 *   0.0s  sealed
 *   0.3s  flap hinges back                        (1.6s)
 *   1.9s  card rises clear of the box             (2.0s)
 *   3.9s  card settles, alone, and holds          (0.7s)
 *   4.6s  stage fades as the shell rises under it (1.2s)
 *   5.8s  done
 */
const BEATS = {
  'd-flap-delay': 220,  // a beat before the flap moves at all
  'd-flap': 1180,       // flap swings back
  'd-card': 1480,       // card rises clear of the box and leans forward
  'd-hold': 520,        // the risen card alone, before the hand-off
  'd-exit': 890,        // stage fades out while the shell rises underneath
  'd-seal': 400,        // wax seal fades, inside the flap's first beat

  'd-reveal': 700,      // a section fading up as it enters the viewport
  'd-stagger': 70,      // gap between consecutive children in a staggered group
  'd-hero': 900,        // hero entrance once the envelope is done
  'd-hover': 220,       // colour and border on hover
  'd-tap': 160,         // the pressed state, deliberately quicker than hover
};

export const MOTION = {
  ...BEATS,
  /* DERIVED, not authored: the card starts exactly as the flap finishes. This
     file used to state "d-flap <= d-card-delay + d-card" as an invariant and
     author both sides of it, so editing one number could break it. Computing it
     means it cannot be. */
  'd-card-delay': BEATS['d-flap-delay'] + BEATS['d-flap'],
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

/** Sealed until the card is risen and has held. The `opening` phase. */
export const BASE_OPEN_MS =
  MOTION['d-card-delay'] + MOTION['d-card'] + MOTION['d-hold']; // 3400
/** The hand-off, while the shell rises underneath. The `closing` phase. */
export const BASE_EXIT_MS = MOTION['d-exit'];                   // 890
/** Documentation only; never time anything with it.
 *  brisk 4290 - measured 5792 - slow 7722 */
export const BASE_TOTAL_MS = BASE_OPEN_MS + BASE_EXIT_MS;

const k = (pace) => PACE_SCALE[pace] ?? PACE_SCALE[DEFAULT_PACE];

/** brisk 3400 - measured 4590 - slow 6120 */
export function openTotalMs(pace) { return Math.round(BASE_OPEN_MS * k(pace)); }
/** brisk 890 - measured 1202 - slow 1602 */
export function exitTotalMs(pace) { return Math.round(BASE_EXIT_MS * k(pace)); }

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
