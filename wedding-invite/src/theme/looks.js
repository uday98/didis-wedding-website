/**
 * The visual dimensions you can audition, in the same shape palettes.js uses:
 * a definition object plus one ACTIVE_* constant. When the dev panel is deleted
 * before launch, ACTIVE_LOOK is what ships -- the choice is baked in rather
 * than lost with the tool that made it.
 *
 * Each dimension becomes a data-* attribute on <html>, so CSS selects on it the
 * same way the envelope selects on [data-phase]. Attributes, not custom
 * properties: ThemeProvider, applyMotionVars and applyPaceVar all write inline
 * styles to that same element, and an inline custom property beats any rule.
 *
 * ADDING A DIMENSION: it must be added to DIMENSIONS, to ACTIVE_LOOK, and to
 * BOTH entries of PRESETS. matchPreset compares every dimension name, so a
 * dimension missing from a preset makes that preset unmatchable and the panel
 * reads "custom" forever -- a symptom that does not point at its cause.
 */
export const DIMENSIONS = {
  pace: {
    label: 'Pace',
    values: ['brisk', 'measured', 'slow'],
    help: 'Speed of everything, including the envelope.',
  },
  motion: {
    label: 'Motion',
    values: ['off', 'subtle', 'full'],
    help: 'How far things travel, and the off switch. Not speed -- that is pace.',
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
  pairing: {
    label: 'Faces',
    values: ['prata-karla', 'cormorant-jost', 'playfair-lato', 'fraunces-inter'],
    help: 'Display and body font pairing.',
  },
  headline: {
    label: 'Headline',
    values: ['modest', 'grand', 'monumental'],
    help: 'How large the names are set.',
  },
  rhythm: {
    label: 'Rhythm',
    values: ['normal', 'generous'],
    help: 'Vertical breathing between sections.',
  },
};

export const dimensionNames = Object.keys(DIMENSIONS);

/** What ships if the dev panel is deleted. */
export const ACTIVE_LOOK = {
  pace: 'measured',
  motion: 'subtle',
  ornament: 'light',
  type: 'refined',
  pairing: 'prata-karla',
  headline: 'grand',
  rhythm: 'normal',
};

/**
 * The two looks the preset row writes. Not a dimension of their own: a preset
 * just sets the real dimensions, so every CSS rule belongs to exactly one
 * dimension and nothing is reachable only through a preset.
 */
export const PRESETS = {
  restrained: {
    pace: 'measured',
    motion: 'subtle',
    ornament: 'light',
    type: 'refined',
    pairing: 'prata-karla',
    headline: 'grand',
    rhythm: 'normal',
  },
  rich: {
    pace: 'slow',
    motion: 'full',
    ornament: 'full',
    type: 'refined',
    pairing: 'cormorant-jost',
    headline: 'monumental',
    rhythm: 'generous',
  },
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
