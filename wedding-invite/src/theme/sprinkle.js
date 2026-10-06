import { useSyncExternalStore } from 'react';
import { safeLocalGet, safeLocalSet } from '../lib/storage';

/**
 * Where the paisleys go, as a pure function of a seed.
 *
 * "Random" is a decision tool here, not a runtime behaviour: the same seed gives
 * the same page for every guest on every load (no layout that shifts between a
 * guest's phone and their parent's), and the dev panel can walk seeds until one
 * looks right. ACTIVE_SPRINKLE_SEED is what ships once a number is chosen.
 *
 * Not purely random placement either: slots are spaced evenly down the page and
 * only jittered, so no seed can pile three ornaments into one screenful and
 * leave a long run bare, and sides alternate for the same reason.
 */
export const ACTIVE_SPRINKLE_SEED = 7;
export const SPRINKLE_COUNT = 8;

const KEY = 'invite.sprinkle';

// mulberry32 -- tiny, fast, good enough for layout.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function layout(seed, count = SPRINKLE_COUNT) {
  const r = rng(seed);
  const firstSide = r() < 0.5 ? 0 : 1;
  const lo = 7;
  const hi = 93;
  const slot = (hi - lo) / count;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    side: (firstSide + i) % 2 === 0 ? 'left' : 'right',
    // % of the page height, jittered inside the slot but never to its edges
    top: +(lo + slot * (i + 0.18 + r() * 0.64)).toFixed(2),
    size: +(0.8 + r() * 0.5).toFixed(2),     // multiplier on the base width
    tilt: Math.round(-26 + r() * 52),         // degrees
    flip: r() < 0.5,                          // mirrored about the vertical axis
    // how much of it is on screen, 0.45 (a sliver) to 0.75 (most of it) -- only
    // matters on a phone; wider screens have the room to show it whole
    show: +(0.45 + r() * 0.3).toFixed(2),
  }));
}

/* A tiny external store so the dev panel and the page share one seed without a
   provider. URL ?seed= wins and does not persist, like ?palette= and ?motion=. */
let seed = (() => {
  const fromUrl = Number(new URLSearchParams(window.location.search).get('seed'));
  if (Number.isInteger(fromUrl) && fromUrl > 0) return fromUrl;
  const stored = Number(safeLocalGet(KEY));
  return Number.isInteger(stored) && stored > 0 ? stored : ACTIVE_SPRINKLE_SEED;
})();
const listeners = new Set();

export function setSeed(next) {
  seed = Math.max(1, Math.floor(next) || 1);
  safeLocalSet(KEY, String(seed));
  listeners.forEach((l) => l());
}

export function useSeed() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => seed,
    () => ACTIVE_SPRINKLE_SEED,
  );
}
