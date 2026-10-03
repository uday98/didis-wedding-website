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
 * ADDING A DIMENSION: add it to DIMENSIONS with a `restrained` value and add it
 * to ACTIVE_LOOK. The presets are DERIVED from this map, so they cannot fall out
 * of step the way hand-listed ones could -- a dimension missing from a preset
 * used to make that preset unmatchable and the panel read "custom" forever, a
 * symptom that does not point at its cause.
 *
 * `restrained` is declared per dimension rather than taken positionally. The
 * positional rule ("the middle of three") would pick type: plain, which is a
 * control to compare against rather than a look, and pairing: cormorant-jost,
 * which would make the default look match no preset at all.
 */
export const DIMENSIONS = {
  pace: {
    label: 'Pace',
    values: ['brisk', 'measured', 'slow'],
    restrained: 'measured',
    help: 'Speed of everything, including the envelope.',
  },
  motion: {
    label: 'Motion',
    values: ['off', 'subtle', 'full'],
    restrained: 'subtle',
    help: 'How far things travel, and the off switch. Not speed -- that is pace.',
  },
  ornament: {
    label: 'Ornament',
    values: ['none', 'light', 'full'],
    restrained: 'light',
    help: 'Jaali rules, function sigils, paper grain.',
  },
  type: {
    label: 'Type',
    values: ['plain', 'refined'],
    restrained: 'refined',
    help: 'Optical tracking, tabular figures, balanced headings.',
  },
  pairing: {
    label: 'Faces',
    values: ['prata-karla', 'cormorant-jost', 'playfair-lato', 'fraunces-inter'],
    restrained: 'prata-karla',
    /* Declared, because this is the one dimension with no intensity ordering --
       the positional rule would make `rich` mean "whichever pairing happens to
       be listed last". Cormorant is the most engraved-stationery of the four,
       which is what `rich` is reaching for. */
    rich: 'cormorant-jost',
    help: 'Display and body font pairing.',
  },
  headline: {
    label: 'Headline',
    values: ['modest', 'grand', 'monumental'],
    restrained: 'grand',
    help: 'How large the names are set.',
  },
  nav: {
    label: 'Nav',
    values: ['flat', 'fade', 'floating'],
    restrained: 'fade',
    /* Declared: the three are not an intensity scale, and `rich` should differ
       from `restrained` in the dimensions that ARE one. Otherwise clicking it
       would change the nav as well and muddy what you are judging. */
    rich: 'fade',
    help: 'flat: a strip with a hairline. fade: the page colour, fading out. floating: no strip, just chips.',
  },
  rhythm: {
    label: 'Rhythm',
    values: ['normal', 'generous'],
    restrained: 'normal',
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
  nav: 'fade',
  rhythm: 'normal',
};

/**
 * The three looks the preset row writes. Not a dimension of their own: a preset
 * just sets the real dimensions, so every CSS rule belongs to exactly one
 * dimension and nothing is reachable only through a preset.
 *
 *   none        every dimension at its first value -- the plainest the site can
 *               be. The control you compare the other two against.
 *   restrained  each dimension's declared restrained value.
 *   rich        every dimension at its last value, or its declared `rich`
 *               where last-is-strongest does not hold.
 */
const build = (pick) =>
  dimensionNames.reduce((look, d) => ({ ...look, [d]: pick(DIMENSIONS[d], d) }), {});

export const PRESETS = {
  none: build((dim) => dim.values[0]),
  restrained: build((dim) => dim.restrained ?? dim.values[0]),
  rich: build((dim) => dim.rich ?? dim.values[dim.values.length - 1]),
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
