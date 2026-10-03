import { useId } from 'react';

/**
 * A jaali is the pierced stone lattice of Mughal screens. Reduced here to one
 * row of its unit cell and used as a rule under section titles.
 *
 * Drawn with <pattern patternUnits="userSpaceOnUse"> rather than one stretched
 * glyph: a single <svg> with preserveAspectRatio="none" would skew every star
 * as the container widened. No viewBox for the same reason -- user units stay
 * CSS pixels, so the cell tiles across whatever width CSS hands the element.
 *
 * useId() returns strings containing ':'. Legal in an id and in a url(#...)
 * fragment, but it makes the id unusable from a CSS selector, so strip it. Two
 * Jaalis on one page must not share a <pattern> id; the stripped form is still
 * unique.
 */
export function Jaali({ className = '', height = 16, cell = 28 }) {
  const id = `jaali-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  return (
    <svg
      className={`jaali ${className}`.trim()}
      width="100%"
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width={cell} height={height}>
          {/* An eight-point star -- a square and its 45-degree twin -- plus the
              half connector that links it to its neighbours. Strokes only: a
              jaali is the hole, not the stone. */}
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
            <rect x="9.5" y="3.5" width="9" height="9" />
            <rect x="9.5" y="3.5" width="9" height="9" transform="rotate(45 14 8)" />
            <path d="M0 8h5M23 8h5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
