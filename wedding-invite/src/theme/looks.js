/**
 * The visual dimensions you can audition, in the same shape palettes.js uses:
 * a definition object plus one ACTIVE_* constant. When LookSwitcher is deleted
 * before launch, ACTIVE_LOOK is what ships -- the choice is baked in rather
 * than lost with the tool that made it.
 *
 * Each dimension becomes a data-* attribute on <html>, so CSS selects on it the
 * same way the envelope selects on [data-phase]. Attributes, not custom
 * properties: ThemeProvider and applyMotionVars both write inline styles to the
 * same element, and an inline custom property beats any attribute rule.
 */
export const DIMENSIONS = {
  motion: {
    label: 'Motion',
    values: ['off', 'subtle', 'full'],
    help: 'Reveal distance, blur and speed.',
  },
  ornament: {
    label: 'Ornament',
    values: ['none', 'light', 'full'],
    help: 'Jaali rules, function sigils, paper grain.',
  },
  type: {
    label: 'Type',
    values: ['plain', 'refined'],
    help: 'Optical tracking, tabular figures, balanced headings.',
  },
  rhythm: {
    label: 'Rhythm',
    values: ['normal', 'generous'],
    help: 'Vertical breathing between sections.',
  },
};

export const dimensionNames = Object.keys(DIMENSIONS);

/** What ships if the switcher is deleted. */
export const ACTIVE_LOOK = {
  motion: 'subtle',
  ornament: 'light',
  type: 'refined',
  rhythm: 'normal',
};

/**
 * The two looks the switcher's preset row writes. These are not a fifth
 * attribute: a preset just sets the four real dimensions, so every CSS rule
 * belongs to exactly one dimension and nothing is reachable only via a preset.
 */
export const PRESETS = {
  restrained: { motion: 'subtle', ornament: 'light', type: 'refined', rhythm: 'normal' },
  rich: { motion: 'full', ornament: 'full', type: 'refined', rhythm: 'generous' },
};

export const presetNames = Object.keys(PRESETS);

/** Which preset a look matches, or null when it matches none. */
export function matchPreset(look) {
  return (
    presetNames.find((p) =>
      dimensionNames.every((d) => PRESETS[p][d] === look[d])) ?? null
  );
}

/** Keeps an unknown value (stale storage, a typo in a URL) from reaching the DOM. */
export function isValid(dimension, value) {
  return DIMENSIONS[dimension]?.values.includes(value) ?? false;
}
