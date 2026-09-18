/**
 * Palettes live here and nowhere else.
 * Components never reference a hex value — only var(--c-*).
 *
 * To switch the whole site: change ACTIVE_PALETTE below.
 * To audition one without committing: add ?palette=marigold to the URL.
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
    },
  },
};

export const ACTIVE_PALETTE = 'heirloom';

export const paletteNames = Object.keys(palettes);
