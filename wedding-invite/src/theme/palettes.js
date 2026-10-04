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
};

export const ACTIVE_PALETTE = 'maroon';

export const paletteNames = Object.keys(palettes);
