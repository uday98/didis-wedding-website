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
  // High-contrast didone display over a humanist grotesque. The original.
  'prata-karla': {
    label: 'Prata / Karla',
    href: 'https://fonts.googleapis.com/css2?family=Prata&family=Karla:wght@400;700&display=swap',
    vars: {
      'font-display': "'Prata', Georgia, 'Times New Roman', serif",
      'font-body': "'Karla', system-ui, -apple-system, sans-serif",
      /* Faces differ in how large they run on the em and how tight they read at
         hero sizes. One scale and one tracking value per pairing keeps the type
         scale in tokens.css face-agnostic, instead of retuning --t-2xl every
         time this row is clicked. */
      'font-display-scale': '1',
      'font-display-track': '-0.012em',
    },
  },

  // The lightest, most engraved-stationery option. Cormorant at 500/600 because
  // 400 is too fine to survive a phone screen at body-adjacent sizes.
  'cormorant-jost': {
    label: 'Cormorant / Jost',
    href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500&display=swap',
    vars: {
      'font-display': "'Cormorant Garamond', Georgia, serif",
      'font-body': "'Jost', system-ui, -apple-system, sans-serif",
      'font-display-scale': '1.14',
      'font-display-track': '0.004em',
    },
  },

  // The conventionally bridal one. Worth having as the control the family will
  // recognise, even if it is the least interesting of the four.
  'playfair-lato': {
    label: 'Playfair / Lato',
    href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Lato:wght@400;700&display=swap',
    vars: {
      'font-display': "'Playfair Display', Georgia, serif",
      'font-body': "'Lato', system-ui, -apple-system, sans-serif",
      'font-display-scale': '0.98',
      'font-display-track': '-0.006em',
    },
  },

  // The modern one. Fraunces has a soft, slightly wonky warmth that reads less
  // formal than the other three without reading casual.
  'fraunces-inter': {
    label: 'Fraunces / Inter',
    href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;600&display=swap',
    vars: {
      'font-display': "'Fraunces', Georgia, serif",
      'font-body': "'Inter', system-ui, -apple-system, sans-serif",
      'font-display-scale': '0.96',
      'font-display-track': '-0.016em',
    },
  },
};

export const ACTIVE_PAIRING = 'prata-karla';

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
