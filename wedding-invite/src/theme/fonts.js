/**
 * Type pairings live here and nowhere else, the same shape palettes.js uses:
 * a definition map plus one ACTIVE_* constant. Delete the dev panel's row and
 * ACTIVE_PAIRING is what ships.
 *
 * Loading, which is the part that matters on a phone:
 *
 * index.html hard-codes the stylesheet for ACTIVE_PAIRING, tagged with
 * data-pairing-src. That is deliberate and not duplication-by-accident: a link
 * in the initial HTML is found by the preload scanner before the module script
 * is even parsed, whereas a link injected from JS waits on module fetch, parse
 * and execute -- several hundred ms on 3G, and document.fonts.ready is what
 * gates the hero entrance. ensurePairing() dedupes against that link by href,
 * so the default pairing is never fetched twice and a pairing nobody auditions
 * is never fetched at all.
 *
 * The href therefore exists in two files. The dev assertion at the bottom is
 * what stops them drifting.
 */
export const PAIRINGS = {
  /* Three faces, three jobs:
       Pinyon Script       the couple's names only -- calligraphy, never a paragraph.
       Cormorant Garamond  event titles and the other elegant headings.
       Manrope             dates, times, addresses, links and practical details.
     Sizes are in tokens.css (--fs-*), set in px terms by the family and made
     fluid there, so the display scale is 1 and not a per-face correction. */
  'script-trio': {
    label: 'Pinyon / Cormorant / Manrope',
    href: 'https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:wght@500;600&family=Manrope:wght@400;500;600&display=swap',
    vars: {
      'font-script': "'Pinyon Script', 'Snell Roundhand', cursive",
      'font-display': "'Cormorant Garamond', Georgia, serif",
      'font-body': "'Manrope', system-ui, -apple-system, sans-serif",
      'font-display-scale': '1',
      'font-display-track': '0.004em',
    },
  },
};

export const ACTIVE_PAIRING = 'script-trio';

export const pairingNames = Object.keys(PAIRINGS);

const LINK_ATTR = 'data-pairing-src';

/**
 * Makes sure the pairing's stylesheet is in the document, exactly once.
 *
 * For ACTIVE_PAIRING this finds the link index.html already shipped and returns
 * without touching the DOM, so the live site pays nothing at runtime. For any
 * other pairing it appends one link, once.
 */
export function ensurePairing(name) {
  const pairing = PAIRINGS[name];
  if (!pairing) return;

  const existing = document.querySelector(`link[${LINK_ATTR}="${name}"]`);
  if (existing) return;

  // Also dedupe by href, in case index.html's link is ever left untagged.
  if (document.querySelector(`link[href="${pairing.href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = pairing.href;
  link.setAttribute(LINK_ATTR, name);
  document.head.appendChild(link);
}

/** Writes the pairing's faces and metrics as --font-* on <html>. */
export function applyPairingVars(name, root = document.documentElement) {
  const pairing = PAIRINGS[name] ?? PAIRINGS[ACTIVE_PAIRING];
  Object.entries(pairing.vars).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
}

if (import.meta.env?.DEV) {
  /* The one guard against index.html and this file drifting apart. If it fires,
     the shipped site is preloading a stylesheet nothing uses and the real one
     arrives late. */
  queueMicrotask(() => {
    const shipped = document.querySelector(`link[${LINK_ATTR}]`);
    const want = PAIRINGS[ACTIVE_PAIRING].href;
    if (!shipped) {
      console.warn(`[fonts] index.html has no link[${LINK_ATTR}]. Add one for ACTIVE_PAIRING.`);
    } else if (shipped.getAttribute('href') !== want) {
      console.warn(
        `[fonts] index.html preloads a different stylesheet than ACTIVE_PAIRING (${ACTIVE_PAIRING}).\n` +
        `  index.html: ${shipped.getAttribute('href')}\n  fonts.js:   ${want}`,
      );
    }
  });
}
