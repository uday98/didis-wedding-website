/**
 * Palettes live here and nowhere else.
 * Components never reference a hex value — only var(--c-*).
 *
 * To switch the whole site: change ACTIVE_PALETTE below.
 * To audition one without committing: add ?palette=marigold to the URL.
 *
 * c-shade-rgb is the colour that shadows and washes are made of, as space-
 * separated channels for rgb(... / alpha). It is black on light palettes and
 * white on dark ones, which is what lets the envelope's 3D shading and the nav
 * shadow describe "shade" rather than "black" -- on a dark-paper palette every
 * black wash would otherwise vanish and the envelope would collapse into flat
 * overlapping rectangles.
 */

export const palettes = {
  // Heirloom — ivory paper, oxblood ink, antique gold leaf.
  // Reads South Asian without shouting. Safest of the four.
  heirloom: {
    label: 'Heirloom',
    tokens: {
      'c-paper': '#FAF6EF',
      'c-paper-deep': '#F0E8DA',
      'c-ink': '#2A1F1C',
      'c-ink-soft': '#6B5A54',
      'c-accent': '#6E1E2A',
      'c-accent-soft': '#A8434F',
      'c-metal': '#C2A35A',
      'c-line': '#DDD1BE',
      'c-shade-rgb': '0 0 0',
    },
  },

  // Marigold — the flower that is physically present at every function.
  // Warmest and loudest. Deep teal keeps it from turning into a mango.
  marigold: {
    label: 'Marigold',
    tokens: {
      'c-paper': '#FBF4E6',
      'c-paper-deep': '#F3E6CC',
      'c-ink': '#1E2E2C',
      'c-ink-soft': '#5A6A67',
      'c-accent': '#0E4D4A',
      'c-accent-soft': '#2E7370',
      'c-metal': '#E09B2D',
      'c-line': '#DCCBA7',
      'c-shade-rgb': '0 0 0',
    },
  },

  // Dusk — plum and muted rose. Evening functions, sangeet, less traditional.
  dusk: {
    label: 'Dusk',
    tokens: {
      'c-paper': '#F7F1F0',
      'c-paper-deep': '#EBDDDC',
      'c-ink': '#2B1F2A',
      'c-ink-soft': '#6E5C6B',
      'c-accent': '#5C2846',
      'c-accent-soft': '#8E5372',
      'c-metal': '#B99361',
      'c-line': '#DCC9C8',
      'c-shade-rgb': '0 0 0',
    },
  },

  // Ink — cream, near-black, one vermilion accent. Editorial and restrained.
  // Ages best. Hardest to get wrong. Least "wedding".
  ink: {
    label: 'Ink',
    tokens: {
      'c-paper': '#FDFBF7',
      'c-paper-deep': '#F2EDE4',
      'c-ink': '#191817',
      'c-ink-soft': '#5E5A55',
      'c-accent': '#C1392B',
      'c-accent-soft': '#D9705F',
      'c-metal': '#9A8A6B',
      'c-line': '#E2DACB',
      'c-shade-rgb': '0 0 0',
    },
  },

  // Emerald -- deep green and warm cream. The teal in Marigold is the one that
  // worked; this takes it further toward green and drops the loudness.
  emerald: {
    label: 'Emerald',
    tokens: {
      'c-paper': '#F8F5EC',
      'c-paper-deep': '#EBE5D4',
      'c-ink': '#1C2620',
      'c-ink-soft': '#566159',
      'c-accent': '#14503C',
      'c-accent-soft': '#3C7A62',
      'c-metal': '#BFA063',
      'c-line': '#D8CFBA',
      'c-shade-rgb': '0 0 0',
    },
  },

  // Sage -- muted green on cool cream. The quietest of the eight; reads modern
  // rather than traditional, and photographs well behind real flowers.
  sage: {
    label: 'Sage',
    tokens: {
      'c-paper': '#F6F6F1',
      'c-paper-deep': '#E7E9E0',
      'c-ink': '#23281F',
      'c-ink-soft': '#5D6358',
      'c-accent': '#4A6145',
      'c-accent-soft': '#7A9070',
      'c-metal': '#A99A6B',
      'c-line': '#D7DACD',
      'c-shade-rgb': '0 0 0',
    },
  },

  // Terracotta -- warm clay and rust on sand. Daytime functions, haldi and
  // mehendi especially; the warmest without going marigold-loud.
  terracotta: {
    label: 'Terracotta',
    tokens: {
      'c-paper': '#FBF3EC',
      'c-paper-deep': '#F1E2D5',
      'c-ink': '#2E211A',
      'c-ink-soft': '#6F5B4E',
      'c-accent': '#9C4722',
      'c-accent-soft': '#C47551',
      'c-metal': '#C09055',
      'c-line': '#E2CDBC',
      'c-shade-rgb': '0 0 0',
    },
  },

  // Midnight -- deep indigo paper with silver leaf. The only dark palette, and
  // the reason c-shade-rgb exists: every wash in the envelope flips to white
  // here, or the 3D box would disappear.
  midnight: {
    label: 'Midnight',
    scheme: 'dark',
    tokens: {
      'c-paper': '#141729',
      'c-paper-deep': '#1D2138',
      'c-ink': '#EDEAF2',
      'c-ink-soft': '#A7A3BC',
      'c-accent': '#C9A227',
      'c-accent-soft': '#E0C25E',
      'c-metal': '#B9C0D4',
      'c-line': '#343954',
      'c-shade-rgb': '255 255 255',
    },
  },
};

export const ACTIVE_PALETTE = 'heirloom';

export const paletteNames = Object.keys(palettes);
