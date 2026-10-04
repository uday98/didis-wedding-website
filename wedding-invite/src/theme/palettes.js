/**
 * Palettes live here and nowhere else.
 * Components never reference a hex value — only var(--c-*).
 *
 * To switch the whole site: change ACTIVE_PALETTE below.
 * To audition one without committing: add ?palette=marigold to the URL.
 *
 * c-shade-rgb vs c-cast-rgb -- these are different questions, and conflating
 * them is why the dark palette read flat. c-shade-rgb is how a SURFACE'S OWN
 * FORM is shaded, so it flips to white on dark paper or the envelope's walls
 * collapse into flat rectangles. c-cast-rgb is the colour of a shadow THROWN
 * ONTO ANOTHER SURFACE, so it stays dark everywhere -- a white shadow under a
 * card is a glow, and every box-shadow on the site was white on midnight.
 *
 * c-surface is what the cards lie on; it must differ from c-paper by enough to
 * see a card's edge without drawing a border.
 * c-on-surface, c-on-surface-soft, c-surface-accent, c-surface-line, c-surface-tex,
 * c-stage
 * are OPTIONAL, for a palette whose surface is DARKER than its ink. Everything
 * that sits directly on the surface rather than on a card (the hero's date and
 * tagline, the footer, the replay link, the corner ornaments) is normally drawn in
 * the palette's dark ink -- which is invisible on a maroon surface. A palette like
 * that supplies its own text colours for the surface; the others omit these and
 * fall back to ink, accent and line, so they are unchanged. c-surface-tex swaps
 * the surface's grain to the light tile, since dark noise does nothing on dark.
 * c-stage is the colour behind the envelope (default: paper-deep).
 *
 * c-on-photo is type over a photograph. It cannot be derived from the palette:
 * ink's paper and midnight's ink are both near-white and point opposite ways,
 * so the scrim is always dark and this is always light.
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
      'c-surface': '#DFD2BC',       // the linen the cards lie on
      'c-cast-rgb': '0 0 0',       // a cast shadow is dark on every palette
      'c-on-photo': '#FFFBF4',
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
      'c-surface': '#E2CFA6',       // raw turmeric-dyed cloth
      'c-cast-rgb': '0 0 0',       // a cast shadow is dark on every palette
      'c-on-photo': '#FFFCF2',
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
      'c-surface': '#D8C2C2',       // dusty rose, a shade under the paper
      'c-cast-rgb': '0 0 0',       // a cast shadow is dark on every palette
      'c-on-photo': '#FFF8F7',
      'c-shade-rgb': '0 0 0',
    },
  },

  // Ink — cream, near-black, one vermilion accent. Editorial and restrained.
  // Ages best. Hardest to get wrong. Least "wedding".
  ink: {
    label: 'Ink',
    tokens: {
      // Was #FDFBF7. The one palette near enough to white that the page read as
      // type on white, and the one most likely to ship.
      'c-paper': '#FBF8F2',
      'c-paper-deep': '#F2EDE4',
      'c-ink': '#191817',
      'c-ink-soft': '#5E5A55',
      'c-accent': '#C1392B',
      'c-accent-soft': '#D9705F',
      'c-metal': '#9A8A6B',
      'c-line': '#E2DACB',
      'c-surface': '#DED6C6',       // oatmeal; the paper is the lightest thing
      'c-cast-rgb': '0 0 0',       // a cast shadow is dark on every palette
      'c-on-photo': '#FFFDF9',
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
      'c-surface': '#D6CDB4',       // dry grass under green
      'c-cast-rgb': '0 0 0',       // a cast shadow is dark on every palette
      'c-on-photo': '#FBFAF3',
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
      'c-surface': '#CFD4C6',       // the same green, pushed back
      'c-cast-rgb': '0 0 0',       // a cast shadow is dark on every palette
      'c-on-photo': '#FAFBF7',
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
      'c-surface': '#E3C9B4',      // unglazed clay
      'c-cast-rgb': '0 0 0',       // a cast shadow is dark on every palette
      'c-on-photo': '#FFFAF5',
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
      'c-surface': '#0C0E1B',       // darker than the paper, deliberately
      'c-cast-rgb': '0 0 0',       // a cast shadow is dark on every palette
      'c-on-photo': '#F2F0F7',
      'c-shade-rgb': '255 255 255',
    },
  },

  // Maroon -- taken from a photograph of an invitation: deep maroon cards, cream
  // and gold foil, forest green, on a warm brown table. Every colour here is
  // sampled from that image rather than chosen, then adjusted only where the UI
  // needed it (noted per line). The structure is the photo's too: cream paper
  // cards lying on a deep maroon surface.
  maroon: {
    label: 'Maroon',
    tokens: {
      'c-paper': '#F8EFD9',          // the cream of the ornaments (#FDF0C5), eased off the yellow for a large area
      'c-paper-deep': '#E3D6AC',     // sampled: the cream-gold cluster
      'c-ink': '#261510',            // the photo's near-black (#200E09), lifted a touch for body text
      'c-ink-soft': '#5A4636',       // the brown of the table (#795944), darkened to pass AA on cream
      'c-accent': '#74201B',         // sampled: the deep maroon of the cards
      'c-accent-soft': '#9A382B',    // sampled: the brighter red of the flowers
      'c-metal': '#B09A5B',          // the gold foil (#EBDDAE) deepened -- pale foil vanishes on cream paper
      'c-line': '#D8CBA3',
      'c-shade-rgb': '0 0 0',
      'c-surface': '#6F1E19',        // sampled: the dominant colour of the photograph (31%)
      'c-cast-rgb': '0 0 0',
      'c-on-photo': '#FFF8E8',
      'c-on-surface': '#F6EACB',     // cream, for text on the maroon
      'c-on-surface-soft': '#DCCBA0',
      'c-surface-accent': '#EBDDAE', // sampled: the gold foil, for the small accents on the maroon
      'c-surface-line': '#93463C',
      'c-surface-tex': 'var(--tex-glow)',
      'c-stage': '#6F1E19',          // the envelope sits on the surface colour, so the hand-off is one ground
    },
  },

  // Forest -- the same photograph's other identity colour. Same cream cards and
  // maroon accent, but lying on the deep forest green (#2B3E27) instead, with the
  // olive (#4E5B34) as the secondary text.
  forest: {
    label: 'Forest',
    tokens: {
      'c-paper': '#F8EFD9',
      'c-paper-deep': '#E3D6AC',
      'c-ink': '#1F1A14',
      'c-ink-soft': '#4E5B34',       // sampled: the olive green
      'c-accent': '#74201B',
      'c-accent-soft': '#9A382B',
      'c-metal': '#B09A5B',
      'c-line': '#D8CBA3',
      'c-shade-rgb': '0 0 0',
      'c-surface': '#2D3B2B',        // sampled: the deep forest green
      'c-cast-rgb': '0 0 0',
      'c-on-photo': '#FFF8E8',
      'c-on-surface': '#F6EACB',
      'c-on-surface-soft': '#CFC9A0',
      'c-surface-accent': '#EBDDAE',
      'c-surface-line': '#56664F',
      'c-surface-tex': 'var(--tex-glow)',
      'c-stage': '#2D3B2B',
    },
  },
};

export const ACTIVE_PALETTE = 'maroon';

export const paletteNames = Object.keys(palettes);
